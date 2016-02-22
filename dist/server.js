'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.get('/', function (req, res) {
  res.json({
    code: 'ok1',
    version: '0.0.1'
  });
});

app.listen(3000);