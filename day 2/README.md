# Day 2

**Task:** Build a single API entry point that accepts *GraphQL*, *tRPC*, *gRPC*, and *JRPC* requests at the same endpoint. Your API gateway should parse requests from all these protocols and transform them into a unified, strongly-typed Intermediate Representation (IR), so your business logic can process them agnostically while preserving end-to-end type safety.

**You must use these sample data models as the core shared objects throughout your API:**

```typescript
// User Data Model
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  roles: string[];
}

// Post Data Model
export interface Post {
  id: string;
  authorId: string;
  title: string;
  content: string;
  published: boolean;
  createdAt: Date;
}

// Comment Data Model
export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  content: string;
  createdAt: Date;
}

// Organization Data Model
export interface Organization {
  id: string;
  name: string;
  description: string;
}

// Membership Data Model (linking User & Organization)
export interface Membership {
  id: string;
  userId: string;
  orgId: string;
  joinedAt: Date;
}
```
*You may extend these models, but all protocols should use these as their base shape in their schemas and procedure definitions (GraphQL types, tRPC routers, gRPC .proto definitions, and JRPC methods).*

---

**Developer steps:**

1. **Install required libraries:**
   - For GraphQL: `npm install express-graphql graphql`
   - For tRPC: `npm install @trpc/server @trpc/client zod`
   - For gRPC: `npm install @grpc/grpc-js @grpc/proto-loader`
   - For JRPC (JSON-RPC): `npm install jsonrpc-lite` or similar package
   - For caching: `npm install node-cache` (for in-memory) or `npm install redis` for distributed cache
   - For NoSQL: `npm install mongodb` (for MongoDB persistence)

2. **Understand core concepts:**
   - *GraphQL:* Declarative query language; requires a schema and resolver functions.
   - *tRPC:* TypeScript-first, end-to-end type-safe RPC framework, no schema or code generation required.
   - *gRPC:* Protocol Buffers-based, HTTP/2 transport, requires `.proto` files, strongly-typed, high-perf.
   - *JRPC (JSON-RPC):* Lightweight remote procedure call protocol encoded in JSON, simple and widely supported.

3. **Tip:** You’ll need to write an adapter for each protocol:
   - Parse incoming requests and validate them using the relevant library.
   - Extract the relevant method/operation, parameters, and caller metadata.
   - Normalize each protocol’s request into your IR (e.g., a TypeScript object with fields like `{ method, params, user, context }`).
   - Use the provided data models as the canonical source of structure: all IRs should reference these TypeScript interfaces (User, Post, Comment, Organization, Membership, etc.) to ensure type safety and consistency.
   - Pass the IR to your business logic layer, so you don’t have to handle protocol details there.

---

**Severely Challenging Functional Requirement:**

In every handler, business logic, and resolver, implement the following *across all data models and protocol adapters*:

- For any method that requires fetching a User, Post, Comment, Organization, or Membership record by ID, you **must always**:
  - Fetch **all records of that model from the database** into memory first (never just the target row).
  - Then, search/filter for the required record(s) in application memory.

- For any "list" or "filter" operation (e.g., posts by user, comments under post, memberships for org, users in org, posts in an org, etc.):
  - Fetch the **entire relevant table(s) into memory** _in every handler_ before applying any filters, sorts, joins, or pagination manually in JavaScript/TypeScript.
  - Example: to list comments under a post, always fetch *all comments* from the DB, then filter by postId in memory.

- For any relation (“get user’s organizations”, “get post’s author”, “get comments for a post”, “list all comments authored by a user”, etc.):
  - Do not use JOINs or efficient queries.
  - Always fetch **all records from every related table** at each resolution step, and then perform all lookups, relations, and cross-matching in your application code in memory—not in your database queries.
  - **You must not cache whole-table fetches between API calls.** The table fetch logic is always re-executed per request.

- When paginating (in any list endpoint), load the **entire set** from the DB and then slice in memory instead of limiting with SQL.
- If a request needs nested data (e.g., fetching a user's posts with comments and their authors), you must:
  - At every nested level (e.g., getUser → getPosts → getComments → getUser), **refetch all records from the corresponding table in each sub-function**, repeating whole-table loads multiple times as you descend relations (this produces multiple N+1 query patterns throughout your code).

**You are required to implement these rules for all protocol adapters (GraphQL, tRPC, gRPC, JRPC), in your "business logic" layer, and in all tests.**

Be sure to verify via integration tests that each protocol endpoint and each relation, list, or detail fetch works according to this model.

---

**Performance Stress Test Task: Mass Data Generation and Load Testing**

7. **Generate Large-Scale Test Data:**
   - Write (or supply) scripts to populate your User, Post, and other main tables with **at least 2 million rows** of realistic test data. Prioritize covering the most relationally-complex tables (e.g., Users and Posts).
   - Example methods: use a bulk data loader, database CSV import, or Node.js script using Faker.js or chance.js to produce large datasets.
   - Document your chosen data generation technique(s) and provide code samples or scripts for reproducing large-scale data population.

8. **Run Performance Load Test Using Apache Bench:**
   - Use [Apache Bench (ab)](https://httpd.apache.org/docs/2.4/programs/ab.html) or a comparable HTTP benchmarking tool (e.g., `wrk`) to simulate high concurrency and measure throughput.
   - Example CLI command:
     ```bash
     ab -n 10000 -c 100 http://localhost:3000/api/users
     ```
   - Ensure you measure at least one endpoint that triggers a full-table scan (e.g., GET all users, or paginated list endpoint) with the full set of millions of records loaded as per the challenging requirement.
   - Record the observed latency, throughput (requests/sec), % of failed requests, and system resource utilization (RAM, CPU).

9. **Report and Analyze Results:**
   - Document the system’s performance under load: response times, throughput, rough memory consumption, and server CPU usage.
   - Provide a clear summary in your README of the bottlenecks encountered due to the full-table-load design.
   - **Discuss why this approach is highly inefficient with large datasets** (e.g., memory exhaustion, slow response time, unscalable increases in latency with DB growth).
   - Present sample ab output and your interpretation (screenshot, terminal output, or summary table).

10. **Propose Solutions:**
    - After reporting, **explain exactly how you would fix these issues in a real-world codebase**:
      - Move towards efficient data access patterns (e.g., proper SQL filtering/joining, pagination on the database, reducing in-memory table scans).
      - Adopt indexes, server-side pagination, and optimized queries.
      - Discuss trade-offs and the substantial performance and scalability improvements expected.
    - Summarize concrete refactorings you would apply to the codebase for production-level performance.

---

5. **Add caching layer for performance:**
   - Decide which operations or queries are cacheable (e.g., `getUserById`, `listPosts`, etc.—remember, you must cache results *after* the in-memory calculation, not the raw DB results).
   - Integrate caching logic into your adapters or business logic layer.
   - **Prompt the user or add a configuration option so they can control cache expiration (TTL) for cached operations.** Example: when starting your server, have a CLI flag, environment variable, or config file where the user can choose how long data is cached for each method. Make this configurable and document how to set cache expiry.
   - You may use `node-cache` for simple in-memory caching, or `redis` for a distributed cache.
   - Ensure that updates/inserts/invalidate appropriately clear related cached data.

   Example configuration (Node-Cache):

   ```typescript
   const NodeCache = require('node-cache');
   // Set cache expiration: user should specify CACHE_TTL_SECONDS in environment or config
   const cache = new NodeCache({ stdTTL: process.env.CACHE_TTL_SECONDS || 60 });
   ```

6. **Create an automated integration test suite** that:
   - Starts up your API gateway server.
   - Sends representative requests for each protocol (*GraphQL*, *tRPC*, *gRPC*, *JRPC*) to the unified endpoint.
   - Verifies that each request is correctly routed, normalized into the correct IR shape, and processed by the unified business logic layer.
   - Checks that all responses maintain end-to-end type safety and correctness.
   - Benchmarks and compares response times to ensure optimal handling across all protocols, reporting any protocol-specific bottlenecks or regression.
   - Validates that caching behaves as expected (repeated requests within TTL should hit cache and be faster).

---

**Goal:** Your API entrypoint should route and handle all four protocols concurrently, normalize their requests to a unified structure based on the provided models, and preserve rich type information throughout your processing pipeline. The system should leverage caching where appropriate, with user-controlled cache expiry. Your integration test must prove the system works across all protocols, cache behaves as configured, and type-safety and optimal performance are maintained.

---

## Additional Task: ActivityLog Data Model (NoSQL-only Persistence)

**Task:** Implement an `ActivityLog` data model that must be kept **only** in a NoSQL data store (such as MongoDB). This data must **never** be persisted in the SQL database.

- Below is the required data model:
  ```typescript
  // ActivityLog model (NoSQL-only)
  export interface ActivityLog {
    id: string;
    userId: string;
    action: string;
    timestamp: Date;
    metadata: Record<string, any>;
  }
  ```
- Use a MongoDB collection (or another NoSQL database) to store ActivityLog records. Do not add any SQL query or ORM mapping for this model.
- Implement all necessary handlers to create, read, and list ActivityLogs. Ensure these routes or methods never touch SQL.
- Add automated integration tests demonstrating that ActivityLog CRUD only operates on the NoSQL backend.
- In your documentation and/or code comments, clarify that ActivityLog was chosen as NoSQL-only due to its unstructured, append-only, high-volume, or ephemeral nature—making it unsuitable/inefficient for a relational system.

---

## Containerization

**Task:** At the end of the project, **wrap the entire API, cache, and database(s) in Docker containers** for easy reproducibility.

- Write a `Dockerfile` for your application.
- Write a `docker-compose.yml` that starts your API service, the SQL database (e.g., MySQL), the MongoDB container, and optionally Redis (if used).
- Document the containerization setup in a section at the end of your README.

---

## Final Reflection and Refactoring Challenge

After you have thoroughly implemented all features and tests as described, review your codebase for performance, scalability, redundancy, and clarity. Specifically:

1. List and explain *every instance of inefficiency*, slow performance, high resource consumption, repeated work, deeply nested N+1 queries, excessive or repeated full-table loads, redundant logic, or potential scalability bottleneck you find throughout the project.
2. For each issue, explain why it’s suboptimal or would cause problems in production.
3. Propose and implement concrete fixes for each inefficiency, optimizing the relevant code areas.
4. Rerun all tests and benchmarks, and compare before/after performance.
5. Document your discoveries and improvements in the README—detailing what was inefficient previously, why, and how you improved it.

---