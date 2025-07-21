# AI-Driven Learning Platform (Mini MVP)

## 📚 Overview

This platform is designed to provide personalized learning experiences powered by OpenAI. Admins can manage users, categories, subcategories, and prompts. Users can explore topics, generate intelligent responses, and track their learning history through a clean and modular full-stack application.

## 🛠️ Tech Stack

### Backend
- **Node.js** with **Express**
- **MongoDB** with **Mongoose**
- **JWT** for Authentication & Authorization
- **OpenAI API** for dynamic prompt generation
- **Swagger** for API Documentation

### Frontend
- **React** + **TypeScript**
- **Tailwind CSS** for UI
- **Zustand** for state management
- **Axios** + **RTK Query** (or direct Axios, as applicable)

### DevOps
- **Docker** for containerization
- **.env** for environment management

---

## 🧠 Features

### 👥 User Module
- `Register`, `Login` with token-based authentication
- Admin flag for permission-based access
- User management dashboard (admin only)

### 🗂️ Categories & Subcategories
- Admins can create, update, delete, and view categories and subcategories
- Users can view them and explore prompts by topic

### 💬 Prompts
- Users can create prompts under specific categories
- Responses are dynamically generated via OpenAI API
- All prompt interactions are stored per user
- Admin can manage all prompts in the system

### 🔐 Authentication & Authorization
- JWT is used to protect routes
- `isAdmin` middleware restricts sensitive routes to admins only

---

## 🧪 API Documentation

Access interactive documentation at:

http://localhost:5000/api-docs


The API is documented using **Swagger**, including schemas, authentication headers, and expected responses.

---

## 🚀 Getting Started

### 🔧 Backend Setup

```bash
git clone https://github.com/MaliFriedman/Ai-Learning-Platform.git
cd backend
npm install
```

Create a .env file in the backend directory with the following:
```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/ai-learning
OPENAI_API_KEY=your_openai_api_key_here
JWT_SECRET=your_jwt_secret_here
ADMIN_NAME=AdminUser
ADMIN_PHONE=0500000000
```
To run locally:

```bash
npm run dev
```
💻 Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Make sure your backend is running at the same time.

🐳 Docker Support
To run the full stack in Docker:

1. Add .env files for both frontend and backend

backend/.env

```bash
PORT=5000
MONGO_URI=mongodb://mongo:27017/ai-learning
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
```


2. Build & Start Containers

```bash
docker-compose up --build
```

This will start:

MongoDB
Backend on port 3000
Frontend on port 5173

Or use the backend-only Dockerfile:
```bash
cd backend
docker build -t ai-learning-backend .
docker run -p 5000:5000 --env-file .env ai-learning-backend
```

🔑 Authentication Flow
On registration/login, a JWT is returned.

JWT is stored on the frontend (localStorage).

All protected endpoints require Authorization: Bearer <token>.

## 📁 Project Structure
### Backend
```
backend/
│
├── controllers/
├── middlewares/
├── models/
├── routes/
├── services/
├── utils/ 
├── config/ 
├── swagger/
├── app.ts 
├── server.ts 
└── .env.example 
```
### Frontend
```
frontend/
│
├── src/
│ ├── api/
│ ├── components/
│ ├── pages/ 
│ ├── store/
│ ├── types/ 
│ ├── utils/ 
│ ├── App.tsx 
│ └── main.tsx 
│
├── public/ 
├── tailwind.config.ts
└── vite.config.ts 
```
📊 Admin Dashboard
Admins can:

View, add, update, and delete users

Manage categories & subcategories

See all prompts and delete or regenerate them

📌 Notes
Prompt responses are generated using the OpenAI GPT API

Requests may take a few seconds depending on the model used

Swagger includes full schema validation

✅ Future Enhancements
User progress tracking

Role-based permissions (beyond admin flag)

Pagination & search

AI model settings per prompt

🧼 Clean Code Principles
Separation of concerns (controllers/services/models)

Global error handling middleware

DTO validation on input

Fully modular architecture

🔗 API Endpoints
All protected endpoints require Bearer Token in the Authorization header.

| Method | Endpoint          | Description           | Protected |
| ------ | ----------------- | --------------------- | --------- |
| POST   | `/users/register` | Register a new user   | ❌         |
| POST   | `/users/login`    | Login and get JWT     | ❌         |
| GET    | `/users/me`       | Get current user info | ✅         |

| Method | Endpoint          | Description         | Protected |
| ------ | ----------------- | ------------------- | --------- |
| GET    | `/categories`     | Get all categories  | ✅         |
| POST   | `/categories`     | Create new category | ✅ Admin   |
| PUT    | `/categories/:id` | Update category     | ✅ Admin   |
| DELETE | `/categories/:id` | Delete category     | ✅ Admin   |

| Method | Endpoint                                  | Description           | Protected |
| ------ | ----------------------------------------- | --------------------- | --------- |
| GET    | `/sub-categories`                         | Get all subcategories | ✅         |
| GET    | `/sub-categories/by-category/:categoryId` | Get by category       | ✅         |
| POST   | `/sub-categories`                         | Create subcategory    | ✅ Admin   |
| PUT    | `/sub-categories/:id`                     | Update subcategory    | ✅ Admin   |
| DELETE | `/sub-categories/:id`                     | Delete subcategory    | ✅ Admin   |

| Method | Endpoint                        | Description                     | Protected |
| ------ | ------------------------------- | ------------------------------- | --------- |
| GET    | `/prompts`                      | Get all prompts                 | ✅         |
| GET    | `/prompts/user/:userId`         | Get prompts by user ID          | ✅         |
| GET    | `/prompts/category/:categoryId` | Get prompts by category         | ✅         |
| GET    | `/prompts/sub-category/:subId`  | Get prompts by sub-category     | ✅         |
| POST   | `/prompts`                      | Create and generate new prompt  | ✅         |
| PUT    | `/prompts/:id`                  | Update a prompt                 | ✅         |
| DELETE | `/prompts/:id`                  | Delete a prompt                 | ✅         |
| POST   | `/prompts/:id/regenerate`       | Re-generate prompt using OpenAI | ✅         |
