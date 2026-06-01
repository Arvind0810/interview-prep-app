export const metadata = { title: "Node.js & NestJS — Interview Prep" };

export default function NodejsPage() {
  return (
    <>
      <h1>Node.js &amp; NestJS</h1>
      <p>You used Node.js to containerize microservices for financial calculators and scoring engines. Expect questions on the event loop, async patterns, and Nest&apos;s DI system.</p>

      <h2>The Event Loop</h2>
      <p>Node is single-threaded but non-blocking. The event loop has phases: <i>timers → pending callbacks → idle/prepare → poll → check → close callbacks</i>. <code>process.nextTick()</code> runs before any I/O, <code>setImmediate()</code> runs in the check phase.</p>
      <pre><code>{`console.log('1');
setTimeout(() => console.log('2'), 0);
setImmediate(() => console.log('3'));
process.nextTick(() => console.log('4'));
Promise.resolve().then(() => console.log('5'));
console.log('6');
// Order: 1, 6, 4, 5, 2, 3 (timer vs immediate order can vary)`}</code></pre>

      <h2>Async Patterns</h2>
      <ul>
        <li><b>Callbacks</b> — legacy, prone to &quot;callback hell&quot;</li>
        <li><b>Promises</b> — <code>.then()</code>/<code>.catch()</code>, chainable</li>
        <li><b>async/await</b> — sugar over Promises, always prefer for new code</li>
        <li><b>Streams</b> — for large files / pipelines, support backpressure</li>
        <li><b>EventEmitter</b> — pub/sub within process</li>
      </ul>
      <pre><code>{`// Run in parallel, fail fast if any errors
const [user, orders, profile] = await Promise.all([
  getUser(id),
  getOrders(id),
  getProfile(id),
]);

// Run all, get individual results even on failure
const results = await Promise.allSettled([...]);

// Race — first to finish wins
const fastest = await Promise.race([primary(), fallback()]);`}</code></pre>

      <h2>NestJS Core Concepts</h2>
      <p>NestJS is to Node what Spring is to Java — opinionated framework with modules, controllers, providers, decorators, and dependency injection. Built on Express or Fastify.</p>
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

      <h3>Pipes, Guards, Interceptors</h3>
      <ul>
        <li><b>Pipes</b> — validate/transform input (<code>ValidationPipe</code> with class-validator)</li>
        <li><b>Guards</b> — auth checks (<code>@UseGuards(JwtAuthGuard)</code>)</li>
        <li><b>Interceptors</b> — transform response, log, cache</li>
        <li><b>Filters</b> — handle exceptions globally</li>
      </ul>

      <h2>Performance &amp; Scaling</h2>
      <ul>
        <li>Use <code>cluster</code> module or PM2 to use all CPU cores</li>
        <li>Don&apos;t block the event loop — offload heavy CPU to worker threads</li>
        <li>Stream large responses instead of buffering</li>
        <li>Use connection pools (pg, mongoose, redis) — don&apos;t open per request</li>
      </ul>

      <h2>Express vs Fastify vs NestJS</h2>
      <table>
        <thead><tr><th>Framework</th><th>Use case</th></tr></thead>
        <tbody>
          <tr><td>Express</td><td>Minimal, mature, biggest ecosystem</td></tr>
          <tr><td>Fastify</td><td>2x throughput vs Express, schema-based validation</td></tr>
          <tr><td>NestJS</td><td>Enterprise structure, DI, microservices abstractions</td></tr>
        </tbody>
      </table>
    </>
  );
}
