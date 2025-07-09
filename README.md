


# 📝 Real-Time Collaborative To-Do Board

A full-stack, real-time collaborative to-do board application similar to Trello, built using the MERN stack. It supports live updates, drag-and-drop tasks, and unique business logic like Smart Assign and Conflict Handling.

---

## 🚀 Project Overview

This application allows multiple users to:
- Register and log in securely.
- Create and manage tasks on a Kanban board.
- See real-time task updates made by other users via WebSockets.
- Use advanced features like Smart Assign and Conflict Resolution for multi-user collaboration.

---

## 🛠 Tech Stack Used

### 🔧 Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (Authentication)
- Socket.IO

### 🎨 Frontend
- React.js
- React DnD (for drag-and-drop)
- Socket.IO Client
- Custom CSS (No CSS libraries used)

---

## 📦 Setup and Installation Instructions

### 🔙 Backend

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/realtime-todo-board.git
   cd backend
````

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file and add:

   ```env
   MONGODB_URI=your_mongo_connection_string
   JWT_SECRET=your_jwt_secret
   CLIENT_URL=http://localhost:3000
   ```

4. Start the backend server:

   ```bash
   npm run dev
   ```

### 🔜 Frontend

1. Open a new terminal:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file and add:

   ```env
   REACT_APP_API_BASE_URL=http://localhost:5000
   ```

4. Start the frontend:

   ```bash
   npm start
   ```

---

## ✨ Features List and Usage Guide

* 👤 User registration & login with JWT authentication
* 🧩 Kanban board with 3 columns: Todo, In Progress, Done
* 🔀 Drag-and-drop tasks between columns
* 👥 Assign tasks to users
* ⚡ Real-time task updates using WebSockets
* 📋 Activity log showing last 20 actions
* 🧠 **Smart Assign**: Automatically assigns task to the user with the fewest active tasks
* ⚔️ **Conflict Handling**: Detects simultaneous edits and prompts users to merge/overwrite
* 📱 Fully responsive UI with mobile support
* 🎞️ Smooth custom animations (drag/drop transitions, etc.)

---

## 🧠 Explanations for Smart Assign and Conflict Handling Logic

### 🔄 Smart Assign

When the "Smart Assign" button is clicked on a task:

1. The backend fetches all users and counts their current active tasks.
2. It selects the user with the **lowest number of active tasks**.
3. The task is assigned to that user, and a WebSocket event updates all clients.

### ⚔️ Conflict Handling

If two users attempt to update the same task:

1. The server compares the updated timestamps.
2. If changes overlap, it emits a **conflict warning** to both users.
3. Both versions are shown, and the users can choose to:

   * **Merge** changes (e.g., combine title/description changes)
   * **Overwrite** with their own version
4. Final decision is sent to the server, which updates the task and logs the action.

---

## 🌍 Live Deployment

* 🔗 **Frontend**: [https://your-frontend.vercel.app](https://your-frontend.vercel.app)
* 🔗 **Backend**: [https://your-backend.onrender.com](https://your-backend.onrender.com)

---

## 🎥 Demo Video

Watch a full walkthrough of the app in action:
📹 [Demo Video](https://your-demo-video-link.com)

---

## 📄 Logic Document

Detailed logic explanation is available in the [Logic\_Document.md](./Logic_Document.md) file.

---

## 🧾 License

This project is open-source and available under the MIT License.

```


