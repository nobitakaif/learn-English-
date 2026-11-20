from langchain_groq import ChatGroq
from dotenv import load_dotenv
from pydantic import BaseModel, Field
from langchain_core.prompts import ChatPromptTemplate

load_dotenv()

llm = ChatGroq(model="openai/gpt-oss-120b", temperature=0.3)

class WordSummary(BaseModel):
    word: str = Field(description="The original word, unchanged")
    meaning: str = Field(
        description="A short learner-friendly meaning (in Hindi if the user is learning from Hindi, "
                    "otherwise English). Under 20 words."
    )
    explanation: str = Field(
        description="A more detailed explanation in simple language — what the word really means, "
                    "when to use it, and any nuance. 2–3 sentences."
    )
    verb_form: list[str] = Field(
        description="If the word is a verb, its forms: base, past simple, past participle, present participle. "
                    "Example: ['go', 'went', 'gone', 'going']. Empty list if the word is not a verb."
    )
    use_cases: list[str] = Field(
        description="2–3 example sentences showing real, natural usage. Each under 20 words."
    )
    synonyms: list[str] = Field(
        description="2–5 common synonyms, single words preferred. Empty list if none."
    )

model = llm.with_structured_output(WordSummary)

prompt = ChatPromptTemplate.from_messages([
    (
        "system",
        """You are a genius English teacher helping students and working professionals learn English.

For every input word, return a full breakdown:
- word: the word itself, unchanged
- meaning: a short learner-friendly definition (under 20 words)
- explanation: a clear 2–3 sentence explanation of what it really means, when to use it, and any nuance
- verb_form: if the word is a verb, list its forms [base, past simple, past participle, present participle].
             If it's not a verb, return an empty list [].
- use_cases: 2–3 natural example sentences (each under 20 words)
- synonyms: 2–5 common synonyms (single words preferred, empty list if none)

Rules:
- Return EXACTLY one object for the input word.
- Keep the tone simple, clear, and helpful — this is for learners, not native speakers.
- Do not invent words, forms, or synonyms that don't exist.

Example:
Input: "go"
Output:
{{
  "word": "go",
  "meaning": "to move from one place to another",
  "explanation": "Go means to travel or move toward a place. It is one of the most common verbs in English and is used for physical movement as well as changes of state.",
  "verb_form": ["go", "went", "gone", "going"],
  "use_cases": [
    "I go to school every morning.",
    "She went to the market yesterday.",
    "They are going to the park now."
  ],
  "synonyms": ["move", "travel", "depart"]
}}

Example for a non-verb:
Input: "happy"
Output:
{{
  "word": "happy",
  "meaning": "feeling or showing pleasure",
  "explanation": "Happy describes a positive emotional state. It is used when someone feels joy, contentment, or satisfaction.",
  "verb_form": [],
  "use_cases": [
    "She felt happy after hearing the news.",
    "The children were happy to play outside."
  ],
  "synonyms": ["glad", "joyful", "cheerful"]
}}
""",
    ),
    ("human", "Word: {word}"),
])

chain = prompt | model


def get_word_summary(word: str) -> WordSummary:
    return chain.invoke({"word": word})