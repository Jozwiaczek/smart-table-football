const { BrowserWindow, app, screen, dialog } = require('electron');
const { autoUpdater } = require('electron-updater');

const environment = process.env.NODE_ENV || 'production';

function createWindow() {
  const { height, width } = screen.getPrimaryDisplay().workAreaSize;

  const mainWindow = new BrowserWindow({
    width,
    height,
    webPreferences: {
      enableRemoteModule: false,
      nodeIntegration: true,
    },
  });

  if (environment === 'development') {
    mainWindow.webContents.openDevTools();
    mainWindow.loadURL('http://localhost:8082');
  } else {
    mainWindow.loadFile(`${app.getAppPath()}/stf-admin-desktop/build/index.html`);
  }
  return mainWindow;
}

const main = async () => {
  createWindow();
  await autoUpdater.checkForUpdatesAndNotify().catch(console.error);
};

app.on('ready', main);

autoUpdater.on('update-not-available', async () => {
  await dialog
    .showMessageBox({
      message: 'Current version is up-to-date.',
      title: 'No Updates',
    })
    .catch(console.error);
});

autoUpdater.on('error', async (err) => {
  await dialog.showErrorBox('Auto update error: ', (err.stack || err).toString());
});
