from fastapi.routing import APIRouter
from starlette import status

from app.controllers import article as ctr
from app.models.article import ArticleInput, Article

router = APIRouter()


@router.get("/", status_code=status.HTTP_200_OK)
def list_articles():
    pass


@router.get("/{article_id}", status_code=status.HTTP_200_OK)
def get_article(article_id: str):
    pass


@router.post("/", response_model=Article, status_code=status.HTTP_201_CREATED)
def create_article(article_args: ArticleInput):
    created = ctr.create_article(article_args)
    return created


@router.put("/{article_id}", status_code=status.HTTP_200_OK)
def update_article(article_id: str, article_args: ArticleInput):
    pass


@router.delete("/{article_id}", status_code=status.HTTP_200_OK)
def delete_article(article_id: str):
    pass
