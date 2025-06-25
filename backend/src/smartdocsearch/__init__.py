from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .api.response_service import router as output_router
from .api.upload import router as upload_router
from .api.list_collections import router as list_collections_router
from .utils.load_env import load_env

# Initialize the FastAPI app
app = FastAPI()

# Load environment variables

load_env()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload_router)
app.include_router(output_router)
app.include_router(list_collections_router)
