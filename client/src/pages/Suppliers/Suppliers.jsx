import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";

import {
    getSuppliers,
    addSupplier,
    updateSupplier,
    deleteSupplier,
} from "../../services/supplierService";

import SupplierTable from "../../components/Supplier/SupplierTable";
import SupplierModal from "../../components/Supplier/SupplierModal";
import SupplierForm from "../../components/Supplier/SupplierForm";

export default function Suppliers() {

    const [suppliers, setSuppliers] = useState([]);
    const [filteredSuppliers, setFilteredSuppliers] = useState([]);

    const [loading, setLoading] = useState(false);

    const [search, setSearch] = useState("");

    const [modalOpen, setModalOpen] = useState(false);

    const [editingSupplier, setEditingSupplier] = useState(null);

    useEffect(() => {
        loadSuppliers();
    }, []);

    useEffect(() => {

        const value = search.toLowerCase().trim();

        if (!value) {
            setFilteredSuppliers(suppliers);
            return;
        }

        const filtered = suppliers.filter((supplier) =>
            Object.values(supplier).some((field) =>
                String(field).toLowerCase().includes(value)
            )
        );

        setFilteredSuppliers(filtered);

    }, [search, suppliers]);

    const loadSuppliers = async () => {

        try {

            setLoading(true);

            const res = await getSuppliers();

            if (res.data.success) {

                setSuppliers(res.data.suppliers);
                setFilteredSuppliers(res.data.suppliers);

            }

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Unable to load suppliers."
            );

        } finally {

            setLoading(false);

        }

    };

    const handleAddSupplier = () => {

        setEditingSupplier(null);
        setModalOpen(true);

    };

    const handleEditSupplier = (id) => {

        const supplier = suppliers.find(
            (item) => item.id === id
        );

        setEditingSupplier(supplier);

        setModalOpen(true);

    };

    const handleSaveSupplier = async (formData) => {

        try {

            setLoading(true);

            if (editingSupplier) {

                await updateSupplier(
                    editingSupplier.id,
                    formData
                );

                alert("Supplier updated successfully.");

            } else {

                await addSupplier(formData);

                alert("Supplier added successfully.");

            }

            setModalOpen(false);

            loadSuppliers();

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Unable to save supplier."
            );

        } finally {

            setLoading(false);

        }

    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this supplier?"
        );

        if (!confirmDelete) return;

        try {

            await deleteSupplier(id);

            alert("Supplier deleted successfully.");

            loadSuppliers();

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Unable to delete supplier."
            );

        }

    };

    return (
        <DashboardLayout>

            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">

                <div>

                    <h1 className="text-3xl font-bold text-slate-800">
                        Suppliers
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Total Suppliers : {filteredSuppliers.length}
                    </p>

                </div>

                <button
                    onClick={handleAddSupplier}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition"
                >
                    + Add Supplier
                </button>

            </div>

            <div className="mb-6">

                <input
                    type="text"
                    placeholder="Search supplier..."
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

            ) : filteredSuppliers.length === 0 ? (

                <div className="bg-white rounded-xl shadow p-10 text-center">

                    <h2 className="text-2xl font-semibold text-gray-600">
                        No Suppliers Found
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Click "Add Supplier" to create your first supplier.
                    </p>

                </div>

            ) : (

                <SupplierTable
                    suppliers={filteredSuppliers}
                    onEdit={handleEditSupplier}
                    onDelete={handleDelete}
                />

            )}

            <SupplierModal
                isOpen={modalOpen}
                title={
                    editingSupplier
                        ? "Edit Supplier"
                        : "Add Supplier"
                }
                onClose={() => {
                    setModalOpen(false);
                    setEditingSupplier(null);
                }}
            >

                <SupplierForm
                    initialData={editingSupplier || {}}
                    loading={loading}
                    onSubmit={handleSaveSupplier}
                    onCancel={() => {
                        setModalOpen(false);
                        setEditingSupplier(null);
                    }}
                />

            </SupplierModal>

        </DashboardLayout>
    );
}