//Jiaxing Li, 301135949, COMP229-W2020-MidTerm
let mongoose = require('mongoose');

// create a model class
let Books = mongoose.Schema({
    Title: String,
    Description: String,
    Price: Number,
    Author: String,
    Genre: String
},
{
  collection: "books"
});

module.exports = mongoose.model('Books', Books);
