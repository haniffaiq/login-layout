const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const path = require('path')
const router = express.Router()
const mongoOp = require("./models/user")



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));
app.use(express.static(__dirname))

//GET
router.route("/users").get((req,res)=>{
    var response = {}
    mongoOp.find({}, (err,data)=>{
        if(err){
            response = {"error" : true, "message": "Error Fething Data"}
        }
        else{
            response = {"error" : false, "message" : data}
        }

        res.json(response)
    })
})

//POST login
router.route("/users/login").post(function(req,res){
    
    // fetch email and password from REST request.
    // Add strict validation when you use this in Production.
    // Hash the password using SHA1 algorithm.
    var userPassword =  require('crypto')
                      .createHash('sha1')
                      .update(req.body.password)
                      .digest('base64');
    mongoOp.findOne({
        "userEmail": req.body.email,
        "userPassword": userPassword
    }, (err, data)=>{
        if(err){
            res.json({"error" : true})
        }
        return res.send(data)
        

    })
    
    
})

//POST register

router.route("/users/register").post((req,res)=>{

    var response = {}
    var newData = new mongoOp
    newData.userEmail = req.body.email
    newData.userPassword = require('crypto').createHash("sha1").update(req.body.password).digest("base64");

    newData.save((err)=>{
        if(err){
            response = {"error" : true, "message" : "Error fatching data"}
        }
        else{
            response = {"error" : false, "message" : "data added"}
        }
        res.json(response)
    })

})

//render HTML
router.route('/users/login').get(function(req,res){
    res.sendFile(path.join(__dirname+'/index.html'));
  });

app.get('/', (req,res)=>{
    res.json({
        "error": false,
        "message": "Hello World"
    })
})

app.use('/', router)

app.listen(5000)
console.log("Listening on PORT 5000");
