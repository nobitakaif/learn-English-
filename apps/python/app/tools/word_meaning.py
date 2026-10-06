from langchain_groq import  ChatGroq
from dotenv import load_dotenv

load_dotenv()


llm = ChatGroq(model="openai/gpt-oss-120b")

# print(llm.invoke("hi how are you").content)

async def chat(user_id : str) : 
    res =  await llm.invoke("what do you think about AI")
    return {
        "res" : res.content,
        user_id :  user_id
    }

