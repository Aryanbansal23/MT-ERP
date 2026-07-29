import React, { useState, useEffect } from "react";

const SupplierForm = ({ initialData, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        supplier_name: "",
        mobile: "",
        email: "",
        gst_number: "",
        pan_number: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        opening_balance: "",
        balance_type: "Dr",
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                supplier_name: initialData.supplier_name || "",
                mobile: initialData.mobile || "",
                email: initialData.email || "",
                gst_number: initialData.gst_number || "",
                pan_number: initialData.pan_number || "",
                address: initialData.address || "",
                city: initialData.city || "",
                state: initialData.state || "",
                pincode: initialData.pincode || "",
                opening_balance: initialData.opening_balance || "",
                balance_type: initialData.balance_type || "Dr",
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <input
                    type="text"
                    name="supplier_name"
                    placeholder="Supplier Name"
                    value={formData.supplier_name}
                    onChange={handleChange}
                    className="border rounded p-2"
                    required
                />

                <input
                    type="text"
                    name="mobile"
                    placeholder="Mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="border rounded p-2"
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border rounded p-2"
                />

                <input
                    type="text"
                    name="gst_number"
                    placeholder="GST Number"
                    value={formData.gst_number}
                    onChange={handleChange}
                    className="border rounded p-2"
                />

                <input
                    type="text"
                    name="pan_number"
                    placeholder="PAN Number"
                    value={formData.pan_number}
                    onChange={handleChange}
                    className="border rounded p-2"
                />

                <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    className="border rounded p-2"
                />

                <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleChange}
                    className="border rounded p-2"
                />

                <input
                    type="text"
                    name="pincode"
                    placeholder="Pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    className="border rounded p-2"
                />

                <input
                    type="number"
                    name="opening_balance"
                    placeholder="Opening Balance"
                    value={formData.opening_balance}
                    onChange={handleChange}
                    className="border rounded p-2"
                />

                <select
                    name="balance_type"
                    value={formData.balance_type}
                    onChange={handleChange}
                    className="border rounded p-2"
                >
                    <option value="Dr">Dr</option>
                    <option value="Cr">Cr</option>
                </select>
            </div>

            <textarea
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="border rounded p-2 w-full"
                rows="3"
            />

            <div className="flex justify-end gap-3">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Save Supplier
                </button>
            </div>
        </form>
    );
};

export default SupplierForm;