# Skylink Blog Platform

**Skylink** is a full-stack blogging platform that allows users to sign up, create blog posts, and comment on others' posts. The app is split into two main parts:

- 🟦 **Backend** — built with NestJS using PostgreSQL, Prisma, CQRS, DDD
- 🟨 **Frontend** — built with React.js using Tailwind, ShadCN, Zustand, and Axios

---

## 🚦 How It Works

### 🧠 Authentication

- User signs up or logs in via the frontend
- Backend returns a **JWT token inside a cookie** (`auth_token`)
- Frontend stores no sensitive data — it simply includes cookies in requests

### 🧑‍💻 Interaction

| Action               | Frontend               | Backend (API)                  |
|----------------------|------------------------|-------------------------------|
| Register/Login       | `/register`, `/login` | `POST /auth/signup`, `/signin` |
| View all posts       | `/`                    | `GET /posts`                  |
| View single post     | `/posts/:id`           | `GET /posts/:id` *(optional)* |
| Create post          | `/create`              | `POST /posts` *(requires auth)* |
| Comment on a post    | `on Post page`         | `POST /posts/:postId/comments` |
| Edit/Delete post     | `My Posts` page        | `PUT` / `DELETE /posts/:id`  |
| Edit/Delete comment  | Not currently added    | `PUT` / `DELETE /comments/:id` |

All authenticated actions use the `auth_token` cookie automatically sent with requests.


---

### For indepth Analysis in Frotend and Backend Code Look at there respective README Files.


## 🛠 Running the App Locally

### 🧱 Requirements

- Node.js (v18+ recommended)
- PostgreSQL installed locally or cloud-hosted
- `pnpm`, `npm`, or `yarn` (any package manager works)

---

### ▶️ Backend

```bash
cd backend
cp .env.example .env
npx prisma migrate dev --name init
npm install
npm run start:dev


