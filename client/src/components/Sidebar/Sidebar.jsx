import { NavLink } from "react-router-dom";
import {
    FaHome,
    FaUsers,
    FaTruck,
    FaBox,
    FaShoppingCart,
    FaCashRegister,
    FaMoneyBill,
    FaWallet,
    FaChartBar,
    FaCog,
} from "react-icons/fa";

const menu = [
    {
        name: "Dashboard",
        path: "/dashboard",
        icon: <FaHome />,
    },
    {
        name: "Customers",
        path: "/customers",
        icon: <FaUsers />,
    },
    {
        name: "Suppliers",
        path: "/suppliers",
        icon: <FaTruck />,
    },
    {
        name: "Products",
        path: "/products",
        icon: <FaBox />,
    },
    {
        name: "Purchases",
        path: "/purchases",
        icon: <FaShoppingCart />,
    },
    {
        name: "Sales",
        path: "/sales",
        icon: <FaCashRegister />,
    },
    {
        name: "Expenses",
        path: "/expenses",
        icon: <FaMoneyBill />,
    },
    {
        name: "Payments",
        path: "/payments",
        icon: <FaWallet />,
    },
    {
        name: "Reports",
        path: "/reports",
        icon: <FaChartBar />,
    },
    {
        name: "Settings",
        path: "/settings",
        icon: <FaCog />,
    },
];

export default function Sidebar() {
    return (
        <aside className="w-64 h-screen bg-slate-900 text-white flex flex-col">
            {/* Logo */}
            <div className="text-2xl font-bold text-center py-6 border-b border-slate-700">
                MT ERP
            </div>

            {/* Menu */}
            <nav className="flex-1 mt-4">
                {menu.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-6 py-4 transition-all duration-200
                            ${
                                isActive
                                    ? "bg-blue-600 text-white"
                                    : "hover:bg-slate-800 text-gray-300"
                            }`
                        }
                    >
                        <span className="text-lg">{item.icon}</span>
                        <span>{item.name}</span>
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
}