console.log("=== Black Jack ===");

window.onload = function() {
  var cardDeck = ["H1","H2","H3","H4","H5","H6","H7","H8","H9","H10","H11","H12","H13",
                  "T1","T2","T3","T4","T5","T6","T7","T8","T9","T10","T11","T12","T13",
                  "D1","D2","D3","D4","D5","D6","D7","D8","D9","D10","D11","D12","D13",
                  "S1","S2","S3","S4","S5","S6","S7","S8","S9","S10","S11","S12","S13"];
  var activeDeck = [];
  var cardsPlayer = [];
  var cardsDealer = [];
  var bankRoll = [];
  var currentBet = 0;

  var initialSet = function() {
    // here: first two cards.
console.log("initialSet of Table in progress...");
    activeDeck = cardDeck;
    var firstPlayPlayer = nextCard();
    displayPlayerCards(firstPlayPlayer);
    var secondPlayPlayer = nextCard();
    displayPlayerCards(secondPlayPlayer);
    var totalPoints = verifyStatus(cardsPlayer);
    console.log("===Initial sum", totalPoints);
    var firstPlayDealer = nextCard();
    displayDealerCards(firstPlayDealer);
    var secondPlayDealer = nextCard();
    displayDealerCards(secondPlayDealer);

  }

  var playerHit = function() {
    // here: hit routine by yhr player
    var nextPlayPlayer = nextCard();
    displayPlayerCards(nextPlayPlayer);
    var totalPoints = verifyStatus(cardsPlayer);
    console.log("total Points Player:", totalPoints);
    if (totalPoints > 21) {
        storyTeller(4,totalPoints);
        displayResults('BUSTED');
        logRegister('LOST',currentBet);
    }
  }

  var displayResults = function(info) {
    // display the resuls of the game
    document.getElementById("dealer-info").innerHTML =
    "GAME OVER<br/><h3>"+info+"</h3>"
    console.log(info);



  }

  var verifyStatus = function(list) {
    // verify the counting of cards
    var sumCardsA = 0;
    var sumCardsB = 0;
    for (var i=0; i<list.length; i++) {
      var value = Number(list[i].slice(1,list[i].length));
      if (value == 1) {
        sumCardsA += 1;
        sumCardsB += 11
        ;
      } else if (value > 10) {
        sumCardsA += 10;
        sumCardsB += 10;
      } else {
        sumCardsA += value;
        sumCardsB += value;
      }
      //console.log(value, "added to", sumCardsA, "or", sumCardsB);
    }

    if (sumCardsB > 21) {
      return sumCardsA;
    } else {
      return sumCardsB;
    }
  }

  var betEntry = function() {
    // accept the game bet
  console.log("preparing for Data Entry...");
      var userBet = document.getElementById("bet-amount").value;
  // ** console.log("Player bet:", userBet);

      if (Number(userBet) == NaN || Number(userBet) == null ||
          Number(userBet) == undefined || Number(userBet) <= 0 ) {
        storyTeller(2,userBet);
      } else {
        storyTeller(1,userBet);
        displayBet(userBet);
        initialSet();
      }


  }

  var dealerClosing = function() {
    // do the finishing of the hand
  console.log("here comes the calculation");
  var playerPoints = verifyStatus(cardsPlayer);
  var totalPoints = verifyStatus(cardsDealer);
  console.log("total Points Dealer:", totalPoints);
  while (totalPoints < 17) {
    var nextPlayDealer = nextCard();
    displayDealerCards(nextPlayDealer);
    totalPoints = verifyStatus(cardsDealer);
    console.log("total Points Dealer:", totalPoints);
  }
  if (playerPoints > totalPoints && totalPoints <= 21) {
      displayResults('WIN!!');
      logRegister('WIN',currentBet);
    } else if (playerPoints == totalPoints) {
      displayResults('MATCH');
      logRegister('MATCH',currentBet);
    } else if (totalPoints > 21) {
      displayResults('WIN!!');
      logRegister('WIN',currentBet);
    } else {
      displayResults('LOSS');
      logRegister('LOSS',currentBet);
    }

}

  var logRegister = function(result,bet) {
    // display the result log
  var logItem = document.createElement('p');
  logItem.className = result;
  logItem.className += " log";

  logItem.textContent = result+" hand of $"+bet;
  document.getElementById('log-list').appendChild(logItem);
  }

  var increaseBet = function() {
    // add 1 to the bet ammount
    console.log('increase');
    console.log(this);
    //var amount = document.getElementById('bet-amount').value;
    //var moreqty = document.getElementByClass('more').id;


  }

  var decreaseBet = function() {
    // substract 1 to the bet ammount


  }

  var displayDealerCards = function(card) {
    cardsDealer.push(card[1]);
    activeDeck.splice(card[0],1);
    // ** console.log("removing pos ---->["+card[0]+"] from activeDeck" );
    // ** console.log("activeDeck--->", activeDeck);
    // ** console.log("cardsDealer--->", cardsDealer);
    var cardItem = document.createElement('div');
    cardItem.className += "card-item";
    cardItem.dataset.cardPos = cardsDealer.length - 1;
    cardItem.textContent = card[1];
    document.getElementById('dealer-center').appendChild(cardItem);
    // ** console.log("activedeck",activeDeck);
    // ** console.log("cardsPlayer",cardsPlayer);
  }

  var displayPlayerCards = function(card) {
    cardsPlayer.push(card[1]);
    activeDeck.splice(card[0],1);
    // ** console.log("removing pos ---->["+card[0]+"] from activeDeck" );
    // ** console.log("activeDeck--->", activeDeck);
    // ** console.log("cardsPlayer--->", cardsPlayer);
    var cardItem = document.createElement('div');
    cardItem.className += "card-item";
    cardItem.dataset.cardPos = cardsPlayer.length - 1;
    cardItem.textContent = card[1];
    document.getElementById('player-center').appendChild(cardItem);
    /* more here */
    // ** console.log("activedeck",activeDeck);
    // ** console.log("cardsPlayer",cardsPlayer);
  }

  var newHand = function() {
    activeDeck = [];
    cardsPlayer = [];
    cardsDealer = [];
    currentBet = 0;
    document.getElementById("dealer-center").innerHTML = '';
    document.getElementById("player-center").innerHTML = '';
    document.getElementById("dealer-info").innerHTML = '';
    storyTeller(0,"");

  }

  var displayBet = function(bet) {
    // display the current bet
    document.getElementById("dealer-info").innerHTML =
    "Current bet<br/><h3>"+bet+"</h3>"
    currentBet = Number(bet);
    console.log("in process current bet",currentBet);
  }

  var nextCard = function() {
    // get next card from the deck [0] pos [1] value
    var theCard = [];
    if (activeDeck.length > 0 ) {
      theCard[0] = (Math.floor(Math.random()*activeDeck.length+1))-1;
      theCard[1] = activeDeck[theCard[0]];
      console.log("selected number", theCard);
      console.log("selected card", activeDeck[theCard[0]]);
      return theCard;
      }
      else {
        storyTeller(3,"");
        return theCard;
      }
  }

  // **** Intento de crear la forma de entrada de datos ****
  //
  // var betDisplay = function() {
  //   // prepare display for bet entry
  //   var entryform = document.getElementById('forma')
  //   var input = document.createElement('input');
  //   input.setAttribute('placeholder', "Enter yout bet");
  //   input.setAttribute('Id',"bet-amount");
  //   input.setAttribute('type', "text");
  //   entryform.appendChild(input);
  //
  //   var button = document.createElement('button');
  //   button.setAttribute('Id',"bet-submit")
  //   button.textContent = "START";
  //   entryform.appendChild(button);
  //
  //   button.addEventListener('click', betEntry);
  //
  //
  //
  // }

  var storyTeller = function(a,text1) {
    switch (a) {
      case 0:
        document.getElementById("narrative").textContent =
        "The player must enter its bet and press START.";
        break;
      case 1:
        document.getElementById("narrative").textContent =
        "The player decided to make a bet of "+text1+".";
        break;
      case 2:
        document.getElementById("narrative").textContent =
        "The player need to enter a bet to start the game. ["+text1+"] is not valid.";
        break;
      case 3:
        document.getElementById("narrative").textContent =
        "NO MORE Cards to play. Re-Start to continue playing";
        break;
      case 4:
        document.getElementById("narrative").textContent =
        "You are BUSTED. Your total cards value is "+text1;
        break;
      default:
        document.getElementById("narrative").textContent =
        "Keep playing - but there is some error in the story";
      }
  }

  // the acction start here...
  console.log("Waiting for action...");
  storyTeller(0,"");
  //betDisplay([1,5,10,50,100,500]);
  document.querySelector('#bet-submit').onclick = betEntry;
  document.querySelector('#hit-me').onclick = playerHit;
  document.querySelector('#hit-stop').onclick = dealerClosing;
  document.querySelector('#new-hand').onclick = newHand;
  //document.querySelector('.more').onclick = increaseBet;
}
