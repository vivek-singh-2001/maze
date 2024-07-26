import { shuffle } from './utils.js'; // Ensure shuffle is imported from utils

export const createMaze = (world, unitLengthX, unitLengthY, cellsHorizontal, cellsVertical, Matter) => {
  const { Bodies ,World} = Matter;
  const grid = Array(cellsVertical).fill(null).map(() => Array(cellsHorizontal).fill(false));
  const verticals = Array(cellsVertical).fill(null).map(() => Array(cellsHorizontal - 1).fill(false));
  const horizontals = Array(cellsVertical - 1).fill(null).map(() => Array(cellsHorizontal).fill(false));

  const startRow = Math.floor(Math.random() * cellsVertical);
  const startColumn = Math.floor(Math.random() * cellsHorizontal);

  const stepThroughCell = (row, column) => {
    if (grid[row][column]) return;
    grid[row][column] = true;
    const neighbors = shuffle([
      [row - 1, column, 'up'],
      [row, column + 1, 'right'],
      [row + 1, column, 'down'],
      [row, column - 1, 'left']
    ]);
    for (let neighbor of neighbors) {
      const [nextRow, nextColumn, direction] = neighbor;
      if (nextRow < 0 || nextRow >= cellsVertical || nextColumn < 0 || nextColumn >= cellsHorizontal) continue;
      if (grid[nextRow][nextColumn]) continue;
      if (direction === 'left') verticals[row][column - 1] = true;
      else if (direction === 'right') verticals[row][column] = true;
      else if (direction === 'up') horizontals[row - 1][column] = true;
      else if (direction === 'down') horizontals[row][column] = true;
      stepThroughCell(nextRow, nextColumn);
    }
  };

  stepThroughCell(startRow, startColumn);

  horizontals.forEach((row, rowIndex) => {
    row.forEach((open, columnIndex) => {
      if (open) return;
      const wall = Bodies.rectangle(
        columnIndex * unitLengthX + unitLengthX / 2,
        rowIndex * unitLengthY + unitLengthY,
        unitLengthX,
        5,
        { label: 'wall', isStatic: true, render: { fillStyle: 'red' } }
      );
      World.add(world, wall);
    });
  });

  verticals.forEach((row, rowIndex) => {
    row.forEach((open, columnIndex) => {
      if (open) return;
      const wall = Bodies.rectangle(
        columnIndex * unitLengthX + unitLengthX,
        rowIndex * unitLengthY + unitLengthY / 2,
        5,
        unitLengthY,
        { label: 'wall', isStatic: true, render: { fillStyle: 'red' } }
      );
      World.add(world, wall);
    });
  });
};
