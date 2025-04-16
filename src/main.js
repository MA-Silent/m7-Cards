import './style.css'

const suits = ["♠", "♥", "♦", "♣"];
const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10","J", "Q", "K", "A"];

class Card {
  constructor(suit,rank){
    this.suit = suit;
    this.rank = rank;
  }

  render = (root)=>{
    const isRed = (this.suit === suits[1] || this.suit === suits[2]);

    const container = document.createElement('div');
    container.className = 'card';

    const topLeft = document.createElement('div');
    topLeft.className = 'top-left' + (isRed ? ' red' : '');
    topLeft.innerText = `${this.rank}${this.suit}`;

    const bottomRight = document.createElement('div');
    bottomRight.className = 'bottom-right' + (isRed ? ' red' : '');
    bottomRight.innerText = `${this.rank}${this.suit}`;

    const center = document.createElement('div');
    center.className = 'center-suit' + (isRed ? ' red' : '');
    center.innerText = this.suit;

    container.appendChild(topLeft);
    container.appendChild(bottomRight);
    container.appendChild(center);

    root.appendChild(container);
  }
};

class Deck {
  constructor(){
    this.cards = [];
    for(let suit =0;suit<suits.length;suit++){
      for(let rank=0;rank<ranks.length;rank++){
        this.cards.push(new Card(suits[suit],ranks[rank]));
      }
    }
    this.shuffle();
  }

  shuffle = ()=>{
      let cI = this.cards.length;
      while (cI != 0) {
        let rI = Math.floor(Math.random() * cI);
        cI--;
        [this.cards[cI], this.cards[rI]] = [this.cards[rI], this.cards[cI]];
    }
    
  }
}


const testCard = new Deck().cards[51].render(document.getElementById('app'));