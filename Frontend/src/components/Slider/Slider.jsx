import React, { useState } from "react";
import Slider1 from "../../Images/slider1.png";
import Slider2 from "../../Images/slider2.png";
import Slider3 from "../../Images/Slider3.webp";


const images = [Slider1, Slider2, Slider3];

function Slider() {
  const [curr, setCurr] = useState(0);

  const prevSlide = () => {
    setCurr(curr === images.length - 1 ? 0 : curr + 1);
  };
  const nextSlide = () => {
    setCurr(curr === 0 ? images.length - 1 : curr - 1);
  };

  return (

      <div className="row text-center">
        <div className="col-12">
          <div
            id="carouselExampleControls"
            className="carousel slide"
            data-ride="carousel"
          >
            {images.map(
              (value, index) =>
                curr === index && (
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <img
                        className="d-block w-100"
                        src={value}
                        alt={`Slide ${index + 1}`}
                      />
                    </div>
                  </div>
                )
            )}

            <a
              className="carousel-control-prev"
              role="button"
              data-slide="prev"
              onClick={prevSlide}
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              role="button"
              data-slide="next"
              onClick={nextSlide}
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
      </div>
 
  );
}

export default Slider;
