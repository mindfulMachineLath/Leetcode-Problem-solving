/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var longestIdealString = function(s, k) {
    const dp = new Array(150).fill(0);

    for(let c of s) {
        for(let i = c.charCodeAt(0) - k; i <= c.charCodeAt(0) + k; i++) {
            if(i >= 'a'.charCodeAt(0) && i <= 'z'.charCodeAt(0)) {
                dp[c.charCodeAt(0)] = Math.max(dp[c.charCodeAt(0)], dp[i]);
            }
        }

        dp[c.charCodeAt(0)]++;
    }

    let maxLen = 0;
    for(let i = 0; i < 150; i++) {
        maxLen = Math.max(maxLen, dp[i]);
    }

    return maxLen;
};