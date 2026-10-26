from langchain_community.document_loaders import PyPDFLoader
from langchain_groq import ChatGroq
from dotenv import load_dotenv

load_dotenv()

model = ChatGroq(model="openai/gpt-oss-120b")

loader = PyPDFLoader("https://proceedings.neurips.cc/paper_files/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf")

docs = loader.load()[0].page_content

print(model.invoke('summarize this in simple word just like a 10 year old child and use real life examples ' + docs).content)

# print(docs.page_content)