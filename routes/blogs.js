const { uuid } = require('uuidv4');
var express = require('express');
var router = express.Router();

const { db } = require("../mongo")

// const id = uuid();

router.get('/get-one-example', async function (req, res, next) {
	const blogPost = await db().collection("BlogiiDB").findOne({
		id: {
			$exists: true
		}
	})
	res.json({
		success: true,
		post: blogPost
	})
});



// localhost:3000/blogs/get-one/33e86384-1d7c-4c93-9bc6-6dfd1ab87f43
// Implement a new GET route /blogs/get-one/:id
router.get('/get-one/:id', async function (req, res, next) {
	const id = req.params.id;
	console.log(req.params);
	const blogPost = await db().collection("BlogiiDB").findOne({
			id: {
				$eq: id
			}
	})
	res.json({
		success: true,
		post: blogPost

	})
});



// edde9278-97d9-4bc1-9cf1-aa67c6269b38


//Implement a new POST route /blogs/create-one
router.post('/create-one', async function (req, res, next) {
	 title = req.body.title;
	 text = req.body.text;
	 author = req.body.author;
	 email = req.body.email;
	 categories = req.body.categories;
	 starRating = req.body.starRating;
	
	// const insertResult = await db().collection("BlogiiDB").insertOne(blogPost)
	// console.log();

	const blogPost = {
		title,
		text,
		author,
		email,
		categories,
		starRating,
		createdAt: new Date(),
		lastModified: new Date(),
		id: {}
	}
	// const callME = "Hello There"
	

	console.log();
	
	//The following fields should be generated in the route and combined with the 
	//fields from the request body to create a new blog object:

	// createdAt: {Date}
	// lastModified: {Date}
	// id: {String/uuid}

	// Always test to make sure vs code and Postman/server are connected
	// const insertResult = await db().collection("BlogiiDB").insertOne(blogPost)




	res.json({
		success: true
	})
})
module.exports = router;


//Implement a new PUT route /blogs/update-one/:id
//This route should get the blog post id from the url params and update 
//the post containing that id with the incoming data from the request body
router.put('/update-one/:id', async function (req, res, next) {
	const title = req.body.title;
	const text = req.body.text;
	const author = req.body.author;
	const email = req.body.email;
	const categories = req.body.categories;
	const starRating = req.body.starRating;

	console.log(author);
	
	// const id = req.params.id;
	// console.log(req.params);
	// const blogPost = await db().collection("BlogiiDB").updateOne({
	// 		id: {
	// 			$eq: id
	// 		}
	res.json({
		success: true
	})
})
module.exports = router;

	// const text = req.body.text;
	// const author = req.body.author;
	// const email = req.body.email;
	// const categories = req.body.categories;
	// const starRating = req.body.starRating;
	// const id = req.params.id;
	// console.log(req.params);
	// const blogPost = await db().collection("BlogiiDB").updateOne({
	// 		id: {
	// 			$eq: id
	// 		}


	// Implement a new DELETE route /blogs/delete-one/:id
	// This route should get the blog post id from the url params and 
	// delete the post containing that id from the collection
	router.delete('/delete-one/:id', async function (req, res, next) {
		console.log(req.params);
	const blogPost = await db().collection("BlogiiDB").deleteOne({
			id: {
				$eq: id
			}
	})
	res.json({
		success: true,
		post: blogPost

	})
});
		
	
// Implement a new DELETE route /blogs/delete-multi
// This route should get a list of blog ids from the request body and delete all blogs with matching ids
// If the above was successful, the route should respond with an object containing success:true
router.delete('/delete-multi', async function (req, res, next) {
	console.log(req.params);
const blogPost = await db().collection("BlogiiDB").deleteMulti({
		id: {
			$eq: id
		}
})
res.json({
	success: true,
	post: blogPost

})
});