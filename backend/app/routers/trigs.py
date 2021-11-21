from fastapi import APIRouter
import time

router = APIRouter(
    prefix="/trig",
    tags=["Trigs"],
    responses={404: {"description": "Trigpoint not found"}},
)

fake_trigs_db = {1: {"name": "Test trig #1"}, 2: {"name": "Another test trig"}}


@router.get("/{trigid}")
def get_trig(trigid: int):
    if trigid % 2: time.sleep(1)
    return {"trigid":trigid, "name":fake_trigs_db[trigid]["name"]}




