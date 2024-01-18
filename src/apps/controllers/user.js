const UserModel = require("../models/user");
const pagination = require("../../common/pagination");
const index = async (req, res) => {
  const query = {};
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = page * limit - limit;
  const users = await UserModel.find(query)
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limit);
  res.render("admin/users/user", {
    users,
    page,
    pages: await pagination(UserModel, query, page, limit),
  });
};
const create = async (req, res) => {
  res.render("admin/users/add_user", { data: {} });
};
const postCreate = async (req, res) => {
  const email = req.body.email;
  const body = req.body;
  let error;
  checkEmail = await UserModel.find({ email });
  if (checkEmail > 0) {
    let error = "Email đã tồn tại!";
    res.render("admin/users/add_user", { data: { error } });
  } else if (body.password !== body.re_pass) {
    error = "Mật khẩu phải trùng khớp";
    res.render("admin/users/add_user", { data: { error } });
  } else {
    users = {
      email: body.email,
      password: body.password,
      role: body.role,
      full_name: body.full_name,
    };
    new UserModel(users).save();
    res.redirect("/admin/users");
  }
};
const edit = async (req, res) => {
  const id = req.params.id;
  user = await UserModel.findById(id);
  res.render("admin/users/edit_user", { user });
};
const update = (req, res) => {
  res.render("admin/users/edit_user");
};
const del = (req, res) => {
  res.send("delete");
};
module.exports = {
  index,
  create,
  postCreate,
  edit,
  update,
  del,
};
