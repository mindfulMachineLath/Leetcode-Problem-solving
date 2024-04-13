class Solution:
    def maximalRectangle(self, matrix: List[List[str]]) -> int:
        if not matrix:
            return 0
        
        rows, cols = len(matrix), len(matrix[0])
        heights = [0] * (cols + 1)  # Include an extra element for easier calculation
        max_area = 0
        
        for row in matrix:
            for i in range(cols):
                heights[i] = heights[i] + 1 if row[i] == '1' else 0
            
            # Calculate max area using histogram method
            n = len(heights)  # Number of bars in the histogram

            for i in range(n):
                for j in range(i, n):
                    # Determine the minimum height between bar i and bar j
                    min_height = min(heights[k] for k in range(i, j + 1))
                    # Calculate the area of the rectangle
                    area = min_height * (j - i + 1)
                    # Update maximum area if the current rectangle's area is larger
                    if area > max_area:
                        max_area = area

        return max_area
        