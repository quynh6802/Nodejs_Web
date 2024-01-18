const express = require("express");
const router = express.Router();

const TestController = require("../apps/controllers/test");
const AuthController = require("../apps/controllers/auth");
const AdminController = require("../apps/controllers/admin");
const ProductController = require("../apps/controllers/product");
const UserController = require("../apps/controllers/user");
const CategoryController = require("../apps/controllers/category");
const SiteController = require("../apps/controllers/site");

//Middlewares
const AuthMiddleware = require("../apps/middlewares/auth");
const UploadMiddleware = require("../apps/middlewares/upload");

//Test
router.get("/test", TestController.test);
router.get("/testform", TestController.testForm);
router.post("/testform", TestController.actionForm);

//admin
router.get("/admin/login", AuthMiddleware.checkLogin, AuthController.getLogin);
router.post(
  "/admin/login",
  AuthMiddleware.checkLogin,
  AuthController.postLogin
);
router.get("/admin/logout", AuthMiddleware.checkAdmin, AuthController.logout);
router.get(
  "/admin/dashboard",
  AuthMiddleware.checkAdmin,
  AdminController.index
);

//admin product
router.get(
  "/admin/products",
  AuthMiddleware.checkAdmin,
  ProductController.index
);
router.get(
  "/admin/products/create",
  AuthMiddleware.checkAdmin,
  ProductController.create
);
router.post(
  "/admin/products/store",
  UploadMiddleware.single("thumbnail"),
  AuthMiddleware.checkAdmin,
  ProductController.store
);
router.get(
  "/admin/products/edit/:id",
  AuthMiddleware.checkAdmin,
  ProductController.edit
);
router.post(
  "/admin/products/update/:id",
  UploadMiddleware.single("thumbnail"),
  AuthMiddleware.checkAdmin,
  ProductController.update
);
router.get(
  "/admin/products/delete/:id",
  AuthMiddleware.checkAdmin,
  ProductController.del
);
//admin user
router.get("/admin/users", AuthMiddleware.checkAdmin, UserController.index);
router.get(
  "/admin/users/create",
  AuthMiddleware.checkAdmin,
  UserController.create
);
router.post(
  "/admin/users/create",
  AuthMiddleware.checkAdmin,
  UserController.postCreate
);
router.get(
  "/admin/users/edit/:id",
  AuthMiddleware.checkAdmin,
  UserController.edit
);
router.post(
  "/admin/users/update/:id",
  AuthMiddleware.checkAdmin,
  UserController.update
);
router.get(
  "/admin/users/delete/:id",
  AuthMiddleware.checkAdmin,
  UserController.del
);
//admin ctegories
router.get(
  "/admin/categories",
  AuthMiddleware.checkAdmin,
  CategoryController.index
);
router.get(
  "/admin/categories/create",
  AuthMiddleware.checkAdmin,
  CategoryController.create
);
router.post(
  "/admin/categories/create",
  AuthMiddleware.checkAdmin,
  CategoryController.postCreate
);
router.get(
  "/admin/categories/edit/:id",
  AuthMiddleware.checkAdmin,
  CategoryController.edit
);
router.get(
  "/admin/categories/delete/:id",
  AuthMiddleware.checkAdmin,
  CategoryController.del
);

//Router Site
router.get("/", SiteController.home);
router.get("/category-:slug.:id", SiteController.category);
router.get("/product-:slug.:id", SiteController.product);
router.post("/product-:slug.:id", SiteController.comment);
router.get("/search", SiteController.search);
router.post("/add-to-cart", SiteController.addToCart);
router.get("/cart", SiteController.cart);
router.post("/update-cart", SiteController.updateCart);
router.get("/delete-cart:id", SiteController.deleteCart);
router.post("/order", SiteController.order);
router.get("/success", SiteController.success);

module.exports = router;
