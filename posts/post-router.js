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


router.post('/', async (req, res) => {
    const postData = req.body;
    try {
        const numPosts = await knex('posts').insert(postData);
        res.status(201).json(numPosts);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'problem with db', error:err});
    }
});


router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const newPost = req.body;
    try {
        const count = await knex('posts').update(newPost).where({ id });
        if (count) {
            res.json({ updated: count });
        } else {
            res.status(404).json({ message: 'invalid id' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'problem with db', error: err });
    }
});


router.delete('/:id', (req, res) => {
    const { id } = req.params

    try {
        const count = await knex('posts').del().where({ id });
        if (count) {
            res.json({deleted: count});
        } else {
            res.status(404).json({ message: 'Invalid supplied id.'});
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Problem with db.', error: err});
    }
});

module.exports = router;