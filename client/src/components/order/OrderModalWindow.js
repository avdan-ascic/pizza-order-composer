import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  getOrderWindowModal,
  resetStore,
  clearOrder,
  setOrderWindowModal,
} from "../../features/pizzaSlice";
import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Modal from "react-bootstrap/Modal";
import { logout } from "../../api/user-api";

const OrderWindowModal = ({ setLoggedIn }) => {
  const orderWindowModal = useSelector(getOrderWindowModal);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignout = () => {
    logout()
      .then(() => {
        dispatch(resetStore());
        setLoggedIn(false);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  const redirectToOrderHistory = () => {
    dispatch(setOrderWindowModal(false));
    navigate("/orderHistory");
  };

  const redirectToCart = () => {
    dispatch(clearOrder());
    dispatch(setOrderWindowModal(false));
    navigate("/addToCart");
  };

  return (
    <Modal
      show={orderWindowModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Row className="justify-content-center" style={{ marginBottom: "2%" }}>
        <Col
          xs={12}
          md={12}
          lg={12}
          xl={12}
          style={{ marginTop: "10%", marginBottom: "3%", textAlign: "center" }}
        >
          <h1>Order placed successfuly</h1>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col xs={6} md={3} lg={3} xl={3}>
          <Button
            style={{
              minWidth: "140px",
              minHeight: "60px",
              marginBottom: "10px",
            }}
            onClick={redirectToCart}
          >
            Return to Cart
          </Button>
          <Button
            style={{
              minWidth: "140px",
              minHeight: "60px",
              marginBottom: "10px",
            }}
            onClick={redirectToOrderHistory}
          >
            Order history
          </Button>
          <Button
            style={{
              minWidth: "140px",
              minHeight: "60px",
              marginBottom: "10px",
            }}
            onClick={handleSignout}
          >
            Logout
          </Button>
        </Col>
      </Row>
    </Modal>
  );
};

export default OrderWindowModal;
