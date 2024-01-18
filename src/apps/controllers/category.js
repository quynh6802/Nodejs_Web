const CategoryModel = require("../models/category");
const pagination = require("../../common/pagination");
const slug = require("slug");
const index = async (req, res) => {
  const query = {};
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const skip = page * limit - limit;
  const categories = await CategoryModel.find(query)
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limit);
  res.render("admin/categories/category", {
    categories,
    page,
    pages: await pagination(CategoryModel, query, page, limit),
  });
};
const create = (req, res) => {
  res.render("admin/categories/add_category", { data: {} });
};
const postCreate = async (req, res) => {
  const title = req.body.title;
  let error = null;
  const checkTitle = await CategoryModel.find({ title });
  if (checkTitle.length > 0) {
    error = "Danh mục đã tồn tại";
    res.render("admin/categories/add_category", { data: { error } });
  } else {
    const category = {
      description: null,
      title: title,
      slug: slug(title),
    };
    new CategoryModel(category).save();
    res.redirect("/admin/categories");
  }
};
const store = () => {};
const edit = (req, res) => {
  res.render("admin/categories/edit_category");
};
const del = (req, res) => {
  res.send("delete");
};
module.exports = {
  index,
  create,
  postCreate,
  edit,
  del,
};
