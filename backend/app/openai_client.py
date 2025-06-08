import os
import openai

openai.api_key = os.getenv("OPENAI_API_KEY")

def generate_coupon_code(store_name: str, discount: float) -> str:
    prompt = (
        f"Generate a unique, catchy coupon code for {store_name} "
        f"offering {discount}% discount. The code should be uppercase, "
        "without spaces or special characters."
    )

    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=prompt,
        max_tokens=10,
        temperature=0.7,
    )

    code = response.choices[0].text.strip().replace(" ", "")
    return code

def ai_match_coupon(query: str, coupon_codes: list[str]) -> str:
    prompt = f"""
Given the user input: "{query}"
And the list of valid coupon codes: {coupon_codes}
Return the best matching coupon code or 'None' if no match.
"""

    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=prompt,
        max_tokens=10,
        temperature=0.2,
    )

    match = response.choices[0].text.strip()
    return match
