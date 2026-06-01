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
);`}</code></pre>

      <h3>EventEmitter</h3>
      <p>The core of Node&apos;s event-driven architecture. Much of the Node.js core API is built around an idiomatic asynchronous event-driven architecture.</p>
      <pre><code>{`const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
myEmitter.on('event', (data) => {
  console.log('an event occurred!', data);
});
myEmitter.emit('event', { id: 1 });`}</code></pre>

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
      
      <h2>Interview Quick Reference</h2>
      <table>
        <thead><tr><th>Topic</th><th>Key Points to Mention</th></tr></thead>
        <tbody>
          <tr><td>Event Loop</td><td>Single-threaded, non-blocking, phases (timers, poll, check), nextTick vs setImmediate</td></tr>
          <tr><td>Async Patterns</td><td>Promise.all vs Promise.allSettled, async/await, try/catch</td></tr>
          <tr><td>Memory</td><td>V8 heap limits (~1.4GB), buffer, streams for large data to prevent OOM</td></tr>
          <tr><td>Scaling</td><td>Cluster (multi-process) vs Worker Threads (multi-thread for CPU bound tasks)</td></tr>
          <tr><td>NestJS DI</td><td>IoC container, singletons by default, easy mocking for tests, modules encapsulate scope</td></tr>
          <tr><td>NestJS Lifecycle</td><td>Middleware → Guards → Interceptors → Pipes → Controller → Filters</td></tr>
        </tbody>
      </table>
    </>
  );
}
