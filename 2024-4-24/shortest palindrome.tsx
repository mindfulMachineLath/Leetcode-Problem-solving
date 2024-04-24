function shortestPalindrome(s: string): string {
    const piFunction = (s: string): number[] => {
        const n: number = s.length;
        const pi: number[] = Array(n);
        pi[0] = 0;

        for (let i = 1; i < n; i++) {
            let k: number = pi[i - 1];
            while (k > 0 && s[k] != s[i]) {
                k = pi[k - 1];
            }
            if (s[k] == s[i]) k++;
            pi[i] = k;
        }

        return pi;
    }

    // s: aacecaaa, sLen: 8
    const sLen: number = s.length;
    // aaacecaa
    const sReversed: string = s.split('').reverse().join('');
    // aacecaaa#aaacecaa
    const sTemp: string = `${s}#${sReversed}`;
    // [a a c e c a a a # a a a c e c a a]
    // [0 1 0 0 0 1 2 2 0 1 2 2 3 4 5 6 7]
    const pi: number[] = piFunction(sTemp);
    // lps: 7
    const lps: number = pi.pop();
    
    // 'aaacecaa'.substring(0, 1) + aacecaaa
    return sReversed.substring(0, sLen - lps) + s;

};