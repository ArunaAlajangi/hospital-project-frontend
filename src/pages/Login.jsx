import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { AdminContext } from '../context/AdminContext';
import { DoctorContext } from '../context/DoctorContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [role, setRole] = useState('User'); // Admin | Doctor | User
  const [action, setAction] = useState('Login'); // Login | Sign Up

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const { backendUrl, setToken, token } = useContext(AppContext);
  const { setAToken } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (role === 'Admin') {
        const { data } = await axios.post(`${backendUrl}/api/admin/login`, { email, password });
        if (data.success) {
          localStorage.setItem('aToken', data.token);
          setAToken(data.token);
          toast.success("Admin logged in!");
        } else {
          toast.error(data.message);
        }
      } else if (role === 'Doctor') {
        const { data } = await axios.post(`${backendUrl}/api/doctor/login`, { email, password });
        if (data.success) {
          localStorage.setItem('dToken', data.token);
          setDToken(data.token);
          toast.success("Doctor logged in!");
        } else {
          toast.error(data.message);
        }
      } else {
        // Normal User
        if (action === 'Sign Up') {
          const { data } = await axios.post(`${backendUrl}/api/user/register`, {
            name, email, password,
          });
          if (data.success) {
            localStorage.setItem("token", data.token);
            setToken(data.token);
            toast.success("User registered successfully!");
          } else {
            toast.error(data.message);
          }
        } else {
          const { data } = await axios.post(`${backendUrl}/api/user/login`, { email, password });
          if (data.success) {
            localStorage.setItem("token", data.token);
            setToken(data.token);
            toast.success("User logged in!");
          } else {
            toast.error(data.message);
          }
        }
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={onSubmitHandler} className="w-full max-w-md bg-white shadow-lg border border-gray-200 rounded-xl p-6 space-y-5">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          {role} {action}
        </h2>

        {action === "Sign Up" && role === "User" && (
          <div>
            <label className="block text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
        )}

        <div>
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Password</label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          {action}
        </button>

        {/* Switch between login/signup only for users */}
        {role === "User" && (
          <p className="text-sm text-center text-gray-600">
            {action === "Login" ? (
              <>
                Don’t have an account?
                <span onClick={() => setAction("Sign Up")} className="text-blue-600 ml-1 cursor-pointer hover:underline">Sign Up</span>
              </>
            ) : (
              <>
                Already have an account?
                <span onClick={() => setAction("Login")} className="text-blue-600 ml-1 cursor-pointer hover:underline">Login</span>
              </>
            )}
          </p>
        )}

        <div className="flex justify-center space-x-4 mt-2">
          {["User", "Doctor", "Admin"].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => { setRole(r); setAction("Login"); }}
              className={`px-3 py-1 rounded-lg text-sm border ${role === r ? "bg-blue-500 text-white" : "text-gray-600 border-gray-300"}`}
            >
              {r}
            </button>
          ))}
        </div>
      </form>
    </div>
  );
};

export default Login;
