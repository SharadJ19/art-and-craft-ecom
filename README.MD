# 🎨🛍️ Art & Craft E-commerce Platform

A full-stack web application for selling art and craft supplies, built using the **MERN stack** (MySQL, Express, React, Node.js).

![ArtCraft Screenshot](https://github.com/user-attachments/assets/abe24bc0-4c66-4025-9d3f-3975fcc5736e)

## 🧾 Project Overview

This e-commerce platform connects artisans and craft enthusiasts with quality supplies. Developed as part of coursework at **Chitkara University, Department of Computer Science and Engineering**.

## ✨ Features

- 🔐 **User Authentication** and account management  
- 🔎 **Product Browsing** with search & filtering  
- 🛒 **Shopping Cart** functionality  
- 💳 **Secure Checkout** process  
- 🛠️ **Admin Dashboard** for inventory management  
- 📱 **Responsive Design** for all devices

## 🧰 Tech Stack

| Layer     | Technology Stack                              |
|-----------|-----------------------------------------------|
| 🖥️ Frontend | React.js, Tailwind CSS, Axios, React Router |
| 🖥️ Backend  | Node.js, Express.js, Sequelize ORM          |
| 💾 Database | MySQL                                       | 
| 🔐 Auth     | JSON Web Tokens (JWT)                       |

## ⚙️ Installation Guide

### 📥 Clone the Repository
```bash
git clone https://github.com/sharadj19/art-craft-ecom.git
cd art-craft-ecom
```

### 📦 Install Backend Dependencies
```bash
npm install
```

### 🎨 Install Frontend Dependencies
```bash
cd views
npm install
```

### 🔐 Environment Variables
Create a `.env` file inside `backend/` directory:
```env
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=yourdbname
JWT_SECRET=your_jwt_secret
```

### 🧪 Populate Sample Data
```bash
node populate_db.js
```

## 🚀 Running the Application

| Task             | Command                              |
|------------------|--------------------------------------|
| Start Backend    | `node server.js`          	          |
| Start Frontend   | `cd views && npm run dev`            |
| Open App         | Visit 👉 [http://localhost:5173](http://localhost:5173) |

## 🗃️ Database Schema

| Table         | Description                                      |
|---------------|--------------------------------------------------|
| **Users**     | Stores user data & credentials                   |
| **Products**  | Details like name, description, price, and stock |
| **Orders**    | Order records and status                         |
| **Order_Items** | Links orders with products and quantity        |


## 🛣️ Future Roadmap

- 💳 Payment Gateway Integration (e.g. Razorpay, Stripe)
- 🌟 User Reviews & Ratings
- ❤️ Wishlist Functionality
