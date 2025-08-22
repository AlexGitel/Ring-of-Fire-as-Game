export class GameObjects {
    public players: string[] = [];
    public stack: string[] = [];
    public playedCards: string[] = [];
    public currentPlayer: number = 0;
    public pickCardAnimation = false;
    public currentCard: string = '';

constructor() {
    // to go through all cards and shuffle them
    for (let i = 1; i < 14; i++) {
        this.stack.push('spades_' + i);
        this.stack.push('hearts_' + i);
        this.stack.push('diamonds_' + i);
        this.stack.push('clubs_' + i);
    }
    this.shuffleCards(this.stack);
}

// Convert GameObject to plain JSON, to add to Database as JSON
public gameObjectsToJson(){
    return {
        players: this.players,
        stack: this.stack,
        playedCards: this.playedCards,
        currentPlayer: this.currentPlayer,
        pickCardAnimation: this.pickCardAnimation,
        currentCard: this.currentCard
    }
}

// Convert plain JSON from database to GameObject, to use it in my game
static fromJsonToGameObjects(data: any): GameObjects {
    const game = new GameObjects();
        game.players = data.players ?? [];
        game.stack = data.stack ?? [];
        game.playedCards = data.playedCards ?? [];
        game.currentPlayer = data.currentPlayer ?? 0;
        game.currentCard = data.currentCard ?? [];
        game.pickCardAnimation = data.pickCardAnimation ?? [];
    return game;
  }

// all cards will be shuffled
public shuffleCards<T>(array: T[]): T[] {
    let currentIndex = array.length;
    while (currentIndex !== 0) {
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]
      ];
    }
    return array;
  }
}