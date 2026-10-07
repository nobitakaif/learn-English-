from fastapi import APIRouter
from app.tools.word_meaning import structure_model, SupportNativeLanguage

router = APIRouter()


@router.get("/")
async def get_user(word : str, native_lan : SupportNativeLanguage) -> dict:
    res = structure_model.invoke({
        "word" : word,
        "native_language" : native_lan
    })
    
    return {
        "res": res,
    }