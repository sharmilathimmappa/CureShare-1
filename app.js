var express=require("express");
var bodyParser=require("body-parser");



const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/cure');

var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
console.log("connection succeeded");

})
var app=express()
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false
}));

app.post('/login', function(req,res){ 
    var name = 'asd'; 
    var pass = 'asd';

    var data = { 
        "name": name, 
        "pass":pass
    }
    db.collection('admin').insertOne(data,function(err, collection){ 
        if (err) throw err; 
    })
    db.collection('admin').findOne({name:req.body.username},
        function(err,data){
            if(data){
                if(data.pass==req.body.password){
                   // req.session.userId=data.unique_id;
                   db.collection('Donator1').find().toArray(function(err, doc2) {

                    if(err) throw err;
                db.collection('NGOReg').find().toArray(function(err, doc1) {
            
                    if(err) throw err;
                db.collection('feedback').find().toArray(function(err, doc3) {
            
                    if(err) throw err;
                              
                
                res.render('adminhome.ejs', {'doc1':doc1 ,'doc2':doc2 ,'doc3':doc3});

                    //return res.redirect('/index.html');
                })})})
                }
                else{
                    res.send({"Success":"Wrong password !"});
                }
            }
                else{
                    res.send({"Success":"This email is not registered"});
                }
                });

    

        

});

app.post('/register', function(req,res){ 
    var nname = req.body.nname; 
    var email =req.body.email; 
    var address = req.body.address;
    var  contact= req.body.contact; 


    var data = { 
        "nname": nname, 
        "email":email, 
        "address":address, 
        "contact":contact,
    
    } 
db.collection('NGOReg').insertOne(data,function(err, collection){ 
        if (err) throw err; 
        //req.flash("success", "successfuly Signed up");
        console.log("Record inserted Successfully"); 
    }); 
        
    return res.redirect('/register.html'); 
})

app.post('/feedback', function(req,res){ 
    var fname = req.body.fname; 
    var email =req.body.email; 
    var lname = req.body.lname;
    var  msg= req.body.msg; 


    var data = { 
        "fname":fname,          
        "lname":lname, 
        "email":email,
        "msg":msg,
    
    } 
db.collection('feedback').insertOne(data,function(err, collection){ 
        if (err) throw err; 
        //req.flash("success", "successfuly Signed up");
        console.log("Record inserted Successfully"); 
    }); 
        
    return res.redirect('/index.html'); 
})


app.post('/donate', function(req,res){ 
    var name = req.body.name; 
    var contact =req.body.contact; 
    var medicine = req.body.medicine;
    var exdate = req.body.exdate;
    var qty= req.body.qty; 
    var myDate = new Date();
    console.log(myDate); 

    var data = { 
        "name": name, 
        "contact":contact, 
        "medicine":medicine, 
        "exdate":exdate,
        "qty":qty,
        "myDate":myDate,
    
    } 
db.collection('Donator1').insertOne(data,function(err, collection){ 
        if (err) throw err; 
        //req.flash("success", "successfuly Signed up");
        console.log("Record inserted Successfully"); 
    }); 
    
//}); 
//res.render("donate.html",{ data1: data2 });
    return res.redirect('/donate.html'); 
   
});

app.post('/index', function(req,res){ 
    
db.collection('Donator1').find().sort({myDate:-1}).toArray(function(err, doc1) {
            
    if(err) throw err;
console.log(doc1)           

res.render('display.ejs', {'doc1':doc1});
});
  
}); 

app.get('/',function(req,res,next){ 
    res.set({ 
        'Access-control-Allow-Origin': '*'
       }); 
       
 return res.redirect('/index.html'); 

    }).listen(3000) 
        
    console.log("server listening at port 3000"); 

