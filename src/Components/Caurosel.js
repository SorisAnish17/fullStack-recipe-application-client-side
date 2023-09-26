import React, { useEffect } from "react";
import imageOne from "../images/susi.jpg";
import imageTwo from "../images/falooda.jpg";
import imageThree from "../images/shawarma.jpg";
import imageFour from "../images/tandoori.jpg";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";

const ImageCarousel = ({ id }) => {
  useEffect(() => {
    const imgContainer = document.getElementById("img-container");

    const interval = setInterval(() => {
      const last = imgContainer.firstElementChild;
      last.remove();
      imgContainer.appendChild(last);
    }, 2500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const navigate = useNavigate();

  const handleRecipes = () => {
    navigate(`/recipes?userId=${id}`);
  };
  return (
    <div className="crbg">
      <section>
        <div id="card" className="p-3">
          <h3 className="text-warning">Our Recipes</h3>
          <p style={{ color: "whitesmoke" }}>
            We offer over 30+ unique recipes with healthy, traditional, and
            naturally infused flavors that seamlessly blend with modern culture.
          </p>
          <div className="d-flex justify-content-center">
            <Button
              variant="warning"
              onClick={handleRecipes}
              style={{ cursor: "pointer" }}
            >
              View Recipes
            </Button>
          </div>
        </div>
        <div id="img-container">
          <div className="box">
            <img src={imageOne} alt="recipe-1" />
          </div>
          <div className="box">
            <img src={imageTwo} alt="recipe-2" />
          </div>
          <div className="box">
            <img src={imageThree} alt="recipe-3" />
          </div>
          <div className="box">
            <img src={imageFour} alt="recipe-4" />
          </div>
        </div>
        <div className="shadow"></div>
      </section>
    </div>
  );
};

export default ImageCarousel;
