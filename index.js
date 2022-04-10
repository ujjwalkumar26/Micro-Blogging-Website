const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const {MONGODB} = require('./config');
const typeDefs = require('./graphql/typedefs');
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req })
});

mongoose.connect(MONGODB)
        .then(() => {
            console.log('Connected to MongoDB')
            return server.listen({ port: 5000});
        })
        .catch(err => err);

server.listen({port: 5000})
        .then(res => {
            console.log(`Server running at ${res.url}`);
        })