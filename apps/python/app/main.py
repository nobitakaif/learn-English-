from fastapi import FastAPI
from app.api.router import api_router
from fastapi.middleware.cors import CORSMiddleware
from prisma import Prisma
from contextlib import asynccontextmanager
import asyncio
from app.db import db

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Connect once on the app's event loop
    print("LIFESPAN db id:", id(db))
    await db.connect()
    # Quick sanity check (optional but helpful)
    if not db.is_connected():
        raise RuntimeError("Prisma failed to connect on startup")
    yield
    # Shutdown
    if db.is_connected():
        await db.disconnect()


app = FastAPI(
    title="learn english",
    lifespan=lifespan
)


@app.on_event("startup")
async def startup():
    await db.connect()

@app.on_event("shutdown")
async def shutdown():
    if db.is_connected():
        await db.disconnect()




app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api")