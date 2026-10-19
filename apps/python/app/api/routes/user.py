from fastapi import APIRouter
from app.tools.word_meaning import structure_model, SupportNativeLanguage, model2

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
    
@router.get("/word")
async def get_word(letter : str) :
    res = await model2.ainvoke({"letter" : letter})
    return res.model_dump()