export const createBall = (world, unitLengthX, unitLengthY, engine, width, height, Matter) => {
    const { Bodies, Body, Events,World } = Matter;
    const ballRadius = Math.min(unitLengthX, unitLengthY) / 4;
    const ball = Bodies.circle(unitLengthX / 2, unitLengthY / 2, ballRadius, {
      label: 'ball',
      render: { fillStyle: 'blue' },
      collisionFilter: { group: -1 },
      friction: 1,
      restitution: 0.8
    });
    World.add(world, ball);
  
    const maxVelocity = 8;
    const velocityIncrement = 4;
  
    document.addEventListener('keydown', event => {
      const { x, y } = ball.velocity;
      if (event.code === "ArrowUp" && y > -maxVelocity) Body.setVelocity(ball, { x, y: y - velocityIncrement });
      if (event.code === "ArrowRight" && x < maxVelocity) Body.setVelocity(ball, { x: x + velocityIncrement, y });
      if (event.code === "ArrowDown" && y < maxVelocity) Body.setVelocity(ball, { x, y: y + velocityIncrement });
      if (event.code === "ArrowLeft" && x > -maxVelocity) Body.setVelocity(ball, { x: x - velocityIncrement, y });
    });
  
    // document.addEventListener('keyup', () => {
    //   Body.setVelocity(ball, { x: 0, y: 0 });
    // });
  
    Events.on(engine, 'beforeUpdate', () => {
      if (ball.position.x < 0 || ball.position.x > width || ball.position.y < 0 || ball.position.y > height) {
        Body.setPosition(ball, { x: unitLengthX / 2, y: unitLengthY / 2 });
        Body.setVelocity(ball, { x: 0, y: 0 });
      }
    });
  };
  