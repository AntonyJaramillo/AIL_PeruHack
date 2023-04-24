import { Carousel } from "react-bootstrap";
import "./Review.css";
import { Custom } from "./Custom";
import 'bootstrap/dist/css/bootstrap.min.css';
export const Review = ({ListWords}) => {
  return (
    
    <Carousel indicators={false} interval={null}  fade className="carousel-container"
    prevIcon={<span className="carousel-control-prev-icon custom-prev-icon" aria-hidden="true" />}
      nextIcon={<span className="carousel-control-next-icon" aria-hidden="true" />}
    >

      {ListWords.map((word) => {
        return (

          <Carousel.Item className="custom-slide-item" key={word.id}>
          <div className="d-flex justify-content-center align-items-center h-100 custom-slide">
            <Custom
              wordx={word.word}
              wordxMean={word.mean}
              wordxState={word.state}
              wordxID={word.id}
            />
          </div>
        </Carousel.Item>
        );
      })}

    </Carousel>
  );
};
