let express = require("express");
let logger = require("morgan")
let app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
let mysql = require('mysql');

function connect_database(){
    let con = mysql.createConnection({
        host: "localhost", 
        user: "root",
        password: "123",
        database: "wep"
    })
    return con;
}


app.use(express.static('views'))
app.use('/signup', express.static(__dirname + '/views'))
app.use(logger(":method :url"))
app.set('views', 'views')
app.set('view engine', 'ejs')
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array()); 



app.get('/', (req, res)=>{
    res.render("startup")
})

app.get('/login', (req, res)=>{
    res.send('Login here')
})

app.get('/signup', (req, res)=>{
    res.render("signup.ejs", {alt: false, passerr: false, unameerr: false, h_iderr: false})
})

app.post('/signup', (req, res)=>{
    upData = req.body;
    passerr = false;
    unameerr = false;
    h_iderr = false;
    if (!upData.password || !upData.cfmpass || !upData.username || !upData.hname || !upData.address || !upData.city || !upData.iso || !upData.care){
        res.render("signup.ejs", {alt: true, passerr, unameerr, h_iderr});
        return;
    }
    else{
        if (upData.password != upData.cfmpass){
            passerr = true;
        }
        db = connect_database();
        db.connect(function(err) {
            if (err) throw err;
            db.query("SELECT * FROM hospitals", function (err, result, fields) {
                let row_num = result.length;
                for (i = 0; i<row_num; i++){
                    if (result[i].username === upData.username){
                        console.log("unameerror")
                        unameerr = true;
                    }
                    if (result[i].h_id  === parseInt(upData.iso)){
                        h_iderr = true;
                    }
                }
                console.log("errors: ", unameerr, passerr, h_iderr)
                
                if (unameerr || passerr || h_iderr){
                    res.render("signup.ejs", {alt: false, passerr: passerr, unameerr: unameerr, h_iderr: h_iderr})
                    db.end();
                    return;
                  }
                  else{

                       db.query(`Insert into hospitals values('${upData.iso}', '${upData.hname}', '${upData.address}', '${upData.city}', '${upData.care}', '${upData.username}', '${upData.password}')`, function(err, result){
                        if (err) throw err;
                        console.log("1 record inserted");
                       })
                       db.end();
                       res.redirect("/requestBlood")
                       return;
                  }
            });            
          });
    }
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

app.get('/requestBlood', (req, res)=>{
    res.send("Request blood bags")
})


app.listen(3000, ()=>{
    console.log("Server is running")
})
