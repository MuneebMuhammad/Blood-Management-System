let express = require("express");
let logger = require("morgan")
let app = express();

app.use(logger(":method :url"))
app.set('views', 'views')
app.set('view engine', 'ejs')

app.use(express.static('views'))

app.get('/', (req, res)=>{
    res.render("startup")
})

app.get('/login', (req, res)=>{
    res.send('Login here')
})

app.get('/signup', (req, res)=>{
    res.render("signup.ejs")
})

app.get('/available', (req, res)=>{
    res.send('Blood bags in nearest hospital')
})

app.get('/home', (req, res)=>{
    res.send('Home page')
})

app.get('/aboutus', (req, res)=>{
    res.send('About us page')
})

app.get('/faq', (req, res)=>{
    res.send('FAQ page')
})

app.get('/contactus', (req, res)=>{
    res.send('contact us page')
})

app.listen(3000, ()=>{
    console.log("Server is running")
})