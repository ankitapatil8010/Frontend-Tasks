# 📋 Simple Task Management Application

## 📌 Objective
This project is a **Simple Task Management Application** that allows users to manage their tasks efficiently. It provides basic CRUD operations and supports drag-and-drop functionality to manage task status between **Incomplete** and **Completed** sections. All data persists using **LocalStorage**.

---

## ✅ Features

### 1️⃣ Task Creation (Create)
- Users can add new tasks with:
    - Title (required)
    - Description (optional)

### 2️⃣ Task Listing (Read)
- Tasks are displayed under two sections:
    - 📋 **Incomplete Tasks**
    - ✅ **Completed Tasks**

### 3️⃣ Edit Task (Update)
- Users can edit the **Title** and **Description** of tasks.

### 4️⃣ Delete Task (Delete)
- Users can delete any task from either section.

### 5️⃣ Drag & Drop Functionality
- Users can **drag and drop** tasks between **Incomplete** and **Completed** sections.
- Task status updates automatically based on the section it is dropped into.

### 6️⃣ Persistent Storage
- All tasks and their statuses persist using **LocalStorage**.
- Data remains after page reload.

### 7️⃣ Toast Notifications
- Toast notifications are displayed for the following actions:
    - ✅ Task Created
    - ✏️ Task Updated
    - 🗑️ Task Deleted
    - 🔄 Task Moved to Completed
    - 🔄 Task Moved to Incomplete

---

## 🛠️ Technologies Used
- HTML
- CSS
- JavaScript (Vanilla)
- LocalStorage for data persistence

---
