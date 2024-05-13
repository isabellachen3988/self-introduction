# PERSONAL CHATBOT - SERVER

# Environment Variables

Firstly create a .env file and add in a valid OpenAi key

```bash
PORT=5002
OPENAI_API_KEY=YOUR_KEY_HERE

```

# Ollama

https://ollama.com/download

# Cannot find llama3 from ollama?

run `ollama run llama3:latest`

# Ensure Google Cloud CLI is installed if we are using VertexAI

1. Download: https://cloud.google.com/sdk/docs/install
2. Ensure that `gcloud` command is accessible in terminal
3. gcloud auth application-default login


# Get running locally

Install dependencies and start up the server

```bash
npm install

npm run dev
```

Once the above is complete the server will be running on port 5002

