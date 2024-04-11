class Solution:
    # 1. Recursion
    def solve(self, index, buy, prices, limit):
        if index == len(prices) or limit == 0:
            return 0
        
        profit = 0
        if buy:
            Buy = -prices[index] + self.solve(index + 1, 0, prices, limit)
            skip = 0 + self.solve(index + 1, 1, prices, limit)
            profit = max(Buy, skip)
        else:
            sell = prices[index] + self.solve(index + 1, 1, prices, limit - 1)
            skip = 0 + self.solve(index + 1, 0, prices, limit)
            profit = max(sell, skip)
        
        return profit
    
    # 2. Memoization
    def solveMem(self, index, buy, prices, limit, dp):
        if index == len(prices) or limit == 0:
            return 0
        
        if dp[index][buy][limit] != -1:
            return dp[index][buy][limit]
        
        profit = 0
        if buy:
            Buy = -prices[index] + self.solveMem(index + 1, 0, prices, limit, dp)
            skip = 0 + self.solveMem(index + 1, 1, prices, limit, dp)
            profit = max(Buy, skip)
        else:
            sell = prices[index] + self.solveMem(index + 1, 1, prices, limit - 1, dp)
            skip = 0 + self.solveMem(index + 1, 0, prices, limit, dp)
            profit = max(sell, skip)
        
        dp[index][buy][limit] = profit
        return dp[index][buy][limit]
    
    # 3. Tabulation
    def solveTab(self, prices):
        n = len(prices)
        dp = [[[0 for _ in range(3)] for _ in range(2)] for _ in range(n+1)]
        
        for index in range(n-1, -1, -1):
            for buy in range(2):
                for limit in range(1, 3):
                    if buy:
                        Buy = -prices[index] + dp[index + 1][0][limit]
                        skip = 0 + dp[index + 1][1][limit]
                        profit = max(Buy, skip)
                    else:
                        sell = prices[index] + dp[index + 1][1][limit - 1]
                        skip = 0 + dp[index + 1][0][limit]
                        profit = max(sell, skip)
                    
                    dp[index][buy][limit] = profit
        
        return dp[0][1][2]
    
    # 4. Space Optimization
    def solveSO(self, prices):
        n = len(prices)
        curr = [[0 for _ in range(3)] for _ in range(2)]
        next = [[0 for _ in range(3)] for _ in range(2)]
        
        for index in range(n-1, -1, -1):
            for buy in range(2):
                for limit in range(1, 3):
                    if buy:
                        Buy = -prices[index] + next[0][limit]
                        skip = 0 + next[1][limit]
                        profit = max(Buy, skip)
                    else:
                        sell = prices[index] + next[1][limit - 1]
                        skip = 0 + next[0][limit]
                        profit = max(sell, skip)
                    
                    curr[buy][limit] = profit
            next = curr[:]
        
        return next[1][2]

    def maxProfit(self, prices):
        # Choose one of the methods to use:
        # return self.solve(0, 1, prices, 2)
        # dp = [[[-1 for _ in range(3)] for _ in range(2)] for _ in range(len(prices)+1)]
        # return self.solveMem(0, 1, prices, 2, dp)
        # return self.solveTab(prices)
        return self.solveSO(prices)
