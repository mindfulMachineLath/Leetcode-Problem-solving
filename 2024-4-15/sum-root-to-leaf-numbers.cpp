class Solution {
public:
    int sum=0;
    void tonum(TreeNode* node, int digit){
        if (!node) return;
        digit=node->val+10*digit;
        if (!node->left && !node->right)
            sum+=digit;           
        tonum(node->left, digit);
        tonum(node->right, digit);
    }
    int sumNumbers(TreeNode* root) {
        tonum(root, 0);
        return sum; 
    }
};