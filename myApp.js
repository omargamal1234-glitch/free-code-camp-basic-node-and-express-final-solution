require('dotenv').config();
const bodyParser = require('body-parser');
let express = require('express');
let app = express();
app.use(middleware);
app.use(bodyParser.urlencoded({extended: false}))
let path = __dirname + "/public";
let path2 = __dirname + "/views/index.html"
app.get("/", function(req, res){
    res.sendFile(path2)
    app.use("/public", express.static(path))
})

app.get("/json", function(req, res){
  const variable = process.env.MESSAGE_STYLE;
   let json = {"message": "Hello json"};
   if(variable == "uppercase"){
    json = {"message": "HELLO JSON"}
   }
   
   res.json(json);
   })
   function middleware(req, res, next) {
    console.log(`${req.method} ${req.path} - ${req.ip} `);
    next();
  }
  function time(req, res, next){
    req.time = new Date().toString();
    next();
  }
 app.get("/now", time, function(req, res){
  res.json({"time": req.time});
 });
 app.get("/:word/echo", function(req, res){
   const word = req.params.word ;
   res.json({"echo": word});
 });
 app.route("/name")
     .get(function (req, res){
      const firstname =req.query.first;
      const lastname = req.query.last;
      if(firstname && lastname){
        const fullname = `${firstname} ${lastname}`;
        res.json({'name': fullname})
      }});
app.post("/name", function(req, res){
  let firstname = req.body.first;
  let lastname = req.body.last;
  let fullname = firstname + " " + lastname
     if(firstname && lastname){
      res.json({ "name": fullname })
      
     }
})
  

    
 

































 module.exports = app;
