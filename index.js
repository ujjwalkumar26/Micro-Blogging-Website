const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const {MONGODB} = require('./config');
const typeDefs = require('./graphql/typedefs');
const resolvers = require('./graphql/resolvers');

const PORT = process.env.port || 5000;

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req })
});

mongoose.connect(MONGODB)
        .then(() => {
            console.log('Connected to MongoDB')
            return server.listen({ port: PORT});
        })
        .then(res => {
            console.log(`Server running at ${res.url}`);
        })
        .catch(err => console.log(err))