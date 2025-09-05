# Dice Roller API – Troubleshooting Guide

### Common Issues

#### 1. `req.params` is always `{}`

- **Cause:** Route is defined without a `:param`.
- **Fix:** Use `req.query` for query strings, or define a param in the route.

```js
// Query string style (http://localhost:3000/roll?sides=6)
app.get("/roll", (req, res) => {
  console.log(req.query); // { sides: '6' }
});

// Route param style (http://localhost:3000/roll/6)
app.get("/roll/:sides", (req, res) => {
  console.log(req.params); // { sides: '6' }
});
```
