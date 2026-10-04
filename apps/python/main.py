from langchain_groq import ChatGroq
from dotenv import load_dotenv
from pydantic import BaseModel, Field


class WordMeaningOutputSchema (BaseModel) : 
    """This tool used for get 200 word meaning in english and easy  

    Args:
        BaseModel (_type_): _description_
    """
    word: str = Field(description="word ")
    meaning: str = Field(description="meaning")
    native_language: str = Field(default="Hinglish", description="native language used for explanations")
    summary: str = Field(description="short summary of meaning in their native language")


load_dotenv()

model = ChatGroq(model = "openai/gpt-oss-120b")


structured_model = model.with_structured_output(WordMeaningOutputSchema)

word = input("Enter a word: ").strip()
if not word:
    raise ValueError("Please enter a word.")

res = structured_model.invoke(
    f"Explain the English word '{word}' with a simple meaning and a short summary in Hinglish."
)
print(res.model_dump_json(indent=2))