const packageName = require('./package.json').name;
const CracoAlias = require('craco-alias');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const { ESLINT_MODES } = require('@craco/craco');
const path = require('path');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  webpack: {
    plugins: {
      add: [new AntdDayjsWebpackPlugin({ replaceMoment: true })],
    },
    configure: (webpackConfig) => {
      webpackConfig.output = {
        library: `${packageName}-[name]`,
        libraryTarget: 'umd',
        chunkLoadingGlobal: `webpackJsonp_${packageName}`,
        globalObject: 'window',
        publicPath: '/',
      };

      webpackConfig.resolve = {
        alias: {
          '@': path.resolve(__dirname, 'src'),
        },
        extensions: ['.tsx', '.ts', '.js'],
      };

      webpackConfig.optimization = {
        splitChunks: {
          chunks: 'all',
        },
      };

      return webpackConfig;
    },
  },

  eslint: {
    mode: ESLINT_MODES.file,
  },

  babel: {
    plugins: ['lodash'],
  },

  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        // baseUrl SHOULD be specified
        // plugin does not take it from jsconfig
        baseUrl: '.',
        tsConfigPath: 'tsconfig.json',
      },
    },
  ],
};
