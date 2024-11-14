class Movie extends MovieTitle {
    constructor(title, popularity, revenue) {
        super(popularity, revenue);
        this.title = title;
        this.randomWord = 'Loading...';
        this.wordFetched = false; 
        this.fetchRandomWord();
    }

    async fetchRandomWord() {
        try {
            const response = await fetch(`https://api.wordnik.com/v4/words.json/randomWord?maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=2&maxLength=-1&api_key=wnnjlmio6z6mx0os9gkq3o74im7ayv7j9t1a3lq2e2egygwct`);
            const data = await response.json();
            this.randomWord = data.word;
            this.wordFetched = true;  
        } catch (error) {
            console.error('Error fetching random word:', error);
            this.randomWord = 'Error';
            this.wordFetched = true;
        }
    }

    display(x, y) {
        textSize(this.getTextSize());
        fill(this.getColor());
        textAlign(CENTER, CENTER);
    
        const wordToDisplay = this.randomWord === 'Loading...' ? 'Loading...' : this.randomWord;
        text(`${this.title} (${wordToDisplay})`, x, y);
    }   
}
