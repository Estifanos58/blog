# Skylink Blog Frontend

This is the **frontend** for the Skylink Blog App — a clean, modern blogging platform for users to create posts, comment, and interact in real time.

---

## 🛠 Tech Stack

- **React.js**
- **TypeScript**
- **Tailwind CSS**
- **ShadCN UI**
- **Zustand** (state management)
- **Axios** (for HTTP requests)
- **React Router** (SPA navigation)
- **React Hook Form** + **Zod** (form validation)
- **JWT Auth (Cookie-based)**

---

## 📦 Features

### ✅ Authentication
- Register (`/register`)
- Login (`/login`)
- Automatically store and send JWT token via cookie
- Logout (`/logout`)

### ✅ Blog Posts
- View all posts (`/`)
- View single post (`/posts/:id`)
- Create new post (`/create`)
- Edit/Delete post (if you’re the author)

### ✅ Comments
- View all comments under a post
- Add comment (if logged in)

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install

npm run dev


