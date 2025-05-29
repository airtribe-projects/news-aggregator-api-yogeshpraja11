[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=19666544&assignment_repo_type=AssignmentRepo)


# News Aggregator API

A simple RESTful API for a personalized news aggregator using Node.js, Express.js, bcrypt, and JWT.

## Features

- User registration and authentication
- JWT-based security
- Password hashing with bcrypt
- News fetching from NewsAPI
- Protected routes

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create a `.env` file in the root directory:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/news-aggregator
JWT_SECRET=your-secret-key-change-this
NEWS_API_KEY=your-newsapi-key-here
```

### 3. Get NewsAPI Key
1. Go to [NewsAPI.org](https://newsapi.org/)
2. Sign up for a free account
3. Get your API key
4. Add it to your `.env` file

### 4. Start MongoDB
Make sure MongoDB is running on your system.

### 5. Run the Application
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Endpoints

### Authentication

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### News (Protected Routes)

#### Get Top Headlines
```
GET /api/news
Authorization: Bearer <your-jwt-token>

Query Parameters:
- country: us, gb, ca, etc.
- q: search query
```

#### Search News
```
GET /api/news/search?q=technology
Authorization: Bearer <your-jwt-token>

Query Parameters:
- q: search query (required)
- language: en, es, fr, etc.
```

## Testing the API

### 1. Register a new user
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 3. Get news (use the token from login response)
```bash
curl -X GET http://localhost:3000/api/news \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Project Structure
```
news-aggregator-api/
├── server.js              # Main server file
├── package.json           # Dependencies
├── .env                   # Environment variables
├── models/
│   └── User.js           # User model
├── routes/
│   ├── auth.js           # Authentication routes
│   └── news.js           # News routes
│   └── preferences.js    # Preferences routes
└── middleware/
    └── auth.js           # JWT authentication middleware
```

## Running Tests
```bash
npm test
```

## Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT implementation
- **axios** - HTTP client for external APIs
- **NewsAPI** - External news data source

## License
MIT
