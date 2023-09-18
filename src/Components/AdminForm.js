import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useUserContext } from "../Context/UserInfo";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";

const LoginPage = () => {
  const { setAdmin, setProfilePic } = useUserContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [validated, setValidated] = useState(false);
  const [findUser, setFindUser] = useState(false);
  const [finalVerify, setfinalVerify] = useState("");

  useEffect(() => {
    setAdmin(false);
    setProfilePic(
      "https://png.pngtree.com/png-clipart/20190629/original/pngtree-vector-administration-icon-png-image_4090499.jpg"
    );
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        setFindUser(true);
        await verifyUser();
      } catch (error) {
        console.error(error);
      }
    }
    setValidated(true);
  };

  const verifyUser = async () => {
    try {
      if (email === "admin@gmail.com" && password === "9787507656") {
        setfinalVerify("User Found");
        navigate(`/apiserver`);
      } else if (email === "admin@gmail.com") {
        setfinalVerify("Invalid Password");
      } else if (password === "9787507656") {
        setfinalVerify("Invalid Email");
      } else {
        setfinalVerify(`Log-in Failed`);
      }
    } catch (error) {
      console.log(error);
      setFindUser(false);
    }
  };

  console.log(password);
  return (
    <>
      <div className="bgTwo">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "45px",
          }}
        >
          <div
            style={{
              width: "500px",
              backgroundColor: "#172D13",
              padding: "15px",
              borderRadius: "15px",
              color: "white",
            }}
          >
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <h4 className="mb-5 text-light">Admin panel login</h4>
              <Row>
                {" "}
                <Form.Group as={Col} md="12" controlId="validationCustom01">
                  <Form.Label className="text-light">Email</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    className="form-field"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    className="text-warning"
                  >
                    Please Enter Your Email
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} md="12" controlId="validationCustom02">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    className="form-field"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    className="text-warning"
                  >
                    Please Enter Password Name
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mt-3">
                <Form.Group as={Col} md="12">
                  <Button type="submit" variant="light">
                    Sign-In
                  </Button>
                </Form.Group>
              </Row>
            </Form>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "500px",
            }}
          >
            {findUser && (
              <Alert
                variant={finalVerify === "User Found" ? "success" : "danger"}
              >
                {finalVerify}
              </Alert>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
