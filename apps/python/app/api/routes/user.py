from fastapi import APIRouter
from app.tools.word_meaning import llm, chat

router = APIRouter()

@router.get("/{user_id}")
async def get_user(user_id : str):
    res = chat(user_id)

    return {
        "userId" : user_id,
        "res" : res
    }