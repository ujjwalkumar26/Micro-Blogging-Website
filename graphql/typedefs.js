const gql = require('graphql-tag');
const typeDefs = gql`

    type Post {
        id: ID!
        body: String!
        createdAt: String!
        username: String!
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
    }

`
module.exports = typeDefs;