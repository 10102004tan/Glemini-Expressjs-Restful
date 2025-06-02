'use strict';
import { io, Socket } from 'socket.io-client';

// Define event types for better type safety
// Extend these interfaces with your actual event names and payloads as needed
interface ServerToClientEvents {
  reconnect: (attemptNumber: number) => void;
  disconnect: (reason: string) => void;
  // Add more events here
}
interface ClientToServerEvents {
  // Add client-to-server events here if needed
}

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io('http://10.0.107.97:3000', {
	transports: ['websocket'],
	reconnection: true,
	reconnectionAttempts: 5,
	reconnectionDelay: 1000,
	reconnectionDelayMax: 5000,
});


socket.on('reconnect', (attemptNumber) => {
	console.log('Reconnected after attempts:', attemptNumber);
});

socket.on('disconnect', (reason) => {
	console.log('Disconnected:', reason);
	if (reason === 'io server disconnect') {
		socket.connect(); 
	}
});


export default socket;