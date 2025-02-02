# FAQ Management System

## Description

The FAQ Management System is a full stack service that allows users to ask questions and receive answers from administrators. It includes user authentication via JWT, role-based access control, and multilingual FAQ support.

## Features

User Authentication: Registration and login with JWT-based authentication.

Role-Based Access Control: Admins can answer FAQs, while users can only ask questions.

Public FAQs: All users can view FAQs, regardless of who asked them.

Multilingual Support (Upcoming): Plans to support multiple languages for FAQs.

## Technologies Used

Backend: Node.js, Express.js

Database: MongoDB with Mongoose ORM

Authentication: JWT, bcrypt.js

## Installation

Clone the repository

npm i in the root folder,
and then go to frontend folder
cd frontend
npm i


Create a .env file and add:

(make sure the env file is outside the backend and frontend folder)

NODE_ENV = development
PORT = 5000
MONGO_URI = mongodb+srv://************&w=majority&appName=Cluster0 (add your mongodb atlas connection string)
JWT_SECRET = abc123
GOOGLE_CLOUD_API_KEY= (add your google cloud api key)


## Start the server:

npm run dev

## API Endpoints

Register a new user

POST

/api/users/login

Login and get a JWT token

GET

/api/users/me

Get current user details (protected)

FAQ Management

Method: Get

Endpoint: /api/faqs

Description: Get all FAQs (public)

Method: POST

Endpoint: /api/faqs

Description: Create a new FAQ (protected)

Method: GET

Endpoint: /api/faqs/:id

Description: Get a single FAQ by ID (public)

Method: PUT

Endpoint: /api/faqs/:id

Description: Update an FAQ (admin only)



## User Roles & Access

Users:

Can register and log in.

Can ask questions.

Can view all FAQs.

Admins:

Can answer FAQs.

Can update and delete FAQs.

## UI


