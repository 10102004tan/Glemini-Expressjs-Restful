'use strict';

class SocketService {
   
    connection({socket}){
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });

        socket.on('chat message', (msg) => {
            console.log('message: ' + msg);
            _io.emit('chat message', msg);
        });
    }
   
}

module.exports = new SocketService();