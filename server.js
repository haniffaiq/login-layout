const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const path = require('path')
const router = express.Router()

app.get('/', (req,res)=>{
    res.json({
        "error": false,
        "message": "Hello World"
    })
})

app.use('/', router)

app.listen(5000)
console.log("Listening on PORT 5000");
