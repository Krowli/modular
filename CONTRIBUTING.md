# Contributing to modular

Thanks for your interest in contributing.

## Issues

Bug reports, feature requests, and questions are welcome — open an issue.

## Pull requests

1. Fork the repository and create a branch off `main`.
2. Keep changes focused and match the existing code style.
3. Run the checks locally before pushing:

   ```sh
   bun install
   bun run check:ts   # typecheck + lint (must be clean)
   bun run test:ts    # TypeScript test suite
   ```

4. Add a CHANGELOG entry under `## [Unreleased]` in the affected package.
5. Open the PR with a clear description of what changed and why.

See [packages/coding-agent/DEVELOPMENT.md](packages/coding-agent/DEVELOPMENT.md)
for architecture and development details.

## License

By contributing, you agree that your contributions are licensed under the
Apache-2.0 License.
