'use strict';

const { verifyToken } = require('../auths');
const { findKeyTokenByUserId } = require('../models/repositories/keyToken.repo');
const ResultService = require('./result.service');

const PING_INTERVAL = 20000; // 20s
const PONG_TIMEOUT = 5000;
class SocketService {
  connection(socket) {
    const generateID = () => Math.random().toString(36).substring(2, 10);

    console.log('New socket connection', socket.id);
    socket.auth = false;
    let userId;

    socket.on('authentication', async (data) => {
      console.log('1.authentication data!!! include Authorization and x-client-id');
      if (!data) {
        console.log('No authentication data');
        return;
      }

      // check authentication
      if (!socket.auth) {
        if (!data.authorization) {
          console.log('No Authorization header');
          return;
        }
        const { xClientId, authorization } = data;
        console.log('xClientId', xClientId);
        console.log('authorization', authorization);
        // find keyToken by xClientId

        // verify token
        await verifyToken({
          token: authorization,
          xClientId,
        })
          .then((decoded) => {
            const { user_id } = decoded;
            userId = user_id; // Set userId từ token
            socket.auth = true;
            _userSockets[user_id] = socket;
            console.log(`User ${user_id} authenticated successfully`);
          })
          .catch((err) => {
            console.log('Token verification failed:', err);
            socket.emit('unauthorized', 'Invalid token');
            return;
          });
      }
    });

    // Xử lý sự kiện pong từ client
    socket.on('pong', async ({ timestamp }) => {
      if (socket.auth && userId) {
        _userLast[userId] = timestamp;
        _lastPongAt = timestamp;
      }
    });

    //
    const pingInterval = setInterval(() => {
      console.log(`Checking user ${socket.id} connection`);
      if (!socket.auth || !userId) {
        console.log(`User ${socket.id} not authenticated yet, skip ping.`);
        return;
      }

      console.log(`Sending ping to user ${userId}`);
      socket.emit('ping', {
        timestamp: Date.now(),
        users: [1, 2],
      });

      setTimeout(() => {
        const now = Date.now();
        if (now - _lastPongAt > PONG_TIMEOUT) {
          console.log(`User ${userId} pong timeout. Disconnecting.`);
          socket.disconnect();
        }
      }, PONG_TIMEOUT);
    }, PING_INTERVAL);

    socket.on('disconnect', () => {
      console.log(`Socket ${socket.id} disconnected`);
      if (userId) {
        console.log(`User ${userId} disconnected`);
        delete _userSockets[userId];
        delete _userLast[userId];
      }
      clearInterval(pingInterval); // Clear interval khi user disconnect
    });

    socket.on('react-dashboard-call', (data) => {
      console.log('react-dashboard-call received:', data);
      _io.emit('reactNative', {
        message: 'React Native Call Received',
      });
    });

    const chatRooms = [];

    socket.on('createRoom', (roomName) => {
      socket.join(roomName);
      console.log(`🚪: ${socket.id} joined the room: ${roomName}`);
      // 👇🏻 Adds the new group name to the chat rooms array
      chatRooms.unshift({ id: generateID(), roomName, messages: [] });
      // 👇🏻 Returns the updated chat rooms via another event
      socket.emit('roomsList', chatRooms);
    });

    socket.on('createClassroom', (classData) => {
      const newClassroom = {
        ...classData,
        _id: generateID(),
      };
      console.log('New Classroom Data:', newClassroom);

      socket.emit('newClassroom', newClassroom);
    });

    // Xử lý sự kiện join vào một room
    socket.on('joinRoom', ({ roomCode, user }) => {
      console.log('HERE');
      console.log('User object received from client:', user);
      console.log('RoomCode:', roomCode);

      // Tạm thời bỏ qua authentication để test
      socket.auth = true;
      socket.user = user; // Lưu thông tin người dùng vào socket
      socket.user.score = 0; // Khởi tạo điểm số ban đầu

      socket.join(roomCode);
      console.log(`Socket ${socket.id} joined room: ${roomCode}`);

      console.log(`${user.fullname || user.user_fullname || 'Unknown'} joined room: ${roomCode}`);

      // Phát cho tất cả các client khác trong room biết người mới vào
      console.log(`Emitting userJoined to room ${roomCode}`);
      socket.to(roomCode).emit('userJoined', {
        message: `${user.fullname || user.user_fullname || 'Unknown'} has joined the room.`,
        user: user,
      });

      // Phát danh sách tất cả user hiện tại trong room cho người mới vào
      console.log(`Emitting updateUserList to room ${roomCode}`);
      _io.to(roomCode).emit('updateUserList', getUsersInRoom(roomCode));
    });

    // Xử lý khi giáo viên bắt đầu bài thi
    socket.on('startRoom', ({ roomCode }) => {
      console.log(`Teacher started the room: ${roomCode}`);
      _io.to(roomCode).emit('startQuiz'); //
    });

    // Xử lý khi user rời room
    socket.on('leaveRoom', ({ roomCode }) => {
      const username = socket.user?.fullname || socket.user?.user_fullname || 'Unknown user';
      socket.leave(roomCode);
      console.log(`${username} left room: ${roomCode}`);

      // Phát cho tất cả các client khác trong room biết người dùng rời khỏi
      socket.to(roomCode).emit('userLeft', {
        message: `${username} has left the room.`,
        userId: socket.id,
        user: socket.user,
      });

      // Cập nhật danh sách user hiện tại trong room
      _io.in(roomCode).emit('updateUserList', getUsersInRoom(roomCode));
    });

    // Xóa người dùng ra khỏi phòng chơi
    socket.on('kickUser', ({ roomCode, userId }) => {
      console.log(`User ${userId} is kicked from room: ${roomCode}`);
      const userSocket = _listUserOnline.find((user) => user.userId === userId);

      if (userSocket) {
        userSocket.socket.leave(roomCode);
        userSocket.socket.emit('kicked', {
          message: 'You are kicked from room',
        });
      }
      // Cập nhật danh sách user hiện tại trong room
      _io.in(roomCode).emit('updateUserList', getUsersInRoom(roomCode));
    });

    // Xử lý khi user gửi câu trả lời và cập nhật điểm
    socket.on('submitAnswer', async ({ roomCode, userId, point, isCorrect, quizId, roomId }) => {
      console.log(`${userId} submitted an answer in room: ${roomCode}`);
      // Cập nhật bảng xếp hạng của phòng
      const rank = await ResultService.getRankBoard({
        room_id: roomId,
        quiz_id: quizId,
      });

      console.log(rank);

      // Phát sự kiện bảng xếp hạng mới cho tất cả các client trong phòng
      // Nếu cần, có thể phát sóng thông tin mới cho tất cả mọi người trong phòng
      _io.to(roomCode).emit('updateRanking', rank);
      _io.to(roomCode).emit('updateStats', rank);
    });

    // Xử lý khi user hoàn thành toàn bộ bài thi
    socket.on('finishQuiz', ({ roomCode, userId }) => {
      console.log(`${userId} finished the quiz in room: ${roomCode}`);

      // Logic để cập nhật trạng thái hoàn thành và điểm số
      const updatedRanking = updateRankingForRoom(roomCode);

      // Thông báo cập nhật bảng xếp hạng
      _io.in(roomCode).emit('updateRanking', updatedRanking);
    });

    // Xử lý khi giao viên kết thúc cuộc thi
    socket.on('endQuiz', ({ roomCode }) => {
      console.log(`Teacher ended the quiz in room: ${roomCode}`);

      // Phát sự kiện kết thúc quiz cho tất cả các client trong phòng
      _io.to(roomCode).emit('quizEnded');

      // Lấy danh sách socket trong phòng sử dụng adapter
      const room = _io.sockets.adapter.rooms.get(roomCode);
      if (room) {
        room.forEach((clientId) => {
          const clientSocket = _io.sockets.sockets.get(clientId);
          if (clientSocket) {
            clientSocket.leave(roomCode);
          }
        });
      } else {
        console.log(`No clients found in room: ${roomCode}`);
      }
    });

    // Xử lý sự kiện khi giao viên kết thúc bài thi
    socket.on('endRoom', ({ roomCode }) => {
      console.log(`Teacher ended the room: ${roomCode}`);
      // Phát sự kiện kết thúc bài thi cho tất cả các client trong phòng
      _io.to(roomCode).emit('endRoom');
    });

    // Helper function: Lấy danh sách user trong room
    function getUsersInRoom(roomCode) {
      const clients = _io.sockets.adapter.rooms.get(roomCode) || new Set();
      return Array.from(clients).map((clientId) => {
        const clientSocket = _io.sockets.sockets.get(clientId);
        return {
          ...clientSocket.user,
        };
      });
    }

    // Helper function: Cập nhật bảng xếp hạng trong room
    function updateRankingForRoom(roomCode) {
      const users = getUsersInRoom(roomCode);
      // Cập nhật điểm và sắp xếp danh sách user theo điểm số
      const rankedUsers = users.sort((a, b) => b.score - a.score);
      return rankedUsers;
    }
  }
}

module.exports = new SocketService();
