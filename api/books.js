// Imports
require('dotenv').config();
const express = require('express');
const router = express.Router();
const passport = require('passport');



// Models
const { Book } = require('../models');
   
// Controllers
const index = async (req, res) => {
    console.log('inside of /api/books');
    try {
        const allBooks = await Book.find({});

        res.json({ books: allBooks });
    } catch (error) {
        console.log('Error inside of /api/books');
        console.log(error);
        return res.status(400).json({message: 'books no found. Please try again.'})
    }

}

const show = async (req, res) => {
    const { id } = req.params;
    //look for book based on id
   try {

    const book = await Book.findById(id);
    res.json({ book });
   } catch (error) {
       console.log('Error inside of /api/books/:id');
       console.log(error);
       return res.status(400).json({ message: 'Book not found. Try again...'});
   }
    
}

const create = async (req, res) => {
    const { title, author, price, pages, isbn, genre } = req.body;

    try {
        const newBook = await Book.create(req.body);
        console.log('new book created', newBook);
        res.json({ book: newBook });
    } catch (error) {
        console.log('Error inside of POST /api/books');
        console.log(error);
        return res.status(400).json({ message: 'Book was not created. Please try again'})
    }

}

const update = async (req, res) => {
    console.log(req.body);
    try {
        const updatedBook = await Book.update({title: req.body.title}, req.body)
        const book = await Book.findOne({title: req.body.title});
        console.log(updatedBook)
        console.log(book);

        book.author = req.body.author;
        book.genre = req.body.genre;
        book.isbn = req.body.isbn;
        book.price = req.body.price;
            // save informarition
            const saveBook = await book.save();

            res.redirect(`/api/books/${book.id}`)
    } catch (error) {
        console.log('Error inside of UPDATE route');
        console.log(error);
        res.status(400).json({message: 'Book could not be updated. Please try again'})
    }
}

const deleteBook = async (req, res) => {
    const { id } = req.params;

    try {
        console.log(id)
        const result = await Book.findByIdAndRemove(id)
        console.log(result);
        res.redirect('/api/books');
    } catch (error) {
        console.log('inside of DELETE route');
        console.log(error);
        return res.status(400).json({ message: 'Book was not deleted. Please try again'})
    }
}


// GET api/books/test (Public)
router.get('/test', (req, res) => {
    res.json({ msg: 'Books endpoint OK!'});
});

router.get('/', index); // route is not currently protected


router.get('/:id', show);

//POST => /api/books
router.post('/',  passport.authenticate('jwt', { session: false }), create);

//PUT => /api/books
router.put('/', update);

//DELETE => /api/books/:id
router.delete('/:id', passport.authenticate('jwt', { session: false }), deleteBook);

module.exports = router;