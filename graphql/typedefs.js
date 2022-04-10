const gql = require('graphql-tag');
const typeDefs = gql`

    type Post {
        id: ID!
        body: String!
        createdAt: String!
        username: String!
        comments: [Comment]!
        likes: [Like]!
        likeCount: Int!
        commentCount: Int!
    }

    type Comment {
        id: ID!
        body: String!
        username: String!
        createdAt: String!
    }

    type Like {
        id: ID!
        username: String! 
        createdAt: String!
    }

    type User {
        username: String!
        id: ID!
        createdAt: String!
        email: String!
        token: String!
    }

    type Query {
        getPosts: [Post]
        getPost(postId: ID!): Post
    }

    input RegisterInput {
        username: String!
        email: String!
        password: String!
        confirmPassword: String!
    }    

    type Mutation {
        registerNewUser(registerInput: RegisterInput): User!
        loginUser(username: String!, password: String!): User!
        createPost(body: String!): Post!
        deletePost(id: ID!): Boolean!
        createComment(postId: ID!, body: String!): Post!
        deleteComment(postId: ID!, commentId: ID!): Post!
        likePost(postId: ID!): Post!
    }

`
module.exports = typeDefs;