import { useState } from "react";
import api from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const register = async () => {
    try {
      await api.post("/auth/register", form);
      navigate("/");
    } catch (err) {
      alert("Error registering user");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="p-8 bg-white shadow-xl rounded-xl w-96">
        <h1 className="text-2xl font-bold mb-4">Register</h1>

        <input className="w-full p-2 border rounded mb-3" placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })} />

        <input className="w-full p-2 border rounded mb-3" placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })} />

        <input className="w-full p-2 border rounded mb-3" type="password" placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })} />

        <button onClick={register} className="w-full bg-blue-600 text-white py-2 rounded">
          Register
        </button>

        <p className="text-center mt-3 text-sm">
          Already have an account? <Link to="/" className="text-blue-600">Login</Link>
        </p>
      </div>
    </div>
  );
}
