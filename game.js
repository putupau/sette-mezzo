// HTML element references for UI updates
let messageElem = document.querySelector(".message");
let playerCardsElem = document.querySelector(".player-cards");
let sumElem = document.querySelector(".player-sum");
let dealerCardsElem = document.querySelector(".dealer-cards");
let dealerSumElem = document.querySelector(".dealer-sum");
let winnerElem = document.querySelector(".winner");
let playerNameElem = document.querySelector(".player-name");

// Button references
let placeBetButtonElem = document.getElementById("place-bet-btn");
let leaveGameButtonElem = document.getElementById("leave-game-btn");
let hitButtonElem = document.getElementById("hit-btn");
let standButtonElem = document.getElementById("stand-btn");

// Game state variables
let dealerSum = 0;
let sum = 0;

let hiddenCardDealer;
let hiddenCardPlayer;

let canHit = true; // Determines if the player can draw cards
let canStand = true; // Determines if the player can end their turn
let canDeal = true; // Determines if the game can start

let bet; // Stores the player's current bet
let deck = []; // Stores the shuffled deck of cards
let isAlive = false; // Tracks if the game is ongoing

// Player information
let player = {
    name: "",
    amount: 0 // Starting money
};

let firstRound = true; // Tracks if it's the first round

// Prompt the player for their name and starting amount
player.name = prompt("Enter your name: ");
player.amount = +prompt("Enter the amount of money to play with: ");

// Update UI with player details
if (player.name && player.amount) {
    playerNameElem.textContent = player.name; // Updates player's name
    winnerElem.textContent = "You have $" + player.amount + " available"; // Displays starting amount
}

/**
 * Ensures the player has valid information.
 * Redirects to the main page if the name is invalid.
 * @param {Function} func - The function to call after verification.
 */
function verifyUserIntegrity(func) {
    if (player.name === "") {
        alert("No valid player information. Redirecting to the main page.");
        window.location.href = "index.html"; // Replace with your main page URL
    } else {
        func(); // Calls the corresponding function
    }
}

/**
 * Builds a new deck of cards.
 * Excludes cards with values 8 and 9.
 */
function buildDeck() {
    const suits = ["O", "C", "E", "B"]; // Oros, Copas, Espadas, Bastos
    const newDeck = []; // Resets deck

    suits.forEach(suit => {
        for (let i = 1; i <= 12; i++) {
            if (i !== 8 && i !== 9) { // Exclude cards 8 and 9
                newDeck.push(`${i}-${suit}`); // Format: number-suit
            }
        }
    });
    deck = newDeck;
}

/**
 * Shuffles the deck using Fisher-Yates algorithm.
 */
function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

/**
 * Gets the value of a card.
 * @param {string} card - The card in the format number-suit.
 * @returns {number} - The value of the card.
 */
function getValue(card) {
    let number = parseInt(card.split("-")[0]);
    if (number === 10 || number === 11 || number === 12) return 0.5;
    else return number;
}

/**
 * Starts the game by initializing the game state and dealing the first cards.
 */
function startGame() {
    if (canDeal) {
        isAlive = true;

        if (player.amount > 0) {
            bet = +prompt("Enter the amount of money to bet: ");
            if (bet > player.amount) {
                alert("You don't have enough money to bet");
                messageElem.textContent = "You can't bet $" + bet + " because you only have $" + player.amount + " available";
                isAlive = false;
            } else if (bet <= 0) {
                alert("You can't bet 0 or less");
                isAlive = false;
            } else {
                // show hit and stand buttons once game starts
                hitButtonElem.classList.remove("hidden");
                standButtonElem.classList.remove("hidden");

                // hide buttons when game starts
                placeBetButtonElem.classList.add("hidden");
                leaveGameButtonElem.classList.add("hidden");

                // clear previous game
                messageElem.textContent = "";
                dealerCardsElem.textContent = "";
                playerCardsElem.textContent = "";
                dealerSumElem.textContent = "";
                sumElem.textContent = "";

                isAlive = true;
                firstRound = true;

                messageElem.textContent = "You have bet $" + bet;
                let moneyLeft = player.amount - bet;
                winnerElem.textContent = "You have $" + moneyLeft + " available";

                // build new game
                buildDeck();
                shuffleDeck();

                canDeal = false;
                canHit = true;
                canStand = true;

                hiddenCardDealer = deck.pop();
                hiddenCardPlayer = deck.pop();

                dealerSum = getValue(hiddenCardDealer);
                sum = getValue(hiddenCardPlayer);

                // display faced down card for dealer and player
                displayCard(dealerCardsElem, "back");
                displayCard(playerCardsElem, "back");
            }
        } else {
            // you have no money
            // ask to play again but this time with a new amount
        }
    }
}

/**
 * Gets the coordinates of a card in the sprite sheet.
 * @param {string} cardName - The name of the card.
 * @returns {Object} - The coordinates and dimensions of the card.
 */
function getCardCoordinates(cardName) {
    // Card dimensions based on SVG layout
    const svgWidth = 2048;
    const svgHeight = 1309;
    const cardWidth = svgWidth / 12; // 170.67px
    const cardHeight = svgHeight / 5; // 261.8px

    // Rows for suits
    const suitRows = {
        "O": 0, // Oros
        "C": 1, // Copas
        "E": 2, // Espadas
        "B": 3  // Bastos
    };

    // Check for special case: facedown card
    if (cardName === "back") {
        return {
            x: cardWidth, // 2nd column
            y: cardHeight * 4, // 5th row
            width: cardWidth,
            height: cardHeight
        };
    }

    // Parse card name
    const [cardValue, suit] = cardName.split("-");

    // Ensure the suit is valid
    if (!suitRows.hasOwnProperty(suit)) {
        throw new Error(`Invalid suit: ${suit}`);
    }

    const row = suitRows[suit];
    const column = parseInt(cardValue, 10);

    // Validate card value
    if (
        column < 1 || column > 12 ||   // Only numbers 1-12 are valid
        column === 8 || column === 9  // Exclude columns 8 and 9
    ) {
        throw new Error(`Invalid card value: ${column}`);
    }

    // Calculate position
    const x = (column - 1) * cardWidth;
    const y = row * cardHeight;

    return {
        x,
        y,
        width: cardWidth,
        height: cardHeight
    };
}

/**
 * Displays a card in the specified container.
 * @param {HTMLElement} container - The container to display the card in.
 * @param {string} cardName - The name of the card.
 * @param {number} [scale=0.64] - The scale of the card.
 * @param {string} [animationType="display"] - The type of animation to apply.
 */
function displayCard(container, cardName, scale = 0.64, animationType = "display") {
    if (window.innerWidth <= 768) {
        scale = 0.3; // Use smaller scale for mobile devices
    }

    // Get the card's position
    const position = getCardCoordinates(cardName);

    // Apply scaling to card dimensions
    const scaledWidth = position.width * scale;
    const scaledHeight = position.height * scale;

    // Scale the background size proportionally
    const scaledBackgroundWidth = 2048 * scale;
    const scaledBackgroundHeight = 1309 * scale;

    // Scale the background position
    const scaledX = position.x * scale;
    const scaledY = position.y * scale;

    // Create the card element
    const cardElement = document.createElement("div");
    cardElement.classList.add("card", animationType); // Add animation class
    cardElement.style.backgroundImage = 'url("spanish_deck.png")';
    cardElement.style.backgroundPosition = `-${scaledX}px -${scaledY}px`;
    cardElement.style.backgroundSize = `${scaledBackgroundWidth}px ${scaledBackgroundHeight}px`;
    cardElement.style.width = `${scaledWidth}px`;
    cardElement.style.height = `${scaledHeight}px`;
    cardElement.style.display = "inline-block"; // Display cards side-by-side
    cardElement.style.border = "1px solid black"; // Optional, for visualization

    // Append the card to container
    container.appendChild(cardElement);

    // Remove the animation class after the animation ends
    cardElement.addEventListener("animationend", function handleAnimationEnd() {
        cardElement.classList.remove(animationType); // Remove the specific animation class
        cardElement.removeEventListener("animationend", handleAnimationEnd); // Clean up event listener
    });
}

/**
 * Checks if it's the first round and reveals the player's hidden card.
 */
function checkFirstRound() {
    if (firstRound) {
        firstRound = false;

        // clear faced down cards
        playerCardsElem.textContent = "";

        // reveal player's hidden card and sum
        displayCard(playerCardsElem, hiddenCardPlayer);
        sumElem.textContent = "Your Sum: " + sum;
    }
}

/**
 * Displays the game over message and updates the player's cash.
 * @param {string} playerState - The state of the player (e.g., "player-wins", "dealer-wins").
 * @param {boolean} gameOver - Whether the game is over.
 */
function gameOverMessage(playerState, gameOver) {
    if (gameOver) {
        canDeal = true;
        canHit = false;
        canStand = false;
        isAlive = false; // game over
    } else isAlive = true;

    updateCash(playerState === "player-wins" || playerState === "naturale" || playerState === "dealer-busted");
    winnerElem.textContent = "You have $" + player.amount + " available";

    if (playerState === "naturale") {
        messageElem.textContent = "Congratulations, You have won    +$" + (bet * 2) + "!\n You are a Naturale!";
    } else if (playerState === "dealer-busted") {
        messageElem.textContent = "Congratulations, You have won    +$" + (bet * 2) + "!\n Dealer has busted!";
    } else if (playerState === "player-wins") {
        messageElem.textContent = "Congratulations, You have won    +$" + (bet * 2) + "!\n Want to play again?";
    }
    else if (playerState === "dealer-wins") {
        messageElem.textContent = "Sorry, You have lost    -$" + bet + "!\n Maybe next time!";
    } else if (playerState === "player-busted") {
        messageElem.textContent = "Sorry, You have busted    -$" + bet + "!\n Maybe next time!";
    } else if (playerState === "tie") {
        messageElem.textContent = "Sorry, You have lost    -$" + bet + "!\n You got a tie!";
    }

    // player is broke, game over
    if(player.amount === 0) {
        messageElem.textContent = "You are broke! \n You have lost all your money!";
        leaveGameButtonElem.classList.remove("hidden");
        hitButtonElem.classList.add("hidden");
        standButtonElem.classList.add("hidden");
    } else {
        // display buttons when game is over
        placeBetButtonElem.classList.remove("hidden");
        leaveGameButtonElem.classList.remove("hidden");

        // hide the hit and stand buttons when game is over
        hitButtonElem.classList.add("hidden");
        standButtonElem.classList.add("hidden");
    }
}

/**
 * Handles the player's action to draw a new card.
 */
function hit() {
    if (canHit) {
        checkFirstRound();

        // draw new card
        let card = deck.pop();
        sum += getValue(card);

        displayCard(playerCardsElem, card);
        sumElem.textContent = "Your Sum: " + sum;

        if (sum > 7.5) {
            // clears the faced down card
            dealerCardsElem.innerHTML = "";
            // reveal dealer's hidden card and sum
            displayCard(dealerCardsElem, hiddenCardDealer);
            dealerSumElem.textContent = "Dealer Sum: " + dealerSum;
            gameOverMessage("player-busted", true);
        } else if (sum === 7.5 && deck.length === 37) { // means that player won within the two first cards (2 for player + 1 for dealer)
            gameOverMessage("naturale", true);
        } else if (sum === 7.5) { // player won without busting
            displayCard(dealerCardsElem, hiddenCardDealer);
            dealerSumElem.textContent = "Dealer Sum: " + dealerSum;
            gameOverMessage("player-wins", true);
        }
    }
}

/**
 * Handles the player's action to end their turn.
 */
function stand() {
    if (canStand) {
        checkFirstRound(); // displays player's hidden card and sum

        // clear faced down cards and sum for dealer
        dealerCardsElem.innerHTML = "";

        // disable all buttons
        canHit = false;
        canStand = false;
        canDeal = false;

        // display dealer info in case it can't enter the loop
        displayCard(dealerCardsElem, hiddenCardDealer);
        dealerSumElem.textContent = "Dealer Sum: " + dealerSum;

        // Dealer draws cards until conditions are met
        while (dealerSum <= sum && dealerSum <= 7.5) {
            let card = deck.pop();
            dealerSum += getValue(card);

            // Update the dealer's cards visually
            displayCard(dealerCardsElem, card);
            dealerSumElem.textContent = "Dealer Sum: " + dealerSum;

            // Check if the dealer busts
            if (dealerSum > 7.5) {
                gameOverMessage("dealer-busted", true);
                return; // exit the function
            }
        }

        // check game results
        if (dealerSum > sum && dealerSum <= 7.5) {
            gameOverMessage("dealer-wins", true);
        } else if (dealerSum === sum) {
            gameOverMessage("tie", true);
        } else if (dealerSum > 7.5) {
            gameOverMessage("dealer-busted", true);
        } else if (sum > dealerSum && sum <= 7.5) {
            gameOverMessage("player-wins", true);
        }
    }
}

/**
 * Updates the player's cash based on the game result.
 * @param {boolean} playerWon - Whether the player won the game.
 */
function updateCash(playerWon) {
    if (playerWon) {
        player.amount += (bet * 2);
    } else {
        player.amount -= bet;
    }
}

/**
 * Handles the player's action to leave the game.
 */
function leaveGame() {
    if (!isAlive) {
        if (confirm("Are you sure you want to leave the game?")) {
            // hides Dealer section, only shows player name
            document.querySelector(".dealer-section").style.display = "none";
            // hides all buttons
            document.querySelectorAll("button").forEach(button => {
                button.style.display = "none";
            });
            // clear all elements
            dealerCardsElem.textContent = "";
            playerCardsElem.textContent = "";
            dealerSumElem.textContent = "";
            sumElem.textContent = "";

            // goodbye message
            messageElem.textContent = "Thank you for playing! You are leaving with $" + player.amount;
            winnerElem.textContent = "";

            const playAgain = document.getElementById("play-again-btn");
            playAgain.style.display = "block";
            playAgain.style.margin = "0 auto";
            playAgain.addEventListener("click", () => {
                window.location.href = "index.html";
            });
        }
    } else {
        alert("You can't leave the game while playing.");
    }
}