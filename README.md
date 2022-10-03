# ExpressBloggerFinal
ExpressBloggerFinal


<!-- ### Assignment

- _Note_: 
	- One of the stretch goals is to wrap all routes in try/catch blocks. If you're going for this stretch goal, it would be easiest to write all your routes with try/catch blocks as you go. Remember in the catch block to:
		- console.log the error
		- Respond with an object containing success:false and the error message to the HTTP request
		- catch (e) {
				console.log(e)
				res.json({
					success: false,
					error: e.toString()
				})
			}
	- For the POST and PUT routes, the stretch goals are to add validations to the route. You may implement the validations inside the route handler function itself as inline code or create a new file ./validations/blogs.js and export all your validation functions from that file to be imported into the ./routes/blogs.js file. Either method is acceptable so long as the routes properly respond to the HTTP request with an object containing success:false and the validation error message if any of the validations fail. 
	- All routes and route functionality should be tested using Postman.

- Implement single document CRUD routes
	- Implement a new GET route /blogs/get-one/:id
		- This route should get the blog post id from the url params
		- The route should then search mongo for the blog post whose id matches the url param 
		- If the post was found, then the route should respond with an object containing success: true and the found blog post
		- If the post was not found, then the route should respond with an object containing success: false and a message saying that the post was not found 
		//IGNORETHIS->-> _Stretch_: Add a condition to check to see that the id url param is defined and if it isn't, send back an object with success: false and an message saying that the blog id must be provided as a route parameter

	- Implement a new POST route /blogs/create-one
		- This route should get the following fields for the new blog post from the incoming request body:
			- title: {String}
			- text: {String}
			- author: {String}
			- email: {String}
			- categories: {String[]}
			- starRating: {Number}

            const title = req.body.title
            const text = req.body.text
            const author = req.body.author
            const email = req.body.email
            const categories = req.body.categories
            const starRating = req.body.StarRating

            const blogData ={
                title,
                text,
                author,
                email,
                categories,
                starRating,
                createdAt: new Date(),
			    lastModified: new Date()
			    id: {String/uuid}
            }
            const blogDataCheck = validateBlogData(blogData)

	if (blogDataCheck.isValid === false) {
		res.json({
			success: false,
			message: blogDataCheck.message
		})
		return;
	}

	sampleBlogs.push(blogData)

	res.json({
		success: true
	})
})

 
		- The following fields should be generated in the route and combined with the fields from the request body to create a new blog object:
			- createdAt: {Date}
			- lastModified: {Date}
			- id: {String/uuid}
		- The route should insert the new blog object into the blog posts collection as a new post
		- If the above was successful, the route should respond with an object containing success:true and the new blog object
		- _Stretch_: 
			- Add validation to the route to check the following conditions before inserting the blog object:
				- title is defined, is a string, and is no longer than 30 characters
				- text is defined and is a string
				- author is defined and is a string
				- if email is defined, it should be a string and must contain only a single @ symbol
				- if categories is defined, it must be an array, it must have non-zero length and it must only contain strings
				- if starRating is defined, it must be a number between 1 and 10
			- If any of the validations fail, the route should respond with an object containing success: false and a validation error message describing which validation failed

	- Implement a new PUT route /blogs/update-one/:id
		- This route should get the blog post id from the url params and update the post containing that id with the incoming data from the request body
		- This route should get the following fields to update the blog post from the incoming request body:
			- title: {String}
			- text: {String}
			- author: {String}
			- email: {String}
			- categories: {String[]}
			- starRating: {Number}
		- The following fields should be generated in the route to be used in the update operation:
			- lastModified: {Date}
		- The route should update the target blog post with the new field values but only if those fields are defined in the request body. I.E. It should be possible to only send a single field such as starRating in the PUT request body. In that case, the only fields that should be updated on the target post is starRating and lastModified (since we always want to keep lastModified up to date). The rest of the fields should remain unchanged.
		- If the above was successful, the route should respond with an object containing success:true
		- _Stretch_:
			- Add validation to check that for every field on the request body that is defined it is the correct type. Additionally, check the following field specific validations:
				- title is no longer than 30 characters
				- email must contain only a single @ symbol
				- categories must be an array with non-zero length containing all strings
				- starRating must be a number between 1 and 10
			- If any of the validations fail, the route should respond with an object containing success:false and a validation error message describing which validation failed.

	- Implement a new DELETE route /blogs/delete-one/:id
		- This route should get the blog post id from the url params and delete the post containing that id from the collection
		- If the above was successful, the route should respond with an object containing success:true

- _Stretch_: Implement the following routes
	- Implement a new GET route /blogs/get-multi?sortField=<sortField>&sortOrder=<sortOrder>&limit=<limit>&page=<page>
		- This route should get the following query params from the url:
			- sortField: {String}
			- sortOrder: {1 or -1}
			- limit: {Number}
			- page: {Number}
		- _Note_: 
			- The goal of this route is to get a sorted list of all blogs posts that can be paged through. 
			- Therefore, we can pass an empty object into .find({}) since that will match all blog posts and chain .sort(), .limit() and .skip() off of it. 
			- For sortOrder, limit and page, we will have to coerce these values from type string into type number since query params always come through as strings.
			- The limit param can be passed directly into .limit(), however the page param cannot be passed directly into .skip(). Since page represents the current page of limit number of results and skip represents the number of results to skip, we will first have to convert the number for page into the equivalent number for skip. To convert page to skip, multiply (page - 1) by the limit. E.G. Page 1 of limit 10 results should skip 0 results and return the first 10 found blog posts; page 3 of limit 10 results should skip the first 20 results and return blog posts 20 to 30.
		- If any of the query params are missing from the url, the following values should be the defaults:
			- sortField = 'id'
			- sortOrder = -1
			- limit = 10
			- page = 1
		- Additionally, add the following validations for the query params:
			- sortOrder must be either 1 or -1
			- limit must be a number greater than 1
			- page must be a number greater than 1
		- If any of the query param validations fail, the values should be reverted to the defaults
		- If the above was successful, the route should respond with an object containing success:true and the found blogs

	- Implement a new DELETE route /blogs/delete-multi
		- This route should get a list of blog ids from the request body and delete all blogs with matching ids
		- If the above was successful, the route should respond with an object containing success:true

- _Stretch_: Wrap all route handler code in try/catch blocks -->


<!-- 
//const foundMovie = favoriteMovieList.find((movieName)=>{return movieName === req.params.movieName})
//   console.log(foundMovie)
//   if (foundMovie) {
//       res.send(foundMovie)
//   } else {
//       res.send("Movie not found!")
//   }
// }) -->


<!-- // router.get('/get-one/:id', async function(req, res, next) {
			// 	const blogPost = await db().collection("BlogiiDB").findOne({
			// 		id: {
			// 			$exists: true
			// 		}
			// 	})
			// 	res.json({
			// 		success: true,
			// 		post: blogPost
			
			// }) -->


            <!-- // Take post id from url param and search mongo for the blogPost with the id field value that matches the post id from he url param. If found take the object id from NoSqlBooster input into Postman and vscode route
            
            use the object id from NoSQLBooster and insert that into Postman to search and verify id-->