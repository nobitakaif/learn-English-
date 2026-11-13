from fastapi import APIRouter, HTTPException
from app.tools.word_meaning import structure_model, SupportNativeLanguage, model2

from app.tools.verbs_form import verbs_model
from app.tools.roadmap import generate_roadmap, RoadMap
import asyncio
from prisma import Prisma  
import traceback
from datetime import date
from app.db import db
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
    
# @router.get("/word")
# async def get_word(letter : str) :
#     res = await model2.ainvoke({"letter" : letter})
#     return res.model_dump()


@router.get("/form")
async def verbs_form(word : str) : 
    res = await verbs_model.ainvoke({"word" : word})
    return res.model_dump()



@router.get("/roadmap", response_model=RoadMap)
def get_roadmap(occupation: str):
    try:
        return generate_roadmap(occupation)
    except ValueError as e:                       # roadmap failed all retries
        raise HTTPException(status_code=502, detail=str(e))
    

@router.get("/day")
async def get_data_by_day(day: int) : 
    # await db.connect()
    print("ROUTE db id:", id(db), "connected:", db.is_connected())
    try : 
        user = await db.user.create(
            data ={
               "name" : "python",
               "email" : "messi@gmail.com",
               "avatar" : "avatar.com",
               "isEamilVerified" : False,
               "familyName" : "Ronaldo",
               "givenName" : "cristiano",
               "userName" : "messi"
            }
        )
        
        print("user_id -> ",user.id)
        return {
            "day" : day,
            "user" : user.id
        }
    except Exception:
        traceback.print_exc()
        raise
    finally: 
        return "something went wrong"
    