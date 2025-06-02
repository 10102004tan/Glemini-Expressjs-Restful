import Login from "../pages/Login";
import Dashboard from "../pages/Admin/Dashboard";
import Teachers from "../pages/Admin/Teachers";
import Teacher from "../pages/Admin/Teacher";

export const publicRoutes = [
    {
        path:"/login",
        element:Login,
        layout:"auth"
    },
]

export const privateRoutes = [
    {
        path:"/dashboard",
        element:Dashboard,
        layout:"admin"
    },{
        path:"/teachers",
        element:Teachers,
        layout:"admin"
    },
    {
        path: "/teachers/:id",
        element: Teacher,
        layout: "admin"
    }
];
