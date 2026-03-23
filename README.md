# ScamGuard AI – JWT Authentication Backend

This project demonstrates **JWT (JSON Web Token) authentication using Spring Boot** as part of **Experiment 6**.

The system allows users to authenticate using a username and password, receive a JWT token, and access protected routes using that token.

---

# Project Objective

The goal of this project is to implement a **secure authentication mechanism** using JWT in a backend application and demonstrate how protected routes work.

---

# Technologies Used

- Java
- Spring Boot
- Spring Security
- JWT (JSON Web Tokens)
- Maven
- React (Frontend)
- Python (AI scam detection module)
- Postman (API testing)

---

# Project Structure
scamguard/
│
├── backend/
│   └── src/main/java/com/scamguard/backend
│       ├── controller
│       │   ├── AuthController.java
│       │   ├── ScamController.java
│       │   └── UrlController.java
│       │
│       ├── security
│       │   ├── JwtFilter.java
│       │   ├── JwtUtil.java
│       │   └── SecurityConfig.java
│       │
│       └── BackendApplication.java
│
├── frontend/
│   └── React application
│
├── ai-model/
│   ├── train_model.py
│   ├── ai_api.py
│   ├── scam_model.pkl
│   └── vectorizer.pkl
│
├── screenshots/
│   ├── LOGIN.png
│   ├── JWT_TOKEN.png
│   └── PROTECTED_TOKEN.png
│
└── README.md

---

# JWT Authentication Flow

1️⃣ User sends login request with username and password.
Example Request:
{
“username”: “user123”,
“password”: “password123”
}
---

2️⃣ Server validates credentials and generates a JWT token.

Example Response:
{
“message”: “Login successful”,
“token”: “eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9…”
}
---

3️⃣ User sends token to access protected route.
Header:
---

4️⃣ Server verifies token using JWT filter.

If valid → Access granted.

Example Response:
{
“message”: “Access granted to protected route”
}
---

# API Endpoints

| Endpoint | Method | Description |
|--------|--------|--------|
| `/login` | POST | Authenticate user and generate JWT token |
| `/protected` | GET | Access protected resource with JWT token |
| `/api/detect-scam` | POST | Detect scam messages using AI model |

---

# Postman Testing

### Login Request
POST http://localhost:8080/login
Body:
{
“username”:“user123”,
“password”:“password123”
}
---

### Access Protected Route
GET http://localhost:8080/protected
Header:
Authorization: Bearer 
---

# Screenshots

### Login Request

![Login](screenshots/LOGIN.png)

---

### JWT Token Generated

![Token](screenshots/JWT_TOKEN.png)

---

### Protected Route Access

![Protected](screenshots/PROTECTED_TOKEN.png)

---

# How to Run the Project

## Backend
cd backend
./mvnw spring-boot:run
Backend will run at:
http://localhost:8080

https://scamguard-api.onrender.com 

---

## Frontendcd frontend
npm install
npm start
Frontend will run at:
http://localhost:3000

https://scamguard-api.vercel.app

---

##DEPLOYED LINK
https://scamguard-api.vercel.app 

# Learning Outcomes

- Understanding JWT authentication
- Implementing protected routes
- Securing APIs using tokens
- Testing APIs with Postman
- Managing backend authentication using Spring Security

---

# Author

**Saloni Gupta**

GitHub:  
https://github.com/SaloniGupta6

---

# Experiment

Experiment 6 – JWT Authentication using Spring Boot
