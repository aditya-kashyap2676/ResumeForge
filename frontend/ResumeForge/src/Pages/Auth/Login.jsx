import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../Utils/helper";
import axiosInstance from "../../Utils/axiosinstance";
import { API_PATHS } from "../../Utils/apipaths";
import { UserContext } from "../../context/useContext";

const Login = ({ setCurrentpage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Get updateUser from context
  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  // Handle Login form Submit
  const handlelogin = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (!validateEmail(email)) {
      setError("Please Enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please Enter the password.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await axiosInstance.post(
        API_PATHS.AUTH.LOGIN,
        { email, password },
        { timeout: 60000 }
      );

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser({ ...user, token });
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.code === "ECONNABORTED" || error.code === "ETIMEDOUT") {
        setError("The server is taking too long to respond. Please try again.");
      } else if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
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
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-lg mt-5 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Logging in..." : "LOGIN"}
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