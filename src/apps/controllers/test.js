const CategoryModel = require("../models/category");
const ProductModel = require("../models/product");
const test = async (req, res) => {
  const categories = await CategoryModel.find();
  const products = await ProductModel.find();
  console.log(categories.length + products.length);
  // const str = "Welcom";
  // setTimeout(() => {
  //   console.log("NodeJS");
  // }, 3000);
  // const promise = new Promise((res, rej) => {
  //   setTimeout(() => {
  //     res(str + "Nodejs!");
  //   }, 3000);
  // });
  // promise.then((result) => {
  //   console.log(result);
  // });
  // const promise = new Promise((res, rej) => {
  //   res("OK");
  // });
  // promise.then((result) => {
  //   console.log(result);
  // });
  // ProductModel.find()
  //   .populate({ path: "cat_id" })
  //   .exec((err, docs) => {
  //     console.log(docs);
  //   });
  // CategoryModel.find({}, (err, docs) => {
  //   console.log(docs);
  // });
  // const category = {
  //   decription: "BPhone description",
  //   title: "BPhone title",
  //   slug: "bphone-slug",
  // };
  // new CategoryModel(category).save();
  // CategoryModel.deleteOne({ title: "BPhone title" }, (err, docs) => {
  //   console.log(err);
  //   console.log(docs);
  // });
};
const testForm = (req, res) => {
  res.send(`
        <form method=post>
        <input type=text name=email />
        <input type=submit name=sbm value=Send />
        </form>
    `);
};
const actionForm = (req, res) => {
  res.send(req.body.email);
};
module.exports = {
  test,
  testForm,
  actionForm,
};
