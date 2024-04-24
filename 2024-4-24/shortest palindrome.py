class Solution:
    def shortestPalindrome(self, s: str) -> str:
        
        if not s or len(s) == 1: return s
        j = 0
        for i in range(len(s)-1,-1,-1):
            if s[i] == s[j]: j += 1
                
        print(j,s[j:],s[:j])
        if j == len(s): return s
        
        return s[j:][::-1] + self.shortestPalindrome(s[:j]) + s[j:] 