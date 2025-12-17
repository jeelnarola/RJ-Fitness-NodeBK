# RJ-Fitness-NodeBK

A backend REST API for a fitness application built with **Node.js** and **Express.js**.  
This project follows a **modular and scalable architecture** to keep the codebase clean and maintainable.

---

## 📁 Project Structure

```
RJ-Fitness-NodeBK/
│
├── node_modules/          # Installed npm dependencies
│
├── src/
│   ├── configs/           # Database & environment configuration
│   ├── controllers/       # Main business logic
│   ├── middlewares/       # Request/response middleware
│   ├── models/            # Database models & schemas
│   ├── routes/            # API route definitions
│   ├── utils/             # Common reusable utility functions
│   └── index.js           # Application entry point
│
├── .gitignore             # Files/folders ignored by Git
├── package.json           # Project metadata & dependencies
└── README.md              # Project documentation
```

---


**Base URL**: `http://localhost:8090/v1`  

🔐 All endpoints require: `Authorization: Bearer <token>` (unless noted)



---

## 🔑 Auth APIs

**Base URL**: `/auth`

| Method | Endpoint                         | Description |
|------|----------------------------------|------------|
| POST | `/login`                    | User login (returns access & refresh tokens) |
| POST | `/logout`                   | User logout |
| PATCH | `/change-password`           | change password using token/OTP |
| POST | `/send-otp`         | Send OTP |
| POST | `/verify-otp`        | Verify OTP |
| PATCH | `/reset-password`      | reset password |

---

## 🚀 Getting Started

### Install Dependencies
```bash
npm install
```

### Run the Application 
```bash
npm run dev
```
