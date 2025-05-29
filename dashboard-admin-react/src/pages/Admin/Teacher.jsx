import { ArrowLeft } from "lucide-react";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../libs/axios"
import socket from "../../libs/socket";

export default function Teacher() {
    const {id} = useParams();
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

    useEffect(() => {
       
    }, [id]);


    const saveHandle = async(e) => {
        e.preventDefault();
        // Handle form submission logic here
        // console.log("Form submitted");
        // try {
        //     const body = {

        //     }
        //     const response = await api.post('/api/teachers', body);
        //     const data = response.data;
            
        // } catch (error) {
            
        // }
        socket.emit("react-dashboard-call",{
            message: "Hello from React Dashboard"
        });
        console.log("Form saved");
    }

    const rejectHandle = (e) => {
        e.preventDefault();
        // Handle rejection logic here
        console.log("Form rejected");
    }

    const confirmHandle = (e) => {
        e.preventDefault();
        // Handle confirmation logic here
        console.log("Form confirmed");
    }

    return (
        <div className="p-4">
            {/* form */}
            <div
                className="bg-white border-1 border-gray-200 shadow-md text-[#073484] p-6 mb-4 w-[900px]"
            >
                <Link
                to={"/admin/teachers"}
                className="flex
            justify-start mb-2
            ">
                    <ArrowLeft
                        className="w-5 h-5 cursor-pointer"
                    />
                </Link>
                <h1
                    className="text-3xl font-semibold mb-4
            text-center text-transform: uppercase
            "
                >
                    Đăng ký tài khoản giáo viên ứng dụng GLEMINI
                </h1>

                <span className="text-sm font-semibold mb-4 block">
                    Trạng thái: <span className="text-gray-500">Chưa xác nhận</span>
                </span>

                {/* section */}
                <section className="mb-6">
                    {/* header section */}
                    <div className="flex mb-4 gap-2 pb-3">
                        <span
                            className="text-sm font-semibold py-2 px-4 text-white bg-[#073484] block"
                        >1</span>
                        <h2 className="text-xl font-semibold border-b-2 w-full
                        text-transform: uppercase
                        border-[#073484]">Thông tin cá nhân</h2>
                    </div>

                    {/* content section */}
                    <div
                        className="grid grid-cols-3 gap-4"
                    >
                        <div
                            className="col-span-1 relative"
                        >
                            <input
                                type="text"
                                placeholder="Họ và tên"
                                className="border border-gray-300 bg-white text-transform: uppercase
                                rounded px-2 py-2 w-full mb-2"
                                value={teacher.name}
                            />
                            <span className="
                            text-[8px]
                            absolute top-0 left-0 text-gray-500 text-sm px-2 py-1 bg-white
                            transform -translate-y-1/2 -translate-x-[-5px]
                            ">
                                Họ và tên
                                <span>
                                    <span className="text-red-500">*</span>
                                </span>
                            </span>
                        </div>
                        <div
                            className="col-span-1 relative"
                        >
                            <input
                                type="text"
                                placeholder="vd:2000/10/10"
                                className="border border-gray-300 bg-white text-transform: uppercase
                                rounded px-2 py-2 w-full mb-2"
                                value={"2000/10/10"}
                            />
                            <span className="
                            text-[8px]
                            absolute top-0 left-0 text-gray-500 text-sm px-2 py-1 bg-white
                            transform -translate-y-1/2 -translate-x-[-5px]
                            ">
                                Ngày sinh
                                <span>
                                    <span className="text-red-500">*</span>
                                </span>
                            </span>
                        </div>

                        <div
                            className="col-span-1 relative"
                        >
                            <input
                                type="text"
                                placeholder="vd:2000/10/10"
                                className="border border-gray-300 bg-white text-transform: uppercase
                                rounded px-2 py-2 w-full mb-2"
                                value={"2000/10/10"}
                            />
                            <span className="
                            text-[8px]
                            absolute top-0 left-0 text-gray-500 text-sm px-2 py-1 bg-white
                            transform -translate-y-1/2 -translate-x-[-5px]
                            ">
                                Ngày sinh
                                <span>
                                    <span className="text-red-500">*</span>
                                </span>
                            </span>
                        </div>

                        <div
                            className="col-span-1 relative"
                        >
                            <input
                                type="text"
                                placeholder="vd:2000/10/10"
                                className="border border-gray-300 bg-white text-transform: uppercase
                                rounded px-2 py-2 w-full mb-2"
                                value={"2000/10/10"}
                            />
                            <span className="
                            text-[8px]
                            absolute top-0 left-0 text-gray-500 text-sm px-2 py-1 bg-white
                            transform -translate-y-1/2 -translate-x-[-5px]
                            ">
                                Ngày sinh
                                <span>
                                    <span className="text-red-500">*</span>
                                </span>
                            </span>
                        </div>

                        <div
                            className="col-span-1 relative"
                        >
                            <input
                                type="text"
                                placeholder="vd:2000/10/10"
                                className="border border-gray-300 bg-white text-transform: uppercase
                                rounded px-2 py-2 w-full mb-2"
                                value={"2000/10/10"}
                            />
                            <span className="
                            text-[8px]
                            absolute top-0 left-0 text-gray-500 text-sm px-2 py-1 bg-white
                            transform -translate-y-1/2 -translate-x-[-5px]
                            ">
                                Ngày sinh
                                <span>
                                    <span className="text-red-500">*</span>
                                </span>
                            </span>
                        </div>

                        <div
                            className="col-span-1 relative"
                        >
                            <input
                                type="text"
                                placeholder="vd:2000/10/10"
                                className="border border-gray-300 bg-white text-transform: uppercase
                                rounded px-2 py-2 w-full mb-2"
                                value={"2000/10/10"}
                            />
                            <span className="
                            text-[8px]
                            absolute top-0 left-0 text-gray-500 text-sm px-2 py-1 bg-white
                            transform -translate-y-1/2 -translate-x-[-5px]
                            ">
                                Ngày sinh
                                <span>
                                    <span className="text-red-500">*</span>
                                </span>
                            </span>
                        </div>
                        <div
                            className="col-span-1 relative"
                        >
                            <input
                                type="text"
                                placeholder="vd:2000/10/10"
                                className="border border-gray-300 bg-white text-transform: uppercase
                                rounded px-2 py-2 w-full mb-2"
                                value={"2000/10/10"}
                            />
                            <span className="
                            text-[8px]
                            absolute top-0 left-0 text-gray-500 text-sm px-2 py-1 bg-white
                            transform -translate-y-1/2 -translate-x-[-5px]
                            ">
                                Ngày sinh
                                <span>
                                    <span className="text-red-500">*</span>
                                </span>
                            </span>
                        </div>
                    </div>
                </section>

                <section>
                    {/* header section */}
                    <div className="flex mb-4 gap-2 pb-3">
                        <span
                            className="text-sm font-semibold py-2 px-4 text-white bg-[#073484] block"
                        >2</span>
                        <h2 className="text-xl font-semibold border-b-2 w-full
                        text-transform: uppercase
                        border-[#073484]">Giấy tờ yêu cầu</h2>
                    </div>

                    {/* content section */}
                    <div className="relative border-2 border-[#073484]">
                        <h5
                            className="text-[12px] font-semibold text-[#073484] px-1 absolute top-[-10px] left-4 bg-white"
                        >
                            Giấy tờ yêu cầu
                        </h5>

                        <div className="h-[400px] overflow-y-auto">

                        </div>
                    </div>
                </section>
            </div>

            {/*  */}
            <div className="relative border-2 border-[#073484] w-[900px]">
                <h5
                    className="text-[12px] font-semibold text-red-500 px-1 absolute top-[-10px] left-4 bg-white"
                >
                    Lưu ý
                </h5>

                <div className="py-3">
                    <ul className="list-disc pl-6 text-sm">
                        <li>Vui lòng điền đầy đủ thông tin cá nhân.</li>
                        <li>Thông tin giấy tờ yêu cầu cần được cung cấp đầy đủ.</li>
                        <li>Hồ sơ sẽ được xem xét trong vòng 3-5 ngày làm việc.</li>
                        <li>Nếu có bất kỳ câu hỏi nào, vui lòng liên hệ với bộ phận hỗ trợ.</li>
                    </ul>
                </div>
            </div>

            <div
                className="flex justify-end w-[900px] mt-4"
            >
                <button
                    onClick={saveHandle}
                    className="px-4 cursor-pointer py-2 bg-[#073484] text-white rounded hover:bg-[#055a8c] mt-4"
                >
                    Lưu
                </button>

                <button
                    onClick={rejectHandle}
                    className="px-4 cursor-pointer py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 mt-4 ml-2"
                >
                    Từ chối
                </button>
                <button
                    onClick={confirmHandle}
                    className="px-4 cursor-pointer py-2 bg-green-500 text-white rounded hover:bg-green-600 mt-4 ml-2"
                >
                    Xác nhận
                </button>
            </div>
        </div>
    );
}