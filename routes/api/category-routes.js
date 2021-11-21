const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
	Category.findAll({
		include: {
			model: Product,
			attributes: ["id", "product_name", "price", "stock"],
			required: true,
		},
	})
		.then((dbResult) => {
			res.json(dbResult);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

router.get("/:id", (req, res) => {
	// find one category by its `id` value
	// be sure to include its associated Products
	Category.findOne({
		where: {
			id: req.params.id,
		},
	})
		.then((dbResult) => {
			if (!dbResult) {
				res.status(404).json({ message: "requested category not found" });
				return;
			}
			res.json(dbResult);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});
//http://localhost:3001/api/categories
router.post("/", (req, res) => {
	Category.create({
		category_name: req.body.category_name,
	})
		.then((dbResult) => {
			res.json(dbResult);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

router.put("/:id", (req, res) => {
	// update a category by its `id` value
	Category.update(req.body, {
		where: {
			id: req.params.id,
		},
	})
		.then((dbResult) => {
			if (!dbResult) {
				res.status(404).json({ message: "requested category not found" });
				return;
			}
			res.json(dbResult);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

router.delete("/:id", (req, res) => {
	// delete a category by its `id` value
	Category.destroy({
		where: {
			id: req.params.id,
		},
	})
		.then((dbResult) => {
			if (!dbResult) {
				console.log(dbResult);
				res
					.status(404)
					.json({ message: "can not delete - category not found" });
				return;
			}
			res.json(dbResult);
		})
		.catch((err) => {
			console.log(err);
			res.json(500).json(err);
		});
});

module.exports = router;
