/* Swagger configuration */
const options = {
  openapi: "OpenAPI 3", // Enable/Disable OpenAPI. By default is null
  language: "en-US", // Change response language. By default is 'en-US'
  disableLogs: false, // Enable/Disable logs. By default is false
  autoHeaders: false, // Enable/Disable automatic headers capture. By default is true
  autoQuery: false, // Enable/Disable automatic query capture. By default is true
  autoBody: false, // Enable/Disable automatic body capture. By default is true
};

// const config = require("../config/cloud");
const swaggerAutogen = require("swagger-autogen")();
// const msg = require("../utils/lang/messages");

const doc = {
  info: {
    version: "3.0.0", // by default: '1.0.0'
    title: "PlannerPulse APIs", // by default: 'REST API'
    description: "API for PlannerPulse Project", // by default: ''
    contact: {
      name: "Janmesh Kumar",
      email: "janmesh.kr.2024@gmail.com",
    },
  },
  host: "localhost:5000", // by default: 'localhost:3000'
  basePath: "/", // by default: '/'
  schemes: ["http", "https"], // by default: ['http']
  consumes: ["application/json"], // by default: ['application/json']
  produces: ["application/json"], // by default: ['application/json']
  tags: [
    {
      name: "Authentication", // Tag name
      description: "APIs related to authentication", // Tag description
    },
    {
      name: "Notes",
      description: "APIs related to notes",
    },
  ],
  securityDefinitions: {}, // by default: empty object
  definitions: {},
};

const outputFile = "./docs/swagger.json";
const endpointsFiles = ["./src/index.ts"];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as: index.js, app.js, routes.js, ... */
swaggerAutogen(outputFile, endpointsFiles, doc);

// swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
//     require('./index.js'); // Your project's root file
//   });
