import os
from math import ceil
from datetime import datetime
from fastapi import FastAPI, Query, HTTPException, Path
from pydantic import BaseModel, Field, field_validator, EmailStr
from typing import Optional, List, Union, Literal
from sqlalchemy import create_engine, Integer, String, Text, DateTime
from sqlalchemy.orm import sessionmaker, Session, DeclarativeBase, Mapped, mapped_column

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./blog.db")
print(f"Using database URL: {DATABASE_URL}")

engine_kwargs = {}
if DATABASE_URL.startswith("sqlite"):
    engine_kwargs["connect_args"] = {"check_same_thread": False}

engine = create_engine(DATABASE_URL, echo=True, future=True, **engine_kwargs)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine, class_=Session)

app = FastAPI(title="Mini blog")

BLOG_POST = [{"id": 1, "title": "First Post", "content": "This is the content of the first post.", "tags": [{"name": "Python"}, {"name": "FastAPI"}], "author": {"name": "John Doe", "email": "john.doe@example.com"}},
             {"id": 2, "title": "Second Post", "content": "This is the content of the second post.", "tags": [{"name": "Django"}, {"name": "FastAPI"}], "author": {"name": "Jane Smith", "email": "jane.smith@example.com"}},
             {"id": 3, "title": "Third Post", "content": "This is the content of the third post.", "tags": [{"name": "Backend"}, {"name": "FastAPI"}], "author": {"name": "John Doe", "email": "john.doe@example.com"}},
             {"id": 4, "title": "Fourth Post", "content": "This is the content of the fourth post.", "tags": [{"name": "Python"}, {"name": "FastAPI"}], "author": {"name": "Jane Smith", "email": "jane.smith@example.com"}},
             {"id": 5, "title": "Fifth Post", "content": "This is the content of the fifth post.", "tags": [{"name": "Python"}, {"name": "FastAPI"}], "author": {"name": "John Doe", "email": "john.doe@example.com"}}]

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
############################# BD class
class Base(DeclarativeBase):
    pass

class PostORM(Base):
    __tablename__ = "posts"
    
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True, autoincrement=True)
    title: Mapped[str] = mapped_column(String(100), nullable=False, index=True)
    content: Mapped[str] = mapped_column(Text, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow(), nullable=True)
    
Base.metadata.create_all(bind=engine) # dev, en produccion se hace con migraciones.

############################## Models 
class Tag(BaseModel):
    name: str = Field(..., min_length=1, max_length=30, description="Name of the tag (min 1 character, max 30 characters)", examples=["Python", "FastAPI"])

class Author(BaseModel):
    name: str = Field(..., min_length=1, max_length=20, description="Name of the author (min 1 character, max 20 characters)", examples=["John Doe", "Jane Smith"])
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
    page: int
    per_page: int
    total: int
    total_pages: int
    has_previous: bool
    has_next: bool
    order_by: Literal["id", "title"]
    direction: Literal["asc", "desc"]
    search: Optional[str] = None
    items: List[PostPublic]
############################# Endpoints

@app.get("/")
def home():
    return {"message": "Welcome to the Mini Blog"}

@app.get("/posts", response_model=PaginatedPosts)
def get_posts(
    text: Optional[str] = Query(
            default=None,
            deprecated=True,
            description="Search query for blog posts",
    ),
    query: Optional[str] = Query(
            default=None,
            description="Search query for blog posts",
            alias="search",
            min_length=3,
            max_length=50,
            pattern=r"^[\w\sáéíóúñÁÉÍÓÚÑüÜ-]+$",
            ),
            per_page: int = Query(default=10, ge=1, le=50, description="Maximum number of posts to return (between 1 and 50)"),
            page: int = Query(default=1, ge=1, description="Page number of the results to return (must be a positive integer)"),
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
    total_pages = ceil(total/per_page) if total > 0 else 0
    
    if total_pages == 0:
        current_page = 1
    else:
        current_page = min(page, total_pages)
    
    results = sorted(results, key=lambda post: post[order_by], reverse=(direction == "desc"))
    
    if total_pages == 0:
        items = []
    else:
        start = (current_page - 1) * per_page
        end = start + per_page
        items = results[start:end]
        
    has_prev = current_page > 1
    has_next = current_page < total_pages

    return PaginatedPosts(
        page=current_page,
        per_page=per_page,
        total=total,
        total_pages=total_pages,
        has_previous=has_prev,
        has_next=has_next,
        order_by=order_by,
        direction=direction,
        search=query,
        items=[PostPublic(**post) for post in items],
    )

@app.get("/posts/by-tags", response_model=List[PostPublic])
def get_posts_by_tags(
    tags: List[str] = Query(...,
                            min_length=2,
                            description="List of tags to filter the blog posts by. Example: ?tags=python&tags=fastapi")
    ):
    tag_lower = [tag.lower() for tag in tags]
    return [
        post for post in BLOG_POST
        if any(tag["name"].lower() in tag_lower for tag in post.get("tags", []))
    ]

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