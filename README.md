# Maze Ball Game

## Overview

Maze Ball is a web-based game where the player controls a ball to navigate through a maze. The maze is procedurally generated, meaning it changes each time you play. The goal is to reach the green goal area while avoiding the red walls. The game uses the Matter.js physics engine for realistic ball movement and collision detection.

## Features

- **Procedurally Generated Maze:** The maze layout changes with each game.
- **Ball Control:** Use arrow keys to move the ball.
- **Dynamic Resize:** The game canvas adjusts to window size changes.
- **Collision Detection:** Realistic ball and wall interactions.
- **Win Condition:** Reach the goal to complete the game.

## Technologies Used

- **JavaScript:** For game logic and interactivity.
- **Matter.js:** A 2D physics engine for rendering and physics.
- **HTML/CSS:** For structuring and styling the game canvas.

## Project Structure

- `index.js`: Main entry point for the game, initializes the game and sets up the game loop.
- `/features/`
  - `utils.js`: Contains utility functions like `shuffle` used for maze generation.
  - `walls.js`: Defines and creates the maze walls.
  - `maze.js`: Handles maze generation logic.
  - `goal.js`: Defines and creates the goal area.
  - `ball.js`: Defines and handles ball creation and movement.
- `index.html`: HTML file that includes the game canvas and script references.

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/vivek-singh-2001/maze.git

2. **Navigate to the Project Directory**

   ```bash
   cd maze

3. **Open the Project**
    ```bash
   index.html


## Acknowledgements

  -  Matter.js - 2D physics engine used for the game.
  -  Open Source Community - For the tools and resources that made this project possible.
