console.log("=== Black Jack ===");

window.onload = function() {
  var cardDeck = ["T1","T2","T3","T4","T5","T6","T7","T8","T9","T10","T11","T12","T13",
                  "D1","D2","D3","D4","D5","D6","D7","D8","D9","D10","D11","D12","D13",
                  "H1","H2","H3","H4","H5","H6","H7","H8","H9","H10","H11","H12","H13",
                  "S1","S2","S3","S4","S5","S6","S7","S8","S9","S10","S11","S12","S13"];
  var activeDeck = [];
  var cardsPlayer = [];
  var cardsDealer = [];
  var bankRoll = 2000;
  var currentBet = 0;
  var cardwpx = 79;
  var cardhpx = 123;
  var firstDraw = true;
  var firstDealer =[];

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
        bankRoll -= currentBet;
        logRegister('LOST',currentBet,bankRoll);
        document.getElementById('new-hand').removeAttribute('disabled','');
        document.getElementById('hit-me').setAttribute('disabled','');
        document.getElementById('hit-stop').setAttribute('disabled','');
    }
  }

  var displayResults = function(info) {
    // display the resuls of the game
    document.getElementById("dealer-info").innerHTML =
    "<h3>"+info+"</h3>"
    // "GAME OVER<br/><h3>"+info+"</h3>"

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
      var userBet = document.getElementById("bet-amount").textContent;
  // ** console.log("Player bet:", userBet);

      if (Number(userBet) <= 0 ) {
        storyTeller(2,userBet);
      } else {
        storyTeller(1,userBet);
        displayBet(userBet);
        document.getElementById('bet-clear').setAttribute('disabled','');
        document.getElementById('bet-submit').setAttribute('disabled','');
        document.getElementById('hit-me').removeAttribute('disabled','');
        document.getElementById('hit-stop').removeAttribute('disabled','');
        initialSet();
      }


  }

  var dealerClosing = function() {
    // do the finishing of the hand
  console.log("here comes the calculation");
  document.getElementById('hit-me').setAttribute('disabled','');
  document.getElementById('hit-stop').setAttribute('disabled','');
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
      bankRoll += currentBet;
      logRegister('WIN',currentBet,bankRoll);
    } else if (playerPoints == totalPoints) {
      displayResults('MATCH');
      logRegister('MATCH',currentBet,bankRoll);
    } else if (totalPoints > 21) {
      displayResults('WIN!!');
      bankRoll += currentBet;
      logRegister('WIN',currentBet,bankRoll);
    } else {
      displayResults('LOSS');
      bankRoll -= currentBet;
      logRegister('LOSS',currentBet,bankRoll);
    }
  document.getElementById('new-hand').removeAttribute('disabled','');
  // document.getElementById('new-hand').setAttribute('disabled','');
  // document.getElementById('new-hand').setAttribute('disabled','');
  var firstcard = document.getElementById('dealer-center').children[0];
  firstcard.children[0].style.top = "-"+firstDealer[1]+"px";
  firstcard.children[0].style.left = "-"+firstDealer[0]+"px";
}

  var logRegister = function(action,amount,total) {
    // display the result log
  var logItem = document.createElement('p');
  logItem.className = action;
  logItem.className += " log";
  logItem.textContent = action+" on $"+amount+" Now:"+total;
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
    cardItem.className += "card-item sprite";
    cardItem.dataset.cardPos = cardsDealer.length - 1;
    cardItem.textContent = card[1];
    document.getElementById('dealer-center').appendChild(cardItem);
    // ** console.log("activedeck",activeDeck);
    // ** console.log("cardsPlayer",cardsPlayer);
    var exactImage = getCardImage(card[1]);
    var cardImage = document.createElement('img');
    cardImage.setAttribute("src","images/cards.png");
    cardImage.style.position = 'absolute';
    if (firstDraw) {
      cardImage.style.top = "-492px";
      cardImage.style.left = "-158px";
      cardItem.appendChild(cardImage);
      firstDraw = false;
      firstDealer = exactImage;
    } else {
      cardImage.style.top = "-"+exactImage[1]+"px";
      cardImage.style.left = "-"+exactImage[0]+"px";
      cardItem.appendChild(cardImage);
    }

  }

  var displayPlayerCards = function(card) {
    cardsPlayer.push(card[1]);
    activeDeck.splice(card[0],1);



    // var cardImage = pictureCard(card[1]);
    // ** console.log("removing pos ---->["+card[0]+"] from activeDeck" );
    // ** console.log("activeDeck--->", activeDeck);
    // ** console.log("cardsPlayer--->", cardsPlayer);
    var cardItem = document.createElement('div');
    cardItem.className += "card-item sprite";
    cardItem.dataset.cardPos = cardsPlayer.length - 1;
    cardItem.textContent = card[1];
    document.getElementById('player-center').appendChild(cardItem);
    /* more here */

    // var c = document.getElementById('player-center').lastChild;
    // var ctx = c.getContext("2d");
    // var img = document.getElementById('img-of-img');
    // ctx.drawImage(img,0,0,79,123,0,0);
    var exactImage = getCardImage(card[1]);
    var cardImage = document.createElement('img');
    cardImage.setAttribute("src","images/cards.png");
    cardImage.style.position = 'absolute';
    cardImage.style.top = "-"+exactImage[1]+"px";
    cardImage.style.left = "-"+exactImage[0]+"px";
    cardItem.appendChild(cardImage);


    // ** console.log("activedeck",activeDeck);
    // ** console.log("cardsPlayer",cardsPlayer);



    // cardImage.style.position = 'absolute';
    //cardItem.appendChild(cardImage);


  }

  var newHand = function() {
    activeDeck = [];
    cardsPlayer = [];
    cardsDealer = [];
    currentBet = 0;
    firstDraw = true;
    firstDealer = [];
    document.getElementById("dealer-center").innerHTML = '';
    document.getElementById("player-center").innerHTML = '';
    document.getElementById("dealer-info").innerHTML = '';
    document.getElementById("bet-amount").textContent = currentBet;
    document.getElementById('new-hand').setAttribute('disabled','');
    document.getElementById('bet-clear').removeAttribute('disabled','');
    document.getElementById('bet-submit').removeAttribute('disabled','');

    storyTeller(0,"");

  }

  var displayBet = function(bet) {
    // display the current bet
    document.getElementById("dealer-info").innerHTML =
    "<h3>"+bet+"</h3>"
    // "Current bet<br/><h3>"+bet+"</h3>"

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


  var createChips = function(list) {
    // prepare chips display for bet entry
    var zone = document.getElementById("Chips");
    for (i=0; i<list.length; i++) {
      var chip = document.createElement('button');
      chip.classList.add('chip');
      chip.dataset.chip = list[i];
      chip.textContent = list[i];
      zone.appendChild(chip);
      chip.addEventListener('click', addmoney);
    }
  }

  var addmoney = function() {
    var userBet = document.getElementById("bet-amount").textContent;
    var more = this.dataset.chip;
    var sum = Number(userBet) + Number(more);
    if (sum > bankRoll) {
      storyTeller(5,more);
    } else {
      document.getElementById("bet-amount").textContent = sum;
    }

  }

  var clearmoney = function() {
    document.getElementById("bet-amount").textContent = "0";
  }

  var getCardImage = function(onecard) {
    console.log("onecard",onecard);
    var alp = onecard.slice(0,1);
    var num = onecard.slice(1,onecard.length);
    console.log(">>>>>>>>>>>>>>>>>",alp, num);
    var y = 0;
    if (alp == "D") { y = 1};
    if (alp == "H") { y = 2};
    if (alp == "S") { y = 3};
    var posxy = [];
    posxy[0] = Number(cardwpx) * (Number(num)-1);
    posxy[1] = Number(cardhpx) * Number(y);
    console.log(">>>>>Coord>>>>>>>",posxy);
    return posxy;
  }

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
      case 5:
        document.getElementById("narrative").textContent =
        "UPS!!  there is no more chips to bet. the additional "+text1+" is too much.";
        break;
      default:
        document.getElementById("narrative").textContent =
        "Oh-oh.  There is something wrong.  I do not know what it is...";
      }
  }

  // the acction start here...
  console.log("Waiting for action...");
  storyTeller(0,"");
  logRegister("Starting",bankRoll,bankRoll)
  createChips([1,5,10,50,100,500]);
  document.querySelector('#bet-submit').onclick = betEntry;
  document.querySelector('#hit-me').onclick = playerHit;
  document.querySelector('#hit-stop').onclick = dealerClosing;
  document.querySelector('#new-hand').onclick = newHand;
  document.querySelector('#bet-clear').onclick = clearmoney;
}
