import { FaBell, FaUserCircle } from "react-icons/fa";

export default function Header() {

    return (

        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">

            <h1 className="text-2xl font-bold">
                Dashboard
            </h1>

            <div className="flex items-center gap-6">

                <FaBell
                    size={20}
                    className="cursor-pointer"
                />

                <FaUserCircle
                    size={28}
                    className="cursor-pointer"
                />

            </div>

        </header>

    );

}