# Pay Up Radio Script Generator

React/Vite app for generating two Ghanaian radio presenter mention scripts for Pay Up.

## Run Locally

Install dependencies:

```powershell
npm install
```

Start the full production app:

```powershell
npm run build
npm start
```

Open http://127.0.0.1:8787.

For local development, start the API proxy in one terminal:

```powershell
npm run server
```

`ANTHROPIC_API_KEY` is optional. When it is set, the server calls Anthropic. When it is not set, the server returns built-in Pay Up scripts so the generator still works locally.

The local fallback generator creates more than 50 possible Serious scripts and more than 50 possible Witty scripts by combining hooks, feature lines, audience lines, and calls to action.

To use Anthropic:

```powershell
$env:ANTHROPIC_API_KEY="your_api_key_here"
npm run server
```

Start the Vite UI in another terminal:

```powershell
npm run dev -- --port 5173
```

Open http://127.0.0.1:5173.

For a phone on the same Wi-Fi, open the PC's local network address instead, for example:

```text
http://192.168.x.x:5173
```

The browser app calls `/api/messages`, and Vite proxies that to the local Express server at `http://127.0.0.1:8787`.

## Share With Colleagues

To give colleagues one public link, deploy this as a Node web service.

Recommended settings for Render, Railway, or a similar Node host:

```text
Build command: npm install && npm run build
Start command: npm start
```

Environment variable:

```text
ANTHROPIC_API_KEY=your_api_key_here
```

Do not put the Anthropic key in `src/App.jsx` or any browser code. The deployed Express server reads the key privately and serves both the React app and `/api/messages` from the same public URL.
