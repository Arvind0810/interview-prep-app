export const metadata = { title: "DSA Refresher — Interview Prep" };

export default function DSAPage() {
  return (
    <>
      <h1>DSA Refresher</h1>
      <p>Even backend-heavy interviews include 1–2 coding rounds. You don&apos;t need leetcode hard — solid mediums on common patterns are enough.</p>

      <h2>Must-Know Patterns</h2>
      <details><summary>Two pointers</summary>
        <p>Two indexes moving through an array. Used for sorted-array problems, palindromes, &quot;remove duplicates in place&quot;.</p>
      </details>
      <details><summary>Sliding window</summary>
        <p>Fixed or variable window over an array/string. Substring problems, &quot;longest substring with K distinct chars&quot;, rolling averages.</p>
      </details>
      <details><summary>Hashmap counting</summary>
        <p>Frequency tables for &quot;anagrams&quot;, &quot;two sum&quot;, &quot;first non-repeating char&quot;. O(n) time, O(k) space.</p>
      </details>
      <details><summary>Binary search</summary>
        <p>Not just on sorted arrays — also on &quot;answer space&quot; (e.g., min capacity to ship packages in D days).</p>
      </details>
      <details><summary>BFS / DFS</summary>
        <p>Graph and tree traversal. BFS for shortest path in unweighted graph, level-order. DFS for connectivity, cycle detection, topological sort.</p>
      </details>
      <details><summary>Recursion + memoization</summary>
        <p>Many DP problems start here. Climbing stairs, coin change, longest common subsequence.</p>
      </details>
      <details><summary>Heap / Priority Queue</summary>
        <p>Top-K problems, merge K sorted lists, scheduling.</p>
      </details>
      <details><summary>Stack</summary>
        <p>Matching brackets, &quot;next greater element&quot;, expression evaluation.</p>
      </details>
      <details><summary>Trie</summary>
        <p>Prefix search, autocomplete, word dictionary.</p>
      </details>
      <details><summary>Union-Find</summary>
        <p>Disjoint sets — number of islands, friend circles, Kruskal&apos;s MST.</p>
      </details>

      <h2>Big-O Cheat Sheet</h2>
      <table>
        <thead><tr><th>Operation</th><th>Array</th><th>HashMap</th><th>Sorted Tree</th></tr></thead>
        <tbody>
          <tr><td>Access by index</td><td>O(1)</td><td>—</td><td>O(log n)</td></tr>
          <tr><td>Search</td><td>O(n)</td><td>O(1) avg</td><td>O(log n)</td></tr>
          <tr><td>Insert</td><td>O(n)</td><td>O(1) avg</td><td>O(log n)</td></tr>
          <tr><td>Delete</td><td>O(n)</td><td>O(1) avg</td><td>O(log n)</td></tr>
        </tbody>
      </table>

      <h2>Go-Specific Tips for Coding Rounds</h2>
      <ul>
        <li>Use <code>map[string]int</code> for frequency tables — Go has no SortedMap, use slice+sort</li>
        <li>Strings are immutable — convert to <code>[]byte</code> or <code>[]rune</code> for in-place manipulation</li>
        <li>No built-in heap as a struct — use <code>container/heap</code> package (implements interface methods)</li>
        <li>Slices share underlying array — be careful copying with <code>:</code> when passing to recursion</li>
        <li>Use <code>strings.Builder</code> for string concatenation in loops</li>
      </ul>

      <h2>Practice Problems by Topic (Leetcode)</h2>
      <ul>
        <li><b>Arrays:</b> Two Sum, Best Time to Buy/Sell Stock, Product of Array Except Self</li>
        <li><b>Strings:</b> Longest Substring Without Repeating, Valid Anagram, Group Anagrams</li>
        <li><b>Linked List:</b> Reverse Linked List, Merge Two Sorted Lists, Detect Cycle</li>
        <li><b>Trees:</b> Validate BST, Level Order Traversal, Lowest Common Ancestor</li>
        <li><b>Graphs:</b> Number of Islands, Course Schedule, Clone Graph</li>
        <li><b>DP:</b> Climbing Stairs, House Robber, Longest Increasing Subsequence</li>
        <li><b>System-design coding:</b> LRU Cache, Design Twitter, Design Hit Counter</li>
      </ul>
    </>
  );
}
