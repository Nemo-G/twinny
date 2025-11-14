# Twinny - CODELY.md

## Project Overview

**Twinny** is a free, open-source AI-powered code completion and chat extension for Visual Studio Code. It provides intelligent code suggestions and AI chat functionality while maintaining privacy through local hosting capabilities.

### Key Features
- **AI Code Completion**: Real-time code suggestions with support for single and multi-line completions
- **AI Chat**: Interactive chat about code with explanations, refactoring suggestions, test generation, and documentation
- **Multi-Provider Support**: Compatible with OpenAI, Anthropic, Ollama, OpenRouter, Deepseek, Cohere, Mistral AI, Perplexity, and Groq
- **Workspace Embeddings**: Context-aware AI assistance using LanceDB for vector storage
- **Symmetry Network**: Decentralized P2P network for sharing AI inference resources
- **Privacy-Focused**: Supports local hosting to keep code private

## Architecture

### Technology Stack
- **Backend**: TypeScript Node.js (VS Code extension host)
- **Frontend**: React 18 with TypeScript (webview UI)
- **Build System**: esbuild with custom build scripts
- **Database**: LanceDB for embeddings and vector search
- **Package Manager**: npm

### Project Structure
```
src/
├── extension/           # VS Code extension backend
│   ├── providers/       # AI providers (completion, sidebar, panel)
│   ├── embeddings.ts    # LanceDB integration
│   ├── session-manager.ts
│   ├── template-provider.ts
│   └── utils.ts
├── webview/            # React frontend
│   ├── components/     # React components
│   ├── hooks/          # Custom React hooks
│   └── index.tsx       # Webview entry point
├── common/             # Shared types and constants
│   ├── types.ts        # TypeScript interfaces
│   └── constants.ts    # Event names, commands, etc.
└── index.ts            # Extension activation entry point
```

### Key Components

1. **CompletionProvider**: Handles inline code completion using various AI providers
2. **SidebarProvider**: Main chat interface and provider management
3. **FullScreenProvider**: Panel-based chat interface
4. **EmbeddingDatabase**: Manages workspace embeddings for context-aware suggestions
5. **SessionManager**: Handles conversation state and history
6. **TemplateProvider**: Manages prompt templates for different operations

## Development Setup

### Prerequisites
- Node.js 18+ recommended
- npm or yarn
- Visual Studio Code
- Git

### Initial Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/twinnydotdev/twinny.git
   cd twinny
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   
   *Note: If you encounter native module compilation errors, use:*
   ```bash
   npm install --ignore-scripts
   ```

3. **Start development**
   - Press `F5` in VS Code to open a new window with the extension loaded
   - Or run `npm run watch` for automatic rebuilding on file changes

## Build Commands

### Development
```bash
# Watch mode - automatically rebuild on changes
npm run watch

# Run linting
npm run lint

# Fix linting issues automatically
npm run lint:fix
```

### Production
```bash
# Build the extension
npm run build

# Full test and build pipeline
npm run pretest

# Run tests
npm run test

# Package as VSIX file
npm run vscode:package

# Publish to VS Code marketplace
npm run vscode:publish
```

## Testing

```bash
# Run the full test suite (includes build and lint)
npm run pretest

# Run tests only
npm run test

# Watch tests during development
npm run watch-tests
```

## Code Style and Conventions

### ESLint Configuration
- **Parser**: `@typescript-eslint/parser`
- **Extends**: `eslint:recommended`, `plugin:@typescript-eslint/recommended`
- **Plugins**: `@typescript-eslint`, `simple-import-sort`, `import`

### Key Rules
- **Quotes**: Double quotes (`"`) must be used
- **Import Sorting**: Automatic import sorting with grouping:
  1. React and external libraries
  2. Internal components
  3. Parent imports
  4. Sibling imports
  5. CSS files
- **No duplicate imports**
- **Newline after imports**

### TypeScript Configuration
- **Target**: ES2020
- **Module**: CommonJS
- **Strict mode**: Enabled
- **JSX**: React JSX transform
- **Source maps**: Enabled

## Key Dependencies

### Runtime Dependencies
- `@lancedb/lancedb`: Vector database for embeddings
- `react`, `react-dom`: Frontend framework
- `symmetry-core`: P2P networking for AI inference
- `onnxruntime-web`: ONNX model runtime
- `handlebars`: Template engine
- `i18next`: Internationalization
- `hypercore-crypto`, `hyperswarm`: Cryptographic and P2P utilities

### Development Dependencies
- `esbuild`: Fast bundler
- `typescript`: Type checking
- `eslint`: Linting
- `@vscode/vsce`: VS Code extension packaging
- `@vscode/test-electron`: Extension testing

## Configuration

### VS Code Settings
Twinny contributes several configuration options under the `twinny` namespace:

- `twinny.enabled`: Enable/disable the extension
- `twinny.enabledLanguages`: Configure which languages to enable
- `twinny.autoSuggestEnabled`: Toggle automatic suggestions
- `twinny.contextLength`: Lines of context to include in prompts
- `twinny.debounceWait`: Delay before triggering completions
- `twinny.temperature`: AI model temperature setting
- `twinny.multilineCompletionsEnabled`: Enable multi-line completions
- `twinny.numPredictChat`/`twinny.numPredictFim`: Token limits
- `twinny.ollamaHostname`/`twinny.ollamaApiPort`: Ollama connection settings
- `twinny.symmetryServerKey`: P2P network configuration

### Extension Commands
Twinny provides numerous commands accessible via the command palette:
- `twinny.explain`: Explain selected code
- `twinny.refactor`: Refactor selected code
- `twinny.addTypes`: Add TypeScript types
- `twinny.addTests`: Generate tests
- `twinny.generateDocs`: Generate documentation
- `twinny.manageProviders`: Configure AI providers
- `twinny.conversationHistory`: View chat history
- And many more...

## Build Output

After building, the `out/` directory contains:
- `index.js`: Extension main file (~10.5 MB)
- `sidebar.js`: Webview bundle (~5.1 MB)
- `sidebar.css`: Styles
- `*.node`: Native modules (LanceDB)
- `*.wasm`: WebAssembly files for tree-sitter and ONNX
- VSIX package: ~101 MB

## Debugging

1. **Extension Host Debugging**: Press `F5` to launch a new VS Code window with the extension loaded
2. **Webview Debugging**: Open Developer Tools in the extension host window to debug the React frontend
3. **Logging**: Enable `twinny.enableLogging` in settings for detailed logs

## Common Issues

### Native Module Compilation
If you encounter errors with `sqlite3` or other native modules:
- Use `npm install --ignore-scripts`
- On Windows: Install Visual Studio Build Tools

### Build Failures
- Ensure all dependencies are installed: `npm install`
- Clear the `out/` directory and rebuild: `npm run build`
- Check Node.js version (18+ recommended)

### Extension Not Activating
- Check the Output panel → "Twinny" channel for errors
- Verify `twinny.enabled` setting is `true`
- Check that the extension is properly installed

## Contributing

1. Create a feature branch from `development`
2. Make your changes following the code style guidelines
3. Run tests: `npm run pretest`
4. Submit a pull request to the `development` branch

For detailed contribution guidelines, see [CONTRIBUTING.md](./CONTRIBUTING.md).

## Release Process

1. Update version in `package.json`
2. Run full test suite: `npm run pretest`
3. Build and package: `npm run vscode:package`
4. Test the generated VSIX file
5. Publish: `npm run vscode:publish` (requires VS Code marketplace credentials)

## Resources

- [Documentation](https://twinnydotdev.github.io/twinny-docs/)
- [GitHub Repository](https://github.com/twinnydotdev/twinny)
- [Issues](https://github.com/twinnydotdev/twinny/issues)
- [VS Code Extension API](https://code.visualstudio.com/api)
- [React Documentation](https://react.dev/)
