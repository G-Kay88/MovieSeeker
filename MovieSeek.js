// Genre IDs for 8 genres (example values)
const genreIds = {
    Action: 28,
    Adventure: 12,
    Comedy: 35,
    Drama: 18,
    Horror: 27,
    Thriller: 53,
    Romance: 10749,
    ScienceFiction: 878
};

let activeGenreButton = null; // Track the currently active genre button

// Function to fetch and display movies by genre
function fetchMoviesByGenre(genreId, clickedButton) {
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
                displayMovies(data.results);
            }
        })
        .catch(error => {
            container.innerHTML = `<p>Error: ${error.message}</p>`;
        });

    // Remove the active class from the previous button
    if (activeGenreButton) {
        activeGenreButton.classList.remove("active");
    }

    // Add active class to the clicked button
    clickedButton.classList.add("active");
    activeGenreButton = clickedButton;
}

// Function to display movies in a grid format
function displayMovies(movies) {
    const container = document.getElementById("movieContainer");
    container.innerHTML = ""; // Clear any existing content

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movieCard';

        const posterPath = movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : 'https://via.placeholder.com/200x300';

        movieCard.innerHTML = `
            <a href="https://www.themoviedb.org/movie/${movie.id}" target="_blank">
                <img src="${posterPath}" alt="${movie.title}">
            </a>
            <p>${movie.title}</p>
        `;
        container.appendChild(movieCard);
    });
}

// Function to dynamically generate the genre navigation bar
function createGenreNav() {
    const navContainer = document.getElementById("genreNav");
    navContainer.innerHTML = ""; // Clear existing buttons

    Object.keys(genreIds).forEach(genre => {
        const button = document.createElement("button");
        button.className = "genreButton";
        button.innerText = genre;
        button.onclick = () => fetchMoviesByGenre(genreIds[genre], button);
        navContainer.appendChild(button);
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
                displayMovies(data.results);
            }
        })
        .catch(error => {
            container.innerHTML = `<p>Error: ${error.message}</p>`;
        });

    // Remove active highlight when searching
    if (activeGenreButton) {
        activeGenreButton.classList.remove("active");
        activeGenreButton = null;
    }
}

// Initialize the genre navigation when the page loads
createGenreNav();
