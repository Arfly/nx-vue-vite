# nx-vite-vue

This library is a [Nx](https://nx.dev) plugin. It is used for nx monorepo workspace to generate a vue3 based application folder or a template folder for vue3 component.The bundler for the application or component is set to vite as default.So by this plugin you can easily create a app or a component template folder in your nx based monorepo project.Enjoy it.

## Installation

Run `pnpm add nx-vite-vue -D` to install the plugin.

## Usage

- Create a app
  Run `nx g nx-vite-vue:app` to generate a application folder with some vue3+vite template files. You will find a new folder with the name you set in your apps folder.

- Create a component
  Run `nx g nx-vite-vue:comp` to generate a vue3 component folder with default template files.It will create a new folder in your packages folder.

- Run app's dev server
  Run `nx dev <app-name>` to run the dev server for `app-name` application.The outputs contents will be placed in the root dist folder.

- Build app or component
  Run `nx build <name>` to run the build target for `name` application or component project.The outputs contents will be placed in the root dist folder.

## Customize

You can make some change to the template files in generators folder as you like.
