import { useState } from "react";
import { Link } from "react-router-dom";

import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/esm/Image";
import Pizza from "../../assets/images/logo.png";
import InputGroup from "react-bootstrap/InputGroup";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { create } from "../../api/user-api";

const Signup = ({
  registerModal,
  setRegisterModal,
  setLoginModal,
  setMessage,
}) => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [repeatedPasswordVisibility, setRepeatedPasswordVisibility] =
    useState(false);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    repeatedPassword: "",
    error: "",
    redirect: false,
  });

  const redirectToSignin = () => {
    setLoginModal(true);
    setRegisterModal(false);
  };

  const handleChange = (name) => (event) => {
    setUserData({ ...userData, [name]: event.target.value });
  };

  const handleSubmit = () => {
    const user = {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      confirmPassword: userData.repeatedPassword,
    };
    create(user)
      .then((data) => {
        if (data.errors && data.errors.length > 0) {
          const errorMessage = data.errors.map((error) => error.msg).join(", ");
          setUserData({ ...userData, error: errorMessage });
          setTimeout(() => {
            setUserData({
              ...userData,
              error: "",
            });
          }, 3000);
        } else {
          setRegisterModal(false);
          setLoginModal(true);
          setUserData({ ...userData, redirect: true });
          if (data.successMessage) {
            setMessage(data.successMessage);
          }
          setTimeout(() => {
            setMessage("");
          }, 3000);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Modal
      show={registerModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Row className="justify-content-center">
        <Col xs={12} md={6} lg={6} xl={6}>
          <Image
            src={Pizza}
            width={"150px"}
            style={{ marginLeft: "30%", marginTop: "15%", marginBottom: "10%" }}
          />
        </Col>

        <Col xs={12} md={6} lg={6} xl={6} style={{ paddingTop: "5%" }}>
          <Row style={{ paddingRight: "20px", paddingLeft: "20px" }}>
            <Col xs={3} md={3} lg={3} xl={3}>
              <p style={{ fontSize: "14px", textAlign: "right" }}>Username:</p>
            </Col>

            <Col xs={8} md={8} lg={8} xl={8} style={{ marginBottom: "10px" }}>
              <Form.Control
                type="text"
                id="name"
                style={{ height: "30px" }}
                onChange={handleChange("name")}
              />
            </Col>
            <Col xs={3} md={3} lg={3} xl={3}>
              <p style={{ fontSize: "14px", textAlign: "right" }}>Email:</p>
            </Col>

            <Col xs={8} md={8} lg={8} xl={8} style={{ marginBottom: "10px" }}>
              <Form.Control
                type="email"
                style={{ height: "30px" }}
                onChange={handleChange("email")}
              />
            </Col>

            <Col xs={3} md={3} lg={3} xl={3}>
              <p style={{ fontSize: "14px", textAlign: "right" }}>Password:</p>
            </Col>

            <Col xs={8} md={8} lg={8} xl={8} style={{ marginBottom: "10px" }}>
              <InputGroup>
                <Form.Control
                  type={passwordVisibility ? "text" : "password"}
                  style={{ height: "30px" }}
                  onChange={handleChange("password")}
                />
                <div
                  style={{ position: "absolute", right: "5px", zIndex: "9999" }}
                >
                  {!passwordVisibility ? (
                    <BsFillEyeSlashFill
                      onClick={() =>
                        setPasswordVisibility(passwordVisibility ? false : true)
                      }
                    />
                  ) : (
                    <BsFillEyeFill
                      onClick={() =>
                        setPasswordVisibility(passwordVisibility ? false : true)
                      }
                    />
                  )}
                </div>
              </InputGroup>
            </Col>

            <Col xs={3} md={3} lg={3} xl={3}>
              <p style={{ fontSize: "14px", textAlign: "right" }}>
                Repeat password:
              </p>
            </Col>

            <Col xs={8} md={8} lg={8} xl={8} style={{ marginBottom: "10px" }}>
              <InputGroup>
                <Form.Control
                  type={repeatedPasswordVisibility ? "text" : "password"}
                  style={{ height: "30px" }}
                  onChange={handleChange("repeatedPassword")}
                />
                <div
                  style={{ position: "absolute", right: "5px", zIndex: "9999" }}
                >
                  {!repeatedPasswordVisibility ? (
                    <BsFillEyeSlashFill
                      onClick={() =>
                        setRepeatedPasswordVisibility(
                          repeatedPasswordVisibility ? false : true
                        )
                      }
                    />
                  ) : (
                    <BsFillEyeFill
                      onClick={() =>
                        setRepeatedPasswordVisibility(
                          repeatedPasswordVisibility ? false : true
                        )
                      }
                    />
                  )}
                </div>
              </InputGroup>
            </Col>
            <hr />

            {userData.error && (
              <Row className="justify-content-center">
                <p
                  style={{
                    display: "inline",
                    textAlign: "center",
                    color: "red",
                    fontSize: "20px",
                  }}
                >
                  {userData.error}
                </p>
              </Row>
            )}
          </Row>

          <Row
            className="justify-content-center"
            style={{ marginBottom: "2%" }}
          >
            <Col xs={4} md={4} lg={4} xl={4}>
              <Button onClick={handleSubmit}>SIGN UP</Button>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <p style={{ display: "inline", textAlign: "center" }}>
              Already have an account{" "}
              <Link href="#" onClick={() => redirectToSignin()}>
                Sign in
              </Link>
            </p>
          </Row>
        </Col>
      </Row>
    </Modal>
  );
};

export default Signup;
