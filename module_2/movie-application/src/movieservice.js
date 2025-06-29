const axios = require("axios");
const config = require("../config");
const dotenv = require("dotenv");
dotenv.config();

//After starting the JSOn server check the port on which is running accordingly change 
//the port in url given below
// JSON Server base URL
const BASE_URL = config.JSON_SERVER_BASE_URL;

//This method will get all movies from json server
const getMovies = (done) => {
  axios.get(BASE_URL)
    .then(response => {
      done(null, response.data);
    })
    .catch(error => {
      console.log(`Error encountered while getting movies: ${error.response}`)
      done(`Error encountered while getting movies: ${error.response}`);
    });
  // This url can be used - axios.get("http://localhost:3000/movies")
 
}

//This method will get specific movie id from json server
const getMovieById = (movieId, done) => {
  axios.get(`${BASE_URL}/${movieId}`)
    .then(response => {
      done(null, response.data);
    })
    .catch(error => {
      console.log(`Error encountered while getting movie by ID: ${error.message}`);
      done(`Error encountered while getting movie by ID: ${error.message}`);
    });
  // This url can be used- axios.get(`http://localhost:3000/movies/${movieId}`)
 
}
//This method will save Movie details in Json server
const saveMovieDetails = (movieDetails, done) => {
  axios.post(BASE_URL, movieDetails)
    .then(response => {
      done(null, response.data);
    })
    .catch(error => {
      console.log(`Error encountered while saving movie: ${error.message}`);
      done(`Error encountered while saving movie: ${error.message}`);
    });
  //This url can be used  -  axios.post(`http://localhost:3000/movies`, movieDetails)
 
}

//This method will update MovieDetails in Json Server
const updateMovieDetails = (movieId, movieDetails, done) => {
  axios.patch(`${BASE_URL}/${movieId}`, movieDetails)
    .then(response => {
      done(null, response.data);
    })
    .catch(error => {
      console.log(`Error encountered while updating movie: ${error.message}`);
      done(`Error encountered while updating movie: ${error.message}`);
    });
  //This url can be used - axios.patch(`http://localhost:3000/movies/${movieId}`, movieDetails)
 
}

//This method will delete specific movie from Json Server
const deleteMovieById = (movieId, done) => {
   axios.delete(`${BASE_URL}/${movieId}`)
    .then(response => {
      done(null, response.data);
    })
    .catch(error => {
      console.log(`Error encountered while deleting movie: ${error.message}`);
      done(`Error encountered while deleting movie: ${error.message}`);
    });
  //This url can be used -  axios.delete(`http://localhost:3000/movies/${movieId}`)
 
}

module.exports = {
  getMovies, getMovieById, saveMovieDetails, deleteMovieById, updateMovieDetails
}
