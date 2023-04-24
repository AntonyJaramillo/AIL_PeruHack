import { NavBar } from "../components/NavBar";
import { useAuth } from "../context/authContext";
import { Outlet } from "react-router-dom";
import "./Home.css";

export const Home = () => {
  const { loading } = useAuth();

  if (loading) {
    return <h1>Loading</h1>;
  }

  return (
    <div className="home">
      <div className="home-container">
        <div className="navbar-section">
          <NavBar />
        </div>

        <div className="main-section">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
