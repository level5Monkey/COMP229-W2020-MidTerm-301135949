//Jiaxing Li, 301135949, COMP229-W2020-MidTerm
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
// create a reference to the model
let Books = require('../models/books');

module.exports.displayBookListPage =  (req, res, next) => {
    // find all books in the books collection
    Books.find( (err, booksToShow) => {
      if (err) {
        return console.error(err);
      }
      else {
        res.render('books/index', {
          title: 'Books',
          books: booksToShow
        });
      }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('books/details', {title: 'Add a Book', books: ''})          
}

module.exports.processAddPage = (req, res, next) => {
    let newBook = Books({
        "Title": req.body.title,
        "Description": req.body.description,
        "Price": req.body.price,
        "Author": req.body.author,
        "Genre": req.body.genre
    });

    Books.create(newBook, (err, Book) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the books
            res.redirect('/book-list');
        }
    });

}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Books.findById(id, (err, booksToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('books/details', {title: 'Edit Books', books: booksToEdit})
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedBooks = Books({
        "_id": id,
        "Title": req.body.title,
        "Description": req.body.description,
        "Price": req.body.price,
        "Author": req.body.author,
        "Genre": req.body.genre
    });
    Books.updateOne({_id: id}, updatedBooks, (err) => {
        if(err)
        {
            console.log('fail');
            console.log(err);
            res.end(err);
        }
        else
        {
            console.log(id);
            console.log(updatedBooks);
            console.log('update Books success');
            // refresh the books list
            res.redirect('/book-list');
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Books.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
             // refresh the books list
             res.redirect('/book-list');
        }
    });
}