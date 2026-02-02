

import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

groq_client = Groq(api_key=os.getenv("GROQ_API_KEY"))

MAX_CONTEXT_CHARS = 8000

def ask_groq(website_content: str, user_message: str) -> str:
    trimmed_content = website_content[:MAX_CONTEXT_CHARS]

    system_prompt = (
        "You are Prashna AI, a website question-answering system. "
        "Answer questions strictly using the provided website content within Maximum 600 words. "
        "If the answer is not found, say: "
        "'I couldn't find this information on the website.' "
        "Always respond in clean Markdown format."
        "DONT respond in Tables."
    )

    user_prompt = f"""
Website Content:
--------------------
{trimmed_content}
--------------------

User Question:
{user_message}
"""

    response = groq_client.chat.completions.create(
        model="openai/gpt-oss-120b",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        temperature=0.2,
        max_tokens=2000   # ⬅ enough for structured answers
    )

    return response.choices[0].message.content.strip()
