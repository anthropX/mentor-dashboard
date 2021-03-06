var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

//***************************mongoose connection *************//
mongoose.connect("mongodb://localhost/mentorsDashboard");

app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//****************************mongoSchema************************//
 var mentorsDashboardSchema = new mongoose.Schema({
     task: String,
     member: String
 });
 var tasks = mongoose.model("tasks",mentorsDashboardSchema);
app.post("/addTask" , function(req,res){
    // console.log("task added");
    console.log(req.body);
    var newTask = new tasks({
        task: req.body.taskName,
        member: req.body.teamMember
    });
    tasks.create(newTask , function(err, tasks){
        if(err) console.log(err);
        else{
            console.log("inserted "+ newTask);
        }
    });
});



app.listen(4000,function(){
    console.log("server listening on port 4000");
});