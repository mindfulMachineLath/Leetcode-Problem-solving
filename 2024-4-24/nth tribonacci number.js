var tribonacci = function(n) {
    if (n < 2)
        return n;

    let dp = [0, 1, 1];

    for (let i = 3; i <= n; ++i) {
        let next = dp[0] + dp[1] + dp[2];
        dp[0] = dp[1];
        dp[1] = dp[2];
        dp[2] = next;
    }

    return dp[2];
};