from fastapi import FastAPI


def init_routes(app: FastAPI):
    from .article import router as article_router
    from .auth import router as auth_router

    app.include_router(article_router, prefix="/article", tags=["article"])
    app.include_router(auth_router, prefix="/auth", tags=["auth"])
