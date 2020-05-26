const express = require("express");
require("./db/mongoose");
const User = require("./model/user");
const Task = require("./model/task");
const userRouter = require("../src/routers/user");
const taskRouter = require("../src/routers/task");

const app = express();
const port = process.env.PORT || 3000;

// app.use((req, res, next) => {
//   console.log(req.method, req.path);
//   next();
// });

// app.use((req, res, next) => {
//   res.status(500).send("Site is under maintinance, check back soon");
// });

app.use(express.json()); // this will parse the any incoming requests in json
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("Server started at port:=>", port);
});

// const bcrypt = require("bcryptjs");

// const myFunction = async () => {
//   const password = "Red12345!";
//   const hashedPassword = await bcrypt.hash(password, 8);
//   console.log(hashedPassword);

//   const isMatch = await bcrypt.compare(password, hashedPassword);
//   console.log(isMatch);
// };

// myFunction();

// const jwt = require("jsonwebtoken");
// const myFunction = async () => {
//   const token = jwt.sign({ _id: "abc123" }, "thisismynewcourse", {
//     expiresIn: "7 days",
//   });
//   console.log(token);

//   const data = jwt.verify(token, "thisismynewcourse");
//   console.log(data);
// };

// myFunction();

// const main = async () => {
//   // const task = await Task.findById("5ebfe7e1e68fc71de40e3be0");
//   // await task.populate("owner").execPopulate();
//   // console.log(task.owner);

//   const user = await User.findById("5ebfe715c1e00c1d8c7b1b71");
//   await user.populate("tasks").execPopulate();
//   console.log(user.tasks);
// };

// main();

// const multer = require("multer");
// const upload = multer({ dest: "images" });
// app.post("/upload", upload.single("upload"), (req, res) => {
//   res.send();
// });
