/**
 * Handle 'product' related treatment.
 */
class ProductsController {
  static getProducts(req, res, next, sequelize) {
    sequelize
      .query(`SELECT * FROM product`)
      .then(([products, metadata]) => res.json(products))
      .catch((err) => {
        res.json({ error: "Impossible de recuperer les produits" });
        console.error(
          `Une erreur est survenue en recuperant les produits: ${err}`
        );
      })
      .finally(() => {
        next();
      });
  }

  static addProduct(req, res, next, sequelize) {
    const body = req.body;
    if ("name" in body && "description" in body && "quantity" in body) {
      sequelize
        .query(
          `
          INSERT INTO product 
            (name, description, quantity) 
          VALUES
            ("${body.name}", "${body.description}", "${body.quantity}")
        `
        )
        .then(() =>
          res.json({
            message: "ok",
          })
        )
        .catch((err) =>
          res.json({ error: `impossible d'ajouter un produit: ${err}` })
        )
        .finally(() => next());
    } else {
      res.status(400);
      res.json({
        error: "Missing parameters",
      });
    }
  }

  static editProduct(req, res, next, sequelize) {
    const body = req.body;
    if (
      "id" in body &&
      "name" in body &&
      "description" in body &&
      "quantity" in body
    ) {
      sequelize
        .query(
          `
          UPDATE product SET 
            name = "${body.name}",
            description = "${body.description}",
            quantity = "${body.quantity}" 
          WHERE
            id = "${body.id}"
        `
        )
        .then(() =>
          res.json({
            message: "ok",
          })
        )
        .catch((err) =>
          res.json({ error: `impossible de modifier un produit: ${err}` })
        )
        .finally(() => next());
    } else {
      res.status(400);
      res.json({
        error: "Missing parameters",
      });
    }
  }

  static deleteProduct(req, res, next, sequelize) {
    const body = req.body;
    if ("id" in body) {
      sequelize
        .query(`DELETE FROM product WHERE id = ${body.id}`)
        .then(() =>
          res.json({
            message: "ok",
          })
        )
        .catch((err) =>
          res.json({ error: `impossible de supprimer le produit: ${err}` })
        )
        .finally(() => next());
    } else {
      res.status(400);
      res.json({
        error: "Missing parameters",
      });
    }
  }
}

module.exports = ProductsController;
