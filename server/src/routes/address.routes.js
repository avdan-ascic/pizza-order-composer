import express from "express";
import passport from "passport";

import addressCtrl from "../controllers/address.controller";

const router = express.Router();

router
  .route("/api/address/add")
  .post(passport.authenticate("jwt"), addressCtrl.create);
router
  .route("/api/address/list")
  .get(passport.authenticate("jwt"), addressCtrl.list);
router.route("/api/address/delete").post(passport.authenticate("jwt"),addressCtrl.deleteAddress);

export default router;
