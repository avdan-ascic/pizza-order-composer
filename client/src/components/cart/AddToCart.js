import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import AddToCartLeftPanel from "./AddToCartLeftPanel";
import OrderPanel from "./OrderPanel";

const AddToCart = ({ loggedIn, setLoginModal }) => {
  return (
    <Container>
      <Row>
        <AddToCartLeftPanel />
        <OrderPanel loggedIn={loggedIn} setLoginModal={setLoginModal} />
      </Row>
    </Container>
  );
};

export default AddToCart;
