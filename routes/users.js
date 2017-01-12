var express = require('express');
var router = express.Router();
var low = require('lowdb');
var db = low('data.json',{ storage: require('lowdb/lib/file-async'), writeOnChange: true});

// Init
db.defaults({ posts: [] });

// Define posts
const posts = db.get('lists');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/list', function(req, res, next) {
  res.send(posts);
});

router.get('/search', function(req, res, next) {

  

  var key = req.query.keyword;
  var vals = posts.value();

  var ls = [];


  for(var i in vals){



    if(vals[i].name.indexOf(key) != -1){
      ls.push(vals[i]);
    }
  }

  if(ls.length){
    res.send({
      result: true,
      list: ls
    })
  }else{
    res.send({
      result: false,
      message: '没有此关键字的数据'
    })
  }
});

router.get('/:id', function(req, res, next) {

	var post = posts.find({'id':req.params.id*1}).value();

	if(!post){
		res.send({
			result: false,
			message: '没有找到Id为' + req.params.id + '的记录'

		})
	}else{
		res.send({
			result: true,
			list:post
		})		
	}
  
});

// POST /posts
router.post('/create', (req, res) => {
  // Some basic id generation, use uuid ideally
  
  if(req.body.name){
  	// post will be created asynchronously in the background
  const id = posts.last().value().id + 1;
  req.body.id = id;

  var post = posts.push(req.body).last().value();
  db.write();
  res.send({
  	result: true,
  	list:post
  });	
  }else{
  		res.send({
		  	result: false,
		  	message: 'name没有填写'
		  });
  }
 	
})

router.post('/update', (req, res) => {
  // Some basic id generation, use uuid ideally
  
  	var id = req.body.id; 

  	if(id){
  		const post = posts.find({"id":id*1}).assign({"name": req.body.name}).value();
  		db.write();
	   res.send({
	  	result: true,
	  	list:post
	  });
  	}else{

	   res.send({
	  	result: false,
	  	message: '更新必须要有ID'
	   });
	}
});


router.post('/delete', (req, res) => {
  // Some basic id generation, use uuid ideally
  
  	var id = req.body.id; 

  	if(id){
  		posts.remove({ "id": id*1 }).value();
		   res.send({
		  	result: true,
		  	message:' 删除成功'
		  });
  	}else{

	   res.send({
	  	result: false,
	  	message: '没有发现此id' + id + '的记录'
	  });
   }

  // post will be created asynchronously in the background
  // const post = posts
  //   .push(req.body)
  //   .last()
  //   .value()

  // .getById(postId).value()

  
  
})

module.exports = router;

