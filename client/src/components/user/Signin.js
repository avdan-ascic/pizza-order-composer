import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/esm/Image";
import Pizza from "../../assets/images/logo.png";
import { setUserSiginStatus } from "../../features/pizzaSlice";
import { login } from "../../api/user-api";

const Signin = ({
  setLoggedIn,
  loginModal,
  setLoginModal,
  setRegisterModal,
  setMessage
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userLoginData, setUserLoginData] = useState({
    name: "",
    password: "",
    error: "",
    redirect: false,
  });

  const handleChange = (name) => (event) => {
    setUserLoginData({ ...userLoginData, [name]: event.target.value });
  };

  const handleSubmit = () => {
    const user = {
      name: userLoginData.name,
      password: userLoginData.password,
    };

    login(user)
      .then((data) => {
        if (data.error) {
          setUserLoginData({
            ...userLoginData,
            redirect: false,
            error: data.error,
          });
          setTimeout(() => {
            setUserLoginData({
              ...userLoginData,
              error: "",
            });
          }, 3000);
        } else {
          setLoggedIn(true);
          setLoginModal(false);
          setUserLoginData({ ...userLoginData, redirect: true, error: "" });
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

  useEffect(() => {
    if (userLoginData.redirect) {
      dispatch(setUserSiginStatus(true));
      navigate("/addToCart");
    }
    // eslint-disable-next-line
  }, [userLoginData.redirect]);

  const redirectToSignup = () => {
    setLoginModal(false);
    setRegisterModal(true);
  };

  return (
    <Modal
      show={loginModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Row className="justify-content-center">
        <Col xs={12} md={6} lg={6} xl={6}>
          <Image
            src={Pizza}
            width={"150px"}
            style={{ marginLeft: "30%", marginTop: "10%", marginBottom: "10%" }}
          />
        </Col>

        <Col xs={12} md={6} lg={6} xl={6} style={{ paddingTop: "5%" }}>
          <Row style={{ paddingRight: "20px", paddingLeft: "20px" }}>
            <Col xs={3} md={3} lg={3} xl={3}>
              <p style={{ fontSize: "14px", textAlign: "right" }}>Username:</p>
            </Col>

            <Col
              xs={8}
              md={8}
              lg={8}
              xl={8}
              style={{ marginBottom: "10px" }}
              onChange={handleChange("name")}
            >
              <Form.Control type="text" style={{ height: "30px" }} />
            </Col>

            <Col xs={3} md={3} lg={3} xl={3}>
              <p style={{ fontSize: "14px", textAlign: "right" }}>Password:</p>
            </Col>

            <Col xs={8} md={8} lg={8} xl={8} style={{ marginBottom: "10px" }}>
              <Form.Control
                type="password"
                style={{ height: "30px" }}
                onChange={handleChange("password")}
              />
            </Col>
            <hr />

            {userLoginData.error && (
              <Row className="justify-content-center">
                <p
                  style={{
                    display: "inline",
                    textAlign: "center",
                    color: "red",
                    fontSize: "20px",
                  }}
                >
                  {userLoginData.error}
                </p>
              </Row>
            )}
          </Row>

          <Row
            className="justify-content-center"
            style={{ marginBottom: "2%" }}
          >
            <Col xs={4} md={4} lg={4} xl={4}>
              <Button onClick={handleSubmit}>SIGN IN</Button>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <p style={{ display: "inline", textAlign: "center" }}>
              No account{" "}
              <Link href="#" onClick={() => redirectToSignup()}>
                Sign up
              </Link>
            </p>
          </Row>
        </Col>
      </Row>
    </Modal>
  );
};

export default Signin;
