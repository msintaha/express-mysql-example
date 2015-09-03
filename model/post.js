var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'mifta',
  database : 'testdb'
});

module.exports = {
	 addPost: function(postcontent) {
       var que=connection.query('INSERT INTO post SET ?',postcontent,function(err, result) {
	   if(err) {
	    console.log(err);
	   }
	    console.log(result);
		});
    },
    showPost: function(callback){
    	var q= connection.query("SELECT * FROM post", 
            function(err, results, fields) {
                if(err)
                	return callback(err, null);

                return callback(null, results);
            }); 
    },
    delPost: function(id){
       var que=connection.query('DELETE FROM post WHERE id= ?',[id],function(err, result) {
     if(err) {
      console.log(err);
     }
      console.log(result);
      // res.redirec
    });
    },
    editPost: function(id,callback) {
    var q= connection.query("SELECT * FROM post WHERE id= ?",[id] ,
            function(err, results, fields) {
                if(err)
                  return callback(err, null);

                return callback(null, results);
            }); 
    },
    saveEdit: function(id,content) {
   var que=connection.query('UPDATE post SET ? WHERE id= ?',[content,id],function(err, result) {
     if(err) {
      console.log(err);
     }
      console.log(result);
    });
    }
}
