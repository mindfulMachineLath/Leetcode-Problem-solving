
class Solution {
public:
    int sl, pl; // Lengths of string s and pattern p

    // Recursive function to check if there is a match between s and p
    bool isMatch(int si, int pi, string& s, string& p, vector<vector<int>>& dp) {
        // If both strings have been exhausted, return true
        if (si >= sl && pi >= pl)
            return true;
        
        // If pattern is exhausted but string is not, return false
        if (si < sl && pi >= pl)
            return false;
        
        // If string is exhausted but pattern still has elements
        if (si >= sl && pi < pl) {
            // If remaining pattern consists of only '*' characters, return true
            pi++;
            while (pi < pl) {
                if (p[pi] != '*') return false;
                pi += 2;
            }
            if (p[pl - 1] != '*') return false;
            return true;
        }

        // If the result for current state (si, pi) is already computed, return it
        if (dp[si][pi] != -1)
            return dp[si][pi];

        // If the next character in pattern is '*', handle it
        if (pi < pl - 1 && p[pi + 1] == '*') {
            // Case 1: Don't use the '*' character
            bool notUse = isMatch(si, pi + 2, s, p, dp);
            // Case 2: Use the '*' character
            bool use = (s[si] == p[pi] || p[pi] == '.') && isMatch(si + 1, pi, s, p, dp);
            return dp[si][pi] = (notUse || use);
        }
        // If the next character in pattern is '.' or matches the current character in string
        else if (p[pi] == '.' || s[si] == p[pi]) {
            return dp[si][pi] = isMatch(si + 1, pi + 1, s, p, dp);
        }
        // No match found
        return dp[si][pi] = false;
    }

    bool isMatch(string s, string p) {
        sl = s.length(), pl = p.length();
        vector<vector<int>> dp(sl, vector<int>(pl, -1)); // Memoization table
        return isMatch(0, 0, s, p, dp); // Start the recursive function
    }
};