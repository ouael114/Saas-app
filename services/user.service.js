const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const Enums = require('../models/enums')
const User = require('../models/user')
const NotFoundError = require('../errors/notFoundError')
const BadRequestError = require('../errors/badRequestError');
const UnauthorizedError = require('../errors/unauthorizedError');

module.exports = {
   
    login: async (body) => {
        const user = await User.findOne({ email: body.email }).lean()
        if(!user) throw new NotFoundError("there's no account with this email")
        else if(!await bcrypt.compare(body.password, user.password)) throw new UnauthorizedError("incorrect password")
        else {
            const token = jwt.sign({
                    role: user.role,
                    user: user._id
                }, process.env.SECRET, { expiresIn: '2h' })
            user.token = token
            return user
        }
    },
    signup: async (body) => {
        const user = await User.findOne({email: body.email})

        if(user) throw new NotFoundError('user already exists')
        else {
            const newUser = new User(body)
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newUser.password, salt);
            newUser.password = hashedPassword

            if(!newUser.role) newUser.role = 'MEMBER'
            await newUser.save()
            return newUser
        }
        
    }
}