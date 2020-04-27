const express = require("express");
const cors = require("cors");
const http = require("http");
// const Path = require("path");
// const path = Path.resolve(__dirname,"./uploads")
const app = express();
const bodyParser = require("body-parser");
const multer = require("multer");
const server = http.createServer(app);
app.use(express.static(__dirname + "/dist/Learningv1"));

// Router
const productRouter = require("./app/routes/product.route");
const orderRouter = require("./app/routes/order.route");
const addressRouter = require("./app/routes/address.route");
// Connect database
const mongoose = require("mongoose");
const config = require("./DB");
mongoose.Promise = global.Promise;
mongoose
  .connect(config.DB, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(
    () => {
      console.log("database is connected");
    },
    (err) => {
      console.log("cannot connect to the database" + err);
    }
  );

const jwt = require("jsonwebtoken");
const secret = "secret";
const fs = require("fs");
const lodash = require("lodash");
app.use(cors());
app.use(bodyParser.json());

app.use("/market/product", productRouter);
app.use("/market/order", orderRouter);
app.use("/market/address", addressRouter);
// app.use("/market/image", imageRouter);
let upload = multer({ dest: "uploads" });

app.post(
  "/market/image/uploadimage",
  upload.single("image"),
  (req, res, next) => {
    const file = req.file;
    console.log("image upload in server  ", file);
    if (!file) {
      const error = new Error("please upload a file");
      res.status(400).send(error);
    } else {
      res.status(200).send(file);
    }
  }
);

// app.get('/uploads',(req,res)=>{
//   res.sendFile(__dirname,"./uploads")
// })
app.get("/uploads", function (req, res) {
  const Path = require("path");
  const path = Path.resolve(
    __dirname,
    "./uploads/",
    "b4748a65e0ae1419d1837cb76846566e"
  );
  console.log("image uploaded directory  ", path);
  res.status(200).send(path);
});

// app.get("/market/uploads")

// app.post("/product/createproduct", function(req, res) {
//   product_list = require("./data/product_list.json");
//   var temp = product_list;
//   var new_server = {};
//   console.log("create product  :  data:", req);
//   new_server.id = ++product_list.idcounter;
//   new_server.name = req.body.ProductName;
//   new_server.description = req.body.ProductDescription;
//   new_server.price = req.body.ProductPrice;
//   temp.productlist.push(new_server);
//   product_list = JSON.stringify(temp);
//   fs.writeFileSync("./data/product_list.json", product_list);
//   res.send(product_list);
// });

// app.get("/product/getproduct", function(req, res) {
//   product_list = require("./data/product_list.json");
//   res.send(product_list.productlist);
//   console.log(res, product_list);
// });

// app.get("/product/editproduct/:id", function(req, res) {
//   var id = req.params.id;
//   product_list = require("./data/product_list.json");
//   var array = product_list.productlist;
//   array.forEach(v => {
//     if (id == v.id) {
//       res.send(v);
//     }
//   });
//   res.send(product_list.productlist);
//   console.log(res, product_list);
// });

// app.post("/product/updateproduct/:id", function(req, res) {
//   var id = req.params.id;
//   var name = req.body.name;
//   var description = req.body.description;
//   var price = req.body.price;
//   product_list = require("./data/product_list.json");
//   var temp = product_list.productlist;
//   console.log("update product  :  data:", req.body);
//   for (let i = 0; i < temp.length; i++) {
//     if (temp[i].id == id) {
//       (temp[i].name = name),
//         (temp[i].description = description),
//         (temp[i].price = price);
//     }
//   }

//   product_list.productlist = temp;
//   fs.writeFileSync("./data/product_list.json", JSON.stringify(product_list));
//   res.send(product_list);
// });

// app.get("/product/deleteproduct/:id", function(req, res) {
//   var id = req.params.id;
//   product_list = require("./data/product_list.json");
//   var temp = product_list.productlist;
//   console.log("delete product  :  data:", req.body);
//   var index = temp.findIndex(v => {
//     return v.id == id;
//   });
//   if (index != -1) {
//     temp.splice(index, 1);
//   }
//   product_list.productlist = temp;
//   fs.writeFileSync("./data/product_list.json", JSON.stringify(product_list));
//   console.log("deleted product  :  data:", product_list);
//   res.send(product_list);
// });

app.listen(3010);
