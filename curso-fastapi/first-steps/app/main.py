from venv import create

from fastapi import FastAPI
from dotenv import load_dotenv
from app.core.db import Base, engine
from app.api.v1.posts.router import router as post_router

#Base.metadata.create_all(bind=engine) # dev, en produccion se hace con migraciones.
load_dotenv()
         
def create_app() -> FastAPI:
    app = FastAPI(title="Mini blog")
    Base.metadata.create_all(bind=engine)
    app.include_router(post_router)
    return app
    
app = create_app()