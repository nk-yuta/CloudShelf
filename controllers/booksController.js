const Book = require("../models/book");
const utils = require("../utils");

exports.getAllBooks = (req, res) => {
    Book.find({})
        .exec()
        .then((books) => {
            res.render("books", {
                registerdbooks: books
            });
        })
        .catch((error) => {
            console.log(error.meessage);
            return [];
        })
        .then(() => {
            console.log("promise complete");
        });
};

exports.saveBook = (req, res) => {
    const input_isbn = req.body.isbn;
    const book_items = utils.callBooksAPI(input_isbn);
    book_items.then((Items) => {
        let newBook = new Book ( {
            isbn: Items[0].Item.isbn,
            title: Items[0].Item.title,
            author: Items[0].Item.author,
            publisher: Items[0].Item.publisherName,
            rakuten_url: Items[0].Item.itemUrl,
            rakuten_img_url: Items[0].Item.largeImageUrl
        });
        console.log(newBook);

        newBook.save()
        .then(result => {
            console.log("... saved this book")
            res.render("register");
        })
        .catch(error => {
            console.log(error);
            res.send(error);
        });
    })
    // let newBook = new Book ( {
    //     title: req.body.title,
    //     author: req.body.author,
    //     publisher: req.body.publisher,
    //     rakuten_url: req.body.rakuten_url,
    //     rakuten_img_url: req.body.rakuten_img_url
    // });    
};

exports.deleteBook = (req, res) => {
    const isbn = req.body.isbn;
    Book.find(
        {isbn: isbn}
    , 'isbn', function(err, book){
        const id = book[0]._id;
        console.log(book[0]._id);
        Book.findByIdAndDelete(id)
        .then(() => {
            res.locals.redirect = "/books";
        })
        .catch(error => {
            console.log("error happend when delete book.");
            console.log(error.meessage);
        })
    });
    
}