'use strict';

class SocketService {
    connection(socket){
        const generateID = () => Math.random().toString(36).substring(2, 10);
        console.log(`Socket: ${socket.id} user just connected! ⚡`);

        const chatRooms = [];

        socket.on('disconnect', () => {
            socket.disconnect();
            console.log('🔥: A user disconnected');
        });

        socket.on("createRoom", (roomName) => {
            socket.join(roomName);
            console.log(`🚪: ${socket.id} joined the room: ${roomName}`);
            //👇🏻 Adds the new group name to the chat rooms array
            chatRooms.unshift({ id: generateID(), roomName, messages: [] });
            //👇🏻 Returns the updated chat rooms via another event
            socket.emit("roomsList", chatRooms);
        });
    }
   
}

module.exports = new SocketService();