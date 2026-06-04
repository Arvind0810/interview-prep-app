export const metadata = { title: "Node.js & NestJS — Interview Prep" };

export default function NodejsPage() {
  return (
    <>
      <h1>Node.js &amp; NestJS</h1>
      <p>You used Node.js to containerize microservices for financial calculators and scoring engines. Expect questions on the event loop, async patterns, and Nest&apos;s DI system.</p>

      {/* ────────── EVENT LOOP ────────── */}
      <h2>The Event Loop — Deep Dive</h2>
      <p>Node is single-threaded but non-blocking. The event loop is what allows Node.js to perform non-blocking I/O operations by offloading operations to the system kernel whenever possible. It runs in phases.</p>
      
      <h3>Phases of the Event Loop</h3>
      <ol>
        <li><b>Timers:</b> Executes callbacks scheduled by <code>setTimeout()</code> and <code>setInterval()</code>.</li>
        <li><b>Pending Callbacks:</b> Executes I/O callbacks deferred to the next loop iteration (e.g., TCP errors).</li>
        <li><b>Idle, Prepare:</b> Used internally only.</li>
        <li><b>Poll:</b> Retrieve new I/O events; execute I/O related callbacks. If the poll queue is empty, it will block here until timers expire or <code>setImmediate()</code> is scheduled.</li>
        <li><b>Check:</b> Executes <code>setImmediate()</code> callbacks.</li>
        <li><b>Close Callbacks:</b> Executes close events, e.g., <code>socket.on(&apos;close&apos;, ...)</code>.</li>
      </ol>

      <h3>Microtasks vs Macrotasks</h3>
      <p>Microtasks run <i>between</i> every phase of the event loop. There are two microtask queues:</p>
      <ol>
        <li><b>Next Tick Queue:</b> <code>process.nextTick()</code>. Highest priority, runs before any other microtasks.</li>
        <li><b>Promise Queue:</b> <code>Promise.resolve().then()</code>. Runs after next ticks but before the event loop continues.</li>
      </ol>

      <pre><code>{`console.log('1');
setTimeout(() => console.log('2 (Timer)'), 0);
setImmediate(() => console.log('3 (Check)'));
process.nextTick(() => console.log('4 (NextTick)'));
Promise.resolve().then(() => console.log('5 (Promise)'));
console.log('6');

// Output order: 
// 1
// 6
// 4 (NextTick)
// 5 (Promise)
// 2 (Timer) or 3 (Check) — order of these two can vary depending on system performance if called in main module.`}</code></pre>

      {/* ────────── ASYNC PATTERNS ────────── */}
      <h2>Async Patterns</h2>
      <ul>
        <li><b>Callbacks</b> — legacy, prone to &quot;callback hell&quot; or &quot;pyramid of doom&quot;. Use <code>util.promisify</code> to wrap them.</li>
        <li><b>Promises</b> — <code>.then()</code>/<code>.catch()</code>, chainable state machines (Pending, Fulfilled, Rejected).</li>
        <li><b>async/await</b> — syntactic sugar over Promises, always prefer for new code. Makes async code look synchronous.</li>
      </ul>
      <pre><code>{`// Run in parallel, fail fast if any errors
const [user, orders] = await Promise.all([
  getUser(id),
  getOrders(id)
]);

// Run all, get individual results even on failure
const results = await Promise.allSettled([task1(), task2()]);
// results[0].status === 'fulfilled' || 'rejected'

// Race — first to finish wins (good for timeouts)
const fastest = await Promise.race([
  fetchData(), 
  new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 5000))
]);

// Any - first to fulfill wins (ignores rejections unless all reject)
const firstSuccess = await Promise.any([ping(server1), ping(server2)]);`}</code></pre>

      {/* ────────── ERROR HANDLING ────────── */}
      <h2>Error Handling Patterns</h2>
      <p>Proper error handling is critical in Node.js — an unhandled error can crash your entire process.</p>

      <h3>Async Error Handling</h3>
      <pre><code>{`// Always wrap async/await in try-catch
async function getUser(id) {
  try {
    const user = await db.findUser(id);
    if (!user) throw new NotFoundError('User not found');
    return user;
  } catch (err) {
    if (err instanceof NotFoundError) throw err;
    throw new InternalError('Failed to fetch user', { cause: err });
  }
}

// Custom error classes (essential for APIs)
class AppError extends Error {
  constructor(message, statusCode = 500, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational; // operational vs programmer error
    Error.captureStackTrace(this, this.constructor);
  }
}

class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, 404);
  }
}

class ValidationError extends AppError {
  constructor(errors) {
    super('Validation failed', 400);
    this.errors = errors;
  }
}

// Global error handler middleware (Express)
app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.isOperational ? err.message : 'Internal server error';
  
  // Log programmer errors with full stack
  if (!err.isOperational) {
    console.error('UNEXPECTED ERROR:', err);
  }
  
  res.status(status).json({ error: message });
});`}</code></pre>

      <h3>Process-Level Error Handling</h3>
      <pre><code>{`// Catch unhandled promise rejections (CRITICAL)
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
  // Log, send to Sentry, then gracefully shut down
  process.exit(1);
});

// Catch uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  // Must exit — process state is unreliable after uncaught exception
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  await server.close();     // stop accepting new connections
  await db.disconnect();    // close DB pool
  process.exit(0);
});`}</code></pre>

      {/* ────────── CORE MODULES ────────── */}
      <h2>Core Modules &amp; Concepts</h2>

      <h3>Streams &amp; Buffers</h3>
      <p>Buffers are raw memory allocations outside the V8 heap, used to process binary data. Streams are abstract interfaces for working with streaming data. They prevent memory exhaustion when reading large files.</p>
      <ul>
        <li><b>Readable:</b> <code>fs.createReadStream</code></li>
        <li><b>Writable:</b> <code>fs.createWriteStream</code></li>
        <li><b>Duplex:</b> Both readable and writable (TCP sockets)</li>
        <li><b>Transform:</b> Duplex stream that modifies data as it is read/written (zlib.createGzip)</li>
      </ul>
      <pre><code>{`// Efficient file copy without loading whole file into memory
const { pipeline } = require('stream/promises');
const fs = require('fs');
const zlib = require('zlib');

await pipeline(
  fs.createReadStream('input.txt'),
  zlib.createGzip(),
  fs.createWriteStream('input.txt.gz')
);

// Transform stream example — process CSV line-by-line
const { Transform } = require('stream');

class CSVParser extends Transform {
  _transform(chunk, encoding, callback) {
    const lines = chunk.toString().split('\\n');
    for (const line of lines) {
      const record = line.split(',');
      this.push(JSON.stringify(record) + '\\n');
    }
    callback();
  }
}

fs.createReadStream('data.csv')
  .pipe(new CSVParser())
  .pipe(fs.createWriteStream('output.json'));`}</code></pre>

      <h3>EventEmitter</h3>
      <p>The core of Node&apos;s event-driven architecture. Much of the Node.js core API is built around an idiomatic asynchronous event-driven architecture.</p>
      <pre><code>{`const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
myEmitter.on('event', (data) => {
  console.log('an event occurred!', data);
});
myEmitter.emit('event', { id: 1 });

// Real-world pattern: Order processing
class OrderProcessor extends EventEmitter {
  async processOrder(order) {
    try {
      await this.chargePayment(order);
      this.emit('payment:success', order);
      
      await this.fulfillOrder(order);
      this.emit('order:fulfilled', order);
    } catch (err) {
      this.emit('order:failed', order, err);
    }
  }
}

const processor = new OrderProcessor();
processor.on('payment:success', (order) => sendReceipt(order));
processor.on('order:fulfilled', (order) => notifyWarehouse(order));
processor.on('order:failed', (order, err) => alertOps(order, err));`}</code></pre>

      <h3>CommonJS vs ES Modules</h3>
      <table>
        <thead><tr><th>CommonJS (CJS)</th><th>ES Modules (ESM)</th></tr></thead>
        <tbody>
          <tr><td><code>require()</code> and <code>module.exports</code></td><td><code>import</code> and <code>export</code></td></tr>
          <tr><td>Synchronous loading</td><td>Asynchronous loading</td></tr>
          <tr><td>Dynamic (can require conditionally)</td><td>Static (imports must be top-level)</td></tr>
          <tr><td>Default in Node.js historically</td><td>Standard in browsers, native in Node.js via <code>.mjs</code> or <code>&quot;type&quot;: &quot;module&quot;</code></td></tr>
        </tbody>
      </table>

      {/* ────────── SECURITY ────────── */}
      <h2>Security Best Practices</h2>
      <ul>
        <li><b>Input Validation:</b> Always validate and sanitize inputs. Use libraries like <code>joi</code>, <code>zod</code>, or <code>class-validator</code> (NestJS). Never trust <code>req.body</code> directly.</li>
        <li><b>SQL/NoSQL Injection:</b> Use parameterized queries (<code>$1</code> placeholders) or ORMs (Prisma, TypeORM). Never concatenate user input into queries.</li>
        <li><b>Rate Limiting:</b> Use <code>express-rate-limit</code> or NestJS&apos;s <code>@nestjs/throttler</code> to prevent brute force attacks.</li>
        <li><b>Helmet:</b> <code>app.use(helmet())</code> sets security HTTP headers (CSP, X-Frame-Options, etc.).</li>
        <li><b>CORS:</b> Be explicit about allowed origins. Never use <code>cors({`{ origin: '*' }`})</code> in production with credentials.</li>
        <li><b>Dependency Auditing:</b> Run <code>npm audit</code> regularly. Use <code>npm audit fix</code> for patching. Consider Snyk for CI/CD.</li>
        <li><b>Environment Variables:</b> Never hardcode secrets. Use <code>.env</code> files locally and secret managers (Vault, AWS Secrets Manager) in production.</li>
      </ul>

      {/* ────────── PERFORMANCE ────────── */}
      <h2>Performance &amp; Scaling</h2>
      
      <h3>Worker Threads vs Child Processes vs Cluster</h3>
      <ul>
        <li><b>Cluster:</b> Spawns multiple Node.js processes that share the same port. Good for scaling web servers across CPU cores. Each process has its own memory and V8 instance.</li>
        <li><b>Child Processes:</b> <code>spawn</code>, <code>exec</code>, <code>fork</code>. Spawns an entirely new process. Good for running external scripts or binaries.</li>
        <li><b>Worker Threads:</b> Threads within the same process. They share memory (via SharedArrayBuffer). Ideal for CPU-intensive JavaScript tasks (crypto, image processing) without blocking the event loop.</li>
      </ul>

      <h3>Memory Limits</h3>
      <p>If your app crashes with <code>FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory</code>, you can increase it via:</p>
      <pre><code>{`node --max-old-space-size=4096 index.js`}</code></pre>

      <h3>Performance Monitoring</h3>
      <pre><code>{`// Built-in performance hooks
const { performance, PerformanceObserver } = require('perf_hooks');

// Measure operation duration
performance.mark('start-db-query');
const result = await db.query('SELECT * FROM users');
performance.mark('end-db-query');
performance.measure('DB Query', 'start-db-query', 'end-db-query');

// Observe measurements
const obs = new PerformanceObserver((items) => {
  items.getEntries().forEach((entry) => {
    console.log(\`\${entry.name}: \${entry.duration}ms\`);
  });
});
obs.observe({ entryTypes: ['measure'] });

// Memory monitoring
const used = process.memoryUsage();
console.log({
  rss: \`\${Math.round(used.rss / 1024 / 1024)} MB\`,      // Total memory
  heapTotal: \`\${Math.round(used.heapTotal / 1024 / 1024)} MB\`, // V8 heap
  heapUsed: \`\${Math.round(used.heapUsed / 1024 / 1024)} MB\`,  // Used heap
  external: \`\${Math.round(used.external / 1024 / 1024)} MB\`,   // C++ objects bound to JS
});`}</code></pre>

      {/* ────────── NESTJS ────────── */}
      <h2>NestJS Core Concepts</h2>
      <p>NestJS is to Node what Spring is to Java — opinionated framework with modules, controllers, providers, decorators, and dependency injection. Built on Express or Fastify.</p>
      
      <h3>Modules, Controllers, Providers</h3>
      <pre><code>{`@Module({
  imports: [DatabaseModule],
  controllers: [CalculatorController],
  providers: [CalculatorService, ScoringEngine],
  exports: [CalculatorService],
})
export class CalculatorModule {}

@Injectable()
export class CalculatorService {
  constructor(@Inject('DB') private db: Database) {}
  async computeEMI(principal: number, rate: number, months: number) {
    // business logic
  }
}

@Controller('calc')
export class CalculatorController {
  constructor(private svc: CalculatorService) {}
  @Get('emi')
  emi(@Query('p') p: number, @Query('r') r: number, @Query('n') n: number) {
    return this.svc.computeEMI(p, r, n);
  }
}`}</code></pre>

      <h3>The Request Lifecycle (Pipes, Guards, Interceptors)</h3>
      <p>Order of execution for an incoming request:</p>
      <ol>
        <li><b>Middleware:</b> Standard Express/Fastify middleware.</li>
        <li><b>Guards:</b> Determine if the request should be handled (Authentication/Authorization). <code>@UseGuards(JwtAuthGuard)</code></li>
        <li><b>Interceptors (pre-controller):</b> Transform the request or bind extra logic before execution.</li>
        <li><b>Pipes:</b> Validate and transform request payloads. <code>@UsePipes(ValidationPipe)</code></li>
        <li><b>Controller Handler:</b> The actual route method.</li>
        <li><b>Interceptors (post-controller):</b> Transform the response.</li>
        <li><b>Exception Filters:</b> Catch errors and format responses globally.</li>
      </ol>

      <h3>Dependency Injection (DI)</h3>
      <p>Nest creates an IoC (Inversion of Control) container. When a class asks for a dependency in its constructor, Nest instantiates it (as a singleton by default) and injects it. This makes testing trivial by injecting mocks.</p>
      <pre><code>{`// Custom Provider example
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: 'secret-key-123', // Can inject values, factories, or classes
    }
  ]
})`}</code></pre>

      {/* ────────── ADVANCED NESTJS ────────── */}
      <h2>Advanced NestJS Patterns</h2>

      <h3>Custom Guards</h3>
      <pre><code>{`@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) return true;
    
    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}

// Custom decorator
const Roles = (...roles: string[]) => SetMetadata('roles', roles);

// Usage
@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {
  @Get('users')
  @Roles('admin', 'super-admin')
  findAllUsers() { /* ... */ }
}`}</code></pre>

      <h3>Custom Interceptors</h3>
      <pre><code>{`// Logging interceptor — measures request duration
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const now = Date.now();
    
    return next.handle().pipe(
      tap(() => {
        console.log(\`\${req.method} \${req.url} — \${Date.now() - now}ms\`);
      }),
    );
  }
}

// Transform response interceptor
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map(data => ({
        success: true,
        data,
        timestamp: new Date().toISOString(),
      })),
    );
  }
}`}</code></pre>

      <h3>Exception Filters</h3>
      <pre><code>{`@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
    });
  }
}`}</code></pre>

      <h3>NestJS Microservices</h3>
      <pre><code>{`// Transport layers — NestJS supports multiple patterns
// TCP, Redis, NATS, MQTT, Kafka, gRPC, RabbitMQ

// Microservice server (TCP example)
const app = await NestFactory.createMicroservice(AppModule, {
  transport: Transport.TCP,
  options: { host: '0.0.0.0', port: 3001 },
});

// Message pattern handler
@Controller()
export class MathController {
  @MessagePattern({ cmd: 'sum' })
  accumulate(data: number[]): number {
    return data.reduce((a, b) => a + b, 0);
  }
  
  @EventPattern('user_created')
  async handleUserCreated(data: { userId: string }) {
    // Event-based: fire-and-forget (no response expected)
    await this.analyticsService.track('user_created', data);
  }
}

// Client calling the microservice
@Injectable()
export class AppService {
  constructor(@Inject('MATH_SERVICE') private client: ClientProxy) {}
  
  async getSum(numbers: number[]) {
    return this.client.send({ cmd: 'sum' }, numbers).toPromise();
  }
}`}</code></pre>

      {/* ────────── FRAMEWORKS ────────── */}
      <h2>Express vs Fastify vs NestJS</h2>
      <table>
        <thead><tr><th>Framework</th><th>Architecture</th><th>Strengths</th><th>Weaknesses</th></tr></thead>
        <tbody>
          <tr><td><b>Express</b></td><td>Unopinionated, minimal</td><td>Huge ecosystem, simple learning curve, industry standard</td><td>Callback-heavy middleware, lacks structure for large apps</td></tr>
          <tr><td><b>Fastify</b></td><td>Schema-driven, highly optimized</td><td>Extremely fast, built-in JSON schema validation, async-await native</td><td>Smaller ecosystem than Express</td></tr>
          <tr><td><b>NestJS</b></td><td>Opinionated, Angular-like</td><td>Excellent for enterprise, strict TypeScript, built-in DI architecture</td><td>Steep learning curve, lots of boilerplate</td></tr>
        </tbody>
      </table>

      {/* ────────── TYPESCRIPT ────────── */}
      <h2>TypeScript Essentials for Node.js</h2>
      <p>NestJS is TypeScript-first. Interviewers expect you to know these TypeScript patterns.</p>
      <pre><code>{`// Utility types you must know
type Partial<T>    // Makes all properties optional
type Required<T>   // Makes all properties required
type Pick<T, K>    // Pick specific properties
type Omit<T, K>    // Remove specific properties
type Record<K, V>  // Key-value map type

// Practical examples
interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

type CreateUserDTO = Omit<User, 'id'>;           // No ID on creation
type UpdateUserDTO = Partial<Omit<User, 'id'>>;   // All fields optional for update
type UserSummary = Pick<User, 'id' | 'name'>;     // Just id and name

// Generics in service patterns
interface Repository<T> {
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  create(data: Partial<T>): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
}

class UserRepository implements Repository<User> {
  async findById(id: string): Promise<User | null> { /* ... */ }
  // ... other methods
}`}</code></pre>
      
      <h2>Interview Quick Reference</h2>
      <table>
        <thead><tr><th>Topic</th><th>Key Points to Mention</th></tr></thead>
        <tbody>
          <tr><td>Event Loop</td><td>Single-threaded, non-blocking, phases (timers, poll, check), nextTick vs setImmediate</td></tr>
          <tr><td>Async Patterns</td><td>Promise.all vs Promise.allSettled, async/await, try/catch</td></tr>
          <tr><td>Error Handling</td><td>Custom error classes, operational vs programmer errors, process.on(&apos;unhandledRejection&apos;), graceful shutdown</td></tr>
          <tr><td>Memory</td><td>V8 heap limits (~1.4GB), buffer, streams for large data to prevent OOM</td></tr>
          <tr><td>Scaling</td><td>Cluster (multi-process) vs Worker Threads (multi-thread for CPU bound tasks)</td></tr>
          <tr><td>Security</td><td>Input validation (zod/joi), helmet, rate limiting, parameterized queries, CORS</td></tr>
          <tr><td>NestJS DI</td><td>IoC container, singletons by default, easy mocking for tests, modules encapsulate scope</td></tr>
          <tr><td>NestJS Lifecycle</td><td>Middleware → Guards → Interceptors → Pipes → Controller → Filters</td></tr>
          <tr><td>NestJS Advanced</td><td>Custom guards/decorators, interceptors for logging/transform, microservice transports (TCP, Redis, Kafka)</td></tr>
        </tbody>
      </table>
    </>
  );
}
