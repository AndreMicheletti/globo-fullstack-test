from fastapi import FastAPI


def init_routes(app: FastAPI):
    from .article import router as article_router

    app.include_router(article_router, prefix="/article", tags=["article"])
