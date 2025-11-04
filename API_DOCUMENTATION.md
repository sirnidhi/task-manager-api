# Task Manager API Documentation

## Base URL
```
http://localhost:3001/api
```

## Authentication
All protected endpoints require JWT token in header:
```
Authorization: Bearer <your_jwt_token>
```

## Endpoints

### 🔐 Authentication

#### Register User
```http
POST /auth/signup
```

**Request Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "message": "User created successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "673abc123...",
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

#### Login User
```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "673abc123...",
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

### 📝 Task Management

#### Get All Tasks
```http
GET /tasks
```

**Query Parameters:**
- `status` - Filter by status (pending, in-progress, completed)
- `priority` - Filter by priority (low, medium, high)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `sortBy` - Sort field (default: createdAt)
- `sortOrder` - Sort direction: asc/desc (default: desc)

**Example:**
```http
GET /tasks?status=pending&priority=high&page=1&limit=5&sortBy=dueDate&sortOrder=asc
```

**Response (200):**
```json
{
  "tasks": [
    {
      "_id": "673abc123...",
      "title": "Complete API Documentation",
      "description": "Write comprehensive API docs",
      "status": "pending",
      "priority": "high",
      "dueDate": "2024-12-31T00:00:00.000Z",
      "userId": "672def456...",
      "createdAt": "2024-11-04T14:30:00.000Z",
      "updatedAt": "2024-11-04T14:30:00.000Z"
    }
  ],
  "totalPages": 3,
  "currentPage": 1,
  "total": 25
}
```

#### Create Task
```http
POST /tasks
```

**Request Body:**
```json
{
  "title": "Complete Project",
  "description": "Finish the task manager API",
  "priority": "high",
  "dueDate": "2024-12-31",
  "status": "pending"
}
```

**Response (201):**
```json
{
  "message": "Task created successfully",
  "task": {
    "_id": "673abc123...",
    "title": "Complete Project",
    "description": "Finish the task manager API",
    "status": "pending",
    "priority": "high",
    "dueDate": "2024-12-31T00:00:00.000Z",
    "userId": "672def456...",
    "createdAt": "2024-11-04T14:30:00.000Z",
    "updatedAt": "2024-11-04T14:30:00.000Z"
  }
}
```

#### Get Single Task
```http
GET /tasks/:id
```

**Response (200):**
```json
{
  "_id": "673abc123...",
  "title": "Complete Project",
  "description": "Finish the task manager API",
  "status": "pending",
  "priority": "high",
  "dueDate": "2024-12-31T00:00:00.000Z",
  "userId": "672def456...",
  "createdAt": "2024-11-04T14:30:00.000Z",
  "updatedAt": "2024-11-04T14:30:00.000Z"
}
```

#### Update Task
```http
PUT /tasks/:id
```

**Request Body:**
```json
{
  "status": "completed",
  "priority": "medium"
}
```

**Response (200):**
```json
{
  "message": "Task updated successfully",
  "task": {
    "_id": "673abc123...",
    "title": "Complete Project",
    "description": "Finish the task manager API",
    "status": "completed",
    "priority": "medium",
    "dueDate": "2024-12-31T00:00:00.000Z",
    "userId": "672def456...",
    "createdAt": "2024-11-04T14:30:00.000Z",
    "updatedAt": "2024-11-04T15:45:00.000Z"
  }
}
```

#### Delete Task
```http
DELETE /tasks/:id
```

**Response (200):**
```json
{
  "message": "Task deleted successfully"
}
```

### 📊 Analytics

#### Get Task Statistics
```http
GET /tasks/stats
```

**Response (200):**
```json
{
  "total": 25,
  "byStatus": [
    { "_id": "completed", "count": 10 },
    { "_id": "pending", "count": 12 },
    { "_id": "in-progress", "count": 3 }
  ],
  "byPriority": [
    { "_id": "high", "count": 5 },
    { "_id": "medium", "count": 15 },
    { "_id": "low", "count": 5 }
  ]
}
```

## Error Responses

### 400 Bad Request
```json
{
  "errors": [
    {
      "msg": "Title is required",
      "param": "title",
      "location": "body"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "message": "Access denied. No token provided."
}
```

### 404 Not Found
```json
{
  "message": "Task not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Server error",
  "error": "Database connection failed"
}
```

## Data Models

### User Model
```javascript
{
  _id: ObjectId,
  username: String (required, unique),
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Task Model
```javascript
{
  _id: ObjectId,
  title: String (required),
  description: String,
  status: String (enum: ['pending', 'in-progress', 'completed']),
  priority: String (enum: ['low', 'medium', 'high']),
  dueDate: Date,
  userId: ObjectId (required, ref: 'User'),
  createdAt: Date,
  updatedAt: Date
}
```

## Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error