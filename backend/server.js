const Launcher = require("./src/launcher");

class Server {
  constructor(LauncherInstance = Launcher) {
    this.launcher = new LauncherInstance();
  }

  start() {
    this.launcher.start();
  }
}

new Server().start();