const { app, BrowserWindow } = require("electron");
const path = require("path");
const fs = require("fs");
const { spawn } = require("child_process");

let mainWindow;
let backendProcess;

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

app.on("second-instance", () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
});

function startBackend() {
  try {
    const backendDir = app.isPackaged
      ? path.join(process.resourcesPath, "app.asar.unpacked", "Backend", "src")
      : path.join(__dirname, "Backend", "src");

    const backendPath = path.join(backendDir, "app.js");
    
    console.log("🔵 Backend directory:", backendDir);
    console.log("🔵 Backend path:", backendPath);
    console.log("📂 Backend exists?", fs.existsSync(backendPath));

    // Check if node_modules exists
    const nodeModulesPath = app.isPackaged
      ? path.join(process.resourcesPath, "app.asar.unpacked", "node_modules")
      : path.join(__dirname, "node_modules");
    
    console.log("📂 node_modules exists?", fs.existsSync(nodeModulesPath));
    console.log("📂 better-sqlite3 exists?", fs.existsSync(path.join(nodeModulesPath, "better-sqlite3")));

    if (!fs.existsSync(backendPath)) {
      console.error("❌ Backend file not found!");
      return;
    }

    // Set up proper environment
    const env = {
      ...process.env,
      NODE_ENV: app.isPackaged ? "production" : "development",
      NODE_PATH: nodeModulesPath,
      ELECTRON_RUN_AS_NODE: "1"
    };

    console.log("🔵 Starting backend process...");

    backendProcess = spawn(process.execPath, [backendPath], {
      cwd: backendDir,
      env: env,
      stdio: ['pipe', 'pipe', 'pipe']
    });

    backendProcess.stdout.on('data', (data) => {
      const output = data.toString().trim();
      if (output) {
        console.log(`🔵 BACKEND: ${output}`);
      }
    });

    backendProcess.stderr.on('data', (data) => {
      const error = data.toString().trim();
      if (error) {
        console.error(`🔴 BACKEND ERROR: ${error}`);
      }
    });

    backendProcess.on("exit", (code, signal) => {
      console.log(`⚠️ Backend exited with code ${code}, signal ${signal}`);
    });

    backendProcess.on("error", (err) => {
      console.error("❌ Failed to start backend process:", err);
    });

  } catch (error) {
    console.error("❌ Error starting backend:", error);
  }
}

function createWindow() {
  // Start backend first
  startBackend();

  // Wait a bit for backend to start
  setTimeout(() => {
    mainWindow = new BrowserWindow({
      width: 1200,
      height: 800,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        devTools: !app.isPackaged,
      },
    });

    if (app.isPackaged) {
      const frontendPath = path.join(process.resourcesPath, "app.asar.unpacked", "factory-management", "dist", "index.html");
      console.log("🖥️ Loading frontend from:", frontendPath);
      mainWindow.loadFile(frontendPath);
    } else {
      mainWindow.loadURL("http://localhost:5173");
      mainWindow.webContents.openDevTools();
    }

    mainWindow.on("closed", () => {
      if (backendProcess) backendProcess.kill();
    });
  }, 2000);
}

app.whenReady().then(createWindow);

app.on("before-quit", () => {
  if (backendProcess) backendProcess.kill();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});