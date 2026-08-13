from fastapi import FastAPI, Query, HTTPException, Path
from pydantic import BaseModel, Field, field_validator, EmailStr
from typing import Optional, List, Union, Literal

app = FastAPI(title="Mini blog")

BLOG_POST = [{"id": 1, "title": "First Post", "content": "This is the content of the first post."},
             {"id": 2, "title": "Second Post", "content": "This is the content of the second post."},
             {"id": 3, "title": "Third Post", "content": "This is the content of the third post."},
             {"id": 4, "title": "Fourth Post", "content": "This is the content of the fourth post."},
             {"id": 5, "title": "Fifth Post", "content": "This is the content of the fifth post."}]

class Tag(BaseModel):
    name: str = Field(..., min_length=1, max_length=30, description="Name of the tag (min 1 character, max 30 characters)", examples=["Python", "FastAPI"])

class Author(BaseModel):
    name: str = Field(..., min_length=1, max_length=20, description="Name of the author (min 1 character, max 50 characters)", examples=["John Doe", "Jane Smith"])
    email: EmailStr
    
############################# Request models
class PostBase(BaseModel):
    title: str
    content: str
    tags: Optional[List[Tag]] = Field(default_factory=list, description="List of tags associated with the blog post")
    author: Optional[Author] = None

class PostCreate(BaseModel):
    title: str = Field(...,
                       min_length=3,
                       max_length=100,
                       description="Title of the blog post (min 3 characters, max 100 characters)",
                       examples=["First Post"])
    content: Optional[str] = Field(default="Pending content",
                                   min_length=10,
                                   description="Content of the blog post",
                                   examples=["This is the content of the blog post."])
    tags: List[Tag] = Field(default_factory=list, description="List of tags associated with the blog post")
    author: Optional[Author] = None
    
    @field_validator("title")
    @classmethod
    def not_allowed_title(cls, value: str) -> str:
        forbidden_words = ["spam"]
        for word in forbidden_words:
            if word.lower() in value.lower():
                raise ValueError(f"The title contains a forbidden word: '{word}'")
        return value
    
class PostUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=3, max_length=100)
    content: Optional[str] = None

############################# Response models
class PostPublic(PostBase):
    id: int
    
class PostSummary(BaseModel):
    id: int
    title: str
    
class PaginatedPosts(BaseModel):
    total: int
    limit: int
    offset: int
    posts: List[PostPublic]
    
############################# Endpoints

@app.get("/")
def home():
    return {"message": "Welcome to the Mini Blog"}

@app.get("/posts", response_model=PaginatedPosts)
def get_posts(query: Optional[str] = Query(
            default=None,
            description="Search query for blog posts",
            alias="search",
            min_length=3,
            max_length=50,
            pattern=r"^[\w\sáéíóúñÁÉÍÓÚÑüÜ-]+$",
            ),
            limit: int = Query(default=10, ge=1, le=50, description="Maximum number of posts to return (between 1 and 50)"),
            offset: int = Query(default=0, ge=0, description="Number of posts to skip before starting to collect the result set (must be greater than or equal to 0)"),
            order_by: Literal["id", "title"] = Query("id", description="Field to order the results by"),
            direction: Literal["asc", "desc"] = Query("asc", description="Direction of the ordering (ascending or descending)")):
    
    results = BLOG_POST.copy()
    
    if query:
        """ for post in BLOG_POST:
            if query.lower() in post["title"].lower():
                result.append(post)  
        """
        results = [post for post in results if query.lower()
                   in post["title"].lower()]
    
    total = len(results)
    
    results = sorted(results, key=lambda post: post[order_by], reverse=(direction == "desc"))
    
    data = results[offset:offset + limit]

    return PaginatedPosts(total=total, limit=limit, offset=offset, posts=data)

@app.get("/posts/{post_id}",response_model=Union[PostPublic, PostSummary],
                            response_description="Post found")
def get_post(post_id: int = Path(
            ...,
            ge=1,
            title="Post ID",
            description="ID of the blog post to retrieve, should be greater than or equal to 1",
            examples=[1]),
            include_content: bool | None = Query(default=True, description="Include content in the response")
):
    """ for post in BLOG_POST:
            if post["id"] == post_id:
                if not include_content:
                    return {"data": {"id": post["id"], "title": post["title"]}}
                return {"data": post}
    """
    result = next((post for post in BLOG_POST if post["id"] == post_id), None)
    if result is None:
        raise HTTPException(status_code=404, detail="Post not found")

    result_copy = result.copy()

    if not include_content:
        result_copy.pop("content", None)
        return result_copy

    return result

@app.post("/posts", response_model=PostPublic,
                    response_description="Post created successfully",
                    response_model_exclude_none=True)
def create_post(post: PostCreate):
    new_id = (BLOG_POST[-1]["id"] + 1) if BLOG_POST else 1
    new_post = {"id": new_id,
                "title": post.title,
                "content": post.content,
                "tags": [tag.model_dump() for tag in post.tags],
                "author": post.author.model_dump() if post.author is not None else None }
    BLOG_POST.append(new_post)
    return new_post

@app.put("/posts/{post_id}",
         response_model=PostPublic,
         response_description="Post updated successfully")
def update_post(post_id: int, post: PostUpdate):
    for existing_post in BLOG_POST:
        if existing_post["id"] == post_id:
            playload = post.model_dump(exclude_unset=True)
            if post.title is not None: existing_post["title"] = playload["title"]
            if post.content is not None: existing_post["content"] = playload["content"]
            return existing_post
    raise HTTPException(status_code=404, detail="Post not found")

@app.delete("/posts/{post_id}", status_code=204)
def delete_post(post_id: int):
    for index, existing_post in enumerate(BLOG_POST):
        if existing_post["id"] == post_id:
            BLOG_POST.pop(index)
            return
    raise HTTPException(status_code=404, detail="Post not found")