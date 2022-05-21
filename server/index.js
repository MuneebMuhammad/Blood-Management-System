const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const mysql = require('mysql')
const { request } = require('express')


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
    db.query(`insert into requests (receiver_hid, request_datetime, quantity, acceptance_status, blood_type_id, immediate_status) values('${upData.iso}', '${date_time}', ${upData.qty}, '0', '${upData.bloodType}', ${upData.immdStat});`, function (err, result, fields) {
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
        else if (result.length !=0 && (req.body.iso == result[0].hid)){
            db.query('delete from blood where blood_id = ?', [req.body.Bid], (err, result, fields)=>{
                if (err) throw err
                else res.send([1])
            })
        }
        else{
            res.send([0])
        }
    })
})

app.post('/bloodData', (req, res)=>{
    db.query(`Select blood_id, blood_type_id, submission_date, expiration_date, quantity from blood where hid = '${req.body.iso}'`, (err, result, fields)=>{
        res.send(result)
    })
    
})

app.post('/requestRecieved', (req, res)=>{
    db.query(`Select * from sender where sender_id = ${req.body.iso} and accepted = 0`, (err, result, fields)=>{
        if (err) throw err
        else{
            let myRequests = [];
            for(let i =0; i<result.length; i++){
                db.query(`Select * from requests join hospitals where receiver_hid = h_id and request_id = ${result[i].request_id} order by request_datetime desc`, (err, myRes, fields)=>{
                    if (err) throw err
                    else if(i === result.length-1){
                        myRequests.push(myRes)
                        res.send(myRequests)
                    }
                    else{
                        myRequests.push(myRes)
                    }
                })
            }
        }
    })
})

app.post('/acceptRequest', (req, res)=>{
    db.query(`Update sender set accepted = 1 where request_id = ${req.body.r_id} and sender_id = ${req.body.iso}`, (err, result, fields)=>{
        if (err) throw err
        else{
            db.query(`Delete from sender where request_id = ${req.body.r_id} and accepted = ${0}`)
        }
    })
})

app.post('/deleteRequest', (req, res)=>{
    db.query(`Delete from sender where request_id = ${req.body.r_id} and sender_id = ${req.body.iso}`)
})

function sortFunction(a, b) {
    if (a[0] === b[0]) {
        return 0;
    }
    else {
        return (a[0] > b[0]) ? -1 : 1;
    }
}

app.post('/requestSent', (req, res)=>{
    db.query(`select * from requests r join sender s where r.receiver_hid = ${req.body.iso} and r.request_id = s.request_id order by r.request_id desc`, (err, result, fields)=>{
        if (err) throw err
        else{
            let requestsData = []
            for (let element = 0; element < result.length; element ++) {
                db.query(`select h_name, h_address, contact from hospitals where h_id = ${result[element].sender_id}`, (err2, result2, fields2)=>{
                    if (result[element].accepted == 1){
                        requestsData.push([result[element].request_id, result[element].blood_type_id, result[element].request_datetime, result[element].quantity, result[element].immediate_status, result2[0].h_name, result2[0].h_address, result2[0].contact])
                    }   
                    else{
                        requestsData.push([result[element].request_id, result[element].blood_type_id, result[element].request_datetime, result[element].quantity, result[element].immediate_status])
                    }
                    if(element == result.length-1){
                        requestsData.sort(sortFunction)
                        res.send(requestsData);
                    }
                });
            }
        }
    });
});

app.listen(3001, ()=>{
    console.log("Server running on port 3001")
})