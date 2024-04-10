class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        sl, pl = len(s), len(p)
        dp = [[-1] * pl for _ in range(sl)]  # Memoization table
        def recursive_isMatch(si: int, pi: int) -> bool:
            nonlocal sl, pl, s, p, dp
            # If both strings have been exhausted, return true
            if si >= sl and pi >= pl:
                return True
            # If pattern is exhausted but string is not, return false
            if si < sl and pi >= pl:
                return False
            # If string is exhausted but pattern still has elements
            if si >= sl and pi < pl:
                # If remaining pattern consists of only '*' characters, return true
                pi += 1
                while pi < pl:
                    if p[pi] != '*':
                        return False
                    pi += 2
                if p[pl - 1] != '*':
                    return False
                return True
            # If the result for current state (si, pi) is already computed, return it
            if dp[si][pi] != -1:
                return dp[si][pi]
            # If the next character in pattern is '*', handle it
            if pi < pl - 1 and p[pi + 1] == '*':
                # Case 1: Don't use the '*' character
                not_use = recursive_isMatch(si, pi + 2)
                # Case 2: Use the '*' character
                use = (s[si] == p[pi] or p[pi] == '.') and recursive_isMatch(si + 1, pi)
                dp[si][pi] = not_use or use
                return dp[si][pi]
            # If the next character in pattern is '.' or matches the current character in string
            elif p[pi] == '.' or s[si] == p[pi]:
                dp[si][pi] = recursive_isMatch(si + 1, pi + 1)
                return dp[si][pi]
            # No match found
            dp[si][pi] = False
            return dp[si][pi]
        return recursive_isMatch(0, 0)
