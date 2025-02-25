// Search Function
function movieSearch() {
    const query = document.getElementById("search").value.trim();
    const container = document.getElementById("movie-container");
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
                displayMovies(data.results); // Function to display movies
            }
        })
        .catch(error => {
            container.innerHTML = `<p>Error: ${error.message}</p>`;
        });
}

// Fetch Movies by Genre
function fetchMoviesByGenre(genreId) {
    const container = document.getElementById("movie-container");
    container.innerHTML = ""; // Clear previous results

    const API_KEY = "31b861aa702feb76eda95ccdd45fbbf1";
    const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`;

    fetch(API_URL)
        .then(response => {
            if (!response.ok) throw new Error("Network error");
            return response.json();
        })
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

// Function to fetch movie banner (random change every 30 seconds)
function fetchRandomBanner() {
    const bannerUrl = `https://api.themoviedb.org/3/trending/movie/day?api_key=31b861aa702feb76eda95ccdd45fbbf1`;
    fetch(bannerUrl)
        .then(response => response.json())
        .then(data => {
            const movie = data.results[0]; // Get a random trending movie
            const posterPath = movie.backdrop_path 
                ? `https://image.tmdb.org/t/p/w1920_and_h1080${movie.backdrop_path}` 
                : 'https://via.placeholder.com/1920x1080?text=Movie+Banner';

            document.getElementById("banner").src = posterPath;
        })
        .catch(error => console.error("Error fetching banner:", error));
}

// Change banner every 30 seconds
setInterval(fetchRandomBanner, 30000);
fetchRandomBanner();  // Initialize it right away

// Function to display movies in grid
function displayMovies(movies) {
    const container = document.getElementById("movie-container");
    movies.forEach(movie => {
        const posterPath = movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : 'https://via.placeholder.com/200';

        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML = `
            <img src="${posterPath}" alt="${movie.title}">
            <h4>${movie.title}</h4>
        `;
        container.appendChild(movieElement);
    });
}

// Allow "Enter" key to trigger search
document.getElementById("search").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        movieSearch();
    }
});
