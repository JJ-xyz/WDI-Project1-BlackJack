console.log("=== Black Jack ===");

window.onload = function() {
  var cardDeck = ["H1","H2","H3","H4","H5","H6","H7","H8","H9","H10","H11","H12","H13",
                  "T1","T2","T3","T4","T5","T6","T7","T8","T9","T10","T11","T12","T13",
                  "D1","D2","D3","D4","D5","D6","D7","D8","D9","D10","D11","D12","D13",
                  "S1","S2","S3","S4","S5","S6","S7","S8","S9","S10","S11","S12","S13"];
  var cardsPlayer = [];
  var cardsDealer = [];
  var bankRoll = [];
  var currentBet = 0;

  var initialSet = function() {
    // here: first two cards.
    console.log("initialSet in progress...");
    var userBet = document.getElementById("bet-amount").value;
    console.log("Player bet:", userBet);
    storyTeller(1,userBet);
    displayBet(userBet);



  }

  var playerHit = function() {
    // here: hit routine by yhr player


  }

  var displayResults = function() {
    // display the resuls of the game


  }

  var betEntry = function() {
    // accept the game bet



  }

  var dealerRoutine = function() {
    // do the finishing of the hand



  }

  var logRegister = function() {
    // display the result log



  }
  var increaseBet = function() {
    // add 1 to the bet ammount



  }

  var decreaseBet = function() {
    // substract 1 to the bet ammount


  }

  var displayBet = function(bet) {
    document.getElementById("dealer-info").innerHTML =
    "Current bet<br/><h3>"+bet+"</h3>"


  }

  var storyTeller = function(a,text1) {
    switch (a) {
      case 1:
        document.getElementById("narrative").textContent =
        "The player decided to make a bet of "+text1+".";
        break;
      default:
        document.getElementById("narrative").textContent =
        "Keep playing - but there is some error in the story";
      }
  }

  // the acction start here...
  console.log("Waiting for action...");

  document.querySelector('#bet-submit').onclick = initialSet;

}
