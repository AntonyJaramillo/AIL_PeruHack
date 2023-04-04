import { Logo } from "../components/Logo";
import "./Login.css";

import { useState } from "react";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "../components/Alert";

export const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const { login, loginWithGoogle, resetPassword } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState();

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); //antes de enviar lo mantenemos vacio
    try {
      await login(user.email, user.password);
      navigate("/home");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setError("User not found. Please Sing Up");
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      navigate("/home");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleResetPassword = async () => {
    if (!user.email) {
      return setError("Please enter your email");
    }

    try {
      await resetPassword(user.email);
      setError("We sent you an email with a link to reset your password");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <form action="" onSubmit={handleSubmit}>
          <h2>Sign In</h2>
          <div className="logo-container-transform">
            <Logo />
          </div>
          <div className="input-box">
            <label htmlFor="">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
              placeholder="youremail@gmail.com"
              required
            />
          </div>

          <div className="input-box">
            <label htmlFor="">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
              placeholder="********"
              required
            />
          </div>

          <div className="forgot-pass" onClick={handleResetPassword}>
            <p>Forgot your password?</p>
          </div>

          {error && (
            <div className="alert-container">
              <Alert message={error} />
            </div>
          )}

          <button type="submit" className="btn-sign-in">
            Sign In
          </button>

          <div className="sign-up-link">
            <p>
              Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
          </div>
          <div className="social-sign-in">
            <p>Or sign in with</p>
            <div className="google-sign-in" onClick={handleGoogleSignIn}>
              <img src={require("../img/google.png")} alt="Google icon" />
              <span>Continue with Google</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
