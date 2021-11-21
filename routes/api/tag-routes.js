const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
	// find all tags
	// be sure to include its associated Product data
	Tag.findAll({
		include: [
			{
				model: ProductTag,
				attributes: ["id", "product_id", "tag_id"],
				include: {
					model: Product,
					attributes: ["product_name", "price", "stock"],
				},
			},
		],
	})
		.then((dbResult) => {
			//	console.log(dbResult);
			res.json(dbResult);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

router.get("/:id", (req, res) => {
	// find a single tag by its `id`
	// be sure to include its associated Product data
	Tag.findOne({
		where: {
			id: req.params.id,
		},
		include: [
			{
				model: ProductTag,
				attributes: ["id", "product_id", "tag_id"],
				include: {
					model: Product,
					attributes: ["product_name", "price", "stock"],
				},
			},
		],
	})
		.then((dbResult) => {
			if (!dbResult) {
				res.status(404).json({ message: "Tag id not found" });
				return;
			}
			res.json(dbResult);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

router.post("/", (req, res) => {
	Tag.create({
		tag_name: req.body.tag_name,
	})
		.then((dbResult) => {
			res.json(dbResult);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

router.put("/:id", (req, res) => {
	Tag.update(req.body, {
		where: {
			id: req.params.id,
		},
	})
		.then((dbResult) => {
			if (!dbResult) {
				res.status(404).json({ message: "Tag id not found" });
				return;
			}
			res.json(dbResult);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

router.delete("/:id", (req, res) => {
	Tag.destroy({
		where: {
			id: req.params.id,
		},
	})
		.then((dbResult) => {
			if (!dbResult) {
				res.status(404).json({ message: "Tag id not found" });
				return;
			}
			res.json(dbResult);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

module.exports = router;
