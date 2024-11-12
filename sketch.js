let table;
let genres = {};
let selectedMovie = null;
let textLocationX = null;
let textLocationY = null;

/**
 * Loads the CSV file containing movie data.
 */
function preload() {
    console.log("Attempting to load CSV file...");
    table = loadTable('/tmdb_5000_movies.csv', 'csv', 'header', loadSuccess, loadError);
}

/**
 * Callback function when the CSV file loads successfully.
 */
function loadSuccess() {
    console.log("CSV loaded successfully");
}

/**
 * Callback function when the CSV file fails to load.
 */
function loadError() {
    console.error("Failed to load CSV file.");
}

/**
 * P5.js setup function. Initializes the canvas and processes data.
 */
function setup() {
    createCanvas(windowWidth, windowHeight * 2);
    handleData();
}

/**
 * Processes data from the CSV and stores it in genres.
 */
function handleData() {
    table.rows.forEach(row => {
        const title = row.getString("original_title") || "Unknown";
        const popularity = row.getNum("popularity") || 0;
        const revenue = row.getNum("revenue") || 0;
        const genreArr = parseGenres(row.getString("genres"));

        const movie = new Movie(title, popularity, revenue);

        for (let i = 0; i < genreArr.length; i++) {
            const genre = genreArr[i];

            if (!genres[genre]) {
                genres[genre] = new Genre(genre);
            }
            genres[genre].addMovie(movie);
        }
    });

    Object.values(genres).forEach(genre => genre.fetchDefinition());

    console.log(genres);
}

/**
 * Parses the genres string from the movie data.
 * @param {string} genreStr - JSON string of genres.
 * @returns {string[]} Array of genre names.
 */
function parseGenres(genreStr) {
    try {
        return JSON.parse(genreStr).map(g => g.name);
    } 
    catch (error) {
        console.warn("Failed to parse genres:", genreStr);
        return ["Unknown"];
    }
}

/**
 * Draws the genres and movie details.
 */
function draw() {
    background(0);
    const genreList = Object.keys(genres);
    const rows = ceil(genreList.length / 3);
    const colWidth = width / 3;
    const rowHeight = height / rows;

    genreList.forEach((genreName, i) => {
        const x = (i % 3) * colWidth + colWidth / 2;
        const y = floor(i / 3) * rowHeight + rowHeight / 2;
        genres[genreName].display(x, y);
    });

    if (selectedMovie) {
        displayMovieDetails();
    }
}

/**
 * Displays details of the selected movie.
 */
function displayMovieDetails() {
    fill(255);
    textSize(16);
    textAlign(LEFT);
    text(
        `Title: ${selectedMovie.title}\n` +
        `Popularity: ${selectedMovie.popularity}\n` +
        `Revenue: $${selectedMovie.revenue.toLocaleString()}`,
        textLocationX, textLocationY
    );
}

/**
 * Stores the mouse location and checks if a movie was clicked.
 */
function mousePressed() {
    textLocationX = mouseX;
    textLocationY = mouseY;

    selectedMovie = Object.values(genres)
        .map(genre => genre.checkClick(mouseX, mouseY))
        .find(movie => movie !== null);

    redraw();
}
