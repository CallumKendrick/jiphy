// isSupported.js
// ==============

/* Copyright  2015 Yahoo Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */

define([
  'core/error'
], function(error) {
  return function() {
    return error.isValid();
  };
});