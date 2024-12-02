const express = require("express");
const cors = require("cors");
const connectDB = require("./controllers/connectDB");
const product = require("./routes/product");
const category = require("./routes/category");
const user = require("./routes/user");
const auth = require("./routes/auth");
const admin = require("./routes/admin");
const delivery = require("./routes/delivery");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 4000;
connectDB();
app.use(bodyParser.json());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    optionsSuccessStatus: 200,
  })
);
app.use(cookieParser());

app.use("/ecommerce/admin", admin);
app.use("/ecommerce/delivery", delivery);
app.use("/ecommerce", product);
app.use("/ecommerce", category);
app.use("/ecommerce", user);
app.use("/", auth);

app.listen(PORT, () => {
  console.log(`=> Server running on localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.json({ msg: "hello world 2" });
});
