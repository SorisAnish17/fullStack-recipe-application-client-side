import { FaGlassMartiniAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../Context/UserInfo";
import { useState, useEffect } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import FileBase64 from "react-file-base64";
import axios from "axios";
import toast from "react-hot-toast";
const Header = ({ name, ...props }) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(true);
    setEditBtn(true);
    setLockInputs(true);
  };
  const {
    userId,
    setUserId,
    profilePic,
    setProfilePic,
    userDetail,
    setUserDetail,
    admin,
    setAdmin,
  } = useUserContext();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [validated, setValidated] = useState(false);
  const [editBtn, setEditBtn] = useState(true);
  const [lockInputs, setLockInputs] = useState(true);
  // Add a useEffect to populate form fields with user details on component load
  useEffect(() => {
    setFirstName(userDetail?.firstName);
    setLastName(userDetail?.lastName);
    setEmail(userDetail?.email);
    setPassword(userDetail?.password);
    setMobileNumber(userDetail?.mobileNumber);
    setProfilePicture(userDetail?.profilePicture);
  }, [userDetail]);

  const handleSave = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        setEditBtn(!editBtn);
        setLockInputs(!lockInputs);
        const isSuccess = await passwordAuth(); // Check password and email first
        if (isSuccess && window.confirm("Are You Sure To Edit Your Details?")) {
          await updatePost();
          toast.success("Successfully updated");
          window.location.reload();
        }
      } catch (error) {
        console.error(error);
      }
    }
    setValidated(true);
  };

  const handleLogOut = () => {
    navigate("/");
    setUserId("");
    setProfilePic("");
    setAdmin(true);
    setUserDetail([]);
    toast.success("Successfully LogOut");
    window.location.reload();
  };

  const handleAdmin = () => {
    setUserDetail("");
    setAdmin((prevAdmin) => {
      console.log(!prevAdmin); // Log the updated value
      return !prevAdmin; // Return the new value
    });
    navigate("/admin");
  };

  const handleFile = async (file) => {
    setProfilePicture(file.base64);
  };

  const updatePost = async () => {
    try {
      const response = await axios.put(
        `https://sore-cyan-hedgehog-slip.cyclic.cloud/api/v1/user/${userId}`,
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          mobileNumber: mobileNumber,
          profilePicture: profilePicture,
        }
      );

      console.log(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const passwordAuth = () => {
    if (password.length < 8) {
      toast.error("Make your Password Strength(Enter 8 Character)");
      return false;
    } else if (mobileNumber.toString().length !== 10) {
      toast.error("Enter valid Mobile Number");
      return false;
    } else if (validateGmail(email)) {
      return true;
    } else {
      toast.error("Invalid Email");
      return false;
    }
  };

  const validateGmail = (email) => {
    let pattern = /^[a-zA-Z0-9._%+-]+@gmail.com$/;

    return pattern.test(email);
  };

  const handleEdit = async () => {
    setEditBtn(!editBtn);
    setLockInputs(!lockInputs);
  };

  const handleClose = () => {
    setEditBtn(!editBtn);
    setLockInputs(!lockInputs);
    setShow(false);
  };

  const handleDelete = async () => {
    try {
      if (window.confirm("Are You Want to Delete Your Account?")) {
        axios
          .delete(
            `https://sore-cyan-hedgehog-slip.cyclic.cloud/api/v1/user/${userDetail._id}`
          )
          .then((reponse) => {
            toast.success("User Deleted Successfully");
            window.location.reload();
          })
          .catch((error) => console.log(error));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditBtn = () => {
    setAdmin((prevAdmin) => {
      return !prevAdmin;
    });
    setProfilePic("");
    toast.success("Successfully LogOut");
    navigate("/");
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        boxShadow: "2px 2px 2px black",
        padding: "10px",
        display: "flex",
        justifyContent: "space-between",
        position: "sticky",
        top: "0",
        zIndex: "1000",
      }}
    >
      <div>
        <h5
          className="p-0 m-0"
          style={{ color: "orange", textShadow: "1px 1px black" }}
        >
          Foodie<span className="text-danger">Fusion</span>
          <FaGlassMartiniAlt />
        </h5>
      </div>
      {userId !== "" ? (
        <div style={{ display: "flex", gap: "20px" }}>
          <button style={{ backgroundColor: "orange", borderRadius: "12px" }}>
            <p className="m-0" onClick={handleLogOut}>
              logOut
            </p>
          </button>
          <p className="m-0">
            <img
              src={profilePic}
              // alt="profile"
              width={"35px"}
              height={"30px"}
              style={{ borderRadius: "12px", cursor: "pointer" }}
              onClick={handleShow}
            />
          </p>
          <Offcanvas
            show={show}
            onHide={handleClose}
            {...props}
            style={{ backgroundColor: "white" }}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title className="text-danger">Profile</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <div
                style={{
                  backgroundColor: "#E1F2F7",
                  padding: "15px",
                  borderRadius: "15px",
                }}
              >
                <Form noValidate validated={validated}>
                  <Row className="mb-3">
                    <Form.Group as={Col} md="12" controlId="validationCustom01">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        required
                        className="form-field"
                        type="text"
                        placeholder="FirstName"
                        value={firstName}
                        readOnly={lockInputs}
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
                        readOnly={lockInputs}
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
                        readOnly={lockInputs}
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
                        readOnly={lockInputs}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please Enter Password
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group as={Col} md="12" controlId="validationCustom05">
                      <Form.Label>Mobile-Number</Form.Label>
                      <Form.Control
                        required
                        type="number" // Make sure it's set to "number"
                        className="form-field"
                        placeholder="Mobile-Number"
                        value={mobileNumber}
                        readOnly={lockInputs}
                        onChange={(e) => setMobileNumber(e.target.value)}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please Enter Mobile-Number
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row>
                    {" "}
                    <Form.Group as={Col} md="12" controlId="validationCustom06">
                      <Form.Label className="pt-3">
                        Upload Your Profile Picture
                      </Form.Label>
                      <div className="d-flex m-2">
                        <p>Current Profile</p>
                        <img
                          src={userDetail?.profilePicture}
                          width={"40px"}
                          height={"35px"}
                        />
                      </div>
                      <FileBase64 multiple={false} onDone={handleFile} />
                      <Form.Control.Feedback type="invalid">
                        please Upload Your Profile Picture
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <div className="mt-5 text-center">
                    {editBtn ? (
                      <Button
                        className="me-3"
                        style={{ backgroundColor: "#2A3166" }}
                        onClick={handleEdit}
                      >
                        Edit
                      </Button>
                    ) : (
                      <Button
                        style={{ backgroundColor: "#0B4141" }}
                        onClick={handleSave}
                        className="me-3"
                      >
                        Save
                      </Button>
                    )}

                    <Button variant="danger" onClick={handleDelete}>
                      Delete
                    </Button>
                  </div>
                </Form>
              </div>
            </Offcanvas.Body>
          </Offcanvas>
        </div>
      ) : (
        ""
      )}
      {userId == "" ? (
        <div className="d-flex gap-2 me-3">
          {admin ? (
            <button
              style={{
                backgroundColor: "red",
                borderRadius: "12px",
                color: "white",
              }}
              onClick={handleAdmin}
            >
              Admin
            </button>
          ) : (
            <>
              <img
                src={profilePic}
                // alt="profile"
                width={"35px"}
                height={"30px"}
                style={{ borderRadius: "12px", cursor: "pointer" }}
                onClick={handleShow}
              />

              <button
                style={{
                  backgroundColor: "red",
                  borderRadius: "12px",
                  color: "white",
                }}
                onClick={handleEditBtn}
              >
                Admin logOut
              </button>
            </>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Header;
