# HTTP Backend

This service handles authentication and RESTful resources for the Collaborative Whiteboard application.

## 🛠️ Technologies Used

-   **Runtime**: Node.js
-   **Framework**: Express.js
-   **Language**: TypeScript
-   **Database**: Prisma (PostgreSQL)
-   **Auth**: JSON Web Tokens (JWT)

## 📡 API Endpoints

### Authentication

*   **POST** `/signup`
    *   **Body**: `{ username, password, name }`
    *   **Description**: Creates a new user account. Returns a `userId`.

*   **POST** `/signin`
    *   **Body**: `{ username, password }`
    *   **Description**: Authenticates a user and returns a JWT `token`.

### Rooms

*   **POST** `/room`
    *   **Headers**: `Authorization: <token>`
    *   **Body**: `{ name }`
    *   **Description**: Creates a new room. Returns `roomId`.

*   **GET** `/room/:slug`
    *   **Description**: Fetches room details by slug (name).

### Chat

*   **GET** `/chat/:roomId`
    *   **Description**: Fetches recent chat history for a specific room.

## 🏃‍♂️ How it Works

1.  **Stateless Auth**: Uses JWT signed with a secret shared via `@repo/backend-common`.
2.  **Database**: Connects to the primary Postgres database using the Prisma Client from `@repo/db`.
3.  **Validation**: Request bodies are validated using Zod schemas from `@repo/common`.

## 🚀 Development

Start the service (usually run via root `pnpm dev`):

```bash
pnpm dev
```
