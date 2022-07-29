require('dotenv').config()
const env = process.env;

const express = require("express"),
    app = express();

app.use(
    express.urlencoded({
            extended: false
    })
);
app.use(express.json());

const session = require('express-session');
const bodyparser = require('body-parser');
const layouts = require("express-ejs-layouts");
const { default: mongoose } = require("mongoose");
mongoose.Promise = global.Promise;
app.set("view engine", "ejs");
//app.use(layouts);

const sess = {
    secret: 'secret',
    cookie: { maxage: 10000},
    resave: false,
    saveUninitialized: false,
}
app.use(session(sess));

const mongodb_uri = env.MONGODB_URI;
mongoose.connect(
    mongodb_uri,
    {useNewUrlParser: true,
     useUnifiedTopology: true}
);
const db = mongoose.connection;
db.prependOnceListener("open", () => {
    console.log("connected mongoDB");
})

app.set("port", process.env.PORT || 3000);

const homeController = require("./controllers/homeContoroller");
const bookController = require("./controllers/booksController");

app.get("/", homeController.showIndex);
app.get("/signin", homeController.showSignin)

// ログイン試行
app.post("/signin", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email, password)
    if (email == "adm@example.com" && password == "password"){
        req.session.regenerate((err) => {
            req.session.username = "admin";
            res.redirect("/books");
        });
    } else {
        res.redirect("/signin");
    }
})

// ログインしているかチェックするミドルウェア
app.use((req, res, next) => {
    if (req.session.username) {
      next();
    } else {
      res.redirect('/signin');
    }
  });

app.get("/signup", homeController.showSignup)

app.get("/books", bookController.getAllBooks, 
    (req, res, next) => {
        console.log(req.data);
        res.render("books", {registerdbooks: req.data});
    });
app.get("/register", homeController.showRegister);

// app.post("/signup", (req, res) => {

// })

app.post("/register/search-isbn", homeController.searchISBN);
app.post("/register/register-book", bookController.saveBook);

app.post("/register/delete-book", bookController.deleteBook);

app.listen(app.get("port"), () => {
    console.log(
        `Server is runnning at http://localhost:${app.get("port")}`
    );
});

