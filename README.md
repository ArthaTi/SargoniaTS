# SargoniaTS

Sargonia implementation in TypeScript, via HTTP.

## Installing

You will need Node.JS and npm first. Clone/download the repo, open it and execute the commands:

```bash
npm i -D  # Install dependencies required to build
tsc -p tsconfig.server.json  # Build server
tsc -p tsconfig.client.json  # Build client scripts
```

Then, you can run the server with `node out/index.js`.
