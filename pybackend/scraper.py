


from newspaper import Article
import requests
import random
from bs4 import BeautifulSoup

USER_AGENTS = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:119.0) Gecko/20100101 Firefox/119.0",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
    "Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0 Mobile Safari/537.36",
]

def build_headers():
    return {
        "User-Agent": random.choice(USER_AGENTS),
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Connection": "keep-alive",
        "Upgrade-Insecure-Requests": "1",
        "Referer": "https://www.google.com/",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "cross-site",
        "Sec-Fetch-User": "?1",
    }

def scrape_website(url: str) -> str:
    """Scrapes readable text content from a website using a robust method."""

    try:
        print(f"SCRAPER: Fetching HTML for {url}")

        session = requests.Session()
        session.headers.update(build_headers())

        response = session.get(url, timeout=10)

        if response.status_code in [403, 429]:
            print(f"SCRAPER BLOCKED: {response.status_code}")
            return "This website restricts automated access."

        response.raise_for_status()
        html = response.text

        # --- Newspaper3k parsing ---
        article = Article(url)
        article.set_html(html)

        try:
            article.parse()
            text = article.text.strip()
        except Exception as e:
            print("SCRAPER: Newspaper parse error →", e)
            text = ""

        # --- BeautifulSoup fallback ---
        if not text or len(text) < 200:
            print("SCRAPER: Using BeautifulSoup fallback")
            soup = BeautifulSoup(html, "html.parser")
            paragraphs = soup.find_all("p")

            text = "\n".join(
                p.get_text().strip()
                for p in paragraphs
                if p.get_text() and p.get_text().strip()
            )

        # --- Final validation ---
        if not text or not text.strip():
            print("SCRAPER: FINAL FAIL → No readable content")
            return "No readable content found on this website."

        print(f"SCRAPER: Extracted {len(text)} characters")
        return text[:15000]

    except Exception as e:
        print("SCRAPER ERROR:", e)
        return "No readable content found due to scraping error."
