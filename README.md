Here’s a complete and well-formatted `README.md` for your **MERN Blog Website** project, updated based on your latest implementation and deployment:

---

```markdown
# 📝 MERN Blog Website

A full-stack blog platform built with the **MERN stack** (MongoDB, Express.js, React, Node.js). This project enables users to **register**, **log in**, and **create**, **edit**, or **delete** their own blog posts, with **session-based authentication** for secure access.

🌐 **Live Website**: [https://blog-app-im5z-f5w2j5jyq-raghuls-projects-bf0226ce.vercel.app](https://blog-app-im5z-f5w2j5jyq-raghuls-projects-bf0226ce.vercel.app)

---

## 🚀 Features

- 🔐 **User authentication** with username and password using Passport.js
- 🧠 **Session-based login** (via `express-session` + `connect-mongo`) to persist user sessions
- 📝 **CRUD functionality** for blog posts (create, read, update, delete)
- 🔒 **Protected routes** for writing, editing, or deleting posts
- 📱 **Responsive and clean UI** built with React
- 🔄 **Secure API calls** using Axios with `withCredentials` and proper CORS setup
- ☁️ **Deployed** using Vercel (frontend), Render (backend), and MongoDB Atlas (database)

---

## 🛠️ Tech Stack

| Layer       | Technologies                                          |
|-------------|--------------------------------------------------------|
| **Frontend** | React, React Router, Axios, CSS                        |
| **Backend**  | Node.js, Express.js, MongoDB, Mongoose                |
| **Auth**     | Passport.js, express-session, connect-mongo           |
| **Database** | MongoDB Atlas                                         |
| **Hosting**  | Vercel (frontend), Render (backend), MongoDB Atlas    |

---

## 🗂️ Project Structure

```

blog-v3/
├── blog-v3-back/         # Backend (Express + MongoDB)
│   ├── index.js
│   ├── .env
│   └── package.json
│
├── blog-v3-front/        # Frontend (React)
│   ├── src/
│   ├── .env
│   └── package.json

````

---

## 🔑 Environment Variables

### ✅ Backend (`blog-v3-back/.env`) — for Render
```env
SESSION_DB_URI=your_mongodb_connection_string
SECRET=your_session_secret
PORT=8000
FRONTEND_URL=https://your-frontend.vercel.app
````

### ✅ Frontend (`blog-v3-front/.env`) — for Vercel

```env
REACT_APP_API_URL=https://blog-app-drgj.onrender.com
```

### ✅ Frontend (`blog-v3-front/.env`) — for Local Development

```env
REACT_APP_API_URL=http://localhost:8000
```

---

## 💻 How to Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/raghulS2004/Blog-App.git
```

### 2. Setup Backend

```bash
cd blog-v3/blog-v3-back
npm install
```

Create a `.env` file inside `blog-v3-back/`:

```env
SESSION_DB_URI=your_mongo_uri
SECRET=your_secret
PORT=8000
```

Start the backend:

```bash
npm start
```

### 3. Setup Frontend

```bash
cd ../blog-v3-front
npm install
```

Create a `.env` file inside `blog-v3-front/`:

```env
REACT_APP_API_URL=http://localhost:8000
```

Start the frontend:

```bash
npm start
```

Now open `http://localhost:3000` in your browser 🎉

---

## 🙋 Author

* **Raghul S**
* 🔗 [GitHub Profile](https://github.com/raghulS2004)

---

## 📌 Future Improvements

* Rich text editor for composing posts (e.g., Quill.js)
* Image upload support
* Pagination and search
* Tags/categories for posts
* Dark mode

---

## 🛡️ License

This project is open-source and free to use. MIT License.

```
