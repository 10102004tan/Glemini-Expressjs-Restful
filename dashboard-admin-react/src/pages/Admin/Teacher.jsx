export default function Teacher() {
    const teacher = {
        id: 1,
        name: "Nguyen Van A",
        email: "nguyenvana@gmail.com",
        status: "active",
        user_avatar: "https://chupanhthe.vn/img/Tiem-chup-anh-the-lam-ho-chieu-lay-ngay-tphcm-1.jpg",
        created_at: "2023-01-01",
        updated_at: "2023-01-02",
        attributes: [
            {
                name: "Căn cước công dân",
                items: [
                    {
                        name: "Số căn cước",
                        value: "123456789"
                    },
                    {
                        name: "Ngày cấp",
                        value: "2020-01-01"
                    },
                    {
                        name: "Nơi cấp",
                        value: "Hà Nội"
                    }
                ],
                url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL9ZtbKF7RBeyDo3Jww3J8ctPpNA1_DYKwhA&s"
            },
            {
                name: "Bằng cấp",
                items: [
                    {
                        name: "Trình độ",
                        value: "Cử nhân"
                    },
                    {
                        name: "Chuyên ngành",
                        value: "Công nghệ thông tin"
                    },
                    {
                        name: "Năm tốt nghiệp",
                        value: "2022"
                    }
                ],
                url: "https://sim.ussh.vnu.edu.vn/uploads/news/2024_05/anh-2.jpg"
            },
            {
                name: "Hồ sơ cá nhân",
                items: [
                    {
                        name: "Số điện thoại",
                        value: "0987654321"
                    },
                    {
                        name: "Địa chỉ",
                        value: "123 Đường ABC, Quận 1, TP.HCM"
                    }
                ],
                url: "https://cdn.slidesharecdn.com/ss_thumbnails/a7f02a8b-da03-4eca-961f-2683f0f0b4e2-150507094051-lva1-app6892-thumbnail.jpg?width=640&height=640&fit=bounds"
            }, {
                name: "Thông tin khác",
                items: [
                    {
                        name: "Kinh nghiệm làm việc",
                        value: "2 năm tại Công ty XYZ"
                    },
                    {
                        name: "Kỹ năng",
                        value: "Lập trình, Quản lý dự án"
                    }
                ],
                url: "https://example.com/thongtinkhac.jpg"
            },
            {
                name: "Ảnh thẻ",
                items: [],
                url: "https://via.placeholder.com/150"
            }
        ]
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Thông tin giáo viên</h1>
            <div className="bg-white shadow-md rounded-lg p-6">
                <div className="flex items-center mb-4">
                    <img
                        src={teacher.user_avatar}
                        alt={teacher.name}
                        className="w-16 h-16 rounded-full mr-4"
                    />
                    <div>
                        <h2 className="text-xl font-semibold">{teacher.name}</h2>
                        <p className="text-gray-600">{teacher.email}</p>
                        <p className={`text-sm ${teacher.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                            {teacher.status}
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {teacher.attributes.map((attr, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                            <h3 className="font-semibold mb-2">{attr.name}</h3>
                            {attr.items.length > 0 && (
                                <ul className="list-disc pl-5 mb-2">
                                    {attr.items.map((item, idx) => (
                                        <li key={idx}>
                                            <strong>{item.name}:</strong> {item.value}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {attr.url && (
                                <a href={attr.url} target="_blank" rel="noopener noreferrer">
                                    Xem ảnh
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* xác nhận thông tin cho giáo viên */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4">Xác nhận thông tin</h2>
                <p className="text-gray-600 mb-4">Bạn có chắc chắn rằng thông tin trên là chính xác?</p>
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2">
                    Xác nhận
                </button>
                <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                    Hủy
                </button>
            </div>
        </div>
    );
}