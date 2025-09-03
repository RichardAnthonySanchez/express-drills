# Express Static Files Troubleshooting - Quick Guide

## The Problem

**Error:** `Cannot GET /index.html`

**Original Code:**

```javascript
app.use("/", express.static("public"));
```

## What Went Wrong

### 1. First Red Herring: Missing Files

- ✅ Checked file structure - files existed
- ✅ Added debugging - showed correct path

### 3. Real Root Cause: Relative Path Problem

```javascript
app.use(express.static("public")); // ❌ Uses process.cwd()
```

**The Issue:**

- `process.cwd()` = where you ran the command
- `__dirname` = where the script file lives
- These are often different!

**Example:**

```bash
# Running from /home/tony/:
node repos/express-drills/server.js

# Looks for: /home/tony/public ❌
# Should be: /home/tony/repos/express-drills/public ✅
```

## The Solution

```javascript
const path = require("path");
app.use(express.static(path.join(__dirname, "public"))); // ✅
```

## Key Debugging Tools

```javascript
console.log("Working dir:", process.cwd());
console.log("Script dir:", __dirname);
console.log("Resolved path:", path.join(__dirname, "public"));
```

## Final Working Code

```javascript
const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res) => {
  res.status(404).send("File not found");
});

app.listen(3000);
```

## Key Takeaway

**Always use absolute paths:** `path.join(__dirname, "public")` instead of `"public"` to avoid working directory issues.
