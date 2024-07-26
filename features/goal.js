export const createGoal = (world, unitLengthX, unitLengthY, width, height, Matter) => {
    const { Bodies ,World} = Matter;
    const goal = Bodies.rectangle(
      width - unitLengthX / 2,
      height - unitLengthY / 2,
      unitLengthX * 0.7,
      unitLengthY * 0.7,
      { label: 'goal', isStatic: true, render: { fillStyle: 'green' } }
    );
    World.add(world, goal);
  };
  