class Movie extends MovieTitle {
    constructor(title, popularity, revenue) {
        super(popularity, revenue); 
        this.title = title;
        this.randomWord = 'Loading...';
        this.fetchRandomWord();
    }

    async fetchRandomWord() {
        try {
            const response = await fetch(`https://api.wordnik.com/v4/words.json/randomWord?api_key=wnnjlmio6z6mx0os9gkq3o74im7ayv7j9t1a3lq2e2egygwct`);
            const data = await response.json();
            this.randomWord = data.word;
        } catch (error) {
            console.error('Error fetching random word:', error);
            this.randomWord = 'Error';
        }
    }

    display(x, y) {
        textSize(this.getTextSize());
        fill(this.getColor());
        textAlign(CENTER, CENTER);
        text(`${this.title} (${this.randomWord})`, x, y);
    }
}
