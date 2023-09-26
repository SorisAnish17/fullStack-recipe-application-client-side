import { useEffect, useState } from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useUserContext } from "../Context/UserInfo";
import { FaYoutube, FaAngleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import gif from "../images/gif.gif";
import axios from "axios";

const SingleRecipe = () => {
  let { id } = useParams();
  const [recipe, setRecipe] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { userId, setUserId, profilePic, setProfilePic, setUserDetail } =
    useUserContext();
  const queryParams = new URLSearchParams(location.search);
  const Id = queryParams.get("userId");
  useEffect(() => {
    axios
      .get(`https://sore-cyan-hedgehog-slip.cyclic.cloud/api/v1/recipe/${id}`)
      .then((response) => setRecipe(response.data.data))
      .catch((error) => console.log(error));
  }, [id]);

  useEffect(() => {
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
      .catch((error) => console.log(`Api error`, error));
  }, [Id]);

  const rotateImage = {
    animation: "rotate 2s linear",
    width: "325px",
    borderRadius: "50px",
  };

  console.log(id);
  const handleLeft = () => {
    navigate(`/recipes?userId=${Id}`);
  };

  return (
    <>
      <FaAngleLeft
        style={{ width: "35px", height: "35px", color: "red" }}
        className="d-flex justify-content-start ms-2 mt-3"
        onClick={handleLeft}
      />
      {recipe.length == 0 ? (
        <img src={gif} className="mt-3" />
      ) : (
        <div key={recipe._id}>
          <div className="mt-5 text-center">
            <div
              className="d-flex gap-5 justify-content-center align-items-center"
              id="singleProduct"
            >
              <div>
                <h2 className="mb-3">{recipe.mealName}</h2>
                <img
                  src={recipe.recipeImage}
                  alt="image not found"
                  style={rotateImage}
                  className="rotate360"
                />
              </div>
              <div
                className="w-50"
                style={{ maxHeight: "500px", margin: "0px 15px" }}
              >
                <h4>Instructions</h4>
                <p>{recipe.instruction}</p>
                <h4>Ingredient:</h4>
                <div className="d-flex gap-3 flex-wrap py-3" id="indregients">
                  {recipe.ingredients}
                  {console.log(recipe.ingredients)}
                </div>
                <h6>Youtube Source</h6>
                <a href={recipe.youtubeSource} target="blank" id="youtube">
                  <FaYoutube
                    style={{ width: "100px", height: "100px", color: "red" }}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleRecipe;
