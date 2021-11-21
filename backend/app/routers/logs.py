from typing import Optional
from fastapi import APIRouter
import datetime
import random
import time


router = APIRouter(
    prefix="/log",
    tags=["Logs"],
    responses={404: {"description": "Log not found"}},
)

fake_logs_db = {
    1: {
        "log_id": "1",
        "log_status": "G",
        "log_text": "Test log #1",
        "user_id": "1",
        "user_name": "Teasel",
        "trig_id": "10077",
        "trig_name": "Android Test Trig",
        "waypoint": "TP10077",
        "log_timestamp": str(int(datetime.datetime.strptime("14/06/1971", "%d/%m/%Y").timestamp())),
        "upd_timestamp": str(datetime.datetime.now().timestamp() - random.randrange(100000000)),
        "extra": "Something new"
        },
    2: {
        "log_id": "2",
        "log_status": "S",
        "log_text": "Test log #2",
        "user_id": "1",
        "user_name": "Teasel",
        "trig_id": "1",
        "trig_name": "Test trig #1",
        "waypoint": "TP0001",
        "log_timestamp": str(int(datetime.datetime.strptime("14/06/1971", "%d/%m/%Y").timestamp())),
        "upd_timestamp": str(datetime.datetime.now().timestamp() - random.randrange(100000000)),
        },
    3: {
        "log_id": "3",
        "log_status": "X",
        "log_text": "Test log #3",
        "user_id": "1",
        "user_name": "Teasel",
        "trig_id": "2",
        "trig_name": "Test trig #2",
        "waypoint": "TP0002",
        "log_timestamp": str(int(datetime.datetime.strptime("14/06/1971", "%d/%m/%Y").timestamp())),
        "upd_timestamp": str(datetime.datetime.now().timestamp() - random.randrange(100000000)),
        },
    4: {
        "log_id": "4",
        "log_status": "D",
        "log_text": "Test log #4",
        "user_id": "411",
        "user_name": "peregrinus",
        "trig_id": "22402",
        "trig_name": "The Quarry",
        "waypoint": "TP22402",
        "log_timestamp": str(int(datetime.datetime.strptime("21/11/2021", "%d/%m/%Y").timestamp())),
        "upd_timestamp": str(datetime.datetime.now().timestamp() - random.randrange(100000000)),
        },
}

@router.get("/recent")
def get_recent(limit: Optional[int] = 20, offset: Optional[int] = 0):
    time.sleep(1)
    return list(fake_logs_db.values())[offset : offset+limit]


@router.get("/{log_id}")
def get_log(log_id: int):
    return fake_logs_db[log_id]



