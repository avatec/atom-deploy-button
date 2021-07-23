'use babel';

import path from "path"
import pty from "pty"

export default class DeployButtonView {

  constructor(statusBar) {
    this.bufferedProcess = null;
    this.emitter = new Emitter();
    this.element = document.createElement('a');
    this.element.classList.add('icon', 'icon-upload');

    this.element.addEventListener('click', this.onClick);

    this.statusBarTile = statusBar.addRightTile({ item: this.element, priority: 1000 });
  }

  destroy() {
    this.statusBarTile.destroy();
    this.statusBarTile = null;

    this.element.removeEventListener('click', this.onClick);

    this.element.remove();
    this.element = null;
  }

  onClick(e) {
    // e.preventDefault();
    // e.stopPropagation();

    let cwd = this.scriptOptions.workingDirectory
    var shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';

    var ptyProcess = pty.spawn(shell, [], {
      name: 'xterm-color',
      cols: 80,
      rows: 30,
      cwd: process.env.HOME,
      env: process.env
    });

  }



}
