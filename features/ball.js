export const createBall = (world, unitLengthX, unitLengthY, engine, width, height, Matter) => {
  const { Bodies, Body, Events, World } = Matter;
  const personImage = new Image();
  personImage.src = '../utils/MARIO.gif'; // Path to your person image

  // Adjust size and position as needed
  const personWidth = unitLengthX * 0.7;
  const personHeight = unitLengthY * 0.7;

  // Create a person with an image texture
  const person = Bodies.rectangle(unitLengthX / 2, unitLengthY / 2, personWidth, personHeight, {
      label: 'person',
      isStatic: false,
      render: {
          sprite: {
              texture: personImage.src,
              xScale: 0.1, // Adjust the scale as needed
              yScale: 0.1  // Adjust the scale as needed
          }
      },
      collisionFilter: { group: -1 },
      friction: 1,
      restitution: 0.8
  });
  World.add(world, person);

  const maxVelocity = 8;
  const velocityIncrement = 4;

  document.addEventListener('keydown', event => {
      const { x, y } = person.velocity;
      if (event.code === "ArrowUp" && y > -maxVelocity) Body.setVelocity(person, { x, y: y - velocityIncrement });
      if (event.code === "ArrowRight" && x < maxVelocity) Body.setVelocity(person, { x: x + velocityIncrement, y });
      if (event.code === "ArrowDown" && y < maxVelocity) Body.setVelocity(person, { x, y: y + velocityIncrement });
      if (event.code === "ArrowLeft" && x > -maxVelocity) Body.setVelocity(person, { x: x - velocityIncrement, y });
  });

  Events.on(engine, 'beforeUpdate', () => {
      if (person.position.x < 0 || person.position.x > width || person.position.y < 0 || person.position.y > height) {
          Body.setPosition(person, { x: unitLengthX / 2, y: unitLengthY / 2 });
          Body.setVelocity(person, { x: 0, y: 0 });
      }
  });
};
