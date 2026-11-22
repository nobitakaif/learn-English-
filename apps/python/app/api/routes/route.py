from fastapi import APIRouter, HTTPException
from app.tools.word_meaning import structure_model, SupportNativeLanguage, model2
from app.tools.word_summary import get_word_summary
from app.tools.single_word_meaning import chain
from app.tools.day_task import get_story
from pydantic import BaseModel, Field
from fastapi.responses import Response
import edge_tts
import tempfile
import os
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
    

class WordBody(BaseModel) : 
    word : list[str]
    
@router.post("/word2")
async def list_word_meaning(body : WordBody)  :
    res = chain.invoke({"words" : body.word})
    return res.model_dump()

DEFAULT_VOICE = "hi-IN-SwaraNeural"

@router.get("/tts")
async def text_to_speech(
    text: str,
    voice: str = DEFAULT_VOICE,
    rate: str = "+0%",
    pitch: str = "+0Hz",
):
    if not text or not text.strip():
        raise HTTPException(400, "text is required")

    tmp_path = None
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as f:
            tmp_path = f.name

        communicate = edge_tts.Communicate(
            text,
            voice,
            rate=rate,
            pitch=pitch,
        )
        await communicate.save(tmp_path)

        if os.path.getsize(tmp_path) < 1000:
            raise RuntimeError("TTS returned empty audio")

        with open(tmp_path, "rb") as audio:
            data = audio.read()

        return Response(content=data, media_type="audio/mpeg")

    except Exception as e:
        raise HTTPException(500, f"TTS failed: {e}")
    finally:
        if tmp_path and os.path.exists(tmp_path):
            os.remove(tmp_path)


class SummaryBody(BaseModel):
    word : str

@router.post("/summary")
async def word_summary(body : SummaryBody) :
    res = get_word_summary(body.word)
    return res.model_dump()

@router.get("/story")
async def story() : 
    words = [
    "ocean", "whisper", "glimmer", "wander", "breeze",
    "shadow", "velvet", "crystal", "thunder", "meadow",
    "drift", "spark", "echo", "frost", "ember",
    "lunar", "coast", "dusk", "bloom", "gust",
    "ridge", "hollow", "flicker", "moss", "dawn",
    "swell", "parchment", "thorn", "silk", "grove",
    "tide", "raven", "cinder", "vein", "cliff",
    "mist", "hazel", "plume", "wren", "sable",
    "gale", "lagoon", "thicket", "quill", "onyx",
    "fable", "drift", "sable", "wren", "gale"
]   
    return get_story(words)