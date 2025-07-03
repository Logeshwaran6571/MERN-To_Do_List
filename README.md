# MERN Todo List Web Application

A full-stack Todo List web application built using the **MERN stack** (MongoDB, Express, React, Node.js). This project is designed to provide hands-on experience in designing, developing, and deploying a complete MERN application.

![image](https://github.com/user-attachments/assets/69940961-7ccc-4555-a288-215bc34619a0)

---

## 🔗 Live Demo

- **Frontend**: [https://mern-to-do-list-frondend.onrender.com](https://mern-to-do-list-frondend.onrender.com)
- **Backend**: [https://mern-to-do-list-backend-mu4w.onrender.com](https://mern-to-do-list-backend-mu4w.onrender.com)

---

## 📝 Features

- Add, update, and delete tasks
- Mark tasks as completed
- Responsive UI with real-time updates
- Full CRUD functionality via RESTful API
- Persistent data storage with MongoDB

---

## 🚀 Technologies Used

### Frontend

- React.js
- Axios
- CSS (or Tailwind/Bootstrap if applicable)

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- CORS
- Dotenv
- Nodemon (development)

---

## 📁 Project Structure

```

mern-todo-app/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ...

````

---

## ⚙️ Setup Instructions

### Prerequisites

- Node.js and npm installed
- MongoDB URI (can use MongoDB Atlas)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/mern-todo-app.git
cd mern-todo-app
````

### 2. Setup Backend

```bash
cd backend
npm install express mongoose cors dotenv
npm install -D nodemon
npm install
npm run dev
```

Ensure `.env` file includes your MongoDB URI:

```
MONGO_URI=your_mongodb_connection_string
```

### 3. Setup Frontend

In a new terminal:

```bash
cd frontend
npm install
npm start
```

---

## 🛰️ Deployment

* Frontend is deployed on [Render](https://render.com) at:
  [https://mern-to-do-list-frondend.onrender.com](https://mern-to-do-list-frondend.onrender.com)

* Backend is deployed on [Render](https://render.com) at:
  [https://mern-to-do-list-backend-mu4w.onrender.com](https://mern-to-do-list-backend-mu4w.onrender.com)

---
