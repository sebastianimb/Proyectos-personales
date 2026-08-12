from fastapi import FastAPI, Query, HTTPException
from pydantic import BaseModel, Field
from typing import Optional

app = FastAPI(title="Mini blog")

BLOG_POST = [{"id": 1, "title": "First Post", "content": "This is the content of the first post."},
             {"id": 2, "title": "Second Post", "content": "This is the content of the second post."},
             {"id": 3, "title": "Third Post", "content": "This is the content of the third post."},
             {"id": 4, "title": "Fourth Post", "content": "This is the content of the fourth post."},
             {"id": 5, "title": "Fifth Post", "content": "This is the content of the fifth post."}]

class PostBase(BaseModel):
    title: str
    content: Optional[str] = "Pending content"

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

class PostUpdate(BaseModel):
    title: str
    content: Optional[str] = None

@app.get("/")
def home():
    return {"message": "Welcome to the Mini Blog"}

@app.get("/posts")
def get_posts(query: str | None = Query(default=None, description="Search query for blog posts")):
    if query:
            result = [post for post in BLOG_POST if query.lower() in post["title"].lower()]
            """ for post in BLOG_POST:
                if query.lower() in post["title"].lower():
                    result.append(post) """
            return {"data": result, "query": query}
    return {"data": BLOG_POST}

@app.get("/posts/{post_id}")
def get_post(
    post_id: int,
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
        return {"data": result_copy}

    return {"data": result}

@app.post("/posts")
def create_post(post: PostCreate):
    new_id = (BLOG_POST[-1]["id"] + 1) if BLOG_POST else 1
    new_post = {"id": new_id, "title": post.title, "content": post.content}
    BLOG_POST.append(new_post)
    return {"message": "Post created successfully", "data": new_post}

@app.put("/posts/{post_id}")
def update_post(post_id: int, post: PostUpdate):
    for existing_post in BLOG_POST:
        if existing_post["id"] == post_id:
            payload = post.model_dump(exclude_unset=True)
            if post.title is not None: existing_post["title"] = payload["title"]
            if post.content is not None: existing_post["content"] = payload["content"]
            return {"message": "Post updated successfully", "data": existing_post}
    raise HTTPException(status_code=404, detail="Post not found")

@app.delete("/posts/{post_id}", status_code=204)
def delete_post(post_id: int):
    for index, existing_post in enumerate(BLOG_POST):
        if existing_post["id"] == post_id:
            BLOG_POST.pop(index)
            return
    raise HTTPException(status_code=404, detail="Post not found")