import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";
import useAuth from "../../hooks/useAuth";

export default function Login() {

    const navigate = useNavigate();
    const { login } = useAuth();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            const res = await loginUser(form);

            console.log("Login Response:", res.data);

            login(res.data.user, res.data.token);

            alert("Login Successful");

            navigate("/dashboard");

        } catch (err) {

            console.log(err);

            alert(
                err.response?.data?.message || "Login Failed"
            );

        }

        setLoading(false);

    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-slate-100">

            <div className="bg-white shadow-xl rounded-xl p-8 w-[400px]">

                <h1 className="text-4xl font-bold text-center text-blue-600">
                    MT ERP
                </h1>

                <p className="text-center text-gray-500 mt-2 mb-8">
                    Login to continue
                </p>

                <form onSubmit={handleSubmit}>

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3 mb-4"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3 mb-6"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                    >
                        {loading ? "Logging In..." : "Login"}
                    </button>

                </form>

            </div>

        </div>

    );

}