import { Logo } from "./Logo";
import "./Header.css";
export const Header = ({ text , imgURL=null }) => {
  return (
    <div>
      <header className="header-container">
        <div className="header-title-img">
          <h2>{text}</h2>
          {(imgURL!=null)&&(<img src={imgURL} alt="" />)}
        </div>
        <Logo />
      </header>
    </div>
  );
};
