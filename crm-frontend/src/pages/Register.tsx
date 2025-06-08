import { useDispatch } from "react-redux";
import type { AppDispatch } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../redux/authSlice";

const Register = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...formData, phone: Number(formData.phone) };
    const result = await dispatch(registerUser(payload));
    if (registerUser.fulfilled.match(result)) {
      navigate("/login");
    }
  };
  return (
    <div className="min-h-screen max-w-full flex items-center justify-center bg-blue-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded px-8 pt-6 pb-8 w-full max-w-md"
      >
        <h2 className="text-2xl text-blue-400 font-bold mb-4">Register</h2>

        <input
          type="text"
          name="name"
          value={formData.name}
          placeholder="Name"
          onChange={handleChange}
          className="w-full mb-3  px-3 py-2 border outline-0 border-blue-300 rounded"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="Email"
          onChange={handleChange}
          className="w-full mb-3  px-3 py-2 border outline-0 border-blue-300 rounded"
        />
        <input
          type="number"
          name="phone"
          value={formData.phone}
          placeholder="Phone"
          onChange={handleChange}
          className="w-full mb-3  px-3 py-2 border outline-0 border-blue-300 rounded"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          placeholder="Password"
          onChange={handleChange}
          className="w-full mb-3  px-3 py-2 border outline-0 border-blue-300 rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
