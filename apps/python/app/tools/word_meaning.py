from langchain_groq import ChatGroq
from dotenv import load_dotenv
from pydantic import BaseModel,Field
from langchain_core.prompts import ChatPromptTemplate 
from enum import StrEnum

load_dotenv()

llm = ChatGroq(model="openai/gpt-oss-120b")


class SupportNativeLanguage(StrEnum) :
    ENGLISH = "eng"
    HINDI = "hin"
    HINGLISH = "hinglish" 

class WordMeaningOutputSchema(BaseModel):
    word : str
    meaning : str
    native_language: SupportNativeLanguage = SupportNativeLanguage.HINGLISH
    summarize_in_native_language: str 
    synonyms : list[str] = Field(..., min_length=2, max_length=5)


prompt = ChatPromptTemplate.from_messages([
    (
        "system",
         """
    You are a word-meaning generation system.

    Your ONLY job is to explain the English word provided by the user.

    Rules:
    - Explain only the provided English word.
    - Give a simple English meaning.
    - Give 2 to 5 English synonyms.
    - Give a simple explanation in the requested native language.
    - Return only the fields defined in the output schema.
    - Do not provide greetings.
    - Do not provide introductions.
    - Do not provide conclusions.
    - Do not provide unrelated information.
    - Do not perform tasks unrelated to word meanings.

    IMPORTANT LANGUAGE RULES:

    If native_language is "eng":
    - Write the native-language explanation entirely in English.

    If native_language is "hin":
    - Write the native-language explanation entirely in Hindi.
    - Hindi script is allowed.

    If native_language is "hinglish":
    - DO NOT use Devanagari/Hindi script.
    - DO NOT write formal Hindi.
    - DO NOT translate the sentence completely into Hindi.
    - Use Roman/English letters only.
    - Use a natural combination of Hindi and English, like the way Indians commonly speak casually.
    - Keep important English words in English.
    - The result should sound like spoken Hinglish, NOT translated Hindi.

    Examples of correct Hinglish:
    - "Beautiful ka matlab hota hai bahut sundar ya dekhne mein achha."
    - "Brave ka matlab hai kisi difficult situation mein bhi darna nahi."
    - "Honest ka matlab hai hamesha sach bolna aur kisi ko deceive na karna."
    - "Improve ka matlab hai kisi cheez ko aur better banana."

    Examples of INCORRECT Hinglish:
    - "सुंदर का अर्थ बहुत अच्छा दिखने वाला है।"
    - "सुंदर का मतलब अत्यंत मनोहर होता है।"
    - "सुंदर वह है जो देखने में आकर्षक हो।"

    Never use Devanagari when native_language is "hinglish".
    """
    ),
    (
        "human",
        """
        Word: {word}
        Native language: {native_language}
        """
    )
]   )

structure_model = prompt | llm.with_structured_output(
    WordMeaningOutputSchema
)


llm2 = ChatGroq(model="openai/gpt-oss-120b")


prompt2 = ChatPromptTemplate.from_messages([(
        "system",
        """
        You are an English vocabulary dataset generator.

        The user will provide one English alphabet letter.

        Generate valid English words that begin with that letter.

        Requirements:
        - Return words only, not meanings or sentences.
        - three_word: exactly 3 letters per word.
        - four_word: exactly 4 letters per word.
        - five_word: exactly 5 letters per word.
        - six_word: exactly 6 letters per word.
        - seven_and_more: at least 7 letters per word.
        - Aim for 100 words in each category.
        - Use real, commonly recognized English words.
        - Avoid duplicates, proper nouns, abbreviations, and misspellings.
        - Use lowercase spelling.
        - Do not invent words to reach the requested count.
        - Return only the requested structured output.
        - Each words should be used in our daily life
         
        """
    ),
    ("human", "Generate vocabulary beginning with the letter: {letter}")
])

from pydantic import BaseModel, Field


class WordSchema(BaseModel):
    three_word: list[str] = Field(
        description="English words containing exactly 3 letters"
    )
    four_word: list[str] = Field(
        description="English words containing exactly 4 letters"
    )
    five_word: list[str] = Field(
        description="English words containing exactly 5 letters"
    )
    six_word: list[str] = Field(
        description="English words containing exactly 6 letters"
    )
    seven_and_more: list[str] = Field(
        description="English words containing 7 or more letters"
    )
 
model2 = prompt2 | llm2.with_structured_output(WordSchema, method="json_schema") 

# result =  model2.invoke({"letter": "a"})

# print(result.three_word)
# print(result.four_word)