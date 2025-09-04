# Troubleshooting Guide — Guestbook Exercise

This guide covers common problems when building the **Guestbook** app in Express.

---

## 1. `res.send` vs `res.json`

- **Symptom:**  
  A response displays correctly in the browser, but the client-side script cannot easily use the values.

- **Explanation:**  
  `res.send` sends a string or HTML. This is fine when the goal is simply to show text in the browser.  
  `res.json`, on the other hand, sends properly formatted JSON. This makes the data easy to process programmatically (e.g., looping over an array of players and rendering them as a list in the DOM).

- **Example:**

  ```js
  // Sends plain text
  res.send(`the players are ${players}`);

  // Sends JSON (useful for iterating over values on the client side)
  res.json({ players });
  ```

2. POST body is empty (req.body is {} or undefined)

Symptom
After submitting the form to POST /guestbook, the server can’t read the input values.

Explanation
When someone submits a form, Express does not parse the body by default. Without a body parser, the server literally cannot access or use the submitted values.

Fix (must be registered before routes)

app.use(express.urlencoded({ extended: true })); // parses application/x-www-form-urlencoded
// If sending JSON from clients, also consider:
// app.use(express.json());

Takeaway
Without express.urlencoded({ extended: true }) (or another parser), the input values are not available to route handlers.

3. Separate routes for page vs API (/players vs /api/players)

Symptom
Combining page rendering and data serving on the same path becomes confusing, or a second handler for the same path never runs.

Explanation

Keeping a page route (/players) distinct from a data route (/api/players) avoids conflicts and clarifies intent.

Once a response is sent (res.send, res.json, or res.sendFile), Express does not continue to another route handler with the same path.

Recommended pattern

const path = require("path");

// Page for humans
app.get("/players", (req, res) => {
// Note: use res.sendFile with a capital "F" and an absolute path.
res.sendFile(path.join(\_\_dirname, "public", "players.html"));
});

// API for programs
app.get("/api/players", (req, res) => {
res.json({ players });
});

Utility of separating routes

Clear contract: pages for humans, JSON for clients/scripts.

Easier testing and reuse: /api/players can be consumed by multiple pages or external tools.

Fewer surprises: avoids multiple handlers fighting over the same path.
