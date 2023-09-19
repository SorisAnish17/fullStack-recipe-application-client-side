import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import FileBase64 from "react-file-base64";
import { useUserContext } from "../Context/UserInfo";
import axios from "axios";
import Table from "react-bootstrap/Table";
import gif from "../images/gif.gif";

const Admin = () => {
  const [validated, setValidated] = useState(false);
  const [mealName, setMealName] = useState("");
  const [instruction, setInstruction] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [youtubeSource, setYoutubeSource] = useState("");
  const [recipeImage, setRecipeImage] = useState("");
  const [allRecipes, setAllRecipes] = useState([]);
  const { setProfilePic, setAdmin } = useUserContext();

  useEffect(() => {
    getAllRecipeFunc();
    setProfilePic(
      "https://png.pngtree.com/png-clipart/20190629/original/pngtree-vector-administration-icon-png-image_4090499.jpg"
    );
    setAdmin(false);
  }, []);

  const getAllRecipeFunc = async () => {
    try {
      const response = await axios.get(
        "https://sore-cyan-hedgehog-slip.cyclic.cloud/api/v1/recipe/allRecipe"
      );
      setAllRecipes(response.data.data);
      console.log(allRecipes);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        const response = await axios.post(
          "https://sore-cyan-hedgehog-slip.cyclic.cloud/api/v1/recipe/create",
          {
            mealName,
            instruction,
            ingredients,
            youtubeSource,
            recipeImage,
          }
        );
        // console.log(response);
        alert("Successfully added");
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    }
    setValidated(true);
  };

  const handleFile = async (file) => {
    setRecipeImage(file.base64);
  };

  const handleDelete = async (id) => {
    try {
      axios
        .delete(`https://sore-cyan-hedgehog-slip.cyclic.cloud/api/v1/recipe/${id}`)
        .then((response) => {
          window.confirm("Are you sure to delete the recipe from the database");
          window.alert("Successfully deleted");
          window.location.reload();
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {allRecipes.length === 0 ? (
        <div style={{ marginTop: "15px" }}>
          <img src={gif} width={"400px"} height={"400px"} />
        </div>
      ) : (
        <>
          <div className="bgTwo">
            <h5 className="m-0">Add Recipe</h5>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "0px",
              }}
            >
              <div
                style={{
                  width: "500px",
                  backgroundColor: "#1A2238",
                  padding: "15px",
                  borderRadius: "15px",
                  color: "white",
                }}
                id="RecipeForm"
              >
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Row className="mb-3">
                    <Form.Group as={Col} md="12" controlId="validationCustom01">
                      <Form.Label>Meal Name</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Meal Name"
                        value={mealName}
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
                        style={{ minHeight: "115px" }}
                        placeholder="Enter Instruction"
                        value={instruction}
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
                        style={{ minHeight: "115px" }}
                        placeholder="Enter Ingredient (e.g., Sno: Ingredient)"
                        value={ingredients}
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
                        value={youtubeSource}
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
                  <Row className="pt-2">
                    <h6>Already SignUp?</h6>{" "}
                    <Link
                      to="/signIn"
                      className="text-decoration-none text-primary"
                    >
                      Click here to Sign-In page
                    </Link>
                  </Row>
                  <Row className="mt-3">
                    <Form.Group as={Col} md="12">
                      <Button type="submit" variant="success">
                        Add Recipe
                      </Button>
                    </Form.Group>
                  </Row>
                </Form>
              </div>
            </div>
            <div className="py-5">
              <h4>Existing Recipe Data</h4>
              <div id="TableForm">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>id</th>
                      <th>Meal Name</th>
                      <th>Instruction</th>
                      <th>Ingredients</th>
                      <th>recipe-Image</th>
                      <th>youtubeSource</th>
                      <th>Edit/Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allRecipes.map((recipes) => {
                      return (
                        <tr key={recipes._id}>
                          <td>{recipes._id}</td>
                          <td>{recipes.mealName}</td>
                          <td>{`${recipes.instruction.slice(0, 150)}...`}</td>
                          <td>{`${recipes.ingredients.slice(0, 45)}...`}</td>
                          <td className="image-column">
                            <img
                              src={recipes.recipeImage}
                              style={{ width: "75px" }}
                              alt="Recipe image not found"
                            />
                          </td>
                          <td>{recipes.youtubeSource.slice(0, 15)}</td>
                          <td>
                            <Button variant="warning" className="mb-2">
                              <Link
                                to={`/editRecipe/${recipes._id}`}
                                className="text-decoration-none text-dark"
                              >
                                Edit
                              </Link>
                            </Button>
                            <Button
                              variant="danger"
                              onClick={() => {
                                handleDelete(recipes._id);
                              }}
                            >
                              delete
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Admin;
