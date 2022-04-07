const postResolvers = require('./posts');
const userResolvers = require('./users');

const resolvers = {
    Query: {
        ...postResolvers.Query,
        ...userResolvers.Query
    },
    Mutation: {
        ...postResolvers.Mutation,
        ...userResolvers.Mutation
    }
}
module.exports = resolvers;
