import type { StorybookConfig } from "@storybook/react-webpack5";
import path from "path";
import babelConfig from "../.babelrc.json";
import webpack from "webpack";

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
    debugger;
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

      plugins: [
        ...(config.plugins ?? []),
        new webpack.ProvidePlugin({
          // since we avoid "import React from 'react'" we shim here when used globally
          React: "react",
          // the buffer module exposes the Buffer class as a property
          Buffer: ["buffer", "Buffer"],
        }),
      ],

      module: {
        ...config.module,
        rules: [
          { test: /\.wasm$/, type: "asset/resource" },

          // Replace Storybook's default babel loader, which auto-discovers the babel config on a
          // per-file basis, with one that specifies the config explicitly. This allows us to use
          // the same babel config for .ts files from other workspace packages.
          {
            test: /\.tsx?$/,
            use: { loader: "babel-loader", options: babelConfig },
            exclude: /node_modules/,
          },
          ...(config.module?.rules?.filter((rule) => {
            if (
              typeof rule === "object" &&
              Array.isArray(rule.use) &&
              rule.use.some(
                (use) => typeof use === "object" && use.loader?.includes("babel-loader"),
              )
            ) {
              return false;
            }
            return true;
          }) ?? []),
        ],
      },
    };
  },
};

export default config;
