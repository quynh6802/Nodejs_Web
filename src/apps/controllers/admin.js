const UserModel = require("../models/user");
const ProductModel = require("../models/product");
const index = async (req, res) => {
  const active = req.path;
  const users = (await UserModel.find()).length;
  const products = (await ProductModel.find()).length;
  res.render("admin/dashboard", { users, products, active });
};

module.exports = {
  index,
};
