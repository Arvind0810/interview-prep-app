export const metadata = { title: "PHP Core — Interview Prep" };

export default function PhpPage() {
  return (
    <>
      <h1>PHP Core</h1>
      <p>PHP powers over 75% of the web. Whether you&apos;re working with WordPress, Laravel, or custom backends, interviewers expect solid fundamentals — types, OOP, error handling, security, and modern PHP 8.x features.</p>

      {/* ────────── PHP FUNDAMENTALS ────────── */}
      <h2>PHP Fundamentals</h2>
      <p>PHP is a server-side, dynamically typed scripting language. Code runs on the server and sends HTML to the browser — the client never sees your PHP code.</p>

      <h3>How PHP Executes</h3>
      <ol>
        <li><b>Lexing/Tokenizing:</b> PHP source code is broken into tokens.</li>
        <li><b>Parsing:</b> Tokens are transformed into an Abstract Syntax Tree (AST).</li>
        <li><b>Compilation:</b> AST is compiled to opcodes (bytecode).</li>
        <li><b>Execution:</b> The Zend Engine executes opcodes.</li>
      </ol>
      <p><b>OPcache:</b> In production, OPcache stores compiled opcodes in shared memory so PHP skips steps 1-3 on subsequent requests. This alone can improve performance by 3-5x. Always enable it.</p>

      <h3>Variables &amp; Types</h3>
      <pre><code>{`// PHP is dynamically typed — variables don't need type declarations
$name = "Arvind";          // string
$age = 28;                 // int
$salary = 75000.50;        // float
$isActive = true;          // bool
$skills = ["Go", "PHP"];   // array
$nothing = null;           // null

// Type juggling (implicit conversion) — a common interview gotcha
var_dump(0 == "foo");      // true in PHP 7 (loose comparison), false in PHP 8
var_dump(0 === "foo");     // false (strict comparison — ALWAYS use ===)

// Type casting
$num = (int) "42abc";      // 42
$str = (string) 3.14;     // "3.14"
$bool = (bool) "";         // false
$bool = (bool) "0";        // false (special case!)

// Type declarations (PHP 7+)
function add(int $a, int $b): int {
    return $a + $b;
}

// Union types (PHP 8.0+)
function getId(): int|string {
    return random_int(0, 1) ? 42 : "abc-123";
}

// Intersection types (PHP 8.1+)
function process(Countable&Iterator $collection): void {
    // Must implement both interfaces
}

// Nullable types
function findUser(int $id): ?User {
    return $this->repository->find($id); // returns User or null
}`}</code></pre>

      <h3>Strings In Depth</h3>
      <pre><code>{`// Single quotes — no variable interpolation, faster
$greeting = 'Hello, World!';

// Double quotes — supports interpolation and escape sequences
$name = "Arvind";
$msg = "Hello, $name!\\n";          // Hello, Arvind! + newline
$msg = "Score: {$user->score}";    // complex expressions need braces

// Heredoc (like double quotes, multiline)
$html = <<<HTML
<div class="card">
    <h2>{$title}</h2>
    <p>{$description}</p>
</div>
HTML;

// Nowdoc (like single quotes, multiline, no interpolation)
$template = <<<'EOT'
This is raw text. $variables are NOT interpolated here.
EOT;

// Important string functions
strlen($str);                       // byte length (NOT character count for UTF-8!)
mb_strlen($str);                   // character count (multibyte safe)
strpos($haystack, $needle);       // find position (returns false if not found — use ===)
str_contains($str, "search");     // PHP 8.0+ (cleaner than strpos)
str_starts_with($str, "Hello");   // PHP 8.0+
str_ends_with($str, "World");     // PHP 8.0+
explode(",", "a,b,c");            // split → ["a", "b", "c"]
implode("-", ["a", "b", "c"]);    // join → "a-b-c"
strtolower($str);
trim($str);
sprintf("User %s (ID: %d)", $name, $id);  // formatted strings`}</code></pre>

      <h3>Arrays — The Swiss Army Knife</h3>
      <p>PHP arrays are actually ordered hash maps. They can serve as arrays, lists, dictionaries, stacks, queues, and more.</p>
      <pre><code>{`// Indexed array
$fruits = ["apple", "banana", "cherry"];

// Associative array (dictionary/map)
$user = [
    "name"  => "Arvind",
    "email" => "arvind@example.com",
    "age"   => 28,
];

// Nested arrays
$config = [
    "database" => [
        "host" => "localhost",
        "port" => 5432,
    ],
];

// Common operations
count($arr);                    // length
in_array("apple", $fruits);    // search (O(n) — use array_flip for O(1))
array_key_exists("name", $user); // check key
array_push($fruits, "date");   // append (or: $fruits[] = "date")
array_merge($arr1, $arr2);     // merge
array_filter($arr, fn($v) => $v > 10);  // filter
array_map(fn($v) => $v * 2, $arr);      // map
array_reduce($arr, fn($carry, $v) => $carry + $v, 0); // reduce

// Destructuring (PHP 7.1+)
[$first, $second] = $fruits;
["name" => $name, "age" => $age] = $user;

// Spread operator (PHP 7.4+)
$merged = [...$arr1, ...$arr2];

// Sorting
sort($arr);              // by value, re-indexes
asort($arr);             // by value, preserves keys
ksort($arr);             // by key
usort($arr, fn($a, $b) => $a->age <=> $b->age); // custom comparator`}</code></pre>

      {/* ────────── OOP ────────── */}
      <h2>Object-Oriented PHP</h2>
      <p>Modern PHP is heavily OOP. Laravel, Symfony, and WordPress (since Gutenberg) all rely on solid OOP patterns.</p>
      <pre><code>{`class User {
    // Visibility: public, protected, private
    private int $id;
    public string $name;
    protected string $email;
    
    // Constructor Property Promotion (PHP 8.0+ — massive boilerplate reduction)
    public function __construct(
        private int $id,
        public string $name,
        protected string $email,
        public readonly string $role = 'viewer', // readonly (PHP 8.1+)
    ) {}
    
    public function getId(): int {
        return $this->id;
    }
    
    // Magic methods
    public function __toString(): string {
        return "{$this->name} ({$this->email})";
    }
}

// Inheritance
class Admin extends User {
    public function __construct(
        int $id,
        string $name,
        string $email,
        private array $permissions = [],
    ) {
        parent::__construct($id, $name, $email, 'admin');
    }
}

// Abstract classes
abstract class Shape {
    abstract public function area(): float;
    
    // Concrete method shared by all subclasses
    public function describe(): string {
        return "Area: " . $this->area();
    }
}

// Interfaces
interface Cacheable {
    public function getCacheKey(): string;
    public function getCacheTTL(): int;
}

interface Serializable {
    public function toArray(): array;
}

// A class can implement multiple interfaces (but extend only one class)
class Product extends Model implements Cacheable, Serializable {
    public function getCacheKey(): string {
        return "product:{$this->id}";
    }
    public function getCacheTTL(): int { return 3600; }
    public function toArray(): array { return [...]; }
}

// Traits (horizontal code reuse — PHP's answer to multiple inheritance)
trait Timestamps {
    public DateTime $createdAt;
    public DateTime $updatedAt;
    
    public function touch(): void {
        $this->updatedAt = new DateTime();
    }
}

class Post {
    use Timestamps; // "mix in" the trait
}

// Enums (PHP 8.1+)
enum Status: string {
    case Active = 'active';
    case Inactive = 'inactive';
    case Suspended = 'suspended';
    
    public function label(): string {
        return match($this) {
            self::Active => 'Active',
            self::Inactive => 'Inactive',
            self::Suspended => 'Suspended',
        };
    }
}
// Usage: $user->status = Status::Active;`}</code></pre>

      <h3>Static vs Instance</h3>
      <pre><code>{`class Database {
    private static ?Database $instance = null;
    
    private function __construct(private PDO $pdo) {}
    
    // Singleton pattern (common interview question)
    public static function getInstance(): self {
        if (self::$instance === null) {
            self::$instance = new self(
                new PDO('pgsql:host=localhost;dbname=app', 'user', 'pass')
            );
        }
        return self::$instance;
    }
    
    // Static methods don't need an instance
    public static function table(string $name): QueryBuilder {
        return new QueryBuilder($name);
    }
    
    // Late static binding (self vs static)
    public static function create(): static {
        return new static(); // resolves to the *calling* class, not the defining class
    }
}`}</code></pre>

      {/* ────────── ERROR HANDLING ────────── */}
      <h2>Error Handling</h2>
      <pre><code>{`// Try-Catch (PHP 5+)
try {
    $result = riskyOperation();
} catch (InvalidArgumentException $e) {
    // Catch specific exception type
    log($e->getMessage());
} catch (RuntimeException | LogicException $e) {
    // Catch multiple types (PHP 8.0+: non-capturing catch)
    handleError($e);
} catch (Throwable $e) {
    // Catches everything — exceptions AND errors
    reportToSentry($e);
} finally {
    // Always runs, regardless of exception
    cleanup();
}

// Custom exceptions
class InsufficientBalanceException extends DomainException {
    public function __construct(
        public readonly float $balance,
        public readonly float $amount,
    ) {
        parent::__construct(
            "Cannot debit \\$" . $amount . " from balance \\$" . $balance
        );
    }
}

// Throwing
function withdraw(float $amount): void {
    if ($this->balance < $amount) {
        throw new InsufficientBalanceException($this->balance, $amount);
    }
    $this->balance -= $amount;
}

// PHP 8.0: throw is now an expression
$user = $this->findUser($id) ?? throw new UserNotFoundException($id);`}</code></pre>

      {/* ────────── SECURITY ────────── */}
      <h2>Security — Critical for Interviews</h2>
      <p>PHP apps are historically targeted. Know these cold.</p>
      <ul>
        <li><b>SQL Injection:</b> NEVER concatenate user input into queries. Use prepared statements.
          <pre><code>{`// BAD — SQL Injection vulnerability
$query = "SELECT * FROM users WHERE id = " . $_GET['id'];

// GOOD — Prepared statement (parameterized query)
$stmt = $pdo->prepare("SELECT * FROM users WHERE id = :id");
$stmt->execute(['id' => $_GET['id']]);`}</code></pre>
        </li>
        <li><b>XSS (Cross-Site Scripting):</b> Always escape output. <code>htmlspecialchars($input, ENT_QUOTES, &apos;UTF-8&apos;)</code>. Templating engines (Blade, Twig) auto-escape with <code>{`{{ $var }}`}</code>.</li>
        <li><b>CSRF (Cross-Site Request Forgery):</b> Include a unique token in every form. Validate it on the server. Laravel does this automatically with <code>@csrf</code>.</li>
        <li><b>Password Hashing:</b> Use <code>password_hash($password, PASSWORD_BCRYPT)</code> and <code>password_verify($input, $hash)</code>. NEVER use MD5 or SHA1.</li>
        <li><b>File Uploads:</b> Validate MIME type server-side (not just the extension), limit file size, store outside webroot, generate random filenames.</li>
      </ul>

      {/* ────────── DATABASE ACCESS ────────── */}
      <h2>Database Access (PDO)</h2>
      <p>PDO (PHP Data Objects) is the standard database abstraction layer. It works with PostgreSQL, MySQL, SQLite, and more.</p>
      <pre><code>{`// Connection
$pdo = new PDO(
    'pgsql:host=localhost;dbname=myapp;port=5432',
    'username',
    'password',
    [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false, // Use real prepared statements
    ]
);

// Prepared statement with named parameters
$stmt = $pdo->prepare("SELECT * FROM users WHERE email = :email AND active = :active");
$stmt->execute(['email' => $email, 'active' => true]);
$user = $stmt->fetch(); // single row
$users = $stmt->fetchAll(); // all rows

// Insert and get last ID
$stmt = $pdo->prepare("INSERT INTO users (name, email) VALUES (:name, :email)");
$stmt->execute(['name' => 'Arvind', 'email' => 'a@b.com']);
$newId = $pdo->lastInsertId();

// Transaction
try {
    $pdo->beginTransaction();
    $pdo->exec("UPDATE accounts SET balance = balance - 100 WHERE id = 1");
    $pdo->exec("UPDATE accounts SET balance = balance + 100 WHERE id = 2");
    $pdo->commit();
} catch (Exception $e) {
    $pdo->rollBack();
    throw $e;
}`}</code></pre>

      {/* ────────── PHP 8 FEATURES ────────── */}
      <h2>Modern PHP 8.x Features</h2>
      <p>If you say &quot;I know PHP&quot; but can&apos;t discuss PHP 8 features, it signals outdated knowledge.</p>
      <pre><code>{`// Named arguments (PHP 8.0)
htmlspecialchars($string, double_encode: false);
// No need to remember parameter order

// Match expression (PHP 8.0) — strict comparison, returns a value
$result = match($status) {
    'active'    => 'User is active',
    'suspended' => 'User is suspended',
    default     => 'Unknown status',
};
// Unlike switch: no fall-through, strict comparison, and it's an expression

// Nullsafe operator (PHP 8.0)
$country = $user?->getAddress()?->getCountry()?->getName();
// Returns null if any step is null (no more nested if-checks)

// Fibers (PHP 8.1) — cooperative multitasking
$fiber = new Fiber(function (): void {
    $value = Fiber::suspend('fiber started');
    echo "Value used: $value";
});
$result = $fiber->start();  // "fiber started"
$fiber->resume('hello');    // "Value used: hello"

// First-class callable syntax (PHP 8.1)
$fn = strlen(...);
array_map(strlen(...), ['hello', 'world']);

// Readonly properties (PHP 8.1) & classes (PHP 8.2)
readonly class Point {
    public function __construct(
        public float $x,
        public float $y,
    ) {}
}
// $point->x = 10; // Error: Cannot modify readonly property

// Disjunctive Normal Form types (PHP 8.2)
function process((Countable&Iterator)|null $input): void { }

// Typed class constants (PHP 8.3)
class Config {
    const string APP_NAME = 'MyApp';
    const int MAX_RETRIES = 3;
}`}</code></pre>

      {/* ────────── DESIGN PATTERNS ────────── */}
      <h2>Design Patterns in PHP</h2>
      <p>Interviewers love asking about patterns. Know at least these four:</p>
      <ul>
        <li><b>Repository Pattern:</b> Abstracts database access behind an interface. The service layer calls <code>UserRepository::findById()</code> instead of writing SQL. Makes it testable — inject a mock repository in tests.</li>
        <li><b>Strategy Pattern:</b> Define a family of algorithms (e.g., payment gateways: Stripe, Razorpay) behind an interface. Swap implementations at runtime without changing the calling code.</li>
        <li><b>Observer Pattern:</b> When an event happens (UserRegistered), notify all subscribers (SendWelcomeEmail, CreateDefaultSettings). Laravel Events are exactly this.</li>
        <li><b>Factory Pattern:</b> Encapsulate object creation logic. Instead of <code>new StripePayment()</code>, call <code>PaymentFactory::create(&apos;stripe&apos;)</code>. Decouples the client from concrete classes.</li>
      </ul>

      {/* ────────── PERFORMANCE ────────── */}
      <h2>Performance Optimization</h2>
      <ul>
        <li><b>OPcache:</b> Caches compiled bytecode. Must be enabled in production. Check with <code>opcache_get_status()</code>.</li>
        <li><b>JIT Compiler (PHP 8.0+):</b> Compiles opcodes to native machine code. Significant gains for CPU-intensive tasks (math, image processing). Minimal improvement for typical I/O-bound web apps.</li>
        <li><b>Preloading (PHP 7.4+):</b> Load framework files into memory at server startup, shared across all requests. Speeds up frameworks like Laravel/Symfony.</li>
        <li><b>Connection Pooling:</b> PHP&apos;s shared-nothing architecture creates a new DB connection per request. Use persistent connections (<code>PDO::ATTR_PERSISTENT</code>) or an external pooler (PgBouncer).</li>
        <li><b>Avoid N+1 queries:</b> Same as in any language. Use eager loading (<code>with()</code> in Eloquent) or batch queries.</li>
        <li><b>Profile with Xdebug or Blackfire:</b> Never guess at bottlenecks — measure.</li>
      </ul>

      {/* ────────── PHP vs NODE.JS ────────── */}
      <h2>PHP vs Node.js — Common Interview Comparison</h2>
      <table>
        <thead><tr><th>Aspect</th><th>PHP</th><th>Node.js</th></tr></thead>
        <tbody>
          <tr><td>Execution Model</td><td>Shared-nothing (each request is isolated)</td><td>Event loop (single process, shared state)</td></tr>
          <tr><td>Concurrency</td><td>Multi-process (php-fpm workers)</td><td>Non-blocking async I/O</td></tr>
          <tr><td>Memory Leaks</td><td>Impossible — memory is freed after each request</td><td>Common — long-running process accumulates state</td></tr>
          <tr><td>Ecosystem</td><td>Composer (packagist.org)</td><td>npm (npmjs.com)</td></tr>
          <tr><td>Best For</td><td>CMS, traditional web apps, shared hosting</td><td>Real-time apps, streaming, microservices</td></tr>
          <tr><td>Hosting</td><td>Runs everywhere (cheapest shared hosting)</td><td>Requires Node.js runtime (VPS/containers)</td></tr>
        </tbody>
      </table>

      <h2>Interview Quick Reference</h2>
      <table>
        <thead><tr><th>Topic</th><th>Key Points to Mention</th></tr></thead>
        <tbody>
          <tr><td>Type System</td><td>Dynamic but supports strict typing (declare(strict_types=1)). Union types, intersection types, enums (PHP 8.1+).</td></tr>
          <tr><td>OOP</td><td>Interfaces, abstract classes, traits for horizontal reuse. Constructor promotion (8.0). Readonly properties (8.1).</td></tr>
          <tr><td>Security</td><td>Prepared statements (PDO), htmlspecialchars for XSS, password_hash/verify, CSRF tokens.</td></tr>
          <tr><td>Performance</td><td>OPcache (always on), JIT compiler (8.0+), preloading (7.4+), php-fpm worker tuning.</td></tr>
          <tr><td>Modern PHP</td><td>Named arguments, match expression, nullsafe operator, fibers, enums, readonly classes.</td></tr>
          <tr><td>Error Handling</td><td>try/catch with Throwable hierarchy. Custom exceptions. Non-capturing catches (8.0).</td></tr>
        </tbody>
      </table>
    </>
  );
}
