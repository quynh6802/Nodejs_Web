const ProductModel = require("../models/product");
const CategoryModel = require("../models/category");
const pagination = require("../../common/pagination");
const slug = require("slug");
const fs = require("fs");
const path = require("path");
const index = async (req, res) => {
  const query = {};
  if (req.query.is_stock == 1 || req.query.is_stock == 0) {
    query.is_stock = req.query.is_stock;
  }
  if (req.query.featured == 1 || req.query.featured == 0) {
    query.featured = req.query.featured;
  }
  // query.is_stock = req.query.is_stock;
  // query.featured = req.query.featured;
  console.log(query);
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = page * limit - limit;
  const products = await ProductModel.find(query)
    .populate({ path: "cat_id" })
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limit);
  res.render("admin/products/product", {
    products,
    page,
    pages: await pagination(ProductModel, query, page, limit),
  });
};
const create = async (req, res) => {
  const categories = await CategoryModel.find();
  res.render("admin/products/add_product", { categories });
};
const store = (req, res) => {
  const { file, body } = req;
  const product = {
    name: body.name,
    slug: slug(body.name),
    price: body.price,
    warranty: body.warranty,
    accessories: body.accessories,
    promotion: body.promotion,
    status: body.status,
    cat_id: body.cat_id,
    is_stock: body.is_stock,
    featured: body.featured == "on" ? "1" : "0",
    description: body.description,
  };
  if (file) {
    const thumbnail = "products/" + file.originalname;
    fs.renameSync(file.path, path.resolve("src/public/images", thumbnail));
    product["thumbnail"] = thumbnail;
    new ProductModel(product).save();
    res.redirect("/admin/products");
  }
};
const edit = async (req, res) => {
  const id = req.params.id;
  const categories = await CategoryModel.find();
  const product = await ProductModel.findById(id);
  res.render("admin/products/edit_product", { categories, product });
};
const update = async (req, res) => {
  const id = req.params.id;
  const { file, body } = req;
  const product = {
    name: body.name,
    slug: slug(body.name),
    price: body.price,
    warranty: body.warranty,
    accessories: body.accessories,
    promotion: body.promotion,
    status: body.status,
    cat_id: body.cat_id,
    is_stock: body.is_stock,
    featured: body.featured == "on" ? "1" : "0",
    description: body.description,
  };
  if (file) {
    const thumbnail = "products/" + file.originalname;
    fs.renameSync(file.path, path.resolve("src/public/images", thumbnail));
    product["thumbnail"] = thumbnail;
    new ProductModel(product).save();
    res.redirect("/admin/products");
  }
  await ProductModel.updateOne({ _id: id }, { $set: product });
  res.redirect("/admin/products");
};

const del = async (req, res) => {
  const id = req.params.id;
  await ProductModel.deleteOne({ _id: id });
  res.redirect("/admin/products");
};
module.exports = {
  index,
  create,
  store,
  edit,
  update,
  del,
};
