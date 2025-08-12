import React, { useState, useContext } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { useNavigate, Link } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from '../../context/userContext'; 
import uploadImage from "../../utils/uploadImage";

const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

  const {updateUser} = useContext(UserContext)

  const navigate = useNavigate();

  // Handle Sign Up Form Submission
  const handleSignUp = async (e) => {
    e.preventDefault();  // Prevent page reload

    if (!fullName) {
      setError("Please enter your name.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    } 

    setError(""); // Clear errors if all valid

    // sign-up API call
    try {
      let profileImageUrl = ""; 

      // Upload Image if present
    if (profilePic) {
      try {
        console.log("Uploading profile image...");
        const uploadResponse = await uploadImage(profilePic);
        profileImageUrl = uploadResponse.imageUrl;
        console.log("Image uploaded successfully:", uploadResponse);
      } catch (uploadError) {
        console.error("Error uploading image:", uploadError);
        setError("Failed to upload profile image. Please try again.");
        return;
    }
  }

      console.log("Attempting signup with:", { fullName, email, password, profileImageUrl }); // Debug

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl
      });

      console.log("Signup response:", response.data); // Debug

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard")
      }
    } catch (error) {
      console.log('Full signup error:', error); // Debug log
      console.log('Error response:', error.response); // Debug log
      console.log('Error response data:', error.response?.data); // Debug log
      
      // Check if it's a network error
      if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
        setError("Cannot connect to server. Please make sure the backend is running.");
        return;
      }
      
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
  };

  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black"> Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
           Join us today and start tracking your expenses!
          </p>

          <form onSubmit={handleSignUp}>

          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                value = {fullName}
                onChange = {({ target }) => setFullName(target.value)}
                label= "Full Name"
                placeholder = "Sam"
                type = "text"
              />

              <Input 
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                label="Email Address"
                placeholder="sam@bersa.com"
                type="email"
              />

        <div className="col-span-2"> 
              <Input 
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Password"
                placeholder="Enter your password"
                type="password"
              />
        </div> 
            </div>

            {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
      
                <button type="submit" className="btn-primary">
                  SIGN UP
                </button>
      
                <p className="text-[13px] text-slate-800 mt-3">
                  Already have an account?{" "}
                  <Link className="font-medium text-primary underline" to="/login">
                    Log In
                  </Link>
                </p>
          </form>
      </div>
    </AuthLayout>

  )
}

export default SignUp