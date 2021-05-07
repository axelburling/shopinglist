const router = require("express").Router();
const db = require("../../db/db");

const one = async(ids) => {
  const names = ids.map(async(id) => {
     const idk = await db.query("SELECT * FROM family WHERE fam_id = $1", [id]) 
     return idk.rows[0]
  })

  const res = Promise.all(names).then(results => {
    return results
  })


  return res
}

router.post("/create", async (req, res) => {
  try {
    const { name, user_id } = req.body;

    const image = "https://picsum.photos/800/600.jpg"

    const cre = await db.query(
      "INSERT INTO family (fam_name, image) VALUES ($1, $2) RETURNING *",
      [name, image]
    );

    const ins = await db.query(
      "UPDATE users SET fam_id = ARRAY_APPEND(fam_id, $1) WHERE user_id = $2 RETURNING *",
      [cre.rows[0].fam_id, user_id]
    );

    return res.json({idk: cre.rows[0].fam_id, name: name, user: ins.rows});
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post("/adduser/:fam_id", async (req, res) => {
  try {
    const { fam_id } = req.params;
    const { user_id } = req.body;

    const user = await db.query("SELECT * FROM users WHERE user_id = $1", [
      user_id,
    ]);

    const ins = await db.query(
      "UPDATE users SET fam_id = ARRAY_APPEND(fam_id, $1) WHERE user_id = $2 RETURNING *",
      [fam_id, user.rows[0].user_id]
    );
    return res.json(ins.rows);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/all/:id", async (req, res) => {
  try {
    const { id } = req.params
    
    const user = await db.query("SELECT * FROM users WHERE user_id = $1", [id])

    const fam_ids = user.rows[0].fam_id

    const names = await one(fam_ids)

    return res.json(names)
  } catch (error) {
    return res.json(error)
  }
})

router.get("/members/:id", async (req, res) => {
  try {
    const { id } = req.params

    const members = await db.query("select user_name, user_email, user_id from users where $1 = ANY(fam_id)", [id])

    return res.json(members.rows)

  } catch (error) {
    return res.status(500).json(error)
  }
})

router.get("/search/:name", async (req, res) => {
  try {
    const {name} = req.params;

    const users = await db.query("SELECT user_name, user_email, user_id FROM users WHERE user_name ~* $1", [name])

    return res.status(200).json(users.rows)
  } catch (error) {
    return res.status(500).json(error)
  }
})

router.delete("/del/:fam_id", async (req, res) => {
  try {
    const { fam_id } = req.params;
    const { user_id } = req.body;

    const del = await db.query(
      "UPDATE users SET fam_id = ARRAY_REMOVE(fam_id, $1) WHERE user_id = $2 RETURNING *",
      [fam_id, user_id]
    );

    return res.json(del.rows);
  } catch (err) {
    return res.status(500).json("SERVER ERROR");
  }
});

router.delete("/destroy/:fam_id", async (req, res) => {
  try {
    const { fam_id } = req.params;

    const del = await db.query(
      "UPDATE users SET fam_id = ARRAY_REMOVE(fam_id, $1) RETURNING *",
      [fam_id]
    );

    if (del.rows.length !== 0) {
      const fam_del = await db.query(
        "DELETE FROM family WHERE fam_id = $1 RETURNING *",
        [fam_id]
      );
    }

    return res.json({
      users: del.rows,
      fam: fam_id,
    });
  } catch (err) {
    return res.status(500).json("SERVER ERROR");
  }
});

module.exports = router;
