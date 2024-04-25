class Solution:
    def longestIdealString(self, s: str, k: int) -> int:
        dp = [0] * 150
        max_len = 1

        for c in s:
            for i in range(ord(c) - k, ord(c) + k + 1):
                if ord('a') <= i <= ord('z'):
                    dp[ord(c)] = max(dp[ord(c)], dp[i])

            dp[ord(c)] += 1
            max_len = max(max_len, dp[ord(c)])

        return max_len