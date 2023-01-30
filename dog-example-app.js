const express = require('express') // This line is bringing in the express JS code from the ExpressJS package we installed with NPM and exposing it as the variable express.

const app = express() // This line is creating a new server which is usually assigned to the variable called app. The app variable comes with many express methods for creating/manipulating a server, including creating new routes for a server.

app.use(express.json()) // This line will enable Express to be able to parse JSON objects in the body of a request.

const port = 3000

const dogList = [{
	name: "fluffy",
	breed: "poodle",
	age: 7
}, {
	name: "murphy",
	breed: "german shepherd",
	age: 4
},{
	name: "archie",
	breed: "lab",
	age: 3
},{
	name: "eevee",
	breed: "corgi",
	age: 9
},
{
	name: "boss",
	breed: "pitbull terrie",
	age: 3
}]

app.get( // This line is creating what is known as a GET route. A GET route is used to send resources and data from a server in response to a request.
	'/', // This line is the path that has to match a request url for this server route to be invoked. A '/' is known as an index route and is usually omitted from a url.
	(req, res) => { // This function is known as the route handler function. It is the function that is invoked when the route receives a request. All route handler functions take in two parameters known as req and res. The req parameter stands for request and the res parameter stands for response. When we need to access information about the HTTP request, we use methods and properties on the req object. When we need to create a response, we use methods on the res object.
  	res.send('Hello Class with nodemon!') // This line is creating a response that will be sent from our server as a response to the HTTP request. All routes should always respond to a request, otherwise the browser will be waiting for a response which is known as "hanging the browser".
	}
)

app.get("/all-dogs", (req, res)=>{
	res.json({
		success: true,
		dogList: dogList
	})
})

app.get("/single-dog/:name", (req, res)=>{
	const foundDog = dogList.find((dog)=>{
		return dog.name === req.params.name
	})

	res.json({
		success: true,
		foundDog: foundDog
	})
})

app.post("/new-dog", (req, res)=>{

	// Validation code for checking that the incoming data to be created is of the proper shape and has the required fields.
	if (req.body.name === undefined || typeof(req.body.name) !== "string") {
		res.json({
			success: false,
			message: "dog name is required and must be a string"
		})
		return
	}
	if (req.body.breed === undefined || typeof(req.body.breed) !== "string"){
		res.json({
			success: false,
			message: "dog breed is required and must be a string"
		})
		return
	}
	if (req.body.age === undefined || typeof(req.body.age) !== "number"){
		res.json({
			success: false,
			message: "dog age is required and must be a number"
		})
		return
	}

	const newDog = {}
	newDog.name = req.body.name
	newDog.breed = req.body.breed
	newDog.age = req.body.age

	dogList.push(newDog)

	res.json({
		success: true
	})
})

app.put("/update-dog/:name", (req, res)=>{

	const dogNameToFind = req.params.name
	
	const originalDog = dogList.find((dog)=>{
		return dog.name === dogNameToFind
	})
	const originalDogIndex = dogList.findIndex((dog)=>{
		return dog.name === dogNameToFind
	})

	if (!originalDog) {
		res.json({
			success: false,
			message: "Could not find dog in dog list"
		})
		return
	}

	const updatedDog = {}

	if (req.body.name !== undefined){
		updatedDog.name = req.body.name
	} else {
		updatedDog.name = originalDog.name
	}

	if (req.body.breed !== undefined){
		updatedDog.breed = req.body.breed
	} else {
		updatedDog.breed = originalDog.breed
	}

	if (req.body.age !== undefined){
		updatedDog.age = req.body.age
	} else {
		updatedDog.age = originalDog.age
	}

	dogList[originalDogIndex] = updatedDog

	res.json({
		success: true
	})
})

app.delete("/delete-dog/:name", (req, res)=>{

	const dogNameToDelete = req.params.name

	const indexOfDog = dogList.findIndex((dog)=>{
		return dog.name === dogNameToDelete
	})

	dogList.splice(indexOfDog, 1)

	res.json({
		success: true
	})
})

app.listen(port, () => { // This method app.listen is the function that is causing our server to listen to requests in our terminal process.
  console.log(`Example app listening on port ${port}`)
})