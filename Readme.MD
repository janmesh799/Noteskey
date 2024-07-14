# Planner Pulse

Planner Pulse is a task management application designed to streamline your workflow and enhance productivity.

## Features

- **Registration and Authentication**
  - Secure registration and login using email and password.
  - Session management with logout functionality.

- **Notes Management**
  - Create, update, and delete notes.
  - Filter notes by priority, status, or deadline.
  - Share notes with other users.

## API Documentation

### Authentication

#### Register User

Endpoint: `POST /api/auth/register`

Registers a new user with name, email, and password.

#### Login User

Endpoint: `POST /api/auth/login`

Logs in a user using email and password.

#### Logout User

Endpoint: `POST /api/auth/logout`

Logs out the current user and destroys the session.

### Notes

#### Create Note

Endpoint: `POST /api/notes/`

Creates a new note with title, content, and priority.

#### Get Notes

Endpoint: `GET /api/notes/`

Fetches notes optionally filtered by priority, status, or deadline.

#### Update Note

Endpoint: `PUT /api/notes/`

Updates an existing note with new title, content, or priority.

#### Get Note by ID

Endpoint: `GET /api/notes/{id}`

Fetches a specific note by its ID.

#### Delete Notes

Endpoint: `POST /api/notes/deleteNotes`

Allows bulk deletion of notes.

#### Share Note

Endpoint: `POST /api/notes/shareNote`

Shares a note with another user.

## Swagger API Documentation

Explore the API endpoints and interact with them using Swagger UI.

### Swagger JSON

You can find the Swagger documentation [here](https://plannerpulse.onrender.com/api-docs/).

## Deployment

The server side of the  project is currently hosted at [Planner Pulse Server](https://plannerpulse.onrender.com).

## Getting Started

To get started with Planner Pulse:

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up environment variables (if necessary).
4. Run the server using `npm start`.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your improvements.

## Contact

For any inquiries or feedback, please contact Janmesh Kumar at janmesh.kr.2024@gmail.com.
