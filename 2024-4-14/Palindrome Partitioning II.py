#Recursion 
#Time Complexity: O(Exponential)
#Space Complexity: O(n)
class Solution1:
    def minCut(self, s: str) -> int:
        def solve(ind):
            if ind==n:
                return 0
            temp=''
            mini=maxsize
            for j in range(ind,n):
                temp+=s[j]
                if temp==temp[-1::-1]:
                    cuts=1+solve(j+1)
                    mini=min(mini,cuts)
            return mini
        n=len(s)
        return solve(0)-1 