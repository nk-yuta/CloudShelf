const axios = require('axios');

const utils = require("../utils");

var books = [
    {
        title: "帰ってきたヒトラー 上",
        author: "T・ヴェルメシュ"
    },
    {
        title: "帰ってきたヒトラー 下",
        author: "T・ヴェルメシュ"
    }
];

exports.showIndex = (req, res) => {
    res.render("index");
}

exports.showBooks = (req, res) => {
    res.render("books", {
        registerdBooks: books
    });
};

exports.showRegister = (req, res) => {
    const data = {
        isbn: "",
    }
    res.render("register", data);

};

exports.searchISBN = (req, res) => {
    const input_isbn = req.body.isbn;
    const book_items = utils.callBooksAPI(input_isbn);
    book_items.then(function (val) {
        //console.log("val:")
        
        //console.log(val[0].Item.author);

        const data = {
            isbn: input_isbn,
            item: val,
        }
        res.render("register", data);
    })

};