# Day 3

## Build a "Mini-Zapier" Automation Platform (Step by Step)

The following steps will guide you through creating a workflow automation SaaS platform (a simplified version of Zapier), with subscriptions, workflow creation, software integration (multi-step), database logging, and payments split with Stripe Connect. **Each step builds the functionality, layer by layer**.

---

### 1. **Authentication (Login/Register)**

- Implement a login and register system (you may use [Clerk](https://clerk.dev/) for authentication, or roll your own with Express + bcrypt, etc).
- Store user data (name, email, password hash, subscription status) in the database.
- After login/register, the user lands on their dashboard.

---

### 2. **Workflow Creation**

- On the dashboard, users can create new workflows.
- User must choose:
  - **2 Step Workflow:** Integrate 2 software platforms.
  - **3 Step Workflow:** Integrate 3 software platforms.
- Add UI controls for selecting step count (radio buttons, toggle, etc).

---

### 3. **Integration Setup (Software Connectors)**

- Support connecting the following software (for both 2-step and 3-step workflows):
  - Stripe
  - Clerk
  - Cal.com
  - Groq
  - Resend.com
  - Notion
  - Airtable
- After the user chooses a workflow type, display **dropdowns** for each step to select a software to integrate.
- For each software selected, show further dropdowns or inputs to configure necessary connection details (e.g. API keys, webhook URLs, what triggers what, etc).
  - Example: If user selects Stripe & Notion, display Stripe triggers/actions & Notion actions.

---

### 4. **Persist Workflows & Logs**

- When a user saves a workflow, store the following in the database:
  - workflow id, user id, step count (2 or 3), software selections, config options for each step.
- Each time a workflow runs, **log the result** (success/failure, data exchanged, timestamp, etc) into a `workflow_logs` table in the database.

---

### 5. **Subscription Billing ($99/month)**

- Users must pay **$99/month** to activate workflow automation.
- Integrate Stripe billing checkout/subscriptions UI.
- Store subscription status and Stripe customer id in database.

---

### 6. **Stripe Connect Revenue Split (50/50)**

- Add **Stripe Connect** so that 50% of the $99/mo fee is paid out to the user B Stripe account.
  - When a user subscribes, collect their connected Stripe Account ID.
  - On successful payment, split payment: $49.50 to platform, $49.50 to connected account.

---

### 7. **Frontend User Interface**

- Build simple, intuitive UI for:
  - Auth (login/register)
  - Dashboard (list/create workflows)
  - Workflow builder (step selection, software dropdowns, config UI)
  - Subscription/payment status & Stripe Connect onboarding
  - View workflow logs/history

---

- Add email notifications with [Resend.com] for workflow success/failures.
- Add admin UI to view all workflows, transactions, users.
