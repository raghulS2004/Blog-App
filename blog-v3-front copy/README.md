
MERN Blog Website

A full-stack blog platform built with the MERN (MongoDB, Express.js, React, Node.js) stack. Users can register, log in, and create, update, or delete blog posts securely using session-based authentication.

Live Website: [https://blog-app-im5z-h4vh2s3yn-raghuls-projects-bf0226ce.vercel.app/](https://blog-app-im5z-h4vh2s3yn-raghuls-projects-bf0226ce.vercel.app/)

Features:

* User registration and login (with password hashing via Passport.js)
* Session-based authentication using express-session and connect-mongo
* Create, edit, and delete your own blog posts
* Protected routes (only logged-in users can access Compose/Edit/Delete)
* Responsive UI built with React
* Secure API with CORS and MongoStore sessions

Tech Stack:
Frontend: React, React Router, Axios, CSS
Backend: Node.js, Express.js, MongoDB, Mongoose, Passport.js, express-session
Deployment: Vercel (Frontend), Render (Backend), MongoDB Atlas (Database)

Project Structure:
blog-v3/
├── blog-v3-back/       -> Backend (Express + MongoDB)
│   ├── index.js
│   ├── .env
│   └── package.json
├── blog-v3-front/      -> Frontend (React)
│   ├── src/
│   ├── .env
│   └── package.json

Environment Variables:

Backend (.env for Render):
SESSION\_DB\_URI = your\_mongodb\_connection\_string
SECRET = your\_session\_secret
PORT = 8000

Frontend (.env for Vercel):
REACT\_APP\_API\_URL = [https://your-backend-service.onrender.com](https://your-backend-service.onrender.com)

How to Run Locally:

1. Clone the repository:
   git clone [https://github.com/raghulS2004/Blog-App.git](https://github.com/raghulS2004/Blog-App.git)

2. Navigate to backend and install dependencies:
   cd blog-v3/blog-v3-back
   npm install

3. Create a .env file in blog-v3-back/ with your MongoDB URI and SECRET:
   SESSION\_DB\_URI=your\_mongo\_uri
   SECRET=your\_secret
   PORT=8000

4. Start the backend:
   npm start

5. Navigate to frontend and install dependencies:
   cd ../blog-v3-front
   npm install

6. Create a .env file in blog-v3-front/:
   REACT\_APP\_API\_URL=[http://localhost:8000](http://localhost:8000)

7. Start the frontend:
   npm start

Author:
Raghul S
GitHub: [https://github.com/raghulS2004](https://github.com/raghulS2004)

