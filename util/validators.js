const userRegisterValidator = (
    username,
    email,
    password,
    confirmPassword
) => {
    const errors = {};
    if(username.trim() === '') {
        errors.username = 'Username cannot be empty';
    }
    if(email.trim() === '') {
        errors.email = 'Email cannot be empty';
    }
    else {
        const regEx =  /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if(!email.match(regEx)) {
            errors.email = 'Email is invalid';
        }
    }
    if(password === '') {
        errors.password  = 'Password cannot be empty';
    }
    if(confirmPassword === '') {
        errors.confirmPassword  = 'Confirm password cannot be empty';
    }
    else if(password.length < 6) {
        errors.password = 'Password should be of length at least 6';
    }
    else {
        if(password != confirmPassword) {
            errors.confirmPassword = 'Passwords dont match';
        }
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

const userLoginValidator = (username, password) => {
    const errors = {};
    if(username.trim() === '') {
        errors.username = 'Username cannot be empty';
    }
    if(password === '') {
        errors.password  = 'Password cannot be empty';
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

module.exports = { userRegisterValidator, userLoginValidator };