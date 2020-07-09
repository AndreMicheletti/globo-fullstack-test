from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import RedirectResponse

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
]

def create_app():
    from app.routes import init_routes
    import db

    app = FastAPI()
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    init_routes(app)
    db.initialize_database()

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
