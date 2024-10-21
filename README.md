# Digital planning data schemas docs

This repository hosts the JSON schemas viewer for Digital Planning services data specifications, developed by [Open Digital Planning](https://opendigitalplanning.org/).

The schema viewer fetches current data from the [Digital Planning Data Schemas](https://github.com/theopensystemslab/digital-planning-data-schemas/) repository.

## Schemas viewer

The schemas viewer is live at [https://theopensystemslab.github.io/digital-planning-data-schemas-docs/](https://theopensystemslab.github.io/digital-planning-data-schemas-docs).


## Developing locally

Assumes [PNPM](https://pnpm.io/) is available globally.

```
pnpm i
pnpm dev
```

The viewer was built using [@stoplight/json-schema-viewer](https://github.com/stoplightio/json-schema-viewer) on top of a basic [vite/react-ts](https://vitejs.dev/guide/#scaffolding-your-first-vite-project) starter site.