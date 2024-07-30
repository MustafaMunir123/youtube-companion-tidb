import requests
from django.conf import settings

def get_embeddings(text, model="jina-clip-v1", embedding_type="float"):
    url = 'https://api.jina.ai/v1/embeddings'
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {settings.JINA_AI_API_KEY}'
    }

    data = {
        "model": model,
        "embedding_type": embedding_type,
        "input": [{"text": text}]
    }
    response = requests.post(url, headers=headers, json=data)
    json_response = response.json()
    if "data" in json_response:
        data = json_response["data"]
        if len(data) > 0:
            first_object = data[0]
            first_object_embedding = first_object["embedding"]
            return first_object_embedding
    print("unable to generate embedding")
    return []

# # Example usage
# result = get_embeddings("A blue bat with rat")
# print(result)
