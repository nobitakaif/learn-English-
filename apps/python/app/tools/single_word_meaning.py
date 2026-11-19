from langchain_groq import ChatGroq
from dotenv import load_dotenv
from pydantic import BaseModel, Field
from langchain_core.prompts import ChatPromptTemplate

load_dotenv()

llm = ChatGroq(model="openai/gpt-oss-120b")

class Item(BaseModel) :
    word : str = Field(description="Actual word, which should not be changed")
    meaning : str = Field(description="A original meaning of the word, learner-friendly definition of the word ")
    
class ItemList(BaseModel):
    items : list[Item] = Field(description="One Item per input word, in the same order")

prompt =  ChatPromptTemplate.from_messages([
    (
        "system",
        """Your are an English Dictionary assistant for a learning platform.
        For each input word, return one Item,
        - word : the word itself, unchanged
        - meaning : this would be actual meaning of the word
        
        Examples : 
        - input = ['able', 'push', 'arrived', 'come', 'response']
        - output = [
            {{"word" : "able","meaning" : "kabil"}},
            {{"word" : "push", "meaning" : "dhakka dena"}},
            {{"word":"arrived", "meaning":"pahuchna"}},
            {{"word" : "come", "meaning" : "andar aana"}},
            {{"word":"response","meaning" : "jawaba dena ya partikriya" }}
            ]
        
        """
    ),(
        "human", "Words: {words}"
    )
])


structure_output = llm.with_structured_output(ItemList)

chain = prompt | structure_output

# result : ItemList = chain.invoke({"words" : ["able", "bridge","common"]})

# print(result)                                # pretty ItemList
# print(result.model_dump())                   # dict
# print(result.model_dump_json(indent=2))      # JSON string
# print(result.items)                          # list of Item objects
# print(result.items[0].word)                  # "able"
# print(result.items[0].meaning)
