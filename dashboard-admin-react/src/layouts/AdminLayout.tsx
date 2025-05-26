import { AlignJustify, ArrowRightToLine, Blocks, ChevronDown, ChevronRight, FolderClosed, Lightbulb, Move3d, Music, Settings, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const AdminLayout = ({ children }) => {
    const [currentActive, setCurrentActive] = useState("dashboard");
    const { user } = useAuthStore();
    useEffect(() => {
        // set current active based on the current URL path
        const path = window.location.pathname;
        if (path.includes("admin/users")) {
            setCurrentActive("users");
        } else if (path.includes("admin/podcasts")) {
            setCurrentActive("podcasts");
        }
        else if (path.includes("dashboard")) {
            setCurrentActive("dashboard");
        }
    }, [])
    return (
        <div className="flex flex-col h-screen">
            <main className="flex flex-1">
                <aside className={`w-64 sticky left-0 top-0 h-screen border-r-1 transition-all duration-300`}>
                    {/* sidebar logo */}
                    <div className="flex items-center px-4 pt-4 justify-between pb-3 border-b-1 border-gray-300 mb-5">
                        <h5 className="text-lg font-semibold">
                            <Link to="/dashboard" className="flex items-center gap-2">
                                <Blocks className="w-6 h-6" />
                                Admin Dashboard
                            </Link>
                        </h5>
                    </div>
                    <nav className="px-4">
                        <ul className="space-y-2">
                            <li>
                                <Link to="/dashboard" className={`flex items-center gap-2 p-2 rounded hover:bg-gray-100 ${currentActive === "dashboard" ? "bg-gray-200 font-semibold" : ""}`} onClick={() => setCurrentActive("dashboard")}>
                                    <AlignJustify className="w-5 h-5" />
                                    <span>Dashboard</span>
                                </Link>
                            </li>
                            <li>
                                <ManagementMenu
                                    currentActive={currentActive}
                                    setCurrentActive={setCurrentActive}
                                    title="Quản lý người dùng"
                                    options={[
                                        { label: "Người dùng", icon: User, path: "admin/users" },
                                        { label: "Giáo viên", icon: User, path: "admin/teachers" },
                                        { label: "Quản lý quyền", icon: Settings, path: "admin/users/permissions" },
                                        { label: "Quản lý nhóm", icon: FolderClosed, path: "admin/users/groups" }
                                    ]}
                                />
                            </li>
                        </ul>
                    </nav>
                </aside>
                <section className="flex-1">
                    <header className="flex items-center justify-end sticky top-0 z-50 p-4 bg-white shadow-sm">
                        <div className="flex rounded items-center justify-between gap-4 bg-white/10">
                            <img src={user.user_avatar} alt="User Avatar" className="w-10 h-10 rounded-full object-cover" />
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold">{user.email}</span>
                                <span className="text-xs text-gray-400">{user.user_role}</span>
                            </div>
                        </div>
                    </header>
                    <div className="p-4">
                        {children}
                    </div>
                </section>
            </main>
        </div>
    )
}

interface ManagementMenuProps {
    currentActive: string;
    setCurrentActive: (active: string) => void;
    title: string;
    options?: {
        label: string;
        icon: any;
        path: string; // Optional path for navigation
    }[];
}

const ManagementMenu = ({
    currentActive,
    setCurrentActive,
    title = "Quản lý người dùng",
    options = [
        {
            label: "Người dùng",
            icon: User,
            path: "/admin/users"
        },
        {
            label: "Quản lý quyền", icon: Settings,
            path: "/admin/users/permissions"
        }
    ]
}: ManagementMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const handleToggle = () => {
        setIsOpen(!isOpen);
    }
    return (
        <div>
            <div
                onClick={handleToggle}
                className="flex items-center p-2 rounded hover:bg-gray-100 cursor-pointer"
            >
                {
                    isOpen ? (
                        <ChevronDown className="w-5 h-5" />
                    ) : (
                        <ChevronRight className="w-5 h-5" />
                    )
                }
                <span
                    className="flex items-center select-none gap-2 font-semibold ms-2 text-gray-700 hover:text-gray-900 transition-colors duration-200 cursor-pointer"
                >
                    {title}
                </span>

            </div>
            <ul
                className={`ml-4 space-y-2 mt-2 border-l-2 border-gray-200 pl-2 ${isOpen ? "d-block" : "hidden"}`} >
                {
                    options.map((option, index) => (
                        <li key={index}>
                            <Link to={`/${option.path}`} className={`flex items-center gap-2 p-2 rounded hover:bg-gray-100 ${currentActive === option.path ? "bg-gray-200 font-semibold" : ""}`} onClick={() => setCurrentActive(option.label.toLowerCase())}>
                                <option.icon className="w-5 h-5" />
                                <span>{option.label}</span>
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
export default AdminLayout