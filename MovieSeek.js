// Function to fetch and display movies by genre
function fetchMoviesByGenre(genreId) {
    const container = document.getElementById("movieContainer");
    container.innerHTML = ""; // Clear previous results

    const API_KEY = "31b861aa702feb76eda95ccdd45fbbf1";
    const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`;

    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            if (data.results.length === 0) {
                container.innerHTML = `<p>No results found for this genre.</p>`;
            } else {
                displayMovies(data.results); // Function to display movies
            }
        })
        .catch(error => {
            container.innerHTML = `<p>Error: ${error.message}</p>`;
        });
}

// Function to display movies in a grid format
function displayMovies(movies) {
    const container = document.getElementById("movieContainer");
    container.innerHTML = ""; // Clear any existing content

    // Display movies in a grid
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movieCard';

        const posterPath = movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : 'https://via.placeholder.com/200x300';

        movieCard.innerHTML = `
            <img src="${posterPath}" alt="${movie.title}">
            <p>${movie.title}</p>
        `;
        container.appendChild(movieCard);
    });
}

// Function to search movies by title
function movieSearch() {
    const query = document.getElementById("search").value.trim();
    const container = document.getElementById("movieContainer");
    container.innerHTML = ""; // Clear previous results

    if (!query) {
        container.innerHTML = "<p>Please enter a movie title.</p>";
        return;
    }

    const API_KEY = "31b861aa702feb76eda95ccdd45fbbf1";
    const API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;

    fetch(API_URL)
        .then(response => {
            if (!response.ok) throw new Error("Network error");
            return response.json();
        })
        .then(data => {
            if (data.results.length === 0) {
                container.innerHTML = `<p>No results found.</p>`;
            } else {
                displayMovies(data.results); // Display multiple results in a grid
            }
        })
        .catch(error => {
            container.innerHTML = `<p>Error: ${error.message}</p>`;
        });
}
