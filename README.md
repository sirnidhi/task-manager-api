# Task Manager API

## **Role:**
You are an expert Node.js backend developer specializing in RESTful API development and task management systems.

## **Objective:**
Create a comprehensive Task Management System API with CRUD operations, user-specific tasks, due dates, status updates, pagination, and filtering capabilities.

## **Context:**
Building a scalable task management backend that allows users to create, manage, and track their tasks with proper authentication and authorization.

## **Instructions:**

### **Instruction 1: Project Setup**
- Initialize Node.js project with Express.js framework
- Set up MongoDB database connection
- Configure JWT authentication middleware
- Create proper project structure with models, routes, controllers, and middleware

### **Instruction 2: Task Model & CRUD Operations**
- Create Task schema with fields: title, description, status, priority, dueDate, userId, createdAt, updatedAt
- Implement full CRUD operations (Create, Read, Update, Delete) for tasks
- Ensure tasks are user-specific and properly validated

### **Instruction 3: Advanced Features**
- Add pagination support for task listing
- Implement filtering by status, priority, and due date
- Add sorting capabilities
- Include task statistics and analytics endpoints

## **Notes:**
• Use JWT for authentication and authorization
• Implement proper error handling and validation
• Add comprehensive API documentation
• Include status tracking (pending, in-progress, completed)
• Support priority levels (low, medium, high)
• Ensure proper database indexing for performance

## Features
- ✅ User authentication & authorization
- ✅ CRUD operations for tasks
- ✅ User-specific task management
- ✅ Due dates & status tracking
- ✅ Priority levels (low, medium, high)
- ✅ Pagination & filtering
- ✅ Task statistics & analytics
- ✅ Comprehensive API documentation

## Installation

```bash
npm install
```

## Environment Setup
Create `.env` file with:
```
PORT=3001
MONGODB_URI=mongodb://localhost:27017/task_manager
JWT_SECRET=your_super_secret_jwt_key_for_tasks
JWT_EXPIRES_IN=7d
```

## Start Server
```bash
npm start
# or for development
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

### Task Management
- `GET /api/tasks` - Get user's tasks (with pagination & filtering)
- `POST /api/tasks` - Create new task
- `GET /api/tasks/:id` - Get specific task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Task Analytics
- `GET /api/tasks/stats` - Get task statistics
- `GET /api/tasks/analytics` - Get detailed analytics

## API Usage Examples

### Create Task
```bash
curl -X POST http://localhost:3001/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"title":"Complete project","description":"Finish the task manager API","priority":"high","dueDate":"2024-12-31","status":"pending"}'
```

### Get Tasks with Filtering
```bash
curl -X GET "http://localhost:3001/api/tasks?status=pending&priority=high&page=1&limit=10" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Update Task Status
```bash
curl -X PUT http://localhost:3001/api/tasks/TASK_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"status":"completed"}'
```

### Get Task Statistics
```bash
curl -X GET http://localhost:3001/api/tasks/stats \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```