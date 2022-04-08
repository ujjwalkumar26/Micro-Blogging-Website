const { create } = require('../../models/Post');
const Post = require('../../models/Post');
const check_auth = require('../../util/auth');
const postResolvers = {
    Query: {
        async getPosts() {
            try{
                const posts = await Post.find();
                return posts;
            } catch(err) {
                throw new Error(err);
            }
        },
        async getPost(_, { postId }, context, info) {
            try{
                const post = await Post.findById(postId);
                if(post) {
                    return post;
                }
                else throw new Error('Post Not found!');
            } catch(err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        async createPost(
            parent,
            {
               body    
            }
            , context
            , info
        ) {        
            const user = check_auth(context);
            const newPost = new Post( {
                body,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString()
            })    
            const post = await newPost.save();
            return post;
        }
    }
}
module.exports = postResolvers;