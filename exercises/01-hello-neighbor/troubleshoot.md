# LAN Access Troubleshooting for Node/Express

## 1. Ping doesn’t work (Request timed out)

1. Check VM network mode → must be **Bridged**, not NAT/Host-only.
2. Check Linux IP → `hostname -I`, use the IPv4 on LAN (192.168.x.x).
3. Ensure both devices are on the same Wi-Fi/subnet; disable guest Wi-Fi/AP isolation.
4. Check Linux firewall → `sudo ufw status`, temporarily disable if needed (`sudo ufw disable`).
5. Ping from Windows → `ping <Linux_LAN_IP>`; should get replies.

## 2. Node server not accessible from other device

1. Bind Express to all interfaces: `app.listen(PORT, '0.0.0.0')`.
2. Allow port through firewall: `sudo ufw allow 3000/tcp`.
3. Ensure server is running: `node server.js` or `npx nodemon server.js`.
4. Test connectivity with curl from other device: `curl http://<Linux_LAN_IP>:3000`.
5. Open in browser: `http://<Linux_LAN_IP>:3000`. Do not use `localhost` on other device.

## 3. Tips for future LAN-ready exercises

1. Always bind Express to `0.0.0.0`.
2. Always allow your port through the firewall.
3. Add a simple test route for quick verification:
   ```js
   app.get("/", (req, res) => res.send("Hello from the LAN!"));
   ```
