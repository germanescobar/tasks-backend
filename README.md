# the-jobs-api 💻

Hello and welcome! This Node.JS challenge project demonstrates a simple architecture building a full API with Node.JS, Express.JS, and MongoDB presents an architectural demo of these features:

- Built with Node.js and Express
- REST API

## Express Router and Routes

| Route               | HTTP Verb | Route Middleware   | Description                          |
| --------------------| --------- | ------------------ | ------------------------------------ |
| /api/users          | GET       |`hasRole('admin')`  | Get list of users                    |
| /api/users          | POST      |                    | Creates a new user                   |
| /api/users/:id      | GET       | `isAuthenticated`  | Get a single user                    |
| /api/users/:id      | DELETE    | `hasRole('manager')` | Deletes a user                       |
| /api/task           | GET       |                    | Get list of task                     |
| /api/task           | POST      |                    | Creates a new task                   |
| /api/task/:id       | GET       |                    | Get a single task                    |
| /api/task/:id       | DELETE    |                    | Deletes a task                       |
| /auth/local/login  | GET       |                    | Login a user                         |


## Usage
The use of endpoints is very simple, previously you could see a table of endpoints that you can call, if you need to create a user or log in, here we have some examples.

### Basic example **Create USER** `/api/users`:

Request Body:
```json
{
  "role": "manager",
  "email": "admin@mz.com",
  "name": "super admin",
  "password": "12345"
}
```

Response:
```json
{
  "profile": {
    "name": "SUPER ADMIN",
    "role": "manager"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGFjN2IyNTBjMzRhMmYyMTBmYjRkMTIiLCJpYXQiOjE2MjE5MTY0NTMsImV4cCI6MTYyMjAwMjg1M30.FEme2y4wnvKMzIB_ifIo3FVPU7YkxlNLtsTX8rqSSw4"
}
```

### Basic example **login USER** `/auth/local/login`:

Request Body:
```json
{
  "email": "kz@mz.com",
  "password": "12345"
}
```

Response:
```json
{
  "profile": {
    "name": "KHRIZTIAN",
    "role": "candidate"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGFjNjM1MTljZjlkNTQ5YjA3YWU2NTEiLCJpYXQiOjE2MjE5MTMyNjIsImV4cCI6MTYyMTk5OTY2Mn0.WkptwtzkfxNu5sQ28idbt4bJ7RDbXvVNlZXF0Z0ht-0"
}
```

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node >= 14.15.x, npm >= 6.14.x
- [MongoDB](https://www.mongodb.org/) - Keep a running daemon with `mongod`

### Developing

1. Run `npm install` to install server dependencies.

2. Configure the env
```shell
$ cp .env.example .env
```

3. Update `.env` with the required info

4. Run `npm run dev` to start the development server.
