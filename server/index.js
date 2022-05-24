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

const blood_type_array = [0, 'A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']

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
    const qry = "Insert into hospitals values(?,?,?,?,?,?,?,?,?,?)"
    db.query(qry, [req.body.iso, req.body.name, req.body.address, req.body.city, req.body.care, req.body.userName, req.body.pass, req.body.phn, req.body.longitude, req.body.latitude], (err, result)=>{
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
// returns most appropriate hospitals to whom the request will be sent

function findNearHospital(res, r_id, iso, longitude, latitude, blood_type_id, quantity, beforeDate){
    //date in the arguments contains the date when the blood is required in the format 'YYYY-MM-DD'
    // bloodid = query(select blood_type_id from blood where blood_type = ${bloodType})
    
    qryBlood = `select hospitals.h_id, longitude, latitude, quantity, blood.expiration_date from hospitals join blood  where blood_type_id= ${blood_type_id} and hospitals.h_id = blood.hid and expiration_date >= ${beforeDate} and h_id != ${iso}`
    console.log('qryBlood: ', qryBlood)
    //rows of hospitals having expiration_date > givenDate
    db.query(qryBlood, (err, result)=>{
        console.log("before if")
        if (err) {
            console.log("errr");
        }
        else {
            console.log("result: ", result)
            let totalScore = 0;
            let hospitalScore = [];

            for (let i = 0; i < result.length; i++){
                score = 0;
                //get 10 characters in the form 'YYYY-MM-DD'
                console.log(typeof (result[i].expiration_date))
                diff = diffDate(beforeDate, (result[i].expiration_date).toString().slice(0,10))
                score += 30 - diff //assigning score from difference in data
                score += quantity //assigning score on the basis of quantity
                // dict.set(result[i].h_id, score)
                if (i != 0 && result[i].h_id != result[i-1].h_id){
                    dis = distance(latitude, longitude, result[i-1].latitude, result[i-1].longitude, 'K')
                    dis = parseInt(1560/dis);
                    totalScore += dis //assiging score on the basis of distance
                    hospitalScore.push([result[i-1].h_id, totalScore])
                    totalScore = score
                }
                else{
                    if (result.length == 1){
                        hospitalScore.push([result[i].h_id, score])
                    }
                    totalScore += score
                }
            }
            // if no hospitals were found for this request then set finalAnswer to [-2]
            if (result.length === 0){
                finalAnswer = [-2]
            }
            else{
                // array of hospital score containing score of each hospital
                hospitalScore.sort(sortFunction);
                var finalAnswer = hospitalScore.map(function(value,index) { return value[0]; });
                console.log("hospital Score", hospitalScore)
                console.log("final Answer: ", finalAnswer)
            }
            
            if (finalAnswer[0] === -2){
                res.send([0])
            }
            else{
                finalAnswer.forEach(element => {
                    // Insert requests recievers in sender table
                    db.query('insert into sender (request_id, sender_id) values (?, ?);', [r_id, element], function(err, result, fields){
                        if (err) throw err;
                    })
                });
                res.send([1])
            }
            return finalAnswer
        }
    });
}

function sortFunction(a, b) {
    if (a[1] === b[1]) {
        return 0;
    }
    else {
        return (a[1] > b[1]) ? -1 : 1;
    }
}

//javascript function to calculate the distance given longitude and latitudes
function distance(lat1, lon1, lat2, lon2, unit) {
        var radlat1 = Math.PI * lat1/180
        var radlat2 = Math.PI * lat2/180
        var theta = lon1-lon2
        var radtheta = Math.PI * theta/180
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist)
        dist = dist * 180/Math.PI
        dist = dist * 60 * 1.1515
        if (unit=="K") { dist = dist * 1.609344 }
        if (unit=="N") { dist = dist * 0.8684 }
        return dist
}

//javascript function to calculate the difference between two dates
function diffDate(startDate, endDate){
    const diffInMs   = new Date(endDate) - new Date(startDate)
    return diffInMs / (1000 * 60 * 60 * 24);
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

    let locQry = `select longitude, latitude from hospitals where h_id = '${upData.iso}'`
    db.query(locQry, (locationErr, locationResult)=>{
        if (locationErr) throw locationErr
        else{
            // this query will insert a request in requests table. 
        db.query(`insert into requests (receiver_hid, request_datetime, quantity, acceptance_status, blood_type_id, needBefore) values('${upData.iso}', '${date_time}', ${upData.qty}, '0', '${upData.bloodType}', '${upData.needBefore}');`, function (err, result, fields) {
            if (err) throw err;
            else {
                // get the request_id of this new request
                db.query(`select request_id from requests where request_datetime = '${date_time}' and receiver_hid = ${upData.iso}`, function(err, result, fields){
                    if (err) throw err;
                    else {
                        r_id = result[0].request_id;
                        requestFound = findNearHospital(res, r_id, upData.iso, locationResult[0].longitude, locationResult[0].latitude, upData.bloodType, upData.qty, upData.needBefore);
                        
                    }
                })
            }
        });
        }
         
    })
    
})

app.post('/plusBlood', (req, res)=>{
    db.query('insert into blood (blood_type_id, submission_date, expiration_date, hid, quantity) values (?,?,?,?,?)', [req.body.bloodType, req.body.beginDate, req.body.expireDate, req.body.iso, req.body.qty], (err, result, fields)=>{
        if (err) throw err
    })
    res.sendStatus(200)
})

app.post('/removeBlood', (req, res)=>{
    console.log(req.body.qty == "" || req.body.qty == null ? "no": req.body.qty)
    db.query(`Select hid, quantity from blood where blood_id = '${req.body.Bid}'`, (err, result, fields)=>{
        if (err) throw err
        // check if the hospital have the particular blood id
        else if (result.length !=0 && (req.body.iso == result[0].hid)){
            // check if the blood quantity was entered
            if (req.body.qty == "" || req.body.qty == null){
                res.send([3])  // 3 means blood quantity was not entered
            }
            else if (req.body.qty == result[0].quantity){
                db.query('delete from blood where blood_id = ?', [req.body.Bid], (err, result, fields)=>{
                    if (err) throw err
                    else res.send([2])  // 2 means that the blood was successfully removed
                })
            }
            // check if the blood quantity is less than removed quantity
            else if(req.body.qty < result[0].quantity && req.body.qty >= 0){
                console.log("yes")
                db.query(`update blood set quantity = ${result[0].quantity - req.body.qty} where blood_id = ${req.body.Bid}`, (err2, result2, fields2)=>{
                    if (err) throw err
                    else res.send([2])
                })
            }
            else{
                res.send([1])  // 1 means that blood quantity is removed more than there was in the stock
            }
        }
        else{
            res.send([0])  // 0 means that the blood_id did not existed for the hospital
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
            let arrayLength = 0; // this is used to solve asynchronous error
            for(let i =0; i<result.length; i++){
                console.log("number: ", i)
                db.query(`Select * from requests join hospitals where receiver_hid = h_id and request_id = ${result[i].request_id} order by request_datetime desc`, (err, myRes, fields)=>{
                    if (err) throw err
                    else if(arrayLength === result.length-1){
                        console.log("last")
                        myRequests.push(myRes)
                        console.log(myRequests)
                        res.send(myRequests)
                        arrayLength ++;
                    }
                    else{
                        console.log("first")
                        myRequests.push(myRes)
                        arrayLength ++;
                    }
                })
            }
        }
    })
})

app.post('/acceptRequest', (req, res)=>{
    console.log("accepted")
    db.query(`Update sender set accepted = 1 where request_id = ${req.body.r_id} and sender_id = ${req.body.iso}`, (err, result, fields)=>{
        if (err) throw err
        else{
            db.query(`Delete from sender where request_id = ${req.body.r_id} and accepted = ${0}`, (err, result)=>{
                res.sendStatus(200)
            })
        }
    })
})

app.post('/deleteRequest', (req, res)=>{
    db.query(`Delete from sender where request_id = ${req.body.r_id} and sender_id = ${req.body.iso}`, (err, result)=>{
        res.sendStatus(200)
    })
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
    // get all requests of the current hospital
    db.query(`select * from requests r join sender s where r.receiver_hid = ${req.body.iso} and r.request_id = s.request_id order by r.request_id desc`, (err, result, fields)=>{
        if (err) throw err
        else{
            let requestsData = []
            for (let element = 0; element < result.length; element ++) {
                db.query(`select h_name, h_address, contact from hospitals where h_id = ${result[element].sender_id}`, (err2, result2, fields2)=>{
                    if (result[element].accepted == 1){
                        requestsData.push([result[element].request_id, blood_type_array[result[element].blood_type_id], result[element].request_datetime, result[element].quantity, (result[element].needBefore).toString().slice(4,15), result2[0].h_name, result2[0].h_address, result2[0].contact])
                    }   
                    else{
                        if (element != result.length-1 && result[element].request_id != result[element+1].request_id){
                            requestsData.push([result[element].request_id, blood_type_array[result[element].blood_type_id], result[element].request_datetime, result[element].quantity, (result[element].needBefore).toString().slice(4,15)])
                        }
                        
                    }
                    if(element == result.length-1){

                        if (result[element].accepted != 1){
                            requestsData.push([result[element].request_id, blood_type_array[result[element].blood_type_id], result[element].request_datetime, result[element].quantity, (result[element].needBefore).toString().slice(4, 15)])
                        }
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