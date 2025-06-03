const resources = [
  {
    _id: "665e0001c5a1c71200000001",
    resource_name: "user",
    resource_description: "Quản lý người dùng",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "665e0001c5a1c71200000002",
    resource_name: "school",
    resource_description: "Quản lý trường học",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "665e0001c5a1c71200000003",
    resource_name: "rbac",
    resource_description: "Phân quyền hệ thống",
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const roles = [
  {
    _id: "665e1111c5a1c71200000001",
    role_name: "admin",
    role_description: "Quản trị toàn bộ hệ thống",
    role_permissions: [
      {
        resource: "665e0001c5a1c71200000001", // user
        actions: "read:any",
        attributes: "*"
      },
      {
        resource: "665e0001c5a1c71200000001", // user
        actions: "create:any",
        attributes: "*"
      },
      {
        resource: "665e0001c5a1c71200000001", // user
        actions: "update:any",
        attributes: "*"
      },
      {
        resource: "665e0001c5a1c71200000001", // user
        actions: "delete:any",
        attributes: "*"
      },
      {
        resource: "665e0001c5a1c71200000002", // school
        actions: "read:any",
        attributes: "*"
      },
      {
        resource: "665e0001c5a1c71200000002", // school
        actions: "create:any",
        attributes: "*"
      },
      {
        resource: "665e0001c5a1c71200000002", // school
        actions: "update:any",
        attributes: "*"
      },
      {
        resource: "665e0001c5a1c71200000002", // school
        actions: "delete:any",
        attributes: "*"
      },
      {
        resource: "665e0001c5a1c71200000003", // rbac
        actions: "read:any",
        attributes: "*"
      },
      {
        resource: "665e0001c5a1c71200000003", // rbac
        actions: "create:any",
        attributes: "*"
      },
      {
        resource: "665e0001c5a1c71200000003", // rbac
        actions: "update:any",
        attributes: "*"
      },
      {
        resource: "665e0001c5a1c71200000003", // rbac
        actions: "delete:any",
        attributes: "*"
      }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "665e1111c5a1c71200000002",
    role_name: "teacher",
    role_description: "Giáo viên có thể xem và chỉnh sửa dữ liệu lớp học",
    role_permissions: [
      {
        resource: "665e0001c5a1c71200000001", // user
        actions: "read:any",
        attributes: "*"
      },
      {
        resource: "665e0001c5a1c71200000001", // user
        actions: "update:any",
        attributes: "*"
      },
      {
        resource: "665e0001c5a1c71200000002", // school
        actions: "read:any",
        attributes: "*"
      }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    _id: "665e1111c5a1c71200000003",
    role_name: "user",
    role_description: "Người dùng có thể xem thông tin cá nhân và trường học",
    role_permissions: [
      {
        resource: "665e0001c5a1c71200000001", // user
        actions: "read:any",
        attributes: "*"
      },
      {
        resource: "665e0001c5a1c71200000002", // school
        actions: "read:any",
        attributes: "*"
      }
    ],
  }
];

module.exports = {
    resources,
    roles
}