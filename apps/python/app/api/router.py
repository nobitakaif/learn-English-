from app.api.routes import route
from fastapi import APIRouter


api_router = APIRouter()

api_router.include_router(route.router)