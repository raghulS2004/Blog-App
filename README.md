MERN Blog Website

A full-stack blog platform built with the MERN (MongoDB, Express.js, React, Node.js) stack. Users can register, log in, and create, update, or delete blog posts securely using session-based authentication.

Live Website: https://blog-app-im5z-h4vh2s3yn-raghuls-projects-bf0226ce.vercel.app/

Features:

User registration and login (with password hashing via Passport.js)
Session-based authentication using express-session and connect-mongo
Create, edit, and delete your own blog posts
Protected routes (only logged-in users can access Compose/Edit/Delete)
Responsive UI built with React
Secure API with CORS and MongoStore sessions
Tech Stack: Frontend: React, React Router, Axios, CSS Backend: Node.js, Express.js, MongoDB, Mongoose, Passport.js, express-session Deployment: Vercel (Frontend), Render (Backend), MongoDB Atlas (Database)

Project Structure: blog-v3/ ├── blog-v3-back/ -> Backend (Express + MongoDB) │ ├── index.js │ ├── .env │ └── package.json ├── blog-v3-front/ -> Frontend (React) │ ├── src/ │ ├── .env │ └── package.json

Environment Variables:

Backend (.env for Render): SESSION_DB_URI = your_mongodb_connection_string SECRET = your_session_secret PORT = 8000

Frontend (.env for Vercel): REACT_APP_API_URL = https://blog-app-drgj.onrender.com

How to Run Locally:

Clone the repository: git clone https://github.com/raghulS2004/Blog-App.git

Navigate to backend and install dependencies: cd blog-v3/blog-v3-back npm install

Create a .env file in blog-v3-back/ with your MongoDB URI and SECRET: SESSION_DB_URI=your_mongo_uri SECRET=your_secret PORT=8000

Start the backend: npm start

Navigate to frontend and install dependencies: cd ../blog-v3-front npm install

Create a .env file in blog-v3-front/: REACT_APP_API_URL=http://localhost:8000

Start the frontend: npm start

Author: Raghul S GitHub: https://github.com/raghulS2004
