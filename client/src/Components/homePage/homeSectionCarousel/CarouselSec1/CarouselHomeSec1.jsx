import React, { useState } from "react";
import AliceCarousel from "react-alice-carousel";
import CarouselSec1 from "./CarouselSec1";

const CarouselHomeSec1 = () => {
  const [activeInd, setActiveInd] = useState(0)
  const responsive = {
    0: { items: 1.5 },
    720: { items: 3 },
    1024: { items: 4 },
  };

  const slidePrev = () =>setActiveInd(activeInd -1);
  const slideNext = () =>setActiveInd(activeInd +1);
  const currentInd = ({item}) => setActiveInd(item)
  const items = [1, 1, 1, 1, 1, 1,].map((item) => <CarouselSec1 />);
  return (
    <div className="relative w-full px-4 lg:px8">
      <h2 className="text-center text-2xl font-extrabold text-gray-900 py-5">Mens</h2>
      <div className="relative p-5">
        <AliceCarousel
          disableButtonsControls
          responsive={responsive}
          items={items}
          disableDotsControls
          onSlideChanged={currentInd}
          activeIndex={activeInd}
        />
      {activeInd !== items.length-6 &&  <button  className="z-50 bg-white p-1 h-12 position: absolute inset-y-2/4 bottom-0 left-0 hover:bg-blue-500" onClick={slidePrev}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
              clipRule="evenodd"
            />
          </svg>
        </button>}

        {activeInd !== items.length+4 && <button className="z-50 bg-white p-1 h-12 position: absolute inset-y-2/4 bottom-0 right-0 hover:bg-blue-500"  onClick={slideNext}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
              clipRule="evenodd"
            />
          </svg>
        </button>}
      </div>
    </div>
  );
};

export default CarouselHomeSec1;
