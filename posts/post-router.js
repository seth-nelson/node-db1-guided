const express = require('express');

// 
const knex = require('../data/db-config.js')

// database access using knex
const db = require('../data/db-config.js');

const router = express.Router();


// STANDARD METHOD WITH PROMISE
// router.get('/', (req, res) => {
//     knex('posts')
//         .then(posts => {
//             res.json(posts)
//         })
//         .catch(err => {
//             console.log(err)
//             res.json(500).json({ message: 'Problem with DB.'})
//         })
// });


// ASYNC METHOD PREFERRED
router.get('/', (req, res) => {
    try {
        const posts = knex('posts')
        res.json(posts);
    }
    catch (err) {
        console.log(err)
        res.json(500).json({ message: 'Problem with DB.'})
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const post = await knex('posts').where({ id });
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ message: 'Problem with the db.', error: err });
    }
});

router.post('/', (req, res) => {

});

router.put('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

module.exports = router;