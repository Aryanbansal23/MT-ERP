export default function CustomerTable({
    customers,
    onEdit,
    onDelete,
}) {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">

            <div className="overflow-x-auto">

                <table className="min-w-full">

                    <thead className="bg-slate-100">

                        <tr className="text-left">

                            <th className="px-4 py-3">#</th>
                            <th className="px-4 py-3">Customer Name</th>
                            <th className="px-4 py-3">Mobile</th>
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3">City</th>
                            <th className="px-4 py-3">Opening Balance</th>
                            <th className="px-4 py-3">Balance Type</th>
                            <th className="px-4 py-3 text-center">Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {customers.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="8"
                                    className="text-center py-10 text-gray-500"
                                >
                                    No customers found.
                                </td>

                            </tr>

                        ) : (

                            customers.map((customer, index) => (

                                <tr
                                    key={customer.id}
                                    className="border-t hover:bg-gray-50"
                                >

                                    <td className="px-4 py-3">
                                        {index + 1}
                                    </td>

                                    <td className="px-4 py-3 font-medium">
                                        {customer.customer_name}
                                    </td>

                                    <td className="px-4 py-3">
                                        {customer.mobile}
                                    </td>

                                    <td className="px-4 py-3">
                                        {customer.email || "-"}
                                    </td>

                                    <td className="px-4 py-3">
                                        {customer.city}
                                    </td>

                                    <td className="px-4 py-3">
                                        ₹ {customer.opening_balance}
                                    </td>

                                    <td className="px-4 py-3">
                                        {customer.balance_type}
                                    </td>

                                    <td className="px-4 py-3">

                                        <div className="flex justify-center gap-2">

                                            <button
                                                onClick={() => onEdit(customer.id)}
                                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() => onDelete(customer.id)}
                                                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
}