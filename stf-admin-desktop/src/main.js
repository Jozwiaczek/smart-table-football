const { BrowserWindow, app } = require('electron')

const environment = process.env.NODE_ENV || 'production'

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  })

  if (environment === 'development') {
    mainWindow.webContents.openDevTools()
    mainWindow.loadURL('http://localhost:8082')
  } else {
    mainWindow.loadFile('./build/index.html')
  }
  return mainWindow
}

app.on('ready', createWindow)
