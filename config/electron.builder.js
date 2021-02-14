const path = require("path");
const root = path.join(__dirname, "..");

const pack = path.join(root, "pack");

const details = {
  name: "electron-react-webpack",
  copyright: `Copyright © ${new Date().getFullYear()} Meslzy`,
  icon: "logo.png",
};

const builder = require("electron-builder");

builder.build({
  config: {
    npmRebuild: false,
    electronCompile: false,
    nodeGypRebuild: false,

    productName: details.name,
    copyright: details.copyright,

    artifactName: "${productName} (${version}).${ext}",
    directories: {
      buildResources: path.join(__dirname, "resources"),
      output: pack,
      app: root,
    },

    win: {
      icon: details.icon,
      target: "nsis",
    },
    nsis: {
      createDesktopShortcut: "always",
      perMachine: true,
      deleteAppDataOnUninstall: true,
      runAfterFinish: true,
      oneClick: false,
      createStartMenuShortcut: true,
    },

    mac: {
      category: "public.app-category.developer-tools",
      target: "dmg",
    },
    dmg: {
      icon: details.icon,
    },
  },
}).then(() => console.log("finish without eny error")).catch((err) => console.error(err));
