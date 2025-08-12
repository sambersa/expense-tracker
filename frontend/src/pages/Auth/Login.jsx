import React, { useState, useContext } from 'react' // Added useContext
import AuthLayout from '../../components/layouts/AuthLayout'
import { useNavigate, Link } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext'; // Changed from contexts to context

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  // Email validation function
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Handle Login Form Submission
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('handleLogin called'); // Debugging purposes

    if (!validateEmail(email)) {
      setError("Please enter a valid email address!");
      return;
    }

    if (!password) {
      setError("Please enter your password");
      return;
    }

    setError("");

    // Login API Call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log('Full error object:', error); // Debug log
      console.log('Error response:', error.response); // Debug log
      console.log('Error response data:', error.response?.data); // Debug log
      
      if (error.response && error.response.data) {
        // Try different possible error message structures
        const errorMessage = 
          error.response.data.message || 
          error.response.data.error || 
          error.response.data.msg ||
          (typeof error.response.data === 'string' ? error.response.data : null);
          
        if (errorMessage) {
          setError(errorMessage);
        } else {
          setError("Something went wrong. Please try again.");
        }
      } else {
        setError("Something went wrong. Please try again.");
      }
    }

    console.log('Login attempt:', { email, password }); // Debugging
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome Back!</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Please enter your details to log in.
        </p>

        <form onSubmit={handleLogin}>
          <Input 
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="sam@bersa.com"
            type="email"
          />

          <Input 
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Enter your password"
            type="password"
          /> 

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <button type="submit" className="btn-primary">
            LOG IN
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Don't have an account?{" "}
            <Link className="font-medium text-primary underline" to="/signup">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;