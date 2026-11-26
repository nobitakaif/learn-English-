from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv
from pydantic import BaseModel, Field
import json

load_dotenv()

llm = ChatGroq(
    model="openai/gpt-oss-120b",
    temperature=0.3,
    max_tokens=8000,
)

class SimpleStory(BaseModel):
    simple_story: str = Field(
        description="The story explained in simple words that anyone can understand."
    )

prompt = ChatPromptTemplate.from_messages([
    (
        "system",
        """You are a very intelligent teacher.

Explain the given story in simple words so that anyone can understand.
Use simple, everyday words. Do not use complex words.

Return ONLY a JSON object with this exact shape:
{{ "simple_story": "the story explained in simple words" }}

Rules:
- Use simple words only — no complex or fancy words.
- Explain every part of the story so anyone can understand it.
- Do NOT output your reasoning or thinking.
- Do NOT write any prose outside the JSON.
- Use single quotes inside the story, not double quotes.
"""
    ),
    ("human", "story : {story}"),
])

chain = prompt | llm


def _extract_json(content: str) -> dict:
    content = content.strip()
    if content.startswith("```"):
        content = content.strip("`")
        if content.startswith("json"):
            content = content[4:]
        content = content.strip()
    start = content.find("{")
    end = content.rfind("}")
    if start == -1 or end == -1:
        raise ValueError(f"No JSON found: {content[:300]!r}")
    content = content[start:end+1]
    try:
        return json.loads(content)
    except json.JSONDecodeError:
        from json_repair import repair_json
        return json.loads(repair_json(content))


def simplify_story(story: str) -> SimpleStory:
    for chunk in chain.stream({"story": story}):
        if chunk.content:
            yield chunk.content


st = """Lila lived on a quiet coast where the ocean sang a soft whisper each morning. She loved to sit on the sand and watch the tide rise and fall, feeling the cool mist rise from the water like a gentle veil. The sky at dawn was a pale violet, and a faint glimmer of light danced on the surface of the sea. A breeze would drift over the dunes, carrying the scent of salt and the faint echo of distant gulls.

One early morning, as the sun began to rise, Lila decided to wander farther than she ever had before. She packed a small bundle of parchment, a quill, and a thin piece of silk to write down any thoughts she might have on the way. She slipped on her sturdy boots, took a deep breath of fresh air, and set off along the ridge that bordered the meadow behind her home.

The meadow was full of wildflowers that began to bloom as the light grew brighter. The colors were bright and the air was filled with the soft hum of a wren hidden in the grass. Lila felt a spark of excitement in her chest, as if an ember had been lit inside her. She followed a narrow path that wound through a grove of hazel trees. Their leaves rustled in the gentle gust, and a shadow moved across the ground as a raven flew overhead, its black wings flashing like a sable plume against the sky.

The path led her to a hollow where the ground was covered in soft moss. She knelt down and felt the cool, velvet texture under her fingers. A small crystal lay half‑buried in the moss, catching the light and sending a tiny flicker across the stone. Lila picked it up and placed it in her pocket, wondering what story it might hold.

Beyond the hollow, the land rose sharply to a high cliff that dropped down to a deep lagoon. The water in the lagoon was as clear as glass, and the surface showed a perfect reflection of the lunar moon that was beginning to rise. The moon’s pale glow made the water look like liquid onyx, dark and mysterious. Lila could hear the soft thunder of waves crashing against the base of the cliff, a low rumble that seemed to echo through the night.

She walked along the edge of the cliff, feeling the wind pick up into a stronger gale. The wind tugged at her hair and made the leaves of the nearby thicket sway back and forth. A sudden gust sent a few pine needles swirling like tiny feathers. Lila felt a chill, and a thin layer of frost began to form on the edges of the rocks, sparkling like tiny diamonds in the moonlight.

At the foot of the cliff, a small cinder fire had been left by a traveler who had passed through long ago. The fire had long since died, but a few glowing embers still glowed faintly, reminding Lila of the warm glow of a campfire. She knelt beside the fire and placed her hand on the cool stone, feeling the faint vein of heat that still lingered.

The night grew deeper, and the sky turned a deep shade of sable. The wind howled louder, and the sound of thunder rolled across the ocean, mixing with the soft whisper of the waves. Lila felt a sense of wonder and a little fear, but she also felt brave. She remembered the fable her grandmother used to tell her about a brave child who followed a shining star across the sea to find a hidden treasure.

She looked up at the sky and saw a bright star that seemed to flicker like a spark. She decided to follow it, hoping it would lead her to something special. She walked down a narrow path that led to a small lagoon hidden behind a wall of thicket. The water in the lagoon was calm, and the surface reflected the moon and the stars like a perfect mirror. She could see a small island in the middle of the lagoon, and on that island a single rose was beginning to bloom, its petals soft and pink.

Lila felt a sudden rush of wind, and the gale grew stronger, making the water ripple. She saw a plume of white mist rise from the lagoon, swirling around the island like a dancer. The mist seemed to carry a faint scent of pine and fresh rain. Lila stepped into the shallow water, feeling the cool liquid against her feet. She walked toward the island, each step making a soft splash.

When she reached the island, she found a small wooden chest half‑buried in the sand. The chest was old, its surface covered with tiny thorns that had grown into the wood. She brushed the thorns away and opened the lid. Inside she found a roll of parchment tied with a thin strip of silk. The parchment was covered in beautiful writing, a story about a brave traveler who listened to the whisper of the ocean and followed the glimmer of a distant star.

Lila unrolled the parchment with the quill she had brought. The ink was dark as onyx, and each word seemed to shine with its own light. The story told of a hidden valley where the wind never stopped, where the meadow always bloomed, and where the rain fell as gentle frost that never melted. It spoke of a secret that could only be found by those who dared to wander beyond the familiar coast and listen to the echo of the sea.

She read the story until the first light of dawn began to break over the horizon. The sky turned from deep night to a soft pink, and the sun’s first rays made the ocean sparkle like a thousand tiny mirrors. The breeze softened, and the thunder faded into a distant rumble. Lila felt a warm ember of hope in her heart. She knew that the story was not just a tale, but a guide for her own life.

She closed the chest, placed the parchment back inside, and covered it with the silk. She took the crystal from her pocket and set it on top of the chest, letting its light catch the first sunbeams. The crystal glimmered brightly, as if it were a tiny sun itself. She felt the wind lift the plume of mist one last time, then gently carry it away.

Lila turned back toward the coast, her steps light and sure. She walked along the ridge, feeling the soft moss under her feet, hearing the gentle whisper of the ocean, and seeing the shadows of the cliffs dance in the early light. She passed the raven again, now perched on a branch, watching her with curious eyes.

When she reached her home, she placed the chest in a safe spot near the fireplace. She felt the glow of the fire and the warm ember of her own courage. She knew that she would return to the lagoon, the meadow, the cliff, and the hidden valley in her dreams. She would share the fable with others, teaching them to listen to the whisper of the wind, to follow the glimmer of hope, and to never be afraid to wander into the unknown.

The day went on, and the world around her continued to change. The tide rose and fell, the gale turned into a gentle breeze, and the meadow filled with new blooms. Lila smiled, feeling the rhythm of the earth in her heart. She wrote in her notebook, using the quill and the parchment, and she promised herself that she would always keep the story alive, letting its spark travel far, like a feather on the wind, to anyone who needed a reminder that even in the darkest night, a single glimmer can guide the way.
"""

res = simplify_story(story=st)

full_response = ""

for chunk in res:
    print(chunk, end="", flush=True)
    full_response += chunk

# print("-------------------------------------\n", full_response)