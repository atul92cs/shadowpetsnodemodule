var mysql = require('mysql');
var express=require('express');
var bodyparser=require('body-parser');

var db = mysql.createConnection({
      host:'trial.cpaoqpenaokn.us-east-2.rds.amazonaws.com',
	  user:'admin',
	  password:'savita92',
	  database:'shadowtrial'
});

db.connect((error)=>{
     if(error) throw error;
	 
	 console.log('Database connected');
}); 

var port=process.env.PORT||8080;
var app = express();
app.use(bodyparser.urlencoded({exntended:false}));
app.use(bodyparser.json());

app.post('/createOrder',function(req,res){
   /*code for crating distinct orders for sellers*/
    var data=req.body.orderSummary;
	for(var i=0;i<data.length;i++)
	{
	  var name=data[i].name;
	  var id=data[i].id;
	  var quantity=data[i].quantity;
	  var cost = data[i].cost;
	  var sellerid=data[i].s_id;
	  var status='placed';
	  let body={product_name:name,product_id:id,product_quantity:quantity,product_cost:cost,seller_id:sellerid,order_status:status};
	  let sql='INSERT INTO seller_order SET ?';
	  let query=db.query(sql,body,(err,result)=>{
	     if(err) throw err;
		    
	  });
	}
	res.send('operation successful');
});

app.listen('1900',function(){
     console.log('server started');
});