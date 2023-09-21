import { useEffect, useState } from "react";
import axios from "axios";
import gif from "../images/gif-2.gif";
import error from "../images/error-404.png";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { FcRating } from "react-icons/fc";
import { FaHome, FaGlassMartiniAlt } from "react-icons/fa";
import { useUserContext } from "../Context/UserInfo";
import { useLocation, useNavigate } from "react-router-dom";
import google from "../images/play-store.png";
import app from "../images/app-store.png";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const { userId, setUserId, profilePic, setProfilePic, setUserDetail } =
    useUserContext();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const Id = queryParams.get("userId");
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    const timeoutId = setTimeout(() => {
      axios
        .get(
          `https://sore-cyan-hedgehog-slip.cyclic.cloud/api/v1/recipe/allRecipe`
        )
        .then((response) => {
          const filteredRecipes = response.data.data.filter((recipe) =>
            recipe.mealName.toLowerCase().includes(searchQuery.toLowerCase())
          );
          // console.log(filteredRecipes);
          setRecipes(filteredRecipes);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching recipes:", error);
          setLoading(false);
        });
    }, 500);

    axios
      .get(`https://sore-cyan-hedgehog-slip.cyclic.cloud/api/v1/user/${Id}`)
      .then((response) => {
        if (response.data.data) {
          setUserDetail(response.data.data);
          setUserId(response.data.data._id);
          setProfilePic(response.data.data.profilePicture);
        } else {
          navigate("/"); // Navigate to the homepage if user data is not available
        }
      })
      .catch((error) => {
        console.log(error);
        navigate("/"); // Navigate to the homepage if there is an error
      });

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const getRandomRating = () => {
    const randomRating = Math.floor(Math.random() * 2) + 4;
    return Array.from({ length: randomRating }, (_, index) => (
      <FcRating key={index} />
    ));
  };

  const handleRecipe = (id) => {
    navigate(`/singleRecipe/${id}?userId=${userId}`);
  };

  const handleHome = () => {
    navigate(`/home/${userId}`);
  };
  return (
    <>
      <FaHome
        style={{
          width: "35px",
          height: "25px",
          color: "red",
          opacity: "50%",
          cursor: "pointer",
        }}
        className="d-flex justify-content-start ms-5 mt-3"
        onClick={handleHome}
        id="home"
      />
      <div className="mt-2">
        <h2>Our Recipes</h2>
        <form className="m-3">
          <input
            type="text"
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            style={{
              width: "450px",
              height: "36px",
              boxShadow: "2px 2px 2px",
            }}
            placeholder="Search recipes..."
            id="search"
          />
          <button
            type="button" // Specify button type to prevent form submission
            className="btn m-2"
            style={{ backgroundColor: "khaki" }}
          >
            Search
          </button>
        </form>
      </div>
      {loading ? (
        <img src={gif} id="gif" />
      ) : recipes.length === 0 ? (
        <>
          <img src={error} alt="error" style={{ width: "150px" }} />
          <p>recipe not found</p>
        </>
      ) : (
        <div className="d-flex justify-content-center flex-wrap">
          {recipes.map((recipe) => (
            <Card
              style={{
                width: "225px",
                minHeight: "300px",
                borderRadius: "45px",
                margin: "35px",
              }}
              key={recipe._id}
            >
              <Card.Img
                variant="top"
                src={recipe.recipeImage} // Use recipe.recipeImage directly
                style={{ height: "175px", borderRadius: "25px" }}
              />
              <Card.Body>
                <Card.Title className="m-0">{recipe.mealName}</Card.Title>
                <Card.Text className="m-1">
                  {getRandomRating().map((rating, index) => (
                    <span key={index}>{rating}</span>
                  ))}
                </Card.Text>
                <Button
                  style={{ backgroundColor: "#FF6A3D" }}
                  variant=""
                  onClick={() => {
                    handleRecipe(recipe._id);
                  }}
                >
                  View Recipe
                </Button>
              </Card.Body>
            </Card>
          ))}{" "}
          <div className="footer">
            <div className="container">
              <div className="row">
                <div className="footer-col-1">
                  <h3>Download Our App</h3>
                  <p>Download App for Android and IOS Mobile Phone</p>
                  <div className="app-logo">
                    <img src={google} alt="Play Store" />
                    <img src={app} alt="App Store" />
                  </div>
                </div>
                <div className="footer-col-2">
                  <h4>
                    Foodie<span className="text-warning">Fusion</span>
                    <FaGlassMartiniAlt className="text-warning" />
                  </h4>
                  <p>
                    Delicious Cooking is all about preparing mouthwatering
                    dishes in a way that celebrates fresh, sustainable
                    ingredients and caters to the taste buds of today's food
                    enthusiasts
                  </p>
                </div>
                <div className="footer-col-3">
                  <h3>Useful Links</h3>
                  <ul>
                    <li>Coupons</li>
                    <li>Blog Plus</li>
                    <li>Return policy</li>
                    <li>Join Affiliate</li>
                  </ul>
                </div>
                <div className="footer-col-4">
                  <h3>Follow Us</h3>
                  <ul>
                    <li>Facebook</li>
                    <li>Twitter</li>
                    <li>Instagram</li>
                    <li>Youtube</li>
                  </ul>
                </div>
              </div>
            </div>
            <hr />
            <p className="copyright">Copyright 2023-Soris Anish</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Recipes;
