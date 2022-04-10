const postResolvers = require('./posts');
const userResolvers = require('./users');

const resolvers = {
    Post: {
        likeCount: (parent) => parent.likes.length,        
        commentCount: (parent) => parent.comments.length
    },

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
