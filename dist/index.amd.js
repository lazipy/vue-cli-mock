define(function () { 'use strict';

  const requireContext = require('require-context');
  const mockFiles = requireContext(`${process.cwd()}/mock`, true, /\.js$/);

  let mockModules = [];
  if (mockFiles.keys().length > 0) {
    mockFiles.keys().forEach(key => {
      mockModules.push(require(`${process.cwd()}/mock/${key}`));
    });
  }

  module.exports = function (app) {
    const methods = ['GET', 'POST', 'PUT', 'DELETE', 'get', 'post', 'put', 'delete'];
    for (let mock of mockModules) {
      Object.keys(mock).forEach(key => {
        let method = key.split(' ')[0];
        let url = key.split(' ')[1];
        if (!methods.includes(method)) {
          method = 'get';
          url = key;
        } else {
          method = method.toLowerCase();
        }

        app[method](url, function (req, res) {
          if (typeof mock[key] === 'function') {
            mock[key](req, res);
          } else {
            res.json(mock[key]);
          }
        });
      });
    }
  };

});
