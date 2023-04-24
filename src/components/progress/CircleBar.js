import "./CircleBar.css";

export const CircleBar = ({end=0,title="Default",info="Default" , color="#1caf9a"}) => {
    const stylex={background: `conic-gradient(${color} ${3.6*end}deg, #e9ecef 0deg)`}
  return (
    <div className="circle-bar">
      <div className="circle-container">
        <div style={stylex} className="circle-out">
          <div className="circle-inner">
            <span className="value">{end + "%"}</span>
          </div>
        </div>
      </div>
      <div className="bar-description">
            <p>{title}</p>
            <p>{info}</p>
    </div>
    </div>
  );
};
