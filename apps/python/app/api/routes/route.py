from fastapi import APIRouter, HTTPException, Query
import json

from app.tools.word_meaning import structure_model, SupportNativeLanguage, model2
from app.tools.word_summary import get_word_summary
from app.tools.single_word_meaning import chain
from app.tools.day_task import get_story
from pydantic import BaseModel, Field
from app.tools.day_task_stream import stream_story
from fastapi.responses import Response, StreamingResponse
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
# from 

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



def sse(event: str, data: str) -> str:
    """Format a single Server-Sent Event."""
    return f"event: {event}\ndata: {data}\n\n"


@router.get("/story/stream")
async def story_stream(words: str = Query(..., description="Comma-separated words")):
    word_list = [w.strip() for w in words.split(",") if w.strip()]
    word_list = list(dict.fromkeys(word_list))

    if not word_list:
        return {"error": "no words provided"}

    async def event_generator():

        yield sse("start", json.dumps({"words": word_list}))

        try:
            async for chunk in stream_story(word_list):

                yield sse("token", json.dumps({"t": chunk}))
        except Exception as e:
            yield sse("error", json.dumps({"message": str(e)}))
            return

        yield sse("done", json.dumps({"words": word_list}))

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",     
        },
    )