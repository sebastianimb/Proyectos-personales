import os
from math import ceil
from datetime import datetime
from fastapi import FastAPI, Query, HTTPException, Path, status, Depends
from pydantic import BaseModel, Field, field_validator, EmailStr, ConfigDict 
from typing import Optional, List, Union, Literal
from sqlalchemy import Integer, String, Text, DateTime, select, func, update, delete, UniqueConstraint, ForeignKey, Table, Column
from sqlalchemy.exc import SQLAlchemyError, IntegrityError
from sqlalchemy.orm import Mapped, mapped_column, relationship, selectinload, joinedload
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Mini blog")
      
############################# BD class

posts_tags = Table(
    "post_tags",
    Base.metadata,
    Column("post_id", ForeignKey("posts.id", ondelete="CASCADE"), primary_key=True),
    Column("tag_id", ForeignKey("tags.id", ondelete="CASCADE"), primary_key=True),
)

class PostORM(Base):
    __tablename__ = "posts"
    __table_args__ = (UniqueConstraint("title", name="unique_post_title"),)
    
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True, autoincrement=True)
    title: Mapped[str] = mapped_column(String(100), nullable=False, index=True)
    content: Mapped[str] = mapped_column(Text, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=True)
    author_id: Mapped[Optional[int]] = mapped_column(ForeignKey("authors.id"))
    author: Mapped[Optional["AuthorORM"]] = relationship(back_populates="posts")
    tags: Mapped[List["TagORM"]] = relationship(
                                    secondary=posts_tags,
                                    back_populates="posts",
                                    lazy="selectin",
                                    passive_deletes=True)

class AuthorORM(Base):
    __tablename__ = "authors"
    
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False, index=True)
    email: Mapped[str] = mapped_column(String(100), unique=True, index=True)
    posts: Mapped[List["PostORM"]] = relationship(back_populates="author")
    
class TagORM(Base):
    __tablename__ = "tags"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(30), nullable=False, index=True)
    posts: Mapped[List["PostORM"]] = relationship(secondary=posts_tags,
                                                 back_populates="tags",
                                                 lazy="selectin")
    
Base.metadata.create_all(bind=engine) # dev, en produccion se hace con migraciones.

############################## Models 
class Tag(BaseModel):
    name: str = Field(..., min_length=1, max_length=30, description="Name of the tag (min 1 character, max 30 characters)", examples=["Python", "FastAPI"])
    model_config = ConfigDict(from_attributes=True)
class Author(BaseModel):
    name: str = Field(..., min_length=1, max_length=20, description="Name of the author (min 1 character, max 20 characters)", examples=["John Doe", "Jane Smith"])
    email: EmailStr
    model_config = ConfigDict(from_attributes=True)
    
############################# Request models
class PostBase(BaseModel):
    title: str
    content: str
    tags: Optional[List[Tag]] = Field(default_factory=list, description="List of tags associated with the blog post")
    author: Optional[Author] = None
    model_config = ConfigDict(from_attributes=True)

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
    model_config = ConfigDict(from_attributes=True)
    
class PostSummary(BaseModel):
    id: int
    title: str
    model_config = ConfigDict(from_attributes=True)
    
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
            direction: Literal["asc", "desc"] = Query("asc", description="Direction of the ordering (ascending or descending)"),
    db: Session = Depends(get_db)
    ):
    
    results = select(PostORM)
    
    if query:
        """ for post in BLOG_POST:
            if query.lower() in post["title"].lower():
                result.append(post)  
        """
        """ results = [post for post in results if query.lower()
                   in post["title"].lower()] """
        results = results.where(PostORM.title.ilike(f"%{query}%"))
    
            # select count(*) from result.subquery
    total = db.scalar(select(func.count()).select_from(results.subquery()))  or 0
    total_pages = ceil(total/per_page) if total > 0 else 0
    
    current_page = 1 if total_pages == 0 else min(page,total_pages)
    
    #results = sorted(results, key=lambda post: post[order_by], reverse=(direction == "desc"))
    if order_by == "id":
        order_col = PostORM.id
    else: 
        order_col = func.lower(PostORM.title)
        
    results = results.order_by(order_col.asc() if direction == "asc" else order_col.desc())
    
    if total_pages == 0:
        items = List[PostORM] = []
    else:
        start = (current_page - 1) * per_page
        end = start + per_page
        items = db.execute(results.limit(per_page).offset(start)).scalars().all()
        
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
        items=items,
    )

@app.get("/posts/by-tags", response_model=List[PostPublic])
def get_posts_by_tags(
    tags: List[str] = Query(...,
                            min_length=2,
                            description="List of tags to filter the blog posts by. Example: ?tags=python&tags=fastapi"), 
    db: Session = Depends(get_db)):
    
    normalized_tags_names = [tag.strip().lower() for tag in tags if tag.strip()]
    
    if not normalized_tags_names:
        return []
    
    posts_list = (
        select(PostORM)
        .options(
            selectinload(PostORM.tags),
            joinedload(PostORM.author)
        )
        .where(PostORM.tags.any(func.lower(TagORM.name).in_(normalized_tags_names)))
        .order_by(PostORM.id.asc())
    )
    
    posts = db.execute(posts_list).scalars().all()
    
    return posts

@app.get("/posts/{post_id}",response_model=Union[PostPublic, PostSummary], response_description="Post found")
def get_post(post_id: int = Path(
            ...,
            ge=1,
            title="Post ID",
            description="ID of the blog post to retrieve, should be greater than or equal to 1",
            examples=[1]),
            include_content: bool | None = Query(default=True, description="Include content in the response"),
            db: Session = Depends(get_db)):
    """ for post in BLOG_POST:
            if post["id"] == post_id:
                if not include_content:
                    return {"data": {"id": post["id"], "title": post["title"]}}
                return {"data": post}
    """
    post_find = select(PostORM).where(PostORM.id == post_id)
    post = db.execute(post_find).scalar_one_or_none()
    #post = db.get(PostORM, post_id)
    
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    if include_content:
        return PostPublic.model_validate(post, from_attributes=True)

    return PostSummary.model_validate(post, from_attributes=True)

@app.post("/posts", response_model=PostPublic,
                    response_description="Post created successfully",
                    response_model_exclude_none=True,
                    status_code=status.HTTP_201_CREATED)
def create_post(post: PostCreate, db: Session = Depends(get_db)):
    try:
        author_obj = None
        if post.author:
            author_obj = db.execute(
                select(AuthorORM).where(AuthorORM.email == post.author.email)
            ).scalar_one_or_none()
            if not author_obj:
                author_obj = AuthorORM(name=post.author.name, email=post.author.email)
                db.add(author_obj)

        new_post = PostORM(title=post.title, content=post.content, author=author_obj)
        db.add(new_post)

        for tag in post.tags:
            tag_obj = db.execute(
                select(TagORM).where(TagORM.name.ilike(tag.name))
            ).scalar_one_or_none()
            if not tag_obj:
                tag_obj = TagORM(name=tag.name)
                db.add(tag_obj)
            # se agregan los tags al post de orm para que automaticamente los cree en tabla intermedia
            new_post.tags.append(tag_obj)

        db.commit()
        db.refresh(new_post)
        return new_post
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="A post with this title already exists")
    except SQLAlchemyError:
        db.rollback()
        raise HTTPException(status_code=500, detail="Error in create post")

@app.put("/posts/{post_id}", response_model=PostPublic, response_description="Post updated successfully")
def update_post(post_id: int, post: PostUpdate, db: Session = Depends(get_db)):
    db_post = db.get(PostORM, post_id)
    if not db_post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")
    
    update_data = post.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_post, key, value)
     
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post

@app.delete("/posts/{post_id}", status_code=status.HTTP_404_NOT_FOUND)
def delete_post(post_id: int, db: Session = Depends(get_db)):
    db_post = db.get(PostORM, post_id)
    
    if not db_post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")
    
    db.delete(db_post)
    db.commit()
    return
        