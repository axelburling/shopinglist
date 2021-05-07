const router = require("express").Router();
const bcrypt = require("bcryptjs");
const yup = require("yup");
const db = require("../../db/db");
const jwtGenerator = require("../../utils/jwtGenerator");
const auth = require("../../middleware/auth");

const schema = yup.object().shape({
  user_name: yup.string().required().max(255),
  user_email: yup.string().max(255).min(8).email(),
  user_password: yup.string().max(255).min(8),
});

const loginSchema = yup.object().shape({
  user_email: yup.string().max(255).min(8).email(),
  user_password: yup.string().max(255).min(8),
});

router.post("/register", async (req, res) => {
  const { email, name, password } = req.body;
  let jwtToken;

  try {
    const user = await db
      .query("SELECT * FROM users WHERE user_email = $1", [email])
      .catch((err) => console.log(err));

    if (user.rows.length > 0) {
      return res.status(401).json("User already exists");
    }

    const valid = schema
      .validate({
        user_email: email,
        user_password: password,
        user_name: name,
      })
      .catch((err) => {
        return err;
      });

    if (valid) {
      const hashedPassword = await bcrypt.hash(password, 12).catch((err) => {
        console.log(err);
      });

      const newUser = await db
        .query(
          "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
          [name, email, hashedPassword]
        )
        .catch((err) => console.log(err));

      //console.log(newUser);

      jwtToken = jwtGenerator(newUser.rows[0].user_id);
    }

    return res.json({ jwtToken });
  } catch (err) {
    res.status(500).send("Server problems");
    console.log(err);
  }
});

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
      return res.status(401).json("Invalid credential");
    }

    const validInfo = loginSchema.validate({
      user_name: email,
      user_password: password,
    });

    if (validInfo) {
      const jwtToken = jwtGenerator(user.rows[0].user_id);
      return res.json({ jwtToken });
    }

    return res.status(404).json("Sesion timed out");
  } catch (err) {
    res.status(500).send("Server problems");
  }
});

router.post("/me", auth, async (req, res) => {
  try {
    const { email } = req.body;
    await db
      .query("SELECT * FROM users WHERE user_email = $1", [email])
      .then((user) => {
        return res
          .status(200)
          .json({ data: { loggedIn: true, user: user.rows[0] } });
      })
      .catch((err) => {
        return res.status(403).json(err);
      });
  } catch (err) {
    res.status(500).send("Server problems");
  }
});

module.exports = router;
