export const metadata = { title: "Golang & GoFiber — Interview Prep" };

export default function GolangPage() {
  return (
    <>
      <h1>Golang &amp; GoFiber</h1>
      <p>You&apos;ve built the 1Finance website platform in Go with GoFiber — interviewers will go deep here. Master the concurrency model, error handling idioms, and Fiber-specific patterns.</p>

      {/* ────────── PHILOSOPHY ────────── */}
      <h2>Go Philosophy — Why Go Exists</h2>
      <p>Go was created at Google in 2009 by Rob Pike, Ken Thompson, and Robert Griesemer. It prioritises <b>simplicity</b>, <b>fast compilation</b>, <b>first-class concurrency</b>, and <b>readability over cleverness</b>. There are no classes, no generics (until 1.18), no exceptions, and no ternary operator — intentionally.</p>
      <ul>
        <li><b>One way to do things</b> — <code>go fmt</code> auto-formats code, eliminating style debates</li>
        <li><b>Composition over inheritance</b> — structs embed other structs; no class hierarchies</li>
        <li><b>Errors are values</b> — no try/catch; every function returns an <code>error</code></li>
        <li><b>Concurrency built-in</b> — goroutines + channels are language primitives, not libraries</li>
        <li><b>Single binary</b> — compile to a static binary with no runtime dependencies; perfect for containers</li>
      </ul>

      {/* ────────── VARIABLES & TYPES ────────── */}
      <h2>Variables, Types &amp; Constants</h2>
      <h3>Variable Declaration</h3>
      <pre><code>{`// Full form
var name string = "Arvind"
var age int = 28

// Type inference
var score = 95          // inferred as int
var ratio = 3.14        // inferred as float64

// Short declaration (function-level only)
city := "Mumbai"        // most common in practice

// Multiple declaration
var (
    host string = "localhost"
    port int    = 8080
    debug bool  = false
)

// Zero values — Go initialises everything
var s string    // ""
var n int       // 0
var f float64   // 0.0
var b bool      // false
var p *int      // nil
var sl []int    // nil (but you can append to it)`}</code></pre>

      <h3>Basic Types</h3>
      <table>
        <thead><tr><th>Category</th><th>Types</th><th>Notes</th></tr></thead>
        <tbody>
          <tr><td>Integers</td><td><code>int, int8, int16, int32, int64</code></td><td><code>int</code> is 64-bit on 64-bit machines</td></tr>
          <tr><td>Unsigned</td><td><code>uint, uint8 (byte), uint16, uint32, uint64</code></td><td><code>byte</code> is alias for <code>uint8</code></td></tr>
          <tr><td>Floats</td><td><code>float32, float64</code></td><td>Prefer <code>float64</code> for precision</td></tr>
          <tr><td>Complex</td><td><code>complex64, complex128</code></td><td>Rarely used in web dev</td></tr>
          <tr><td>String</td><td><code>string</code></td><td>Immutable, UTF-8 encoded byte sequence</td></tr>
          <tr><td>Boolean</td><td><code>bool</code></td><td>No truthy/falsy — strict <code>true</code>/<code>false</code></td></tr>
          <tr><td>Rune</td><td><code>rune</code> (alias <code>int32</code>)</td><td>Represents a Unicode code point</td></tr>
        </tbody>
      </table>

      <h3>Constants &amp; iota</h3>
      <pre><code>{`const Pi = 3.14159
const AppName = "1Finance"

// iota — auto-incrementing enum
type Role int
const (
    Admin   Role = iota  // 0
    Editor               // 1
    Viewer               // 2
)

// Bitmask with iota
const (
    ReadPerm  = 1 << iota  // 1
    WritePerm              // 2
    ExecPerm               // 4
)`}</code></pre>

      <h3>Type Conversions</h3>
      <pre><code>{`// Go has no implicit conversions — all explicit
var i int = 42
var f float64 = float64(i)
var u uint = uint(f)

// String conversions
s := strconv.Itoa(42)        // int → string: "42"
n, err := strconv.Atoi("42") // string → int: 42

// Byte slice ↔ String
bytes := []byte("hello")
str := string(bytes)`}</code></pre>

      {/* ────────── FUNCTIONS ────────── */}
      <h2>Functions</h2>
      <pre><code>{`// Basic function
func add(a, b int) int {
    return a + b
}

// Multiple return values (very common)
func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, errors.New("division by zero")
    }
    return a / b, nil
}

// Named return values (use sparingly for short functions)
func swap(a, b string) (first, second string) {
    first = b
    second = a
    return  // naked return
}

// Variadic function
func sum(nums ...int) int {
    total := 0
    for _, n := range nums {
        total += n
    }
    return total
}
// sum(1, 2, 3) or sum(slice...)

// First-class functions — functions are values
handler := func(name string) string {
    return "Hello, " + name
}

// Higher-order function
func apply(f func(int) int, val int) int {
    return f(val)
}

// Closures — capture enclosing variables
func counter() func() int {
    count := 0
    return func() int {
        count++
        return count
    }
}`}</code></pre>

      {/* ────────── STRUCTS & METHODS ────────── */}
      <h2>Structs &amp; Methods</h2>
      <p>Go has no classes. Structs with methods serve the same purpose — but without inheritance.</p>
      <pre><code>{`// Defining a struct
type User struct {
    ID        int
    Name      string
    Email     string
    CreatedAt time.Time
    IsActive  bool
}

// Creating instances
u1 := User{ID: 1, Name: "Arvind", Email: "a@b.com"}
u2 := User{}               // zero-valued
u3 := &User{Name: "Test"}  // pointer to struct

// Accessing fields
fmt.Println(u1.Name)
u1.IsActive = true

// Value receiver — works on a copy
func (u User) FullName() string {
    return u.Name
}

// Pointer receiver — modifies the original
func (u *User) Deactivate() {
    u.IsActive = false
}

// Rule of thumb:
// - Use pointer receiver if you modify state or struct is large
// - Use value receiver for small, read-only methods
// - Be consistent within a type`}</code></pre>

      <h3>Struct Embedding (Composition)</h3>
      <pre><code>{`type Address struct {
    City    string
    Country string
}

type Employee struct {
    User              // embedded — promotes User fields/methods
    Address           // embedded
    Department string
}

emp := Employee{
    User:       User{Name: "Arvind"},
    Address:    Address{City: "Mumbai", Country: "India"},
    Department: "Engineering",
}
fmt.Println(emp.Name)   // promoted from User
fmt.Println(emp.City)   // promoted from Address`}</code></pre>

      <h3>Struct Tags</h3>
      <pre><code>{`type Event struct {
    ID        int       \`json:"id" db:"id"\`
    Title     string    \`json:"title" validate:"required"\`
    StartDate time.Time \`json:"start_date" db:"start_date"\`
    IsPublic  bool      \`json:"is_public,omitempty"\`
}
// Tags are metadata read by libraries via reflection
// json: for encoding/json
// db: for sqlx/GORM
// validate: for validator package`}</code></pre>

      {/* ────────── POINTERS ────────── */}
      <h2>Pointers</h2>
      <pre><code>{`// & = address of, * = dereference
x := 42
p := &x      // p is *int, holds address of x
fmt.Println(*p)  // 42 — dereference to get value
*p = 100     // x is now 100

// Why pointers matter:
// 1. Avoid copying large structs
// 2. Allow functions to modify the original value
// 3. Enable nil checks (pointer can be nil, value cannot)

func updateName(u *User, name string) {
    u.Name = name  // Go auto-dereferences: u.Name == (*u).Name
}

// Go has NO pointer arithmetic (unlike C)
// This makes Go memory-safe by default`}</code></pre>

      {/* ────────── PACKAGES & MODULES ────────── */}
      <h2>Packages &amp; Modules</h2>
      <pre><code>{`// go.mod — defines your module
module github.com/myorg/myapp

go 1.22

require (
    github.com/gofiber/fiber/v2 v2.52.0
    github.com/jackc/pgx/v5 v5.5.0
)

// Package naming rules:
// - Lowercase, single word: "user", "auth", "event"
// - Exported = Uppercase first letter: User, GetByID
// - Unexported = lowercase first letter: validate, parseToken

// Import
import (
    "fmt"                           // standard library
    "github.com/gofiber/fiber/v2"   // third-party
    "myapp/internal/user"           // internal package
)

// internal/ — packages inside internal/ cannot be imported
// by code outside the parent directory. Enforced by the compiler.`}</code></pre>
      <p><b>Common commands:</b></p>
      <ul>
        <li><code>go mod init myapp</code> — create a new module</li>
        <li><code>go mod tidy</code> — add missing / remove unused deps</li>
        <li><code>go get github.com/pkg@latest</code> — add a dependency</li>
        <li><code>go build ./...</code> — compile all packages</li>
        <li><code>go run main.go</code> — compile and run</li>
      </ul>

      {/* ────────── ERROR HANDLING ────────── */}
      <h2>Error Handling — Deep Dive</h2>
      <p>No exceptions — every function returns an <code>error</code>. This is Go&apos;s most distinctive (and initially frustrating) design choice. But it forces you to handle errors explicitly at every call site.</p>

      <h3>The Basic Pattern</h3>
      <pre><code>{`result, err := someFunction()
if err != nil {
    return fmt.Errorf("doing X: %w", err)  // wrap with context
}
// use result`}</code></pre>

      <h3>Creating Errors</h3>
      <pre><code>{`// Simple error
err := errors.New("user not found")

// Formatted error
err := fmt.Errorf("user %d not found", userID)

// Sentinel errors — predefined, package-level
var ErrNotFound = errors.New("not found")
var ErrUnauthorized = errors.New("unauthorized")
var ErrDuplicate = errors.New("duplicate entry")

// Custom error types — carry extra data
type ValidationError struct {
    Field   string
    Message string
}
func (e *ValidationError) Error() string {
    return fmt.Sprintf("validation failed on %s: %s", e.Field, e.Message)
}`}</code></pre>

      <h3>Wrapping &amp; Unwrapping</h3>
      <pre><code>{`// Wrap with %w to preserve the chain
func GetUser(id int) (*User, error) {
    user, err := db.QueryUser(id)
    if err != nil {
        return nil, fmt.Errorf("GetUser(%d): %w", id, err)
    }
    return user, nil
}

// Check specific error in the chain
if errors.Is(err, ErrNotFound) {
    // handle not found
}

// Extract a specific error type
var valErr *ValidationError
if errors.As(err, &valErr) {
    fmt.Println("Bad field:", valErr.Field)
}`}</code></pre>

      <h3>When to Panic</h3>
      <p><b>Almost never.</b> Panic is for truly unrecoverable situations — corrupted state, programmer bugs, impossible conditions. For everything else, return an error. Frameworks like Fiber recover panics in handlers so they don&apos;t crash the server.</p>

      {/* ────────── CONTEXT ────────── */}
      <h2>Context — Deep Dive</h2>
      <p>Pass <code>ctx context.Context</code> as the first argument to every function that does I/O. It carries deadlines, cancellation signals, and request-scoped values.</p>
      <pre><code>{`// Creating contexts
ctx := context.Background()                        // root — never cancelled
ctx, cancel := context.WithTimeout(ctx, 5*time.Second)  // auto-cancels after 5s
defer cancel()                                     // always call cancel!

ctx, cancel := context.WithCancel(ctx)             // manual cancel

// Passing values (use sparingly — for trace IDs, auth, not params)
ctx = context.WithValue(ctx, "requestID", "abc-123")

// Checking cancellation
select {
case <-ctx.Done():
    return ctx.Err()  // context.DeadlineExceeded or context.Canceled
case result := <-resultCh:
    return result, nil
}

// In a database query
rows, err := db.QueryContext(ctx, "SELECT * FROM users WHERE id = $1", id)

// In an HTTP request
req, _ := http.NewRequestWithContext(ctx, "GET", url, nil)
resp, err := client.Do(req)`}</code></pre>
      <p><b>Key rule:</b> Without context, a cancelled HTTP request keeps querying the database wastefully. Always propagate context.</p>

      {/* ────────── SLICES, MAPS, STRINGS ────────── */}
      <h2>Slices, Maps &amp; Strings — In Depth</h2>

      <h3>Slices</h3>
      <p>Slices are the workhorse of Go. They are headers (pointer, length, capacity) over an underlying array.</p>
      <pre><code>{`// Creating slices
s1 := []int{1, 2, 3}           // literal
s2 := make([]int, 5)           // len=5, cap=5, zeroed
s3 := make([]int, 0, 100)      // len=0, cap=100 (pre-allocate)

// Appending — ALWAYS reassign
s1 = append(s1, 4, 5)
s1 = append(s1, s2...)         // append another slice

// Slicing (creates a view, NOT a copy)
sub := s1[1:3]   // shares underlying array!
// Modify sub → modifies s1 too

// Safe copy
dst := make([]int, len(src))
copy(dst, src)

// Delete element at index i (order-preserving)
s = append(s[:i], s[i+1:]...)

// Iterate
for i, v := range s1 {
    fmt.Printf("index=%d value=%d\\n", i, v)
}

// Gotcha: appending past capacity allocates a new array
// Old references still point to the old array`}</code></pre>

      <h3>Maps</h3>
      <pre><code>{`// Create
m := make(map[string]int)
m["go"] = 10
m["rust"] = 8

// Literal
scores := map[string]int{
    "alice": 95,
    "bob":   87,
}

// Check existence
val, ok := m["go"]
if !ok {
    fmt.Println("key not found")
}

// Delete
delete(m, "rust")

// Iterate (order is random!)
for key, value := range m {
    fmt.Println(key, value)
}

// Gotchas:
// - nil map: reading returns zero, writing PANICS
// - Maps are NOT safe for concurrent access
// - Use sync.RWMutex or sync.Map for concurrency`}</code></pre>

      <h3>Strings</h3>
      <pre><code>{`// Strings are immutable byte slices (UTF-8)
s := "Hello, 世界"
fmt.Println(len(s))              // 13 (bytes, not characters!)
fmt.Println(utf8.RuneCountInString(s))  // 9 (characters)

// Iterate by runes (characters)
for i, r := range s {
    fmt.Printf("%d: %c\\n", i, r)
}

// String building (efficient concatenation)
var b strings.Builder
for i := 0; i < 1000; i++ {
    b.WriteString("hello ")
}
result := b.String()

// Common operations
strings.Contains(s, "world")
strings.HasPrefix(s, "Hello")
strings.Split("a,b,c", ",")
strings.Join([]string{"a", "b"}, "-")
strings.TrimSpace("  hello  ")
strings.ToLower("HELLO")
strings.ReplaceAll(s, "old", "new")`}</code></pre>

      {/* ────────── INTERFACES ────────── */}
      <h2>Interfaces — Deep Dive</h2>
      <p>Interfaces are <i>implicit</i> — Go&apos;s killer feature. Any type that has the right methods satisfies an interface automatically. No <code>implements</code> keyword needed.</p>

      <pre><code>{`// Define an interface
type UserRepository interface {
    GetByID(ctx context.Context, id int) (*User, error)
    Create(ctx context.Context, user *User) error
    Update(ctx context.Context, user *User) error
    Delete(ctx context.Context, id int) error
}

// Implement it — just write the methods
type PostgresUserRepo struct {
    db *sql.DB
}

func (r *PostgresUserRepo) GetByID(ctx context.Context, id int) (*User, error) {
    // real DB query
}
func (r *PostgresUserRepo) Create(ctx context.Context, user *User) error { /* ... */ }
func (r *PostgresUserRepo) Update(ctx context.Context, user *User) error { /* ... */ }
func (r *PostgresUserRepo) Delete(ctx context.Context, id int) error { /* ... */ }
// PostgresUserRepo now satisfies UserRepository — compiler verifies

// Mock for testing
type MockUserRepo struct {
    users map[int]*User
}
func (m *MockUserRepo) GetByID(_ context.Context, id int) (*User, error) {
    if u, ok := m.users[id]; ok {
        return u, nil
    }
    return nil, ErrNotFound
}
// ... other methods`}</code></pre>

      <h3>Common Standard Library Interfaces</h3>
      <table>
        <thead><tr><th>Interface</th><th>Methods</th><th>Used For</th></tr></thead>
        <tbody>
          <tr><td><code>io.Reader</code></td><td><code>Read(p []byte) (n int, err error)</code></td><td>Files, HTTP bodies, buffers</td></tr>
          <tr><td><code>io.Writer</code></td><td><code>Write(p []byte) (n int, err error)</code></td><td>Files, HTTP responses, buffers</td></tr>
          <tr><td><code>fmt.Stringer</code></td><td><code>String() string</code></td><td>Custom string representation</td></tr>
          <tr><td><code>error</code></td><td><code>Error() string</code></td><td>Error handling</td></tr>
          <tr><td><code>sort.Interface</code></td><td><code>Len(), Less(), Swap()</code></td><td>Custom sorting</td></tr>
          <tr><td><code>http.Handler</code></td><td><code>ServeHTTP(w, r)</code></td><td>HTTP handlers</td></tr>
        </tbody>
      </table>

      <h3>Interface Best Practices</h3>
      <ul>
        <li><b>Keep interfaces small</b> — 1-3 methods. Rob Pike: &quot;The bigger the interface, the weaker the abstraction.&quot;</li>
        <li><b>Define interfaces at the consumer</b>, not the provider</li>
        <li><b>Accept interfaces, return structs</b> — concrete return types are easier to work with</li>
        <li><b>The empty interface <code>any</code></b> (alias for <code>interface{`{}`}</code>) accepts anything — use sparingly</li>
      </ul>

      <h3>Type Assertions &amp; Type Switches</h3>
      <pre><code>{`// Type assertion
var i interface{} = "hello"
s := i.(string)           // panics if wrong type
s, ok := i.(string)       // safe: ok is false if wrong

// Type switch
func describe(i interface{}) string {
    switch v := i.(type) {
    case int:
        return fmt.Sprintf("integer: %d", v)
    case string:
        return fmt.Sprintf("string: %s", v)
    case *User:
        return fmt.Sprintf("user: %s", v.Name)
    default:
        return fmt.Sprintf("unknown: %T", v)
    }
}`}</code></pre>

      {/* ────────── DEFER, PANIC, RECOVER ────────── */}
      <h2>Defer, Panic &amp; Recover</h2>
      <pre><code>{`// defer runs at function exit (LIFO order)
func readFile(path string) ([]byte, error) {
    f, err := os.Open(path)
    if err != nil {
        return nil, err
    }
    defer f.Close()  // guaranteed cleanup
    return io.ReadAll(f)
}

// Multiple defers run in reverse order
func example() {
    defer fmt.Println("1")  // runs third
    defer fmt.Println("2")  // runs second
    defer fmt.Println("3")  // runs first
}

// Panic + Recover
func safeDiv(a, b int) (result int, err error) {
    defer func() {
        if r := recover(); r != nil {
            err = fmt.Errorf("recovered: %v", r)
        }
    }()
    return a / b, nil  // panics if b == 0
}`}</code></pre>

      {/* ────────── CONCURRENCY ────────── */}
      <h2>Concurrency — Goroutines &amp; Channels</h2>
      <p>Concurrency is Go&apos;s superpower. Goroutines are lightweight (~2KB stack vs ~1MB for OS threads). Channels are how goroutines communicate safely.</p>

      <h3>Goroutines</h3>
      <pre><code>{`// Start a goroutine
go doWork()

// Anonymous goroutine
go func() {
    fmt.Println("running in background")
}()

// Real example — async notification
func sendWhatsApp(userID string, msg string) {
    go func() {
        if err := whatsappClient.Send(userID, msg); err != nil {
            log.Printf("WA send failed for %s: %v", userID, err)
        }
    }()
}
// Caller returns immediately — registration flow stays non-blocking`}</code></pre>
      <p><b>Gotchas:</b> Don&apos;t spawn unbounded goroutines on a hot path — use a worker pool or semaphore channel. Always handle panics inside goroutines or they crash the whole process.</p>

      <h3>Channels</h3>
      <pre><code>{`// Unbuffered — blocks until both sides ready (synchronous)
ch := make(chan int)

// Buffered — blocks only when full
ch := make(chan int, 10)

// Send and receive
ch <- 42         // send
value := <-ch    // receive

// Direction-restricted channels (for function signatures)
func produce(out chan<- int) { out <- 1 }   // send-only
func consume(in <-chan int)  { v := <-in }  // receive-only

// Close a channel — signals no more values
close(ch)

// Range over channel (until closed)
for msg := range ch {
    process(msg)
}`}</code></pre>

      <h3>The GMP Scheduler</h3>
      <p>Understanding this helps in interviews:</p>
      <ul>
        <li><b>G</b> = Goroutine — the function to execute</li>
        <li><b>M</b> = Machine (OS thread) — executes goroutines</li>
        <li><b>P</b> = Processor (logical) — holds a local run queue, GOMAXPROCS sets the count</li>
      </ul>
      <p>Each P has a local run queue. Ms bind to Ps to execute Gs. When a G blocks on I/O, the M detaches and the P picks up another M. <b>Work stealing</b>: idle Ps steal from busy Ps&apos; queues for load balancing.</p>

      <h3>Mutexes &amp; Sync Primitives</h3>
      <pre><code>{`// sync.Mutex — mutual exclusion
type SafeCounter struct {
    mu    sync.Mutex
    count int
}

func (c *SafeCounter) Increment() {
    c.mu.Lock()
    defer c.mu.Unlock()
    c.count++
}

// sync.RWMutex — multiple readers OR one writer
type Cache struct {
    mu   sync.RWMutex
    data map[string]string
}

func (c *Cache) Get(key string) (string, bool) {
    c.mu.RLock()           // multiple goroutines can read
    defer c.mu.RUnlock()
    v, ok := c.data[key]
    return v, ok
}

func (c *Cache) Set(key, val string) {
    c.mu.Lock()            // exclusive access
    defer c.mu.Unlock()
    c.data[key] = val
}

// sync.Once — run exactly once
var once sync.Once
var instance *DB

func GetDB() *DB {
    once.Do(func() {
        instance = connectToDB()
    })
    return instance
}

// sync.WaitGroup — wait for goroutines to finish
var wg sync.WaitGroup
for _, url := range urls {
    wg.Add(1)
    go func(u string) {
        defer wg.Done()
        fetch(u)
    }(url)
}
wg.Wait()  // blocks until all Done()

// atomic — lock-free operations for simple counters
var counter int64
atomic.AddInt64(&counter, 1)
val := atomic.LoadInt64(&counter)`}</code></pre>

      <h2>Concurrency Patterns You Should Know</h2>
      <details><summary>Worker Pool</summary>
        <pre><code>{`func workerPool(numWorkers int, jobs []Job) {
    jobCh := make(chan Job, len(jobs))
    var wg sync.WaitGroup

    // Start workers
    for i := 0; i < numWorkers; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            for j := range jobCh {
                process(j)
            }
        }()
    }

    // Send jobs
    for _, j := range jobs {
        jobCh <- j
    }
    close(jobCh)
    wg.Wait()
}`}</code></pre>
      </details>
      <details><summary>Fan-out / Fan-in</summary>
        <p>Multiple goroutines read from one channel (fan-out), then write results to a single channel (fan-in). Useful for parallelizing API calls.</p>
        <pre><code>{`func fanOutFanIn(urls []string) []Result {
    resultCh := make(chan Result, len(urls))

    // Fan-out: one goroutine per URL
    for _, url := range urls {
        go func(u string) {
            resultCh <- fetch(u)
        }(url)
    }

    // Fan-in: collect all results
    var results []Result
    for range urls {
        results = append(results, <-resultCh)
    }
    return results
}`}</code></pre>
      </details>
      <details><summary>select with timeout</summary>
        <pre><code>{`select {
case res := <-respCh:
    return res, nil
case <-time.After(2 * time.Second):
    return nil, errors.New("timeout")
case <-ctx.Done():
    return nil, ctx.Err()
}`}</code></pre>
      </details>
      <details><summary>Semaphore (limit concurrency)</summary>
        <pre><code>{`sem := make(chan struct{}, 10)  // max 10 concurrent

for _, task := range tasks {
    sem <- struct{}{}  // acquire slot
    go func(t Task) {
        defer func() { <-sem }()  // release slot
        process(t)
    }(task)
}`}</code></pre>
      </details>
      <details><summary>errgroup (fail-fast parallel)</summary>
        <pre><code>{`g, ctx := errgroup.WithContext(ctx)

g.Go(func() error { return fetchUser(ctx) })
g.Go(func() error { return fetchOrders(ctx) })
g.Go(func() error { return fetchProfile(ctx) })

if err := g.Wait(); err != nil {
    // first error cancels the context, stopping others
    return err
}`}</code></pre>
      </details>
      <details><summary>Pipeline Pattern</summary>
        <pre><code>{`func generate(nums ...int) <-chan int {
    out := make(chan int)
    go func() {
        for _, n := range nums {
            out <- n
        }
        close(out)
    }()
    return out
}

func square(in <-chan int) <-chan int {
    out := make(chan int)
    go func() {
        for n := range in {
            out <- n * n
        }
        close(out)
    }()
    return out
}

// Usage: pipeline
for v := range square(generate(1, 2, 3, 4)) {
    fmt.Println(v)  // 1, 4, 9, 16
}`}</code></pre>
      </details>

      {/* ────────── TESTING ────────── */}
      <h2>Testing in Go</h2>
      <p>Go has excellent built-in testing. No framework needed.</p>
      <pre><code>{`// user_test.go
func TestGetUser(t *testing.T) {
    repo := &MockUserRepo{users: map[int]*User{
        1: {ID: 1, Name: "Arvind"},
    }}

    user, err := repo.GetByID(context.Background(), 1)
    if err != nil {
        t.Fatalf("unexpected error: %v", err)
    }
    if user.Name != "Arvind" {
        t.Errorf("got %s, want Arvind", user.Name)
    }
}

// Table-driven tests (idiomatic Go)
func TestAdd(t *testing.T) {
    tests := []struct {
        name     string
        a, b     int
        expected int
    }{
        {"positive", 2, 3, 5},
        {"negative", -1, -2, -3},
        {"zero", 0, 0, 0},
    }
    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            got := add(tt.a, tt.b)
            if got != tt.expected {
                t.Errorf("add(%d,%d) = %d, want %d", tt.a, tt.b, got, tt.expected)
            }
        })
    }
}

// Benchmarks
func BenchmarkFibonacci(b *testing.B) {
    for i := 0; i < b.N; i++ {
        fibonacci(20)
    }
}`}</code></pre>
      <p><b>Commands:</b> <code>go test ./...</code> (all tests), <code>go test -race ./...</code> (with race detector), <code>go test -bench=. ./...</code> (benchmarks), <code>go test -cover ./...</code> (coverage)</p>

      {/* ────────── JSON ────────── */}
      <h2>JSON Handling</h2>
      <pre><code>{`// Struct to JSON (marshal)
type Event struct {
    ID    int    \`json:"id"\`
    Title string \`json:"title"\`
    Date  string \`json:"date,omitempty"\`
}

event := Event{ID: 1, Title: "Go Workshop"}
data, err := json.Marshal(event)
// {"id":1,"title":"Go Workshop"}

// JSON to struct (unmarshal)
var e Event
err := json.Unmarshal([]byte(jsonString), &e)

// Streaming (for HTTP bodies / large files)
decoder := json.NewDecoder(r.Body)
err := decoder.Decode(&e)

encoder := json.NewEncoder(w)
err := encoder.Encode(event)

// Dynamic JSON (unknown shape)
var result map[string]interface{}
json.Unmarshal(data, &result)
name := result["name"].(string)  // type assertion needed`}</code></pre>

      {/* ────────── DATABASE ────────── */}
      <h2>Database Patterns</h2>
      <pre><code>{`// Using database/sql + pgx driver
db, err := sql.Open("pgx", os.Getenv("DATABASE_URL"))
db.SetMaxOpenConns(25)
db.SetMaxIdleConns(5)
db.SetConnMaxLifetime(5 * time.Minute)

// Query single row
var user User
err := db.QueryRowContext(ctx,
    "SELECT id, name, email FROM users WHERE id = $1", id,
).Scan(&user.ID, &user.Name, &user.Email)

if errors.Is(err, sql.ErrNoRows) {
    return nil, ErrNotFound
}

// Query multiple rows
rows, err := db.QueryContext(ctx,
    "SELECT id, name FROM users WHERE active = $1", true)
defer rows.Close()

var users []User
for rows.Next() {
    var u User
    if err := rows.Scan(&u.ID, &u.Name); err != nil {
        return nil, err
    }
    users = append(users, u)
}

// Transaction
tx, err := db.BeginTx(ctx, nil)
if err != nil { return err }
defer tx.Rollback()  // no-op if committed

_, err = tx.ExecContext(ctx, "INSERT INTO ...", args...)
if err != nil { return err }

_, err = tx.ExecContext(ctx, "UPDATE ...", args...)
if err != nil { return err }

return tx.Commit()`}</code></pre>

      {/* ────────── GOFIBER ────────── */}
      <h2>GoFiber — In Depth</h2>
      <p>Fiber is built on <code>fasthttp</code>, not <code>net/http</code>. That gives speed but means some <code>net/http</code> middleware doesn&apos;t work directly. Fiber&apos;s API mimics Express.js.</p>

      <h3>App Setup &amp; Configuration</h3>
      <pre><code>{`app := fiber.New(fiber.Config{
    ReadTimeout:  10 * time.Second,
    WriteTimeout: 10 * time.Second,
    BodyLimit:    4 * 1024 * 1024,
    ErrorHandler: func(c *fiber.Ctx, err error) error {
        code := fiber.StatusInternalServerError
        var e *fiber.Error
        if errors.As(err, &e) {
            code = e.Code
        }
        return c.Status(code).JSON(fiber.Map{
            "error": err.Error(),
        })
    },
})`}</code></pre>

      <h3>Routing &amp; Handlers</h3>
      <pre><code>{`// Basic CRUD
app.Get("/events", listEvents)
app.Get("/events/:id", getEvent)
app.Post("/events", createEvent)
app.Put("/events/:id", updateEvent)
app.Delete("/events/:id", deleteEvent)

// Route groups
api := app.Group("/api/v1")
api.Use(logger.New())

admin := api.Group("/admin", authMiddleware)
admin.Get("/users", listUsers)
admin.Delete("/users/:id", deleteUser)

// Handler function
func getEvent(c *fiber.Ctx) error {
    id := c.Params("id")                    // URL params
    search := c.Query("q", "")              // query string
    page := c.QueryInt("page", 1)           // query with type

    event, err := repo.GetEvent(c.Context(), id)
    if err != nil {
        return fiber.NewError(fiber.StatusNotFound, "not found")
    }
    return c.JSON(event)
}

// Request body parsing
func createEvent(c *fiber.Ctx) error {
    var body CreateEventRequest
    if err := c.BodyParser(&body); err != nil {
        return fiber.NewError(fiber.StatusBadRequest, "invalid body")
    }
    // validate, create, respond
    return c.Status(fiber.StatusCreated).JSON(event)
}`}</code></pre>

      <h3>Middleware</h3>
      <pre><code>{`// Built-in middleware
app.Use(cors.New())
app.Use(logger.New())
app.Use(recover.New())
app.Use(limiter.New(limiter.Config{
    Max:        100,
    Expiration: 1 * time.Minute,
}))

// Custom middleware
func AuthMiddleware(c *fiber.Ctx) error {
    token := c.Get("Authorization")
    if token == "" {
        return fiber.NewError(fiber.StatusUnauthorized, "missing token")
    }
    user, err := validateToken(token)
    if err != nil {
        return fiber.NewError(fiber.StatusUnauthorized, "invalid token")
    }
    c.Locals("user", user)  // store for downstream handlers
    return c.Next()          // continue to next handler
}

// Use middleware on group
admin := app.Group("/admin", AuthMiddleware)`}</code></pre>

      <h3>Fiber vs Gin vs Echo</h3>
      <table>
        <thead>
          <tr><th>Framework</th><th>Underlying</th><th>Strength</th><th>Trade-off</th></tr>
        </thead>
        <tbody>
          <tr><td>Fiber</td><td>fasthttp</td><td>Fastest, Express-like API</td><td>Not net/http compatible</td></tr>
          <tr><td>Gin</td><td>net/http</td><td>Most popular, huge ecosystem</td><td>Slightly slower than Fiber</td></tr>
          <tr><td>Echo</td><td>net/http</td><td>Cleanest API design</td><td>Smaller community</td></tr>
          <tr><td>chi</td><td>net/http</td><td>Idiomatic stdlib router</td><td>Less batteries-included</td></tr>
        </tbody>
      </table>

      {/* ────────── GENERICS ────────── */}
      <h2>Generics (Go 1.18+)</h2>
      <pre><code>{`// Basic generic function
func Map[T any, U any](s []T, f func(T) U) []U {
    result := make([]U, len(s))
    for i, v := range s {
        result[i] = f(v)
    }
    return result
}

// Usage
names := Map(users, func(u User) string { return u.Name })

// Constrained generic
func Max[T constraints.Ordered](a, b T) T {
    if a > b { return a }
    return b
}

// Custom constraint
type Number interface {
    int | int32 | int64 | float32 | float64
}

func Sum[T Number](nums []T) T {
    var total T
    for _, n := range nums {
        total += n
    }
    return total
}`}</code></pre>
      <p><b>When to use:</b> Generic data structures, utility functions (Map, Filter, Contains). <b>When NOT:</b> When an interface works fine. Go style still prefers interfaces for most polymorphism.</p>

      {/* ────────── TOOLING ────────── */}
      <h2>Go Tooling</h2>
      <table>
        <thead><tr><th>Command</th><th>Purpose</th></tr></thead>
        <tbody>
          <tr><td><code>go fmt ./...</code></td><td>Auto-format all code (eliminates style debates)</td></tr>
          <tr><td><code>go vet ./...</code></td><td>Static analysis — finds common bugs</td></tr>
          <tr><td><code>go test -race ./...</code></td><td>Run tests with race detector</td></tr>
          <tr><td><code>go test -cover ./...</code></td><td>Test coverage report</td></tr>
          <tr><td><code>go test -bench=. ./...</code></td><td>Run benchmarks</td></tr>
          <tr><td><code>go build -ldflags=&quot;-s -w&quot;</code></td><td>Strip debug info for smaller binary</td></tr>
          <tr><td><code>go mod tidy</code></td><td>Clean up dependencies</td></tr>
          <tr><td><code>go generate ./...</code></td><td>Run code generation directives</td></tr>
          <tr><td><code>golangci-lint run</code></td><td>Run multiple linters (third-party, highly recommended)</td></tr>
        </tbody>
      </table>

      <h3>Profiling with pprof</h3>
      <pre><code>{`// Add to your server
import _ "net/http/pprof"

// Then in production:
// go tool pprof -http=:8080 http://localhost:6060/debug/pprof/heap
// go tool pprof http://localhost:6060/debug/pprof/profile?seconds=30

// Key profiles:
// /debug/pprof/heap       — memory allocations
// /debug/pprof/goroutine  — goroutine dump
// /debug/pprof/profile    — CPU profile
// /debug/pprof/mutex      — mutex contention
// /debug/pprof/block      — blocking events`}</code></pre>

      {/* ────────── MEMORY & GC ────────── */}
      <h2>Memory &amp; Garbage Collection</h2>
      <ul>
        <li><b>Stack vs Heap:</b> The compiler decides via <b>escape analysis</b>. If a value outlives its function, it escapes to the heap. Use <code>go build -gcflags=&quot;-m&quot;</code> to see escape decisions.</li>
        <li><b>GC:</b> Concurrent tri-color mark-and-sweep with sub-millisecond pauses. Runs when heap grows to <code>GOGC</code>% (default 100%) of live data.</li>
        <li><b>Reduce GC pressure:</b> Use <code>sync.Pool</code> for hot-path allocations, pre-allocate slices with <code>make([]T, 0, capacity)</code>, avoid unnecessary pointers</li>
        <li><b>GOGC=100</b> (default) — GC triggers when heap doubles. Lower = more frequent GC, less memory. <code>GOGC=off</code> disables.</li>
        <li><b>GOMEMLIMIT</b> (Go 1.19+) — sets a soft memory limit, useful for container environments</li>
      </ul>

      {/* ────────── 1FINANCE PATTERNS ────────── */}
      <h2>Real Patterns from Your 1Finance Code</h2>
      <p>These are the actual idioms you use daily. Interviewers will love specifics — lean on these.</p>

      <h3>1. Router groups for module namespacing</h3>
      <pre><code>{`// app.go — top-level router
api := app.Group("/", logger.New())
// Each module gets its own group
NewsAuthorRoutes(api)
RegisterMasterClassRoutes(api)
hrConclave(api)
// ...

// Inside a module:
func hrConclave(router fiber.Router) {
    hr := router.Group("/hr-conclave")
    hr.Post("/v1/register", controllers.RegisterForHrConclave)

    admin := hr.Group("/admin")
    speakersAdmin := admin.Group("/speakers",
        middlewareUser.CheckUserDataBase(os.Getenv("ACCESS_TOKEN_SECRET"),
                                         "ManageHrConclaveSpeakers"))
    speakersAdmin.Get("", controllers.GetAllHrConclaveSpeakersAdmin)
    speakersAdmin.Post("", middlewareUser.ValidateHrConclaveSpeakerBody,
                       controllers.CreateHrConclaveSpeaker)
    // ...
}`}</code></pre>
      <p><b>What to say:</b> &quot;Each feature module is its own function that registers under a Fiber group. Admin endpoints are nested under the module&apos;s admin sub-group, which lets me attach the RBAC middleware once for the whole group instead of repeating it per route.&quot;</p>

      <h3>2. DB-backed JWT with per-endpoint RBAC permission strings</h3>
      <pre><code>{`// Used as middleware on individual routes or whole groups
middlewareUser.CheckUserDataBase(
    os.Getenv("ACCESS_TOKEN_SECRET"),
    "ManageInTheNews",
)

// Internally:
//   1. Parse and verify the JWT signature with ACCESS_TOKEN_SECRET
//   2. Load the user from the database (revocation + permission lookup)
//   3. Check the user has the "ManageInTheNews" permission in their role
//   4. 401/403 if either step fails; attach user to ctx.Locals if it passes`}</code></pre>
      <p><b>What to say:</b> &quot;We use a DB-backed JWT instead of stateless because we need revocation and per-user permission lookups. Each protected route declares its permission string explicitly — that doubles as inline documentation of what the route does and makes audit logs grep-able.&quot;</p>

      <h3>3. Static-token auth for internal / irreversible endpoints</h3>
      <pre><code>{`// Used for server-to-server or destructive admin operations
hr.Post("/internal/encrypt-data",
    middlewareUser.StaticTokenAuth(os.Getenv("AUTH_STATIC")),
    controllers.EncryptHrConclaveData)

// Reason: a JWT permission could be misclicked by an admin in a UI.
// A static token kept only in deployment secret store ensures
// triggering requires server-level access.`}</code></pre>
      <p><b>What to say:</b> &quot;For irreversible bulk operations like encryption backfill, JWT+permission is the wrong threat model — any admin in our UI could trigger it accidentally. We gate those with a static token from our deployment secret store. It is a different layer of trust, intentionally inconvenient.&quot;</p>

      <h3>4. Body validator middleware per resource</h3>
      <pre><code>{`speakerCardsAdmin.Post("",
    middlewareUser.ValidateHrSpeakerCardBody,
    controllers.CreateSpeakerCard)

speakerCardsAdmin.Put("/:id",
    middlewareUser.ValidateHrSpeakerCardBody,
    controllers.UpdateSpeakerCard)`}</code></pre>
      <p><b>What to say:</b> &quot;We keep validation in middleware, not the controller. That way create and update share the same shape rules, and the controller only handles business logic. The validator middleware parses the body, runs validation rules, and stores the validated struct in ctx.Locals for the controller to pick up — no double-parse.&quot;</p>

      <h3>5. API version coexistence during redesigns</h3>
      <pre><code>{`// Old routes (kept alive while consumers migrate)
IntheNews.Get("/v1/get-in-the-news/full", ...)
IntheNews.Post("/v1/create-in-the-news/*", ...)

// New routes with clean separation of concerns
IntheNews.Get("/v3/landing", controllers.GetInTheNewsLanding)
IntheNews.Get("/v3/archive", controllers.GetInTheNewsArchive)
admin := IntheNews.Group("/v3/admin", adminAuth)
admin.Post("/", middlewareUser.ValidateInNewsBody,
    controllers.CreateInTheNewsV3)
admin.Patch("/:id/publish", controllers.TogglePublishInTheNews)`}</code></pre>
      <p><b>What to say:</b> &quot;When the old API grew flat and organic, I added the new version alongside instead of mutating in place. Old routes stay alive until consumers migrate — usually a quarter — then we sunset it. Same module file, separate route groups, separate controllers, shared models when sensible.&quot;</p>

      {/* ────────── COMMON PITFALLS ────────── */}
      <h2>Common Pitfalls &amp; Gotchas</h2>
      <ul>
        <li><b>Loop variable capture:</b> In Go &lt;1.22, <code>for i, v := range items {`{ go func() { use(v) }() }`}</code> captures by reference — all goroutines see the last value. Fix by passing as parameter. Fixed in Go 1.22.</li>
        <li><b>Nil interface vs nil pointer:</b> An interface containing a nil pointer is NOT nil itself. Check the underlying type.</li>
        <li><b>Defer in a loop:</b> Defers don&apos;t run until function exit. Deferring in a loop accumulates them. Wrap loop body in a function instead.</li>
        <li><b>Forgetting to close channels:</b> Receivers may block forever. The sender should close.</li>
        <li><b>Goroutine leaks:</b> Every goroutine must have a clear exit path. Common leaks: forgotten channels, infinite loops without context cancellation.</li>
        <li><b>Slice append gotcha:</b> <code>append()</code> may or may not allocate a new array. Always reassign: <code>s = append(s, v)</code></li>
        <li><b>Map concurrent write:</b> Maps are not safe for concurrent writes. Use <code>sync.RWMutex</code> or <code>sync.Map</code>.</li>
        <li><b>String immutability:</b> Strings are immutable. Concatenation in a loop creates many allocations — use <code>strings.Builder</code>.</li>
        <li><b>Shadowed variables:</b> <code>:=</code> inside an <code>if</code>/<code>for</code> block creates a new variable that shadows the outer one. The outer variable stays unchanged.</li>
        <li><b>Range copies:</b> <code>for _, v := range items</code> copies each element. For large structs, use index: <code>for i := range items {`{ items[i].Field = ... }`}</code></li>
        <li><b>Naked returns:</b> Named return values + naked <code>return</code> can confuse readers. Use only in very short functions.</li>
        <li><b>init() abuse:</b> <code>init()</code> runs before main and can cause hard-to-debug ordering issues. Keep init() minimal — prefer explicit initialization.</li>
      </ul>

      {/* ────────── INTERVIEW QUICK REF ────────── */}
      <h2>Interview Quick Reference</h2>
      <table>
        <thead><tr><th>Topic</th><th>Key Points to Mention</th></tr></thead>
        <tbody>
          <tr><td>Goroutines vs Threads</td><td>2KB stack vs 1MB, GMP scheduler, work stealing, hundreds of thousands possible</td></tr>
          <tr><td>Channels</td><td>Typed communication, buffered vs unbuffered, direction restriction, close to signal</td></tr>
          <tr><td>Error handling</td><td>No exceptions, errors.Is/As, %w wrapping, sentinel errors, custom error types</td></tr>
          <tr><td>Interfaces</td><td>Implicit satisfaction, small interfaces, accept interface return struct, io.Reader/Writer</td></tr>
          <tr><td>Context</td><td>Cancellation propagation, deadlines, always first param, WithTimeout/WithCancel</td></tr>
          <tr><td>GC</td><td>Concurrent tri-color mark-sweep, sub-ms pauses, GOGC tuning, sync.Pool for hot paths</td></tr>
          <tr><td>Testing</td><td>Table-driven, t.Run for subtests, -race flag, benchmarks, fuzzing (1.18+)</td></tr>
          <tr><td>Fiber</td><td>fasthttp-based, Express-like, not net/http compatible, Ctx.Locals for middleware chain</td></tr>
          <tr><td>Modules</td><td>go.mod + go.sum, go mod tidy, semantic versioning, internal/ packages</td></tr>
          <tr><td>Generics</td><td>Type parameters (1.18), constraints, use sparingly, interfaces still preferred</td></tr>
        </tbody>
      </table>
    </>
  );
}
