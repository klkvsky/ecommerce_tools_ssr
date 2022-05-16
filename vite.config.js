const vuePlugin = require("@vitejs/plugin-vue");
const virtualFile = "@virtual-file";
const virtualId = "\0" + virtualFile;
const nestedVirtualFile = "@nested-virtual-file";
const nestedVirtualId = "\0" + nestedVirtualFile;

/**
 * @type {import('vite').UserConfig}
 */
module.exports = {
  plugins: [
    vuePlugin(),
    {
      name: "virtual-module",
      resolveId(id) {
        if (id === virtualFile) {
          return virtualId;
        } else if (id === nestedVirtualFile) {
          return nestedVirtualId;
        }
      },
      load(id) {
        if (id === virtualId) {
          return `export { msg } from "@nested-virtual-file";`;
        } else if (id === nestedVirtualId) {
          return `export const msg = "[success] from conventional virtual file"`;
        }
      },
    },
  ],
  build: {
    minify: false,
  },
  ssr: {
    noExternal: [
      // this package has uncompiled .vue files
      "example-external-component",
    ],
  },
};
