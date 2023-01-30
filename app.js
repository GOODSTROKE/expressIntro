// Bring in Express code
const express = require('express')

const app = express()
const port = 3000

app.use(express.json()) // This line is necessary for Express to be able to parse JSON in request body's

const favoriteMovieList = [{
    title: "Star Wars",
    starRating: 5,
    isRecommended: true,
    createdAt: new Date(),
    lastModified: new Date()
}, {
    title: "The Avengers",
    starRating: 4,
    isRecommended: true,
    createdAt: new Date(),
    lastModified: new Date()
}, {
    title: "The Doll",
    starRating: 9
    isRecommended: true,
    createdAt: new Date(),
    lastModified: new Date()
}];

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

/* ### 3) Create Routes

- Create a new Postman request in the ExpressIntro collection called "new-movie". This request should make a POST request to localhost:3000/new-movie. In the Body section of the request set the input type dropdown to raw and then set the format type to JSON. Write a new JSON object in the body of one of your favorite movies with the following format:
*/



/* ### 4) Update Routes

- Create a new Postman request in the ExpressIntro collection called "update-movie". This request should make a PUT request to localhost:3000/update-movie/{your-movie-title} (replace {your-movie-title} with the title of the movie you created in the "new-movie" request). In the Body section of the request set the input type dropdown to raw and then set the format type to JSON. Write a new JSON object in the body with the following format. The values for title, starRating and isRecommended should be different than the ones you had for "new-movie".
*/

const updatedFilm = {}

	if (req.body.title !== undefined){
		updatedFilm.title = req.body.title
	} else {
		updatedFilm.title = favoriteMovieList.title
	}

	if (req.body.createdAt !== undefined){
		updatedFilm.createdAt = req.body.createdAt
	} else {
		updatedFilm.createdAt = favoriteMovieList.createdAt
	}

	if (req.body.lastModified !== undefined){
		updatedFilm.lastModified = req.body.lastModified
	} else {
		updatedFilm.lastModified = favoriteMovieList.lastModified
	}

	favoriteMovieList[originalFilmIndex] = updatedFilm

	res.json({
		success: true
	})


//--

/* ### 5) Delete Routes

- Create a new Postman request in the ExpressIntro collection called "delete-movie". This request should make a DELETE request to localhost:3000/{your-movie-title} (replace {your-movie-title} with the title of the movie you created in the "new-movie" request or the new title you gave that movie in the "update-movie" request).
*/

app.delete("/delete-film/:title", (req, res)=>{

	const filmNameToDelete = req.params.title

	const indexOfFilm = favoriteMovieList.find((film)=>{
		return film.name === filmNameToDelete
	})

    const indexOfFilm = favoriteMovieList.filter((film)=>{
		return film.name === filmNameToDelete
	})

	res.json({
		success: true
	})
})




//--

app.get("/all-films", (req, res)=>{
	res.json({
		success: true,
		"all-films": favoriteMovieList
	})
})

app.get("/single-film/:filmToFind", (req, res)=>{
	const getFilm = favoriteMovieList.find((Film)=>{
		return film.title === req.params.name
	})

	res.json({
		success: true,
		foundDog: foundDog
	})
})
