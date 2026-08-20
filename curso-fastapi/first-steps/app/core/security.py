from datetime import timedelta, datetime, timezone
import os
import stat
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from typing import Optional
from jwt.exceptions import ExpiredSignatureError, InvalidTokenError
import jwt

SECRET_KEY = os.getenv("SECRET_KEY", "change-me-in-prod")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACESS_TOKEN_EXPIRE_MINUTES", 30))

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")

credentials_exc = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="No autenticado",
    headers={"WWW-Authenticate": "Bearer"}
)

def raise_expire_token():
    return HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="expired token",
    headers={"WWW-Authenticate": "Bearer"}
    )
    
def raise_fordidden():
    return HTTPException(
        status_code=status.HTTP_403_UNAUTHORIZED,
        detail="you don't have sufficient permission",
        headers={"WWW-Authenticate": "Bearer"}
    )

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    token = jwt.encode(payload=to_encode, key=SECRET_KEY, algorithm=ALGORITHM)
    return token
    

def decode_token(token: str) -> dict:
    payload = jwt.decode(jwt=token, key=SECRET_KEY, algorithms=ALGORITHM)
    return payload

async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = decode_token(token)
        sub: Optional[str] = payload.get("sub")
        username: Optional[str] = payload.get("username")
        
        if not sub or not username:
            raise credentials_exc
        return {
            "email": sub,
            "username": username
        }
    except ExpiredSignatureError:
        raise raise_expire_token()
    except InvalidTokenError:
        raise credentials_exc