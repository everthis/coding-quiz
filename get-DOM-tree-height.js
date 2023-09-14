/*

Height of a tree is the maximum depth from root node. Empty root node have a height of 0.

If given DOM tree, can you create a function to get the height of it?

For the DOM tree below, we have a height of 4.

<div>
  <div>
    <p>
      <button>Hello</button>
    </p>
  </div>
  <p>
    <span>World!</span>
  </p>
</div>
Can you solve this both recursively and iteratively?

*/


/**
 * @param {HTMLElement | null} tree
 * @return {number}
 */
function getHeight(tree) {
  // your code here
  return dfs(tree)

  function dfs(node) {
    if(node == null) return 0
    if(node.nodeType !== 1) return 0
    let ans = 0
    for(const child of node.childNodes) {
      ans = Math.max(ans, dfs(child))
    }
    return ans + 1
  }      
}
