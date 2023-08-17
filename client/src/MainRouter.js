import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/core/Header";
import Home from "./components/cart/Home";
import Order from "./components/order/Order";
import Signin from "./components/user/Signin";
import Signup from "./components/user/Signup";
import AddToCart from "./components/cart/AddToCart";
import OrderHistory from "./components/order/OrderHistory";
import OrderWindowModal from "./components/order/OrderModalWindow";
import IngredientsSelector from "./components/cart/IngredientsSelector";

const MainRouter = () => {
  const [loggedIn, setLoggedIn] = useState(() => {
    const storedLoggedin = sessionStorage.getItem("loggedIn");
    return storedLoggedin ? JSON.parse(storedLoggedin) : false;
  });
  const [loginModal, setLoginModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    sessionStorage.setItem("loggedIn", JSON.stringify(loggedIn));
  }, [loggedIn]);

  return (
    <Router>
      <Header
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        setLoginModal={setLoginModal}
      />
      <div
        style={{
          color: "red",
          fontSize: "2em",
          display: "flex",
          justifyContent: "center",
          marginBottom: "2em",
        }}
      >
        {message}
      </div>
      <Signin
        setLoggedIn={setLoggedIn}
        loginModal={loginModal}
        setLoginModal={setLoginModal}
        setRegisterModal={setRegisterModal}
        setMessage={setMessage}
      />
      <Signup
        registerModal={registerModal}
        setLoginModal={setLoginModal}
        setRegisterModal={setRegisterModal}
        setMessage={setMessage}
      />
      <IngredientsSelector />
      <OrderWindowModal setLoggedIn={setLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/addToCart"
          element={
            <AddToCart loggedIn={loggedIn} setLoginModal={setLoginModal} />
          }
        ></Route>
        <Route path="/order" element={<Order />}></Route>
        <Route path="/orderHistory" element={<OrderHistory />}></Route>
      </Routes>
    </Router>
  );
};

export default MainRouter;
