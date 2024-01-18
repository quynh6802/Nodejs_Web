const ProductModel = require("../models/product");
const CategoryModel = require("../models/category");
const CommentModel = require("../models/comment");
const pagination = require("../../common/pagination");
const ejs = require("ejs");
const path = require("path");
const transporter = require("../../common/transporetr");
const home = async (req, res) => {
  const featured = await ProductModel.find({
    featured: true,
    is_stock: true,
  })
    .sort({ _id: -1 })
    .limit(6);
  const latest = await ProductModel.find({
    is_stock: true,
  })
    .sort({ _id: -1 })
    .limit(6);
  res.render("site/index", { featured, latest });
};
const category = async (req, res) => {
  const url = req.path;
  const query = {};
  query.is_stock = parseInt(req.query.is_stock) || 1;
  if (req.query.featured == 1 || req.query.featured == 0) {
    query.featured = req.query.featured;
  }
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 9;
  const skip = page * limit - limit;
  const id = req.params.id;
  query.cat_id = id;
  const category = await CategoryModel.findById(id);
  const products = await ProductModel.find(query)
    .sort({ _id: 1 })
    .limit(limit)
    .skip(skip);
  const total = await ProductModel.find({ cat_id: id }).countDocuments();
  res.render("site/category", {
    category,
    products,
    total,
    url,
    page,
    pages: await pagination(ProductModel, query, page, limit),
  });
};
const product = async (req, res) => {
  const id = req.params.id;
  const product = await ProductModel.findById(id);
  const comments = await CommentModel.find({ prd_id: id }).sort({ _id: -1 });
  res.render("site/product", { product, comments });
};
const comment = async (req, res) => {
  const prd_id = req.params.id;
  const { full_name, email, body } = req.body;
  const comment = {
    prd_id,
    full_name,
    email,
    body,
  };
  await new CommentModel(comment).save();
  res.redirect(req.path);
};
const search = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 21;
  const keyword = req.query.keyword || "";
  const products = await ProductModel.find({
    $text: { $search: keyword },
  }).sort({ _id: -1 });
  console.log(products);
  res.render("site/search", { products, keyword });
};
const addToCart = async (req, res) => {
  const id = req.body.id;
  const qty = parseInt(req.body.qty);
  const items = req.session.cart;
  let isproduceExists = false;
  items.map((item) => {
    if (item.id === id) {
      item.qty += qty;
      isproduceExists = true;
    }
    return item;
  });
  if (!isproduceExists) {
    const product = await ProductModel.findById(id);
    items.push({
      id,
      name: product.name,
      thumbnail: product.thumbnail,
      price: product.price,
      qty,
    });
  }
  req.session.cart = items;
  res.redirect("/cart");
};
const cart = (req, res) => {
  const cart = req.session.cart;
  res.render("site/cart", { cart });
};
const updateCart = (req, res) => {
  const products = req.body.products;
  let items = req.session.cart;
  const newItems = items.map((item) => {
    item.qty = parseInt(products[item.id]["qty"]);
    return item;
  });
  req.session.cart = newItems;
  res.redirect("/cart");
};
const deleteCart = (req, res) => {
  const id = req.params.id;
  let items = req.session.cart;
  const newItems = items.filter((item) => item.id != id);
  req.session.cart = newItems;
  res.redirect("/cart");
};
const order = async (req, res) => {
  const items = req.session.cart;
  const body = req.body;
  //lấy ra đường dẫn tới thư mực view bắt được phả là  views
  const viewPath = req.app.get("views");
  const html = await ejs.renderFile(
    path.join(viewPath, "site/email-order.ejs"),
    {
      name: body.name,
      phone: body.phone,
      mail: body.mail,
      add: body.add,
      items,
    }
  );
  await transporter.sendMail({
    from: '"Quynh Shop" <quynhcoi6802@gmail.com>', // sender address
    to: body.mail, // list of receivers
    subject: "Xác nhận đơn hàng từ Quynh Shop", // Subject line
    html,
  });
  req.session.cart = [];
  res.redirect("/success");
};
const success = (req, res) => {
  res.render("site/success");
};
module.exports = {
  home,
  category,
  product,
  comment,
  search,
  addToCart,
  cart,
  updateCart,
  deleteCart,
  order,
  success,
};
