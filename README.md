# nx-vite-vue

This library is a [Nx](https://nx.dev) plugin. It is used for nx monorepo workspace to generate a vue3 based application folder or a template folder for vue3 component.The bundler for the application or component is set to vite as default.So by this plugin you can easily create a app or a component template folder in your nx based monorepo project.Enjoy it.

## Installation

Run `pnpm add nx-vite-vue -D` to install the plugin.

## Usage

| Command                             | Description                                                                                                       |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `nx g nx-vite-vue:app <app-name>`   | Generate a application folder with some vue3+vite template files. You                                             |
| `nx build <app-name>`               | Build the component.It will build the component into `<root>/dist/apps/<app-name>/dist` folder.                   |
| `nx g nx-vite-vue:comp <comp-name>` | Generate a vue3 component folder with default template files.It will create a new folder in your packages folder. |
| `nx build <comp-name>`              | Build the component.It will build the component into `<root>/dist/packages/<component-name>/dist` folder.         |
| `nx dev <package-name>`             | Run the dev server for `package-name` application.                                                                |

## Customize

You can make some change to the template files in generators folder as you like.If you want to test the result of `nx g nx-vite-vue:app` or `nx g nx-vite-vue:comp`, you can use the command `nx g ./:app` or `nx g ./:comp` to test the generator.
