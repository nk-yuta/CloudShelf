const mongoose = require("mongoose"),
    bookSchema = mongoose.Schema({
        isbn: String,
        title: String,
        author: String,
        publisher: String,
        rakuten_url: String,
        rakuten_img_url: String
    });

module.exports = mongoose.model("book", bookSchema);