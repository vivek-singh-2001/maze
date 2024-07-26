import { createWalls } from './features/walls.js';
import { createMaze } from './features/maze.js';
import { createGoal } from './features/goal.js';
import { createBall } from './features/ball.js';


const { Engine, Render, Runner, World, Events } = Matter;

const cellsHorizontal = 20;
const cellsVertical = 20;
let width = window.innerWidth;
let height = window.innerHeight;

const unitLengthX = width / cellsHorizontal;
const unitLengthY = height / cellsVertical;

const engine = Engine.create();
engine.world.gravity.y = 0;
const { world } = engine;
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    wireframes: false,
    width,
    height
  }
});
Render.run(render);
Runner.run(Runner.create(), engine);

window.addEventListener('resize', () => {
  width = window.innerWidth;
  height = window.innerHeight;
  render.canvas.width = width;
  render.canvas.height = height;
  Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: { x: width, y: height }
  });
});

// Initialize walls
createWalls(world, width, height, Matter);

// Initialize maze
createMaze(world, unitLengthX, unitLengthY, cellsHorizontal, cellsVertical, Matter);

// Initialize goal
createGoal(world, unitLengthX, unitLengthY, width, height, Matter);

// Initialize ball
createBall(world, unitLengthX, unitLengthY, engine, width, height, Matter);

// Win Condition
Events.on(engine, 'collisionStart', event => {
  event.pairs.forEach(collision => {
    const labels = ['ball', 'goal'];
    if (labels.includes(collision.bodyA.label) && labels.includes(collision.bodyB.label)) {
      world.gravity.y = 1;
      world.bodies.forEach(body => {
        if (body.label === 'wall') {
          Matter.Body.setStatic(body, false);
        }
      });
      setTimeout(() => {
        location.reload();
      }, 5000);
    }
  });
});




