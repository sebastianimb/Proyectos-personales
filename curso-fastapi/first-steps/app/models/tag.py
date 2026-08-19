from typing import List, TYPE_CHECKING
from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.db import Base

if TYPE_CHECKING:
    from .post import PostORM

class TagORM(Base):
    __tablename__ = "tags"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(30), nullable=False, index=True)
    posts: Mapped[List["PostORM"]] = relationship(secondary="post_tags",
                                                 back_populates="tags",
                                                 lazy="selectin")
