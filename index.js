const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger-output.json')

const axios = require("axios");

const whitelist = ["https://mavanss.cyclic.app", `${process.env.FRONTEND_URL}`]; // assuming front-end application is running on localhost port 3000

/* Middlewares */
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerFile));

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
  axios
    .get(`${process.env.API_BASE_URL}/api/products?populate=*`)
    .then((response) => {
      // Handle successful response
      // console.log('Response data:', JSON.stringify(response.data));

        const filteredData = response.data.data.map((item) => {
        const imageUrl = item.attributes.image && item.attributes.image.data ?
          (item.attributes.image.data[0] ? item.attributes.image.data[0].attributes.url : null) : null;
      
        return {
          id: item.id,
          name: item.attributes.name,
          description: item.attributes.description,
          imageUrl: imageUrl,
          price: item.attributes.price,
          info: item.attributes.info,
          slug: item.attributes.slug,
          imageUrls: item.attributes.image && item.attributes.image.data ?
            item.attributes.image.data.map((image) => image.attributes.url) : [],
        };
      });

      res.send(filteredData);
    })
    .catch((error) => {
      // Handle error
      // console.error('Error:', error.message);
      res.send(error);
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
        price: response.data.data.attributes.price,
        info: response.data.data.attributes.info,
        slug: response.data.data.attributes.slug,
        imageUrl: response.data.data.attributes.image && response.data.data.attributes.image.data && response.data.data.attributes.image.data[0] ?
          response.data.data.attributes.image.data[0].attributes.url : null,
        imageUrls: response.data.data.attributes.image && response.data.data.attributes.image.data ?
          response.data.data.attributes.image.data.map((image) => image.attributes.url) : [],
      };
      
      res.send(filteredData);
    })
    .catch((error) => {
      // Handle error
      // console.error('Error:', error.message);
      res.send(error);
    });
});

http://localhost:1337/api/products?filters[slug]=product-1&populate=*



app.get('/api/categories', (req, res) => {

  axios
  .get(`${process.env.API_BASE_URL}/api/categories/?populate=*`)
  .then((response) => {
    // Handle successful response
    // console.log('Response data:', response.data);

    const filteredData = response.data.data.map((item) => {
      return {
        id: item.id,
        name: item.attributes.name,
        imageUrl: item.attributes.image.data ? item.attributes.image.data.attributes.url : "https://via.placeholder.com/150",
        slug: item.attributes.slug ? item.attributes.slug : "",
        description: item.attributes.description,
      };
    });
    
    res.send(filteredData);
  })
  .catch((error) => {
    // Handle error
    // console.error('Error:', error.message);
    res.send(error);
  });



  // res.json(
  //   [
  //     { id: 1, name: 'Loading...', imageUrl: 'https://via.placeholder.com/150', slug: 'loading-1' },
  //     { id: 2, name: 'Loading...', imageUrl: 'https://via.placeholder.com/150', slug: 'loading-2' },
  //     { id: 3, name: 'Loading...', imageUrl: 'https://via.placeholder.com/150', slug: 'loading-3' },
  //     { id: 4, name: 'Loading...', imageUrl: 'https://via.placeholder.com/150', slug: 'loading-4' },
  //     { id: 5, name: 'Loading...', imageUrl: 'https://via.placeholder.com/150', slug: 'loading-5' },
  //     { id: 6, name: 'Loading...', imageUrl: 'https://via.placeholder.com/150', slug: 'loading-6' }
  //   ]
  // )
})


app.get('/api/feature-products', (req, res) => {
// http://localhost:1337/api/products?filters[feature]=true&populate=*
  axios
    .get(`${process.env.API_BASE_URL}/api/products?filters[feature]=true&populate=*`)
    .then((response) => {
      // Handle successful response
      // console.log('Response data:', JSON.stringify(response.data));

        const filteredData = response.data.data.map((item) => {
        const imageUrl = item.attributes.image && item.attributes.image.data ?
          (item.attributes.image.data[0] ? item.attributes.image.data[0].attributes.url : 'https://via.placeholder.com/150') : 'https://via.placeholder.com/150';
      
        return {
          id: item.id,
          title: item.attributes.name,
          description: item.attributes.description,
          imageUrl: imageUrl,
          price: item.attributes.price,
          slug: item.attributes.slug,
        };
      });

      res.send(filteredData);
    })
    .catch((error) => {
      // Handle error
      // console.error('Error:', error.message);
      res.send(error);
    });


  // res.json(

  //     [
  //       { id: 1, title: 'Data 1', description: 'Loading...', price: 'Loading...', imageUrl: 'https://via.placeholder.com/150' },
  //       { id: 2, title: 'Data 2', description: 'Loading...', price: 'Loading...', imageUrl: 'https://via.placeholder.com/150' },
  //       { id: 3, title: 'Data 3', description: 'Loading...', price: 'Loading...', imageUrl: 'https://via.placeholder.com/150' },
  //       { id: 4, title: 'Data 4', description: 'Loading...', price: 'Loading...', imageUrl: 'https://via.placeholder.com/150' },
  //       { id: 5, title: 'Data 5', description: 'Loading...', price: 'Loading...', imageUrl: 'https://via.placeholder.com/150' },
  //       { id: 6, title: 'Data 6', description: 'Loading...', price: 'Loading...', imageUrl: 'https://via.placeholder.com/150' }
  //     ]
    
  // )
})

app.listen(PORT, () => {
  console.log(`Server started on PORT : ${PORT}`);
});
