import { useState } from "react";

export default function CustomerForm({
    initialData = {},
    onSubmit,
    onCancel,
    loading = false,
}) {

    const [form, setForm] = useState({
        customer_name: initialData.customer_name || "",
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

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >

            <div>
                <label className="block mb-1 font-medium">
                    Customer Name
                </label>

                <input
                    type="text"
                    name="customer_name"
                    value={form.customer_name}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-lg px-4 py-2"
                />
            </div>

            <div>
                <label className="block mb-1 font-medium">
                    Mobile
                </label>

                <input
                    type="text"
                    name="mobile"
                    value={form.mobile}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-2"
                />
            </div>

            <div>
                <label className="block mb-1 font-medium">
                    Email
                </label>

                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-2"
                />
            </div>

            <div>
                <label className="block mb-1 font-medium">
                    GST Number
                </label>

                <input
                    type="text"
                    name="gst_number"
                    value={form.gst_number}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-2"
                />
            </div>

            <div>
                <label className="block mb-1 font-medium">
                    PAN Number
                </label>

                <input
                    type="text"
                    name="pan_number"
                    value={form.pan_number}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-2"
                />
            </div>

            <div>
                <label className="block mb-1 font-medium">
                    City
                </label>

                <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-2"
                />
            </div>

            <div>
                <label className="block mb-1 font-medium">
                    State
                </label>

                <input
                    type="text"
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-2"
                />
            </div>

            <div>
                <label className="block mb-1 font-medium">
                    Pincode
                </label>

                <input
                    type="text"
                    name="pincode"
                    value={form.pincode}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-2"
                />
            </div>

            <div className="md:col-span-2">
                <label className="block mb-1 font-medium">
                    Address
                </label>

                <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    rows="3"
                    className="w-full border rounded-lg px-4 py-2"
                />
            </div>

            <div>
                <label className="block mb-1 font-medium">
                    Opening Balance
                </label>

                <input
                    type="number"
                    name="opening_balance"
                    value={form.opening_balance}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-2"
                />
            </div>

            <div>
                <label className="block mb-1 font-medium">
                    Balance Type
                </label>

                <select
                    name="balance_type"
                    value={form.balance_type}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-2"
                >
                    <option value="Dr">Dr</option>
                    <option value="Cr">Cr</option>
                </select>
            </div>

            <div className="md:col-span-2 flex justify-end gap-3 mt-4">

                <button
                    type="button"
                    onClick={onCancel}
                    className="px-5 py-2 rounded-lg border"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                >
                    {loading ? "Saving..." : "Save Customer"}
                </button>

            </div>

        </form>
    );
}