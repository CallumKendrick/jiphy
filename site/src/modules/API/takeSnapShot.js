// takeSnapShot.js
// ===============

/* Copyright  2015 Yahoo Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */

define([
  'core/utils',
  'core/defaultOptions',
  'API/createGIF'
], function(utils, defaultOptions, createGIF) {
  return function(userOptions, callback) {
    callback = utils.isFunction(userOptions) ? userOptions : callback;
    userOptions = utils.isObject(userOptions) ? userOptions : {};

    if (!utils.isFunction(callback)) {
      return;
    }

    var mergedOptions = utils.mergeOptions(defaultOptions, userOptions),
      options = utils.mergeOptions(mergedOptions, {
        'interval': .1,
        'numFrames': 1,
        'gifWidth': Math.floor(mergedOptions.gifWidth),
        'gifHeight': Math.floor(mergedOptions.gifHeight)
      });

    createGIF(options, callback);
  };
});