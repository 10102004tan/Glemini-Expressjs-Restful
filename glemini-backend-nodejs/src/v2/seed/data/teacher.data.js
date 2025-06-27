const teacher = {
    _id: "665e4444c5a1c71200000001",
    userId: "665d1e92c5a1c71234567892",
    status: "active",
    schools: [],
    attributes: [
      {
        name: "Căn cước công dân",
        url: "https://example.com/cccd_nguyenvana.png",
        type: "image",
        items: [
          { field: "Họ tên", value: "Nguyễn Văn A" },
          { field: "Ngày sinh", value: "01/01/2000" },
          { field: "Giới tính", value: "Nam" },
          { field: "Quê quán", value: "Hà Nội" }
        ]
      },
      {
        name: "Bằng đại học",
        url: "https://example.com/bangdaihoc.png",
        type: "image",
        items: [
          { field: "Trường", value: "ĐH Sư phạm Hà Nội" },
          { field: "Chuyên ngành", value: "Toán học" },
          { field: "Năm tốt nghiệp", value: "2022" }
        ]
      }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
}

module.exports = {
    teacher
};