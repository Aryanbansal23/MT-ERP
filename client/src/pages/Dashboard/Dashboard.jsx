import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import SummaryCard from "../../components/Cards/SummaryCard";
import { getDashboard } from "../../services/dashboardService";

export default function Dashboard() {

    const [summary, setSummary] = useState({
        totalCustomers: 0,
        totalSuppliers: 0,
        totalProducts: 0,
        lowStockProducts: 0,
        totalPurchases: 0,
        totalSales: 0,
        totalExpenses: 0
    });

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {

        try {

            const res = await getDashboard();

            if (res.data.success) {
                setSummary(res.data.summary);
            }

        } catch (err) {

            console.error(err);

        }

    };

    return (

        <DashboardLayout>

            <h1 className="text-3xl font-bold mb-8">
                Dashboard
            </h1>

            <div className="grid grid-cols-4 gap-6">

                <SummaryCard
                    title="Customers"
                    value={summary.totalCustomers}
                    color="text-blue-600"
                />

                <SummaryCard
                    title="Suppliers"
                    value={summary.totalSuppliers}
                    color="text-green-600"
                />

                <SummaryCard
                    title="Products"
                    value={summary.totalProducts}
                    color="text-orange-600"
                />

                <SummaryCard
                    title="Low Stock"
                    value={summary.lowStockProducts}
                    color="text-red-600"
                />

                <SummaryCard
                    title="Sales"
                    value={`₹ ${summary.totalSales}`}
                    color="text-purple-600"
                />

                <SummaryCard
                    title="Purchases"
                    value={`₹ ${summary.totalPurchases}`}
                    color="text-indigo-600"
                />

                <SummaryCard
                    title="Expenses"
                    value={`₹ ${summary.totalExpenses}`}
                    color="text-pink-600"
                />

            </div>

        </DashboardLayout>

    );

}