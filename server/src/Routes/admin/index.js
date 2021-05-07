const router = require("express").Router();
const bcrypt = require("bcryptjs");
const db = require("../../db/db");
const badWords = require("../../utils/badwords");
const { v5 } = require("../../utils/uuidGen");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db
      .query("SELECT * FROM users WHERE user_email = $1", [email])
      .catch((err) => console.log(err));

    if (user.rows.length === 0) {
      return res.status(401).json("Invalid credential");
    }

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    if (!validPassword) {
      return res.status(401).json("Wrong Credentials");
    }

    if (email !== "axel.burling@gmail.com") {
      return res.status(401).json("Not Auth");
    }

    const id = v5();
    console.log("It works");

    return res.status(200).json({ msg: "Admin", id });
  } catch (err) {
    res.status(500).send("Server problems");
  }
});

router.get("/", async (_, res, next) => {
  res.setHeader("Content-Type", "application/json");
  try {
    const users = await db
      .query("SELECT * FROM users")
      .catch((err) => console.log(err));

    const items = await db
      .query("SELECT * FROM products")
      .catch((err) => console.log(err));
    // console.log(it.rows.length);

    res.json({ users: users.rows, items: items.rows });

    // return res.json(users.rows);
  } catch (error) {
    res.status(500).json("Problems");
  }
});

router.delete("/", async (req, res) => {
  const { username } = req.body;
  try {
    const users = await db.query(
      "SELECT user_id FROM users WHERE user_name = $1",
      [username]
    );

    users.rows.map(async (user) => {
      const items = await db.query("DELETE FROM products WHERE user_id = $1", [
        user.user_id,
      ]);
      const deleted = await db.query("DELETE FROM users WHERE user_id = $1", [
        user.user_id,
      ]);
      if (deleted) {
        return res.json("Account is gone");
      }
    });
  } catch (err) {
    console.log(err);
  }
});

router.delete("/item/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const delItem = await db.query("DELETE FROM products WHERE pro_id = $1", [
      id,
    ]);

    console.log(delItem);

    if (delItem.command == "DELETE") {
      return res.status(200).json("Deleted item");
    } else {
      return res.status(400).json("Bad Request");
    }
  } catch (err) {
    return res.status(502).json("Server Problem");
  }
});

router.get("/lang", async (_, res) => {
  try {
    const users = await db.query("SELECT user_id FROM users");
    users.rows.map(async (user) => {
      const items = await db.query(
        "SELECT product_name FROM products WHERE user_id = $1",
        [user.user_id]
      );
      items.rows.map(async (item) => {
        badWords.forEach(async (word) => {
          if (item.product_name == word) {
            const items = await db.query(
              "DELETE FROM products WHERE product_name = $1",
              [item.product_name]
            );
            res.json("Item deleted");
          }
        });
      });
    });
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
