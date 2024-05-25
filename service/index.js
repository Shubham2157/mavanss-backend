const axios = require("axios");


function getProducts(req, res) {
    
  axios
  .get(`${process.env.API_BASE_URL}/api/products?populate=*`)
  .then((response) => {
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
    res.send(error);
  });
}


function getProductById(req, res) {
    
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
}


function getCategories(req, res) {
    axios
    .get(`${process.env.API_BASE_URL}/api/categories/?populate=*`)
    .then((response) => {
  
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
}

function featureProducts(req, res) {
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

}

module.exports = { getProducts, getProductById, getCategories, featureProducts };