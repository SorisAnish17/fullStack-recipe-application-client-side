import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import FileBase64 from "react-file-base64";
import gif from "../images/gif.gif";
import { useUserContext } from "../Context/UserInfo";
import toast from "react-hot-toast";
const EditRecipe = () => {
  let { id } = useParams();
  const [validated, setValidated] = useState(false);
  const [mealName, setMealName] = useState("");
  const [instruction, setInstruction] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [youtubeSource, setYoutubeSource] = useState("");
  const [recipeImage, setRecipeImage] = useState("");
  const [recipe, setRecipe] = useState([]);
  const { setAdmin, setProfilePic } = useUserContext();
  useEffect(() => {
    axios
      .get(`https://sore-cyan-hedgehog-slip.cyclic.cloud/api/v1/recipe/${id}`)
      .then((response) => {
        setRecipe(response.data.data);
      })
      .catch((error) => console.log(error));
  }, [id]);
  console.log(recipe);

  useEffect(() => {
    setAdmin(false);
    setProfilePic(
      "https://png.pngtree.com/png-clipart/20190629/original/pngtree-vector-administration-icon-png-image_4090499.jpg"
    );
  });
  const handleFile = async (file) => {
    setRecipeImage(file.base64);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        const response = await axios.put(
          `https://sore-cyan-hedgehog-slip.cyclic.cloud/api/v1/recipe/${id}`,
          {
            mealName: mealName === "" ? recipe.mealName : mealName,
            instruction: instruction === "" ? recipe.instruction : instruction,
            ingredients: ingredients === "" ? recipe.ingredients : ingredients,
            youtubeSource:
              youtubeSource === "" ? recipe.youtubeSource : youtubeSource,
            recipeImage: recipeImage === "" ? recipe.recipeImage : recipeImage,
          }
        );
        // console.log(response);
        window.confirm("Are You Want To update your data?");
        toast.success("Successfully Updated");
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    }
    setValidated(true);
  };

  console.log(ingredients);
  return (
    <>
      {recipe.length === 0 ? (
        <div>
          <img src={gif} className="mt-3" />
        </div>
      ) : (
        <div className="bgThree">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "15px",
            }}
          >
            <div
              style={{
                width: "500px",
                backgroundColor: "#181818",
                padding: "15px",
                borderRadius: "15px",
                color: "white",
              }}
              id="RecipeForm"
            >
              <Form
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
                autoComplete="off"
              >
                <Row className="mb-3">
                  <Form.Group as={Col} md="12" controlId="validationCustom01">
                    <Form.Label>Meal Name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Meal Name"
                      //   value={mealName}
                      defaultValue={recipe.mealName}
                      onChange={(e) => setMealName(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please Enter Meal Name
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col} md="12" controlId="validationCustom02">
                    <Form.Label>Enter Instruction</Form.Label>
                    <Form.Control
                      required
                      as="textarea"
                      style={{ minHeight: "150px" }}
                      placeholder="Enter Instruction"
                      //   value={instruction}
                      defaultValue={recipe.instruction}
                      onChange={(e) => setInstruction(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please Enter Instruction For the recipe
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row>
                  {" "}
                  <Form.Group as={Col} md="12" controlId="validationCustom03">
                    <Form.Label>Enter Ingredient</Form.Label>
                    <Form.Control
                      required
                      as="textarea"
                      style={{ minHeight: "125px" }}
                      placeholder="Enter Ingredient (e.g., Sno: Ingredient)"
                      //   value={ingredients}
                      defaultValue={recipe.ingredients}
                      onChange={(e) => setIngredients(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please Enter Ingredient For the recipe
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col} md="12" controlId="validationCustom04">
                    <Form.Label>Enter Youtube Source</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      //   value={youtubeSource}
                      defaultValue={recipe.youtubeSource}
                      onChange={(e) => setYoutubeSource(e.target.value)}
                      placeholder="Enter your Youtube Source"
                    />
                    <Form.Control.Feedback type="invalid">
                      Please Enter Youtube Source
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row>
                  {" "}
                  <Form.Group as={Col} md="12" controlId="validationCustom06">
                    <Form.Label className="pt-3">
                      Upload Your Recipe Picture
                    </Form.Label>
                    <FileBase64 multiple={false} onDone={handleFile} />
                    <Form.Control.Feedback type="invalid">
                      please Upload Your Recipe Picture
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row className="mt-3">
                  <Form.Group as={Col} md="12">
                    <Button type="submit" variant="success">
                      Update data
                    </Button>
                    <Button
                      style={{
                        backgroundColor: "blue",
                        backdropFilter: "revert-layer",
                      }}
                      className="ms-4"
                    >
                      <Link
                        className="text-decoration-none text-white"
                        to="/apiserver"
                      >
                        Back to Admin Page
                      </Link>
                    </Button>
                  </Form.Group>
                </Row>
              </Form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditRecipe;
