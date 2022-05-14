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

// returns most appropriate hospitals to whom the request will be sent
function findNearestHospitals(iso, bType){
    return Array(1, 2, 3)
}


app.post('/requestBlood', (req, res)=>{
    let upData = req.body;
    let r_id;
    let currentdate = new Date();
    // get date in mysql date formate
    let date_time = currentdate.getFullYear() + "-" + (currentdate.getMonth()+1)
    + "-" + currentdate.getDate() + " " 
    + currentdate.getHours() + ":" 
    + currentdate.getMinutes() + ":" + currentdate.getSeconds()

    // this query will insert a request in requests table. 
    db.query(`insert into requests (receiver_hid, request_datetime, quantity, acceptance_status, blood_type_id) values('${upData.iso}', '${date_time}', ${upData.qty}, '0', '${upData.bloodType}');`, function (err, result, fields) {
        if (err) throw err;
        else {
            // get the request_id of this new request
            db.query(`select request_id from requests where request_datetime = '${date_time}' and receiver_hid = ${upData.iso}`, function(err, result, fields){
                if (err) throw err;
                else {
                    r_id = result[0].request_id;
                    sendToHospitals = findNearestHospitals(upData.iso, upData.bType);

                    sendToHospitals.forEach(element => {
                        // Insert requests recievers in sender table
                        db.query('insert into sender (request_id, sender_id) values (?, ?);', [r_id, element], function(err, result, fields){
                            if (err) throw err;
                        })
                    });
                        }
            })
        }
    });
    
    res.sendStatus(200)
})

app.post('/plusBlood', (req, res)=>{
    db.query('insert into blood (blood_type_id, submission_date, expiration_date, hid, quantity) values (?,?,?,?,?)', [req.body.bloodType, req.body.beginDate, req.body.expireDate, req.body.iso, req.body.qty], (err, result, fields)=>{
        if (err) throw err
    })
    res.sendStatus(200)
})

app.post('/removeBlood', (req, res)=>{
    console.log(req.body.Bid)
    db.query(`Select hid from blood where blood_id = '${req.body.Bid}'`, (err, result, fields)=>{
        if (err) throw err
        else console.log(result[0].hid)
        if (req.body.iso == result[0].hid){
            db.query('delete from blood where blood_id = ?', [req.body.Bid], (err, result, fields)=>{
                if (err) throw err
                else console.log("success")
            })
        }
    })
})

app.listen(3001, ()=>{
    console.log("Server running on port 3001")
})