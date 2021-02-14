import {app, BrowserWindow} from "electron";
import * as path from "path";

const ready = async () => {
  global.dev = process.env.NODE_ENV === "development";

  const win = new BrowserWindow({
    height: 450,
    width: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  let url = `file://${path.join(__dirname, "index.html")}`;
  if (global.dev) url = "http://localhost:9000/";

  win.loadURL(url);
};

app.on("ready", ready);
app.on("window-all-closed", () => (process.platform !== "darwin") ? app.quit() : null);
app.on("activate", () => (BrowserWindow.getAllWindows().length === 0) ? ready() : null);
