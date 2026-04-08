## Release Process

This repo uses [Changesets](https://github.com/changesets/changesets) for versioning and publishing.

```bash
pnpm changeset
pnpm release
```

- Add a changeset for user-facing changes.
- Name changeset files `<random-word>-<random-word>-<random-word>.md`.
- Keep release notes short and concise by default.
- Run `pnpm format:write` before committing.
