import React from "react";

export default function SupplierTable({
    suppliers,
    onEdit,
    onDelete,
}) {
    return (
        <div className="bg-white rounded-xl shadow overflow-x-auto">
            <table className="w-full border-collapse">
                <thead className="bg-slate-100">
                    <tr>
                        <th className="px-4 py-3 text-left">#</th>
                        <th className="px-4 py-3 text-left">
                            Supplier Name
                        </th>
                        <th className="px-4 py-3 text-left">
                            Mobile
                        </th>
                        <th className="px-4 py-3 text-left">
                            Email
                        </th>
                        <th className="px-4 py-3 text-left">
                            City
                        </th>
                        <th className="px-4 py-3 text-left">
                            Opening Balance
                        </th>
                        <th className="px-4 py-3 text-center">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {suppliers.map((supplier, index) => (
                        <tr
                            key={supplier.id}
                            className="border-t hover:bg-gray-50"
                        >
                            <td className="px-4 py-3">
                                {index + 1}
                            </td>

                            <td className="px-4 py-3">
                                {supplier.supplier_name}
                            </td>

                            <td className="px-4 py-3">
                                {supplier.mobile}
                            </td>

                            <td className="px-4 py-3">
                                {supplier.email}
                            </td>

                            <td className="px-4 py-3">
                                {supplier.city}
                            </td>

                            <td className="px-4 py-3">
                                {supplier.opening_balance}
                            </td>

                            <td className="px-4 py-3">
                                <div className="flex justify-center gap-2">
                                    <button
                                        onClick={() =>
                                            onEdit(supplier.id)
                                        }
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            onDelete(supplier.id)
                                        }
                                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}