const NotFoundError = require('../errors/notFoundError')
const BadRequestError = require('../errors/badRequestError')
const Company = require('../models/company')
const User = require('../models/user')
const userService = require('../services/user.service')
const UnauthorizedError = require('../errors/unauthorizedError')

module.exports = {
    createCompany: async (body) => {
        const admin = await User.findOne({ email: body.adminEmail })
        if(!admin) throw new NotFoundError('user introuvable')
        else {
            body.adminId = admin._id
            
            const newCompany = new Company(body)
            await newCompany.save()

            admin.companyId =  newCompany._id
            await admin.save()       
            return newCompany
        }
    },
    addMemberToCompany: async (body) => {
        const company = await Company.findOne({ nom: body.nom })
        if(!company) throw new NotFoundError('company introuvable')
        else{
            if((company.users.length+1) < company.license){
               
                const user = await userService.signup(body.user)
                company.users.push(user._id)
                await company.save()
            }else{
                throw new UnauthorizedError('you reached maximum users authorrized')
            }
        }
  
    }
}