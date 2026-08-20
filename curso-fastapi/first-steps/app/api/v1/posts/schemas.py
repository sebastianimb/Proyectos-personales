from typing import List, Literal, Optional
from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator

class Author(BaseModel):
    name: str = Field(..., min_length=1, max_length=20, description="Name of the author (min 1 character, max 20 characters)", examples=["John Doe", "Jane Smith"])
    email: EmailStr
    model_config = ConfigDict(from_attributes=True)
    
class Tag(BaseModel):
    name: str = Field(..., min_length=1, max_length=30, description="Name of the tag (min 1 character, max 30 characters)", examples=["Python", "FastAPI"])
    model_config = ConfigDict(from_attributes=True)
    
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
    #author: Optional[Author] = None
    
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
