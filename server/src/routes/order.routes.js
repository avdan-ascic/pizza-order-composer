import express from "express";
import passport from "passport";

import orderCtrl from "../controllers/order-controller";

const router = express.Router();

router
  .route("/api/order/add")
  .post(passport.authenticate("jwt"), orderCtrl.createOrder);

router
  .route("/api/order/list")
  .get(passport.authenticate("jwt"), orderCtrl.listOrders);

export default router;
