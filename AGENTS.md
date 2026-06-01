# Repository Guidelines

## Project Structure & Module Organization

This repository contains project templates for `makes`.

- `questions.js` defines the interactive template choices.
- `after.js` runs post-generation setup such as `git init`, Husky permissions,
  package installation, and package.json sorting.
- `common/` contains files merged into every generated project, including
  shared package metadata, Husky hooks, Prettier, EditorConfig, and commitlint.
- `nextjs/` contains the Next.js template, with app code in `nextjs/app/` and
  static assets in `nextjs/public/`.
- `ctv-tool/` contains the Rollup React component template, with source in
  `ctv-tool/src/`.

## Build, Test, and Development Commands

- `pnpm dlx makes /path/to/scaffolds my-app` generates a project from this
  local repository.
- `pnpm dlx makes /path/to/scaffolds my-app -s nextjs,pnpm` runs generation in
  silent mode.
- `npm install` at the repository root installs the generator dependency used by
  `after.js`.
- In a generated Next.js project, use `bun run dev`, `bun run build`,
  `bun run lint`, `bun run typecheck`, and `bun test`.
- In a generated `ctv-tool` project, use `npm run dev` for Rollup watch mode and
  `npm run build` for production output.

## Coding Style & Naming Conventions

Use ES modules throughout JavaScript files. Follow `common/.editorconfig`:
2-space indentation, LF line endings, trimmed trailing whitespace, and final
newlines. Shared formatting is defined in `common/.prettierrc.cjs`: no
semicolons, single quotes, 80-column print width, trailing commas, and sorted
imports. Keep template placeholders in the existing `/* @echo name */` style.

## Testing Guidelines

There is no root test suite. Validate changes by generating a sample app and
running that template's checks. For Next.js template changes, run `bun run lint`,
`bun run typecheck`, and `bun test` inside the generated app. For `ctv-tool`,
run `npm run build`. Name new tests near the code they cover using the target
framework's conventions.

## Commit & Pull Request Guidelines

History uses Conventional Commits, for example `feat: update ctv-tool template`
and `chore: sort generated package json`. Keep commit subjects imperative and
scoped to the template or generator change. Pull requests should describe the
affected template, include the generation command used for validation, list
checks run, and attach screenshots only for UI-visible template changes.

## Agent-Specific Instructions

Do not edit generated output in place as a substitute for changing the relevant
template. When working under `nextjs/`, read its nested `AGENTS.md` before
modifying Next.js files.
