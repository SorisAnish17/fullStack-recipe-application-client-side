import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import FileBase64 from "react-file-base64";
import axios from "axios";
import toast from "react-hot-toast";
const SignUp = () => {
  const [validated, setValidated] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        await passwordAuth();
      } catch (error) {
        console.error(error);
      }
    }
    setValidated(true);
  };

  const handleFile = async (file) => {
    setProfilePicture(file.base64);
  };

  const passwordAuth = async () => {
    try {
      if (password.length < 8) {
        toast.error("Make your Password Strength(Enter 8 Character");
        return;
      }
      if (mobileNumber.length < 10) {
        toast.error("Enter valid Mobile Number");
        return;
      }
      if (validateGmail(email)) {
        toast.success("Successfully Registered!");
        await postMethod();
        navigate("/");
      } else {
        toast.error("Invalid Email");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const validateGmail = (email) => {
    let pattern = /^[a-zA-Z0-9._%+-]+@gmail.com$/;

    if (pattern.test(email)) {
      return true;
    } else {
      return false;
    }
  };

  const postMethod = async () => {
    try {
      axios
        .post(
          "https://sore-cyan-hedgehog-slip.cyclic.cloud/api/v1/user/create",
          {
            firstName,
            lastName,
            email,
            password,
            mobileNumber,
            profilePicture,
          }
        )
        .then((response) => {
          window.location.reload();
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };

  const handleLink = () => {
    navigate("/");
    window.location.reload();
  };
  return (
    <>
      <div className="bg">
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
              backgroundColor: "black",
              padding: "15px",
              borderRadius: "15px",
              color: "white",
            }}
            className="formWidth"
            id="formWidth"
          >
            <Form
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              <h2 className="mb-5">Sign-Up</h2>
              <Row className="mb-3">
                <Form.Group
                  as={Col}
                  md="12"
                  controlId="validationCustom01"
                  autoComplete="off"
                >
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    required
                    className="form-field"
                    type="text"
                    placeholder="FirstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please Enter First Name
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} md="12" controlId="validationCustom02">
                  <Form.Label>Second Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    className="form-field"
                    placeholder="SecondName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please Enter Second Name
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row>
                {" "}
                <Form.Group as={Col} md="12" controlId="validationCustom03">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    className="form-field"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please Enter Your Email
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} md="12" controlId="validationCustom04">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    className="form-field"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please Enter Password Name
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} md="12" controlId="validationCustom05">
                  <Form.Label>Mobile-Number</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    className="form-field"
                    placeholder="Mobile-Number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please Enter Mobile-Number Name
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row>
                {" "}
                <Form.Group as={Col} md="12" controlId="validationCustom06">
                  <Form.Label className="pt-3">
                    Upload Your Profile Picture
                  </Form.Label>
                  <FileBase64 multiple={false} onDone={handleFile} />
                  <Form.Control.Feedback type="invalid">
                    please Upload Your Profile Picture
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="pt-2">
                <h6>Already SignUp?</h6>{" "}
                <p
                  className="m-0 p-0 text-primary"
                  onClick={handleLink}
                  style={{ cursor: "pointer" }}
                >
                  Click here to Sign-In page
                </p>
              </Row>
              <Row className="mt-3">
                <Form.Group as={Col} md="12">
                  <Button type="submit" variant="light">
                    Sign Up
                  </Button>
                </Form.Group>
              </Row>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
