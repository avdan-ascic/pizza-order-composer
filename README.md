## Project Name

Pizaa Order Application

## Introduction

The Pizza Order Composer application is to be implemented as a full MERN stack web application. The
aim of the application is to provide pizza ordering and delivery to users with a personal account.
In this MERN stack application, the frontend is to be developed in HTML5, CSS3, and React.js while the
backend is to be created in Express and Node.js. The data is to be stored in MongoDB Atlas and users
are going to access only their own data but no others.

## Features

In the Pizza Order Composer application, there are two types of users: authorized and unauthorized
users. Add the following use cases for users:

- Sign up: Users can register by creating a new account, providing a username, email address,
  and password
- Authentication: Registered users can sign in and sign out
- Authorized and unauthorized users can access and interact with the Home screen of the
  application., which allows them to pick dough and add ingredients to pizza, and to add it to the
  cart.

● Authorized users can access the following key features:

- Logout: option available under the user menu
- List order history: option available under the user menu
- Create orders: clicking the “BUY” button in the cart user is navigated to the Order
  screen
- Add/Remove an address: The user can create a new address for delivery which can be
  deleted after the creation.

● Unauthorized users:

- Logout: unavailable
- List order history: unavailable
- Create orders: clicking the “BUY” button in the cart to an unauthorized user shows
  sign-in modal
- Add/Remove an address: unavailable

## Buit With

JavaScript
ReactJS
NodeJS
Express JS
Mongo DB

## Libraries

- JSON Web Token
- passport-jwt
- axios
- React Bootstrap

## Setup

Clone this repository. You will need node and npm installed globally on your machine. If you want to run database locally make sure that you have mongoDB server installed and running in background. You can also run cloud database using mongoDB Compas. Create a clutser and paste your connection string in dotenv file.

## Environment Variables

Create a .env file in the root directory of your server route. This file will contain sensitive configuration information needed for your application to function properly.

PORT: The port number on which the server will listen for incoming requests.
JWT_SECRET: A secret key used for signing and verifying JWT tokens for authentication.
MONGO: The connection URL for your MongoDB database.
SESSION_SECRET: An optional secret key used for session management.

## To get a local copy up and running, follow these simple steps:

Clone the repo git clone https://github.com/your_username/pizza-order-composer.git Install NPM packages npm install Start the project npm start
