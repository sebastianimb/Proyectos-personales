from typing import List, Literal, Optional
from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class TokenData(BaseModel):
    sub: str
    username: str
    
class UserPublic(BaseModel):
    email: str
    username: str
    model_config = ConfigDict(from_attributes=True)
