import { createModuleFederationConfig } from '@module-federation/rsbuild-plugin';

export default createModuleFederationConfig({
  name: 'host_app',
  remotes: {
    'mfe1_app': 'mfe1_app@http://localhost:3001/mf-manifest.json',
    'mfe2_app': 'mfe2_app@http://localhost:3002/mf-manifest.json',
  },
  exposes: {
    './types': './src/types/cart.ts',
    './products': './src/data/products.ts',
  },
  shareStrategy: 'loaded-first',
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true },
  },
});
