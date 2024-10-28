let defaultSchools = [
  // 20 trường đã có
  {
    "school_name": "Cao đẳng Công nghệ Thủ Đức",
    "school_code": "TDC",
    "address": {
      "street": "Số 53, Võ Văn Ngân",
      "district": "TP. Thủ Đức",
      "city": "TP. Hồ Chí Minh",
      "country": "Việt Nam"
    }
  },
  {
    "school_name": "Đại học Quốc gia Hà Nội",
    "school_code": "VNU",
    "address": {
      "street": "Số 144, Xuân Thủy",
      "district": "Cầu Giấy",
      "city": "Hà Nội",
      "country": "Việt Nam"
    }
  },
  {
    "school_name": "Đại học Bách Khoa Hà Nội",
    "school_code": "HUST",
    "address": {
      "street": "Số 1, Đại Cồ Việt",
      "district": "Hai Bà Trưng",
      "city": "Hà Nội",
      "country": "Việt Nam"
    }
  },
  {
    "school_name": "Đại học Kinh tế Quốc dân",
    "school_code": "NEU",
    "address": {
      "street": "Số 207, Giải Phóng",
      "district": "Hai Bà Trưng",
      "city": "Hà Nội",
      "country": "Việt Nam"
    }
  },
  {
    "school_name": "Đại học Sư phạm Hà Nội",
    "school_code": "HNUE",
    "address": {
      "street": "Số 136, Xuân Thủy",
      "district": "Cầu Giấy",
      "city": "Hà Nội",
      "country": "Việt Nam"
    }
  },
  {
    "school_name": "Đại học FPT",
    "school_code": "FPTU",
    "address": {
      "street": "Khu Công nghệ cao Hòa Lạc",
      "district": "Thạch Thất",
      "city": "Hà Nội",
      "country": "Việt Nam"
    }
  },
  {
    "school_name": "Đại học Công nghệ Thông tin",
    "school_code": "UIT",
    "address": {
      "street": "Khu phố 6, P. Linh Trung",
      "district": "Thủ Đức",
      "city": "TP. Hồ Chí Minh",
      "country": "Việt Nam"
    }
  },
  {
    "school_name": "Đại học Sài Gòn",
    "school_code": "SGU",
    "address": {
      "street": "Số 273, An Dương Vương",
      "district": "Quận 5",
      "city": "TP. Hồ Chí Minh",
      "country": "Việt Nam"
    }
  },
  {
    "school_name": "Đại học Khoa học Tự nhiên TP.HCM",
    "school_code": "HCMUS",
    "address": {
      "street": "Số 227, Nguyễn Văn Cừ",
      "district": "Quận 5",
      "city": "TP. Hồ Chí Minh",
      "country": "Việt Nam"
    }
  },
  {
    "school_name": "Đại học Tôn Đức Thắng",
    "school_code": "TDTU",
    "address": {
      "street": "Số 19, Nguyễn Hữu Thọ",
      "district": "Quận 7",
      "city": "TP. Hồ Chí Minh",
      "country": "Việt Nam"
    }
  },
  // Thêm các trường cao đẳng bổ sung
  {
    "school_name": "Cao đẳng Kinh tế TP.HCM",
    "school_code": "HCE",
    "address": {
      "street": "Số 33, Vĩnh Viễn",
      "district": "Quận 10",
      "city": "TP. Hồ Chí Minh",
      "country": "Việt Nam"
    }
  },
  {
    "school_name": "Cao đẳng Giao thông Vận tải Trung ương VI",
    "school_code": "CCGTVT",
    "address": {
      "street": "Số 189, Kinh Dương Vương",
      "district": "Bình Tân",
      "city": "TP. Hồ Chí Minh",
      "country": "Việt Nam"
    }
  },
  {
    "school_name": "Cao đẳng Kỹ thuật Cao Thắng",
    "school_code": "CTECH",
    "address": {
      "street": "Số 65, Huỳnh Thúc Kháng",
      "district": "Quận 1",
      "city": "TP. Hồ Chí Minh",
      "country": "Việt Nam"
    }
  },
  {
    "school_name": "Cao đẳng Điện lực TP.HCM",
    "school_code": "HCMPC",
    "address": {
      "street": "Số 554, Hà Huy Giáp",
      "district": "Quận 12",
      "city": "TP. Hồ Chí Minh",
      "country": "Việt Nam"
    }
  },
  {
    "school_name": "Cao đẳng Công nghệ và Kỹ thuật Ô tô",
    "school_code": "CATO",
    "address": {
      "street": "Số 25, Lê Văn Chí",
      "district": "Thủ Đức",
      "city": "TP. Hồ Chí Minh",
      "country": "Việt Nam"
    }
  },
  {
    "school_name": "Cao đẳng Văn hóa Nghệ thuật TP.HCM",
    "school_code": "HCMCA",
    "address": {
      "street": "Số 5, Nam Quốc Cang",
      "district": "Quận 1",
      "city": "TP. Hồ Chí Minh",
      "country": "Việt Nam"
    }
  },
  {
    "school_name": "Cao đẳng Công nghiệp Hà Nội",
    "school_code": "HIC",
    "address": {
      "street": "Số 131, Thái Thịnh",
      "district": "Đống Đa",
      "city": "Hà Nội",
      "country": "Việt Nam"
    }
  },
  {
    "school_name": "Cao đẳng Du lịch Hà Nội",
    "school_code": "HCT",
    "address": {
      "street": "Số 236, Hoàng Quốc Việt",
      "district": "Cầu Giấy",
      "city": "Hà Nội",
      "country": "Việt Nam"
    }
  },
  {
    "school_name": "Cao đẳng Thương mại và Du lịch",
    "school_code": "CMT",
    "address": {
      "street": "Số 45, Trần Duy Hưng",
      "district": "Cầu Giấy",
      "city": "Hà Nội",
      "country": "Việt Nam"
    }
  },
  {
    "school_name": "Cao đẳng Nghề Công nghệ Hà Nội",
    "school_code": "HCTC",
    "address": {
      "street": "Số 4, Hoàng Quốc Việt",
      "district": "Cầu Giấy",
      "city": "Hà Nội",
      "country": "Việt Nam"
    }
  },
  // Thêm các trường đại học và cao đẳng khác
  {
    "school_name": "Đại học Văn Lang",
    "school_code": "VLU",
    "address": {
      "street": "Số 45, Nguyễn Khắc Nhu",
      "district": "Quận 1",
      "city": "TP. Hồ Chí Minh",
      "country": "Việt Nam"
    }
  },
  {
    "school_name": "Đại học Luật Hà Nội",
    "school_code": "HLU",
    "address": {
      "street": "Số 87, Nguyễn Chí Thanh",
      "district": "Đống Đa",
      "city": "Hà Nội",
      "country": "Việt Nam"
    }
  },
  {
    "school_name": "Đại học Y Hà Nội",
    "school_code": "HMU",
    "address": {
      "street": "Số 1, Tôn Thất Tùng",
      "district": "Đống Đa",
      "city": "Hà Nội",
      "country": "Việt Nam"
    }
  },
  {
    "school_name": "Đại học Xây dựng Hà Nội",
    "school_code": "NUCE",
    "address": {
      "street": "Số 55, Giải Phóng",
      "district": "Hai Bà Trưng",
      "city": "Hà Nội",
      "country": "Việt Nam"
    }
  },
  {
    "school_name": "Đại học Giao thông Vận tải",
    "school_code": "UTC",
    "address": {
      "street": "Số 3, Cầu Giấy",
      "district": "Đống Đa",
      "city": "Hà Nội",
      "country": "Việt Nam"
    }
  },
  {
    "school_name": "Đại học Công nghiệp TP.HCM",
    "school_code": "IUH",
    "address": {
      "street": "Số 12, Nguyễn Văn Bảo",
      "district": "Gò Vấp",
      "city": "TP. Hồ Chí Minh",
      "country": "Việt Nam"
    }
  },
  {
    "school_name": "Đại học Nông Lâm TP.HCM",
    "school_code": "NLU",
    "address": {
      "street": "Khu phố 6, P. Linh Trung",
      "district": "Thủ Đức",
      "city": "TP. Hồ Chí Minh",
      "country": "Việt Nam"
    }
  },
  {
    "school_name": "Đại học Công nghệ TP.HCM",
    "school_code": "HUTECH",
    "address": {
      "street": "Số 475A, Điện Biên Phủ",
      "district": "Bình Thạnh",
      "city": "TP. Hồ Chí Minh",
      "country": "Việt Nam"
    }
  }
  // ... tiếp tục thêm các trường nếu cần thiết
];

// Merge the address fields into one string for all schools
defaultSchools = defaultSchools.map(school => {
  const address = school.address;
  if (typeof address === 'string') {
    return school;
  } else {
    const { street, district, city, country } = address;
    const mergedAddress = `${street}, ${district}, ${city}, ${country}`;
    return {
      ...school,
      address: mergedAddress
    };
  }
});

module.exports = defaultSchools;
