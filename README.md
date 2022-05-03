# MICROBLOGGER

### A Blogging website built using MERN and GraphQL. 

Every user has a unqiue avatar and can create posts, likes and comments.

Here is how you can run this code in your local environment:

1. Pull the code in your local environment.
2. Create a MongoDB cluster and a database.
3. Create a config.js file in root directory.
4. In config.js, export an object:



```
    module.exports = {

        SECRET_KEY: "secretkey",

        MONGODB: "connectionURL"

    }

```
5. In both frontend and root directory, run npm i command to install the dependencies.

㊗️ Voilà, you are good to go!

Here is an awesome avatar generator that I used: [dicebear](https://avatars.dicebear.com/).
