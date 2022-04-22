const express = require("express");
const sequelize = require("./db");
const ProductsController = require("./Controller/ProductsController");

const expressApp = express();
expressApp.use(express.json());

expressApp.use((req, res, next) => {
  console.log("Requete recue: " + req.url);
  next();
});

// expressApp.use((req, res, next) => {
//   res.send("Hello world");
//   next();
// });

expressApp.get("/", (req, res, next) => {
  const response = { message: "Acceuil" };
  res.json(response);
  next();
});

expressApp.get("/hello/:name/:age?", (req, res, next) => {
  const { name, age } = req.params;
  const message =
    undefined === age
      ? `Hello ${name}`
      : `Hello ${name}, vous avez ${age} ans `;
  res.json({ coucou: message });
  next();
});

expressApp.post("/product/add", (req, res, next) =>
  ProductsController.addProduct(req, res, next, sequelize)
);

expressApp.post("/product/edit", (req, res, next) =>
  ProductsController.editProduct(req, res, next, sequelize)
);

expressApp.post("/product/delete", (req, res, next) =>
  ProductsController.deleteProduct(req, res, next, sequelize)
);

expressApp.get("/products", (req, res, next) =>
  ProductsController.getProducts(req, res, next, sequelize)
);

expressApp.use((req, res, next) => {
  if (!res.route) {
    res.status(404).end();
  }
  next();
});

expressApp.use(() => {
  console.log("Requête terminer, reponse envoyé au client");
});

module.exports = expressApp;
