export const metadata = { title: "Golang & GoFiber — Interview Prep" };

export default function GolangPage() {
  return (
    <>
      <h1>Golang &amp; GoFiber</h1>
      <p>You&apos;ve built the OneHub backend in Go with GoFiber — interviewers will go deep here. Master the concurrency model, error handling idioms, and Fiber-specific patterns.</p>

      <h2>Core Language Concepts</h2>
      <h3>Goroutines &amp; Channels</h3>
      <p>A goroutine is a lightweight thread managed by the Go runtime — starting with just ~2KB stack vs ~1MB for OS threads. You can run hundreds of thousands concurrently. Channels are how goroutines communicate safely: <code>ch &lt;- value</code> sends, <code>v := &lt;-ch</code> receives.</p>
      <pre><code>{`// Async WhatsApp notification (matches your 1Finance work)
func sendWhatsApp(userID string, msg string) {
    go func() {
        if err := whatsappClient.Send(userID, msg); err != nil {
            log.Printf("WA send failed for %s: %v", userID, err)
        }
    }()
}
// Caller returns immediately — registration flow stays non-blocking.`}</code></pre>
      <p><b>Gotchas:</b> Don&apos;t spawn unbounded goroutines on a hot path — use a worker pool or semaphore channel. Always handle panics inside goroutines or they crash the whole process.</p>

      <h3>Interfaces — Go&apos;s killer feature</h3>
      <p>Interfaces are <i>implicit</i>. Any type that has the right methods satisfies an interface automatically. This makes mocking and dependency injection trivial.</p>
      <pre><code>{`type UserRepo interface {
    GetByID(ctx context.Context, id string) (*User, error)
}

type pgUserRepo struct{ db *sql.DB }
func (r *pgUserRepo) GetByID(ctx context.Context, id string) (*User, error) { /* ... */ }

// Easy to swap with a mock in tests — no explicit "implements".`}</code></pre>

      <h3>Error Handling Idiom</h3>
      <p>No exceptions — every function returns an <code>error</code>. Wrap errors with context using <code>fmt.Errorf(&quot;loading user %s: %w&quot;, id, err)</code>. Unwrap with <code>errors.Is</code> and <code>errors.As</code>.</p>

      <h3>Context Propagation</h3>
      <p>Pass <code>ctx context.Context</code> as the first argument to every function that does I/O. It carries deadlines, cancellation signals, and request-scoped values. Without it, a cancelled HTTP request keeps querying the database wastefully.</p>

      <h3>Defer, Panic, Recover</h3>
      <p><code>defer</code> runs at function exit (LIFO order). Use for cleanup: <code>defer db.Close()</code>, <code>defer rows.Close()</code>. <code>panic</code> unwinds the stack; <code>recover</code> catches it (only inside deferred functions).</p>

      <h3>Slices vs Arrays vs Maps</h3>
      <p>Slices are headers (pointer, length, capacity) over an underlying array. Appending past capacity allocates a new array. Maps are unordered, not safe for concurrent writes — use <code>sync.Map</code> or a mutex.</p>

      <h2>GoFiber Specifics</h2>
      <p>Fiber is built on <code>fasthttp</code>, not <code>net/http</code>. That gives speed but means some <code>net/http</code> middleware doesn&apos;t work directly. Fiber&apos;s API mimics Express.js.</p>
      <pre><code>{`app := fiber.New(fiber.Config{
    ReadTimeout:  10 * time.Second,
    WriteTimeout: 10 * time.Second,
    BodyLimit:    4 * 1024 * 1024,
})

// JWT middleware (matches your 28-endpoint admin workflow)
app.Use("/admin", jwtware.New(jwtware.Config{
    SigningKey: []byte(os.Getenv("JWT_SECRET")),
}))

app.Get("/events/:id", func(c *fiber.Ctx) error {
    id := c.Params("id")
    event, err := repo.GetEvent(c.Context(), id)
    if err != nil { return fiber.NewError(fiber.StatusNotFound, "not found") }
    return c.JSON(event)
})`}</code></pre>

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

      <h2>Concurrency Patterns You Should Know</h2>
      <details><summary>Worker Pool</summary>
        <pre><code>{`jobs := make(chan Job, 100)
for i := 0; i < 10; i++ {
    go func() { for j := range jobs { process(j) } }()
}
for _, j := range tasks { jobs <- j }
close(jobs)`}</code></pre>
      </details>
      <details><summary>Fan-out / Fan-in</summary>
        <p>Multiple goroutines read from one channel (fan-out), then write results to a single channel (fan-in). Useful for parallelizing API calls.</p>
      </details>
      <details><summary>select with timeout</summary>
        <pre><code>{`select {
case res := <-respCh:
    return res
case <-time.After(2 * time.Second):
    return nil, errors.New("timeout")
}`}</code></pre>
      </details>
      <details><summary>sync.WaitGroup</summary>
        <p>Wait for N goroutines to finish: <code>wg.Add(1)</code>, <code>defer wg.Done()</code> inside goroutine, <code>wg.Wait()</code> in caller.</p>
      </details>
      <details><summary>errgroup</summary>
        <p><code>golang.org/x/sync/errgroup</code> — like WaitGroup but cancels all if any goroutine errors. Perfect for &quot;fetch user, fetch orders, fetch profile&quot; in parallel.</p>
      </details>

      <h2>Real Patterns from Your OneHub Code</h2>
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

      <h3>5. V1 + V3 coexistence during API redesigns</h3>
      <pre><code>{`// Old V1 routes (kept alive while consumers migrate)
IntheNews.Get("/v1/get-in-the-news/full", ...)
IntheNews.Post("/v1/create-in-the-news/*", ...)

// New V3 with clean separation of concerns
IntheNews.Get("/v3/landing", controllers.GetInTheNewsLanding)
IntheNews.Get("/v3/archive", controllers.GetInTheNewsArchive)
admin := IntheNews.Group("/v3/admin", adminAuth)
admin.Post("/", middlewareUser.ValidateInNewsBody,
    controllers.CreateInTheNewsV3)
admin.Patch("/:id/publish", controllers.TogglePublishInTheNews)`}</code></pre>
      <p><b>What to say:</b> &quot;When V1 grew flat and organic, I added V3 alongside instead of mutating V1 in place. V1 stays alive until its consumers migrate — usually a quarter — then we sunset it. Same module file, separate route groups, separate controllers, shared models when sensible.&quot;</p>

      <h2>Common Pitfalls</h2>
      <ul>
        <li><b>Loop variable capture:</b> In Go &lt;1.22, <code>for i, v := range items {`{ go func() { use(v) }() }`}</code> captures by reference — all goroutines see the last value. Fix by passing as parameter. Fixed in Go 1.22.</li>
        <li><b>Nil interface vs nil pointer:</b> An interface containing a nil pointer is NOT nil itself. Check the underlying type.</li>
        <li><b>Defer in a loop:</b> Defers don&apos;t run until function exit. Defering in a loop accumulates them. Wrap loop body in a function instead.</li>
        <li><b>Forgetting to close channels:</b> Receivers may block forever. The sender should close.</li>
      </ul>
    </>
  );
}
