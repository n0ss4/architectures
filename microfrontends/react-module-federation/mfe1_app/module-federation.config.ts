import { createModuleFederationConfig } from '@module-federation/rsbuild-plugin';

export default createModuleFederationConfig({
  name: 'mfe1_app',
  filename: 'remoteEntry.js',
  remotes: {
    'host_app': 'host_app@http://localhost:3000/mf-manifest.json',
  },
  exposes: {
    '.': './src/components/ProviderComponent.tsx',
  },
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true },
  },
});
