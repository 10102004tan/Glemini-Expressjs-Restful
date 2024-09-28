'use strict';
const {BadRequestError} = require('../cores/error.repsone');

class AccessSevice {
    static async signup({email}){
        //TODO: Implement signup service
        //const user = await User.find()...
        //return user
        return {
            name: "John Doe",
            email: "test@gmail.com"
        }
    }

    static async login({email}){
        //TODO: Implement login service
        if (email == ""){
            throw new BadRequestError("Email is required");
        }

        //const user = await User.find()...
        return {
            'name': "John Doe",
        }
    }
}

module.exports = AccessSevice;