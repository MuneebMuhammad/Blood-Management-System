const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const mysql = require('mysql')


const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'wep'
});

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true }))

app.get('/hospitalIso', (req, res)=>{
    const qry = "Select h_id, username from hospitals";
    db.query(qry, (err, result)=>{
        res.send(result)
    })
});

app.post('/registerHospital', (req, res)=>{
    const qry = "Insert into hospitals values(?,?,?,?,?,?,?)"
    db.query(qry, [req.body.iso, req.body.name, req.body.address, req.body.city, req.body.care, req.body.userName, req.body.pass], (err, result)=>{
        console.log(err)
    })
    res.sendStatus(200)
});

app.post('/login', (req, res)=>{
    const qry = 'Select * from hospitals where username = "' + req.body.userName + '" and password = "' + req.body.password + '"';
    console.log(qry)
    db.query(qry, (err, result)=>{
        console.log(result)
        if(result.length === 0){
            res.send([-1])  
        }
        else{
            res.send([result[0].h_id]) // data is send in array, not in integer
        }
    })
    
})



app.listen(3001, ()=>{
    console.log("Server running on port 3001")
})