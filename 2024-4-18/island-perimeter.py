class Solution:
    def islandPerimeter(self, grid: List[List[int]]) -> int:
        n = len(grid)
        m = len(grid[0])
        cnt = 0
        for i in range(n):
            for j in range(m):
                if grid[i][j] == 1:
                    if (j > 0 and grid[i][j - 1] == 0) or j == 0:
                        cnt += 1

                    if (i > 0 and grid[i - 1][j] == 0) or i == 0:
                        cnt += 1

                    if (j < m - 1 and grid[i][j + 1] == 0) or j == m - 1:
                        cnt += 1

                    if (i < n - 1 and grid[i + 1][j] == 0) or i == n - 1:
                        cnt += 1
        return cnt