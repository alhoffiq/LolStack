# Project 3 Starter Kit - Server

The Project 3 Starter Kit is a highly opinionated, preconfigured MVC-style full-stack application intended to satisfy the stated requirements and additional requirements of Project 3. It comes with a prerolled authentication system, some cleanup from the project 2 starter, and eslint configuration.

## What this README explains.

This readme only explains the *server*. As it is the server readme! 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Opinions 

- git ignored .lock files, for ease of collaboration 
- git ignored vscode files, for ease of collaboration
- git ignored eslint cache, for ease of collaboration
- Configuration is checked, and throws errors on improper config supplied.

### Prerequisites

What things you need to install the software and how to install them

```
Node.js 
a local instance of Mongo DB
an active internet connection
```

### Installing

A step by step series of examples that tell you how to get a development env running

First, install all dependencies through npm or yarn. Make sure you use one or the other, if you are going to use yarn, just use yarn. 

```
npm install
```
OR 

```
yarn 
```

Next, we need to put in your configuration for the server in a .env file in the root of the project. It should look something along the lines of:

```
NODE_ENV=development
MONGODB_URI=
SECRET=passwordsecret
```

* Note: this is for local work. MONGODB_URI can be filled in with your production URL if you want to run your server locally against your production db

You will also need to put in a SECRET of at least 10 characters, for the tokens for authentication to be generated. If you change this ever, you will need to clean out your local storages! 

You will also need to specify the NODE_ENV, so for local work, set it to development as above.

Once you have down that; you are ready to run the server, with:

```
npm run dev
```

## Available Scripts

In the server:
```
        "start": Runs the server, and the server only. Expects a built frontend.
        "dev": Runs the server in watch mode, and the starts up the react dev server.
        "lint": Lints the server and then runs lint on the client
        "fix": ESlint fixes the server and then the client
        "client": Runs the client in development mode
        "install": Installs the server, and then installs the client.
        "build": Builds the client for production
        "heroku-postbuild": Hook for Heroku to build the client
```
In the client:
```
        "start": Start the react development server
        "build": Builds a production react app
        "test": Runs lint, no other test yet
        "lint": Lints the client
        "fix": ESlint fixes the client
```
## Running the tests

Currently, the application has no tests, barring lint. Travis settings preconfigured all ready.

## Server Structure

The structure of the server application, as produced, is replicated below, with folders marked with ```-``` and files marked with ```*```. Below this, please find the detailed description of each file and what it is doing. 

```
- client - see in Client readme
- controllers
    * authController.js
    * index.js
    * notesController.js
    * usersController.js
- models
    * index.js
    * post.js
    * user.js
- utils
    * middleware.js
    * schema.sql
    * verifyConfiguration.js
* .eslintignore
* .eslintrc.json
* .gitignore
* .travis.yml
* package.json
* README.md
* server.js
```

### Structure Explanation
 
- **controllers**: Our controllers. All of them are using Express router to make them as clean as possible. 
    * **index.js** This is where you *register* an API controller. First import it, then attach it to a route. This is so we only have to write what path the controller is on *once*. This is imported by ```server.js```.  
    * **notesController.js**: An example RESTful controller for Notes. Notice how the only part of the route we configure is the params and final part of it. This is because the rest of the routing is handled in the index files.   
    * **usersController.js**; An example RESTful controller for User.
    * authController.js: Authentication controller to enable authentication. Exposes two routes, read up on them to understand, and if you change the layout or structure of the login/signup pages you may need to change this. 
- models
    * index.js: Exports our mongoose models
    * **note.js**: An example model 
    * **user.js**: Our user model. Change this at your own risk. It has two key fields, ```username``` and ```password```. All of authentication relies on this. Look at the user/auth controllers to see how to access ```password``` *IF* you need it. It also uses bcryprt.js to encrypt and check our passwords. 
- utils
    * middleware.js: Currently just holding our isAuthenticated middleware. Put any middleware you need in here so we can just import middleware without changing imports.
    * verifyConfiguration.js: Configuration checker, to make sure that everything is configured correctly in the .env.
* .eslintignore: What files eslint should ignore. *Always* ignore node_modules unless you want to crash eslint.
* .eslintrc.json: What configuration we want for ESLint. A default, barely intrusive version.
* .gitignore: Our configuration for git
* .travis.yml: Our configuration for Travis CI. If you don't enable Travis, this doesn't do anything.
* package.json: The package.json
* README.md: This file.
* **server.js**: Our entry point. It handles all the top level imports, hooking up our express instance with all the middleware, including authentication and the router, and then initializes a sequelize connection and the server listening. 


## How to modify:

### I want to add a model.

Add the model to the ```models``` folder. Then add it to ```index.js``` in the models folder.

### I want to add an API controller to expose data

Based on the model, you need to: 
- Create a ```modelController``` in the ```controllers``` folder. 
- Add all routes you need. 
- Register the controller in the ```controllers/index.js``` file. 

### I want to add a page

Go to the client. This is all backend.
## Deployment

Please follow the configuration guide supplied in Unit 18/19/20. You will need to: 

- Configure a Heroku application
- Configure the mongo atlas db connection, and pass in the URI into the ```MONGODB_URI``` config.
- Pass the config var ```NODE_ENV = production``` in the deployed version. 

## Built With

* [Express](https://expressjs.com/) - Express, our web framework
* [Morgan](https://www.npmjs.com/package/morgan) - Morgan, an improved logging library that works nicely with Express. Now, all requests to our server get logged out in the console. 
* [Mongoose](https://mongoosejs.com/) - Mongoose, our ORM
* [express-jwt](https://www.npmjs.com/package/express-jwt) - A small library that checks JWTs for us. This is what passport did for us last time!
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - Small library for generating JWTs. Used instead of passport for visibility and so we don't have a magic library chilling there.

## Further reading:

* [JWTs Specification](https://tools.ietf.org/html/rfc7519)
* [Easier to read JWTs](https://jwt.io/introduction/)
## License

This project is licensed under the MIT License.

