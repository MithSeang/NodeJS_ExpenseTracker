# Expense Tracker

This is an Expense Tracker app with a Node.js backend and a Flutter frontend. It allows users to register, log in, and manage their expenses with functionalities like adding, updating, and deleting expenses. The data is stored in SQLite3, and the backend uses JWT for user authentication and authorization.

# Backend (Node.js)

# Prerequisites

Node.js
SQLite3
Setup Instructions
Clone the repository.

Navigate to the backend folder in your terminal.

Run the following command to install the dependencies: npm install

To start the server run: npm start

this will start the backend server on http://localhost:3000.

Create the necessary tables in your SQLite3 database:

USERS table

EXPENSES table

The backend uses JWT (JSON Web Token) for authentication. Middleware is included for verifying users before allowing access to certain routes.

API Endpoints

POST /api/register: Register a new user.

POST /api/login: Login with user credentials.

POST /api/expense: Create a new expense for the user.

GET /api/expenses: Retrieve a list of expenses for the authenticated user.

PUT /api/expense/:id: Update an existing expense.

DELETE /api/expense/:id: Delete an expense.

Technology Stack

Node.js

Express

SQLite3

JWT (Authentication)

# Frontend (Flutter)
- [Link Flutter Project GitHub](https://github.com/MithSeang/Flutter_ExpenseTracker.git)

# Prerequisites

Flutter SDK

Setup Instructions

Clone the repository.

Navigate to the frontend folder in your terminal.

Run the following command to install dependencies: flutter pub get

To run the app on an Android emulator or physical device, use: flutter run

# Features
Login/Registration: Users can register, log in, and log out.

Add Expense: Users can fill out a form to add new expenses.

Update/Delete Expense: Users can update or delete their expenses.

Expense Chart: Visual representation of the user's expenses.

User Profile: Displays user details and allows profile management.

# Base URL Configuration
For Android Emulator:

const String baseUrl = "http://10.0.2.2:3000/api";

For iOS:

const String baseUrl = "http://localhost:3000/api";

Thank You.
  
