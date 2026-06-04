export const metadata = { title: "DSA Refresher — Interview Prep" };

export default function DSAPage() {
  return (
    <>
      <h1>Data Structures &amp; Algorithms</h1>
      <p>Most interviews include 1–2 coding rounds. You don&apos;t need to memorize Leetcode Hards — mastering the core patterns for Mediums is usually enough.</p>

      {/* ────────── BIG O ────────── */}
      <h2>Big-O Cheat Sheet</h2>
      <table>
        <thead><tr><th>Data Structure</th><th>Access</th><th>Search</th><th>Insertion</th><th>Deletion</th></tr></thead>
        <tbody>
          <tr><td>Array / Slice</td><td>O(1)</td><td>O(n)</td><td>O(n)</td><td>O(n)</td></tr>
          <tr><td>Hash Map / Set</td><td>—</td><td>O(1)</td><td>O(1)</td><td>O(1)</td></tr>
          <tr><td>Binary Search Tree</td><td>O(log n)</td><td>O(log n)</td><td>O(log n)</td><td>O(log n)</td></tr>
          <tr><td>Linked List</td><td>O(n)</td><td>O(n)</td><td>O(1)</td><td>O(1)</td></tr>
          <tr><td>Min/Max Heap</td><td>O(1) (Min/Max)</td><td>O(n)</td><td>O(log n)</td><td>O(log n)</td></tr>
        </tbody>
      </table>

      {/* ────────── PATTERNS ────────── */}
      <h2>Must-Know Algorithm Patterns</h2>
      
      <details><summary>1. Sliding Window</summary>
        <p>Used for finding subarrays or substrings that satisfy a condition (e.g. "Longest substring without repeating characters").</p>
        <pre><code>{`// Template: Variable Sliding Window
left := 0
for right := 0; right < len(arr); right++ {
    // 1. Add arr[right] to window state
    // 2. While window is invalid:
    //      Remove arr[left] from window state
    //      left++
    // 3. Update max/min result
}`}</code></pre>
      </details>

      <details><summary>2. Two Pointers</summary>
        <p>Used for sorted arrays or linked lists. (e.g. "Two Sum II", "Valid Palindrome", "Container With Most Water").</p>
        <pre><code>{`left, right := 0, len(arr)-1
for left < right {
    sum := arr[left] + arr[right]
    if sum == target { return true }
    if sum < target { left++ } else { right-- }
}`}</code></pre>
      </details>

      <details><summary>3. Fast &amp; Slow Pointers</summary>
        <p>Used for cycle detection in Linked Lists or Arrays (Floyd's Tortoise and Hare). Find middle of linked list.</p>
        <pre><code>{`slow, fast := head, head
for fast != nil && fast.Next != nil {
    slow = slow.Next
    fast = fast.Next.Next
    if slow == fast { return true } // Cycle detected
}`}</code></pre>
      </details>

      <details><summary>4. Binary Search</summary>
        <p>Not just for sorted arrays! Used anytime the "answer space" is monotonic (e.g. Koko Eating Bananas).</p>
        <pre><code>{`left, right := 0, len(arr)-1
for left <= right {
    mid := left + (right-left)/2
    if arr[mid] == target { return mid }
    if arr[mid] < target { left = mid + 1 } else { right = mid - 1 }
}`}</code></pre>
      </details>

      <details><summary>5. BFS / DFS on Matrices (Islands)</summary>
        <p>Graph traversal on 2D grids (Number of Islands, Rotten Oranges).</p>
        <pre><code>{`// DFS Template for Grid
func dfs(grid [][]byte, r, c int) {
    if r < 0 || c < 0 || r >= len(grid) || c >= len(grid[0]) || grid[r][c] == '0' { return }
    grid[r][c] = '0' // Mark visited
    dfs(grid, r+1, c); dfs(grid, r-1, c); dfs(grid, r, c+1); dfs(grid, r, c-1)
}`}</code></pre>
      </details>

      <details><summary>6. Top K Elements (Heaps)</summary>
        <p>Anytime you see "Top K", "Kth largest", or "K closest", use a Heap (Priority Queue). A Min-Heap of size K keeps the K largest elements (since the smallest of the largest is at the top, ready to be popped).</p>
      </details>

      <details><summary>7. Dynamic Programming</summary>
        <p>Optimizing recursion by storing intermediate results. Two approaches:</p>
        <ul>
          <li><b>Top-Down (Memoization):</b> Recursion + HashMap to cache results. Easiest to write.</li>
          <li><b>Bottom-Up (Tabulation):</b> Iteration + Array. Better space complexity (can often optimize to O(1) space, e.g. Fibonacci only needs last 2 variables).</li>
        </ul>
      </details>

      {/* ────────── GO-SPECIFIC TIPS ────────── */}
      <h2>Go-Specific Tips for Coding Rounds</h2>
      <ul>
        <li><b>HashMaps:</b> <code>map[string]int</code>. Note that Go maps do NOT maintain insertion order.</li>
        <li><b>Sets:</b> Go doesn't have a built-in Set. Use a map with empty structs to save memory: <code>map[string]struct{`{}`}</code>.</li>
        <li><b>Strings:</b> Strings are immutable. Convert to <code>[]rune</code> to manipulate characters, especially for Unicode. Use <code>strings.Builder</code> for efficient concatenation.</li>
        <li><b>Sorting:</b> <code>sort.Ints(arr)</code>, <code>sort.Strings(arr)</code>. For custom sorting, use <code>sort.Slice(arr, func(i, j int) bool {`{ return arr[i] &lt; arr[j] }`})</code>.</li>
        <li><b>Heaps:</b> You must implement the <code>heap.Interface</code> (Len, Less, Swap, Push, Pop) on a slice type. Memorize this boilerplate before interviews.</li>
        <li><b>Queues/Stacks:</b> Just use slices. Push: <code>stack = append(stack, val)</code>. Pop: <code>val, stack = stack[len(stack)-1], stack[:len(stack)-1]</code>. Dequeue (BFS): <code>val, q = q[0], q[1:]</code>.</li>
      </ul>

      {/* ────────── MORE PATTERNS ────────── */}
      <h2>Additional Must-Know Patterns</h2>

      <details><summary>8. Graph Algorithms (BFS/DFS on Adjacency Lists)</summary>
        <p>Many problems are graphs in disguise (prerequisites, social networks, routes).</p>
        <pre><code>{`// Build adjacency list
graph := make(map[int][]int)
for _, edge := range edges {
    graph[edge[0]] = append(graph[edge[0]], edge[1])
    graph[edge[1]] = append(graph[edge[1]], edge[0]) // undirected
}

// BFS — shortest path in unweighted graph
func bfs(graph map[int][]int, start int) map[int]int {
    dist := map[int]int{start: 0}
    queue := []int{start}
    for len(queue) > 0 {
        node := queue[0]
        queue = queue[1:]
        for _, neighbor := range graph[node] {
            if _, visited := dist[neighbor]; !visited {
                dist[neighbor] = dist[node] + 1
                queue = append(queue, neighbor)
            }
        }
    }
    return dist
}

// Topological Sort (for DAGs — course prerequisites, build order)
// Using Kahn's algorithm (BFS-based)
func topologicalSort(numCourses int, prerequisites [][]int) []int {
    inDegree := make([]int, numCourses)
    graph := make(map[int][]int)
    for _, p := range prerequisites {
        graph[p[1]] = append(graph[p[1]], p[0])
        inDegree[p[0]]++
    }
    
    queue := []int{}
    for i, d := range inDegree {
        if d == 0 { queue = append(queue, i) }
    }
    
    var order []int
    for len(queue) > 0 {
        node := queue[0]; queue = queue[1:]
        order = append(order, node)
        for _, next := range graph[node] {
            inDegree[next]--
            if inDegree[next] == 0 { queue = append(queue, next) }
        }
    }
    if len(order) != numCourses { return nil } // cycle detected
    return order
}`}</code></pre>
      </details>

      <details><summary>9. Backtracking</summary>
        <p>Generate all combinations, permutations, or subsets. Think of it as DFS on a decision tree.</p>
        <pre><code>{`// Template: Generate all subsets
func subsets(nums []int) [][]int {
    var result [][]int
    var current []int
    
    var backtrack func(start int)
    backtrack = func(start int) {
        // Make a copy of current and add to result
        temp := make([]int, len(current))
        copy(temp, current)
        result = append(result, temp)
        
        for i := start; i < len(nums); i++ {
            current = append(current, nums[i])  // choose
            backtrack(i + 1)                     // explore
            current = current[:len(current)-1]   // un-choose (backtrack)
        }
    }
    
    backtrack(0)
    return result
}
// Key insight: "choose, explore, un-choose"`}</code></pre>
      </details>

      <details><summary>10. Monotonic Stack</summary>
        <p>Find the &quot;next greater/smaller element&quot; in O(n). Stack maintains monotonic order.</p>
        <pre><code>{`// Next Greater Element
func nextGreaterElement(nums []int) []int {
    n := len(nums)
    result := make([]int, n)
    for i := range result { result[i] = -1 }
    
    stack := []int{} // stores indices
    for i := 0; i < n; i++ {
        for len(stack) > 0 && nums[stack[len(stack)-1]] < nums[i] {
            idx := stack[len(stack)-1]
            stack = stack[:len(stack)-1]
            result[idx] = nums[i]
        }
        stack = append(stack, i)
    }
    return result
}
// Also used in: Largest Rectangle in Histogram, Daily Temperatures`}</code></pre>
      </details>

      <details><summary>11. Trie (Prefix Tree)</summary>
        <p>Efficient storage and retrieval of strings. Used for autocomplete, spell check, IP routing.</p>
        <pre><code>{`type TrieNode struct {
    children map[rune]*TrieNode
    isEnd    bool
}

type Trie struct {
    root *TrieNode
}

func NewTrie() *Trie {
    return &Trie{root: &TrieNode{children: make(map[rune]*TrieNode)}}
}

func (t *Trie) Insert(word string) {
    node := t.root
    for _, ch := range word {
        if _, ok := node.children[ch]; !ok {
            node.children[ch] = &TrieNode{children: make(map[rune]*TrieNode)}
        }
        node = node.children[ch]
    }
    node.isEnd = true
}

func (t *Trie) Search(word string) bool {
    node := t.root
    for _, ch := range word {
        if _, ok := node.children[ch]; !ok { return false }
        node = node.children[ch]
    }
    return node.isEnd
}

func (t *Trie) StartsWith(prefix string) bool {
    node := t.root
    for _, ch := range prefix {
        if _, ok := node.children[ch]; !ok { return false }
        node = node.children[ch]
    }
    return true
}`}</code></pre>
      </details>

      <details><summary>12. Union-Find (Disjoint Set Union)</summary>
        <p>Track connected components. Used for: Number of Islands, Graph connectivity, Kruskal&apos;s MST.</p>
        <pre><code>{`type UnionFind struct {
    parent []int
    rank   []int
}

func NewUnionFind(n int) *UnionFind {
    parent := make([]int, n)
    rank := make([]int, n)
    for i := range parent { parent[i] = i }
    return &UnionFind{parent, rank}
}

func (uf *UnionFind) Find(x int) int {
    if uf.parent[x] != x {
        uf.parent[x] = uf.Find(uf.parent[x]) // path compression
    }
    return uf.parent[x]
}

func (uf *UnionFind) Union(x, y int) bool {
    px, py := uf.Find(x), uf.Find(y)
    if px == py { return false } // already connected
    // Union by rank
    if uf.rank[px] < uf.rank[py] { px, py = py, px }
    uf.parent[py] = px
    if uf.rank[px] == uf.rank[py] { uf.rank[px]++ }
    return true
}`}</code></pre>
      </details>

      {/* ────────── COMPLEXITY ANALYSIS ────────── */}
      <h2>Complexity Analysis Tips</h2>
      <table>
        <thead><tr><th>Complexity</th><th>Name</th><th>Example</th></tr></thead>
        <tbody>
          <tr><td>O(1)</td><td>Constant</td><td>HashMap lookup, array access by index</td></tr>
          <tr><td>O(log n)</td><td>Logarithmic</td><td>Binary search, balanced BST operations</td></tr>
          <tr><td>O(n)</td><td>Linear</td><td>Single pass through array, linear search</td></tr>
          <tr><td>O(n log n)</td><td>Linearithmic</td><td>Merge sort, heap sort, sorting in general</td></tr>
          <tr><td>O(n²)</td><td>Quadratic</td><td>Bubble sort, nested loops, brute force pairs</td></tr>
          <tr><td>O(2ⁿ)</td><td>Exponential</td><td>Subsets, recursive Fibonacci without memo</td></tr>
          <tr><td>O(n!)</td><td>Factorial</td><td>Permutations, traveling salesman brute force</td></tr>
        </tbody>
      </table>
      <p><b>Space complexity matters too:</b> Recursive DFS uses O(height) stack space. BFS uses O(width) queue space. Mention both in interviews.</p>

      {/* ────────── PROBLEM SOLVING FRAMEWORK ────────── */}
      <h2>Problem Solving Framework</h2>
      <ol>
        <li><b>Clarify:</b> Ask about constraints, edge cases, input size. &quot;Can the array contain negatives? Duplicates? Is it sorted?&quot;</li>
        <li><b>Examples:</b> Walk through 2-3 examples including edge cases (empty input, single element).</li>
        <li><b>Brute Force:</b> State the obvious O(n²) or O(n!) solution first. It shows you understand the problem.</li>
        <li><b>Optimize:</b> Identify the pattern. Can you use a HashMap to trade space for time? Sorting? Two pointers?</li>
        <li><b>Code:</b> Write clean code. Use meaningful variable names. Handle edge cases first.</li>
        <li><b>Test:</b> Trace through your code with your examples. Check off-by-one errors.</li>
        <li><b>Analyze:</b> State time and space complexity.</li>
      </ol>

      <h2>Interview Quick Reference</h2>
      <table>
        <thead><tr><th>Pattern</th><th>Recognize When</th><th>Classic Problems</th></tr></thead>
        <tbody>
          <tr><td>Sliding Window</td><td>&quot;Subarray/substring&quot; with a condition</td><td>Longest Substring Without Repeating, Minimum Window Substring</td></tr>
          <tr><td>Two Pointers</td><td>Sorted array, pairs, palindromes</td><td>Two Sum II, Container With Most Water, Valid Palindrome</td></tr>
          <tr><td>Binary Search</td><td>Sorted data or monotonic answer space</td><td>Search in Rotated Array, Koko Eating Bananas</td></tr>
          <tr><td>BFS/DFS</td><td>Graphs, trees, grids, connected components</td><td>Number of Islands, Word Ladder, Clone Graph</td></tr>
          <tr><td>Topological Sort</td><td>DAGs, dependencies, ordering</td><td>Course Schedule, Build Order</td></tr>
          <tr><td>Heap / Top K</td><td>&quot;Kth largest&quot;, &quot;top K&quot;, &quot;K closest&quot;</td><td>Kth Largest Element, Merge K Sorted Lists</td></tr>
          <tr><td>Dynamic Programming</td><td>Overlapping subproblems + optimal substructure</td><td>Climbing Stairs, Coin Change, Longest Common Subsequence</td></tr>
          <tr><td>Backtracking</td><td>Generate all combinations/permutations</td><td>Subsets, Permutations, N-Queens</td></tr>
          <tr><td>Union-Find</td><td>Connected components, group membership</td><td>Number of Provinces, Redundant Connection</td></tr>
        </tbody>
      </table>
    </>
  );
}
