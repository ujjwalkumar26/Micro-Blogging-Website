const { AuthenticationError } = require('apollo-server');
const { UserInputError } = require('apollo-server');

const Post = require('../../models/Post');
const check_auth = require('../../util/auth');

const postResolvers = {

    Query: {
        async getPosts(parent, args, context, info) {
            try{
                const user = check_auth(context);
                if(user) {
                    const posts = await Post.find().sort({createdAt: -1});
                    return posts;
                }
                else throw new AuthenticationError("Login Again");
            } catch(err) {
                throw new Error(err);
            }
        },
        async getPost(_, { postId }, context, info) {
            try{
                const user = check_auth(context);
                if(user) {
                    const post = await Post.findById(postId);
                    if(post) {
                        return post;
                    }
                    else throw new Error('Post Not found!');
                }
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
        },
        async deletePost(
            parent, 
            {
                id
            }
            , context
            , info
        ) {
            const user = check_auth(context);
            try {
                const post = await Post.findById({_id: id});
                if(post.username == user.username) {
                    await post.delete();
                    return true;
                }
                else throw new AuthenticationError('Invalid User')
            }
            catch(err){
                throw new Error(err);
            }        
        },

        async createComment(
            parent, 
            {
                postId,
                body
            }
            , context
            , info
        ) {
            const { username } = check_auth(context);

            if(body.trim() === '') {
                throw new UserInputError("Empty Comment cannot be posted", {
                    errors: {
                        body: "Comment cannot be empty"
                    }
                });
            }
            
            try {
                const post = await Post.findById(postId);
                if(post) {
                    console.log(post);
                    post.comments.unshift({
                        body,
                        username,
                        createdAt: new Date().toISOString()
                    });
                    await post.save();
                    return post;
                }
                else throw new UserInputError("Post not found");
            } catch(err) {
                throw new Error(err);
            }
        }, 
        
        async deleteComment(
            parent, 
            {
                postId,
                commentId
            }
            , context
            , info
        ) {
            const user = check_auth(context);
            if(user) {
                const post = await Post.findById(postId);
                if(post) {
                    const commentIndex = post.comments.findIndex(c => c.id === commentId);
                    if(post.comments[commentIndex].username === user.username) {
                        post.comments.splice(commentIndex, 1);
                        await post.save();
                        return post;
                    }
                    else throw new AuthenticationError("Action not allowed");
                }
                else throw new UserInputError("Post not found!");
            }
            else {
                throw new AuthenticationError("Invalid user, delete comment not allowed");
            }
        },

        async likePost(
            parent, 
            {
                postId
            } 
            , context
            , info
        ) {
            const user = check_auth(context);
            if(user) {
                const post = await Post.findById(postId);
                if(post) {
                    if(post.likes.find(like => like.username === user.username)) {
                        post.likes = post.likes.filter(like => like.username !== user.username);
                    }
                    else {
                        //Not liked
                        post.likes.unshift({
                            username: user.username, 
                            createdAt: new Date().toISOString()
                        });
                    }
                    await post.save();
                    return post;
                }
                else throw new UserInputError("Post not found");
            }
            else {
                throw new AuthenticationError("Invalid User");
            }
        }

    }
}
module.exports = postResolvers;