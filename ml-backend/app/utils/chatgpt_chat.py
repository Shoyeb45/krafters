# type: ignore
import os
import json
from openai import AzureOpenAI 
import re

# Load environment variables or fallback to default values
endpoint = ""
deployment = "gpt-4.1"
subscription_key = ""

# Print the output in readable JSON format
def chat_with_openAI(userPrompt: str, systemPrompt: str):
    '''
    Function to chat with open-ai-mode gpt-4.1
    '''
    # Initialize Azure OpenAI client
    client = AzureOpenAI(
        azure_endpoint=endpoint,
        api_key=subscription_key,
        api_version="2025-01-01-preview",
    )

    # Prepare the chat prompt
    chat_prompt = [
        {
            "role": "system",
            "content": [
                # {"type": "text", "text": "You are an AI assistant that helps people find information."}
                {"type": "text", "text": systemPrompt}
            ]
        },
        {
            "role": "user",
            "content": [
                {"type": "text", "text": userPrompt}
            ]
        },
        {
            "role": "assistant",
            "content": [
                {"type": "text", "text": "Hello! How can I help you today?"}
            ]
        }
    ]

    # Send the request to the chat model
    response = client.chat.completions.create(
        model=deployment,
        messages=chat_prompt,
        max_tokens=100,
        # max_tokens=4096,  # uncomment this in deployment
        temperature=1,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0,
        stream=False
    )
    
    # print(json.dumps(response.model_dump(), indent=2))
    messageResponse = response.choices[0].message.content
    
    return messageResponse


def format_answer(response: str) -> list[dict]:
    """
    Takes a response string and returns structured quiz data:
    [
        {
            "question": str,
            "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
            "correct_answer": "C. ..."
        },
        ...
    ]
    """
    # Match blocks starting with **Question**
    question_blocks = re.split(r"\n---+\n", response.strip())
    quiz_items = []

    for block in question_blocks:
        # Extract question
        q_match = re.search(r"\*\*Question \d+:?\*\*\s*(.*?)\s*\nA[)\.]", block, re.DOTALL)
        if not q_match:
            continue
        question = q_match.group(1).strip()

        # Extract options A) to D)
        option_matches = re.findall(
            r"([A-D])[)\.] ?(.*?)(?=\n[A-D][)\.]|\n\*\*Correct Answer|\Z)", block, re.DOTALL
        )
        options = [f"{letter}. {text.strip()}" for letter, text in option_matches]

        # Extract correct answer
        correct_match = re.search(r"\*\*Correct Answer:\*\*\s*([A-D])[)\.] ?(.*)", block)
        if correct_match:
            correct_letter = correct_match.group(1).strip()
            correct_text = correct_match.group(2).strip()
            correct_answer = f"{correct_letter}. {correct_text}"
        else:
            correct_answer = ""

        quiz_items.append({
            "question": question,
            "options": options,
            "correct_answer": correct_answer
        })

    return quiz_items

