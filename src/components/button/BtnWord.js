import './BtnWord.css'
export const BtnWord = ({text="Default" , color ={h:345, s:100,l:47} , size={width:40, height: 20}}) => {

  const styleFrontBtn={
    background:`hsl(${color.h}, ${color.s}%, ${color.l}%)` ,
    padding:` ${size.height}px ${size.width}px`,
  }
  const styleEdgeBtn = {background: `linear-gradient(
    to left,
    hsl(${color.h*0.98}, ${color.s}%, ${color.l*0.35}%) 0%,
    hsl(${color.h*0.98}, ${color.s}%, ${color.l*0.68}%) 8%,
    hsl(${color.h*0.98}, ${color.s}%, ${color.l*0.68}%) 92%,
    hsl(${color.h*0.98}, ${color.s}%, ${color.l*0.35}%) 100%
  )`}
  return (
    <button className="btn-word-state">
        <span className="shadow-btn"></span>
        <span style={styleEdgeBtn} className="edge-btn"></span>
        <span style={styleFrontBtn} className="front-btn text-btn">{text}</span>
    </button>
  );
};
