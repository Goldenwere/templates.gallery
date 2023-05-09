# Gallery Template

This is a template for artists to self-host a gallery site on a static host. The demo workflow is set up for AWS but the site can theoretically work for any sort of static host. Content, site configuration, and site themes are maintained separately through an expected `/content` folder at the root of the deployed build folder. See "Content API" for more information on how to configure the site.

## Features
- Lander page
  - Featured art as background with user ability to select from featured set
  - Clear site navigation with thumbnails for separate galleries
  - Markdown-supported "about me" section
  - Section for linking to external websites
- Gallery page
  - Folders with nesting
    - Infinite nesting
    - Treats gallery page like a filter with instant effect
    - Doesn't show when user is navigated deeper into artwork variants
  - Optional positioned thumbnails (fallback: image (`url`))
  - Nested artwork variants
    - Infinite variant nesting, and nesting is optional
    - Copies optional variables (description, date, title) as fallback to avoid needing to manually re-define redundant information
  - Maturity warning labels
  - External link support
  - Tooltips for lengthy artwork titles
  - On-site image viewer
    - User ability to show maximized image modal
    - Display markdown-supported descriptions, date, and title

## Stack
- builder: Vite 4
  - static build
- framework: Vue 3
  - *.vue SFCs
  - `<script setup>`
  - `<style scoped>`
- language: Typescript 4.9
- router: Vue Router 4
- store: Pinia 2
- markup: Pug 3
- style: Sass 1

## Development

It is recommended to maintain a copy (either to manually sync or a separate staging set of data) of the `/content` folder at the root of the repo when developing locally.

### Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

### Type Support For `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Deploying

Github Actions is configured to build `/dist` to AWS on push to `main`. `/content` must be syncronized manually.

## Content API
"Content" is defined as the text, images, and other information displayed by the framework, in addition to theme stylesheets that apply branding to the framework. Content is set up primarily in a `.gitignored` `/content` folder using YML files to update this information independently from the CI/CD framework (e.g. updating information about games, credits, etc.) and to make the framework itself more re-usable, open-source, and independent of branding. YML files for each view (i.e. `/src/views`) have associated modals to adhere to.

The following content definitions are required (or assumed but optional) by the framework in order to load properly.

TBD
