

const express = require("express"),
    app = express();

app.use(
    express.urlencoded({
            extended: false
    })
);
app.use(express.json());

const layouts = require("express-ejs-layouts");
const { default: mongoose } = require("mongoose");
mongoose.Promise = global.Promise;
app.set("view engine", "ejs");
//app.use(layouts);

mongoose.connect(
    "mongodb://localhost:27017/book_db",
    {useNewUrlParser: true}
);
const db = mongoose.connection;
db.prependOnceListener("open", () => {
    console.log("connected mongoDB");
})


app.set("port", process.env.PORT || 3000);

const homeController = require("./controllers/homeContoroller");
const bookController = require("./controllers/booksController");

app.get("/", homeController.showIndex);
app.get("/books", bookController.getAllBooks, 
    (req, res, next) => {
        console.log(req.data);
        res.render("books", {registerdbooks: req.data});
    });
app.get("/register", homeController.showRegister);
app.post("/register/search-isbn", homeController.searchISBN);
app.post("/register/register-book", bookController.saveBook);


app.listen(app.get("port"), () => {
    console.log(
        `Server is runnning at http://localhost:${app.get("port")}`
    );
});

