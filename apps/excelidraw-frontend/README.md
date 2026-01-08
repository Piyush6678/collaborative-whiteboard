# Collaborative Whiteboard Frontend

The user interface for the collaborative whiteboard, built with Next.js.

## 🛠️ Technologies Used

-   **Framework**: Next.js 15
-   **Library**: React 19
-   **Styling**: Tailwind CSS
-   **HTTP Client**: Axios
-   **Icons**: Lucide React
-   **Graphics**: HTML5 Canvas API

## 🧭 Page Structure

### `/signup` & `/signin`
User authentication pages. They interact with `http-backend` to create accounts and retrieve JWT tokens for session management.

### `/room`
The dashboard for creating or joining collaboration rooms. Features:
-   **Create Room**: Calls `POST /room` to generate a unique room ID.
-   **Join Room**: Validates room existence via `GET /room/:slug`.

### `/canvas/:roomId`
The main drawing interface.
-   **Logic**: Managed by `Game.ts` class.
-   **Rendering**: Uses HTML5 Canvas for performant 2D drawing.
-   **Collaboration**:
    -   Establishes WebSocket connection to `ws-backend`.
    -   Sends shape data (rectangles, etc.) to server.
    -   Receives and renders shapes from other users in real-time.

## 🚀 Development

Start the frontend application (usually run via root `pnpm dev`):

```bash
npm run dev
# or
pnpm next dev
```

Runs on [http://localhost:3000](http://localhost:3000).
