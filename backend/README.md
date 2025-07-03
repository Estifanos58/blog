# Skylink Blog Backend

This is the **backend** for the Skylink Blog App built using **NestJS** with **PostgreSQL (Prisma ORM)** and clean architecture principles: **DDD**, **CQRS**, and the **Repository Pattern**.

---

## 🛠 Tech Stack

- **Node.js + TypeScript**
- **NestJS** (Modular backend framework)
- **PostgreSQL** (relational DB)
- **Prisma ORM**
- **JWT (cookie-based auth)**
- **bcrypt** (password hashing)
- **CQRS** (Command Query Responsibility Segregation)
- **Domain-Driven Design (DDD)**
- **Flat Folder Structure** (for scalability & clarity)

---

## 📂 Folder Structure

src/
├── app/
│ ├── auth/
│ │ ├── controllers/
│ │ ├── commands/handlers/queries/
│ │ ├── dto/
│ │ └── repository/
│ ├── post/
│ │ ├── controllers/
│ │ ├── commands/handlers/queries/
│ │ ├── dto/
│ │ └── repository/
│ ├── comment/
│ │ ├── controllers/
│ │ ├── commands/handlers/
│ │ ├── dto/
│ │ └── repository/
│ ├── utils/
│ │ └── get-user-from-request.ts
│ └── services/
│ └── prisma.service.ts


---

## 🔐 Authentication

- Signup: `POST /auth/signup`
- Signin: `POST /auth/signin`
- JWT is signed & stored in a cookie (`auth_token`)
- `get-user-from-request.ts` reads & validates the JWT cookie to get the current user

---

## 📦 Features

### ✅ User
- Register (`/auth/signup`)
- Login (`/auth/signin`)
- Get user by ID (`/auth/:id`)

### ✅ Posts
- Create post (`POST /posts`)
- Get all posts (`GET /posts`)
- Update post (`PUT /posts/:id`)
- Delete post (`DELETE /posts/:id`)

> ⚠️ All post actions are **authorized**: only the user who created the post can update/delete.

### ✅ Comments (in separate module)
- Create comment (`POST /posts/:postId/comments`)
- Update comment (`PUT /comments/:id`)
- Delete comment (`DELETE /comments/:id`)

> ⚠️ All comment actions are **authorized**: only the user who created the comment can update/delete.

---

## 🧠 Architecture Highlights

- **CQRS**: Commands (`CreateUserCommand`, `UpdatePostCommand`, etc.) are handled by dedicated handlers
- **Repository Pattern**: Abstractions for DB access (e.g., `UserRepository`, `PostRepository`)
- **DDD-style boundaries**: Each feature lives in its own folder, but uses a flat structure for better clarity

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install

### 2. To Run The Backend
npm run start:dev