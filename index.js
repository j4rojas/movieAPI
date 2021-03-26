const API_KEY = '55bfac27b96d87dd18b1628b21422751';
const url = 'https://api.themoviedb.org/3/search/movie?api_key=55bfac27b96d87dd18b1628b21422751';
const imageURL = 'https://image.tmdb.org/t/p/w500';
const linkURL = 'https://www.themoviedb.org/movie/';

const submitButton = document.querySelector('#submitButton');
const searchList = document.querySelector('#searchList');

function moiveContainer(movies) {
    return movies.map((movie) => {
        if (movie.poster_path) {

            $('#searchList').append(
                `
                <a href="${linkURL+ movie.id} + movieID=${movie.id}">
                    <img src=${imageURL + movie.poster_path} movieID=${movie.id}" class="movieImage"> 
                </a>
            `)
        }
        else {
            $('#searchList').append(
                `
                <a href="${linkURL+ movie.id} + movieID=${movie.id}">
                    <img src="images/dog.jpg" class="noImage" movieID=${movie.id}/>
                </a>
            `)
        }
    });
}

function array (total) {
    if(total===0) {
        console.log("Sorry, no movies found");
        $('#searchList').append(`
            <div class="noResults">
                <div class="noResults_text">
                    <h2>Sorry</h2>
                    <h3>No movies were found</h3>
                    <p>Try a different search</p>
                </div>
                <img src="images/husky.jpg"/>
            </div>
     `);
    }
}

function listMovies(movies) {
    const movieOutput = moiveContainer(movies); //called this function instead of code above
    movieElement.innerHTML = movieOutput;
    return movieElement;
}

function callFunction (myJson) {
    const movies = myJson.results;
    const total = myJson.total_results;
    const arrayTotal = array(total);
    const movieBox = listMovies(movies);
    searchList.appendChild(movieBox);
    const title = myJson.results.title;
}

function clearResults(){
    $("#searchList").children().remove();
}

function clearInput() {
    let userSearch =$('.userSearch').val('');
}

submitButton.onclick = function (event) {
    event.preventDefault();
    let userSearch =$('.userSearch').val();
    updateURL = url + "&query=" + userSearch;

    if (userSearch) {
        clearResults();
    }
    if (userSearch !='') {
        clearInput();
    }
  
    fetch(updateURL)
        .then((res) => res.json ())
        .then(callFunction)
        .catch((error) => {
            console.log('Error: ', error);
        });
}  
