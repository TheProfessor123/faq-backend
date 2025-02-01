# FAQ Backend

## Description
A multilingual FAQ backend built with Express.js, MongoDB, and Redis. This project offers a REST API to create and retrieve FAQs with multi-language translation. The API has been tested using Postman and is deployed on Vercel.

## Features
- **Multilingual Support:** Automatically translates FAQ questions and answers using Google Translate API. FAQs are stored along with translations and fallback to English when needed.
- **Caching:** Redis is used to cache API responses, which improves retrieval performance.
- **REST API:** Endpoints for creating and fetching FAQs, with support for language selection via the `?lang=` query parameter.

## Installation

### Prerequisites
- [Node.js](https://nodejs.org/) v14 or higher
- [MongoDB](https://www.mongodb.com/)
- [Redis](https://redis.io/)

### Clone the Repository
```bash
git clone https://github.com/TheProfessor123/faq-backend.git
cd faq-backend
```

### Environment Setup
Create a .env file in the FAQ-Backend directory using the following example (adjust values as necessary):
```env
REDIS_USERNAME=default
REDIS_PASSWORD=your_redis_password
REDIS_HOST=your_redis_host
REDIS_PORT=your_redis_port
MONGODB_URI=your_mongodb_connection_string
PORT=3000
```

### Install Dependencies
```bash
npm install
```

## Running the Application

### Start the Server
```bash
npm start
```
The server will start on the port defined in your .env file (default: `3000`). Once started, you'll see logs confirming connection to MongoDB and Redis.

## API Usage

### Create a FAQ
Send a POST request to create a new FAQ. If a language other than English is provided, the question and answer are automatically translated.
- **Endpoint:** `POST /api/faqs`
- **Request Body Example:**
```json
{
  "question": "What is Node.js?",
  "answer": "Node.js is a JavaScript runtime built on Chrome's V8 engine.",
  "lang": "hi" // optional; if provided and not 'en', translation will be performed
}
```

### Retrieve FAQs
Send a GET request to fetch all FAQs. You can choose a specific language using the lang query parameter.
- **Endpoint:** `GET /api/faqs`
- **Examples:**
```bash
http://localhost:3000/api/faqs/
http://localhost:3000/api/faqs/?lang=hi
http://localhost:3000/api/faqs/?lang=bn
```

You can also try the deployed API on Vercel:
```
https://bharatfd-backend.vercel.app/api/faqs
```

## Testing
This project has been tested using Postman.

## License
This project is licensed under the ISC License.
