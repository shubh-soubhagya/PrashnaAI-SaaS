
# from fastapi import FastAPI, HTTPException
# from pydantic import BaseModel
# from scraper import scrape_website
# from llm import ask_groq
# from fastapi.middleware.cors import CORSMiddleware

# app = FastAPI(title="Prashna AI — AI Service")

# # Allow local frontend + backend CORS
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # ---- FIXED MODELS ----
# class AskRequest(BaseModel):
#     websiteContent: str     # <-- node backend sends this
#     message: str

# class ScrapeRequest(BaseModel):
#     websiteUrl: str


# @app.get("/")
# def root():
#     return {"message": "Prashna AI FastAPI Running"}


# # ---- FIXED ASK ENDPOINT ----
# @app.post("/ask")
# def ask(req: AskRequest):

#     if not req.websiteContent.strip():
#         raise HTTPException(status_code=422, detail="websiteContent cannot be empty")

#     if not req.message.strip():
#         raise HTTPException(status_code=422, detail="message cannot be empty")

#     # 🚀 no scraping happening here anymore
#     ai_answer = ask_groq(req.websiteContent, req.message)

#     return {
#         "answer": ai_answer
#     }


# # ---- SCRAPE ENDPOINT (used only ONCE per chat) ----
# @app.post("/scrape")
# def scrape(req: ScrapeRequest):
#     content = scrape_website(req.websiteUrl)
#     return {"content": content}



from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from scraper import scrape_website
from llm import ask_groq
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Prashna AI — AI Service")

# Allow local frontend + backend CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# Request Models
# -----------------------------
class AskRequest(BaseModel):
    websiteContent: str
    message: str

class ScrapeRequest(BaseModel):
    websiteUrl: str


@app.get("/")
def root():
    return {"message": "Prashna AI FastAPI Running"}


# -----------------------------
# ASK (NO SCRAPING HERE)
# -----------------------------
@app.post("/ask")
def ask(req: AskRequest):

    if not req.websiteContent.strip():
        raise HTTPException(status_code=422, detail="websiteContent cannot be empty")

    if not req.message.strip():
        raise HTTPException(status_code=422, detail="message cannot be empty")

    answer = ask_groq(req.websiteContent, req.message)

    return {
        "answer": answer
    }


# -----------------------------
# SCRAPE (ONLY ONCE)
# -----------------------------
@app.post("/scrape")
def scrape(req: ScrapeRequest):
    result = scrape_website(req.websiteUrl)

    if isinstance(result, dict):
        content = result.get("content", "")
        if not content or not content.strip() or "No readable content" in content:
            return {"content": "", "title": ""}
        return result
    
    # Fallback if scraper returns string (legacy)
    return {"content": result, "title": "Untitled"}

