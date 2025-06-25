from fastapi import APIRouter
from ..utils.vector_store import list_vector_stores

router = APIRouter()

@router.get("/collections")
async def list_collections():
    try:
        collections = await list_vector_stores()
        return {"collections": collections}
    except Exception as e:
        print(f"error: {str(e)}")
        return {"collections": []}
