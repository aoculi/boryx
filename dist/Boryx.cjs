"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _classPrivateFieldGet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldGet"));

var _classPrivateFieldSet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldSet"));

var _http = require("http");

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

var _routes = /*#__PURE__*/new WeakMap();

var _options = /*#__PURE__*/new WeakMap();

var _server = /*#__PURE__*/new WeakMap();

var Boryx = /*#__PURE__*/function () {
  function Boryx() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      port: 3000
    };
    (0, _classCallCheck2["default"])(this, Boryx);

    _classPrivateFieldInitSpec(this, _routes, {
      writable: true,
      value: []
    });

    _classPrivateFieldInitSpec(this, _options, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _server, {
      writable: true,
      value: null
    });

    (0, _classPrivateFieldSet2["default"])(this, _options, opts);
  }

  (0, _createClass2["default"])(Boryx, [{
    key: "get",
    value: function get(path, callback) {
      (0, _classPrivateFieldGet2["default"])(this, _routes).push({
        method: 'GET',
        path: path,
        callback: callback
      });
    }
  }, {
    key: "list",
    value: function list() {
      return (0, _classPrivateFieldGet2["default"])(this, _routes);
    }
  }, {
    key: "createServer",
    value: function createServer() {
      var _this = this;

      (0, _classPrivateFieldSet2["default"])(this, _server, (0, _http.createServer)(function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(200); // find the good route

        var route = (0, _classPrivateFieldGet2["default"])(_this, _routes).find(function (r) {
          return r.path === req.url && r.method === req.method;
        }); // return error when route not found

        if (!route) return res.end(JSON.stringify({
          error: 'Invalid request!'
        })); // execute route callback

        return route.callback(req, res);
      }));
      return (0, _classPrivateFieldGet2["default"])(this, _server);
    }
  }, {
    key: "run",
    value: function run() {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      if (!(0, _classPrivateFieldGet2["default"])(this, _server)) this.createServer();
      (0, _classPrivateFieldGet2["default"])(this, _server).listen((0, _classPrivateFieldGet2["default"])(this, _options).port);
      if (callback) callback((0, _classPrivateFieldGet2["default"])(this, _options));
    }
  }, {
    key: "close",
    value: function () {
      var _close = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                (0, _classPrivateFieldGet2["default"])(this, _server).close();

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function close() {
        return _close.apply(this, arguments);
      }

      return close;
    }()
  }]);
  return Boryx;
}();

exports["default"] = Boryx;
module.exports = exports.default;

//# sourceMappingURL=Boryx.cjs.map