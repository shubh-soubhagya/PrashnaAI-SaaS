from newspaper import Article
import requests
import random
from bs4 import BeautifulSoup

USER_AGENTS = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:119.0) Gecko/20100101 Firefox/119.0",
]

def scrape_website(url: str) -> str:
    """Scrapes readable text content from a website using a robust method."""

    headers = {"User-Agent": random.choice(USER_AGENTS)}

    try:
        print(f"SCRAPER: Fetching HTML for {url}")

        # 1️⃣ Download raw HTML manually for reliability
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        html = response.text

        # 2️⃣ Try Newspaper3k with manually-set HTML
        article = Article(url)
        article.set_html(html)

        try:
            article.parse()
            text = article.text.strip()
        except Exception as e:
            print("SCRAPER: Newspaper parse error →", e)
            text = ""

        # 3️⃣ If Newspaper content too small, fallback to BeautifulSoup
        if not text or len(text) < 200:
            print("SCRAPER: Using BeautifulSoup fallback")
            soup = BeautifulSoup(html, "html.parser")
            paragraphs = soup.find_all("p")

            text = "\n".join(
                p.get_text().strip() for p in paragraphs if p.get_text().strip()
            )

        # 4️⃣ If still empty → return safe fallback
        if not text or not text.strip():
            print("SCRAPER: FINAL FAIL → No readable content")
            return "No readable content found on this website."

        print(f"SCRAPER: Extracted {len(text)} characters")
        return text[:15000]  # limit to avoid overloading LLM

    except Exception as e:
        print("SCRAPER ERROR:", e)
        return "No readable content found due to scraping error."
