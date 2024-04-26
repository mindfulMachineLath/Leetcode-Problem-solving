class Solution {
    minFallingPathSum(grid) {
        const n = grid.length;
        return this.minFallingPathSumHelper(0, grid).minSum;
    }

    minFallingPathSumHelper(row, grid) {
        if (row === grid.length) {
            return new Triplet(0, 0, 0);
        }

        const nextRowTriplet = this.minFallingPathSumHelper(row + 1, grid);
        let currentTriplet = new Triplet(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, -1);

        for (let col = 0; col < grid[0].length; col++) {
            const value = grid[row][col] + (
                col !== nextRowTriplet.minSumIndex ? nextRowTriplet.minSum : nextRowTriplet.secondMinSum
            );
            if (value <= currentTriplet.minSum) {
                currentTriplet.secondMinSum = currentTriplet.minSum;
                currentTriplet.minSum = value;
                currentTriplet.minSumIndex = col;
            } else if (value < currentTriplet.secondMinSum) {
                currentTriplet.secondMinSum = value;
            }
        }

        return currentTriplet;
    }
}

class Triplet {
    constructor(minSum, secondMinSum, minSumIndex) {
        this.minSum = minSum;
        this.secondMinSum = secondMinSum;
        this.minSumIndex = minSumIndex;
    }
}