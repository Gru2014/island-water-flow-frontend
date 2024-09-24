export const solveWaterFlow = (grid) => {
  if (!grid || grid.length === 0 || !grid[0]) return [];
  const rows = grid.length;
  const cols = grid[0].length;
  const directions = [
    [-1, 0],
    [0, -1],
    [1, 0],
    [0, 1],
  ];

  const floodFill = (startX, startY) => {
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
    const stack = [[startX, startY]];

    while (stack.length > 0) {
      const [x, y] = stack.pop();
      if (!visited[x][y]) {
        visited[x][y] = true;
        for (const [dx, dy] of directions) {
          const [nx, ny] = [x + dx, y + dy];
          if (
            nx >= 0 &&
            nx < rows &&
            ny >= 0 &&
            ny < cols &&
            !visited[nx][ny] &&
            grid[nx][ny] >= grid[x][y]
          ) {
            stack.push([nx, ny]);
          }
        }
      }
    }
    return visited;
  };
  const northwestVisited = floodFill(0, 0);
  const southeastVisited = floodFill(rows - 1, cols - 1);

  return Array.from({ length: rows }, (_, r) =>
    Array.from(
      { length: cols },
      (_, c) => northwestVisited[r][c] && southeastVisited[r][c]
    )
  );
};
