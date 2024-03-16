const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;

const axios = require("axios");

const whitelist = ["http://localhost:3000", `${process.env.FRONTEND_URL}`]; // assuming front-end application is running on localhost port 3000

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
  res.send("Server Running");
});

app.get("/api/products", (req, res) => {
  // url = http://localhost:1337/api/products?populate=*
  axios
    .get(`${process.env.API_BASE_URL}/api/products?populate=*`)
    .then((response) => {
      // Handle successful response
      // console.log('Response data:', response.data);

      const filteredData = response.data.data.map((item) => ({
        id: item.id,
        name: item.attributes.name,
        description: item.attributes.description,
        imageUrl: item.attributes.image.data[0].attributes.url,
        imageUrls: item.attributes.image.data.map(
          (image) => image.attributes.url
        ),
      }));
      res.send(filteredData);
    })
    .catch((error) => {
      // Handle error
      // console.error('Error:', error.message);
      res.send(error.message);
    });
});

app.get("/api/product/:id", (req, res) => {
  // url = http://localhost:1337/api/products?populate=*
  axios
    .get(`${process.env.API_BASE_URL}/api/products/${req.params.id}?populate=*`)
    .then((response) => {
      // Handle successful response
      // console.log('Response data:', response.data);

      const filteredData = {
        id: response.data.data.id,
        name: response.data.data.attributes.name,
        description: response.data.data.attributes.description,
        imageUrl: response.data.data.attributes.image.data[0].attributes.url,
        imageUrls: response.data.data.attributes.image.data.map(
          (image) => image.attributes.url
        ),
      };
      res.send(filteredData);
    })
    .catch((error) => {
      // Handle error
      // console.error('Error:', error.message);
      res.send(error.message);
    });
});

app.listen(PORT, () => {
  console.log(`Server started on PORT : ${PORT}`);
});
