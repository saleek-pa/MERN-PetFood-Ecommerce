# Pet Food Ecommerce Website

Welcome to the Pet Food Ecommerce Website repository! This project is a full-stack web application developed using the MERN (MongoDB, Express.js, React, Node.js) stack. It allows users to browse and purchase pet food products online.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Folder Structure](#folder-structure)
- [Technologies Used](#technologies-used)
- [Screenshots](#screenshots)

## Features

- User authentication (signup, login, logout) with JWT
- Product browsing and searching
- Shopping cart and wishlist functionality
- Order placement with stripe payment gateway
- Admin panel for product and user management
- Responsive design for various devices

## Getting Started

To run this project locally, follow the steps below.

## Prerequisites

Make sure you have the following installed on your machine:

- Node.js and npm
- MongoDB

## Installation

Clone the repository:

```bash
  git clone https://github.com/saleek-pa/MERN-PetFood-Ecommerce
```

Install server dependencies:

```bash
  cd pet-food-ecommerce/server
  npm install
```

Install client dependencies:

```bash
  cd ../client
  npm install
```

Configure environment variables:
Create a .env file in the server directory and add the following:

```bash
  MONGODB_URI = your_mongodb_uri
  ACCESS_TOKEN_SECRET = your_token_secret_key
  STRIPE_SECRET_KEY = your_stripe_secret_key
```

Run the server:

```bash
 cd ../server
 npm run dev
```

Run the client:

```bash
 cd ../server
 npm start
```

The client will be running at http://localhost:3000.

## Folder Structure
- `/client`: React client application
- `/server`: Node.js and Express.js server application

## Technologies Used
- Frontend:
  - React.js
  - Context API for state management
  - Axios for HTTP requests
  - React Router for navigation
  - MD Bootstrap for styling and icons
- Backend:
  - Node.js & Express.js
  - MongoDB for database
  - JWT for authentication
  - Stripe for payment gateway
  - Bcrypt for password hashing
  - Multer & Cloudinary for image upload
  - Joi for validatio

## Screenshots
![Home Page](https://res.cloudinary.com/dmzqckfj4/image/upload/v1709287024/pet%20food/gthenogjqdtkg6oxou6k.png)
# 
![Products](http://res.cloudinary.com/dmzqckfj4/image/upload/v1709287024/pet%20food/xiwqtnrgorrpkzfwleqq.png)
# 
![Details Page](https://res.cloudinary.com/dmzqckfj4/image/upload/v1709287024/pet%20food/p71g7snikqf0eqvrkfsq.png)
# 
![Cart](http://res.cloudinary.com/dmzqckfj4/image/upload/v1709287023/pet%20food/zfsradbk4mlighxiubr3.png)
