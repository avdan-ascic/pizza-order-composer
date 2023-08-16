import Order from "../models/order.model";
import dbErrorHandler from "../helpers/dbErrorHandler";

const createOrder = async (req, res, next) => {
  try {
    const [name] = req.body.name[0];
    const orderData = {
      name,
      ingredients: req.body.additionalIngredients[0].join(", "),
      price: req.body.price,
      userId: req.user._id,
    };
    const order = new Order(orderData);
    await order.save();
    res.status(200).json({
      message: "Created order",
    });
  } catch (err) {
    return res.status(400).json({
      error: dbErrorHandler.getErrorMessage(err),
    });
  }
};

const listOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({
      created: -1,
    });
    res.json(orders);
  } catch (err) {
    return res.status(400).json({
      error: dbErrorHandler.getErrorMessage(err),
    });
  }
};

export default { createOrder, listOrders };
