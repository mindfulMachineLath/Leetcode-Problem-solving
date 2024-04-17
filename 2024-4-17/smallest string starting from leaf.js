var smallestFromLeaf = function(root) {
    let ans = "";

    const dfs = (node, path) => {
        if (!node) return;

        const char = String.fromCharCode(node.val + 97);
        path = char + path;

        if (!node.left && !node.right) {
            if (!ans || path < ans) {
                ans = path;
            }
        }

        dfs(node.left, path);
        dfs(node.right, path);
    };

    dfs(root, "");
    return ans;
};