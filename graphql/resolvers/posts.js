const Post = require('../../models/Post');

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
                   
            }
            , context
            , info
        ) {
            

            return {
                
            }
        }
    }
}
module.exports = postResolvers;