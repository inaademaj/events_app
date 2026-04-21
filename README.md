# EventSpace Authentication App

A full-stack event management demo built with React and Node.js. The project combines a polished client-side experience with token-based authentication, protected event management routes, and a lightweight JSON-backed API.

## Overview

This app lets users browse events publicly and manage events after authenticating. It is structured as two separate applications:

- `frontend/`: React app using React Router data APIs
- `backend/`: Express API with JWT authentication and JSON file persistence

The project is a good reference for:

- login and signup flows
- protected client routes
- protected backend endpoints
- event CRUD operations
- token storage and automatic logout
- React Router loaders, actions, `defer`, and `Await`

## Features

### Authentication

- Users can create an account with email and password
- Existing users can log in with valid credentials
- The backend returns a JWT token on successful authentication
- The frontend stores the token and expiration time in `localStorage`
- Sessions expire after 1 hour
- The app automatically logs the user out when the token expires
- Protected screens redirect unauthenticated users to the auth page

### Event Management

- Public users can:
  - view the homepage
  - browse all events
  - view event details
  - sign up for the newsletter UI flow
- Authenticated users can:
  - create a new event
  - edit an existing event
  - delete an event

### Event Browsing Experience

- Featured upcoming events are shown on the homepage
- Events are sorted by date
- Users can search events by title or description
- Users can filter by:
  - all events
  - upcoming events
  - past events

## Tech Stack

### Frontend

- React
- React DOM
- React Router DOM
- CSS Modules
- Fetch API

### Backend

- Node.js
- Express
- `jsonwebtoken`
- `bcryptjs`
- `uuid`
- `body-parser`

## How Authentication Works

1. A user signs up or logs in from the React app.
2. The frontend sends credentials to the Express API.
3. The backend validates the request and returns a JWT token.
4. The frontend stores:
   - `token`
   - `expiration`
5. Protected frontend routes check whether a valid token exists.
6. Protected backend routes require an `Authorization: Bearer <token>` header.
7. When the token expires, the frontend clears auth data and logs the user out.

## Project Structure

```text
eventsApp-Authentication/
├── backend/
│   ├── app.js
│   ├── events.json
│   ├── data/
│   │   ├── event.js
│   │   ├── user.js
│   │   └── util.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── events.js
│   └── util/
│       ├── auth.js
│       ├── errors.js
│       └── validation.js
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── util/
└── README.md
```

## Frontend Highlights

### Routing

The frontend uses React Router's data API patterns:

- `loader()` to fetch route data
- `action()` to submit mutations
- `defer()` and `Await` for async UI rendering
- route-level protection for authenticated pages

### Important Frontend Flows

- `frontend/src/App.js`
  - defines the router tree
  - wires loaders and actions into routes
- `frontend/src/util/auth.js`
  - reads and clears token state
  - checks token expiration
  - protects routes like `events/new` and `events/:eventId/edit`
- `frontend/src/pages/Root.js`
  - triggers automatic logout with a timeout based on token duration
- `frontend/src/components/EventForm.js`
  - submits authenticated create and update requests
- `frontend/src/pages/EventDetail.js`
  - handles authenticated delete requests

### Frontend Routes

| Route | Access | Description |
| --- | --- | --- |
| `/` | Public | Homepage with overview and featured upcoming events |
| `/events` | Public | Browse all events |
| `/events/:eventId` | Public | View a single event |
| `/events/new` | Auth required | Create a new event |
| `/events/:eventId/edit` | Auth required | Edit an event |
| `/auth?mode=login` | Public | Login form |
| `/auth?mode=signup` | Public | Signup form |
| `/newsletter` | Public | Newsletter signup UI flow |
| `/logout` | Auth required | Clears local auth state and redirects home |

## Backend Highlights

### API Behavior

The backend runs on `http://localhost:8080` by default and exposes:

- public authentication endpoints
- public read-only event endpoints
- protected event mutation endpoints

### API Endpoints

| Method | Endpoint | Protected | Purpose |
| --- | --- | --- | --- |
| `POST` | `/signup` | No | Create a new user |
| `POST` | `/login` | No | Authenticate a user and return a JWT |
| `GET` | `/events` | No | Fetch all events |
| `GET` | `/events/:id` | No | Fetch one event |
| `POST` | `/events` | Yes | Create an event |
| `PATCH` | `/events/:id` | Yes | Update an event |
| `DELETE` | `/events/:id` | Yes | Delete an event |

### Data Storage

This project uses a local JSON file instead of a database:

- `backend/events.json`

That file stores:

- event records
- registered users with hashed passwords

This makes the project easy to run locally, but it is a demo-style persistence layer rather than a production-ready database setup.

### Validation Rules

#### Signup / Login

- email must be a valid email format
- password must be at least 6 characters
- duplicate signup emails are rejected

#### Events

- `title` must be non-empty
- `description` must be non-empty
- `date` must be a valid date
- `image` must be a valid `http` or `https` URL

## Getting Started

### Prerequisites

- Node.js
- npm

## Installation

Install dependencies separately for the frontend and backend.

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd eventsApp-Authentication
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Install frontend dependencies

```bash
cd ../frontend
npm install
```

## Running the Project

You need two terminals: one for the backend and one for the frontend.

### Start the backend

```bash
cd backend
npm start
```

The API will run on:

```text
http://localhost:8080
```

### Start the frontend

```bash
cd frontend
npm start
```

The React app will run on:

```text
http://localhost:3000
```

## Environment Configuration

The frontend can optionally use a custom backend URL through:

```bash
REACT_APP_API_URL
```

If this variable is not set, the frontend defaults to:

```text
http://localhost:8080
```

Example:

```bash
REACT_APP_API_URL=http://localhost:8080
```

## Typical User Flow

1. Open the homepage and browse featured events.
2. Visit the authentication page and create an account or log in.
3. After logging in, create a new event from the events area.
4. Edit or delete existing events from an event detail page.
5. Stay logged in until the token expires or manually log out.

## Scripts

### Frontend

From `frontend/`:

```bash
npm start
npm run build
npm test
```

### Backend

From `backend/`:

```bash
npm start
```

## Notes and Limitations

- The JWT signing key is hard-coded in the backend for demo purposes.
- Data is stored in a local JSON file, so this is not intended for production use.
- There is no database, refresh token flow, or role-based authorization.
- The newsletter feature is a frontend form flow and does not persist subscribers.
- The backend currently uses permissive CORS for local development.

## Learning Goals Demonstrated

This project demonstrates how to:

- connect a React frontend to an Express backend
- protect frontend routes using auth-aware loaders
- protect backend routes with JWT middleware
- store hashed passwords with `bcryptjs`
- persist lightweight app data without a database
- use React Router loaders and actions for fetch + mutation flows

## Future Improvements

- move users and events into a database
- store secrets in environment variables
- add refresh tokens and more robust session handling
- add server-side newsletter persistence
- add tests for auth, loaders, and event mutations
- add deployment configuration for frontend and backend

## License

This project is currently for learning and portfolio/demo purposes unless you define another license for it.
