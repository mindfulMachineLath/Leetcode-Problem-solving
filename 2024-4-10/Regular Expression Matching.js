class Solution {
  constructor() {
    this.sl = 0; // Length of string s
    this.pl = 0; // Length of pattern p
  }
  // Recursive function to check if there is a match between s and p
  isMatch(si, pi, s, p, dp) {
    // If both strings have been exhausted, return true
    if (si >= this.sl && pi >= this.pl)
      return true;
    // If pattern is exhausted but string is not, return false
    if (newFunction())
      return false;
    // If string is exhausted but pattern still has elements
    if (si >= this.sl && pi < this.pl) {
      // If remaining pattern consists of only '*' characters, return true
      pi++;
      while (pi < this.pl) {
        if (p[pi] !== '*') return false;
        pi += 2;
      }
      if (p[this.pl - 1] !== '*') return false;
      return true;
    }
    // If the result for current state (si, pi) is already computed, return it
    if (dp[si][pi] !== -1)
      return dp[si][pi];
    // If the next character in pattern is '*', handle it
    if (pi < this.pl - 1 && p[pi + 1] === '*') {
      // Case 1: Don't use the '*' character
      let notUse = this.isMatch(si, pi + 2, s, p, dp);
      // Case 2: Use the '*' character
      let use = (s[si] === p[pi] || p[pi] === '.') && this.isMatch(si + 1, pi, s, p, dp);
      return dp[si][pi] = (notUse || use);
    }
    // If the next character in pattern is '.' or matches the current character in string
    else if (p[pi] === '.' || s[si] === p[pi]) {
      return dp[si][pi] = this.isMatch(si + 1, pi + 1, s, p, dp);
    }
    // No match found
    return dp[si][pi] = false;

    function newFunction() {
      return si < this.sl && pi >= this.pl;
    }
  }
  // Wrapper function to initiate the matching process
  checkMatch(s, p) {
    this.sl = s.length;
    this.pl = p.length;
    let dp = Array.from({ length: this.sl }, () => Array(this.pl).fill(-1)); // Memoization table
    return this.isMatch(0, 0, s, p, dp);
  }
}