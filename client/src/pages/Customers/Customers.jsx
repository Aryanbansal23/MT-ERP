import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import {
    getCustomers,
    addCustomer,
    updateCustomer,
    deleteCustomer,
} from "../../services/customerService";

import CustomerTable from "../../components/Customer/CustomerTable";
import CustomerModal from "../../components/Customer/CustomerModal";
import CustomerForm from "../../components/Customer/CustomerForm";

export default function Customers() {

    const [customers, setCustomers] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState([]);

    const [loading, setLoading] = useState(false);

    const [search, setSearch] = useState("");

    const [modalOpen, setModalOpen] = useState(false);

    const [editingCustomer, setEditingCustomer] = useState(null);

    useEffect(() => {
        loadCustomers();
    }, []);

    useEffect(() => {

        const value = search.toLowerCase().trim();

        if (!value) {
            setFilteredCustomers(customers);
            return;
        }

        const filtered = customers.filter((customer) =>
            Object.values(customer).some((field) =>
                String(field).toLowerCase().includes(value)
            )
        );

        setFilteredCustomers(filtered);

    }, [search, customers]);

    const loadCustomers = async () => {

        try {

            setLoading(true);

            const res = await getCustomers();

            if (res.data.success) {

                setCustomers(res.data.customers);
                setFilteredCustomers(res.data.customers);

            }

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Unable to load customers."
            );

        } finally {

            setLoading(false);

        }

    };

    const handleAddCustomer = () => {

        setEditingCustomer(null);
        setModalOpen(true);

    };

    const handleEditCustomer = (id) => {

        const customer = customers.find(
            (item) => item.id === id
        );

        setEditingCustomer(customer);

        setModalOpen(true);

    };

    const handleSaveCustomer = async (formData) => {

        try {

            setLoading(true);

            if (editingCustomer) {

                await updateCustomer(
                    editingCustomer.id,
                    formData
                );

                alert("Customer updated successfully.");

            } else {

                await addCustomer(formData);

                alert("Customer added successfully.");

            }

            setModalOpen(false);

            loadCustomers();

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Unable to save customer."
            );

        } finally {

            setLoading(false);

        }

    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this customer?"
        );

        if (!confirmDelete) return;

        try {

            await deleteCustomer(id);

            alert("Customer deleted successfully.");

            loadCustomers();

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Unable to delete customer."
            );

        }

    };
    return (
    <DashboardLayout>

        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">

            <div>

                <h1 className="text-3xl font-bold text-slate-800">
                    Customers
                </h1>

                <p className="text-gray-500 mt-1">
                    Total Customers : {filteredCustomers.length}
                </p>

            </div>

            <button
                onClick={handleAddCustomer}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition"
            >
                + Add Customer
            </button>

        </div>

        <div className="mb-6">

            <input
                type="text"
                placeholder="Search customer..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

        </div>

        {loading ? (

            <div className="flex justify-center items-center h-52">

                <p className="text-lg text-gray-600">
                    Loading...
                </p>

            </div>

        ) : filteredCustomers.length === 0 ? (

            <div className="bg-white rounded-xl shadow p-10 text-center">

                <h2 className="text-2xl font-semibold text-gray-600">
                    No Customers Found
                </h2>

                <p className="text-gray-500 mt-2">
                    Click "Add Customer" to create your first customer.
                </p>

            </div>

        ) : (

            <CustomerTable
                customers={filteredCustomers}
                onEdit={handleEditCustomer}
                onDelete={handleDelete}
            />

        )}

        <CustomerModal
            isOpen={modalOpen}
            title={
                editingCustomer
                    ? "Edit Customer"
                    : "Add Customer"
            }
            onClose={() => {
                setModalOpen(false);
                setEditingCustomer(null);
            }}
        >

            <CustomerForm
                initialData={editingCustomer || {}}
                loading={loading}
                onSubmit={handleSaveCustomer}
                onCancel={() => {
                    setModalOpen(false);
                    setEditingCustomer(null);
                }}
            />

        </CustomerModal>

    </DashboardLayout>
);
}