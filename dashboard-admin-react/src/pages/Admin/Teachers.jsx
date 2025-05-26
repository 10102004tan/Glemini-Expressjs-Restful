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
    const fetchTeachers = async() => {
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
        <div>
            <h1
                className="text-2xl font-bold mb-4"
            >Quản lý giáo viên</h1>

            <div>
                {/* sort, find */}
                <div
                className="flex gap-2 items-center mb-4"
                >
                    <div className="flex items-center">
                        <label className="mr-2">Sắp xếp theo:</label>
                        <select className="border border-gray-300 rounded px-2 py-1">
                            <option value="name">Tên</option>
                            <option value="email">Email</option>
                            <option value="status">Trạng thái</option>
                        </select>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="text"
                            placeholder="Tìm kiếm..."
                            className="border border-gray-300 rounded px-2 py-1 mr-2"
                        />
                        <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                            Tìm kiếm
                        </button>
                    </div>
                    {/* export */}
                    <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">
                        Xuất danh sách
                    </button>
                </div>
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 border-b">ID</th>
                            <th className="px-4 py-2 border-b">Tên</th>
                            <th className="px-4 py-2 border-b">Email</th>
                            <th className="px-4 py-2 border-b">Trạng thái</th>
                            {/* các hành động */}
                            <th className="px-4 py-2 border-b">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teachers.map(({
                            _id:id,
                            userId:{
                                user_fullname,
                                user_email,
                                user_avatar
                            } = {},
                            status
                        },index) => (
                            <tr key={id} className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}>
                                <td className="px-4 py-2 border-b">{index}</td>
                                <td className="px-4 py-2 border-b">{user_fullname}</td>
                                <td className="px-4 py-2 border-b">{user_email}</td>
                                <td className={`px-4 py-2 border-b ${status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                                    {status}
                                </td>
                                <td className="px-4 py-2 border-b">
                                    <Link to={`/admin/teachers/${id}`} className="text-blue-500 hover:underline">
                                        Xem chi tiết
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* pagination */}
                <div className="mt-4 flex justify-center items-center">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Trang trước</button>
                    <span 
                    className="mx-2 ">Trang 1/10</span>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Trang sau</button>
                </div>
            </div>
        </div>
    );
}
export default Teachers;