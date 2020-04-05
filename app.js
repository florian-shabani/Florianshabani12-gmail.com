//jshint esversion:6
require('dotenv').config();//skemi nevoj me deklaru si konstante sepse me kaq eshte e aktivizuar dhe skemi nevoj me perdor me
const express= require("express")
const app=express();
const bodyParser=require("body-parser");



app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static("public"));

 const mongoose = require("mongoose");
 mongoose.connect('mongodb://localhost:27017/Security', {useNewUrlParser: true, useUnifiedTopology: true});

const encrypt=require("mongoose-encryption");


 const userSchema=new mongoose.Schema({


    email:String,
    pasword:String
});

const secret=process.env.SECRET;
userSchema.plugin(encrypt, { secret: secret,encryptedFields:['pasword']});


const User=mongoose.model("User",userSchema);
let item=new User({
    email:"florianshabani12@gmail.com ",
    pasword:"Florian"
});
// item.save(function(error){
//    if(!error){
//     console.log("success");
//    } else{
//        console.log(error);
//    }
// })



app.get("/",function(req,res){
    res.render("home",{

    });
});
app.get("/register",function(req,res){
    res.render("register",{
    });
});
app.post("/register",function(req,res){
let username=req.body.username;
let pasword=req.body.password;
let user=new User({
    email:username,
    pasword:pasword
});
user.save(function(error,data){
    if(!error){
        res.render("secrets");
    }else{
        console.log(error);
    }
});
});









app.get("/login",function(req,res){
    res.render("login");
});


app.post("/login",function(req,res){
    let username=req.body.username;
    let pasword=req.body.password;

let foundItem=User.find({email:username,pasword:pasword},function(error,data){
    if(!error){
        res.render("secrets");
    }else{
        console.log(error);
    }
});
if(foundItem.email ===username && foundItem.pasword===pasword){
    console.log("Matched");
}



});





app.listen(3000,function(){
    console.log("Server works in port 3000");
});
