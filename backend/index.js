const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const userRouter = require("./routers/user");
const adminRouter = require("./routers/admin");
const customerRouter = require("./routers/customer");

require("dotenv").config();
require("./databse/tableCreation");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(userRouter);
app.use(adminRouter);
app.use(customerRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
