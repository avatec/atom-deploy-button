'use babel';

import DeployButtonView from './deploy-button-view';

export default {

  reloadButtonView: null,

  deactivate() {
    this.reloadButtonView.destroy();
  },

  consumeStatusBar(statusBar) {
    this.reloadButtonView = new DeployButtonView(statusBar);
  }

};
