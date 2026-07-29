import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";

export default function DashboardLayout({ children }) {
    return (
        <div className="flex h-screen bg-gray-100">

            <Sidebar />

            <div className="flex-1 flex flex-col">

                <Header />

                <main className="flex-1 p-6 overflow-auto">
                    {children}
                </main>

            </div>

        </div>
    );
}