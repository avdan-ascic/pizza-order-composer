import Address from "../models/address.model";
import dbErrorHandler from "../helpers/dbErrorHandler";

const create = async (req, res, next) => {
  try {
    const address = new Address({
      userId: req.user._id,
      address: req.body.address,
      floor: req.body.floor,
    });
    await address.save();
    res.status(200).json({
      message: "Created address",
    });
  } catch (err) {
    return res.status(400).json({
      error: dbErrorHandler.getErrorMessage(err),
    });
  }
};

const list = async (req, res, next) => {
  try {
    const address = await Address.find({ userId: req.user._id });
    res.status(200).json({ addresses: address });
  } catch (err) {
    return res.status(400).json({
      error: dbErrorHandler.getErrorMessage(err),
    });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const result = await Address.findByIdAndDelete(req.body.id);
    res.json(result);
  } catch (err) {
    return res.status(400).json({
      error: dbErrorHandler.getErrorMessage(err),
    });
  }
};

export default { create, list, deleteAddress };
