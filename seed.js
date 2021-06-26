const { Book } = require('./models');

Book.create(
[
    {
        title: 'Book 1',
        author: 'Author 1',
        pages: 199,
        genre: 'Design',
        price: 15,
        isbn: 21930392983899
    },
    {
        title: 'Book 2',
        author: 'Author 1',
        pages: 199,
        genre: '3d printing',
        price: 15,
        isbn: 21930392983898
    },
    {
        title: 'Book 3',
        author: 'Author 1',
        pages: 199,
        genre: 'Business',
        price: 15,
        isbn: 21930392983897
    },
    {
        title: 'Book 4',
        author: 'Author 1',
        pages: 199,
        genre: 'Fashion',
        price: 15,
        isbn: 21930392983896
    }
], (err, results) => {
    console.log(results);
});

