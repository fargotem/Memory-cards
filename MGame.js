// Array of card images
const cardImages = [
    'image1.jpg',
    'image2.jpg',
    'image3.jpg',
    'image4.jpg',
    'image5.jpg',
    'image6.jpg',
    'image1.jpg',
    'image2.jpg',
    'image3.jpg',
    'image4.jpg',
    'image5.jpg',
    'image6.jpg'
  ];
  
  let cards = [];
  let flippedCards = [];
  let matchedCards = [];
  
  function startGame() {
    // Reset variables
    cards = [];
    flippedCards = [];
    matchedCards = [];

  
    // Shuffle card images
  const shuffledImages = shuffleArray(cardImages);
   //  console.log (cards," card ",flippedCards," flipped ",matchedCards," matched ",shuffledImages)
    // Create card elements
    for (let i = 0; i < shuffledImages.length; i++) {
      const card = document.createElement('div');
      card.className = 'card';
      card.dataset.image = shuffledImages[i];
      card.addEventListener('click', flipCard);
      cards.push(card);
    }
    // Shuffle cards
    shuffleArray(cards);
  
    // Append cards to the game board
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML="";
    for (let i = 0; i < cards.length; i++) {
      gameBoard.appendChild(cards[i]);
    }
  }
  
  function flipCard() {
    if (flippedCards.length < 2 && !flippedCards.includes(this) && !matchedCards.includes(this)) {
      this.classList.add('flipped');
      flippedCards.push(this);
  
      if (flippedCards.length === 2) {
        checkForMatch();
      }
    }

  }
  
  function checkForMatch() {
    const card1 = flippedCards[0];
    const card2 = flippedCards[1];
  
    if (card1.dataset.image === card2.dataset.image) {
      card1.removeEventListener('click', flipCard);
      card2.removeEventListener('click', flipCard);
      matchedCards.push(card1, card2);
      flippedCards = [];
  
      if (matchedCards.length === cards.length) {
        setTimeout(function () {
          alert('Congratulations! You won the game!');
          startGame();
        }, 500);
      }
    } else {
      setTimeout(function () {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        flippedCards = [];
      }, 1000);
    }
  }
  
  // Fisher-Yates shuffle algorithm
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  // Start the game when the page loads
  document.addEventListener('DOMContentLoaded', startGame());
  