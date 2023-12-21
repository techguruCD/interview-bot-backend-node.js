const db = require('../db')
exports.users = async (req, res) => {
    const {page, pageSize = 10} = req.query
    const totalCount = await db.user.count()
    const totalPage = Math.ceil(totalCount / pageSize)
    const users = await db.user.findAll({
        limit: pageSize,
        offset: pageSize * (page - 1),
        include: [
            {
              model: db.profile,
              as: 'profile',
            }
        ]
    })
    return res.json({
        data: {
            users,
            page,
            totalPage,
            totalCount
        },
    })
}
exports.setting = async (req, res) => {
    const setting = await db.setting.findOne({})
    return res.json({
        data: setting
    })
}

exports.updateSetting = async (req, res) => {
    const {usersLimit, sitePrompt} = req.body
    const setting = await db.setting.findOne({});
    await setting.update({
        usersLimit, sitePrompt
    })
    res.json({
        message: {success: 'Settings updated successfully'}
    })
}