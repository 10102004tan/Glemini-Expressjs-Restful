const universities = [
  {
    name: 'ĐẠI HỌC THÁI NGUYÊN',
    governing_body: 'Bộ Giáo dục và Đào tạo',
    provice: 'Thái Nguyên',
  },
  {
    name: '- TRƯỜNG ĐẠI HỌC SƯ PHẠM',
    governing_body: 'Đại học Thái Nguyên',
    provice: 'Thái Nguyên',
  },
  {
    name: '- TRƯỜNG ĐẠI HỌC KỸ THUẬT CÔNG NGHIỆP',
    governing_body: 'Đại học Thái Nguyên',
    provice: 'Thái Nguyên',
  },
  {
    name: '- TRƯỜNG ĐẠI HỌC NÔNG LÂM',
    governing_body: 'Đại học Thái Nguyên',
    provice: 'Thái Nguyên',
  },
  {
    name: '- TRƯỜNG ĐẠI HỌC Y DƯỢC',
    governing_body: 'Đại học Thái Nguyên',
    provice: 'Thái Nguyên',
  },
  {
    name: '-TRƯỜNG ĐẠI HỌC KINH TẾ - QUẢN TRỊ KINH DOANH',
    governing_body: 'Đại học Thái Nguyên',
    provice: 'Thái Nguyên',
  },
  {
    name: '- TRƯỜNG ĐẠI HỌC KHOA HỌC',
    governing_body: 'Đại học Thái Nguyên',
    provice: 'Thái Nguyên',
  },
  {
    name: '- TRƯỜNG ĐẠI HỌC CÔNG NGHỆ THÔNG TIN VÀ TRUYỀN THÔNG',
    governing_body: 'Đại học Thái Nguyên',
    provice: 'Thái Nguyên',
  },
  {
    name: '- KHOA NGOẠI NGỮ',
    governing_body: 'Đại học Thái Nguyên',
    provice: 'Thái Nguyên',
  },
  {
    name: '- KHOA QUỐC TẾ',
    governing_body: 'Đại học Thái Nguyên',
    provice: 'Thái Nguyên',
  },
  {
    name: '- TRƯỜNG CAO ĐẲNG KINH TẾ - KỸ THUẬT',
    governing_body: 'Đại học Thái Nguyên',
    provice: 'Thái Nguyên',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC CÔNG NGHIỆP QUẢNG NINH',
    governing_body: 'Bộ Công Thương',
    provice: 'Quảng Ninh',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC CÔNG NGHIỆP VIỆT TRÌ',
    governing_body: 'Bộ Công Thương',
    provice: 'Phú Thọ',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC HÙNG VƯƠNG',
    governing_body: 'UBND Tỉnh Phú Thọ',
    provice: 'Phú Thọ',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC NÔNG LÂM BẮC GIANG',
    governing_body: 'Bộ Nông nghiệp và PTNT',
    provice: 'Bắc Giang',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC TÂY BẮC',
    governing_body: 'Bộ Giáo dục và Đào tạo',
    provice: 'Sơn La',
  },
  {
    name: 'ĐẠI HỌC QUỐC GIA HÀ NỘI (06 trường ĐH)',
    governing_body: 'Chính phủ',
    provice: 'Hà Nội',
  },
  {
    name: '- TRƯỜNG ĐẠI HỌC KHOA HỌC TỰ NHIÊN',
    governing_body: 'Đại học Quốc gia Hà Nội',
    provice: 'Hà Nội',
  },
  {
    name: '- TRƯỜNG ĐẠI HỌC KHOA HỌC XÃ HỘI NHÂN VĂN',
    governing_body: 'Đại học Quốc gia Hà Nội',
    provice: 'Hà Nội',
  },
  {
    name: '- TRƯỜNG ĐẠI HỌC NGOẠI NGỮ',
    governing_body: 'Đại học Quốc gia Hà Nội',
    provice: 'Hà Nội',
  },
  {
    name: '- TRƯỜNG ĐẠI HỌC CÔNG NGHỆ',
    governing_body: 'Đại học Quốc gia Hà Nội',
    provice: 'Hà Nội',
  },
  {
    name: '- TRƯỜNG ĐẠI HỌC KINH TẾ',
    governing_body: 'Đại học Quốc gia Hà Nội',
    provice: 'Hà Nội',
  },
  {
    name: '- TRƯỜNG ĐẠI HỌC GIÁO DỤC',
    governing_body: 'Đại học Quốc gia Hà Nội',
    provice: 'Hà Nội',
  },
  {
    name: 'HỌC VIỆN ÂM NHẠC QUỐC GIA VIỆT NAM',
    governing_body: 'Bộ Văn hóa Thể thao và Du lịch',
    provice: 'Hà Nội',
  },
  {
    name: 'HỌC VIỆN BÁO CHÍ  VÀ TUYÊN TRUYỀN',
    governing_body: 'Học viện Chính trị - Hành chính Quốc gia HCM',
    provice: 'Hà Nội',
  },
  {
    name: 'HỌC VIỆN CHÍNH SÁCH VÀ PHÁT TRIỂN',
    governing_body: 'Bộ Kế hoạch và Đầu tư',
    provice: 'Bắc Ninh',
  },
  {
    name: 'HỌC VIỆN CHÍNH TRỊ - HÀNH CHÍNH KHU VỰC I',
    governing_body: 'Học viện Chính trị - Hành chính Quốc gia HCM',
    provice: 'Hà Nội',
  },
  {
    name: 'HỌC VIỆN CÔNG NGHỆ BƯU CHÍNH VIỄN THÔNG',
    governing_body: 'Tập đoàn Bưu chính Viễn thông Việt Nam',
    provice: 'Hà Nội',
  },
  {
    name: 'HỌC VIỆN HÀNH CHÍNH',
    governing_body: 'Học viện Chính trị - Hành chính Quốc gia HCM',
    provice: 'Hà Nội',
  },
  {
    name: 'HỌC VIỆN KHOA HỌC XÃ HỘI',
    governing_body: 'Viện Khoa học Xã hội Việt Nam',
    provice: 'Hà Nội',
  },
  {
    name: 'HỌC VIỆN NGÂN HÀNG',
    governing_body: 'Ngân hàng Nhà nước Việt Nam',
    provice: 'Hà Nội',
  },
  {
    name: 'HỌC VIỆN NGOẠI GIAO',
    governing_body: 'Bộ Ngoại giao',
    provice: 'Hà Nội',
  },
  {
    name: 'HỌC VIỆN PHỤ NỮ VIỆT NAM',
    governing_body: 'Hội Liên hiệp Phụ nữ',
    provice: 'Hà Nội',
  },
  {
    name: 'HỌC VIỆN QUẢN LÝ GIÁO DỤC',
    governing_body: 'Bộ Giáo dục và Đào tạo',
    provice: 'Hà Nội',
  },
  {
    name: 'HỌC VIỆN TÀI CHÍNH',
    governing_body: 'Bộ Tài chính',
    provice: 'Hà Nội',
  },
  {
    name: 'HỌC VIỆN THANH THIẾU NIÊN VIỆT NAM',
    governing_body: 'Trung ương ĐTNCSHCM',
    provice: 'Hà Nội',
  },
  {
    name: 'HỌC VIỆN Y DƯỢC HỌC CỔ TRUYỀN VIỆT NAM',
    governing_body: 'Bộ Y tế',
    provice: 'Hà Nội',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC BÁCH KHOA HÀ NỘI',
    governing_body: 'Bộ Giáo dục và Đào tạo',
    provice: 'Hà Nội',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC CÔNG ĐOÀN',
    governing_body: 'Tổng LĐLĐ VN',
    provice: 'Hà Nội',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC CÔNG NGHỆ GIAO THÔNG VẬN TẢI',
    governing_body: 'Bộ Giao thông Vận Tải',
    provice: 'Hà Nội',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC CÔNG NGHIỆP HÀ NỘI',
    governing_body: 'Bộ Công Thương',
    provice: 'Hà Nội',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC CÔNG NGHIỆP VIỆT - HUNG',
    governing_body: 'Bộ Công Thương',
    provice: 'Hà Nội',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC DẦU KHÍ VIỆT NAM',
    governing_body: 'Tập đoàn Dầu khí Quốc gia Việt Nam',
    provice: 'Vĩnh Phúc',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC ĐIỆN LỰC',
    governing_body: 'Tập đoàn Điện lực Việt Nam',
    provice: 'Hà Nội',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC ĐIỀU DƯỠNG NAM ĐỊNH',
    governing_body: 'Bộ Y tế',
    provice: 'Nam Định',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC DƯỢC HÀ NỘI',
    governing_body: 'Bộ Y tế',
    provice: 'Hà Nội',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC GIAO THÔNG VẬN TẢI',
    governing_body: 'Bộ Giáo dục và Đào tạo',
    provice: 'Hà Nội',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC HÀ NỘI',
    governing_body: 'Bộ Giáo dục và Đào tạo',
    provice: 'Hà Nội',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC HẢI DƯƠNG',
    governing_body: 'UBND Tỉnh Hải Dương',
    provice: 'Hải Dương',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC HẢI PHÒNG',
    governing_body: 'UBND TP. Hải Phòng',
    provice: 'Hải phòng',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC HÀNG HẢI',
    governing_body: 'Bộ Giao thông Vận Tải',
    provice: 'Hải phòng',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC HOA LƯ',
    governing_body: 'UBND Tỉnh Ninh Bình',
    provice: 'Ninh Bình',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC KHOA HỌC VÀ CÔNG NGHỆ HÀ NỘI',
    governing_body: 'Bộ Giáo dục và Đào tạo',
    provice: 'Hà Nội',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC KIỂM SÁT HÀ NỘI',
    governing_body: 'Viện Kiểm sát nhân dân tối cao',
    provice: 'Hà Nội',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC KIẾN TRÚC HÀ NỘI',
    governing_body: 'Bộ Xây dựng',
    provice: 'Hà Nội',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC KINH TẾ KỸ THUẬT CÔNG NGHIỆP',
    governing_body: 'Bộ Công Thương',
    provice: 'Nam Định',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC KINH TẾ QUỐC DÂN',
    governing_body: 'Bộ Giáo dục và Đào tạo',
    provice: 'Hà Nội',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC KỸ THUẬT Y TẾ HẢI DƯƠNG',
    governing_body: 'Bộ Y tế',
    provice: 'Hải Dương',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC LÂM NGHIỆP',
    governing_body: 'Bộ Nông nghiệp và PTNT',
    provice: 'Hà Nội',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC LAO ĐỘNG - XÃ HỘI',
    governing_body: 'Bộ LĐTB và Xã hội',
    provice: 'Hà Nội',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC LUẬT HÀ NỘI',
    governing_body: 'Bộ Tư pháp',
    provice: 'Hà Nội',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC MỎ ĐỊA CHẤT',
    governing_body: 'Bộ Giáo dục và Đào tạo',
    provice: 'Hà Nội',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC MỸ THUẬT CÔNG NGHIỆP',
    governing_body: 'Bộ Giáo dục và Đào tạo',
    provice: 'Hà Nội',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC MỸ THUẬT VIỆT NAM',
    governing_body: 'Bộ Văn hóa Thể thao và Du lịch',
    provice: 'Hà Nội',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC NGOẠI THƯƠNG',
    governing_body: 'Bộ Giáo dục và Đào tạo',
    provice: 'Hà Nội',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC NỘI VỤ HÀ NỘI',
    governing_body: 'Bộ Nội Vụ',
    provice: 'Hà Nội',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC NÔNG NGHIỆP HÀ NỘI',
    governing_body: 'Bộ Giáo dục và Đào tạo',
    provice: 'Hà Nội',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC SÂN KHẤU ĐIỆN ẢNH HÀ NỘI',
    governing_body: 'Bộ Văn hóa Thể thao và Du lịch',
    provice: 'Hà Nội',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC SAO ĐỎ',
    governing_body: 'Bộ Công Thương',
    provice: 'Hải Dương',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC SƯ PHẠM HÀ NỘI',
    governing_body: 'Bộ Giáo dục và Đào tạo',
    provice: 'Hà Nội',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC SƯ PHẠM HÀ NỘI 2',
    governing_body: 'Bộ Giáo dục và Đào tạo',
    provice: 'Vĩnh Phúc',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC SƯ PHẠM KỸ THUẬT HƯNG YÊN',
    governing_body: 'Bộ Giáo dục và Đào tạo',
    provice: 'Hưng Yên',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC SƯ PHẠM KỸ THUẬT NAM ĐỊNH',
    governing_body: 'Bộ LĐTB và Xã hội',
    provice: 'Nam Định',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC SƯ PHẠM NGHỆ THUẬT TRUNG ƯƠNG',
    governing_body: 'Bộ Giáo dục và Đào tạo',
    provice: 'Hà Nội',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC SƯ PHẠM THỂ DỤC THỂ THAO HÀ NỘI',
    governing_body: 'Bộ Giáo dục và Đào tạo',
    provice: 'Hà Nội',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC TÀI CHÍNH - QUẢN TRỊ KINH DOANH',
    governing_body: 'Bộ Tài chính',
    provice: 'Hưng Yên',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC TÀI NGUYÊN VÀ MÔI TRƯỜNG HÀ NỘI',
    governing_body: 'Bộ Tài nguyên và Môi trường',
    provice: 'Hà Nội',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC THÁI BÌNH',
    governing_body: 'UBND Tỉnh Thái Bình',
    provice: 'Thái Bình',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC THỂ DỤC THỂ THAO BẮC NINH',
    governing_body: 'Bộ Văn hóa Thể thao và Du lịch',
    provice: 'Bắc Ninh',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC THƯƠNG MẠI',
    governing_body: 'Bộ Giáo dục và Đào tạo',
    provice: 'Hà Nội',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC THUỶ LỢI',
    governing_body: 'Bộ Nông nghiệp và PTNT',
    provice: 'Hà Nội',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC VĂN HOÁ HÀ NỘI',
    governing_body: 'Bộ Văn hóa Thể thao và Du lịch',
    provice: 'Hà Nội',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC XÂY DỰNG',
    governing_body: 'Bộ Giáo dục và Đào tạo',
    provice: 'Hà Nội',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC Y HÀ NỘI',
    governing_body: 'Bộ Y tế',
    provice: 'Hà Nội',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC Y HẢI PHÒNG',
    governing_body: 'Bộ Y tế',
    provice: 'Hải phòng',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC Y TẾ CÔNG CỘNG',
    governing_body: 'Bộ Y tế',
    provice: 'Hà Nội',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC Y THÁI BÌNH',
    governing_body: 'Bộ Y tế',
    provice: 'Thái Bình',
  },
  {
    name: 'VIỆN ĐẠI HỌC MỞ HÀ NỘI',
    governing_body: 'Bộ Giáo dục và Đào tạo',
    provice: 'Hà Nội',
  },
  {
    name: 'ĐẠI HỌC HUẾ (07 trường ĐH)',
    governing_body: 'Bộ Giáo dục và Đào tạo',
    provice: 'Thừa Thiên Huế',
  },
  {
    name: '- TRƯỜNG ĐẠI HỌC SƯ PHẠM',
    governing_body: 'Đại học Huế',
    provice: 'Thừa Thiên Huế',
  },
  {
    name: '- TRƯỜNG ĐẠI HỌC KHOA HỌC',
    governing_body: 'Đại học Huế',
    provice: 'Thừa Thiên Huế',
  },
  {
    name: '- TRƯỜNG ĐẠI HỌC NÔNG LÂM',
    governing_body: 'Đại học Huế',
    provice: 'Thừa Thiên Huế',
  },
  {
    name: '- TRƯỜNG ĐẠI HỌC Y DƯỢC',
    governing_body: 'Đại học Huế',
    provice: 'Thừa Thiên Huế',
  },
  {
    name: '- TRƯỜNG ĐẠI HỌC NGOẠI NGỮ',
    governing_body: 'Đại học Huế',
    provice: 'Thừa Thiên Huế',
  },
  {
    name: '- TRƯỜNG ĐẠI HỌC KINH TẾ',
    governing_body: 'Đại học Huế',
    provice: 'Thừa Thiên Huế',
  },
  {
    name: '- TRƯỜNG ĐẠI HỌC NGHỆ THUẬT',
    governing_body: 'Đại học Huế',
    provice: 'Thừa Thiên Huế',
  },
  {
    name: 'HỌC VIỆN ÂM NHẠC HUẾ',
    governing_body: 'Bộ Văn hóa Thể thao và Du lịch',
    provice: 'Thừa Thiên Huế',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC HÀ TĨNH',
    governing_body: 'UBND Tỉnh Hà Tĩnh',
    provice: 'Hà Tĩnh',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC HỒNG ĐỨC',
    governing_body: 'UBND Tỉnh Thanh Hoá',
    provice: 'Thanh Hóa',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC QUẢNG BÌNH',
    governing_body: 'UBND Tỉnh Quảng Bình',
    provice: 'Quảng Bình',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC SƯ PHẠM KỸ THUẬT VINH',
    governing_body: 'Bộ LĐTB và Xã hội',
    provice: 'Nghệ An',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC VĂN HOÁ, THỂ THAO VÀ DU LỊCH THANH HOÁ',
    governing_body: 'UBND Tỉnh Thanh Hoá',
    provice: 'Thanh Hóa',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC VINH',
    governing_body: 'Bộ Giáo dục và Đào tạo',
    provice: 'Nghệ An',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC Y KHOA VINH',
    governing_body: 'UBND Tỉnh Nghệ An',
    provice: 'Nghệ An',
  },
  {
    name: 'ĐẠI HỌC ĐÀ NẴNG (04 trường ĐH, 02 trường CĐ)',
    governing_body: 'Bộ Giáo dục và Đào tạo',
    provice: 'Đà Nẵng',
  },
  {
    name: '- TRƯỜNG ĐẠI HỌC BÁCH KHOA',
    governing_body: 'Đại học Đà Nẵng',
    provice: 'Đà Nẵng',
  },
  {
    name: '- TRƯỜNG ĐẠI HỌC KINH TẾ',
    governing_body: 'Đại học Đà Nẵng',
    provice: 'Đà Nẵng',
  },
  {
    name: '- TRƯỜNG ĐẠI HỌC SƯ PHẠM',
    governing_body: 'Đại học Đà Nẵng',
    provice: 'Đà Nẵng',
  },
  {
    name: '- TRƯỜNG ĐẠI HỌC NGOẠI NGỮ',
    governing_body: 'Đại học Đà Nẵng',
    provice: 'Đà Nẵng',
  },
  {
    name: '- TRƯỜNG CAO ĐẲNG CÔNG NGHỆ',
    governing_body: 'Đại học Đà Nẵng',
    provice: 'Đà Nẵng',
  },
  {
    name: '- TRƯỜNG CAO ĐẲNG CÔNG NGHỆ THÔNG TIN',
    governing_body: 'Đại học Đà Nẵng',
    provice: 'Đà Nẵng',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC KỸ THUẬT Y DƯỢC ĐÀ NẴNG',
    governing_body: 'Bộ Y tế',
    provice: 'Đà Nẵng',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC NHA TRANG',
    governing_body: 'Bộ Giáo dục và Đào tạo',
    provice: 'Khánh Hoà',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC PHẠM VĂN ĐỒNG',
    governing_body: 'UBND Tỉnh Quảng Ngãi',
    provice: 'Quảng Ngãi',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC PHÚ YÊN',
    governing_body: 'UBND Tỉnh Phú Yên',
    provice: 'Phú Yên',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC QUẢNG NAM',
    governing_body: 'UBND Tỉnh Quảng Nam',
    provice: 'Quảng Nam',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC QUY NHƠN',
    governing_body: 'Bộ Giáo dục và Đào tạo',
    provice: 'Bình Định',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC TÀI CHÍNH - KẾ TOÁN',
    governing_body: 'Bộ Tài chính',
    provice: 'Quảng Ngãi',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC THỂ DỤC THỂ THAO ĐÀ NẴNG',
    governing_body: 'Bộ Văn hóa Thể thao và Du lịch',
    provice: 'Đà Nẵng',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC XÂY DỰNG MIỀN TRUNG',
    governing_body: 'Bộ Xây dựng',
    provice: 'Phú Yên',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC ĐÀ LẠT',
    governing_body: 'Bộ Giáo dục và Đào tạo',
    provice: 'Lâm Đồng',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC TÂY NGUYÊN',
    governing_body: 'Bộ Giáo dục và Đào tạo',
    provice: 'Đak Lak',
  },
  {
    name: 'ĐẠI HỌC QUỐC GIA TP. HỒ CHÍ MINH (06 trường ĐH)',
    governing_body: 'Chính phủ',
    provice: 'TP Hồ Chí Minh',
  },
  {
    name: '- TRƯỜNG ĐẠI HỌC BÁCH KHOA',
    governing_body: 'Đại học Quốc gia TP. HCM',
    provice: 'TP Hồ Chí Minh',
  },
  {
    name: '- TRƯỜNG ĐẠI HỌC KHOA HỌC TỰ NHIÊN',
    governing_body: 'Đại học Quốc gia TP. HCM',
    provice: 'TP Hồ Chí Minh',
  },
  {
    name: '- TRƯỜNG ĐẠI HỌC KHOA HỌC XÃ HỘI NHÂN VĂN',
    governing_body: 'Đại học Quốc gia TP. HCM',
    provice: 'TP Hồ Chí Minh',
  },
  {
    name: '- TRƯỜNG ĐẠI HỌC CÔNG NGHỆ THÔNG TIN',
    governing_body: 'Đại học Quốc gia TP. HCM',
    provice: 'TP Hồ Chí Minh',
  },
  {
    name: '- TRƯỜNG ĐẠI HỌC QUỐC TẾ',
    governing_body: 'Đại học Quốc gia TP. HCM',
    provice: 'TP Hồ Chí Minh',
  },
  {
    name: '- TRƯỜNG ĐẠI HỌC KINH TẾ - LUẬT',
    governing_body: 'Đại học Quốc gia TP. HCM',
    provice: 'TP Hồ Chí Minh',
  },
  {
    name: 'HỌC VIỆN HÀNG KHÔNG VIỆT NAM',
    governing_body: 'Bộ Giao thông Vận Tải',
    provice: 'TP Hồ Chí Minh',
  },
  {
    name: 'NHẠC VIỆN TP.HCM',
    governing_body: 'Bộ Văn hóa Thể thao và Du lịch',
    provice: 'TP Hồ Chí Minh',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC CÔNG NGHIỆP THỰC PHẨM TP.HCM',
    governing_body: 'Bộ Công Thương',
    provice: 'TP Hồ Chí Minh',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC CÔNG NGHIỆP TP. HCM',
    governing_body: 'Bộ Công Thương',
    provice: 'TP Hồ Chí Minh',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC ĐỒNG NAI',
    governing_body: 'UBND Tỉnh Đồng Nai',
    provice: 'Đồng Nai',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC GIAO THÔNG VẬN TẢI TP.HCM',
    governing_body: 'Bộ Giao thông Vận Tải',
    provice: 'TP Hồ Chí Minh',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC KIẾN TRÚC THÀNH PHỐ HỒ CHÍ MINH',
    governing_body: 'Bộ Xây dựng',
    provice: 'TP Hồ Chí Minh',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC KINH TẾ TP. HỒ CHÍ MINH',
    governing_body: 'Bộ Giáo dục và Đào tạo',
    provice: 'TP Hồ Chí Minh',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC LUẬT TP.HCM',
    governing_body: 'Bộ Giáo dục và Đào tạo',
    provice: 'TP Hồ Chí Minh',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC MỞ TP.HCM',
    governing_body: 'Bộ Giáo dục và Đào tạo',
    provice: 'TP Hồ Chí Minh',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC MỸ THUẬT TP.HCM',
    governing_body: 'Bộ Văn hóa Thể thao và Du lịch',
    provice: 'TP Hồ Chí Minh',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC NGÂN HÀNG TP. HỒ CHÍ MINH',
    governing_body: 'Ngân hàng Nhà nước Việt Nam',
    provice: 'TP Hồ Chí Minh',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC NÔNG LÂM TP.HCM',
    governing_body: 'Bộ Giáo dục và Đào tạo',
    provice: 'TP Hồ Chí Minh',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC SÀI GÒN',
    governing_body: 'UBND TP. HCM',
    provice: 'TP Hồ Chí Minh',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC SÂN KHẤU, ĐIỆN ẢNH TP.HCM',
    governing_body: 'Bộ Văn hóa Thể thao và Du lịch',
    provice: 'TP Hồ Chí Minh',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC SƯ PHẠM KỸ THUẬT TP.HCM',
    governing_body: 'Bộ Giáo dục và Đào tạo',
    provice: 'TP Hồ Chí Minh',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC SƯ PHẠM THỂ DỤC THỂ THAO TP.HCM',
    governing_body: 'Bộ Giáo dục và Đào tạo',
    provice: 'TP Hồ Chí Minh',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC SƯ PHẠM TP.HCM',
    governing_body: 'Bộ Giáo dục và Đào tạo',
    provice: 'TP Hồ Chí Minh',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC TÀI CHÍNH - MARKETING',
    governing_body: 'Bộ Tài chính',
    provice: 'TP Hồ Chí Minh',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC TÀI NGUYÊN VÀ MÔI TRƯỜNG TP.HCM',
    governing_body: 'Bộ Tài nguyên và Môi trường',
    provice: 'TP Hồ Chí Minh',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC THỂ DỤC THỂ THAO THÀNH PHỐ HỒ CHÍ MINH',
    governing_body: 'Bộ Văn hóa Thể thao và Du lịch',
    provice: 'TP Hồ Chí Minh',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC THỦ DẦU MỘT',
    governing_body: 'UBND Tỉnh Bình Dương',
    provice: 'Bình Dương',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC TÔN ĐỨC THẮNG',
    governing_body: 'Tổng LĐLĐ VN',
    provice: 'TP Hồ Chí Minh',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC VĂN HOÁ TP.HCM',
    governing_body: 'Bộ Văn hóa Thể thao và Du lịch',
    provice: 'TP Hồ Chí Minh',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC VIỆT ĐỨC',
    governing_body: 'Bộ Giáo dục và Đào tạo',
    provice: 'Bình Dương',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC Y DƯỢC TP.HCM',
    governing_body: 'Bộ Y tế',
    provice: 'TP Hồ Chí Minh',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC Y KHOA PHẠM NGỌC THẠCH',
    governing_body: 'UBND TP. HCM',
    provice: 'TP Hồ Chí Minh',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC AN GIANG',
    governing_body: 'UBND Tỉnh An Giang',
    provice: 'An giang',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC BẠC LIÊU',
    governing_body: 'UBND Tỉnh Bạc Liêu',
    provice: 'Bạc Liêu',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC CẦN THƠ',
    governing_body: 'Bộ Giáo dục và Đào tạo',
    provice: 'Cần Thơ',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC ĐỒNG THÁP',
    governing_body: 'Bộ Giáo dục và Đào tạo',
    provice: 'Đồng Tháp',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC KỸ THUẬT CÔNG NGHỆ CẦN THƠ',
    governing_body: 'UBND TP. Cần Thơ',
    provice: 'Cần Thơ',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC TIỀN GIANG',
    governing_body: 'UBND Tỉnh Tiền Giang',
    provice: 'Tiền Giang',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC TRÀ VINH',
    governing_body: 'UBND Tỉnh Trà Vinh',
    provice: 'Trà Vinh',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC XÂY DỰNG MIỀN TÂY',
    governing_body: 'Bộ Xây dựng',
    provice: 'Vĩnh Long',
  },
  {
    name: 'TRƯỜNG ĐẠI HỌC Y DƯỢC CẦN THƠ',
    governing_body: 'Bộ Y tế',
    provice: 'Cần Thơ',
  },
];

const colleges = [
  {
    name: 'TRƯỜNG CAO ĐẲNG CƠ KHÍ LUYỆN KIM',
    governing_body: 'Bộ Công Thương',
    province: 'Thái Nguyên',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG CỘNG ĐỒNG BẮC KẠN',
    governing_body: 'UBND Tỉnh Bắc Cạn',
    province: 'Bắc Cạn',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG CỘNG ĐỒNG LAI CHÂU',
    governing_body: 'UBND Tỉnh Lai Châu',
    province: 'Lai Châu',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG CỘNG ĐỒNG LÀO CAI',
    governing_body: 'UBND Tỉnh Lào Cai',
    province: 'Lào Cai',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG CÔNG NGHỆ VÀ KINH TẾ CÔNG NGHIỆP',
    governing_body: 'Bộ Công Thương',
    province: 'Thái Nguyên',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG CÔNG NGHIỆP CẨM PHẢ',
    governing_body: 'Bộ Công Thương',
    province: 'Quảng Ninh',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG CÔNG NGHIỆP HOÁ CHẤT',
    governing_body: 'Tập Đoàn Hoá chất Việt Nam',
    province: 'Phú Thọ',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG CÔNG NGHIỆP THÁI NGUYÊN',
    governing_body: 'Bộ Công Thương',
    province: 'Thái Nguyên',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG CÔNG NGHIỆP THỰC PHẨM',
    governing_body: 'Bộ Công Thương',
    province: 'Phú Thọ',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG CÔNG NGHIỆP VÀ XÂY DỰNG',
    governing_body: 'Bộ Công Thương',
    province: 'Quảng Ninh',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG CÔNG NGHIỆP VIỆT ĐỨC',
    governing_body: 'Bộ Công Thương',
    province: 'Thái Nguyên',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG KINH TẾ - TÀI CHÍNH THÁI NGUYÊN',
    governing_body: 'UBND Tỉnh Thái Nguyên',
    province: 'Thái Nguyên',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG KINH TẾ KỸ THUẬT ĐIỆN BIÊN',
    governing_body: 'UBND Tỉnh Điện Biên',
    province: 'Điện Biên',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG KINH TẾ KỸ THUẬT PHÚ THỌ',
    governing_body: 'UBND Tỉnh Phú Thọ',
    province: 'Phú Thọ',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG KỸ THUẬT CÔNG NGHIỆP',
    governing_body: 'Bộ Công Thương',
    province: 'Bắc Giang',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG NGÔ GIA TỰ - BẮC GIANG',
    governing_body: 'UBND Tỉnh Bắc Giang',
    province: 'Bắc Giang',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG NÔNG LÂM ĐÔNG BẮC',
    governing_body: 'Bộ Nông nghiệp và PTNT',
    province: 'Quảng Ninh',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG SƠN LA',
    governing_body: 'UBND Tỉnh Sơn La',
    province: 'Sơn La',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG SƯ PHẠM CAO BẰNG',
    governing_body: 'UBND Tỉnh Cao Bằng',
    province: 'Cao Bằng',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG SƯ PHẠM ĐIỆN BIÊN',
    governing_body: 'UBND Tỉnh Điện Biên',
    province: 'Điện Biên',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG SƯ PHẠM HOÀ BÌNH',
    governing_body: 'UBND Tỉnh Hoà Bình',
    province: 'Hoà Bình',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG SƯ PHẠM LẠNG SƠN',
    governing_body: 'UBND Tỉnh Lạng Sơn',
    province: 'Lạng Sơn',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG SƯ PHẠM LÀO CAI',
    governing_body: 'UBND Tỉnh Lào Cai',
    province: 'Lào Cai',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG SƯ PHẠM QUẢNG NINH',
    governing_body: 'UBND Tỉnh Quảng Ninh',
    province: 'Quảng Ninh',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG SƯ PHẠM THÁI NGUYÊN',
    governing_body: 'UBND Tỉnh Thái Nguyên',
    province: 'Thái Nguyên',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG SƯ PHẠM YÊN BÁI',
    governing_body: 'UBND Tỉnh Yên Bái',
    province: 'Yên Bái',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG THƯƠNG MẠI VÀ DU LỊCH',
    governing_body: 'Bộ Công Thương',
    province: 'Thái Nguyên',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG TUYÊN QUANG',
    governing_body: 'UBND Tỉnh Tuyên Quang',
    province: 'Tuyên Quang',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG VĂN HOÁ NGHỆ THUẬT DU LỊCH YÊN BÁI',
    governing_body: 'Bộ Văn hóa Thể thao và Du lịch',
    province: 'Yên Bái',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG VĂN HOÁ NGHỆ THUẬT TÂY BẮC',
    governing_body: 'Bộ Văn hóa Thể thao và Du lịch',
    province: 'Hoà Bình',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG VĂN HOÁ NGHỆ THUẬT VÀ DU LỊCH HẠ LONG',
    governing_body: 'UBND Tỉnh Quảng Ninh',
    province: 'Quảng Ninh',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG VĂN HOÁ NGHỆ THUẬT VIỆT BẮC',
    governing_body: 'Bộ Văn hóa Thể thao và Du lịch',
    province: 'Thái Nguyên',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG Y TẾ ĐIỆN BIÊN',
    governing_body: 'UBND Tỉnh Điện Biên',
    province: 'Điện Biên',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG Y TẾ LẠNG SƠN',
    governing_body: 'UBND Tỉnh Lạng Sơn',
    province: 'Lạng Sơn',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG Y TẾ PHÚ THỌ',
    governing_body: 'UBND Tỉnh Phú Thọ',
    province: 'Phú Thọ',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG Y TẾ QUẢNG NINH',
    governing_body: 'UBND Tỉnh Quảng Ninh',
    province: 'Quảng Ninh',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG Y TẾ SƠN LA',
    governing_body: 'UBND Tỉnh Sơn La',
    province: 'Sơn La',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG Y TẾ THÁI NGUYÊN',
    governing_body: 'UBND Tỉnh Thái Nguyên',
    province: 'Thái Nguyên',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG Y TẾ YÊN BÁI',
    governing_body: 'UBND Tỉnh Yên Bái',
    province: 'Yên Bái',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG CỘNG ĐỒNG HÀ NỘI',
    governing_body: 'UBND TP. Hà Nội',
    province: 'Hà Nội',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG CỘNG ĐỒNG HÀ TÂY',
    governing_body: 'UBND TP. Hà Nội',
    province: 'Hà Nội',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG CỘNG ĐỒNG HẢI PHÒNG',
    governing_body: 'UBND TP. Hải Phòng',
    province: 'Hải phòng',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG CÔNG NGHỆ VÀ KINH TẾ HÀ NỘI',
    governing_body: 'Bộ Nông nghiệp và PTNT',
    province: 'Hà Nội',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG CÔNG NGHỆ VIETTRONICS',
    governing_body: 'Tổng công ty CP Điện tử và Tin học VN',
    province: 'Hải phòng',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG CÔNG NGHIỆP DỆT MAY THỜI TRANG HÀ NỘI',
    governing_body: 'Tổng công ty dệt may',
    province: 'Hà Nội',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG CÔNG NGHIỆP HƯNG YÊN',
    governing_body: 'Bộ Công Thương',
    province: 'Hưng Yên',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG CÔNG NGHIỆP IN',
    governing_body: 'Bộ Thông tin và Truyền thông',
    province: 'Hà Nội',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG CÔNG NGHIỆP NAM ĐỊNH',
    governing_body: 'Bộ Công Thương',
    province: 'Nam Định',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG CÔNG NGHIỆP PHÚC YÊN',
    governing_body: 'Bộ Công Thương',
    province: 'Vĩnh Phúc',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG ĐIỆN TỬ - ĐIỆN LẠNH HÀ NỘI',
    governing_body: 'UBND TP. Hà Nội',
    province: 'Hà Nội',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG DU LỊCH HÀ NỘI',
    governing_body: 'Bộ Văn hóa Thể thao và Du lịch',
    province: 'Hà Nội',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG DU LỊCH VÀ THƯƠNG MẠI',
    governing_body: 'Bộ Công Thương',
    province: 'Hải Dương',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG DƯỢC TRUNG ƯƠNG',
    governing_body: 'Bộ Y tế',
    province: 'Hải Dương',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG HẢI DƯƠNG',
    governing_body: 'UBND Tỉnh Hải Dương',
    province: 'Hải Dương',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG HÀNG HẢI I',
    governing_body: 'Bộ Giao thông Vận Tải',
    province: 'Hải phòng',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG KINH TẾ - KỸ THUẬT THƯƠNG MẠI',
    governing_body: 'Bộ Công Thương',
    province: 'Hà Nội',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG KINH TẾ - KỸ THUẬT TRUNG ƯƠNG',
    governing_body: 'Liên minh hợp tác xã Việt Nam',
    province: 'Hà Nội',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG KINH TẾ - KỸ THUẬT VĨNH PHÚC',
    governing_body: 'UBND Tỉnh Vĩnh Phúc',
    province: 'Vĩnh Phúc',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG KINH TẾ CÔNG NGHIỆP HÀ NỘI',
    governing_body: 'Bộ Công Thương',
    province: 'Hà Nội',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG MÚA VIỆT NAM',
    governing_body: 'Bộ Văn hóa Thể thao và Du lịch',
    province: 'Hà Nội',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG NGHỆ THUẬT HÀ NỘI',
    governing_body: 'UBND TP. Hà Nội',
    province: 'Hà Nội',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG NÔNG NGHIỆP VÀ PHÁT TRIỂN NÔNG THÔN BẮC BỘ',
    governing_body: 'Bộ Nông nghiệp và PTNT',
    province: 'Hà Nội',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG PHÁT THANH TRUYỀN HÌNH I',
    governing_body: 'Đài Tiếng nói Việt Nam',
    province: 'Hà Nam',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG SƯ PHẠM BẮC NINH',
    governing_body: 'UBND Tỉnh Bắc Ninh',
    province: 'Bắc Ninh',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG SƯ PHẠM HÀ NAM',
    governing_body: 'UBND Tỉnh Hà Nam',
    province: 'Hà Nam',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG SƯ PHẠM HÀ NỘI',
    governing_body: 'UBND TP. Hà Nội',
    province: 'Hà Nội',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG SƯ PHẠM HÀ TÂY',
    governing_body: 'UBND Tỉnh Hà Tây',
    province: 'Hà Nội',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG SƯ PHẠM HƯNG YÊN',
    governing_body: 'UBND Tỉnh Hưng Yên',
    province: 'Hưng Yên',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG SƯ PHẠM NAM ĐỊNH',
    governing_body: 'UBND Tỉnh Nam Định',
    province: 'Nam Định',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG SƯ PHẠM THÁI BÌNH',
    governing_body: 'UBND Tỉnh Thái Bình',
    province: 'Thái Bình',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG SƯ PHẠM TRUNG ƯƠNG',
    governing_body: 'Bộ Giáo dục và Đào tạo',
    province: 'Hà Nội',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG THỐNG KÊ',
    governing_body: 'Tổng cục Thống kê',
    province: 'Bắc Ninh',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG THƯƠNG MẠI VÀ DU LỊCH HÀ NỘI',
    governing_body: 'UBND TP. Hà Nội',
    province: 'Hà Nội',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG THUỶ LỢI BẮC BỘ',
    governing_body: 'Bộ Nông nghiệp và PTNT',
    province: 'Hà Nam',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG THUỶ SẢN',
    governing_body: 'Bộ Nông nghiệp và PTNT',
    province: 'Bắc Ninh',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG TRUYỀN HÌNH',
    governing_body: 'Đài Truyền hình Việt Nam',
    province: 'Hà Nội',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG VĂN HOÁ NGHỆ THUẬT THÁI BÌNH',
    governing_body: 'UBND Tỉnh Thái Bình',
    province: 'Thái Bình',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG VĨNH PHÚC',
    governing_body: 'UBND Tỉnh Vĩnh Phúc',
    province: 'Vĩnh Phúc',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG XÂY DỰNG CÔNG TRÌNH ĐÔ THỊ',
    governing_body: 'Bộ Xây dựng',
    province: 'Hà Nội',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG XÂY DỰNG NAM ĐỊNH',
    governing_body: 'Bộ Xây dựng',
    province: 'Nam Định',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG XÂY DỰNG SỐ 1',
    governing_body: 'Bộ Xây dựng',
    province: 'Hà Nội',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG Y TẾ HÀ ĐÔNG',
    governing_body: 'UBND TP. Hà Nội',
    province: 'Hà Nội',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG Y TẾ HÀ NAM',
    governing_body: 'UBND Tỉnh Hà Nam',
    province: 'Hà Nam',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG Y TẾ HÀ NỘI',
    governing_body: 'UBND TP. Hà Nội',
    province: 'Hà Nội',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG Y TẾ HẢI PHÒNG',
    governing_body: 'UBND TP. Hải Phòng',
    province: 'Hải phòng',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG Y TẾ HƯNG YÊN',
    governing_body: 'UBND Tỉnh Hưng Yên',
    province: 'Hưng Yên',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG Y TẾ NINH BÌNH',
    governing_body: 'UBND Tỉnh Ninh Bình',
    province: 'Ninh Bình',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG Y TẾ THÁI BÌNH',
    governing_body: 'UBND Tỉnh Thái Bình',
    province: 'Thái Bình',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG CÔNG NGHIỆP HUẾ',
    governing_body: 'Bộ Công Thương',
    province: 'Thừa Thiên Huế',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG GIAO THÔNG VẬN TẢI MIỀN TRUNG',
    governing_body: 'Bộ Giao thông Vận Tải',
    province: 'Nghệ An',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG KINH TẾ KỸ THUẬT NGHỆ AN',
    governing_body: 'UBND Tỉnh Nghệ An',
    province: 'Nghệ An',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG SƯ PHẠM NGHỆ AN',
    governing_body: 'UBND Tỉnh Nghệ An',
    province: 'Nghệ An',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG SƯ PHẠM QUẢNG TRỊ',
    governing_body: 'UBND Tỉnh Quảng Trị',
    province: 'Quảng Trị',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG SƯ PHẠM THỪA THIÊN HUẾ',
    governing_body: 'UBND Tỉnh Thừa Thiên Huế',
    province: 'Thừa Thiên Huế',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG TÀI NGUYÊN VÀ MÔI TRƯỜNG MIỀN TRUNG',
    governing_body: 'Bộ Tài nguyên và Môi trường',
    province: 'Thanh Hóa',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG THỂ DỤC THỂ THAO THANH HOÁ',
    governing_body: 'UBND Tỉnh Thanh Hoá',
    province: 'Thanh Hóa',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG VĂN HOÁ NGHỆ THUẬT NGHỆ AN',
    governing_body: 'UBND Tỉnh Nghệ An',
    province: 'Nghệ An',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG VĂN HOÁ, THỂ THAO VÀ DU LỊCH NGUYỄN DU',
    governing_body: 'Bộ Văn hóa Thể thao và Du lịch',
    province: 'Hà Tĩnh',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG Y TẾ HÀ TĨNH',
    governing_body: 'UBND Tỉnh Hà Tĩnh',
    province: 'Hà Tĩnh',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG Y TẾ HUẾ',
    governing_body: 'UBND Tỉnh Thừa Thiên Huế',
    province: 'Thừa Thiên Huế',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG Y TẾ THANH HOÁ',
    governing_body: 'UBND Tỉnh Thanh Hoá',
    province: 'Thanh Hóa',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG BÌNH ĐỊNH',
    governing_body: 'UBND Tỉnh Bình Định',
    province: 'Bình Định',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG CỘNG ĐỒNG BÌNH THUẬN',
    governing_body: 'UBND Tỉnh Bình Thuận',
    province: 'Bình Thuận',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG CÔNG NGHỆ - KINH TẾ VÀ THỦY LỢI MIỀN TRUNG',
    governing_body: 'Bộ Nông nghiệp và PTNT',
    province: 'Quảng Nam',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG CÔNG NGHỆ THÔNG TIN HỮU NGHỊ VIỆT - HÀN',
    governing_body: 'Bộ Thông tin và Truyền thông',
    province: 'Đà Nẵng',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG CÔNG NGHIỆP TUY HOÀ',
    governing_body: 'Bộ Công Thương',
    province: 'Phú Yên',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG ĐIỆN LỰC MIỀN TRUNG',
    governing_body: 'Tập đoàn Điện lực Việt Nam',
    province: 'Quảng Nam',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG GIAO THÔNG VẬN TẢI II',
    governing_body: 'Bộ Giao thông Vận Tải',
    province: 'Đà Nẵng',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG KINH TẾ - KẾ HOẠCH ĐÀ NẴNG',
    governing_body: 'Bộ Kế hoạch và Đầu tư',
    province: 'Đà Nẵng',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG KINH TẾ - KỸ THUẬT QUẢNG NAM',
    governing_body: 'UBND Tỉnh Quảng Nam',
    province: 'Quảng Nam',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG LƯƠNG THỰC THỰC PHẨM',
    governing_body: 'Bộ Nông nghiệp và PTNT',
    province: 'Đà Nẵng',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG SƯ PHẠM NHA TRANG',
    governing_body: 'UBND Tỉnh Nha Trang',
    province: 'Khánh Hoà',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG SƯ PHẠM NINH THUẬN',
    governing_body: 'UBND Tỉnh Ninh Thuận',
    province: 'Ninh Thuận',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG SƯ PHẠM TRUNG ƯƠNG NHA TRANG',
    governing_body: 'Bộ Giáo dục và Đào tạo',
    province: 'Khánh Hoà',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG THƯƠNG MẠI',
    governing_body: 'Bộ Công Thương',
    province: 'Đà Nẵng',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG VĂN HÓA NGHỆ THUẬT VÀ DU LỊCH NHA TRANG',
    governing_body: 'UBND Tỉnh Khánh Hòa',
    province: 'Khánh Hoà',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG Y TẾ BÌNH ĐỊNH',
    governing_body: 'UBND Tỉnh Bình Định',
    province: 'Bình Định',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG Y TẾ BÌNH THUẬN',
    governing_body: 'UBND Tỉnh Bình Thuận',
    province: 'Bình Thuận',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG Y TẾ ĐẶNG THÙY TRÂM',
    governing_body: 'UBND Tỉnh Quảng Ngãi',
    province: 'Quảng Ngãi',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG Y TẾ KHÁNH HOÀ',
    governing_body: 'UBND Tỉnh Khánh Hòa',
    province: 'Khánh Hoà',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG Y TẾ QUẢNG NAM',
    governing_body: 'UBND Tỉnh Quảng Nam',
    province: 'Quảng Nam',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG CÔNG NGHỆ VÀ KINH TẾ BẢO LỘC',
    governing_body: 'Bộ Nông nghiệp và PTNT',
    province: 'Lâm Đồng',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG KINH TẾ - KỸ THUẬT KON TUM',
    governing_body: 'UBND Tỉnh Kon Tum',
    province: 'Kon Tum',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG KINH TẾ - KỸ THUẬT LÂM ĐỒNG',
    governing_body: 'UBND Tỉnh Lâm Đồng',
    province: 'Lâm Đồng',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG SƯ PHẠM ĐÀ LẠT',
    governing_body: 'UBND Tỉnh Lâm Đồng',
    province: 'Lâm Đồng',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG SƯ PHẠM ĐĂK LĂK',
    governing_body: 'UBND Tỉnh Đăk lăk',
    province: 'Đak Lak',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG SƯ PHẠM GIA LAI',
    governing_body: 'UBND Tỉnh Gia Lai',
    province: 'Gia Lai',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG SƯ PHẠM KON TUM',
    governing_body: 'UBND Tỉnh Kon Tum',
    province: 'Kon Tum',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG VĂN HOÁ NGHỆ THUẬT ĐĂK LĂK',
    governing_body: 'UBND Tỉnh Đăk lăk',
    province: 'Đak Lak',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG Y TẾ LÂM ĐỒNG',
    governing_body: 'UBND Tỉnh Lâm Đồng',
    province: 'Lâm Đồng',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG CỘNG ĐỒNG BÀ RỊA – VŨNG TÀU',
    governing_body: 'UBND Tỉnh B.Rịa Vũng tàu',
    province: 'Bà Rịa Vũng Tàu',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG CÔNG NGHỆ THỦ ĐỨC',
    governing_body: 'UBND TP. HCM',
    province: 'TP. HCM',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG CÔNG NGHỆ VÀ QUẢN TRỊ SONADEZI',
    governing_body: 'Tổng công ty Phát triển khu công nghiệp Sonadezi',
    province: 'Đồng Nai',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG CÔNG NGHIỆP CAO SU',
    governing_body: 'Bộ Công Thương',
    province: 'Bình Phước',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG CÔNG THƯƠNG THÀNH PHỐ HỒ CHÍ MINH',
    governing_body: 'Bộ Công Thương',
    province: 'TP. HCM',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG ĐIỆN LỰC TP.HCM',
    governing_body: 'Tập đoàn Điện lực Việt Nam',
    province: 'TP. HCM',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG GIAO THÔNG VẬN TẢI III',
    governing_body: 'Bộ Giao thông Vận Tải',
    province: 'TP. HCM',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG GIAO THÔNG VẬN TẢI TP.HCM',
    governing_body: 'UBND TP. HCM',
    province: 'TP. HCM',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG KINH TẾ - KỸ THUẬT PHÚ LÂM',
    governing_body: 'UBND TP. HCM',
    province: 'TP. HCM',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG KINH TẾ - KỸ THUẬT VINATEX TP.HCM',
    governing_body: 'Tập đoàn Dệt - May Việt Nam',
    province: 'TP. HCM',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG KINH TẾ ĐỐI NGOẠI',
    governing_body: 'Bộ Công Thương',
    province: 'TP. HCM',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG KINH TẾ TP.HỒ CHÍ MINH',
    governing_body: 'UBND TP. HCM',
    province: 'TP. HCM',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG KỸ THUẬT CAO THẮNG',
    governing_body: 'Bộ Công Thương',
    province: 'TP. HCM',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG KỸ THUẬT LÝ TỰ TRỌNG TP.HCM',
    governing_body: 'Bộ Công Thương',
    province: 'TP. HCM',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG MỸ THUẬT TRANG TRÍ ĐỒNG NAI',
    governing_body: 'Bộ Văn hóa Thể thao và Du lịch',
    province: 'Đồng Nai',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG PHÁT THANH TRUYỀN HÌNH II',
    governing_body: 'Đài Tiếng nói Việt Nam',
    province: 'TP. HCM',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG SƯ PHẠM BÀ RỊA-VŨNG TÀU',
    governing_body: 'UBND Tỉnh B.Rịa Vũng tàu',
    province: 'Bà Rịa Vũng Tàu',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG SƯ PHẠM BÌNH PHƯỚC',
    governing_body: 'UBND Tỉnh Bình Phước',
    province: 'Bình Phước',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG SƯ PHẠM TÂY NINH',
    governing_body: 'UBND Tỉnh Tây Ninh',
    province: 'Tây Ninh',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG SƯ PHẠM TRUNG ƯƠNG TP.HCM',
    governing_body: 'Bộ Giáo dục và Đào tạo',
    province: 'TP. HCM',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG TÀI CHÍNH HẢI QUAN',
    governing_body: 'Bộ Tài chính',
    province: 'TP. HCM',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG VĂN HOÁ NGHỆ THUẬT TP.HCM',
    governing_body: 'UBND TP. HCM',
    province: 'TP. HCM',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG XÂY DỰNG SỐ 2',
    governing_body: 'Bộ Xây dựng',
    province: 'TP. HCM',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG Y TẾ BÌNH DƯƠNG',
    governing_body: 'UBND Tỉnh Bình Dương',
    province: 'Bình Dương',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG Y TẾ ĐỒNG NAI',
    governing_body: 'UBND Tỉnh Đồng Nai',
    province: 'Đồng Nai',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG BẾN TRE',
    governing_body: 'UBND Tỉnh Bến Tre',
    province: 'Bến Tre',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG CẦN THƠ',
    governing_body: 'UBND Tỉnh Cần Thơ',
    province: 'Cần Thơ',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG CƠ ĐIỆN VÀ NÔNG NGHIỆP NAM BỘ',
    governing_body: 'Bộ Nông nghiệp và PTNT',
    province: 'Cần Thơ',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG CỘNG ĐỒNG CÀ MAU',
    governing_body: 'UBND Tỉnh Cà Mau',
    province: 'Cà Mau',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG CỘNG ĐỒNG ĐỒNG THÁP',
    governing_body: 'UBND Tỉnh Đồng Tháp',
    province: 'Đồng Tháp',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG CỘNG ĐỒNG HẬU GIANG',
    governing_body: 'UBND Tỉnh Hậu Giang',
    province: 'Hậu Giang',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG CỘNG ĐỒNG KIÊN GIANG',
    governing_body: 'UBND Tỉnh Kiên Giang',
    province: 'Kiên Giang',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG CỘNG ĐỒNG SÓC TRĂNG',
    governing_body: 'UBND Tỉnh Sóc Trăng',
    province: 'Sóc Trăng',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG CỘNG ĐỒNG VĨNH LONG',
    governing_body: 'UBND Tỉnh Vĩnh Long',
    province: 'Vĩnh Long',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG KINH TẾ - KỸ THUẬT CẦN THƠ',
    governing_body: 'UBND Tỉnh Cần Thơ',
    province: 'Cần Thơ',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG KINH TẾ - TÀI CHÍNH VĨNH LONG',
    governing_body: 'UBND Tỉnh Vĩnh Long',
    province: 'Vĩnh Long',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG KINH TẾ KỸ THUẬT KIÊN GIANG',
    governing_body: 'UBND Tỉnh Kiên Giang',
    province: 'Kiên Giang',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG NÔNG NGHIỆP NAM BỘ',
    governing_body: 'Bộ Nông nghiệp và PTNT',
    province: 'Tiền Giang',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG SƯ PHẠM CÀ MAU',
    governing_body: 'UBND Tỉnh Cà Mau',
    province: 'Cà Mau',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG SƯ PHẠM KIÊN GIANG',
    governing_body: 'UBND Tỉnh Kiên Giang',
    province: 'Kiên Giang',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG SƯ PHẠM KỸ THUẬT VĨNH LONG',
    governing_body: 'Bộ LĐTB và Xã hội',
    province: 'Vĩnh Long',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG SƯ PHẠM LONG AN',
    governing_body: 'UBND Tỉnh Long An',
    province: 'Long An',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG SƯ PHẠM SÓC TRĂNG',
    governing_body: 'UBND Tỉnh Sóc Trăng',
    province: 'Sóc Trăng',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG SƯ PHẠM VĨNH LONG',
    governing_body: 'UBND Tỉnh Vĩnh Long',
    province: 'Vĩnh Long',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG Y TẾ BẠC LIÊU',
    governing_body: 'UBND Tỉnh Bạc Liêu',
    province: 'Bạc Liêu',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG Y TẾ CÀ MAU',
    governing_body: 'UBND Tỉnh Cà Mau',
    province: 'Cà Mau',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG Y TẾ CẦN THƠ',
    governing_body: 'UBND Tỉnh Cần Thơ',
    province: 'Cần Thơ',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG Y TẾ ĐỒNG THÁP',
    governing_body: 'UBND Tỉnh Đồng Tháp',
    province: 'Đồng Tháp',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG Y TẾ KIÊN GIANG',
    governing_body: 'UBND Tỉnh Kiên Giang',
    province: 'Kiên Giang',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG Y TẾ TIỀN GIANG',
    governing_body: 'UBND Tỉnh Tiền Giang',
    province: 'Tiền Giang',
  },
  {
    name: 'TRƯỜNG CAO ĐẲNG Y TẾ TRÀ VINH',
    governing_body: 'UBND Tỉnh Trà Vinh',
    province: 'Trà Vinh',
  },
];

const universitiesV2 = [
  {
    name: 'Đại học Quốc gia Hà Nội:',
    governing_body: 'VNU',
    province: 'Hà Nội',
  },
  {
    name: 'Trường Đại học Công nghệ – ĐH QGHN',
    governing_body: 'VNU-UET',
    province: 'Hà Nội',
  },
  {
    name: 'Trường Đại học Giáo dục – ĐH QGHN',
    governing_body: 'VNU-UED',
    province: 'Hà Nội',
  },
  {
    name: 'Trường Đại học Kinh tế – ĐH QGHN',
    governing_body: 'VNU-UEB',
    province: 'Hà Nội',
  },
  {
    name: 'Trường Đại học Khoa học Tự nhiên – ĐH QGHN',
    governing_body: 'VNU-HUS',
    province: 'Hà Nội',
  },
  {
    name: 'Trường Đại học Khoa học Xã hội và Nhân văn – ĐH QGHN',
    governing_body: 'VNU-USSH',
    province: 'Hà Nội',
  },
  {
    name: 'Trường Đại học Ngoại ngữ – ĐH QGHN',
    governing_body: 'ULIS',
    province: 'Hà Nội',
  },
  {
    name: 'Trường Trường Đại học Việt – Nhật – ĐH QGHN',
    governing_body: 'VJU',
    province: 'Hà Nội',
  },
  {
    name: 'Viện Trần Nhân Tông – ĐH QGHN',
    governing_body: '',
    province: 'Hà Nội',
  },
  {
    name: 'Đại học Thương mại',
    governing_body: 'TMU',
    province: 'Hà Nam',
  },
  {
    name: 'Đại học Công nghiệp Việt-Hung',
    governing_body: 'VIU',
    province: 'TP. Hà Nội',
  },
  {
    name: 'Trường Đại học Bách khoa Hà Nội',
    governing_body: 'HUST',
    province: 'Hà Nội',
  },
  {
    name: 'Trường Đại học Công đoàn',
    governing_body: 'TUU',
    province: 'Hà Nội',
  },
  {
    name: 'Trường Đại học Công nghệ Giao thông Vận tải',
    governing_body: 'UTT',
    province: 'thành phố Hà Nội',
  },
  {
    name: 'Trường Đại học Công nghiệp Dệt May Hà Nội',
    governing_body: 'HICT',
    province: 'thành phố Hà Nội',
  },
  {
    name: 'Trường Đại học Công nghiệp Hà Nội',
    governing_body: 'HAUI',
    province: 'TP. Hà Nội',
  },
  {
    name: 'Trường Đại học Điện lực',
    governing_body: 'EPU',
    province: 'Hà Nội',
  },
  {
    name: 'Trường Đại học Dược Hà Nội',
    governing_body: 'HUP',
    province: 'Hà Nội',
  },
  {
    name: 'Trường Đại học Giao thông Vận tải',
    governing_body: 'UTC',
    province: 'Hà Nội',
  },
  {
    name: 'Trường Đại học Hà Nội',
    governing_body: 'HANU',
    province: 'Hà Nội',
  },
  {
    name: 'Trường Đại học Khoa học và Công nghệ Hà Nội (USTH, Đại học Việt Pháp)',
    governing_body: 'USTH',
    province: 'Hà Nội',
  },
  {
    name: 'Trường Đại học Kiểm sát Hà Nội',
    governing_body: 'HPU',
    province: 'Hà Nội',
  },
  {
    name: 'Trường Đại học Kiến trúc Hà Nội',
    governing_body: 'HAU',
    province: 'Hà Nội',
  },
  {
    name: 'Trường Đại học Kinh tế – Kỹ thuật Công nghiệp',
    governing_body: 'UNETI',
    province: 'Hà Nội',
  },
  {
    name: 'Trường Đại học Kinh tế Quốc dân',
    governing_body: 'NEU',
    province: 'Hà Nội',
  },
  {
    name: 'Trường Đại học Lâm nghiệp Việt Nam',
    governing_body: 'VNUF',
    province: 'Hà Nội',
  },
  {
    name: 'Trường Đại học Lao động – Xã hội',
    governing_body: 'ULSA',
    province: 'Hà Nội',
  },
  {
    name: 'Trường Đại học Luật Hà Nội',
    governing_body: 'HLU',
    province: 'Hà Nội',
  },
  {
    name: 'Trường Đại học Mỏ – Địa chất',
    governing_body: 'HUMG',
    province: 'Hà Nội',
  },
  {
    name: 'Trường Đại học Mỹ thuật Công nghiệp',
    governing_body: 'MTCN',
    province: 'Hà Nội',
  },
  {
    name: 'Trường Đại học Mỹ thuật Việt Nam',
    governing_body: 'VUFA',
    province: 'Hà Nội',
  },
  {
    name: 'Trường Đại học Ngoại thương',
    governing_body: 'FTU',
    province: 'Hà Nội',
  },
  {
    name: 'Trường Đại học Nội vụ Hà Nội',
    governing_body: 'HUHA',
    province: 'Hà Nội',
  },
  {
    name: 'Đại học Sân khấu – Điện ảnh Hà Nội',
    governing_body: 'SKD',
    province: 'Hà Nội',
  },
  {
    name: 'Trường Đại học Sư phạm Hà Nội',
    governing_body: 'HNUE',
    province: 'Hà Nội',
  },
  {
    name: 'Trường Đại học Sư phạm Nghệ thuật Trung ương',
    governing_body: 'NUAE',
    province: 'Hà Nội',
  },
  {
    name: 'Trường Đại học Sư phạm Thể dục Thể thao Hà Nội',
    governing_body: 'HUPES',
    province: 'Hà Nội',
  },
  {
    name: 'Đại học Tài nguyên và Môi trường Hà Nội',
    governing_body: 'HUNRE',
    province: 'Hà Nội',
  },
  {
    name: 'Trường Đại học Thủy lợi',
    governing_body: 'TLU',
    province: 'Hà Nội',
  },
  {
    name: 'Trường Đại học Văn hóa Hà Nội',
    governing_body: 'HUC',
    province: 'Hà Nội',
  },
  {
    name: 'Trường Đại học Xây dựng',
    governing_body: 'NUCE',
    province: 'Hà Nội',
  },
  {
    name: 'Trường Đại học Y Hà Nội',
    governing_body: 'HMU',
    province: 'Hà Nội',
  },
  {
    name: 'Trường Đại học Y tế Công cộng',
    governing_body: 'HUPH',
    province: 'Hà Nội',
  },
  {
    name: 'Trường Đại học Lao động – Xã hội, cơ sở Sơn Tây',
    governing_body: '',
    province: 'Hà Nội',
  },
  {
    name: 'Học viện Âm nhạc Quốc gia Việt Nam',
    governing_body: 'VNAM',
    province: 'Hà Nội',
  },
  {
    name: 'Học viện Múa Việt Nam',
    governing_body: '',
    province: 'Hà Nội',
  },
  {
    name: 'Học viện Báo chí và Tuyên truyền',
    governing_body: 'AJC',
    province: 'Hà Nội',
  },
  {
    name: 'Học viện Cán bộ Quản lý xây dựng và đô thị',
    governing_body: 'AMC',
    province: 'Hà Nội',
  },
  {
    name: 'Học viện Chính sách và phát triển',
    governing_body: 'APD',
    province: 'Hà Nội',
  },
  {
    name: 'Học viện Chính trị – Hành chính Quốc gia Hồ Chí Minh',
    governing_body: 'HCMA',
    province: 'Hà Nội',
  },
  {
    name: 'Học viện Công nghệ Bưu chính Viễn thông',
    governing_body: 'PTIT',
    province: 'quận Hà Đông',
  },
  {
    name: 'Học viện Dân tộc',
    governing_body: 'Academy for Ethnic Minorities (VAEM)',
    province: 'Hà Nội',
  },
  {
    name: 'Học viện Hành chính Quốc gia',
    governing_body: 'NAPA',
    province: 'Hà Nội',
  },
  {
    name: 'Học viện Khoa học và Công nghệ',
    governing_body: 'GUST',
    province: 'Hà Nội',
  },
  {
    name: 'Học viện Khoa học, Công nghệ và Đổi mới sáng tạo',
    governing_body: '',
    province: 'Hà Nội',
  },
  {
    name: 'Học viện Khoa học xã hội',
    governing_body: 'GASS',
    province: 'Đắk Lắk',
  },
  {
    name: 'Học viện Ngân hàng',
    governing_body: 'BA',
    province: 'Hà Nội',
  },
  {
    name: 'Học viện Ngoại giao Việt Nam',
    governing_body: 'DAV',
    province: 'Hà Nội',
  },
  {
    name: 'Học viện Nông nghiệp Việt Nam',
    governing_body: 'VNUA',
    province: 'Hà Nội',
  },
  {
    name: 'Học viện Phụ nữ Việt Nam',
    governing_body: 'VWA',
    province: 'Hà Nội',
  },
  {
    name: 'Học viện Quản lý Giáo dục',
    governing_body: 'National Academy of Education Managenment (NAEM)',
    province: 'Hà Nội',
  },
  {
    name: 'Học viện Tài chính',
    governing_body: 'AOF',
    province: 'Hà Nội',
  },
  {
    name: 'Học viện Thanh thiếu niên Việt Nam',
    governing_body: 'VYA',
    province: 'Hà Nội',
  },
  {
    name: 'Học viện Tòa án',
    governing_body: '',
    province: 'Hà Nội',
  },
  {
    name: 'Học viện Tư Pháp',
    governing_body: '‎Judicial Academy',
    province: 'Hà Nội',
  },
  {
    name: 'Học viện Y dược học cổ truyền Việt Nam',
    governing_body: 'VATM',
    province: 'Hà Nội',
  },
  {
    name: 'Viện Đại học Mở Hà Nội',
    governing_body: 'HOU',
    province: 'TP. Hà Nội',
  },
  {
    name: 'Trường Đại học Thủ đô Hà Nội',
    governing_body: 'HMU',
    province: 'Hà Nội',
  },
  {
    name: 'Trường Đại học Công nghệ Đông Á',
    governing_body: 'East Asia University of Technology (EAUT)',
    province: 'Hà Nội',
  },
  {
    name: 'Trường Đại học Công nghệ và Quản lý Hữu nghị',
    governing_body: 'UTM',
    province: 'Hà Nội',
  },
  {
    name: 'Trường Đại học Đại Nam',
    governing_body: 'Dai Nam University (DNU)',
    province: 'Hà Nội',
  },
  {
    name: 'Trường Đại học Đông Đô',
    governing_body: 'Hanoi Dong Do International University',
    province: 'Hà Nội',
  },
  {
    name: 'Trường Đại học FPT',
    governing_body: '',
    province: 'Hà Nội',
  },
  {
    name: 'Trường Đại học Hòa Bình',
    governing_body: 'PEACE UNIVERSITY',
    province: 'Hà Nội',
  },
  {
    name: 'Trường Đại học Kinh doanh và Công nghệ Hà Nội',
    governing_body: 'Ha Noi University of Business and Technology (HUBT)',
    province: 'Hà Nội',
  },
  {
    name: 'Trường Đại học Mỹ thuật Công nghiệp Á Châu',
    governing_body: 'Asia University of Arts and Design (AUAD)',
    province: 'Hà Nội',
  },
  {
    name: 'Trường Đại học Nguyễn Trãi',
    governing_body: 'Nguyen Trai University (NTU)',
    province: 'Hà Nội',
  },
  {
    name: 'Đại học Phương Đông',
    governing_body: 'Phuong Dong University',
    province: 'Hà Nội',
  },
  {
    name: 'Trường Đại học RMIT',
    governing_body: 'RMIT University Vietnam',
    province: 'Hà Nội',
  },
  {
    name: 'Trường Đại học Tài chính – Ngân hàng Hà Nội',
    governing_body: 'Hanoi Financial and Banking University – FBU)',
    province: 'Hà Nội',
  },
  {
    name: 'Trường Đại học Thăng Long',
    governing_body: 'Thăng Long University (TLU)',
    province: 'Hà Nội',
  },
  {
    name: 'Trường Đại học Thành Đô',
    governing_body: 'Thanh Do University (TDU)',
    province: 'Hà Nội',
  },
  {
    name: 'Trường Đại học Thành Tây',
    governing_body: 'Thanh Tay University Hanoi',
    province: 'Hà Nội.',
  },
  {
    name: 'Học viện Biên phòng',
    governing_body: '',
    province: 'thành phố Hà Nội',
  },
  {
    name: 'Học viện Chính trị Quân sự',
    governing_body: '',
    province: 'Hà Nội',
  },
  {
    name: 'Học viện Hậu cần',
    governing_body: '',
    province: 'thành phố Hà Nội',
  },
  {
    name: 'Học viện Khoa học Quân sự',
    governing_body: '',
    province: 'thành phố Hà Nội',
  },
  {
    name: 'Học viện Kỹ thuật Mật mã',
    governing_body: 'Vietnam Academy of Cryptography Techniques',
    province: 'Hà Nội',
  },
  {
    name: 'Học viện Kỹ thuật Quân sự',
    governing_body: '',
    province: 'thành phố Hà Nội',
  },
  {
    name: 'Học viện Phòng không – Không quân',
    governing_body: '',
    province: 'thành phố Hà Nội',
  },
  {
    name: 'Học viện Quân y',
    governing_body: '',
    province: 'thành phố Hà Nội',
  },
  {
    name: 'Học viện Quốc phòng Việt Nam',
    governing_body: '',
    province: 'Hà Nội',
  },
  {
    name: 'Trường Đại học Chính trị',
    governing_body: 'Political Officers College',
    province: 'Hà Nội',
  },
  {
    name: 'Trường Đại học Trần Quốc Tuấn',
    governing_body: 'The Army officer College No1 (TQT Uni)',
    province: 'Hà Nội',
  },
  {
    name: 'Trường Sĩ quan Pháo binh',
    governing_body: '',
    province: 'TP Hà Nội',
  },
  {
    name: 'Trường Sĩ quan Phòng hóa',
    governing_body: '',
    province: 'Hà Nội',
  },
  {
    name: 'Trường Sĩ quan Đặc công',
    governing_body: '',
    province: 'thành phố Hà Nội',
  },
  {
    name: 'Trường Đại học Văn hóa – Nghệ thuật Quân đội',
    governing_body: 'Military University of Culture and Arts',
    province: 'Hà Nội',
  },
  {
    name: 'Trường Cao đẳng Công nghệ và Kỹ thuật Ô tô',
    governing_body: '',
    province: 'thành phố Hà Nội',
  },
  {
    name: 'Trường Cao đẳng Quân y 1',
    governing_body: '',
    province: 'Hà Nội',
  },
  {
    name: 'Phân hiệu Học viện Kỹ thuật Mật mã tại Thành phố Hồ Chí Minh',
    governing_body: '',
    province: 'Hà Nội.',
  },
  {
    name: 'Học viện An ninh Nhân dân',
    governing_body: '',
    province: 'Hà Nội.',
  },
  {
    name: 'Học viện Cảnh sát Nhân dân',
    governing_body: '',
    province: 'Hà Nội.',
  },
  {
    name: 'Học viện Chính trị Công an Nhân dân',
    governing_body: '',
    province: 'Hà Nội',
  },
  {
    name: 'Đại học Phòng cháy Chữa cháy',
    governing_body: 'Official Fire Fighting Prevention University (T34)',
    province: 'TP Hà Nội.',
  },
  {
    name: 'Trường Cao đẳng An ninh Nhân dân I',
    governing_body: '',
    province: 'Hà Nội',
  },
  {
    name: 'Trường Cao đẳng Cảnh sát Nhân dân I',
    governing_body: '',
    province: 'TP Hà Nội',
  },
];

const universitiesV3 = [
  {
    name: 'Trường Đại học Nông Lâm Bắc Giang',
    governing_body: '',
    province: 'Bắc Giang',
  },
  {
    name: 'Trường Đại học Thể dục Thể thao Bắc Ninh',
    governing_body: '',
    province: 'Bắc Ninh',
  },
  {
    name: 'Phân viện Bắc Ninh – Học viện Ngân hàng',
    governing_body: '',
    province: 'Bắc Ninh',
  },
  {
    name: 'Trường Đại học Kinh Bắc',
    governing_body: 'University Of Kinh Bac',
    province: 'TP.Bắc Ninh Bắc Ninh',
  },
  {
    name: 'Trường Đại học Quốc tế Bắc Hà',
    governing_body: 'Bac Ha International University',
    province: 'thành phố Bắc Ninh',
  },
  {
    name: 'Trường Đại học Kỹ thuật – Hậu cần Công an Nhân dân',
    governing_body: '',
    province: 'tỉnh Bắc Ninh',
  },
  {
    name: 'Trường Đại học Hà Hoa Tiên',
    governing_body: '',
    province: 'Hà Nam',
  },
  {
    name: 'Trường Đại học Kỹ thuật Y tế Hải Dương',
    governing_body: 'HMTU',
    province: 'Hải Dương',
  },
  {
    name: 'Trường Đại học Sao Đỏ',
    governing_body: 'SDU',
    province: 'Hải Dương',
  },
  {
    name: 'Trường Đại học Sư phạm Kỹ thuật Hưng Yên',
    governing_body: 'UTEHY',
    province: 'Hưng Yên',
  },
  {
    name: 'Trường Đại học Hải Dương',
    governing_body: 'UHD',
    province: 'Hải Dương',
  },
  {
    name: 'Trường Đại học Thành Đông',
    governing_body: 'Thanh Dong University (TDU)',
    province: 'Hải Dương',
  },
  {
    name: 'Trường Đại học Hàng hải Việt Nam',
    governing_body: 'ISE',
    province: 'Hải Phòng',
  },
  {
    name: 'Đại học Y Dược Hải Phòng',
    governing_body: 'HPMU',
    province: 'Hải Phòng',
  },
  {
    name: 'Trường Đại học Hải Phòng',
    governing_body: 'HPU',
    province: 'Hải Phòng',
  },
  {
    name: 'Đại học Hải Phòng',
    governing_body: 'Hai Phong University',
    province: 'Hải Phòng',
  },
  {
    name: 'Trường Đại học Tài chính – Quản trị kinh doanh',
    governing_body: 'UFBA',
    province:
      'Cơ sở 1: Trưng Trắc – Văn Lâm – Hưng Yên \n        Cơ sở 2: Như Quỳnh – Văn Lâm – Hưng Yên',
  },
  {
    name: 'Trường Đại học Chu Văn An',
    governing_body: 'Chu Van An University',
    province: 'Hưng Yên',
  },
  {
    name: 'Phân hiệu Đại học Thái Nguyên tại Lào Cai – ĐH TN',
    governing_body: '',
    province: 'Lào Cai',
  },
  {
    name: 'Trường Đại học Điều dưỡng Nam Định',
    governing_body: 'NDUN',
    province: 'Nam Định',
  },
  {
    name: 'Trường Đại học Sư phạm Kỹ thuật Nam Định',
    governing_body: 'NUTE',
    province: 'Nam Định',
  },
  {
    name: 'Trường Đại học Lương Thế Vinh',
    governing_body: 'Luong The Vinh University (LTVU)',
    province: 'Nam Định',
  },
  {
    name: 'Trường Đại học Hoa Lư',
    governing_body: 'HLUV',
    province: 'tỉnh Ninh Bình',
  },
  {
    name: 'Trường Đại học Công nghiệp Việt Trì',
    governing_body: 'VUI',
    province: 'tỉnh Phú Thọ',
  },
  {
    name: 'Trường Đại học Hùng Vương',
    governing_body: 'HVU',
    province: 'Phú Thọ',
  },
  {
    name: 'Trường Cao đẳng Công nghiệp Quốc phòng',
    governing_body: 'Military Industrial College (MIC);',
    province: 'Tỉnh Phú Thọ.',
  },
  {
    name: 'Trường Dự bị Đại học dân tộc Trung ương Việt Trì – Phú Thọ',
    governing_body: '',
    province: 'Phú Thọ',
  },
  {
    name: 'Trường Đại học Công nghiệp Quảng Ninh',
    governing_body: 'QUI',
    province: 'Quảng Ninh',
  },
  {
    name: 'Phân hiệu Đại học Mỏ-Địa chất tại Quảng Ninh',
    governing_body: '',
    province: 'Thành phố Uông Bí; Tỉnh Quảng Ninh',
  },
  {
    name: 'Trường Đại học Ngoại thương, cơ sở Quảng Ninh',
    governing_body: '',
    province: 'Quảng Ninh',
  },
  {
    name: 'Trường Đại học Hạ Long',
    governing_body: 'HLU',
    province: 'Quảng Ninh',
  },
  {
    name: 'Trường Đại học Tây Bắc',
    governing_body: 'UTB',
    province: 'Tổ 2 – phường Quyết Tâm – TP Sơn La – tỉnh Sơn La',
  },
  {
    name: 'Trường Đại học Y Dược Thái Bình',
    governing_body: 'TBUMP',
    province: 'tỉnh Thái Bình',
  },
  {
    name: 'Trường Đại học Thái Bình',
    governing_body: 'TBU',
    province: 'Xã Tân Bình – Thành Phố Thái Bình – Tỉnh Thái Bình',
  },
  {
    name: 'Đại học Thái Nguyên',
    governing_body: 'TNU',
    province: 'Thái Nguyên',
  },
  {
    name: 'Trường Đại học Công nghệ Thông tin và Truyền thông – ĐH TN',
    governing_body: 'ICTU',
    province: 'Thái Nguyên',
  },
  {
    name: 'Trường Đại học Khoa học – ĐH TN',
    governing_body: 'TNUS',
    province: 'Thái Nguyên',
  },
  {
    name: 'Trường Đại học Kinh tế và Quản trị Kinh doanh – ĐH TN',
    governing_body: 'TUEBA',
    province: 'Thái Nguyên',
  },
  {
    name: 'Trường Đại học Kỹ thuật Công nghiệp – ĐH TN',
    governing_body: 'TNUT',
    province: 'Thái Nguyên',
  },
  {
    name: 'Trường Đại học Nông Lâm – ĐH TN',
    governing_body: 'TUAF',
    province: 'Thái Nguyên',
  },
  {
    name: 'Trường Đại học Sư phạm – ĐH TN',
    governing_body: 'TUE',
    province: 'TP. Thái Nguyên',
  },
  {
    name: 'Trường Đại học Y Dược – ĐH TN',
    governing_body: 'TUMP',
    province: 'TP. Thái Nguyên',
  },
  {
    name: 'Phân hiệu Đại học Công nghệ Giao thông Vận tải tại Thái Nguyên',
    governing_body: 'UTT',
    province: 'Thái Nguyên',
  },
  {
    name: 'Trường Đại học Việt Bắc',
    governing_body: 'Viet Bac University (VBU)',
    province: 'Thái Nguyên',
  },
  {
    name: 'Trường Đại học Tân Trào',
    governing_body: 'Tan Trao University',
    province: 'Tuyên Quang',
  },
  {
    name: 'Trường Đại học Sư phạm Hà Nội 2',
    governing_body: 'ĐHSP HN2',
    province: 'Vĩnh Phúc',
  },
  {
    name: 'Phân hiệu Đại học Công nghệ Giao thông Vận tải tại Vĩnh Phúc',
    governing_body: '',
    province: 'Vĩnh Phúc',
  },
  {
    name: 'Trường Đại học Trưng Vương',
    governing_body: 'Trung Vuong University (TVU)',
    province: 'Vĩnh Phúc',
  },
  {
    name: 'Trường Sĩ quan Tăng-Thiết giáp',
    governing_body: 'Military College of Tank Armour Officer (MCTAO)',
    province: 'tỉnh Vĩnh Phúc',
  },
];

const universitiesV4 = [
  {
    name: 'Trường Đại học Phú Xuân',
    governing_body: 'Phu Xuan University',
    province: 'Thừa Thiên Huế',
  },
  {
    name: 'Đại học Huế:',
    governing_body: 'HUEUNI',
    province: '03 Lê Lợi – TP Huế',
  },
  {
    name: 'Trường Đại học Khoa học – ĐH Huế',
    governing_body: 'HUSC',
    province: 'Thừa Thiên Huế',
  },
  {
    name: 'Trường Đại học Kinh tế – ĐH Huế',
    governing_body: 'HCE',
    province: 'Thành phố Huế',
  },
  {
    name: 'Trường Đại học Luật – ĐH Huế',
    governing_body: 'HUL',
    province: 'Thừa Thiên Huế',
  },
  {
    name: 'Trường Đại học Nghệ thuật – ĐH Huế',
    governing_body: 'HUFA',
    province: 'Thừa Thiên Huế',
  },
  {
    name: 'Trường Đại học Ngoại ngữ – ĐH Huế',
    governing_body: 'HUCFL',
    province: 'Huế',
  },
  {
    name: 'Trường Đại học Nông Lâm – ĐH Huế',
    governing_body: 'HUAF',
    province: 'Thừa Thiên Huế',
  },
  {
    name: 'Trường Đại học Sư phạm – ĐH Huế',
    governing_body: '',
    province: 'Thừa Thiên Huế',
  },
  {
    name: 'Trường Đại học Y Dược – ĐH Huế',
    governing_body: '',
    province: 'Thừa Thiên Huế',
  },
  {
    name: 'Phân hiệu Đại học Tài chính – Kế toán tại Thừa Thiên-Huế',
    governing_body: 'UFA Thua Thien Hue Campus',
    province: 'Thừa Thiên Huế',
  },
  {
    name: 'Học viện Âm nhạc Huế',
    governing_body: 'Hue Academy of Music',
    province: 'Thừa Thiên Huế',
  },
  {
    name: 'Phân viện Học viện Hành chính Quốc gia tại Thành phố Huế',
    governing_body: '',
    province: 'tỉnh Thừa Thiên Huế.',
  },
  {
    name: 'Đại học Đà Nẵng:',
    governing_body: 'UDN',
    province: 'Đà Nẵng',
  },
  {
    name: 'Trường Đại học Bách khoa – ĐH Đà Nẵng',
    governing_body: 'DUT',
    province: 'Đà Nẵng',
  },
  {
    name: 'Trường Đại học Sư phạm Kỹ thuật – ĐH Đà Nẵng',
    governing_body: 'UTE',
    province: 'Đà Nẵng',
  },
  {
    name: 'Trường Đại học Kinh tế – ĐH Đà Nẵng',
    governing_body: 'DUE',
    province: 'Đà Nẵng',
  },
  {
    name: 'Trường Đại học Ngoại ngữ – ĐH Đà Nẵng',
    governing_body: 'UFL',
    province: 'Đà Nẵng',
  },
  {
    name: 'Trường Đại học Sư phạm – ĐH Đà Nẵng',
    governing_body: 'UED',
    province: 'Đà Nẵng',
  },
  {
    name: 'Trường Đại học Kỹ thuật Y – Dược Đà Nẵng',
    governing_body: '',
    province: 'Đà Nẵng',
  },
  {
    name: 'Trường Đại học Thể dục Thể thao Đà Nẵng',
    governing_body: 'DUPES',
    province: 'Đà Nẵng',
  },
  {
    name: 'Trường Đại học Đông Á',
    governing_body: 'Dong A University',
    province: '33 Xô Viết Nghệ Tĩnh – Hải Châu – Đà Nẵng',
  },
  {
    name: 'Trường Đại học Duy Tân',
    governing_body: 'Duy Tan University',
    province: 'Đà Nẵng',
  },
  {
    name: 'Trường Đại học Kiến trúc Đà Nẵng',
    governing_body: '',
    province: 'Số 566 Núi Thành – Phường Hòa Cường Nam – Quận Hải Châu – Tp. Đà Nẵng',
  },
  {
    name: 'Trường Đại học Mỹ tại Việt Nam – AUV Đà Nẵng',
    governing_body: 'The American University in Vietnam – AUV',
    province: 'Đà Nẵng',
  },
];

const universitiesV5 = [
  {
    name: 'Trường Đại học Quy Nhơn',
    governing_body: 'QNU',
    province: 'Bình Định',
  },
  {
    name: 'Trường Đại học Quang Trung',
    governing_body: 'Quang Trung University (QTU)',
    province: 'Bình Định',
  },
  {
    name: 'Trường Đại học Buôn Ma Thuột',
    governing_body: '',
    province: 'tỉnh Đắk Lắk',
  },
  {
    name: 'Phân hiệu Đại học Nông Lâm Thành phố Hồ Chí Minh tại Gia Lai',
    governing_body: '',
    province: 'Gia Lai',
  },
  {
    name: 'Trường Đại học Hà Tĩnh',
    governing_body: 'HTU',
    province: 'tỉnh Hà Tĩnh.',
  },
  {
    name: 'Trường Đại học Nha Trang',
    governing_body: 'NTU',
    province: 'Khánh Hòa',
  },
  {
    name: 'Đại học Khánh Hòa',
    governing_body: 'UKH',
    province: 'Khánh Hòa',
  },
  {
    name: 'Trường Đại học Thái Bình Dương',
    governing_body: 'Pacific Ocean University (POU)',
    province: 'Khánh Hòa',
  },
  {
    name: 'Học viện Hải quân',
    governing_body: '',
    province: 'Khánh Hòa',
  },
  {
    name: 'Trường Sĩ quan Không quân',
    governing_body: '',
    province: 'tỉnh Khánh Hòa',
  },
  {
    name: 'Đại học Thông tin liên lạc',
    governing_body: 'Telecommunications University (TCU)',
    province: 'Khánh Hòa',
  },
  {
    name: 'Trường Dự bị Đại học dân tộc Nha Trang',
    governing_body: '',
    province: 'Khánh Hòa',
  },
  {
    name: 'Phân hiệu Đại học Đà Nẵng tại Kon Tum – ĐH Đà Nẵng',
    governing_body: 'UD-CK',
    province: 'Kon Tum',
  },
  {
    name: 'Trường Đại học Đà Lạt',
    governing_body: 'DLU',
    province: 'Lâm Đồng',
  },
  {
    name: 'Trường Đại học Tôn Đức Thắng, cơ sở Bảo Lộc',
    governing_body: '',
    province: 'Lâm Đồng',
  },
  {
    name: 'Đại học Yersin Đà Lạt',
    governing_body: 'Yersin University',
    province: 'Lâm Đồng',
  },
  {
    name: 'Học viện Lục quân Đà Lạt',
    governing_body: '',
    province: 'Lâm Đồng',
  },
  {
    name: 'Trường Đại học Vinh',
    governing_body: 'Vinhuni',
    province: '182 Lê Duẩn – Thành Phố Vinh – tỉnh Nghệ An',
  },
  {
    name: 'Trường Đại học Sư phạm Kỹ thuật Vinh',
    governing_body: 'VUTED',
    province: 'Nghệ An',
  },
  {
    name: 'Trường Đại học Y khoa Vinh',
    governing_body: 'VMU',
    province: 'Nghệ An',
  },
  {
    name: 'Trường Đại học Kinh tế Nghệ An',
    governing_body: 'NACE',
    province: 'Nghệ An',
  },
  {
    name: 'Trường Đại học Công nghệ Vạn Xuân',
    governing_body: 'Van Xuan University of Technology (VXUT)',
    province: 'Nghệ An',
  },
  {
    name: 'Trường Đại học Công nghiệp Vinh',
    governing_body: 'Industrial University of Vinh (IUV)',
    province: 'Nghệ An.',
  },
  {
    name: 'Phân hiệu Đại học Nông Lâm Thành phố Hồ Chí Minh tại Ninh Thuận',
    governing_body: '',
    province: 'Ninh Thuận',
  },
  {
    name: 'Trường Đại học Xây dựng miền Trung',
    governing_body: 'MUCE',
    province: 'Đà',
  },
  {
    name: 'Phân viện Phú Yên – Học viện Ngân hàng',
    governing_body: '',
    province: 'Phú Yên',
  },
  {
    name: 'Trường Đại học Phú Yên',
    governing_body: 'PYU',
    province: '18 Trần Phú – Phường 7 – Thành phố Tuy Hòa – Tỉnh Phú Yên',
  },
  {
    name: 'Trường Đại học Quảng Bình',
    governing_body: 'Quang Binh Univesity',
    province: 'Quảng Bình',
  },
  {
    name: 'Phân hiệu Đại học Nội vụ Hà Nội tại Quảng Nam',
    governing_body: '',
    province: 'tỉnh Quảng Nam',
  },
  {
    name: 'Trường Đại học Quảng Nam',
    governing_body: 'Quang Nam Univesity',
    province: 'Quảng Nam',
  },
  {
    name: 'Trường Đại học Phan Châu Trinh',
    governing_body: 'Phan Chu Trinh University (PCTU)',
    province: 'Quảng Nam',
  },
  {
    name: 'Trường Đại học Phạm Văn Đồng',
    governing_body: 'PDU',
    province: 'Quảng Ngãi',
  },
  {
    name: 'Trường Đại học Tài chính – Kế toán',
    governing_body: 'UFA',
    province: 'Quảng Ngãi',
  },
  {
    name: 'Phân hiệu Đại học Công nghiệp Thành phố Hồ Chí Minh tại Quảng Ngãi',
    governing_body: '',
    province: 'Quảng Ngãi',
  },
  {
    name: 'Phân hiệu Đại học Huế tại Quảng Trị – ĐH Huế',
    governing_body: '',
    province: 'tỉnh Quảng Trị',
  },
  {
    name: 'Phân hiệu Đại học Y Hà Nội tại Thanh Hóa',
    governing_body: 'Hanoi Medical University (HMU)',
    province: 'TP Thanh Hóa',
  },
  {
    name: 'Phân hiệu Đại học Tài nguyên và Môi trường Hà Nội tại Thanh Hóa',
    governing_body: '',
    province: 'Số 04 Trần Phú – Ba Đình – Bỉm Sơn – Thanh Hóa',
  },
  {
    name: 'Đại học Hồng Đức',
    governing_body: 'HDU',
    province: 'Thanh Hoá',
  },
  {
    name: 'Trường Đại học Văn hóa, Thể thao và Du lịch Thanh Hóa',
    governing_body: 'DVTDT',
    province: 'Thanh Hoá',
  },
  {
    name: 'Trường Dự bị Đại học dân tộc Sầm Sơn',
    governing_body: '',
    province: 'Thanh Hoá',
  },
];

const universitiesV6 = [
  {
    name: 'Trường Đại học An Giang – ĐHQG HCM',
    governing_body: 'AGU',
    province: 'An Giang',
  },
  {
    name: 'Trường Đại học Dầu khí Việt Nam',
    governing_body: 'PVU',
    province: 'Bà Rịa – Vũng Tàu',
  },
  {
    name: 'Phân hiệu Đại học Mỏ-Địa chất tại Vũng Tàu',
    governing_body: '',
    province: 'thành phố Vũng Tàu',
  },
  {
    name: 'Trường Đại học Bà Rịa – Vũng Tàu',
    governing_body: 'Baria-Vungtau University',
    province: 'Bà Rịa – Vũng Tàu',
  },
  {
    name: 'Trường Đại học Bạc Liêu',
    governing_body: 'BLU',
    province: 'Bạc Liêu',
  },
  {
    name: 'Phân hiệu Đại học Quốc gia Thành phố Hồ Chí Minh tại Bến Tre – ĐHQG HCM',
    governing_body: 'VNUHCM – CBT',
    province: 'Bến Tre',
  },
  {
    name: 'Phân hiệu Đại học Bách Khoa tại Bến Tre',
    governing_body: 'VNUHCM – CBT',
    province: 'Tp Bến Tre',
  },
  {
    name: 'Phân hiệu Đại học Công nghệ Thông tin tại Bến Tre',
    governing_body: '',
    province: 'tỉnh Bến Tre',
  },
  {
    name: 'Phân hiệu Đại học Khoa học Tự nhiên tại Bến Tre',
    governing_body: '',
    province: 'Tp Bến Tre',
  },
  {
    name: 'Phân hiệu Đại học Khoa học Xã hội và Nhân văn tại Bến Tre',
    governing_body: '',
    province: 'Tp Bến Tre',
  },
  {
    name: 'Phân hiệu Đại học Kinh tế – Luật tại Bến Tre',
    governing_body: '',
    province: 'Tp Bến Tre',
  },
  {
    name: 'Trường Đại học Việt Đức',
    governing_body: 'VGU',
    province: 'Bình Dương',
  },
  {
    name: 'Trường Đại học Thủ Dầu Một',
    governing_body: 'TDMU',
    province: 'Bình Dương',
  },
  {
    name: 'Trường Đại học Bình Dương',
    governing_body: 'Binh Duong University',
    province: 'Tỉnh Bình Dương.',
  },
  {
    name: 'Trường Đại học Kinh tế- Kỹ thuật Bình Dương',
    governing_body: 'Binh Duong Economics and Technology University (BETU)',
    province: 'Bình Dương',
  },
  {
    name: 'Trường Đại học Quốc tế Miền Đông',
    governing_body: 'Eastern International University',
    province: 'Bình Dương',
  },
  {
    name: 'Trường Đại học Ngô Quyền',
    governing_body: '',
    province: 'Bình Dương',
  },
  {
    name: 'Phân hiệu Đại học Bình Dương tại Cà Mau',
    governing_body: '',
    province: 'Cà Mau.',
  },
  {
    name: 'Trường Đại học Tôn Đức Thắng, cơ sở Cà Mau',
    governing_body: '',
    province: 'Tỉnh Cà Mau.',
  },
  {
    name: 'Trường Đại học Tôn Đức Thắng, cơ sở Nha Trang',
    governing_body: '',
    province: 'Khánh Hòa.',
  },
  {
    name: 'Trường Đại học Cần Thơ',
    governing_body: 'CTU',
    province: 'Cần Thơ',
  },
  {
    name: 'Trường Đại học Y Dược Cần Thơ',
    governing_body: 'CTUMP',
    province: 'Cần Thơ',
  },
  {
    name: 'Trường Đại học Kiến trúc Thành phố Hồ Chí Minh cơ sở Cần Thơ',
    governing_body: 'University of Architecture Ho Chi Minh City (UAH)',
    province: 'TP. Cần Thơ',
  },
  {
    name: 'Trường Đại học Kỹ thuật – Công nghệ Cần Thơ',
    governing_body: 'CTUT',
    province: 'Cần Thơ',
  },
  {
    name: 'Trường Đại học Nam Cần Thơ',
    governing_body: 'Nam Can Tho University (NCTU)',
    province: 'TP. Cần Thơ',
  },
  {
    name: 'Trường Đại học Tây Đô',
    governing_body: 'Tay Do University',
    province: 'Cần Thơ',
  },
  {
    name: 'Trường Cao đẳng Cảnh sát Nhân dân III',
    governing_body: '',
    province: 'TP Cần Thơ',
  },
  {
    name: 'Phân hiệu Đại học Lâm nghiệp Việt Nam tại Đồng Nai',
    governing_body: 'VNUF',
    province: 'tỉnh Đồng Nai',
  },
  {
    name: 'Đại học Đồng Nai',
    governing_body: 'DNU',
    province: 'Đồng Nai',
  },
  {
    name: 'Trường Đại học Công nghệ Đồng Nai',
    governing_body: 'Dong Nai Technology University (DNTU)',
    province: 'Đồng Nai',
  },
  {
    name: 'Trường Đại học Lạc Hồng',
    governing_body: 'Lac Hong University.',
    province: 'Đồng Nai',
  },
  {
    name: 'Trường Đại học Nguyễn Huệ',
    governing_body: 'Nguyễn Huệ University (NHU)',
    province: 'Tỉnh Đồng Nai',
  },
  {
    name: 'Trường Cao đẳng An ninh Nhân dân II',
    governing_body: '',
    province: 'Đồng Nai',
  },
  {
    name: 'Trường Đại học Đồng Tháp',
    governing_body: 'DTHU',
    province: 'Đồng Tháp',
  },
  {
    name: 'Phân hiệu Đại học Cần Thơ tại Hậu Giang',
    governing_body: 'Can Tho University (CTU)',
    province: 'tỉnh Hậu Giang',
  },
  {
    name: 'Trường Đại học Võ Trường Toản',
    governing_body: 'Vo Truong Toan University (VTTU)',
    province: 'Hậu Giang',
  },
  {
    name: 'Trường Đại học Kiên Giang',
    governing_body: 'Kien Giang University',
    province: 'tỉnh Kiên Giang',
  },
  {
    name: 'Đại học Kinh tế – Công nghiệp Long An',
    governing_body: 'Long An University of Economics and Industry',
    province: 'Long An',
  },
  {
    name: 'Trường Đại học Tân Tạo',
    governing_body: 'Tan Tao University (TTU',
    province: 'E.City Đức Hòa Long An',
  },
  {
    name: 'Trường Đại học Tiền Giang',
    governing_body: 'TGU',
    province: 'Tiền Giang',
  },
  {
    name: 'Trường Đại học Trà Vinh',
    governing_body: 'Tra Vinh University',
    province: 'Trà Vinh',
  },
  {
    name: 'Trường Đại học Sư phạm kỹ thuật Vĩnh Long',
    governing_body: 'VLUTE',
    province: 'Vĩnh Long',
  },
  {
    name: 'Trường Đại học Xây dựng Miền Tây',
    governing_body: 'MTU',
    province: 'Vĩnh Long',
  },
  {
    name: 'Trường Đại học Cửu Long',
    governing_body: 'Mekong University (MKU)',
    province: 'Vĩnh Long',
  },
];

const universitiesV7 = [
  {
    name: 'Đại học Quốc gia Thành phố Hồ Chí Minh:',
    governing_body: 'VNUHCM',
    province: 'TP.HCM',
  },
  {
    name: 'Trường Đại học Bách khoa – ĐHQG HCM',
    governing_body: 'HCMUT',
    province: 'Hồ Chí Minh',
  },
  {
    name: 'Trường Đại học Công nghệ Thông tin – ĐHQG HCM',
    governing_body: 'UIT',
    province: 'Hồ Chí Minh',
  },
  {
    name: 'Trường Đại học Khoa học Tự nhiên – ĐHQG HCM',
    governing_body: 'HCMUS',
    province: 'Hồ Chí Minh',
  },
  {
    name: 'Trường Đại học Khoa học Xã hội và Nhân văn – ĐHQG HCM',
    governing_body: 'hcmussh',
    province: 'Hồ Chí Minh',
  },
  {
    name: 'Trường Đại học Kinh tế – Luật – ĐHQG HCM',
    governing_body: 'UEL',
    province: 'Hồ Chí Minh',
  },
  {
    name: 'Trường Đại học Quốc tế – ĐHQG HCM',
    governing_body: 'HCMIU',
    province: 'TP.HCM',
  },
  {
    name: 'Trường Đại học Công nghiệp Thành phố Hồ Chí Minh',
    governing_body: 'IUH',
    province: 'Hồ Chí Minh',
  },
  {
    name: 'Trường Đại học Công nghiệp Thực phẩm Thành phố Hồ Chí Minh',
    governing_body: 'HUFI',
    province: 'Hồ Chí Minh',
  },
  {
    name: 'Trường Đại học Giao thông vận tải Thành phố Hồ Chí Minh',
    governing_body: 'GTS hoặc UT-HCMC',
    province: 'Hồ Chí Minh',
  },
  {
    name: 'Trường Đại học Kiến trúc Thành phố Hồ Chí Minh',
    governing_body: 'HCMUArc hoặc UAH',
    province: 'Hồ Chí Minh',
  },
  {
    name: 'Trường Đại học Kinh tế Thành phố Hồ Chí Minh',
    governing_body: 'UEH',
    province: 'Thành phố Hồ Chí Minh',
  },
  {
    name: 'Trường Đại học Luật Thành phố Hồ Chí Minh',
    governing_body: 'HCMUL',
    province: 'Hồ Chí Minh',
  },
  {
    name: 'Trường Đại học Mở Thành phố Hồ Chí Minh',
    governing_body: 'OU – HCMCOU',
    province: 'Hồ Chí Minh',
  },
  {
    name: 'Trường Đại học Mỹ thuật Thành phố Hồ Chí Minh',
    governing_body: 'HCMUFA',
    province: 'Hồ Chí Minh',
  },
  {
    name: 'Trường Đại học Ngân hàng Thành phố Hồ Chí Minh',
    governing_body: 'BUH',
    province: 'Hồ Chí Minh',
  },
  {
    name: 'Trường Đại học Nông Lâm Thành phố Hồ Chí Minh',
    governing_body: 'NLU',
    province: 'Hồ Chí Minh',
  },
  {
    name: 'Trường Đại học Sân khấu – Điện ảnh Thành phố Hồ Chí Minh',
    governing_body: 'SKDAHCM',
    province: 'Hồ Chí Minh',
  },
  {
    name: 'Trường Đại học Sư phạm Kỹ thuật Thành phố Hồ Chí Minh',
    governing_body: 'HCMUTE -UTE',
    province: 'Hồ Chí Minh',
  },
  {
    name: 'Trường Đại học Sư phạm Thành phố Hồ Chí Minh',
    governing_body: 'HCMUE',
    province: 'Hồ Chí Minh',
  },
  {
    name: 'Trường Đại học Sư phạm Thể dục Thể thao Thành phố Hồ Chí Minh',
    governing_body: 'UPES',
    province: 'Hồ Chí Minh',
  },
  {
    name: 'Trường Đại học Tài chính – Marketing',
    governing_body: 'UFM',
    province: 'TP. Hồ Chí Minh',
  },
  {
    name: 'Trường Đại học Tài nguyên và Môi trường Thành phố Hồ Chí Minh',
    governing_body: 'HCMUNRE',
    province: 'Hồ Chí Minh',
  },
  {
    name: 'Đại học Thể dục Thể thao Thành phố Hồ Chí Minh',
    governing_body: 'HCUS',
    province: 'Hồ Chí Minh',
  },
  {
    name: 'Trường Đại học Tôn Đức Thắng',
    governing_body: 'TDTU',
    province: 'Hồ Chí Minh',
  },
  {
    name: 'Trường Đại học Văn hóa Thành phố Hồ Chí Minh',
    governing_body: 'HCMUC',
    province: 'Hồ Chí Minh',
  },
  {
    name: 'Trường Đại học Y Dược Thành phố Hồ Chí Minh',
    governing_body: 'UMP',
    province: 'TP. Hồ Chí Minh',
  },
  {
    name: 'Đại học Y Phạm Ngọc Thạch',
    governing_body: 'PNTU',
    province: 'Hồ Chí Minh',
  },
  {
    name: 'Phân hiệu Học viện Phụ nữ Việt Nam tại Thành phố Hồ Chí Minh',
    governing_body: '',
    province: 'TP Hồ Chí Minh',
  },
  {
    name: 'Trường Đại học Giao thông Vận tải cơ sở 2',
    governing_body: 'University of Transport and Communications',
    province: 'TP. Hồ Chí Minh',
  },
  {
    name: 'Trường Đại học Lao động – Xã hội cơ sở 2, Thành phố Hồ Chí Minh',
    governing_body: '',
    province: 'Hồ Chí Minh',
  },
  {
    name: 'Trường Đại học Ngoại thương cơ sở 2, Thành phố Hồ Chí Minh',
    governing_body: '',
    province: 'Hồ Chí Minh',
  },
  {
    name: 'Đại học Thủy lợi cơ sở 2, Thành phố Hồ Chí Minh',
    governing_body: '',
    province: 'Hồ Chí Minh',
  },
  {
    name: 'Học viện Cán bộ Thành phố Hồ Chí Minh',
    governing_body: '',
    province: 'Hồ Chí Minh',
  },
  {
    name: 'Học viện Công nghệ Bưu chính Viễn thông cơ sở 2, Thành phố Hồ Chí Minh',
    governing_body: '',
    province: 'Tp. Hồ Chí Minh',
  },
  {
    name: 'Học viện Hàng không Việt Nam',
    governing_body: 'VAA',
    province: 'Hồ Chí Minh',
  },
  {
    name: 'Nhạc viện Thành phố Hồ Chí Minh',
    governing_body: 'HCMCONS',
    province: 'Hồ Chí Minh',
  },
  {
    name: 'Phân viện Học viện Hành chính Quốc gia tại Thành phố Hồ Chí Minh',
    governing_body: '',
    province: 'TP. Hồ Chí Minh',
  },
  {
    name: 'Phân viện miền Nam – Học viện Thanh thiếu niên Việt Nam',
    governing_body: '',
    province: 'thành phố Hồ Chí Minh',
  },
  {
    name: 'Học viện Tư Pháp – Cơ sở tại Thành phố Hồ Chí Minh',
    governing_body: '',
    province: 'Hồ Chí Minh',
  },
  {
    name: 'Trường Đại học Sài Gòn',
    governing_body: 'SGU',
    province: 'Hồ Chí Minh',
  },
  {
    name: 'Trường Đại học Công nghệ Sài Gòn',
    governing_body: 'SaiGon Technology University',
    province: 'Hồ Chí Minh',
  },
  {
    name: 'Trường Đại học Công nghệ Thành phố Hồ Chí Minh',
    governing_body: 'HUTECH',
    province: 'Hồ Chí Minh',
  },
  {
    name: 'Đại học Văn Lang',
    governing_body: 'Van Lang University (VLU)',
    province: 'Thành phố Hồ Chí Minh.',
  },
  {
    name: 'Đại học Fulbright Việt Nam',
    governing_body: 'Fulbright University Vietnam',
    province: 'TP Hồ Chí Minh',
  },
  {
    name: 'Trường Đại học Hoa Sen',
    governing_body: 'Hoa Sen University (HSU)',
    province: 'Hồ Chí Minh',
  },
  {
    name: 'Trường Đại học Hùng Vương Thành phố Hồ Chí Minh',
    governing_body: 'Hung Vuong University Ho Chi Minh City (HVUH',
    province: 'TP. Hồ Chí Minh',
  },
  {
    name: 'Trường Đại học Kinh tế – Tài chính Thành phố Hồ Chí Minh',
    governing_body: 'University of Economics and Finance (UEF)',
    province: 'Hồ Chí Minh',
  },
  {
    name: 'Trường Đại học Ngoại ngữ Tin học Thành phố Hồ Chí Minh',
    governing_body: '',
    province: 'Tp.HCM',
  },
  {
    name: 'Trường Đại học Nguyễn Tất Thành',
    governing_body: 'Nguyen Tat Thanh University (NTTU)',
    province: 'Hồ Chí Minh',
  },
  {
    name: 'Trường Đại học Quốc tế Hồng Bàng',
    governing_body: '(Hong Bang University, viết tắt HBU',
    province: 'Hồ Chí Minh',
  },
  {
    name: 'Trường Đại học Quốc tế Sài Gòn',
    governing_body: 'The Saigon International University( SIU)',
    province: 'Hồ Chí Minh',
  },
  {
    name: 'Đại học Gia Định',
    governing_body: 'Gia Dinh University',
    province: 'Hồ Chí Minh',
  },
  {
    name: 'Trường Đại học Văn Hiến',
    governing_body: 'Van Hien University (VHU)',
    province: 'Hồ Chí Minh',
  },
  {
    name: 'Trường Đại học Trần Đại Nghĩa',
    governing_body: 'Tran Dai Nghia University (TDNU)',
    province: 'Tp. Hồ Chí Minh',
  },
  {
    name: 'Trường Cao đẳng Kỹ thuật Hải quân',
    governing_body: '',
    province: 'TP. Hồ Chí Minh',
  },
  {
    name: 'Trường Cao đẳng Quân y 2',
    governing_body: '',
    province: 'Hồ Chí Minh',
  },
  {
    name: 'Trường Đại học An ninh Nhân dân',
    governing_body: '',
    province: 'TP Hồ Chí Minh',
  },
  {
    name: 'Đại học Cảnh sát Nhân dân',
    governing_body: '',
    province: '36 Nguyễn Hữu Thọ – Phường Tân Phong – Quận 7 – TP. Hồ Chí Minh',
  },
  {
    name: 'Trường Cao đẳng Cảnh sát Nhân dân II',
    governing_body: '',
    province: 'Hồ Chí Minh',
  },
  {
    name: 'Trường Dự bị Đại Học Thành phố Hồ Chí Minh',
    governing_body: '',
    province: 'Hồ Chí Minh',
  },
];

module.exports = {
  colleges,
  universities,
  universitiesV2,
  universitiesV3,
  universitiesV4,
  universitiesV5,
  universitiesV6,
  universitiesV7,
};
