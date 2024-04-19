var numIslands = function(grid) {
    let row = grid.length, col = grid[0].length;
    let cache = new Array(row).fill(0).map(() => new Array(col).fill(0));
    let count = 0;
    for(let r=0; r<row; r++) {
        for(let c=0; c<col; c++) {

            if(grid[r][c] == 1 && cache[r][c] == 0) {

                check(r, c);

                function check(row1, col1) {
                
                    if(row1<0 || row1>=row || col1<0 || col1>=col) return
                    if(grid[row1][col1] == 0) return;
                    if(cache[row1][col1] == 1) return;

                    cache[row1][col1] = 1;
                
                    check(row1-1, col1);
                    check(row1, col1-1);
                    check(row1, col1+1);
                    check(row1+1, col1);
                    
                };
                count++;
            }
        }
    }
    console.log(cache, count);
    return count;
};