const universities = [
    {
        "name": "ĐẠI HỌC THÁI NGUYÊN",
        "governing_body": "Bộ Giáo dục và Đào tạo",
        "provice": "Thái Nguyên"
    },
    {
        "name": "- TRƯỜNG ĐẠI HỌC SƯ PHẠM",
        "governing_body": "Đại học Thái Nguyên",
        "provice": "Thái Nguyên"
    },
    {
        "name": "- TRƯỜNG ĐẠI HỌC KỸ THUẬT CÔNG NGHIỆP",
        "governing_body": "Đại học Thái Nguyên",
        "provice": "Thái Nguyên"
    },
    {
        "name": "- TRƯỜNG ĐẠI HỌC NÔNG LÂM",
        "governing_body": "Đại học Thái Nguyên",
        "provice": "Thái Nguyên"
    },
    {
        "name": "- TRƯỜNG ĐẠI HỌC Y DƯỢC",
        "governing_body": "Đại học Thái Nguyên",
        "provice": "Thái Nguyên"
    },
    {
        "name": "-TRƯỜNG ĐẠI HỌC KINH TẾ - QUẢN TRỊ KINH DOANH",
        "governing_body": "Đại học Thái Nguyên",
        "provice": "Thái Nguyên"
    },
    {
        "name": "- TRƯỜNG ĐẠI HỌC KHOA HỌC",
        "governing_body": "Đại học Thái Nguyên",
        "provice": "Thái Nguyên"
    },
    {
        "name": "- TRƯỜNG ĐẠI HỌC CÔNG NGHỆ THÔNG TIN VÀ TRUYỀN THÔNG",
        "governing_body": "Đại học Thái Nguyên",
        "provice": "Thái Nguyên"
    },
    {
        "name": "- KHOA NGOẠI NGỮ",
        "governing_body": "Đại học Thái Nguyên",
        "provice": "Thái Nguyên"
    },
    {
        "name": "- KHOA QUỐC TẾ",
        "governing_body": "Đại học Thái Nguyên",
        "provice": "Thái Nguyên"
    },
    {
        "name": "- TRƯỜNG CAO ĐẲNG KINH TẾ - KỸ THUẬT",
        "governing_body": "Đại học Thái Nguyên",
        "provice": "Thái Nguyên"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC CÔNG NGHIỆP QUẢNG NINH",
        "governing_body": "Bộ Công Thương",
        "provice": "Quảng Ninh"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC CÔNG NGHIỆP VIỆT TRÌ",
        "governing_body": "Bộ Công Thương",
        "provice": "Phú Thọ"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC HÙNG VƯƠNG",
        "governing_body": "UBND Tỉnh Phú Thọ",
        "provice": "Phú Thọ"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC NÔNG LÂM BẮC GIANG",
        "governing_body": "Bộ Nông nghiệp và PTNT",
        "provice": "Bắc Giang"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC TÂY BẮC",
        "governing_body": "Bộ Giáo dục và Đào tạo",
        "provice": "Sơn La"
    },
    {
        "name": "ĐẠI HỌC QUỐC GIA HÀ NỘI (06 trường ĐH)",
        "governing_body": "Chính phủ",
        "provice": "Hà Nội"
    },
    {
        "name": "- TRƯỜNG ĐẠI HỌC KHOA HỌC TỰ NHIÊN",
        "governing_body": "Đại học Quốc gia Hà Nội",
        "provice": "Hà Nội"
    },
    {
        "name": "- TRƯỜNG ĐẠI HỌC KHOA HỌC XÃ HỘI NHÂN VĂN",
        "governing_body": "Đại học Quốc gia Hà Nội",
        "provice": "Hà Nội"
    },
    {
        "name": "- TRƯỜNG ĐẠI HỌC NGOẠI NGỮ",
        "governing_body": "Đại học Quốc gia Hà Nội",
        "provice": "Hà Nội"
    },
    {
        "name": "- TRƯỜNG ĐẠI HỌC CÔNG NGHỆ",
        "governing_body": "Đại học Quốc gia Hà Nội",
        "provice": "Hà Nội"
    },
    {
        "name": "- TRƯỜNG ĐẠI HỌC KINH TẾ",
        "governing_body": "Đại học Quốc gia Hà Nội",
        "provice": "Hà Nội"
    },
    {
        "name": "- TRƯỜNG ĐẠI HỌC GIÁO DỤC",
        "governing_body": "Đại học Quốc gia Hà Nội",
        "provice": "Hà Nội"
    },
    {
        "name": "HỌC VIỆN ÂM NHẠC QUỐC GIA VIỆT NAM",
        "governing_body": "Bộ Văn hóa Thể thao và Du lịch",
        "provice": "Hà Nội"
    },
    {
        "name": "HỌC VIỆN BÁO CHÍ  VÀ TUYÊN TRUYỀN",
        "governing_body": "Học viện Chính trị - Hành chính Quốc gia HCM",
        "provice": "Hà Nội"
    },
    {
        "name": "HỌC VIỆN CHÍNH SÁCH VÀ PHÁT TRIỂN",
        "governing_body": "Bộ Kế hoạch và Đầu tư",
        "provice": "Bắc Ninh"
    },
    {
        "name": "HỌC VIỆN CHÍNH TRỊ - HÀNH CHÍNH KHU VỰC I",
        "governing_body": "Học viện Chính trị - Hành chính Quốc gia HCM",
        "provice": "Hà Nội"
    },
    {
        "name": "HỌC VIỆN CÔNG NGHỆ BƯU CHÍNH VIỄN THÔNG",
        "governing_body": "Tập đoàn Bưu chính Viễn thông Việt Nam",
        "provice": "Hà Nội"
    },
    {
        "name": "HỌC VIỆN HÀNH CHÍNH",
        "governing_body": "Học viện Chính trị - Hành chính Quốc gia HCM",
        "provice": "Hà Nội"
    },
    {
        "name": "HỌC VIỆN KHOA HỌC XÃ HỘI",
        "governing_body": "Viện Khoa học Xã hội Việt Nam",
        "provice": "Hà Nội"
    },
    {
        "name": "HỌC VIỆN NGÂN HÀNG",
        "governing_body": "Ngân hàng Nhà nước Việt Nam",
        "provice": "Hà Nội"
    },
    {
        "name": "HỌC VIỆN NGOẠI GIAO",
        "governing_body": "Bộ Ngoại giao",
        "provice": "Hà Nội"
    },
    {
        "name": "HỌC VIỆN PHỤ NỮ VIỆT NAM",
        "governing_body": "Hội Liên hiệp Phụ nữ",
        "provice": "Hà Nội"
    },
    {
        "name": "HỌC VIỆN QUẢN LÝ GIÁO DỤC",
        "governing_body": "Bộ Giáo dục và Đào tạo",
        "provice": "Hà Nội"
    },
    {
        "name": "HỌC VIỆN TÀI CHÍNH",
        "governing_body": "Bộ Tài chính",
        "provice": "Hà Nội"
    },
    {
        "name": "HỌC VIỆN THANH THIẾU NIÊN VIỆT NAM",
        "governing_body": "Trung ương ĐTNCSHCM",
        "provice": "Hà Nội"
    },
    {
        "name": "HỌC VIỆN Y DƯỢC HỌC CỔ TRUYỀN VIỆT NAM",
        "governing_body": "Bộ Y tế",
        "provice": "Hà Nội"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC BÁCH KHOA HÀ NỘI",
        "governing_body": "Bộ Giáo dục và Đào tạo",
        "provice": "Hà Nội"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC CÔNG ĐOÀN",
        "governing_body": "Tổng LĐLĐ VN",
        "provice": "Hà Nội"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC CÔNG NGHỆ GIAO THÔNG VẬN TẢI",
        "governing_body": "Bộ Giao thông Vận Tải",
        "provice": "Hà Nội"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC CÔNG NGHIỆP HÀ NỘI",
        "governing_body": "Bộ Công Thương",
        "provice": "Hà Nội"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC CÔNG NGHIỆP VIỆT - HUNG",
        "governing_body": "Bộ Công Thương",
        "provice": "Hà Nội"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC DẦU KHÍ VIỆT NAM",
        "governing_body": "Tập đoàn Dầu khí Quốc gia Việt Nam",
        "provice": "Vĩnh Phúc"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC ĐIỆN LỰC",
        "governing_body": "Tập đoàn Điện lực Việt Nam",
        "provice": "Hà Nội"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC ĐIỀU DƯỠNG NAM ĐỊNH",
        "governing_body": "Bộ Y tế",
        "provice": "Nam Định"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC DƯỢC HÀ NỘI",
        "governing_body": "Bộ Y tế",
        "provice": "Hà Nội"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC GIAO THÔNG VẬN TẢI",
        "governing_body": "Bộ Giáo dục và Đào tạo",
        "provice": "Hà Nội"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC HÀ NỘI",
        "governing_body": "Bộ Giáo dục và Đào tạo",
        "provice": "Hà Nội"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC HẢI DƯƠNG",
        "governing_body": "UBND Tỉnh Hải Dương",
        "provice": "Hải Dương"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC HẢI PHÒNG",
        "governing_body": "UBND TP. Hải Phòng",
        "provice": "Hải phòng"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC HÀNG HẢI",
        "governing_body": "Bộ Giao thông Vận Tải",
        "provice": "Hải phòng"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC HOA LƯ",
        "governing_body": "UBND Tỉnh Ninh Bình",
        "provice": "Ninh Bình"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC KHOA HỌC VÀ CÔNG NGHỆ HÀ NỘI",
        "governing_body": "Bộ Giáo dục và Đào tạo",
        "provice": "Hà Nội"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC KIỂM SÁT HÀ NỘI",
        "governing_body": "Viện Kiểm sát nhân dân tối cao",
        "provice": "Hà Nội"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC KIẾN TRÚC HÀ NỘI",
        "governing_body": "Bộ Xây dựng",
        "provice": "Hà Nội"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC KINH TẾ KỸ THUẬT CÔNG NGHIỆP",
        "governing_body": "Bộ Công Thương",
        "provice": "Nam Định"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC KINH TẾ QUỐC DÂN",
        "governing_body": "Bộ Giáo dục và Đào tạo",
        "provice": "Hà Nội"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC KỸ THUẬT Y TẾ HẢI DƯƠNG",
        "governing_body": "Bộ Y tế",
        "provice": "Hải Dương"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC LÂM NGHIỆP",
        "governing_body": "Bộ Nông nghiệp và PTNT",
        "provice": "Hà Nội"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC LAO ĐỘNG - XÃ HỘI",
        "governing_body": "Bộ LĐTB và Xã hội",
        "provice": "Hà Nội"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC LUẬT HÀ NỘI",
        "governing_body": "Bộ Tư pháp",
        "provice": "Hà Nội"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC MỎ ĐỊA CHẤT",
        "governing_body": "Bộ Giáo dục và Đào tạo",
        "provice": "Hà Nội"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC MỸ THUẬT CÔNG NGHIỆP",
        "governing_body": "Bộ Giáo dục và Đào tạo",
        "provice": "Hà Nội"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC MỸ THUẬT VIỆT NAM",
        "governing_body": "Bộ Văn hóa Thể thao và Du lịch",
        "provice": "Hà Nội"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC NGOẠI THƯƠNG",
        "governing_body": "Bộ Giáo dục và Đào tạo",
        "provice": "Hà Nội"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC NỘI VỤ HÀ NỘI",
        "governing_body": "Bộ Nội Vụ",
        "provice": "Hà Nội"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC NÔNG NGHIỆP HÀ NỘI",
        "governing_body": "Bộ Giáo dục và Đào tạo",
        "provice": "Hà Nội"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC SÂN KHẤU ĐIỆN ẢNH HÀ NỘI",
        "governing_body": "Bộ Văn hóa Thể thao và Du lịch",
        "provice": "Hà Nội"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC SAO ĐỎ",
        "governing_body": "Bộ Công Thương",
        "provice": "Hải Dương"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC SƯ PHẠM HÀ NỘI",
        "governing_body": "Bộ Giáo dục và Đào tạo",
        "provice": "Hà Nội"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC SƯ PHẠM HÀ NỘI 2",
        "governing_body": "Bộ Giáo dục và Đào tạo",
        "provice": "Vĩnh Phúc"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC SƯ PHẠM KỸ THUẬT HƯNG YÊN",
        "governing_body": "Bộ Giáo dục và Đào tạo",
        "provice": "Hưng Yên"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC SƯ PHẠM KỸ THUẬT NAM ĐỊNH",
        "governing_body": "Bộ LĐTB và Xã hội",
        "provice": "Nam Định"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC SƯ PHẠM NGHỆ THUẬT TRUNG ƯƠNG",
        "governing_body": "Bộ Giáo dục và Đào tạo",
        "provice": "Hà Nội"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC SƯ PHẠM THỂ DỤC THỂ THAO HÀ NỘI",
        "governing_body": "Bộ Giáo dục và Đào tạo",
        "provice": "Hà Nội"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC TÀI CHÍNH - QUẢN TRỊ KINH DOANH",
        "governing_body": "Bộ Tài chính",
        "provice": "Hưng Yên"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC TÀI NGUYÊN VÀ MÔI TRƯỜNG HÀ NỘI",
        "governing_body": "Bộ Tài nguyên và Môi trường",
        "provice": "Hà Nội"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC THÁI BÌNH",
        "governing_body": "UBND Tỉnh Thái Bình",
        "provice": "Thái Bình"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC THỂ DỤC THỂ THAO BẮC NINH",
        "governing_body": "Bộ Văn hóa Thể thao và Du lịch",
        "provice": "Bắc Ninh"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC THƯƠNG MẠI",
        "governing_body": "Bộ Giáo dục và Đào tạo",
        "provice": "Hà Nội"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC THUỶ LỢI",
        "governing_body": "Bộ Nông nghiệp và PTNT",
        "provice": "Hà Nội"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC VĂN HOÁ HÀ NỘI",
        "governing_body": "Bộ Văn hóa Thể thao và Du lịch",
        "provice": "Hà Nội"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC XÂY DỰNG",
        "governing_body": "Bộ Giáo dục và Đào tạo",
        "provice": "Hà Nội"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC Y HÀ NỘI",
        "governing_body": "Bộ Y tế",
        "provice": "Hà Nội"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC Y HẢI PHÒNG",
        "governing_body": "Bộ Y tế",
        "provice": "Hải phòng"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC Y TẾ CÔNG CỘNG",
        "governing_body": "Bộ Y tế",
        "provice": "Hà Nội"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC Y THÁI BÌNH",
        "governing_body": "Bộ Y tế",
        "provice": "Thái Bình"
    },
    {
        "name": "VIỆN ĐẠI HỌC MỞ HÀ NỘI",
        "governing_body": "Bộ Giáo dục và Đào tạo",
        "provice": "Hà Nội"
    },
    {
        "name": "ĐẠI HỌC HUẾ (07 trường ĐH)",
        "governing_body": "Bộ Giáo dục và Đào tạo",
        "provice": "Thừa Thiên Huế"
    },
    {
        "name": "- TRƯỜNG ĐẠI HỌC SƯ PHẠM",
        "governing_body": "Đại học Huế",
        "provice": "Thừa Thiên Huế"
    },
    {
        "name": "- TRƯỜNG ĐẠI HỌC KHOA HỌC",
        "governing_body": "Đại học Huế",
        "provice": "Thừa Thiên Huế"
    },
    {
        "name": "- TRƯỜNG ĐẠI HỌC NÔNG LÂM",
        "governing_body": "Đại học Huế",
        "provice": "Thừa Thiên Huế"
    },
    {
        "name": "- TRƯỜNG ĐẠI HỌC Y DƯỢC",
        "governing_body": "Đại học Huế",
        "provice": "Thừa Thiên Huế"
    },
    {
        "name": "- TRƯỜNG ĐẠI HỌC NGOẠI NGỮ",
        "governing_body": "Đại học Huế",
        "provice": "Thừa Thiên Huế"
    },
    {
        "name": "- TRƯỜNG ĐẠI HỌC KINH TẾ",
        "governing_body": "Đại học Huế",
        "provice": "Thừa Thiên Huế"
    },
    {
        "name": "- TRƯỜNG ĐẠI HỌC NGHỆ THUẬT",
        "governing_body": "Đại học Huế",
        "provice": "Thừa Thiên Huế"
    },
    {
        "name": "HỌC VIỆN ÂM NHẠC HUẾ",
        "governing_body": "Bộ Văn hóa Thể thao và Du lịch",
        "provice": "Thừa Thiên Huế"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC HÀ TĨNH",
        "governing_body": "UBND Tỉnh Hà Tĩnh",
        "provice": "Hà Tĩnh"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC HỒNG ĐỨC",
        "governing_body": "UBND Tỉnh Thanh Hoá",
        "provice": "Thanh Hóa"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC QUẢNG BÌNH",
        "governing_body": "UBND Tỉnh Quảng Bình",
        "provice": "Quảng Bình"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC SƯ PHẠM KỸ THUẬT VINH",
        "governing_body": "Bộ LĐTB và Xã hội",
        "provice": "Nghệ An"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC VĂN HOÁ, THỂ THAO VÀ DU LỊCH THANH HOÁ",
        "governing_body": "UBND Tỉnh Thanh Hoá",
        "provice": "Thanh Hóa"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC VINH",
        "governing_body": "Bộ Giáo dục và Đào tạo",
        "provice": "Nghệ An"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC Y KHOA VINH",
        "governing_body": "UBND Tỉnh Nghệ An",
        "provice": "Nghệ An"
    },
    {
        "name": "ĐẠI HỌC ĐÀ NẴNG (04 trường ĐH, 02 trường CĐ)",
        "governing_body": "Bộ Giáo dục và Đào tạo",
        "provice": "Đà Nẵng"
    },
    {
        "name": "- TRƯỜNG ĐẠI HỌC BÁCH KHOA",
        "governing_body": "Đại học Đà Nẵng",
        "provice": "Đà Nẵng"
    },
    {
        "name": "- TRƯỜNG ĐẠI HỌC KINH TẾ",
        "governing_body": "Đại học Đà Nẵng",
        "provice": "Đà Nẵng"
    },
    {
        "name": "- TRƯỜNG ĐẠI HỌC SƯ PHẠM",
        "governing_body": "Đại học Đà Nẵng",
        "provice": "Đà Nẵng"
    },
    {
        "name": "- TRƯỜNG ĐẠI HỌC NGOẠI NGỮ",
        "governing_body": "Đại học Đà Nẵng",
        "provice": "Đà Nẵng"
    },
    {
        "name": "- TRƯỜNG CAO ĐẲNG CÔNG NGHỆ",
        "governing_body": "Đại học Đà Nẵng",
        "provice": "Đà Nẵng"
    },
    {
        "name": "- TRƯỜNG CAO ĐẲNG CÔNG NGHỆ THÔNG TIN",
        "governing_body": "Đại học Đà Nẵng",
        "provice": "Đà Nẵng"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC KỸ THUẬT Y DƯỢC ĐÀ NẴNG",
        "governing_body": "Bộ Y tế",
        "provice": "Đà Nẵng"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC NHA TRANG",
        "governing_body": "Bộ Giáo dục và Đào tạo",
        "provice": "Khánh Hoà"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC PHẠM VĂN ĐỒNG",
        "governing_body": "UBND Tỉnh Quảng Ngãi",
        "provice": "Quảng Ngãi"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC PHÚ YÊN",
        "governing_body": "UBND Tỉnh Phú Yên",
        "provice": "Phú Yên"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC QUẢNG NAM",
        "governing_body": "UBND Tỉnh Quảng Nam",
        "provice": "Quảng Nam"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC QUY NHƠN",
        "governing_body": "Bộ Giáo dục và Đào tạo",
        "provice": "Bình Định"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC TÀI CHÍNH - KẾ TOÁN",
        "governing_body": "Bộ Tài chính",
        "provice": "Quảng Ngãi"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC THỂ DỤC THỂ THAO ĐÀ NẴNG",
        "governing_body": "Bộ Văn hóa Thể thao và Du lịch",
        "provice": "Đà Nẵng"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC XÂY DỰNG MIỀN TRUNG",
        "governing_body": "Bộ Xây dựng",
        "provice": "Phú Yên"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC ĐÀ LẠT",
        "governing_body": "Bộ Giáo dục và Đào tạo",
        "provice": "Lâm Đồng"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC TÂY NGUYÊN",
        "governing_body": "Bộ Giáo dục và Đào tạo",
        "provice": "Đak Lak"
    },
    {
        "name": "ĐẠI HỌC QUỐC GIA TP. HỒ CHÍ MINH (06 trường ĐH)",
        "governing_body": "Chính phủ",
        "provice": "TP Hồ Chí Minh"
    },
    {
        "name": "- TRƯỜNG ĐẠI HỌC BÁCH KHOA",
        "governing_body": "Đại học Quốc gia TP. HCM",
        "provice": "TP Hồ Chí Minh"
    },
    {
        "name": "- TRƯỜNG ĐẠI HỌC KHOA HỌC TỰ NHIÊN",
        "governing_body": "Đại học Quốc gia TP. HCM",
        "provice": "TP Hồ Chí Minh"
    },
    {
        "name": "- TRƯỜNG ĐẠI HỌC KHOA HỌC XÃ HỘI NHÂN VĂN",
        "governing_body": "Đại học Quốc gia TP. HCM",
        "provice": "TP Hồ Chí Minh"
    },
    {
        "name": "- TRƯỜNG ĐẠI HỌC CÔNG NGHỆ THÔNG TIN",
        "governing_body": "Đại học Quốc gia TP. HCM",
        "provice": "TP Hồ Chí Minh"
    },
    {
        "name": "- TRƯỜNG ĐẠI HỌC QUỐC TẾ",
        "governing_body": "Đại học Quốc gia TP. HCM",
        "provice": "TP Hồ Chí Minh"
    },
    {
        "name": "- TRƯỜNG ĐẠI HỌC KINH TẾ - LUẬT",
        "governing_body": "Đại học Quốc gia TP. HCM",
        "provice": "TP Hồ Chí Minh"
    },
    {
        "name": "HỌC VIỆN HÀNG KHÔNG VIỆT NAM",
        "governing_body": "Bộ Giao thông Vận Tải",
        "provice": "TP Hồ Chí Minh"
    },
    {
        "name": "NHẠC VIỆN TP.HCM",
        "governing_body": "Bộ Văn hóa Thể thao và Du lịch",
        "provice": "TP Hồ Chí Minh"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC CÔNG NGHIỆP THỰC PHẨM TP.HCM",
        "governing_body": "Bộ Công Thương",
        "provice": "TP Hồ Chí Minh"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC CÔNG NGHIỆP TP. HCM",
        "governing_body": "Bộ Công Thương",
        "provice": "TP Hồ Chí Minh"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC ĐỒNG NAI",
        "governing_body": "UBND Tỉnh Đồng Nai",
        "provice": "Đồng Nai"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC GIAO THÔNG VẬN TẢI TP.HCM",
        "governing_body": "Bộ Giao thông Vận Tải",
        "provice": "TP Hồ Chí Minh"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC KIẾN TRÚC THÀNH PHỐ HỒ CHÍ MINH",
        "governing_body": "Bộ Xây dựng",
        "provice": "TP Hồ Chí Minh"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC KINH TẾ TP. HỒ CHÍ MINH",
        "governing_body": "Bộ Giáo dục và Đào tạo",
        "provice": "TP Hồ Chí Minh"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC LUẬT TP.HCM",
        "governing_body": "Bộ Giáo dục và Đào tạo",
        "provice": "TP Hồ Chí Minh"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC MỞ TP.HCM",
        "governing_body": "Bộ Giáo dục và Đào tạo",
        "provice": "TP Hồ Chí Minh"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC MỸ THUẬT TP.HCM",
        "governing_body": "Bộ Văn hóa Thể thao và Du lịch",
        "provice": "TP Hồ Chí Minh"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC NGÂN HÀNG TP. HỒ CHÍ MINH",
        "governing_body": "Ngân hàng Nhà nước Việt Nam",
        "provice": "TP Hồ Chí Minh"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC NÔNG LÂM TP.HCM",
        "governing_body": "Bộ Giáo dục và Đào tạo",
        "provice": "TP Hồ Chí Minh"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC SÀI GÒN",
        "governing_body": "UBND TP. HCM",
        "provice": "TP Hồ Chí Minh"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC SÂN KHẤU, ĐIỆN ẢNH TP.HCM",
        "governing_body": "Bộ Văn hóa Thể thao và Du lịch",
        "provice": "TP Hồ Chí Minh"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC SƯ PHẠM KỸ THUẬT TP.HCM",
        "governing_body": "Bộ Giáo dục và Đào tạo",
        "provice": "TP Hồ Chí Minh"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC SƯ PHẠM THỂ DỤC THỂ THAO TP.HCM",
        "governing_body": "Bộ Giáo dục và Đào tạo",
        "provice": "TP Hồ Chí Minh"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC SƯ PHẠM TP.HCM",
        "governing_body": "Bộ Giáo dục và Đào tạo",
        "provice": "TP Hồ Chí Minh"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC TÀI CHÍNH - MARKETING",
        "governing_body": "Bộ Tài chính",
        "provice": "TP Hồ Chí Minh"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC TÀI NGUYÊN VÀ MÔI TRƯỜNG TP.HCM",
        "governing_body": "Bộ Tài nguyên và Môi trường",
        "provice": "TP Hồ Chí Minh"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC THỂ DỤC THỂ THAO THÀNH PHỐ HỒ CHÍ MINH",
        "governing_body": "Bộ Văn hóa Thể thao và Du lịch",
        "provice": "TP Hồ Chí Minh"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC THỦ DẦU MỘT",
        "governing_body": "UBND Tỉnh Bình Dương",
        "provice": "Bình Dương"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC TÔN ĐỨC THẮNG",
        "governing_body": "Tổng LĐLĐ VN",
        "provice": "TP Hồ Chí Minh"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC VĂN HOÁ TP.HCM",
        "governing_body": "Bộ Văn hóa Thể thao và Du lịch",
        "provice": "TP Hồ Chí Minh"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC VIỆT ĐỨC",
        "governing_body": "Bộ Giáo dục và Đào tạo",
        "provice": "Bình Dương"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC Y DƯỢC TP.HCM",
        "governing_body": "Bộ Y tế",
        "provice": "TP Hồ Chí Minh"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC Y KHOA PHẠM NGỌC THẠCH",
        "governing_body": "UBND TP. HCM",
        "provice": "TP Hồ Chí Minh"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC AN GIANG",
        "governing_body": "UBND Tỉnh An Giang",
        "provice": "An giang"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC BẠC LIÊU",
        "governing_body": "UBND Tỉnh Bạc Liêu",
        "provice": "Bạc Liêu"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC CẦN THƠ",
        "governing_body": "Bộ Giáo dục và Đào tạo",
        "provice": "Cần Thơ"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC ĐỒNG THÁP",
        "governing_body": "Bộ Giáo dục và Đào tạo",
        "provice": "Đồng Tháp"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC KỸ THUẬT CÔNG NGHỆ CẦN THƠ",
        "governing_body": "UBND TP. Cần Thơ",
        "provice": "Cần Thơ"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC TIỀN GIANG",
        "governing_body": "UBND Tỉnh Tiền Giang",
        "provice": "Tiền Giang"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC TRÀ VINH",
        "governing_body": "UBND Tỉnh Trà Vinh",
        "provice": "Trà Vinh"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC XÂY DỰNG MIỀN TÂY",
        "governing_body": "Bộ Xây dựng",
        "provice": "Vĩnh Long"
    },
    {
        "name": "TRƯỜNG ĐẠI HỌC Y DƯỢC CẦN THƠ",
        "governing_body": "Bộ Y tế",
        "provice": "Cần Thơ"
    }
];

module.exports = universities;