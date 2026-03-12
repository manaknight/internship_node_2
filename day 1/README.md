**Day 1**

# Foundations
- Understand Node.js as a JavaScript runtime built on Chrome's V8 engine, enabling server-side JavaScript.

- Know the fundamentals of asynchronous programming, including callbacks, promises, and async/await.

- Grasp the concept of non-blocking I/O and event-driven architecture in Node.js.

- Be familiar with the Node.js module system (CommonJS), npm (Node package manager), and package.json.

- Understand Express.js as a minimal and flexible Node.js web application framework.

- Learn how to create an Express server and set up basic routing (handling HTTP GET, POST, etc.).

- Know how to use middleware in Express for tasks like logging, parsing requests, error handling, and authentication.

- Be aware of handling request and response objects in Express.

- Understand the importance of error handling in both Node.js and Express.

- Get the basics of environment variables and simple configuration management.

- Understand RESTful API principles as commonly implemented with Express.

- Have a high-level awareness of security best practices (e.g., input validation, using Helmet, avoiding vulnerabilities).

- Know about handling static files and simple templating in Express apps.

# Tasks
DO NOT USE AI CODING SO YOU UNDERSTAND THE CONCEPTS

## Task 1: Express.js Server Setup
**Objective:** Create a basic Express.js server structure to demonstrate Node.js runtime capabilities.

**Requirements:**
- Initialize a new npm project with `package.json`
- Install Express.js as a dependency
- Create a basic Express server that listens on port 3000
- Implement a single GET route at `/` that returns "Hello World"
- Add proper error handling for server startup

**Challenge:** What happens if you try to start the server without installing Express? What error do you get and why?

**Learning Outcome:** Understand how Node.js uses npm to manage dependencies and how Express provides a web framework on top of Node.js.

---

## Task 2: Node.js Runtime Fundamentals
**Objective:** Demonstrate understanding of Node.js as a V8-based JavaScript runtime for server-side development.

**Requirements:**
- Create a script that shows the difference between browser JavaScript and Node.js environment
- Use Node.js global objects (`process`, `global`, `__dirname`, `__filename`)
- Demonstrate file system operations using Node.js built-in modules
- Show how Node.js handles command line arguments

**Challenge:** Try to use `window` or `document` objects in a Node.js script. What happens and why?

**Learning Outcome:** Recognize that Node.js enables server-side JavaScript execution with different global objects and APIs than browsers.

---

## Task 3: Asynchronous Programming Patterns
**Objective:** Implement and compare callbacks, promises, and async/await patterns.

**Requirements:**
- Create three versions of the same async operation (file reading) using:
  - Callback pattern
  - Promise pattern
  - Async/await pattern
- Implement proper error handling in each approach
- Demonstrate callback hell vs. promise chains vs. async/await readability

**Challenge:** Create a scenario where callback hell becomes unmanageable (nested async operations) and refactor it using promises and async/await.

**Learning Outcome:** Master asynchronous programming fundamentals and understand why modern JavaScript prefers promises/async-await over callbacks.

---

## Task 4: Non-blocking I/O and Event-Driven Architecture
**Objective:** Build examples that demonstrate Node.js's non-blocking I/O capabilities.

**Requirements:**
- Create a server that handles multiple concurrent requests without blocking
- Implement file upload/download operations that don't block the event loop
- Use `setTimeout` and `setInterval` to demonstrate event scheduling
- Show how Node.js handles I/O operations asynchronously

**Challenge:** Write synchronous file operations and compare performance with async versions under concurrent load. What weakness does synchronous I/O expose?

**Learning Outcome:** Understand how Node.js's event-driven, non-blocking architecture enables high concurrency and scalability.

---

## Task 5: Module System and Package Management
**Objective:** Effectively use CommonJS modules, npm, and package.json for project organization.

**Requirements:**
- Create multiple modules with exports/imports
- Set up package.json with proper scripts, dependencies, and devDependencies
- Use npm to install and manage packages
- Implement module caching and circular dependency handling
- Create a custom module and publish it locally

**Challenge:** Create a circular dependency between modules. What happens and how can it be avoided?

**Learning Outcome:** Master Node.js module system and npm ecosystem for building modular, maintainable applications.

---

## Task 6: Express.js Framework Concepts
**Objective:** Explain and demonstrate Express.js as a minimal, flexible web application framework.

**Requirements:**
- Compare Express with plain Node.js HTTP server
- Show Express middleware chain concept
- Implement custom middleware
- Demonstrate Express routing flexibility
- Create an Express app that serves different content types

**Challenge:** Build the same API endpoint using plain Node.js HTTP module vs Express. Compare code complexity and maintainability.

**Learning Outcome:** Understand why Express simplifies web development while remaining minimal and unopinionated.

---

## Task 7: Express Routing and HTTP Methods
**Objective:** Implement Express server with comprehensive routing for GET, POST, PUT, DELETE operations.

**Requirements:**
- Create routes for all HTTP methods (GET, POST, PUT, DELETE)
- Implement route parameters (`/users/:id`) and query parameters (`/users?name=john`)
- Set up route handlers with proper status codes
- Handle different content types (JSON, text, HTML)
- Implement route middleware for specific paths

**Challenge:** Create a route that accepts POST data but doesn't parse it properly. What happens when clients send JSON data?

**Learning Outcome:** Master Express routing patterns and understand HTTP method semantics for RESTful APIs.

---

## Task 8: Express Middleware Implementation
**Objective:** Use middleware for logging, request parsing, error handling, and authentication.

**Requirements:**
- Implement logging middleware (Morgan or custom)
- Add body parsing middleware for JSON and URL-encoded data
- Create authentication middleware using headers
- Build error handling middleware
- Set up CORS middleware for cross-origin requests
- Implement rate limiting middleware

**Challenge:** Remove body parsing middleware and try to access `req.body` in a POST route. What weakness does this expose?

**Learning Outcome:** Understand middleware chain execution and how it enables modular request processing in Express apps.

---

## Task 9: Request/Response Object Handling
**Objective:** Properly handle request and response objects in Express applications.

**Requirements:**
- Access and manipulate request headers, query parameters, route parameters
- Work with request body in different formats (JSON, form data, files)
- Set response headers, status codes, and content types
- Implement proper response formatting (JSON, HTML, redirects)
- Handle request/response streaming for large data

**Challenge:** Try to set response headers after calling `res.send()`. What happens and why?

**Learning Outcome:** Master Express request/response object APIs and understand HTTP protocol fundamentals.

---

## Task 10: Error Handling Strategies
**Objective:** Implement comprehensive error handling in Node.js and Express applications.

**Requirements:**
- Create synchronous error handling with try/catch
- Implement async error handling with promises and async/await
- Build Express error handling middleware
- Handle uncaught exceptions and unhandled promise rejections
- Implement graceful server shutdown on errors
- Create custom error classes and error responses

**Challenge:** Remove all error handling from an async operation. What happens when the operation fails?

**Learning Outcome:** Understand error propagation patterns and implement robust error handling for production applications.

---

## Task 11: Environment Variables and Configuration
**Objective:** Use environment variables for configuration management in Node.js applications.

**Requirements:**
- Set up environment variables for different environments (development, production)
- Use `process.env` to access configuration
- Implement configuration validation
- Create `.env` files with `dotenv` package
- Handle sensitive configuration (API keys, database credentials)
- Implement configuration hierarchies (defaults, environment overrides)

**Challenge:** Hardcode sensitive information in your code. What security weakness does this create?

**Learning Outcome:** Master environment-based configuration for secure, environment-specific application settings.

---

## Task 12: RESTful API Design Principles
**Objective:** Build a RESTful API following proper design principles with Express.

**Requirements:**
- Implement proper resource naming (`/users`, `/users/:id`)
- Use correct HTTP status codes (200, 201, 404, 500, etc.)
- Handle CRUD operations with appropriate methods
- Implement proper response formats and error messages
- Add API versioning (`/api/v1/users`)
- Include pagination, filtering, and sorting
- Document API endpoints

**Challenge:** Create inconsistent API responses (sometimes JSON, sometimes HTML). What usability issues does this create?

**Learning Outcome:** Understand REST architectural constraints and build consistent, maintainable APIs.

---

## Task 13: Security Best Practices Implementation
**Objective:** Implement security best practices including Helmet, input validation, and vulnerability prevention.

**Requirements:**
- Add Helmet middleware for security headers
- Implement input validation and sanitization
- Protect against common vulnerabilities (XSS, CSRF, injection)
- Use HTTPS and secure cookies
- Implement authentication and authorization
- Add rate limiting and request size limits
- Handle sensitive data exposure

**Challenge:** Create an endpoint that accepts unsanitized user input and displays it. What security vulnerability does this introduce?

**Learning Outcome:** Recognize common web security threats and implement defensive programming practices.

---

## Task 14: Static Files and Templating
**Objective:** Serve static files and implement basic templating in Express applications.

**Requirements:**
- Serve static assets (CSS, JS, images) using `express.static`
- Implement basic templating with EJS or Handlebars
- Create dynamic HTML pages with data
- Handle file uploads and downloads
- Implement caching headers for static assets
- Set up proper MIME types and content negotiation

**Challenge:** Try to serve a large file without streaming. What performance issues occur?

**Learning Outcome:** Understand how Express handles static content and basic server-side templating for dynamic web pages.

---

# MySQL Mastery Tasks

## Task 15: MySQL Database Setup and Connection
**Objective:** Set up MySQL database and establish connection from Node.js application.

**Requirements:**
- Install and configure MySQL server locally
- Create database schema with multiple related tables
- Set up connection pooling with mysql2 package
- Implement connection error handling and reconnection logic
- Create database migration scripts

**Challenge:** Configure connection without proper error handling. What happens when the database server goes down?

**Learning Outcome:** Master database connectivity and understand connection lifecycle management.

---

## Task 16: Complex Multi-Table JOIN Operations
**Objective:** Write complex JOIN queries that combine data from multiple related tables.

**Requirements:**
- Create queries with INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL OUTER JOIN
- Handle many-to-many relationships with junction tables
- Implement self-joins for hierarchical data
- Optimize join performance with proper indexing
- Handle NULL values in join conditions

**Challenge:** Write a query that finds all employees who work in departments located in cities where no other departments exist, using only JOINs (no subqueries).

**Learning Outcome:** Master complex relational data retrieval and understand join optimization strategies.

---

## Task 17: Advanced Subqueries and Derived Tables
**Objective:** Implement sophisticated subquery patterns that challenge query optimization.

**Requirements:**
- Write correlated subqueries in SELECT, WHERE, and HAVING clauses
- Create derived tables and common table expressions (CTEs)
- Implement EXISTS and NOT EXISTS clauses
- Handle subquery performance issues
- Convert subqueries to JOINs for optimization

**Challenge:** Find all products that have been ordered more times than the average number of orders per product, without using aggregate functions in subqueries.

**Learning Outcome:** Understand subquery execution and optimization, mastering correlated vs uncorrelated patterns.

---

## Task 18: Window Functions and Analytical Queries
**Objective:** Use window functions to perform complex analytical operations.

**Requirements:**
- Implement ROW_NUMBER(), RANK(), DENSE_RANK() functions
- Use PARTITION BY and ORDER BY clauses effectively
- Create running totals and moving averages with window frames
- Implement LAG() and LEAD() for time-series analysis
- Handle complex window frame specifications

**Challenge:** Calculate the percentage change in sales for each product compared to the previous month, partitioned by product category, showing only products with declining sales.

**Learning Outcome:** Master analytical SQL patterns and understand window function performance characteristics.

---

## Task 19: Recursive CTEs and Hierarchical Data
**Objective:** Handle hierarchical and recursive data structures using Common Table Expressions.

**Requirements:**
- Build recursive CTEs for organizational charts
- Implement bill-of-materials calculations
- Handle tree traversal algorithms in SQL
- Create adjacency list vs nested set model queries
- Optimize recursive query performance

**Challenge:** Find all employees who report (directly or indirectly) to a specific manager, and calculate the depth of each reporting relationship in the hierarchy.

**Learning Outcome:** Understand recursive SQL patterns and hierarchical data modeling.

---

## Task 20: Complex Aggregation and Grouping Sets
**Objective:** Perform sophisticated grouping and aggregation operations.

**Requirements:**
- Use GROUPING SETS, CUBE, and ROLLUP operators
- Implement conditional aggregation with CASE statements
- Handle multiple grouping levels simultaneously
- Create pivot-style queries without PIVOT operator
- Optimize aggregation performance

**Challenge:** Create a sales report showing totals by month, quarter, and year for each product category, including subtotals and grand totals, using only standard SQL features.

**Learning Outcome:** Master advanced aggregation patterns and understand GROUP BY extensions.

---

## Task 21: Query Optimization and Execution Plans
**Objective:** Analyze and optimize query performance using execution plans.

**Requirements:**
- Read and interpret EXPLAIN output
- Identify and create appropriate indexes
- Understand index selectivity and cardinality
- Optimize JOIN order and algorithms
- Handle query hints and optimizer directives

**Challenge:** Optimize a query that joins 5 tables with millions of rows each, ensuring sub-second response time without creating unnecessary indexes.

**Learning Outcome:** Understand query execution internals and indexing strategies.

---

## Task 22: Transactions and Concurrency Control
**Objective:** Implement ACID transactions and handle concurrency scenarios.

**Requirements:**
- Use transaction isolation levels (READ UNCOMMITTED, SERIALIZABLE)
- Handle deadlock scenarios and resolution
- Implement optimistic vs pessimistic locking
- Create savepoints and nested transactions
- Handle distributed transactions

**Challenge:** Implement a bank transfer system where two accounts transfer money simultaneously, ensuring no money is lost or duplicated under high concurrency.

**Learning Outcome:** Master transactional consistency and understand concurrency control mechanisms.

---

## Task 24: Advanced Query Patterns (The Ultimate SQL Challenge)
**Objective:** Solve complex real-world problems requiring multiple advanced SQL concepts.

**Requirements:**
- Combine window functions with recursive CTEs
- Implement complex business logic in single queries
- Handle time-series analysis with gaps and irregularities
- Create queries that perform statistical calculations
- Implement fuzzy matching and similarity searches

**Challenge:** Find the most profitable product category for each month, considering seasonal trends, promotional discounts, and customer demographics, then predict next month's performance using historical patterns.

**Learning Outcome:** Achieve SQL mastery by combining all concepts into practical, production-ready solutions.

---

## Task 25: Database Design and Normalization
**Objective:** Design and implement properly normalized database schemas.

**Requirements:**
- Apply 1NF, 2NF, 3NF, and BCNF normalization
- Handle denormalization for performance optimization
- Design star and snowflake schemas for analytics
- Implement data integrity constraints
- Create efficient indexing strategies

**Challenge:** Design a database schema for a complex e-commerce platform that handles products, categories, orders, inventory, reviews, and customer analytics while maintaining data integrity.

**Learning Outcome:** Understand database design principles and normalization trade-offs.
