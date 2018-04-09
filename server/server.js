var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/numbDB");

var app = express();

var bodyParser= require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var numSchema = new mongoose.Schema({
firstNumber : String,
secondNumber : String,
result : String
});

var UserNum = mongoose.model("UserNum", numSchema);

app.get('/', (req,res) => {
 res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/getData',(req,res) =>{
   UserNum.find({}, (err, nums) => {
       res.send(nums);
   })
});

app.post('/saveData', (req,res) => {
var myNum = new UserNum({
    firstNumber : req.body.firstNumber,
    secondNumber : req.body.secondNumber,
    result : req.body.firstNumber * req.body.secondNumber
});
myNum.save().then((doc) => {
    console.log("Item Saved to DB");
}).catch((e) => {
    console.log("Error Occured");
})
});

app.listen(4200, () => {
    console.log('Started on port 4200');
});