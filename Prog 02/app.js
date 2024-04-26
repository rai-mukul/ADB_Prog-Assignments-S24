require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cron = require('node-cron');
const bodyParser = require('body-parser');
const characterRoutes = require('./routes/characterRoutes');
const neo4j = require('neo4j-driver');

const app = express();

// Middleware
app.use(bodyParser.json());

// Neo4j connection
const uri = process.env.NEO4J_URI;
const user = process.env.NEO4J_USER;
const password = process.env.NEO4J_PASSWORD;

const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));

// Pass Neo4j driver to routes
app.use((req, res, next) => {
  req.driver = driver;
  next();
});

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/api-introduction.html');
});
app.use('/chars', characterRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//Keep neo4j db alive 
// const neo4jEndpoint = 'http://localhost:3000'; // for local machine
const neo4jEndpoint = 'https://prog-assign2-095a3665c190.herokuapp.com'; // for live server
// Function to check Neo4j connectivity
async function checkNeo4jConnectivity() {
  try {
    const response = await axios.get(neo4jEndpoint);
    if (response.status === 200) {
      console.log('Neo4j is connected.');
    } else {
      console.log('Neo4j connection failed.');
    }
  } catch (error) {
    console.error('Error connecting to Neo4j:', error.message);
  }
}
// Run every 4 hours
cron.schedule('0 */4 * * *', () => {
  console.log('Running Neo4j connectivity check...');
  checkNeo4jConnectivity();
});