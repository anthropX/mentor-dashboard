var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

//***************************mongoose connection *************//
mongoose.connect("mongodb://myteam:myteam1@ds119171.mlab.com:19171/mentorsdashboard");

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
     member: String,
     dueDate: String,
     submitted: Boolean
 });
 var tasks = mongoose.model("tasks",mentorsDashboardSchema);

app.post("/mentor/task/create" , function(req,res){
    // console.log("task added");
    // console.log(req.body);
    var newTask = new tasks({
        task: req.body.taskName,
        member: req.body.teamMember,
        dueDate: req.body.date,
        submitted: false
    });
    tasks.create(newTask , function(err, tasks){
        if(err) console.log(err);
        else{
            // console.log("inserted "+ newTask);
        }
    });
});

app.get("/mentor/tasks" , function(req,res){
    tasks.find({},function(err, tasksList){
        if(err) console.log(err);
        else{
            // res.render("index.ejs" ,{todoList : todoList}); 
            res.send(tasksList);
            // console.log(tasksList);
        }
    });
});
app.get("/mentee/tasks" , function(req,res){
    tasks.aggregate([{$match :{member: { $eq:("megha")} }}]).exec(function(err,result){
        if(err){
            console.log("error");
        }
        else{
            //  console.log(result);
            res.send(result);
            // console.log(result);
        }
    });
});

app.get("/mentee/tasks/sub" , function(req,res){
    // tasks.aggregate([{$match :{member: { $eq:("megha")} }}]).exec(function(err,result){
        // if(err){
        //     console.log("error");
        // }
        // else{
             console.log(req.query);
            //  var collection = db.collection('tasks');
             tasks.update({_id: req.query.id}, {$set: {submitted:true}}, function(err, result) {
                if (err) {
                  res.send(err);
                }
                res.send(result);
              });
        //     res.send(result);
        //     // console.log(result);
        // }
    // });
    // res.send("hello")
    // res.send("sadf")
    // var id = req.query.id;
    // console.log(id);
    // db.collection('tasks').update({ _id: ObjectId(id)}, req.body, function (err, result) {
    //     res.send(
    //         (err === null) ? {msg: ''} : {msg: err}
    //     );
    // });
});


app.listen(4000,function(){
    console.log("server listening on port 4000");
});