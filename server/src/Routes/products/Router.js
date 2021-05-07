const router = require("express").Router();
const db = require("../../db/db");
const auth = require("../../middleware/auth");

router.get("/:fam_id", async (req, res) => {
  const { fam_id } = req.params;
  const data = await db.query("SELECT * FROM products WHERE fam_id = $1", [fam_id]);
  res.json(data.rows);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const {fam_id} = req.query
  const data = await db.query("SELECT * FROM products WHERE pro_id = $1 AND fam_id = $2", [id, fam_id]);
  res.json(data.rows);
});

router.post("/", auth, async (req, res) => {
  const { user, name, timestamp, user_id, fam_id } = req.body;
  const insert = await db.query(
    "INSERT INTO products(requsted_by, product_name, requsted_at, user_id, fam_id) VAlUES ($1, $2, $3, $4, $5) RETURNING *",
    [user, name, timestamp, user_id, fam_id]
  );
  return res.json("OK");
});

router.put("/:id", auth, async (req, res) => {
  const { id } = req.params;

<<<<<<< HEAD
  const { product_name } = req.body;
  console.log(id, product_name);
  const update = await db
    .query(
      "UPDATE products SET product_name = $1 WHERE pro_id = $2  RETURNING *",
      [product_name, id]
=======
  const {product_name, user_id} = req.body

  const update = await db
    .query(
      "UPDATE products SET product_name = $1 WHERE pro_id = $2 AND user_id = $3 RETURNING *",
      [product_name, id, user_id]
>>>>>>> fam
    )
    .catch((err) => {
      console.log(err);
    });


  if (update.rows.length === 0) {
    return res.status(401).json("This is not your item");
  }
  return res.status(200).json("OK");
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

<<<<<<< HEAD
    console.log(id);
    const deleted = await db.query(
      "DELETE FROM products WHERE pro_id = $1 RETURNING *",
      [id]
    );
    console.log(deleted)
=======
    const {user_id} = req.body

    const deleted = await db.query(
      "DELETE FROM products WHERE pro_id = $1 AND user_id = $2",
      [id, user_id]
    );

>>>>>>> fam

    return res.status(200).json(id);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
