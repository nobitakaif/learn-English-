from langchain_groq import ChatGroq
from dotenv import load_dotenv
from pydantic import BaseModel, Field
from langchain_core.prompts import ChatPromptTemplate


load_dotenv()

class VerbsFormSchema(BaseModel):
    first_form : str = Field(description="this contain first form of the word")
    
    second_form : str = Field(description="this contain second form of the word")
    
    third_form : str = Field(description="this contain third form of the word")
    
    ing_form : str = Field(description="this contain ing form of the word")
    
prompt = ChatPromptTemplate.from_messages([
    (
        "system",
         """
    You are a Helpful machine who always tells verb's form of the given word .

    you don't need to explain anything just give the only verbs form nothing else and if a word does not have any verbs form then put it as it is in all the form
    """
    ),
    (
        "human",
        """
        Word: {word}
        """
    )
])

model = ChatGroq(model="openai/gpt-oss-120b")

verbs_model = prompt | model.with_structured_output(VerbsFormSchema)

# print(verbs_model.invoke("go"))