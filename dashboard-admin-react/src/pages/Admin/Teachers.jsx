import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../libs/axios";

const Teachers = () => {
    const [teachers, setTeachers] = useState([]);
    // const teachers = [
    //     { id: 1, name: "Nguyễn Văn A", email: "nguyenvana@gmail.com", status: "active" },
    //     { id: 2, name: "Trần Thị B", email: "tranthib@gmail.com", status: "inactive" },
    //     { id: 3, name: "Lê Văn C", email: "levanc@gmail.com", status: "active" },
    //     { id: 4, name: "Phạm Thị D", email: "phamthid@gmail.com", status: "active" },
    //     { id: 5, name: "Hoàng Văn E", email: "hoangvane@gmail.com", status: "inactive" },
    //     { id: 6, name: "Đỗ Thị F", email: "dothif@gmail.com", status: "active" },
    //     { id: 7, name: "Vũ Văn G", email: "vuvang@gmail.com", status: "active" },
    //     { id: 8, name: "Ngô Thị H", email: "ngothih@gmail.com", status: "inactive" },
    //     { id: 9, name: "Bùi Văn I", email: "buivani@gmail.com", status: "active" },
    //     { id: 10, name: "Đặng Thị K", email: "dangthik@gmail.com", status: "active" },
    //     // { id: 11, name: "Cao Văn L", email: "caovanl@gmail.com", status: "inactive" },
    //     // { id: 12, name: "Mai Thị M", email: "maithim@gmail.com", status: "active" },
    //     // { id: 13, name: "Tô Văn N", email: "tovann@gmail.com", status: "active" },
    //     // { id: 14, name: "Lý Thị O", email: "lythio@gmail.com", status: "inactive" },
    //     // { id: 15, name: "Chu Văn P", email: "chuvanp@gmail.com", status: "active" },
    //     // { id: 16, name: "Dương Thị Q", email: "duongthiq@gmail.com", status: "active" },
    //     // { id: 17, name: "La Văn R", email: "lavanr@gmail.com", status: "inactive" },
    //     // { id: 18, name: "Trịnh Thị S", email: "trinhthis@gmail.com", status: "active" },
    //     // { id: 19, name: "Lưu Văn T", email: "luuvant@gmail.com", status: "active" },
    //     // { id: 20, name: "Tạ Thị U", email: "tathiu@gmail.com", status: "inactive" },
    // ];
    useEffect(() => {
        fetchTeachers();
    }, []);
    const fetchTeachers = async () => {
        try {
            const response = await api.post('/v1/user/teachers')
            const data = response.data;
            if (data && data.metadata) {
                setTeachers(data.metadata);
            }
        } catch (error) {
            console.error("Lỗi khi lấy danh sách giáo viên:", error);
        }
    }

    return (
        <div className="relative h-screen">

            {/* banner */}
            <div className="bg-[#039BE5] text-white px-4 pt-[60px] pb-[100px] mb-4">
                <h1
                    className="text-3xl mb-4"
                >
                    Danh sách giáo viên
                </h1>
            </div>

            <div className="p-4 bg-transparent absolute top-[120px] left-0 right-0 bottom-0">
                {/* sort, find */}
                <div
                    className="flex gap-2 items-center mb-4"
                >
                    <div className="flex items-center">
                        <select className="border border-gray-300 rounded bg-white text-gray-500 px-2 py-1">
                            <option value="all">Sắp xếp theo: Tất cả</option>
                            <option value="name">Tên</option>
                            <option value="email">Email</option>
                            <option value="status">Trạng thái</option>
                        </select>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="text"
                            placeholder="CCCD"
                            className="border border-gray-300 bg-white text-gray-500  rounded px-2 py-1 mr-2"
                        />
                    </div>
                     <div className="flex items-center">
                        <input
                            type="text"
                            placeholder="Họ tên"
                            className="border border-gray-300 bg-white text-gray-500  rounded px-2 py-1 mr-2"
                        />
                    </div>
                     <div className="flex items-center">
                        <input
                            type="text"
                            placeholder="Email"
                            className="border border-gray-300 bg-white text-gray-500  rounded px-2 py-1 mr-2"
                        />
                    </div>
                    <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">
                        Tìm kiếm
                    </button>
                </div>
                <table className="min-w-full bg-white border-gray-200 border-1 shadow-md rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-white">
                            <th className="px-4 py-5 border-b text-xs text-gray-500 ">ID</th>
                            <th className="px-4 py-5 border-b text-xs text-gray-500">Tên</th>
                            <th className="px-4 py-5 border-b text-xs text-gray-500">Email</th>
                            <th className="px-4 py-5 border-b text-xs text-gray-500">Trạng thái</th>
                            {/* các hành động */}
                            <th className="px-4 py-5 border-b text-xs text-gray-500"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {teachers.slice(0,10).map(({
                            _id: id,
                            userId: {
                                user_fullname,
                                user_email,
                                user_avatar
                            } = {},
                            status
                        }, index) => (
                            <tr key={id} className={`border-b-1 border-gray-300 font-stretch-50%`}>
                                <td className="px-4 py-4">{index}</td>
                                <td className="px-4 py-4">{user_fullname}</td>
                                <td className="px-4 py-4">{user_email}</td>
                                <td className={`px-4 py-4 text-gray-500`}>
                                    {status}
                                </td>
                                <td className="px-4 py-4">
                                    <Link to={`/admin/teachers/${id}`} className="text-blue-500 hover:underline">
                                        Chỉnh sửa
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* pagination */}
                <div className="flex justify-end items-center py-4">
                    {/* so dong */}
                   <div>
                        <span className="text-gray-500 mr-2">Hiển thị 10 trên {teachers.length} giáo viên</span>
                    </div>
                    {/* pagination */}
                    <div className="flex items-center">
                        <button className="px-3 py-1 cursor-pointer bg-gray-200 text-gray-700 rounded hover:bg-gray-300 mr-2">
                            &lt;
                        </button>
                        <button className="px-3 py-1 cursor-pointer bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
                             &gt;
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Teachers;