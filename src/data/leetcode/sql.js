// LeetCode database challenges. Queries are written in PostgreSQL dialect
// (the stack used day to day); MySQL-only differences are called out in `approach`.
// `lang` is attached by the index module.
const sqlChallenges = [
  {
    id: 175,
    title: "Combine Two Tables",
    slug: "combine-two-tables",
    description:
      "Report firstName, lastName, city and state for every person in Person, including the people who have no matching row in Address.",
    difficulty: "easy",
    pattern: "LEFT JOIN",
    topics: ["Join"],
    complexity: { time: "O(n + m)", space: "O(n)" },
    approach:
      "Every person must appear whether or not they have an address, which is exactly a LEFT JOIN from Person. An INNER JOIN would silently drop the address-less people.",
    code: `SELECT p.firstName,
       p.lastName,
       a.city,
       a.state
FROM Person p
LEFT JOIN Address a ON a.personId = p.personId;`,
  },
  {
    id: 176,
    title: "Second Highest Salary",
    slug: "second-highest-salary",
    description:
      "Report the second highest distinct salary in the Employee table, or null when there is no such salary.",
    difficulty: "med",
    pattern: "OFFSET / Subquery",
    topics: ["Subquery", "Sorting"],
    complexity: { time: "O(n log n)", space: "O(n)" },
    approach:
      "DISTINCT collapses ties so the second distinct value is found, not the second row. The outer SELECT is what returns NULL rather than an empty set when fewer than two salaries exist.",
    code: `SELECT (
  SELECT DISTINCT salary
  FROM Employee
  ORDER BY salary DESC
  OFFSET 1
  LIMIT 1
) AS SecondHighestSalary;`,
  },
  {
    id: 177,
    title: "Nth Highest Salary",
    slug: "nth-highest-salary",
    description:
      "Write a query or function that returns the nth highest distinct salary in the Employee table, or null when fewer than n distinct salaries exist.",
    difficulty: "med",
    pattern: "DENSE_RANK",
    topics: ["Window Function", "Subquery"],
    complexity: { time: "O(n log n)", space: "O(n)" },
    approach:
      "DENSE_RANK gives tied salaries the same rank and leaves no gaps, which matches 'Nth highest distinct salary'. RANK would skip numbers after a tie and ROW_NUMBER would treat ties as separate ranks.",
    code: `SELECT DISTINCT salary AS getNthHighestSalary
FROM (
  SELECT salary,
         DENSE_RANK() OVER (ORDER BY salary DESC) AS rnk
  FROM Employee
) ranked
WHERE rnk = N;`,
  },
  {
    id: 178,
    title: "Rank Scores",
    slug: "rank-scores",
    description:
      "Rank the scores from highest to lowest. Equal scores share the same rank, and the rank after a tie must be the next consecutive integer — no gaps.",
    difficulty: "med",
    pattern: "DENSE_RANK",
    topics: ["Window Function", "Sorting"],
    complexity: { time: "O(n log n)", space: "O(n)" },
    approach:
      "The problem states there must be no holes between ranks after a tie — that is the definition of DENSE_RANK. Swapping in RANK produces 1, 1, 3 instead of the required 1, 1, 2.",
    code: `SELECT score,
       DENSE_RANK() OVER (ORDER BY score DESC) AS "rank"
FROM Scores
ORDER BY score DESC;`,
  },
  {
    id: 180,
    title: "Consecutive Numbers",
    slug: "consecutive-numbers",
    description:
      "Report every number that appears at least three times consecutively, ordered by id.",
    difficulty: "med",
    pattern: "LAG / LEAD",
    topics: ["Window Function", "Self Join"],
    complexity: { time: "O(n log n)", space: "O(n)" },
    approach:
      "Pull the two preceding rows into the current row with LAG and compare all three. This beats the three-way self join, which needs id arithmetic that breaks whenever ids are not gapless.",
    code: `SELECT DISTINCT num AS ConsecutiveNums
FROM (
  SELECT num,
         LAG(num, 1) OVER (ORDER BY id) AS prev1,
         LAG(num, 2) OVER (ORDER BY id) AS prev2
  FROM Logs
) t
WHERE num = prev1
  AND num = prev2;`,
  },
  {
    id: 181,
    title: "Employees Earning More Than Their Managers",
    slug: "employees-earning-more-than-their-managers",
    description: "Report the names of the employees who earn more than their own manager.",
    difficulty: "easy",
    pattern: "Self Join",
    topics: ["Join"],
    complexity: { time: "O(n)", space: "O(n)" },
    approach:
      "Join the table to itself on managerId = id so each row carries both salaries, then filter. An INNER JOIN correctly drops employees with no manager.",
    code: `SELECT e.name AS Employee
FROM Employee e
JOIN Employee m ON e.managerId = m.id
WHERE e.salary > m.salary;`,
  },
  {
    id: 182,
    title: "Duplicate Emails",
    slug: "duplicate-emails",
    description: "Report every email address that appears more than once in the Person table.",
    difficulty: "easy",
    pattern: "GROUP BY + HAVING",
    topics: ["Aggregation"],
    complexity: { time: "O(n)", space: "O(n)" },
    approach:
      "HAVING filters after aggregation, so it can reference COUNT(*). WHERE runs before grouping and cannot.",
    code: `SELECT email AS Email
FROM Person
GROUP BY email
HAVING COUNT(*) > 1;`,
  },
  {
    id: 183,
    title: "Customers Who Never Order",
    slug: "customers-who-never-order",
    description: "Report the names of the customers who have never placed an order.",
    difficulty: "easy",
    pattern: "Anti Join",
    topics: ["Subquery", "Join"],
    complexity: { time: "O(n + m)", space: "O(m)" },
    approach:
      "NOT EXISTS is the safe anti-join. NOT IN is the classic trap here: if the subquery returns even one NULL customerId, the whole predicate goes unknown and the result set comes back empty.",
    code: `SELECT c.name AS Customers
FROM Customers c
WHERE NOT EXISTS (
  SELECT 1
  FROM Orders o
  WHERE o.customerId = c.id
);`,
  },
  {
    id: 184,
    title: "Department Highest Salary",
    slug: "department-highest-salary",
    description:
      "For each department, report the employees earning the highest salary in that department, along with the department name. Ties are all reported.",
    difficulty: "med",
    pattern: "Window Function",
    topics: ["Window Function", "Join"],
    complexity: { time: "O(n log n)", space: "O(n)" },
    approach:
      "RANK partitioned by department tags every top earner, keeping ties — which the problem requires. Comparing against MAX() in a correlated subquery works too but rescans per department.",
    code: `SELECT d.name AS Department,
       e.name AS Employee,
       e.salary AS Salary
FROM (
  SELECT name, salary, departmentId,
         RANK() OVER (PARTITION BY departmentId ORDER BY salary DESC) AS rnk
  FROM Employee
) e
JOIN Department d ON d.id = e.departmentId
WHERE e.rnk = 1;`,
  },
  {
    id: 185,
    title: "Department Top Three Salaries",
    slug: "department-top-three-salaries",
    description:
      "For each department, report the employees earning one of the three highest distinct salaries in that department.",
    difficulty: "hard",
    pattern: "DENSE_RANK",
    topics: ["Window Function", "Join"],
    complexity: { time: "O(n log n)", space: "O(n)" },
    approach:
      "'Top three salaries' means three distinct salary levels, not three employees — so DENSE_RANK, and every employee sharing a qualifying salary is included.",
    code: `SELECT d.name AS Department,
       e.name AS Employee,
       e.salary AS Salary
FROM (
  SELECT name, salary, departmentId,
         DENSE_RANK() OVER (PARTITION BY departmentId ORDER BY salary DESC) AS rnk
  FROM Employee
) e
JOIN Department d ON d.id = e.departmentId
WHERE e.rnk <= 3;`,
  },
  {
    id: 196,
    title: "Delete Duplicate Emails",
    slug: "delete-duplicate-emails",
    description:
      "Delete the duplicate rows from Person so that only the row with the smallest id survives for each email. This is a DELETE statement, not a query.",
    difficulty: "easy",
    pattern: "DELETE with Self Join",
    topics: ["Delete", "Join"],
    complexity: { time: "O(n log n)", space: "O(n)" },
    approach:
      "Keep the smallest id per email and delete anything with a larger id sharing that email. MySQL cannot read the target table in a subquery of its own DELETE, so it needs the join form; Postgres accepts the subquery directly.",
    code: `DELETE FROM Person p
WHERE p.id > (
  SELECT MIN(keep.id)
  FROM Person keep
  WHERE keep.email = p.email
);`,
  },
  {
    id: 197,
    title: "Rising Temperature",
    slug: "rising-temperature",
    description:
      "Report the ids of the days on which the temperature was higher than the temperature of the day immediately before.",
    difficulty: "easy",
    pattern: "Self Join on Date",
    topics: ["Join", "Date"],
    complexity: { time: "O(n)", space: "O(n)" },
    approach:
      "Join each day to the previous calendar day — not the previous row, since dates can have gaps. Doing date arithmetic in the join predicate rather than wrapping the column keeps an index on recordDate usable.",
    code: `SELECT today.id AS Id
FROM Weather today
JOIN Weather yesterday
  ON yesterday.recordDate = today.recordDate - INTERVAL '1 day'
WHERE today.temperature > yesterday.temperature;`,
  },
  {
    id: 262,
    title: "Trips and Users",
    slug: "trips-and-users",
    description:
      "For each day between 2013-10-01 and 2013-10-03, report the cancellation rate of the trip requests made by unbanned clients with unbanned drivers, rounded to two decimals.",
    difficulty: "hard",
    pattern: "Conditional Aggregation",
    topics: ["Join", "Aggregation"],
    complexity: { time: "O(n)", space: "O(n)" },
    approach:
      "Exclude trips touching a banned client or driver, then compute the cancellation rate per day with AVG over a CASE flag — averaging a 1/0 indicator is the terse way to get a ratio without two COUNTs.",
    code: `SELECT t.request_at AS "Day",
       ROUND(AVG(CASE WHEN t.status <> 'completed' THEN 1.0 ELSE 0.0 END), 2)
         AS "Cancellation Rate"
FROM Trips t
JOIN Users c ON c.users_id = t.client_id  AND c.banned = 'No'
JOIN Users d ON d.users_id = t.driver_id AND d.banned = 'No'
WHERE t.request_at BETWEEN '2013-10-01' AND '2013-10-03'
GROUP BY t.request_at
ORDER BY t.request_at;`,
  },
  {
    id: 595,
    title: "Big Countries",
    slug: "big-countries",
    description:
      "A country is big when its area is at least 3,000,000 km squared or its population is at least 25,000,000. Report the name, population and area of the big countries.",
    difficulty: "easy",
    pattern: "Filtering",
    topics: ["Filtering"],
    complexity: { time: "O(n)", space: "O(1)" },
    approach:
      "A plain OR filter. Worth knowing that an OR across two columns usually defeats a single composite index — the planner may need a bitmap OR of two indexes or a sequential scan.",
    code: `SELECT name, population, area
FROM World
WHERE area >= 3000000
   OR population >= 25000000;`,
  },
  {
    id: 596,
    title: "Classes More Than 5 Students",
    slug: "classes-more-than-5-students",
    description: "Report the classes that have at least five students enrolled.",
    difficulty: "easy",
    pattern: "GROUP BY + HAVING",
    topics: ["Aggregation"],
    complexity: { time: "O(n)", space: "O(n)" },
    approach:
      "Group by class and keep the groups with at least five students. COUNT(DISTINCT student) guards against duplicate enrolment rows.",
    code: `SELECT class
FROM Courses
GROUP BY class
HAVING COUNT(DISTINCT student) >= 5;`,
  },
  {
    id: 601,
    title: "Human Traffic of Stadium",
    slug: "human-traffic-of-stadium",
    description:
      "Report the stadium rows that belong to a run of three or more consecutive ids where every day had 100 or more visitors, ordered by visit_date.",
    difficulty: "hard",
    pattern: "Gaps and Islands",
    topics: ["Window Function", "Self Join"],
    complexity: { time: "O(n log n)", space: "O(n)" },
    approach:
      "Classic gaps-and-islands: filter to busy days, then subtract a ROW_NUMBER from the id. Consecutive ids yield a constant difference, so that value groups each run. Keep runs of three or more.",
    code: `WITH busy AS (
  SELECT id, visit_date, people,
         id - ROW_NUMBER() OVER (ORDER BY id) AS grp
  FROM Stadium
  WHERE people >= 100
)
SELECT id, visit_date, people
FROM busy
WHERE grp IN (
  SELECT grp FROM busy GROUP BY grp HAVING COUNT(*) >= 3
)
ORDER BY visit_date;`,
  },
  {
    id: 626,
    title: "Exchange Seats",
    slug: "exchange-seats",
    description:
      "Swap the seat ids of every pair of consecutive students; if the number of students is odd the last one keeps their seat. Report the result ordered by id.",
    difficulty: "med",
    pattern: "CASE + Arithmetic",
    topics: ["Window Function", "Conditional"],
    complexity: { time: "O(n log n)", space: "O(1)" },
    approach:
      "Odd ids move up one, even ids move down one, except a trailing odd id with no partner keeps its seat. Comparing against the total count handles that last-row edge case.",
    code: `SELECT CASE
         WHEN id % 2 = 1 AND id = (SELECT MAX(id) FROM Seat) THEN id
         WHEN id % 2 = 1 THEN id + 1
         ELSE id - 1
       END AS id,
       student
FROM Seat
ORDER BY id;`,
  },
  {
    id: 627,
    title: "Swap Salary",
    slug: "swap-salary",
    description:
      "Swap every f sex value to m and every m to f, using a single UPDATE statement and no intermediate table or SELECT.",
    difficulty: "easy",
    pattern: "UPDATE with CASE",
    topics: ["Update", "Conditional"],
    complexity: { time: "O(n)", space: "O(1)" },
    approach:
      "A single UPDATE with CASE flips the value in one pass. Two sequential UPDATEs would fail — the second would undo the first, since every row would already have been flipped.",
    code: `UPDATE Salary
SET sex = CASE sex
            WHEN 'm' THEN 'f'
            ELSE 'm'
          END;`,
  },
  {
    id: 620,
    title: "Not Boring Movies",
    slug: "not-boring-movies",
    description:
      "Report the movies whose id is odd and whose description is not the word boring, ordered by rating descending.",
    difficulty: "easy",
    pattern: "Filtering",
    topics: ["Filtering", "Sorting"],
    complexity: { time: "O(n log n)", space: "O(1)" },
    approach: "Odd id, description not 'boring', ordered by rating descending.",
    code: `SELECT id, movie, description, rating
FROM Cinema
WHERE id % 2 = 1
  AND description <> 'boring'
ORDER BY rating DESC;`,
  },
  {
    id: 607,
    title: "Sales Person",
    slug: "sales-person",
    description:
      "Report the salespeople who have never placed an order with the company named RED.",
    difficulty: "easy",
    pattern: "Anti Join",
    topics: ["Join", "Subquery"],
    complexity: { time: "O(n + m)", space: "O(n)" },
    approach:
      "Build the set of salespeople who sold to RED, then exclude them. NOT EXISTS keeps it NULL-safe compared with NOT IN.",
    code: `SELECT s.name
FROM SalesPerson s
WHERE NOT EXISTS (
  SELECT 1
  FROM Orders o
  JOIN Company c ON c.com_id = o.com_id
  WHERE o.sales_id = s.sales_id
    AND c.name = 'RED'
);`,
  },
  {
    id: 511,
    title: "Game Play Analysis I",
    slug: "game-play-analysis-i",
    description: "For each player, report the date on which they first logged in.",
    difficulty: "easy",
    pattern: "GROUP BY + MIN",
    topics: ["Aggregation"],
    complexity: { time: "O(n)", space: "O(n)" },
    approach: "First login per player is a straight MIN over the grouped date.",
    code: `SELECT player_id,
       MIN(event_date) AS first_login
FROM Activity
GROUP BY player_id;`,
  },
  {
    id: 550,
    title: "Game Play Analysis IV",
    slug: "game-play-analysis-iv",
    description:
      "Report the fraction of players who logged in again on the day immediately after their first login, rounded to two decimals.",
    difficulty: "med",
    pattern: "Self Join on Date Offset",
    topics: ["Join", "Aggregation"],
    complexity: { time: "O(n)", space: "O(n)" },
    approach:
      "Find each player's first login, then check for activity exactly one day later. Dividing the matched count by the total distinct players gives the day-1 retention rate; the LEFT JOIN keeps non-returning players in the denominator.",
    code: `WITH first_login AS (
  SELECT player_id, MIN(event_date) AS day1
  FROM Activity
  GROUP BY player_id
)
SELECT ROUND(
         COUNT(a.player_id)::numeric / COUNT(DISTINCT f.player_id),
         2
       ) AS fraction
FROM first_login f
LEFT JOIN Activity a
  ON a.player_id = f.player_id
 AND a.event_date = f.day1 + INTERVAL '1 day';`,
  },
  {
    id: 570,
    title: "Managers with at Least 5 Direct Reports",
    slug: "managers-with-at-least-5-direct-reports",
    description: "Report the managers who have at least five direct reports.",
    difficulty: "med",
    pattern: "GROUP BY + Semi Join",
    topics: ["Join", "Aggregation"],
    complexity: { time: "O(n)", space: "O(n)" },
    approach:
      "Aggregate reports per managerId first, then join back once to resolve the manager's own name. Grouping before joining keeps the aggregation over the smaller intermediate set.",
    code: `SELECT e.name
FROM Employee e
JOIN (
  SELECT managerId
  FROM Employee
  WHERE managerId IS NOT NULL
  GROUP BY managerId
  HAVING COUNT(*) >= 5
) big ON big.managerId = e.id;`,
  },
  {
    id: 585,
    title: "Investments in 2016",
    slug: "investments-in-2016",
    description:
      "Sum tiv_2016 over the policyholders whose tiv_2015 value is shared with at least one other policyholder and whose (lat, lon) location is unique, rounded to two decimals.",
    difficulty: "med",
    pattern: "Window Count",
    topics: ["Window Function", "Aggregation"],
    complexity: { time: "O(n)", space: "O(n)" },
    approach:
      "Two conditions in one pass: COUNT over a tiv_2015 partition finds shared values, and COUNT over a (lat, lon) partition finds unique locations. Window functions avoid two correlated subqueries over the same table.",
    code: `SELECT ROUND(SUM(tiv_2016)::numeric, 2) AS tiv_2016
FROM (
  SELECT tiv_2016,
         COUNT(*) OVER (PARTITION BY tiv_2015)  AS same_tiv,
         COUNT(*) OVER (PARTITION BY lat, lon)  AS same_city
  FROM Insurance
) t
WHERE same_tiv > 1
  AND same_city = 1;`,
  },
  {
    id: 1158,
    title: "Market Analysis I",
    slug: "market-analysis-i",
    description:
      "For each user, report their join date and how many orders they placed as a buyer during 2019.",
    difficulty: "med",
    pattern: "LEFT JOIN + Conditional Count",
    topics: ["Join", "Aggregation"],
    complexity: { time: "O(n + m)", space: "O(n)" },
    approach:
      "Every user must appear with 0 when they bought nothing, so LEFT JOIN with the year predicate inside the ON clause. Moving that predicate to WHERE would turn it back into an inner join and lose those users.",
    code: `SELECT u.user_id AS buyer_id,
       u.join_date,
       COUNT(o.order_id) AS orders_in_2019
FROM Users u
LEFT JOIN Orders o
  ON o.buyer_id = u.user_id
 AND EXTRACT(YEAR FROM o.order_date) = 2019
GROUP BY u.user_id, u.join_date;`,
  },
  {
    id: 1193,
    title: "Monthly Transactions I",
    slug: "monthly-transactions-i",
    description:
      "For each month and country, report the number of transactions and their total amount, plus the number of approved transactions and their total amount.",
    difficulty: "med",
    pattern: "Conditional Aggregation",
    topics: ["Aggregation", "Date"],
    complexity: { time: "O(n)", space: "O(n)" },
    approach:
      "Totals and approved-only totals come from the same scan using FILTER (Postgres) or SUM(CASE ...) (portable). One pass instead of joining two aggregates.",
    code: `SELECT TO_CHAR(trans_date, 'YYYY-MM') AS month,
       country,
       COUNT(*) AS trans_count,
       COUNT(*) FILTER (WHERE state = 'approved') AS approved_count,
       SUM(amount) AS trans_total_amount,
       COALESCE(SUM(amount) FILTER (WHERE state = 'approved'), 0)
         AS approved_total_amount
FROM Transactions
GROUP BY month, country;`,
  },
  {
    id: 1174,
    title: "Immediate Food Delivery II",
    slug: "immediate-food-delivery-ii",
    description:
      "Report the percentage of customers whose first order was immediate — its preferred delivery date equals the order date — rounded to two decimals.",
    difficulty: "med",
    pattern: "First-row Filter + Ratio",
    topics: ["Window Function", "Aggregation"],
    complexity: { time: "O(n log n)", space: "O(n)" },
    approach:
      "Reduce to each customer's first order with ROW_NUMBER, then average a 1/0 immediate-delivery flag over those rows. DISTINCT ON is the Postgres shortcut for the same first-row-per-group step.",
    code: `WITH first_order AS (
  SELECT order_date, customer_pref_delivery_date,
         ROW_NUMBER() OVER (
           PARTITION BY customer_id ORDER BY order_date
         ) AS rn
  FROM Delivery
)
SELECT ROUND(
         100.0 * AVG(
           CASE WHEN order_date = customer_pref_delivery_date THEN 1 ELSE 0 END
         ), 2
       ) AS immediate_percentage
FROM first_order
WHERE rn = 1;`,
  },
  {
    id: 1204,
    title: "Last Person to Fit in the Bus",
    slug: "last-person-to-fit-in-the-bus",
    description:
      "People board the bus in turn order and the bus carries at most 1000 kilograms. Report the name of the last person able to board.",
    difficulty: "med",
    pattern: "Running Total",
    topics: ["Window Function"],
    complexity: { time: "O(n log n)", space: "O(n)" },
    approach:
      "A running SUM ordered by turn gives cumulative weight at each boarding. The answer is the last row whose running total stays within 1000.",
    code: `SELECT person_name
FROM (
  SELECT person_name, turn,
         SUM(weight) OVER (ORDER BY turn) AS running_weight
  FROM Queue
) q
WHERE running_weight <= 1000
ORDER BY turn DESC
LIMIT 1;`,
  },
  {
    id: 1907,
    title: "Count Salary Categories",
    slug: "count-salary-categories",
    description:
      "Count the accounts in each salary category — Low below 20000, Average from 20000 to 50000, High above 50000 — reporting zero for a category with no accounts.",
    difficulty: "med",
    pattern: "Fixed Categories + UNION",
    topics: ["Aggregation", "Union"],
    complexity: { time: "O(n)", space: "O(1)" },
    approach:
      "All three buckets must be reported even at zero, so GROUP BY alone is wrong — an empty bucket produces no group. Emit each category as its own scalar SELECT and UNION them.",
    code: `SELECT 'Low Salary' AS category,
       COUNT(*) AS accounts_count
FROM Accounts WHERE income < 20000
UNION ALL
SELECT 'Average Salary',
       COUNT(*)
FROM Accounts WHERE income BETWEEN 20000 AND 50000
UNION ALL
SELECT 'High Salary',
       COUNT(*)
FROM Accounts WHERE income > 50000;`,
  },
  {
    id: 571,
    title: "Find Median Given Frequency of Numbers",
    slug: "find-median-given-frequency-of-numbers",
    description:
      "Numbers are stored alongside how many times each occurs. Report the median of the expanded list of numbers, rounded to one decimal.",
    difficulty: "hard",
    pattern: "Cumulative Frequency",
    topics: ["Window Function"],
    complexity: { time: "O(n log n)", space: "O(n)" },
    approach:
      "Expanding the frequencies into rows would be O(sum of frequency). Instead keep a running frequency and compare each number's cumulative window against half the total from both directions — a number is a median if it straddles the midpoint either way.",
    code: `WITH totals AS (
  SELECT num, frequency,
         SUM(frequency) OVER (ORDER BY num) AS running,
         SUM(frequency) OVER ()              AS total
  FROM Numbers
)
SELECT ROUND(AVG(num)::numeric, 1) AS median
FROM totals
WHERE running - frequency <= total / 2.0
  AND running             >= total / 2.0;`,
  },
  {
    id: 602,
    title: "Friend Requests II: Who Has the Most Friends",
    slug: "friend-requests-ii-who-has-the-most-friends",
    description:
      "Report the person with the most friends and how many friends they have. Exactly one such person exists.",
    difficulty: "med",
    pattern: "UNION ALL + Aggregation",
    topics: ["Aggregation", "Union"],
    complexity: { time: "O(n)", space: "O(n)" },
    approach:
      "Friendship is undirected, so stack both endpoint columns with UNION ALL into a single id column and count. UNION (without ALL) would deduplicate and undercount.",
    code: `SELECT id, COUNT(*) AS num
FROM (
  SELECT requester_id AS id FROM RequestAccepted
  UNION ALL
  SELECT accepter_id  AS id FROM RequestAccepted
) endpoints
GROUP BY id
ORDER BY num DESC
LIMIT 1;`,
  },
  {
    id: 1321,
    title: "Restaurant Growth",
    slug: "restaurant-growth",
    description:
      "For every day from the seventh onwards, report the seven-day moving sum of amounts and its average, rounded to two decimals, ordered by date.",
    difficulty: "med",
    pattern: "Rolling Window Frame",
    topics: ["Window Function", "Date"],
    complexity: { time: "O(n log n)", space: "O(n)" },
    approach:
      "Aggregate per day first (a day can hold many customers), then apply a ROWS BETWEEN 6 PRECEDING AND CURRENT ROW frame. Skipping the first six days keeps only complete windows.",
    code: `WITH daily AS (
  SELECT visited_on, SUM(amount) AS amount
  FROM Customer
  GROUP BY visited_on
),
rolling AS (
  SELECT visited_on,
         SUM(amount) OVER w  AS amount,
         ROUND(AVG(amount) OVER w, 2) AS average_amount,
         ROW_NUMBER() OVER (ORDER BY visited_on) AS rn
  FROM daily
  WINDOW w AS (ORDER BY visited_on ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)
)
SELECT visited_on, amount, average_amount
FROM rolling
WHERE rn >= 7
ORDER BY visited_on;`,
  },
  {
    id: 1341,
    title: "Movie Rating",
    slug: "movie-rating",
    description:
      "Report the user who rated the most movies and the movie with the highest average rating in February 2020. Break either tie by the lexicographically smaller name or title.",
    difficulty: "med",
    pattern: "UNION of Two Aggregates",
    topics: ["Aggregation", "Union", "Sorting"],
    complexity: { time: "O(n log n)", space: "O(n)" },
    approach:
      "Two unrelated answers in one result set, so compute each with its own LIMIT 1 and stack them with UNION ALL. Both tie-break lexicographically by name, which the secondary ORDER BY provides.",
    code: `(
  SELECT u.name AS results
  FROM MovieRating mr
  JOIN Users u ON u.user_id = mr.user_id
  GROUP BY u.user_id, u.name
  ORDER BY COUNT(*) DESC, u.name ASC
  LIMIT 1
)
UNION ALL
(
  SELECT m.title AS results
  FROM MovieRating mr
  JOIN Movies m ON m.movie_id = mr.movie_id
  WHERE mr.created_at >= '2020-02-01'
    AND mr.created_at <  '2020-03-01'
  GROUP BY m.movie_id, m.title
  ORDER BY AVG(mr.rating) DESC, m.title ASC
  LIMIT 1
);`,
  },
];

export default sqlChallenges;
