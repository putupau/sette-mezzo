# **Sette-e-Mezzo Card Game**

A simple and responsive web-based implementation of the traditional Italian card game *Sette-e-Mezzo*. This project was designed to showcase game mechanics, user interaction, and responsive design while maintaining clean, readable, and well-documented code.

---

## **Project Description**

This project replicates the classic card game *Sette-e-Mezzo*. The game is implemented using **HTML**, **CSS**, and **JavaScript**, with animations and a responsive design for mobile devices. The user interacts with the game via simple prompts, ensuring compatibility across all browsers and devices without requiring additional dependencies or frameworks.

---

## **Features**

- **Core Mechanics**:
    - A playable implementation of *Sette-e-Mezzo*, including betting, hitting, standing, and evaluating winners.
    - Full adherence to the game rules, with proper handling of card values, dealer behavior, and outcomes.

- **Responsiveness**:
    - Fully responsive design with media queries to ensure the game works seamlessly on mobile devices.
    - Scaled-down card sizes and adjusted UI layout for smaller screens.

- **Animations**:
    - Smooth card animations using CSS for fade-in and slide effects.

- **Simplicity**:
    - No frameworks or external libraries were used; everything is implemented manually.
    - Debugged and optimized using browser developer tools and the console.

- **Documentation**:
    - Detailed inline comments in the JavaScript code for clarity and maintainability.
    - Structured and modular code for easy understanding and potential future enhancements.

---

## **How to Play**

1. **Start the Game**:
    - The user is prompted to enter their name and starting amount of money.
    - Click the **PLACE BET** button to start the game.

2. **Place Your Bet**:
    - Input the amount to bet via a prompt. The game validates the bet to ensure it’s within your available balance.

3. **Game Actions**:
    - **HIT**: Draw a new card to increase your sum.
    - **STAND**: End your turn and let the dealer play.

4. **Win Conditions**:
    - Get a sum close to 7.5 without exceeding it.
    - The dealer plays after the player stands and attempts to beat the player’s score without busting.

5. **Game Over**:
    - The game ends when the player is out of money or decides to leave. A **PLAY AGAIN** button allows the user to restart.

---

## **Technical Details**

### **General Considerations**
- The project was developed by a team of **two people**.
- The style and animations were custom-designed, allowing creative freedom and adaptability.
- No **async functions** or delays were used to simulate real-time card drawing; the game executes actions instantly for simplicity.
- The implementation avoids any external frameworks or libraries (e.g., Bootstrap). Everything was done manually to ensure flexibility and full control over the game’s behavior.
- Code clarity and correctness were prioritized, with extensive comments added to support future documentation or adaptation for other tools.

### **Technologies Used**
- **HTML5**: For the structure and layout of the game.
- **CSS3**: For styling, animations, and responsive design.
- **JavaScript (ES6)**: For game logic, interaction, and dynamic updates.

### **File Overview**
- **`index.html`**: The main HTML structure of the game.
- **`game.css`**: Styling and animations for the game UI.
- **`game.js`**: The JavaScript code handling the game’s logic and interactions.

### **Responsive Design**
- The layout adjusts dynamically for mobile screens:
    - Buttons are resized, and cards are scaled down.
    - Margins and paddings are reduced for compactness.
- Media queries ensure a seamless user experience on all devices.

### **Animations**
- Card transitions are animated using CSS keyframes:
    - `fadeInScale`: Adds a smooth fade-in and scaling effect.
    - `slideIntoDeck`: Simulates cards sliding into the deck.

---

## **How to Run**

### **Option A: Online Demo**
Try the game instantly by visiting the online demo [here](https://putupau.github.io/sette-mezzo).

### **Option B: Local Setup**
1. Clone or download the project files from the repository.
2. Open the `index.html` file in any modern browser.
3. Enjoy the game!


---

## **Possible Enhancements**

- Adding sound effects for a more immersive experience.
- Implementing a scoreboard to track wins, losses, and session stats.
- Introducing a delay system with **async functions** for a more realistic card-playing experience.
- Integrating additional visual effects, such as confetti for wins or alerts for busts.

---

## **Credits**

- Developed by a dedicated team of **two students**, newbies in HTML & CSS:
    - [putupau](https://github.com/putupau)
    - [harjotjosan](https://github.com/harjotjosan)
- Debugging and development were done using browser developer tools.
---

## **License**

This project is open-source and available for use under the MIT License. Contributions and adaptations are welcome.

--- 
