var express = require('express');
var app = express();
var exphbs  = require('express-handlebars');
var hbs = exphbs.create({ /* config */ });
var router = express.Router();
var moment = require('moment');
app.engine('handlebars', hbs.engine);
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
var bodyParser = require('body-parser');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
var post = require("./model/post.js");
// parse application/json
app.use(bodyParser.json());

var now = moment().add(1,'month').format("YYYY-MM-DD h:mm:ss A");   
console.log(now);
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;


app.get('/delete/:id', function (req,res){
  var pid=req.params.id;
 console.log(pid);
  post.delPost(pid);
   res.redirect('/posts');
});
app.get('/edit/:id', function (req,res){
  var pid=req.params.id;
  var content =post.editPost(pid,function(err,result){
    if(err){
      res.render('edit',{posts:null,error:err}); 
    } else{
     console.log(content);
     res.render('edit',{posts:result,error:null}); 
    }
});
});
app.get('/posts',function (req,res){
  var content =post.showPost(function(err,result){
    if(err){
      res.render('details',{posts:null,error:err}); 
    } else{
     console.log(content);
     res.render('details',{posts:result,error:null}); 
    }
  });

});
app.get('/',function (req,res){
  res.render('edit');
});
app.post('/addpost', function (req, res) {
console.log(req.body);

var postcontent  = {id: '', 
       title: req.body.title,
       category: req.body.category,
        description: req.body.desc,
        reg_date: now
      };
 post.addPost(postcontent);
 res.redirect('/posts');

});
app.post('/edit/:id', function (req, res) {
  var pid=req.params.id;
var postcontent  = {id: pid, 
        title: req.body.title,
        category: req.body.category,
        description: req.body.desc,
        reg_date: now
      };
 post.saveEdit(pid,postcontent);
 res.redirect('/posts');

});


  console.log('Example app listening at http://%s:%s', host, port);
});