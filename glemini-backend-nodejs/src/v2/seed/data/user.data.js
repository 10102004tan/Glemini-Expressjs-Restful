const users = [
  {
    // admin
    _id: "665e1111c5a1c71200000001",
    user_fullname: "Nguyễn Văn A",
    user_email: "nguyenvana@example.com",
    user_password: "$2b$10$w3E78u6E58NGi395K3MpeuP7qJCuO4bPh04P2kBq62MaWq1k0W30.", // 12345678
    user_role: "665e0001c5a1c71200000001", // ObjectId của Role
    user_phone: "0909123456",
    user_avatar: "https://ui-avatars.com/api/?name=Nguyễnsize=128",
    user_schoolIds: [],
    user_status: "active",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // user
  {
    _id: "665e1111c5a1c71200000003",
    user_fullname: "Trần Thị B",
    user_email: "tranthib@example.com",
    user_password: "$2b$10$w3E78u6E58NGi395K3MpeuP7qJCuO4bPh04P2kBq62MaWq1k0W30.", // 12345678
    user_role: "665e0001c5a1c71200000002",
    user_phone: "0911222333",
    user_avatar: "https://ui-avatars.com/api/?name=Trầnsie=128",
    user_schoolIds: [],
    user_status: "active",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // teacher
  {
    _id: "665d1e92c5a1c71234567892",
    user_fullname: "Lê C",
    user_email: "lec@example.com",
    user_password: "$2b$10$w3E78u6E58NGi395K3MpeuP7qJCuO4bPh04P2kBq62MaWq1k0W30.", // 12345678
    user_role: "665e1111c5a1c71200000002",
    user_phone: "",
    user_avatar: "https://ui-avatars.com/api/?name=Lêsie=128",
    user_schoolIds: [],
    user_status: "active",
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

module.exports = {
  users
};
