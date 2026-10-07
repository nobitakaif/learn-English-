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
])

structure_model = prompt | llm.with_structured_output(
    WordMeaningOutputSchema
)


