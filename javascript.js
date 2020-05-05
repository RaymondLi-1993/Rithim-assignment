if(document.readyState === 'loading'){
    document.addEventListener('DOMContentloaded',ready());
  }
  else{
    ready();
  }
  
  function ready(){
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    console.log(overlays)
    overlays.forEach(overlay =>{
      overlay.addEventListener('click', () =>{
        overlay.classList.remove('visible')
      });
    });
  }
  
  
  
  
  let button = document.getElementById('button');
  let cards = document.querySelectorAll('.card');
  let lockBoard = false;
  let flipped = false;
  let firstCard, secondCard;
  let board = document.getElementById('board');
  let counter = document.getElementById('click-counter');
  let count = 0;
  let score = 0;
  let localStore = document.getElementById('highScores');
  if(localStorage.getItem('highscores') === null){
    localStorage.setItem('highscores', Infinity);
  }
  
  console.log(localStorage.getItem('highscores'))
  
  
  button.addEventListener('click', () =>{
    location.reload();
  })
  
  cards.forEach(card =>{
  card.addEventListener('click', flipCard);
  })
  
  
  function flipCard(cards){
   if (lockBoard) return;
   if(this === firstCard) return;
    this.classList.add('flip');
    counter.innerHTML = count += 1
  if(!flipped){
    flipped = true;
    firstCard = this;
  }
  else{
    flipped = false;
    secondCard = this;
  }
  checkMatch();
  gameOver();
  }
  
  function checkMatch(){
    if(secondCard.dataset.name === firstCard.dataset.name){
      score += 1
      disable();
    }
    else{ 
      unflip();
    }
    
  }
    
  function disable(){
    firstCard.removeEventListener('click', flipCard);
      secondCard.removeEventListener('click', flipCard);
      resetBoard();
  }
  
  function unflip(){
    lockBoard = true;
    setTimeout(function(){
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
      resetBoard();
      }, 1000);
  }
  
  function resetBoard(){
  [flipped, lockBoard] = [false,false];
  [firstCard, secondCard] = [null, null]
  }
  
  (function shuffle(){
    cards.forEach(card => {
      let randomPos = Math.floor(Math.random() * 12);
      card.style.order = randomPos;
    })
  })();
  
  function gameOver(){
    if (score >= 6){
      let previous = localStorage.getItem('highscores');
        localStorage.setItem('highscores', Math.min(previous, count));
      }
      localStore.innerHTML = localStorage.getItem('highscores');
    }