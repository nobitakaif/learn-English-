from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from pydantic import BaseModel
import json
import re
from dotenv import load_dotenv

load_dotenv()

llm = ChatGroq(
    model="openai/gpt-oss-120b",
    temperature=0.6,
    max_tokens=8000 
)

class WordOfTheDay(BaseModel):
    words: list[str]
    story: str

prompt = ChatPromptTemplate.from_messages([
    ("system", """You are a friendly English teacher.

Return ONLY a valid JSON object. No markdown, no prose outside the JSON.
The JSON must have exactly this shape:
{{ "words": ["word1", "word2", ...], "story": "The full 1000-1500 word story." }}

Rules:
- words: the exact input list.
- story: A 1000-1500 word story using every input word naturally.
- Make sure the story string is escaped correctly. DO NOT use double quotes inside the story text. Use single quotes if you need to quote something.
"""),
    ("human", "Words: {words}"),
])

chain = prompt | llm

def get_story(words: list[str]) -> WordOfTheDay:
    raw = chain.invoke({"words": words})
    content = raw.content.strip()

    if content.startswith("```"):
        content = content.strip("`").removeprefix("json").strip()
    if content.endswith("```"):
        content = content[:-3].strip()

    start = content.find("{")
    end = content.rfind("}")
    if start != -1 and end != -1:
        content = content[start:end+1]
    else:
        raise ValueError(f"No JSON object found in response: {content[:200]}...")

    try:
        data = json.loads(content)
    except json.JSONDecodeError:
       
        fixed = re.sub(r'(?<!\\)"(?=(?:[^"\\]|\\.)*"\\s*:)', r'\"', content)
 
        try:
            data = json.loads(fixed)
        except json.JSONDecodeError:
           
            story_match = re.search(r'"story"\s*:\s*"(.*)"', content, re.DOTALL)
            if story_match:
                story_value = story_match.group(1)
      
                escaped_story = story_value.replace('"', '\\"')
                new_content = content[:story_match.start(1)] + escaped_story + content[story_match.end(1):]
                try:
                    data = json.loads(new_content)
                except json.JSONDecodeError:
                    raise ValueError(f"Failed to parse JSON after escaping quotes. Content: {content[:500]}...")
            else:
                raise ValueError(f"Failed to parse JSON: {content[:500]}...")

    return WordOfTheDay.model_validate(data)

