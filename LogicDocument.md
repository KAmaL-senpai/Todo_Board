# 🧠 Logic_Document.md

This document explains how I implemented two features in my real-time task management app: **Smart Assign** and **Conflict Handling**. I'll describe them in a simple, conversational way.

---

## 🔄 Smart Assign (Auto Assigning Tasks)

In a multi-user environment, sometimes we want to assign tasks automatically instead of manually choosing a person.

So, what I did is — when a user clicks "Smart Assign" on a task, the backend checks all users in the system and counts how many tasks each user is currently assigned to.

Then, it simply picks the person who has **the fewest number of tasks** and assigns the new task to them (The backend check only the Todo and IsProgress task not the tasks in the Done Column). That way, work gets distributed more fairly across all users.

This logic runs on the server, and once the task is assigned, I send a real-time update to all connected users using Socket.IO, so everyone sees the change instantly.

---

## ⚔️ Conflict Handling (When Two People Edit the Same Task)

Now imagine two users are editing the same task at the same time. One updates the title, and the other changes the status. If both hit “Save,” whose update should be accepted?

To solve this, I added a conflict detection system.

Here’s how it works:
- When a user tries to update a task, their request also includes the last time they saw the task (i.e., `updatedAt` timestamp).
- The server checks that against the current timestamp in the database.
- If the difference is big enough (I used a 100ms threshold), the server considers it a **conflict** — meaning someone else probably updated it in the meantime.

When that happens, I don’t overwrite anything. Instead, I return a warning to the user saying:
> "Someone else modified this task while you were editing. What do you want to do?"

Then, I let the user choose whether to **merge the changes**, **keep their own version**, or **discard** their changes.

This helps avoid data loss and improves collaboration between multiple users.

---

That's how I made sure tasks are assigned smartly, and updates are handled safely even when multiple people are working at once. 🙂
