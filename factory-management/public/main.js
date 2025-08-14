const { app, BrowserWindow } = require('electron')
const path = require('path')

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    fullscreen: false,
    frame: true,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      devTools: process.env.NODE_ENV === 'development'
    }
  })

  const viteUrl = process.env.NODE_ENV === 'development'
    ? 'http://localhost:5173'
    : `file://${path.join(__dirname, '../../dist/index.html')}`

  mainWindow.loadURL(viteUrl).catch(err => {
    console.error('Failed to load:', err)
    mainWindow.webContents.send('load-error', err.message)
  })

  // Windows-specific events
  mainWindow.on('closed', () => app.quit())

  // DevTools for development
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.on('did-frame-finish-load', () => {
      mainWindow.webContents.openDevTools({ mode: 'detach' })
    })
  }
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform === 'win32') app.quit()
})