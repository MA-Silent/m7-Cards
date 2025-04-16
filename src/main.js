import './style.css'

const suits = ["♠", "♥", "♦", "♣"];
const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10","J", "Q", "K", "A"];
let players = [];
let currentPlayer = 0;
let currentCard;

class Card {
  constructor(suit,rank, onPlay){
    this.suit = suit;
    this.rank = rank;
    this.onPlay = onPlay;
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

    container.onclick= ()=>{
      if(players[currentPlayer].cards.includes(this)){
        if(this.suit == currentCard.suit){
          console.log(`Card: ${this.rank} ${this.suit} was played`)
          if (this.onPlay) {
            this.onPlay(this);
            currentCard = this;
          }
        }else{
          alert('You cannot play this card!')
        }
      }else{
        if(currentCard === this){
          alert('Cannot play the table card!')
        }else{
          alert('Cannot play not your turn!')
        }
      }
    }

    root.appendChild(container);
  }
};

class Deck {
  constructor(){
    this.cards = [];
    for(let suit =0;suit<suits.length;suit++){
      for(let rank=0;rank<ranks.length;rank++){
        this.cards.push({ suit: suits[suit], rank: ranks[rank] });
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
};

class Player {
  constructor(deck, id){
    this.deck = deck;
    this.id = id;
    this.cards =[];
    this.container = null;
    this.drawCards();
  }

  drawCards= ()=>{
    for (let i = 0; i < 7; i++) {
      const card = this.deck.cards.pop();
      this.cards.push(new Card(card.suit,card.rank,this.playCard))
    }
  }

  playCard = (cardToPlay) =>{
    document.getElementById('app').innerHTML='';
    cardToPlay.render(document.getElementById('app'));
    this.cards = this.cards.filter((card) => card !== cardToPlay);
    currentPlayer = (currentPlayer + 1)%players.length;
    this.container.innerHTML = '';
    players.forEach((player,index)=>{
      player.render(this.container,index===currentPlayer)
    })
  }

  render = (root,isCurrentPlayer)=>{
    if (!this.container) {
      this.container = document.createElement('div');
      root.appendChild(this.container);
    }

    this.container.innerHTML = '';
    this.container.style.display = 'flex';
    this.container.style.border = isCurrentPlayer ? '0.2rem dotted red' : '';
    this.container.style.padding = '0.2rem'
    this.container.style.borderRadius = '1rem';

    this.cards.forEach(card => {
      card.render(this.container);
    });
  }
};

function play(playerAmount){
  if(playerAmount != 2 && playerAmount != 3){
    document.body.innerText = `Invalid number of players must be 2 or 3`;
    return;
  }
  const deck = new Deck();
  const playerContainer = document.getElementById('players');

  playerContainer.innerHTML ='';
  players=[];
  currentPlayer=0;

  for (let i = 0; i < playerAmount; i++) {
    const player = new Player(deck);
    players.push(player);
    player.render(document.getElementById('players'), currentPlayer === i);
  }
  const firstCard = deck.cards.pop();
  currentCard = new Card(firstCard.suit,firstCard.rank,()=>{});
  currentCard.render(document.getElementById('app'));
}

play(2);