// LeetCode challenges solved in JavaScript. `lang` is attached by the index module.
const jsChallenges = [
  {
    id: 1,
    title: "Two Sum",
    slug: "two-sum",
    difficulty: "easy",
    pattern: "Hash Map",
    topics: ["Array", "Hash Table"],
    complexity: { time: "O(n)", space: "O(n)" },
    approach:
      "One pass with a Map from value to index. Look up the complement before inserting the current number so the same element is never paired with itself.",
    code: `function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need), i];
    seen.set(nums[i], i);
  }
  return [];
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
      "Increment counts for s and decrement for t in the same loop, then assert every bucket is zero. Bail early on a length mismatch.",
    code: `function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const count = new Array(26).fill(0);
  const base = "a".charCodeAt(0);
  for (let i = 0; i < s.length; i++) {
    count[s.charCodeAt(i) - base]++;
    count[t.charCodeAt(i) - base]--;
  }
  return count.every((c) => c === 0);
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
      "Build a 26-slot letter count per word and join it into a string key — O(k) per word instead of O(k log k) for sorting. Group the originals under that key.",
    code: `function groupAnagrams(strs) {
  const groups = new Map();
  const base = "a".charCodeAt(0);
  for (const s of strs) {
    const count = new Array(26).fill(0);
    for (const ch of s) count[ch.charCodeAt(0) - base]++;
    const key = count.join("#");
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(s);
  }
  return [...groups.values()];
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
      "Counts are bounded by n, so bucket values by frequency and read the buckets from the top down. Linear, and no heap implementation required.",
    code: `function topKFrequent(nums, k) {
  const freq = new Map();
  for (const n of nums) freq.set(n, (freq.get(n) || 0) + 1);

  const buckets = Array.from({ length: nums.length + 1 }, () => []);
  for (const [n, c] of freq) buckets[c].push(n);

  const res = [];
  for (let c = buckets.length - 1; c >= 1 && res.length < k; c--) {
    for (const n of buckets[c]) {
      res.push(n);
      if (res.length === k) break;
    }
  }
  return res;
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
      "Two sweeps: left-to-right seed each slot with the product of everything before it, right-to-left multiply in the product of everything after. The output array doubles as the prefix accumulator.",
    code: `function productExceptSelf(nums) {
  const res = new Array(nums.length);
  let prefix = 1;
  for (let i = 0; i < nums.length; i++) {
    res[i] = prefix;
    prefix *= nums[i];
  }
  let suffix = 1;
  for (let i = nums.length - 1; i >= 0; i--) {
    res[i] *= suffix;
    suffix *= nums[i];
  }
  return res;
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
      "Only expand from numbers whose predecessor is absent — those are run starts. Each run is traversed once overall, keeping the total linear.",
    code: `function longestConsecutive(nums) {
  const set = new Set(nums);
  let best = 0;
  for (const n of set) {
    if (set.has(n - 1)) continue; // not a run start
    let length = 1;
    while (set.has(n + length)) length++;
    best = Math.max(best, length);
  }
  return best;
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
      "Converge two pointers, skipping non-alphanumerics in place and comparing lowercased characters. The regex-and-reverse one-liner is shorter but allocates two extra strings.",
    code: `const isAlnum = (ch) => /[a-z0-9]/i.test(ch);

function isPalindrome(s) {
  let lo = 0;
  let hi = s.length - 1;
  while (lo < hi) {
    while (lo < hi && !isAlnum(s[lo])) lo++;
    while (lo < hi && !isAlnum(s[hi])) hi--;
    if (s[lo].toLowerCase() !== s[hi].toLowerCase()) return false;
    lo++;
    hi--;
  }
  return true;
}`,
  },
  {
    id: 167,
    title: "Two Sum II — Input Array Is Sorted",
    slug: "two-sum-ii-input-array-is-sorted",
    difficulty: "med",
    pattern: "Two Pointers",
    topics: ["Array", "Two Pointers", "Binary Search"],
    complexity: { time: "O(n)", space: "O(1)" },
    approach:
      "Sortedness means a sum that is too large can only be fixed by lowering the right pointer, and too small by raising the left. No hash map needed.",
    code: `function twoSum(numbers, target) {
  let lo = 0;
  let hi = numbers.length - 1;
  while (lo < hi) {
    const sum = numbers[lo] + numbers[hi];
    if (sum === target) return [lo + 1, hi + 1]; // 1-indexed
    if (sum < target) lo++;
    else hi--;
  }
  return [];
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
      "Sort, fix an anchor, two-pointer the tail for the complementary pair. Skip repeated anchors and repeated left values so each triplet appears once. Note the numeric comparator — JS sorts lexicographically by default.",
    code: `function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const res = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (nums[i] > 0) break;
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let lo = i + 1;
    let hi = nums.length - 1;
    while (lo < hi) {
      const sum = nums[i] + nums[lo] + nums[hi];
      if (sum < 0) lo++;
      else if (sum > 0) hi--;
      else {
        res.push([nums[i], nums[lo], nums[hi]]);
        lo++;
        while (lo < hi && nums[lo] === nums[lo - 1]) lo++;
      }
    }
  }
  return res;
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
      "Begin at maximum width. The shorter wall caps the area, so only moving it inward can ever improve the result; moving the taller one strictly loses width for no height gain.",
    code: `function maxArea(height) {
  let lo = 0;
  let hi = height.length - 1;
  let best = 0;
  while (lo < hi) {
    best = Math.max(best, Math.min(height[lo], height[hi]) * (hi - lo));
    if (height[lo] < height[hi]) lo++;
    else hi--;
  }
  return best;
}`,
  },
  {
    id: 42,
    title: "Trapping Rain Water",
    slug: "trapping-rain-water",
    difficulty: "hard",
    pattern: "Two Pointers",
    topics: ["Array", "Two Pointers", "Stack", "Dynamic Programming"],
    complexity: { time: "O(n)", space: "O(1)" },
    approach:
      "Water above a bar is min(maxLeft, maxRight) - height. Walk inward from both ends and always advance the side with the smaller running max — that side's bound is known to be the binding one, so its water can be settled immediately.",
    code: `function trap(height) {
  let lo = 0;
  let hi = height.length - 1;
  let maxLeft = 0;
  let maxRight = 0;
  let water = 0;
  while (lo < hi) {
    if (height[lo] < height[hi]) {
      maxLeft = Math.max(maxLeft, height[lo]);
      water += maxLeft - height[lo];
      lo++;
    } else {
      maxRight = Math.max(maxRight, height[hi]);
      water += maxRight - height[hi];
      hi--;
    }
  }
  return water;
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
      "Carry the minimum price seen so far and the best profit achievable by selling today. One pass, constant memory.",
    code: `function maxProfit(prices) {
  let minPrice = Infinity;
  let best = 0;
  for (const p of prices) {
    minPrice = Math.min(minPrice, p);
    best = Math.max(best, p - minPrice);
  }
  return best;
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
      "Remember the last index of each character. On a repeat that lies inside the window, jump left past it rather than shrinking one step at a time.",
    code: `function lengthOfLongestSubstring(s) {
  const last = new Map();
  let left = 0;
  let best = 0;
  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    if (last.has(ch) && last.get(ch) >= left) left = last.get(ch) + 1;
    last.set(ch, right);
    best = Math.max(best, right - left + 1);
  }
  return best;
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
      "The window is valid while length minus the most frequent count is at most k. Grow right, shrink left by one whenever it breaks. The window never needs to shrink below the best seen, so a stale maxFreq is safe.",
    code: `function characterReplacement(s, k) {
  const count = new Map();
  let left = 0;
  let maxFreq = 0;
  let best = 0;
  for (let right = 0; right < s.length; right++) {
    count.set(s[right], (count.get(s[right]) || 0) + 1);
    maxFreq = Math.max(maxFreq, count.get(s[right]));
    while (right - left + 1 - maxFreq > k) {
      count.set(s[left], count.get(s[left]) - 1);
      left++;
    }
    best = Math.max(best, right - left + 1);
  }
  return best;
}`,
  },
  {
    id: 567,
    title: "Permutation in String",
    slug: "permutation-in-string",
    difficulty: "med",
    pattern: "Fixed Sliding Window",
    topics: ["Hash Table", "Two Pointers", "String", "Sliding Window"],
    complexity: { time: "O(n)", space: "O(1)" },
    approach:
      "A permutation is a fixed-length window with an identical letter histogram. Slide a window of len(s1) over s2, adding the entering letter and removing the leaving one, and track how many of the 26 buckets currently match.",
    code: `function checkInclusion(s1, s2) {
  if (s1.length > s2.length) return false;
  const base = "a".charCodeAt(0);
  const need = new Array(26).fill(0);
  const win = new Array(26).fill(0);
  for (let i = 0; i < s1.length; i++) {
    need[s1.charCodeAt(i) - base]++;
    win[s2.charCodeAt(i) - base]++;
  }
  let matches = 0;
  for (let i = 0; i < 26; i++) if (need[i] === win[i]) matches++;

  for (let right = s1.length; right < s2.length; right++) {
    if (matches === 26) return true;
    const inIdx = s2.charCodeAt(right) - base;
    const outIdx = s2.charCodeAt(right - s1.length) - base;

    win[inIdx]++;
    if (win[inIdx] === need[inIdx]) matches++;
    else if (win[inIdx] === need[inIdx] + 1) matches--;

    win[outIdx]--;
    if (win[outIdx] === need[outIdx]) matches++;
    else if (win[outIdx] === need[outIdx] - 1) matches--;
  }
  return matches === 26;
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
      "Push openers; on a closer, pop and verify the match. Leftovers on the stack mean unclosed brackets.",
    code: `function isValid(s) {
  const pairs = { ")": "(", "]": "[", "}": "{" };
  const stack = [];
  for (const ch of s) {
    if (!(ch in pairs)) {
      stack.push(ch);
    } else if (stack.pop() !== pairs[ch]) {
      return false;
    }
  }
  return stack.length === 0;
}`,
  },
  {
    id: 155,
    title: "Min Stack",
    slug: "min-stack",
    difficulty: "med",
    pattern: "Auxiliary Stack",
    topics: ["Stack", "Design"],
    complexity: { time: "O(1) per op", space: "O(n)" },
    approach:
      "Keep a parallel stack whose top is always the minimum of everything below it. Pushing the smaller of the new value and the current minimum keeps the two stacks the same height, so pop stays trivial.",
    code: `class MinStack {
  constructor() {
    this.stack = [];
    this.mins = [];
  }
  push(val) {
    this.stack.push(val);
    const min = this.mins.length ? Math.min(val, this.getMin()) : val;
    this.mins.push(min);
  }
  pop() {
    this.stack.pop();
    this.mins.pop();
  }
  top() {
    return this.stack[this.stack.length - 1];
  }
  getMin() {
    return this.mins[this.mins.length - 1];
  }
}`,
  },
  {
    id: 150,
    title: "Evaluate Reverse Polish Notation",
    slug: "evaluate-reverse-polish-notation",
    difficulty: "med",
    pattern: "Stack",
    topics: ["Array", "Math", "Stack"],
    complexity: { time: "O(n)", space: "O(n)" },
    approach:
      "Push operands; on an operator pop two and push the result. Order matters for subtraction and division, and JS division must be truncated toward zero with Math.trunc.",
    code: `function evalRPN(tokens) {
  const ops = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => Math.trunc(a / b),
  };
  const stack = [];
  for (const t of tokens) {
    if (t in ops) {
      const b = stack.pop();
      const a = stack.pop();
      stack.push(ops[t](a, b));
    } else {
      stack.push(Number(t));
    }
  }
  return stack.pop();
}`,
  },
  {
    id: 739,
    title: "Daily Temperatures",
    slug: "daily-temperatures",
    difficulty: "med",
    pattern: "Monotonic Stack",
    topics: ["Array", "Stack", "Monotonic Stack"],
    complexity: { time: "O(n)", space: "O(n)" },
    approach:
      "Keep a stack of indices with decreasing temperatures. A warmer day resolves every index below it in one go, so each index is pushed and popped at most once.",
    code: `function dailyTemperatures(temperatures) {
  const res = new Array(temperatures.length).fill(0);
  const stack = []; // indices, temperatures decreasing
  for (let i = 0; i < temperatures.length; i++) {
    while (stack.length && temperatures[i] > temperatures[stack[stack.length - 1]]) {
      const prev = stack.pop();
      res[prev] = i - prev;
    }
    stack.push(i);
  }
  return res;
}`,
  },
  {
    id: 704,
    title: "Binary Search",
    slug: "binary-search",
    difficulty: "easy",
    pattern: "Binary Search",
    topics: ["Array", "Binary Search"],
    complexity: { time: "O(log n)", space: "O(1)" },
    approach:
      "Textbook halving. Compute mid as lo + (hi - lo) / 2 rather than (lo + hi) / 2 — the habit matters in languages where the sum can overflow.",
    code: `function search(nums, target) {
  let lo = 0;
  let hi = nums.length - 1;
  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}`,
  },
  {
    id: 74,
    title: "Search a 2D Matrix",
    slug: "search-a-2d-matrix",
    difficulty: "med",
    pattern: "Binary Search",
    topics: ["Array", "Binary Search", "Matrix"],
    complexity: { time: "O(log(m * n))", space: "O(1)" },
    approach:
      "The rows concatenated form one sorted array, so binary search indices 0..m*n-1 and map each index back with divide and modulo by the column count.",
    code: `function searchMatrix(matrix, target) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  let lo = 0;
  let hi = rows * cols - 1;
  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    const val = matrix[Math.floor(mid / cols)][mid % cols];
    if (val === target) return true;
    if (val < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return false;
}`,
  },
  {
    id: 875,
    title: "Koko Eating Bananas",
    slug: "koko-eating-bananas",
    difficulty: "med",
    pattern: "Binary Search on Answer",
    topics: ["Array", "Binary Search"],
    complexity: { time: "O(n log maxPile)", space: "O(1)" },
    approach:
      "Feasibility is monotonic — if speed k finishes in time then so does any faster speed. Binary search the speed range 1..max(piles) and test each candidate by summing the ceiling of each pile over k.",
    code: `function minEatingSpeed(piles, h) {
  const hoursAt = (k) =>
    piles.reduce((sum, p) => sum + Math.ceil(p / k), 0);

  let lo = 1;
  let hi = Math.max(...piles);
  while (lo < hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (hoursAt(mid) <= h) hi = mid;
    else lo = mid + 1;
  }
  return lo;
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
      "Compare mid with the right end. Greater means the pivot is strictly to the right; otherwise mid may itself be the minimum, so keep it in the window.",
    code: `function findMin(nums) {
  let lo = 0;
  let hi = nums.length - 1;
  while (lo < hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (nums[mid] > nums[hi]) lo = mid + 1;
    else hi = mid;
  }
  return nums[lo];
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
      "Flip each next pointer to the previous node, saving the successor first. prev ends up as the new head.",
    code: `function reverseList(head) {
  let prev = null;
  let cur = head;
  while (cur) {
    const next = cur.next;
    cur.next = prev;
    prev = cur;
    cur = next;
  }
  return prev;
}`,
  },
  {
    id: 21,
    title: "Merge Two Sorted Lists",
    slug: "merge-two-sorted-lists",
    difficulty: "easy",
    pattern: "Dummy Head",
    topics: ["Linked List", "Recursion"],
    complexity: { time: "O(n + m)", space: "O(1)" },
    approach:
      "A dummy node removes the first-element special case. Splice the smaller head each round, then attach whichever list still has nodes.",
    code: `function mergeTwoLists(list1, list2) {
  const dummy = { next: null };
  let tail = dummy;
  while (list1 && list2) {
    if (list1.val <= list2.val) {
      tail.next = list1;
      list1 = list1.next;
    } else {
      tail.next = list2;
      list2 = list2.next;
    }
    tail = tail.next;
  }
  tail.next = list1 || list2;
  return dummy.next;
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
      "Find the midpoint with fast/slow, sever and reverse the tail half, then weave the halves together. Cutting slow.next is what prevents a cycle.",
    code: `function reorderList(head) {
  if (!head || !head.next) return;

  let slow = head;
  let fast = head;
  while (fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  let second = slow.next;
  slow.next = null;
  let prev = null;
  while (second) {
    const next = second.next;
    second.next = prev;
    prev = second;
    second = next;
  }

  let first = head;
  second = prev;
  while (second) {
    const n1 = first.next;
    const n2 = second.next;
    first.next = second;
    second.next = n1;
    first = n1;
    second = n2;
  }
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
      "Give one pointer an n-node head start, then advance both. Anchoring the trailing pointer at a dummy makes removing the actual head work without a branch.",
    code: `function removeNthFromEnd(head, n) {
  const dummy = { next: head };
  let lead = head;
  let trail = dummy;
  for (let i = 0; i < n; i++) lead = lead.next;
  while (lead) {
    lead = lead.next;
    trail = trail.next;
  }
  trail.next = trail.next.next;
  return dummy.next;
}`,
  },
  {
    id: 138,
    title: "Copy List with Random Pointer",
    slug: "copy-list-with-random-pointer",
    difficulty: "med",
    pattern: "Hash Map Two-Pass",
    topics: ["Hash Table", "Linked List"],
    complexity: { time: "O(n)", space: "O(n)" },
    approach:
      "First pass clones every node into a Map keyed by the original. Second pass wires next and random through that map, so a random pointer to a not-yet-visited node is already resolvable.",
    code: `function copyRandomList(head) {
  if (!head) return null;
  const clones = new Map();

  for (let cur = head; cur; cur = cur.next) {
    clones.set(cur, { val: cur.val, next: null, random: null });
  }
  for (let cur = head; cur; cur = cur.next) {
    const clone = clones.get(cur);
    clone.next = clones.get(cur.next) || null;
    clone.random = clones.get(cur.random) || null;
  }
  return clones.get(head);
}`,
  },
  {
    id: 146,
    title: "LRU Cache",
    slug: "lru-cache",
    difficulty: "med",
    pattern: "Hash Map + Ordering",
    topics: ["Hash Table", "Linked List", "Design"],
    complexity: { time: "O(1) per op", space: "O(capacity)" },
    approach:
      "JS Map preserves insertion order, so delete-then-set moves a key to the most-recent end and keys().next().value yields the least recent. That replaces the hand-rolled doubly linked list the classic solution needs.",
    code: `class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
  }
  get(key) {
    if (!this.map.has(key)) return -1;
    const val = this.map.get(key);
    this.map.delete(key);
    this.map.set(key, val); // re-insert as most recent
    return val;
  }
  put(key, value) {
    if (this.map.has(key)) this.map.delete(key);
    this.map.set(key, value);
    if (this.map.size > this.capacity) {
      this.map.delete(this.map.keys().next().value); // evict oldest
    }
  }
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
    approach: "Swap the children at every node and recurse into both sides.",
    code: `function invertTree(root) {
  if (!root) return null;
  [root.left, root.right] = [invertTree(root.right), invertTree(root.left)];
  return root;
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
    approach: "One plus the deeper subtree, with nil bottoming out at zero.",
    code: `function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`,
  },
  {
    id: 543,
    title: "Diameter of Binary Tree",
    slug: "diameter-of-binary-tree",
    difficulty: "easy",
    pattern: "Tree DFS with Side Effect",
    topics: ["Tree", "DFS", "Binary Tree"],
    complexity: { time: "O(n)", space: "O(h)" },
    approach:
      "The recursion returns height, but at each node it also considers the path that bends there — leftHeight + rightHeight — against a running best. The diameter need not pass through the root.",
    code: `function diameterOfBinaryTree(root) {
  let best = 0;
  const height = (node) => {
    if (!node) return 0;
    const l = height(node.left);
    const r = height(node.right);
    best = Math.max(best, l + r); // path bending at this node
    return 1 + Math.max(l, r);
  };
  height(root);
  return best;
}`,
  },
  {
    id: 110,
    title: "Balanced Binary Tree",
    slug: "balanced-binary-tree",
    difficulty: "easy",
    pattern: "Tree DFS with Early Exit",
    topics: ["Tree", "DFS", "Binary Tree"],
    complexity: { time: "O(n)", space: "O(h)" },
    approach:
      "Compute height bottom-up and propagate a sentinel of -1 the moment any subtree is unbalanced. That keeps it a single O(n) pass instead of recomputing height at every node.",
    code: `function isBalanced(root) {
  const height = (node) => {
    if (!node) return 0;
    const l = height(node.left);
    if (l === -1) return -1;
    const r = height(node.right);
    if (r === -1) return -1;
    if (Math.abs(l - r) > 1) return -1;
    return 1 + Math.max(l, r);
  };
  return height(root) !== -1;
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
      "Queue-based BFS where each outer iteration drains exactly the nodes currently queued — that set is precisely one level.",
    code: `function levelOrder(root) {
  if (!root) return [];
  const res = [];
  let queue = [root];
  while (queue.length) {
    const level = [];
    const next = [];
    for (const node of queue) {
      level.push(node.val);
      if (node.left) next.push(node.left);
      if (node.right) next.push(node.right);
    }
    res.push(level);
    queue = next;
  }
  return res;
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
      "Local parent-child checks are insufficient — a deep node can break an ancestor's constraint. Pass an open (low, high) interval down and narrow it at each step.",
    code: `function isValidBST(root) {
  const check = (node, lo, hi) => {
    if (!node) return true;
    if (node.val <= lo || node.val >= hi) return false;
    return check(node.left, lo, node.val) && check(node.right, node.val, hi);
  };
  return check(root, -Infinity, Infinity);
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
      "In-order visits a BST in ascending order. An explicit stack lets the walk stop as soon as the kth node is reached instead of traversing everything.",
    code: `function kthSmallest(root, k) {
  const stack = [];
  let cur = root;
  while (cur || stack.length) {
    while (cur) {
      stack.push(cur);
      cur = cur.left;
    }
    cur = stack.pop();
    if (--k === 0) return cur.val;
    cur = cur.right;
  }
  return -1;
}`,
  },
  {
    id: 208,
    title: "Implement Trie (Prefix Tree)",
    slug: "implement-trie-prefix-tree",
    difficulty: "med",
    pattern: "Trie",
    topics: ["Hash Table", "String", "Design", "Trie"],
    complexity: { time: "O(k) per op", space: "O(total chars)" },
    approach:
      "Each node is a map of character to child plus an end-of-word flag. search and startsWith share the same descent; only the terminal check differs.",
    code: `class Trie {
  constructor() {
    this.root = { children: new Map(), isWord: false };
  }
  insert(word) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children.has(ch)) {
        node.children.set(ch, { children: new Map(), isWord: false });
      }
      node = node.children.get(ch);
    }
    node.isWord = true;
  }
  _walk(prefix) {
    let node = this.root;
    for (const ch of prefix) {
      node = node.children.get(ch);
      if (!node) return null;
    }
    return node;
  }
  search(word) {
    const node = this._walk(word);
    return !!node && node.isWord;
  }
  startsWith(prefix) {
    return this._walk(prefix) !== null;
  }
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
      "Each unvisited land cell starts an island; flood-fill sinks its whole component. Overwriting the cell with '0' serves as the visited marker.",
    code: `function numIslands(grid) {
  if (!grid.length) return 0;
  const rows = grid.length;
  const cols = grid[0].length;

  const sink = (r, c) => {
    if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] !== "1") return;
    grid[r][c] = "0";
    sink(r + 1, c);
    sink(r - 1, c);
    sink(r, c + 1);
    sink(r, c - 1);
  };

  let count = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === "1") {
        count++;
        sink(r, c);
      }
    }
  }
  return count;
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
      "Map original nodes to clones and register the clone before recursing into its neighbours, which is what makes cyclic graphs terminate.",
    code: `function cloneGraph(node) {
  const seen = new Map();
  const dfs = (n) => {
    if (!n) return null;
    if (seen.has(n)) return seen.get(n);
    const clone = { val: n.val, neighbors: [] };
    seen.set(n, clone); // register first, then recurse
    for (const nb of n.neighbors) clone.neighbors.push(dfs(nb));
    return clone;
  };
  return dfs(node);
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
      "Feasible exactly when the prerequisite graph is acyclic. Repeatedly strip zero-indegree courses; anything left when the queue drains sits in a cycle.",
    code: `function canFinish(numCourses, prerequisites) {
  const adj = Array.from({ length: numCourses }, () => []);
  const indegree = new Array(numCourses).fill(0);
  for (const [course, prereq] of prerequisites) {
    adj[prereq].push(course);
    indegree[course]++;
  }

  const queue = [];
  for (let i = 0; i < numCourses; i++) if (indegree[i] === 0) queue.push(i);

  let done = 0;
  while (queue.length) {
    const cur = queue.shift();
    done++;
    for (const next of adj[cur]) {
      if (--indegree[next] === 0) queue.push(next);
    }
  }
  return done === numCourses;
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
      "ways(n) = ways(n-1) + ways(n-2). Only the last two values matter, so roll two variables.",
    code: `function climbStairs(n) {
  let prev = 1;
  let cur = 1;
  for (let i = 2; i <= n; i++) {
    [prev, cur] = [cur, prev + cur];
  }
  return cur;
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
      "At each house, either skip it and keep the best so far, or take it and add to the best from two houses back. Two rolling values replace the DP array.",
    code: `function rob(nums) {
  let skip = 0;
  let take = 0;
  for (const n of nums) {
    [skip, take] = [Math.max(skip, take), skip + n];
  }
  return Math.max(skip, take);
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
      "Build up every amount from 0: dp[a] is one coin plus the cheapest dp[a - coin]. Seed with Infinity so unreachable amounts never win the minimum.",
    code: `function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let a = 1; a <= amount; a++) {
    for (const c of coins) {
      if (c <= a) dp[a] = Math.min(dp[a], dp[a - c] + 1);
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
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
      "tails[i] holds the smallest tail among increasing subsequences of length i+1. Binary search where each number belongs: it extends tails or replaces a slot. Only the length is meaningful — tails itself is not a valid subsequence.",
    code: `function lengthOfLIS(nums) {
  const tails = [];
  for (const n of nums) {
    let lo = 0;
    let hi = tails.length;
    while (lo < hi) {
      const mid = lo + Math.floor((hi - lo) / 2);
      if (tails[mid] < n) lo = mid + 1;
      else hi = mid;
    }
    tails[lo] = n; // extends when lo === tails.length
  }
  return tails.length;
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
      "dp[i] marks that s.slice(0, i) is segmentable. For each i, look for a split j where dp[j] holds and s.slice(j, i) is in the dictionary.",
    code: `function wordBreak(s, wordDict) {
  const words = new Set(wordDict);
  const dp = new Array(s.length + 1).fill(false);
  dp[0] = true;
  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && words.has(s.slice(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }
  return dp[s.length];
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
      "Extend the running sum or restart at the current element, whichever is larger, and track the global maximum. A negative prefix is always worth dropping.",
    code: `function maxSubArray(nums) {
  let cur = nums[0];
  let best = nums[0];
  for (let i = 1; i < nums.length; i++) {
    cur = Math.max(nums[i], cur + nums[i]);
    best = Math.max(best, cur);
  }
  return best;
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
      "Maintain the furthest reachable index. Hitting an index past that frontier means the chain is broken.",
    code: `function canJump(nums) {
  let reach = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > reach) return false;
    reach = Math.max(reach, i + nums[i]);
  }
  return true;
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
      "Sort by start, then either extend the last merged interval's end or push a new block. Remember the numeric comparator.",
    code: `function merge(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const res = [intervals[0]];
  for (const [start, end] of intervals.slice(1)) {
    const last = res[res.length - 1];
    if (start <= last[1]) last[1] = Math.max(last[1], end);
    else res.push([start, end]);
  }
  return res;
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
      "The list is already sorted, so make three passes: everything strictly before, everything overlapping (widened into one interval), everything strictly after.",
    code: `function insert(intervals, newInterval) {
  const res = [];
  let [start, end] = newInterval;
  let i = 0;

  while (i < intervals.length && intervals[i][1] < start) {
    res.push(intervals[i++]);
  }
  while (i < intervals.length && intervals[i][0] <= end) {
    start = Math.min(start, intervals[i][0]);
    end = Math.max(end, intervals[i][1]);
    i++;
  }
  res.push([start, end]);

  return res.concat(intervals.slice(i));
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
      "Record the path at every node of the include/exclude tree, not only at leaves. Push a copy — the working array keeps mutating.",
    code: `function subsets(nums) {
  const res = [];
  const path = [];
  const back = (start) => {
    res.push([...path]);
    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);
      back(i + 1);
      path.pop();
    }
  };
  back(0);
  return res;
}`,
  },
];

export default jsChallenges;
