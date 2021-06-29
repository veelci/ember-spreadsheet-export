'use strict';

module.exports = {
  name: require('./package').name,

  included() {
    this._super.included.apply(this, arguments);
    this.import(`${this.treePaths.vendor}/Blob.js`);
  },
};
