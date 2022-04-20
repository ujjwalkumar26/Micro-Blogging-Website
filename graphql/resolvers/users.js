const bcrpyt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {UserInputError} = require('apollo-server');

const User = require('../../models/User');
const {SECRET_KEY} = require('../../config');
const {userRegisterValidator, userLoginValidator} = require('../../util/validators');


const generateToken =  (user) => {
    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            username: user.username
        }, 
        SECRET_KEY, 
        {
            expiresIn: '1h'
        }
    );
    return token;
}


const userResolvers = {
    Query: {
        
    },

    Mutation: {
        async registerNewUser (
            parent,
            {
                registerInput: {
                    username,
                    email,
                    password,
                    confirmPassword
                }
            }
            , context
            , info
        ) 
        {
            const {errors, valid} = userRegisterValidator(username, email, password, confirmPassword);
            if(!valid) {
                // console.log(errors);
                throw new UserInputError('Input Errors', { errors });
            }

            password = await bcrpyt.hash(password, 12);
            
            const userExists = await User.findOne({username: username})
            if(userExists) {

                // console.log('Already Exists!');
                throw new UserInputError('Already Exisiting user', {
                    errors: {
                        username: `Username ${username} is already taken`
                    }
                });

            }

            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            });

            const res = await newUser.save();

            const token = generateToken(res);

            return {
                ...res._doc,
                id: res.id,
                token
            }

        },

        async loginUser(
            parent,
            {
                username, 
                password
            }
            , context
            , info
        ) {
            const {errors, valid} = userLoginValidator(username, password);
            if(!valid) {
                throw new UserInputError('Input Errors', { errors });
            }
            const validUser = await User.findOne({username});
            if(!validUser) {
                errors.general = 'Username not found';
                throw new UserInputError('Input Errors', {errors});
            }
            else {
                const match = await bcrpyt.compare(password, validUser.password);
                if(!match) {
                    errors.general = 'Incorrect Password';
                    throw new UserInputError('Input Errors', {errors});
                }
            }
            const token = generateToken(validUser);

            return {
                ...validUser._doc,
                id: validUser.id,
                token
            }
        }
    }
}

module.exports = userResolvers;