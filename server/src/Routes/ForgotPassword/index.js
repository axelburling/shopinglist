const router = require("express").Router();
const bycrypt = require("bcryptjs");
const yup = require("yup");
const forgotGenertor = require("../../utils/forgotGenertor");
const forgot = require("../../middleware/forgot");
const db = require("../../db/db");

const schema = yup.object().shape({
  user_password: yup.string().max(255).min(8),
});

router.post("/forgot", async (req, res) => {
  const { email } = req.body;
  const user = await db
    .query("SELECT * FROM users WHERE user_email = $1", [email])
    .catch((err) => console.log(err));
  if (user.rows[0].user_email === email) {
    const u = user.rows[0];

    const forgotToken = forgotGenertor(user.rows[0].user_id);

    return res.status(200).json({
      forgotToken,
    });
  } else {
    return res.status(401).json({ message: "Access denied" });
  }
});

router.post("/reset", forgot, async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const user = await db
      .query("SELECT * FROM users WHERE user_email = $1", [email])
      .catch((err) => console.log("POSTGRES Poblem"));

    const valid = await schema
      .validate({
        user_password: newPassword,
      })
      .catch((err) => {
        return res.json(err.errors);
      });

    if (valid) {
      const hashedNewPassword = await bycrypt.hash(newPassword, 12);

      const update = await db.query(
        "UPDATE users SET user_password = $1 WHERE user_id = $2",
        [hashedNewPassword, user.rows[0].user_id]
      );
      const u = user.rows[0].user_password;
      return res.json({ newPassword, u });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
