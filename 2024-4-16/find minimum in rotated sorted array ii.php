class Solution {

/**
 * @param Integer[] $nums
 * @return Integer
 */
function findMin($nums) {
    $s = 0 ; $e = count($nums) - 1; $m ;
    while ( $s < $e ){
        $m = floor($s + ($e - $s ) / 2) ;
        if ( $nums[$m] == $nums[$s] && $nums[$m] == $nums[$e]){
            $s++;
            $e--;
        }
        else if ($nums[$m] <= $nums[$e])   $e = $m ;
        else        $s = $m + 1 ;
    }
    return $nums [$s] ;
}
}