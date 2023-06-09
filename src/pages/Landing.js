import { useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";
import "./Landing.css";
export const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="landing">
      <div className="landing-container">
        <div className="landing-center center-content">
          <h1>Welcome to!</h1>
          <Logo size="logo-landing" />
          <h1>An opportunity to improve your English</h1>
          <button className="btn-landing" onClick={() => navigate("/login")}>
            Login
          </button>
        </div>
        <div className="landing-top-left center-content">
          <img src={require("../img/landing/bot.png")} alt="" />
        </div>
        <div className="landing-top-right center-content">
        <img src={require("../img/landing/notas.png")} alt="" />
        </div>
        <div className="landing-bottom-left center-content">
        <img src={require("../img/landing/read.png")} alt="" />
          
        </div>
        <div className="landing-bottom-right center-content">
        <img src={require("../img/landing/speaking.png")} alt="" />
          
        </div>
      </div>
    </div>
  );
};
