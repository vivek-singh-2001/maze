export const createWalls = (world, width, height, Matter) => {
    const { Bodies } = Matter;
    const walls = [
      Bodies.rectangle(width / 2, 0, width, 2, { isStatic: true }),
      Bodies.rectangle(width / 2, height, width, 2, { isStatic: true }),
      Bodies.rectangle(0, height / 2, 2, height, { isStatic: true }),
      Bodies.rectangle(width, height / 2, 2, height, { isStatic: true })
    ];
    Matter.World.add(world, walls);
  };
  