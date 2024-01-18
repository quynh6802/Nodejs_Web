const UserModel = require("../models/user");
const getLogin = (req, res) => {
  res.render("admin/login", { data: {} });
};
const postLogin = async (req, res) => {
  const { email, password } = req.body;
  let error = null;
  const users = await UserModel.find({ email, password });
  if (email == "" || password == "") {
    error = "Email hoặc password không hợp lệ";
    res.render("admin/login", { data: { error } });
  } else if (users.length > 0) {
    req.session.email = email;
    res.redirect("/admin/dashboard");
  } else {
    error = "Tài khoản không hợp lệ";
    res.render("admin/login", { data: { error } });
  }
};
const logout = (req, res) => {
  req.session.destroy();
  res.redirect("/admin/login");
};
module.exports = {
  getLogin,
  postLogin,
  logout,
};
