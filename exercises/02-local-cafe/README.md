2. The Local Café (Static Files)
   Create a public/ folder with index.html and some CSS/JS.

Serve it with:

app.use(express.static('public'))
Confirm that visiting your server shows a styled webpage.

Add a second HTML page (e.g., menu.html) and link between them.

👉 Skill gained: Serving static assets like Foundry does with its UI.
