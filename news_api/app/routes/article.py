from typing import List

from fastapi.exceptions import HTTPException
from fastapi.routing import APIRouter
from starlette import status

from app.controllers import article as ctr
from app.models.article import ArticleInput, Article

router = APIRouter()


@router.get("/", response_model=List[Article], status_code=status.HTTP_200_OK)
def list_articles():
    return ctr.get_all_articles()


@router.get("/{article_id}", response_model=Article, status_code=status.HTTP_200_OK)
def get_article(article_id: str):
    article = ctr.get_article_by_id(article_id)
    if not article:
        raise HTTPException(404, detail="Article not found with this id")
    return article


@router.post("/", response_model=Article, status_code=status.HTTP_201_CREATED)
def create_article(article_args: ArticleInput):
    created = ctr.create_article(article_args)
    return created


@router.put("/{article_id}", response_model=Article, status_code=status.HTTP_200_OK)
def update_article(article_id: str, article_args: ArticleInput):
    updated = ctr.update_article_by_id(article_id, article_args)
    if not updated:
        raise HTTPException(404, detail="Article not found with this id")
    return updated


@router.delete("/{article_id}", status_code=status.HTTP_200_OK)
def delete_article(article_id: str):
    deleted = ctr.delete_article_by_id(article_id)
    if not deleted:
        raise HTTPException(404, detail="Article not found with this id")
    return {"deleted": True}
