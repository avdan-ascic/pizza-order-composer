import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "../../assets/styles/order.css";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/esm/Row";

import {
  getOrder,
  getQuantity,
  increaseQuantity,
  decreaseQuantity,
  setTotalPriceOfEachOrder,
  getSumOfAllOrders,
  setOrderWindowModal,
  clearOrder,
} from "../../features/pizzaSlice";
import Form from "react-bootstrap/Form";
import AddNewAddress from "./AddNewAddress";
import SendOrder from "./SendOrder";
import QuantityButtons from "./QuantityButtons";
import { create } from "../../api/order-api";

const Order = () => {
  const quantity = useSelector(getQuantity);
  const dispatch = useDispatch();
  const order = useSelector(getOrder);
  const sumOfAllOrders = useSelector(getSumOfAllOrders);
  const [error, setError] = useState("");
  const [addressesAdded, setAddressesAdded] = useState(false);

  const [orderDetails, setOrderDetails] = useState({
    paymentUponDelivery: false,
    notes: "",
    error: "",
  });

  const handleAddressesAdded = (added) => {
    setAddressesAdded(added);
  };

  const increaseQ = (index) => {
    dispatch(increaseQuantity(index));
    dispatch(setTotalPriceOfEachOrder(index));
    setOrderDetails({
      ...orderDetails,
      quantity: [quantity.map((item) => item)],
      price: Object.values(sumOfAllOrders).reduce((prev, curr) => prev + curr),
    });
  };
  
  const orderDough = () => {
    if (!addressesAdded) {
      setError("You must add an address before placing an order");

      setTimeout(() => {
        setError("");
      }, 3000);

      return;
    }

    const orderToSend = {
      price: Object.values(sumOfAllOrders).reduce(
        (prev, curr) => prev + curr,
        0
      ),
      paymentUponDelivery: orderDetails.paymentUponDelivery,
      notes: orderDetails.notes,
      additionalIngredients: [
        ...order.map((item) => item.ingredients.map((item) => item)),
      ],
      quantity: [...quantity],
      pricePerItem: [...sumOfAllOrders],
      name: [...order.map((item) => item.donut.map((item) => item.name))],
    };

    create(orderToSend).then((data) => {
      if (data.error) setError({ error: data.error });
      else {
        dispatch(clearOrder());
        dispatch(setOrderWindowModal(true));
      }
    });
  };

  const decreaseQ = (index) => {
    dispatch(decreaseQuantity(index));
    dispatch(setTotalPriceOfEachOrder(index));
    setOrderDetails({
      ...orderDetails,
      quantity: [quantity.map((item) => item)],
      price: Object.values(sumOfAllOrders).reduce((prev, curr) => prev + curr),
    });
  };

  const paymentType = () => {
    setOrderDetails({
      ...orderDetails,
      paymentUponDelivery:
        orderDetails.paymentUponDelivery === "Yes" ? "No" : "Yes",
    });
  };

  const orderNotes = (event) => {
    setOrderDetails({
      ...orderDetails,
      notes: event.target.value,
    });
  };

  return (
    <Container>
      <Row
        style={{
          borderStyle: "solid",
          marginBottom: "10px",
        }}
      >
        <Col style={{ borderBottomStyle: "solid" }}>
          <h1>Address to deliver</h1>
        </Col>

        {error !== "" ? (
          <Row className="justify-content-center">
            <p
              style={{
                display: "inline",
                textAlign: "center",
                color: "red",
                fontSize: "20px",
              }}
            >
              {error}
            </p>
          </Row>
        ) : null}

        <Row
          className="justify-content-center"
          style={{ paddingTop: "10px", paddingBottom: "10px" }}
        >
          <AddNewAddress onAddressesAdded={handleAddressesAdded} />
        </Row>
      </Row>

      <Row
        className="justify-content-center"
        xs={12}
        md={{ span: 10 }}
        lg={{ span: 10 }}
        xl={{ span: 10 }}
        style={{
          borderStyle: "solid",
          borderBottomStyle: "solid",
          paddingLeft: "2%",
          paddingRight: "2%",
        }}
      >
        <Col style={{ borderBottomStyle: "solid" }}>
          <h1 style={{ display: "inline-flex" }}>Payment</h1>
          <span>
            {" "}
            <Form.Check
              style={{
                display: "inline-flex",
                marginLeft: "20px",
                paddingLeft: "20px",
              }}
              type="radio"
              id="default-radio"
              name="paymentType"
              onClick={paymentType}
              checked={
                orderDetails.paymentUponDelivery === "Yes" ? true : false
              }
              readOnly
            />
            <p style={{ display: "inline", marginLeft: "5px" }}>upon deliver</p>
          </span>
        </Col>
        <Col xs={12} md={12} lg={12} xl={12} style={{ marginTop: "20px" }}>
          <h1>Order</h1>
        </Col>

        {order.map((item, index) => {
          return (
            <Row style={{ marginBottom: "10px" }} key={index}>
              <Col xs={7} md={7} lg={7} xl={7}>
                <h4>{item.donut.map((item) => item.name)}</h4>
              </Col>

              <Col xs={2} md={2} lg={2} xl={2}>
                <p style={{ fontSize: "16px" }}>{`${
                  item.price * quantity[index]
                }$`}</p>
              </Col>

              <Col xs={3} md={3} lg={3} xl={3}>
                <QuantityButtons
                  decreaseQ={() => decreaseQ(index)}
                  quantity={quantity[index]}
                  increaseQ={() => increaseQ(index)}
                />
              </Col>
              <hr />
            </Row>
          );
        })}
        <SendOrder orderNotes={orderNotes} order={orderDough} />
      </Row>
    </Container>
  );
};

export default Order;
