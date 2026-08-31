// LeetCode challenges solved in Go. `lang` is attached by the index module.
const goChallenges = [
  {
    id: 1,
    title: "Two Sum",
    slug: "two-sum",
    difficulty: "easy",
    pattern: "Hash Map",
    topics: ["Array", "Hash Table"],
    complexity: { time: "O(n)", space: "O(n)" },
    approach:
      "Walk the array once, keeping a map from value to index. For each number check whether target-num was already seen; if it was, the pair is complete. Storing after the lookup prevents reusing the same element twice.",
    code: `func twoSum(nums []int, target int) []int {
    seen := make(map[int]int, len(nums))
    for i, n := range nums {
        if j, ok := seen[target-n]; ok {
            return []int{j, i}
        }
        seen[n] = i
    }
    return nil
}`,
  },
  {
    id: 121,
    title: "Best Time to Buy and Sell Stock",
    slug: "best-time-to-buy-and-sell-stock",
    difficulty: "easy",
    pattern: "Greedy / One Pass",
    topics: ["Array", "Dynamic Programming"],
    complexity: { time: "O(n)", space: "O(1)" },
    approach:
      "Track the lowest price seen so far. At every day the best profit ending today is price - minSoFar, so keep a running maximum of that. One pass, no extra memory.",
    code: `func maxProfit(prices []int) int {
    if len(prices) == 0 {
        return 0
    }
    minPrice, best := prices[0], 0
    for _, p := range prices[1:] {
        if p < minPrice {
            minPrice = p
        } else if p-minPrice > best {
            best = p - minPrice
        }
    }
    return best
}`,
  },
  {
    id: 217,
    title: "Contains Duplicate",
    slug: "contains-duplicate",
    difficulty: "easy",
    pattern: "Hash Set",
    topics: ["Array", "Hash Table", "Sorting"],
    complexity: { time: "O(n)", space: "O(n)" },
    approach:
      "Insert each value into a set and return true the first time an insert collides. Sorting gives an O(1)-space alternative at O(n log n) time.",
    code: `func containsDuplicate(nums []int) bool {
    seen := make(map[int]struct{}, len(nums))
    for _, n := range nums {
        if _, ok := seen[n]; ok {
            return true
        }
        seen[n] = struct{}{}
    }
    return false
}`,
  },
  {
    id: 238,
    title: "Product of Array Except Self",
    slug: "product-of-array-except-self",
    difficulty: "med",
    pattern: "Prefix / Suffix Products",
    topics: ["Array", "Prefix Sum"],
    complexity: { time: "O(n)", space: "O(1) extra" },
    approach:
      "Division is banned, so build the answer in two sweeps: left-to-right fill each slot with the product of everything before it, then right-to-left multiply in the product of everything after it. The output array carries the prefix state, so no extra allocation.",
    code: `func productExceptSelf(nums []int) []int {
    res := make([]int, len(nums))
    prefix := 1
    for i := range nums {
        res[i] = prefix
        prefix *= nums[i]
    }
    suffix := 1
    for i := len(nums) - 1; i >= 0; i-- {
        res[i] *= suffix
        suffix *= nums[i]
    }
    return res
}`,
  },
  {
    id: 53,
    title: "Maximum Subarray",
    slug: "maximum-subarray",
    difficulty: "med",
    pattern: "Kadane's Algorithm",
    topics: ["Array", "Dynamic Programming", "Divide and Conquer"],
    complexity: { time: "O(n)", space: "O(1)" },
    approach:
      "The best subarray ending at i either extends the previous one or restarts at i. Keep that running value and the global maximum. A negative running sum can never help a later subarray, so drop it.",
    code: `func maxSubArray(nums []int) int {
    cur, best := nums[0], nums[0]
    for _, n := range nums[1:] {
        if cur < 0 {
            cur = n
        } else {
            cur += n
        }
        if cur > best {
            best = cur
        }
    }
    return best
}`,
  },
  {
    id: 152,
    title: "Maximum Product Subarray",
    slug: "maximum-product-subarray",
    difficulty: "med",
    pattern: "Dynamic Programming",
    topics: ["Array", "Dynamic Programming"],
    complexity: { time: "O(n)", space: "O(1)" },
    approach:
      "A negative number flips the biggest product into the smallest and vice versa, so carry both the running max and running min. At each step the candidates are n, curMax*n and curMin*n.",
    code: `func maxProduct(nums []int) int {
    curMax, curMin, best := nums[0], nums[0], nums[0]
    for _, n := range nums[1:] {
        if n < 0 {
            curMax, curMin = curMin, curMax
        }
        curMax = max(n, curMax*n)
        curMin = min(n, curMin*n)
        best = max(best, curMax)
    }
    return best
}`,
  },
  {
    id: 153,
    title: "Find Minimum in Rotated Sorted Array",
    slug: "find-minimum-in-rotated-sorted-array",
    difficulty: "med",
    pattern: "Binary Search",
    topics: ["Array", "Binary Search"],
    complexity: { time: "O(log n)", space: "O(1)" },
    approach:
      "Compare mid against the right end rather than the left. If nums[mid] > nums[hi] the rotation point is strictly right of mid; otherwise mid could itself be the minimum, so keep it. The loop ends when the window collapses to one element.",
    code: `func findMin(nums []int) int {
    lo, hi := 0, len(nums)-1
    for lo < hi {
        mid := lo + (hi-lo)/2
        if nums[mid] > nums[hi] {
            lo = mid + 1
        } else {
            hi = mid
        }
    }
    return nums[lo]
}`,
  },
  {
    id: 33,
    title: "Search in Rotated Sorted Array",
    slug: "search-in-rotated-sorted-array",
    difficulty: "med",
    pattern: "Binary Search",
    topics: ["Array", "Binary Search"],
    complexity: { time: "O(log n)", space: "O(1)" },
    approach:
      "At every step one of the two halves is guaranteed sorted. Identify which by comparing nums[lo] with nums[mid], then check whether the target lies inside that sorted half and discard the other one.",
    code: `func search(nums []int, target int) int {
    lo, hi := 0, len(nums)-1
    for lo <= hi {
        mid := lo + (hi-lo)/2
        switch {
        case nums[mid] == target:
            return mid
        case nums[lo] <= nums[mid]: // left half sorted
            if nums[lo] <= target && target < nums[mid] {
                hi = mid - 1
            } else {
                lo = mid + 1
            }
        default: // right half sorted
            if nums[mid] < target && target <= nums[hi] {
                lo = mid + 1
            } else {
                hi = mid - 1
            }
        }
    }
    return -1
}`,
  },
  {
    id: 15,
    title: "3Sum",
    slug: "3sum",
    difficulty: "med",
    pattern: "Sort + Two Pointers",
    topics: ["Array", "Two Pointers", "Sorting"],
    complexity: { time: "O(n^2)", space: "O(1) extra" },
    approach:
      "Sort, then fix the first number and two-pointer the remainder for the complementary pair. Skip duplicate values at both the anchor and the pointers so each triplet is emitted once. Break early once the anchor turns positive.",
    code: `func threeSum(nums []int) [][]int {
    sort.Ints(nums)
    var res [][]int
    for i := 0; i < len(nums)-2; i++ {
        if nums[i] > 0 {
            break
        }
        if i > 0 && nums[i] == nums[i-1] {
            continue
        }
        lo, hi := i+1, len(nums)-1
        for lo < hi {
            sum := nums[i] + nums[lo] + nums[hi]
            switch {
            case sum < 0:
                lo++
            case sum > 0:
                hi--
            default:
                res = append(res, []int{nums[i], nums[lo], nums[hi]})
                lo++
                for lo < hi && nums[lo] == nums[lo-1] {
                    lo++
                }
            }
        }
    }
    return res
}`,
  },
  {
    id: 11,
    title: "Container With Most Water",
    slug: "container-with-most-water",
    difficulty: "med",
    pattern: "Two Pointers",
    topics: ["Array", "Two Pointers", "Greedy"],
    complexity: { time: "O(n)", space: "O(1)" },
    approach:
      "Start at the widest pair. Area is bounded by the shorter wall, so moving the taller one in can never help — only moving the shorter wall can find a taller bound. Shrink from the shorter side each step.",
    code: `func maxArea(height []int) int {
    lo, hi, best := 0, len(height)-1, 0
    for lo < hi {
        h := min(height[lo], height[hi])
        if area := h * (hi - lo); area > best {
            best = area
        }
        if height[lo] < height[hi] {
            lo++
        } else {
            hi--
        }
    }
    return best
}`,
  },
  {
    id: 242,
    title: "Valid Anagram",
    slug: "valid-anagram",
    difficulty: "easy",
    pattern: "Frequency Count",
    topics: ["Hash Table", "String", "Sorting"],
    complexity: { time: "O(n)", space: "O(1)" },
    approach:
      "Count runes in the first string, decrement with the second, and check every bucket landed back on zero. Lengths must match first, otherwise a prefix could pass.",
    code: `func isAnagram(s, t string) bool {
    if len(s) != len(t) {
        return false
    }
    var count [26]int
    for i := 0; i < len(s); i++ {
        count[s[i]-'a']++
        count[t[i]-'a']--
    }
    for _, c := range count {
        if c != 0 {
            return false
        }
    }
    return true
}`,
  },
  {
    id: 49,
    title: "Group Anagrams",
    slug: "group-anagrams",
    difficulty: "med",
    pattern: "Hash Map + Canonical Key",
    topics: ["Hash Table", "String", "Sorting"],
    complexity: { time: "O(n * k)", space: "O(n * k)" },
    approach:
      "Every anagram class needs one canonical key. A 26-slot letter count turned into a string is O(k) per word, cheaper than sorting the word. Bucket the originals under that key.",
    code: `func groupAnagrams(strs []string) [][]string {
    groups := make(map[[26]int][]string)
    for _, s := range strs {
        var key [26]int
        for i := 0; i < len(s); i++ {
            key[s[i]-'a']++
        }
        groups[key] = append(groups[key], s)
    }
    res := make([][]string, 0, len(groups))
    for _, g := range groups {
        res = append(res, g)
    }
    return res
}`,
  },
  {
    id: 125,
    title: "Valid Palindrome",
    slug: "valid-palindrome",
    difficulty: "easy",
    pattern: "Two Pointers",
    topics: ["Two Pointers", "String"],
    complexity: { time: "O(n)", space: "O(1)" },
    approach:
      "Converge two pointers, skipping anything that is not alphanumeric, and compare lowercased characters. Avoids building a cleaned copy of the string.",
    code: `func isPalindrome(s string) bool {
    lo, hi := 0, len(s)-1
    for lo < hi {
        for lo < hi && !isAlnum(s[lo]) {
            lo++
        }
        for lo < hi && !isAlnum(s[hi]) {
            hi--
        }
        if lower(s[lo]) != lower(s[hi]) {
            return false
        }
        lo++
        hi--
    }
    return true
}

func isAlnum(b byte) bool {
    return (b >= 'a' && b <= 'z') || (b >= 'A' && b <= 'Z') || (b >= '0' && b <= '9')
}

func lower(b byte) byte {
    if b >= 'A' && b <= 'Z' {
        return b + 32
    }
    return b
}`,
  },
  {
    id: 3,
    title: "Longest Substring Without Repeating Characters",
    slug: "longest-substring-without-repeating-characters",
    difficulty: "med",
    pattern: "Sliding Window",
    topics: ["Hash Table", "String", "Sliding Window"],
    complexity: { time: "O(n)", space: "O(min(n, charset))" },
    approach:
      "Store the last index of every character. When the right pointer hits a repeat that sits inside the current window, jump the left pointer just past that previous occurrence instead of stepping one at a time.",
    code: `func lengthOfLongestSubstring(s string) int {
    last := make(map[byte]int)
    left, best := 0, 0
    for right := 0; right < len(s); right++ {
        if prev, ok := last[s[right]]; ok && prev >= left {
            left = prev + 1
        }
        last[s[right]] = right
        if right-left+1 > best {
            best = right - left + 1
        }
    }
    return best
}`,
  },
  {
    id: 424,
    title: "Longest Repeating Character Replacement",
    slug: "longest-repeating-character-replacement",
    difficulty: "med",
    pattern: "Sliding Window",
    topics: ["Hash Table", "String", "Sliding Window"],
    complexity: { time: "O(n)", space: "O(1)" },
    approach:
      "A window is valid when windowLen - countOfMostFrequentChar <= k. Grow right always; when the window turns invalid, shrink left by one. Tracking the historical max frequency is enough because the answer never shrinks.",
    code: `func characterReplacement(s string, k int) int {
    var count [26]int
    left, maxFreq, best := 0, 0, 0
    for right := 0; right < len(s); right++ {
        count[s[right]-'A']++
        if count[s[right]-'A'] > maxFreq {
            maxFreq = count[s[right]-'A']
        }
        for (right-left+1)-maxFreq > k {
            count[s[left]-'A']--
            left++
        }
        if right-left+1 > best {
            best = right - left + 1
        }
    }
    return best
}`,
  },
  {
    id: 76,
    title: "Minimum Window Substring",
    slug: "minimum-window-substring",
    difficulty: "hard",
    pattern: "Sliding Window",
    topics: ["Hash Table", "String", "Sliding Window"],
    complexity: { time: "O(n + m)", space: "O(charset)" },
    approach:
      "Count what t requires, then expand right until every requirement is met. `have` counts how many distinct characters have hit their quota. Once the window is complete, contract from the left while it stays complete, recording the smallest span.",
    code: `func minWindow(s, t string) string {
    if len(s) < len(t) || t == "" {
        return ""
    }
    need := make(map[byte]int)
    for i := 0; i < len(t); i++ {
        need[t[i]]++
    }
    window := make(map[byte]int)
    have, required := 0, len(need)
    bestLen, bestStart, left := len(s)+1, 0, 0

    for right := 0; right < len(s); right++ {
        c := s[right]
        window[c]++
        if n, ok := need[c]; ok && window[c] == n {
            have++
        }
        for have == required {
            if right-left+1 < bestLen {
                bestLen, bestStart = right-left+1, left
            }
            lc := s[left]
            window[lc]--
            if n, ok := need[lc]; ok && window[lc] < n {
                have--
            }
            left++
        }
    }
    if bestLen > len(s) {
        return ""
    }
    return s[bestStart : bestStart+bestLen]
}`,
  },
  {
    id: 20,
    title: "Valid Parentheses",
    slug: "valid-parentheses",
    difficulty: "easy",
    pattern: "Stack",
    topics: ["String", "Stack"],
    complexity: { time: "O(n)", space: "O(n)" },
    approach:
      "Push openers, and on a closer pop and confirm it matches. A non-empty stack at the end means unclosed brackets, and popping from empty means an unmatched closer.",
    code: `func isValid(s string) bool {
    pairs := map[byte]byte{')': '(', ']': '[', '}': '{'}
    stack := make([]byte, 0, len(s))
    for i := 0; i < len(s); i++ {
        open, isCloser := pairs[s[i]]
        if !isCloser {
            stack = append(stack, s[i])
            continue
        }
        if len(stack) == 0 || stack[len(stack)-1] != open {
            return false
        }
        stack = stack[:len(stack)-1]
    }
    return len(stack) == 0
}`,
  },
  {
    id: 5,
    title: "Longest Palindromic Substring",
    slug: "longest-palindromic-substring",
    difficulty: "med",
    pattern: "Expand Around Center",
    topics: ["String", "Dynamic Programming", "Two Pointers"],
    complexity: { time: "O(n^2)", space: "O(1)" },
    approach:
      "Every palindrome has a center: 2n-1 of them counting the gaps between characters. Expand outward from each and keep the widest. Constant space, unlike the DP table version.",
    code: `func longestPalindrome(s string) string {
    if len(s) < 2 {
        return s
    }
    start, maxLen := 0, 1
    expand := func(l, r int) {
        for l >= 0 && r < len(s) && s[l] == s[r] {
            l--
            r++
        }
        if r-l-1 > maxLen {
            start, maxLen = l+1, r-l-1
        }
    }
    for i := 0; i < len(s); i++ {
        expand(i, i)   // odd length
        expand(i, i+1) // even length
    }
    return s[start : start+maxLen]
}`,
  },
  {
    id: 647,
    title: "Palindromic Substrings",
    slug: "palindromic-substrings",
    difficulty: "med",
    pattern: "Expand Around Center",
    topics: ["String", "Dynamic Programming"],
    complexity: { time: "O(n^2)", space: "O(1)" },
    approach:
      "Same centers as the longest-palindrome problem, but count every successful expansion instead of tracking the widest.",
    code: `func countSubstrings(s string) int {
    total := 0
    expand := func(l, r int) {
        for l >= 0 && r < len(s) && s[l] == s[r] {
            total++
            l--
            r++
        }
    }
    for i := 0; i < len(s); i++ {
        expand(i, i)
        expand(i, i+1)
    }
    return total
}`,
  },
  {
    id: 206,
    title: "Reverse Linked List",
    slug: "reverse-linked-list",
    difficulty: "easy",
    pattern: "Linked List Pointers",
    topics: ["Linked List", "Recursion"],
    complexity: { time: "O(n)", space: "O(1)" },
    approach:
      "Carry a prev pointer and flip each node's Next to it, saving the successor before overwriting. prev is the new head once the walk falls off the end.",
    code: `func reverseList(head *ListNode) *ListNode {
    var prev *ListNode
    for head != nil {
        next := head.Next
        head.Next = prev
        prev = head
        head = next
    }
    return prev
}`,
  },
  {
    id: 21,
    title: "Merge Two Sorted Lists",
    slug: "merge-two-sorted-lists",
    difficulty: "easy",
    pattern: "Two Pointers / Dummy Head",
    topics: ["Linked List", "Recursion"],
    complexity: { time: "O(n + m)", space: "O(1)" },
    approach:
      "A dummy head removes the special case for the first node. Splice whichever list has the smaller head, then attach the non-empty remainder in one step.",
    code: `func mergeTwoLists(l1, l2 *ListNode) *ListNode {
    dummy := &ListNode{}
    tail := dummy
    for l1 != nil && l2 != nil {
        if l1.Val <= l2.Val {
            tail.Next, l1 = l1, l1.Next
        } else {
            tail.Next, l2 = l2, l2.Next
        }
        tail = tail.Next
    }
    if l1 != nil {
        tail.Next = l1
    } else {
        tail.Next = l2
    }
    return dummy.Next
}`,
  },
  {
    id: 141,
    title: "Linked List Cycle",
    slug: "linked-list-cycle",
    difficulty: "easy",
    pattern: "Fast & Slow Pointers",
    topics: ["Linked List", "Two Pointers"],
    complexity: { time: "O(n)", space: "O(1)" },
    approach:
      "Floyd's tortoise and hare. If a cycle exists the fast pointer laps the slow one and they collide; otherwise fast walks off the end. No visited set needed.",
    code: `func hasCycle(head *ListNode) bool {
    slow, fast := head, head
    for fast != nil && fast.Next != nil {
        slow = slow.Next
        fast = fast.Next.Next
        if slow == fast {
            return true
        }
    }
    return false
}`,
  },
  {
    id: 19,
    title: "Remove Nth Node From End of List",
    slug: "remove-nth-node-from-end-of-list",
    difficulty: "med",
    pattern: "Fast & Slow Pointers",
    topics: ["Linked List", "Two Pointers"],
    complexity: { time: "O(n)", space: "O(1)" },
    approach:
      "Advance a lead pointer n steps, then move both until lead falls off. The trailing pointer now sits just before the target. Starting the trailer at a dummy handles removing the head itself.",
    code: `func removeNthFromEnd(head *ListNode, n int) *ListNode {
    dummy := &ListNode{Next: head}
    lead, trail := head, dummy
    for i := 0; i < n; i++ {
        lead = lead.Next
    }
    for lead != nil {
        lead = lead.Next
        trail = trail.Next
    }
    trail.Next = trail.Next.Next
    return dummy.Next
}`,
  },
  {
    id: 143,
    title: "Reorder List",
    slug: "reorder-list",
    difficulty: "med",
    pattern: "Split + Reverse + Merge",
    topics: ["Linked List", "Two Pointers", "Stack"],
    complexity: { time: "O(n)", space: "O(1)" },
    approach:
      "Three classic sub-routines composed: find the middle with fast/slow, reverse the second half in place, then interleave the two halves. Cutting the first half's tail avoids a cycle.",
    code: `func reorderList(head *ListNode) {
    if head == nil || head.Next == nil {
        return
    }
    slow, fast := head, head
    for fast.Next != nil && fast.Next.Next != nil {
        slow, fast = slow.Next, fast.Next.Next
    }
    second := slow.Next
    slow.Next = nil

    var prev *ListNode
    for second != nil {
        next := second.Next
        second.Next = prev
        prev, second = second, next
    }

    first, second := head, prev
    for second != nil {
        n1, n2 := first.Next, second.Next
        first.Next = second
        second.Next = n1
        first, second = n1, n2
    }
}`,
  },
  {
    id: 23,
    title: "Merge k Sorted Lists",
    slug: "merge-k-sorted-lists",
    difficulty: "hard",
    pattern: "Divide and Conquer",
    topics: ["Linked List", "Heap", "Divide and Conquer"],
    complexity: { time: "O(N log k)", space: "O(1)" },
    approach:
      "Pair the lists up and merge them two at a time, halving the list count each round. Same complexity as a k-sized heap but with no priority-queue boilerplate and O(1) extra space.",
    code: `func mergeKLists(lists []*ListNode) *ListNode {
    if len(lists) == 0 {
        return nil
    }
    for len(lists) > 1 {
        var merged []*ListNode
        for i := 0; i < len(lists); i += 2 {
            if i+1 < len(lists) {
                merged = append(merged, mergeTwoLists(lists[i], lists[i+1]))
            } else {
                merged = append(merged, lists[i])
            }
        }
        lists = merged
    }
    return lists[0]
}`,
  },
  {
    id: 226,
    title: "Invert Binary Tree",
    slug: "invert-binary-tree",
    difficulty: "easy",
    pattern: "Tree Recursion",
    topics: ["Tree", "DFS", "BFS", "Binary Tree"],
    complexity: { time: "O(n)", space: "O(h)" },
    approach:
      "Swap the two children at every node and recurse. Go's multiple assignment does the swap without a temp.",
    code: `func invertTree(root *TreeNode) *TreeNode {
    if root == nil {
        return nil
    }
    root.Left, root.Right = invertTree(root.Right), invertTree(root.Left)
    return root
}`,
  },
  {
    id: 104,
    title: "Maximum Depth of Binary Tree",
    slug: "maximum-depth-of-binary-tree",
    difficulty: "easy",
    pattern: "Tree Recursion",
    topics: ["Tree", "DFS", "BFS", "Binary Tree"],
    complexity: { time: "O(n)", space: "O(h)" },
    approach:
      "Depth of a node is one plus the deeper of its two subtrees. Base case nil returns 0.",
    code: `func maxDepth(root *TreeNode) int {
    if root == nil {
        return 0
    }
    return 1 + max(maxDepth(root.Left), maxDepth(root.Right))
}`,
  },
  {
    id: 100,
    title: "Same Tree",
    slug: "same-tree",
    difficulty: "easy",
    pattern: "Tree Recursion",
    topics: ["Tree", "DFS", "Binary Tree"],
    complexity: { time: "O(n)", space: "O(h)" },
    approach:
      "Two trees match when both are nil, or both are non-nil with equal values and matching subtrees. Check the nil cases before dereferencing.",
    code: `func isSameTree(p, q *TreeNode) bool {
    if p == nil || q == nil {
        return p == q
    }
    return p.Val == q.Val &&
        isSameTree(p.Left, q.Left) &&
        isSameTree(p.Right, q.Right)
}`,
  },
  {
    id: 102,
    title: "Binary Tree Level Order Traversal",
    slug: "binary-tree-level-order-traversal",
    difficulty: "med",
    pattern: "BFS",
    topics: ["Tree", "BFS", "Binary Tree"],
    complexity: { time: "O(n)", space: "O(n)" },
    approach:
      "Standard queue BFS, but snapshot the queue length at the top of each round so one iteration drains exactly one level into its own slice.",
    code: `func levelOrder(root *TreeNode) [][]int {
    if root == nil {
        return nil
    }
    var res [][]int
    queue := []*TreeNode{root}
    for len(queue) > 0 {
        n := len(queue)
        level := make([]int, 0, n)
        for i := 0; i < n; i++ {
            node := queue[0]
            queue = queue[1:]
            level = append(level, node.Val)
            if node.Left != nil {
                queue = append(queue, node.Left)
            }
            if node.Right != nil {
                queue = append(queue, node.Right)
            }
        }
        res = append(res, level)
    }
    return res
}`,
  },
  {
    id: 98,
    title: "Validate Binary Search Tree",
    slug: "validate-binary-search-tree",
    difficulty: "med",
    pattern: "DFS with Bounds",
    topics: ["Tree", "DFS", "BST", "Binary Tree"],
    complexity: { time: "O(n)", space: "O(h)" },
    approach:
      "Checking only parent against child is wrong — a deep descendant can violate an ancestor's bound. Thread a (low, high) range down the recursion and tighten it at each turn.",
    code: `func isValidBST(root *TreeNode) bool {
    var check func(n *TreeNode, lo, hi *int) bool
    check = func(n *TreeNode, lo, hi *int) bool {
        if n == nil {
            return true
        }
        if lo != nil && n.Val <= *lo {
            return false
        }
        if hi != nil && n.Val >= *hi {
            return false
        }
        return check(n.Left, lo, &n.Val) && check(n.Right, &n.Val, hi)
    }
    return check(root, nil, nil)
}`,
  },
  {
    id: 230,
    title: "Kth Smallest Element in a BST",
    slug: "kth-smallest-element-in-a-bst",
    difficulty: "med",
    pattern: "In-order Traversal",
    topics: ["Tree", "DFS", "BST", "Binary Tree"],
    complexity: { time: "O(h + k)", space: "O(h)" },
    approach:
      "In-order traversal of a BST emits sorted values. Use an explicit stack so you can stop the moment the kth value pops, instead of walking the whole tree.",
    code: `func kthSmallest(root *TreeNode, k int) int {
    stack := []*TreeNode{}
    cur := root
    for cur != nil || len(stack) > 0 {
        for cur != nil {
            stack = append(stack, cur)
            cur = cur.Left
        }
        cur = stack[len(stack)-1]
        stack = stack[:len(stack)-1]
        k--
        if k == 0 {
            return cur.Val
        }
        cur = cur.Right
    }
    return -1
}`,
  },
  {
    id: 235,
    title: "Lowest Common Ancestor of a BST",
    slug: "lowest-common-ancestor-of-a-binary-search-tree",
    difficulty: "med",
    pattern: "BST Property",
    topics: ["Tree", "DFS", "BST", "Binary Tree"],
    complexity: { time: "O(h)", space: "O(1)" },
    approach:
      "Walk down from the root. While both targets sit on the same side, follow that side. The first node where they split — or that equals one of them — is the lowest common ancestor.",
    code: `func lowestCommonAncestor(root, p, q *TreeNode) *TreeNode {
    for root != nil {
        switch {
        case p.Val < root.Val && q.Val < root.Val:
            root = root.Left
        case p.Val > root.Val && q.Val > root.Val:
            root = root.Right
        default:
            return root
        }
    }
    return nil
}`,
  },
  {
    id: 200,
    title: "Number of Islands",
    slug: "number-of-islands",
    difficulty: "med",
    pattern: "Grid DFS / Flood Fill",
    topics: ["Array", "DFS", "BFS", "Union Find", "Matrix"],
    complexity: { time: "O(m * n)", space: "O(m * n)" },
    approach:
      "Scan every cell; each unvisited land cell starts a new island, and a flood fill sinks its whole component so it is never counted again. Mutating the grid to '0' doubles as the visited set.",
    code: `func numIslands(grid [][]byte) int {
    if len(grid) == 0 {
        return 0
    }
    rows, cols := len(grid), len(grid[0])
    var sink func(r, c int)
    sink = func(r, c int) {
        if r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] != '1' {
            return
        }
        grid[r][c] = '0'
        sink(r+1, c)
        sink(r-1, c)
        sink(r, c+1)
        sink(r, c-1)
    }
    count := 0
    for r := 0; r < rows; r++ {
        for c := 0; c < cols; c++ {
            if grid[r][c] == '1' {
                count++
                sink(r, c)
            }
        }
    }
    return count
}`,
  },
  {
    id: 133,
    title: "Clone Graph",
    slug: "clone-graph",
    difficulty: "med",
    pattern: "DFS + Hash Map",
    topics: ["Hash Table", "DFS", "BFS", "Graph"],
    complexity: { time: "O(V + E)", space: "O(V)" },
    approach:
      "Keep a map from original node to its copy. Create the copy and register it before recursing into neighbours — that registration is what stops cycles from looping forever.",
    code: `func cloneGraph(node *Node) *Node {
    seen := map[*Node]*Node{}
    var dfs func(n *Node) *Node
    dfs = func(n *Node) *Node {
        if n == nil {
            return nil
        }
        if c, ok := seen[n]; ok {
            return c
        }
        clone := &Node{Val: n.Val}
        seen[n] = clone // register before recursing to break cycles
        for _, nb := range n.Neighbors {
            clone.Neighbors = append(clone.Neighbors, dfs(nb))
        }
        return clone
    }
    return dfs(node)
}`,
  },
  {
    id: 207,
    title: "Course Schedule",
    slug: "course-schedule",
    difficulty: "med",
    pattern: "Topological Sort (Kahn)",
    topics: ["DFS", "BFS", "Graph", "Topological Sort"],
    complexity: { time: "O(V + E)", space: "O(V + E)" },
    approach:
      "The schedule is feasible exactly when the prerequisite graph has no cycle. Kahn's algorithm repeatedly removes zero-indegree nodes; if fewer than V get removed, the leftovers form a cycle.",
    code: `func canFinish(numCourses int, prerequisites [][]int) bool {
    adj := make([][]int, numCourses)
    indegree := make([]int, numCourses)
    for _, p := range prerequisites {
        adj[p[1]] = append(adj[p[1]], p[0])
        indegree[p[0]]++
    }
    queue := []int{}
    for i, d := range indegree {
        if d == 0 {
            queue = append(queue, i)
        }
    }
    done := 0
    for len(queue) > 0 {
        cur := queue[0]
        queue = queue[1:]
        done++
        for _, next := range adj[cur] {
            indegree[next]--
            if indegree[next] == 0 {
                queue = append(queue, next)
            }
        }
    }
    return done == numCourses
}`,
  },
  {
    id: 417,
    title: "Pacific Atlantic Water Flow",
    slug: "pacific-atlantic-water-flow",
    difficulty: "med",
    pattern: "Multi-source DFS",
    topics: ["Array", "DFS", "BFS", "Matrix"],
    complexity: { time: "O(m * n)", space: "O(m * n)" },
    approach:
      "Instead of simulating flow from every cell, invert it: start at each ocean's border and climb to cells of greater-or-equal height. The answer is the intersection of the two reachable sets.",
    code: `func pacificAtlantic(heights [][]int) [][]int {
    rows, cols := len(heights), len(heights[0])
    pac := make([][]bool, rows)
    atl := make([][]bool, rows)
    for i := range pac {
        pac[i] = make([]bool, cols)
        atl[i] = make([]bool, cols)
    }
    var climb func(r, c int, seen [][]bool, prev int)
    climb = func(r, c int, seen [][]bool, prev int) {
        if r < 0 || c < 0 || r >= rows || c >= cols || seen[r][c] || heights[r][c] < prev {
            return
        }
        seen[r][c] = true
        h := heights[r][c]
        climb(r+1, c, seen, h)
        climb(r-1, c, seen, h)
        climb(r, c+1, seen, h)
        climb(r, c-1, seen, h)
    }
    for c := 0; c < cols; c++ {
        climb(0, c, pac, heights[0][c])
        climb(rows-1, c, atl, heights[rows-1][c])
    }
    for r := 0; r < rows; r++ {
        climb(r, 0, pac, heights[r][0])
        climb(r, cols-1, atl, heights[r][cols-1])
    }
    var res [][]int
    for r := 0; r < rows; r++ {
        for c := 0; c < cols; c++ {
            if pac[r][c] && atl[r][c] {
                res = append(res, []int{r, c})
            }
        }
    }
    return res
}`,
  },
  {
    id: 70,
    title: "Climbing Stairs",
    slug: "climbing-stairs",
    difficulty: "easy",
    pattern: "DP / Fibonacci",
    topics: ["Math", "Dynamic Programming", "Memoization"],
    complexity: { time: "O(n)", space: "O(1)" },
    approach:
      "Ways to reach step n is ways(n-1) + ways(n-2) — it is Fibonacci. Only the last two values matter, so roll two variables instead of allocating a table.",
    code: `func climbStairs(n int) int {
    prev, cur := 1, 1
    for i := 2; i <= n; i++ {
        prev, cur = cur, prev+cur
    }
    return cur
}`,
  },
  {
    id: 322,
    title: "Coin Change",
    slug: "coin-change",
    difficulty: "med",
    pattern: "Unbounded Knapsack DP",
    topics: ["Array", "Dynamic Programming", "BFS"],
    complexity: { time: "O(amount * coins)", space: "O(amount)" },
    approach:
      "Bottom-up over every amount: the cheapest way to make a is one coin plus the cheapest way to make a-coin. Seed unreachable amounts with a sentinel above any valid answer so they never win a min.",
    code: `func coinChange(coins []int, amount int) int {
    const unreachable = 1 << 30
    dp := make([]int, amount+1)
    for i := 1; i <= amount; i++ {
        dp[i] = unreachable
    }
    for a := 1; a <= amount; a++ {
        for _, c := range coins {
            if c <= a && dp[a-c]+1 < dp[a] {
                dp[a] = dp[a-c] + 1
            }
        }
    }
    if dp[amount] == unreachable {
        return -1
    }
    return dp[amount]
}`,
  },
  {
    id: 300,
    title: "Longest Increasing Subsequence",
    slug: "longest-increasing-subsequence",
    difficulty: "med",
    pattern: "Patience Sorting + Binary Search",
    topics: ["Array", "Binary Search", "Dynamic Programming"],
    complexity: { time: "O(n log n)", space: "O(n)" },
    approach:
      "Keep tails[i] = smallest possible tail of an increasing subsequence of length i+1. Binary search each number into that array: it either extends the tail or lowers an existing one. The array's length is the answer (its contents are not a real subsequence).",
    code: `func lengthOfLIS(nums []int) int {
    tails := []int{}
    for _, n := range nums {
        i := sort.SearchInts(tails, n)
        if i == len(tails) {
            tails = append(tails, n)
        } else {
            tails[i] = n
        }
    }
    return len(tails)
}`,
  },
  {
    id: 198,
    title: "House Robber",
    slug: "house-robber",
    difficulty: "med",
    pattern: "Dynamic Programming",
    topics: ["Array", "Dynamic Programming"],
    complexity: { time: "O(n)", space: "O(1)" },
    approach:
      "At each house choose the better of skipping it (keep the previous best) or robbing it (its value plus the best from two houses back). Two rolling variables suffice.",
    code: `func rob(nums []int) int {
    skip, take := 0, 0
    for _, n := range nums {
        skip, take = max(skip, take), skip+n
    }
    return max(skip, take)
}`,
  },
  {
    id: 139,
    title: "Word Break",
    slug: "word-break",
    difficulty: "med",
    pattern: "Dynamic Programming",
    topics: ["Hash Table", "String", "Dynamic Programming", "Trie"],
    complexity: { time: "O(n^2 * k)", space: "O(n)" },
    approach:
      "dp[i] means the first i characters are segmentable. For each i look back at every split point j where dp[j] holds and check whether s[j:i] is a dictionary word.",
    code: `func wordBreak(s string, wordDict []string) bool {
    words := make(map[string]struct{}, len(wordDict))
    for _, w := range wordDict {
        words[w] = struct{}{}
    }
    dp := make([]bool, len(s)+1)
    dp[0] = true
    for i := 1; i <= len(s); i++ {
        for j := 0; j < i; j++ {
            if _, ok := words[s[j:i]]; dp[j] && ok {
                dp[i] = true
                break
            }
        }
    }
    return dp[len(s)]
}`,
  },
  {
    id: 62,
    title: "Unique Paths",
    slug: "unique-paths",
    difficulty: "med",
    pattern: "Grid DP",
    topics: ["Math", "Dynamic Programming", "Combinatorics"],
    complexity: { time: "O(m * n)", space: "O(n)" },
    approach:
      "Paths to a cell equal paths from above plus paths from the left. Processing row by row means the row slice already holds the previous row's values, so one 1-D array is enough.",
    code: `func uniquePaths(m, n int) int {
    row := make([]int, n)
    for i := range row {
        row[i] = 1
    }
    for r := 1; r < m; r++ {
        for c := 1; c < n; c++ {
            row[c] += row[c-1]
        }
    }
    return row[n-1]
}`,
  },
  {
    id: 39,
    title: "Combination Sum",
    slug: "combination-sum",
    difficulty: "med",
    pattern: "Backtracking",
    topics: ["Array", "Backtracking"],
    complexity: { time: "O(n^(t/m))", space: "O(t/m)" },
    approach:
      "Backtrack with a start index so combinations are generated in non-decreasing order and never duplicated. Numbers can repeat, so recurse with the same index rather than i+1. Copy the path before recording it — the slice is mutated after.",
    code: `func combinationSum(candidates []int, target int) [][]int {
    var res [][]int
    var path []int
    var back func(start, remain int)
    back = func(start, remain int) {
        if remain == 0 {
            res = append(res, append([]int(nil), path...))
            return
        }
        for i := start; i < len(candidates); i++ {
            if candidates[i] > remain {
                continue
            }
            path = append(path, candidates[i])
            back(i, remain-candidates[i]) // i, not i+1: reuse allowed
            path = path[:len(path)-1]
        }
    }
    back(0, target)
    return res
}`,
  },
  {
    id: 78,
    title: "Subsets",
    slug: "subsets",
    difficulty: "med",
    pattern: "Backtracking",
    topics: ["Array", "Backtracking", "Bit Manipulation"],
    complexity: { time: "O(n * 2^n)", space: "O(n)" },
    approach:
      "Every element is either in or out. Record the path at every node of the decision tree, not just the leaves, so all 2^n subsets are captured.",
    code: `func subsets(nums []int) [][]int {
    var res [][]int
    var path []int
    var back func(start int)
    back = func(start int) {
        res = append(res, append([]int(nil), path...))
        for i := start; i < len(nums); i++ {
            path = append(path, nums[i])
            back(i + 1)
            path = path[:len(path)-1]
        }
    }
    back(0)
    return res
}`,
  },
  {
    id: 347,
    title: "Top K Frequent Elements",
    slug: "top-k-frequent-elements",
    difficulty: "med",
    pattern: "Bucket Sort",
    topics: ["Array", "Hash Table", "Heap", "Bucket Sort"],
    complexity: { time: "O(n)", space: "O(n)" },
    approach:
      "A frequency can never exceed n, so index buckets by count and walk them downward. Beats the heap solution's O(n log k) and avoids container/heap boilerplate.",
    code: `func topKFrequent(nums []int, k int) []int {
    freq := make(map[int]int, len(nums))
    for _, n := range nums {
        freq[n]++
    }
    buckets := make([][]int, len(nums)+1)
    for n, c := range freq {
        buckets[c] = append(buckets[c], n)
    }
    res := make([]int, 0, k)
    for c := len(buckets) - 1; c >= 1 && len(res) < k; c-- {
        for _, n := range buckets[c] {
            res = append(res, n)
            if len(res) == k {
                break
            }
        }
    }
    return res
}`,
  },
  {
    id: 56,
    title: "Merge Intervals",
    slug: "merge-intervals",
    difficulty: "med",
    pattern: "Sort + Sweep",
    topics: ["Array", "Sorting"],
    complexity: { time: "O(n log n)", space: "O(n)" },
    approach:
      "Sort by start. Each interval either overlaps the last merged one — extend its end to the larger of the two — or starts a new block.",
    code: `func merge(intervals [][]int) [][]int {
    sort.Slice(intervals, func(i, j int) bool {
        return intervals[i][0] < intervals[j][0]
    })
    res := [][]int{intervals[0]}
    for _, cur := range intervals[1:] {
        last := res[len(res)-1]
        if cur[0] <= last[1] {
            if cur[1] > last[1] {
                last[1] = cur[1]
            }
        } else {
            res = append(res, cur)
        }
    }
    return res
}`,
  },
  {
    id: 57,
    title: "Insert Interval",
    slug: "insert-interval",
    difficulty: "med",
    pattern: "Sorted Sweep",
    topics: ["Array"],
    complexity: { time: "O(n)", space: "O(n)" },
    approach:
      "The input is already sorted, so make three passes: copy everything ending before the new interval, absorb everything that overlaps into a widened interval, then copy the rest.",
    code: `func insert(intervals [][]int, newInterval []int) [][]int {
    var res [][]int
    i, n := 0, len(intervals)
    for i < n && intervals[i][1] < newInterval[0] {
        res = append(res, intervals[i])
        i++
    }
    for i < n && intervals[i][0] <= newInterval[1] {
        newInterval[0] = min(newInterval[0], intervals[i][0])
        newInterval[1] = max(newInterval[1], intervals[i][1])
        i++
    }
    res = append(res, newInterval)
    return append(res, intervals[i:]...)
}`,
  },
  {
    id: 435,
    title: "Non-overlapping Intervals",
    slug: "non-overlapping-intervals",
    difficulty: "med",
    pattern: "Greedy Interval Scheduling",
    topics: ["Array", "Greedy", "Sorting"],
    complexity: { time: "O(n log n)", space: "O(1)" },
    approach:
      "Sort by end time and greedily keep every interval that starts at or after the last kept end. Keeping the earliest-ending interval always leaves the most room for the rest; the removals are what is left over.",
    code: `func eraseOverlapIntervals(intervals [][]int) int {
    sort.Slice(intervals, func(i, j int) bool {
        return intervals[i][1] < intervals[j][1]
    })
    removed, prevEnd := 0, intervals[0][1]
    for _, cur := range intervals[1:] {
        if cur[0] < prevEnd {
            removed++
        } else {
            prevEnd = cur[1]
        }
    }
    return removed
}`,
  },
  {
    id: 73,
    title: "Set Matrix Zeroes",
    slug: "set-matrix-zeroes",
    difficulty: "med",
    pattern: "In-place Marking",
    topics: ["Array", "Hash Table", "Matrix"],
    complexity: { time: "O(m * n)", space: "O(1)" },
    approach:
      "Use row 0 and column 0 as the marker arrays. Column 0 needs its own flag because cell (0,0) is shared between the two markers. Write the zeroes inward-out, then handle row 0 and column 0 last.",
    code: `func setZeroes(matrix [][]int) {
    rows, cols := len(matrix), len(matrix[0])
    firstColZero := false
    for r := 0; r < rows; r++ {
        if matrix[r][0] == 0 {
            firstColZero = true
        }
        for c := 1; c < cols; c++ {
            if matrix[r][c] == 0 {
                matrix[r][0], matrix[0][c] = 0, 0
            }
        }
    }
    for r := rows - 1; r >= 0; r-- {
        for c := cols - 1; c >= 1; c-- {
            if matrix[r][0] == 0 || matrix[0][c] == 0 {
                matrix[r][c] = 0
            }
        }
        if firstColZero {
            matrix[r][0] = 0
        }
    }
}`,
  },
  {
    id: 48,
    title: "Rotate Image",
    slug: "rotate-image",
    difficulty: "med",
    pattern: "Transpose + Reverse",
    topics: ["Array", "Math", "Matrix"],
    complexity: { time: "O(n^2)", space: "O(1)" },
    approach:
      "A 90-degree clockwise rotation is a transpose followed by reversing each row. Both steps are in place, so no second matrix is allocated.",
    code: `func rotate(matrix [][]int) {
    n := len(matrix)
    for r := 0; r < n; r++ {
        for c := r + 1; c < n; c++ {
            matrix[r][c], matrix[c][r] = matrix[c][r], matrix[r][c]
        }
    }
    for r := 0; r < n; r++ {
        for lo, hi := 0, n-1; lo < hi; lo, hi = lo+1, hi-1 {
            matrix[r][lo], matrix[r][hi] = matrix[r][hi], matrix[r][lo]
        }
    }
}`,
  },
  {
    id: 128,
    title: "Longest Consecutive Sequence",
    slug: "longest-consecutive-sequence",
    difficulty: "med",
    pattern: "Hash Set",
    topics: ["Array", "Hash Table", "Union Find"],
    complexity: { time: "O(n)", space: "O(n)" },
    approach:
      "Put everything in a set, then only start counting from numbers that have no predecessor in the set. Each run is walked exactly once, so the total stays linear despite the nested loop.",
    code: `func longestConsecutive(nums []int) int {
    set := make(map[int]struct{}, len(nums))
    for _, n := range nums {
        set[n] = struct{}{}
    }
    best := 0
    for n := range set {
        if _, hasPrev := set[n-1]; hasPrev {
            continue // not the start of a run
        }
        length := 1
        for {
            if _, ok := set[n+length]; !ok {
                break
            }
            length++
        }
        if length > best {
            best = length
        }
    }
    return best
}`,
  },
  {
    id: 55,
    title: "Jump Game",
    slug: "jump-game",
    difficulty: "med",
    pattern: "Greedy",
    topics: ["Array", "Dynamic Programming", "Greedy"],
    complexity: { time: "O(n)", space: "O(1)" },
    approach:
      "Track the furthest index reachable so far. If the scan ever reaches an index beyond that frontier the path is broken; otherwise the end is reachable.",
    code: `func canJump(nums []int) bool {
    reach := 0
    for i, n := range nums {
        if i > reach {
            return false
        }
        if i+n > reach {
            reach = i + n
        }
    }
    return true
}`,
  },
];

export default goChallenges;
