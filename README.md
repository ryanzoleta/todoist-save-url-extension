# Save URL to Todoist

This is a browser extension for easily saving the currently opened URL to Todoist. This works with another repo (https://github.com/ryanarnold/todoist-save-url-site) that handles the OAuth flow, which is currently hosted in https://saveurltodoist.vercel.app/

## Development

The extension is written in React using Vite.

To begin development, clone both this repo and the todoist-save-url-site repo linked above.

1. To start development, clone the [site repo](https://github.com/ryanarnold/todoist-save-url-site) and start it's local development server.

2. Clone this repo then setup npm:

```bash
npm install
```

3. Modify all instances of `saveurltodoist.vercel.app` in this repo with the hostname of the site server (usually [localhost:3000](http://localhost:3000)).

4. Build (the results will be placed in `/dist`, together with the `manifest.json`)

```bash
npm run build
```

5. Open a chromium-based browser then in the extensions page, enable "developer mode"

6. Click on "Load unpacked" then open the `/dist` directory containing the build results.
