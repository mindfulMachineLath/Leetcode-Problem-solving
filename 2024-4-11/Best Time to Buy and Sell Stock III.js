class Solution {
    // 1. Recursion
    solve(index, buy, prices, limit) {
        if (index === prices.length || limit === 0) {
            return 0;
        }

        let profit = 0;
        if (buy) {
            let Buy = -prices[index] + this.solve(index + 1, 0, prices, limit);
            let skip = this.solve(index + 1, 1, prices, limit);
            profit = Math.max(Buy, skip);
        } else {
            let sell = prices[index] + this.solve(index + 1, 1, prices, limit - 1);
            let skip = this.solve(index + 1, 0, prices, limit);
            profit = Math.max(sell, skip);
        }

        return profit;
    }

    // 2. Memoization
    solveMem(index, buy, prices, limit, dp) {
        if (index === prices.length || limit === 0) {
            return 0;
        }

        if (dp[index][buy][limit] !== -1) return dp[index][buy][limit];

        let profit = 0;
        if (buy) {
            let Buy = -prices[index] + this.solveMem(index + 1, 0, prices, limit, dp);
            let skip = this.solveMem(index + 1, 1, prices, limit, dp);
            profit = Math.max(Buy, skip);
        } else {
            let sell = prices[index] + this.solveMem(index + 1, 1, prices, limit - 1, dp);
            let skip = this.solveMem(index + 1, 0, prices, limit, dp);
            profit = Math.max(sell, skip);
        }

        dp[index][buy][limit] = profit;
        return dp[index][buy][limit];
    }

    // 3. Tabulation
    solveTab(prices) {
        const n = prices.length;
        const dp = Array.from({length: n+1}, () => Array.from({length: 2}, () => Array(3).fill(0)));

        for (let index = n - 1; index >= 0; index--) {
            for (let buy = 0; buy <= 1; buy++) {
                for (let limit = 1; limit <= 2; limit++) {
                    let profit = 0;

                    if (buy) {
                        let Buy = -prices[index] + dp[index + 1][0][limit];
                        let skip = dp[index + 1][1][limit];
                        profit = Math.max(Buy, skip);
                    } else {
                        let sell = prices[index] + dp[index + 1][1][limit - 1];
                        let skip = dp[index + 1][0][limit];
                        profit = Math.max(sell, skip);
                    }

                    dp[index][buy][limit] = profit;
                }
            }
        }

        return dp[0][1][2];
    }

    // 4. Space Optimization
    solveSO(prices) {
        const n = prices.length;
        let curr = Array.from({length: 2}, () => Array(3).fill(0));
        let next = Array.from({length: 2}, () => Array(3).fill(0));

        for (let index = n - 1; index >= 0; index--) {
            for (let buy = 0; buy <= 1; buy++) {
                for (let limit = 1; limit <= 2; limit++) {
                    let profit = 0;

                    if (buy) {
                        let Buy = -prices[index] + next[0][limit];
                        let skip = next[1][limit];
                        profit = Math.max(Buy, skip);
                    } else {
                        let sell = prices[index] + next[1][limit - 1];
                        let skip = next[0][limit];
                        profit = Math.max(sell, skip);
                    }

                    curr[buy][limit] = profit;
                }
            }
            next = JSON.parse(JSON.stringify(curr));
        }

        return next[1][2];
    }

    maxProfit(prices) {
        // Choose one of the methods to use:
        // return this.solve(0, 1, prices, 2);
        // const dp = Array.from({length: prices.length+1}, () => Array.from({length: 2}, () => Array(3).fill(-1)));
        // return this.solveMem(0, 1, prices, 2, dp);
        // return this.solveTab(prices);
        return this.solveSO(prices);
    }
}