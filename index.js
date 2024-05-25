const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
var { getProducts, getProductById, getCategories, featureProducts } = require('./service');

const whitelist = [undefined, `${process.env.FRONTEND_URL}`];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions));

app.get("/", (req, res) => {
    console.log(process.env.FRONTEND_URL);
  res.send("Server Running");
});

app.get("/api/products", (req, res) => {
  getProducts(req, res)
});

app.get("/api/product/:id", (req, res) => {
  getProductById(req, res)
});

app.get('/api/categories', (req, res) => {
  getCategories(req, res)
})


app.get('/api/feature-products', (req, res) => {
  featureProducts(req, res)
})

app.listen(PORT, () => {
  console.log(`Server started on PORT : ${PORT}`);
});
