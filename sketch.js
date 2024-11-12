let table; 
let movies = []; 
let offsetY = 0; 

function preload() {
    console.log("Attempting to load CSV file...");
    table = loadTable('/tmdb_5000_movies.csv', 'csv', 'header', loadSuccess, loadError);
}

function loadSuccess() {
    console.log("CSV loaded successfully");
}

function loadError() {
    console.error("Failed to load CSV file.");
}

function setup() {
    createCanvas(windowWidth+550, windowHeight);
    handleData();
}

function handleData() {
    table.rows.forEach(row => {
        const title = row.getString("original_title") || "Unknown";
        const popularity = row.getNum("popularity") || 0;
        const revenue = row.getNum("revenue") || 0;

        const movie = new Movie(title, popularity, revenue);
        movies.push(movie);
    });

    console.log(movies);
}

function draw() {
    background(123);

    const cols = 3;
    const colWidth = width / cols;
    const rowHeight = 50;

    movies.forEach((movie, i) => {
        const col = i % cols;
        const row = floor(i / cols);
        const x = col * colWidth + colWidth / 2;
        const y = row * rowHeight + rowHeight / 2 + offsetY;

        movie.display(x, y);
    });
}

function mouseWheel(event) {
    offsetY -= event.delta;
}
