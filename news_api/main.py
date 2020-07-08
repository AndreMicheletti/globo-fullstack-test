from fastapi import FastAPI
from starlette.responses import RedirectResponse


def create_app():
    app = FastAPI()

    @app.get("/", include_in_schema=False)
    def index():
        return RedirectResponse(url="/docs")

    @app.get("/alive")
    def alive():
        return {"message": "Hello World"}

    return app


app = create_app()


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app)