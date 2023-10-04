const router = require('express').Router()

const { User, Note, Team } = require('../model')
const { tokenExtractor } = require('../util/middleware')


router.get('/', async (req, res) => {
    //const users = await User.scope("defaultScope").findAll({
    const users = await User.findAll({
        include: [{
            model: Note,
            //attributes: { exclude: ['userId'] }
        },
        {
            model: Team,
            attributes: ['name', 'id'],
            through: {
                attributes: []
            }
        }

        ]
    })
    const userWithNotes = await User.with_notes(0)
    res.json({ ...users, userWithNotes })
})

router.post('/', async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.json(user)
    } catch (error) {
        return res.status(400).json({ error })
    }
})

router.get('/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id, {
        attributes: { exclude: [''] },
        include: [{
            model: Note,
            attributes: { exclude: ['userId'] }
        },
        {
            model: Note,
            as: 'marked_notes',
            attributes: { exclude: ['userId'] },
            through: {
                attributes: []
            },
            include: {
                model: User,
                attributes: ['name']
            }
        },
            // {
            //     model: Team,
            //     attributes: ['name', 'id'],
            //     through: {
            //         attributes: []
            //     }
            // },
        ]

    })

    // if (user) {
    //     // user.notes.forEach((note) => {
    //     //     console.log(note.content)
    //     // });
    //     res.json(user)

    // } else {
    //     res.status(404).end()
    // }

    if (!user) {
        return res.status(404).end();
    }

    let teams = undefined
    if (req.query.teams) {
        teams = await user.getTeams({
            attributes: ['name'],
            joinTableAttributes: []
        })
    }
    console.log(user, 'usernote')
    let noteNumber = await user.number_of_notes()
    console.log(noteNumber, 'from indivial ntoe')
    res.json({ ...user.toJSON(), teams, noteNumber });

    //res.json({ ...user.toJSON(), teams })


})

// const isAdmin = async (req, res, next) => {
//     const user = await User.findByPk(req.decodedToken.id)
//     if (!user.admin) {
//         return res.status(401).json({ error: 'operation not allowed' })
//     }
//     next()
// }
router.put('/:username', async (req, res) => {
    console.log(req.params.username, 'before')
    const user = await User.findOne({
        where: {
            username: req.params.username
        }
    })
    console.log(user, 'helhelhe')

    if (user) {
        user.disabled = req.body.disabled
        await user.save()
        res.json(user)
    } else {
        res.status(404).end()
    }
})


module.exports = router