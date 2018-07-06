var express = require('express');
var router = express.Router();
var db = require('../config/database');
/* GET home page. */
router.get('/', function(req, res, next) {
  db.query('SELECT * FROM employee WHERE employee_age > 25', (err, list) =>{
  	if(err){
  		res.status(500).send({status:'error', error:err});
  	}else{
  		res.status(200).send({status:'success', result:list});
  	}
  });

});


/**
 * Get Employee List Api
 *
 * @param age [int]
 * @return array object []
*/
router.get('/employee', (req, res)=> {
	const queryParam = req.query;

	db.query('SELECT * FROM employee WHERE employee_age > ? AND employee_salary >= ?',[queryParam.age,queryParam.salary], (err, list) =>{
	  	if(err){
	  		res.status(500).send({status:'error', error:err});
	  	}else{
	  		res.status(200).send({status:'success', result:list});
	  	}
	});

});

router.post('/addEmployee', (req,res) =>{
		const json = req.body;
		db.query('INSERT INTO employee SET ?',json, (err,result) =>{
			if(err){
	  		res.status(500).send({status:'error', error:err});
	  	}else{
	  		res.status(200).send({status:'success', result:result});
	  	}
		});
});

module.exports = router;
