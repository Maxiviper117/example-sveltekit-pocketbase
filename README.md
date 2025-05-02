# example-sveltekit-pocketbase

A starter template demonstrating integration of **SvelteKit** with **Pocketbase** for authentication and data storage.

## Prerequisites

- Node.js >= 18
- pnpm package manager (or npm/yarn)
- Pocketbase executable (download below)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-org/example-sveltekit-pocketbase.git
   cd example-sveltekit-pocketbase
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

## Setup Pocketbase

Visit the [Pocketbase](https://pocketbase.io/docs/) website for more information and download the executable for your OS (Linux, macOS, Windows). It will be provided as a ZIP archive.

1. Unzip the archive into the `pocketbase/` folder.
2. Your structure should look like:
   ```text
   pocketbase/
     pocketbase.exe
     ...
   ```

## Running the App

1. **Start Pocketbase**
   ```bash
   cd pocketbase
   ./pocketbase serve
   ```

2. **Start SvelteKit** (in a separate terminal)
   ```bash
   pnpm dev -- --open
   ```

3. Open your browser to [http://localhost:5173](http://localhost:5173)

## Project Structure

```text
.
├── pocketbase/           # Local Pocketbase server files
├── src/                  # SvelteKit source code
│   ├── lib/              # Shared utilities and middleware
│   └── routes/           # SvelteKit route definitions
├── static/               # Static assets
├── svelte.config.js      # SvelteKit configuration
├── vite.config.ts        # Vite configuration
├── package.json          # Project metadata and scripts
└── README.md             # This file
```

## Scripts

- `pnpm dev`: Run the SvelteKit development server
- `pnpm build`: Build the project for production
- `pnpm preview`: Preview the production build

## License

This project is licensed under the MIT License. See [LICENSE.md](pocketbase/LICENSE.md) for details.