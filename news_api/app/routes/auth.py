from datetime import timedelta

from fastapi import Depends, HTTPException, status
from fastapi.routing import APIRouter
from fastapi.security import OAuth2PasswordRequestForm

from app.controllers.user import create_user
from app.models.user import UserOut, UserIn
from auth import (
    ACCESS_TOKEN_EXPIRE_MINUTES,
    Token,
    authenticate_user,
    create_access_token,
)

router = APIRouter()


@router.post("/", response_model=UserOut)
async def create_user_route(user_param: UserIn):
    """
    Creates a new user in the database
    """
    from pymongo.errors import DuplicateKeyError
    try:
        user = await create_user(user_param)
    except DuplicateKeyError as e:
        raise HTTPException(422, detail="this username already exists")
    return user


@router.post("/token", response_model=Token)
async def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends()
):
    """
    Login a user and receive Bearer token
    """
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}
