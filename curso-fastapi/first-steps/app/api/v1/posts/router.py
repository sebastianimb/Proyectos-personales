from fastapi import APIRouter, Query, HTTPException, Path, status, Depends
from math import ceil
from typing import Optional, List, Union, Literal
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError, IntegrityError
from app.core.db import get_db
from .schemas import (PostPublic, PaginatedPosts, PostUpdate, PostSummary, PostCreate)
from .repository import PostRepository


router = APIRouter(prefix="/post", tags=["posts"])

@router.get("", response_model=PaginatedPosts, status_code=status.HTTP_200_OK)
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
    
    query = query or text
    repository = PostRepository(db=db)
    total, items = repository.search(query, order_by, direction, page, per_page)
    total_pages = ceil(total/per_page) if total > 0 else 0
    current_page = 1 if total_pages == 0 else min(page, total_pages)
    
    has_prev = current_page > 1
    has_next = current_page < total_pages if total_pages > 0 else False
    
    items = [PostPublic.model_validate(item, from_attributes=True) for item in items]
        
    return PaginatedPosts(
        items=items,
        total=total,
        page=current_page,
        per_page=per_page,
        total_pages=total_pages,
        has_previous=has_prev,
        has_next=has_next,
        order_by=order_by,
        direction=direction
    )
    
@router.get("/by-tags", response_model=List[PostPublic], status_code=status.HTTP_200_OK)
def get_posts_by_tags(
    tags: List[str] = Query(...,
                            min_length=2,
                            description="List of tags to filter the blog posts by. Example: ?tags=python&tags=fastapi"), 
    db: Session = Depends(get_db)):
    
    normalized_tags_names = [tag.strip().lower() for tag in tags if tag.strip()]
    
    if not normalized_tags_names:
        return []
    
    repository = PostRepository(db)
    return  repository.by_tags(normalized_tags_names)

@router.get("/{post_id}",response_model=Union[PostPublic, PostSummary], response_description="Post found", status_code=status.HTTP_200_OK)
def get_post(post_id: int = Path(
            ...,
            ge=1,
            title="Post ID",
            description="ID of the blog post to retrieve, should be greater than or equal to 1",
            examples=[1]),
            include_content: bool | None = Query(default=True, description="Include content in the response"),
            db: Session = Depends(get_db)):
    repository = PostRepository(db)
    post = repository.get(post_id)
    
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    return PostPublic.model_validate(post, from_attributes=True) if include_content else PostSummary.model_validate(post, from_attributes=True)
    
@router.post("/", response_model=PostPublic, response_description="Post created successfully", response_model_exclude_none=True, status_code=status.HTTP_201_CREATED)
def create_post(post: PostCreate, db: Session = Depends(get_db)):
    repository = PostRepository(db)
    
    try:
        created_post = repository.create_post(
            title=post.title,
            content=post.content or "",
            author=post.author.model_dump() if post.author else None,
            tags=[tag.model_dump() for tag in post.tags]
        )
        db.commit()
        db.refresh(created_post)
        return created_post
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="A post with this title already exists")
    except SQLAlchemyError:
        db.rollback()
        raise HTTPException(status_code=500, detail="Error in create post")

@router.put("/{post_id}", response_model=PostPublic, response_description="Post updated successfully", response_model_exclude_none=True)
def update_post(post_id: int, updates: PostUpdate, db: Session = Depends(get_db)):
    repository = PostRepository(db)
    db_post = repository.get(post_id)
    
    if not db_post:
            raise HTTPException(status_code=404, detail="Post not found")
    
    try:
        post_updated =repository.update_post(post=db_post, updates=updates.model_dump(exclude_unset=True))
        db.commit()
        db.refresh(post_updated)
        return post_updated
    except SQLAlchemyError:
        db.rollback()
        raise HTTPException(status_code=500, detail="Error in update post")
    
@router.delete("/{post_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_post(post_id: int, db: Session = Depends(get_db)):
    repository = PostRepository(db)
    db_post = repository.get(post_id)
    
    if not db_post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")
    
    try:
        repository.delete_post(post_id)
        db.commit()
        return
    except SQLAlchemyError:
        db.rollback()
        raise HTTPException(status_code=500, detail="Error in delete post")