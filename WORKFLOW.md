# Task Manager API - Complete Workflow Documentation

## 🔄 **System Architecture Flow**

```
Client Request → Express Server → Middleware → Controller → Database → Response
```

## 📋 **1. User Registration Workflow**

```mermaid
graph TD
    A[User Signup Request] --> B[Validate Input Data]
    B --> C{User Exists?}
    C -->|Yes| D[Return Error 400]
    C -->|No| E[Hash Password]
    E --> F[Save User to MongoDB]
    F --> G[Generate JWT Token]
    G --> H[Return Token + User Info]
```

**API Flow:**
```
POST /api/auth/signup
├── Input Validation (username, email, password)
├── Check Duplicate User
├── Hash Password (bcrypt, 12 rounds)
├── Save to Database
├── Generate JWT Token
└── Response: { token, user }
```

## 🔐 **2. User Login Workflow**

```mermaid
graph TD
    A[Login Request] --> B[Find User by Email]
    B --> C{User Found?}
    C -->|No| D[Return Error 401]
    C -->|Yes| E[Compare Password]
    E --> F{Password Valid?}
    F -->|No| G[Return Error 401]
    F -->|Yes| H[Generate JWT Token]
    H --> I[Return Token + User Info]
```

**API Flow:**
```
POST /api/auth/login
├── Find User in Database
├── Compare Password Hash
├── Generate JWT Token
└── Response: { token, user }
```

## 🛡️ **3. Authentication Middleware Workflow**

```mermaid
graph TD
    A[Incoming Request] --> B[Extract JWT Token]
    B --> C{Token Present?}
    C -->|No| D[Return Error 401]
    C -->|Yes| E[Verify JWT Signature]
    E --> F{Token Valid?}
    F -->|No| G[Return Error 401]
    F -->|Yes| H[Decode User ID]
    H --> I[Find User in Database]
    I --> J[Add User to req.user]
    J --> K[Continue to Controller]
```

**Middleware Flow:**
```
Authorization: Bearer <token>
├── Extract Token from Header
├── Verify JWT Signature
├── Decode Payload
├── Find User by ID
├── Attach User to Request
└── Call next()
```

## 📝 **4. Task Creation Workflow**

```mermaid
graph TD
    A[Create Task Request] --> B[Auth Middleware]
    B --> C[Validate Task Data]
    C --> D[Add User ID to Task]
    D --> E[Save Task to Database]
    E --> F[Return Created Task]
```

**API Flow:**
```
POST /api/tasks
├── Authentication Check
├── Input Validation
├── Create Task Object
├── Add userId from JWT
├── Save to MongoDB
└── Response: { message, task }
```

## 📊 **5. Task Retrieval with Filtering Workflow**

```mermaid
graph TD
    A[Get Tasks Request] --> B[Auth Middleware]
    B --> C[Extract Query Parameters]
    C --> D[Build MongoDB Filter]
    D --> E[Apply Pagination]
    E --> F[Execute Database Query]
    F --> G[Return Paginated Results]
```

**API Flow:**
```
GET /api/tasks?status=pending&priority=high&page=1&limit=10
├── Authentication Check
├── Extract Query Parameters
├── Build Filter: { userId, status, priority }
├── Apply Sorting & Pagination
├── Execute MongoDB Query
└── Response: { tasks, totalPages, currentPage, total }
```

## ✏️ **6. Task Update Workflow**

```mermaid
graph TD
    A[Update Task Request] --> B[Auth Middleware]
    B --> C[Find Task by ID + UserID]
    C --> D{Task Found?}
    D -->|No| E[Return Error 404]
    D -->|Yes| F[Validate Update Data]
    F --> G[Update Task in Database]
    G --> H[Return Updated Task]
```

**API Flow:**
```
PUT /api/tasks/:id
├── Authentication Check
├── Find Task by ID and userId
├── Validate Update Data
├── Update in Database
└── Response: { message, task }
```

## 🗑️ **7. Task Deletion Workflow**

```mermaid
graph TD
    A[Delete Task Request] --> B[Auth Middleware]
    B --> C[Find Task by ID + UserID]
    C --> D{Task Found?}
    D -->|No| E[Return Error 404]
    D -->|Yes| F[Delete from Database]
    F --> G[Return Success Message]
```

## 📈 **8. Task Statistics Workflow**

```mermaid
graph TD
    A[Stats Request] --> B[Auth Middleware]
    B --> C[MongoDB Aggregation Pipeline]
    C --> D[Group by Status]
    D --> E[Group by Priority]
    E --> F[Count Total Tasks]
    F --> G[Return Statistics]
```

**API Flow:**
```
GET /api/tasks/stats
├── Authentication Check
├── Aggregation Pipeline
├── Group by Status & Priority
├── Count Documents
└── Response: { total, byStatus, byPriority }
```

## 🔄 **9. Complete Request-Response Cycle**

### **Example: Creating a High Priority Task**

```
1. CLIENT REQUEST:
   POST http://localhost:3001/api/tasks
   Headers: {
     "Authorization": "Bearer eyJhbGciOiJIUzI1NiIs...",
     "Content-Type": "application/json"
   }
   Body: {
     "title": "Complete API Documentation",
     "description": "Write comprehensive API docs",
     "priority": "high",
     "dueDate": "2024-12-31",
     "status": "pending"
   }

2. SERVER PROCESSING:
   ├── CORS Middleware ✓
   ├── JSON Parser ✓
   ├── Route Matching: /api/tasks ✓
   ├── Auth Middleware:
   │   ├── Extract Token ✓
   │   ├── Verify JWT ✓
   │   ├── Find User ✓
   │   └── req.user = userObject ✓
   ├── Validation Middleware:
   │   ├── Check Required Fields ✓
   │   ├── Validate Priority ✓
   │   └── Validate Date Format ✓
   ├── Task Controller:
   │   ├── Create Task Object ✓
   │   ├── Add userId: req.user._id ✓
   │   ├── Save to MongoDB ✓
   │   └── Format Response ✓
   └── Send Response ✓

3. SERVER RESPONSE:
   Status: 201 Created
   Body: {
     "message": "Task created successfully",
     "task": {
       "_id": "673abc123...",
       "title": "Complete API Documentation",
       "description": "Write comprehensive API docs",
       "priority": "high",
       "status": "pending",
       "dueDate": "2024-12-31T00:00:00.000Z",
       "userId": "672def456...",
       "createdAt": "2024-11-04T14:30:00.000Z",
       "updatedAt": "2024-11-04T14:30:00.000Z"
     }
   }
```

## 🛠️ **10. Database Operations Flow**

### **MongoDB Collections:**
```
users: { _id, username, email, password, createdAt, updatedAt }
tasks: { _id, title, description, status, priority, dueDate, userId, createdAt, updatedAt }
```

### **Database Indexes:**
```javascript
// Performance optimization indexes
tasks.createIndex({ userId: 1, status: 1 })
tasks.createIndex({ userId: 1, priority: 1 })
tasks.createIndex({ userId: 1, dueDate: 1 })
```

## 🚨 **11. Error Handling Flow**

```mermaid
graph TD
    A[Error Occurs] --> B{Error Type?}
    B -->|Validation| C[400 Bad Request]
    B -->|Authentication| D[401 Unauthorized]
    B -->|Not Found| E[404 Not Found]
    B -->|Server Error| F[500 Internal Server Error]
    C --> G[Log Error]
    D --> G
    E --> G
    F --> G
    G --> H[Send Error Response]
```

## 🔒 **12. Security Workflow**

```
Request → CORS Check → JWT Verification → User Authorization → Data Validation → Process
```

**Security Layers:**
1. **CORS Protection** - Cross-origin request filtering
2. **JWT Authentication** - Token-based security
3. **Password Hashing** - bcrypt with 12 salt rounds
4. **User Isolation** - Users only access their own data
5. **Input Validation** - Prevent malicious data injection

## 📱 **13. API Integration Examples**

### **Frontend Integration (React):**
```javascript
// Login and store token
const login = async (email, password) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await response.json();
  localStorage.setItem('token', data.token);
};

// Create task with authentication
const createTask = async (taskData) => {
  const token = localStorage.getItem('token');
  const response = await fetch('/api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(taskData)
  });
  return response.json();
};
```

### **Mobile Integration (React Native):**
```javascript
// AsyncStorage for token management
import AsyncStorage from '@react-native-async-storage/async-storage';

const getTasks = async () => {
  const token = await AsyncStorage.getItem('token');
  const response = await fetch('http://api.taskmanager.com/api/tasks', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.json();
};
```

## 🚀 **14. Deployment Workflow**

```mermaid
graph TD
    A[Local Development] --> B[Git Push]
    B --> C[GitHub Repository]
    C --> D[CI/CD Pipeline]
    D --> E[Build & Test]
    E --> F[Deploy to Server]
    F --> G[Production API]
```

**Environment Setup:**
```bash
# Development
npm run dev

# Production
npm start

# Environment Variables
PORT=3001
MONGODB_URI=mongodb://localhost:27017/task_manager
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d
```

This workflow documentation provides a complete understanding of how the Task Manager API operates from request to response, including all security, validation, and database operations.