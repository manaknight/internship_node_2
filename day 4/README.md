# Day 4

## Day 4: AI-Driven Collaborative Chatbot with Lottery System

### Overview

This project builds an end-to-end chatbot web app that:
- Calls an AI (like OpenAI API or local LLM) to answer user queries.
- Responds with its planned steps for answering the query before executing, allowing user intervention.
- Updates/changes its plan based on user feedback.
- Broadcasts admin/user/AI messages to all connected chat participants.
- Awards lottery points for every message sent.
- Draws a lottery winner each Friday and announces the prize in cash.
- Supports high-load performance, stress-tested up to 100k reqs/min.

---

### Design & Plan

#### 1. Stack

- **Backend:** Node.js (Express), WebSocket (Socket.io), MySQL
- **Frontend:** React
- **AI Integration:** OpenAI API (`/plan` and `/answer` endpoints)
- **Lottery:** server-side points logic, cron job for winner

---

#### 2. Flow Diagram

```
User → (Frontend) → /plan (AI: Propose Plan)
        ↓                ↑
   Accept/Reject       If accepted → /answer (AI: Execute Plan)
        ↓                ↑
     New Plan?        If rejected → /plan (with feedback)
        ↓
 Message broadcast via sockets
        ↓
 All clients get message (+ lottery points)
```

---

#### 3. Essential Code Snippets

##### **Backend API (Express + Socket.io) - `server.js`**

```js
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const { Configuration, OpenAIApi } = require('openai');
const cron = require('node-cron');
const db = require('./database/db'); // your connection/query helper

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }));

// -- User sends a message: Step 1: Generate a step-wise plan
app.post('/plan', async (req, res) => {
  const { userId, message } = req.body;
  // For illustration. You may want to include prior chat context for AI
  const response = await openai.createChatCompletion({
    model: 'gpt-4',
    messages: [{
      role: 'system',
      content: 'Given a user question, break down your plan to answer in steps.'
    }, {
      role: 'user',
      content: message
    }]
  });
  const plan = response.data.choices[0].message.content;
  res.json({ plan });
});

// -- Accept plan/send feedback: user can confirm or ask to revise plan
app.post('/answer', async (req, res) => {
  const { userId, message, plan, feedback } = req.body;
  // If feedback, modify plan
  let promptMsgs = [
    { role: 'system', content: 'Given the plan and feedback, replan and execute answer.' },
    { role: 'user', content: `Plan: ${plan}\nMessage: ${message}\nFeedback: ${feedback || "None"}` }
  ];
  const response = await openai.createChatCompletion({
    model: 'gpt-4',
    messages: promptMsgs
  });
  const answer = response.data.choices[0].message.content;

  // Save message (+lottery points), broadcast to all via Socket.io
  await db.query('UPDATE users SET lottery_points = lottery_points + 1 WHERE id = ?', [userId]);
  io.emit('new_message', { userId, answer }); // BROADCAST

  res.json({ answer });
});

// Socket.io connections: for real-time broadcast
io.on('connection', socket => {
  socket.on('send_message', async ({ userId, message }) => {
    // Give lottery points
    await db.query('UPDATE users SET lottery_points = lottery_points + 1 WHERE id = ?', [userId]);
    io.emit('new_message', { userId, message });
  });
});

// Lottery Drawing (every Friday at 12:00 UTC)
cron.schedule('0 12 * * 5', async () => {
  const [winner] = await db.query(
    'SELECT id, name FROM users WHERE lottery_points > 0 ORDER BY RAND() LIMIT 1'
  );
  if (winner) {
    await db.query('UPDATE users SET lottery_points = 0');
    io.emit('lottery_winner', { winner: winner.name, msg: 'Congrats! You win the cash prize!' });
  }
});

// High load testing endpoint (simulate broadcast)
app.post('/broadcast-test', (req, res) => {
  for (let i = 0; i < 100000; ++i) {
    io.emit('new_message', { userId: 'test', message: `Test #${i}` });
  }
  res.send('Broadcasted 100,000 messages');
});

server.listen(3000, () => console.log('Server running'));
```

----

##### **Frontend (React): Interactive Chat**

- On user prompt: POST `/plan` → show plan and "Accept"/"Revise Plan" UI.
- If accept: POST `/answer`, else send feedback to `/plan`.
- Listen for `new_message` & `lottery_winner` via socket.io for broadcasts, points, winner popup.

----

#### 4. How to Handle Broadcasts

- Use [Socket.io](https://socket.io/) to push every message to *all* connected clients in real-time.
- Each broadcast increments user’s lottery points (server-side for security).
- On winner announcement (`lottery_winner` socket event) display modal/winner banner.

----

#### 5. Stress Test (`/broadcast-test`)

- Simulate 100,000 socket emits per minute.
- Observe: Socket.io memory/CPU usage, message drop rate, client lag.
- **What breaks?**
  - Socket buffers can overflow; clients lag/skip.
  - Node.js event loop and server memory bottleneck.

- **How to Fix:**
  - Throttle/batch broadcasts (e.g., instead of 100k at once, chunk into 1k/s)
  - Use Redis or Kafka backend for socket scaling
  - Deploy multi-instance (horizontal scaling) with a socket.io adapter (Redis)

----

#### 6. Full Lottery Flow

- Each message sent → +1 lottery point (DB).
- Every Friday: Cron picks random eligible user.
- Winner announced via broadcast; points reset.

----

### Next Steps

1. Clone the [backend example here](#) and fill in your OpenAI keys.
2. Create a React app for the chat UI, wire up API and websocket events.
3. Run heavy-load test using `autocannon`, `wrk` or the `/broadcast-test` endpoint and monitor.
4. Deploy with Node.js clustering/PM2, and use Redis adapter for Socket.io scaling.

---
