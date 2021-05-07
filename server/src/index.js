const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");

const app = express();

app.use(express.json());
app.use(cors({origin: "http://localhost:3000"}));
app.use(compression());
app.use(morgan("dev"));
app.use(helmet());

app.use("/api/v1/dashboard", require("./Routes/products/Router"));
app.use("/api/v1", require("./Routes/auth/index"));
app.use("/api/v1", require("./Routes/ForgotPassword/index"));
app.use("/api/v1/admin", require("./Routes/admin/index"));
app.use("/api/v1/family", require("./Routes/family/index"));

app.get("/", async (_, res) => {
  res.json({ data: { msg: "it works" } });
});

const port = process.env.PORT || 8090;
app.listen(port, () => console.log(`Running on http://localhost:${port}`));
