'use babel';

export default class DeployButtonView {

  constructor(statusBar) {
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
    e.preventDefault();
    e.stopPropagation();
    
    let cwd = this.scriptOptions.workingDirectory

    if (!cwd) {
      switch (atom.config.get("script.cwdBehavior")) {
        case "First project directory": {
          const paths = atom.project.getPaths()
          if (paths && paths.length > 0) {
            try {
              cwd = fs.statSync(paths[0]).isDirectory() ? paths[0] : path.join(paths[0], "..")
            } catch (error) {
              /* Don't throw */
            }
          }
          break
        }
        case "Project directory of the script": {
          cwd = this.getProjectPath()
          break
        }
        case "Directory of the script": {
          const pane = atom.workspace.getActivePaneItem()
          cwd =
            (pane &&
              pane.buffer &&
              pane.buffer.file &&
              pane.buffer.file.getParent &&
              pane.buffer.file.getParent() &&
              pane.buffer.file.getParent().getPath &&
              pane.buffer.file.getParent().getPath()) ||
            ""
          break
        }
      }
    }
  }
  
   getProjectPath() {
    const filePath = atom.workspace.getActiveTextEditor().getPath()
    const projectPaths = atom.project.getPaths()
    for (const projectPath of projectPaths) {
      if (filePath.indexOf(projectPath) > -1) {
        if (fs.statSync(projectPath).isDirectory()) {
          return projectPath
        }
        return path.join(projectPath, "..")
      }
    }
    return null
  }
  
  this.bufferedProcess = new BufferedProcess({
    'php git-deploy'
  })

}
