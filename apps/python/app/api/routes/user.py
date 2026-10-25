from fastapi import APIRouter
from app.tools.word_meaning import structure_model, SupportNativeLanguage, model2
from app.tools.verbs_form import verbs_model

router = APIRouter()


@router.get("/")
async def get_user(word : str, lang : SupportNativeLanguage) -> dict:
    res = structure_model.invoke({
        "word" : word,
        "native_language" : lang
    })
    
    return {
        "res": res,
    }
    
@router.get("/word")
async def get_word(letter : str) :
    res = await model2.ainvoke({"letter" : letter})
    return res.model_dump()


@router.get("/form")
async def verbs_form(word : str) : 
    res = await verbs_model.ainvoke({"word" : word})
    return res.model_dump()