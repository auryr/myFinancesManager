const express     = require("express");
const logger      = require("morgan");
const path        = require("path");
const bodyParser  = require("body-parser");
const cookieParser= require("cookie-parser");
const session     = require("express-session");
const passport    = require("passport");

const app = express();
require('dotenv').config();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
    session({
        key: process.env.SECRET_KEY,
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: true,
    }),
)

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public'));
const PORT = process.env.PORT || 3001;

app.listen(PORT,()=>{
  console.log(`App listening on port ${PORT}`)
});

// app.get('/home', (req, res) => {
//   res.send('Page loaded');
// });

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// app.set('images', path.join(__dirname, 'public/images'));

const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes)

const userRoutes = require("./routes/userRoutes");
app.use("/users", userRoutes)

const categoryRoutes = require("./routes/categoryRoutes");
app.use("/categories", categoryRoutes);

const transactionRoutes= require("./routes/transactionRoutes");
app.use("/transactions", transactionRoutes);

// const noteRoutes= require("./routes/noteRoutes");
// app.use("/notes", noteRoutes);

const budgetsRoutes= require("./routes/budgetRoutes");
app.use("/budgets",budgetsRoutes);


app.get("*",(req, res)=>{
  res.status("404").json({
    message: "Page Not found(404)",
  })
})
