# Collaborative Whiteboard

A real-time collaborative whiteboard application built with **Next.js**, **Express**, **WebSockets**, and **PostgreSQL** in a **Turborepo** monorepo.

## 🚀 Features

-   **Real-time Collaboration**: Draw shapes and chat with users in the same room instantly.
-   **Authentication**: Secure Signup and Signin using JWT.
-   **Modern UI**: Sleek, dark-themed interface built with Tailwind CSS.
-   **Monorepo Architecture**: Shared configuration and types across frontend and backend.
-   **Scalable Backend**: Separate HTTP and WebSocket services.

## 🛠️ Tech Stack

-   **Monorepo**: Turborepo, pnpm
-   **Frontend**: Next.js 15, React 19, Tailwind CSS, Axios
-   **HTTP Backend**: Express.js, Node.js
-   **WebSocket Backend**: `ws` library, Node.js
-   **Database**: PostgreSQL, Prisma ORM
-   **Shared Packages**:
    -   `@repo/common`: Shared Zod schemas and types
    -   `@repo/db`: Prisma client and schema
    -   `@repo/backend-common`: Shared backend configuration (JWT secrets)

## 📂 Project Structure

```text
.
├── apps
│   ├── excelidraw-frontend  # Next.js Frontend Application
│   ├── http-backend         # REST API (Auth, Room management)
│   └── ws-backend           # WebSocket Server (Real-time events)
└── packages
    ├── common               # Shared types/schemas (Zod)
    ├── db                   # Database schema and client
    ├── backend-common       # Shared backend config
    └── ...                  # Other configs (ESLint, TS, UI)
```

## ⚡ Getting Started

### Prerequisites

-   Node.js (v18+)
-   pnpm (`npm install -g pnpm`)
-   PostgreSQL Database

### Installation

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd collaborative-whiteboard
    ```

2.  **Install dependencies**:
    ```bash
    pnpm install
    ```

3.  **Configure Environment Variables**:
    *   **Database**: Create `packages/db/.env`:
        ```env
        DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"
        ```
    *   **Apps**: Create `.env` in `apps/http-backend/` and `apps/ws-backend/` (or copy from `packages/db`):
        ```env
        DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"
        ```

4.  **Database Setup**:
    Generate the Prisma client:
    ```bash
    npx prisma generate
    # If running locally for the first time, push schema to DB:
    # npx prisma db push
    ```

### Running the App

Start all services (Frontend, HTTP Backend, WS Backend) concurrently:

```bash
pnpm dev
```

-   **Frontend**: [http://localhost:3000](http://localhost:3000)
-   **HTTP Backend**: [http://localhost:3001](http://localhost:3001)
-   **WS Backend**: `ws://localhost:8080`

## 🔄 Basic Flow

1.  **User Visits Frontend**: Lands on the Landing/Auth page.
2.  **Sign Up/In**: Communicates with `http-backend` to verify credentials and issue a JWT.
3.  **Create/Join Room**: User creates a room via `http-backend` (REST) and receives a `roomId`.
4.  **Connect to Room**: Frontend connects to `ws-backend` via WebSocket, authenticating with the JWT.
5.  **Collaboration**:
    -   User actions (draw, chat) are sent as messages to `ws-backend`.
    -   `ws-backend` broadcasts messages to all other users in the same `roomId`.
    -   Chat history is persisted to Postgres via Prisma.
