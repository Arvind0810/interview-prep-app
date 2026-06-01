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
    </>
  );
}
