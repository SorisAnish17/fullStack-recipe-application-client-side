import React, { useState, useEffect, useRef } from "react";
import { FaArrowUp, FaArrowDown, FaPlay } from "react-icons/fa";
import imageOne from "../images/imageOne.jpg";
import imageTwo from "../images/imageTwo.jpg";
import imageThree from "../images/imageThree.jpg";
import imageFour from "../images/imageFour.jpg";
const Slider = () => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const slideRightRef = useRef(null);
  const slideLeftRef = useRef(null);
  const slidesLength = 4; // Set the number of slides

  useEffect(() => {
    const slideLeft = slideLeftRef.current;
    slideLeft.style.top = `-${(slidesLength - 1) * 80}vh`;
  }, [slidesLength]);

  const changeSlide = (direction) => {
    const sliderHeight = slideRightRef.current.clientHeight;

    if (direction === "up") {
      setActiveSlideIndex((prevIndex) => (prevIndex + 1) % slidesLength);
    } else if (direction === "down") {
      setActiveSlideIndex((prevIndex) =>
        prevIndex === 0 ? slidesLength - 1 : prevIndex - 1
      );
    }

    slideRightRef.current.style.transform = `translateY(-${
      activeSlideIndex * sliderHeight
    }px)`;
    slideLeftRef.current.style.transform = `translateY(${
      activeSlideIndex * sliderHeight
    }px)`;
  };

  return (
    <>
      <div className="slider-container">
        <div className="left-slide" ref={slideLeftRef}>
          <div
            style={{
              backgroundColor: "#ff5c33",
              height: "80vh",
              fontStyle: "italic",
            }}
          >
            <h3 style={{ textShadow: "2px 2px black" }}>Cheers to 2023</h3>
            <p style={{ textShadow: "2px 2px black" }}>
              The Best Cocktail Recipes of the Year
            </p>
            <a
              href="https://www.youtube.com/watch?v=iagrrkPtbL4"
              target="blank"
              className="text-decoration-none text-dark video-btn"
            >
              <FaPlay /> Play Video
            </a>
          </div>
          <div
            style={{
              backgroundColor: "#ffdd99",
              height: "80vh",
              color: "black",
              fontStyle: "italic",
            }}
          >
            <h2 style={{ textShadow: "2px 2px white" }}>Seafood Sensations</h2>
            <p style={{ textShadow: "2px 2px white" }}>
              {" "}
              The 7 Best Recipes of the Year
            </p>
            <a
              href="https://www.youtube.com/watch?v=IwkHyDZynF0"
              target="blank"
              className="text-decoration-none text-danger video-btn"
            >
              <FaPlay /> Play Video
            </a>
          </div>
          <div
            style={{
              backgroundColor: "#ff99bb",
              height: "80vh",
              fontStyle: "italic",
            }}
          >
            <h3 style={{ textShadow: "2px 2px black" }}>
              2023's Finest Cheesecakes
            </h3>

            <p style={{ textShadow: "2px 2px black" }}>
              Pure Delight on a Plate
            </p>
            <a
              href="https://www.youtube.com/watch?v=yebg_rpx_oU"
              target="blank"
              className="text-decoration-none text-dark video-btn"
            >
              <FaPlay /> Play Video
            </a>
          </div>
          <div
            style={{
              backgroundColor: "#f0f0a8",
              height: "80vh",
              fontStyle: "italic",
              color: "black",
              textShadow: "2px 2px white",
            }}
          >
            <h4>Feast Your Eyes on FoodieFusion's </h4>
            <p>Best Dishes of 2023</p>
            <a
              href="https://www.youtube.com/watch?v=7KetlgMYFeY"
              target="blank"
              className="text-decoration-none text-success video-btn"
            >
              <FaPlay /> Play Video
            </a>
          </div>
        </div>
        <div className="right-slide" ref={slideRightRef}>
          <div
            style={{
              backgroundImage: `url(${imageOne})`,
              height: "80vh",
            }}
          ></div>
          <div
            style={{
              backgroundImage: `url(${imageTwo})`,
              height: "80vh",
            }}
          ></div>
          <div
            style={{
              backgroundImage: `url(${imageThree})`,
              height: "80vh",
            }}
          ></div>
          <div
            style={{
              backgroundImage: `url(${imageFour})`,
              height: "80vh",
            }}
          ></div>
        </div>
        <div className="action-buttons">
          <button
            className="down-button button"
            onClick={() => changeSlide("down")}
          >
            <FaArrowDown />
          </button>
          <button
            className="up-button button"
            onClick={() => changeSlide("up")}
          >
            <FaArrowUp />
          </button>
        </div>
      </div>
    </>
  );
};

export default Slider;
