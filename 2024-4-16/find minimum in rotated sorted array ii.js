//Note: U need to add Math.floor function while calculating [mid] since JS doesn't implicitly typecast floating no. which may result in unexpected output
var findMin = function(nums) {
    let s = 0 , e = nums.length - 1, m ;
        while ( s < e ){
            m = Math.floor(s + (e - s ) / 2) ;
            if ( nums[m] == nums[s] && nums[m] == nums[e]){
                s++;        e--;
            }
            else if (nums[m] <= nums[e])   e = m ;
            else        s = m + 1 ;
        }
        return nums [s] ;
};