var express = require("express");
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const psRoutes = require('./routes/psreset');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware'); 

var app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

app.get('*', checkUser);
app.get("/", (req, res) => {
    res.render("index");
});
app.get('/home', requireAuth, (req, res) => res.render('home'));
app.use(authRoutes);
app.use(psRoutes);


const PORT = process.env.PORT || 3000;
mongoose.connect('mongodb+srv://Rakesh:s2lHIX80lmyWUx6P@cluster0.4qgsg.mongodb.net/ctfsite', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(()=>{app.listen(PORT)
    console.log(`Server is running on port ${PORT}.`);
    console.log(`To open application open here http://localhost:${PORT}`)
}).catch((err) => console.log(err));