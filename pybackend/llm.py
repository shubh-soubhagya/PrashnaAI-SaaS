import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

groq_client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def ask_groq(website_content: str, user_message: str) -> str:
    """Send prompt to Groq LLM."""

    prompt = f"""
You are **Prashna AI**, a website question-answering system.

Here is all the content extracted from the website:
--------------------
{website_content}
--------------------

User Question:
{user_message}

Instructions:
- Answer strictly based on the website content.
- If the answer is not found, say: "I couldn't find this information on the website."
"""

    response = groq_client.chat.completions.create(
        model="openai/gpt-oss-120b",    # you can change model
        messages=[{"role": "user", "content": prompt}],
        temperature=0.2,
        max_tokens=400
    )

    return response.choices[0].message.content

