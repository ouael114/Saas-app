const companyService = require('../services/company.service')

module.exports = {
    createCompany: async (req, res) => {
        const company = await companyService.createCompany(req.body)
        return res.json(company)
    },
    addMemberToCompany: async (req, res) => {
        await companyService.addMemberToCompany(req.body)
        return res.sendStatus(204)
    }
}