// Backend/src/app.js
const path = require("path");
const Module = require("module");

console.log("🟡 Backend starting...");
console.log("🔵 Current directory:", __dirname);
console.log("🔵 NODE_PATH:", process.env.NODE_PATH);

try {
  // Add root node_modules to module paths (for packaged Electron)
  if (process.resourcesPath) {
    const rootNodeModules = path.join(process.resourcesPath, "app.asar.unpacked", "node_modules");
    console.log("🔵 Adding to NODE_PATH:", rootNodeModules);
    if (!Module.globalPaths.includes(rootNodeModules)) {
      Module.globalPaths.push(rootNodeModules);
    }
  }

  console.log("🟡 Loading dependencies...");
  
  // Load dependencies with error handling
  let express, cors, db, router;
  
  try {
    express = require("express");
    console.log("✅ Express loaded");
  } catch (err) {
    console.error("❌ Failed to load express:", err);
    process.exit(1);
  }
  
  try {
    cors = require("cors");
    console.log("✅ CORS loaded");
  } catch (err) {
    console.error("❌ Failed to load cors:", err);
    process.exit(1);
  }
  
  try {
    db = require("./db/dbcon");
    console.log("✅ Database loaded");
  } catch (err) {
    console.error("❌ Failed to load database:", err);
    process.exit(1);
  }
  
  try {
    router = require("./routers/MainRouters");
    console.log("✅ Routes loaded");
  } catch (err) {
    console.error("❌ Failed to load routes:", err);
    process.exit(1);
  }

  function startServer({ port = 3000 } = {}) {
    console.log("🟡 Creating Express app...");
    
    const app = express();

    app.use(
      cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type"],
        credentials: true,
      })
    );

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    
    // Health check endpoint
    app.get("/health", (req, res) => {
      res.json({ 
        status: "OK", 
        message: "Backend server is running",
        timestamp: new Date().toISOString()
      });
    });
    
    app.use(router);

    const server = app.listen(port, "localhost", () => {
      console.log(`✅ Backend running on http://localhost:${port}`);
      console.log(`🏥 Health check: http://localhost:${port}/health`);
    });

    server.on('error', (err) => {
      console.error('❌ Server error:', err);
      process.exit(1);
    });

    return server;
  }

  // Export for Electron
  module.exports = { startServer };

  // Run standalone
  if (require.main === module) {
    console.log("🟡 Starting server...");
    startServer({ port: process.env.PORT || 3000 });
  }

  console.log("✅ Backend initialized successfully");

} catch (error) {
  console.error("❌ Backend startup error:", error);
  process.exit(1);
}