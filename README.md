# SmartDocSearch

# SmartDocSearch

- Provides a smart document search API built with FastAPI.
- Allows users to upload PDF documents, which are then processed and indexed.
- Core functionality revolves around creating and querying vector stores using ChromaDB.
- Uploaded documents are split into chunks, and embeddings are generated using HuggingFace models.
- Leverages Google's Gemini 1.5 Flash LLM for question answering.
- Implements a RAG (Retrieval-Augmented Generation) chain for context-aware responses.
- Offers API endpoints for uploading files, listing collections, and querying documents.
- CORS is enabled for cross-origin requests.
- Environment variables are loaded using `dotenv`.
- Aims to provide a robust and efficient document search and question-answering solution.

## Things not implemented yet
 - [] User authentication and authorization
 - [] Document deletion and update functionality
 - [] Advanced search filters and sorting options
 - [] Changing Model to Gemini 2.0 flash

## Clone the repository
`git clone https://github.com/yourusername/SmartDocSearch.git`

## Set Up Environment variables
inside `/backend/src/smartdocsearch` directory
create .env file and add the following variables:
```
GOOGLE_API_KEY=your_api_key
```

## steps to set up the project fron docker
### make sure you have docker installed
```
docker-compose up -d
```

## steps to set up the project fron scratch
### Install dependencies for the frontend
```
cd SmartDocSearch
cd frontend
npm install
npm run dev
```

### Install dependencies for the backend

```
cd ..
cd backend
uv sync
uv run -m uvicorn smartdocsearch:app
```


## Things not implemented yet
 - [] User authentication and authorization
 - [] Document deletion and update functionality
 - [] Advanced search filters and sorting options
 - [] Changing Model to Gemini 2.0

## Clone the repository
`git clone https://github.com/yourusername/SmartDocSearch.git`

## Set Up Environment variables
inside `/backend/src/smartdocsearch` directory
create .env file and add the following variables:
```
GOOGLE_API_KEY=your_api_key
```

## steps to set up the project fron docker
### make sure you have docker installed
```
docker-compose up -d
```

## steps to set up the project fron scratch
### Install dependencies for the frontend
```
cd SmartDocSearch
cd frontend
npm install
npm run dev
```

### Install dependencies for the backend

```
cd ..
cd backend
uv sync
uv run -m uvicorn smartdocsearch:app
```
