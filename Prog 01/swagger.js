const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Amazon Products API', 
      version: '1.0.0',
      description: `Welcome to our Amazon products page! We offer a wide range of high-quality products to meet your needs. From electronics to home goods, we've got you covered. Browse our selection and find great deals on top-rated products.`,
    },
    servers: [
      {
       url: 'http://localhost:3000', // Localhost
        // url: 'https://adb-assignment-25b00af52cf1.herokuapp.com/',   //web server
      },
    ],
  },
  apis: ['./routes/productRoutes.js'], // Path to the API routes directory
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
