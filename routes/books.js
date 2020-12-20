const express = require('express');
const router = express.Router();
const Book = require('../models').Book;


function asyncHandler(cb) {
    return async(req, res, next) => {
        try {
            await cb(req, res, next)
        } catch (error) {
            // Forward error to the global error handler
            next(error);
        }
    }
}

router.get('/', asyncHandler(async(req, res) => {
    const books = await Book.findAll();
    res.render('index', { books });
}));

router.get('/new', asyncHandler(async(req, res) => {
    const books = await Book.findAll();
    res.json(books)
}));

router.post('/new', asyncHandler(async(req, res) => {
    const books = await Book.findAll();
    res.json(books)
}));

router.get('/:id', asyncHandler(async(req, res) => {
    const books = await Book.findAll();
    res.json(books)
}));

router.post('/:id', asyncHandler(async(req, res) => {
    const books = await Book.findAll();
    res.json(books)
}));

router.post('/:id/delete', asyncHandler(async(req, res) => {
    const books = await Book.findAll();
    res.json(books)
}));


module.exports = router;