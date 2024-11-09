'use strict';

// const usersJoinedRoom = []; // 👈🏻 Array to store users joined room
class SocketService {
	connection(socket) {
		const generateID = () => Math.random().toString(36).substring(2, 10);
		console.log(`Socket: ${socket.id} user just connected! ⚡`);

		const chatRooms = [];

		socket.on('disconnect', () => {
			socket.disconnect();
			console.log('🔥: A user disconnected');
		});

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
			socket.join(roomCode);
			socket.user = user; // Lưu thông tin người dùng vào socket
			socket.user.score = 0; // Khởi tạo điểm số ban đầu
			socket.correctAnswers = 0; // Số câu trả lời đúng
			socket.wrongAnswers = 0; // Số câu trả lời sai
			socket.totalAnswers = 0; // Tổng số câu đã trả lời
			socket.accuracy = 0; // Tỷ lệ % đáp án chính xác
			socket.errorRate = 0; // Tỷ lệ % đáp án sai

			console.log(`${user.user_fullname} joined room: ${roomCode}`);

			// Phát cho tất cả các client khác trong room biết người mới vào
			socket.to(roomCode).emit('userJoined', {
				message: `${user.user_fullname} has joined the room.`,
				user: user,
			});

			// Phát danh sách tất cả user hiện tại trong room cho người mới vào
			_io.to(roomCode).emit('updateUserList', getUsersInRoom(roomCode));
		});

		// Xử lý khi giáo viên bắt đầu bài thi
		socket.on('startRoom', ({ roomCode }) => {
			console.log(`Teacher started the room: ${roomCode}`);
			_io.to(roomCode).emit('startQuiz'); //
		});

		// Xử lý khi user rời room
		socket.on('leaveRoom', ({ roomCode }) => {
			const username = socket.user?.user_fullname || 'Unknown user';
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

		// Xử lý khi user gửi câu trả lời và cập nhật điểm
		socket.on('submitAnswer', ({ roomCode, userId, point, isCorrect }) => {
			// console.log('submitAnswer', { roomCode, userId, point });
			// Thêm thông báo vào phòng chat (nếu có)
			console.log(`${userId} submitted an answer in room: ${roomCode}`);
			// Tăng tổng số câu đã trả lời lên 1
			socket.totalAnswers += 1;

			if (isCorrect) {
				socket.correctAnswers += 1; // Câu trả lời đúng
			} else {
				socket.wrongAnswers += 1; // Câu trả lời sai
			}

			// Tính tỷ lệ % chính xác và % sai sót
			socket.accuracy =
				(socket.correctAnswers / socket.totalAnswers) * 100;
			socket.error_rate =
				(socket.wrongAnswers / socket.totalAnswers) * 100;

			console.log(`Updated accuracy: ${socket.accuracy.toFixed(2)}%`);
			console.log(`Updated error rate: ${socket.errorRate.toFixed(2)}%`);

			// Kiểm tra và cập nhật điểm cho user trong socket nếu có
			if (socket.user && socket.user.score !== undefined) {
				socket.user.score += point; // Cập nhật điểm
			} else {
				console.error('User data not found or score not initialized');
			}

			// Cập nhật bảng xếp hạng của phòng
			const updatedRanking = updateRankingForRoom(roomCode);

			// Phát sự kiện bảng xếp hạng mới cho tất cả các client trong phòng
			_io.to(roomCode).emit('updateRanking', updatedRanking);

			// Nếu cần, có thể phát sóng thông tin mới cho tất cả mọi người trong phòng
			_io.to(roomCode).emit('updateStats', {
				accuracy: socket.accuracy.toFixed(1),
				errorRate: socket.errorRate.toFixed(1),
			});
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
			// Phát sự kiện kết thúc cuộc thi cho tất cả các client trong phòng
			_io.to(roomCode).emit('quizEnded');
		});

		// Xử lý sự kiện khi giao viên kết thúc bài thi
		socket.on('endRoom', ({ roomCode }) => {
			console.log(`Teacher ended the room: ${roomCode}`);
			// Phát sự kiện kết thúc bài thi cho tất cả các client trong phòng
			_io.to(roomCode).emit('endRoom');
		});

		// Helper function: Lấy danh sách user trong room
		function getUsersInRoom(roomCode) {
			const clients =
				_io.sockets.adapter.rooms.get(roomCode) || new Set();
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
