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
                const movie = data.results[0]; // Get the first search result
                const posterPath = movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : 'https://via.placeholder.com/200';

                container.innerHTML = `
                    <h2>${movie.title} (${movie.release_date ? movie.release_date.split('-')[0] : 'N/A'})</h2>
                    <img src="${posterPath}" alt="${movie.title}">
                `;
            }
        })
        .catch(error => {
            container.innerHTML = `<p>Error: ${error.message}</p>`;
        });
}

function fetchMoviesByGenre(genreId, genreName) {
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

    // Show movie container and back button
    document.getElementById('movieContainer').style.display = 'grid';
    document.getElementById('backButton').style.display = 'inline-block';
}

function showGenres() {
    const genreGrid = document.getElementById('genreGrid');
    genreGrid.innerHTML = ''; // Clear current content

    // Create genre buttons
    for (const genre in genreIds) {
        const button = document.createElement('button');
        button.className = 'genreButton';
        button.innerText = genre;
        button.onclick = () => fetchMoviesByGenre(genreIds[genre], genre);
        genreGrid.appendChild(button);
    }

    // Hide movie container and back button
    document.getElementById('movieContainer').style.display = 'none';
    document.getElementById('backButton').style.display = 'none';
}
// Initially, show the genres
showGenres();

function displayMovies(movies) {
    const container = document.getElementById("movieContainer");
    container.innerHTML = ""; // Clear any existing content

    // Display movies in a 5x5 grid
    for (let i = 0; i < Math.min(movies.length, 25); i++) {
        const movie = movies[i];
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
    }
}
