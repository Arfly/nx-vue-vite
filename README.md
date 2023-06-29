# nx-vite-vue

This library is a [Nx](https://nx.dev) plugin. It is used for nx monorepo workspace to generate a vue3 based application folder or a template folder for vue3 component.The bundler for the application or component is set to vite as default.So by this plugin you can easily create a app or a component template folder in your nx based monorepo project.Enjoy it.

## Installation

Run `pnpm add nx-vite-vue -D` to install the plugin.

## Usage

- Create a app

  - Run `nx g nx-vite-vue:app` to generate a application folder with some vue3+vite template files. You will find a new folder with the name you set in your apps folder.
  - Run `nx build <app-name>` to build the component.It will build the component into `<root>/dist/apps/<app-name>/dist` folder.

- Create a component

  - Run `nx g nx-vite-vue:comp` to generate a vue3 component folder with default template files.It will create a new folder in your packages folder.
  - Run `nx build <component-name>` to build the component.It will build the component into `<root>/dist/packages/<component-name>/dist` folder.
  - You can use `import` statement to use the component in other project.Please Notice the `path` filed in tsconfig.json file.

- Run app's dev server
  Run `nx dev <package-name>` to run the dev server for `package-name` application.The outputs contents will be placed in the root dist folder.

- Build app or component
  Run `nx build <name>` to run the build target for `name` application or component project.The outputs contents will be placed in the root dist folder.

## Customize

You can make some change to the template files in generators folder as you like.If you want to test the result of `nx g nx-vite-vue:app` or `nx g nx-vite-vue:comp`, you can use the command `nx g ./:app` or `nx g ./:comp` to test the generator.
