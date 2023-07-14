import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  Tree,
  addDependenciesToPackageJson,
  runTasksInSerial,
  GeneratorCallback,
  getWorkspaceLayout,
  readJson,
  joinPathFragments,
  updateJson,
} from '@nx/devkit';
import * as path from 'path';
import { CompGeneratorSchema } from './schema';

const DEPENDENCY = {
  dependencies: {
    vue: '^3.2.47',
  },
  devDependencies: {
    '@vitejs/plugin-vue': '^4.1.0',
    typescript: '^5.0.2',
    vite: '^4.3.9',
    'vue-tsc': '^1.4.2',
    'vite-tsconfig-paths': '^4.2.0',
  },
};

export function getRootTsConfigPathInTree(tree: Tree): string | null {
  for (const path of ['tsconfig.base.json', 'tsconfig.json']) {
    if (tree.exists(path)) {
      return path;
    }
  }

  return 'tsconfig.base.json';
}

export async function appGenerator(tree: Tree, options: CompGeneratorSchema) {
  const { libsDir } = getWorkspaceLayout(tree);
  const { name } = readJson(tree, 'package.json');
  const npmScope = name?.startsWith('@')
    ? name.split('/')[0].substring(1)
    : name;

  const projectRoot = `${libsDir}/${options.name}`;
  const projectName = `@${npmScope}/${options.name}`;
  const tasks: GeneratorCallback[] = [];

  addProjectConfiguration(tree, options.name, {
    root: projectRoot,
    projectType: 'library',
    sourceRoot: `${projectRoot}/src`,
    targets: {
      dev: {
        inputs: [
          {
            externalDependencies: ['vite'],
          },
        ],
        command: `cd ${projectRoot} && vite`,
        dependsOn: ['^build'],
      },
      build: {
        inputs: [
          {
            externalDependencies: ['vite', 'vue-tsc'],
          },
        ],
        command: `cd ${projectRoot} && vue-tsc && vite build`,
        dependsOn: ['^build'],
      },
      preview: {
        inputs: [
          {
            externalDependencies: ['vite'],
          },
        ],
        command: `cd ${projectRoot} && vite preview`,
      },
    },
  });
  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, options);
  await formatFiles(tree);

  updateJson(tree, getRootTsConfigPathInTree(tree), (json) => {
    const c = json.compilerOptions;
    c.paths ??= {};

    if (c.paths[`$`]) {
      throw new Error(
        `You already have a library using the import path "${projectName}". Make sure to specify a unique one.`
      );
    }

    c.paths[projectName] = [
      joinPathFragments(projectRoot, './src/components', 'MyComponent.vue'),
    ];

    return {
      ...json,
      compilerOptions: c,
    };
  });

  updateJson(tree, joinPathFragments(projectRoot, 'package.json'), (json) => {
    return {
      ...json,
      name: projectName,
    };
  });

  const eslintJSONPath = joinPathFragments('.eslintrc.json');
  if (tree.exists(eslintJSONPath)) {
    const eslintJSON = readJson(tree, '.eslintrc.json');
    eslintJSON['settings']['import/resolver']['alias']['map'] ??= [];
    eslintJSON['settings']['import/resolver']['alias']['map'].push([
      projectName,
      joinPathFragments(projectRoot, './src/components', 'MyComponent.vue'),
    ]);
    updateJson(tree, '.eslintrc.json', () => {
      return eslintJSON;
    });
  }

  const installTask = await addDependenciesToPackageJson(
    tree,
    DEPENDENCY.dependencies,
    DEPENDENCY.devDependencies
  );
  tasks.push(installTask);

  return runTasksInSerial(...tasks);
}

export default appGenerator;
