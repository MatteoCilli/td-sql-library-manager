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
    res.render("books/new", { book: {}, title: "New Book" });
}));

router.post('/', asyncHandler(async(req, res) => {
    let book;
    try {
        book = await Book.create(req.body);
        res.redirect("/");
    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            book = await Book.build(req.body);
            res.render("books/new", { book, errors: error.errors, title: "New Article" });
        } else {
            throw error;
        }
    }
}));

router.get('/:id', asyncHandler(async(req, res) => {
    const book = await Book.findByPk(req.params.id);
    if (book) {
        res.render('books/edit', { book, title: 'Update Book' });
    } else {
        const err = new Error('Not Found');
        err.status = 404;
        throw err;
    }
}));

router.post('/:id', asyncHandler(async(req, res) => {
    let book;
    try {
        book = await Book.findByPk(req.params.id);
        if (book) {
            await book.update(req.body);
            res.redirect("/");
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            book = await Book.build(req.body);
            book.id = req.params.id;
            res.render("books/edit", { book, errors: error.errors, title: "Update Book" });
        } else {
            throw error;
        }
    }
}));

router.post('/:id/delete', asyncHandler(async(req, res) => {
    const book = await Book.findByPk(req.params.id);
    if (book) {
        await book.destroy();
        res.redirect("/");
    } else {
        const err = new Error('Not Found');
        err.status = 404;
        throw err;
    }
}));


module.exports = router;