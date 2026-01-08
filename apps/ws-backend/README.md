# WebSocket Backend

This service powers the real-time collaboration features, handling drawing synchronization and instant chat.

## 🛠️ Technologies Used

-   **Runtime**: Node.js
-   **Library**: `ws` (Native WebSocket support)
-   **Language**: TypeScript
-   **Database**: Prisma (PostgreSQL)
-   **Auth**: JSON Web Tokens (JWT)

## ⚡ WebSocket Events

Usage: `ws://localhost:8080?token=<jwt_token>`

### Client -> Server Messages

*   **Join Room**
    ```json
    {
      "type": "join_room",
      "roomId": "123"
    }
    ```
    *   Subscribes the user's socket to a specific room for broadcasts.

*   **Chat Message**
    ```json
    {
      "type": "chat",
      "roomId": "123",
      "message": "Hello world!"
    }
    ```
    *   Saves message to DB and broadcasts to room.

*   **Leave Room**
    ```json
    {
      "type": "leave_room",
      "room": "123"
    }
    ```

*   **Delete Shape**
    ```json
    {
      "type": "delete_shape",
      "roomId": "123",
      "shapeId": "unique-shape-id"
    }
    ```

### Server -> Client Messages

The server broadcasts messages to all connected clients in the room (except the sender, usually).

*   **Chat Broadcast**
    ```json
    {
      "type": "chat",
      "message": "Hello world!",
      "roomId": "123"
    }
    ```

*   **Shape Deletion**
    ```json
    {
      "type": "delete_shape",
      "shapeId": "unique-shape-id",
      "roomId": "123"
    }
    ```

## 🚀 Development

Start the service (usually run via root `pnpm dev`):

```bash
pnpm dev
```
