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

Clone the repository:

Install dependencies:

npm install

Create a .env file and add:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Start the server:

npm start

API Endpoints

Authentication

Method

Endpoint

Description

POST

/api/users

Register a new user

POST

/api/users/login

Login and get a JWT token

GET

/api/users/me

Get current user details (protected)

FAQ Management

Method

Endpoint

Description

GET

/api/faqs

Get all FAQs (public)

POST

/api/faqs

Create a new FAQ (protected)

GET

/api/faqs/:id

Get a single FAQ by ID (public)

PUT

/api/faqs/:id

Update an FAQ (admin only)

DELETE

/api/faqs/:id

Delete an FAQ (admin only)

User Roles & Access

Users:

Can register and log in.

Can ask questions.

Can view all FAQs.

Admins:

Can answer FAQs.

Can update and delete FAQs.

Roadmap

Implement admin panel for managing FAQs.

Add multilingual FAQ support.

Enhance frontend UI (if applicable).

Contributing

Feel free to fork the repository and submit pull requests!

License

This project is open-source and available under the MIT License.

