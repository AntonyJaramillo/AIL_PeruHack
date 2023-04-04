import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/authContext";
// import { useState } from "react";

export const NavBar = () => {
  const { user ,logout } = useAuth();
  // console.log(user.displayName, user.email,user.photoURL);
  // const [userName, setUserName] = useState(user.displayName);

  // if(userName == null){
  // setUserName("User");
  // }else{
  // setUserName(userName.split(" ")[0].charAt(0).toUpperCase() + userName.split(" ")[0].slice(1).toLowerCase());}

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="navbar">
      <div className="navbar-container">

        <div className="user-section">
          <img src={user.photoURL || require("../img/user.png")} alt="Section logo" />
          {/* <img src={require("../img/user.png")} alt="Section logo" />  */}
          <p>{((user.displayName===null) && "User")||(user.displayName.split(" ")[0])}</p>
        </div>

        <NavLink className="nav-option nav-home" to=" ">
          <img src={require("../img/home.png")} alt="Section logo" />
          <p>Home</p>
        </NavLink>

        <NavLink className="nav-option nav-speaking" to="speaking">
          <img src={require("../img/speaking.png")} alt="Section logo" />
          <p>Speaking</p>
        </NavLink>

        <NavLink className="nav-option nav-listening" to="listening">
          <img src={require("../img/listening.png")} alt="Section logo" />
          <p>Listening</p>
        </NavLink>

        <NavLink className="nav-option nav-writing" to="writing">
          <img src={require("../img/writing.png")} alt="Section logo" />
          <p>Writing</p>
        </NavLink>

        <NavLink className="nav-option nav-reading" to="reading">
          <img src={require("../img/read.png")} alt="Section logo" />
          <p>Reading</p>
        </NavLink>

        <NavLink className="nav-option nav-words" to="words">
          <img src={require("../img/words.png")} alt="Section logo" />
          <p>My words</p>
        </NavLink>
        <div className="nav-logaut">
          <button className="btn-logout" onClick={handleLogout}>
            <span className="shadow"></span>
            <span className="edge"></span>
            <span className="front text"> Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};
