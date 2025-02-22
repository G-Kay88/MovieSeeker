function movieSearch() {
    const query = document.getElementById("search").value.trim();
    const container = document.getElementById("movieDisplay");
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
