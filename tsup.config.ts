import { defineConfig, type Options } from 'tsup';

const NODE_TARGET = 'node22'; // Minimum Node version supported by Storybook 10

export default defineConfig(async () => {
  const packageJson = (await import('./package.json', { with: { type: 'json' } })).default;

  const {
    bundler: { previewEntries = [], nodeEntries = [] },
  } = packageJson;

  const commonConfig: Options = {
    clean: false,
    format: ['esm'],
    treeshake: true,
    splitting: true,
    external: ['react', 'react-dom', '@storybook/icons'],
  };

  const configs: Options[] = [];

  if (previewEntries.length) {
    configs.push({
      ...commonConfig,
      entry: previewEntries,
      platform: 'browser',
      target: 'esnext', // we can use esnext for preview entries since the builders will bundle the addon's preview entries again anyway
      dts: true,
    });
  }

  if (nodeEntries.length) {
    configs.push({
      ...commonConfig,
      entry: nodeEntries,
      platform: 'node',
      target: NODE_TARGET,
    });
  }

  return configs;
});