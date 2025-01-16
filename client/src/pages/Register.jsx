import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { registerRoute } from '../utils/APIRoutes';
import { ToastContainer, toast } from 'react-toastify';


const RegisterPage = () => {
    const navigate = useNavigate();
    const toastOptions = {
        position: "bottom-right",
        autoclose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    }

    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues((prevValues) => ({
            ...prevValues, [name]: value,
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { username, email, password } = values;
    
        try {
            const response = await axios.post(registerRoute, {
                username,
                email,
                password,
            });
            
            const data = response.data; 
            if (data.success) {
                localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY, JSON.stringify(data.user));
                toast.success("Registration successful!", toastOptions);
                navigate("/"); 
            } else if (!data.success){
                console.error("Registration failed:", data.message);
                toast.error(data.message, toastOptions); 
            }
        } catch (error) {
            console.error("Error occurred during registration:", error);
            toast.error("An unexpected error occurred. Please try again.");
        }
    };

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-[#23272A] text-white">
                <div className="w-full max-w-md bg-[#2C2F33] p-8 rounded-xl shadow-lg">
                <div className="flex flex-col items-center gap-4 mb-6">
                    <h1 className="text-4xl font-bold text-indigo-400 tracking-wider">
                    Lia<span className="text-gray-100">Chat</span>
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        onChange={handleChange}
                        className="w-full p-3 bg-[#2C2F33] text-white border border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
                    />
                    </div>
                    <div>
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={handleChange}
                        className="w-full p-3 bg-[#2C2F33] text-white border border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
                    />
                    </div>

                    <div>
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={handleChange}
                        className="w-full p-3 bg-[#2C2F33] text-white border border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
                    />
                    </div>

                    <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition duration-200"
                    >
                    Create User
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-400">
                    Already have an account?{" "}
                    <Link to="/login" className="text-indigo-400 font-semibold hover:underline">
                    Login
                    </Link>
                </p>
                </div>
            </div>
        </>
    )
}

export default RegisterPage;
