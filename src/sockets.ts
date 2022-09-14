import { io, Socket } from "socket.io-client";

let socket: Socket | undefined = undefined;

if (!process.env.JEST_WORKER_ID) {
  socket = io(process.env.REACT_APP_API_URL as string);
  socket.close();
}

export default socket;
