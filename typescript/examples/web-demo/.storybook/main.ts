import type { StorybookConfig } from "@storybook/react-webpack5";
import path from "path";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  typescript: {
    check: true,
    checkOptions: {
      typescript: {
        configOverwrite: {
          compilerOptions: {
            // During hot reloading and development it is useful to comment out code while iterating.
            // We ignore errors from unused locals to avoid having to also comment
            // those out while iterating.
            noUnusedLocals: false,
            noUnusedParameters: false,
          },
        },
      },
    },
  },
  webpackFinal(config, options) {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          fs: false,
          "@mcap/core": path.resolve(__dirname, "../../../core/src"),
        },
      },
      experiments: {
        ...config.experiments,
        asyncWebAssembly: true,
      },
    };
  },
};

export default config;
