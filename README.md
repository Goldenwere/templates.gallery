# Gallery Template

This is a template for artists to self-host a gallery site on a static host.
The demo workflow is set up for NeoCities but the site can theoretically work for any sort of static host.
Content, site configuration, and site themes are maintained separately through an expected `/content` folder at the root of the deployed build folder.
See "Defining Content" for more information on how to configure the site.

## Defining Content
"Content" is defined as the text, images, and other information displayed by the template, in addition to theme stylesheets that apply branding to the template.
Content is stored in a `.gitignore`d `/content` folder using YML files. The reasons for this setup:
- to update this information independently from the CI/CD template (e.g. updating information about art, commissions, etc.) 
- to make the template itself more re-usable, open-source, and independent of branding.
YML files for each view (i.e. `/src/views`) have associated "View Models" to adhere to (`/src/types/views`).
For the site to load at all, you need at minimum a `site.yml` and `home.yml` written.
To read more about the Content DB and what is required, read the [wiki page on the topic](https://github.com/Goldenwere/templates.gallery/wiki/Content-DB).

## How To Use This Template
TBA (general idea: fork the repo, clone it to machine, choose the workflow for your host or create your own, follow instructions to set up host, and set up github actions)

## Development

While the goal of the template is to avoid the need for an artist to do any development/editing of the template itself,
it may be helpful to make use of the dev server in order to preview any content changes before pushing them to your host.
It may also be helpful if you wish to keep your fork up to date with the main template's features and fixes.
You will need a copy of the `/content` folder at the root of your cloned repo when developing locally.

### Getting Started
With Git CLI:
- Open a terminal and navigate to the folder you wish for the template to be stored in (e.g. `cd C:\Users\{your username}\Documents`)
- Clone the repo with `git clone https://github.com/Goldenwere/templates.gallery.git`
Alternatively, you may benefit from using a GUI such as Github Desktop.

Once the repo is cloned, run `cd templates.gallery` to navigate into it, and continue following the steps in "Working With Node"

### Working With Node
Ensure you have the version of node required by the template installed on your machine. The template uses NVM to make this easier to manage by simply running `nvm use` in the terminal, and running `nvm install {version outputted by console}` if it is not yet installed.
- For windows users: [nvm-windows](https://github.com/coreybutler/nvm-windows#install-nvm-windows)
- For mac/linux users: [nvm-sh](https://github.com/nvm-sh/nvm#installing-and-updating)

Once node is installed, run `npm ci` to install all dependencies.

The following are the scripts you can use when working with the template:
- `npm start`: starts a local dev server, which will display the IP address which you can open in the browser to locally browse the web app; this is usually what you want in order to test changes quickly
- `npm run build`: creates a static build of the template
- `npm run start-static`: this starts a local server which opens the output from `npm run build`
- `npm run preview`: runs `build` followed by `start-static`

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

TBA
