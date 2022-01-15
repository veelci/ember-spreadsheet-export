'use strict';

module.exports = {
  name: 'ember-spreadsheet-export',

  included() {
    this._super.included.apply(this, arguments);
    this.import(`${this.treePaths.vendor}/Blob.js`);
  },
};
