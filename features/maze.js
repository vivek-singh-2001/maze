import { shuffle } from './utils.js';

export const createMaze = (world, unitLengthX, unitLengthY, cellsHorizontal, cellsVertical, Matter) => {
  const { Bodies, World } = Matter;
  const grid = Array(cellsVertical).fill(null).map(() => Array(cellsHorizontal).fill(false));
  const verticals = Array(cellsVertical).fill(null).map(() => Array(cellsHorizontal - 1).fill(false));
  const horizontals = Array(cellsVertical - 1).fill(null).map(() => Array(cellsHorizontal).fill(false));

  const startRow = Math.floor(Math.random() * cellsVertical);
  const startColumn = Math.floor(Math.random() * cellsHorizontal);

  const stepThroughCell = (row, column) => {


    //  if i have visited the cell at [row, col] then return
    if (grid[row][column]) return;


    // mark this cell as bieng visited
    grid[row][column] = true;

    // Assamble randomly order-list of neighbours
    const neighbors = shuffle([
      [row - 1, column, 'up'],
      [row, column + 1, 'right'],
      [row + 1, column, 'down'],
      [row, column - 1, 'left']
    ]);

    // ?for each neighbor...
    for (let neighbor of neighbors) {
      const [nextRow, nextColumn, direction] = neighbor;

      //   check if neighbor is out of bound
      if (nextRow < 0 || nextRow >= cellsVertical || nextColumn < 0 || nextColumn >= cellsHorizontal) continue;

      //  if we have visted neighbor then continue to next neighbor
      if (grid[nextRow][nextColumn]) continue;
      if (direction === 'left') verticals[row][column - 1] = true;
      else if (direction === 'right') verticals[row][column] = true;
      else if (direction === 'up') horizontals[row - 1][column] = true;
      else if (direction === 'down') horizontals[row][column] = true;

      //  continue th loop
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
        { label: 'wall', isStatic: true, render: { fillStyle: 'yellow' } }
      );
      World.add(world, wall);
    });
  });
};
