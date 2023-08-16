import React, { useEffect, useState } from "react";

import { orderList } from "../../api/order-api";

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    orderList()
      .then((data) => {
        setOrderHistory(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <div className="orderHistoryWrapper">
        <div className="orderHistoryHeader">
          <h2>Order history</h2>
        </div>
        <div className="historyOrders">
          {orderHistory.map((order, id) => (
            <div className="singleOrder" key={id}>
              <div className="topSide">
                <h3>{order.name}</h3>
                <div className="price">{order.price}$</div>
              </div>
              <div className="buttomSide">
                <div style={{ display: "flex" }}>
                  <div> {order.ingredients}</div>
                </div>
                <div>{order.created}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
