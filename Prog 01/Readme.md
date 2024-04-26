# Amazon Products API

# Environment vars
This project uses the following environment variables:

| Name                          | Description                         | Default Value                                  |
| ----------------------------- | ------------------------------------| -----------------------------------------------|
|CORS           | Cors accepted values            | "*"      |


# Pre-requisites
- Install [Node.js](https://nodejs.org/en/) version > 20.0.0


# Getting started
- Clone the repository
```
git clone  https://github.com/rai-mukul/ADB_prog_assignment
```
- Install dependencies
```
cd ADB_prog_assignment
npm install
```
- Build and run the project
```
npm start
```
  Navigate to `http://localhost:3000`

- API Document endpoints

  swagger Spec Endpoint : http://localhost:300/api-docs 


## Project Structure
The folder structure of this app is explained below:

| Name | Description |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| **node_modules**         | Contains all  npm dependencies                                                            |
| **controllers**      | Controllers define functions to serve various express routes. 
| **routes/productRoutes.js**           | Contain all express routes, separated by module/area of application                       
| **model/productModel.js**           | Models define schemas that will be used in storing and retrieving data from the Application database  |
| **index.js**         | Entry point to express app                                                               |
| package.json             | Contains npm dependencies as well as [build scripts](#what-if-a-library-isnt-on-definitelytyped)   | tsconfig.json            | Config settings for compiling source code only written in TypeScript    
| tslint.json              | Config settings for TSLint code style checking                                                |



### Running the build
All the different build steps are orchestrated via [npm scripts](https://docs.npmjs.com/misc/scripts).
Npm scripts allow us to call (and chain) terminal commands via npm.

| Npm Script | Description |
| ------------------------- | ------------------------------------------------------------------------------------------------- |
| `start`                   | Runs full build and runs node on dist/index.js. Can be invoked with `npm start`                  |


# Common Issues

## npm install fails
The current solution has an example for using a private npm repository. if you want to use the public npm repository, remove the .npmrc file.

