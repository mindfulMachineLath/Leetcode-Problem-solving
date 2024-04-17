/**
 * @param {number[][]} dungeon
 * @return {number}
 */
var calculateMinimumHP = function(dungeon) {
    const n = dungeon.length;
    const m = dungeon[0].length;

    const dp = new Array(n).fill(0).map(() => new Array(m).fill(0));

    return helper(dungeon, n, m, 0, 0, dp);
};

var helper = function(dungeon, n, m, row, col, dp) {
    // base condition 1
    if (row === n - 1 && col === m - 1) {
        return Math.max(1, 1 - dungeon[row][col]);
    }

    // base condition 2
    if (row >= n || col >= m) {
        return Infinity;
    }

    if (dp[row][col] !== 0) {
        return dp[row][col];
    }

    const right = helper(dungeon, n, m, row, col + 1, dp);
    const down = helper(dungeon, n, m, row + 1, col, dp);

    // Calculate the minimum health needed at the current position
    dp[row][col] = Math.max(1, Math.min(right, down) - dungeon[row][col]);

    return dp[row][col];
};