export const metadata = { title: "Laravel — Interview Prep" };

export default function LaravelPage() {
  return (
    <>
      <h1>Laravel Framework</h1>
      <p>Laravel is the most popular PHP framework, known for its elegant syntax and powerful tooling. Interviews test your understanding of its core architecture — the IoC container, Eloquent ORM, middleware pipeline, and ecosystem (Queues, Events, Horizon).</p>

      {/* ────────── ARCHITECTURE ────────── */}
      <h2>Laravel Architecture</h2>

      <h3>The Service Container (IoC Container)</h3>
      <p>This is the <b>heart of Laravel</b>. It manages class dependencies and performs dependency injection. Everything in Laravel — routes, controllers, middleware, events — is resolved through the container.</p>
      <pre><code>{`// Binding a service to the container
// In a ServiceProvider's register() method:
$this->app->bind(PaymentGateway::class, StripeGateway::class);

// Singleton binding (same instance every time)
$this->app->singleton(CacheManager::class, function ($app) {
    return new CacheManager($app['config']['cache']);
});

// Automatic resolution — if a class has no interface binding,
// Laravel resolves it automatically using reflection:
class OrderController {
    // Laravel auto-injects OrderService without any binding
    public function store(OrderService $service, Request $request) {
        return $service->create($request->validated());
    }
}

// Contextual binding
$this->app->when(PhotoController::class)
    ->needs(FileStorage::class)
    ->give(S3Storage::class);

$this->app->when(VideoController::class)
    ->needs(FileStorage::class)
    ->give(LocalStorage::class);`}</code></pre>

      <h3>Service Providers</h3>
      <p>Service Providers are the central place to configure and bootstrap your application. Every major Laravel feature is bootstrapped by a service provider.</p>
      <pre><code>{`class PaymentServiceProvider extends ServiceProvider {
    // register() — Bind things into the container. ONLY bindings here.
    // Do NOT use other services in register() — they might not be loaded yet.
    public function register(): void {
        $this->app->singleton(PaymentGateway::class, function ($app) {
            return match($app['config']['payment.driver']) {
                'stripe'   => new StripeGateway($app['config']['payment.stripe_key']),
                'razorpay' => new RazorpayGateway($app['config']['payment.razorpay_key']),
                default    => throw new InvalidArgumentException('Unknown payment driver'),
            };
        });
    }
    
    // boot() — Called AFTER all providers are registered.
    // Use other services, register routes, views, event listeners here.
    public function boot(): void {
        $this->loadRoutesFrom(__DIR__ . '/../routes/payment.php');
        $this->loadViewsFrom(__DIR__ . '/../views', 'payment');
        $this->loadMigrationsFrom(__DIR__ . '/../database/migrations');
    }
}`}</code></pre>

      <h3>The Request Lifecycle</h3>
      <ol>
        <li><b>public/index.php:</b> Entry point. Creates the Application instance and captures the HTTP request.</li>
        <li><b>HTTP Kernel:</b> The request passes through global middleware (session, CSRF, etc.).</li>
        <li><b>Service Providers:</b> All providers are registered, then booted.</li>
        <li><b>Router:</b> Request is dispatched to the matching route. Route middleware runs.</li>
        <li><b>Controller/Closure:</b> The route handler executes.</li>
        <li><b>Response:</b> Passes back through middleware (in reverse) and is sent to the browser.</li>
      </ol>

      {/* ────────── ROUTING ────────── */}
      <h2>Routing</h2>
      <pre><code>{`// Basic routes (routes/web.php or routes/api.php)
Route::get('/products', [ProductController::class, 'index']);
Route::post('/products', [ProductController::class, 'store']);
Route::get('/products/{product}', [ProductController::class, 'show']); // Route Model Binding

// Route Model Binding (automatic resolution)
// Laravel auto-fetches Product by ID from the URL
public function show(Product $product) {
    return view('products.show', compact('product'));
    // If not found, Laravel returns 404 automatically
}

// Resource routes (generates all 7 RESTful routes)
Route::resource('products', ProductController::class);
// GET    /products           → index
// GET    /products/create    → create
// POST   /products           → store
// GET    /products/{id}      → show
// GET    /products/{id}/edit → edit
// PUT    /products/{id}      → update
// DELETE /products/{id}      → destroy

// API Resource (no create/edit form routes)
Route::apiResource('products', ProductController::class);

// Route groups
Route::prefix('admin')
    ->middleware(['auth', 'admin'])
    ->name('admin.')
    ->group(function () {
        Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');
        Route::resource('users', AdminUserController::class);
    });

// Rate limiting (Laravel 8+)
Route::middleware('throttle:60,1')->group(function () {
    Route::get('/api/search', [SearchController::class, 'index']);
});`}</code></pre>

      {/* ────────── MIDDLEWARE ────────── */}
      <h2>Middleware</h2>
      <p>Middleware filters HTTP requests entering your application. Think of it as layers of an onion — the request passes through each layer going in, and the response passes through each layer going out.</p>
      <pre><code>{`class EnsureUserIsAdmin {
    public function handle(Request $request, Closure $next): Response {
        if (!$request->user()?->isAdmin()) {
            abort(403, 'Unauthorized');
        }
        
        // Pass to next middleware / controller
        $response = $next($request);
        
        // You can also modify the response AFTER the controller runs
        $response->headers->set('X-Admin-Access', 'true');
        
        return $response;
    }
}

// Terminable middleware — runs AFTER the response is sent to browser
class LogSlowRequests {
    public function handle(Request $request, Closure $next): Response {
        $request->attributes->set('start_time', microtime(true));
        return $next($request);
    }
    
    // terminate() is called after the response is sent
    public function terminate(Request $request, Response $response): void {
        $duration = microtime(true) - $request->attributes->get('start_time');
        if ($duration > 1.0) {
            Log::warning("Slow request: {$request->url()} took {$duration}s");
        }
    }
}`}</code></pre>

      {/* ────────── ELOQUENT ORM ────────── */}
      <h2>Eloquent ORM — Deep Dive</h2>
      <p>Eloquent is Laravel&apos;s ActiveRecord ORM. Each model maps to a database table.</p>

      <h3>Basic CRUD</h3>
      <pre><code>{`// Retrieving
$users = User::all();                              // All users
$user = User::find(1);                             // By primary key
$user = User::findOrFail(1);                       // 404 if not found
$users = User::where('active', true)->get();       // Collection
$user = User::where('email', $email)->first();     // Single model or null
$user = User::where('email', $email)->firstOrFail(); // 404 if not found

// Creating
$user = User::create([
    'name'  => 'Arvind',
    'email' => 'arvind@example.com',
]);
// Requires $fillable or $guarded on the model (mass assignment protection)

// Updating
$user->update(['name' => 'New Name']);
// Or:
$user->name = 'New Name';
$user->save();

// Upserting (insert or update)
User::updateOrCreate(
    ['email' => 'arvind@example.com'],  // find by
    ['name' => 'Arvind', 'role' => 'admin'], // update/create with
);

// Deleting
$user->delete();
User::destroy([1, 2, 3]);       // delete by IDs
User::where('active', false)->delete(); // bulk delete

// Soft Deletes (mark as deleted without removing from DB)
// Add use SoftDeletes trait to model + deleted_at column
$user->delete();               // sets deleted_at timestamp
$user->restore();              // clears deleted_at
User::withTrashed()->get();    // include soft-deleted records`}</code></pre>

      <h3>Relationships</h3>
      <pre><code>{`class User extends Model {
    // One-to-Many
    public function posts(): HasMany {
        return $this->hasMany(Post::class);
    }
    
    // Many-to-Many
    public function roles(): BelongsToMany {
        return $this->belongsToMany(Role::class)
            ->withPivot('assigned_at')
            ->withTimestamps();
    }
    
    // One-to-One
    public function profile(): HasOne {
        return $this->hasOne(Profile::class);
    }
}

class Post extends Model {
    // Inverse of One-to-Many
    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }
    
    // Polymorphic relationship
    public function comments(): MorphMany {
        return $this->morphMany(Comment::class, 'commentable');
    }
}

// Eager Loading — THE solution to N+1 problems
$users = User::with('posts')->get();        // 2 queries total (not 1 + N)
$users = User::with(['posts', 'roles'])->get(); // load multiple relations
$users = User::with('posts.comments')->get();   // nested eager loading

// Lazy eager loading (after initial query)
$users = User::all();
$users->load('posts');

// Querying relationships
$usersWithPosts = User::has('posts')->get();              // users who have posts
$usersWithManyPosts = User::has('posts', '>=', 5)->get(); // 5+ posts
$users = User::whereHas('posts', function ($query) {
    $query->where('published', true);
})->get();`}</code></pre>

      <h3>Query Scopes</h3>
      <pre><code>{`class Post extends Model {
    // Local scope — reusable query constraints
    public function scopePublished(Builder $query): Builder {
        return $query->where('published_at', '<=', now());
    }
    
    public function scopeByAuthor(Builder $query, int $userId): Builder {
        return $query->where('user_id', $userId);
    }
    
    // Global scope — applied to EVERY query on this model
    protected static function booted(): void {
        static::addGlobalScope('active', function (Builder $query) {
            $query->where('active', true);
        });
    }
}

// Usage (chainable):
$posts = Post::published()->byAuthor(1)->latest()->paginate(20);

// Skip global scope when needed:
Post::withoutGlobalScope('active')->get();`}</code></pre>

      {/* ────────── VALIDATION ────────── */}
      <h2>Validation &amp; Form Requests</h2>
      <pre><code>{`// Inline validation (quick and simple)
$validated = $request->validate([
    'title' => 'required|string|max:255',
    'body'  => 'required|string|min:10',
    'email' => 'required|email|unique:users,email',
    'tags'  => 'array|max:5',
    'tags.*' => 'string|max:30', // validate each array item
]);

// Form Request (better for complex validation — keeps controllers clean)
class StoreProductRequest extends FormRequest {
    public function authorize(): bool {
        return $this->user()->can('create', Product::class);
    }
    
    public function rules(): array {
        return [
            'name'        => ['required', 'string', 'max:255'],
            'price'       => ['required', 'numeric', 'min:0'],
            'sku'         => ['required', 'string', 'unique:products,sku'],
            'category_id' => ['required', 'exists:categories,id'],
            'images'      => ['array', 'max:10'],
            'images.*'    => ['image', 'max:2048'], // 2MB max each
        ];
    }
    
    public function messages(): array {
        return [
            'sku.unique' => 'This SKU is already taken.',
        ];
    }
}

// Controller stays clean:
public function store(StoreProductRequest $request) {
    $product = Product::create($request->validated());
    return redirect()->route('products.show', $product);
}`}</code></pre>

      {/* ────────── QUEUES ────────── */}
      <h2>Queues &amp; Jobs</h2>
      <p>Queues allow you to defer time-consuming tasks (sending emails, processing images, syncing data) to background workers. This is critical for keeping response times fast.</p>
      <pre><code>{`// Create a job: php artisan make:job ProcessPayment
class ProcessPayment implements ShouldQueue {
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    
    public int $tries = 3;           // Max retry attempts
    public int $backoff = 60;        // Seconds between retries
    public int $timeout = 120;       // Max execution time
    
    public function __construct(
        private Order $order,
        private string $paymentMethod,
    ) {}
    
    public function handle(PaymentGateway $gateway): void {
        // Laravel auto-injects PaymentGateway from the container
        $result = $gateway->charge($this->order->total, $this->paymentMethod);
        $this->order->update(['payment_status' => $result->status]);
    }
    
    // Called when all retries are exhausted
    public function failed(Throwable $exception): void {
        Log::error("Payment failed for order {$this->order->id}", [
            'error' => $exception->getMessage(),
        ]);
        $this->order->update(['payment_status' => 'failed']);
    }
}

// Dispatching jobs
ProcessPayment::dispatch($order, 'stripe');                    // default queue
ProcessPayment::dispatch($order, 'stripe')->onQueue('payments'); // named queue
ProcessPayment::dispatch($order, 'stripe')->delay(now()->addMinutes(5)); // delayed

// Job chaining (run sequentially, fail-fast)
Bus::chain([
    new ProcessPayment($order, 'stripe'),
    new SendOrderConfirmation($order),
    new UpdateInventory($order),
])->dispatch();

// Job batching (run in parallel, track progress)
Bus::batch([
    new ImportUser($user1),
    new ImportUser($user2),
    new ImportUser($user3),
])->then(fn(Batch $batch) => Log::info('All imported!'))
  ->catch(fn(Batch $batch, Throwable $e) => Log::error($e))
  ->dispatch();`}</code></pre>

      {/* ────────── EVENTS ────────── */}
      <h2>Events &amp; Listeners</h2>
      <p>Decouple your code using the Observer pattern. An event is fired, and all registered listeners react independently.</p>
      <pre><code>{`// Define an event
class OrderPlaced {
    public function __construct(
        public readonly Order $order,
        public readonly User $user,
    ) {}
}

// Define listeners
class SendOrderConfirmationEmail {
    public function handle(OrderPlaced $event): void {
        Mail::to($event->user)->send(new OrderConfirmationMail($event->order));
    }
}

class UpdateInventory {
    public function handle(OrderPlaced $event): void {
        foreach ($event->order->items as $item) {
            $item->product->decrement('stock', $item->quantity);
        }
    }
}

// Register in EventServiceProvider
protected $listen = [
    OrderPlaced::class => [
        SendOrderConfirmationEmail::class,
        UpdateInventory::class,
        NotifyWarehouse::class,
    ],
];

// Fire the event
OrderPlaced::dispatch($order, $user);
// or: event(new OrderPlaced($order, $user));`}</code></pre>

      {/* ────────── TESTING ────────── */}
      <h2>Testing</h2>
      <p>Laravel has excellent testing support built on PHPUnit and Pest.</p>
      <pre><code>{`// Feature test (HTTP test — tests the full stack)
class ProductTest extends TestCase {
    use RefreshDatabase; // Resets DB between tests
    
    public function test_user_can_create_product(): void {
        $user = User::factory()->create();
        
        $response = $this->actingAs($user)
            ->postJson('/api/products', [
                'name' => 'Widget',
                'price' => 29.99,
                'sku' => 'WDG-001',
            ]);
        
        $response->assertStatus(201)
            ->assertJson(['name' => 'Widget']);
        
        $this->assertDatabaseHas('products', ['sku' => 'WDG-001']);
    }
    
    public function test_guest_cannot_create_product(): void {
        $response = $this->postJson('/api/products', ['name' => 'Widget']);
        $response->assertStatus(401);
    }
}

// Unit test (testing a class in isolation)
public function test_order_total_calculation(): void {
    $order = new Order();
    $order->addItem(new OrderItem(price: 100, quantity: 2));
    $order->addItem(new OrderItem(price: 50, quantity: 1));
    
    $this->assertEquals(250, $order->total());
}

// Factories for test data
class UserFactory extends Factory {
    public function definition(): array {
        return [
            'name'  => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'password' => bcrypt('password'),
        ];
    }
    
    public function admin(): self {
        return $this->state(['role' => 'admin']);
    }
}
// Usage: User::factory()->admin()->create();

// Mocking
$this->mock(PaymentGateway::class, function ($mock) {
    $mock->shouldReceive('charge')
        ->once()
        ->with(100, 'stripe')
        ->andReturn(new PaymentResult(status: 'success'));
});`}</code></pre>

      {/* ────────── ARTISAN & MIGRATIONS ────────── */}
      <h2>Artisan CLI &amp; Migrations</h2>
      <pre><code>{`// Essential Artisan commands
php artisan make:model Product -mfc    // Model + Migration + Factory + Controller
php artisan make:controller Api/ProductController --api  // API resource controller
php artisan make:middleware EnsureAdmin
php artisan make:request StoreProductRequest
php artisan make:job ProcessPayment
php artisan make:event OrderPlaced
php artisan make:listener SendEmail --event=OrderPlaced

// Migrations
Schema::create('products', function (Blueprint $table) {
    $table->id();                          // BIGINT auto-increment
    $table->string('name');
    $table->text('description')->nullable();
    $table->decimal('price', 10, 2);       // For money (NOT float!)
    $table->string('sku')->unique();
    $table->foreignId('category_id')->constrained()->cascadeOnDelete();
    $table->json('metadata')->nullable();
    $table->boolean('active')->default(true);
    $table->timestamps();                  // created_at, updated_at
    $table->softDeletes();                 // deleted_at
    
    // Indexes
    $table->index('name');
    $table->index(['category_id', 'active']); // composite
});

// Run migrations
php artisan migrate              // run pending migrations
php artisan migrate:rollback     // undo last batch
php artisan migrate:fresh --seed // drop all tables, re-run, seed`}</code></pre>

      {/* ────────── ECOSYSTEM ────────── */}
      <h2>Laravel Ecosystem</h2>
      <table>
        <thead><tr><th>Package</th><th>Purpose</th></tr></thead>
        <tbody>
          <tr><td><b>Horizon</b></td><td>Dashboard for Redis queues. Monitor jobs, throughput, failures.</td></tr>
          <tr><td><b>Sanctum</b></td><td>Lightweight auth for SPAs and mobile apps (token-based + cookie-based).</td></tr>
          <tr><td><b>Passport</b></td><td>Full OAuth2 server (for third-party API authentication).</td></tr>
          <tr><td><b>Telescope</b></td><td>Debug assistant — logs requests, queries, exceptions, jobs, mail in a dashboard.</td></tr>
          <tr><td><b>Livewire</b></td><td>Build dynamic UIs without JavaScript. Components are PHP classes that render Blade templates with reactive state.</td></tr>
          <tr><td><b>Inertia.js</b></td><td>Build SPAs using React/Vue without building an API. Laravel routes return Inertia responses that render frontend components.</td></tr>
          <tr><td><b>Vapor</b></td><td>Serverless deployment on AWS Lambda. Auto-scaling, zero server management.</td></tr>
          <tr><td><b>Forge</b></td><td>Server provisioning and deployment (DigitalOcean, AWS, etc.).</td></tr>
          <tr><td><b>Cashier</b></td><td>Subscription billing with Stripe/Paddle. Handles trials, invoices, webhooks.</td></tr>
          <tr><td><b>Scout</b></td><td>Full-text search integration (Algolia, Meilisearch, Typesense).</td></tr>
        </tbody>
      </table>

      {/* ────────── PERFORMANCE ────────── */}
      <h2>Performance Tips</h2>
      <ul>
        <li><b>Eager Loading:</b> Always use <code>with()</code> to avoid N+1 queries. Enable <code>Model::preventLazyLoading()</code> in development to catch violations.</li>
        <li><b>Route Caching:</b> <code>php artisan route:cache</code> — compiles all routes into a single file. Mandatory in production.</li>
        <li><b>Config Caching:</b> <code>php artisan config:cache</code> — merges all config files into one. Don&apos;t use <code>env()</code> outside config files after caching.</li>
        <li><b>Query Optimization:</b> Use <code>select()</code> to pick specific columns, <code>chunk()</code> for processing large datasets, and database indexing.</li>
        <li><b>Cache Aggressively:</b> <code>Cache::remember(&apos;key&apos;, 3600, fn() =&gt; DB::table(...)-&gt;get())</code>. Invalidate on writes.</li>
        <li><b>Queue Everything:</b> Email, notifications, image processing, API calls to third parties — all should go through queues.</li>
      </ul>

      <h2>Interview Quick Reference</h2>
      <table>
        <thead><tr><th>Topic</th><th>Key Points to Mention</th></tr></thead>
        <tbody>
          <tr><td>Service Container</td><td>IoC container. Automatic resolution via reflection. bind() vs singleton(). Contextual binding.</td></tr>
          <tr><td>Eloquent</td><td>ActiveRecord ORM. Relationships (hasMany, belongsTo, morphMany). Eager loading with(). Scopes. Soft deletes.</td></tr>
          <tr><td>Middleware</td><td>Request/response pipeline. Global vs route middleware. Terminable middleware.</td></tr>
          <tr><td>Queues</td><td>ShouldQueue interface. Retries, backoff, timeout. Job chaining and batching. Horizon for monitoring.</td></tr>
          <tr><td>Testing</td><td>Feature tests (actingAs, assertJson). RefreshDatabase. Factories. Mocking with Mockery.</td></tr>
          <tr><td>Performance</td><td>Eager loading, route/config cache, queue I/O-bound work, Cache::remember pattern.</td></tr>
        </tbody>
      </table>
    </>
  );
}
