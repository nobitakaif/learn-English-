import asyncio
import json
from typing import AsyncGenerator
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv

load_dotenv()

llm = ChatGroq(
    model="openai/gpt-oss-120b",   
    temperature=0.6,
    max_tokens=8000,
)

prompt = ChatPromptTemplate.from_messages([
    ("system", """You are a friendly English teacher.

Write a story of 1000–1500 words using EVERY word from the input list naturally.
Use simple, clear English for learners.

Rules:
- Use every input word — do not skip any.
- Do not use double quotes inside the story text; use single quotes if you need to quote.
- Return ONLY the story text. No title, no JSON, no markdown fences.
- Do not add commentary before or after the story.
"""),
    ("human", "Words: {words}"),
])

chain = prompt | llm


async def stream_story(words: list[str]) -> AsyncGenerator[str, None]:
    """
    Yields raw text chunks as they arrive from Groq.
    After the full story, we can't easily send metadata in the same stream
    if we're doing pure text — so the route will send a final SSE event.
    """
    async for chunk in chain.astream({"words": words}):
        content = chunk.content
        if content:
            yield content