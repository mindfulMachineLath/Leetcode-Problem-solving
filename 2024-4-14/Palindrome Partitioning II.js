var isPalindrome = function(j,k,string){
    while(j<k){
        if(string[j] !== string[k]){
            return false;
        }
        k--;
        j++
    }
    return true
}
var rec = function(i,len,str,dp){
    if(i===len)return 0;
    if(dp[i] !== -1)return dp[i]
    let min = Number.MAX_VALUE;
    for(let j=i;j<len;j++){
        if(isPalindrome(i,j,str)){
           let cuts =  1+ rec(j+1,len,str,dp)
              min = Math.min(cuts,min)
      }
        
    }
    return dp[i] = min
}
var minCut = function(s) {
    let n = s.length;
    let sol = Array(n).fill(-1);
    return rec(0,n,s,sol) -1
};