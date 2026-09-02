import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../Utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apipaths";
import { UserContext } from "../../context/useContext";

const Login = ({ setCurrentpage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Get updateUser from context
  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  // Handle Login form Submit
  const handlelogin = async (e) => {
  e.preventDefault();

  console.log("1. BUTTON CLICKED");

  if (!validateEmail(email)) {
    console.log("2. EMAIL VALIDATION FAILED");
    setError("Please Enter a valid email address.");
    return;
  }

  if (!password) {
    console.log("3. PASSWORD EMPTY");
    setError("Please Enter the password.");
    return;
  }

  console.log("4. VALIDATION PASSED");
  console.log("EMAIL:", email);
  console.log("PASSWORD:", password);

  setError("");

  try {
    console.log("5. CALLING API");

    const response = await axiosInstance.post(
      API_PATHS.AUTH.LOGIN,
      {
        email,
        password
      }
    );

    console.log("6. API RESPONSE:", response.data);

    const { token, user } = response.data;

    if (token) {
      localStorage.setItem("token", token);

      updateUser({
        ...user,
        token
      });

      navigate("/dashboard");
    }

  } catch (error) {
  if (error.response && error.response.data.message) {
    setError(error.response.data.message);
  } else {
    setError("Something went wrong. Please try again.");
  }
}
};

  return (
    <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">

      <h3 className="text-lg font-semibold text-black">
        Welcome Back
      </h3>

      <p className="text-xs text-slate-700 mt-[5px] mb-6">
        Please Enter your details to login
      </p>

      <form onSubmit={handlelogin}>

        <div className="flex flex-col gap-4">

          <Input
            type="email"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="Email@example.com"
          />

          <Input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Minimum 8 characters"
          />

        </div>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-xs pb-2.5">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-lg mt-5 active:scale-95"
        >
          LOGIN
        </button>

        <p className="text-[13px] text-slate-800 mt-3">
          Don't have an account?{" "}

          <button
            type="button"
            className="font-medium text-primary underline cursor-pointer"
            onClick={() => {
              setCurrentpage("signup");
            }}
          >
            Signup
          </button>

        </p>

      </form>
    </div>
  );
};

export default Login;