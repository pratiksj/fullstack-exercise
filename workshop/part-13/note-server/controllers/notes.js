const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { Op } = require('sequelize')
const { tokenExtractor } = require('../util/middleware')

const { Note, User } = require('../model')
const { SECRET } = require('../util/config')


router.get('/', async (req, res) => {

    const where = {}
    if (req.query.important) {
        where.important = req.query.important === 'true'
    }
    if (req.query.search) {
        where.content = {
            [Op.substring]: req.query.search
        }
    }
    const notes = await Note.findAll({
        attributes: { exclude: ['userId'] },
        include: {
            model: User,
            attributes: ['name']
        },
        where
    })
    res.json(notes)
})

router.post('/', tokenExtractor, async (req, res) => {
    try {
        const user = await User.findByPk(req.decodedToken.id)

        const note = await Note.create({ ...req.body, userId: user.id, data: new Date() })
        res.json(note)
    } catch (error) {
        return res.status(400).json({ error })
    }
})

router.get('/:id', async (req, res) => {
    const note = await Note.findByPk(req.params.id)
    if (note) {
        res.json(note)
    } else {
        res.status(404).end()
    }
})

router.delete('/:id', async (req, res) => {
    const note = await Note.findByPk(req.params.id)
    if (note) {
        await note.destroy()
    }
    res.status(204).end()
})

const isAdmin = async (req, res, next) => {
    const user = await User.findByPk(req.decodedToken.id)
    if (!user.admin) {
        return res.status(401).json({ error: 'operation not allowed' })
    }
    next()
}
router.put('/:username', tokenExtractor, isAdmin, async (req, res) => {
    const user = await User.findOne({
        where: {
            username: req.params.username
        }
    })

    if (user) {
        user.disabled = req.body.disabled
        await user.save()
        res.json(user)
    } else {
        res.status(404).end()
    }
})

router.put('/:id', async (req, res) => {
    const note = await Note.findByPk(req.params.id)
    if (note) {
        note.important = req.body.important
        await note.save()
        res.json(note)
    } else {
        res.status(404).end()
    }
})

module.exports = router