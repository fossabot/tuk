from fastapi import FastAPI, Depends, Security
from fastapi_auth0 import Auth0, Auth0User
from fastapi.middleware.cors import CORSMiddleware

from .routers import trigs, logs

from dotenv import load_dotenv

import uvicorn
import os


load_dotenv()

auth = Auth0(domain=os.getenv('AUTH0_DOMAIN'), api_audience=os.getenv('AUTH0_AUDIENCE'), scopes={'admin': 'Administrators'})

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
    "https://trigpointing.me",
    "https://trigpointing.uk",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(trigs.router)
app.include_router(logs.router)


@app.get("/")
async def root():
    return {"message": "Hello again"}

@app.get("/secure", dependencies=[Depends(auth.implicit_scheme)])
def get_secure(user: Auth0User = Security(auth.get_user)):
    return {"user": user}



@app.get("/admin", dependencies=[Depends(auth.implicit_scheme)])
def get_admin(user: Auth0User = Security(auth.get_user, scopes=['admin'])):
    return {"user": user}










if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
