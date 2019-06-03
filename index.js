const express = require('express')
const app = express()
const port = 4000
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
let JsonDB = require('node-json-db');
let { Config } = require('node-json-db/dist/lib/JsonDBConfig')

var db = new JsonDB(new Config("db.json", true, true, '/'));

let allot = (req, res) => {
    if(!req.query.phone){
        let phoneNum = getRandomInt(1111111111,9999999999);
        res.send(`Random Phone number is ${phoneNum}`);
        db.push('/'+phoneNum,"1");
    } else if (req.query.phone < 1111111111 || req.query.phone > 9999999999){
        res.send(`Invalid Phone number ${req.query.phone}`);
    }
    else{
        try{
            let pre = db.getData('/'+req.query.phone);
            res.send(req.query.phone + ' Phone Number not avaiable');
        } catch(err){
            db.push('/'+req.query.phone,"1");
            res.send(`Required Phone number is alloted ${req.query.phone}`);
            
        }
    }

}

app.get('/', allot);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}