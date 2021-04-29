/**
 * Why do we need this? In order to have a single library that can be
 * imported via NPM or the like and have a file that can be run directly
 * in a browser, we have to do this.
 */

 module.exports = require('./index.js').default;
 