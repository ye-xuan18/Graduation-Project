(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!*********************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var objectKeys = ['qy', 'env', 'error', 'version', 'lanDebug', 'cloud', 'serviceMarket', 'router', 'worklet', '__webpack_require_UNI_MP_PLUGIN__'];
var singlePageDisableKey = ['lanDebug', 'router', 'worklet'];
var target = typeof globalThis !== 'undefined' ? globalThis : function () {
  return this;
}();
var key = ['w', 'x'].join('');
var oldWx = target[key];
var launchOption = oldWx.getLaunchOptionsSync ? oldWx.getLaunchOptionsSync() : null;
function isWxKey(key) {
  if (launchOption && launchOption.scene === 1154 && singlePageDisableKey.includes(key)) {
    return false;
  }
  return objectKeys.indexOf(key) > -1 || typeof oldWx[key] === 'function';
}
function initWx() {
  var newWx = {};
  for (var _key in oldWx) {
    if (isWxKey(_key)) {
      // TODO wrapper function
      newWx[_key] = oldWx[_key];
    }
  }
  return newWx;
}
target[key] = initWx();
var _default = target[key];
exports.default = _default;

/***/ }),

/***/ 10:
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableRest.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableRest, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 102:
/*!***********************************************************!*\
  !*** D:/Desktop/code/ending/shop/pages/mine/im/socket.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.socketIO = void 0;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 30));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 32));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ 23));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ 24));
var _config = _interopRequireDefault(__webpack_require__(/*! @/config/config.js */ 33));
var _storage = _interopRequireDefault(__webpack_require__(/*! @/utils/storage */ 36));
var socketIO = /*#__PURE__*/function () {
  function socketIO(data, time, url) {
    (0, _classCallCheck2.default)(this, socketIO);
    this.socketTask = null;
    this.is_open_socket = false; //避免重复连接
    this.url = _config.default.baseWsUrl + '/' + _storage.default.getAccessToken(); //连接地址
    this.data = data ? data : null;
    this.connectNum = 1; // 重连次数
    this.traderDetailIndex = 100; // traderDetailIndex ==2 重连
    this.accountStateIndex = 100; // traderDetailIndex ==1 重连
    this.followFlake = false; // traderDetailIndex == true 重连
    //心跳检测
    this.timeout = time ? time : 15000; //多少秒执行检测
    this.heartbeatInterval = null; //检测服务器端是否还活着
    this.reconnectTimeOut = null; //重连之后多久再次重连
  }
  // 进入这个页面的时候创建websocket连接【整个页面随时使用】
  (0, _createClass2.default)(socketIO, [{
    key: "connectSocketInit",
    value: function connectSocketInit(data) {
      var _this = this;
      this.data = data;
      this.socketTask = uni.connectSocket({
        url: this.url,
        success: function success() {
          console.log("正准备建立websocket中...");
          // 返回实例
          return _this.socketTask;
        }
      });
      this.socketTask.onOpen(function (res) {
        _this.connectNum = 1;
        console.log("WebSocket连接正常！");
        _this.send(data);
        clearInterval(_this.reconnectTimeOut);
        clearInterval(_this.heartbeatInterval);
        _this.is_open_socket = true;
        _this.start();
        // 注：只有连接正常打开中 ，才能正常收到消息
        _this.socketTask.onMessage(function (e) {
          // 字符串转json
          var res = JSON.parse(e.data);
          console.log("res---------->", res); // 这里 查看 推送过来的消息
          if (res.data) {
            uni.$emit('getPositonsOrder', res);
          }
        });
      });
      // 监听连接失败，这里代码我注释掉的原因是因为如果服务器关闭后，和下面的onclose方法一起发起重连操作，这样会导致重复连接
      uni.onSocketError(function (res) {
        console.log('WebSocket连接打开失败，请检查！');
        _this.socketTask = null;
        _this.is_open_socket = false;
        clearInterval(_this.heartbeatInterval);
        clearInterval(_this.reconnectTimeOut);
        uni.$off('getPositonsOrder');
        if (_this.connectNum < 6) {
          uni.showToast({
            title: "WebSocket\u8FDE\u63A5\u5931\u8D25\uFF0C\u6B63\u5C1D\u8BD5\u7B2C".concat(_this.connectNum, "\u6B21\u8FDE\u63A5"),
            icon: "none"
          });
          _this.reconnect();
          _this.connectNum += 1;
        } else {
          uni.$emit('connectError');
          _this.connectNum = 1;
        }
      });
      // 这里仅是事件监听【如果socket关闭了会执行】
      this.socketTask.onClose(function () {
        console.log("已经被关闭了-------");
        clearInterval(_this.heartbeatInterval);
        clearInterval(_this.reconnectTimeOut);
        _this.is_open_socket = false;
        _this.socketTask = null;
        uni.$off('getPositonsOrder');
        if (_this.connectNum < 6) {
          _this.reconnect();
        } else {
          uni.$emit('connectError');
          _this.connectNum = 1;
        }
      });
    }
    // 主动关闭socket连接
  }, {
    key: "Close",
    value: function Close() {
      if (!this.is_open_socket) {
        return;
      }
      this.socketTask.close({
        success: function success() {
          uni.showToast({
            title: 'SocketTask 关闭成功',
            icon: "none"
          });
        }
      });
    }
    //发送消息
  }, {
    key: "send",
    value: function send(data) {
      console.log("data---------->", data);
      // 注：只有连接正常打开中 ，才能正常成功发送消息
      if (this.socketTask) {
        this.socketTask.send({
          data: JSON.stringify(data),
          success: function success() {
            return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
              return _regenerator.default.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      console.log("消息发送成功");
                    case 1:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee);
            }))();
          }
        });
      }
    }
    //开启心跳检测
  }, {
    key: "start",
    value: function start() {
      var _this2 = this;
      this.heartbeatInterval = setInterval(function () {
        _this2.send({
          "traderid": 10260,
          "type": "Ping"
        });
      }, this.timeout);
    }
    //重新连接
  }, {
    key: "reconnect",
    value: function reconnect() {
      var _this3 = this;
      //停止发送心跳
      clearInterval(this.heartbeatInterval);
      //如果不是人为关闭的话，进行重连
      if (!this.is_open_socket && (this.traderDetailIndex == 2 || this.accountStateIndex == 0 || this.followFlake)) {
        this.reconnectTimeOut = setInterval(function () {
          _this3.connectSocketInit(_this3.data);
        }, 5000);
      }
    }
    /**
     * @description 将 scoket 数据进行过滤
     * @param {array} array
     * @param {string} type 区分 弹窗 openposition 分为跟随和我的
     */
  }, {
    key: "arrayFilter",
    value: function arrayFilter(array) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'normal';
      var signalId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var arr1 = [];
      var arr2 = [];
      var obj = {
        arr1: [],
        arr2: []
      };
      arr1 = array.filter(function (v) {
        return v.flwsig == true;
      });
      arr2 = array.filter(function (v) {
        return v.flwsig == false;
      });
      if (type == 'normal') {
        if (signalId) {
          arr1 = array.filter(function (v) {
            return v.flwsig == true && v.sigtraderid == signalId;
          });
          return arr1;
        } else {
          return arr1.concat(arr2);
        }
      } else {
        if (signalId > 0) {
          arr1 = array.filter(function (v) {
            return v.flwsig == true && v.sigtraderid == signalId;
          });
          obj.arr1 = arr1;
        } else {
          obj.arr1 = arr1;
        }
        obj.arr2 = arr2;
        return obj;
      }
    }
  }]);
  return socketIO;
}();
exports.socketIO = socketIO;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 103:
/*!******************************************************************!*\
  !*** D:/Desktop/code/ending/shop/uview-ui/libs/mixin/mpShare.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  onLoad: function onLoad() {
    // 设置默认的转发参数
    this.$u.mpShare = {
      title: '',
      // 默认为小程序名称
      path: '',
      // 默认为当前页面路径
      imageUrl: '' // 默认为当前页面的截图
    };
  },
  onShareAppMessage: function onShareAppMessage() {
    return this.$u.mpShare;
  }
};

/***/ }),

/***/ 11:
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toPropertyKey = __webpack_require__(/*! ./toPropertyKey.js */ 12);
function _defineProperty(obj, key, value) {
  key = toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 12:
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toPropertyKey.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ 13)["default"];
var toPrimitive = __webpack_require__(/*! ./toPrimitive.js */ 14);
function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
module.exports = toPropertyKey, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 124:
/*!**************************************************!*\
  !*** D:/Desktop/code/ending/shop/api/message.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editMessages = editMessages;
exports.getAppVersion = getAppVersion;
exports.getAppVersionList = getAppVersionList;
exports.getLogisticsMessages = getLogisticsMessages;
exports.getMessages = getMessages;
exports.getWeChatMpMessage = getWeChatMpMessage;
exports.messageMarkAsRead = messageMarkAsRead;
exports.messages = messages;
var _request = __webpack_require__(/*! @/utils/request.js */ 43);
var _api = _interopRequireDefault(__webpack_require__(/*! @/config/api.js */ 44));
/**
 * 站内消息相关API
 */

var request = _request.http.request;
/**
 * 获取微信消息订阅
 * @param params
 * @returns {AxiosPromise}
 */
function getWeChatMpMessage() {
  return _request.http.request({
    url: 'passport/connect/miniProgram/subscribeMessage',
    method: _request.Method.GET
  });
}

/**
 * 获取消息列表
 * @param params
 * @returns {AxiosPromise}
 */
function getMessages(params) {
  params = params || {};
  params.pageSize = params.pageSize || 5;
  return _request.http.request({
    url: 'members/member-nocice-logs',
    method: _request.Method.GET,
    needToken: true,
    params: params
  });
}

/**
 * 标记消息为已读
 * @param ids
 */
function messageMarkAsRead(ids) {
  return _request.http.request({
    url: "/message/member/".concat(ids),
    method: _request.Method.PUT,
    needToken: true
  });
}

//读取站内消息
function editMessages(message_id, params) {
  return _request.http.request({
    url: "/message/member/".concat(message_id),
    method: _request.Method.PUT,
    needToken: true,
    params: params
  });
}
//获取站内消息
function messages(params) {
  return _request.http.request({
    url: "/message/member",
    method: _request.Method.GET,
    needToken: true,
    params: params
  });
}

/**
 * 获取物流消息列表
 * @param params
 * @returns {AxiosPromise}
 */
function getLogisticsMessages(params) {
  params = params || {};
  params.pageSize = params.pageSize || 5;
  return _request.http.request({
    url: 'trade/logistics/message',
    method: _request.Method.GET,
    needToken: true,
    params: params
  });
}

/**
 * @param appType
 * @returns {AxiosPromise}
 * 
 */
function getAppVersion(appType) {
  return _request.http.request({
    url: "/other/appVersion/".concat(appType),
    method: _request.Method.GET,
    type: "manager"
  });
}

/**
 * @param appType
 * @returns {AxiosPromise}
 * 
 */
function getAppVersionList(type, data) {
  return _request.http.request({
    url: "/other/appVersion/appVersion/".concat(type),
    method: _request.Method.GET,
    type: "manager",
    data: data
  });
}

/***/ }),

/***/ 1250:
/*!*****************************************************************!*\
  !*** D:/Desktop/code/ending/shop/js_sdk/u-draw-poster/index.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ 13);
Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "DrawPoster", {
  enumerable: true,
  get: function get() {
    return _drawPoster.default;
  }
});
Object.defineProperty(exports, "createFromList", {
  enumerable: true,
  get: function get() {
    return _index3.default;
  }
});
exports.default = void 0;
Object.defineProperty(exports, "drawPainter", {
  enumerable: true,
  get: function get() {
    return _index4.default;
  }
});
Object.defineProperty(exports, "drawQrCode", {
  enumerable: true,
  get: function get() {
    return _index2.default;
  }
});
exports.useDrawPosters = exports.useDrawPoster = void 0;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 30));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 32));
var dfucs = _interopRequireWildcard(__webpack_require__(/*! ./extends/draw-function/index */ 1251));
var _drawPoster = _interopRequireDefault(__webpack_require__(/*! ./draw-poster */ 1265));
var _index2 = _interopRequireDefault(__webpack_require__(/*! ./extends/draw-qr-code/index */ 1266));
var _index3 = _interopRequireDefault(__webpack_require__(/*! ./extends/create-from-list/index */ 1268));
var _index4 = _interopRequireDefault(__webpack_require__(/*! ./extends/draw-painter/index */ 1269));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
_drawPoster.default.useCtx(dfucs.drawImage);
_drawPoster.default.useCtx(dfucs.fillWarpText);
_drawPoster.default.useCtx(dfucs.roundRect);
_drawPoster.default.useCtx(dfucs.fillRoundRect);
_drawPoster.default.useCtx(dfucs.strokeRoundRect);
_drawPoster.default.useCtx(dfucs.drawRoundImage);
_drawPoster.default.useCtx(dfucs.drawImageFit);
var useDrawPoster = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(options) {
    var dp;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _drawPoster.default.build(options);
          case 2:
            dp = _context.sent;
            return _context.abrupt("return", dp);
          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return function useDrawPoster(_x) {
    return _ref.apply(this, arguments);
  };
}();
exports.useDrawPoster = useDrawPoster;
var useDrawPosters = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(optionsAll) {
    var dps;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _drawPoster.default.buildAll(optionsAll);
          case 2:
            dps = _context2.sent;
            return _context2.abrupt("return", dps);
          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return function useDrawPosters(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
exports.useDrawPosters = useDrawPosters;
var _default = _drawPoster.default;
exports.default = _default;

/***/ }),

/***/ 1251:
/*!***************************************************************************************!*\
  !*** D:/Desktop/code/ending/shop/js_sdk/u-draw-poster/extends/draw-function/index.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "drawImage", {
  enumerable: true,
  get: function get() {
    return _drawImage.default;
  }
});
Object.defineProperty(exports, "drawImageFit", {
  enumerable: true,
  get: function get() {
    return _drawImageFit.default;
  }
});
Object.defineProperty(exports, "drawRoundImage", {
  enumerable: true,
  get: function get() {
    return _drawRoundImage.default;
  }
});
Object.defineProperty(exports, "fillRoundRect", {
  enumerable: true,
  get: function get() {
    return _fillRoundRect.default;
  }
});
Object.defineProperty(exports, "fillWarpText", {
  enumerable: true,
  get: function get() {
    return _fillWarpText.default;
  }
});
Object.defineProperty(exports, "roundRect", {
  enumerable: true,
  get: function get() {
    return _roundRect.default;
  }
});
Object.defineProperty(exports, "strokeRoundRect", {
  enumerable: true,
  get: function get() {
    return _strokeRoundRect.default;
  }
});
var _drawImage = _interopRequireDefault(__webpack_require__(/*! ./draw-image */ 1252));
var _roundRect = _interopRequireDefault(__webpack_require__(/*! ./round-rect */ 1258));
var _fillRoundRect = _interopRequireDefault(__webpack_require__(/*! ./fill-round-rect */ 1259));
var _strokeRoundRect = _interopRequireDefault(__webpack_require__(/*! ./stroke-round-rect */ 1260));
var _fillWarpText = _interopRequireDefault(__webpack_require__(/*! ./fill-warp-text */ 1261));
var _drawRoundImage = _interopRequireDefault(__webpack_require__(/*! ./draw-round-image */ 1262));
var _drawImageFit = _interopRequireDefault(__webpack_require__(/*! ./draw-image-fit */ 1263));

/***/ }),

/***/ 1252:
/*!********************************************************************************************!*\
  !*** D:/Desktop/code/ending/shop/js_sdk/u-draw-poster/extends/draw-function/draw-image.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 30));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 32));
var _wxUtils = __webpack_require__(/*! ../../utils/wx-utils */ 1253);
/** 等待绘制图片原型方法 */
var _default = {
  name: 'drawImage',
  init: function init(canvas, ctx) {
    ctx.drawImageProto = ctx.drawImage;
  },
  handle: function () {
    var _handle = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(canvas, ctx, url, sx, sy, sh, sw, dx, dy, dh, dw) {
      var path, result, baseDrawImage;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _wxUtils.downloadImgUrl)(url);
            case 2:
              path = _context.sent;
              // 标记当前绘画存在图片绘制
              result = false; // 基本绘制方法, 如果是 fit 方式, 则传入所有参数, 不然则只传入四个参数
              baseDrawImage = function baseDrawImage(imageResource) {
                var isFit = typeof dx === 'number' && typeof dw === 'number';
                if (isFit) {
                  ctx.drawImageProto(imageResource, sx, sy, sh, sw, dx, dy, dh, dw);
                } else {
                  ctx.drawImageProto(imageResource, sx, sy, sh, sw);
                }
              }; // 如果是 context 绘制方式, 则直接绘制
              if (ctx.drawType === 'context') {
                baseDrawImage(path);
                result = true;
              }
              // 如果是 type2d 绘制方式, 则等待图片绘制完毕
              if (!(ctx.drawType === 'type2d')) {
                _context.next = 10;
                break;
              }
              _context.next = 9;
              return new Promise(function (resolve) {
                var image = canvas.createImage();
                image.src = path;
                image.onload = function () {
                  baseDrawImage(image);
                  resolve(true);
                };
                image.onerror = function () {
                  return resolve(false);
                };
              });
            case 9:
              result = _context.sent;
            case 10:
              return _context.abrupt("return", result);
            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    function handle(_x, _x2, _x3, _x4, _x5, _x6, _x7, _x8, _x9, _x10, _x11) {
      return _handle.apply(this, arguments);
    }
    return handle;
  }()
};
exports.default = _default;

/***/ }),

/***/ 1253:
/*!**************************************************************************!*\
  !*** D:/Desktop/code/ending/shop/js_sdk/u-draw-poster/utils/wx-utils.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCanvas2dContext = exports.downloadImgUrl = void 0;
var _global = _interopRequireDefault(__webpack_require__(/*! ./global */ 1254));
var _utils = __webpack_require__(/*! ./utils */ 1257);
/*
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2020-10-12 08:49:27
 * @LastEditTime: 2020-12-09 13:54:10
 * @Description:
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */

// 下载指定地址图片, 如果不符合下载图片, 则直接返回
var downloadImgUrl = function downloadImgUrl(url) {
  var isLocalFile = (0, _utils.isBaseUrl)(url) || (0, _utils.isTmpUrl)(url) || !(0, _utils.isNetworkUrl)(url);
  return new Promise(function (resolve, reject) {
    if (isLocalFile) {
      return resolve(url);
    }
    _global.default.downloadFile({
      url: url,
      success: function success(res) {
        return resolve(res.tempFilePath);
      },
      fail: reject
    });
  });
};
// 获取当前指定 node 节点
exports.downloadImgUrl = downloadImgUrl;
var getCanvas2dContext = function getCanvas2dContext(selector, componentThis) {
  return new Promise(function (resolve) {
    var query = componentThis ? _global.default.createSelectorQuery().in(componentThis) : _global.default.createSelectorQuery();
    query.select(selector).fields({
      node: true
    }, function (res) {
      var node = res === null || res === void 0 ? void 0 : res.node;
      resolve(node || {});
    }).exec();
  });
};
exports.getCanvas2dContext = getCanvas2dContext;

/***/ }),

/***/ 1254:
/*!************************************************************************!*\
  !*** D:/Desktop/code/ending/shop/js_sdk/u-draw-poster/utils/global.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, uni, wx) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PLATFORM = void 0;
var _a;
var PLATFORM = typeof process !== 'undefined' ? (_a = process === null || process === void 0 ? void 0 : Object({"VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"lilishop","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"})) === null || _a === void 0 ? void 0 : _a.VUE_APP_PLATFORM : undefined;
/** 全局对象 */
exports.PLATFORM = PLATFORM;
var _uni = function () {
  if (typeof uni != "undefined") return uni;
  if (typeof wx != "undefined") return wx;
  return uni;
}();
var _default = _uni;
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../../Software/Development/HBuilderX/plugins/uniapp-cli/node_modules/node-libs-browser/mock/process.js */ 1255), __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"]))

/***/ }),

/***/ 1255:
/*!********************************************************!*\
  !*** ./node_modules/node-libs-browser/mock/process.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports.nextTick = function nextTick(fn) {
    var args = Array.prototype.slice.call(arguments);
    args.shift();
    setTimeout(function () {
        fn.apply(null, args);
    }, 0);
};

exports.platform = exports.arch = 
exports.execPath = exports.title = 'browser';
exports.pid = 1;
exports.browser = true;
exports.env = {};
exports.argv = [];

exports.binding = function (name) {
	throw new Error('No such module. (Possibly not yet loaded)')
};

(function () {
    var cwd = '/';
    var path;
    exports.cwd = function () { return cwd };
    exports.chdir = function (dir) {
        if (!path) path = __webpack_require__(/*! path */ 1256);
        cwd = path.resolve(dir, cwd);
    };
})();

exports.exit = exports.kill = 
exports.umask = exports.dlopen = 
exports.uptime = exports.memoryUsage = 
exports.uvCounters = function() {};
exports.features = {};


/***/ }),

/***/ 1256:
/*!***********************************************!*\
  !*** ./node_modules/path-browserify/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  if (typeof path !== 'string') path = path + '';
  if (path.length === 0) return '.';
  var code = path.charCodeAt(0);
  var hasRoot = code === 47 /*/*/;
  var end = -1;
  var matchedSlash = true;
  for (var i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) return hasRoot ? '/' : '.';
  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/';
  }
  return path.slice(0, end);
};

function basename(path) {
  if (typeof path !== 'string') path = path + '';

  var start = 0;
  var end = -1;
  var matchedSlash = true;
  var i;

  for (i = path.length - 1; i >= 0; --i) {
    if (path.charCodeAt(i) === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // path component
      matchedSlash = false;
      end = i + 1;
    }
  }

  if (end === -1) return '';
  return path.slice(start, end);
}

// Uses a mixed approach for backwards-compatibility, as ext behavior changed
// in new Node.js versions, so only basename() above is backported here
exports.basename = function (path, ext) {
  var f = basename(path);
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  if (typeof path !== 'string') path = path + '';
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;
  for (var i = path.length - 1; i >= 0; --i) {
    var code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46 /*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 ||
      // We saw a non-dot character immediately before the dot
      preDotState === 0 ||
      // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return '';
  }
  return path.slice(startDot, end);
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node-libs-browser/mock/process.js */ 1255)))

/***/ }),

/***/ 1257:
/*!***********************************************************************!*\
  !*** D:/Desktop/code/ending/shop/js_sdk/u-draw-poster/utils/utils.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isTmpUrl = exports.isNetworkUrl = exports.isBaseUrl = exports.handleBuildOpts = exports.extendMount = void 0;
var _global = __webpack_require__(/*! ./global */ 1254);
/** 是否是base64本地地址 */
var isBaseUrl = function isBaseUrl(str) {
  return /^\s*data:(?:[a-z]+\/[a-z0-9-+.]+(?:;[a-z-]+=[a-z0-9-]+)?)?(?:;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s]*?)\s*$/i.test(str);
};
/** 是否是小程序本地地址 */
exports.isBaseUrl = isBaseUrl;
var isTmpUrl = function isTmpUrl(str) {
  return /http:\/\/temp\/wx/.test(str);
};
/** 是否是网络地址 */
exports.isTmpUrl = isTmpUrl;
var isNetworkUrl = function isNetworkUrl(str) {
  return /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/.test(str);
};
/** 对象target挂载到对象current */
exports.isNetworkUrl = isNetworkUrl;
var extendMount = function extendMount(current, target) {
  var handle = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (extend, target) {
    return undefined;
  };
  for (var key in target) {
    current[key] = handle(target[key].handle, target[key]) || target[key].handle;
  }
};
/** 处理构建配置 */
exports.extendMount = extendMount;
var handleBuildOpts = function handleBuildOpts(options) {
  var defaultOpts = {
    selector: '',
    componentThis: undefined,
    type2d: true,
    loading: false,
    debugging: false,
    loadingText: '绘制海报中...',
    createText: '生成图片中...',
    gcanvas: false
  };
  if (typeof options === "string") {
    defaultOpts.selector = options;
  } else {
    defaultOpts = Object.assign(Object.assign({}, defaultOpts), options);
  }
  var oldSelector = defaultOpts.selector;
  if (_global.PLATFORM === 'mp-weixin' && defaultOpts.type2d) {
    defaultOpts.selector = '#' + defaultOpts.selector;
  }
  if (!_global.PLATFORM) {
    console.error('注意! draw-poster未开启uni条件编译! 当环境是微信小程序将不会动态切换为type2d模式');
    console.error("\u8BF7\u5728vue.config.js\u4E2D\u7684transpileDependencies\u4E2D\u6DFB\u52A0'uni-draw-poster'");
    console.error("\u6216\u8005\u53EF\u4EE5\u5728\u9009\u62E9\u5668\u5B57\u7B26\u4E32\u524D\u7F00\u4E2D\u6DFB\u52A0#\u6765\u5207\u6362\u4E3Atype2d\u7ED8\u5236");
    defaultOpts.selector = oldSelector;
  }
  return defaultOpts;
};
exports.handleBuildOpts = handleBuildOpts;

/***/ }),

/***/ 1258:
/*!********************************************************************************************!*\
  !*** D:/Desktop/code/ending/shop/js_sdk/u-draw-poster/extends/draw-function/round-rect.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/** 绘制圆角矩形原型方法 */
var _default = {
  name: 'roundRect',
  handle: function handle(canvas, ctx, x, y, w, h) {
    var r = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 15;
    var fill = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
    var stroke = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : false;
    if (r === 0) {
      if (stroke) ctx.strokeRect(x, y, w, h);
      if (fill) ctx.fillRect(x, y, w, h);
      return;
    }
    if (w < 2 * r) {
      r = w / 2;
    }
    if (h < 2 * r) {
      r = h / 2;
    }
    // 开始绘制
    ctx.beginPath();
    ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5);
    // 移动复制
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.lineTo(x + w, y + r);
    // (x,y,z,j,f) x,y圆心z半径,j起始弧度f，终止弧度
    ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2);
    ctx.lineTo(x + w, y + h - r);
    ctx.lineTo(x + w - r, y + h);
    ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5);
    ctx.lineTo(x + r, y + h);
    ctx.lineTo(x, y + h - r);
    ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI);
    ctx.lineTo(x, y + r);
    ctx.lineTo(x + r, y);
    if (stroke) ctx.stroke();
    if (fill) ctx.fill();
    ctx.closePath();
  }
};
exports.default = _default;

/***/ }),

/***/ 1259:
/*!*************************************************************************************************!*\
  !*** D:/Desktop/code/ending/shop/js_sdk/u-draw-poster/extends/draw-function/fill-round-rect.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/** 绘制填充圆角矩形方法 */
var _default = {
  name: 'fillRoundRect',
  handle: function handle(canvas, ctx, x, y, w, h, r) {
    ctx.roundRect(x, y, w, h, r, true);
  }
};
exports.default = _default;

/***/ }),

/***/ 1260:
/*!***************************************************************************************************!*\
  !*** D:/Desktop/code/ending/shop/js_sdk/u-draw-poster/extends/draw-function/stroke-round-rect.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/** 绘制填充圆角矩形方法 */
var _default = {
  name: 'strokeRoundRect',
  handle: function handle(canvas, ctx, x, y, w, h, r) {
    ctx.roundRect(x, y, w, h, r, false, true);
  }
};
exports.default = _default;

/***/ }),

/***/ 1261:
/*!************************************************************************************************!*\
  !*** D:/Desktop/code/ending/shop/js_sdk/u-draw-poster/extends/draw-function/fill-warp-text.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/** 绘制换行字体原型方法 */
var _default = {
  name: 'fillWarpText',
  handle: function handle(canvas, ctx, config) {
    var newConfig = config = Object.assign({
      maxWidth: 100,
      layer: 2,
      lineHeight: Number(ctx.font.replace(/[^0-9.]/g, '')),
      x: 0,
      y: Number(ctx.font.replace(/[^0-9.]/g, '')) / 1.2,
      splitText: '',
      notFillText: false
    }, config);
    var text = newConfig.text,
      splitText = newConfig.splitText,
      maxWidth = newConfig.maxWidth,
      layer = newConfig.layer,
      lineHeight = newConfig.lineHeight,
      notFillText = newConfig.notFillText,
      x = newConfig.x,
      y = newConfig.y;
    // 当字符串为空时, 抛出错误
    if (!text) {
      throw Error('warpFillText Error: text is empty string');
    }
    // 分割所有单个字符串
    var chr = text.split(splitText);
    // 存入的每行字体的容器
    var row = [];
    // 判断字符串
    var timp = '';
    if (splitText) {
      row = chr;
    } else {
      // 遍历所有字符串, 填充行容器
      for (var i = 0; i < chr.length; i++) {
        // 当超出行列时, 停止执行遍历, 节省计算时间
        if (row.length > layer) {
          break;
        }
        if (ctx.measureText(timp).width < maxWidth) {
          // 如果超出长度, 添加进row数组
          timp += chr[i];
        } else {
          // 如超出一行长度, 则换行, 并清除容器
          i--;
          row.push(timp);
          timp = '';
        }
      }
      // 如有剩下字体, 则在最后时添加一行
      if (timp) {
        row.push(timp);
      }
      // 如果数组长度大于指定行数
      if (row.length > layer) {
        row = row.slice(0, layer);
        // 结束的索引
        var end = layer - 1;
        for (var _i = 0; _i < row[end].length; _i++) {
          var currentWidth = ctx.measureText("".concat(row[end], "...")).width;
          if (currentWidth > maxWidth) {
            // 加上... 当前宽度大于最大宽度时, 去除一位字符串
            var strEnd = row[end].length - 1;
            row[end] = row[end].slice(0, strEnd);
          } else {
            row[end] += '...';
            break;
          }
        }
      }
    }
    // 储存并返回绘制信息
    var drawInfos = row.map(function (item, index) {
      var info = {
        text: item,
        y: y + index * lineHeight,
        x: x
      };
      // 默认执行绘制信息
      if (!notFillText) {
        ctx.fillText(info.text, info.x, info.y);
      }
      return info;
    });
    return drawInfos;
  }
};
exports.default = _default;

/***/ }),

/***/ 1262:
/*!**************************************************************************************************!*\
  !*** D:/Desktop/code/ending/shop/js_sdk/u-draw-poster/extends/draw-function/draw-round-image.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 30));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 32));
/** 绘制圆角图片原型方法 */
var _default = {
  name: 'drawRoundImage',
  handle: function () {
    var _handle = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(canvas, ctx, url, x, y, w, h) {
      var r,
        _a,
        result,
        _args = arguments;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              r = _args.length > 7 && _args[7] !== undefined ? _args[7] : 15;
              ctx.save();
              (_a = ctx.setFillStyle) === null || _a === void 0 ? void 0 : _a.call(ctx, 'transparent');
              ctx.fillStyle = 'transparent';
              ctx.fillRoundRect(x, y, w, h, r);
              ctx.clip();
              _context.next = 8;
              return ctx.drawImage(url, x, y, w, h);
            case 8:
              result = _context.sent;
              ctx.restore();
              return _context.abrupt("return", result);
            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    function handle(_x, _x2, _x3, _x4, _x5, _x6, _x7) {
      return _handle.apply(this, arguments);
    }
    return handle;
  }()
};
exports.default = _default;

/***/ }),

/***/ 1263:
/*!************************************************************************************************!*\
  !*** D:/Desktop/code/ending/shop/js_sdk/u-draw-poster/extends/draw-function/draw-image-fit.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 30));
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 18));
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 5));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 32));
var _objectSizing = __webpack_require__(/*! ../../utils/object-sizing */ 1264);
var _global = _interopRequireDefault(__webpack_require__(/*! ../../utils/global */ 1254));
var _default = {
  name: 'drawImageFit',
  handle: function () {
    var _handle = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(canvas, ctx, url, options) {
      var _a, _b, _c, _yield$uni$getImageIn, _yield$uni$getImageIn2, error, imageInfo, style, drawImageInfo, result;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _global.default.getImageInfo({
                src: url
              });
            case 2:
              _yield$uni$getImageIn = _context.sent;
              _yield$uni$getImageIn2 = (0, _slicedToArray2.default)(_yield$uni$getImageIn, 2);
              error = _yield$uni$getImageIn2[0];
              imageInfo = _yield$uni$getImageIn2[1];
              // 配置默认值
              style = Object.assign({
                radius: 0,
                objectFit: 'cover',
                intrinsicSize: {
                  width: (_a = imageInfo === null || imageInfo === void 0 ? void 0 : imageInfo.width) !== null && _a !== void 0 ? _a : 100,
                  height: (_b = imageInfo === null || imageInfo === void 0 ? void 0 : imageInfo.height) !== null && _b !== void 0 ? _b : 100
                },
                specifiedSize: {
                  width: 100,
                  height: 100
                },
                intrinsicPosition: ['center', 'center'],
                specifiedPosition: [0, 0]
              }, options); // 计算图片尺寸
              drawImageInfo = (0, _objectSizing.calculateConcreteRect)(style, style.intrinsicSize, style.specifiedSize); // 如有圆角, 则进行裁剪
              if (style.radius > 0) {
                ctx.save();
                (_c = ctx.setFillStyle) === null || _c === void 0 ? void 0 : _c.call(ctx, 'transparent');
                ctx.fillStyle = 'transparent';
                ctx.fillRoundRect(style.specifiedPosition[0], style.specifiedPosition[1], style.specifiedSize.width, style.specifiedSize.height, style.radius);
                ctx.clip();
              }
              _context.next = 11;
              return ctx.drawImage.apply(ctx, [url].concat((0, _toConsumableArray2.default)(Object.values(drawImageInfo))));
            case 11:
              result = _context.sent;
              if (style.radius > 0) ctx.restore();
              return _context.abrupt("return", result);
            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    function handle(_x, _x2, _x3, _x4) {
      return _handle.apply(this, arguments);
    }
    return handle;
  }()
};
exports.default = _default;

/***/ }),

/***/ 1264:
/*!*******************************************************************************!*\
  !*** D:/Desktop/code/ending/shop/js_sdk/u-draw-poster/utils/object-sizing.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateConcreteRect = calculateConcreteRect;
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 5));
/**
 * 用于计算图片的宽高比例
 * @see https://drafts.csswg.org/css-images-3/#sizing-terms
 *
 * ## 名词解释
 * ### intrinsic dimensions
 * 图片本身的尺寸
 *
 * ### specified size
 * 用户指定的元素尺寸
 *
 * ### concrete object size
 * 应用了 `objectFit` 之后图片的显示尺寸
 *
 * ### default object size
 */
function calculateConcreteRect(style, intrinsicSize, specifiedSize) {
  var _a, _b;
  var isContain = style.objectFit === 'contain';
  var specifiedPosition = style.specifiedPosition || [0, 0];
  // ratio 越大表示矩形越"扁"
  var intrinsicRatio = intrinsicSize.width / intrinsicSize.height;
  var specifiedRatio = specifiedSize.width / specifiedSize.height;
  /** 图片原始尺寸与最终尺寸之比 */
  var concreteScale = 1;
  if (intrinsicRatio > specifiedRatio && style.objectFit == "contain" || intrinsicRatio <= specifiedRatio && style.objectFit == "cover")
    // 图片较"胖"时完整显示图片，图片较"瘦"时完全覆盖容器
    // 这两种情况下有 concreteRect.width = specifiedSize.width
    // 因为 concreteRect.width = intrinsicSize.width * concreteScale
    // 所以:
    concreteScale = specifiedSize.width / intrinsicSize.width;else if (intrinsicRatio > specifiedRatio && style.objectFit == "cover" || intrinsicRatio <= specifiedRatio && style.objectFit == "contain")
    // 图片较"瘦"时完整显示图片，图片较"胖"时完全覆盖容器
    // 这两种情况下有 concreteRect.height = specifiedSize.height
    // 因为 concreteRect.height = intrinsicSize.height * concreteScale
    // 所以:
    concreteScale = specifiedSize.height / intrinsicSize.height;else throw new Error("Unkonwn concreteScale");
  var concreteRectWidth = intrinsicSize.width * concreteScale;
  var concreteRectHeight = intrinsicSize.height * concreteScale;
  // 这里可以把 left top 的计算想象成投影
  var xRelativeOrigin = {
    left: 0,
    center: .5,
    right: 1
  }[((_a = style.intrinsicPosition) === null || _a === void 0 ? void 0 : _a[0]) || "center"];
  var yRelativeOrigin = {
    top: 0,
    center: .5,
    bottom: 1
  }[((_b = style.intrinsicPosition) === null || _b === void 0 ? void 0 : _b[1]) || "center"];
  var concreteRectLeft = (specifiedSize.width - concreteRectWidth) * xRelativeOrigin;
  var concreteRectTop = (specifiedSize.height - concreteRectHeight) * yRelativeOrigin;
  if (isContain) {
    concreteRectLeft += specifiedPosition[0];
    concreteRectTop += specifiedPosition[1];
  }
  // 这里有两个坐标系，一个是 specified (dist) 的坐标系，一个是 intrinsic (src) 的坐标系
  // 这里将两个坐标系的点位置进行变换
  // 例: 带入 x=0, y=0, 得到的结果就是 specifiedRect 的左上角在 intrinsic 坐标系下的坐标位置
  // 在 specified 坐标系下, intrinsic 的零点在 (concreteRectLeft, concreteRectTop), 缩放为 concreteScale
  // 所以有 x_dist = x_src * concreteScale + concreteRectLeft
  //        y_dist = y_src * concreteScale + concreteRectTop
  var dist2src = function dist2src(distX, distY) {
    return [/* srcX = */(distX - concreteRectLeft) / concreteScale, /* srcY = */(distY - concreteRectTop) / concreteScale];
  };
  var _dist2src = dist2src(0, 0),
    _dist2src2 = (0, _slicedToArray2.default)(_dist2src, 2),
    srcLeft = _dist2src2[0],
    srcTop = _dist2src2[1];
  // srcRight =  图片 specified 框右边在 src 坐标系下的 x 坐标
  // srcBottom = 图片 specified 框下边在 src 坐标系下的 y 坐标
  var _dist2src3 = dist2src(specifiedSize.width, specifiedSize.height),
    _dist2src4 = (0, _slicedToArray2.default)(_dist2src3, 2),
    srcRight = _dist2src4[0],
    srcBottom = _dist2src4[1];
  // 这里要对 src 和 disc 两个框进行约束
  return {
    sx: Math.max(srcLeft, 0),
    sy: Math.max(srcTop, 0),
    sw: Math.min(srcRight - srcLeft, intrinsicSize.width),
    sh: Math.min(srcBottom - srcTop, intrinsicSize.height),
    dx: isContain ? Math.max(concreteRectLeft, 0) : specifiedPosition[0],
    dy: isContain ? Math.max(concreteRectTop, 0) : specifiedPosition[1],
    dw: Math.min(concreteRectWidth, specifiedSize.width),
    dh: Math.min(concreteRectHeight, specifiedSize.height)
  };
}

/***/ }),

/***/ 1265:
/*!***********************************************************************!*\
  !*** D:/Desktop/code/ending/shop/js_sdk/u-draw-poster/draw-poster.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 30));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 32));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ 24));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ 23));
var _global = _interopRequireDefault(__webpack_require__(/*! ./utils/global */ 1254));
var _utils = __webpack_require__(/*! ./utils/utils */ 1257);
var _wxUtils = __webpack_require__(/*! ./utils/wx-utils */ 1253);
// 扩展挂载储存
var drawPosterExtend = {};
var drawCtxPosterExtend = {};
var DrawPoster = /*#__PURE__*/(0, _createClass2.default)( /** 构建器, 构建返回当前实例, 并挂载多个方法 */
function DrawPoster(canvas, ctx, canvasId, loading, debugging, loadingText, createText, tips) {
  var _this2 = this;
  (0, _classCallCheck2.default)(this, DrawPoster);
  var _a;
  this.canvas = canvas;
  this.ctx = ctx;
  this.canvasId = canvasId;
  this.loading = loading;
  this.debugging = debugging;
  this.loadingText = loadingText;
  this.createText = createText;
  this.executeOnions = [];
  this.stopStatus = false;
  /** 提示器, 传入消息与数据 */
  this.debuggingLog = function (message, data) {
    var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "#3489fd";
    if (_this2.debugging) {
      if (data) {
        console.log("%c".concat(_this2.canvasId, " -> ").concat(message), "color: ".concat(color), data);
      } else {
        console.log("%c".concat(_this2.canvasId, " -> ").concat(message), "color: ".concat(color));
      }
    }
  };
  /** 绘制器, 接收执行器函数, 添加到绘制容器中 */
  this.draw = function (execute) {
    var length = _this2.executeOnions.length;
    _this2.executeOnions.push( /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
      var _a, _b, isOutError;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _this2.ctx.save();
              _context.next = 4;
              return execute(_this2.ctx);
            case 4:
              _this2.ctx.restore();
              return _context.abrupt("return", true);
            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](0);
              isOutError = ((_b = (_a = _context.t0 === null || _context.t0 === void 0 ? void 0 : _context.t0.message) === null || _a === void 0 ? void 0 : _a.search) === null || _b === void 0 ? void 0 : _b.call(_a, "'nodeId' of undefined")) >= 0;
              !isOutError && console.error("".concat(_this2.canvasId, " -> \u7ED8\u753B\u6808(").concat(length, ")\uFF0C\u7ED8\u5236\u9519\u8BEF\uFF1A"), _context.t0);
              return _context.abrupt("return", false);
            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 8]]);
    })));
  };
  /** 等待创建绘画, 成功后清空绘制器容器 */
  this.awaitCreate = /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
    var tips, i, execute;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _this2.debuggingLog('绘制海报中...');
            _this2.loading && _global.default.showLoading({
              title: _this2.loadingText
            });
            tips = [];
            i = 0;
          case 4:
            if (!(i < _this2.executeOnions.length)) {
              _context2.next = 14;
              break;
            }
            execute = _this2.executeOnions[i];
            _context2.t0 = tips;
            _context2.next = 9;
            return execute();
          case 9:
            _context2.t1 = _context2.sent;
            _context2.t0.push.call(_context2.t0, _context2.t1);
          case 11:
            i++;
            _context2.next = 4;
            break;
          case 14:
            _this2.executeOnions = [];
            _this2.debuggingLog('绘制状况', tips);
            // 当前绘制为 type2 绘制
            if (!(_this2.drawType === 'type2d')) {
              _context2.next = 19;
              break;
            }
            _this2.loading && _global.default.hideLoading();
            return _context2.abrupt("return", tips);
          case 19:
            _context2.next = 21;
            return new Promise(function (resolve) {
              _this2.ctx.draw(true, function () {
                resolve(tips);
                _this2.loading && _global.default.hideLoading();
              });
            });
          case 21:
            return _context2.abrupt("return", _context2.sent);
          case 22:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  /** 创建canvas本地地址 @returns {string} 本地地址 */
  this.createImagePath = /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
    var baseOptions,
      canvas,
      canvasId,
      executeOnions,
      awaitCreate,
      options,
      _args3 = arguments;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            baseOptions = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {};
            canvas = _this2.canvas, canvasId = _this2.canvasId, executeOnions = _this2.executeOnions, awaitCreate = _this2.awaitCreate;
            _context3.t0 = executeOnions.length;
            if (!_context3.t0) {
              _context3.next = 6;
              break;
            }
            _context3.next = 6;
            return awaitCreate();
          case 6:
            if (!_this2.stopStatus) {
              _context3.next = 9;
              break;
            }
            _this2.stopStatus = false;
            return _context3.abrupt("return", '---stop createImagePath---');
          case 9:
            _this2.loading && _global.default.showLoading({
              title: _this2.createText
            });
            options = Object.assign({}, baseOptions);
            if (_this2.drawType === 'context') options.canvasId = canvasId;
            if (_this2.drawType === 'type2d') options.canvas = canvas;
            console.log(options);
            return _context3.abrupt("return", new Promise(function (resolve, reject) {
              options.success = function (res) {
                resolve(res.tempFilePath);
                _this2.loading && _global.default.hideLoading();
                _this2.debuggingLog('绘制成功 🎉', res, '#19be6b');
              };
              options.fail = function (err) {
                reject(err);
                _this2.loading && _global.default.hideLoading();
                _this2.debuggingLog('绘制失败 🌟', err, '#fa3534');
              };
              _global.default.canvasToTempFilePath(options);
            }));
          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  /** 停止当前绘画, 调用则停止当前绘画堆栈的绘画 */
  this.stop = function () {
    _this2.executeOnions = [];
    _this2.stopStatus = true;
  };
  if (!canvas || !ctx || !canvasId) {
    throw new Error("DrawPoster Error: Use DrawPoster.build(string | ops) to build drawPoster instance objects");
  }
  // 判断当前绘制类型
  ctx.drawType = this.drawType = ctx.draw ? 'context' : 'type2d';
  // 挂载全局实例, 绘画扩展
  (0, _utils.extendMount)(this.ctx, drawCtxPosterExtend, function (extend, target) {
    var _a;
    (_a = target === null || target === void 0 ? void 0 : target.init) === null || _a === void 0 ? void 0 : _a.call(target, _this2.canvas, _this2.ctx);
    return function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return extend.apply(void 0, [_this2.canvas, _this2.ctx].concat(args));
    };
  });
  (0, _utils.extendMount)(this, drawPosterExtend, function (extend, target) {
    var _a;
    (_a = target === null || target === void 0 ? void 0 : target.init) === null || _a === void 0 ? void 0 : _a.call(target, _this2);
    return function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      return extend.apply(void 0, [_this2].concat(args));
    };
  });
  // 当离开页面时, 自动调用停止绘画
  var _this = this;
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  // 查询标识, 不存在, 在替换页面卸载回调, 避免产生死循环
  if (!((_a = page === null || page === void 0 ? void 0 : page.onUnload) === null || _a === void 0 ? void 0 : _a.identification)) {
    page.oldOnUnload = page.onUnload;
    page.onUnload = function () {
      _this === null || _this === void 0 ? void 0 : _this.stop();
      page.oldOnUnload();
    };
    page.onUnload.identification = true;
  }
  tips && this.debuggingLog('构建完成', {
    canvas: canvas,
    ctx: ctx,
    selector: canvasId
  }, '#19be6b');
});
/** 传入挂载配置对象, 添加扩展方法 */
DrawPoster.use = function (opts) {
  if (opts.name) drawPosterExtend[opts.name] = opts;
};
/** 传入挂载配置对象, 添加绘画扩展方法 */
DrawPoster.useCtx = function (opts) {
  if (opts.name) drawCtxPosterExtend[opts.name] = opts;
};
/** 构建绘制海报矩形方法, 传入canvas选择器或配置对象, 返回绘制对象 */
DrawPoster.build = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(options) {
    var tips,
      _a,
      _b,
      _c,
      _d,
      _e,
      config,
      pages,
      page,
      gcanvas,
      canvas,
      ctx,
      dp,
      _args4 = arguments;
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            tips = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : true;
            config = (0, _utils.handleBuildOpts)(options); // 初始化监测当前页面绘制对象
            pages = getCurrentPages();
            page = pages[pages.length - 1];
            gcanvas = DrawPoster.prototype['gcanvas'];
            if (!page[config.selector + '__dp']) {
              _context4.next = 7;
              break;
            }
            return _context4.abrupt("return", page[config.selector + '__dp']);
          case 7:
            if (config.gcanvas) {
              if (!gcanvas) console.error('--- 当前未引入gcanvas扩展, 将自动切换为普通 canvas ---');else gcanvas.enable((_b = (_a = config.componentThis) === null || _a === void 0 ? void 0 : _a.$refs) === null || _b === void 0 ? void 0 : _b[config.selector], {
                bridge: gcanvas.WeexBridge
              });
            }
            // 获取canvas实例
            if (!(config.gcanvas && gcanvas)) {
              _context4.next = 12;
              break;
            }
            _context4.t0 = gcanvas.enable((_d = (_c = config.componentThis) === null || _c === void 0 ? void 0 : _c.$refs) === null || _d === void 0 ? void 0 : _d[config.selector], {
              bridge: gcanvas.WeexBridge
            });
            _context4.next = 15;
            break;
          case 12:
            _context4.next = 14;
            return (0, _wxUtils.getCanvas2dContext)(config.selector, config.componentThis);
          case 14:
            _context4.t0 = _context4.sent;
          case 15:
            canvas = _context4.t0;
            ctx = ((_e = canvas.getContext) === null || _e === void 0 ? void 0 : _e.call(canvas, "2d")) || _global.default.createCanvasContext(config.selector, config.componentThis);
            dp = new DrawPoster(canvas, ctx, config.selector, config.loading, config.debugging, config.loadingText, config.createText, tips); // 储存当前绘制对象
            page[config.selector + '__dp'] = dp;
            return _context4.abrupt("return", page[config.selector + '__dp']);
          case 20:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return function (_x) {
    return _ref4.apply(this, arguments);
  };
}();
/** 构建多个绘制海报矩形方法, 传入选择器或配置对象的数组, 返回多个绘制对象 */
DrawPoster.buildAll = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6(optionsAll) {
    var dpsArr, dpsObj;
    return _regenerator.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return Promise.all(optionsAll.map( /*#__PURE__*/function () {
              var _ref6 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(options) {
                return _regenerator.default.wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        _context5.next = 2;
                        return DrawPoster.build(options, false);
                      case 2:
                        return _context5.abrupt("return", _context5.sent);
                      case 3:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, _callee5);
              }));
              return function (_x3) {
                return _ref6.apply(this, arguments);
              };
            }()));
          case 2:
            dpsArr = _context6.sent;
            dpsObj = {};
            dpsArr.forEach(function (dp) {
              return dpsObj[dp.canvasId] = dp;
            });
            console.log("%cdraw-poster 构建完成：", "#E3712A", dpsObj);
            return _context6.abrupt("return", dpsObj);
          case 7:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return function (_x2) {
    return _ref5.apply(this, arguments);
  };
}();
var _default = DrawPoster;
exports.default = _default;

/***/ }),

/***/ 1266:
/*!**************************************************************************************!*\
  !*** D:/Desktop/code/ending/shop/js_sdk/u-draw-poster/extends/draw-qr-code/index.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _uQRCode = _interopRequireDefault(__webpack_require__(/*! ./uQRCode */ 1267));
var _default = {
  name: "drawQrCode",
  handle: _uQRCode.default.make.bind(_uQRCode.default),
  errorCorrectLevel: _uQRCode.default.errorCorrectLevel
};
exports.default = _default;

/***/ }),

/***/ 1267:
/*!****************************************************************************************!*\
  !*** D:/Desktop/code/ending/shop/js_sdk/u-draw-poster/extends/draw-qr-code/uQRCode.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-02 13:30:58
 * @LastEditTime: 2021-01-02 13:30:58
 * @Description: 
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
//---------------------------------------------------------------------
// github https://github.com/Sansnn/uQRCode
//---------------------------------------------------------------------

var uQRCode = {};
(function () {
  //---------------------------------------------------------------------
  // QRCode for JavaScript
  //
  // Copyright (c) 2009 Kazuhiko Arase
  //
  // URL: http://www.d-project.com/
  //
  // Licensed under the MIT license:
  //   http://www.opensource.org/licenses/mit-license.php
  //
  // The word "QR Code" is registered trademark of 
  // DENSO WAVE INCORPORATED
  //   http://www.denso-wave.com/qrcode/faqpatent-e.html
  //
  //---------------------------------------------------------------------

  //---------------------------------------------------------------------
  // QR8bitByte
  //---------------------------------------------------------------------

  function QR8bitByte(data) {
    this.mode = QRMode.MODE_8BIT_BYTE;
    this.data = data;
  }
  QR8bitByte.prototype = {
    getLength: function getLength(buffer) {
      return this.data.length;
    },
    write: function write(buffer) {
      for (var i = 0; i < this.data.length; i++) {
        // not JIS ...
        buffer.put(this.data.charCodeAt(i), 8);
      }
    }
  };

  //---------------------------------------------------------------------
  // QRCode
  //---------------------------------------------------------------------

  function QRCode(typeNumber, errorCorrectLevel) {
    this.typeNumber = typeNumber;
    this.errorCorrectLevel = errorCorrectLevel;
    this.modules = null;
    this.moduleCount = 0;
    this.dataCache = null;
    this.dataList = new Array();
  }
  QRCode.prototype = {
    addData: function addData(data) {
      var newData = new QR8bitByte(data);
      this.dataList.push(newData);
      this.dataCache = null;
    },
    isDark: function isDark(row, col) {
      if (row < 0 || this.moduleCount <= row || col < 0 || this.moduleCount <= col) {
        throw new Error(row + "," + col);
      }
      return this.modules[row][col];
    },
    getModuleCount: function getModuleCount() {
      return this.moduleCount;
    },
    make: function make() {
      // Calculate automatically typeNumber if provided is < 1
      if (this.typeNumber < 1) {
        var typeNumber = 1;
        for (typeNumber = 1; typeNumber < 40; typeNumber++) {
          var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, this.errorCorrectLevel);
          var buffer = new QRBitBuffer();
          var totalDataCount = 0;
          for (var i = 0; i < rsBlocks.length; i++) {
            totalDataCount += rsBlocks[i].dataCount;
          }
          for (var i = 0; i < this.dataList.length; i++) {
            var data = this.dataList[i];
            buffer.put(data.mode, 4);
            buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber));
            data.write(buffer);
          }
          if (buffer.getLengthInBits() <= totalDataCount * 8) break;
        }
        this.typeNumber = typeNumber;
      }
      this.makeImpl(false, this.getBestMaskPattern());
    },
    makeImpl: function makeImpl(test, maskPattern) {
      this.moduleCount = this.typeNumber * 4 + 17;
      this.modules = new Array(this.moduleCount);
      for (var row = 0; row < this.moduleCount; row++) {
        this.modules[row] = new Array(this.moduleCount);
        for (var col = 0; col < this.moduleCount; col++) {
          this.modules[row][col] = null; //(col + row) % 3;
        }
      }

      this.setupPositionProbePattern(0, 0);
      this.setupPositionProbePattern(this.moduleCount - 7, 0);
      this.setupPositionProbePattern(0, this.moduleCount - 7);
      this.setupPositionAdjustPattern();
      this.setupTimingPattern();
      this.setupTypeInfo(test, maskPattern);
      if (this.typeNumber >= 7) {
        this.setupTypeNumber(test);
      }
      if (this.dataCache == null) {
        this.dataCache = QRCode.createData(this.typeNumber, this.errorCorrectLevel, this.dataList);
      }
      this.mapData(this.dataCache, maskPattern);
    },
    setupPositionProbePattern: function setupPositionProbePattern(row, col) {
      for (var r = -1; r <= 7; r++) {
        if (row + r <= -1 || this.moduleCount <= row + r) continue;
        for (var c = -1; c <= 7; c++) {
          if (col + c <= -1 || this.moduleCount <= col + c) continue;
          if (0 <= r && r <= 6 && (c == 0 || c == 6) || 0 <= c && c <= 6 && (r == 0 || r == 6) || 2 <= r && r <= 4 && 2 <= c && c <= 4) {
            this.modules[row + r][col + c] = true;
          } else {
            this.modules[row + r][col + c] = false;
          }
        }
      }
    },
    getBestMaskPattern: function getBestMaskPattern() {
      var minLostPoint = 0;
      var pattern = 0;
      for (var i = 0; i < 8; i++) {
        this.makeImpl(true, i);
        var lostPoint = QRUtil.getLostPoint(this);
        if (i == 0 || minLostPoint > lostPoint) {
          minLostPoint = lostPoint;
          pattern = i;
        }
      }
      return pattern;
    },
    createMovieClip: function createMovieClip(target_mc, instance_name, depth) {
      var qr_mc = target_mc.createEmptyMovieClip(instance_name, depth);
      var cs = 1;
      this.make();
      for (var row = 0; row < this.modules.length; row++) {
        var y = row * cs;
        for (var col = 0; col < this.modules[row].length; col++) {
          var x = col * cs;
          var dark = this.modules[row][col];
          if (dark) {
            qr_mc.beginFill(0, 100);
            qr_mc.moveTo(x, y);
            qr_mc.lineTo(x + cs, y);
            qr_mc.lineTo(x + cs, y + cs);
            qr_mc.lineTo(x, y + cs);
            qr_mc.endFill();
          }
        }
      }
      return qr_mc;
    },
    setupTimingPattern: function setupTimingPattern() {
      for (var r = 8; r < this.moduleCount - 8; r++) {
        if (this.modules[r][6] != null) {
          continue;
        }
        this.modules[r][6] = r % 2 == 0;
      }
      for (var c = 8; c < this.moduleCount - 8; c++) {
        if (this.modules[6][c] != null) {
          continue;
        }
        this.modules[6][c] = c % 2 == 0;
      }
    },
    setupPositionAdjustPattern: function setupPositionAdjustPattern() {
      var pos = QRUtil.getPatternPosition(this.typeNumber);
      for (var i = 0; i < pos.length; i++) {
        for (var j = 0; j < pos.length; j++) {
          var row = pos[i];
          var col = pos[j];
          if (this.modules[row][col] != null) {
            continue;
          }
          for (var r = -2; r <= 2; r++) {
            for (var c = -2; c <= 2; c++) {
              if (r == -2 || r == 2 || c == -2 || c == 2 || r == 0 && c == 0) {
                this.modules[row + r][col + c] = true;
              } else {
                this.modules[row + r][col + c] = false;
              }
            }
          }
        }
      }
    },
    setupTypeNumber: function setupTypeNumber(test) {
      var bits = QRUtil.getBCHTypeNumber(this.typeNumber);
      for (var i = 0; i < 18; i++) {
        var mod = !test && (bits >> i & 1) == 1;
        this.modules[Math.floor(i / 3)][i % 3 + this.moduleCount - 8 - 3] = mod;
      }
      for (var i = 0; i < 18; i++) {
        var mod = !test && (bits >> i & 1) == 1;
        this.modules[i % 3 + this.moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
      }
    },
    setupTypeInfo: function setupTypeInfo(test, maskPattern) {
      var data = this.errorCorrectLevel << 3 | maskPattern;
      var bits = QRUtil.getBCHTypeInfo(data);

      // vertical		
      for (var i = 0; i < 15; i++) {
        var mod = !test && (bits >> i & 1) == 1;
        if (i < 6) {
          this.modules[i][8] = mod;
        } else if (i < 8) {
          this.modules[i + 1][8] = mod;
        } else {
          this.modules[this.moduleCount - 15 + i][8] = mod;
        }
      }

      // horizontal
      for (var i = 0; i < 15; i++) {
        var mod = !test && (bits >> i & 1) == 1;
        if (i < 8) {
          this.modules[8][this.moduleCount - i - 1] = mod;
        } else if (i < 9) {
          this.modules[8][15 - i - 1 + 1] = mod;
        } else {
          this.modules[8][15 - i - 1] = mod;
        }
      }

      // fixed module
      this.modules[this.moduleCount - 8][8] = !test;
    },
    mapData: function mapData(data, maskPattern) {
      var inc = -1;
      var row = this.moduleCount - 1;
      var bitIndex = 7;
      var byteIndex = 0;
      for (var col = this.moduleCount - 1; col > 0; col -= 2) {
        if (col == 6) col--;
        while (true) {
          for (var c = 0; c < 2; c++) {
            if (this.modules[row][col - c] == null) {
              var dark = false;
              if (byteIndex < data.length) {
                dark = (data[byteIndex] >>> bitIndex & 1) == 1;
              }
              var mask = QRUtil.getMask(maskPattern, row, col - c);
              if (mask) {
                dark = !dark;
              }
              this.modules[row][col - c] = dark;
              bitIndex--;
              if (bitIndex == -1) {
                byteIndex++;
                bitIndex = 7;
              }
            }
          }
          row += inc;
          if (row < 0 || this.moduleCount <= row) {
            row -= inc;
            inc = -inc;
            break;
          }
        }
      }
    }
  };
  QRCode.PAD0 = 0xEC;
  QRCode.PAD1 = 0x11;
  QRCode.createData = function (typeNumber, errorCorrectLevel, dataList) {
    var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectLevel);
    var buffer = new QRBitBuffer();
    for (var i = 0; i < dataList.length; i++) {
      var data = dataList[i];
      buffer.put(data.mode, 4);
      buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber));
      data.write(buffer);
    }

    // calc num max data.
    var totalDataCount = 0;
    for (var i = 0; i < rsBlocks.length; i++) {
      totalDataCount += rsBlocks[i].dataCount;
    }
    if (buffer.getLengthInBits() > totalDataCount * 8) {
      throw new Error("code length overflow. (" + buffer.getLengthInBits() + ">" + totalDataCount * 8 + ")");
    }

    // end code
    if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
      buffer.put(0, 4);
    }

    // padding
    while (buffer.getLengthInBits() % 8 != 0) {
      buffer.putBit(false);
    }

    // padding
    while (true) {
      if (buffer.getLengthInBits() >= totalDataCount * 8) {
        break;
      }
      buffer.put(QRCode.PAD0, 8);
      if (buffer.getLengthInBits() >= totalDataCount * 8) {
        break;
      }
      buffer.put(QRCode.PAD1, 8);
    }
    return QRCode.createBytes(buffer, rsBlocks);
  };
  QRCode.createBytes = function (buffer, rsBlocks) {
    var offset = 0;
    var maxDcCount = 0;
    var maxEcCount = 0;
    var dcdata = new Array(rsBlocks.length);
    var ecdata = new Array(rsBlocks.length);
    for (var r = 0; r < rsBlocks.length; r++) {
      var dcCount = rsBlocks[r].dataCount;
      var ecCount = rsBlocks[r].totalCount - dcCount;
      maxDcCount = Math.max(maxDcCount, dcCount);
      maxEcCount = Math.max(maxEcCount, ecCount);
      dcdata[r] = new Array(dcCount);
      for (var i = 0; i < dcdata[r].length; i++) {
        dcdata[r][i] = 0xff & buffer.buffer[i + offset];
      }
      offset += dcCount;
      var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
      var rawPoly = new QRPolynomial(dcdata[r], rsPoly.getLength() - 1);
      var modPoly = rawPoly.mod(rsPoly);
      ecdata[r] = new Array(rsPoly.getLength() - 1);
      for (var i = 0; i < ecdata[r].length; i++) {
        var modIndex = i + modPoly.getLength() - ecdata[r].length;
        ecdata[r][i] = modIndex >= 0 ? modPoly.get(modIndex) : 0;
      }
    }
    var totalCodeCount = 0;
    for (var i = 0; i < rsBlocks.length; i++) {
      totalCodeCount += rsBlocks[i].totalCount;
    }
    var data = new Array(totalCodeCount);
    var index = 0;
    for (var i = 0; i < maxDcCount; i++) {
      for (var r = 0; r < rsBlocks.length; r++) {
        if (i < dcdata[r].length) {
          data[index++] = dcdata[r][i];
        }
      }
    }
    for (var i = 0; i < maxEcCount; i++) {
      for (var r = 0; r < rsBlocks.length; r++) {
        if (i < ecdata[r].length) {
          data[index++] = ecdata[r][i];
        }
      }
    }
    return data;
  };

  //---------------------------------------------------------------------
  // QRMode
  //---------------------------------------------------------------------

  var QRMode = {
    MODE_NUMBER: 1 << 0,
    MODE_ALPHA_NUM: 1 << 1,
    MODE_8BIT_BYTE: 1 << 2,
    MODE_KANJI: 1 << 3
  };

  //---------------------------------------------------------------------
  // QRErrorCorrectLevel
  //---------------------------------------------------------------------

  var QRErrorCorrectLevel = {
    L: 1,
    M: 0,
    Q: 3,
    H: 2
  };

  //---------------------------------------------------------------------
  // QRMaskPattern
  //---------------------------------------------------------------------

  var QRMaskPattern = {
    PATTERN000: 0,
    PATTERN001: 1,
    PATTERN010: 2,
    PATTERN011: 3,
    PATTERN100: 4,
    PATTERN101: 5,
    PATTERN110: 6,
    PATTERN111: 7
  };

  //---------------------------------------------------------------------
  // QRUtil
  //---------------------------------------------------------------------

  var QRUtil = {
    PATTERN_POSITION_TABLE: [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]],
    G15: 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0,
    G18: 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0,
    G15_MASK: 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1,
    getBCHTypeInfo: function getBCHTypeInfo(data) {
      var d = data << 10;
      while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) {
        d ^= QRUtil.G15 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15);
      }
      return (data << 10 | d) ^ QRUtil.G15_MASK;
    },
    getBCHTypeNumber: function getBCHTypeNumber(data) {
      var d = data << 12;
      while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) >= 0) {
        d ^= QRUtil.G18 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18);
      }
      return data << 12 | d;
    },
    getBCHDigit: function getBCHDigit(data) {
      var digit = 0;
      while (data != 0) {
        digit++;
        data >>>= 1;
      }
      return digit;
    },
    getPatternPosition: function getPatternPosition(typeNumber) {
      return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1];
    },
    getMask: function getMask(maskPattern, i, j) {
      switch (maskPattern) {
        case QRMaskPattern.PATTERN000:
          return (i + j) % 2 == 0;
        case QRMaskPattern.PATTERN001:
          return i % 2 == 0;
        case QRMaskPattern.PATTERN010:
          return j % 3 == 0;
        case QRMaskPattern.PATTERN011:
          return (i + j) % 3 == 0;
        case QRMaskPattern.PATTERN100:
          return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 == 0;
        case QRMaskPattern.PATTERN101:
          return i * j % 2 + i * j % 3 == 0;
        case QRMaskPattern.PATTERN110:
          return (i * j % 2 + i * j % 3) % 2 == 0;
        case QRMaskPattern.PATTERN111:
          return (i * j % 3 + (i + j) % 2) % 2 == 0;
        default:
          throw new Error("bad maskPattern:" + maskPattern);
      }
    },
    getErrorCorrectPolynomial: function getErrorCorrectPolynomial(errorCorrectLength) {
      var a = new QRPolynomial([1], 0);
      for (var i = 0; i < errorCorrectLength; i++) {
        a = a.multiply(new QRPolynomial([1, QRMath.gexp(i)], 0));
      }
      return a;
    },
    getLengthInBits: function getLengthInBits(mode, type) {
      if (1 <= type && type < 10) {
        // 1 - 9

        switch (mode) {
          case QRMode.MODE_NUMBER:
            return 10;
          case QRMode.MODE_ALPHA_NUM:
            return 9;
          case QRMode.MODE_8BIT_BYTE:
            return 8;
          case QRMode.MODE_KANJI:
            return 8;
          default:
            throw new Error("mode:" + mode);
        }
      } else if (type < 27) {
        // 10 - 26

        switch (mode) {
          case QRMode.MODE_NUMBER:
            return 12;
          case QRMode.MODE_ALPHA_NUM:
            return 11;
          case QRMode.MODE_8BIT_BYTE:
            return 16;
          case QRMode.MODE_KANJI:
            return 10;
          default:
            throw new Error("mode:" + mode);
        }
      } else if (type < 41) {
        // 27 - 40

        switch (mode) {
          case QRMode.MODE_NUMBER:
            return 14;
          case QRMode.MODE_ALPHA_NUM:
            return 13;
          case QRMode.MODE_8BIT_BYTE:
            return 16;
          case QRMode.MODE_KANJI:
            return 12;
          default:
            throw new Error("mode:" + mode);
        }
      } else {
        throw new Error("type:" + type);
      }
    },
    getLostPoint: function getLostPoint(qrCode) {
      var moduleCount = qrCode.getModuleCount();
      var lostPoint = 0;

      // LEVEL1

      for (var row = 0; row < moduleCount; row++) {
        for (var col = 0; col < moduleCount; col++) {
          var sameCount = 0;
          var dark = qrCode.isDark(row, col);
          for (var r = -1; r <= 1; r++) {
            if (row + r < 0 || moduleCount <= row + r) {
              continue;
            }
            for (var c = -1; c <= 1; c++) {
              if (col + c < 0 || moduleCount <= col + c) {
                continue;
              }
              if (r == 0 && c == 0) {
                continue;
              }
              if (dark == qrCode.isDark(row + r, col + c)) {
                sameCount++;
              }
            }
          }
          if (sameCount > 5) {
            lostPoint += 3 + sameCount - 5;
          }
        }
      }

      // LEVEL2

      for (var row = 0; row < moduleCount - 1; row++) {
        for (var col = 0; col < moduleCount - 1; col++) {
          var count = 0;
          if (qrCode.isDark(row, col)) count++;
          if (qrCode.isDark(row + 1, col)) count++;
          if (qrCode.isDark(row, col + 1)) count++;
          if (qrCode.isDark(row + 1, col + 1)) count++;
          if (count == 0 || count == 4) {
            lostPoint += 3;
          }
        }
      }

      // LEVEL3

      for (var row = 0; row < moduleCount; row++) {
        for (var col = 0; col < moduleCount - 6; col++) {
          if (qrCode.isDark(row, col) && !qrCode.isDark(row, col + 1) && qrCode.isDark(row, col + 2) && qrCode.isDark(row, col + 3) && qrCode.isDark(row, col + 4) && !qrCode.isDark(row, col + 5) && qrCode.isDark(row, col + 6)) {
            lostPoint += 40;
          }
        }
      }
      for (var col = 0; col < moduleCount; col++) {
        for (var row = 0; row < moduleCount - 6; row++) {
          if (qrCode.isDark(row, col) && !qrCode.isDark(row + 1, col) && qrCode.isDark(row + 2, col) && qrCode.isDark(row + 3, col) && qrCode.isDark(row + 4, col) && !qrCode.isDark(row + 5, col) && qrCode.isDark(row + 6, col)) {
            lostPoint += 40;
          }
        }
      }

      // LEVEL4

      var darkCount = 0;
      for (var col = 0; col < moduleCount; col++) {
        for (var row = 0; row < moduleCount; row++) {
          if (qrCode.isDark(row, col)) {
            darkCount++;
          }
        }
      }
      var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
      lostPoint += ratio * 10;
      return lostPoint;
    }
  };

  //---------------------------------------------------------------------
  // QRMath
  //---------------------------------------------------------------------

  var QRMath = {
    glog: function glog(n) {
      if (n < 1) {
        throw new Error("glog(" + n + ")");
      }
      return QRMath.LOG_TABLE[n];
    },
    gexp: function gexp(n) {
      while (n < 0) {
        n += 255;
      }
      while (n >= 256) {
        n -= 255;
      }
      return QRMath.EXP_TABLE[n];
    },
    EXP_TABLE: new Array(256),
    LOG_TABLE: new Array(256)
  };
  for (var i = 0; i < 8; i++) {
    QRMath.EXP_TABLE[i] = 1 << i;
  }
  for (var i = 8; i < 256; i++) {
    QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4] ^ QRMath.EXP_TABLE[i - 5] ^ QRMath.EXP_TABLE[i - 6] ^ QRMath.EXP_TABLE[i - 8];
  }
  for (var i = 0; i < 255; i++) {
    QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]] = i;
  }

  //---------------------------------------------------------------------
  // QRPolynomial
  //---------------------------------------------------------------------

  function QRPolynomial(num, shift) {
    if (num.length == undefined) {
      throw new Error(num.length + "/" + shift);
    }
    var offset = 0;
    while (offset < num.length && num[offset] == 0) {
      offset++;
    }
    this.num = new Array(num.length - offset + shift);
    for (var i = 0; i < num.length - offset; i++) {
      this.num[i] = num[i + offset];
    }
  }
  QRPolynomial.prototype = {
    get: function get(index) {
      return this.num[index];
    },
    getLength: function getLength() {
      return this.num.length;
    },
    multiply: function multiply(e) {
      var num = new Array(this.getLength() + e.getLength() - 1);
      for (var i = 0; i < this.getLength(); i++) {
        for (var j = 0; j < e.getLength(); j++) {
          num[i + j] ^= QRMath.gexp(QRMath.glog(this.get(i)) + QRMath.glog(e.get(j)));
        }
      }
      return new QRPolynomial(num, 0);
    },
    mod: function mod(e) {
      if (this.getLength() - e.getLength() < 0) {
        return this;
      }
      var ratio = QRMath.glog(this.get(0)) - QRMath.glog(e.get(0));
      var num = new Array(this.getLength());
      for (var i = 0; i < this.getLength(); i++) {
        num[i] = this.get(i);
      }
      for (var i = 0; i < e.getLength(); i++) {
        num[i] ^= QRMath.gexp(QRMath.glog(e.get(i)) + ratio);
      }

      // recursive call
      return new QRPolynomial(num, 0).mod(e);
    }
  };

  //---------------------------------------------------------------------
  // QRRSBlock
  //---------------------------------------------------------------------

  function QRRSBlock(totalCount, dataCount) {
    this.totalCount = totalCount;
    this.dataCount = dataCount;
  }
  QRRSBlock.RS_BLOCK_TABLE = [
  // L
  // M
  // Q
  // H

  // 1
  [1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9],
  // 2
  [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16],
  // 3
  [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13],
  // 4		
  [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9],
  // 5
  [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12],
  // 6
  [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15],
  // 7		
  [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14],
  // 8
  [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15],
  // 9
  [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13],
  // 10		
  [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16],
  // 11
  [4, 101, 81], [1, 80, 50, 4, 81, 51], [4, 50, 22, 4, 51, 23], [3, 36, 12, 8, 37, 13],
  // 12
  [2, 116, 92, 2, 117, 93], [6, 58, 36, 2, 59, 37], [4, 46, 20, 6, 47, 21], [7, 42, 14, 4, 43, 15],
  // 13
  [4, 133, 107], [8, 59, 37, 1, 60, 38], [8, 44, 20, 4, 45, 21], [12, 33, 11, 4, 34, 12],
  // 14
  [3, 145, 115, 1, 146, 116], [4, 64, 40, 5, 65, 41], [11, 36, 16, 5, 37, 17], [11, 36, 12, 5, 37, 13],
  // 15
  [5, 109, 87, 1, 110, 88], [5, 65, 41, 5, 66, 42], [5, 54, 24, 7, 55, 25], [11, 36, 12],
  // 16
  [5, 122, 98, 1, 123, 99], [7, 73, 45, 3, 74, 46], [15, 43, 19, 2, 44, 20], [3, 45, 15, 13, 46, 16],
  // 17
  [1, 135, 107, 5, 136, 108], [10, 74, 46, 1, 75, 47], [1, 50, 22, 15, 51, 23], [2, 42, 14, 17, 43, 15],
  // 18
  [5, 150, 120, 1, 151, 121], [9, 69, 43, 4, 70, 44], [17, 50, 22, 1, 51, 23], [2, 42, 14, 19, 43, 15],
  // 19
  [3, 141, 113, 4, 142, 114], [3, 70, 44, 11, 71, 45], [17, 47, 21, 4, 48, 22], [9, 39, 13, 16, 40, 14],
  // 20
  [3, 135, 107, 5, 136, 108], [3, 67, 41, 13, 68, 42], [15, 54, 24, 5, 55, 25], [15, 43, 15, 10, 44, 16],
  // 21
  [4, 144, 116, 4, 145, 117], [17, 68, 42], [17, 50, 22, 6, 51, 23], [19, 46, 16, 6, 47, 17],
  // 22
  [2, 139, 111, 7, 140, 112], [17, 74, 46], [7, 54, 24, 16, 55, 25], [34, 37, 13],
  // 23
  [4, 151, 121, 5, 152, 122], [4, 75, 47, 14, 76, 48], [11, 54, 24, 14, 55, 25], [16, 45, 15, 14, 46, 16],
  // 24
  [6, 147, 117, 4, 148, 118], [6, 73, 45, 14, 74, 46], [11, 54, 24, 16, 55, 25], [30, 46, 16, 2, 47, 17],
  // 25
  [8, 132, 106, 4, 133, 107], [8, 75, 47, 13, 76, 48], [7, 54, 24, 22, 55, 25], [22, 45, 15, 13, 46, 16],
  // 26
  [10, 142, 114, 2, 143, 115], [19, 74, 46, 4, 75, 47], [28, 50, 22, 6, 51, 23], [33, 46, 16, 4, 47, 17],
  // 27
  [8, 152, 122, 4, 153, 123], [22, 73, 45, 3, 74, 46], [8, 53, 23, 26, 54, 24], [12, 45, 15, 28, 46, 16],
  // 28
  [3, 147, 117, 10, 148, 118], [3, 73, 45, 23, 74, 46], [4, 54, 24, 31, 55, 25], [11, 45, 15, 31, 46, 16],
  // 29
  [7, 146, 116, 7, 147, 117], [21, 73, 45, 7, 74, 46], [1, 53, 23, 37, 54, 24], [19, 45, 15, 26, 46, 16],
  // 30
  [5, 145, 115, 10, 146, 116], [19, 75, 47, 10, 76, 48], [15, 54, 24, 25, 55, 25], [23, 45, 15, 25, 46, 16],
  // 31
  [13, 145, 115, 3, 146, 116], [2, 74, 46, 29, 75, 47], [42, 54, 24, 1, 55, 25], [23, 45, 15, 28, 46, 16],
  // 32
  [17, 145, 115], [10, 74, 46, 23, 75, 47], [10, 54, 24, 35, 55, 25], [19, 45, 15, 35, 46, 16],
  // 33
  [17, 145, 115, 1, 146, 116], [14, 74, 46, 21, 75, 47], [29, 54, 24, 19, 55, 25], [11, 45, 15, 46, 46, 16],
  // 34
  [13, 145, 115, 6, 146, 116], [14, 74, 46, 23, 75, 47], [44, 54, 24, 7, 55, 25], [59, 46, 16, 1, 47, 17],
  // 35
  [12, 151, 121, 7, 152, 122], [12, 75, 47, 26, 76, 48], [39, 54, 24, 14, 55, 25], [22, 45, 15, 41, 46, 16],
  // 36
  [6, 151, 121, 14, 152, 122], [6, 75, 47, 34, 76, 48], [46, 54, 24, 10, 55, 25], [2, 45, 15, 64, 46, 16],
  // 37
  [17, 152, 122, 4, 153, 123], [29, 74, 46, 14, 75, 47], [49, 54, 24, 10, 55, 25], [24, 45, 15, 46, 46, 16],
  // 38
  [4, 152, 122, 18, 153, 123], [13, 74, 46, 32, 75, 47], [48, 54, 24, 14, 55, 25], [42, 45, 15, 32, 46, 16],
  // 39
  [20, 147, 117, 4, 148, 118], [40, 75, 47, 7, 76, 48], [43, 54, 24, 22, 55, 25], [10, 45, 15, 67, 46, 16],
  // 40
  [19, 148, 118, 6, 149, 119], [18, 75, 47, 31, 76, 48], [34, 54, 24, 34, 55, 25], [20, 45, 15, 61, 46, 16]];
  QRRSBlock.getRSBlocks = function (typeNumber, errorCorrectLevel) {
    var rsBlock = QRRSBlock.getRsBlockTable(typeNumber, errorCorrectLevel);
    if (rsBlock == undefined) {
      throw new Error("bad rs block @ typeNumber:" + typeNumber + "/errorCorrectLevel:" + errorCorrectLevel);
    }
    var length = rsBlock.length / 3;
    var list = new Array();
    for (var i = 0; i < length; i++) {
      var count = rsBlock[i * 3 + 0];
      var totalCount = rsBlock[i * 3 + 1];
      var dataCount = rsBlock[i * 3 + 2];
      for (var j = 0; j < count; j++) {
        list.push(new QRRSBlock(totalCount, dataCount));
      }
    }
    return list;
  };
  QRRSBlock.getRsBlockTable = function (typeNumber, errorCorrectLevel) {
    switch (errorCorrectLevel) {
      case QRErrorCorrectLevel.L:
        return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
      case QRErrorCorrectLevel.M:
        return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
      case QRErrorCorrectLevel.Q:
        return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
      case QRErrorCorrectLevel.H:
        return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
      default:
        return undefined;
    }
  };

  //---------------------------------------------------------------------
  // QRBitBuffer
  //---------------------------------------------------------------------

  function QRBitBuffer() {
    this.buffer = new Array();
    this.length = 0;
  }
  QRBitBuffer.prototype = {
    get: function get(index) {
      var bufIndex = Math.floor(index / 8);
      return (this.buffer[bufIndex] >>> 7 - index % 8 & 1) == 1;
    },
    put: function put(num, length) {
      for (var i = 0; i < length; i++) {
        this.putBit((num >>> length - i - 1 & 1) == 1);
      }
    },
    getLengthInBits: function getLengthInBits() {
      return this.length;
    },
    putBit: function putBit(bit) {
      var bufIndex = Math.floor(this.length / 8);
      if (this.buffer.length <= bufIndex) {
        this.buffer.push(0);
      }
      if (bit) {
        this.buffer[bufIndex] |= 0x80 >>> this.length % 8;
      }
      this.length++;
    }
  };

  //---------------------------------------------------------------------
  // Support Chinese
  //---------------------------------------------------------------------
  function utf16To8(text) {
    var result = '';
    var c;
    for (var i = 0; i < text.length; i++) {
      c = text.charCodeAt(i);
      if (c >= 0x0001 && c <= 0x007F) {
        result += text.charAt(i);
      } else if (c > 0x07FF) {
        result += String.fromCharCode(0xE0 | c >> 12 & 0x0F);
        result += String.fromCharCode(0x80 | c >> 6 & 0x3F);
        result += String.fromCharCode(0x80 | c >> 0 & 0x3F);
      } else {
        result += String.fromCharCode(0xC0 | c >> 6 & 0x1F);
        result += String.fromCharCode(0x80 | c >> 0 & 0x3F);
      }
    }
    return result;
  }
  uQRCode = {
    errorCorrectLevel: QRErrorCorrectLevel,
    defaults: {
      size: 354,
      margin: 0,
      backgroundColor: '#ffffff',
      foregroundColor: '#000000',
      errorCorrectLevel: QRErrorCorrectLevel.H,
      typeNumber: -1
    },
    make: function make(canvas, ctx, options) {
      var defaultOptions = {
        x: 0,
        y: 0,
        text: options.text,
        size: this.defaults.size,
        margin: this.defaults.margin,
        backgroundColor: this.defaults.backgroundColor,
        foregroundColor: this.defaults.foregroundColor,
        errorCorrectLevel: this.defaults.errorCorrectLevel,
        typeNumber: this.defaults.typeNumber
      };
      if (options) {
        for (var i in options) {
          defaultOptions[i] = options[i];
        }
      }
      options = defaultOptions;
      var qrcode = new QRCode(options.typeNumber, options.errorCorrectLevel);
      qrcode.addData(utf16To8(options.text));
      qrcode.make();
      ctx.fill;
      ctx.fillStyle = options.backgroundColor;
      ctx.fillRect(options.x, options.y, options.size, options.size);
      var tileW = (options.size - options.margin * 2) / qrcode.getModuleCount();
      var tileH = tileW;
      for (var row = 0; row < qrcode.getModuleCount(); row++) {
        for (var col = 0; col < qrcode.getModuleCount(); col++) {
          var style = qrcode.isDark(row, col) ? options.foregroundColor : options.backgroundColor;
          ctx.fillStyle = style;
          var x = Math.round(col * tileW) + options.margin;
          var y = Math.round(row * tileH) + options.margin;
          var w = Math.ceil((col + 1) * tileW) - Math.floor(col * tileW);
          var h = Math.ceil((row + 1) * tileW) - Math.floor(row * tileW);
          ctx.fillRect(options.x + x, options.y + y, w, h);
        }
      }
    }
  };
})();
var _default = uQRCode;
exports.default = _default;

/***/ }),

/***/ 1268:
/*!******************************************************************************************!*\
  !*** D:/Desktop/code/ending/shop/js_sdk/u-draw-poster/extends/create-from-list/index.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/** 绘制表单扩展方法 */
var _default = {
  name: 'createLayer',
  init: function init(dp) {
    dp.from = {
      height: 0,
      padding: 8,
      margin: 0
    };
    dp.setFromOptions = function (opts) {
      if (typeof opts.height !== 'undefined') {
        dp.from.height = opts.height;
      }
      if (typeof opts.margin !== 'undefined') {
        dp.from.margin = opts.margin;
      }
      if (typeof opts.padding !== 'undefined') {
        dp.from.padding = opts.padding;
      }
    };
  },
  handle: function handle(dp, afferOpts, rowList) {
    // 当前配置(头部偏移量, 列内边距, 表单外边距)
    var height = dp.from.height;
    var margin = dp.from.margin;
    var padding = dp.from.padding;
    // 当前层宽度
    var containerWidth = dp.canvas.width - margin * 2;
    // 基本层配置
    var opts = Object.assign({
      background: "#fff",
      columnY: height || margin,
      self: true,
      line: true,
      lineHeight: 0,
      border: true
    }, afferOpts);
    // 基本列配置
    var baseRowOpts = {
      text: "",
      font: "24px sans-serif",
      color: "#333",
      center: false,
      width: 0
    };
    // 累计最高的列为标准定义为层高度
    var maxRowHeight = 0;
    // 累计固定栅格列偏移量
    var columnOffsetX = margin;
    // 创建行绘制任务
    var drawLayerInfos = rowList.map(function () {
      var afferRowOpts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var index = arguments.length > 1 ? arguments[1] : undefined;
      var rowOpts = Object.assign(Object.assign({}, baseRowOpts), afferRowOpts);
      var columnX = 0; // 每列的X轴
      var columnW = 0; // 每列的宽度
      var fontOffsetX = 0; // 字体偏移X轴
      var fontMaxWidth = 100; // 字体最大宽度
      opts.lineHeight = opts.lineHeight || Number(rowOpts.font.replace(/[^0-9.]/g, ""));
      if (opts.self) {
        // 自适应栅格格子计算
        columnX = containerWidth - containerWidth / (index + 1) + margin;
        columnW = containerWidth / rowList.length;
        if (columnX > 0 && columnX < containerWidth - columnW) {
          columnX = columnW * index + margin;
        }
        fontOffsetX = rowOpts.center ? columnX + columnW / 2 : columnX + padding;
        fontMaxWidth = columnW - padding * 3;
      }
      if (!opts.self) {
        // 固定栅格格子计算
        columnW = rowOpts.width;
        columnX = columnOffsetX;
        fontMaxWidth = columnW - padding * 3;
        fontOffsetX = rowOpts.center ? columnOffsetX + rowOpts.width / 2 : columnOffsetX + padding;
        columnOffsetX += rowOpts.width;
      }
      dp.ctx.font = rowOpts.font;
      var drawFontInfos = dp.ctx.fillWarpText({
        text: rowOpts.text,
        maxWidth: fontMaxWidth,
        lineHeight: opts.lineHeight,
        x: fontOffsetX,
        y: opts.columnY,
        layer: 10,
        notFillText: true
      });
      // 当前行的高度
      var rowHeight = opts.lineHeight * drawFontInfos.length + padding * 3;
      // 若该列高度大于累计高度, 将累计高度替换
      if (rowHeight > maxRowHeight) {
        maxRowHeight = rowHeight;
      }
      return {
        font: rowOpts.font,
        center: rowOpts.center,
        color: rowOpts.color,
        border: opts.border,
        background: opts.background,
        lineHeight: opts.lineHeight,
        line: opts.line,
        drawFontInfos: drawFontInfos,
        columnY: opts.columnY,
        columnX: columnX,
        columnW: columnW,
        columnH: maxRowHeight,
        margin: margin,
        padding: padding
      };
    });
    // 将行绘制任务添加至绘制容器中
    dp.draw(function (ctx) {
      return drawLayerInfos.forEach(function (rowOpts, index) {
        ctx.font = rowOpts.font;
        ctx.fillStyle = rowOpts.background;
        ctx.strokeStyle = "#333";
        ctx.textBaseline = "middle";
        ctx.textAlign = 'left';
        if (rowOpts.center) {
          ctx.textAlign = "center";
        }
        ctx.fillRect(rowOpts.columnX, rowOpts.columnY, rowOpts.columnW, rowOpts.columnH);
        if (rowOpts.border) {
          dp.ctx.strokeRect(margin, rowOpts.columnY, dp.canvas.width - margin, maxRowHeight);
        }
        if (rowOpts.line && rowOpts.columnX !== margin) {
          ctx.moveTo(rowOpts.columnX, rowOpts.columnY);
          ctx.lineTo(rowOpts.columnX, rowOpts.columnY + rowOpts.columnH);
          ctx.stroke();
          ctx.beginPath();
        }
        ctx.fillStyle = rowOpts.color;
        rowOpts.drawFontInfos.forEach(function (fontInfo) {
          // 计算每行字体绘制y轴长度
          // y(当前列置顶轴) + (rowOpts.columnH(当前列最高长度) / 2) - (((总列数-1) * 行高) / 2)
          var textTotal = rowOpts.drawFontInfos.length - 1;
          var textMiddleY = textTotal * rowOpts.lineHeight / 2;
          var fontOffsetY = fontInfo.y + rowOpts.columnH / 2;
          fontOffsetY -= textMiddleY;
          ctx.fillText(fontInfo.text, fontInfo.x, fontOffsetY);
        });
      });
    });
    if (opts.columnY === 0 || opts.columnY === margin) {
      maxRowHeight += margin;
    }
    // 叠加高度
    dp.from.height += maxRowHeight;
    return maxRowHeight;
  }
};
exports.default = _default;

/***/ }),

/***/ 1269:
/*!**************************************************************************************!*\
  !*** D:/Desktop/code/ending/shop/js_sdk/u-draw-poster/extends/draw-painter/index.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 30));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 32));
var _default = {
  name: 'painter',
  handle: function handle(dp, option) {
    dp.canvas.width = option.width;
    dp.canvas.height = option.height;
    dp.draw( /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(ctx) {
        var i, drawInfo, _drawInfo$left, left, _drawInfo$top, top;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                i = 0;
              case 1:
                if (!(i < option.contents.length)) {
                  _context.next = 20;
                  break;
                }
                ctx.save();
                drawInfo = option.contents[i];
                _drawInfo$left = drawInfo.left, left = _drawInfo$left === void 0 ? 0 : _drawInfo$left, _drawInfo$top = drawInfo.top, top = _drawInfo$top === void 0 ? 0 : _drawInfo$top;
                if (drawInfo.type === 'rect') {
                  ctx.fillStyle = drawInfo.background || '#000000';
                  ctx.fillRoundRect(left, top, drawInfo.width, drawInfo.height, drawInfo.radius || 0);
                }
                if (!(drawInfo.type === 'image')) {
                  _context.next = 9;
                  break;
                }
                _context.next = 9;
                return ctx.drawImageFit(drawInfo.src, {
                  objectFit: drawInfo.objectFit || 'cover',
                  intrinsicPosition: drawInfo.position || ['center', 'center'],
                  specifiedPosition: [left, top],
                  specifiedSize: {
                    width: drawInfo.width,
                    height: drawInfo.height
                  },
                  radius: drawInfo.radius
                });
              case 9:
                if (drawInfo.type === 'text') {
                  ctx.fillStyle = drawInfo.color || '#000000';
                  ctx.font = "          ".concat(drawInfo.fontStyle || 'normal', "           ").concat(drawInfo.fontWeight || 'normal', "           ").concat(drawInfo.fontSize || 30, "           ").concat(drawInfo.fontFamily || 'serial', "          ");
                  ctx.fillText(drawInfo.content, left, top, drawInfo.width);
                }
                if (drawInfo.type === 'line-feed-text') {
                  ctx.fillStyle = drawInfo.color || '#000000';
                  ctx.font = "          ".concat(drawInfo.fontStyle || 'normal', "           ").concat(drawInfo.fontWeight || 'normal', "           ").concat(drawInfo.fontSize || 30, "           ").concat(drawInfo.fontFamily || 'serial', "          ");
                  ctx.fillWarpText({
                    x: drawInfo.left,
                    y: drawInfo.top,
                    layer: drawInfo.lineClamp,
                    lineHeight: drawInfo.lineHeight,
                    maxWidth: drawInfo.width,
                    text: drawInfo.content
                  });
                }
                if (!(drawInfo.type === 'qr-code')) {
                  _context.next = 16;
                  break;
                }
                if (!(typeof ctx.drawQrCode !== 'function')) {
                  _context.next = 15;
                  break;
                }
                console.error('--- 当前未引入qr-code扩展, 将自动省略该二维码绘制 ---');
                return _context.abrupt("return", false);
              case 15:
                ctx.drawQrCode({
                  x: left,
                  y: top,
                  size: drawInfo.size,
                  text: drawInfo.content,
                  margin: drawInfo.margin || 5,
                  backgroundColor: drawInfo.backgroundColor || '#ffffff',
                  foregroundColor: drawInfo.foregroundColor || '#000000'
                });
              case 16:
                ctx.restore();
              case 17:
                i++;
                _context.next = 1;
                break;
              case 20:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
  }
};
exports.default = _default;

/***/ }),

/***/ 1270:
/*!************************************************************************!*\
  !*** D:/Desktop/code/ending/shop/pages/passport/static/logo-title.png ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "pages/passport/static/logo-title.png";

/***/ }),

/***/ 1285:
/*!*************************************************************************!*\
  !*** D:/Desktop/code/ending/shop/uview-ui/libs/util/async-validator.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

/* eslint no-console:0 */
var formatRegExp = /%[sdj%]/g;
var warning = function warning() {}; // don't print warning message when in production env or node runtime

if (typeof process !== 'undefined' && Object({"VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"lilishop","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}) && "development" !== 'production' && typeof window !== 'undefined' && typeof document !== 'undefined') {
  warning = function warning(type, errors) {
    if (typeof console !== 'undefined' && console.warn) {
      if (errors.every(function (e) {
        return typeof e === 'string';
      })) {
        console.warn(type, errors);
      }
    }
  };
}
function convertFieldsError(errors) {
  if (!errors || !errors.length) return null;
  var fields = {};
  errors.forEach(function (error) {
    var field = error.field;
    fields[field] = fields[field] || [];
    fields[field].push(error);
  });
  return fields;
}
function format() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  var i = 1;
  var f = args[0];
  var len = args.length;
  if (typeof f === 'function') {
    return f.apply(null, args.slice(1));
  }
  if (typeof f === 'string') {
    var str = String(f).replace(formatRegExp, function (x) {
      if (x === '%%') {
        return '%';
      }
      if (i >= len) {
        return x;
      }
      switch (x) {
        case '%s':
          return String(args[i++]);
        case '%d':
          return Number(args[i++]);
        case '%j':
          try {
            return JSON.stringify(args[i++]);
          } catch (_) {
            return '[Circular]';
          }
          break;
        default:
          return x;
      }
    });
    for (var arg = args[i]; i < len; arg = args[++i]) {
      str += " " + arg;
    }
    return str;
  }
  return f;
}
function isNativeStringType(type) {
  return type === 'string' || type === 'url' || type === 'hex' || type === 'email' || type === 'pattern';
}
function isEmptyValue(value, type) {
  if (value === undefined || value === null) {
    return true;
  }
  if (type === 'array' && Array.isArray(value) && !value.length) {
    return true;
  }
  if (isNativeStringType(type) && typeof value === 'string' && !value) {
    return true;
  }
  return false;
}
function asyncParallelArray(arr, func, callback) {
  var results = [];
  var total = 0;
  var arrLength = arr.length;
  function count(errors) {
    results.push.apply(results, errors);
    total++;
    if (total === arrLength) {
      callback(results);
    }
  }
  arr.forEach(function (a) {
    func(a, count);
  });
}
function asyncSerialArray(arr, func, callback) {
  var index = 0;
  var arrLength = arr.length;
  function next(errors) {
    if (errors && errors.length) {
      callback(errors);
      return;
    }
    var original = index;
    index = index + 1;
    if (original < arrLength) {
      func(arr[original], next);
    } else {
      callback([]);
    }
  }
  next([]);
}
function flattenObjArr(objArr) {
  var ret = [];
  Object.keys(objArr).forEach(function (k) {
    ret.push.apply(ret, objArr[k]);
  });
  return ret;
}
function asyncMap(objArr, option, func, callback) {
  if (option.first) {
    var _pending = new Promise(function (resolve, reject) {
      var next = function next(errors) {
        callback(errors);
        return errors.length ? reject({
          errors: errors,
          fields: convertFieldsError(errors)
        }) : resolve();
      };
      var flattenArr = flattenObjArr(objArr);
      asyncSerialArray(flattenArr, func, next);
    });
    _pending["catch"](function (e) {
      return e;
    });
    return _pending;
  }
  var firstFields = option.firstFields || [];
  if (firstFields === true) {
    firstFields = Object.keys(objArr);
  }
  var objArrKeys = Object.keys(objArr);
  var objArrLength = objArrKeys.length;
  var total = 0;
  var results = [];
  var pending = new Promise(function (resolve, reject) {
    var next = function next(errors) {
      results.push.apply(results, errors);
      total++;
      if (total === objArrLength) {
        callback(results);
        return results.length ? reject({
          errors: results,
          fields: convertFieldsError(results)
        }) : resolve();
      }
    };
    if (!objArrKeys.length) {
      callback(results);
      resolve();
    }
    objArrKeys.forEach(function (key) {
      var arr = objArr[key];
      if (firstFields.indexOf(key) !== -1) {
        asyncSerialArray(arr, func, next);
      } else {
        asyncParallelArray(arr, func, next);
      }
    });
  });
  pending["catch"](function (e) {
    return e;
  });
  return pending;
}
function complementError(rule) {
  return function (oe) {
    if (oe && oe.message) {
      oe.field = oe.field || rule.fullField;
      return oe;
    }
    return {
      message: typeof oe === 'function' ? oe() : oe,
      field: oe.field || rule.fullField
    };
  };
}
function deepMerge(target, source) {
  if (source) {
    for (var s in source) {
      if (source.hasOwnProperty(s)) {
        var value = source[s];
        if ((0, _typeof2.default)(value) === 'object' && (0, _typeof2.default)(target[s]) === 'object') {
          target[s] = _extends({}, target[s], {}, value);
        } else {
          target[s] = value;
        }
      }
    }
  }
  return target;
}

/**
 *  Rule for validating required fields.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param source The source object being validated.
 *  @param errors An array of errors that this rule may add
 *  validation errors to.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */

function required(rule, value, source, errors, options, type) {
  if (rule.required && (!source.hasOwnProperty(rule.field) || isEmptyValue(value, type || rule.type))) {
    errors.push(format(options.messages.required, rule.fullField));
  }
}

/**
 *  Rule for validating whitespace.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param source The source object being validated.
 *  @param errors An array of errors that this rule may add
 *  validation errors to.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */

function whitespace(rule, value, source, errors, options) {
  if (/^\s+$/.test(value) || value === '') {
    errors.push(format(options.messages.whitespace, rule.fullField));
  }
}

/* eslint max-len:0 */

var pattern = {
  // http://emailregex.com/
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  url: new RegExp("^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$", 'i'),
  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
};
var types = {
  integer: function integer(value) {
    return types.number(value) && parseInt(value, 10) === value;
  },
  "float": function float(value) {
    return types.number(value) && !types.integer(value);
  },
  array: function array(value) {
    return Array.isArray(value);
  },
  regexp: function regexp(value) {
    if (value instanceof RegExp) {
      return true;
    }
    try {
      return !!new RegExp(value);
    } catch (e) {
      return false;
    }
  },
  date: function date(value) {
    return typeof value.getTime === 'function' && typeof value.getMonth === 'function' && typeof value.getYear === 'function';
  },
  number: function number(value) {
    if (isNaN(value)) {
      return false;
    }

    // 修改源码，将字符串数值先转为数值
    return typeof +value === 'number';
  },
  object: function object(value) {
    return (0, _typeof2.default)(value) === 'object' && !types.array(value);
  },
  method: function method(value) {
    return typeof value === 'function';
  },
  email: function email(value) {
    return typeof value === 'string' && !!value.match(pattern.email) && value.length < 255;
  },
  url: function url(value) {
    return typeof value === 'string' && !!value.match(pattern.url);
  },
  hex: function hex(value) {
    return typeof value === 'string' && !!value.match(pattern.hex);
  }
};
/**
 *  Rule for validating the type of a value.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param source The source object being validated.
 *  @param errors An array of errors that this rule may add
 *  validation errors to.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */

function type(rule, value, source, errors, options) {
  if (rule.required && value === undefined) {
    required(rule, value, source, errors, options);
    return;
  }
  var custom = ['integer', 'float', 'array', 'regexp', 'object', 'method', 'email', 'number', 'date', 'url', 'hex'];
  var ruleType = rule.type;
  if (custom.indexOf(ruleType) > -1) {
    if (!types[ruleType](value)) {
      errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
    } // straight typeof check
  } else if (ruleType && (0, _typeof2.default)(value) !== rule.type) {
    errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
  }
}

/**
 *  Rule for validating minimum and maximum allowed values.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param source The source object being validated.
 *  @param errors An array of errors that this rule may add
 *  validation errors to.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */

function range(rule, value, source, errors, options) {
  var len = typeof rule.len === 'number';
  var min = typeof rule.min === 'number';
  var max = typeof rule.max === 'number'; // 正则匹配码点范围从U+010000一直到U+10FFFF的文字（补充平面Supplementary Plane）

  var spRegexp = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
  var val = value;
  var key = null;
  var num = typeof value === 'number';
  var str = typeof value === 'string';
  var arr = Array.isArray(value);
  if (num) {
    key = 'number';
  } else if (str) {
    key = 'string';
  } else if (arr) {
    key = 'array';
  } // if the value is not of a supported type for range validation
  // the validation rule rule should use the
  // type property to also test for a particular type

  if (!key) {
    return false;
  }
  if (arr) {
    val = value.length;
  }
  if (str) {
    // 处理码点大于U+010000的文字length属性不准确的bug，如"𠮷𠮷𠮷".lenght !== 3
    val = value.replace(spRegexp, '_').length;
  }
  if (len) {
    if (val !== rule.len) {
      errors.push(format(options.messages[key].len, rule.fullField, rule.len));
    }
  } else if (min && !max && val < rule.min) {
    errors.push(format(options.messages[key].min, rule.fullField, rule.min));
  } else if (max && !min && val > rule.max) {
    errors.push(format(options.messages[key].max, rule.fullField, rule.max));
  } else if (min && max && (val < rule.min || val > rule.max)) {
    errors.push(format(options.messages[key].range, rule.fullField, rule.min, rule.max));
  }
}
var ENUM = 'enum';
/**
 *  Rule for validating a value exists in an enumerable list.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param source The source object being validated.
 *  @param errors An array of errors that this rule may add
 *  validation errors to.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */

function enumerable(rule, value, source, errors, options) {
  rule[ENUM] = Array.isArray(rule[ENUM]) ? rule[ENUM] : [];
  if (rule[ENUM].indexOf(value) === -1) {
    errors.push(format(options.messages[ENUM], rule.fullField, rule[ENUM].join(', ')));
  }
}

/**
 *  Rule for validating a regular expression pattern.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param source The source object being validated.
 *  @param errors An array of errors that this rule may add
 *  validation errors to.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */

function pattern$1(rule, value, source, errors, options) {
  if (rule.pattern) {
    if (rule.pattern instanceof RegExp) {
      // if a RegExp instance is passed, reset `lastIndex` in case its `global`
      // flag is accidentally set to `true`, which in a validation scenario
      // is not necessary and the result might be misleading
      rule.pattern.lastIndex = 0;
      if (!rule.pattern.test(value)) {
        errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
      }
    } else if (typeof rule.pattern === 'string') {
      var _pattern = new RegExp(rule.pattern);
      if (!_pattern.test(value)) {
        errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
      }
    }
  }
}
var rules = {
  required: required,
  whitespace: whitespace,
  type: type,
  range: range,
  "enum": enumerable,
  pattern: pattern$1
};

/**
 *  Performs validation for string types.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */

function string(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value, 'string') && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options, 'string');
    if (!isEmptyValue(value, 'string')) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
      rules.pattern(rule, value, source, errors, options);
      if (rule.whitespace === true) {
        rules.whitespace(rule, value, source, errors, options);
      }
    }
  }
  callback(errors);
}

/**
 *  Validates a function.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */

function method(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
    }
  }
  callback(errors);
}

/**
 *  Validates a number.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */

function number(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (value === '') {
      value = undefined;
    }
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }
  callback(errors);
}

/**
 *  Validates a boolean.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */

function _boolean(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
    }
  }
  callback(errors);
}

/**
 *  Validates the regular expression type.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */

function regexp(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (!isEmptyValue(value)) {
      rules.type(rule, value, source, errors, options);
    }
  }
  callback(errors);
}

/**
 *  Validates a number is an integer.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */

function integer(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }
  callback(errors);
}

/**
 *  Validates a number is a floating point number.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */

function floatFn(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }
  callback(errors);
}

/**
 *  Validates an array.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */

function array(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value, 'array') && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options, 'array');
    if (!isEmptyValue(value, 'array')) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }
  callback(errors);
}

/**
 *  Validates an object.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */

function object(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
    }
  }
  callback(errors);
}
var ENUM$1 = 'enum';
/**
 *  Validates an enumerable list.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */

function enumerable$1(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (value !== undefined) {
      rules[ENUM$1](rule, value, source, errors, options);
    }
  }
  callback(errors);
}

/**
 *  Validates a regular expression pattern.
 *
 *  Performs validation when a rule only contains
 *  a pattern property but is not declared as a string type.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */

function pattern$2(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value, 'string') && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (!isEmptyValue(value, 'string')) {
      rules.pattern(rule, value, source, errors, options);
    }
  }
  callback(errors);
}
function date(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (!isEmptyValue(value)) {
      var dateObject;
      if (typeof value === 'number') {
        dateObject = new Date(value);
      } else {
        dateObject = value;
      }
      rules.type(rule, dateObject, source, errors, options);
      if (dateObject) {
        rules.range(rule, dateObject.getTime(), source, errors, options);
      }
    }
  }
  callback(errors);
}
function required$1(rule, value, callback, source, options) {
  var errors = [];
  var type = Array.isArray(value) ? 'array' : (0, _typeof2.default)(value);
  rules.required(rule, value, source, errors, options, type);
  callback(errors);
}
function type$1(rule, value, callback, source, options) {
  var ruleType = rule.type;
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value, ruleType) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options, ruleType);
    if (!isEmptyValue(value, ruleType)) {
      rules.type(rule, value, source, errors, options);
    }
  }
  callback(errors);
}

/**
 *  Performs validation for any type.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */

function any(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
  }
  callback(errors);
}
var validators = {
  string: string,
  method: method,
  number: number,
  "boolean": _boolean,
  regexp: regexp,
  integer: integer,
  "float": floatFn,
  array: array,
  object: object,
  "enum": enumerable$1,
  pattern: pattern$2,
  date: date,
  url: type$1,
  hex: type$1,
  email: type$1,
  required: required$1,
  any: any
};
function newMessages() {
  return {
    "default": 'Validation error on field %s',
    required: '%s is required',
    "enum": '%s must be one of %s',
    whitespace: '%s cannot be empty',
    date: {
      format: '%s date %s is invalid for format %s',
      parse: '%s date could not be parsed, %s is invalid ',
      invalid: '%s date %s is invalid'
    },
    types: {
      string: '%s is not a %s',
      method: '%s is not a %s (function)',
      array: '%s is not an %s',
      object: '%s is not an %s',
      number: '%s is not a %s',
      date: '%s is not a %s',
      "boolean": '%s is not a %s',
      integer: '%s is not an %s',
      "float": '%s is not a %s',
      regexp: '%s is not a valid %s',
      email: '%s is not a valid %s',
      url: '%s is not a valid %s',
      hex: '%s is not a valid %s'
    },
    string: {
      len: '%s must be exactly %s characters',
      min: '%s must be at least %s characters',
      max: '%s cannot be longer than %s characters',
      range: '%s must be between %s and %s characters'
    },
    number: {
      len: '%s must equal %s',
      min: '%s cannot be less than %s',
      max: '%s cannot be greater than %s',
      range: '%s must be between %s and %s'
    },
    array: {
      len: '%s must be exactly %s in length',
      min: '%s cannot be less than %s in length',
      max: '%s cannot be greater than %s in length',
      range: '%s must be between %s and %s in length'
    },
    pattern: {
      mismatch: '%s value %s does not match pattern %s'
    },
    clone: function clone() {
      var cloned = JSON.parse(JSON.stringify(this));
      cloned.clone = this.clone;
      return cloned;
    }
  };
}
var messages = newMessages();

/**
 *  Encapsulates a validation schema.
 *
 *  @param descriptor An object declaring validation rules
 *  for this schema.
 */

function Schema(descriptor) {
  this.rules = null;
  this._messages = messages;
  this.define(descriptor);
}
Schema.prototype = {
  messages: function messages(_messages) {
    if (_messages) {
      this._messages = deepMerge(newMessages(), _messages);
    }
    return this._messages;
  },
  define: function define(rules) {
    if (!rules) {
      throw new Error('Cannot configure a schema with no rules');
    }
    if ((0, _typeof2.default)(rules) !== 'object' || Array.isArray(rules)) {
      throw new Error('Rules must be an object');
    }
    this.rules = {};
    var z;
    var item;
    for (z in rules) {
      if (rules.hasOwnProperty(z)) {
        item = rules[z];
        this.rules[z] = Array.isArray(item) ? item : [item];
      }
    }
  },
  validate: function validate(source_, o, oc) {
    var _this = this;
    if (o === void 0) {
      o = {};
    }
    if (oc === void 0) {
      oc = function oc() {};
    }
    var source = source_;
    var options = o;
    var callback = oc;
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }
    if (!this.rules || Object.keys(this.rules).length === 0) {
      if (callback) {
        callback();
      }
      return Promise.resolve();
    }
    function complete(results) {
      var i;
      var errors = [];
      var fields = {};
      function add(e) {
        if (Array.isArray(e)) {
          var _errors;
          errors = (_errors = errors).concat.apply(_errors, e);
        } else {
          errors.push(e);
        }
      }
      for (i = 0; i < results.length; i++) {
        add(results[i]);
      }
      if (!errors.length) {
        errors = null;
        fields = null;
      } else {
        fields = convertFieldsError(errors);
      }
      callback(errors, fields);
    }
    if (options.messages) {
      var messages$1 = this.messages();
      if (messages$1 === messages) {
        messages$1 = newMessages();
      }
      deepMerge(messages$1, options.messages);
      options.messages = messages$1;
    } else {
      options.messages = this.messages();
    }
    var arr;
    var value;
    var series = {};
    var keys = options.keys || Object.keys(this.rules);
    keys.forEach(function (z) {
      arr = _this.rules[z];
      value = source[z];
      arr.forEach(function (r) {
        var rule = r;
        if (typeof rule.transform === 'function') {
          if (source === source_) {
            source = _extends({}, source);
          }
          value = source[z] = rule.transform(value);
        }
        if (typeof rule === 'function') {
          rule = {
            validator: rule
          };
        } else {
          rule = _extends({}, rule);
        }
        rule.validator = _this.getValidationMethod(rule);
        rule.field = z;
        rule.fullField = rule.fullField || z;
        rule.type = _this.getType(rule);
        if (!rule.validator) {
          return;
        }
        series[z] = series[z] || [];
        series[z].push({
          rule: rule,
          value: value,
          source: source,
          field: z
        });
      });
    });
    var errorFields = {};
    return asyncMap(series, options, function (data, doIt) {
      var rule = data.rule;
      var deep = (rule.type === 'object' || rule.type === 'array') && ((0, _typeof2.default)(rule.fields) === 'object' || (0, _typeof2.default)(rule.defaultField) === 'object');
      deep = deep && (rule.required || !rule.required && data.value);
      rule.field = data.field;
      function addFullfield(key, schema) {
        return _extends({}, schema, {
          fullField: rule.fullField + "." + key
        });
      }
      function cb(e) {
        if (e === void 0) {
          e = [];
        }
        var errors = e;
        if (!Array.isArray(errors)) {
          errors = [errors];
        }
        if (!options.suppressWarning && errors.length) {
          Schema.warning('async-validator:', errors);
        }
        if (errors.length && rule.message) {
          errors = [].concat(rule.message);
        }
        errors = errors.map(complementError(rule));
        if (options.first && errors.length) {
          errorFields[rule.field] = 1;
          return doIt(errors);
        }
        if (!deep) {
          doIt(errors);
        } else {
          // if rule is required but the target object
          // does not exist fail at the rule level and don't
          // go deeper
          if (rule.required && !data.value) {
            if (rule.message) {
              errors = [].concat(rule.message).map(complementError(rule));
            } else if (options.error) {
              errors = [options.error(rule, format(options.messages.required, rule.field))];
            } else {
              errors = [];
            }
            return doIt(errors);
          }
          var fieldsSchema = {};
          if (rule.defaultField) {
            for (var k in data.value) {
              if (data.value.hasOwnProperty(k)) {
                fieldsSchema[k] = rule.defaultField;
              }
            }
          }
          fieldsSchema = _extends({}, fieldsSchema, {}, data.rule.fields);
          for (var f in fieldsSchema) {
            if (fieldsSchema.hasOwnProperty(f)) {
              var fieldSchema = Array.isArray(fieldsSchema[f]) ? fieldsSchema[f] : [fieldsSchema[f]];
              fieldsSchema[f] = fieldSchema.map(addFullfield.bind(null, f));
            }
          }
          var schema = new Schema(fieldsSchema);
          schema.messages(options.messages);
          if (data.rule.options) {
            data.rule.options.messages = options.messages;
            data.rule.options.error = options.error;
          }
          schema.validate(data.value, data.rule.options || options, function (errs) {
            var finalErrors = [];
            if (errors && errors.length) {
              finalErrors.push.apply(finalErrors, errors);
            }
            if (errs && errs.length) {
              finalErrors.push.apply(finalErrors, errs);
            }
            doIt(finalErrors.length ? finalErrors : null);
          });
        }
      }
      var res;
      if (rule.asyncValidator) {
        res = rule.asyncValidator(rule, data.value, cb, data.source, options);
      } else if (rule.validator) {
        res = rule.validator(rule, data.value, cb, data.source, options);
        if (res === true) {
          cb();
        } else if (res === false) {
          cb(rule.message || rule.field + " fails");
        } else if (res instanceof Array) {
          cb(res);
        } else if (res instanceof Error) {
          cb(res.message);
        }
      }
      if (res && res.then) {
        res.then(function () {
          return cb();
        }, function (e) {
          return cb(e);
        });
      }
    }, function (results) {
      complete(results);
    });
  },
  getType: function getType(rule) {
    if (rule.type === undefined && rule.pattern instanceof RegExp) {
      rule.type = 'pattern';
    }
    if (typeof rule.validator !== 'function' && rule.type && !validators.hasOwnProperty(rule.type)) {
      throw new Error(format('Unknown rule type %s', rule.type));
    }
    return rule.type || 'string';
  },
  getValidationMethod: function getValidationMethod(rule) {
    if (typeof rule.validator === 'function') {
      return rule.validator;
    }
    var keys = Object.keys(rule);
    var messageIndex = keys.indexOf('message');
    if (messageIndex !== -1) {
      keys.splice(messageIndex, 1);
    }
    if (keys.length === 1 && keys[0] === 'required') {
      return validators.required;
    }
    return validators[this.getType(rule)] || false;
  }
};
Schema.register = function register(type, validator) {
  if (typeof validator !== 'function') {
    throw new Error('Cannot register a validator by type, validator is not a function');
  }
  validators[type] = validator;
};
Schema.warning = warning;
Schema.messages = messages;
var _default = Schema;
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../../Software/Development/HBuilderX/plugins/uniapp-cli/node_modules/node-libs-browser/mock/process.js */ 1255)))

/***/ }),

/***/ 13:
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(o) {
  "@babel/helpers - typeof";

  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(o);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 133:
/*!************************************************!*\
  !*** D:/Desktop/code/ending/shop/api/trade.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addToCart = addToCart;
exports.changeActivity = changeActivity;
exports.checkAll = checkAll;
exports.checkStore = checkStore;
exports.createTrade = createTrade;
exports.deleteSkuItem = deleteSkuItem;
exports.getCartCouponNum = getCartCouponNum;
exports.getCartNum = getCartNum;
exports.getCarts = getCarts;
exports.getCashierData = getCashierData;
exports.getCheckoutParams = getCheckoutParams;
exports.getExpress = getExpress;
exports.getMemberCanUse = getMemberCanUse;
exports.getMemberCouponList = getMemberCouponList;
exports.getPackage = getPackage;
exports.initiatePay = initiatePay;
exports.reBuy = reBuy;
exports.setAddressId = setAddressId;
exports.setShipMethod = setShipMethod;
exports.setStoreAddressId = setStoreAddressId;
exports.shippingMethodList = shippingMethodList;
exports.updateSkuChecked = updateSkuChecked;
exports.updateSkuNum = updateSkuNum;
exports.useCoupon = useCoupon;
var _request = __webpack_require__(/*! @/utils/request.js */ 43);
/**
 * 交♂易相关API
 */

/**
 * 获取购物车列表
 * @param show_type 要显示的类型 all：全部 checked：已选中的
 */
function getCarts() {
  return _request.http.request({
    url: "/trade/carts/all",
    method: _request.Method.GET,
    needToken: true,
    loading: false
  });
}

/**
 * 获取购物车总数
 * @param show_type 要显示的类型 all：全部 checked：已选中的
 */
function getCartNum() {
  return _request.http.request({
    url: "/trade/carts/count",
    method: _request.Method.GET,
    needToken: true,
    loading: false
  });
}

/**
 * 获取购物车可用优惠券数量
 * @param way 购物车购买：CART/立即购买：BUY_NOW/拼团购买：PINTUAN / 积分购买：POINT
 */
function getCartCouponNum(way) {
  return _request.http.request({
    url: "/trade/carts/coupon/num?way=".concat(way),
    method: _request.Method.GET,
    needToken: true,
    loading: false
  });
}

/**
 * 添加货品到购物车
 * @param skuId      产品ID
 * @param num         产品的购买数量
 * @param cartType   	购物车类型，默认加入购物车
 */
function addToCart(data) {
  return _request.http.request({
    url: "/trade/carts",
    method: _request.Method.POST,
    needToken: true,
    header: {
      "content-type": "application/x-www-form-urlencoded"
    },
    data: data
  });
}

/**
 * 更新购物车商品数量
 * @param skuId
 * @param num
 */
function updateSkuNum(skuId) {
  var num = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  return _request.http.request({
    url: "/trade/carts/sku/num/".concat(skuId),
    method: _request.Method.POST,
    header: {
      "content-type": "application/x-www-form-urlencoded"
    },
    needToken: true,
    data: {
      num: num
    }
  });
}

/**
 * 更新购物车货品选中状态
 * @param skuId
 * @param checked
 */
function updateSkuChecked(skuId, checked) {
  return _request.http.request({
    url: "/trade/carts/sku/checked/".concat(skuId),
    method: _request.Method.POST,
    needToken: true,
    header: {
      "content-type": "application/x-www-form-urlencoded"
    },
    data: {
      checked: checked
    }
  });
}

/**
 * 删除多个货品项
 * @param skuIds
 */
function deleteSkuItem(skuIds) {
  return _request.http.request({
    url: "/trade/carts/sku/remove?skuIds=".concat(skuIds),
    method: _request.Method.DELETE,
    needToken: true
  });
}

/**
 * 设置全部货品为选中或不选中
 * @param checked
 */
function checkAll(checked) {
  return _request.http.request({
    url: "/trade/carts/sku/checked",
    method: _request.Method.POST,
    needToken: true,
    params: {
      checked: checked
    }
  });
}

/**
 * 设置店铺内全部货品选中状态
 * @param storeId
 * @param checked
 */
function checkStore(storeId, checked) {
  return _request.http.request({
    url: "/trade/carts/store/".concat(storeId),
    method: _request.Method.POST,
    needToken: true,
    header: {
      "content-type": "application/x-www-form-urlencoded"
    },
    data: {
      checked: checked
    }
  });
}

/**
 * 获取结算参数
 */
function getCheckoutParams(way) {
  return _request.http.request({
    url: "/trade/carts/checked?way=" + way,
    method: _request.Method.GET,
    needToken: true
  });
}

/**
 * 设置收货地址ID
 * @param addressId
 */
function setAddressId(addressId, way) {
  return _request.http.request({
    url: "/trade/carts/shippingAddress?shippingAddressId=".concat(addressId, "&way=").concat(way),
    method: _request.Method.GET,
    needToken: true
  });
}
/**
 * 设置收货地址ID
 * @param addressId
 */
function setStoreAddressId(storeAddressId, way) {
  return _request.http.request({
    url: "/trade/carts/storeAddress?storeAddressId=".concat(storeAddressId, "&way=").concat(way),
    method: _request.Method.GET,
    needToken: true
  });
}

/**
 * 创建交易
 */
function createTrade(params) {
  return _request.http.request({
    url: "/trade/carts/create/trade",
    method: _request.Method.POST,
    needToken: true,
    message: false,
    data: params
  });
}

/**
 * 根据交易编号或订单编号查询收银台数据
 * @param params
 */
function getCashierData(params) {
  return _request.http.request({
    url: "payment/cashier/tradeDetail",
    method: _request.Method.GET,
    needToken: true,
    params: params
  });
}

/**
 * 发起支付
 * @param paymentMethod
 * @param paymentClient
 * @param params
 * @returns {*|*}
 */
function initiatePay(paymentMethod, paymentClient, params) {
  return _request.http.request({
    url: "payment/cashier/pay/".concat(paymentMethod, "/").concat(paymentClient),
    method: _request.Method.GET,
    needToken: true,
    params: params
  });
}

/**
 * 查询物流
 * @param orderSn

 */
function getExpress(orderSn) {
  return _request.http.request({
    url: "/order/order/getTraces/".concat(orderSn),
    method: _request.Method.POST,
    needToken: true
  });
}

/**
 * 获取当前会员的对于当前商品可使用的优惠券列表
 */
function getMemberCanUse(data) {
  return _request.http.request({
    url: "/promotion/coupon/canUse",
    method: _request.Method.GET,
    params: data
  });
}

/**
 * 获取当前会员的优惠券列表
 */
function getMemberCouponList(data) {
  return _request.http.request({
    url: "/promotion/coupon/getCoupons",
    method: _request.Method.GET,
    params: data
  });
}

/**
 * 使用优惠券

 */
function useCoupon(params) {
  return _request.http.request({
    url: "/trade/carts/select/coupon",
    method: _request.Method.GET,
    needToken: true,
    params: params
  });
}

/**
 * 更换参与活动
 * @param params
 */
function changeActivity(params) {
  return _request.http.request({
    url: "trade/promotion",
    method: _request.Method.POST,
    needToken: true,
    data: params,
    header: {
      "content-type": "application/x-www-form-urlencoded"
    }
  });
}

/**
 * 根据交易单号查询订单列表
 * @param trade_sn
 */
function reBuy(sn) {
  return _request.http.request({
    url: "trade/carts/rebuy/".concat(sn),
    method: _request.Method.POST,
    needToken: true
  });
}

/**
 * 获取全部配送方式
 */
function shippingMethodList(params) {
  return _request.http.request({
    url: "/trade/carts/shippingMethodList",
    method: _request.Method.GET,
    needToken: true,
    params: params
  });
}

/**
 * 提交配送方式
 * @param params
 */
function setShipMethod(params) {
  return _request.http.request({
    url: "/trade/carts/shippingMethod",
    method: _request.Method.PUT,
    needToken: true,
    params: params
  });
}

// 查看包裹列表
function getPackage(orderSn) {
  return _request.http.request({
    url: "/order/order/getPackage/".concat(orderSn),
    method: _request.Method.GET,
    needToken: true
  });
}

/***/ }),

/***/ 134:
/*!**************************************************!*\
  !*** D:/Desktop/code/ending/shop/utils/tools.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.throttle = exports.theNextDayTime = exports.getNetworkType = exports.debounce = exports.countTimeDown = void 0;
var _arguments = typeof arguments === "undefined" ? void 0 : arguments;
/**
 * 解析url参数
 * @example ?id=12345&a=b
 * @return Object {id:12345,a:b}
 */
function urlParse(url) {
  var obj = {};
  var reg = /[?&][^?&]+=[^?&]+/g;
  var arr = url.match(reg);
  if (arr) {
    arr.forEach(function (item) {
      var tempArr = item.substring(1).split("=");
      var key = decodeURIComponent(tempArr[0]);
      var val = decodeURIComponent(tempArr.splice(1).join("="));
      obj[key] = val;
    });
  }
  return obj;
}
var getNetworkType = function getNetworkType() {
  uni.getNetworkType({
    success: function success(res) {
      if (res.networkType === "none") {
        uni.showToast({
          title: "网络好像有点问题,请检查后重试！",
          duration: 2000,
          icon: "none"
        });
        var pages = getCurrentPages();
        if (pages.length) {
          var route = pages[pages.length - 1].route;
          if (route !== "pages/empty/empty") {
            uni.navigateTo({
              url: "/pages/empty/empty?type=wifi"
            });
          }
        } else {
          uni.navigateTo({
            url: "/pages/empty/empty?type=wifi"
          });
        }
      }
    }
  });
};
exports.getNetworkType = getNetworkType;
var throttle = function throttle(fn, that, gapTime) {
  // export function throttle(fn, gapTime) {
  if (gapTime == null || gapTime == undefined) {
    gapTime = 1800;
  }
  var _lastTime = that.lastTime;
  var _nowTime = +new Date();
  if (_nowTime - _lastTime > gapTime || !_lastTime) {
    fn.apply(that, _arguments); //将this和参数传给原函数
    that.lastTime = _nowTime;
  }
};

/**
 * 计算传秒数的倒计时【天、时、分、秒】
 * @param seconds
 * @returns {{day : *, hours : *, minutes : *, seconds : *}}
 */
exports.throttle = throttle;
var countTimeDown = function countTimeDown(seconds) {
  var leftTime = function leftTime(time) {
    if (time < 10) time = "0" + time;
    return time + "";
  };
  return {
    day: leftTime(parseInt(seconds / 60 / 60 / 24, 10)),
    hours: leftTime(parseInt(seconds / 60 / 60 % 24, 10)),
    minutes: leftTime(parseInt(seconds / 60 % 60, 10)),
    seconds: leftTime(parseInt(seconds % 60, 10))
  };
};

/**
 * 计算当前时间到第二天0点的倒计时[秒]
 * @returns {number}
 */
exports.countTimeDown = countTimeDown;
var theNextDayTime = function theNextDayTime() {
  var nowDate = new Date();
  var time = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate() + 1, 0, 0, 0).getTime() - nowDate.getTime();
  return parseInt(time / 1000);
};
// 防抖
exports.theNextDayTime = theNextDayTime;
var debounce = function debounce(fn, delay) {
  // 时间期限
  var delays = delay || 200;
  var timer;
  // 闭包
  return function () {
    // 考虑作用域，上下文环境，apply需要用到this对象
    var th = this;
    // 接收的参数用 ES6 中的 rest 参数统一存储到变量 args 中。arguments就是传入的参数数组,而且个数可以不确定的传回给fn（不确定函数到底有多少个参数，用arguments来接收）
    var args = arguments;
    // 判断还在定时，说明当前正在一个计时过程中，并且又触发了相同事件。所以要取消当前的计时，重新开始计时
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      timer = null;
      // 执行方法
      fn.apply(th, args);
    }, delays);
  };
};
exports.debounce = debounce;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 1389:
/*!******************************************************************!*\
  !*** D:/Desktop/code/ending/shop/uview-ui/libs/util/province.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/* eslint-disable */
var provinceData = [{
  "label": "北京市",
  "value": "11"
}, {
  "label": "天津市",
  "value": "12"
}, {
  "label": "河北省",
  "value": "13"
}, {
  "label": "山西省",
  "value": "14"
}, {
  "label": "内蒙古自治区",
  "value": "15"
}, {
  "label": "辽宁省",
  "value": "21"
}, {
  "label": "吉林省",
  "value": "22"
}, {
  "label": "黑龙江省",
  "value": "23"
}, {
  "label": "上海市",
  "value": "31"
}, {
  "label": "江苏省",
  "value": "32"
}, {
  "label": "浙江省",
  "value": "33"
}, {
  "label": "安徽省",
  "value": "34"
}, {
  "label": "福建省",
  "value": "35"
}, {
  "label": "江西省",
  "value": "36"
}, {
  "label": "山东省",
  "value": "37"
}, {
  "label": "河南省",
  "value": "41"
}, {
  "label": "湖北省",
  "value": "42"
}, {
  "label": "湖南省",
  "value": "43"
}, {
  "label": "广东省",
  "value": "44"
}, {
  "label": "广西壮族自治区",
  "value": "45"
}, {
  "label": "海南省",
  "value": "46"
}, {
  "label": "重庆市",
  "value": "50"
}, {
  "label": "四川省",
  "value": "51"
}, {
  "label": "贵州省",
  "value": "52"
}, {
  "label": "云南省",
  "value": "53"
}, {
  "label": "西藏自治区",
  "value": "54"
}, {
  "label": "陕西省",
  "value": "61"
}, {
  "label": "甘肃省",
  "value": "62"
}, {
  "label": "青海省",
  "value": "63"
}, {
  "label": "宁夏回族自治区",
  "value": "64"
}, {
  "label": "新疆维吾尔自治区",
  "value": "65"
}, {
  "label": "台湾",
  "value": "66"
}, {
  "label": "香港",
  "value": "67"
}, {
  "label": "澳门",
  "value": "68"
}];
var _default = provinceData;
exports.default = _default;

/***/ }),

/***/ 1390:
/*!**************************************************************!*\
  !*** D:/Desktop/code/ending/shop/uview-ui/libs/util/city.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/* eslint-disable */
var cityData = [[{
  "label": "市辖区",
  "value": "1101"
}], [{
  "label": "市辖区",
  "value": "1201"
}], [{
  "label": "石家庄市",
  "value": "1301"
}, {
  "label": "唐山市",
  "value": "1302"
}, {
  "label": "秦皇岛市",
  "value": "1303"
}, {
  "label": "邯郸市",
  "value": "1304"
}, {
  "label": "邢台市",
  "value": "1305"
}, {
  "label": "保定市",
  "value": "1306"
}, {
  "label": "张家口市",
  "value": "1307"
}, {
  "label": "承德市",
  "value": "1308"
}, {
  "label": "沧州市",
  "value": "1309"
}, {
  "label": "廊坊市",
  "value": "1310"
}, {
  "label": "衡水市",
  "value": "1311"
}], [{
  "label": "太原市",
  "value": "1401"
}, {
  "label": "大同市",
  "value": "1402"
}, {
  "label": "阳泉市",
  "value": "1403"
}, {
  "label": "长治市",
  "value": "1404"
}, {
  "label": "晋城市",
  "value": "1405"
}, {
  "label": "朔州市",
  "value": "1406"
}, {
  "label": "晋中市",
  "value": "1407"
}, {
  "label": "运城市",
  "value": "1408"
}, {
  "label": "忻州市",
  "value": "1409"
}, {
  "label": "临汾市",
  "value": "1410"
}, {
  "label": "吕梁市",
  "value": "1411"
}], [{
  "label": "呼和浩特市",
  "value": "1501"
}, {
  "label": "包头市",
  "value": "1502"
}, {
  "label": "乌海市",
  "value": "1503"
}, {
  "label": "赤峰市",
  "value": "1504"
}, {
  "label": "通辽市",
  "value": "1505"
}, {
  "label": "鄂尔多斯市",
  "value": "1506"
}, {
  "label": "呼伦贝尔市",
  "value": "1507"
}, {
  "label": "巴彦淖尔市",
  "value": "1508"
}, {
  "label": "乌兰察布市",
  "value": "1509"
}, {
  "label": "兴安盟",
  "value": "1522"
}, {
  "label": "锡林郭勒盟",
  "value": "1525"
}, {
  "label": "阿拉善盟",
  "value": "1529"
}], [{
  "label": "沈阳市",
  "value": "2101"
}, {
  "label": "大连市",
  "value": "2102"
}, {
  "label": "鞍山市",
  "value": "2103"
}, {
  "label": "抚顺市",
  "value": "2104"
}, {
  "label": "本溪市",
  "value": "2105"
}, {
  "label": "丹东市",
  "value": "2106"
}, {
  "label": "锦州市",
  "value": "2107"
}, {
  "label": "营口市",
  "value": "2108"
}, {
  "label": "阜新市",
  "value": "2109"
}, {
  "label": "辽阳市",
  "value": "2110"
}, {
  "label": "盘锦市",
  "value": "2111"
}, {
  "label": "铁岭市",
  "value": "2112"
}, {
  "label": "朝阳市",
  "value": "2113"
}, {
  "label": "葫芦岛市",
  "value": "2114"
}], [{
  "label": "长春市",
  "value": "2201"
}, {
  "label": "吉林市",
  "value": "2202"
}, {
  "label": "四平市",
  "value": "2203"
}, {
  "label": "辽源市",
  "value": "2204"
}, {
  "label": "通化市",
  "value": "2205"
}, {
  "label": "白山市",
  "value": "2206"
}, {
  "label": "松原市",
  "value": "2207"
}, {
  "label": "白城市",
  "value": "2208"
}, {
  "label": "延边朝鲜族自治州",
  "value": "2224"
}], [{
  "label": "哈尔滨市",
  "value": "2301"
}, {
  "label": "齐齐哈尔市",
  "value": "2302"
}, {
  "label": "鸡西市",
  "value": "2303"
}, {
  "label": "鹤岗市",
  "value": "2304"
}, {
  "label": "双鸭山市",
  "value": "2305"
}, {
  "label": "大庆市",
  "value": "2306"
}, {
  "label": "伊春市",
  "value": "2307"
}, {
  "label": "佳木斯市",
  "value": "2308"
}, {
  "label": "七台河市",
  "value": "2309"
}, {
  "label": "牡丹江市",
  "value": "2310"
}, {
  "label": "黑河市",
  "value": "2311"
}, {
  "label": "绥化市",
  "value": "2312"
}, {
  "label": "大兴安岭地区",
  "value": "2327"
}], [{
  "label": "市辖区",
  "value": "3101"
}], [{
  "label": "南京市",
  "value": "3201"
}, {
  "label": "无锡市",
  "value": "3202"
}, {
  "label": "徐州市",
  "value": "3203"
}, {
  "label": "常州市",
  "value": "3204"
}, {
  "label": "苏州市",
  "value": "3205"
}, {
  "label": "南通市",
  "value": "3206"
}, {
  "label": "连云港市",
  "value": "3207"
}, {
  "label": "淮安市",
  "value": "3208"
}, {
  "label": "盐城市",
  "value": "3209"
}, {
  "label": "扬州市",
  "value": "3210"
}, {
  "label": "镇江市",
  "value": "3211"
}, {
  "label": "泰州市",
  "value": "3212"
}, {
  "label": "宿迁市",
  "value": "3213"
}], [{
  "label": "杭州市",
  "value": "3301"
}, {
  "label": "宁波市",
  "value": "3302"
}, {
  "label": "温州市",
  "value": "3303"
}, {
  "label": "嘉兴市",
  "value": "3304"
}, {
  "label": "湖州市",
  "value": "3305"
}, {
  "label": "绍兴市",
  "value": "3306"
}, {
  "label": "金华市",
  "value": "3307"
}, {
  "label": "衢州市",
  "value": "3308"
}, {
  "label": "舟山市",
  "value": "3309"
}, {
  "label": "台州市",
  "value": "3310"
}, {
  "label": "丽水市",
  "value": "3311"
}], [{
  "label": "合肥市",
  "value": "3401"
}, {
  "label": "芜湖市",
  "value": "3402"
}, {
  "label": "蚌埠市",
  "value": "3403"
}, {
  "label": "淮南市",
  "value": "3404"
}, {
  "label": "马鞍山市",
  "value": "3405"
}, {
  "label": "淮北市",
  "value": "3406"
}, {
  "label": "铜陵市",
  "value": "3407"
}, {
  "label": "安庆市",
  "value": "3408"
}, {
  "label": "黄山市",
  "value": "3410"
}, {
  "label": "滁州市",
  "value": "3411"
}, {
  "label": "阜阳市",
  "value": "3412"
}, {
  "label": "宿州市",
  "value": "3413"
}, {
  "label": "六安市",
  "value": "3415"
}, {
  "label": "亳州市",
  "value": "3416"
}, {
  "label": "池州市",
  "value": "3417"
}, {
  "label": "宣城市",
  "value": "3418"
}], [{
  "label": "福州市",
  "value": "3501"
}, {
  "label": "厦门市",
  "value": "3502"
}, {
  "label": "莆田市",
  "value": "3503"
}, {
  "label": "三明市",
  "value": "3504"
}, {
  "label": "泉州市",
  "value": "3505"
}, {
  "label": "漳州市",
  "value": "3506"
}, {
  "label": "南平市",
  "value": "3507"
}, {
  "label": "龙岩市",
  "value": "3508"
}, {
  "label": "宁德市",
  "value": "3509"
}], [{
  "label": "南昌市",
  "value": "3601"
}, {
  "label": "景德镇市",
  "value": "3602"
}, {
  "label": "萍乡市",
  "value": "3603"
}, {
  "label": "九江市",
  "value": "3604"
}, {
  "label": "新余市",
  "value": "3605"
}, {
  "label": "鹰潭市",
  "value": "3606"
}, {
  "label": "赣州市",
  "value": "3607"
}, {
  "label": "吉安市",
  "value": "3608"
}, {
  "label": "宜春市",
  "value": "3609"
}, {
  "label": "抚州市",
  "value": "3610"
}, {
  "label": "上饶市",
  "value": "3611"
}], [{
  "label": "济南市",
  "value": "3701"
}, {
  "label": "青岛市",
  "value": "3702"
}, {
  "label": "淄博市",
  "value": "3703"
}, {
  "label": "枣庄市",
  "value": "3704"
}, {
  "label": "东营市",
  "value": "3705"
}, {
  "label": "烟台市",
  "value": "3706"
}, {
  "label": "潍坊市",
  "value": "3707"
}, {
  "label": "济宁市",
  "value": "3708"
}, {
  "label": "泰安市",
  "value": "3709"
}, {
  "label": "威海市",
  "value": "3710"
}, {
  "label": "日照市",
  "value": "3711"
}, {
  "label": "莱芜市",
  "value": "3712"
}, {
  "label": "临沂市",
  "value": "3713"
}, {
  "label": "德州市",
  "value": "3714"
}, {
  "label": "聊城市",
  "value": "3715"
}, {
  "label": "滨州市",
  "value": "3716"
}, {
  "label": "菏泽市",
  "value": "3717"
}], [{
  "label": "郑州市",
  "value": "4101"
}, {
  "label": "开封市",
  "value": "4102"
}, {
  "label": "洛阳市",
  "value": "4103"
}, {
  "label": "平顶山市",
  "value": "4104"
}, {
  "label": "安阳市",
  "value": "4105"
}, {
  "label": "鹤壁市",
  "value": "4106"
}, {
  "label": "新乡市",
  "value": "4107"
}, {
  "label": "焦作市",
  "value": "4108"
}, {
  "label": "濮阳市",
  "value": "4109"
}, {
  "label": "许昌市",
  "value": "4110"
}, {
  "label": "漯河市",
  "value": "4111"
}, {
  "label": "三门峡市",
  "value": "4112"
}, {
  "label": "南阳市",
  "value": "4113"
}, {
  "label": "商丘市",
  "value": "4114"
}, {
  "label": "信阳市",
  "value": "4115"
}, {
  "label": "周口市",
  "value": "4116"
}, {
  "label": "驻马店市",
  "value": "4117"
}, {
  "label": "省直辖县级行政区划",
  "value": "4190"
}], [{
  "label": "武汉市",
  "value": "4201"
}, {
  "label": "黄石市",
  "value": "4202"
}, {
  "label": "十堰市",
  "value": "4203"
}, {
  "label": "宜昌市",
  "value": "4205"
}, {
  "label": "襄阳市",
  "value": "4206"
}, {
  "label": "鄂州市",
  "value": "4207"
}, {
  "label": "荆门市",
  "value": "4208"
}, {
  "label": "孝感市",
  "value": "4209"
}, {
  "label": "荆州市",
  "value": "4210"
}, {
  "label": "黄冈市",
  "value": "4211"
}, {
  "label": "咸宁市",
  "value": "4212"
}, {
  "label": "随州市",
  "value": "4213"
}, {
  "label": "恩施土家族苗族自治州",
  "value": "4228"
}, {
  "label": "省直辖县级行政区划",
  "value": "4290"
}], [{
  "label": "长沙市",
  "value": "4301"
}, {
  "label": "株洲市",
  "value": "4302"
}, {
  "label": "湘潭市",
  "value": "4303"
}, {
  "label": "衡阳市",
  "value": "4304"
}, {
  "label": "邵阳市",
  "value": "4305"
}, {
  "label": "岳阳市",
  "value": "4306"
}, {
  "label": "常德市",
  "value": "4307"
}, {
  "label": "张家界市",
  "value": "4308"
}, {
  "label": "益阳市",
  "value": "4309"
}, {
  "label": "郴州市",
  "value": "4310"
}, {
  "label": "永州市",
  "value": "4311"
}, {
  "label": "怀化市",
  "value": "4312"
}, {
  "label": "娄底市",
  "value": "4313"
}, {
  "label": "湘西土家族苗族自治州",
  "value": "4331"
}], [{
  "label": "广州市",
  "value": "4401"
}, {
  "label": "韶关市",
  "value": "4402"
}, {
  "label": "深圳市",
  "value": "4403"
}, {
  "label": "珠海市",
  "value": "4404"
}, {
  "label": "汕头市",
  "value": "4405"
}, {
  "label": "佛山市",
  "value": "4406"
}, {
  "label": "江门市",
  "value": "4407"
}, {
  "label": "湛江市",
  "value": "4408"
}, {
  "label": "茂名市",
  "value": "4409"
}, {
  "label": "肇庆市",
  "value": "4412"
}, {
  "label": "惠州市",
  "value": "4413"
}, {
  "label": "梅州市",
  "value": "4414"
}, {
  "label": "汕尾市",
  "value": "4415"
}, {
  "label": "河源市",
  "value": "4416"
}, {
  "label": "阳江市",
  "value": "4417"
}, {
  "label": "清远市",
  "value": "4418"
}, {
  "label": "东莞市",
  "value": "4419"
}, {
  "label": "中山市",
  "value": "4420"
}, {
  "label": "潮州市",
  "value": "4451"
}, {
  "label": "揭阳市",
  "value": "4452"
}, {
  "label": "云浮市",
  "value": "4453"
}], [{
  "label": "南宁市",
  "value": "4501"
}, {
  "label": "柳州市",
  "value": "4502"
}, {
  "label": "桂林市",
  "value": "4503"
}, {
  "label": "梧州市",
  "value": "4504"
}, {
  "label": "北海市",
  "value": "4505"
}, {
  "label": "防城港市",
  "value": "4506"
}, {
  "label": "钦州市",
  "value": "4507"
}, {
  "label": "贵港市",
  "value": "4508"
}, {
  "label": "玉林市",
  "value": "4509"
}, {
  "label": "百色市",
  "value": "4510"
}, {
  "label": "贺州市",
  "value": "4511"
}, {
  "label": "河池市",
  "value": "4512"
}, {
  "label": "来宾市",
  "value": "4513"
}, {
  "label": "崇左市",
  "value": "4514"
}], [{
  "label": "海口市",
  "value": "4601"
}, {
  "label": "三亚市",
  "value": "4602"
}, {
  "label": "三沙市",
  "value": "4603"
}, {
  "label": "儋州市",
  "value": "4604"
}, {
  "label": "省直辖县级行政区划",
  "value": "4690"
}], [{
  "label": "市辖区",
  "value": "5001"
}, {
  "label": "县",
  "value": "5002"
}], [{
  "label": "成都市",
  "value": "5101"
}, {
  "label": "自贡市",
  "value": "5103"
}, {
  "label": "攀枝花市",
  "value": "5104"
}, {
  "label": "泸州市",
  "value": "5105"
}, {
  "label": "德阳市",
  "value": "5106"
}, {
  "label": "绵阳市",
  "value": "5107"
}, {
  "label": "广元市",
  "value": "5108"
}, {
  "label": "遂宁市",
  "value": "5109"
}, {
  "label": "内江市",
  "value": "5110"
}, {
  "label": "乐山市",
  "value": "5111"
}, {
  "label": "南充市",
  "value": "5113"
}, {
  "label": "眉山市",
  "value": "5114"
}, {
  "label": "宜宾市",
  "value": "5115"
}, {
  "label": "广安市",
  "value": "5116"
}, {
  "label": "达州市",
  "value": "5117"
}, {
  "label": "雅安市",
  "value": "5118"
}, {
  "label": "巴中市",
  "value": "5119"
}, {
  "label": "资阳市",
  "value": "5120"
}, {
  "label": "阿坝藏族羌族自治州",
  "value": "5132"
}, {
  "label": "甘孜藏族自治州",
  "value": "5133"
}, {
  "label": "凉山彝族自治州",
  "value": "5134"
}], [{
  "label": "贵阳市",
  "value": "5201"
}, {
  "label": "六盘水市",
  "value": "5202"
}, {
  "label": "遵义市",
  "value": "5203"
}, {
  "label": "安顺市",
  "value": "5204"
}, {
  "label": "毕节市",
  "value": "5205"
}, {
  "label": "铜仁市",
  "value": "5206"
}, {
  "label": "黔西南布依族苗族自治州",
  "value": "5223"
}, {
  "label": "黔东南苗族侗族自治州",
  "value": "5226"
}, {
  "label": "黔南布依族苗族自治州",
  "value": "5227"
}], [{
  "label": "昆明市",
  "value": "5301"
}, {
  "label": "曲靖市",
  "value": "5303"
}, {
  "label": "玉溪市",
  "value": "5304"
}, {
  "label": "保山市",
  "value": "5305"
}, {
  "label": "昭通市",
  "value": "5306"
}, {
  "label": "丽江市",
  "value": "5307"
}, {
  "label": "普洱市",
  "value": "5308"
}, {
  "label": "临沧市",
  "value": "5309"
}, {
  "label": "楚雄彝族自治州",
  "value": "5323"
}, {
  "label": "红河哈尼族彝族自治州",
  "value": "5325"
}, {
  "label": "文山壮族苗族自治州",
  "value": "5326"
}, {
  "label": "西双版纳傣族自治州",
  "value": "5328"
}, {
  "label": "大理白族自治州",
  "value": "5329"
}, {
  "label": "德宏傣族景颇族自治州",
  "value": "5331"
}, {
  "label": "怒江傈僳族自治州",
  "value": "5333"
}, {
  "label": "迪庆藏族自治州",
  "value": "5334"
}], [{
  "label": "拉萨市",
  "value": "5401"
}, {
  "label": "日喀则市",
  "value": "5402"
}, {
  "label": "昌都市",
  "value": "5403"
}, {
  "label": "林芝市",
  "value": "5404"
}, {
  "label": "山南市",
  "value": "5405"
}, {
  "label": "那曲地区",
  "value": "5424"
}, {
  "label": "阿里地区",
  "value": "5425"
}], [{
  "label": "西安市",
  "value": "6101"
}, {
  "label": "铜川市",
  "value": "6102"
}, {
  "label": "宝鸡市",
  "value": "6103"
}, {
  "label": "咸阳市",
  "value": "6104"
}, {
  "label": "渭南市",
  "value": "6105"
}, {
  "label": "延安市",
  "value": "6106"
}, {
  "label": "汉中市",
  "value": "6107"
}, {
  "label": "榆林市",
  "value": "6108"
}, {
  "label": "安康市",
  "value": "6109"
}, {
  "label": "商洛市",
  "value": "6110"
}], [{
  "label": "兰州市",
  "value": "6201"
}, {
  "label": "嘉峪关市",
  "value": "6202"
}, {
  "label": "金昌市",
  "value": "6203"
}, {
  "label": "白银市",
  "value": "6204"
}, {
  "label": "天水市",
  "value": "6205"
}, {
  "label": "武威市",
  "value": "6206"
}, {
  "label": "张掖市",
  "value": "6207"
}, {
  "label": "平凉市",
  "value": "6208"
}, {
  "label": "酒泉市",
  "value": "6209"
}, {
  "label": "庆阳市",
  "value": "6210"
}, {
  "label": "定西市",
  "value": "6211"
}, {
  "label": "陇南市",
  "value": "6212"
}, {
  "label": "临夏回族自治州",
  "value": "6229"
}, {
  "label": "甘南藏族自治州",
  "value": "6230"
}], [{
  "label": "西宁市",
  "value": "6301"
}, {
  "label": "海东市",
  "value": "6302"
}, {
  "label": "海北藏族自治州",
  "value": "6322"
}, {
  "label": "黄南藏族自治州",
  "value": "6323"
}, {
  "label": "海南藏族自治州",
  "value": "6325"
}, {
  "label": "果洛藏族自治州",
  "value": "6326"
}, {
  "label": "玉树藏族自治州",
  "value": "6327"
}, {
  "label": "海西蒙古族藏族自治州",
  "value": "6328"
}], [{
  "label": "银川市",
  "value": "6401"
}, {
  "label": "石嘴山市",
  "value": "6402"
}, {
  "label": "吴忠市",
  "value": "6403"
}, {
  "label": "固原市",
  "value": "6404"
}, {
  "label": "中卫市",
  "value": "6405"
}], [{
  "label": "乌鲁木齐市",
  "value": "6501"
}, {
  "label": "克拉玛依市",
  "value": "6502"
}, {
  "label": "吐鲁番市",
  "value": "6504"
}, {
  "label": "哈密市",
  "value": "6505"
}, {
  "label": "昌吉回族自治州",
  "value": "6523"
}, {
  "label": "博尔塔拉蒙古自治州",
  "value": "6527"
}, {
  "label": "巴音郭楞蒙古自治州",
  "value": "6528"
}, {
  "label": "阿克苏地区",
  "value": "6529"
}, {
  "label": "克孜勒苏柯尔克孜自治州",
  "value": "6530"
}, {
  "label": "喀什地区",
  "value": "6531"
}, {
  "label": "和田地区",
  "value": "6532"
}, {
  "label": "伊犁哈萨克自治州",
  "value": "6540"
}, {
  "label": "塔城地区",
  "value": "6542"
}, {
  "label": "阿勒泰地区",
  "value": "6543"
}, {
  "label": "自治区直辖县级行政区划",
  "value": "6590"
}], [{
  "label": "台北",
  "value": "6601"
}, {
  "label": "高雄",
  "value": "6602"
}, {
  "label": "基隆",
  "value": "6603"
}, {
  "label": "台中",
  "value": "6604"
}, {
  "label": "台南",
  "value": "6605"
}, {
  "label": "新竹",
  "value": "6606"
}, {
  "label": "嘉义",
  "value": "6607"
}, {
  "label": "宜兰",
  "value": "6608"
}, {
  "label": "桃园",
  "value": "6609"
}, {
  "label": "苗栗",
  "value": "6610"
}, {
  "label": "彰化",
  "value": "6611"
}, {
  "label": "南投",
  "value": "6612"
}, {
  "label": "云林",
  "value": "6613"
}, {
  "label": "屏东",
  "value": "6614"
}, {
  "label": "台东",
  "value": "6615"
}, {
  "label": "花莲",
  "value": "6616"
}, {
  "label": "澎湖",
  "value": "6617"
}], [{
  "label": "香港岛",
  "value": "6701"
}, {
  "label": "九龙",
  "value": "6702"
}, {
  "label": "新界",
  "value": "6703"
}], [{
  "label": "澳门半岛",
  "value": "6801"
}, {
  "label": "氹仔岛",
  "value": "6802"
}, {
  "label": "路环岛",
  "value": "6803"
}, {
  "label": "路氹城",
  "value": "6804"
}]];
var _default = cityData;
exports.default = _default;

/***/ }),

/***/ 1391:
/*!**************************************************************!*\
  !*** D:/Desktop/code/ending/shop/uview-ui/libs/util/area.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/* eslint-disable */
var areaData = [[[{
  "label": "东城区",
  "value": "110101"
}, {
  "label": "西城区",
  "value": "110102"
}, {
  "label": "朝阳区",
  "value": "110105"
}, {
  "label": "丰台区",
  "value": "110106"
}, {
  "label": "石景山区",
  "value": "110107"
}, {
  "label": "海淀区",
  "value": "110108"
}, {
  "label": "门头沟区",
  "value": "110109"
}, {
  "label": "房山区",
  "value": "110111"
}, {
  "label": "通州区",
  "value": "110112"
}, {
  "label": "顺义区",
  "value": "110113"
}, {
  "label": "昌平区",
  "value": "110114"
}, {
  "label": "大兴区",
  "value": "110115"
}, {
  "label": "怀柔区",
  "value": "110116"
}, {
  "label": "平谷区",
  "value": "110117"
}, {
  "label": "密云区",
  "value": "110118"
}, {
  "label": "延庆区",
  "value": "110119"
}]], [[{
  "label": "和平区",
  "value": "120101"
}, {
  "label": "河东区",
  "value": "120102"
}, {
  "label": "河西区",
  "value": "120103"
}, {
  "label": "南开区",
  "value": "120104"
}, {
  "label": "河北区",
  "value": "120105"
}, {
  "label": "红桥区",
  "value": "120106"
}, {
  "label": "东丽区",
  "value": "120110"
}, {
  "label": "西青区",
  "value": "120111"
}, {
  "label": "津南区",
  "value": "120112"
}, {
  "label": "北辰区",
  "value": "120113"
}, {
  "label": "武清区",
  "value": "120114"
}, {
  "label": "宝坻区",
  "value": "120115"
}, {
  "label": "滨海新区",
  "value": "120116"
}, {
  "label": "宁河区",
  "value": "120117"
}, {
  "label": "静海区",
  "value": "120118"
}, {
  "label": "蓟州区",
  "value": "120119"
}]], [[{
  "label": "长安区",
  "value": "130102"
}, {
  "label": "桥西区",
  "value": "130104"
}, {
  "label": "新华区",
  "value": "130105"
}, {
  "label": "井陉矿区",
  "value": "130107"
}, {
  "label": "裕华区",
  "value": "130108"
}, {
  "label": "藁城区",
  "value": "130109"
}, {
  "label": "鹿泉区",
  "value": "130110"
}, {
  "label": "栾城区",
  "value": "130111"
}, {
  "label": "井陉县",
  "value": "130121"
}, {
  "label": "正定县",
  "value": "130123"
}, {
  "label": "行唐县",
  "value": "130125"
}, {
  "label": "灵寿县",
  "value": "130126"
}, {
  "label": "高邑县",
  "value": "130127"
}, {
  "label": "深泽县",
  "value": "130128"
}, {
  "label": "赞皇县",
  "value": "130129"
}, {
  "label": "无极县",
  "value": "130130"
}, {
  "label": "平山县",
  "value": "130131"
}, {
  "label": "元氏县",
  "value": "130132"
}, {
  "label": "赵县",
  "value": "130133"
}, {
  "label": "石家庄高新技术产业开发区",
  "value": "130171"
}, {
  "label": "石家庄循环化工园区",
  "value": "130172"
}, {
  "label": "辛集市",
  "value": "130181"
}, {
  "label": "晋州市",
  "value": "130183"
}, {
  "label": "新乐市",
  "value": "130184"
}], [{
  "label": "路南区",
  "value": "130202"
}, {
  "label": "路北区",
  "value": "130203"
}, {
  "label": "古冶区",
  "value": "130204"
}, {
  "label": "开平区",
  "value": "130205"
}, {
  "label": "丰南区",
  "value": "130207"
}, {
  "label": "丰润区",
  "value": "130208"
}, {
  "label": "曹妃甸区",
  "value": "130209"
}, {
  "label": "滦县",
  "value": "130223"
}, {
  "label": "滦南县",
  "value": "130224"
}, {
  "label": "乐亭县",
  "value": "130225"
}, {
  "label": "迁西县",
  "value": "130227"
}, {
  "label": "玉田县",
  "value": "130229"
}, {
  "label": "唐山市芦台经济技术开发区",
  "value": "130271"
}, {
  "label": "唐山市汉沽管理区",
  "value": "130272"
}, {
  "label": "唐山高新技术产业开发区",
  "value": "130273"
}, {
  "label": "河北唐山海港经济开发区",
  "value": "130274"
}, {
  "label": "遵化市",
  "value": "130281"
}, {
  "label": "迁安市",
  "value": "130283"
}], [{
  "label": "海港区",
  "value": "130302"
}, {
  "label": "山海关区",
  "value": "130303"
}, {
  "label": "北戴河区",
  "value": "130304"
}, {
  "label": "抚宁区",
  "value": "130306"
}, {
  "label": "青龙满族自治县",
  "value": "130321"
}, {
  "label": "昌黎县",
  "value": "130322"
}, {
  "label": "卢龙县",
  "value": "130324"
}, {
  "label": "秦皇岛市经济技术开发区",
  "value": "130371"
}, {
  "label": "北戴河新区",
  "value": "130372"
}], [{
  "label": "邯山区",
  "value": "130402"
}, {
  "label": "丛台区",
  "value": "130403"
}, {
  "label": "复兴区",
  "value": "130404"
}, {
  "label": "峰峰矿区",
  "value": "130406"
}, {
  "label": "肥乡区",
  "value": "130407"
}, {
  "label": "永年区",
  "value": "130408"
}, {
  "label": "临漳县",
  "value": "130423"
}, {
  "label": "成安县",
  "value": "130424"
}, {
  "label": "大名县",
  "value": "130425"
}, {
  "label": "涉县",
  "value": "130426"
}, {
  "label": "磁县",
  "value": "130427"
}, {
  "label": "邱县",
  "value": "130430"
}, {
  "label": "鸡泽县",
  "value": "130431"
}, {
  "label": "广平县",
  "value": "130432"
}, {
  "label": "馆陶县",
  "value": "130433"
}, {
  "label": "魏县",
  "value": "130434"
}, {
  "label": "曲周县",
  "value": "130435"
}, {
  "label": "邯郸经济技术开发区",
  "value": "130471"
}, {
  "label": "邯郸冀南新区",
  "value": "130473"
}, {
  "label": "武安市",
  "value": "130481"
}], [{
  "label": "桥东区",
  "value": "130502"
}, {
  "label": "桥西区",
  "value": "130503"
}, {
  "label": "邢台县",
  "value": "130521"
}, {
  "label": "临城县",
  "value": "130522"
}, {
  "label": "内丘县",
  "value": "130523"
}, {
  "label": "柏乡县",
  "value": "130524"
}, {
  "label": "隆尧县",
  "value": "130525"
}, {
  "label": "任县",
  "value": "130526"
}, {
  "label": "南和县",
  "value": "130527"
}, {
  "label": "宁晋县",
  "value": "130528"
}, {
  "label": "巨鹿县",
  "value": "130529"
}, {
  "label": "新河县",
  "value": "130530"
}, {
  "label": "广宗县",
  "value": "130531"
}, {
  "label": "平乡县",
  "value": "130532"
}, {
  "label": "威县",
  "value": "130533"
}, {
  "label": "清河县",
  "value": "130534"
}, {
  "label": "临西县",
  "value": "130535"
}, {
  "label": "河北邢台经济开发区",
  "value": "130571"
}, {
  "label": "南宫市",
  "value": "130581"
}, {
  "label": "沙河市",
  "value": "130582"
}], [{
  "label": "竞秀区",
  "value": "130602"
}, {
  "label": "莲池区",
  "value": "130606"
}, {
  "label": "满城区",
  "value": "130607"
}, {
  "label": "清苑区",
  "value": "130608"
}, {
  "label": "徐水区",
  "value": "130609"
}, {
  "label": "涞水县",
  "value": "130623"
}, {
  "label": "阜平县",
  "value": "130624"
}, {
  "label": "定兴县",
  "value": "130626"
}, {
  "label": "唐县",
  "value": "130627"
}, {
  "label": "高阳县",
  "value": "130628"
}, {
  "label": "容城县",
  "value": "130629"
}, {
  "label": "涞源县",
  "value": "130630"
}, {
  "label": "望都县",
  "value": "130631"
}, {
  "label": "安新县",
  "value": "130632"
}, {
  "label": "易县",
  "value": "130633"
}, {
  "label": "曲阳县",
  "value": "130634"
}, {
  "label": "蠡县",
  "value": "130635"
}, {
  "label": "顺平县",
  "value": "130636"
}, {
  "label": "博野县",
  "value": "130637"
}, {
  "label": "雄县",
  "value": "130638"
}, {
  "label": "保定高新技术产业开发区",
  "value": "130671"
}, {
  "label": "保定白沟新城",
  "value": "130672"
}, {
  "label": "涿州市",
  "value": "130681"
}, {
  "label": "定州市",
  "value": "130682"
}, {
  "label": "安国市",
  "value": "130683"
}, {
  "label": "高碑店市",
  "value": "130684"
}], [{
  "label": "桥东区",
  "value": "130702"
}, {
  "label": "桥西区",
  "value": "130703"
}, {
  "label": "宣化区",
  "value": "130705"
}, {
  "label": "下花园区",
  "value": "130706"
}, {
  "label": "万全区",
  "value": "130708"
}, {
  "label": "崇礼区",
  "value": "130709"
}, {
  "label": "张北县",
  "value": "130722"
}, {
  "label": "康保县",
  "value": "130723"
}, {
  "label": "沽源县",
  "value": "130724"
}, {
  "label": "尚义县",
  "value": "130725"
}, {
  "label": "蔚县",
  "value": "130726"
}, {
  "label": "阳原县",
  "value": "130727"
}, {
  "label": "怀安县",
  "value": "130728"
}, {
  "label": "怀来县",
  "value": "130730"
}, {
  "label": "涿鹿县",
  "value": "130731"
}, {
  "label": "赤城县",
  "value": "130732"
}, {
  "label": "张家口市高新技术产业开发区",
  "value": "130771"
}, {
  "label": "张家口市察北管理区",
  "value": "130772"
}, {
  "label": "张家口市塞北管理区",
  "value": "130773"
}], [{
  "label": "双桥区",
  "value": "130802"
}, {
  "label": "双滦区",
  "value": "130803"
}, {
  "label": "鹰手营子矿区",
  "value": "130804"
}, {
  "label": "承德县",
  "value": "130821"
}, {
  "label": "兴隆县",
  "value": "130822"
}, {
  "label": "滦平县",
  "value": "130824"
}, {
  "label": "隆化县",
  "value": "130825"
}, {
  "label": "丰宁满族自治县",
  "value": "130826"
}, {
  "label": "宽城满族自治县",
  "value": "130827"
}, {
  "label": "围场满族蒙古族自治县",
  "value": "130828"
}, {
  "label": "承德高新技术产业开发区",
  "value": "130871"
}, {
  "label": "平泉市",
  "value": "130881"
}], [{
  "label": "新华区",
  "value": "130902"
}, {
  "label": "运河区",
  "value": "130903"
}, {
  "label": "沧县",
  "value": "130921"
}, {
  "label": "青县",
  "value": "130922"
}, {
  "label": "东光县",
  "value": "130923"
}, {
  "label": "海兴县",
  "value": "130924"
}, {
  "label": "盐山县",
  "value": "130925"
}, {
  "label": "肃宁县",
  "value": "130926"
}, {
  "label": "南皮县",
  "value": "130927"
}, {
  "label": "吴桥县",
  "value": "130928"
}, {
  "label": "献县",
  "value": "130929"
}, {
  "label": "孟村回族自治县",
  "value": "130930"
}, {
  "label": "河北沧州经济开发区",
  "value": "130971"
}, {
  "label": "沧州高新技术产业开发区",
  "value": "130972"
}, {
  "label": "沧州渤海新区",
  "value": "130973"
}, {
  "label": "泊头市",
  "value": "130981"
}, {
  "label": "任丘市",
  "value": "130982"
}, {
  "label": "黄骅市",
  "value": "130983"
}, {
  "label": "河间市",
  "value": "130984"
}], [{
  "label": "安次区",
  "value": "131002"
}, {
  "label": "广阳区",
  "value": "131003"
}, {
  "label": "固安县",
  "value": "131022"
}, {
  "label": "永清县",
  "value": "131023"
}, {
  "label": "香河县",
  "value": "131024"
}, {
  "label": "大城县",
  "value": "131025"
}, {
  "label": "文安县",
  "value": "131026"
}, {
  "label": "大厂回族自治县",
  "value": "131028"
}, {
  "label": "廊坊经济技术开发区",
  "value": "131071"
}, {
  "label": "霸州市",
  "value": "131081"
}, {
  "label": "三河市",
  "value": "131082"
}], [{
  "label": "桃城区",
  "value": "131102"
}, {
  "label": "冀州区",
  "value": "131103"
}, {
  "label": "枣强县",
  "value": "131121"
}, {
  "label": "武邑县",
  "value": "131122"
}, {
  "label": "武强县",
  "value": "131123"
}, {
  "label": "饶阳县",
  "value": "131124"
}, {
  "label": "安平县",
  "value": "131125"
}, {
  "label": "故城县",
  "value": "131126"
}, {
  "label": "景县",
  "value": "131127"
}, {
  "label": "阜城县",
  "value": "131128"
}, {
  "label": "河北衡水经济开发区",
  "value": "131171"
}, {
  "label": "衡水滨湖新区",
  "value": "131172"
}, {
  "label": "深州市",
  "value": "131182"
}]], [[{
  "label": "小店区",
  "value": "140105"
}, {
  "label": "迎泽区",
  "value": "140106"
}, {
  "label": "杏花岭区",
  "value": "140107"
}, {
  "label": "尖草坪区",
  "value": "140108"
}, {
  "label": "万柏林区",
  "value": "140109"
}, {
  "label": "晋源区",
  "value": "140110"
}, {
  "label": "清徐县",
  "value": "140121"
}, {
  "label": "阳曲县",
  "value": "140122"
}, {
  "label": "娄烦县",
  "value": "140123"
}, {
  "label": "山西转型综合改革示范区",
  "value": "140171"
}, {
  "label": "古交市",
  "value": "140181"
}], [{
  "label": "城区",
  "value": "140202"
}, {
  "label": "矿区",
  "value": "140203"
}, {
  "label": "南郊区",
  "value": "140211"
}, {
  "label": "新荣区",
  "value": "140212"
}, {
  "label": "阳高县",
  "value": "140221"
}, {
  "label": "天镇县",
  "value": "140222"
}, {
  "label": "广灵县",
  "value": "140223"
}, {
  "label": "灵丘县",
  "value": "140224"
}, {
  "label": "浑源县",
  "value": "140225"
}, {
  "label": "左云县",
  "value": "140226"
}, {
  "label": "大同县",
  "value": "140227"
}, {
  "label": "山西大同经济开发区",
  "value": "140271"
}], [{
  "label": "城区",
  "value": "140302"
}, {
  "label": "矿区",
  "value": "140303"
}, {
  "label": "郊区",
  "value": "140311"
}, {
  "label": "平定县",
  "value": "140321"
}, {
  "label": "盂县",
  "value": "140322"
}, {
  "label": "山西阳泉经济开发区",
  "value": "140371"
}], [{
  "label": "城区",
  "value": "140402"
}, {
  "label": "郊区",
  "value": "140411"
}, {
  "label": "长治县",
  "value": "140421"
}, {
  "label": "襄垣县",
  "value": "140423"
}, {
  "label": "屯留县",
  "value": "140424"
}, {
  "label": "平顺县",
  "value": "140425"
}, {
  "label": "黎城县",
  "value": "140426"
}, {
  "label": "壶关县",
  "value": "140427"
}, {
  "label": "长子县",
  "value": "140428"
}, {
  "label": "武乡县",
  "value": "140429"
}, {
  "label": "沁县",
  "value": "140430"
}, {
  "label": "沁源县",
  "value": "140431"
}, {
  "label": "山西长治高新技术产业园区",
  "value": "140471"
}, {
  "label": "潞城市",
  "value": "140481"
}], [{
  "label": "城区",
  "value": "140502"
}, {
  "label": "沁水县",
  "value": "140521"
}, {
  "label": "阳城县",
  "value": "140522"
}, {
  "label": "陵川县",
  "value": "140524"
}, {
  "label": "泽州县",
  "value": "140525"
}, {
  "label": "高平市",
  "value": "140581"
}], [{
  "label": "朔城区",
  "value": "140602"
}, {
  "label": "平鲁区",
  "value": "140603"
}, {
  "label": "山阴县",
  "value": "140621"
}, {
  "label": "应县",
  "value": "140622"
}, {
  "label": "右玉县",
  "value": "140623"
}, {
  "label": "怀仁县",
  "value": "140624"
}, {
  "label": "山西朔州经济开发区",
  "value": "140671"
}], [{
  "label": "榆次区",
  "value": "140702"
}, {
  "label": "榆社县",
  "value": "140721"
}, {
  "label": "左权县",
  "value": "140722"
}, {
  "label": "和顺县",
  "value": "140723"
}, {
  "label": "昔阳县",
  "value": "140724"
}, {
  "label": "寿阳县",
  "value": "140725"
}, {
  "label": "太谷县",
  "value": "140726"
}, {
  "label": "祁县",
  "value": "140727"
}, {
  "label": "平遥县",
  "value": "140728"
}, {
  "label": "灵石县",
  "value": "140729"
}, {
  "label": "介休市",
  "value": "140781"
}], [{
  "label": "盐湖区",
  "value": "140802"
}, {
  "label": "临猗县",
  "value": "140821"
}, {
  "label": "万荣县",
  "value": "140822"
}, {
  "label": "闻喜县",
  "value": "140823"
}, {
  "label": "稷山县",
  "value": "140824"
}, {
  "label": "新绛县",
  "value": "140825"
}, {
  "label": "绛县",
  "value": "140826"
}, {
  "label": "垣曲县",
  "value": "140827"
}, {
  "label": "夏县",
  "value": "140828"
}, {
  "label": "平陆县",
  "value": "140829"
}, {
  "label": "芮城县",
  "value": "140830"
}, {
  "label": "永济市",
  "value": "140881"
}, {
  "label": "河津市",
  "value": "140882"
}], [{
  "label": "忻府区",
  "value": "140902"
}, {
  "label": "定襄县",
  "value": "140921"
}, {
  "label": "五台县",
  "value": "140922"
}, {
  "label": "代县",
  "value": "140923"
}, {
  "label": "繁峙县",
  "value": "140924"
}, {
  "label": "宁武县",
  "value": "140925"
}, {
  "label": "静乐县",
  "value": "140926"
}, {
  "label": "神池县",
  "value": "140927"
}, {
  "label": "五寨县",
  "value": "140928"
}, {
  "label": "岢岚县",
  "value": "140929"
}, {
  "label": "河曲县",
  "value": "140930"
}, {
  "label": "保德县",
  "value": "140931"
}, {
  "label": "偏关县",
  "value": "140932"
}, {
  "label": "五台山风景名胜区",
  "value": "140971"
}, {
  "label": "原平市",
  "value": "140981"
}], [{
  "label": "尧都区",
  "value": "141002"
}, {
  "label": "曲沃县",
  "value": "141021"
}, {
  "label": "翼城县",
  "value": "141022"
}, {
  "label": "襄汾县",
  "value": "141023"
}, {
  "label": "洪洞县",
  "value": "141024"
}, {
  "label": "古县",
  "value": "141025"
}, {
  "label": "安泽县",
  "value": "141026"
}, {
  "label": "浮山县",
  "value": "141027"
}, {
  "label": "吉县",
  "value": "141028"
}, {
  "label": "乡宁县",
  "value": "141029"
}, {
  "label": "大宁县",
  "value": "141030"
}, {
  "label": "隰县",
  "value": "141031"
}, {
  "label": "永和县",
  "value": "141032"
}, {
  "label": "蒲县",
  "value": "141033"
}, {
  "label": "汾西县",
  "value": "141034"
}, {
  "label": "侯马市",
  "value": "141081"
}, {
  "label": "霍州市",
  "value": "141082"
}], [{
  "label": "离石区",
  "value": "141102"
}, {
  "label": "文水县",
  "value": "141121"
}, {
  "label": "交城县",
  "value": "141122"
}, {
  "label": "兴县",
  "value": "141123"
}, {
  "label": "临县",
  "value": "141124"
}, {
  "label": "柳林县",
  "value": "141125"
}, {
  "label": "石楼县",
  "value": "141126"
}, {
  "label": "岚县",
  "value": "141127"
}, {
  "label": "方山县",
  "value": "141128"
}, {
  "label": "中阳县",
  "value": "141129"
}, {
  "label": "交口县",
  "value": "141130"
}, {
  "label": "孝义市",
  "value": "141181"
}, {
  "label": "汾阳市",
  "value": "141182"
}]], [[{
  "label": "新城区",
  "value": "150102"
}, {
  "label": "回民区",
  "value": "150103"
}, {
  "label": "玉泉区",
  "value": "150104"
}, {
  "label": "赛罕区",
  "value": "150105"
}, {
  "label": "土默特左旗",
  "value": "150121"
}, {
  "label": "托克托县",
  "value": "150122"
}, {
  "label": "和林格尔县",
  "value": "150123"
}, {
  "label": "清水河县",
  "value": "150124"
}, {
  "label": "武川县",
  "value": "150125"
}, {
  "label": "呼和浩特金海工业园区",
  "value": "150171"
}, {
  "label": "呼和浩特经济技术开发区",
  "value": "150172"
}], [{
  "label": "东河区",
  "value": "150202"
}, {
  "label": "昆都仑区",
  "value": "150203"
}, {
  "label": "青山区",
  "value": "150204"
}, {
  "label": "石拐区",
  "value": "150205"
}, {
  "label": "白云鄂博矿区",
  "value": "150206"
}, {
  "label": "九原区",
  "value": "150207"
}, {
  "label": "土默特右旗",
  "value": "150221"
}, {
  "label": "固阳县",
  "value": "150222"
}, {
  "label": "达尔罕茂明安联合旗",
  "value": "150223"
}, {
  "label": "包头稀土高新技术产业开发区",
  "value": "150271"
}], [{
  "label": "海勃湾区",
  "value": "150302"
}, {
  "label": "海南区",
  "value": "150303"
}, {
  "label": "乌达区",
  "value": "150304"
}], [{
  "label": "红山区",
  "value": "150402"
}, {
  "label": "元宝山区",
  "value": "150403"
}, {
  "label": "松山区",
  "value": "150404"
}, {
  "label": "阿鲁科尔沁旗",
  "value": "150421"
}, {
  "label": "巴林左旗",
  "value": "150422"
}, {
  "label": "巴林右旗",
  "value": "150423"
}, {
  "label": "林西县",
  "value": "150424"
}, {
  "label": "克什克腾旗",
  "value": "150425"
}, {
  "label": "翁牛特旗",
  "value": "150426"
}, {
  "label": "喀喇沁旗",
  "value": "150428"
}, {
  "label": "宁城县",
  "value": "150429"
}, {
  "label": "敖汉旗",
  "value": "150430"
}], [{
  "label": "科尔沁区",
  "value": "150502"
}, {
  "label": "科尔沁左翼中旗",
  "value": "150521"
}, {
  "label": "科尔沁左翼后旗",
  "value": "150522"
}, {
  "label": "开鲁县",
  "value": "150523"
}, {
  "label": "库伦旗",
  "value": "150524"
}, {
  "label": "奈曼旗",
  "value": "150525"
}, {
  "label": "扎鲁特旗",
  "value": "150526"
}, {
  "label": "通辽经济技术开发区",
  "value": "150571"
}, {
  "label": "霍林郭勒市",
  "value": "150581"
}], [{
  "label": "东胜区",
  "value": "150602"
}, {
  "label": "康巴什区",
  "value": "150603"
}, {
  "label": "达拉特旗",
  "value": "150621"
}, {
  "label": "准格尔旗",
  "value": "150622"
}, {
  "label": "鄂托克前旗",
  "value": "150623"
}, {
  "label": "鄂托克旗",
  "value": "150624"
}, {
  "label": "杭锦旗",
  "value": "150625"
}, {
  "label": "乌审旗",
  "value": "150626"
}, {
  "label": "伊金霍洛旗",
  "value": "150627"
}], [{
  "label": "海拉尔区",
  "value": "150702"
}, {
  "label": "扎赉诺尔区",
  "value": "150703"
}, {
  "label": "阿荣旗",
  "value": "150721"
}, {
  "label": "莫力达瓦达斡尔族自治旗",
  "value": "150722"
}, {
  "label": "鄂伦春自治旗",
  "value": "150723"
}, {
  "label": "鄂温克族自治旗",
  "value": "150724"
}, {
  "label": "陈巴尔虎旗",
  "value": "150725"
}, {
  "label": "新巴尔虎左旗",
  "value": "150726"
}, {
  "label": "新巴尔虎右旗",
  "value": "150727"
}, {
  "label": "满洲里市",
  "value": "150781"
}, {
  "label": "牙克石市",
  "value": "150782"
}, {
  "label": "扎兰屯市",
  "value": "150783"
}, {
  "label": "额尔古纳市",
  "value": "150784"
}, {
  "label": "根河市",
  "value": "150785"
}], [{
  "label": "临河区",
  "value": "150802"
}, {
  "label": "五原县",
  "value": "150821"
}, {
  "label": "磴口县",
  "value": "150822"
}, {
  "label": "乌拉特前旗",
  "value": "150823"
}, {
  "label": "乌拉特中旗",
  "value": "150824"
}, {
  "label": "乌拉特后旗",
  "value": "150825"
}, {
  "label": "杭锦后旗",
  "value": "150826"
}], [{
  "label": "集宁区",
  "value": "150902"
}, {
  "label": "卓资县",
  "value": "150921"
}, {
  "label": "化德县",
  "value": "150922"
}, {
  "label": "商都县",
  "value": "150923"
}, {
  "label": "兴和县",
  "value": "150924"
}, {
  "label": "凉城县",
  "value": "150925"
}, {
  "label": "察哈尔右翼前旗",
  "value": "150926"
}, {
  "label": "察哈尔右翼中旗",
  "value": "150927"
}, {
  "label": "察哈尔右翼后旗",
  "value": "150928"
}, {
  "label": "四子王旗",
  "value": "150929"
}, {
  "label": "丰镇市",
  "value": "150981"
}], [{
  "label": "乌兰浩特市",
  "value": "152201"
}, {
  "label": "阿尔山市",
  "value": "152202"
}, {
  "label": "科尔沁右翼前旗",
  "value": "152221"
}, {
  "label": "科尔沁右翼中旗",
  "value": "152222"
}, {
  "label": "扎赉特旗",
  "value": "152223"
}, {
  "label": "突泉县",
  "value": "152224"
}], [{
  "label": "二连浩特市",
  "value": "152501"
}, {
  "label": "锡林浩特市",
  "value": "152502"
}, {
  "label": "阿巴嘎旗",
  "value": "152522"
}, {
  "label": "苏尼特左旗",
  "value": "152523"
}, {
  "label": "苏尼特右旗",
  "value": "152524"
}, {
  "label": "东乌珠穆沁旗",
  "value": "152525"
}, {
  "label": "西乌珠穆沁旗",
  "value": "152526"
}, {
  "label": "太仆寺旗",
  "value": "152527"
}, {
  "label": "镶黄旗",
  "value": "152528"
}, {
  "label": "正镶白旗",
  "value": "152529"
}, {
  "label": "正蓝旗",
  "value": "152530"
}, {
  "label": "多伦县",
  "value": "152531"
}, {
  "label": "乌拉盖管委会",
  "value": "152571"
}], [{
  "label": "阿拉善左旗",
  "value": "152921"
}, {
  "label": "阿拉善右旗",
  "value": "152922"
}, {
  "label": "额济纳旗",
  "value": "152923"
}, {
  "label": "内蒙古阿拉善经济开发区",
  "value": "152971"
}]], [[{
  "label": "和平区",
  "value": "210102"
}, {
  "label": "沈河区",
  "value": "210103"
}, {
  "label": "大东区",
  "value": "210104"
}, {
  "label": "皇姑区",
  "value": "210105"
}, {
  "label": "铁西区",
  "value": "210106"
}, {
  "label": "苏家屯区",
  "value": "210111"
}, {
  "label": "浑南区",
  "value": "210112"
}, {
  "label": "沈北新区",
  "value": "210113"
}, {
  "label": "于洪区",
  "value": "210114"
}, {
  "label": "辽中区",
  "value": "210115"
}, {
  "label": "康平县",
  "value": "210123"
}, {
  "label": "法库县",
  "value": "210124"
}, {
  "label": "新民市",
  "value": "210181"
}], [{
  "label": "中山区",
  "value": "210202"
}, {
  "label": "西岗区",
  "value": "210203"
}, {
  "label": "沙河口区",
  "value": "210204"
}, {
  "label": "甘井子区",
  "value": "210211"
}, {
  "label": "旅顺口区",
  "value": "210212"
}, {
  "label": "金州区",
  "value": "210213"
}, {
  "label": "普兰店区",
  "value": "210214"
}, {
  "label": "长海县",
  "value": "210224"
}, {
  "label": "瓦房店市",
  "value": "210281"
}, {
  "label": "庄河市",
  "value": "210283"
}], [{
  "label": "铁东区",
  "value": "210302"
}, {
  "label": "铁西区",
  "value": "210303"
}, {
  "label": "立山区",
  "value": "210304"
}, {
  "label": "千山区",
  "value": "210311"
}, {
  "label": "台安县",
  "value": "210321"
}, {
  "label": "岫岩满族自治县",
  "value": "210323"
}, {
  "label": "海城市",
  "value": "210381"
}], [{
  "label": "新抚区",
  "value": "210402"
}, {
  "label": "东洲区",
  "value": "210403"
}, {
  "label": "望花区",
  "value": "210404"
}, {
  "label": "顺城区",
  "value": "210411"
}, {
  "label": "抚顺县",
  "value": "210421"
}, {
  "label": "新宾满族自治县",
  "value": "210422"
}, {
  "label": "清原满族自治县",
  "value": "210423"
}], [{
  "label": "平山区",
  "value": "210502"
}, {
  "label": "溪湖区",
  "value": "210503"
}, {
  "label": "明山区",
  "value": "210504"
}, {
  "label": "南芬区",
  "value": "210505"
}, {
  "label": "本溪满族自治县",
  "value": "210521"
}, {
  "label": "桓仁满族自治县",
  "value": "210522"
}], [{
  "label": "元宝区",
  "value": "210602"
}, {
  "label": "振兴区",
  "value": "210603"
}, {
  "label": "振安区",
  "value": "210604"
}, {
  "label": "宽甸满族自治县",
  "value": "210624"
}, {
  "label": "东港市",
  "value": "210681"
}, {
  "label": "凤城市",
  "value": "210682"
}], [{
  "label": "古塔区",
  "value": "210702"
}, {
  "label": "凌河区",
  "value": "210703"
}, {
  "label": "太和区",
  "value": "210711"
}, {
  "label": "黑山县",
  "value": "210726"
}, {
  "label": "义县",
  "value": "210727"
}, {
  "label": "凌海市",
  "value": "210781"
}, {
  "label": "北镇市",
  "value": "210782"
}], [{
  "label": "站前区",
  "value": "210802"
}, {
  "label": "西市区",
  "value": "210803"
}, {
  "label": "鲅鱼圈区",
  "value": "210804"
}, {
  "label": "老边区",
  "value": "210811"
}, {
  "label": "盖州市",
  "value": "210881"
}, {
  "label": "大石桥市",
  "value": "210882"
}], [{
  "label": "海州区",
  "value": "210902"
}, {
  "label": "新邱区",
  "value": "210903"
}, {
  "label": "太平区",
  "value": "210904"
}, {
  "label": "清河门区",
  "value": "210905"
}, {
  "label": "细河区",
  "value": "210911"
}, {
  "label": "阜新蒙古族自治县",
  "value": "210921"
}, {
  "label": "彰武县",
  "value": "210922"
}], [{
  "label": "白塔区",
  "value": "211002"
}, {
  "label": "文圣区",
  "value": "211003"
}, {
  "label": "宏伟区",
  "value": "211004"
}, {
  "label": "弓长岭区",
  "value": "211005"
}, {
  "label": "太子河区",
  "value": "211011"
}, {
  "label": "辽阳县",
  "value": "211021"
}, {
  "label": "灯塔市",
  "value": "211081"
}], [{
  "label": "双台子区",
  "value": "211102"
}, {
  "label": "兴隆台区",
  "value": "211103"
}, {
  "label": "大洼区",
  "value": "211104"
}, {
  "label": "盘山县",
  "value": "211122"
}], [{
  "label": "银州区",
  "value": "211202"
}, {
  "label": "清河区",
  "value": "211204"
}, {
  "label": "铁岭县",
  "value": "211221"
}, {
  "label": "西丰县",
  "value": "211223"
}, {
  "label": "昌图县",
  "value": "211224"
}, {
  "label": "调兵山市",
  "value": "211281"
}, {
  "label": "开原市",
  "value": "211282"
}], [{
  "label": "双塔区",
  "value": "211302"
}, {
  "label": "龙城区",
  "value": "211303"
}, {
  "label": "朝阳县",
  "value": "211321"
}, {
  "label": "建平县",
  "value": "211322"
}, {
  "label": "喀喇沁左翼蒙古族自治县",
  "value": "211324"
}, {
  "label": "北票市",
  "value": "211381"
}, {
  "label": "凌源市",
  "value": "211382"
}], [{
  "label": "连山区",
  "value": "211402"
}, {
  "label": "龙港区",
  "value": "211403"
}, {
  "label": "南票区",
  "value": "211404"
}, {
  "label": "绥中县",
  "value": "211421"
}, {
  "label": "建昌县",
  "value": "211422"
}, {
  "label": "兴城市",
  "value": "211481"
}]], [[{
  "label": "南关区",
  "value": "220102"
}, {
  "label": "宽城区",
  "value": "220103"
}, {
  "label": "朝阳区",
  "value": "220104"
}, {
  "label": "二道区",
  "value": "220105"
}, {
  "label": "绿园区",
  "value": "220106"
}, {
  "label": "双阳区",
  "value": "220112"
}, {
  "label": "九台区",
  "value": "220113"
}, {
  "label": "农安县",
  "value": "220122"
}, {
  "label": "长春经济技术开发区",
  "value": "220171"
}, {
  "label": "长春净月高新技术产业开发区",
  "value": "220172"
}, {
  "label": "长春高新技术产业开发区",
  "value": "220173"
}, {
  "label": "长春汽车经济技术开发区",
  "value": "220174"
}, {
  "label": "榆树市",
  "value": "220182"
}, {
  "label": "德惠市",
  "value": "220183"
}], [{
  "label": "昌邑区",
  "value": "220202"
}, {
  "label": "龙潭区",
  "value": "220203"
}, {
  "label": "船营区",
  "value": "220204"
}, {
  "label": "丰满区",
  "value": "220211"
}, {
  "label": "永吉县",
  "value": "220221"
}, {
  "label": "吉林经济开发区",
  "value": "220271"
}, {
  "label": "吉林高新技术产业开发区",
  "value": "220272"
}, {
  "label": "吉林中国新加坡食品区",
  "value": "220273"
}, {
  "label": "蛟河市",
  "value": "220281"
}, {
  "label": "桦甸市",
  "value": "220282"
}, {
  "label": "舒兰市",
  "value": "220283"
}, {
  "label": "磐石市",
  "value": "220284"
}], [{
  "label": "铁西区",
  "value": "220302"
}, {
  "label": "铁东区",
  "value": "220303"
}, {
  "label": "梨树县",
  "value": "220322"
}, {
  "label": "伊通满族自治县",
  "value": "220323"
}, {
  "label": "公主岭市",
  "value": "220381"
}, {
  "label": "双辽市",
  "value": "220382"
}], [{
  "label": "龙山区",
  "value": "220402"
}, {
  "label": "西安区",
  "value": "220403"
}, {
  "label": "东丰县",
  "value": "220421"
}, {
  "label": "东辽县",
  "value": "220422"
}], [{
  "label": "东昌区",
  "value": "220502"
}, {
  "label": "二道江区",
  "value": "220503"
}, {
  "label": "通化县",
  "value": "220521"
}, {
  "label": "辉南县",
  "value": "220523"
}, {
  "label": "柳河县",
  "value": "220524"
}, {
  "label": "梅河口市",
  "value": "220581"
}, {
  "label": "集安市",
  "value": "220582"
}], [{
  "label": "浑江区",
  "value": "220602"
}, {
  "label": "江源区",
  "value": "220605"
}, {
  "label": "抚松县",
  "value": "220621"
}, {
  "label": "靖宇县",
  "value": "220622"
}, {
  "label": "长白朝鲜族自治县",
  "value": "220623"
}, {
  "label": "临江市",
  "value": "220681"
}], [{
  "label": "宁江区",
  "value": "220702"
}, {
  "label": "前郭尔罗斯蒙古族自治县",
  "value": "220721"
}, {
  "label": "长岭县",
  "value": "220722"
}, {
  "label": "乾安县",
  "value": "220723"
}, {
  "label": "吉林松原经济开发区",
  "value": "220771"
}, {
  "label": "扶余市",
  "value": "220781"
}], [{
  "label": "洮北区",
  "value": "220802"
}, {
  "label": "镇赉县",
  "value": "220821"
}, {
  "label": "通榆县",
  "value": "220822"
}, {
  "label": "吉林白城经济开发区",
  "value": "220871"
}, {
  "label": "洮南市",
  "value": "220881"
}, {
  "label": "大安市",
  "value": "220882"
}], [{
  "label": "延吉市",
  "value": "222401"
}, {
  "label": "图们市",
  "value": "222402"
}, {
  "label": "敦化市",
  "value": "222403"
}, {
  "label": "珲春市",
  "value": "222404"
}, {
  "label": "龙井市",
  "value": "222405"
}, {
  "label": "和龙市",
  "value": "222406"
}, {
  "label": "汪清县",
  "value": "222424"
}, {
  "label": "安图县",
  "value": "222426"
}]], [[{
  "label": "道里区",
  "value": "230102"
}, {
  "label": "南岗区",
  "value": "230103"
}, {
  "label": "道外区",
  "value": "230104"
}, {
  "label": "平房区",
  "value": "230108"
}, {
  "label": "松北区",
  "value": "230109"
}, {
  "label": "香坊区",
  "value": "230110"
}, {
  "label": "呼兰区",
  "value": "230111"
}, {
  "label": "阿城区",
  "value": "230112"
}, {
  "label": "双城区",
  "value": "230113"
}, {
  "label": "依兰县",
  "value": "230123"
}, {
  "label": "方正县",
  "value": "230124"
}, {
  "label": "宾县",
  "value": "230125"
}, {
  "label": "巴彦县",
  "value": "230126"
}, {
  "label": "木兰县",
  "value": "230127"
}, {
  "label": "通河县",
  "value": "230128"
}, {
  "label": "延寿县",
  "value": "230129"
}, {
  "label": "尚志市",
  "value": "230183"
}, {
  "label": "五常市",
  "value": "230184"
}], [{
  "label": "龙沙区",
  "value": "230202"
}, {
  "label": "建华区",
  "value": "230203"
}, {
  "label": "铁锋区",
  "value": "230204"
}, {
  "label": "昂昂溪区",
  "value": "230205"
}, {
  "label": "富拉尔基区",
  "value": "230206"
}, {
  "label": "碾子山区",
  "value": "230207"
}, {
  "label": "梅里斯达斡尔族区",
  "value": "230208"
}, {
  "label": "龙江县",
  "value": "230221"
}, {
  "label": "依安县",
  "value": "230223"
}, {
  "label": "泰来县",
  "value": "230224"
}, {
  "label": "甘南县",
  "value": "230225"
}, {
  "label": "富裕县",
  "value": "230227"
}, {
  "label": "克山县",
  "value": "230229"
}, {
  "label": "克东县",
  "value": "230230"
}, {
  "label": "拜泉县",
  "value": "230231"
}, {
  "label": "讷河市",
  "value": "230281"
}], [{
  "label": "鸡冠区",
  "value": "230302"
}, {
  "label": "恒山区",
  "value": "230303"
}, {
  "label": "滴道区",
  "value": "230304"
}, {
  "label": "梨树区",
  "value": "230305"
}, {
  "label": "城子河区",
  "value": "230306"
}, {
  "label": "麻山区",
  "value": "230307"
}, {
  "label": "鸡东县",
  "value": "230321"
}, {
  "label": "虎林市",
  "value": "230381"
}, {
  "label": "密山市",
  "value": "230382"
}], [{
  "label": "向阳区",
  "value": "230402"
}, {
  "label": "工农区",
  "value": "230403"
}, {
  "label": "南山区",
  "value": "230404"
}, {
  "label": "兴安区",
  "value": "230405"
}, {
  "label": "东山区",
  "value": "230406"
}, {
  "label": "兴山区",
  "value": "230407"
}, {
  "label": "萝北县",
  "value": "230421"
}, {
  "label": "绥滨县",
  "value": "230422"
}], [{
  "label": "尖山区",
  "value": "230502"
}, {
  "label": "岭东区",
  "value": "230503"
}, {
  "label": "四方台区",
  "value": "230505"
}, {
  "label": "宝山区",
  "value": "230506"
}, {
  "label": "集贤县",
  "value": "230521"
}, {
  "label": "友谊县",
  "value": "230522"
}, {
  "label": "宝清县",
  "value": "230523"
}, {
  "label": "饶河县",
  "value": "230524"
}], [{
  "label": "萨尔图区",
  "value": "230602"
}, {
  "label": "龙凤区",
  "value": "230603"
}, {
  "label": "让胡路区",
  "value": "230604"
}, {
  "label": "红岗区",
  "value": "230605"
}, {
  "label": "大同区",
  "value": "230606"
}, {
  "label": "肇州县",
  "value": "230621"
}, {
  "label": "肇源县",
  "value": "230622"
}, {
  "label": "林甸县",
  "value": "230623"
}, {
  "label": "杜尔伯特蒙古族自治县",
  "value": "230624"
}, {
  "label": "大庆高新技术产业开发区",
  "value": "230671"
}], [{
  "label": "伊春区",
  "value": "230702"
}, {
  "label": "南岔区",
  "value": "230703"
}, {
  "label": "友好区",
  "value": "230704"
}, {
  "label": "西林区",
  "value": "230705"
}, {
  "label": "翠峦区",
  "value": "230706"
}, {
  "label": "新青区",
  "value": "230707"
}, {
  "label": "美溪区",
  "value": "230708"
}, {
  "label": "金山屯区",
  "value": "230709"
}, {
  "label": "五营区",
  "value": "230710"
}, {
  "label": "乌马河区",
  "value": "230711"
}, {
  "label": "汤旺河区",
  "value": "230712"
}, {
  "label": "带岭区",
  "value": "230713"
}, {
  "label": "乌伊岭区",
  "value": "230714"
}, {
  "label": "红星区",
  "value": "230715"
}, {
  "label": "上甘岭区",
  "value": "230716"
}, {
  "label": "嘉荫县",
  "value": "230722"
}, {
  "label": "铁力市",
  "value": "230781"
}], [{
  "label": "向阳区",
  "value": "230803"
}, {
  "label": "前进区",
  "value": "230804"
}, {
  "label": "东风区",
  "value": "230805"
}, {
  "label": "郊区",
  "value": "230811"
}, {
  "label": "桦南县",
  "value": "230822"
}, {
  "label": "桦川县",
  "value": "230826"
}, {
  "label": "汤原县",
  "value": "230828"
}, {
  "label": "同江市",
  "value": "230881"
}, {
  "label": "富锦市",
  "value": "230882"
}, {
  "label": "抚远市",
  "value": "230883"
}], [{
  "label": "新兴区",
  "value": "230902"
}, {
  "label": "桃山区",
  "value": "230903"
}, {
  "label": "茄子河区",
  "value": "230904"
}, {
  "label": "勃利县",
  "value": "230921"
}], [{
  "label": "东安区",
  "value": "231002"
}, {
  "label": "阳明区",
  "value": "231003"
}, {
  "label": "爱民区",
  "value": "231004"
}, {
  "label": "西安区",
  "value": "231005"
}, {
  "label": "林口县",
  "value": "231025"
}, {
  "label": "牡丹江经济技术开发区",
  "value": "231071"
}, {
  "label": "绥芬河市",
  "value": "231081"
}, {
  "label": "海林市",
  "value": "231083"
}, {
  "label": "宁安市",
  "value": "231084"
}, {
  "label": "穆棱市",
  "value": "231085"
}, {
  "label": "东宁市",
  "value": "231086"
}], [{
  "label": "爱辉区",
  "value": "231102"
}, {
  "label": "嫩江县",
  "value": "231121"
}, {
  "label": "逊克县",
  "value": "231123"
}, {
  "label": "孙吴县",
  "value": "231124"
}, {
  "label": "北安市",
  "value": "231181"
}, {
  "label": "五大连池市",
  "value": "231182"
}], [{
  "label": "北林区",
  "value": "231202"
}, {
  "label": "望奎县",
  "value": "231221"
}, {
  "label": "兰西县",
  "value": "231222"
}, {
  "label": "青冈县",
  "value": "231223"
}, {
  "label": "庆安县",
  "value": "231224"
}, {
  "label": "明水县",
  "value": "231225"
}, {
  "label": "绥棱县",
  "value": "231226"
}, {
  "label": "安达市",
  "value": "231281"
}, {
  "label": "肇东市",
  "value": "231282"
}, {
  "label": "海伦市",
  "value": "231283"
}], [{
  "label": "加格达奇区",
  "value": "232701"
}, {
  "label": "松岭区",
  "value": "232702"
}, {
  "label": "新林区",
  "value": "232703"
}, {
  "label": "呼中区",
  "value": "232704"
}, {
  "label": "呼玛县",
  "value": "232721"
}, {
  "label": "塔河县",
  "value": "232722"
}, {
  "label": "漠河县",
  "value": "232723"
}]], [[{
  "label": "黄浦区",
  "value": "310101"
}, {
  "label": "徐汇区",
  "value": "310104"
}, {
  "label": "长宁区",
  "value": "310105"
}, {
  "label": "静安区",
  "value": "310106"
}, {
  "label": "普陀区",
  "value": "310107"
}, {
  "label": "虹口区",
  "value": "310109"
}, {
  "label": "杨浦区",
  "value": "310110"
}, {
  "label": "闵行区",
  "value": "310112"
}, {
  "label": "宝山区",
  "value": "310113"
}, {
  "label": "嘉定区",
  "value": "310114"
}, {
  "label": "浦东新区",
  "value": "310115"
}, {
  "label": "金山区",
  "value": "310116"
}, {
  "label": "松江区",
  "value": "310117"
}, {
  "label": "青浦区",
  "value": "310118"
}, {
  "label": "奉贤区",
  "value": "310120"
}, {
  "label": "崇明区",
  "value": "310151"
}]], [[{
  "label": "玄武区",
  "value": "320102"
}, {
  "label": "秦淮区",
  "value": "320104"
}, {
  "label": "建邺区",
  "value": "320105"
}, {
  "label": "鼓楼区",
  "value": "320106"
}, {
  "label": "浦口区",
  "value": "320111"
}, {
  "label": "栖霞区",
  "value": "320113"
}, {
  "label": "雨花台区",
  "value": "320114"
}, {
  "label": "江宁区",
  "value": "320115"
}, {
  "label": "六合区",
  "value": "320116"
}, {
  "label": "溧水区",
  "value": "320117"
}, {
  "label": "高淳区",
  "value": "320118"
}], [{
  "label": "锡山区",
  "value": "320205"
}, {
  "label": "惠山区",
  "value": "320206"
}, {
  "label": "滨湖区",
  "value": "320211"
}, {
  "label": "梁溪区",
  "value": "320213"
}, {
  "label": "新吴区",
  "value": "320214"
}, {
  "label": "江阴市",
  "value": "320281"
}, {
  "label": "宜兴市",
  "value": "320282"
}], [{
  "label": "鼓楼区",
  "value": "320302"
}, {
  "label": "云龙区",
  "value": "320303"
}, {
  "label": "贾汪区",
  "value": "320305"
}, {
  "label": "泉山区",
  "value": "320311"
}, {
  "label": "铜山区",
  "value": "320312"
}, {
  "label": "丰县",
  "value": "320321"
}, {
  "label": "沛县",
  "value": "320322"
}, {
  "label": "睢宁县",
  "value": "320324"
}, {
  "label": "徐州经济技术开发区",
  "value": "320371"
}, {
  "label": "新沂市",
  "value": "320381"
}, {
  "label": "邳州市",
  "value": "320382"
}], [{
  "label": "天宁区",
  "value": "320402"
}, {
  "label": "钟楼区",
  "value": "320404"
}, {
  "label": "新北区",
  "value": "320411"
}, {
  "label": "武进区",
  "value": "320412"
}, {
  "label": "金坛区",
  "value": "320413"
}, {
  "label": "溧阳市",
  "value": "320481"
}], [{
  "label": "虎丘区",
  "value": "320505"
}, {
  "label": "吴中区",
  "value": "320506"
}, {
  "label": "相城区",
  "value": "320507"
}, {
  "label": "姑苏区",
  "value": "320508"
}, {
  "label": "吴江区",
  "value": "320509"
}, {
  "label": "苏州工业园区",
  "value": "320571"
}, {
  "label": "常熟市",
  "value": "320581"
}, {
  "label": "张家港市",
  "value": "320582"
}, {
  "label": "昆山市",
  "value": "320583"
}, {
  "label": "太仓市",
  "value": "320585"
}], [{
  "label": "崇川区",
  "value": "320602"
}, {
  "label": "港闸区",
  "value": "320611"
}, {
  "label": "通州区",
  "value": "320612"
}, {
  "label": "海安县",
  "value": "320621"
}, {
  "label": "如东县",
  "value": "320623"
}, {
  "label": "南通经济技术开发区",
  "value": "320671"
}, {
  "label": "启东市",
  "value": "320681"
}, {
  "label": "如皋市",
  "value": "320682"
}, {
  "label": "海门市",
  "value": "320684"
}], [{
  "label": "连云区",
  "value": "320703"
}, {
  "label": "海州区",
  "value": "320706"
}, {
  "label": "赣榆区",
  "value": "320707"
}, {
  "label": "东海县",
  "value": "320722"
}, {
  "label": "灌云县",
  "value": "320723"
}, {
  "label": "灌南县",
  "value": "320724"
}, {
  "label": "连云港经济技术开发区",
  "value": "320771"
}, {
  "label": "连云港高新技术产业开发区",
  "value": "320772"
}], [{
  "label": "淮安区",
  "value": "320803"
}, {
  "label": "淮阴区",
  "value": "320804"
}, {
  "label": "清江浦区",
  "value": "320812"
}, {
  "label": "洪泽区",
  "value": "320813"
}, {
  "label": "涟水县",
  "value": "320826"
}, {
  "label": "盱眙县",
  "value": "320830"
}, {
  "label": "金湖县",
  "value": "320831"
}, {
  "label": "淮安经济技术开发区",
  "value": "320871"
}], [{
  "label": "亭湖区",
  "value": "320902"
}, {
  "label": "盐都区",
  "value": "320903"
}, {
  "label": "大丰区",
  "value": "320904"
}, {
  "label": "响水县",
  "value": "320921"
}, {
  "label": "滨海县",
  "value": "320922"
}, {
  "label": "阜宁县",
  "value": "320923"
}, {
  "label": "射阳县",
  "value": "320924"
}, {
  "label": "建湖县",
  "value": "320925"
}, {
  "label": "盐城经济技术开发区",
  "value": "320971"
}, {
  "label": "东台市",
  "value": "320981"
}], [{
  "label": "广陵区",
  "value": "321002"
}, {
  "label": "邗江区",
  "value": "321003"
}, {
  "label": "江都区",
  "value": "321012"
}, {
  "label": "宝应县",
  "value": "321023"
}, {
  "label": "扬州经济技术开发区",
  "value": "321071"
}, {
  "label": "仪征市",
  "value": "321081"
}, {
  "label": "高邮市",
  "value": "321084"
}], [{
  "label": "京口区",
  "value": "321102"
}, {
  "label": "润州区",
  "value": "321111"
}, {
  "label": "丹徒区",
  "value": "321112"
}, {
  "label": "镇江新区",
  "value": "321171"
}, {
  "label": "丹阳市",
  "value": "321181"
}, {
  "label": "扬中市",
  "value": "321182"
}, {
  "label": "句容市",
  "value": "321183"
}], [{
  "label": "海陵区",
  "value": "321202"
}, {
  "label": "高港区",
  "value": "321203"
}, {
  "label": "姜堰区",
  "value": "321204"
}, {
  "label": "泰州医药高新技术产业开发区",
  "value": "321271"
}, {
  "label": "兴化市",
  "value": "321281"
}, {
  "label": "靖江市",
  "value": "321282"
}, {
  "label": "泰兴市",
  "value": "321283"
}], [{
  "label": "宿城区",
  "value": "321302"
}, {
  "label": "宿豫区",
  "value": "321311"
}, {
  "label": "沭阳县",
  "value": "321322"
}, {
  "label": "泗阳县",
  "value": "321323"
}, {
  "label": "泗洪县",
  "value": "321324"
}, {
  "label": "宿迁经济技术开发区",
  "value": "321371"
}]], [[{
  "label": "上城区",
  "value": "330102"
}, {
  "label": "下城区",
  "value": "330103"
}, {
  "label": "江干区",
  "value": "330104"
}, {
  "label": "拱墅区",
  "value": "330105"
}, {
  "label": "西湖区",
  "value": "330106"
}, {
  "label": "滨江区",
  "value": "330108"
}, {
  "label": "萧山区",
  "value": "330109"
}, {
  "label": "余杭区",
  "value": "330110"
}, {
  "label": "富阳区",
  "value": "330111"
}, {
  "label": "临安区",
  "value": "330112"
}, {
  "label": "桐庐县",
  "value": "330122"
}, {
  "label": "淳安县",
  "value": "330127"
}, {
  "label": "建德市",
  "value": "330182"
}], [{
  "label": "海曙区",
  "value": "330203"
}, {
  "label": "江北区",
  "value": "330205"
}, {
  "label": "北仑区",
  "value": "330206"
}, {
  "label": "镇海区",
  "value": "330211"
}, {
  "label": "鄞州区",
  "value": "330212"
}, {
  "label": "奉化区",
  "value": "330213"
}, {
  "label": "象山县",
  "value": "330225"
}, {
  "label": "宁海县",
  "value": "330226"
}, {
  "label": "余姚市",
  "value": "330281"
}, {
  "label": "慈溪市",
  "value": "330282"
}], [{
  "label": "鹿城区",
  "value": "330302"
}, {
  "label": "龙湾区",
  "value": "330303"
}, {
  "label": "瓯海区",
  "value": "330304"
}, {
  "label": "洞头区",
  "value": "330305"
}, {
  "label": "永嘉县",
  "value": "330324"
}, {
  "label": "平阳县",
  "value": "330326"
}, {
  "label": "苍南县",
  "value": "330327"
}, {
  "label": "文成县",
  "value": "330328"
}, {
  "label": "泰顺县",
  "value": "330329"
}, {
  "label": "温州经济技术开发区",
  "value": "330371"
}, {
  "label": "瑞安市",
  "value": "330381"
}, {
  "label": "乐清市",
  "value": "330382"
}], [{
  "label": "南湖区",
  "value": "330402"
}, {
  "label": "秀洲区",
  "value": "330411"
}, {
  "label": "嘉善县",
  "value": "330421"
}, {
  "label": "海盐县",
  "value": "330424"
}, {
  "label": "海宁市",
  "value": "330481"
}, {
  "label": "平湖市",
  "value": "330482"
}, {
  "label": "桐乡市",
  "value": "330483"
}], [{
  "label": "吴兴区",
  "value": "330502"
}, {
  "label": "南浔区",
  "value": "330503"
}, {
  "label": "德清县",
  "value": "330521"
}, {
  "label": "长兴县",
  "value": "330522"
}, {
  "label": "安吉县",
  "value": "330523"
}], [{
  "label": "越城区",
  "value": "330602"
}, {
  "label": "柯桥区",
  "value": "330603"
}, {
  "label": "上虞区",
  "value": "330604"
}, {
  "label": "新昌县",
  "value": "330624"
}, {
  "label": "诸暨市",
  "value": "330681"
}, {
  "label": "嵊州市",
  "value": "330683"
}], [{
  "label": "婺城区",
  "value": "330702"
}, {
  "label": "金东区",
  "value": "330703"
}, {
  "label": "武义县",
  "value": "330723"
}, {
  "label": "浦江县",
  "value": "330726"
}, {
  "label": "磐安县",
  "value": "330727"
}, {
  "label": "兰溪市",
  "value": "330781"
}, {
  "label": "义乌市",
  "value": "330782"
}, {
  "label": "东阳市",
  "value": "330783"
}, {
  "label": "永康市",
  "value": "330784"
}], [{
  "label": "柯城区",
  "value": "330802"
}, {
  "label": "衢江区",
  "value": "330803"
}, {
  "label": "常山县",
  "value": "330822"
}, {
  "label": "开化县",
  "value": "330824"
}, {
  "label": "龙游县",
  "value": "330825"
}, {
  "label": "江山市",
  "value": "330881"
}], [{
  "label": "定海区",
  "value": "330902"
}, {
  "label": "普陀区",
  "value": "330903"
}, {
  "label": "岱山县",
  "value": "330921"
}, {
  "label": "嵊泗县",
  "value": "330922"
}], [{
  "label": "椒江区",
  "value": "331002"
}, {
  "label": "黄岩区",
  "value": "331003"
}, {
  "label": "路桥区",
  "value": "331004"
}, {
  "label": "三门县",
  "value": "331022"
}, {
  "label": "天台县",
  "value": "331023"
}, {
  "label": "仙居县",
  "value": "331024"
}, {
  "label": "温岭市",
  "value": "331081"
}, {
  "label": "临海市",
  "value": "331082"
}, {
  "label": "玉环市",
  "value": "331083"
}], [{
  "label": "莲都区",
  "value": "331102"
}, {
  "label": "青田县",
  "value": "331121"
}, {
  "label": "缙云县",
  "value": "331122"
}, {
  "label": "遂昌县",
  "value": "331123"
}, {
  "label": "松阳县",
  "value": "331124"
}, {
  "label": "云和县",
  "value": "331125"
}, {
  "label": "庆元县",
  "value": "331126"
}, {
  "label": "景宁畲族自治县",
  "value": "331127"
}, {
  "label": "龙泉市",
  "value": "331181"
}]], [[{
  "label": "瑶海区",
  "value": "340102"
}, {
  "label": "庐阳区",
  "value": "340103"
}, {
  "label": "蜀山区",
  "value": "340104"
}, {
  "label": "包河区",
  "value": "340111"
}, {
  "label": "长丰县",
  "value": "340121"
}, {
  "label": "肥东县",
  "value": "340122"
}, {
  "label": "肥西县",
  "value": "340123"
}, {
  "label": "庐江县",
  "value": "340124"
}, {
  "label": "合肥高新技术产业开发区",
  "value": "340171"
}, {
  "label": "合肥经济技术开发区",
  "value": "340172"
}, {
  "label": "合肥新站高新技术产业开发区",
  "value": "340173"
}, {
  "label": "巢湖市",
  "value": "340181"
}], [{
  "label": "镜湖区",
  "value": "340202"
}, {
  "label": "弋江区",
  "value": "340203"
}, {
  "label": "鸠江区",
  "value": "340207"
}, {
  "label": "三山区",
  "value": "340208"
}, {
  "label": "芜湖县",
  "value": "340221"
}, {
  "label": "繁昌县",
  "value": "340222"
}, {
  "label": "南陵县",
  "value": "340223"
}, {
  "label": "无为县",
  "value": "340225"
}, {
  "label": "芜湖经济技术开发区",
  "value": "340271"
}, {
  "label": "安徽芜湖长江大桥经济开发区",
  "value": "340272"
}], [{
  "label": "龙子湖区",
  "value": "340302"
}, {
  "label": "蚌山区",
  "value": "340303"
}, {
  "label": "禹会区",
  "value": "340304"
}, {
  "label": "淮上区",
  "value": "340311"
}, {
  "label": "怀远县",
  "value": "340321"
}, {
  "label": "五河县",
  "value": "340322"
}, {
  "label": "固镇县",
  "value": "340323"
}, {
  "label": "蚌埠市高新技术开发区",
  "value": "340371"
}, {
  "label": "蚌埠市经济开发区",
  "value": "340372"
}], [{
  "label": "大通区",
  "value": "340402"
}, {
  "label": "田家庵区",
  "value": "340403"
}, {
  "label": "谢家集区",
  "value": "340404"
}, {
  "label": "八公山区",
  "value": "340405"
}, {
  "label": "潘集区",
  "value": "340406"
}, {
  "label": "凤台县",
  "value": "340421"
}, {
  "label": "寿县",
  "value": "340422"
}], [{
  "label": "花山区",
  "value": "340503"
}, {
  "label": "雨山区",
  "value": "340504"
}, {
  "label": "博望区",
  "value": "340506"
}, {
  "label": "当涂县",
  "value": "340521"
}, {
  "label": "含山县",
  "value": "340522"
}, {
  "label": "和县",
  "value": "340523"
}], [{
  "label": "杜集区",
  "value": "340602"
}, {
  "label": "相山区",
  "value": "340603"
}, {
  "label": "烈山区",
  "value": "340604"
}, {
  "label": "濉溪县",
  "value": "340621"
}], [{
  "label": "铜官区",
  "value": "340705"
}, {
  "label": "义安区",
  "value": "340706"
}, {
  "label": "郊区",
  "value": "340711"
}, {
  "label": "枞阳县",
  "value": "340722"
}], [{
  "label": "迎江区",
  "value": "340802"
}, {
  "label": "大观区",
  "value": "340803"
}, {
  "label": "宜秀区",
  "value": "340811"
}, {
  "label": "怀宁县",
  "value": "340822"
}, {
  "label": "潜山县",
  "value": "340824"
}, {
  "label": "太湖县",
  "value": "340825"
}, {
  "label": "宿松县",
  "value": "340826"
}, {
  "label": "望江县",
  "value": "340827"
}, {
  "label": "岳西县",
  "value": "340828"
}, {
  "label": "安徽安庆经济开发区",
  "value": "340871"
}, {
  "label": "桐城市",
  "value": "340881"
}], [{
  "label": "屯溪区",
  "value": "341002"
}, {
  "label": "黄山区",
  "value": "341003"
}, {
  "label": "徽州区",
  "value": "341004"
}, {
  "label": "歙县",
  "value": "341021"
}, {
  "label": "休宁县",
  "value": "341022"
}, {
  "label": "黟县",
  "value": "341023"
}, {
  "label": "祁门县",
  "value": "341024"
}], [{
  "label": "琅琊区",
  "value": "341102"
}, {
  "label": "南谯区",
  "value": "341103"
}, {
  "label": "来安县",
  "value": "341122"
}, {
  "label": "全椒县",
  "value": "341124"
}, {
  "label": "定远县",
  "value": "341125"
}, {
  "label": "凤阳县",
  "value": "341126"
}, {
  "label": "苏滁现代产业园",
  "value": "341171"
}, {
  "label": "滁州经济技术开发区",
  "value": "341172"
}, {
  "label": "天长市",
  "value": "341181"
}, {
  "label": "明光市",
  "value": "341182"
}], [{
  "label": "颍州区",
  "value": "341202"
}, {
  "label": "颍东区",
  "value": "341203"
}, {
  "label": "颍泉区",
  "value": "341204"
}, {
  "label": "临泉县",
  "value": "341221"
}, {
  "label": "太和县",
  "value": "341222"
}, {
  "label": "阜南县",
  "value": "341225"
}, {
  "label": "颍上县",
  "value": "341226"
}, {
  "label": "阜阳合肥现代产业园区",
  "value": "341271"
}, {
  "label": "阜阳经济技术开发区",
  "value": "341272"
}, {
  "label": "界首市",
  "value": "341282"
}], [{
  "label": "埇桥区",
  "value": "341302"
}, {
  "label": "砀山县",
  "value": "341321"
}, {
  "label": "萧县",
  "value": "341322"
}, {
  "label": "灵璧县",
  "value": "341323"
}, {
  "label": "泗县",
  "value": "341324"
}, {
  "label": "宿州马鞍山现代产业园区",
  "value": "341371"
}, {
  "label": "宿州经济技术开发区",
  "value": "341372"
}], [{
  "label": "金安区",
  "value": "341502"
}, {
  "label": "裕安区",
  "value": "341503"
}, {
  "label": "叶集区",
  "value": "341504"
}, {
  "label": "霍邱县",
  "value": "341522"
}, {
  "label": "舒城县",
  "value": "341523"
}, {
  "label": "金寨县",
  "value": "341524"
}, {
  "label": "霍山县",
  "value": "341525"
}], [{
  "label": "谯城区",
  "value": "341602"
}, {
  "label": "涡阳县",
  "value": "341621"
}, {
  "label": "蒙城县",
  "value": "341622"
}, {
  "label": "利辛县",
  "value": "341623"
}], [{
  "label": "贵池区",
  "value": "341702"
}, {
  "label": "东至县",
  "value": "341721"
}, {
  "label": "石台县",
  "value": "341722"
}, {
  "label": "青阳县",
  "value": "341723"
}], [{
  "label": "宣州区",
  "value": "341802"
}, {
  "label": "郎溪县",
  "value": "341821"
}, {
  "label": "广德县",
  "value": "341822"
}, {
  "label": "泾县",
  "value": "341823"
}, {
  "label": "绩溪县",
  "value": "341824"
}, {
  "label": "旌德县",
  "value": "341825"
}, {
  "label": "宣城市经济开发区",
  "value": "341871"
}, {
  "label": "宁国市",
  "value": "341881"
}]], [[{
  "label": "鼓楼区",
  "value": "350102"
}, {
  "label": "台江区",
  "value": "350103"
}, {
  "label": "仓山区",
  "value": "350104"
}, {
  "label": "马尾区",
  "value": "350105"
}, {
  "label": "晋安区",
  "value": "350111"
}, {
  "label": "闽侯县",
  "value": "350121"
}, {
  "label": "连江县",
  "value": "350122"
}, {
  "label": "罗源县",
  "value": "350123"
}, {
  "label": "闽清县",
  "value": "350124"
}, {
  "label": "永泰县",
  "value": "350125"
}, {
  "label": "平潭县",
  "value": "350128"
}, {
  "label": "福清市",
  "value": "350181"
}, {
  "label": "长乐市",
  "value": "350182"
}], [{
  "label": "思明区",
  "value": "350203"
}, {
  "label": "海沧区",
  "value": "350205"
}, {
  "label": "湖里区",
  "value": "350206"
}, {
  "label": "集美区",
  "value": "350211"
}, {
  "label": "同安区",
  "value": "350212"
}, {
  "label": "翔安区",
  "value": "350213"
}], [{
  "label": "城厢区",
  "value": "350302"
}, {
  "label": "涵江区",
  "value": "350303"
}, {
  "label": "荔城区",
  "value": "350304"
}, {
  "label": "秀屿区",
  "value": "350305"
}, {
  "label": "仙游县",
  "value": "350322"
}], [{
  "label": "梅列区",
  "value": "350402"
}, {
  "label": "三元区",
  "value": "350403"
}, {
  "label": "明溪县",
  "value": "350421"
}, {
  "label": "清流县",
  "value": "350423"
}, {
  "label": "宁化县",
  "value": "350424"
}, {
  "label": "大田县",
  "value": "350425"
}, {
  "label": "尤溪县",
  "value": "350426"
}, {
  "label": "沙县",
  "value": "350427"
}, {
  "label": "将乐县",
  "value": "350428"
}, {
  "label": "泰宁县",
  "value": "350429"
}, {
  "label": "建宁县",
  "value": "350430"
}, {
  "label": "永安市",
  "value": "350481"
}], [{
  "label": "鲤城区",
  "value": "350502"
}, {
  "label": "丰泽区",
  "value": "350503"
}, {
  "label": "洛江区",
  "value": "350504"
}, {
  "label": "泉港区",
  "value": "350505"
}, {
  "label": "惠安县",
  "value": "350521"
}, {
  "label": "安溪县",
  "value": "350524"
}, {
  "label": "永春县",
  "value": "350525"
}, {
  "label": "德化县",
  "value": "350526"
}, {
  "label": "金门县",
  "value": "350527"
}, {
  "label": "石狮市",
  "value": "350581"
}, {
  "label": "晋江市",
  "value": "350582"
}, {
  "label": "南安市",
  "value": "350583"
}], [{
  "label": "芗城区",
  "value": "350602"
}, {
  "label": "龙文区",
  "value": "350603"
}, {
  "label": "云霄县",
  "value": "350622"
}, {
  "label": "漳浦县",
  "value": "350623"
}, {
  "label": "诏安县",
  "value": "350624"
}, {
  "label": "长泰县",
  "value": "350625"
}, {
  "label": "东山县",
  "value": "350626"
}, {
  "label": "南靖县",
  "value": "350627"
}, {
  "label": "平和县",
  "value": "350628"
}, {
  "label": "华安县",
  "value": "350629"
}, {
  "label": "龙海市",
  "value": "350681"
}], [{
  "label": "延平区",
  "value": "350702"
}, {
  "label": "建阳区",
  "value": "350703"
}, {
  "label": "顺昌县",
  "value": "350721"
}, {
  "label": "浦城县",
  "value": "350722"
}, {
  "label": "光泽县",
  "value": "350723"
}, {
  "label": "松溪县",
  "value": "350724"
}, {
  "label": "政和县",
  "value": "350725"
}, {
  "label": "邵武市",
  "value": "350781"
}, {
  "label": "武夷山市",
  "value": "350782"
}, {
  "label": "建瓯市",
  "value": "350783"
}], [{
  "label": "新罗区",
  "value": "350802"
}, {
  "label": "永定区",
  "value": "350803"
}, {
  "label": "长汀县",
  "value": "350821"
}, {
  "label": "上杭县",
  "value": "350823"
}, {
  "label": "武平县",
  "value": "350824"
}, {
  "label": "连城县",
  "value": "350825"
}, {
  "label": "漳平市",
  "value": "350881"
}], [{
  "label": "蕉城区",
  "value": "350902"
}, {
  "label": "霞浦县",
  "value": "350921"
}, {
  "label": "古田县",
  "value": "350922"
}, {
  "label": "屏南县",
  "value": "350923"
}, {
  "label": "寿宁县",
  "value": "350924"
}, {
  "label": "周宁县",
  "value": "350925"
}, {
  "label": "柘荣县",
  "value": "350926"
}, {
  "label": "福安市",
  "value": "350981"
}, {
  "label": "福鼎市",
  "value": "350982"
}]], [[{
  "label": "东湖区",
  "value": "360102"
}, {
  "label": "西湖区",
  "value": "360103"
}, {
  "label": "青云谱区",
  "value": "360104"
}, {
  "label": "湾里区",
  "value": "360105"
}, {
  "label": "青山湖区",
  "value": "360111"
}, {
  "label": "新建区",
  "value": "360112"
}, {
  "label": "南昌县",
  "value": "360121"
}, {
  "label": "安义县",
  "value": "360123"
}, {
  "label": "进贤县",
  "value": "360124"
}], [{
  "label": "昌江区",
  "value": "360202"
}, {
  "label": "珠山区",
  "value": "360203"
}, {
  "label": "浮梁县",
  "value": "360222"
}, {
  "label": "乐平市",
  "value": "360281"
}], [{
  "label": "安源区",
  "value": "360302"
}, {
  "label": "湘东区",
  "value": "360313"
}, {
  "label": "莲花县",
  "value": "360321"
}, {
  "label": "上栗县",
  "value": "360322"
}, {
  "label": "芦溪县",
  "value": "360323"
}], [{
  "label": "濂溪区",
  "value": "360402"
}, {
  "label": "浔阳区",
  "value": "360403"
}, {
  "label": "柴桑区",
  "value": "360404"
}, {
  "label": "武宁县",
  "value": "360423"
}, {
  "label": "修水县",
  "value": "360424"
}, {
  "label": "永修县",
  "value": "360425"
}, {
  "label": "德安县",
  "value": "360426"
}, {
  "label": "都昌县",
  "value": "360428"
}, {
  "label": "湖口县",
  "value": "360429"
}, {
  "label": "彭泽县",
  "value": "360430"
}, {
  "label": "瑞昌市",
  "value": "360481"
}, {
  "label": "共青城市",
  "value": "360482"
}, {
  "label": "庐山市",
  "value": "360483"
}], [{
  "label": "渝水区",
  "value": "360502"
}, {
  "label": "分宜县",
  "value": "360521"
}], [{
  "label": "月湖区",
  "value": "360602"
}, {
  "label": "余江县",
  "value": "360622"
}, {
  "label": "贵溪市",
  "value": "360681"
}], [{
  "label": "章贡区",
  "value": "360702"
}, {
  "label": "南康区",
  "value": "360703"
}, {
  "label": "赣县区",
  "value": "360704"
}, {
  "label": "信丰县",
  "value": "360722"
}, {
  "label": "大余县",
  "value": "360723"
}, {
  "label": "上犹县",
  "value": "360724"
}, {
  "label": "崇义县",
  "value": "360725"
}, {
  "label": "安远县",
  "value": "360726"
}, {
  "label": "龙南县",
  "value": "360727"
}, {
  "label": "定南县",
  "value": "360728"
}, {
  "label": "全南县",
  "value": "360729"
}, {
  "label": "宁都县",
  "value": "360730"
}, {
  "label": "于都县",
  "value": "360731"
}, {
  "label": "兴国县",
  "value": "360732"
}, {
  "label": "会昌县",
  "value": "360733"
}, {
  "label": "寻乌县",
  "value": "360734"
}, {
  "label": "石城县",
  "value": "360735"
}, {
  "label": "瑞金市",
  "value": "360781"
}], [{
  "label": "吉州区",
  "value": "360802"
}, {
  "label": "青原区",
  "value": "360803"
}, {
  "label": "吉安县",
  "value": "360821"
}, {
  "label": "吉水县",
  "value": "360822"
}, {
  "label": "峡江县",
  "value": "360823"
}, {
  "label": "新干县",
  "value": "360824"
}, {
  "label": "永丰县",
  "value": "360825"
}, {
  "label": "泰和县",
  "value": "360826"
}, {
  "label": "遂川县",
  "value": "360827"
}, {
  "label": "万安县",
  "value": "360828"
}, {
  "label": "安福县",
  "value": "360829"
}, {
  "label": "永新县",
  "value": "360830"
}, {
  "label": "井冈山市",
  "value": "360881"
}], [{
  "label": "袁州区",
  "value": "360902"
}, {
  "label": "奉新县",
  "value": "360921"
}, {
  "label": "万载县",
  "value": "360922"
}, {
  "label": "上高县",
  "value": "360923"
}, {
  "label": "宜丰县",
  "value": "360924"
}, {
  "label": "靖安县",
  "value": "360925"
}, {
  "label": "铜鼓县",
  "value": "360926"
}, {
  "label": "丰城市",
  "value": "360981"
}, {
  "label": "樟树市",
  "value": "360982"
}, {
  "label": "高安市",
  "value": "360983"
}], [{
  "label": "临川区",
  "value": "361002"
}, {
  "label": "东乡区",
  "value": "361003"
}, {
  "label": "南城县",
  "value": "361021"
}, {
  "label": "黎川县",
  "value": "361022"
}, {
  "label": "南丰县",
  "value": "361023"
}, {
  "label": "崇仁县",
  "value": "361024"
}, {
  "label": "乐安县",
  "value": "361025"
}, {
  "label": "宜黄县",
  "value": "361026"
}, {
  "label": "金溪县",
  "value": "361027"
}, {
  "label": "资溪县",
  "value": "361028"
}, {
  "label": "广昌县",
  "value": "361030"
}], [{
  "label": "信州区",
  "value": "361102"
}, {
  "label": "广丰区",
  "value": "361103"
}, {
  "label": "上饶县",
  "value": "361121"
}, {
  "label": "玉山县",
  "value": "361123"
}, {
  "label": "铅山县",
  "value": "361124"
}, {
  "label": "横峰县",
  "value": "361125"
}, {
  "label": "弋阳县",
  "value": "361126"
}, {
  "label": "余干县",
  "value": "361127"
}, {
  "label": "鄱阳县",
  "value": "361128"
}, {
  "label": "万年县",
  "value": "361129"
}, {
  "label": "婺源县",
  "value": "361130"
}, {
  "label": "德兴市",
  "value": "361181"
}]], [[{
  "label": "历下区",
  "value": "370102"
}, {
  "label": "市中区",
  "value": "370103"
}, {
  "label": "槐荫区",
  "value": "370104"
}, {
  "label": "天桥区",
  "value": "370105"
}, {
  "label": "历城区",
  "value": "370112"
}, {
  "label": "长清区",
  "value": "370113"
}, {
  "label": "章丘区",
  "value": "370114"
}, {
  "label": "平阴县",
  "value": "370124"
}, {
  "label": "济阳县",
  "value": "370125"
}, {
  "label": "商河县",
  "value": "370126"
}, {
  "label": "济南高新技术产业开发区",
  "value": "370171"
}], [{
  "label": "市南区",
  "value": "370202"
}, {
  "label": "市北区",
  "value": "370203"
}, {
  "label": "黄岛区",
  "value": "370211"
}, {
  "label": "崂山区",
  "value": "370212"
}, {
  "label": "李沧区",
  "value": "370213"
}, {
  "label": "城阳区",
  "value": "370214"
}, {
  "label": "即墨区",
  "value": "370215"
}, {
  "label": "青岛高新技术产业开发区",
  "value": "370271"
}, {
  "label": "胶州市",
  "value": "370281"
}, {
  "label": "平度市",
  "value": "370283"
}, {
  "label": "莱西市",
  "value": "370285"
}], [{
  "label": "淄川区",
  "value": "370302"
}, {
  "label": "张店区",
  "value": "370303"
}, {
  "label": "博山区",
  "value": "370304"
}, {
  "label": "临淄区",
  "value": "370305"
}, {
  "label": "周村区",
  "value": "370306"
}, {
  "label": "桓台县",
  "value": "370321"
}, {
  "label": "高青县",
  "value": "370322"
}, {
  "label": "沂源县",
  "value": "370323"
}], [{
  "label": "市中区",
  "value": "370402"
}, {
  "label": "薛城区",
  "value": "370403"
}, {
  "label": "峄城区",
  "value": "370404"
}, {
  "label": "台儿庄区",
  "value": "370405"
}, {
  "label": "山亭区",
  "value": "370406"
}, {
  "label": "滕州市",
  "value": "370481"
}], [{
  "label": "东营区",
  "value": "370502"
}, {
  "label": "河口区",
  "value": "370503"
}, {
  "label": "垦利区",
  "value": "370505"
}, {
  "label": "利津县",
  "value": "370522"
}, {
  "label": "广饶县",
  "value": "370523"
}, {
  "label": "东营经济技术开发区",
  "value": "370571"
}, {
  "label": "东营港经济开发区",
  "value": "370572"
}], [{
  "label": "芝罘区",
  "value": "370602"
}, {
  "label": "福山区",
  "value": "370611"
}, {
  "label": "牟平区",
  "value": "370612"
}, {
  "label": "莱山区",
  "value": "370613"
}, {
  "label": "长岛县",
  "value": "370634"
}, {
  "label": "烟台高新技术产业开发区",
  "value": "370671"
}, {
  "label": "烟台经济技术开发区",
  "value": "370672"
}, {
  "label": "龙口市",
  "value": "370681"
}, {
  "label": "莱阳市",
  "value": "370682"
}, {
  "label": "莱州市",
  "value": "370683"
}, {
  "label": "蓬莱市",
  "value": "370684"
}, {
  "label": "招远市",
  "value": "370685"
}, {
  "label": "栖霞市",
  "value": "370686"
}, {
  "label": "海阳市",
  "value": "370687"
}], [{
  "label": "潍城区",
  "value": "370702"
}, {
  "label": "寒亭区",
  "value": "370703"
}, {
  "label": "坊子区",
  "value": "370704"
}, {
  "label": "奎文区",
  "value": "370705"
}, {
  "label": "临朐县",
  "value": "370724"
}, {
  "label": "昌乐县",
  "value": "370725"
}, {
  "label": "潍坊滨海经济技术开发区",
  "value": "370772"
}, {
  "label": "青州市",
  "value": "370781"
}, {
  "label": "诸城市",
  "value": "370782"
}, {
  "label": "寿光市",
  "value": "370783"
}, {
  "label": "安丘市",
  "value": "370784"
}, {
  "label": "高密市",
  "value": "370785"
}, {
  "label": "昌邑市",
  "value": "370786"
}], [{
  "label": "任城区",
  "value": "370811"
}, {
  "label": "兖州区",
  "value": "370812"
}, {
  "label": "微山县",
  "value": "370826"
}, {
  "label": "鱼台县",
  "value": "370827"
}, {
  "label": "金乡县",
  "value": "370828"
}, {
  "label": "嘉祥县",
  "value": "370829"
}, {
  "label": "汶上县",
  "value": "370830"
}, {
  "label": "泗水县",
  "value": "370831"
}, {
  "label": "梁山县",
  "value": "370832"
}, {
  "label": "济宁高新技术产业开发区",
  "value": "370871"
}, {
  "label": "曲阜市",
  "value": "370881"
}, {
  "label": "邹城市",
  "value": "370883"
}], [{
  "label": "泰山区",
  "value": "370902"
}, {
  "label": "岱岳区",
  "value": "370911"
}, {
  "label": "宁阳县",
  "value": "370921"
}, {
  "label": "东平县",
  "value": "370923"
}, {
  "label": "新泰市",
  "value": "370982"
}, {
  "label": "肥城市",
  "value": "370983"
}], [{
  "label": "环翠区",
  "value": "371002"
}, {
  "label": "文登区",
  "value": "371003"
}, {
  "label": "威海火炬高技术产业开发区",
  "value": "371071"
}, {
  "label": "威海经济技术开发区",
  "value": "371072"
}, {
  "label": "威海临港经济技术开发区",
  "value": "371073"
}, {
  "label": "荣成市",
  "value": "371082"
}, {
  "label": "乳山市",
  "value": "371083"
}], [{
  "label": "东港区",
  "value": "371102"
}, {
  "label": "岚山区",
  "value": "371103"
}, {
  "label": "五莲县",
  "value": "371121"
}, {
  "label": "莒县",
  "value": "371122"
}, {
  "label": "日照经济技术开发区",
  "value": "371171"
}, {
  "label": "日照国际海洋城",
  "value": "371172"
}], [{
  "label": "莱城区",
  "value": "371202"
}, {
  "label": "钢城区",
  "value": "371203"
}], [{
  "label": "兰山区",
  "value": "371302"
}, {
  "label": "罗庄区",
  "value": "371311"
}, {
  "label": "河东区",
  "value": "371312"
}, {
  "label": "沂南县",
  "value": "371321"
}, {
  "label": "郯城县",
  "value": "371322"
}, {
  "label": "沂水县",
  "value": "371323"
}, {
  "label": "兰陵县",
  "value": "371324"
}, {
  "label": "费县",
  "value": "371325"
}, {
  "label": "平邑县",
  "value": "371326"
}, {
  "label": "莒南县",
  "value": "371327"
}, {
  "label": "蒙阴县",
  "value": "371328"
}, {
  "label": "临沭县",
  "value": "371329"
}, {
  "label": "临沂高新技术产业开发区",
  "value": "371371"
}, {
  "label": "临沂经济技术开发区",
  "value": "371372"
}, {
  "label": "临沂临港经济开发区",
  "value": "371373"
}], [{
  "label": "德城区",
  "value": "371402"
}, {
  "label": "陵城区",
  "value": "371403"
}, {
  "label": "宁津县",
  "value": "371422"
}, {
  "label": "庆云县",
  "value": "371423"
}, {
  "label": "临邑县",
  "value": "371424"
}, {
  "label": "齐河县",
  "value": "371425"
}, {
  "label": "平原县",
  "value": "371426"
}, {
  "label": "夏津县",
  "value": "371427"
}, {
  "label": "武城县",
  "value": "371428"
}, {
  "label": "德州经济技术开发区",
  "value": "371471"
}, {
  "label": "德州运河经济开发区",
  "value": "371472"
}, {
  "label": "乐陵市",
  "value": "371481"
}, {
  "label": "禹城市",
  "value": "371482"
}], [{
  "label": "东昌府区",
  "value": "371502"
}, {
  "label": "阳谷县",
  "value": "371521"
}, {
  "label": "莘县",
  "value": "371522"
}, {
  "label": "茌平县",
  "value": "371523"
}, {
  "label": "东阿县",
  "value": "371524"
}, {
  "label": "冠县",
  "value": "371525"
}, {
  "label": "高唐县",
  "value": "371526"
}, {
  "label": "临清市",
  "value": "371581"
}], [{
  "label": "滨城区",
  "value": "371602"
}, {
  "label": "沾化区",
  "value": "371603"
}, {
  "label": "惠民县",
  "value": "371621"
}, {
  "label": "阳信县",
  "value": "371622"
}, {
  "label": "无棣县",
  "value": "371623"
}, {
  "label": "博兴县",
  "value": "371625"
}, {
  "label": "邹平县",
  "value": "371626"
}], [{
  "label": "牡丹区",
  "value": "371702"
}, {
  "label": "定陶区",
  "value": "371703"
}, {
  "label": "曹县",
  "value": "371721"
}, {
  "label": "单县",
  "value": "371722"
}, {
  "label": "成武县",
  "value": "371723"
}, {
  "label": "巨野县",
  "value": "371724"
}, {
  "label": "郓城县",
  "value": "371725"
}, {
  "label": "鄄城县",
  "value": "371726"
}, {
  "label": "东明县",
  "value": "371728"
}, {
  "label": "菏泽经济技术开发区",
  "value": "371771"
}, {
  "label": "菏泽高新技术开发区",
  "value": "371772"
}]], [[{
  "label": "中原区",
  "value": "410102"
}, {
  "label": "二七区",
  "value": "410103"
}, {
  "label": "管城回族区",
  "value": "410104"
}, {
  "label": "金水区",
  "value": "410105"
}, {
  "label": "上街区",
  "value": "410106"
}, {
  "label": "惠济区",
  "value": "410108"
}, {
  "label": "中牟县",
  "value": "410122"
}, {
  "label": "郑州经济技术开发区",
  "value": "410171"
}, {
  "label": "郑州高新技术产业开发区",
  "value": "410172"
}, {
  "label": "郑州航空港经济综合实验区",
  "value": "410173"
}, {
  "label": "巩义市",
  "value": "410181"
}, {
  "label": "荥阳市",
  "value": "410182"
}, {
  "label": "新密市",
  "value": "410183"
}, {
  "label": "新郑市",
  "value": "410184"
}, {
  "label": "登封市",
  "value": "410185"
}], [{
  "label": "龙亭区",
  "value": "410202"
}, {
  "label": "顺河回族区",
  "value": "410203"
}, {
  "label": "鼓楼区",
  "value": "410204"
}, {
  "label": "禹王台区",
  "value": "410205"
}, {
  "label": "祥符区",
  "value": "410212"
}, {
  "label": "杞县",
  "value": "410221"
}, {
  "label": "通许县",
  "value": "410222"
}, {
  "label": "尉氏县",
  "value": "410223"
}, {
  "label": "兰考县",
  "value": "410225"
}], [{
  "label": "老城区",
  "value": "410302"
}, {
  "label": "西工区",
  "value": "410303"
}, {
  "label": "瀍河回族区",
  "value": "410304"
}, {
  "label": "涧西区",
  "value": "410305"
}, {
  "label": "吉利区",
  "value": "410306"
}, {
  "label": "洛龙区",
  "value": "410311"
}, {
  "label": "孟津县",
  "value": "410322"
}, {
  "label": "新安县",
  "value": "410323"
}, {
  "label": "栾川县",
  "value": "410324"
}, {
  "label": "嵩县",
  "value": "410325"
}, {
  "label": "汝阳县",
  "value": "410326"
}, {
  "label": "宜阳县",
  "value": "410327"
}, {
  "label": "洛宁县",
  "value": "410328"
}, {
  "label": "伊川县",
  "value": "410329"
}, {
  "label": "洛阳高新技术产业开发区",
  "value": "410371"
}, {
  "label": "偃师市",
  "value": "410381"
}], [{
  "label": "新华区",
  "value": "410402"
}, {
  "label": "卫东区",
  "value": "410403"
}, {
  "label": "石龙区",
  "value": "410404"
}, {
  "label": "湛河区",
  "value": "410411"
}, {
  "label": "宝丰县",
  "value": "410421"
}, {
  "label": "叶县",
  "value": "410422"
}, {
  "label": "鲁山县",
  "value": "410423"
}, {
  "label": "郏县",
  "value": "410425"
}, {
  "label": "平顶山高新技术产业开发区",
  "value": "410471"
}, {
  "label": "平顶山市新城区",
  "value": "410472"
}, {
  "label": "舞钢市",
  "value": "410481"
}, {
  "label": "汝州市",
  "value": "410482"
}], [{
  "label": "文峰区",
  "value": "410502"
}, {
  "label": "北关区",
  "value": "410503"
}, {
  "label": "殷都区",
  "value": "410505"
}, {
  "label": "龙安区",
  "value": "410506"
}, {
  "label": "安阳县",
  "value": "410522"
}, {
  "label": "汤阴县",
  "value": "410523"
}, {
  "label": "滑县",
  "value": "410526"
}, {
  "label": "内黄县",
  "value": "410527"
}, {
  "label": "安阳高新技术产业开发区",
  "value": "410571"
}, {
  "label": "林州市",
  "value": "410581"
}], [{
  "label": "鹤山区",
  "value": "410602"
}, {
  "label": "山城区",
  "value": "410603"
}, {
  "label": "淇滨区",
  "value": "410611"
}, {
  "label": "浚县",
  "value": "410621"
}, {
  "label": "淇县",
  "value": "410622"
}, {
  "label": "鹤壁经济技术开发区",
  "value": "410671"
}], [{
  "label": "红旗区",
  "value": "410702"
}, {
  "label": "卫滨区",
  "value": "410703"
}, {
  "label": "凤泉区",
  "value": "410704"
}, {
  "label": "牧野区",
  "value": "410711"
}, {
  "label": "新乡县",
  "value": "410721"
}, {
  "label": "获嘉县",
  "value": "410724"
}, {
  "label": "原阳县",
  "value": "410725"
}, {
  "label": "延津县",
  "value": "410726"
}, {
  "label": "封丘县",
  "value": "410727"
}, {
  "label": "长垣县",
  "value": "410728"
}, {
  "label": "新乡高新技术产业开发区",
  "value": "410771"
}, {
  "label": "新乡经济技术开发区",
  "value": "410772"
}, {
  "label": "新乡市平原城乡一体化示范区",
  "value": "410773"
}, {
  "label": "卫辉市",
  "value": "410781"
}, {
  "label": "辉县市",
  "value": "410782"
}], [{
  "label": "解放区",
  "value": "410802"
}, {
  "label": "中站区",
  "value": "410803"
}, {
  "label": "马村区",
  "value": "410804"
}, {
  "label": "山阳区",
  "value": "410811"
}, {
  "label": "修武县",
  "value": "410821"
}, {
  "label": "博爱县",
  "value": "410822"
}, {
  "label": "武陟县",
  "value": "410823"
}, {
  "label": "温县",
  "value": "410825"
}, {
  "label": "焦作城乡一体化示范区",
  "value": "410871"
}, {
  "label": "沁阳市",
  "value": "410882"
}, {
  "label": "孟州市",
  "value": "410883"
}], [{
  "label": "华龙区",
  "value": "410902"
}, {
  "label": "清丰县",
  "value": "410922"
}, {
  "label": "南乐县",
  "value": "410923"
}, {
  "label": "范县",
  "value": "410926"
}, {
  "label": "台前县",
  "value": "410927"
}, {
  "label": "濮阳县",
  "value": "410928"
}, {
  "label": "河南濮阳工业园区",
  "value": "410971"
}, {
  "label": "濮阳经济技术开发区",
  "value": "410972"
}], [{
  "label": "魏都区",
  "value": "411002"
}, {
  "label": "建安区",
  "value": "411003"
}, {
  "label": "鄢陵县",
  "value": "411024"
}, {
  "label": "襄城县",
  "value": "411025"
}, {
  "label": "许昌经济技术开发区",
  "value": "411071"
}, {
  "label": "禹州市",
  "value": "411081"
}, {
  "label": "长葛市",
  "value": "411082"
}], [{
  "label": "源汇区",
  "value": "411102"
}, {
  "label": "郾城区",
  "value": "411103"
}, {
  "label": "召陵区",
  "value": "411104"
}, {
  "label": "舞阳县",
  "value": "411121"
}, {
  "label": "临颍县",
  "value": "411122"
}, {
  "label": "漯河经济技术开发区",
  "value": "411171"
}], [{
  "label": "湖滨区",
  "value": "411202"
}, {
  "label": "陕州区",
  "value": "411203"
}, {
  "label": "渑池县",
  "value": "411221"
}, {
  "label": "卢氏县",
  "value": "411224"
}, {
  "label": "河南三门峡经济开发区",
  "value": "411271"
}, {
  "label": "义马市",
  "value": "411281"
}, {
  "label": "灵宝市",
  "value": "411282"
}], [{
  "label": "宛城区",
  "value": "411302"
}, {
  "label": "卧龙区",
  "value": "411303"
}, {
  "label": "南召县",
  "value": "411321"
}, {
  "label": "方城县",
  "value": "411322"
}, {
  "label": "西峡县",
  "value": "411323"
}, {
  "label": "镇平县",
  "value": "411324"
}, {
  "label": "内乡县",
  "value": "411325"
}, {
  "label": "淅川县",
  "value": "411326"
}, {
  "label": "社旗县",
  "value": "411327"
}, {
  "label": "唐河县",
  "value": "411328"
}, {
  "label": "新野县",
  "value": "411329"
}, {
  "label": "桐柏县",
  "value": "411330"
}, {
  "label": "南阳高新技术产业开发区",
  "value": "411371"
}, {
  "label": "南阳市城乡一体化示范区",
  "value": "411372"
}, {
  "label": "邓州市",
  "value": "411381"
}], [{
  "label": "梁园区",
  "value": "411402"
}, {
  "label": "睢阳区",
  "value": "411403"
}, {
  "label": "民权县",
  "value": "411421"
}, {
  "label": "睢县",
  "value": "411422"
}, {
  "label": "宁陵县",
  "value": "411423"
}, {
  "label": "柘城县",
  "value": "411424"
}, {
  "label": "虞城县",
  "value": "411425"
}, {
  "label": "夏邑县",
  "value": "411426"
}, {
  "label": "豫东综合物流产业聚集区",
  "value": "411471"
}, {
  "label": "河南商丘经济开发区",
  "value": "411472"
}, {
  "label": "永城市",
  "value": "411481"
}], [{
  "label": "浉河区",
  "value": "411502"
}, {
  "label": "平桥区",
  "value": "411503"
}, {
  "label": "罗山县",
  "value": "411521"
}, {
  "label": "光山县",
  "value": "411522"
}, {
  "label": "新县",
  "value": "411523"
}, {
  "label": "商城县",
  "value": "411524"
}, {
  "label": "固始县",
  "value": "411525"
}, {
  "label": "潢川县",
  "value": "411526"
}, {
  "label": "淮滨县",
  "value": "411527"
}, {
  "label": "息县",
  "value": "411528"
}, {
  "label": "信阳高新技术产业开发区",
  "value": "411571"
}], [{
  "label": "川汇区",
  "value": "411602"
}, {
  "label": "扶沟县",
  "value": "411621"
}, {
  "label": "西华县",
  "value": "411622"
}, {
  "label": "商水县",
  "value": "411623"
}, {
  "label": "沈丘县",
  "value": "411624"
}, {
  "label": "郸城县",
  "value": "411625"
}, {
  "label": "淮阳县",
  "value": "411626"
}, {
  "label": "太康县",
  "value": "411627"
}, {
  "label": "鹿邑县",
  "value": "411628"
}, {
  "label": "河南周口经济开发区",
  "value": "411671"
}, {
  "label": "项城市",
  "value": "411681"
}], [{
  "label": "驿城区",
  "value": "411702"
}, {
  "label": "西平县",
  "value": "411721"
}, {
  "label": "上蔡县",
  "value": "411722"
}, {
  "label": "平舆县",
  "value": "411723"
}, {
  "label": "正阳县",
  "value": "411724"
}, {
  "label": "确山县",
  "value": "411725"
}, {
  "label": "泌阳县",
  "value": "411726"
}, {
  "label": "汝南县",
  "value": "411727"
}, {
  "label": "遂平县",
  "value": "411728"
}, {
  "label": "新蔡县",
  "value": "411729"
}, {
  "label": "河南驻马店经济开发区",
  "value": "411771"
}], [{
  "label": "济源市",
  "value": "419001"
}]], [[{
  "label": "江岸区",
  "value": "420102"
}, {
  "label": "江汉区",
  "value": "420103"
}, {
  "label": "硚口区",
  "value": "420104"
}, {
  "label": "汉阳区",
  "value": "420105"
}, {
  "label": "武昌区",
  "value": "420106"
}, {
  "label": "青山区",
  "value": "420107"
}, {
  "label": "洪山区",
  "value": "420111"
}, {
  "label": "东西湖区",
  "value": "420112"
}, {
  "label": "汉南区",
  "value": "420113"
}, {
  "label": "蔡甸区",
  "value": "420114"
}, {
  "label": "江夏区",
  "value": "420115"
}, {
  "label": "黄陂区",
  "value": "420116"
}, {
  "label": "新洲区",
  "value": "420117"
}], [{
  "label": "黄石港区",
  "value": "420202"
}, {
  "label": "西塞山区",
  "value": "420203"
}, {
  "label": "下陆区",
  "value": "420204"
}, {
  "label": "铁山区",
  "value": "420205"
}, {
  "label": "阳新县",
  "value": "420222"
}, {
  "label": "大冶市",
  "value": "420281"
}], [{
  "label": "茅箭区",
  "value": "420302"
}, {
  "label": "张湾区",
  "value": "420303"
}, {
  "label": "郧阳区",
  "value": "420304"
}, {
  "label": "郧西县",
  "value": "420322"
}, {
  "label": "竹山县",
  "value": "420323"
}, {
  "label": "竹溪县",
  "value": "420324"
}, {
  "label": "房县",
  "value": "420325"
}, {
  "label": "丹江口市",
  "value": "420381"
}], [{
  "label": "西陵区",
  "value": "420502"
}, {
  "label": "伍家岗区",
  "value": "420503"
}, {
  "label": "点军区",
  "value": "420504"
}, {
  "label": "猇亭区",
  "value": "420505"
}, {
  "label": "夷陵区",
  "value": "420506"
}, {
  "label": "远安县",
  "value": "420525"
}, {
  "label": "兴山县",
  "value": "420526"
}, {
  "label": "秭归县",
  "value": "420527"
}, {
  "label": "长阳土家族自治县",
  "value": "420528"
}, {
  "label": "五峰土家族自治县",
  "value": "420529"
}, {
  "label": "宜都市",
  "value": "420581"
}, {
  "label": "当阳市",
  "value": "420582"
}, {
  "label": "枝江市",
  "value": "420583"
}], [{
  "label": "襄城区",
  "value": "420602"
}, {
  "label": "樊城区",
  "value": "420606"
}, {
  "label": "襄州区",
  "value": "420607"
}, {
  "label": "南漳县",
  "value": "420624"
}, {
  "label": "谷城县",
  "value": "420625"
}, {
  "label": "保康县",
  "value": "420626"
}, {
  "label": "老河口市",
  "value": "420682"
}, {
  "label": "枣阳市",
  "value": "420683"
}, {
  "label": "宜城市",
  "value": "420684"
}], [{
  "label": "梁子湖区",
  "value": "420702"
}, {
  "label": "华容区",
  "value": "420703"
}, {
  "label": "鄂城区",
  "value": "420704"
}], [{
  "label": "东宝区",
  "value": "420802"
}, {
  "label": "掇刀区",
  "value": "420804"
}, {
  "label": "京山县",
  "value": "420821"
}, {
  "label": "沙洋县",
  "value": "420822"
}, {
  "label": "钟祥市",
  "value": "420881"
}], [{
  "label": "孝南区",
  "value": "420902"
}, {
  "label": "孝昌县",
  "value": "420921"
}, {
  "label": "大悟县",
  "value": "420922"
}, {
  "label": "云梦县",
  "value": "420923"
}, {
  "label": "应城市",
  "value": "420981"
}, {
  "label": "安陆市",
  "value": "420982"
}, {
  "label": "汉川市",
  "value": "420984"
}], [{
  "label": "沙市区",
  "value": "421002"
}, {
  "label": "荆州区",
  "value": "421003"
}, {
  "label": "公安县",
  "value": "421022"
}, {
  "label": "监利县",
  "value": "421023"
}, {
  "label": "江陵县",
  "value": "421024"
}, {
  "label": "荆州经济技术开发区",
  "value": "421071"
}, {
  "label": "石首市",
  "value": "421081"
}, {
  "label": "洪湖市",
  "value": "421083"
}, {
  "label": "松滋市",
  "value": "421087"
}], [{
  "label": "黄州区",
  "value": "421102"
}, {
  "label": "团风县",
  "value": "421121"
}, {
  "label": "红安县",
  "value": "421122"
}, {
  "label": "罗田县",
  "value": "421123"
}, {
  "label": "英山县",
  "value": "421124"
}, {
  "label": "浠水县",
  "value": "421125"
}, {
  "label": "蕲春县",
  "value": "421126"
}, {
  "label": "黄梅县",
  "value": "421127"
}, {
  "label": "龙感湖管理区",
  "value": "421171"
}, {
  "label": "麻城市",
  "value": "421181"
}, {
  "label": "武穴市",
  "value": "421182"
}], [{
  "label": "咸安区",
  "value": "421202"
}, {
  "label": "嘉鱼县",
  "value": "421221"
}, {
  "label": "通城县",
  "value": "421222"
}, {
  "label": "崇阳县",
  "value": "421223"
}, {
  "label": "通山县",
  "value": "421224"
}, {
  "label": "赤壁市",
  "value": "421281"
}], [{
  "label": "曾都区",
  "value": "421303"
}, {
  "label": "随县",
  "value": "421321"
}, {
  "label": "广水市",
  "value": "421381"
}], [{
  "label": "恩施市",
  "value": "422801"
}, {
  "label": "利川市",
  "value": "422802"
}, {
  "label": "建始县",
  "value": "422822"
}, {
  "label": "巴东县",
  "value": "422823"
}, {
  "label": "宣恩县",
  "value": "422825"
}, {
  "label": "咸丰县",
  "value": "422826"
}, {
  "label": "来凤县",
  "value": "422827"
}, {
  "label": "鹤峰县",
  "value": "422828"
}], [{
  "label": "仙桃市",
  "value": "429004"
}, {
  "label": "潜江市",
  "value": "429005"
}, {
  "label": "天门市",
  "value": "429006"
}, {
  "label": "神农架林区",
  "value": "429021"
}]], [[{
  "label": "芙蓉区",
  "value": "430102"
}, {
  "label": "天心区",
  "value": "430103"
}, {
  "label": "岳麓区",
  "value": "430104"
}, {
  "label": "开福区",
  "value": "430105"
}, {
  "label": "雨花区",
  "value": "430111"
}, {
  "label": "望城区",
  "value": "430112"
}, {
  "label": "长沙县",
  "value": "430121"
}, {
  "label": "浏阳市",
  "value": "430181"
}, {
  "label": "宁乡市",
  "value": "430182"
}], [{
  "label": "荷塘区",
  "value": "430202"
}, {
  "label": "芦淞区",
  "value": "430203"
}, {
  "label": "石峰区",
  "value": "430204"
}, {
  "label": "天元区",
  "value": "430211"
}, {
  "label": "株洲县",
  "value": "430221"
}, {
  "label": "攸县",
  "value": "430223"
}, {
  "label": "茶陵县",
  "value": "430224"
}, {
  "label": "炎陵县",
  "value": "430225"
}, {
  "label": "云龙示范区",
  "value": "430271"
}, {
  "label": "醴陵市",
  "value": "430281"
}], [{
  "label": "雨湖区",
  "value": "430302"
}, {
  "label": "岳塘区",
  "value": "430304"
}, {
  "label": "湘潭县",
  "value": "430321"
}, {
  "label": "湖南湘潭高新技术产业园区",
  "value": "430371"
}, {
  "label": "湘潭昭山示范区",
  "value": "430372"
}, {
  "label": "湘潭九华示范区",
  "value": "430373"
}, {
  "label": "湘乡市",
  "value": "430381"
}, {
  "label": "韶山市",
  "value": "430382"
}], [{
  "label": "珠晖区",
  "value": "430405"
}, {
  "label": "雁峰区",
  "value": "430406"
}, {
  "label": "石鼓区",
  "value": "430407"
}, {
  "label": "蒸湘区",
  "value": "430408"
}, {
  "label": "南岳区",
  "value": "430412"
}, {
  "label": "衡阳县",
  "value": "430421"
}, {
  "label": "衡南县",
  "value": "430422"
}, {
  "label": "衡山县",
  "value": "430423"
}, {
  "label": "衡东县",
  "value": "430424"
}, {
  "label": "祁东县",
  "value": "430426"
}, {
  "label": "衡阳综合保税区",
  "value": "430471"
}, {
  "label": "湖南衡阳高新技术产业园区",
  "value": "430472"
}, {
  "label": "湖南衡阳松木经济开发区",
  "value": "430473"
}, {
  "label": "耒阳市",
  "value": "430481"
}, {
  "label": "常宁市",
  "value": "430482"
}], [{
  "label": "双清区",
  "value": "430502"
}, {
  "label": "大祥区",
  "value": "430503"
}, {
  "label": "北塔区",
  "value": "430511"
}, {
  "label": "邵东县",
  "value": "430521"
}, {
  "label": "新邵县",
  "value": "430522"
}, {
  "label": "邵阳县",
  "value": "430523"
}, {
  "label": "隆回县",
  "value": "430524"
}, {
  "label": "洞口县",
  "value": "430525"
}, {
  "label": "绥宁县",
  "value": "430527"
}, {
  "label": "新宁县",
  "value": "430528"
}, {
  "label": "城步苗族自治县",
  "value": "430529"
}, {
  "label": "武冈市",
  "value": "430581"
}], [{
  "label": "岳阳楼区",
  "value": "430602"
}, {
  "label": "云溪区",
  "value": "430603"
}, {
  "label": "君山区",
  "value": "430611"
}, {
  "label": "岳阳县",
  "value": "430621"
}, {
  "label": "华容县",
  "value": "430623"
}, {
  "label": "湘阴县",
  "value": "430624"
}, {
  "label": "平江县",
  "value": "430626"
}, {
  "label": "岳阳市屈原管理区",
  "value": "430671"
}, {
  "label": "汨罗市",
  "value": "430681"
}, {
  "label": "临湘市",
  "value": "430682"
}], [{
  "label": "武陵区",
  "value": "430702"
}, {
  "label": "鼎城区",
  "value": "430703"
}, {
  "label": "安乡县",
  "value": "430721"
}, {
  "label": "汉寿县",
  "value": "430722"
}, {
  "label": "澧县",
  "value": "430723"
}, {
  "label": "临澧县",
  "value": "430724"
}, {
  "label": "桃源县",
  "value": "430725"
}, {
  "label": "石门县",
  "value": "430726"
}, {
  "label": "常德市西洞庭管理区",
  "value": "430771"
}, {
  "label": "津市市",
  "value": "430781"
}], [{
  "label": "永定区",
  "value": "430802"
}, {
  "label": "武陵源区",
  "value": "430811"
}, {
  "label": "慈利县",
  "value": "430821"
}, {
  "label": "桑植县",
  "value": "430822"
}], [{
  "label": "资阳区",
  "value": "430902"
}, {
  "label": "赫山区",
  "value": "430903"
}, {
  "label": "南县",
  "value": "430921"
}, {
  "label": "桃江县",
  "value": "430922"
}, {
  "label": "安化县",
  "value": "430923"
}, {
  "label": "益阳市大通湖管理区",
  "value": "430971"
}, {
  "label": "湖南益阳高新技术产业园区",
  "value": "430972"
}, {
  "label": "沅江市",
  "value": "430981"
}], [{
  "label": "北湖区",
  "value": "431002"
}, {
  "label": "苏仙区",
  "value": "431003"
}, {
  "label": "桂阳县",
  "value": "431021"
}, {
  "label": "宜章县",
  "value": "431022"
}, {
  "label": "永兴县",
  "value": "431023"
}, {
  "label": "嘉禾县",
  "value": "431024"
}, {
  "label": "临武县",
  "value": "431025"
}, {
  "label": "汝城县",
  "value": "431026"
}, {
  "label": "桂东县",
  "value": "431027"
}, {
  "label": "安仁县",
  "value": "431028"
}, {
  "label": "资兴市",
  "value": "431081"
}], [{
  "label": "零陵区",
  "value": "431102"
}, {
  "label": "冷水滩区",
  "value": "431103"
}, {
  "label": "祁阳县",
  "value": "431121"
}, {
  "label": "东安县",
  "value": "431122"
}, {
  "label": "双牌县",
  "value": "431123"
}, {
  "label": "道县",
  "value": "431124"
}, {
  "label": "江永县",
  "value": "431125"
}, {
  "label": "宁远县",
  "value": "431126"
}, {
  "label": "蓝山县",
  "value": "431127"
}, {
  "label": "新田县",
  "value": "431128"
}, {
  "label": "江华瑶族自治县",
  "value": "431129"
}, {
  "label": "永州经济技术开发区",
  "value": "431171"
}, {
  "label": "永州市金洞管理区",
  "value": "431172"
}, {
  "label": "永州市回龙圩管理区",
  "value": "431173"
}], [{
  "label": "鹤城区",
  "value": "431202"
}, {
  "label": "中方县",
  "value": "431221"
}, {
  "label": "沅陵县",
  "value": "431222"
}, {
  "label": "辰溪县",
  "value": "431223"
}, {
  "label": "溆浦县",
  "value": "431224"
}, {
  "label": "会同县",
  "value": "431225"
}, {
  "label": "麻阳苗族自治县",
  "value": "431226"
}, {
  "label": "新晃侗族自治县",
  "value": "431227"
}, {
  "label": "芷江侗族自治县",
  "value": "431228"
}, {
  "label": "靖州苗族侗族自治县",
  "value": "431229"
}, {
  "label": "通道侗族自治县",
  "value": "431230"
}, {
  "label": "怀化市洪江管理区",
  "value": "431271"
}, {
  "label": "洪江市",
  "value": "431281"
}], [{
  "label": "娄星区",
  "value": "431302"
}, {
  "label": "双峰县",
  "value": "431321"
}, {
  "label": "新化县",
  "value": "431322"
}, {
  "label": "冷水江市",
  "value": "431381"
}, {
  "label": "涟源市",
  "value": "431382"
}], [{
  "label": "吉首市",
  "value": "433101"
}, {
  "label": "泸溪县",
  "value": "433122"
}, {
  "label": "凤凰县",
  "value": "433123"
}, {
  "label": "花垣县",
  "value": "433124"
}, {
  "label": "保靖县",
  "value": "433125"
}, {
  "label": "古丈县",
  "value": "433126"
}, {
  "label": "永顺县",
  "value": "433127"
}, {
  "label": "龙山县",
  "value": "433130"
}, {
  "label": "湖南吉首经济开发区",
  "value": "433172"
}, {
  "label": "湖南永顺经济开发区",
  "value": "433173"
}]], [[{
  "label": "荔湾区",
  "value": "440103"
}, {
  "label": "越秀区",
  "value": "440104"
}, {
  "label": "海珠区",
  "value": "440105"
}, {
  "label": "天河区",
  "value": "440106"
}, {
  "label": "白云区",
  "value": "440111"
}, {
  "label": "黄埔区",
  "value": "440112"
}, {
  "label": "番禺区",
  "value": "440113"
}, {
  "label": "花都区",
  "value": "440114"
}, {
  "label": "南沙区",
  "value": "440115"
}, {
  "label": "从化区",
  "value": "440117"
}, {
  "label": "增城区",
  "value": "440118"
}], [{
  "label": "武江区",
  "value": "440203"
}, {
  "label": "浈江区",
  "value": "440204"
}, {
  "label": "曲江区",
  "value": "440205"
}, {
  "label": "始兴县",
  "value": "440222"
}, {
  "label": "仁化县",
  "value": "440224"
}, {
  "label": "翁源县",
  "value": "440229"
}, {
  "label": "乳源瑶族自治县",
  "value": "440232"
}, {
  "label": "新丰县",
  "value": "440233"
}, {
  "label": "乐昌市",
  "value": "440281"
}, {
  "label": "南雄市",
  "value": "440282"
}], [{
  "label": "罗湖区",
  "value": "440303"
}, {
  "label": "福田区",
  "value": "440304"
}, {
  "label": "南山区",
  "value": "440305"
}, {
  "label": "宝安区",
  "value": "440306"
}, {
  "label": "龙岗区",
  "value": "440307"
}, {
  "label": "盐田区",
  "value": "440308"
}, {
  "label": "龙华区",
  "value": "440309"
}, {
  "label": "坪山区",
  "value": "440310"
}], [{
  "label": "香洲区",
  "value": "440402"
}, {
  "label": "斗门区",
  "value": "440403"
}, {
  "label": "金湾区",
  "value": "440404"
}], [{
  "label": "龙湖区",
  "value": "440507"
}, {
  "label": "金平区",
  "value": "440511"
}, {
  "label": "濠江区",
  "value": "440512"
}, {
  "label": "潮阳区",
  "value": "440513"
}, {
  "label": "潮南区",
  "value": "440514"
}, {
  "label": "澄海区",
  "value": "440515"
}, {
  "label": "南澳县",
  "value": "440523"
}], [{
  "label": "禅城区",
  "value": "440604"
}, {
  "label": "南海区",
  "value": "440605"
}, {
  "label": "顺德区",
  "value": "440606"
}, {
  "label": "三水区",
  "value": "440607"
}, {
  "label": "高明区",
  "value": "440608"
}], [{
  "label": "蓬江区",
  "value": "440703"
}, {
  "label": "江海区",
  "value": "440704"
}, {
  "label": "新会区",
  "value": "440705"
}, {
  "label": "台山市",
  "value": "440781"
}, {
  "label": "开平市",
  "value": "440783"
}, {
  "label": "鹤山市",
  "value": "440784"
}, {
  "label": "恩平市",
  "value": "440785"
}], [{
  "label": "赤坎区",
  "value": "440802"
}, {
  "label": "霞山区",
  "value": "440803"
}, {
  "label": "坡头区",
  "value": "440804"
}, {
  "label": "麻章区",
  "value": "440811"
}, {
  "label": "遂溪县",
  "value": "440823"
}, {
  "label": "徐闻县",
  "value": "440825"
}, {
  "label": "廉江市",
  "value": "440881"
}, {
  "label": "雷州市",
  "value": "440882"
}, {
  "label": "吴川市",
  "value": "440883"
}], [{
  "label": "茂南区",
  "value": "440902"
}, {
  "label": "电白区",
  "value": "440904"
}, {
  "label": "高州市",
  "value": "440981"
}, {
  "label": "化州市",
  "value": "440982"
}, {
  "label": "信宜市",
  "value": "440983"
}], [{
  "label": "端州区",
  "value": "441202"
}, {
  "label": "鼎湖区",
  "value": "441203"
}, {
  "label": "高要区",
  "value": "441204"
}, {
  "label": "广宁县",
  "value": "441223"
}, {
  "label": "怀集县",
  "value": "441224"
}, {
  "label": "封开县",
  "value": "441225"
}, {
  "label": "德庆县",
  "value": "441226"
}, {
  "label": "四会市",
  "value": "441284"
}], [{
  "label": "惠城区",
  "value": "441302"
}, {
  "label": "惠阳区",
  "value": "441303"
}, {
  "label": "博罗县",
  "value": "441322"
}, {
  "label": "惠东县",
  "value": "441323"
}, {
  "label": "龙门县",
  "value": "441324"
}], [{
  "label": "梅江区",
  "value": "441402"
}, {
  "label": "梅县区",
  "value": "441403"
}, {
  "label": "大埔县",
  "value": "441422"
}, {
  "label": "丰顺县",
  "value": "441423"
}, {
  "label": "五华县",
  "value": "441424"
}, {
  "label": "平远县",
  "value": "441426"
}, {
  "label": "蕉岭县",
  "value": "441427"
}, {
  "label": "兴宁市",
  "value": "441481"
}], [{
  "label": "城区",
  "value": "441502"
}, {
  "label": "海丰县",
  "value": "441521"
}, {
  "label": "陆河县",
  "value": "441523"
}, {
  "label": "陆丰市",
  "value": "441581"
}], [{
  "label": "源城区",
  "value": "441602"
}, {
  "label": "紫金县",
  "value": "441621"
}, {
  "label": "龙川县",
  "value": "441622"
}, {
  "label": "连平县",
  "value": "441623"
}, {
  "label": "和平县",
  "value": "441624"
}, {
  "label": "东源县",
  "value": "441625"
}], [{
  "label": "江城区",
  "value": "441702"
}, {
  "label": "阳东区",
  "value": "441704"
}, {
  "label": "阳西县",
  "value": "441721"
}, {
  "label": "阳春市",
  "value": "441781"
}], [{
  "label": "清城区",
  "value": "441802"
}, {
  "label": "清新区",
  "value": "441803"
}, {
  "label": "佛冈县",
  "value": "441821"
}, {
  "label": "阳山县",
  "value": "441823"
}, {
  "label": "连山壮族瑶族自治县",
  "value": "441825"
}, {
  "label": "连南瑶族自治县",
  "value": "441826"
}, {
  "label": "英德市",
  "value": "441881"
}, {
  "label": "连州市",
  "value": "441882"
}], [{
  "label": "东莞市",
  "value": "441900"
}], [{
  "label": "中山市",
  "value": "442000"
}], [{
  "label": "湘桥区",
  "value": "445102"
}, {
  "label": "潮安区",
  "value": "445103"
}, {
  "label": "饶平县",
  "value": "445122"
}], [{
  "label": "榕城区",
  "value": "445202"
}, {
  "label": "揭东区",
  "value": "445203"
}, {
  "label": "揭西县",
  "value": "445222"
}, {
  "label": "惠来县",
  "value": "445224"
}, {
  "label": "普宁市",
  "value": "445281"
}], [{
  "label": "云城区",
  "value": "445302"
}, {
  "label": "云安区",
  "value": "445303"
}, {
  "label": "新兴县",
  "value": "445321"
}, {
  "label": "郁南县",
  "value": "445322"
}, {
  "label": "罗定市",
  "value": "445381"
}]], [[{
  "label": "兴宁区",
  "value": "450102"
}, {
  "label": "青秀区",
  "value": "450103"
}, {
  "label": "江南区",
  "value": "450105"
}, {
  "label": "西乡塘区",
  "value": "450107"
}, {
  "label": "良庆区",
  "value": "450108"
}, {
  "label": "邕宁区",
  "value": "450109"
}, {
  "label": "武鸣区",
  "value": "450110"
}, {
  "label": "隆安县",
  "value": "450123"
}, {
  "label": "马山县",
  "value": "450124"
}, {
  "label": "上林县",
  "value": "450125"
}, {
  "label": "宾阳县",
  "value": "450126"
}, {
  "label": "横县",
  "value": "450127"
}], [{
  "label": "城中区",
  "value": "450202"
}, {
  "label": "鱼峰区",
  "value": "450203"
}, {
  "label": "柳南区",
  "value": "450204"
}, {
  "label": "柳北区",
  "value": "450205"
}, {
  "label": "柳江区",
  "value": "450206"
}, {
  "label": "柳城县",
  "value": "450222"
}, {
  "label": "鹿寨县",
  "value": "450223"
}, {
  "label": "融安县",
  "value": "450224"
}, {
  "label": "融水苗族自治县",
  "value": "450225"
}, {
  "label": "三江侗族自治县",
  "value": "450226"
}], [{
  "label": "秀峰区",
  "value": "450302"
}, {
  "label": "叠彩区",
  "value": "450303"
}, {
  "label": "象山区",
  "value": "450304"
}, {
  "label": "七星区",
  "value": "450305"
}, {
  "label": "雁山区",
  "value": "450311"
}, {
  "label": "临桂区",
  "value": "450312"
}, {
  "label": "阳朔县",
  "value": "450321"
}, {
  "label": "灵川县",
  "value": "450323"
}, {
  "label": "全州县",
  "value": "450324"
}, {
  "label": "兴安县",
  "value": "450325"
}, {
  "label": "永福县",
  "value": "450326"
}, {
  "label": "灌阳县",
  "value": "450327"
}, {
  "label": "龙胜各族自治县",
  "value": "450328"
}, {
  "label": "资源县",
  "value": "450329"
}, {
  "label": "平乐县",
  "value": "450330"
}, {
  "label": "荔浦县",
  "value": "450331"
}, {
  "label": "恭城瑶族自治县",
  "value": "450332"
}], [{
  "label": "万秀区",
  "value": "450403"
}, {
  "label": "长洲区",
  "value": "450405"
}, {
  "label": "龙圩区",
  "value": "450406"
}, {
  "label": "苍梧县",
  "value": "450421"
}, {
  "label": "藤县",
  "value": "450422"
}, {
  "label": "蒙山县",
  "value": "450423"
}, {
  "label": "岑溪市",
  "value": "450481"
}], [{
  "label": "海城区",
  "value": "450502"
}, {
  "label": "银海区",
  "value": "450503"
}, {
  "label": "铁山港区",
  "value": "450512"
}, {
  "label": "合浦县",
  "value": "450521"
}], [{
  "label": "港口区",
  "value": "450602"
}, {
  "label": "防城区",
  "value": "450603"
}, {
  "label": "上思县",
  "value": "450621"
}, {
  "label": "东兴市",
  "value": "450681"
}], [{
  "label": "钦南区",
  "value": "450702"
}, {
  "label": "钦北区",
  "value": "450703"
}, {
  "label": "灵山县",
  "value": "450721"
}, {
  "label": "浦北县",
  "value": "450722"
}], [{
  "label": "港北区",
  "value": "450802"
}, {
  "label": "港南区",
  "value": "450803"
}, {
  "label": "覃塘区",
  "value": "450804"
}, {
  "label": "平南县",
  "value": "450821"
}, {
  "label": "桂平市",
  "value": "450881"
}], [{
  "label": "玉州区",
  "value": "450902"
}, {
  "label": "福绵区",
  "value": "450903"
}, {
  "label": "容县",
  "value": "450921"
}, {
  "label": "陆川县",
  "value": "450922"
}, {
  "label": "博白县",
  "value": "450923"
}, {
  "label": "兴业县",
  "value": "450924"
}, {
  "label": "北流市",
  "value": "450981"
}], [{
  "label": "右江区",
  "value": "451002"
}, {
  "label": "田阳县",
  "value": "451021"
}, {
  "label": "田东县",
  "value": "451022"
}, {
  "label": "平果县",
  "value": "451023"
}, {
  "label": "德保县",
  "value": "451024"
}, {
  "label": "那坡县",
  "value": "451026"
}, {
  "label": "凌云县",
  "value": "451027"
}, {
  "label": "乐业县",
  "value": "451028"
}, {
  "label": "田林县",
  "value": "451029"
}, {
  "label": "西林县",
  "value": "451030"
}, {
  "label": "隆林各族自治县",
  "value": "451031"
}, {
  "label": "靖西市",
  "value": "451081"
}], [{
  "label": "八步区",
  "value": "451102"
}, {
  "label": "平桂区",
  "value": "451103"
}, {
  "label": "昭平县",
  "value": "451121"
}, {
  "label": "钟山县",
  "value": "451122"
}, {
  "label": "富川瑶族自治县",
  "value": "451123"
}], [{
  "label": "金城江区",
  "value": "451202"
}, {
  "label": "宜州区",
  "value": "451203"
}, {
  "label": "南丹县",
  "value": "451221"
}, {
  "label": "天峨县",
  "value": "451222"
}, {
  "label": "凤山县",
  "value": "451223"
}, {
  "label": "东兰县",
  "value": "451224"
}, {
  "label": "罗城仫佬族自治县",
  "value": "451225"
}, {
  "label": "环江毛南族自治县",
  "value": "451226"
}, {
  "label": "巴马瑶族自治县",
  "value": "451227"
}, {
  "label": "都安瑶族自治县",
  "value": "451228"
}, {
  "label": "大化瑶族自治县",
  "value": "451229"
}], [{
  "label": "兴宾区",
  "value": "451302"
}, {
  "label": "忻城县",
  "value": "451321"
}, {
  "label": "象州县",
  "value": "451322"
}, {
  "label": "武宣县",
  "value": "451323"
}, {
  "label": "金秀瑶族自治县",
  "value": "451324"
}, {
  "label": "合山市",
  "value": "451381"
}], [{
  "label": "江州区",
  "value": "451402"
}, {
  "label": "扶绥县",
  "value": "451421"
}, {
  "label": "宁明县",
  "value": "451422"
}, {
  "label": "龙州县",
  "value": "451423"
}, {
  "label": "大新县",
  "value": "451424"
}, {
  "label": "天等县",
  "value": "451425"
}, {
  "label": "凭祥市",
  "value": "451481"
}]], [[{
  "label": "秀英区",
  "value": "460105"
}, {
  "label": "龙华区",
  "value": "460106"
}, {
  "label": "琼山区",
  "value": "460107"
}, {
  "label": "美兰区",
  "value": "460108"
}], [{
  "label": "海棠区",
  "value": "460202"
}, {
  "label": "吉阳区",
  "value": "460203"
}, {
  "label": "天涯区",
  "value": "460204"
}, {
  "label": "崖州区",
  "value": "460205"
}], [{
  "label": "西沙群岛",
  "value": "460321"
}, {
  "label": "南沙群岛",
  "value": "460322"
}, {
  "label": "中沙群岛的岛礁及其海域",
  "value": "460323"
}], [{
  "label": "儋州市",
  "value": "460400"
}], [{
  "label": "五指山市",
  "value": "469001"
}, {
  "label": "琼海市",
  "value": "469002"
}, {
  "label": "文昌市",
  "value": "469005"
}, {
  "label": "万宁市",
  "value": "469006"
}, {
  "label": "东方市",
  "value": "469007"
}, {
  "label": "定安县",
  "value": "469021"
}, {
  "label": "屯昌县",
  "value": "469022"
}, {
  "label": "澄迈县",
  "value": "469023"
}, {
  "label": "临高县",
  "value": "469024"
}, {
  "label": "白沙黎族自治县",
  "value": "469025"
}, {
  "label": "昌江黎族自治县",
  "value": "469026"
}, {
  "label": "乐东黎族自治县",
  "value": "469027"
}, {
  "label": "陵水黎族自治县",
  "value": "469028"
}, {
  "label": "保亭黎族苗族自治县",
  "value": "469029"
}, {
  "label": "琼中黎族苗族自治县",
  "value": "469030"
}]], [[{
  "label": "万州区",
  "value": "500101"
}, {
  "label": "涪陵区",
  "value": "500102"
}, {
  "label": "渝中区",
  "value": "500103"
}, {
  "label": "大渡口区",
  "value": "500104"
}, {
  "label": "江北区",
  "value": "500105"
}, {
  "label": "沙坪坝区",
  "value": "500106"
}, {
  "label": "九龙坡区",
  "value": "500107"
}, {
  "label": "南岸区",
  "value": "500108"
}, {
  "label": "北碚区",
  "value": "500109"
}, {
  "label": "綦江区",
  "value": "500110"
}, {
  "label": "大足区",
  "value": "500111"
}, {
  "label": "渝北区",
  "value": "500112"
}, {
  "label": "巴南区",
  "value": "500113"
}, {
  "label": "黔江区",
  "value": "500114"
}, {
  "label": "长寿区",
  "value": "500115"
}, {
  "label": "江津区",
  "value": "500116"
}, {
  "label": "合川区",
  "value": "500117"
}, {
  "label": "永川区",
  "value": "500118"
}, {
  "label": "南川区",
  "value": "500119"
}, {
  "label": "璧山区",
  "value": "500120"
}, {
  "label": "铜梁区",
  "value": "500151"
}, {
  "label": "潼南区",
  "value": "500152"
}, {
  "label": "荣昌区",
  "value": "500153"
}, {
  "label": "开州区",
  "value": "500154"
}, {
  "label": "梁平区",
  "value": "500155"
}, {
  "label": "武隆区",
  "value": "500156"
}], [{
  "label": "城口县",
  "value": "500229"
}, {
  "label": "丰都县",
  "value": "500230"
}, {
  "label": "垫江县",
  "value": "500231"
}, {
  "label": "忠县",
  "value": "500233"
}, {
  "label": "云阳县",
  "value": "500235"
}, {
  "label": "奉节县",
  "value": "500236"
}, {
  "label": "巫山县",
  "value": "500237"
}, {
  "label": "巫溪县",
  "value": "500238"
}, {
  "label": "石柱土家族自治县",
  "value": "500240"
}, {
  "label": "秀山土家族苗族自治县",
  "value": "500241"
}, {
  "label": "酉阳土家族苗族自治县",
  "value": "500242"
}, {
  "label": "彭水苗族土家族自治县",
  "value": "500243"
}]], [[{
  "label": "锦江区",
  "value": "510104"
}, {
  "label": "青羊区",
  "value": "510105"
}, {
  "label": "金牛区",
  "value": "510106"
}, {
  "label": "武侯区",
  "value": "510107"
}, {
  "label": "成华区",
  "value": "510108"
}, {
  "label": "龙泉驿区",
  "value": "510112"
}, {
  "label": "青白江区",
  "value": "510113"
}, {
  "label": "新都区",
  "value": "510114"
}, {
  "label": "温江区",
  "value": "510115"
}, {
  "label": "双流区",
  "value": "510116"
}, {
  "label": "郫都区",
  "value": "510117"
}, {
  "label": "金堂县",
  "value": "510121"
}, {
  "label": "大邑县",
  "value": "510129"
}, {
  "label": "蒲江县",
  "value": "510131"
}, {
  "label": "新津县",
  "value": "510132"
}, {
  "label": "都江堰市",
  "value": "510181"
}, {
  "label": "彭州市",
  "value": "510182"
}, {
  "label": "邛崃市",
  "value": "510183"
}, {
  "label": "崇州市",
  "value": "510184"
}, {
  "label": "简阳市",
  "value": "510185"
}], [{
  "label": "自流井区",
  "value": "510302"
}, {
  "label": "贡井区",
  "value": "510303"
}, {
  "label": "大安区",
  "value": "510304"
}, {
  "label": "沿滩区",
  "value": "510311"
}, {
  "label": "荣县",
  "value": "510321"
}, {
  "label": "富顺县",
  "value": "510322"
}], [{
  "label": "东区",
  "value": "510402"
}, {
  "label": "西区",
  "value": "510403"
}, {
  "label": "仁和区",
  "value": "510411"
}, {
  "label": "米易县",
  "value": "510421"
}, {
  "label": "盐边县",
  "value": "510422"
}], [{
  "label": "江阳区",
  "value": "510502"
}, {
  "label": "纳溪区",
  "value": "510503"
}, {
  "label": "龙马潭区",
  "value": "510504"
}, {
  "label": "泸县",
  "value": "510521"
}, {
  "label": "合江县",
  "value": "510522"
}, {
  "label": "叙永县",
  "value": "510524"
}, {
  "label": "古蔺县",
  "value": "510525"
}], [{
  "label": "旌阳区",
  "value": "510603"
}, {
  "label": "罗江区",
  "value": "510604"
}, {
  "label": "中江县",
  "value": "510623"
}, {
  "label": "广汉市",
  "value": "510681"
}, {
  "label": "什邡市",
  "value": "510682"
}, {
  "label": "绵竹市",
  "value": "510683"
}], [{
  "label": "涪城区",
  "value": "510703"
}, {
  "label": "游仙区",
  "value": "510704"
}, {
  "label": "安州区",
  "value": "510705"
}, {
  "label": "三台县",
  "value": "510722"
}, {
  "label": "盐亭县",
  "value": "510723"
}, {
  "label": "梓潼县",
  "value": "510725"
}, {
  "label": "北川羌族自治县",
  "value": "510726"
}, {
  "label": "平武县",
  "value": "510727"
}, {
  "label": "江油市",
  "value": "510781"
}], [{
  "label": "利州区",
  "value": "510802"
}, {
  "label": "昭化区",
  "value": "510811"
}, {
  "label": "朝天区",
  "value": "510812"
}, {
  "label": "旺苍县",
  "value": "510821"
}, {
  "label": "青川县",
  "value": "510822"
}, {
  "label": "剑阁县",
  "value": "510823"
}, {
  "label": "苍溪县",
  "value": "510824"
}], [{
  "label": "船山区",
  "value": "510903"
}, {
  "label": "安居区",
  "value": "510904"
}, {
  "label": "蓬溪县",
  "value": "510921"
}, {
  "label": "射洪县",
  "value": "510922"
}, {
  "label": "大英县",
  "value": "510923"
}], [{
  "label": "市中区",
  "value": "511002"
}, {
  "label": "东兴区",
  "value": "511011"
}, {
  "label": "威远县",
  "value": "511024"
}, {
  "label": "资中县",
  "value": "511025"
}, {
  "label": "内江经济开发区",
  "value": "511071"
}, {
  "label": "隆昌市",
  "value": "511083"
}], [{
  "label": "市中区",
  "value": "511102"
}, {
  "label": "沙湾区",
  "value": "511111"
}, {
  "label": "五通桥区",
  "value": "511112"
}, {
  "label": "金口河区",
  "value": "511113"
}, {
  "label": "犍为县",
  "value": "511123"
}, {
  "label": "井研县",
  "value": "511124"
}, {
  "label": "夹江县",
  "value": "511126"
}, {
  "label": "沐川县",
  "value": "511129"
}, {
  "label": "峨边彝族自治县",
  "value": "511132"
}, {
  "label": "马边彝族自治县",
  "value": "511133"
}, {
  "label": "峨眉山市",
  "value": "511181"
}], [{
  "label": "顺庆区",
  "value": "511302"
}, {
  "label": "高坪区",
  "value": "511303"
}, {
  "label": "嘉陵区",
  "value": "511304"
}, {
  "label": "南部县",
  "value": "511321"
}, {
  "label": "营山县",
  "value": "511322"
}, {
  "label": "蓬安县",
  "value": "511323"
}, {
  "label": "仪陇县",
  "value": "511324"
}, {
  "label": "西充县",
  "value": "511325"
}, {
  "label": "阆中市",
  "value": "511381"
}], [{
  "label": "东坡区",
  "value": "511402"
}, {
  "label": "彭山区",
  "value": "511403"
}, {
  "label": "仁寿县",
  "value": "511421"
}, {
  "label": "洪雅县",
  "value": "511423"
}, {
  "label": "丹棱县",
  "value": "511424"
}, {
  "label": "青神县",
  "value": "511425"
}], [{
  "label": "翠屏区",
  "value": "511502"
}, {
  "label": "南溪区",
  "value": "511503"
}, {
  "label": "宜宾县",
  "value": "511521"
}, {
  "label": "江安县",
  "value": "511523"
}, {
  "label": "长宁县",
  "value": "511524"
}, {
  "label": "高县",
  "value": "511525"
}, {
  "label": "珙县",
  "value": "511526"
}, {
  "label": "筠连县",
  "value": "511527"
}, {
  "label": "兴文县",
  "value": "511528"
}, {
  "label": "屏山县",
  "value": "511529"
}], [{
  "label": "广安区",
  "value": "511602"
}, {
  "label": "前锋区",
  "value": "511603"
}, {
  "label": "岳池县",
  "value": "511621"
}, {
  "label": "武胜县",
  "value": "511622"
}, {
  "label": "邻水县",
  "value": "511623"
}, {
  "label": "华蓥市",
  "value": "511681"
}], [{
  "label": "通川区",
  "value": "511702"
}, {
  "label": "达川区",
  "value": "511703"
}, {
  "label": "宣汉县",
  "value": "511722"
}, {
  "label": "开江县",
  "value": "511723"
}, {
  "label": "大竹县",
  "value": "511724"
}, {
  "label": "渠县",
  "value": "511725"
}, {
  "label": "达州经济开发区",
  "value": "511771"
}, {
  "label": "万源市",
  "value": "511781"
}], [{
  "label": "雨城区",
  "value": "511802"
}, {
  "label": "名山区",
  "value": "511803"
}, {
  "label": "荥经县",
  "value": "511822"
}, {
  "label": "汉源县",
  "value": "511823"
}, {
  "label": "石棉县",
  "value": "511824"
}, {
  "label": "天全县",
  "value": "511825"
}, {
  "label": "芦山县",
  "value": "511826"
}, {
  "label": "宝兴县",
  "value": "511827"
}], [{
  "label": "巴州区",
  "value": "511902"
}, {
  "label": "恩阳区",
  "value": "511903"
}, {
  "label": "通江县",
  "value": "511921"
}, {
  "label": "南江县",
  "value": "511922"
}, {
  "label": "平昌县",
  "value": "511923"
}, {
  "label": "巴中经济开发区",
  "value": "511971"
}], [{
  "label": "雁江区",
  "value": "512002"
}, {
  "label": "安岳县",
  "value": "512021"
}, {
  "label": "乐至县",
  "value": "512022"
}], [{
  "label": "马尔康市",
  "value": "513201"
}, {
  "label": "汶川县",
  "value": "513221"
}, {
  "label": "理县",
  "value": "513222"
}, {
  "label": "茂县",
  "value": "513223"
}, {
  "label": "松潘县",
  "value": "513224"
}, {
  "label": "九寨沟县",
  "value": "513225"
}, {
  "label": "金川县",
  "value": "513226"
}, {
  "label": "小金县",
  "value": "513227"
}, {
  "label": "黑水县",
  "value": "513228"
}, {
  "label": "壤塘县",
  "value": "513230"
}, {
  "label": "阿坝县",
  "value": "513231"
}, {
  "label": "若尔盖县",
  "value": "513232"
}, {
  "label": "红原县",
  "value": "513233"
}], [{
  "label": "康定市",
  "value": "513301"
}, {
  "label": "泸定县",
  "value": "513322"
}, {
  "label": "丹巴县",
  "value": "513323"
}, {
  "label": "九龙县",
  "value": "513324"
}, {
  "label": "雅江县",
  "value": "513325"
}, {
  "label": "道孚县",
  "value": "513326"
}, {
  "label": "炉霍县",
  "value": "513327"
}, {
  "label": "甘孜县",
  "value": "513328"
}, {
  "label": "新龙县",
  "value": "513329"
}, {
  "label": "德格县",
  "value": "513330"
}, {
  "label": "白玉县",
  "value": "513331"
}, {
  "label": "石渠县",
  "value": "513332"
}, {
  "label": "色达县",
  "value": "513333"
}, {
  "label": "理塘县",
  "value": "513334"
}, {
  "label": "巴塘县",
  "value": "513335"
}, {
  "label": "乡城县",
  "value": "513336"
}, {
  "label": "稻城县",
  "value": "513337"
}, {
  "label": "得荣县",
  "value": "513338"
}], [{
  "label": "西昌市",
  "value": "513401"
}, {
  "label": "木里藏族自治县",
  "value": "513422"
}, {
  "label": "盐源县",
  "value": "513423"
}, {
  "label": "德昌县",
  "value": "513424"
}, {
  "label": "会理县",
  "value": "513425"
}, {
  "label": "会东县",
  "value": "513426"
}, {
  "label": "宁南县",
  "value": "513427"
}, {
  "label": "普格县",
  "value": "513428"
}, {
  "label": "布拖县",
  "value": "513429"
}, {
  "label": "金阳县",
  "value": "513430"
}, {
  "label": "昭觉县",
  "value": "513431"
}, {
  "label": "喜德县",
  "value": "513432"
}, {
  "label": "冕宁县",
  "value": "513433"
}, {
  "label": "越西县",
  "value": "513434"
}, {
  "label": "甘洛县",
  "value": "513435"
}, {
  "label": "美姑县",
  "value": "513436"
}, {
  "label": "雷波县",
  "value": "513437"
}]], [[{
  "label": "南明区",
  "value": "520102"
}, {
  "label": "云岩区",
  "value": "520103"
}, {
  "label": "花溪区",
  "value": "520111"
}, {
  "label": "乌当区",
  "value": "520112"
}, {
  "label": "白云区",
  "value": "520113"
}, {
  "label": "观山湖区",
  "value": "520115"
}, {
  "label": "开阳县",
  "value": "520121"
}, {
  "label": "息烽县",
  "value": "520122"
}, {
  "label": "修文县",
  "value": "520123"
}, {
  "label": "清镇市",
  "value": "520181"
}], [{
  "label": "钟山区",
  "value": "520201"
}, {
  "label": "六枝特区",
  "value": "520203"
}, {
  "label": "水城县",
  "value": "520221"
}, {
  "label": "盘州市",
  "value": "520281"
}], [{
  "label": "红花岗区",
  "value": "520302"
}, {
  "label": "汇川区",
  "value": "520303"
}, {
  "label": "播州区",
  "value": "520304"
}, {
  "label": "桐梓县",
  "value": "520322"
}, {
  "label": "绥阳县",
  "value": "520323"
}, {
  "label": "正安县",
  "value": "520324"
}, {
  "label": "道真仡佬族苗族自治县",
  "value": "520325"
}, {
  "label": "务川仡佬族苗族自治县",
  "value": "520326"
}, {
  "label": "凤冈县",
  "value": "520327"
}, {
  "label": "湄潭县",
  "value": "520328"
}, {
  "label": "余庆县",
  "value": "520329"
}, {
  "label": "习水县",
  "value": "520330"
}, {
  "label": "赤水市",
  "value": "520381"
}, {
  "label": "仁怀市",
  "value": "520382"
}], [{
  "label": "西秀区",
  "value": "520402"
}, {
  "label": "平坝区",
  "value": "520403"
}, {
  "label": "普定县",
  "value": "520422"
}, {
  "label": "镇宁布依族苗族自治县",
  "value": "520423"
}, {
  "label": "关岭布依族苗族自治县",
  "value": "520424"
}, {
  "label": "紫云苗族布依族自治县",
  "value": "520425"
}], [{
  "label": "七星关区",
  "value": "520502"
}, {
  "label": "大方县",
  "value": "520521"
}, {
  "label": "黔西县",
  "value": "520522"
}, {
  "label": "金沙县",
  "value": "520523"
}, {
  "label": "织金县",
  "value": "520524"
}, {
  "label": "纳雍县",
  "value": "520525"
}, {
  "label": "威宁彝族回族苗族自治县",
  "value": "520526"
}, {
  "label": "赫章县",
  "value": "520527"
}], [{
  "label": "碧江区",
  "value": "520602"
}, {
  "label": "万山区",
  "value": "520603"
}, {
  "label": "江口县",
  "value": "520621"
}, {
  "label": "玉屏侗族自治县",
  "value": "520622"
}, {
  "label": "石阡县",
  "value": "520623"
}, {
  "label": "思南县",
  "value": "520624"
}, {
  "label": "印江土家族苗族自治县",
  "value": "520625"
}, {
  "label": "德江县",
  "value": "520626"
}, {
  "label": "沿河土家族自治县",
  "value": "520627"
}, {
  "label": "松桃苗族自治县",
  "value": "520628"
}], [{
  "label": "兴义市",
  "value": "522301"
}, {
  "label": "兴仁县",
  "value": "522322"
}, {
  "label": "普安县",
  "value": "522323"
}, {
  "label": "晴隆县",
  "value": "522324"
}, {
  "label": "贞丰县",
  "value": "522325"
}, {
  "label": "望谟县",
  "value": "522326"
}, {
  "label": "册亨县",
  "value": "522327"
}, {
  "label": "安龙县",
  "value": "522328"
}], [{
  "label": "凯里市",
  "value": "522601"
}, {
  "label": "黄平县",
  "value": "522622"
}, {
  "label": "施秉县",
  "value": "522623"
}, {
  "label": "三穗县",
  "value": "522624"
}, {
  "label": "镇远县",
  "value": "522625"
}, {
  "label": "岑巩县",
  "value": "522626"
}, {
  "label": "天柱县",
  "value": "522627"
}, {
  "label": "锦屏县",
  "value": "522628"
}, {
  "label": "剑河县",
  "value": "522629"
}, {
  "label": "台江县",
  "value": "522630"
}, {
  "label": "黎平县",
  "value": "522631"
}, {
  "label": "榕江县",
  "value": "522632"
}, {
  "label": "从江县",
  "value": "522633"
}, {
  "label": "雷山县",
  "value": "522634"
}, {
  "label": "麻江县",
  "value": "522635"
}, {
  "label": "丹寨县",
  "value": "522636"
}], [{
  "label": "都匀市",
  "value": "522701"
}, {
  "label": "福泉市",
  "value": "522702"
}, {
  "label": "荔波县",
  "value": "522722"
}, {
  "label": "贵定县",
  "value": "522723"
}, {
  "label": "瓮安县",
  "value": "522725"
}, {
  "label": "独山县",
  "value": "522726"
}, {
  "label": "平塘县",
  "value": "522727"
}, {
  "label": "罗甸县",
  "value": "522728"
}, {
  "label": "长顺县",
  "value": "522729"
}, {
  "label": "龙里县",
  "value": "522730"
}, {
  "label": "惠水县",
  "value": "522731"
}, {
  "label": "三都水族自治县",
  "value": "522732"
}]], [[{
  "label": "五华区",
  "value": "530102"
}, {
  "label": "盘龙区",
  "value": "530103"
}, {
  "label": "官渡区",
  "value": "530111"
}, {
  "label": "西山区",
  "value": "530112"
}, {
  "label": "东川区",
  "value": "530113"
}, {
  "label": "呈贡区",
  "value": "530114"
}, {
  "label": "晋宁区",
  "value": "530115"
}, {
  "label": "富民县",
  "value": "530124"
}, {
  "label": "宜良县",
  "value": "530125"
}, {
  "label": "石林彝族自治县",
  "value": "530126"
}, {
  "label": "嵩明县",
  "value": "530127"
}, {
  "label": "禄劝彝族苗族自治县",
  "value": "530128"
}, {
  "label": "寻甸回族彝族自治县",
  "value": "530129"
}, {
  "label": "安宁市",
  "value": "530181"
}], [{
  "label": "麒麟区",
  "value": "530302"
}, {
  "label": "沾益区",
  "value": "530303"
}, {
  "label": "马龙县",
  "value": "530321"
}, {
  "label": "陆良县",
  "value": "530322"
}, {
  "label": "师宗县",
  "value": "530323"
}, {
  "label": "罗平县",
  "value": "530324"
}, {
  "label": "富源县",
  "value": "530325"
}, {
  "label": "会泽县",
  "value": "530326"
}, {
  "label": "宣威市",
  "value": "530381"
}], [{
  "label": "红塔区",
  "value": "530402"
}, {
  "label": "江川区",
  "value": "530403"
}, {
  "label": "澄江县",
  "value": "530422"
}, {
  "label": "通海县",
  "value": "530423"
}, {
  "label": "华宁县",
  "value": "530424"
}, {
  "label": "易门县",
  "value": "530425"
}, {
  "label": "峨山彝族自治县",
  "value": "530426"
}, {
  "label": "新平彝族傣族自治县",
  "value": "530427"
}, {
  "label": "元江哈尼族彝族傣族自治县",
  "value": "530428"
}], [{
  "label": "隆阳区",
  "value": "530502"
}, {
  "label": "施甸县",
  "value": "530521"
}, {
  "label": "龙陵县",
  "value": "530523"
}, {
  "label": "昌宁县",
  "value": "530524"
}, {
  "label": "腾冲市",
  "value": "530581"
}], [{
  "label": "昭阳区",
  "value": "530602"
}, {
  "label": "鲁甸县",
  "value": "530621"
}, {
  "label": "巧家县",
  "value": "530622"
}, {
  "label": "盐津县",
  "value": "530623"
}, {
  "label": "大关县",
  "value": "530624"
}, {
  "label": "永善县",
  "value": "530625"
}, {
  "label": "绥江县",
  "value": "530626"
}, {
  "label": "镇雄县",
  "value": "530627"
}, {
  "label": "彝良县",
  "value": "530628"
}, {
  "label": "威信县",
  "value": "530629"
}, {
  "label": "水富县",
  "value": "530630"
}], [{
  "label": "古城区",
  "value": "530702"
}, {
  "label": "玉龙纳西族自治县",
  "value": "530721"
}, {
  "label": "永胜县",
  "value": "530722"
}, {
  "label": "华坪县",
  "value": "530723"
}, {
  "label": "宁蒗彝族自治县",
  "value": "530724"
}], [{
  "label": "思茅区",
  "value": "530802"
}, {
  "label": "宁洱哈尼族彝族自治县",
  "value": "530821"
}, {
  "label": "墨江哈尼族自治县",
  "value": "530822"
}, {
  "label": "景东彝族自治县",
  "value": "530823"
}, {
  "label": "景谷傣族彝族自治县",
  "value": "530824"
}, {
  "label": "镇沅彝族哈尼族拉祜族自治县",
  "value": "530825"
}, {
  "label": "江城哈尼族彝族自治县",
  "value": "530826"
}, {
  "label": "孟连傣族拉祜族佤族自治县",
  "value": "530827"
}, {
  "label": "澜沧拉祜族自治县",
  "value": "530828"
}, {
  "label": "西盟佤族自治县",
  "value": "530829"
}], [{
  "label": "临翔区",
  "value": "530902"
}, {
  "label": "凤庆县",
  "value": "530921"
}, {
  "label": "云县",
  "value": "530922"
}, {
  "label": "永德县",
  "value": "530923"
}, {
  "label": "镇康县",
  "value": "530924"
}, {
  "label": "双江拉祜族佤族布朗族傣族自治县",
  "value": "530925"
}, {
  "label": "耿马傣族佤族自治县",
  "value": "530926"
}, {
  "label": "沧源佤族自治县",
  "value": "530927"
}], [{
  "label": "楚雄市",
  "value": "532301"
}, {
  "label": "双柏县",
  "value": "532322"
}, {
  "label": "牟定县",
  "value": "532323"
}, {
  "label": "南华县",
  "value": "532324"
}, {
  "label": "姚安县",
  "value": "532325"
}, {
  "label": "大姚县",
  "value": "532326"
}, {
  "label": "永仁县",
  "value": "532327"
}, {
  "label": "元谋县",
  "value": "532328"
}, {
  "label": "武定县",
  "value": "532329"
}, {
  "label": "禄丰县",
  "value": "532331"
}], [{
  "label": "个旧市",
  "value": "532501"
}, {
  "label": "开远市",
  "value": "532502"
}, {
  "label": "蒙自市",
  "value": "532503"
}, {
  "label": "弥勒市",
  "value": "532504"
}, {
  "label": "屏边苗族自治县",
  "value": "532523"
}, {
  "label": "建水县",
  "value": "532524"
}, {
  "label": "石屏县",
  "value": "532525"
}, {
  "label": "泸西县",
  "value": "532527"
}, {
  "label": "元阳县",
  "value": "532528"
}, {
  "label": "红河县",
  "value": "532529"
}, {
  "label": "金平苗族瑶族傣族自治县",
  "value": "532530"
}, {
  "label": "绿春县",
  "value": "532531"
}, {
  "label": "河口瑶族自治县",
  "value": "532532"
}], [{
  "label": "文山市",
  "value": "532601"
}, {
  "label": "砚山县",
  "value": "532622"
}, {
  "label": "西畴县",
  "value": "532623"
}, {
  "label": "麻栗坡县",
  "value": "532624"
}, {
  "label": "马关县",
  "value": "532625"
}, {
  "label": "丘北县",
  "value": "532626"
}, {
  "label": "广南县",
  "value": "532627"
}, {
  "label": "富宁县",
  "value": "532628"
}], [{
  "label": "景洪市",
  "value": "532801"
}, {
  "label": "勐海县",
  "value": "532822"
}, {
  "label": "勐腊县",
  "value": "532823"
}], [{
  "label": "大理市",
  "value": "532901"
}, {
  "label": "漾濞彝族自治县",
  "value": "532922"
}, {
  "label": "祥云县",
  "value": "532923"
}, {
  "label": "宾川县",
  "value": "532924"
}, {
  "label": "弥渡县",
  "value": "532925"
}, {
  "label": "南涧彝族自治县",
  "value": "532926"
}, {
  "label": "巍山彝族回族自治县",
  "value": "532927"
}, {
  "label": "永平县",
  "value": "532928"
}, {
  "label": "云龙县",
  "value": "532929"
}, {
  "label": "洱源县",
  "value": "532930"
}, {
  "label": "剑川县",
  "value": "532931"
}, {
  "label": "鹤庆县",
  "value": "532932"
}], [{
  "label": "瑞丽市",
  "value": "533102"
}, {
  "label": "芒市",
  "value": "533103"
}, {
  "label": "梁河县",
  "value": "533122"
}, {
  "label": "盈江县",
  "value": "533123"
}, {
  "label": "陇川县",
  "value": "533124"
}], [{
  "label": "泸水市",
  "value": "533301"
}, {
  "label": "福贡县",
  "value": "533323"
}, {
  "label": "贡山独龙族怒族自治县",
  "value": "533324"
}, {
  "label": "兰坪白族普米族自治县",
  "value": "533325"
}], [{
  "label": "香格里拉市",
  "value": "533401"
}, {
  "label": "德钦县",
  "value": "533422"
}, {
  "label": "维西傈僳族自治县",
  "value": "533423"
}]], [[{
  "label": "城关区",
  "value": "540102"
}, {
  "label": "堆龙德庆区",
  "value": "540103"
}, {
  "label": "林周县",
  "value": "540121"
}, {
  "label": "当雄县",
  "value": "540122"
}, {
  "label": "尼木县",
  "value": "540123"
}, {
  "label": "曲水县",
  "value": "540124"
}, {
  "label": "达孜县",
  "value": "540126"
}, {
  "label": "墨竹工卡县",
  "value": "540127"
}, {
  "label": "格尔木藏青工业园区",
  "value": "540171"
}, {
  "label": "拉萨经济技术开发区",
  "value": "540172"
}, {
  "label": "西藏文化旅游创意园区",
  "value": "540173"
}, {
  "label": "达孜工业园区",
  "value": "540174"
}], [{
  "label": "桑珠孜区",
  "value": "540202"
}, {
  "label": "南木林县",
  "value": "540221"
}, {
  "label": "江孜县",
  "value": "540222"
}, {
  "label": "定日县",
  "value": "540223"
}, {
  "label": "萨迦县",
  "value": "540224"
}, {
  "label": "拉孜县",
  "value": "540225"
}, {
  "label": "昂仁县",
  "value": "540226"
}, {
  "label": "谢通门县",
  "value": "540227"
}, {
  "label": "白朗县",
  "value": "540228"
}, {
  "label": "仁布县",
  "value": "540229"
}, {
  "label": "康马县",
  "value": "540230"
}, {
  "label": "定结县",
  "value": "540231"
}, {
  "label": "仲巴县",
  "value": "540232"
}, {
  "label": "亚东县",
  "value": "540233"
}, {
  "label": "吉隆县",
  "value": "540234"
}, {
  "label": "聂拉木县",
  "value": "540235"
}, {
  "label": "萨嘎县",
  "value": "540236"
}, {
  "label": "岗巴县",
  "value": "540237"
}], [{
  "label": "卡若区",
  "value": "540302"
}, {
  "label": "江达县",
  "value": "540321"
}, {
  "label": "贡觉县",
  "value": "540322"
}, {
  "label": "类乌齐县",
  "value": "540323"
}, {
  "label": "丁青县",
  "value": "540324"
}, {
  "label": "察雅县",
  "value": "540325"
}, {
  "label": "八宿县",
  "value": "540326"
}, {
  "label": "左贡县",
  "value": "540327"
}, {
  "label": "芒康县",
  "value": "540328"
}, {
  "label": "洛隆县",
  "value": "540329"
}, {
  "label": "边坝县",
  "value": "540330"
}], [{
  "label": "巴宜区",
  "value": "540402"
}, {
  "label": "工布江达县",
  "value": "540421"
}, {
  "label": "米林县",
  "value": "540422"
}, {
  "label": "墨脱县",
  "value": "540423"
}, {
  "label": "波密县",
  "value": "540424"
}, {
  "label": "察隅县",
  "value": "540425"
}, {
  "label": "朗县",
  "value": "540426"
}], [{
  "label": "乃东区",
  "value": "540502"
}, {
  "label": "扎囊县",
  "value": "540521"
}, {
  "label": "贡嘎县",
  "value": "540522"
}, {
  "label": "桑日县",
  "value": "540523"
}, {
  "label": "琼结县",
  "value": "540524"
}, {
  "label": "曲松县",
  "value": "540525"
}, {
  "label": "措美县",
  "value": "540526"
}, {
  "label": "洛扎县",
  "value": "540527"
}, {
  "label": "加查县",
  "value": "540528"
}, {
  "label": "隆子县",
  "value": "540529"
}, {
  "label": "错那县",
  "value": "540530"
}, {
  "label": "浪卡子县",
  "value": "540531"
}], [{
  "label": "那曲县",
  "value": "542421"
}, {
  "label": "嘉黎县",
  "value": "542422"
}, {
  "label": "比如县",
  "value": "542423"
}, {
  "label": "聂荣县",
  "value": "542424"
}, {
  "label": "安多县",
  "value": "542425"
}, {
  "label": "申扎县",
  "value": "542426"
}, {
  "label": "索县",
  "value": "542427"
}, {
  "label": "班戈县",
  "value": "542428"
}, {
  "label": "巴青县",
  "value": "542429"
}, {
  "label": "尼玛县",
  "value": "542430"
}, {
  "label": "双湖县",
  "value": "542431"
}], [{
  "label": "普兰县",
  "value": "542521"
}, {
  "label": "札达县",
  "value": "542522"
}, {
  "label": "噶尔县",
  "value": "542523"
}, {
  "label": "日土县",
  "value": "542524"
}, {
  "label": "革吉县",
  "value": "542525"
}, {
  "label": "改则县",
  "value": "542526"
}, {
  "label": "措勤县",
  "value": "542527"
}]], [[{
  "label": "新城区",
  "value": "610102"
}, {
  "label": "碑林区",
  "value": "610103"
}, {
  "label": "莲湖区",
  "value": "610104"
}, {
  "label": "灞桥区",
  "value": "610111"
}, {
  "label": "未央区",
  "value": "610112"
}, {
  "label": "雁塔区",
  "value": "610113"
}, {
  "label": "阎良区",
  "value": "610114"
}, {
  "label": "临潼区",
  "value": "610115"
}, {
  "label": "长安区",
  "value": "610116"
}, {
  "label": "高陵区",
  "value": "610117"
}, {
  "label": "鄠邑区",
  "value": "610118"
}, {
  "label": "蓝田县",
  "value": "610122"
}, {
  "label": "周至县",
  "value": "610124"
}], [{
  "label": "王益区",
  "value": "610202"
}, {
  "label": "印台区",
  "value": "610203"
}, {
  "label": "耀州区",
  "value": "610204"
}, {
  "label": "宜君县",
  "value": "610222"
}], [{
  "label": "渭滨区",
  "value": "610302"
}, {
  "label": "金台区",
  "value": "610303"
}, {
  "label": "陈仓区",
  "value": "610304"
}, {
  "label": "凤翔县",
  "value": "610322"
}, {
  "label": "岐山县",
  "value": "610323"
}, {
  "label": "扶风县",
  "value": "610324"
}, {
  "label": "眉县",
  "value": "610326"
}, {
  "label": "陇县",
  "value": "610327"
}, {
  "label": "千阳县",
  "value": "610328"
}, {
  "label": "麟游县",
  "value": "610329"
}, {
  "label": "凤县",
  "value": "610330"
}, {
  "label": "太白县",
  "value": "610331"
}], [{
  "label": "秦都区",
  "value": "610402"
}, {
  "label": "杨陵区",
  "value": "610403"
}, {
  "label": "渭城区",
  "value": "610404"
}, {
  "label": "三原县",
  "value": "610422"
}, {
  "label": "泾阳县",
  "value": "610423"
}, {
  "label": "乾县",
  "value": "610424"
}, {
  "label": "礼泉县",
  "value": "610425"
}, {
  "label": "永寿县",
  "value": "610426"
}, {
  "label": "彬县",
  "value": "610427"
}, {
  "label": "长武县",
  "value": "610428"
}, {
  "label": "旬邑县",
  "value": "610429"
}, {
  "label": "淳化县",
  "value": "610430"
}, {
  "label": "武功县",
  "value": "610431"
}, {
  "label": "兴平市",
  "value": "610481"
}], [{
  "label": "临渭区",
  "value": "610502"
}, {
  "label": "华州区",
  "value": "610503"
}, {
  "label": "潼关县",
  "value": "610522"
}, {
  "label": "大荔县",
  "value": "610523"
}, {
  "label": "合阳县",
  "value": "610524"
}, {
  "label": "澄城县",
  "value": "610525"
}, {
  "label": "蒲城县",
  "value": "610526"
}, {
  "label": "白水县",
  "value": "610527"
}, {
  "label": "富平县",
  "value": "610528"
}, {
  "label": "韩城市",
  "value": "610581"
}, {
  "label": "华阴市",
  "value": "610582"
}], [{
  "label": "宝塔区",
  "value": "610602"
}, {
  "label": "安塞区",
  "value": "610603"
}, {
  "label": "延长县",
  "value": "610621"
}, {
  "label": "延川县",
  "value": "610622"
}, {
  "label": "子长县",
  "value": "610623"
}, {
  "label": "志丹县",
  "value": "610625"
}, {
  "label": "吴起县",
  "value": "610626"
}, {
  "label": "甘泉县",
  "value": "610627"
}, {
  "label": "富县",
  "value": "610628"
}, {
  "label": "洛川县",
  "value": "610629"
}, {
  "label": "宜川县",
  "value": "610630"
}, {
  "label": "黄龙县",
  "value": "610631"
}, {
  "label": "黄陵县",
  "value": "610632"
}], [{
  "label": "汉台区",
  "value": "610702"
}, {
  "label": "南郑区",
  "value": "610703"
}, {
  "label": "城固县",
  "value": "610722"
}, {
  "label": "洋县",
  "value": "610723"
}, {
  "label": "西乡县",
  "value": "610724"
}, {
  "label": "勉县",
  "value": "610725"
}, {
  "label": "宁强县",
  "value": "610726"
}, {
  "label": "略阳县",
  "value": "610727"
}, {
  "label": "镇巴县",
  "value": "610728"
}, {
  "label": "留坝县",
  "value": "610729"
}, {
  "label": "佛坪县",
  "value": "610730"
}], [{
  "label": "榆阳区",
  "value": "610802"
}, {
  "label": "横山区",
  "value": "610803"
}, {
  "label": "府谷县",
  "value": "610822"
}, {
  "label": "靖边县",
  "value": "610824"
}, {
  "label": "定边县",
  "value": "610825"
}, {
  "label": "绥德县",
  "value": "610826"
}, {
  "label": "米脂县",
  "value": "610827"
}, {
  "label": "佳县",
  "value": "610828"
}, {
  "label": "吴堡县",
  "value": "610829"
}, {
  "label": "清涧县",
  "value": "610830"
}, {
  "label": "子洲县",
  "value": "610831"
}, {
  "label": "神木市",
  "value": "610881"
}], [{
  "label": "汉滨区",
  "value": "610902"
}, {
  "label": "汉阴县",
  "value": "610921"
}, {
  "label": "石泉县",
  "value": "610922"
}, {
  "label": "宁陕县",
  "value": "610923"
}, {
  "label": "紫阳县",
  "value": "610924"
}, {
  "label": "岚皋县",
  "value": "610925"
}, {
  "label": "平利县",
  "value": "610926"
}, {
  "label": "镇坪县",
  "value": "610927"
}, {
  "label": "旬阳县",
  "value": "610928"
}, {
  "label": "白河县",
  "value": "610929"
}], [{
  "label": "商州区",
  "value": "611002"
}, {
  "label": "洛南县",
  "value": "611021"
}, {
  "label": "丹凤县",
  "value": "611022"
}, {
  "label": "商南县",
  "value": "611023"
}, {
  "label": "山阳县",
  "value": "611024"
}, {
  "label": "镇安县",
  "value": "611025"
}, {
  "label": "柞水县",
  "value": "611026"
}]], [[{
  "label": "城关区",
  "value": "620102"
}, {
  "label": "七里河区",
  "value": "620103"
}, {
  "label": "西固区",
  "value": "620104"
}, {
  "label": "安宁区",
  "value": "620105"
}, {
  "label": "红古区",
  "value": "620111"
}, {
  "label": "永登县",
  "value": "620121"
}, {
  "label": "皋兰县",
  "value": "620122"
}, {
  "label": "榆中县",
  "value": "620123"
}, {
  "label": "兰州新区",
  "value": "620171"
}], [{
  "label": "嘉峪关市",
  "value": "620201"
}], [{
  "label": "金川区",
  "value": "620302"
}, {
  "label": "永昌县",
  "value": "620321"
}], [{
  "label": "白银区",
  "value": "620402"
}, {
  "label": "平川区",
  "value": "620403"
}, {
  "label": "靖远县",
  "value": "620421"
}, {
  "label": "会宁县",
  "value": "620422"
}, {
  "label": "景泰县",
  "value": "620423"
}], [{
  "label": "秦州区",
  "value": "620502"
}, {
  "label": "麦积区",
  "value": "620503"
}, {
  "label": "清水县",
  "value": "620521"
}, {
  "label": "秦安县",
  "value": "620522"
}, {
  "label": "甘谷县",
  "value": "620523"
}, {
  "label": "武山县",
  "value": "620524"
}, {
  "label": "张家川回族自治县",
  "value": "620525"
}], [{
  "label": "凉州区",
  "value": "620602"
}, {
  "label": "民勤县",
  "value": "620621"
}, {
  "label": "古浪县",
  "value": "620622"
}, {
  "label": "天祝藏族自治县",
  "value": "620623"
}], [{
  "label": "甘州区",
  "value": "620702"
}, {
  "label": "肃南裕固族自治县",
  "value": "620721"
}, {
  "label": "民乐县",
  "value": "620722"
}, {
  "label": "临泽县",
  "value": "620723"
}, {
  "label": "高台县",
  "value": "620724"
}, {
  "label": "山丹县",
  "value": "620725"
}], [{
  "label": "崆峒区",
  "value": "620802"
}, {
  "label": "泾川县",
  "value": "620821"
}, {
  "label": "灵台县",
  "value": "620822"
}, {
  "label": "崇信县",
  "value": "620823"
}, {
  "label": "华亭县",
  "value": "620824"
}, {
  "label": "庄浪县",
  "value": "620825"
}, {
  "label": "静宁县",
  "value": "620826"
}, {
  "label": "平凉工业园区",
  "value": "620871"
}], [{
  "label": "肃州区",
  "value": "620902"
}, {
  "label": "金塔县",
  "value": "620921"
}, {
  "label": "瓜州县",
  "value": "620922"
}, {
  "label": "肃北蒙古族自治县",
  "value": "620923"
}, {
  "label": "阿克塞哈萨克族自治县",
  "value": "620924"
}, {
  "label": "玉门市",
  "value": "620981"
}, {
  "label": "敦煌市",
  "value": "620982"
}], [{
  "label": "西峰区",
  "value": "621002"
}, {
  "label": "庆城县",
  "value": "621021"
}, {
  "label": "环县",
  "value": "621022"
}, {
  "label": "华池县",
  "value": "621023"
}, {
  "label": "合水县",
  "value": "621024"
}, {
  "label": "正宁县",
  "value": "621025"
}, {
  "label": "宁县",
  "value": "621026"
}, {
  "label": "镇原县",
  "value": "621027"
}], [{
  "label": "安定区",
  "value": "621102"
}, {
  "label": "通渭县",
  "value": "621121"
}, {
  "label": "陇西县",
  "value": "621122"
}, {
  "label": "渭源县",
  "value": "621123"
}, {
  "label": "临洮县",
  "value": "621124"
}, {
  "label": "漳县",
  "value": "621125"
}, {
  "label": "岷县",
  "value": "621126"
}], [{
  "label": "武都区",
  "value": "621202"
}, {
  "label": "成县",
  "value": "621221"
}, {
  "label": "文县",
  "value": "621222"
}, {
  "label": "宕昌县",
  "value": "621223"
}, {
  "label": "康县",
  "value": "621224"
}, {
  "label": "西和县",
  "value": "621225"
}, {
  "label": "礼县",
  "value": "621226"
}, {
  "label": "徽县",
  "value": "621227"
}, {
  "label": "两当县",
  "value": "621228"
}], [{
  "label": "临夏市",
  "value": "622901"
}, {
  "label": "临夏县",
  "value": "622921"
}, {
  "label": "康乐县",
  "value": "622922"
}, {
  "label": "永靖县",
  "value": "622923"
}, {
  "label": "广河县",
  "value": "622924"
}, {
  "label": "和政县",
  "value": "622925"
}, {
  "label": "东乡族自治县",
  "value": "622926"
}, {
  "label": "积石山保安族东乡族撒拉族自治县",
  "value": "622927"
}], [{
  "label": "合作市",
  "value": "623001"
}, {
  "label": "临潭县",
  "value": "623021"
}, {
  "label": "卓尼县",
  "value": "623022"
}, {
  "label": "舟曲县",
  "value": "623023"
}, {
  "label": "迭部县",
  "value": "623024"
}, {
  "label": "玛曲县",
  "value": "623025"
}, {
  "label": "碌曲县",
  "value": "623026"
}, {
  "label": "夏河县",
  "value": "623027"
}]], [[{
  "label": "城东区",
  "value": "630102"
}, {
  "label": "城中区",
  "value": "630103"
}, {
  "label": "城西区",
  "value": "630104"
}, {
  "label": "城北区",
  "value": "630105"
}, {
  "label": "大通回族土族自治县",
  "value": "630121"
}, {
  "label": "湟中县",
  "value": "630122"
}, {
  "label": "湟源县",
  "value": "630123"
}], [{
  "label": "乐都区",
  "value": "630202"
}, {
  "label": "平安区",
  "value": "630203"
}, {
  "label": "民和回族土族自治县",
  "value": "630222"
}, {
  "label": "互助土族自治县",
  "value": "630223"
}, {
  "label": "化隆回族自治县",
  "value": "630224"
}, {
  "label": "循化撒拉族自治县",
  "value": "630225"
}], [{
  "label": "门源回族自治县",
  "value": "632221"
}, {
  "label": "祁连县",
  "value": "632222"
}, {
  "label": "海晏县",
  "value": "632223"
}, {
  "label": "刚察县",
  "value": "632224"
}], [{
  "label": "同仁县",
  "value": "632321"
}, {
  "label": "尖扎县",
  "value": "632322"
}, {
  "label": "泽库县",
  "value": "632323"
}, {
  "label": "河南蒙古族自治县",
  "value": "632324"
}], [{
  "label": "共和县",
  "value": "632521"
}, {
  "label": "同德县",
  "value": "632522"
}, {
  "label": "贵德县",
  "value": "632523"
}, {
  "label": "兴海县",
  "value": "632524"
}, {
  "label": "贵南县",
  "value": "632525"
}], [{
  "label": "玛沁县",
  "value": "632621"
}, {
  "label": "班玛县",
  "value": "632622"
}, {
  "label": "甘德县",
  "value": "632623"
}, {
  "label": "达日县",
  "value": "632624"
}, {
  "label": "久治县",
  "value": "632625"
}, {
  "label": "玛多县",
  "value": "632626"
}], [{
  "label": "玉树市",
  "value": "632701"
}, {
  "label": "杂多县",
  "value": "632722"
}, {
  "label": "称多县",
  "value": "632723"
}, {
  "label": "治多县",
  "value": "632724"
}, {
  "label": "囊谦县",
  "value": "632725"
}, {
  "label": "曲麻莱县",
  "value": "632726"
}], [{
  "label": "格尔木市",
  "value": "632801"
}, {
  "label": "德令哈市",
  "value": "632802"
}, {
  "label": "乌兰县",
  "value": "632821"
}, {
  "label": "都兰县",
  "value": "632822"
}, {
  "label": "天峻县",
  "value": "632823"
}, {
  "label": "大柴旦行政委员会",
  "value": "632857"
}, {
  "label": "冷湖行政委员会",
  "value": "632858"
}, {
  "label": "茫崖行政委员会",
  "value": "632859"
}]], [[{
  "label": "兴庆区",
  "value": "640104"
}, {
  "label": "西夏区",
  "value": "640105"
}, {
  "label": "金凤区",
  "value": "640106"
}, {
  "label": "永宁县",
  "value": "640121"
}, {
  "label": "贺兰县",
  "value": "640122"
}, {
  "label": "灵武市",
  "value": "640181"
}], [{
  "label": "大武口区",
  "value": "640202"
}, {
  "label": "惠农区",
  "value": "640205"
}, {
  "label": "平罗县",
  "value": "640221"
}], [{
  "label": "利通区",
  "value": "640302"
}, {
  "label": "红寺堡区",
  "value": "640303"
}, {
  "label": "盐池县",
  "value": "640323"
}, {
  "label": "同心县",
  "value": "640324"
}, {
  "label": "青铜峡市",
  "value": "640381"
}], [{
  "label": "原州区",
  "value": "640402"
}, {
  "label": "西吉县",
  "value": "640422"
}, {
  "label": "隆德县",
  "value": "640423"
}, {
  "label": "泾源县",
  "value": "640424"
}, {
  "label": "彭阳县",
  "value": "640425"
}], [{
  "label": "沙坡头区",
  "value": "640502"
}, {
  "label": "中宁县",
  "value": "640521"
}, {
  "label": "海原县",
  "value": "640522"
}]], [[{
  "label": "天山区",
  "value": "650102"
}, {
  "label": "沙依巴克区",
  "value": "650103"
}, {
  "label": "新市区",
  "value": "650104"
}, {
  "label": "水磨沟区",
  "value": "650105"
}, {
  "label": "头屯河区",
  "value": "650106"
}, {
  "label": "达坂城区",
  "value": "650107"
}, {
  "label": "米东区",
  "value": "650109"
}, {
  "label": "乌鲁木齐县",
  "value": "650121"
}, {
  "label": "乌鲁木齐经济技术开发区",
  "value": "650171"
}, {
  "label": "乌鲁木齐高新技术产业开发区",
  "value": "650172"
}], [{
  "label": "独山子区",
  "value": "650202"
}, {
  "label": "克拉玛依区",
  "value": "650203"
}, {
  "label": "白碱滩区",
  "value": "650204"
}, {
  "label": "乌尔禾区",
  "value": "650205"
}], [{
  "label": "高昌区",
  "value": "650402"
}, {
  "label": "鄯善县",
  "value": "650421"
}, {
  "label": "托克逊县",
  "value": "650422"
}], [{
  "label": "伊州区",
  "value": "650502"
}, {
  "label": "巴里坤哈萨克自治县",
  "value": "650521"
}, {
  "label": "伊吾县",
  "value": "650522"
}], [{
  "label": "昌吉市",
  "value": "652301"
}, {
  "label": "阜康市",
  "value": "652302"
}, {
  "label": "呼图壁县",
  "value": "652323"
}, {
  "label": "玛纳斯县",
  "value": "652324"
}, {
  "label": "奇台县",
  "value": "652325"
}, {
  "label": "吉木萨尔县",
  "value": "652327"
}, {
  "label": "木垒哈萨克自治县",
  "value": "652328"
}], [{
  "label": "博乐市",
  "value": "652701"
}, {
  "label": "阿拉山口市",
  "value": "652702"
}, {
  "label": "精河县",
  "value": "652722"
}, {
  "label": "温泉县",
  "value": "652723"
}], [{
  "label": "库尔勒市",
  "value": "652801"
}, {
  "label": "轮台县",
  "value": "652822"
}, {
  "label": "尉犁县",
  "value": "652823"
}, {
  "label": "若羌县",
  "value": "652824"
}, {
  "label": "且末县",
  "value": "652825"
}, {
  "label": "焉耆回族自治县",
  "value": "652826"
}, {
  "label": "和静县",
  "value": "652827"
}, {
  "label": "和硕县",
  "value": "652828"
}, {
  "label": "博湖县",
  "value": "652829"
}, {
  "label": "库尔勒经济技术开发区",
  "value": "652871"
}], [{
  "label": "阿克苏市",
  "value": "652901"
}, {
  "label": "温宿县",
  "value": "652922"
}, {
  "label": "库车县",
  "value": "652923"
}, {
  "label": "沙雅县",
  "value": "652924"
}, {
  "label": "新和县",
  "value": "652925"
}, {
  "label": "拜城县",
  "value": "652926"
}, {
  "label": "乌什县",
  "value": "652927"
}, {
  "label": "阿瓦提县",
  "value": "652928"
}, {
  "label": "柯坪县",
  "value": "652929"
}], [{
  "label": "阿图什市",
  "value": "653001"
}, {
  "label": "阿克陶县",
  "value": "653022"
}, {
  "label": "阿合奇县",
  "value": "653023"
}, {
  "label": "乌恰县",
  "value": "653024"
}], [{
  "label": "喀什市",
  "value": "653101"
}, {
  "label": "疏附县",
  "value": "653121"
}, {
  "label": "疏勒县",
  "value": "653122"
}, {
  "label": "英吉沙县",
  "value": "653123"
}, {
  "label": "泽普县",
  "value": "653124"
}, {
  "label": "莎车县",
  "value": "653125"
}, {
  "label": "叶城县",
  "value": "653126"
}, {
  "label": "麦盖提县",
  "value": "653127"
}, {
  "label": "岳普湖县",
  "value": "653128"
}, {
  "label": "伽师县",
  "value": "653129"
}, {
  "label": "巴楚县",
  "value": "653130"
}, {
  "label": "塔什库尔干塔吉克自治县",
  "value": "653131"
}], [{
  "label": "和田市",
  "value": "653201"
}, {
  "label": "和田县",
  "value": "653221"
}, {
  "label": "墨玉县",
  "value": "653222"
}, {
  "label": "皮山县",
  "value": "653223"
}, {
  "label": "洛浦县",
  "value": "653224"
}, {
  "label": "策勒县",
  "value": "653225"
}, {
  "label": "于田县",
  "value": "653226"
}, {
  "label": "民丰县",
  "value": "653227"
}], [{
  "label": "伊宁市",
  "value": "654002"
}, {
  "label": "奎屯市",
  "value": "654003"
}, {
  "label": "霍尔果斯市",
  "value": "654004"
}, {
  "label": "伊宁县",
  "value": "654021"
}, {
  "label": "察布查尔锡伯自治县",
  "value": "654022"
}, {
  "label": "霍城县",
  "value": "654023"
}, {
  "label": "巩留县",
  "value": "654024"
}, {
  "label": "新源县",
  "value": "654025"
}, {
  "label": "昭苏县",
  "value": "654026"
}, {
  "label": "特克斯县",
  "value": "654027"
}, {
  "label": "尼勒克县",
  "value": "654028"
}], [{
  "label": "塔城市",
  "value": "654201"
}, {
  "label": "乌苏市",
  "value": "654202"
}, {
  "label": "额敏县",
  "value": "654221"
}, {
  "label": "沙湾县",
  "value": "654223"
}, {
  "label": "托里县",
  "value": "654224"
}, {
  "label": "裕民县",
  "value": "654225"
}, {
  "label": "和布克赛尔蒙古自治县",
  "value": "654226"
}], [{
  "label": "阿勒泰市",
  "value": "654301"
}, {
  "label": "布尔津县",
  "value": "654321"
}, {
  "label": "富蕴县",
  "value": "654322"
}, {
  "label": "福海县",
  "value": "654323"
}, {
  "label": "哈巴河县",
  "value": "654324"
}, {
  "label": "青河县",
  "value": "654325"
}, {
  "label": "吉木乃县",
  "value": "654326"
}], [{
  "label": "石河子市",
  "value": "659001"
}, {
  "label": "阿拉尔市",
  "value": "659002"
}, {
  "label": "图木舒克市",
  "value": "659003"
}, {
  "label": "五家渠市",
  "value": "659004"
}, {
  "label": "铁门关市",
  "value": "659006"
}]], [[{
  "label": "台北",
  "value": "660101"
}], [{
  "label": "高雄",
  "value": "660201"
}], [{
  "label": "基隆",
  "value": "660301"
}], [{
  "label": "台中",
  "value": "660401"
}], [{
  "label": "台南",
  "value": "660501"
}], [{
  "label": "新竹",
  "value": "660601"
}], [{
  "label": "嘉义",
  "value": "660701"
}], [{
  "label": "宜兰",
  "value": "660801"
}], [{
  "label": "桃园",
  "value": "660901"
}], [{
  "label": "苗栗",
  "value": "661001"
}], [{
  "label": "彰化",
  "value": "661101"
}], [{
  "label": "南投",
  "value": "661201"
}], [{
  "label": "云林",
  "value": "661301"
}], [{
  "label": "屏东",
  "value": "661401"
}], [{
  "label": "台东",
  "value": "661501"
}], [{
  "label": "花莲",
  "value": "661601"
}], [{
  "label": "澎湖",
  "value": "661701"
}]], [[{
  "label": "香港岛",
  "value": "670101"
}], [{
  "label": "九龙",
  "value": "670201"
}], [{
  "label": "新界",
  "value": "670301"
}]], [[{
  "label": "澳门半岛",
  "value": "680101"
}], [{
  "label": "氹仔岛",
  "value": "680201"
}], [{
  "label": "路环岛",
  "value": "680301"
}], [{
  "label": "路氹城",
  "value": "680401"
}]]];
var _default = areaData;
exports.default = _default;

/***/ }),

/***/ 1399:
/*!************************************************************************************!*\
  !*** D:/Desktop/code/ending/shop/uview-ui/components/u-parse/libs/MpHtmlParser.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {/**
 * html 解析器
 * @tutorial https://github.com/jin-yufeng/Parser
 * @version 20200728
 * @author JinYufeng
 * @listens MIT
 */
var cfg = __webpack_require__(/*! ./config.js */ 1400),
  blankChar = cfg.blankChar,
  CssHandler = __webpack_require__(/*! ./CssHandler.js */ 1401),
  windowWidth = uni.getSystemInfoSync().windowWidth;
var emoji;
function MpHtmlParser(data) {
  var _this = this;
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  this.attrs = {};
  this.CssHandler = new CssHandler(options.tagStyle, windowWidth);
  this.data = data;
  this.domain = options.domain;
  this.DOM = [];
  this.i = this.start = this.audioNum = this.imgNum = this.videoNum = 0;
  options.prot = (this.domain || '').includes('://') ? this.domain.split('://')[0] : 'http';
  this.options = options;
  this.state = this.Text;
  this.STACK = [];
  // 工具函数
  this.bubble = function () {
    for (var i = _this.STACK.length, item; item = _this.STACK[--i];) {
      if (cfg.richOnlyTags[item.name]) {
        if (item.name == 'table' && !Object.hasOwnProperty.call(item, 'c')) item.c = 1;
        return false;
      }
      item.c = 1;
    }
    return true;
  };
  this.decode = function (val, amp) {
    var i = -1,
      j,
      en;
    while (1) {
      if ((i = val.indexOf('&', i + 1)) == -1) break;
      if ((j = val.indexOf(';', i + 2)) == -1) break;
      if (val[i + 1] == '#') {
        en = parseInt((val[i + 2] == 'x' ? '0' : '') + val.substring(i + 2, j));
        if (!isNaN(en)) val = val.substr(0, i) + String.fromCharCode(en) + val.substr(j + 1);
      } else {
        en = val.substring(i + 1, j);
        if (cfg.entities[en] || en == amp) val = val.substr(0, i) + (cfg.entities[en] || '&') + val.substr(j + 1);
      }
    }
    return val;
  };
  this.getUrl = function (url) {
    if (url[0] == '/') {
      if (url[1] == '/') url = _this.options.prot + ':' + url;else if (_this.domain) url = _this.domain + url;
    } else if (_this.domain && url.indexOf('data:') != 0 && !url.includes('://')) url = _this.domain + '/' + url;
    return url;
  };
  this.isClose = function () {
    return _this.data[_this.i] == '>' || _this.data[_this.i] == '/' && _this.data[_this.i + 1] == '>';
  };
  this.section = function () {
    return _this.data.substring(_this.start, _this.i);
  };
  this.parent = function () {
    return _this.STACK[_this.STACK.length - 1];
  };
  this.siblings = function () {
    return _this.STACK.length ? _this.parent().children : _this.DOM;
  };
}
MpHtmlParser.prototype.parse = function () {
  if (emoji) this.data = emoji.parseEmoji(this.data);
  for (var c; c = this.data[this.i]; this.i++) {
    this.state(c);
  }
  if (this.state == this.Text) this.setText();
  while (this.STACK.length) {
    this.popNode(this.STACK.pop());
  }
  return this.DOM;
};
// 设置属性
MpHtmlParser.prototype.setAttr = function () {
  var name = this.attrName.toLowerCase(),
    val = this.attrVal;
  if (cfg.boolAttrs[name]) this.attrs[name] = 'T';else if (val) {
    if (name == 'src' || name == 'data-src' && !this.attrs.src) this.attrs.src = this.getUrl(this.decode(val, 'amp'));else if (name == 'href' || name == 'style') this.attrs[name] = this.decode(val, 'amp');else if (name.substr(0, 5) != 'data-') this.attrs[name] = val;
  }
  this.attrVal = '';
  while (blankChar[this.data[this.i]]) {
    this.i++;
  }
  if (this.isClose()) this.setNode();else {
    this.start = this.i;
    this.state = this.AttrName;
  }
};
// 设置文本节点
MpHtmlParser.prototype.setText = function () {
  var back,
    text = this.section();
  if (!text) return;
  text = cfg.onText && cfg.onText(text, function () {
    return back = true;
  }) || text;
  if (back) {
    this.data = this.data.substr(0, this.start) + text + this.data.substr(this.i);
    var j = this.start + text.length;
    for (this.i = this.start; this.i < j; this.i++) {
      this.state(this.data[this.i]);
    }
    return;
  }
  if (!this.pre) {
    // 合并空白符
    var flag,
      tmp = [];
    for (var i = text.length, c; c = text[--i];) {
      if (!blankChar[c]) {
        tmp.unshift(c);
        if (!flag) flag = 1;
      } else {
        if (tmp[0] != ' ') tmp.unshift(' ');
        if (c == '\n' && flag == void 0) flag = 0;
      }
    }
    if (flag == 0) return;
    text = tmp.join('');
  }
  this.siblings().push({
    type: 'text',
    text: this.decode(text)
  });
};
// 设置元素节点
MpHtmlParser.prototype.setNode = function () {
  var node = {
      name: this.tagName.toLowerCase(),
      attrs: this.attrs
    },
    close = cfg.selfClosingTags[node.name];
  if (this.options.nodes.length) node.type = 'node';
  this.attrs = {};
  if (!cfg.ignoreTags[node.name]) {
    // 处理属性
    var attrs = node.attrs,
      style = this.CssHandler.match(node.name, attrs, node) + (attrs.style || ''),
      styleObj = {};
    if (attrs.id) {
      if (this.options.compress & 1) attrs.id = void 0;else if (this.options.useAnchor) this.bubble();
    }
    if (this.options.compress & 2 && attrs.class) attrs.class = void 0;
    switch (node.name) {
      case 'a':
      case 'ad':
        this.bubble();
        break;
      case 'font':
        if (attrs.color) {
          styleObj['color'] = attrs.color;
          attrs.color = void 0;
        }
        if (attrs.face) {
          styleObj['font-family'] = attrs.face;
          attrs.face = void 0;
        }
        if (attrs.size) {
          var size = parseInt(attrs.size);
          if (size < 1) size = 1;else if (size > 7) size = 7;
          var map = ['xx-small', 'x-small', 'small', 'medium', 'large', 'x-large', 'xx-large'];
          styleObj['font-size'] = map[size - 1];
          attrs.size = void 0;
        }
        break;
      case 'embed':
        var src = node.attrs.src || '',
          type = node.attrs.type || '';
        if (type.includes('video') || src.includes('.mp4') || src.includes('.3gp') || src.includes('.m3u8')) node.name = 'video';else if (type.includes('audio') || src.includes('.m4a') || src.includes('.wav') || src.includes('.mp3') || src.includes('.aac')) node.name = 'audio';else break;
        if (node.attrs.autostart) node.attrs.autoplay = 'T';
        node.attrs.controls = 'T';
      case 'video':
      case 'audio':
        if (!attrs.id) attrs.id = node.name + ++this["".concat(node.name, "Num")];else this["".concat(node.name, "Num")]++;
        if (node.name == 'video') {
          if (this.videoNum > 3) node.lazyLoad = 1;
          if (attrs.width) {
            styleObj.width = parseFloat(attrs.width) + (attrs.width.includes('%') ? '%' : 'px');
            attrs.width = void 0;
          }
          if (attrs.height) {
            styleObj.height = parseFloat(attrs.height) + (attrs.height.includes('%') ? '%' : 'px');
            attrs.height = void 0;
          }
        }
        if (!attrs.controls && !attrs.autoplay) attrs.controls = 'T';
        attrs.source = [];
        if (attrs.src) {
          attrs.source.push(attrs.src);
          attrs.src = void 0;
        }
        this.bubble();
        break;
      case 'td':
      case 'th':
        if (attrs.colspan || attrs.rowspan) for (var k = this.STACK.length, item; item = this.STACK[--k];) {
          if (item.name == 'table') {
            item.c = void 0;
            break;
          }
        }
    }
    if (attrs.align) {
      styleObj['text-align'] = attrs.align;
      attrs.align = void 0;
    }
    // 压缩 style
    var styles = style.split(';');
    style = '';
    for (var i = 0, len = styles.length; i < len; i++) {
      var info = styles[i].split(':');
      if (info.length < 2) continue;
      var _key = info[0].trim().toLowerCase(),
        _value = info.slice(1).join(':').trim();
      if (_value[0] == '-' || _value.includes('safe')) style += ";".concat(_key, ":").concat(_value);else if (!styleObj[_key] || _value.includes('import') || !styleObj[_key].includes('import')) styleObj[_key] = _value;
    }
    if (node.name == 'img') {
      if (attrs.src && !attrs.ignore) {
        if (this.bubble()) attrs.i = (this.imgNum++).toString();else attrs.ignore = 'T';
      }
      if (attrs.ignore) {
        style += ';-webkit-touch-callout:none';
        styleObj['max-width'] = '100%';
      }
      var width;
      if (styleObj.width) width = styleObj.width;else if (attrs.width) width = attrs.width.includes('%') ? attrs.width : attrs.width + 'px';
      if (width) {
        styleObj.width = width;
        attrs.width = '100%';
        if (parseInt(width) > windowWidth) {
          styleObj.height = '';
          if (attrs.height) attrs.height = void 0;
        }
      }
      if (styleObj.height) {
        attrs.height = styleObj.height;
        styleObj.height = '';
      } else if (attrs.height && !attrs.height.includes('%')) attrs.height += 'px';
    }
    for (var key in styleObj) {
      var value = styleObj[key];
      if (!value) continue;
      if (key.includes('flex') || key == 'order' || key == 'self-align') node.c = 1;
      // 填充链接
      if (value.includes('url')) {
        var j = value.indexOf('(');
        if (j++ != -1) {
          while (value[j] == '"' || value[j] == "'" || blankChar[value[j]]) {
            j++;
          }
          value = value.substr(0, j) + this.getUrl(value.substr(j));
        }
      }
      // 转换 rpx
      else if (value.includes('rpx')) value = value.replace(/[0-9.]+\s*rpx/g, function ($) {
        return parseFloat($) * windowWidth / 750 + 'px';
      });else if (key == 'white-space' && value.includes('pre') && !close) this.pre = node.pre = true;
      style += ";".concat(key, ":").concat(value);
    }
    style = style.substr(1);
    if (style) attrs.style = style;
    if (!close) {
      node.children = [];
      if (node.name == 'pre' && cfg.highlight) {
        this.remove(node);
        this.pre = node.pre = true;
      }
      this.siblings().push(node);
      this.STACK.push(node);
    } else if (!cfg.filter || cfg.filter(node, this) != false) this.siblings().push(node);
  } else {
    if (!close) this.remove(node);else if (node.name == 'source') {
      var parent = this.parent();
      if (parent && (parent.name == 'video' || parent.name == 'audio') && node.attrs.src) parent.attrs.source.push(node.attrs.src);
    } else if (node.name == 'base' && !this.domain) this.domain = node.attrs.href;
  }
  if (this.data[this.i] == '/') this.i++;
  this.start = this.i + 1;
  this.state = this.Text;
};
// 移除标签
MpHtmlParser.prototype.remove = function (node) {
  var _this2 = this;
  var name = node.name,
    j = this.i;
  // 处理 svg
  var handleSvg = function handleSvg() {
    var src = _this2.data.substring(j, _this2.i + 1);
    if (!node.attrs.xmlns) src = ' xmlns="http://www.w3.org/2000/svg"' + src;
    var i = j;
    while (_this2.data[j] != '<') {
      j--;
    }
    src = _this2.data.substring(j, i).replace("viewbox", "viewBox") + src;
    var parent = _this2.parent();
    if (node.attrs.width == '100%' && parent && (parent.attrs.style || '').includes('inline')) parent.attrs.style = 'width:300px;max-width:100%;' + parent.attrs.style;
    _this2.siblings().push({
      name: 'img',
      attrs: {
        src: 'data:image/svg+xml;utf8,' + src.replace(/#/g, '%23'),
        style: (/vertical[^;]+/.exec(node.attrs.style) || []).shift(),
        ignore: 'T'
      }
    });
  };
  if (node.name == 'svg' && this.data[j] == '/') return handleSvg(this.i++);
  while (1) {
    if ((this.i = this.data.indexOf('</', this.i + 1)) == -1) {
      if (name == 'pre' || name == 'svg') this.i = j;else this.i = this.data.length;
      return;
    }
    this.start = this.i += 2;
    while (!blankChar[this.data[this.i]] && !this.isClose()) {
      this.i++;
    }
    if (this.section().toLowerCase() == name) {
      // 代码块高亮
      if (name == 'pre') {
        this.data = this.data.substr(0, j + 1) + cfg.highlight(this.data.substring(j + 1, this.i - 5), node.attrs) + this.data.substr(this.i - 5);
        return this.i = j;
      } else if (name == 'style') this.CssHandler.getStyle(this.data.substring(j + 1, this.i - 7));else if (name == 'title') this.DOM.title = this.data.substring(j + 1, this.i - 7);
      if ((this.i = this.data.indexOf('>', this.i)) == -1) this.i = this.data.length;
      if (name == 'svg') handleSvg();
      return;
    }
  }
};
// 节点出栈处理
MpHtmlParser.prototype.popNode = function (node) {
  // 空白符处理
  if (node.pre) {
    node.pre = this.pre = void 0;
    for (var i = this.STACK.length; i--;) {
      if (this.STACK[i].pre) this.pre = true;
    }
  }
  var siblings = this.siblings(),
    len = siblings.length,
    childs = node.children;
  if (node.name == 'head' || cfg.filter && cfg.filter(node, this) == false) return siblings.pop();
  var attrs = node.attrs;
  // 替换一些标签名
  if (cfg.blockTags[node.name]) node.name = 'div';else if (!cfg.trustTags[node.name]) node.name = 'span';
  // 处理列表
  if (node.c && (node.name == 'ul' || node.name == 'ol')) {
    if ((node.attrs.style || '').includes('list-style:none')) {
      for (var _i = 0, child; child = childs[_i++];) {
        if (child.name == 'li') child.name = 'div';
      }
    } else if (node.name == 'ul') {
      var floor = 1;
      for (var _i2 = this.STACK.length; _i2--;) {
        if (this.STACK[_i2].name == 'ul') floor++;
      }
      if (floor != 1) for (var _i3 = childs.length; _i3--;) {
        childs[_i3].floor = floor;
      }
    } else {
      for (var _i4 = 0, num = 1, _child; _child = childs[_i4++];) {
        if (_child.name == 'li') {
          _child.type = 'ol';
          _child.num = function (num, type) {
            if (type == 'a') return String.fromCharCode(97 + (num - 1) % 26);
            if (type == 'A') return String.fromCharCode(65 + (num - 1) % 26);
            if (type == 'i' || type == 'I') {
              num = (num - 1) % 99 + 1;
              var one = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'],
                ten = ['X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'],
                res = (ten[Math.floor(num / 10) - 1] || '') + (one[num % 10 - 1] || '');
              if (type == 'i') return res.toLowerCase();
              return res;
            }
            return num;
          }(num++, attrs.type) + '.';
        }
      }
    }
  }
  // 处理表格的边框
  if (node.name == 'table') {
    var padding = attrs.cellpadding,
      spacing = attrs.cellspacing,
      border = attrs.border;
    if (node.c) {
      this.bubble();
      attrs.style = (attrs.style || '') + ';display:table';
      if (!padding) padding = 2;
      if (!spacing) spacing = 2;
    }
    if (border) attrs.style = "border:".concat(border, "px solid gray;").concat(attrs.style || '');
    if (spacing) attrs.style = "border-spacing:".concat(spacing, "px;").concat(attrs.style || '');
    if (border || padding || node.c) (function f(ns) {
      for (var i = 0, n; n = ns[i]; i++) {
        if (n.type == 'text') continue;
        var style = n.attrs.style || '';
        if (node.c && n.name[0] == 't') {
          n.c = 1;
          style += ';display:table-' + (n.name == 'th' || n.name == 'td' ? 'cell' : n.name == 'tr' ? 'row' : 'row-group');
        }
        if (n.name == 'th' || n.name == 'td') {
          if (border) style = "border:".concat(border, "px solid gray;").concat(style);
          if (padding) style = "padding:".concat(padding, "px;").concat(style);
        } else f(n.children || []);
        if (style) n.attrs.style = style;
      }
    })(childs);
    if (this.options.autoscroll) {
      var table = Object.assign({}, node);
      node.name = 'div';
      node.attrs = {
        style: 'overflow:scroll'
      };
      node.children = [table];
    }
  }
  this.CssHandler.pop && this.CssHandler.pop(node);
  // 自动压缩
  if (node.name == 'div' && !Object.keys(attrs).length && childs.length == 1 && childs[0].name == 'div') siblings[len - 1] = childs[0];
};
// 状态机
MpHtmlParser.prototype.Text = function (c) {
  if (c == '<') {
    var next = this.data[this.i + 1],
      isLetter = function isLetter(c) {
        return c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z';
      };
    if (isLetter(next)) {
      this.setText();
      this.start = this.i + 1;
      this.state = this.TagName;
    } else if (next == '/') {
      this.setText();
      if (isLetter(this.data[++this.i + 1])) {
        this.start = this.i + 1;
        this.state = this.EndTag;
      } else this.Comment();
    } else if (next == '!' || next == '?') {
      this.setText();
      this.Comment();
    }
  }
};
MpHtmlParser.prototype.Comment = function () {
  var key;
  if (this.data.substring(this.i + 2, this.i + 4) == '--') key = '-->';else if (this.data.substring(this.i + 2, this.i + 9) == '[CDATA[') key = ']]>';else key = '>';
  if ((this.i = this.data.indexOf(key, this.i + 2)) == -1) this.i = this.data.length;else this.i += key.length - 1;
  this.start = this.i + 1;
  this.state = this.Text;
};
MpHtmlParser.prototype.TagName = function (c) {
  if (blankChar[c]) {
    this.tagName = this.section();
    while (blankChar[this.data[this.i]]) {
      this.i++;
    }
    if (this.isClose()) this.setNode();else {
      this.start = this.i;
      this.state = this.AttrName;
    }
  } else if (this.isClose()) {
    this.tagName = this.section();
    this.setNode();
  }
};
MpHtmlParser.prototype.AttrName = function (c) {
  if (c == '=' || blankChar[c] || this.isClose()) {
    this.attrName = this.section();
    if (blankChar[c]) while (blankChar[this.data[++this.i]]) {
      ;
    }
    if (this.data[this.i] == '=') {
      while (blankChar[this.data[++this.i]]) {
        ;
      }
      this.start = this.i--;
      this.state = this.AttrValue;
    } else this.setAttr();
  }
};
MpHtmlParser.prototype.AttrValue = function (c) {
  if (c == '"' || c == "'") {
    this.start++;
    if ((this.i = this.data.indexOf(c, this.i + 1)) == -1) return this.i = this.data.length;
    this.attrVal = this.section();
    this.i++;
  } else {
    for (; !blankChar[this.data[this.i]] && !this.isClose(); this.i++) {
      ;
    }
    this.attrVal = this.section();
  }
  this.setAttr();
};
MpHtmlParser.prototype.EndTag = function (c) {
  if (blankChar[c] || c == '>' || c == '/') {
    var name = this.section().toLowerCase();
    for (var i = this.STACK.length; i--;) {
      if (this.STACK[i].name == name) break;
    }
    if (i != -1) {
      var node;
      while ((node = this.STACK.pop()).name != name) {
        this.popNode(node);
      }
      this.popNode(node);
    } else if (name == 'p' || name == 'br') this.siblings().push({
      name: name,
      attrs: {}
    });
    this.i = this.data.indexOf('>', this.i);
    this.start = this.i + 1;
    if (this.i == -1) this.i = this.data.length;else this.state = this.Text;
  }
};
module.exports = MpHtmlParser;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 14:
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toPrimitive.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ 13)["default"];
function toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
module.exports = toPrimitive, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 1400:
/*!******************************************************************************!*\
  !*** D:/Desktop/code/ending/shop/uview-ui/components/u-parse/libs/config.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(wx) {/* 配置文件 */
var cfg = {
  // 出错占位图
  errorImg: null,
  // 过滤器函数
  filter: null,
  // 代码高亮函数
  highlight: null,
  // 文本处理函数
  onText: null,
  // 实体编码列表
  entities: {
    quot: '"',
    apos: "'",
    semi: ';',
    nbsp: '\xA0',
    ensp: "\u2002",
    emsp: "\u2003",
    ndash: '–',
    mdash: '—',
    middot: '·',
    lsquo: '‘',
    rsquo: '’',
    ldquo: '“',
    rdquo: '”',
    bull: '•',
    hellip: '…'
  },
  blankChar: makeMap(' ,\xA0,\t,\r,\n,\f'),
  boolAttrs: makeMap('allowfullscreen,autoplay,autostart,controls,ignore,loop,muted'),
  // 块级标签，将被转为 div
  blockTags: makeMap('address,article,aside,body,caption,center,cite,footer,header,html,nav,pre,section'),
  // 将被移除的标签
  ignoreTags: makeMap('area,base,canvas,frame,iframe,input,link,map,meta,param,script,source,style,svg,textarea,title,track,wbr'),
  // 只能被 rich-text 显示的标签
  richOnlyTags: makeMap('a,colgroup,fieldset,legend,table'),
  // 自闭合的标签
  selfClosingTags: makeMap('area,base,br,col,circle,ellipse,embed,frame,hr,img,input,line,link,meta,param,path,polygon,rect,source,track,use,wbr'),
  // 信任的标签
  trustTags: makeMap('a,abbr,ad,audio,b,blockquote,br,code,col,colgroup,dd,del,dl,dt,div,em,fieldset,h1,h2,h3,h4,h5,h6,hr,i,img,ins,label,legend,li,ol,p,q,source,span,strong,sub,sup,table,tbody,td,tfoot,th,thead,tr,title,ul,video'),
  // 默认的标签样式
  userAgentStyles: {
    address: 'font-style:italic',
    big: 'display:inline;font-size:1.2em',
    blockquote: 'background-color:#f6f6f6;border-left:3px solid #dbdbdb;color:#6c6c6c;padding:5px 0 5px 10px',
    caption: 'display:table-caption;text-align:center',
    center: 'text-align:center',
    cite: 'font-style:italic',
    dd: 'margin-left:40px',
    mark: 'background-color:yellow',
    pre: 'font-family:monospace;white-space:pre;overflow:scroll',
    s: 'text-decoration:line-through',
    small: 'display:inline;font-size:0.8em',
    u: 'text-decoration:underline'
  }
};
function makeMap(str) {
  var map = Object.create(null),
    list = str.split(',');
  for (var i = list.length; i--;) {
    map[list[i]] = true;
  }
  return map;
}
if (wx.canIUse('editor')) {
  cfg.blockTags.pre = void 0;
  cfg.ignoreTags.rp = true;
  Object.assign(cfg.richOnlyTags, makeMap('bdi,bdo,caption,rt,ruby'));
  Object.assign(cfg.trustTags, makeMap('bdi,bdo,caption,pre,rt,ruby'));
}
module.exports = cfg;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"]))

/***/ }),

/***/ 1401:
/*!**********************************************************************************!*\
  !*** D:/Desktop/code/ending/shop/uview-ui/components/u-parse/libs/CssHandler.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var cfg = __webpack_require__(/*! ./config.js */ 1400),
  isLetter = function isLetter(c) {
    return c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z';
  };
function CssHandler(tagStyle) {
  var styles = Object.assign(Object.create(null), cfg.userAgentStyles);
  for (var item in tagStyle) {
    styles[item] = (styles[item] ? styles[item] + ';' : '') + tagStyle[item];
  }
  this.styles = styles;
}
CssHandler.prototype.getStyle = function (data) {
  this.styles = new parser(data, this.styles).parse();
};
CssHandler.prototype.match = function (name, attrs) {
  var tmp,
    matched = (tmp = this.styles[name]) ? tmp + ';' : '';
  if (attrs.class) {
    var items = attrs.class.split(' ');
    for (var i = 0, item; item = items[i]; i++) {
      if (tmp = this.styles['.' + item]) matched += tmp + ';';
    }
  }
  if (tmp = this.styles['#' + attrs.id]) matched += tmp + ';';
  return matched;
};
module.exports = CssHandler;
function parser(data, init) {
  this.data = data;
  this.floor = 0;
  this.i = 0;
  this.list = [];
  this.res = init;
  this.state = this.Space;
}
parser.prototype.parse = function () {
  for (var c; c = this.data[this.i]; this.i++) {
    this.state(c);
  }
  return this.res;
};
parser.prototype.section = function () {
  return this.data.substring(this.start, this.i);
};
// 状态机
parser.prototype.Space = function (c) {
  if (c == '.' || c == '#' || isLetter(c)) {
    this.start = this.i;
    this.state = this.Name;
  } else if (c == '/' && this.data[this.i + 1] == '*') this.Comment();else if (!cfg.blankChar[c] && c != ';') this.state = this.Ignore;
};
parser.prototype.Comment = function () {
  this.i = this.data.indexOf('*/', this.i) + 1;
  if (!this.i) this.i = this.data.length;
  this.state = this.Space;
};
parser.prototype.Ignore = function (c) {
  if (c == '{') this.floor++;else if (c == '}' && ! --this.floor) this.state = this.Space;
};
parser.prototype.Name = function (c) {
  if (cfg.blankChar[c]) {
    this.list.push(this.section());
    this.state = this.NameSpace;
  } else if (c == '{') {
    this.list.push(this.section());
    this.Content();
  } else if (c == ',') {
    this.list.push(this.section());
    this.Comma();
  } else if (!isLetter(c) && (c < '0' || c > '9') && c != '-' && c != '_') this.state = this.Ignore;
};
parser.prototype.NameSpace = function (c) {
  if (c == '{') this.Content();else if (c == ',') this.Comma();else if (!cfg.blankChar[c]) this.state = this.Ignore;
};
parser.prototype.Comma = function () {
  while (cfg.blankChar[this.data[++this.i]]) {
    ;
  }
  if (this.data[this.i] == '{') this.Content();else {
    this.start = this.i--;
    this.state = this.Name;
  }
};
parser.prototype.Content = function () {
  this.start = ++this.i;
  if ((this.i = this.data.indexOf('}', this.i)) == -1) this.i = this.data.length;
  var content = this.section();
  for (var i = 0, item; item = this.list[i++];) {
    if (this.res[item]) this.res[item] += ';' + content;else this.res[item] = content;
  }
  this.list = [];
  this.state = this.Space;
};

/***/ }),

/***/ 145:
/*!************************************************!*\
  !*** D:/Desktop/code/ending/shop/api/goods.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyDistribution = applyDistribution;
exports.cash = cash;
exports.cashLog = cashLog;
exports.checkedDistributionGoods = checkedDistributionGoods;
exports.distribution = distribution;
exports.distributionGoods = distributionGoods;
exports.distributionOrderList = distributionOrderList;
exports.getCategoryList = getCategoryList;
exports.getGoods = getGoods;
exports.getGoodsDistribution = getGoodsDistribution;
exports.getGoodsList = getGoodsList;
exports.getGoodsListUplog = getGoodsListUplog;
exports.getGoodsMessage = getGoodsMessage;
exports.getGoodsRelated = getGoodsRelated;
exports.getMpCode = getMpCode;
exports.getMpScene = getMpScene;
exports.getPlateformTagGoods = getPlateformTagGoods;
exports.getTagGoods = getTagGoods;
var _request = __webpack_require__(/*! @/utils/request.js */ 43);
/**
 * 商品相关API
 */

/**
 * 从ES中获取相关商品品牌名称，分类名称及属性
 */
function getGoodsMessage(goodsId) {
  return _request.http.request({
    url: "/goods/goods/get/".concat(goodsId),
    method: _request.Method.GET
  });
}

/**
 * 从ES中获取相关商品品牌名称，分类名称及属性
 */
function getGoodsRelated(params) {
  return _request.http.request({
    url: "/goods/goods/es/related",
    method: _request.Method.GET,
    params: params
  });
}

/**
 * 获取商品详情
 * @param skuId 商品ID
 * @returns {AxiosPromise}
 */
function getGoods(skuId, goodsId) {
  return _request.http.request({
    url: "/goods/goods/sku/".concat(goodsId, "/").concat(skuId),
    method: _request.Method.GET
  });
}

/**
 * 获取商品分销
 * @param distributionId 商品分销ID
 */
function getGoodsDistribution(distributionId) {
  return _request.http.request({
    url: "/distribution/distribution/bindingDistribution/".concat(distributionId),
    method: _request.Method.GET
  });
}

/**
 * 获取商品列表
 * @param params
 * @returns {AxiosPromise}
 */
function getGoodsList(params) {
  return _request.http.request({
    url: "/goods/goods/es",
    method: _request.Method.GET,
    params: params
  });
}

/**
 * 获取上新商品列表
 * @param params
 * @returns {AxiosPromise}
 */
function getGoodsListUplog(params) {
  return _request.http.request({
    url: "goods/search/uplog",
    method: _request.Method.GET,
    params: params
  });
}

/**
 * 获取标签商品
 * @param storeId 卖家id
 * @param mark      标签 hot：热卖 new：新品 recommend：推荐
 * @param num       获取个数
 */
function getTagGoods(storeId) {
  var mark = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "hot";
  var num = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;
  return _request.http.request({
    url: "goods/tags/".concat(mark, "/goods"),
    method: _request.Method.GET,
    loading: false,
    params: {
      storeId: storeId,
      mark: mark,
      num: num
    }
  });
}
/**
 * 获取标签商品
 */
function getPlateformTagGoods(tag_id) {
  return _request.http.request({
    url: "goods/tags/byid/".concat(tag_id),
    method: _request.Method.GET,
    loading: false
  });
}

/**
 * 获取首页商品分类 左侧列表
 * @param parent_id
 */
function getCategoryList(id) {
  return _request.http.request({
    url: "/goods/category/get/".concat(id),
    method: _request.Method.GET,
    loading: false
  });
}

/**
 * 获取当前会员的分销商信息 可根据分销商信息查询待提现金额以及冻结金额等信息
 */
function distribution() {
  return _request.http.request({
    url: "/distribution/distribution",
    method: _request.Method.GET
  });
}

/**
 * 申请分销商
 */
function applyDistribution(params) {
  return _request.http.request({
    url: "/distribution/distribution",
    method: _request.Method.POST,
    params: params
  });
}

/**
 * 分销商提现
 */
function cash(params) {
  return _request.http.request({
    url: "/distribution/cash",
    method: _request.Method.POST,
    params: params
  });
}

/**
 * 分销商提现历史
 */
function cashLog(params) {
  return _request.http.request({
    url: "/distribution/cash",
    method: _request.Method.GET,
    params: params
  });
}

/**
 * 获取分销商分页订单列表
 */
function distributionOrderList(params) {
  return _request.http.request({
    url: "/distribution/distribution/distributionOrder",
    method: _request.Method.GET,
    params: params
  });
}

/**
 * 获取分销商商品列表
 */
function distributionGoods(params) {
  return _request.http.request({
    url: "/distribution/goods",
    method: _request.Method.GET,
    params: params
  });
}
/**
 * 选择分销商品 分销商品id
 */
function checkedDistributionGoods(params) {
  return _request.http.request({
    url: "/distribution/goods/checked/".concat(params.id),
    method: _request.Method.GET,
    params: params
  });
}

/**
 * 获取 小程序码
 */
function getMpCode(params) {
  return _request.http.request({
    url: "/passport/connect/miniProgram/mp/unlimited",
    method: _request.Method.GET,
    params: params
  });
}

/**
 * 根据shortlink 获取页面参数
 */
function getMpScene(id) {
  return _request.http.request({
    url: "/passport/connect/miniProgram/mp/unlimited/scene?id=".concat(id),
    method: _request.Method.GET
  });
}

/***/ }),

/***/ 15:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/construct.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf.js */ 16);
var isNativeReflectConstruct = __webpack_require__(/*! ./isNativeReflectConstruct.js */ 17);
function _construct(t, e, r) {
  if (isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments);
  var o = [null];
  o.push.apply(o, e);
  var p = new (t.bind.apply(t, o))();
  return r && setPrototypeOf(p, r.prototype), p;
}
module.exports = _construct, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 1508:
/*!*************************************************************!*\
  !*** D:/Desktop/code/ending/shop/components/m-buy/popup.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  height: "1000rpx",
  //弹出层高度
  mode: "bottom",
  //弹出层位置
  radius: "32",
  //圆角 rpx,
  close: false //能否点击遮罩退出
};
exports.default = _default;

/***/ }),

/***/ 154:
/*!***********************************************!*\
  !*** D:/Desktop/code/ending/shop/api/home.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAdvertisement = getAdvertisement;
exports.getCategory = getCategory;
exports.getCategoryIndexData = getCategoryIndexData;
exports.getFloorData = getFloorData;
exports.getFloorStoreData = getFloorStoreData;
exports.getHotKeywords = getHotKeywords;
exports.getSpecial = getSpecial;
exports.toSpecial = toSpecial;
var _request = __webpack_require__(/*! @/utils/request.js */ 43);
function toSpecial(data) {
  return _request.http.request({
    url: "/other/pageData/getSpecial",
    method: _request.Method.GET,
    data: data
  });
}
/**
 * 专题内容
 */
function getSpecial(id) {
  return _request.http.request({
    url: "/other/pageData/get/".concat(id),
    method: _request.Method.GET
  });
}

/**
 * 获取广告图
 */
function getAdvertisement() {
  return _request.http.request({
    url: "/advertisement",
    method: _request.Method.GET
  });
}

/**
 * 获取首页商品分类
 * @param parent_id
 */
function getCategory() {
  var parent_id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  return _request.http.request({
    url: "goods/categories/".concat(parent_id, "/children"),
    method: _request.Method.GET,
    loading: false
  });
}

/**
 * 获取热门关键词
 * @param num
 */
function getHotKeywords(count) {
  return _request.http.request({
    url: "/goods/goods/hot-words",
    method: _request.Method.GET,
    loading: false,
    params: {
      count: count
    }
  });
}

/**
 * 获取楼层数据
 * @param client_type
 * @param page_type
 */
function getFloorData(params) {
  return _request.http.request({
    url: "/other/pageData/getIndex?clientType=H5",
    method: "get",
    params: params
  });
}

/**
 * 获取店铺楼层数据
 */
function getFloorStoreData(params) {
  return _request.http.request({
    url: "/other/pageData?pageClientType=H5",
    method: "get",
    params: params
  });
}

/**
 * 获取获取首页分类数据
 */
function getCategoryIndexData() {
  var parentId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  return _request.http.request({
    url: "/goods/category/get/".concat(parentId),
    method: "get"
  });
}

/***/ }),

/***/ 1586:
/*!**************************************************!*\
  !*** D:/Desktop/code/ending/shop/static/buy.png ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJgAAABsCAMAAAChH4scAAABO1BMVEUAAAD/oJ/6qZv8sJ31ppf7p5v5qJv3p5n5pJb6p5v9qpf2qJn7p5j6p5n7qJn6pZr6qJr7p5r6ppn6p5n7p5n7ppr8koj6p5r/Ijb6l4z6iH/6qJj/QUX6p5n7qJn/Mz35p5n5ppn/LTr6pZn/KTj/OED/OEH7kYj/Ljv6kIj/Jjj9hID/SE38enX/P0T/QET9Zmb7loz7i4T/RUn/LD3/QUX/Jzj+T1D/Lj79PUX9Y2P9UFb9XF/+PUn+NEP/SVD7cXP8lIr/KTj/JTb/PEL/OUD/Ljv/Mj3/Nj7/////ITX/P0P/p6z/+vv/8/T/Q03/Ulv/2t3/09b/6On/r7X/Zm7/7e7/WGL/Okb/9/f/ur7/jpT/Xmb/l53/fIP/TFf/P0n/4eL/wcX/dX3/bXb/nqX/ztH/hYz/1tibhnhGAAAAQnRSTlMAAwgFDRogFxAoFRJAJRwwOC00PEhYUlD1cDRg9TdD9jFN80b19PdP90rrL65v8OpHZz/d3dXVvKycjXpQwLlraF35PR4rAAAHE0lEQVR42uzWe0siURgG8L24o7PTeAtCpNhYisjCREiSgsC8rLfRbNS8t2tt+/0/wb7vOWc8x1uo50z0h09Rxgz543nfOfVpm2222WabD53Pa2fuV3wAk+s6UfV1zbhrE1Ff1oqIc4k1ZVpb5wJtTuVh8XmWxedcm7epdXEWedtJjCXhd1CdSFNb10SFmO9OvEszuQWRE5vC0hiLq4jm28ohRmbjNJUupkKTH6KtFLwTdcymUCa6DFQByTyDRFcK3KibwEObIcoUuThLi95epWKxI5KfM/nh5JgnfnF5fhvVOI3JlLkoK3F1dIfJiMk7KTj5RZJzko2fJyhNkClzAessHQHUBrBs9jh9BjRpGYdRl0FcidTdJIyEHyvAMJcJIjOIDGHyLuzL7zdvYqXS3YaNYS5uTL8fOpOXsUGSOWpmAlwctnZjKEuYGk7TGaZsYT4D5mhGU+CSaQynGTVhmoZPsjIsjC4YuPR0CSOxY5ByWgcZrhmtTLIwcGnmTaQk31h5H4YJMrnKEMYGqZmhq9I0bLPGyuchUyPDlIHxwkw9GSlJN4ayeFI3hcokCvPQwq5RJb9j5fI1rczDKtsYxgoLwCRV7BjMMkArYzCZSWJh4dQsbNPGLsNYGZulDMzw+jU9lIzJNcZlF8mQrvm9hgyMT/IwGVG1Y/HkoThLmRXDSZ5GVO3Y/inOUmLJ2LGPz6T+BiwPn2vDdHwu2eEvtWKBoHRjLAgLBmSWjMHg/wpcsRkYl+Ughcw8yoHVSMrchTBYMvzvh8Jkdj8U3j1Z3Fi+YVnWgMB6DSEDBhu1LMxwCrYbDtHtdxH2aBWLxTHCHh+KQv4wWL1KfuyLsBNVMG0JLP9i212isO1KblwU8y8nwqxa1okD09yBYWhbLL8fG/i1gnnAV1kKa1fJVb5jSmH64sbq4uj6KBiTBwBbbD0xGL2anYXpimAHO3vzMHF4LzapjcAqZHgU1idXBzkRtrdzoAoWWAh7arf7LXjbShuCY+3RI6MHLzsjETbm5xiFBdyDoQxs6HmG52BAWqKwIbyutimsia5qnTemDGZ4lzWGaePbjjIZclbY7JAlmKYAa9UWwbyGAlhwCQzL6bwOhy/33W63zmCjLqRPYc/k7MjOwIKuwyrOaVErsKAGAt84zEYYi6swLvtLXa1m4346TQqjx24v996NFeifIavZL/LQdWewIdm3d4fVOkQxzL/OwKwnAdYZvTvsP+/lkuMgDATRu5ViO5GCmATjmD9BEyb3P8G4/EFoJGYVubZsntpFV3Ud1qeUmu9ZBXG13UQEI3E1i8weU623toK6c3OJINqqPe/A1lPmicnXxQ8HEMa9no1lcaDdU4PtmAwiM1gw1hXAVDhAFbjESrvvwcbMYN+NBxuj11rHNS7L8vbhlMDc+Ipe5PQYGNvUA0AXEnxOJVafNzBSZp1YWaXFAMiWrycl+ah7qTYwY9ZTTjB0Wusnw0gB6sYol/bZUOZaqg3MzvMscpsfC8tpvEiMlar0sgd3Zb49JjmxAQAvjrc6PHhzT0z2RWiJYIWo+q+dprRg+7ouM4PZlb+lsUjlv9hpjWClceh5wfDyND9wmprLH+kIxi/9fx77fLWeOK9mkEDKpr1SJD0KFn6no2r9+WPkVynAnm10gBMEuIem+qCAAKjDAnxCfFCLC1r0kigfhkI4jModXsoHh12o2+HFOnZBVoghhghoN9pD9uAwdUd7NLWolcb0NcEOo9bAnbIJtdKYsTJVRxTl7KiVxszl4A6jxuCwnDW10piVHKWDw4jhdESdRHka0xPjQR5Op3gCQljZjjppzFxZmNIJCNRsKecgQY00JqMrh5opGSmc5BLgEdGhRojpiPAIoE1yUZTIQEEGKN9cVhuGgSi66SYg8CNyRHHtWqgtJcQFYUMgEGj+/6d6R1o4gio2GQdEe730LA6SdnPubuS/sWGHA1tlLTjdpZDffCGkl2IbLFL5q+dm28p+z3tj4Gq3Tbh6Zi/ry1wY3Y+cExt6bURehst6tt5Ar0zqy+F+Tetw0ZJeWKA38IUQf5la9ee7xLaXY6+0v8hQCOErNEXnySp7Oo/7N5/PKa9X+bjO+9dwPNnKc3VFRKFhSEeOzEilqqq29nlxrK2rSilpHFdEOmJoWp5M4NCARqkXxY0qOi7huCKaFktsA1mZExrYALcwiqgIKy/BFRHbmCog0EqHZiTgtFazwRBGjcMqgRVRAdnyJMgyQgNb2xpj5Eww0ragIqwMXDF5kq+b0qEVHdgARxE342dyUHUFsMD1KBHWo4EtAxzSNE0eDX66oS4DlccKudZWmokNcD7ZjRQ+G0cVUZpXlsABR9nMBkME9ZsE/ne1+WSLBulWM9Its4T1n4luNoz6D7cw9YQvEvyKFqb+RcUs4VJewjXGlIufD8oPuVu2mqSWz5UAAAAASUVORK5CYII="

/***/ }),

/***/ 16:
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/setPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _setPrototypeOf(o, p);
}
module.exports = _setPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 17:
/*!*************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/isNativeReflectConstruct.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch (t) {}
  return (module.exports = _isNativeReflectConstruct = function _isNativeReflectConstruct() {
    return !!t;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports)();
}
module.exports = _isNativeReflectConstruct, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 179:
/*!**********************************************************************!*\
  !*** D:/Desktop/code/ending/shop/js_sdk/wa-permission/permission.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * 本模块封装了Android、iOS的应用权限判断、打开应用权限设置界面、以及位置系统服务是否开启
 * https://ext.dcloud.net.cn/plugin?id=594
 */

var isIos;

// 判断推送权限是否开启
function judgeIosPermissionPush() {
  var result = false;
  var UIApplication = plus.ios.import("UIApplication");
  var app = UIApplication.sharedApplication();
  var enabledTypes = 0;
  if (app.currentUserNotificationSettings) {
    var settings = app.currentUserNotificationSettings();
    enabledTypes = settings.plusGetAttribute("types");
    console.log("enabledTypes1:" + enabledTypes);
    if (enabledTypes == 0) {
      console.log("推送权限没有开启");
    } else {
      result = true;
      console.log("已经开启推送功能!");
    }
    plus.ios.deleteObject(settings);
  } else {
    enabledTypes = app.enabledRemoteNotificationTypes();
    if (enabledTypes == 0) {
      console.log("推送权限没有开启!");
    } else {
      result = true;
      console.log("已经开启推送功能!");
    }
    console.log("enabledTypes2:" + enabledTypes);
  }
  plus.ios.deleteObject(app);
  plus.ios.deleteObject(UIApplication);
  return result;
}

// 判断定位权限是否开启
function judgeIosPermissionLocation() {
  var result = false;
  var cllocationManger = plus.ios.import("CLLocationManager");
  var status = cllocationManger.authorizationStatus();
  result = status != 2;
  console.log("定位权限开启：" + result);
  // 以下代码判断了手机设备的定位是否关闭，推荐另行使用方法 checkSystemEnableLocation
  /* var enable = cllocationManger.locationServicesEnabled();
  var status = cllocationManger.authorizationStatus();
  console.log("enable:" + enable);
  console.log("status:" + status);
  if (enable && status != 2) {
  	result = true;
  	console.log("手机定位服务已开启且已授予定位权限");
  } else {
  	console.log("手机系统的定位没有打开或未给予定位权限");
  } */
  plus.ios.deleteObject(cllocationManger);
  return result;
}

// 判断麦克风权限是否开启
function judgeIosPermissionRecord() {
  var result = false;
  var avaudiosession = plus.ios.import("AVAudioSession");
  var avaudio = avaudiosession.sharedInstance();
  var permissionStatus = avaudio.recordPermission();
  console.log("permissionStatus:" + permissionStatus);
  if (permissionStatus == 1684369017 || permissionStatus == 1970168948) {
    console.log("麦克风权限没有开启");
  } else {
    result = true;
    console.log("麦克风权限已经开启");
  }
  plus.ios.deleteObject(avaudiosession);
  return result;
}

// 判断相机权限是否开启
function judgeIosPermissionCamera() {
  var result = false;
  var AVCaptureDevice = plus.ios.import("AVCaptureDevice");
  var authStatus = AVCaptureDevice.authorizationStatusForMediaType('vide');
  console.log("authStatus:" + authStatus);
  if (authStatus == 3) {
    result = true;
    console.log("相机权限已经开启");
  } else {
    console.log("相机权限没有开启");
  }
  plus.ios.deleteObject(AVCaptureDevice);
  return result;
}

// 判断相册权限是否开启
function judgeIosPermissionPhotoLibrary() {
  var result = false;
  var PHPhotoLibrary = plus.ios.import("PHPhotoLibrary");
  var authStatus = PHPhotoLibrary.authorizationStatus();
  console.log("authStatus:" + authStatus);
  if (authStatus == 3) {
    result = true;
    console.log("相册权限已经开启");
  } else {
    console.log("相册权限没有开启");
  }
  plus.ios.deleteObject(PHPhotoLibrary);
  return result;
}

// 判断通讯录权限是否开启
function judgeIosPermissionContact() {
  var result = false;
  var CNContactStore = plus.ios.import("CNContactStore");
  var cnAuthStatus = CNContactStore.authorizationStatusForEntityType(0);
  if (cnAuthStatus == 3) {
    result = true;
    console.log("通讯录权限已经开启");
  } else {
    console.log("通讯录权限没有开启");
  }
  plus.ios.deleteObject(CNContactStore);
  return result;
}

// 判断日历权限是否开启
function judgeIosPermissionCalendar() {
  var result = false;
  var EKEventStore = plus.ios.import("EKEventStore");
  var ekAuthStatus = EKEventStore.authorizationStatusForEntityType(0);
  if (ekAuthStatus == 3) {
    result = true;
    console.log("日历权限已经开启");
  } else {
    console.log("日历权限没有开启");
  }
  plus.ios.deleteObject(EKEventStore);
  return result;
}

// 判断备忘录权限是否开启
function judgeIosPermissionMemo() {
  var result = false;
  var EKEventStore = plus.ios.import("EKEventStore");
  var ekAuthStatus = EKEventStore.authorizationStatusForEntityType(1);
  if (ekAuthStatus == 3) {
    result = true;
    console.log("备忘录权限已经开启");
  } else {
    console.log("备忘录权限没有开启");
  }
  plus.ios.deleteObject(EKEventStore);
  return result;
}

// Android权限查询
function requestAndroidPermission(permissionID) {
  return new Promise(function (resolve, reject) {
    plus.android.requestPermissions([permissionID],
    // 理论上支持多个权限同时查询，但实际上本函数封装只处理了一个权限的情况。有需要的可自行扩展封装
    function (resultObj) {
      var result = 0;
      for (var i = 0; i < resultObj.granted.length; i++) {
        var grantedPermission = resultObj.granted[i];
        console.log('已获取的权限：' + grantedPermission);
        result = 1;
      }
      for (var i = 0; i < resultObj.deniedPresent.length; i++) {
        var deniedPresentPermission = resultObj.deniedPresent[i];
        console.log('拒绝本次申请的权限：' + deniedPresentPermission);
        result = 0;
      }
      for (var i = 0; i < resultObj.deniedAlways.length; i++) {
        var deniedAlwaysPermission = resultObj.deniedAlways[i];
        console.log('永久拒绝申请的权限：' + deniedAlwaysPermission);
        result = -1;
      }
      resolve(result);
      // 若所需权限被拒绝,则打开APP设置界面,可以在APP设置界面打开相应权限
      // if (result != 1) {
      // gotoAppPermissionSetting()
      // }
    }, function (error) {
      console.log('申请权限错误：' + error.code + " = " + error.message);
      resolve({
        code: error.code,
        message: error.message
      });
    });
  });
}

// 使用一个方法，根据参数判断权限
function judgeIosPermission(permissionID) {
  if (permissionID == "location") {
    return judgeIosPermissionLocation();
  } else if (permissionID == "camera") {
    return judgeIosPermissionCamera();
  } else if (permissionID == "photoLibrary") {
    return judgeIosPermissionPhotoLibrary();
  } else if (permissionID == "record") {
    return judgeIosPermissionRecord();
  } else if (permissionID == "push") {
    return judgeIosPermissionPush();
  } else if (permissionID == "contact") {
    return judgeIosPermissionContact();
  } else if (permissionID == "calendar") {
    return judgeIosPermissionCalendar();
  } else if (permissionID == "memo") {
    return judgeIosPermissionMemo();
  }
  return false;
}

// 跳转到**应用**的权限页面
function gotoAppPermissionSetting() {
  if (isIos) {
    var UIApplication = plus.ios.import("UIApplication");
    var application2 = UIApplication.sharedApplication();
    var NSURL2 = plus.ios.import("NSURL");
    // var setting2 = NSURL2.URLWithString("prefs:root=LOCATION_SERVICES");		
    var setting2 = NSURL2.URLWithString("app-settings:");
    application2.openURL(setting2);
    plus.ios.deleteObject(setting2);
    plus.ios.deleteObject(NSURL2);
    plus.ios.deleteObject(application2);
  } else {
    // console.log(plus.device.vendor);
    var Intent = plus.android.importClass("android.content.Intent");
    var Settings = plus.android.importClass("android.provider.Settings");
    var Uri = plus.android.importClass("android.net.Uri");
    var mainActivity = plus.android.runtimeMainActivity();
    var intent = new Intent();
    intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
    var uri = Uri.fromParts("package", mainActivity.getPackageName(), null);
    intent.setData(uri);
    mainActivity.startActivity(intent);
  }
}

// 检查系统的设备服务是否开启
// var checkSystemEnableLocation = async function () {
function checkSystemEnableLocation() {
  if (isIos) {
    var result = false;
    var cllocationManger = plus.ios.import("CLLocationManager");
    var result = cllocationManger.locationServicesEnabled();
    console.log("系统定位开启:" + result);
    plus.ios.deleteObject(cllocationManger);
    return result;
  } else {
    var context = plus.android.importClass("android.content.Context");
    var locationManager = plus.android.importClass("android.location.LocationManager");
    var main = plus.android.runtimeMainActivity();
    var mainSvr = main.getSystemService(context.LOCATION_SERVICE);
    var result = mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER);
    console.log("系统定位开启:" + result);
    return result;
  }
}
module.exports = {
  judgeIosPermission: judgeIosPermission,
  requestAndroidPermission: requestAndroidPermission,
  checkSystemEnableLocation: checkSystemEnableLocation,
  gotoAppPermissionSetting: gotoAppPermissionSetting
};

/***/ }),

/***/ 18:
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toConsumableArray.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(/*! ./arrayWithoutHoles.js */ 19);
var iterableToArray = __webpack_require__(/*! ./iterableToArray.js */ 20);
var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray.js */ 8);
var nonIterableSpread = __webpack_require__(/*! ./nonIterableSpread.js */ 21);
function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}
module.exports = _toConsumableArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 19:
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray.js */ 9);
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}
module.exports = _arrayWithoutHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 2:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, global) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createApp = createApp;
exports.createComponent = createComponent;
exports.createPage = createPage;
exports.createPlugin = createPlugin;
exports.createSubpackageApp = createSubpackageApp;
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 5));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _construct2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/construct */ 15));
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 18));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 22);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var realAtob;
var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
if (typeof atob !== 'function') {
  realAtob = function realAtob(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, '');
    if (!b64re.test(str)) {
      throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
    }

    // Adding the padding if missing, for semplicity
    str += '=='.slice(2 - (str.length & 3));
    var bitmap;
    var result = '';
    var r1;
    var r2;
    var i = 0;
    for (; i < str.length;) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 | (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));
      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) : r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) : String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  // 注意atob只能在全局对象上调用，例如：`const Base64 = {atob};Base64.atob('xxxx')`是错误的用法
  realAtob = atob;
}
function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}
function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0
    };
  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}
function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {
    var _getCurrentUserInfo = getCurrentUserInfo(),
      role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {
    var _getCurrentUserInfo2 = getCurrentUserInfo(),
      permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {
    var _getCurrentUserInfo3 = getCurrentUserInfo(),
      tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}
var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;
function isFn(fn) {
  return typeof fn === 'function';
}
function isStr(str) {
  return typeof str === 'string';
}
function isObject(obj) {
  return obj !== null && (0, _typeof2.default)(obj) === 'object';
}
function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}
function noop() {}

/**
 * Create a cached version of a pure function.
 */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
});
function sortObject(obj) {
  var sortObj = {};
  if (isPlainObject(obj)) {
    Object.keys(obj).sort().forEach(function (key) {
      sortObj[key] = obj[key];
    });
  }
  return !Object.keys(sortObj) ? obj : sortObj;
}
var HOOKS = ['invoke', 'success', 'fail', 'complete', 'returnValue'];
var globalInterceptors = {};
var scopedInterceptors = {};
function mergeHook(parentVal, childVal) {
  var res = childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}
function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}
function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}
function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}
function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}
function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}
function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}
function wrapperHook(hook, params) {
  return function (data) {
    return hook(data, params) || data;
  };
}
function isPromise(obj) {
  return !!obj && ((0, _typeof2.default)(obj) === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}
function queue(hooks, data, params) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook, params));
    } else {
      var res = hook(data, params);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {}
        };
      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    }
  };
}
function wrapperOptions(interceptor) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res, options).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}
function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, (0, _toConsumableArray2.default)(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, (0, _toConsumableArray2.default)(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}
function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}
function invokeApi(method, api, options) {
  for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    params[_key - 3] = arguments[_key];
  }
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        // 重新访问 getApiInterceptorHooks, 允许 invoke 中再次调用 addInterceptor,removeInterceptor
        return api.apply(void 0, [wrapperOptions(getApiInterceptorHooks(method), options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}
var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return new Promise(function (resolve, reject) {
      res.then(function (res) {
        if (res[0]) {
          reject(res[0]);
        } else {
          resolve(res[1]);
        }
      });
    });
  }
};
var SYNC_API_RE = /^\$|Window$|WindowStyle$|sendHostEvent|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getLocale|setLocale|invokePushCallback|getWindowInfo|getDeviceInfo|getAppBaseInfo|getSystemSetting|getAppAuthorizeSetting|initUTS|requireUTS|registerUTS/;
var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection', 'createPushMessage'];
var CALLBACK_API_RE = /^on|^off/;
function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}
function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}
function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).catch(function (err) {
    return [err];
  });
}
function shouldPromise(name) {
  if (isContextApi(name) || isSyncApi(name) || isCallbackApi(name)) {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(function (value) {
      return promise.resolve(callback()).then(function () {
        return value;
      });
    }, function (reason) {
      return promise.resolve(callback()).then(function () {
        throw reason;
      });
    });
  };
}
function promisify(name, api) {
  if (!shouldPromise(name) || !isFn(api)) {
    return api;
  }
  return function promiseApi() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      params[_key2 - 1] = arguments[_key2];
    }
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject
      })].concat(params));
    })));
  };
}
var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;
function checkDeviceWidth() {
  var _wx$getSystemInfoSync = wx.getSystemInfoSync(),
    platform = _wx$getSystemInfoSync.platform,
    pixelRatio = _wx$getSystemInfoSync.pixelRatio,
    windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}
function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }
  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}
var LOCALE_ZH_HANS = 'zh-Hans';
var LOCALE_ZH_HANT = 'zh-Hant';
var LOCALE_EN = 'en';
var LOCALE_FR = 'fr';
var LOCALE_ES = 'es';
var messages = {};
var locale;
{
  locale = normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN;
}
function initI18nMessages() {
  if (!isEnableLocale()) {
    return;
  }
  var localeKeys = Object.keys(__uniConfig.locales);
  if (localeKeys.length) {
    localeKeys.forEach(function (locale) {
      var curMessages = messages[locale];
      var userMessages = __uniConfig.locales[locale];
      if (curMessages) {
        Object.assign(curMessages, userMessages);
      } else {
        messages[locale] = userMessages;
      }
    });
  }
}
initI18nMessages();
var i18n = (0, _uniI18n.initVueI18n)(locale, {});
var t = i18n.t;
var i18nMixin = i18n.mixin = {
  beforeCreate: function beforeCreate() {
    var _this = this;
    var unwatch = i18n.i18n.watchLocale(function () {
      _this.$forceUpdate();
    });
    this.$once('hook:beforeDestroy', function () {
      unwatch();
    });
  },
  methods: {
    $$t: function $$t(key, values) {
      return t(key, values);
    }
  }
};
var setLocale = i18n.setLocale;
var getLocale = i18n.getLocale;
function initAppLocale(Vue, appVm, locale) {
  var state = Vue.observable({
    locale: locale || i18n.getLocale()
  });
  var localeWatchers = [];
  appVm.$watchLocale = function (fn) {
    localeWatchers.push(fn);
  };
  Object.defineProperty(appVm, '$locale', {
    get: function get() {
      return state.locale;
    },
    set: function set(v) {
      state.locale = v;
      localeWatchers.forEach(function (watch) {
        return watch(v);
      });
    }
  });
}
function isEnableLocale() {
  return typeof __uniConfig !== 'undefined' && __uniConfig.locales && !!Object.keys(__uniConfig.locales).length;
}
function include(str, parts) {
  return !!parts.find(function (part) {
    return str.indexOf(part) !== -1;
  });
}
function startsWith(str, parts) {
  return parts.find(function (part) {
    return str.indexOf(part) === 0;
  });
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === 'chinese') {
    // 支付宝
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}
// export function initI18n() {
//   const localeKeys = Object.keys(__uniConfig.locales || {})
//   if (localeKeys.length) {
//     localeKeys.forEach((locale) =>
//       i18n.add(locale, __uniConfig.locales[locale])
//     )
//   }
// }

function getLocale$1() {
  // 优先使用 $locale
  if (isFn(getApp)) {
    var app = getApp({
      allowDefault: true
    });
    if (app && app.$vm) {
      return app.$vm.$locale;
    }
  }
  return normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN;
}
function setLocale$1(locale) {
  var app = isFn(getApp) ? getApp() : false;
  if (!app) {
    return false;
  }
  var oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach(function (fn) {
      return fn({
        locale: locale
      });
    });
    return true;
  }
  return false;
}
var onLocaleChangeCallbacks = [];
function onLocaleChange(fn) {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
}
if (typeof global !== 'undefined') {
  global.getLocale = getLocale$1;
}
var interceptors = {
  promiseInterceptor: promiseInterceptor
};
var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  getLocale: getLocale$1,
  setLocale: setLocale$1,
  onLocaleChange: onLocaleChange,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors
});
function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}
var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  }
};
var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(function (item, index) {
        return index < currentIndex ? item !== urls[currentIndex] : true;
      });
    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false
    };
  }
};
var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function useDeviceId(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId
    });
  }
  result.deviceId = deviceId;
}
function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.screenHeight - safeArea.bottom
    };
  }
}
function populateParameters(result) {
  var _result$brand = result.brand,
    brand = _result$brand === void 0 ? '' : _result$brand,
    _result$model = result.model,
    model = _result$model === void 0 ? '' : _result$model,
    _result$system = result.system,
    system = _result$system === void 0 ? '' : _result$system,
    _result$language = result.language,
    language = _result$language === void 0 ? '' : _result$language,
    theme = result.theme,
    version = result.version,
    platform = result.platform,
    fontSizeSetting = result.fontSizeSetting,
    SDKVersion = result.SDKVersion,
    pixelRatio = result.pixelRatio,
    deviceOrientation = result.deviceOrientation;
  // const isQuickApp = "mp-weixin".indexOf('quickapp-webview') !== -1

  var extraParam = {};

  // osName osVersion
  var osName = '';
  var osVersion = '';
  {
    osName = system.split(' ')[0] || '';
    osVersion = system.split(' ')[1] || '';
  }
  var hostVersion = version;

  // deviceType
  var deviceType = getGetDeviceType(result, model);

  // deviceModel
  var deviceBrand = getDeviceBrand(brand);

  // hostName
  var _hostName = getHostName(result);

  // deviceOrientation
  var _deviceOrientation = deviceOrientation; // 仅 微信 百度 支持

  // devicePixelRatio
  var _devicePixelRatio = pixelRatio;

  // SDKVersion
  var _SDKVersion = SDKVersion;

  // hostLanguage
  var hostLanguage = language.replace(/_/g, '-');

  // wx.getAccountInfoSync

  var parameters = {
    appId: "__UNI__ED807EA",
    appName: "lilishop",
    appVersion: "4.5.3",
    appVersionCode: "4000503",
    appLanguage: getAppLanguage(hostLanguage),
    uniCompileVersion: "4.29",
    uniRuntimeVersion: "4.29",
    uniPlatform: undefined || "mp-weixin",
    deviceBrand: deviceBrand,
    deviceModel: model,
    deviceType: deviceType,
    devicePixelRatio: _devicePixelRatio,
    deviceOrientation: _deviceOrientation,
    osName: osName.toLocaleLowerCase(),
    osVersion: osVersion,
    hostTheme: theme,
    hostVersion: hostVersion,
    hostLanguage: hostLanguage,
    hostName: _hostName,
    hostSDKVersion: _SDKVersion,
    hostFontSizeSetting: fontSizeSetting,
    windowTop: 0,
    windowBottom: 0,
    // TODO
    osLanguage: undefined,
    osTheme: undefined,
    ua: undefined,
    hostPackageName: undefined,
    browserName: undefined,
    browserVersion: undefined
  };
  Object.assign(result, parameters, extraParam);
}
function getGetDeviceType(result, model) {
  var deviceType = result.deviceType || 'phone';
  {
    var deviceTypeMaps = {
      ipad: 'pad',
      windows: 'pc',
      mac: 'pc'
    };
    var deviceTypeMapsKeys = Object.keys(deviceTypeMaps);
    var _model = model.toLocaleLowerCase();
    for (var index = 0; index < deviceTypeMapsKeys.length; index++) {
      var _m = deviceTypeMapsKeys[index];
      if (_model.indexOf(_m) !== -1) {
        deviceType = deviceTypeMaps[_m];
        break;
      }
    }
  }
  return deviceType;
}
function getDeviceBrand(brand) {
  var deviceBrand = brand;
  if (deviceBrand) {
    deviceBrand = brand.toLocaleLowerCase();
  }
  return deviceBrand;
}
function getAppLanguage(defaultLanguage) {
  return getLocale$1 ? getLocale$1() : defaultLanguage;
}
function getHostName(result) {
  var _platform = 'WeChat';
  var _hostName = result.hostName || _platform; // mp-jd
  {
    if (result.environment) {
      _hostName = result.environment;
    } else if (result.host && result.host.env) {
      _hostName = result.host.env;
    }
  }
  return _hostName;
}
var getSystemInfo = {
  returnValue: function returnValue(result) {
    useDeviceId(result);
    addSafeAreaInsets(result);
    populateParameters(result);
  }
};
var showActionSheet = {
  args: function args(fromArgs) {
    if ((0, _typeof2.default)(fromArgs) === 'object') {
      fromArgs.alertText = fromArgs.title;
    }
  }
};
var getAppBaseInfo = {
  returnValue: function returnValue(result) {
    var _result = result,
      version = _result.version,
      language = _result.language,
      SDKVersion = _result.SDKVersion,
      theme = _result.theme;
    var _hostName = getHostName(result);
    var hostLanguage = language.replace('_', '-');
    result = sortObject(Object.assign(result, {
      appId: "__UNI__ED807EA",
      appName: "lilishop",
      appVersion: "4.5.3",
      appVersionCode: "4000503",
      appLanguage: getAppLanguage(hostLanguage),
      hostVersion: version,
      hostLanguage: hostLanguage,
      hostName: _hostName,
      hostSDKVersion: SDKVersion,
      hostTheme: theme
    }));
  }
};
var getDeviceInfo = {
  returnValue: function returnValue(result) {
    var _result2 = result,
      brand = _result2.brand,
      model = _result2.model;
    var deviceType = getGetDeviceType(result, model);
    var deviceBrand = getDeviceBrand(brand);
    useDeviceId(result);
    result = sortObject(Object.assign(result, {
      deviceType: deviceType,
      deviceBrand: deviceBrand,
      deviceModel: model
    }));
  }
};
var getWindowInfo = {
  returnValue: function returnValue(result) {
    addSafeAreaInsets(result);
    result = sortObject(Object.assign(result, {
      windowTop: 0,
      windowBottom: 0
    }));
  }
};
var getAppAuthorizeSetting = {
  returnValue: function returnValue(result) {
    var locationReducedAccuracy = result.locationReducedAccuracy;
    result.locationAccuracy = 'unsupported';
    if (locationReducedAccuracy === true) {
      result.locationAccuracy = 'reduced';
    } else if (locationReducedAccuracy === false) {
      result.locationAccuracy = 'full';
    }
  }
};

// import navigateTo from 'uni-helpers/navigate-to'

var compressImage = {
  args: function args(fromArgs) {
    // https://developers.weixin.qq.com/community/develop/doc/000c08940c865011298e0a43256800?highLine=compressHeight
    if (fromArgs.compressedHeight && !fromArgs.compressHeight) {
      fromArgs.compressHeight = fromArgs.compressedHeight;
    }
    if (fromArgs.compressedWidth && !fromArgs.compressWidth) {
      fromArgs.compressWidth = fromArgs.compressedWidth;
    }
  }
};
var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo,
  showActionSheet: showActionSheet,
  getAppBaseInfo: getAppBaseInfo,
  getDeviceInfo: getDeviceInfo,
  getWindowInfo: getWindowInfo,
  getAppAuthorizeSetting: getAppAuthorizeSetting,
  compressImage: compressImage
};
var todos = ['vibrate', 'preloadPage', 'unPreloadPage', 'loadSubPackage'];
var canIUses = [];
var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];
function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}
function processArgs(methodName, fromArgs) {
  var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {
    // 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {
          // 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {
          // 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {
          // {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}
function processReturnValue(methodName, res, returnValue) {
  var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {
    // 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}
function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {
      // 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {
      // 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }
      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);
      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {
        // 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}
var todoApis = Object.create(null);
var TODOS = ['onTabBarMidButtonTap', 'subscribePush', 'unsubscribePush', 'onPush', 'offPush', 'share'];
function createTodoApi(name) {
  return function todoApi(_ref) {
    var fail = _ref.fail,
      complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported")
    };
    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}
TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});
var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin']
};
function getProvider(_ref2) {
  var service = _ref2.service,
    success = _ref2.success,
    fail = _ref2.fail,
    complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service]
    };
    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found'
    };
    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}
var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider
});
var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();
function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}
function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}
var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit
});

/**
 * 框架内 try-catch
 */
/**
 * 开发者 try-catch
 */
function tryCatch(fn) {
  return function () {
    try {
      return fn.apply(fn, arguments);
    } catch (e) {
      // TODO
      console.error(e);
    }
  };
}
function getApiCallbacks(params) {
  var apiCallbacks = {};
  for (var name in params) {
    var param = params[name];
    if (isFn(param)) {
      apiCallbacks[name] = tryCatch(param);
      delete params[name];
    }
  }
  return apiCallbacks;
}
var cid;
var cidErrMsg;
var enabled;
function normalizePushMessage(message) {
  try {
    return JSON.parse(message);
  } catch (e) {}
  return message;
}
function invokePushCallback(args) {
  if (args.type === 'enabled') {
    enabled = true;
  } else if (args.type === 'clientId') {
    cid = args.cid;
    cidErrMsg = args.errMsg;
    invokeGetPushCidCallbacks(cid, args.errMsg);
  } else if (args.type === 'pushMsg') {
    var message = {
      type: 'receive',
      data: normalizePushMessage(args.message)
    };
    for (var i = 0; i < onPushMessageCallbacks.length; i++) {
      var callback = onPushMessageCallbacks[i];
      callback(message);
      // 该消息已被阻止
      if (message.stopped) {
        break;
      }
    }
  } else if (args.type === 'click') {
    onPushMessageCallbacks.forEach(function (callback) {
      callback({
        type: 'click',
        data: normalizePushMessage(args.message)
      });
    });
  }
}
var getPushCidCallbacks = [];
function invokeGetPushCidCallbacks(cid, errMsg) {
  getPushCidCallbacks.forEach(function (callback) {
    callback(cid, errMsg);
  });
  getPushCidCallbacks.length = 0;
}
function getPushClientId(args) {
  if (!isPlainObject(args)) {
    args = {};
  }
  var _getApiCallbacks = getApiCallbacks(args),
    success = _getApiCallbacks.success,
    fail = _getApiCallbacks.fail,
    complete = _getApiCallbacks.complete;
  var hasSuccess = isFn(success);
  var hasFail = isFn(fail);
  var hasComplete = isFn(complete);
  Promise.resolve().then(function () {
    if (typeof enabled === 'undefined') {
      enabled = false;
      cid = '';
      cidErrMsg = 'uniPush is not enabled';
    }
    getPushCidCallbacks.push(function (cid, errMsg) {
      var res;
      if (cid) {
        res = {
          errMsg: 'getPushClientId:ok',
          cid: cid
        };
        hasSuccess && success(res);
      } else {
        res = {
          errMsg: 'getPushClientId:fail' + (errMsg ? ' ' + errMsg : '')
        };
        hasFail && fail(res);
      }
      hasComplete && complete(res);
    });
    if (typeof cid !== 'undefined') {
      invokeGetPushCidCallbacks(cid, cidErrMsg);
    }
  });
}
var onPushMessageCallbacks = [];
// 不使用 defineOnApi 实现，是因为 defineOnApi 依赖 UniServiceJSBridge ，该对象目前在小程序上未提供，故简单实现
var onPushMessage = function onPushMessage(fn) {
  if (onPushMessageCallbacks.indexOf(fn) === -1) {
    onPushMessageCallbacks.push(fn);
  }
};
var offPushMessage = function offPushMessage(fn) {
  if (!fn) {
    onPushMessageCallbacks.length = 0;
  } else {
    var index = onPushMessageCallbacks.indexOf(fn);
    if (index > -1) {
      onPushMessageCallbacks.splice(index, 1);
    }
  }
};
var baseInfo = wx.getAppBaseInfo && wx.getAppBaseInfo();
if (!baseInfo) {
  baseInfo = wx.getSystemInfoSync();
}
var host = baseInfo ? baseInfo.host : null;
var shareVideoMessage = host && host.env === 'SAAASDK' ? wx.miniapp.shareVideoMessage : wx.shareVideoMessage;
var api = /*#__PURE__*/Object.freeze({
  __proto__: null,
  shareVideoMessage: shareVideoMessage,
  getPushClientId: getPushClientId,
  onPushMessage: onPushMessage,
  offPushMessage: offPushMessage,
  invokePushCallback: invokePushCallback
});
var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];
function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}
function initBehavior(options) {
  return Behavior(options);
}
function isPage() {
  return !!this.route;
}
function initRelation(detail) {
  this.triggerEvent('__l', detail);
}
function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector) || [];
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || toSkip(component);
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}
function syncRefs(refs, newRefs) {
  var oldKeys = (0, _construct2.default)(Set, (0, _toConsumableArray2.default)(Object.keys(refs)));
  var newKeys = Object.keys(newRefs);
  newKeys.forEach(function (key) {
    var oldValue = refs[key];
    var newValue = newRefs[key];
    if (Array.isArray(oldValue) && Array.isArray(newValue) && oldValue.length === newValue.length && newValue.every(function (value) {
      return oldValue.includes(value);
    })) {
      return;
    }
    refs[key] = newValue;
    oldKeys.delete(key);
  });
  oldKeys.forEach(function (key) {
    delete refs[key];
  });
  return refs;
}
function initRefs(vm) {
  var mpInstance = vm.$scope;
  var refs = {};
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for') || [];
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || toSkip(component));
      });
      return syncRefs(refs, $refs);
    }
  });
}
function handleLink(event) {
  var _ref3 = event.detail || event.value,
    vuePid = _ref3.vuePid,
    vueOptions = _ref3.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;
  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }
  if (!parentVm) {
    parentVm = this.$vm;
  }
  vueOptions.parent = parentVm;
}
function markMPComponent(component) {
  // 在 Vue 中标记为小程序组件
  var IS_MP = '__v_isMPComponent';
  Object.defineProperty(component, IS_MP, {
    configurable: true,
    enumerable: false,
    value: true
  });
  return component;
}
function toSkip(obj) {
  var OB = '__ob__';
  var SKIP = '__v_skip';
  if (isObject(obj) && Object.isExtensible(obj)) {
    // 避免被 @vue/composition-api 观测
    Object.defineProperty(obj, OB, {
      configurable: true,
      enumerable: false,
      value: (0, _defineProperty2.default)({}, SKIP, true)
    });
  }
  return obj;
}
var WORKLET_RE = /_(.*)_worklet_factory_/;
function initWorkletMethods(mpMethods, vueMethods) {
  if (vueMethods) {
    Object.keys(vueMethods).forEach(function (name) {
      var matches = name.match(WORKLET_RE);
      if (matches) {
        var workletName = matches[1];
        mpMethods[name] = vueMethods[name];
        mpMethods[workletName] = vueMethods[workletName];
      }
    });
  }
}
var MPPage = Page;
var MPComponent = Component;
var customizeRE = /:/g;
var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});
function initTriggerEvent(mpInstance) {
  var oldTriggerEvent = mpInstance.triggerEvent;
  var newTriggerEvent = function newTriggerEvent(event) {
    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }
    // 事件名统一转驼峰格式，仅处理：当前组件为 vue 组件、当前组件为 vue 组件子组件
    if (this.$vm || this.dataset && this.dataset.comType) {
      event = customize(event);
    } else {
      // 针对微信/QQ小程序单独补充驼峰格式事件，以兼容历史项目
      var newEvent = customize(event);
      if (newEvent !== event) {
        oldTriggerEvent.apply(this, [newEvent].concat(args));
      }
    }
    return oldTriggerEvent.apply(this, [event].concat(args));
  };
  try {
    // 京东小程序 triggerEvent 为只读
    mpInstance.triggerEvent = newTriggerEvent;
  } catch (error) {
    mpInstance._triggerEvent = newTriggerEvent;
  }
}
function initHook(name, options, isComponent) {
  var oldHook = options[name];
  options[name] = function () {
    markMPComponent(this);
    initTriggerEvent(this);
    if (oldHook) {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      return oldHook.apply(this, args);
    }
  };
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;
  Component = function Component() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}
var PAGE_EVENT_HOOKS = ['onPullDownRefresh', 'onReachBottom', 'onAddToFavorites', 'onShareTimeline', 'onShareAppMessage', 'onPageScroll', 'onResize', 'onTabItemTap'];
function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}
function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }
  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }
  vueOptions = vueOptions.default || vueOptions;
  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super && vueOptions.super.options && Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }
  if (isFn(vueOptions[hook]) || Array.isArray(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {
      return hasHook(hook, mixin);
    });
  }
}
function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}
function initUnknownHooks(mpOptions, vueOptions) {
  var excludes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  findHooks(vueOptions).forEach(function (hook) {
    return initHook$1(mpOptions, hook, excludes);
  });
}
function findHooks(vueOptions) {
  var hooks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  if (vueOptions) {
    Object.keys(vueOptions).forEach(function (name) {
      if (name.indexOf('on') === 0 && isFn(vueOptions[name])) {
        hooks.push(name);
      }
    });
  }
  return hooks;
}
function initHook$1(mpOptions, hook, excludes) {
  if (excludes.indexOf(hook) === -1 && !hasOwn(mpOptions, hook)) {
    mpOptions[hook] = function (args) {
      return this.$vm && this.$vm.__call_hook(hook, args);
    };
  }
}
function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}
function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}
function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;
  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}
function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};
  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"lilishop","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }
  if (!isPlainObject(data)) {
    data = {};
  }
  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });
  return data;
}
var PROP_TYPES = [String, Number, Boolean, Object, Array, null];
function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;
  var vueProps = vueOptions.props;
  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }
  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: ''
          };
          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: ''
          };
        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(initBehavior({
      properties: initProperties(vueExtends.props, true)
    }));
  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(initBehavior({
          properties: initProperties(vueMixin.props, true)
        }));
      }
    });
  }
  return behaviors;
}
function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}
function initProperties(props) {
  var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var options = arguments.length > 3 ? arguments[3] : undefined;
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: ''
    };
    {
      if (options.virtualHost) {
        properties.virtualHostStyle = {
          type: null,
          value: ''
        };
        properties.virtualHostClass = {
          type: null,
          value: ''
        };
      }
    }
    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: ''
    };
    properties.vueSlots = {
      // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots
        });
      }
    };
  }
  if (Array.isArray(props)) {
    // ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key)
      };
    });
  } else if (isPlainObject(props)) {
    // {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {
        // title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }
        opts.type = parsePropType(key, opts.type);
        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key)
        };
      } else {
        // content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key)
        };
      }
    });
  }
  return properties;
}
function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}
  event.stopPropagation = noop;
  event.preventDefault = noop;
  event.target = event.target || {};
  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }
  if (hasOwn(event, 'markerId')) {
    event.detail = (0, _typeof2.default)(event.detail) === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }
  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }
  return event;
}
function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {
      // ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];
      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }
      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }
      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}
function processEventExtra(vm, extra, event, __args__) {
  var extraObj = {};
  if (Array.isArray(extra) && extra.length) {
    /**
     *[
     *    ['data.items', 'data.id', item.data.id],
     *    ['metas', 'id', meta.id]
     *],
     *[
     *    ['data.items', 'data.id', item.data.id],
     *    ['metas', 'id', meta.id]
     *],
     *'test'
     */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {
          // model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {
            // $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            extraObj['$' + index] = event.detail ? event.detail.__args__ || __args__ : __args__;
          } else if (dataPath.indexOf('$event.') === 0) {
            // $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }
  return extraObj;
}
function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}
function processEventArgs(vm, event) {
  var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var isCustom = arguments.length > 4 ? arguments[4] : undefined;
  var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象

  // fixed 用户直接触发 mpInstance.triggerEvent
  var __args__ = isPlainObject(event.detail) ? event.detail.__args__ || [event.detail] : [event.detail];
  if (isCustom) {
    // 自定义事件
    isCustomMPEvent = event.currentTarget && event.currentTarget.dataset && event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {
      // 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return __args__;
    }
  }
  var extraObj = processEventExtra(vm, extra, event, __args__);
  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {
        // input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(__args__[0]);
        } else {
          // wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });
  return ret;
}
var ONCE = '~';
var CUSTOM = '^';
function isMatchEventType(eventType, optType) {
  return eventType === optType || optType === 'regionchange' && (eventType === 'begin' || eventType === 'end');
}
function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}
function handleEvent(event) {
  var _this2 = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;
  var ret = [];
  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];
    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;
    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this2.$vm;
          if (handlerCtx.$options.generic) {
            // mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx, processEventArgs(_this2.$vm, event, eventArray[1], eventArray[2], isCustom, methodName));
            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            var _type = _this2.$vm.mpType === 'page' ? 'Page' : 'Component';
            var path = _this2.route || _this2.is;
            throw new Error("".concat(_type, " \"").concat(path, "\" does not have a method \"").concat(methodName, "\""));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(_this2.$vm, event, eventArray[1], eventArray[2], isCustom, methodName);
          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });
  if (eventType === 'input' && ret.length === 1 && typeof ret[0] !== 'undefined') {
    return ret[0];
  }
}
var eventChannels = {};
function getEventChannel(id) {
  var eventChannel = eventChannels[id];
  delete eventChannels[id];
  return eventChannel;
}
var hooks = ['onShow', 'onHide', 'onError', 'onPageNotFound', 'onThemeChange', 'onUnhandledRejection'];
function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}
function initScopedSlotsParams() {
  var center = {};
  var parents = {};
  function currentId(fn) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      fn(vueId);
    }
  }
  _vue.default.prototype.$hasSSP = function (vueId) {
    var slot = center[vueId];
    if (!slot) {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
    return slot;
  };
  _vue.default.prototype.$getSSP = function (vueId, name, needAll) {
    var slot = center[vueId];
    if (slot) {
      var params = slot[name] || [];
      if (needAll) {
        return params;
      }
      return params[0];
    }
  };
  _vue.default.prototype.$setSSP = function (name, value) {
    var index = 0;
    currentId.call(this, function (vueId) {
      var slot = center[vueId];
      var params = slot[name] = slot[name] || [];
      params.push(value);
      index = params.length - 1;
    });
    return index;
  };
  _vue.default.prototype.$initSSP = function () {
    currentId.call(this, function (vueId) {
      center[vueId] = {};
    });
  };
  _vue.default.prototype.$callSSP = function () {
    currentId.call(this, function (vueId) {
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    });
  };
  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    }
  });
}
function parseBaseApp(vm, _ref4) {
  var mocks = _ref4.mocks,
    initRefs = _ref4.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);
  _vue.default.prototype.mpHost = "mp-weixin";
  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }
      this.mpType = this.$options.mpType;
      this.$mp = (0, _defineProperty2.default)({
        data: {}
      }, this.mpType, this.$options.mpInstance);
      this.$scope = this.$options.mpInstance;
      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {
        // hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    }
  });
  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {
        // 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {
          // 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }
      this.$vm = vm;
      this.$vm.$mp = {
        app: this
      };
      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;
      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);
      this.$vm.__call_hook('onLaunch', args);
    }
  };

  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }
  initAppLocale(_vue.default, vm, normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN);
  initHooks(appOptions, hooks);
  initUnknownHooks(appOptions, vm.$options);
  return appOptions;
}
function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs
  });
}
function createApp(vm) {
  App(parseApp(vm));
  return vm;
}
var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {
  return '%' + c.charCodeAt(0).toString(16);
};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {
  return encodeURIComponent(str).replace(encodeReserveRE, encodeReserveReplacer).replace(commaRE, ',');
};
function stringifyQuery(obj) {
  var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];
    if (val === undefined) {
      return '';
    }
    if (val === null) {
      return encodeStr(key);
    }
    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }
    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {
    return x.length > 0;
  }).join('&') : null;
  return res ? "?".concat(res) : '';
}
function parseBaseComponent(vueComponentOptions) {
  var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    isPage = _ref5.isPage,
    initRelation = _ref5.initRelation;
  var needVueOptions = arguments.length > 2 ? arguments[2] : undefined;
  var _initVueComponent = initVueComponent(_vue.default, vueComponentOptions),
    _initVueComponent2 = (0, _slicedToArray2.default)(_initVueComponent, 2),
    VueComponent = _initVueComponent2[0],
    vueOptions = _initVueComponent2[1];
  var options = _objectSpread({
    multipleSlots: true,
    // styleIsolation: 'apply-shared',
    addGlobalClass: true
  }, vueOptions.options || {});
  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }
  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file, options),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;
        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties
        };
        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options
        });

        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      }
    },
    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      }
    },
    methods: {
      __l: handleLink,
      __e: handleEvent
    }
  };
  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }
  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }
  if (needVueOptions) {
    return [componentOptions, vueOptions, VueComponent];
  }
  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}
function parseComponent(vueComponentOptions, needVueOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation
  }, needVueOptions);
}
var hooks$1 = ['onShow', 'onHide', 'onUnload'];
hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);
function parseBasePage(vuePageOptions) {
  var _parseComponent = parseComponent(vuePageOptions, true),
    _parseComponent2 = (0, _slicedToArray2.default)(_parseComponent, 2),
    pageOptions = _parseComponent2[0],
    vueOptions = _parseComponent2[1];
  initHooks(pageOptions.methods, hooks$1, vueOptions);
  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery)
    };
    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };
  {
    initUnknownHooks(pageOptions.methods, vuePageOptions, ['onReady']);
  }
  {
    initWorkletMethods(pageOptions.methods, vueOptions.methods);
  }
  return pageOptions;
}
function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions);
}
function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}
function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}
function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true
  });
  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {
      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}
function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {
      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {
      for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}
todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});
canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name : canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});
var uni = {};
if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    }
  });
} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });
  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, extraApi[name]);
    });
  }
  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });
  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });
  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}
wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;
var uni$1 = uni;
var _default = uni$1;
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 20:
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArray.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
module.exports = _iterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 21:
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableSpread.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableSpread, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 22:
/*!*************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-i18n/dist/uni-i18n.es.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, global) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LOCALE_ZH_HANT = exports.LOCALE_ZH_HANS = exports.LOCALE_FR = exports.LOCALE_ES = exports.LOCALE_EN = exports.I18n = exports.Formatter = void 0;
exports.compileI18nJsonStr = compileI18nJsonStr;
exports.hasI18nJson = hasI18nJson;
exports.initVueI18n = initVueI18n;
exports.isI18nStr = isI18nStr;
exports.isString = void 0;
exports.normalizeLocale = normalizeLocale;
exports.parseI18nJson = parseI18nJson;
exports.resolveLocale = resolveLocale;
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 5));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ 23));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ 24));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
var isObject = function isObject(val) {
  return val !== null && (0, _typeof2.default)(val) === 'object';
};
var defaultDelimiters = ['{', '}'];
var BaseFormatter = /*#__PURE__*/function () {
  function BaseFormatter() {
    (0, _classCallCheck2.default)(this, BaseFormatter);
    this._caches = Object.create(null);
  }
  (0, _createClass2.default)(BaseFormatter, [{
    key: "interpolate",
    value: function interpolate(message, values) {
      var delimiters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultDelimiters;
      if (!values) {
        return [message];
      }
      var tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    }
  }]);
  return BaseFormatter;
}();
exports.Formatter = BaseFormatter;
var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format, _ref) {
  var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
    startDelimiter = _ref2[0],
    endDelimiter = _ref2[1];
  var tokens = [];
  var position = 0;
  var text = '';
  while (position < format.length) {
    var char = format[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({
          type: 'text',
          value: text
        });
      }
      text = '';
      var sub = '';
      char = format[position++];
      while (char !== undefined && char !== endDelimiter) {
        sub += char;
        char = format[position++];
      }
      var isClosed = char === endDelimiter;
      var type = RE_TOKEN_LIST_VALUE.test(sub) ? 'list' : isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ? 'named' : 'unknown';
      tokens.push({
        value: sub,
        type: type
      });
    }
    //  else if (char === '%') {
    //   // when found rails i18n syntax, skip text capture
    //   if (format[position] !== '{') {
    //     text += char
    //   }
    // }
    else {
      text += char;
    }
  }
  text && tokens.push({
    type: 'text',
    value: text
  });
  return tokens;
}
function compile(tokens, values) {
  var compiled = [];
  var index = 0;
  var mode = Array.isArray(values) ? 'list' : isObject(values) ? 'named' : 'unknown';
  if (mode === 'unknown') {
    return compiled;
  }
  while (index < tokens.length) {
    var token = tokens[index];
    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break;
      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case 'named':
        if (mode === 'named') {
          compiled.push(values[token.value]);
        } else {
          if (true) {
            console.warn("Type of token '".concat(token.type, "' and format of value '").concat(mode, "' don't match!"));
          }
        }
        break;
      case 'unknown':
        if (true) {
          console.warn("Detect 'unknown' type of token!");
        }
        break;
    }
    index++;
  }
  return compiled;
}
var LOCALE_ZH_HANS = 'zh-Hans';
exports.LOCALE_ZH_HANS = LOCALE_ZH_HANS;
var LOCALE_ZH_HANT = 'zh-Hant';
exports.LOCALE_ZH_HANT = LOCALE_ZH_HANT;
var LOCALE_EN = 'en';
exports.LOCALE_EN = LOCALE_EN;
var LOCALE_FR = 'fr';
exports.LOCALE_FR = LOCALE_FR;
var LOCALE_ES = 'es';
exports.LOCALE_ES = LOCALE_ES;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = function hasOwn(val, key) {
  return hasOwnProperty.call(val, key);
};
var defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find(function (part) {
    return str.indexOf(part) !== -1;
  });
}
function startsWith(str, parts) {
  return parts.find(function (part) {
    return str.indexOf(part) === 0;
  });
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === 'chinese') {
    // 支付宝
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var locales = [LOCALE_EN, LOCALE_FR, LOCALE_ES];
  if (messages && Object.keys(messages).length > 0) {
    locales = Object.keys(messages);
  }
  var lang = startsWith(locale, locales);
  if (lang) {
    return lang;
  }
}
var I18n = /*#__PURE__*/function () {
  function I18n(_ref3) {
    var locale = _ref3.locale,
      fallbackLocale = _ref3.fallbackLocale,
      messages = _ref3.messages,
      watcher = _ref3.watcher,
      formater = _ref3.formater;
    (0, _classCallCheck2.default)(this, I18n);
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }
  (0, _createClass2.default)(I18n, [{
    key: "setLocale",
    value: function setLocale(locale) {
      var _this = this;
      var oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        // 可能初始化时不存在
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      // 仅发生变化时，通知
      if (oldLocale !== this.locale) {
        this.watchers.forEach(function (watcher) {
          watcher(_this.locale, oldLocale);
        });
      }
    }
  }, {
    key: "getLocale",
    value: function getLocale() {
      return this.locale;
    }
  }, {
    key: "watchLocale",
    value: function watchLocale(fn) {
      var _this2 = this;
      var index = this.watchers.push(fn) - 1;
      return function () {
        _this2.watchers.splice(index, 1);
      };
    }
  }, {
    key: "add",
    value: function add(locale, message) {
      var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else {
          Object.keys(message).forEach(function (key) {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else {
        this.messages[locale] = message;
      }
    }
  }, {
    key: "f",
    value: function f(message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join('');
    }
  }, {
    key: "t",
    value: function t(key, locale, values) {
      var message = this.message;
      if (typeof locale === 'string') {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn("Cannot translate the value of keypath ".concat(key, ". Use the value of keypath as default."));
        return key;
      }
      return this.formater.interpolate(message[key], values).join('');
    }
  }]);
  return I18n;
}();
exports.I18n = I18n;
function watchAppLocale(appVm, i18n) {
  // 需要保证 watch 的触发在组件渲染之前
  if (appVm.$watchLocale) {
    // vue2
    appVm.$watchLocale(function (newLocale) {
      i18n.setLocale(newLocale);
    });
  } else {
    appVm.$watch(function () {
      return appVm.$locale;
    }, function (newLocale) {
      i18n.setLocale(newLocale);
    });
  }
}
function getDefaultLocale() {
  if (typeof uni !== 'undefined' && uni.getLocale) {
    return uni.getLocale();
  }
  // 小程序平台，uni 和 uni-i18n 互相引用，导致访问不到 uni，故在 global 上挂了 getLocale
  if (typeof global !== 'undefined' && global.getLocale) {
    return global.getLocale();
  }
  return LOCALE_EN;
}
function initVueI18n(locale) {
  var messages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var fallbackLocale = arguments.length > 2 ? arguments[2] : undefined;
  var watcher = arguments.length > 3 ? arguments[3] : undefined;
  // 兼容旧版本入参
  if (typeof locale !== 'string') {
    var _ref4 = [messages, locale];
    locale = _ref4[0];
    messages = _ref4[1];
  }
  if (typeof locale !== 'string') {
    // 因为小程序平台，uni-i18n 和 uni 互相引用，导致此时访问 uni 时，为 undefined
    locale = getDefaultLocale();
  }
  if (typeof fallbackLocale !== 'string') {
    fallbackLocale = typeof __uniConfig !== 'undefined' && __uniConfig.fallbackLocale || LOCALE_EN;
  }
  var i18n = new I18n({
    locale: locale,
    fallbackLocale: fallbackLocale,
    messages: messages,
    watcher: watcher
  });
  var _t = function t(key, values) {
    if (typeof getApp !== 'function') {
      // app view
      /* eslint-disable no-func-assign */
      _t = function t(key, values) {
        return i18n.t(key, values);
      };
    } else {
      var isWatchedAppLocale = false;
      _t = function t(key, values) {
        var appVm = getApp().$vm;
        // 可能$vm还不存在，比如在支付宝小程序中，组件定义较早，在props的default里使用了t()函数（如uni-goods-nav），此时app还未初始化
        // options: {
        // 	type: Array,
        // 	default () {
        // 		return [{
        // 			icon: 'shop',
        // 			text: t("uni-goods-nav.options.shop"),
        // 		}, {
        // 			icon: 'cart',
        // 			text: t("uni-goods-nav.options.cart")
        // 		}]
        // 	}
        // },
        if (appVm) {
          // 触发响应式
          appVm.$locale;
          if (!isWatchedAppLocale) {
            isWatchedAppLocale = true;
            watchAppLocale(appVm, i18n);
          }
        }
        return i18n.t(key, values);
      };
    }
    return _t(key, values);
  };
  return {
    i18n: i18n,
    f: function f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t: function t(key, values) {
      return _t(key, values);
    },
    add: function add(locale, message) {
      var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return i18n.add(locale, message, override);
    },
    watch: function watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale: function getLocale() {
      return i18n.getLocale();
    },
    setLocale: function setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    }
  };
}
var isString = function isString(val) {
  return typeof val === 'string';
};
exports.isString = isString;
var formater;
function hasI18nJson(jsonObj, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  return walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        return true;
      }
    } else {
      return hasI18nJson(value, delimiters);
    }
  });
}
function parseI18nJson(jsonObj, values, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        jsonObj[key] = compileStr(value, values, delimiters);
      }
    } else {
      parseI18nJson(value, values, delimiters);
    }
  });
  return jsonObj;
}
function compileI18nJsonStr(jsonStr, _ref5) {
  var locale = _ref5.locale,
    locales = _ref5.locales,
    delimiters = _ref5.delimiters;
  if (!isI18nStr(jsonStr, delimiters)) {
    return jsonStr;
  }
  if (!formater) {
    formater = new BaseFormatter();
  }
  var localeValues = [];
  Object.keys(locales).forEach(function (name) {
    if (name !== locale) {
      localeValues.push({
        locale: name,
        values: locales[name]
      });
    }
  });
  localeValues.unshift({
    locale: locale,
    values: locales[locale]
  });
  try {
    return JSON.stringify(compileJsonObj(JSON.parse(jsonStr), localeValues, delimiters), null, 2);
  } catch (e) {}
  return jsonStr;
}
function isI18nStr(value, delimiters) {
  return value.indexOf(delimiters[0]) > -1;
}
function compileStr(value, values, delimiters) {
  return formater.interpolate(value, values, delimiters).join('');
}
function compileValue(jsonObj, key, localeValues, delimiters) {
  var value = jsonObj[key];
  if (isString(value)) {
    // 存在国际化
    if (isI18nStr(value, delimiters)) {
      jsonObj[key] = compileStr(value, localeValues[0].values, delimiters);
      if (localeValues.length > 1) {
        // 格式化国际化语言
        var valueLocales = jsonObj[key + 'Locales'] = {};
        localeValues.forEach(function (localValue) {
          valueLocales[localValue.locale] = compileStr(value, localValue.values, delimiters);
        });
      }
    }
  } else {
    compileJsonObj(value, localeValues, delimiters);
  }
}
function compileJsonObj(jsonObj, localeValues, delimiters) {
  walkJsonObj(jsonObj, function (jsonObj, key) {
    compileValue(jsonObj, key, localeValues, delimiters);
  });
  return jsonObj;
}
function walkJsonObj(jsonObj, walk) {
  if (Array.isArray(jsonObj)) {
    for (var i = 0; i < jsonObj.length; i++) {
      if (walk(jsonObj, i)) {
        return true;
      }
    }
  } else if (isObject(jsonObj)) {
    for (var key in jsonObj) {
      if (walk(jsonObj, key)) {
        return true;
      }
    }
  }
  return false;
}
function resolveLocale(locales) {
  return function (locale) {
    if (!locale) {
      return locale;
    }
    locale = normalizeLocale(locale) || locale;
    return resolveLocaleChain(locale).find(function (locale) {
      return locales.indexOf(locale) > -1;
    });
  };
}
function resolveLocaleChain(locale) {
  var chain = [];
  var tokens = locale.split('-');
  while (tokens.length) {
    chain.push(tokens.join('-'));
    tokens.pop();
  }
  return chain;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 23:
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
module.exports = _classCallCheck, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 24:
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/createClass.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toPropertyKey = __webpack_require__(/*! ./toPropertyKey.js */ 12);
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
module.exports = _createClass, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 25:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2023 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue &&
    !value.__v_isMPComponent
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu' || vm.mpHost === 'mp-kuaishou' || vm.mpHost === 'mp-xhs'){//百度、快手、小红书 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
var NULLTYPE = '[object Null]';
var UNDEFINEDTYPE = '[object Undefined]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function nullOrUndefined(currentType, preType) {
    if(
        (currentType === NULLTYPE || currentType === UNDEFINEDTYPE) && 
        (preType === NULLTYPE || preType === UNDEFINEDTYPE)
    ) {
        return false
    }
    return true
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue !== pre[key] && nullOrUndefined(currentType, preType)) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"lilishop","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"lilishop","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"lilishop","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function clearInstance(key, value) {
  // 简易去除 Vue 和小程序组件实例
  if (value) {
    if (value._isVue || value.__v_isMPComponent) {
      return {}
    }
  }
  return value
}

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret, clearInstance))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"lilishop","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      var triggerEvent = this.$scope['_triggerEvent'] || this.$scope['triggerEvent'];
      if (triggerEvent) {
        try {
          triggerEvent.call(this.$scope, event, {
            __args__: toArray(arguments, 1)
          });
        } catch (error) {

        }
      }
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    'onUploadDouyinVideo',
    'onNFCReadMessage',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 26:
/*!**********************************************!*\
  !*** D:/Desktop/code/ending/shop/pages.json ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 30:
/*!************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/@babel/runtime/regenerator/index.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// TODO(Babel 8): Remove this file.

var runtime = __webpack_require__(/*! @babel/runtime/helpers/regeneratorRuntime */ 31)();
module.exports = runtime;

/***/ }),

/***/ 309:
/*!**************************************************!*\
  !*** D:/Desktop/code/ending/shop/api/address.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addAddress = addAddress;
exports.deleteAddress = deleteAddress;
exports.editAddress = editAddress;
exports.getAddressCode = getAddressCode;
exports.getAddressDefault = getAddressDefault;
exports.getAddressDetail = getAddressDetail;
exports.getAddressList = getAddressList;
exports.getLogistics = getLogistics;
var _request = __webpack_require__(/*! @/utils/request.js */ 43);
var _api = _interopRequireDefault(__webpack_require__(/*! @/config/api.js */ 44));
/**
 * 收货地址相关API
 */

/**
 * 获取收货地址列表
 * @returns {AxiosPromise}
 */
function getAddressList(pageNumber, pageSize) {
  return _request.http.request({
    url: "/member/address",
    method: _request.Method.GET,
    needToken: true,
    params: {
      pageNumber: pageNumber,
      pageSize: pageSize
    }
  });
}

/**
 * 获取物流公司
 */
function getLogistics() {
  return _request.http.request({
    url: "/other/logistics",
    method: _request.Method.GET,
    needToken: true,
    params: {
      pageNumber: 1,
      pageSize: 200,
      disabled: "OPEN"
    }
  });
}

/**
 * 通过cityCode获取地区代码
 */
function getAddressCode(cityCode, townName) {
  return _request.http.request({
    url: _api.default.common + "/common/region/region",
    method: _request.Method.GET,
    needToken: true,
    params: {
      cityCode: cityCode,
      townName: townName
    }
  });
}

/**
 * 添加收货地址
 * @param params 地址参数
 * @returns {AxiosPromise}
 */
function addAddress(data) {
  return _request.http.request({
    url: "/member/address",
    method: _request.Method.POST,
    needToken: true,
    header: {
      "content-type": "application/x-www-form-urlencoded"
    },
    data: data
  });
}

/**
 * 编辑地址
 * @param id 地址ID
 * @param params 地址参数
 * @returns {AxiosPromise}
 */
function editAddress(params) {
  return _request.http.request({
    url: "/member/address",
    method: _request.Method.PUT,
    needToken: true,
    header: {
      "content-type": "application/x-www-form-urlencoded"
    },
    data: params
  });
}

/**
 * 删除收货地址
 * @param id
 */
function deleteAddress(id) {
  return _request.http.request({
    url: "/member/address/delById/".concat(id),
    method: _request.Method.DELETE,
    needToken: true
  });
}

/**
 * 根据ID获取会员收件地址
 * @param id
 */
function getAddressDetail(id) {
  return _request.http.request({
    url: "/member/address/get/".concat(id),
    method: _request.Method.GET,
    loading: false,
    needToken: true
  });
}

/**
 *
 */
function getAddressDefault() {
  return _request.http.request({
    url: "/member/address/get/default",
    method: _request.Method.GET,
    loading: false,
    needToken: true
  });
}

/***/ }),

/***/ 31:
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/regeneratorRuntime.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ 13)["default"];
function _regeneratorRuntime() {
  "use strict";

  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
  module.exports = _regeneratorRuntime = function _regeneratorRuntime() {
    return e;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  var t,
    e = {},
    r = Object.prototype,
    n = r.hasOwnProperty,
    o = Object.defineProperty || function (t, e, r) {
      t[e] = r.value;
    },
    i = "function" == typeof Symbol ? Symbol : {},
    a = i.iterator || "@@iterator",
    c = i.asyncIterator || "@@asyncIterator",
    u = i.toStringTag || "@@toStringTag";
  function define(t, e, r) {
    return Object.defineProperty(t, e, {
      value: r,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), t[e];
  }
  try {
    define({}, "");
  } catch (t) {
    define = function define(t, e, r) {
      return t[e] = r;
    };
  }
  function wrap(t, e, r, n) {
    var i = e && e.prototype instanceof Generator ? e : Generator,
      a = Object.create(i.prototype),
      c = new Context(n || []);
    return o(a, "_invoke", {
      value: makeInvokeMethod(t, r, c)
    }), a;
  }
  function tryCatch(t, e, r) {
    try {
      return {
        type: "normal",
        arg: t.call(e, r)
      };
    } catch (t) {
      return {
        type: "throw",
        arg: t
      };
    }
  }
  e.wrap = wrap;
  var h = "suspendedStart",
    l = "suspendedYield",
    f = "executing",
    s = "completed",
    y = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var p = {};
  define(p, a, function () {
    return this;
  });
  var d = Object.getPrototypeOf,
    v = d && d(d(values([])));
  v && v !== r && n.call(v, a) && (p = v);
  var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
  function defineIteratorMethods(t) {
    ["next", "throw", "return"].forEach(function (e) {
      define(t, e, function (t) {
        return this._invoke(e, t);
      });
    });
  }
  function AsyncIterator(t, e) {
    function invoke(r, o, i, a) {
      var c = tryCatch(t[r], t, o);
      if ("throw" !== c.type) {
        var u = c.arg,
          h = u.value;
        return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
          invoke("next", t, i, a);
        }, function (t) {
          invoke("throw", t, i, a);
        }) : e.resolve(h).then(function (t) {
          u.value = t, i(u);
        }, function (t) {
          return invoke("throw", t, i, a);
        });
      }
      a(c.arg);
    }
    var r;
    o(this, "_invoke", {
      value: function value(t, n) {
        function callInvokeWithMethodAndArg() {
          return new e(function (e, r) {
            invoke(t, n, e, r);
          });
        }
        return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(e, r, n) {
    var o = h;
    return function (i, a) {
      if (o === f) throw Error("Generator is already running");
      if (o === s) {
        if ("throw" === i) throw a;
        return {
          value: t,
          done: !0
        };
      }
      for (n.method = i, n.arg = a;;) {
        var c = n.delegate;
        if (c) {
          var u = maybeInvokeDelegate(c, n);
          if (u) {
            if (u === y) continue;
            return u;
          }
        }
        if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
          if (o === h) throw o = s, n.arg;
          n.dispatchException(n.arg);
        } else "return" === n.method && n.abrupt("return", n.arg);
        o = f;
        var p = tryCatch(e, r, n);
        if ("normal" === p.type) {
          if (o = n.done ? s : l, p.arg === y) continue;
          return {
            value: p.arg,
            done: n.done
          };
        }
        "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
      }
    };
  }
  function maybeInvokeDelegate(e, r) {
    var n = r.method,
      o = e.iterator[n];
    if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
    var i = tryCatch(o, e.iterator, r.arg);
    if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
    var a = i.arg;
    return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
  }
  function pushTryEntry(t) {
    var e = {
      tryLoc: t[0]
    };
    1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
  }
  function resetTryEntry(t) {
    var e = t.completion || {};
    e.type = "normal", delete e.arg, t.completion = e;
  }
  function Context(t) {
    this.tryEntries = [{
      tryLoc: "root"
    }], t.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(e) {
    if (e || "" === e) {
      var r = e[a];
      if (r) return r.call(e);
      if ("function" == typeof e.next) return e;
      if (!isNaN(e.length)) {
        var o = -1,
          i = function next() {
            for (; ++o < e.length;) {
              if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
            }
            return next.value = t, next.done = !0, next;
          };
        return i.next = i;
      }
    }
    throw new TypeError(_typeof(e) + " is not iterable");
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), o(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
    var e = "function" == typeof t && t.constructor;
    return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
  }, e.mark = function (t) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
  }, e.awrap = function (t) {
    return {
      __await: t
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
    return this;
  }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
    void 0 === i && (i = Promise);
    var a = new AsyncIterator(wrap(t, r, n, o), i);
    return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
      return t.done ? t.value : a.next();
    });
  }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
    return this;
  }), define(g, "toString", function () {
    return "[object Generator]";
  }), e.keys = function (t) {
    var e = Object(t),
      r = [];
    for (var n in e) {
      r.push(n);
    }
    return r.reverse(), function next() {
      for (; r.length;) {
        var t = r.pop();
        if (t in e) return next.value = t, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, e.values = values, Context.prototype = {
    constructor: Context,
    reset: function reset(e) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) {
        "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
      }
    },
    stop: function stop() {
      this.done = !0;
      var t = this.tryEntries[0].completion;
      if ("throw" === t.type) throw t.arg;
      return this.rval;
    },
    dispatchException: function dispatchException(e) {
      if (this.done) throw e;
      var r = this;
      function handle(n, o) {
        return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
      }
      for (var o = this.tryEntries.length - 1; o >= 0; --o) {
        var i = this.tryEntries[o],
          a = i.completion;
        if ("root" === i.tryLoc) return handle("end");
        if (i.tryLoc <= this.prev) {
          var c = n.call(i, "catchLoc"),
            u = n.call(i, "finallyLoc");
          if (c && u) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          } else if (c) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
          } else {
            if (!u) throw Error("try statement without catch or finally");
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          }
        }
      }
    },
    abrupt: function abrupt(t, e) {
      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
        var o = this.tryEntries[r];
        if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
          var i = o;
          break;
        }
      }
      i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
      var a = i ? i.completion : {};
      return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
    },
    complete: function complete(t, e) {
      if ("throw" === t.type) throw t.arg;
      return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
    },
    finish: function finish(t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
      }
    },
    "catch": function _catch(t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.tryLoc === t) {
          var n = r.completion;
          if ("throw" === n.type) {
            var o = n.arg;
            resetTryEntry(r);
          }
          return o;
        }
      }
      throw Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(e, r, n) {
      return this.delegate = {
        iterator: values(e),
        resultName: r,
        nextLoc: n
      }, "next" === this.method && (this.arg = t), y;
    }
  }, e;
}
module.exports = _regeneratorRuntime, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 318:
/*!************************************************!*\
  !*** D:/Desktop/code/ending/shop/api/store.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLicencePhoto = getLicencePhoto;
exports.getStoreAddress = getStoreAddress;
exports.getStoreBaseInfo = getStoreBaseInfo;
exports.getStoreCategory = getStoreCategory;
exports.getStoreList = getStoreList;
var _request = __webpack_require__(/*! @/utils/request.js */ 43);
/**
 * 店铺相关API
 */

/**
 * 获取店铺列表
 * @param params
 */
function getStoreList(params) {
  return _request.http.request({
    url: '/store/store',
    method: _request.Method.GET,
    params: params
  });
}

/**
 * 获取店铺基本信息
 * @param storeId
 */
function getStoreBaseInfo(storeId) {
  return _request.http.request({
    url: "/store/store/get/detail/".concat(storeId),
    method: _request.Method.GET,
    loading: false
  });
}

/**
 * 获取店铺分类
 * @param id
 */
function getStoreCategory(id) {
  return _request.http.request({
    url: "/store/store/label/get/".concat(id),
    method: _request.Method.GET
  });
}

/**
 * 营业执照
 * @param id
 */
function getLicencePhoto(id) {
  return _request.http.request({
    url: "/store/store/get/licencePhoto/".concat(id),
    method: _request.Method.GET
  });
}

/**
 * 获取自提点信息
 * @param id
 */
function getStoreAddress(storeId, params) {
  return _request.http.request({
    url: "/store/address/page/".concat(storeId),
    method: _request.Method.GET,
    params: params
  });
}

/***/ }),

/***/ 32:
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/asyncToGenerator.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}
module.exports = _asyncToGenerator, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 33:
/*!****************************************************!*\
  !*** D:/Desktop/code/ending/shop/config/config.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var name = "lilishop"; //全局商城name
var schemeName = "lilishop"; //唤醒app需要的schemeName
var _default = {
  name: name,
  schemeLink: "".concat(schemeName, "://"),
  //唤起app地址
  downloadLink: "https://pickmall.cn/download-page/index.html",
  //下载地址，下载app的地址
  shareLink: "https://m-b2b2c.pickmall.cn",
  //分享地址，也就是在h5中默认的复制地址
  appid: "wx6f10f29075dc1b0b",
  //小程序唯一凭证，即 AppID，可在「微信公众平台 - 设置 - 开发设置」页中获得。（需要已经成为开发者，且帐号没有异常状态）
  aMapKey: "1f78544934b66c9fbc0104117f663973",
  //在高德中申请Web服务key
  scanAuthNavigation: ["https://m-b2b2c.pickmall.cn/"],
  //扫码认证跳转域名配置 会根据此处配置的路由进行跳转
  iosAppId: "id1564638363",
  //AppStore的应用地址id 具体在分享->拷贝链接中查看
  logo: "https://lilishop-oss.oss-cn-beijing.aliyuncs.com/4c864e133c2944efad1f7282ac8a3b9e.png",
  //logo地址
  customerServiceMobile: "13161366885",
  //客服电话
  customerServiceEmail: "lili@lili.com",
  //客服邮箱
  imWebSrc: "https://im.pickmall.cn",
  //IM地址
  baseWsUrl: "wss://im-api.pickmall.cn/lili/webSocket",
  // IM WS 地址
  enableGetClipboard: false,
  //是否启用粘贴板获取 scanAuthNavigation 中的链接，如果匹配则会跳转到对应页面
  enableMiniBarStartUpApp: true,
  //是否在h5中右侧浮空按钮点击启动app
  /**
   * 如需更换主题请修改此处以及uni.scss中的全局颜色
   */
  mainColor: "#ff3c2a",
  // 主题色
  lightColor: "#ff6b35",
  // 高亮主题色
  aiderLightColor: "#ff9f28",
  // 辅助高亮颜色
  defaultUserPhoto: "/static/missing-face.png",
  // 默认用户头像
  enableFetchMobileLogin: false // 是否启用获取手机号登录 如果微信小程序提示封禁手机号获取权限 可将此选项设置成false作为备用登录方案
};
exports.default = _default;

/***/ }),

/***/ 34:
/*!*************************************************************!*\
  !*** D:/Desktop/code/ending/shop/js_sdk/h5-copy/h5-copy.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getClipboardData = getClipboardData;
exports.h5Copy = h5Copy;
function h5Copy(content) {
  if (!document.queryCommandSupported('copy')) {
    // 不支持
    return false;
  }
  var textarea = document.createElement("textarea");
  textarea.value = content;
  textarea.readOnly = "readOnly";
  document.body.appendChild(textarea);
  textarea.select(); // 选择对象
  textarea.setSelectionRange(0, content.length); //核心
  var result = document.execCommand("copy"); // 执行浏览器复制命令
  textarea.remove();
  return result;
}

/**
 * 获取系统剪贴板内容
 */
function getClipboardData() {
  return new Promise(function (_success, fail) {
    uni.getClipboardData({
      success: function success(_ref) {
        var data = _ref.data;
        return _success(data);
      },
      fail: fail
    });
  });
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 35:
/*!**************************************************************!*\
  !*** D:/Desktop/code/ending/shop/plugins/APPUpdate/index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 36:
/*!****************************************************!*\
  !*** D:/Desktop/code/ending/shop/utils/storage.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var isDev = "development" === "development";
var UUID = isDev ? "uuid_key_dev" : "uuid_key";
var HAS_LOGIN = isDev ? "has_login_key_dev" : "has_login_key";
var ACCESS_TOKEN = isDev ? "access_token_key_dev" : "access_token_key";
var REFRESH_TOKEN = isDev ? "refresh_token_key_dev" : "refresh_token_key";
var USER_INFO = isDev ? "user_info_obj_dev" : "user_info_obj";
var FACE_LOGIN = isDev ? "face_login_dev" : "face_login";
var FINGER_LOGIN = isDev ? "finger_login_dev" : "finger_login";
var CART_BACKBTN = isDev ? "cart_backbtn_dev" : "cart_backbtn";
var AFTERSALE_DATA = isDev ? "aftersale_data_dev" : "aftersale_data";
var _default = {
  //写入自动发券
  setAutoCp: function setAutoCp(val) {
    uni.setStorageSync('autoCp', val);
  },
  //获取自动发券时间
  getAutoCp: function getAutoCp() {
    return uni.getStorageSync('autoCp');
  },
  // 写入热门搜索时间戳
  setHotWords: function setHotWords(val) {
    uni.setStorageSync("hotWords", val);
  },
  // 获取热门搜索时间戳
  getHotWords: function getHotWords() {
    return uni.getStorageSync("hotWords");
  },
  //写入 展示还是不展示
  setShow: function setShow(val) {
    uni.setStorageSync("show", val);
  },
  getShow: function getShow() {
    if (uni.getStorageSync("show") === "" || uni.getStorageSync("show") === undefined) {
      return true;
    }
    return uni.getStorageSync("show");
  },
  // 获取face id登录
  getFaceLogin: function getFaceLogin() {
    return uni.getStorageSync(FACE_LOGIN);
  },
  // 写入face id
  setFaceLogin: function setFaceLogin(val) {
    uni.setStorageSync(FACE_LOGIN, val);
  },
  // 获取指纹登录
  getFingerLogin: function getFingerLogin() {
    return uni.getStorageSync(FINGER_LOGIN);
  },
  // 写入指纹登录
  setFingerLogin: function setFingerLogin(val) {
    uni.setStorageSync(FINGER_LOGIN, val);
  },
  // 写入用户信息
  setUserInfo: function setUserInfo(val) {
    uni.setStorageSync(USER_INFO, val);
  },
  // 获取用户信息
  getUserInfo: function getUserInfo() {
    return uni.getStorageSync(USER_INFO);
  },
  setTalkToUser: function setTalkToUser(val) {
    uni.setStorageSync("TALK_TO_USER", val);
  },
  getTalkToUser: function getTalkToUser() {
    return uni.getStorageSync("TALK_TO_USER");
  },
  // 写入uuid
  setUuid: function setUuid(val) {
    uni.setStorageSync(UUID, val);
  },
  // 获取uuid
  getUuid: function getUuid() {
    return uni.getStorageSync(UUID);
  },
  // 写入登录
  setHasLogin: function setHasLogin(val) {
    uni.setStorageSync(HAS_LOGIN, val);
  },
  // 获取是否登录
  getHasLogin: function getHasLogin() {
    return uni.getStorageSync(HAS_LOGIN);
  },
  // 删除uuid
  removeUuid: function removeUuid() {
    uni.removeStorageSync(UUID);
  },
  // 写入accessToken
  setAccessToken: function setAccessToken(val) {
    uni.setStorageSync(ACCESS_TOKEN, val);
  },
  // 获取accessToken
  getAccessToken: function getAccessToken() {
    return uni.getStorageSync(ACCESS_TOKEN);
  },
  // 后退购物车
  setCartBackbtn: function setCartBackbtn(val) {
    uni.setStorageSync(CART_BACKBTN, val);
  },
  // 删除token
  removeAccessToken: function removeAccessToken() {
    uni.removeStorageSync(ACCESS_TOKEN);
  },
  // 写入刷新token
  setRefreshToken: function setRefreshToken(val) {
    uni.setStorageSync(REFRESH_TOKEN, val);
  },
  // 获取刷新token
  getRefreshToken: function getRefreshToken() {
    return uni.getStorageSync(REFRESH_TOKEN);
  },
  // 删除token
  removeRefreshToken: function removeRefreshToken() {
    uni.removeStorageSync(REFRESH_TOKEN);
  },
  setAfterSaleData: function setAfterSaleData(val) {
    uni.setStorageSync(AFTERSALE_DATA, val);
  },
  getAfterSaleData: function getAfterSaleData() {
    return uni.getStorageSync(AFTERSALE_DATA);
  },
  // 删除token
  removeAfterSaleData: function removeAfterSaleData() {
    uni.removeStorageSync(AFTERSALE_DATA);
  },
  // 是否发送商品连接记录
  setImGoodsLink: function setImGoodsLink(val) {
    uni.setStorageSync('imGoodId', val);
  },
  getImGoodsLink: function getImGoodsLink() {
    return uni.getStorageSync('imGoodId');
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 37:
/*!**************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vuex3/dist/vuex.common.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * vuex v3.6.2
 * (c) 2021 Evan You
 * @license MIT
 */


function applyMixin (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

var target = typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
    ? global
    : {};
var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  }, { prepend: true });

  store.subscribeAction(function (action, state) {
    devtoolHook.emit('vuex:action', action, state);
  }, { prepend: true });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
function find (list, f) {
  return list.filter(f)[0]
}

/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
function deepCopy (obj, cache) {
  if ( cache === void 0 ) cache = [];

  // just return if obj is immutable value
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // if obj is hit, it is in circular structure
  var hit = find(cache, function (c) { return c.original === obj; });
  if (hit) {
    return hit.copy
  }

  var copy = Array.isArray(obj) ? [] : {};
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy: copy
  });

  Object.keys(obj).forEach(function (key) {
    copy[key] = deepCopy(obj[key], cache);
  });

  return copy
}

/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}

// Base data struct for store's module, package with some attribute and method
var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  // Store some children item
  this._children = Object.create(null);
  // Store the origin module object which passed by programmer
  this._rawModule = rawModule;
  var rawState = rawModule.state;

  // Store the origin module's state
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors = { namespaced: { configurable: true } };

prototypeAccessors.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.hasChild = function hasChild (key) {
  return key in this._children
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if ((true)) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  var child = parent.getChild(key);

  if (!child) {
    if ((true)) {
      console.warn(
        "[vuex] trying to unregister module '" + key + "', which is " +
        "not registered"
      );
    }
    return
  }

  if (!child.runtime) {
    return
  }

  parent.removeChild(key);
};

ModuleCollection.prototype.isRegistered = function isRegistered (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];

  if (parent) {
    return parent.hasChild(key)
  }

  return false
};

function update (path, targetModule, newModule) {
  if ((true)) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if ((true)) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if ((true)) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();
  this._makeLocalGettersCache = Object.create(null);

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  var state = this._modules.root.state;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;
  if (useDevtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors$1 = { state: { configurable: true } };

prototypeAccessors$1.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors$1.state.set = function (v) {
  if ((true)) {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });

  this._subscribers
    .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    ( true) &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  try {
    this._actionSubscribers
      .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
      .filter(function (sub) { return sub.before; })
      .forEach(function (sub) { return sub.before(action, this$1.state); });
  } catch (e) {
    if ((true)) {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e);
    }
  }

  var result = entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload);

  return new Promise(function (resolve, reject) {
    result.then(function (res) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.after; })
          .forEach(function (sub) { return sub.after(action, this$1.state); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in after action subscribers: ");
          console.error(e);
        }
      }
      resolve(res);
    }, function (error) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.error; })
          .forEach(function (sub) { return sub.error(action, this$1.state, error); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in error action subscribers: ");
          console.error(e);
        }
      }
      reject(error);
    });
  })
};

Store.prototype.subscribe = function subscribe (fn, options) {
  return genericSubscribe(fn, this._subscribers, options)
};

Store.prototype.subscribeAction = function subscribeAction (fn, options) {
  var subs = typeof fn === 'function' ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers, options)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if ((true)) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hasModule = function hasModule (path) {
  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  return this._modules.isRegistered(path)
};

Store.prototype[[104,111,116,85,112,100,97,116,101].map(function (item) {return String.fromCharCode(item)}).join('')] = function (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors$1 );

function genericSubscribe (fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend
      ? subs.unshift(fn)
      : subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && ("development" !== 'production')) {
      console.error(("[vuex] duplicate namespace " + namespace + " for the namespaced module " + (path.join('/'))));
    }
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      if ((true)) {
        if (moduleName in parentState) {
          console.warn(
            ("[vuex] state field \"" + moduleName + "\" was overridden by a module with the same name at \"" + (path.join('.')) + "\"")
          );
        }
      }
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store.getters).forEach(function (type) {
      // skip if the target getter is not match this namespace
      if (type.slice(0, splitPos) !== namespace) { return }

      // extract local getter type
      var localType = type.slice(splitPos);

      // Add a port to the getters proxy.
      // Define as getter property because
      // we do not want to evaluate the getters in this time.
      Object.defineProperty(gettersProxy, localType, {
        get: function () { return store.getters[type]; },
        enumerable: true
      });
    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }

  return store._makeLocalGettersCache[namespace]
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if ((true)) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if ((true)) {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.reduce(function (state, key) { return state[key]; }, state)
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if ((true)) {
    assert(typeof type === 'string', ("expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if ((true)) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  if (( true) && !isValidMap(states)) {
    console.error('[vuex] mapState: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept another params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  if (( true) && !isValidMap(mutations)) {
    console.error('[vuex] mapMutations: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // Get the commit method from store
      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */
var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  if (( true) && !isValidMap(getters)) {
    console.error('[vuex] mapGetters: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    // The namespace has been mutated by normalizeNamespace
    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (( true) && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  if (( true) && !isValidMap(actions)) {
    console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // get dispatch function from store
      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */
var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap (map) {
  if (!isValidMap(map)) {
    return []
  }
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

/**
 * Validate whether given map is valid or not
 * @param {*} map
 * @return {Boolean}
 */
function isValidMap (map) {
  return Array.isArray(map) || isObject(map)
}

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (( true) && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

// Credits: borrowed code from fcomb/redux-logger

function createLogger (ref) {
  if ( ref === void 0 ) ref = {};
  var collapsed = ref.collapsed; if ( collapsed === void 0 ) collapsed = true;
  var filter = ref.filter; if ( filter === void 0 ) filter = function (mutation, stateBefore, stateAfter) { return true; };
  var transformer = ref.transformer; if ( transformer === void 0 ) transformer = function (state) { return state; };
  var mutationTransformer = ref.mutationTransformer; if ( mutationTransformer === void 0 ) mutationTransformer = function (mut) { return mut; };
  var actionFilter = ref.actionFilter; if ( actionFilter === void 0 ) actionFilter = function (action, state) { return true; };
  var actionTransformer = ref.actionTransformer; if ( actionTransformer === void 0 ) actionTransformer = function (act) { return act; };
  var logMutations = ref.logMutations; if ( logMutations === void 0 ) logMutations = true;
  var logActions = ref.logActions; if ( logActions === void 0 ) logActions = true;
  var logger = ref.logger; if ( logger === void 0 ) logger = console;

  return function (store) {
    var prevState = deepCopy(store.state);

    if (typeof logger === 'undefined') {
      return
    }

    if (logMutations) {
      store.subscribe(function (mutation, state) {
        var nextState = deepCopy(state);

        if (filter(mutation, prevState, nextState)) {
          var formattedTime = getFormattedTime();
          var formattedMutation = mutationTransformer(mutation);
          var message = "mutation " + (mutation.type) + formattedTime;

          startMessage(logger, message, collapsed);
          logger.log('%c prev state', 'color: #9E9E9E; font-weight: bold', transformer(prevState));
          logger.log('%c mutation', 'color: #03A9F4; font-weight: bold', formattedMutation);
          logger.log('%c next state', 'color: #4CAF50; font-weight: bold', transformer(nextState));
          endMessage(logger);
        }

        prevState = nextState;
      });
    }

    if (logActions) {
      store.subscribeAction(function (action, state) {
        if (actionFilter(action, state)) {
          var formattedTime = getFormattedTime();
          var formattedAction = actionTransformer(action);
          var message = "action " + (action.type) + formattedTime;

          startMessage(logger, message, collapsed);
          logger.log('%c action', 'color: #03A9F4; font-weight: bold', formattedAction);
          endMessage(logger);
        }
      });
    }
  }
}

function startMessage (logger, message, collapsed) {
  var startMessage = collapsed
    ? logger.groupCollapsed
    : logger.group;

  // render
  try {
    startMessage.call(logger, message);
  } catch (e) {
    logger.log(message);
  }
}

function endMessage (logger) {
  try {
    logger.groupEnd();
  } catch (e) {
    logger.log('—— log end ——');
  }
}

function getFormattedTime () {
  var time = new Date();
  return (" @ " + (pad(time.getHours(), 2)) + ":" + (pad(time.getMinutes(), 2)) + ":" + (pad(time.getSeconds(), 2)) + "." + (pad(time.getMilliseconds(), 3)))
}

function repeat (str, times) {
  return (new Array(times + 1)).join(str)
}

function pad (num, maxLength) {
  return repeat('0', maxLength - num.toString().length) + num
}

var index_cjs = {
  Store: Store,
  install: install,
  version: '3.6.2',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers,
  createLogger: createLogger
};

module.exports = index_cjs;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 4:
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 40:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    if(typeof renderjs.beforeCreate === 'function'){
			renderjs.beforeCreate = [renderjs.beforeCreate]
		}
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 405:
/*!*************************************************!*\
  !*** D:/Desktop/code/ending/shop/api/common.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIMDetail = getIMDetail;
exports.getRegionsById = getRegionsById;
exports.upload = void 0;
var _request = __webpack_require__(/*! @/utils/request.js */ 43);
var _api = _interopRequireDefault(__webpack_require__(/*! @/config/api.js */ 44));
/**
 * 公共API
 */

/**
 * 获取地区数据
 * @param id
 */
function getRegionsById() {
  var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  return _request.http.request({
    url: "".concat(_api.default.common, "/common/region/item/").concat(id),
    method: _request.Method.GET,
    message: false
  });
}

// 获取IM接口前缀
function getIMDetail() {
  return _request.http.request({
    url: "".concat(_api.default.common, "/IM"),
    method: _request.Method.GET,
    message: false
  });
}

/**
 * 文件上传地址
 * @type {string}
 */
var upload = _api.default.common + "/common/upload/file";
exports.upload = upload;

/***/ }),

/***/ 41:
/*!****************************************************!*\
  !*** D:/Desktop/code/ending/shop/utils/filters.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.beautifyTime = beautifyTime;
exports.callPhone = callPhone;
exports.clearStrComma = clearStrComma;
exports.forceLogin = forceLogin;
exports.formatTime = formatTime;
exports.getPages = getPages;
exports.goodsFormatPrice = goodsFormatPrice;
exports.isLogin = isLogin;
exports.logoff = logoff;
exports.navigateToLogin = navigateToLogin;
exports.noPassByName = noPassByName;
exports.orderStatusList = orderStatusList;
exports.parseTime = parseTime;
exports.quiteLoginOut = quiteLoginOut;
exports.secrecyMobile = secrecyMobile;
exports.serviceStatusList = serviceStatusList;
exports.setClipboard = setClipboard;
exports.talkIm = talkIm;
exports.tipsToLogin = tipsToLogin;
exports.unitPrice = unitPrice;
exports.unixToDate = unixToDate;
exports.userInfo = userInfo;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 30));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 32));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
var _login = __webpack_require__(/*! @/api/login */ 42);
var _members = __webpack_require__(/*! @/api/members */ 67);
var _storage = _interopRequireDefault(__webpack_require__(/*! @/utils/storage.js */ 36));
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _Foundation = _interopRequireDefault(__webpack_require__(/*! ./Foundation.js */ 58));
var _h5Copy = __webpack_require__(/*! @/js_sdk/h5-copy/h5-copy.js */ 34);
/**
 * 金钱单位置换  2999 --> 2,999.00
 * @param val
 * @param unit
 * @param location
 * @returns {*}
 */
function unitPrice(val, unit, location) {
  if (!val) val = 0;
  var price = _Foundation.default.formatPrice(val);
  if (location === "before") {
    return price.substr(0, price.length - 3);
  }
  if (location === "after") {
    return price.substr(-2);
  }
  return (unit || "") + price;
}

/**
 * 格式化价格  1999 --> [1999,00]
 * @param {*} val
 * @returns
 */
function goodsFormatPrice(val) {
  if (typeof val == "undefined") {
    return val;
  }
  var valNum = new Number(val);
  return valNum.toFixed(2).split(".");
}

/**
 * 将内容复制到粘贴板
 */

function setClipboard(val) {
  uni.setClipboardData({
    data: val,
    success: function success() {
      uni.showToast({
        title: "复制成功!",
        duration: 2000,
        icon: "none"
      });
    }
  });
}

/**
 * 拨打电话
 */

function callPhone(phoneNumber) {
  uni.makePhoneCall({
    phoneNumber: phoneNumber
  });
}

/**
 * 脱敏姓名
 */

function noPassByName(str) {
  if (null != str && str != undefined) {
    if (str.length <= 3) {
      return "*" + str.substring(1, str.length);
    } else if (str.length > 3 && str.length <= 6) {
      return "**" + str.substring(2, str.length);
    } else if (str.length > 6) {
      return str.substring(0, 2) + "****" + str.substring(6, str.length);
    }
  } else {
    return "";
  }
}

/**
 * 处理unix时间戳，转换为可阅读时间格式
 * @param unix
 * @param format
 * @returns {*|string}
 */
function unixToDate(unix, format) {
  var _format = format || "yyyy-MM-dd hh:mm:ss";
  var d = new Date(unix * 1000);
  var o = {
    "M+": d.getMonth() + 1,
    "d+": d.getDate(),
    "h+": d.getHours(),
    "m+": d.getMinutes(),
    "s+": d.getSeconds(),
    "q+": Math.floor((d.getMonth() + 3) / 3),
    S: d.getMilliseconds()
  };
  if (/(y+)/.test(_format)) _format = _format.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(_format)) _format = _format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
  }
  return _format;
}

/**
 * 人性化显示时间
 *
 * @param {Object} datetime
 */
function beautifyTime() {
  var datetime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  if (datetime == null || datetime == undefined || !datetime) {
    return "";
  }
  datetime = timestampToTime(datetime).replace(/-/g, "/");
  var time = new Date();
  var outTime = new Date(datetime);
  if (/^[1-9]\d*$/.test(datetime)) {
    outTime = new Date(parseInt(datetime) * 1000);
  }
  if (time.getTime() < outTime.getTime()) {
    return parseTime(outTime, "{y}/{m}/{d}");
  }
  if (time.getFullYear() != outTime.getFullYear()) {
    return parseTime(outTime, "{y}/{m}/{d}");
  }
  if (time.getMonth() != outTime.getMonth()) {
    return parseTime(outTime, "{m}/{d}");
  }
  if (time.getDate() != outTime.getDate()) {
    var day = outTime.getDate() - time.getDate();
    if (day == -1) {
      return parseTime(outTime, "昨天 {h}:{i}");
    }
    if (day == -2) {
      return parseTime(outTime, "前天 {h}:{i}");
    }
    return parseTime(outTime, "{m}-{d}");
  }
  if (time.getHours() != outTime.getHours()) {
    return parseTime(outTime, "{h}:{i}");
  }
  var minutes = outTime.getMinutes() - time.getMinutes();
  if (minutes == 0) {
    return "刚刚";
  }
  minutes = Math.abs(minutes);
  return "".concat(minutes, "\u5206\u949F\u524D");
}
// 时间转换
function timestampToTime(timestamp) {
  var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = date.getDate() + ' ';
  var h = date.getHours() + ':';
  var m = date.getMinutes() + ':';
  var s = date.getSeconds();
  return Y + M + D + h + m + s;
}

/**
 * 13888888888 -> 138****8888
 * @param mobile
 * @returns {*}
 */
function secrecyMobile(mobile) {
  mobile = String(mobile);
  if (!/\d{11}/.test(mobile)) {
    return mobile;
  }
  return mobile.replace(/(\d{3})(\d{4})(\d{4})/, "$1****$3");
}

/**
 * 人性化时间显示
 *
 * @param {Object} datetime
 */
function formatTime(datetime) {
  if (datetime == null) return "";
  datetime = datetime.replace(/-/g, "/");
  var time = new Date();
  var outTime = new Date(datetime);
  if (/^[1-9]\d*$/.test(datetime)) {
    outTime = new Date(parseInt(datetime) * 1000);
  }
  if (time.getTime() < outTime.getTime() || time.getFullYear() != outTime.getFullYear()) {
    return parseTime(outTime, "{y}-{m}-{d} {h}:{i}");
  }
  if (time.getMonth() != outTime.getMonth()) {
    return parseTime(outTime, "{m}-{d} {h}:{i}");
  }
  if (time.getDate() != outTime.getDate()) {
    var day = outTime.getDate() - time.getDate();
    if (day == -1) {
      return parseTime(outTime, "昨天 {h}:{i}");
    }
    if (day == -2) {
      return parseTime(outTime, "前天 {h}:{i}");
    }
    return parseTime(outTime, "{m}-{d} {h}:{i}");
  }
  if (time.getHours() != outTime.getHours()) {
    return parseTime(outTime, "{h}:{i}");
  }
  var minutes = outTime.getMinutes() - time.getMinutes();
  if (minutes == 0) {
    return "刚刚";
  }
  minutes = Math.abs(minutes);
  return "".concat(minutes, "\u5206\u949F\u524D");
}

/**
 * 时间格式化方法
 *
 * @param {(Object|string|number)} time
 * @param {String} cFormat
 * @returns {String | null}
 */
function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null;
  }
  var date;
  var format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
  if ((0, _typeof2.default)(time) === "object") {
    date = time;
  } else {
    if (typeof time === "string" && /^[0-9]+$/.test(time)) {
      time = parseInt(time);
    }
    if (typeof time === "number" && time.toString().length === 10) {
      time = time * 1000;
      console.log("时间判断为number");
    }
    date = new Date(time.replace(/-/g, "/"));
  }
  var formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  };
  var time_str = format.replace(/{([ymdhisa])+}/g, function (result, key) {
    var value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === "a") {
      return ["日", "一", "二", "三", "四", "五", "六"][value];
    }
    return value.toString().padStart(2, "0");
  });
  return time_str;
}

/**
 * 清除逗号
 *
 */
function clearStrComma(str) {
  str = str.replace(/,/g, ""); //取消字符串中出现的所有逗号
  return str;
}

/**
 * 判断用户是否登录
 * @param val  如果为auth则判断是否登录
 * 如果传入 auth 则为判断是否登录
 */
function isLogin(val) {
  var userInfo = _storage.default.getUserInfo();
  if (val == "auth") {
    return userInfo && userInfo.id ? true : false;
  } else {
    return _storage.default.getUserInfo();
  }
}

/**
 * 退出登录
 *
 */
function quiteLoginOut() {
  uni.showModal({
    title: "提示",
    content: "是否退出登录？",
    confirmColor: _vue.default.prototype.$mainColor,
    success: function success(res) {
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!res.confirm) {
                  _context.next = 8;
                  break;
                }
                _storage.default.setAccessToken("");
                _storage.default.setRefreshToken("");
                _storage.default.setUserInfo({});
                _storage.default.setHasLogin(false);
                navigateToLogin("redirectTo");
                _context.next = 8;
                return (0, _login.logout)();
              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    }
  });
}

/**
 * 用户注销
 *
 */
function logoff() {
  uni.showModal({
    title: "提示",
    content: "确认注销用户么？注销用户将无法再次登录并失去当前数据就。根据法规数据最长保留6个月，期间可以联系客服人员进行恢复数据。",
    confirmColor: _vue.default.prototype.$mainColor,
    success: function success(res) {
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!res.confirm) {
                  _context2.next = 7;
                  break;
                }
                _context2.next = 3;
                return (0, _login.logoffConfirm)();
              case 3:
                _storage.default.setAccessToken("");
                _storage.default.setRefreshToken("");
                _storage.default.setUserInfo({});
                navigateToLogin("redirectTo");
              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    }
  });
}

/**
 * 跳转im
 */
function talkIm(storeId, goodsId, id) {
  if (isLogin('auth')) {
    var url = "/pages/mine/im/index?userId=".concat(storeId);
    if (goodsId && id) url = "/pages/mine/im/index?userId=".concat(storeId, "&goodsid=").concat(goodsId, "&skuid=").concat(id);
    uni.navigateTo({
      url: url
    });
  } else {
    tipsToLogin();
  }
}
function tipsToLogin(type) {
  if (!isLogin("auth")) {
    uni.showModal({
      title: "提示",
      content: "当前用户未登录是否登录？",
      confirmText: "确定",
      cancelText: "取消",
      confirmColor: _vue.default.prototype.$mainColor,
      success: function success(res) {
        if (res.confirm) {
          navigateToLogin();
        } else if (res.cancel) {
          if (type !== 'normal') {
            uni.navigateBack();
          }
        }
      }
    });
    return false;
  }
  return true;
}

/**
 * 获取用户信息并重新添加到缓存里面
 */
function userInfo() {
  return _userInfo.apply(this, arguments);
}
/**
 * 验证是否登录如果没登录则去登录
 * @param {*} val
 * @returns
 */
function _userInfo() {
  _userInfo = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
    var res;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _members.getUserInfo)();
          case 2:
            res = _context3.sent;
            if (!res.data.success) {
              _context3.next = 6;
              break;
            }
            _storage.default.setUserInfo(res.data.result);
            return _context3.abrupt("return", res.data.result);
          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _userInfo.apply(this, arguments);
}
function forceLogin() {
  var userInfo = _storage.default.getUserInfo();
  if (!userInfo || !userInfo.id) {
    uni.navigateTo({
      url: "/pages/passport/wechatMPLogin"
    });
  }
}

/**
 * 获取当前加载的页面对象
 * @param val
 */
function getPages(val) {
  var pages = getCurrentPages(); //获取加载的页面
  var currentPage = pages[pages.length - 1]; //获取当前页面的对象
  var url = currentPage.route; //当前页面url

  return val ? currentPage : url;
}

/**
 * 跳转到登录页面
 */
function navigateToLogin() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "navigateTo";
  /**
   * 此处进行条件编译判断
   * 微信小程序跳转到微信小程序登录页面
   * H5/App跳转到普通登录页面
   */

  uni[type]({
    url: "/pages/passport/wechatMPLogin"
  });
}

/**
 * 服务状态列表
 */
function serviceStatusList(val) {
  var statusList = {
    APPLY: "申请售后",
    PASS: "通过售后",
    REFUSE: "拒绝售后",
    BUYER_RETURN: "买家退货，待卖家收货",
    SELLER_RE_DELIVERY: "商家换货/补发",
    SELLER_CONFIRM: "卖家确认收货",
    SELLER_TERMINATION: "卖家终止售后",
    BUYER_CONFIRM: "买家确认收货",
    BUYER_CANCEL: "买家取消售后",
    WAIT_REFUND: "等待平台退款",
    COMPLETE: "完成售后"
  };
  return statusList[val];
}

/**
 * 订单状态列表
 */
function orderStatusList(val) {
  var orderStatusList = {
    UNDELIVERED: "待发货",
    UNPAID: "未付款",
    PAID: "已付款",
    PARTS_DELIVERED: "部分发货",
    DELIVERED: "已发货",
    CANCELLED: "已取消",
    COMPLETED: "已完成",
    COMPLETE: "已完成",
    TAKE: "待核验",
    STAY_PICKED_UP: "待自提"
  };
  return orderStatusList[val];
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 42:
/*!************************************************!*\
  !*** D:/Desktop/code/ending/shop/api/login.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bindMobile = bindMobile;
exports.getAutoCoup = getAutoCoup;
exports.logoffConfirm = logoffConfirm;
exports.logout = logout;
exports.modifyPass = modifyPass;
exports.refreshTokenFn = refreshTokenFn;
exports.resetByMobile = resetByMobile;
exports.scannerCodeLogin = scannerCodeLogin;
exports.scannerCodeLoginConfirm = scannerCodeLoginConfirm;
exports.sendMobile = sendMobile;
exports.smsLogin = smsLogin;
exports.userLogin = userLogin;
var _request = __webpack_require__(/*! @/utils/request.js */ 43);
var _api = _interopRequireDefault(__webpack_require__(/*! @/config/api.js */ 44));
/**
 * 通过短信重置密码
 * @param  mobile
 */
function resetByMobile(params) {
  return _request.http.request({
    url: "/passport/member/resetByMobile",
    method: "POST",
    params: params
  });
}

/**
 * 绑定手机号码
 * @param  mobile
 */
function bindMobile(params) {
  return _request.http.request({
    url: "/passport/member/bindMobile",
    method: "POST",
    params: params
  });
}

//获取自动发券
function getAutoCoup() {
  return _request.http.request({
    url: "/promotion/coupon/activity",
    method: "GET",
    needToken: true
  });
}

/**
 * 账号密码登陆
 * @params  password
 * @params  username
 */
function userLogin(params, clientType) {
  return _request.http.request({
    method: "POST",
    url: "/passport/member/userLogin",
    data: params,
    header: {
      "content-type": "application/x-www-form-urlencoded",
      clientType: clientType
    }
  });
}

/**
 * 发送验证码
 * @param  mobile
 */
function sendMobile(mobile) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'LOGIN';
  return _request.http.request({
    url: "".concat(_api.default.common, "/common/sms/").concat(type, "/").concat(mobile),
    method: "GET"
  });
}

/**
 * 短信登录
 * @param  mobile
 * @param  smsCode
 */
function smsLogin(params, clientType) {
  return _request.http.request({
    url: "/passport/member/smsLogin",
    method: "POST",
    data: params,
    header: {
      "content-type": "application/x-www-form-urlencoded",
      clientType: clientType
    }
  });
}

/**
 * 修改密码
 * @param  newPassword
 * @param  password
 */

function modifyPass(params) {
  return _request.http.request({
    url: "/passport/member/modifyPass",
    method: "PUT",
    params: params
  });
}

/**
 * 刷新token
 */
function refreshTokenFn(refresh_token) {
  return _request.http.request({
    url: "/passport/member/refresh/".concat(refresh_token),
    method: "GET"
  });
}

// 获取密码状态
function logout() {
  return _request.http.request({
    url: '/passport/member/logout',
    method: "POST",
    needToken: true
  });
}
function scannerCodeLogin(params) {
  return _request.http.request({
    url: '/passport/member/app_scanner',
    method: "POST",
    params: params,
    needToken: true
  });
}
function scannerCodeLoginConfirm(params) {
  return _request.http.request({
    url: '/passport/member/app_confirm',
    method: "POST",
    params: params,
    needToken: true
  });
}

// 注销用户
function logoffConfirm() {
  return _request.http.request({
    url: '/passport/member/cancellation',
    method: "PUT",
    needToken: true
  });
}

/***/ }),

/***/ 43:
/*!****************************************************!*\
  !*** D:/Desktop/code/ending/shop/utils/request.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.http = exports.Method = void 0;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 30));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 32));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _login = __webpack_require__(/*! @/api/login.js */ 42);
var _api = _interopRequireDefault(__webpack_require__(/*! @/config/api.js */ 44));
var _index = _interopRequireDefault(__webpack_require__(/*! @/lib/request/index.js */ 45));
var _Foundation = _interopRequireDefault(__webpack_require__(/*! @/utils/Foundation.js */ 58));
var _md = __webpack_require__(/*! @/utils/md5.js */ 59);
var _storage = _interopRequireDefault(__webpack_require__(/*! @/utils/storage.js */ 36));
var _jwt = _interopRequireDefault(__webpack_require__(/*! @/js_sdk/t-jwt/jwt.js */ 60));
var _uuidModified = _interopRequireDefault(__webpack_require__(/*! @/utils/uuid.modified.js */ 61));
var _store = _interopRequireDefault(__webpack_require__(/*! ../store */ 66));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var isNavigateTo = false;
function cleanStorage() {
  uni.showToast({
    title: "你的登录状态已过期，请重新登录",
    icon: "none",
    duration: 1500
  });
  if (uni.showLoading()) {
    uni.hideLoading();
  }
  _storage.default.setHasLogin(false);
  _storage.default.setAccessToken("");
  _storage.default.setRefreshToken("");
  console.log("清空token");
  _storage.default.setUuid("");
  _storage.default.setUserInfo({});
  if (!isNavigateTo) {
    isNavigateTo = true;
    // 防抖处理跳转

    uni.navigateTo({
      url: "/pages/passport/wechatMPLogin"
    });
  }
}
var http = new _index.default();

/**
 * 创建uuid方法
 */
exports.http = http;
var createUuid = function createUuid() {
  if (!_storage.default.getUuid()) {
    _storage.default.setUuid(_uuidModified.default.v1());
    console.log("uuid", _storage.default.getUuid());
  }
};
http.setConfig(function (config) {
  createUuid();
  /* 设置全局配置 */
  config.baseURL = _api.default.buyer;
  config.header = _objectSpread({}, config.header);
  config.validateStatus = function (statusCode) {
    // 不论什么状态,统一在正确中处理
    return true;
  };
  return config;
});
http.interceptors.request.use(function (config) {
  /* 请求之前拦截器。可以使用async await 做异步操作 */
  var accessToken = _storage.default.getAccessToken();
  if (accessToken) {
    /**
     * 使用JWT解析
     * 小于当前时间将当前token清除
     */
    var decodeJwt = (0, _jwt.default)(accessToken);
    var timing = new Date().getTime() / 1000;
    if (decodeJwt.exp <= timing) {
      accessToken = "";
      _storage.default.setAccessToken('');
    }
    var nonce = _Foundation.default.randomString(6);
    var timestamp = parseInt(new Date().getTime() / 1000);
    var sign = (0, _md.md5)(nonce + timestamp + accessToken);
    var _params = {
      nonce: nonce,
      timestamp: timestamp,
      sign: sign
    };
    var params = config.params || {};
    params = _objectSpread(_objectSpread({}, params), _params);
    config.params = params;
    config.header.accessToken = accessToken;
  }
  createUuid();
  config.header = _objectSpread(_objectSpread({}, config.header), {}, {
    uuid: _storage.default.getUuid()
  });
  return config;
}, function (config) {
  return Promise.reject(config);
});

// 是否正在刷新的标记
var isRefreshing = false;
//重试队列
var requests = [];
// 必须使用异步函数，注意
http.interceptors.response.use( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(response) {
    var token, oldRefreshToken;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            isNavigateTo = false;
            /* 请求之后拦截器。可以使用async await 做异步操作  */
            // token存在并且token过期
            // if (isRefreshing && response.statusCode === 403) {
            //   cleanStorage();
            //   isRefreshing = false;
            // }
            uni.showLoading() ? uni.hideLoading() : '';
            token = _storage.default.getAccessToken();
            if (!(token && response.statusCode === 403 || response.data.status === 403)) {
              _context.next = 15;
              break;
            }
            if (isRefreshing) {
              _context.next = 12;
              break;
            }
            console.log('旧token', token);
            isRefreshing = true;
            _storage.default.setAccessToken('');
            oldRefreshToken = _storage.default.getRefreshToken(); //调用刷新token的接口
            return _context.abrupt("return", (0, _login.refreshTokenFn)(oldRefreshToken).then(function (res) {
              var _res$data$result = res.data.result,
                accessToken = _res$data$result.accessToken,
                refreshToken = _res$data$result.refreshToken;
              _storage.default.setAccessToken(accessToken);
              _storage.default.setRefreshToken(refreshToken);
              response.header.accessToken = "".concat(accessToken);
              // token 刷新后将数组的方法重新执行
              console.log('接口队列', requests, '新token', accessToken);
              requests.forEach(function (cb) {
                return cb(accessToken);
              });
              requests = []; // 重新请求完清空
              return http.request(response.config);
            }).catch(function (err) {
              console.log('刷新token报错' + oldRefreshToken, err);
              cleanStorage();
              return Promise.reject(err);
            }).finally(function () {
              isRefreshing = false;
            }));
          case 12:
            return _context.abrupt("return", new Promise(function (resolve) {
              // 用函数形式将 resolve 存入，等待刷新后再执行
              requests.push(function (token) {
                response.header.accessToken = "".concat(token);
                resolve(http.request(response.config));
              });
            }));
          case 13:
            _context.next = 16;
            break;
          case 15:
            if (!token && !_storage.default.getRefreshToken() && response.statusCode === 403 || response.data.code === 403) {
              console.log('没有token 以及刷新token 内容', token, _storage.default.getRefreshToken());
              cleanStorage();

              // 如果当前状态码为正常但是success为不正常时
            } else if (response.statusCode == 200 && !response.data.success || response.statusCode == 400) {
              if (response.data.message) {
                uni.showToast({
                  title: response.data.message,
                  icon: "none",
                  duration: 1500,
                  success: function success() {
                    _store.default.state.isShowToast = true;
                  },
                  fail: function fail() {
                    _store.default.state.isShowToast = false;
                  },
                  complete: function complete() {
                    _store.default.state.isShowToast = false;
                  }
                });
              }
            }
          case 16:
            return _context.abrupt("return", response);
          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return function (_x) {
    return _ref.apply(this, arguments);
  };
}(), function (error) {
  return error;
});
var Method = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE"
};
exports.Method = Method;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 44:
/*!*************************************************!*\
  !*** D:/Desktop/code/ending/shop/config/api.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
/**
 * base    : 基础业务API
 * buyer   : 买家API
 */
// 开发环境
var dev = {
  im: "https://im-api.pickmall.cn",
  common: "https://common-api.pickmall.cn",
  buyer: "https://buyer-api.pickmall.cn"
  // common: "http://192.168.0.113:8890",
  // buyer: "http://192.168.0.113:8888",
  // im: "http://192.168.0.113:8885",
};
// 生产环境
var prod = {
  im: "https://im-api.pickmall.cn",
  common: "https://common-api.pickmall.cn",
  buyer: "https://buyer-api.pickmall.cn"
};

//默认生产环境
var api = dev;
//如果是开发环境
if (true) {
  api = dev;
} else {}
//微信小程序，app的打包方式建议为生产环境，所以这块直接条件编译赋值

api = prod;
api.buyer += "/buyer";
api.common += "/common";
api.im += "/im";
var _default = _objectSpread({}, api);
exports.default = _default;

/***/ }),

/***/ 448:
/*!**************************************************!*\
  !*** D:/Desktop/code/ending/shop/api/article.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getArticleCategory = getArticleCategory;
exports.getArticleDetail = getArticleDetail;
exports.getArticleDetailByType = getArticleDetailByType;
var _request = __webpack_require__(/*! @/utils/request.js */ 43);
var _api = _interopRequireDefault(__webpack_require__(/*! @/config/api.js */ 44));
/**
 * 文章相关API
 */

/**
 * 获取某个分类的文章列表
 * @param category_type
 */
function getArticleCategory(category_type) {
  return _request.http.request({
    url: "".concat(_api.default.base, "/pages/article-categories"),
    method: _request.Method.GET,
    params: {
      category_type: category_type
    }
  });
}

/**
 * 获取文章详情
 * @param type
 */
function getArticleDetail(type) {
  return _request.http.request({
    url: "/other/article/get/".concat(type),
    method: _request.Method.GET
  });
}

/**
 * 获取文章详情
 * @param type
 */
function getArticleDetailByType(type) {
  return _request.http.request({
    url: "/other/article/type/".concat(type),
    method: _request.Method.GET
  });
}

/***/ }),

/***/ 45:
/*!********************************************************!*\
  !*** D:/Desktop/code/ending/shop/lib/request/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Request = _interopRequireDefault(__webpack_require__(/*! ./core/Request */ 46));
var _default = _Request.default;
exports.default = _default;

/***/ }),

/***/ 46:
/*!***************************************************************!*\
  !*** D:/Desktop/code/ending/shop/lib/request/core/Request.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ 23));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ 24));
var _dispatchRequest = _interopRequireDefault(__webpack_require__(/*! ./dispatchRequest */ 47));
var _InterceptorManager = _interopRequireDefault(__webpack_require__(/*! ./InterceptorManager */ 55));
var _mergeConfig = _interopRequireDefault(__webpack_require__(/*! ./mergeConfig */ 56));
var _defaults = _interopRequireDefault(__webpack_require__(/*! ./defaults */ 57));
var _utils = __webpack_require__(/*! ../utils */ 50);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var Request = /*#__PURE__*/function () {
  /**
   * @param {Object} arg - 全局配置
   * @param {String} arg.baseURL - 全局根路径
   * @param {Object} arg.header - 全局header
   * @param {String} arg.method = [GET|POST|PUT|DELETE|CONNECT|HEAD|OPTIONS|TRACE] - 全局默认请求方式
   * @param {String} arg.dataType = [json] - 全局默认的dataType
   * @param {String} arg.responseType = [text|arraybuffer] - 全局默认的responseType。App和支付宝小程序不支持
   * @param {Object} arg.custom - 全局默认的自定义参数
   * @param {Number} arg.timeout - 全局默认的超时时间，单位 ms。默认30000。仅微信小程序（2.10.0）、支付宝小程序支持
   * @param {Boolean} arg.sslVerify - 全局默认的是否验证 ssl 证书。默认true.仅App安卓端支持（HBuilderX 2.3.3+）
   * @param {Boolean} arg.withCredentials - 全局默认的跨域请求时是否携带凭证（cookies）。默认false。仅H5支持（HBuilderX 2.6.15+）
   * @param {Function(statusCode):Boolean} arg.validateStatus - 全局默认的自定义验证器。默认statusCode >= 200 && statusCode < 300
   */
  function Request() {
    var arg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2.default)(this, Request);
    if (!(0, _utils.isPlainObject)(arg)) {
      arg = {};
      //console.warn('设置全局参数必须接收一个Object')
    }

    this.config = _objectSpread(_objectSpread({}, _defaults.default), arg);
    this.interceptors = {
      request: new _InterceptorManager.default(),
      response: new _InterceptorManager.default()
    };
  }

  /**
   * @Function
   * @param {Request~setConfigCallback} f - 设置全局默认配置
   */
  (0, _createClass2.default)(Request, [{
    key: "setConfig",
    value: function setConfig(f) {
      this.config = f(this.config);
    }
  }, {
    key: "_middleware",
    value: function _middleware(config) {
      config = (0, _mergeConfig.default)(this.config, config);
      var chain = [_dispatchRequest.default, undefined];
      var promise = Promise.resolve(config);
      this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
        chain.unshift(interceptor.fulfilled, interceptor.rejected);
      });
      this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
        chain.push(interceptor.fulfilled, interceptor.rejected);
      });
      while (chain.length) {
        promise = promise.then(chain.shift(), chain.shift());
      }
      return promise;
    }

    /**
     * @Function
     * @param {Object} config - 请求配置项
     * @prop {String} options.url - 请求路径
     * @prop {Object} options.data - 请求参数
     * @prop {Object} [options.responseType = config.responseType] [text|arraybuffer] - 响应的数据类型
     * @prop {Object} [options.dataType = config.dataType] - 如果设为 json，会尝试对返回的数据做一次 JSON.parse
     * @prop {Object} [options.header = config.header] - 请求header
     * @prop {Object} [options.method = config.method] - 请求方法
     * @returns {Promise<unknown>}
     */
  }, {
    key: "request",
    value: function request() {
      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this._middleware(config);
    }
  }, {
    key: "get",
    value: function get(url) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.request(_objectSpread({
        url: url,
        method: 'GET'
      }, options));
    }
  }, {
    key: "post",
    value: function post(url, data) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.request(_objectSpread({
        url: url,
        data: data,
        method: 'POST'
      }, options));
    }
  }, {
    key: "put",
    value: function put(url, data) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.request(_objectSpread({
        url: url,
        data: data,
        method: 'PUT'
      }, options));
    }
  }, {
    key: "delete",
    value: function _delete(url, data) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.request(_objectSpread({
        url: url,
        data: data,
        method: 'DELETE'
      }, options));
    }
  }, {
    key: "connect",
    value: function connect(url, data) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.request(_objectSpread({
        url: url,
        data: data,
        method: 'CONNECT'
      }, options));
    }
  }, {
    key: "head",
    value: function head(url, data) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.request(_objectSpread({
        url: url,
        data: data,
        method: 'HEAD'
      }, options));
    }
  }, {
    key: "options",
    value: function options(url, data) {
      var _options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.request(_objectSpread({
        url: url,
        data: data,
        method: 'OPTIONS'
      }, _options));
    }
  }, {
    key: "trace",
    value: function trace(url, data) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.request(_objectSpread({
        url: url,
        data: data,
        method: 'TRACE'
      }, options));
    }
  }, {
    key: "upload",
    value: function upload(url) {
      var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      config.url = url;
      config.method = 'UPLOAD';
      return this._middleware(config);
    }
  }, {
    key: "download",
    value: function download(url) {
      var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      config.url = url;
      config.method = 'DOWNLOAD';
      return this._middleware(config);
    }
  }]);
  return Request;
}();
/**
 * setConfig回调
 * @return {Object} - 返回操作后的config
 * @callback Request~setConfigCallback
 * @param {Object} config - 全局默认config
 */
exports.default = Request;

/***/ }),

/***/ 47:
/*!***********************************************************************!*\
  !*** D:/Desktop/code/ending/shop/lib/request/core/dispatchRequest.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _index = _interopRequireDefault(__webpack_require__(/*! ../adapters/index */ 48));
var _default = function _default(config) {
  config.header = config.header || {};
  return (0, _index.default)(config);
};
exports.default = _default;

/***/ }),

/***/ 48:
/*!*****************************************************************!*\
  !*** D:/Desktop/code/ending/shop/lib/request/adapters/index.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _buildURL = _interopRequireDefault(__webpack_require__(/*! ../helpers/buildURL */ 49));
var _buildFullPath = _interopRequireDefault(__webpack_require__(/*! ../core/buildFullPath */ 51));
var _settle = _interopRequireDefault(__webpack_require__(/*! ../core/settle */ 54));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
/**
 * 返回可选值存在的配置
 * @param {Array} keys - 可选值数组
 * @param {Object} config2 - 配置
 * @return {{}} - 存在的配置项
 */
var mergeKeys = function mergeKeys(keys, config2) {
  var config = {};
  keys.forEach(function (prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    }
  });
  return config;
};
var _default = function _default(config) {
  return new Promise(function (resolve, reject) {
    var _config = {
      url: (0, _buildURL.default)((0, _buildFullPath.default)(config.baseURL, config.url), config.params),
      header: config.header,
      complete: function complete(response) {
        response.config = config;
        try {
          // 对可能字符串不是json 的情况容错
          if (typeof response.data === 'string') {
            response.data = JSON.parse(response.data);
          }
          // eslint-disable-next-line no-empty
        } catch (e) {}
        (0, _settle.default)(resolve, reject, response);
      }
    };
    var requestTask;
    if (config.method === 'UPLOAD') {
      var otherConfig = {
        filePath: config.filePath,
        name: config.name
      };
      var optionalKeys = ['formData'];
      requestTask = uni.uploadFile(_objectSpread(_objectSpread(_objectSpread({}, _config), otherConfig), mergeKeys(optionalKeys, config)));
    } else if (config.method === 'DOWNLOAD') {
      requestTask = uni.downloadFile(_config);
    } else {
      var _optionalKeys = ['data', 'method', 'timeout', 'dataType', 'responseType'];
      requestTask = uni.request(_objectSpread(_objectSpread({}, _config), mergeKeys(_optionalKeys, config)));
    }
    if (config.getTask) {
      config.getTask(requestTask, config);
    }
  });
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 49:
/*!*******************************************************************!*\
  !*** D:/Desktop/code/ending/shop/lib/request/helpers/buildURL.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ 13);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildURL;
var utils = _interopRequireWildcard(__webpack_require__(/*! ./../utils */ 50));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function encode(val) {
  return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
function buildURL(url, params) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }
  var serializedParams;
  if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];
    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }
      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }
      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });
    serializedParams = parts.join('&');
  }
  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }
  return url;
}

/***/ }),

/***/ 5:
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/slicedToArray.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithHoles = __webpack_require__(/*! ./arrayWithHoles.js */ 6);
var iterableToArrayLimit = __webpack_require__(/*! ./iterableToArrayLimit.js */ 7);
var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray.js */ 8);
var nonIterableRest = __webpack_require__(/*! ./nonIterableRest.js */ 10);
function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}
module.exports = _slicedToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 50:
/*!********************************************************!*\
  !*** D:/Desktop/code/ending/shop/lib/request/utils.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// utils is a library of generic helper functions non-specific to axios
var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deepMerge = deepMerge;
exports.forEach = forEach;
exports.isArray = isArray;
exports.isBoolean = isBoolean;
exports.isDate = isDate;
exports.isObject = isObject;
exports.isPlainObject = isPlainObject;
exports.isURLSearchParams = isURLSearchParams;
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && (0, _typeof2.default)(val) === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if ((0, _typeof2.default)(obj) !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }
  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * 是否为boolean 值
 * @param val
 * @returns {boolean}
 */
function isBoolean(val) {
  return typeof val === 'boolean';
}

/**
 * 是否为真正的对象{} new Object
 * @param {any} obj - 检测的对象
 * @returns {boolean}
 */
function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

/**
 * Function equal to merge with the difference being that no reference
 * to original objects is kept.
 *
 * @see merge
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function deepMerge( /* obj1, obj2, obj3, ... */
) {
  var result = {};
  function assignValue(val, key) {
    if ((0, _typeof2.default)(result[key]) === 'object' && (0, _typeof2.default)(val) === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if ((0, _typeof2.default)(val) === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }
  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/***/ }),

/***/ 505:
/*!*****************************************************!*\
  !*** D:/Desktop/code/ending/shop/api/promotions.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllCoupons = getAllCoupons;
exports.getAssembleList = getAssembleList;
exports.getBargainActivity = getBargainActivity;
exports.getBargainDetail = getBargainDetail;
exports.getBargainList = getBargainList;
exports.getBargainLog = getBargainLog;
exports.getLiveList = getLiveList;
exports.getMineBargainLog = getMineBargainLog;
exports.getPointsCategory = getPointsCategory;
exports.getPointsGoods = getPointsGoods;
exports.getPointsGoodsDetail = getPointsGoodsDetail;
exports.getPromotionGroupMember = getPromotionGroupMember;
exports.getSeckillTimeGoods = getSeckillTimeGoods;
exports.getSeckillTimeLine = getSeckillTimeLine;
exports.helpBargain = helpBargain;
exports.openBargain = openBargain;
var _request = __webpack_require__(/*! @/utils/request.js */ 43);
/**
 * 促销相关API
 */

/**
 * 获取当前直播列表
 *
 * @param {*}
 * @returns
 */
function getLiveList(params) {
  return _request.http.request({
    url: "broadcast/studio",
    method: _request.Method.GET,
    params: params
  });
}

/**
 * 获取当前拼团活动的未成团的会员
 */
function getPromotionGroupMember(pintuanId) {
  return _request.http.request({
    url: "promotion/pintuan/".concat(pintuanId, "/members"),
    method: _request.Method.GET
  });
}

/** 获取拼团列表 */
function getAssembleList(params) {
  return _request.http.request({
    url: "promotion/pintuan",
    method: _request.Method.GET,
    loading: false,
    params: params
  });
}

/**
 * 获取积分商城分类
 */
function getPointsCategory() {
  return _request.http.request({
    url: "/promotion/pointsGoods/category",
    method: _request.Method.GET
  });
}

/**
 * 获取积分商城商品
 * @param params
 */
function getPointsGoods(params) {
  return _request.http.request({
    url: "/promotion/pointsGoods",
    method: _request.Method.GET,
    params: params
  });
}
/**
 * 获取积分商城商品详情
 * @param params
 */
function getPointsGoodsDetail(id) {
  return _request.http.request({
    url: "/promotion/pointsGoods/" + id,
    method: _request.Method.GET
  });
}

/**
 * 获取限时抢购时间线 当天限时抢购信息
 */
function getSeckillTimeLine() {
  return _request.http.request({
    url: "promotion/seckill",
    method: _request.Method.GET
  });
}

/**
 * 获取限时抢购商品 获取某个时刻的限时抢购商品信息
 * @param params
 */
function getSeckillTimeGoods(timeline) {
  return _request.http.request({
    url: "promotion/seckill/".concat(timeline),
    method: _request.Method.GET
  });
}

/**
 * 获取全部优惠券
 * @param params
 */
function getAllCoupons(params) {
  return _request.http.request({
    url: "/promotion/coupon",
    method: _request.Method.GET,
    params: params
  });
}

/**
 * 分页获取砍价商品
 * @param params
 */
function getBargainList(params) {
  return _request.http.request({
    url: "/promotion/kanjiaGoods",
    method: _request.Method.GET,
    params: params
  });
}

/**
 * 分页获取砍价商品
 * @param params
 */
function getBargainDetail(id) {
  return _request.http.request({
    url: "/promotion/kanjiaGoods/".concat(id),
    method: _request.Method.GET
  });
}

/**
 * 获取砍价活动
 * @param params
 */
function getBargainActivity(params) {
  return _request.http.request({
    url: "/promotion/kanjiaGoods/getKanjiaActivity",
    method: _request.Method.POST,
    params: params
  });
}

/**
 * 发起砍价活动
 * @param params
 */
function openBargain(params) {
  return _request.http.request({
    url: "/promotion/kanjiaGoods",
    method: _request.Method.POST,
    header: {
      "content-type": "application/x-www-form-urlencoded"
    },
    data: params
  });
}

/**
 * 分页获取砍价活动-帮砍记录
 */
function getBargainLog(params) {
  return _request.http.request({
    url: "/promotion/kanjiaGoods/getKanjiaActivity/logs",
    method: _request.Method.GET,
    data: params
  });
}

/**
 * 分页获取砍价活动-帮砍记录
 */
function helpBargain(kanJiaActivityId) {
  return _request.http.request({
    url: "promotion/kanjiaGoods/help/".concat(kanJiaActivityId),
    method: _request.Method.POST
  });
}

/**
 * 分页获取已参与的砍价活动
 */
function getMineBargainLog(params) {
  return _request.http.request({
    url: "/promotion/kanjiaGoods/kanjiaActivity/mine/",
    method: _request.Method.GET,
    params: params
  });
}

/***/ }),

/***/ 51:
/*!*********************************************************************!*\
  !*** D:/Desktop/code/ending/shop/lib/request/core/buildFullPath.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildFullPath;
var _isAbsoluteURL = _interopRequireDefault(__webpack_require__(/*! ../helpers/isAbsoluteURL */ 52));
var _combineURLs = _interopRequireDefault(__webpack_require__(/*! ../helpers/combineURLs */ 53));
/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !(0, _isAbsoluteURL.default)(requestedURL)) {
    return (0, _combineURLs.default)(baseURL, requestedURL);
  }
  return requestedURL;
}

/***/ }),

/***/ 52:
/*!************************************************************************!*\
  !*** D:/Desktop/code/ending/shop/lib/request/helpers/isAbsoluteURL.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isAbsoluteURL;
function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}

/***/ }),

/***/ 53:
/*!**********************************************************************!*\
  !*** D:/Desktop/code/ending/shop/lib/request/helpers/combineURLs.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = combineURLs;
function combineURLs(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL;
}

/***/ }),

/***/ 538:
/*!*********************************************************************!*\
  !*** D:/Desktop/code/ending/shop/pages/tabbar/home/template/tpl.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.modelNavigateTo = modelNavigateTo;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 30));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 32));
var _config = _interopRequireDefault(__webpack_require__(/*! @/config/config */ 33));
/** 配置楼层模块的跳转 */
function modelNavigateTo(item) {
  var val = item.url || item;
  //链接跳转到专题

  if (val && val.id && val.pageType == "special") {
    uni.navigateTo({
      url: "/pages/tabbar/special/special?id=".concat(val.id)
    });
  }
  switch (val.___type || val.type) {
    case "goods":
      uni.navigateTo({
        url: "/pages/product/goods?id=" + val.id + "&goodsId=" + val.goodsId
      });
      break;
    case "category":
      if (val.id) {
        uni.navigateTo({
          url: "/pages/navigation/search/searchPage?category=".concat(val.id)
        });
      } else {
        uni.navigateTo({
          url: "/pages/navigation/search/searchPage"
        });
      }
      break;
    case "shops":
      uni.navigateTo({
        url: "/pages/product/shopPage?id=".concat(val.id)
      });
      break;
    // 活动
    case "marketing":
      uni.navigateTo({
        url: "/pages/product/goods?id=" + val.skuId + "&goodsId=" + val.goodsId
      });
      break;
    case "pages":
      uni.navigateTo({
        url: val.___path + "?id=" + val.id + "&title=" + val.title
      });
      break;
    case "other":
      switch (val.title || item.title) {
        case "首页":
          uni.switchTab({
            url: "/pages/tabbar/home/index"
          });
          break;
        case "购物车":
          uni.switchTab({
            url: "/pages/tabbar/cart/cartList"
          });
          return;
        case "个人中心":
          uni.switchTab({
            url: "/pages/tabbar/user/my"
          });
          break;
        case "收藏商品":
          uni.navigateTo({
            url: "/pages/mine/myCollect"
          });
          break;
        case "我的订单":
          uni.navigateTo({
            url: "/pages/order/myOrder?status=0"
          });
          break;
        case "领券中心":
          uni.navigateTo({
            url: "/pages/cart/coupon/couponCenter"
          });
          break;
        case "签到":
          uni.navigateTo({
            url: "/pages/mine/signIn"
          });
          break;
        case "秒杀频道":
          uni.navigateTo({
            url: "/pages/promotion/seckill"
          });
          break;
        case "拼团频道":
          uni.navigateTo({
            url: "/pages/promotion/joinGroup"
          });
          break;
        case "小程序直播":
          uni.navigateTo({
            url: "/pages/promotion/lives"
          });
          break;
        case "砍价":
          uni.navigateTo({
            url: "/pages/promotion/bargain/list"
          });
          break;
        case "积分商城":
          uni.navigateTo({
            url: "/pages/promotion/point/pointList"
          });
          break;
        case "店铺列表":
          uni.navigateTo({
            url: "/pages/product/shopList"
          });
          break;
        default:
          break;
      }
      break;
  }
}
function scan() {
  return _scan.apply(this, arguments);
}
/**
 * 提示获取权限
 */
function _scan() {
  _scan = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            seacnCode();
          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _scan.apply(this, arguments);
}
function tipsGetSettings() {
  uni.showModal({
    title: "提示",
    content: "您已经关闭相机权限,去设置",
    success: function success(res) {
      if (res.confirm) {
        if (isIos) {
          plus.runtime.openURL("app-settings:");
        } else {
          permision.gotoAppPermissionSetting();
        }
      }
    }
  });
}
function seacnCode() {
  uni.scanCode({
    success: function success(res) {
      var path = encodeURIComponent(res.result);

      // WX_CODE 为小程序码
      if (res.scanType == "WX_CODE") {
        console.log(res);
        uni.navigateTo({
          url: "/".concat(res.path)
        });
      } else {
        _config.default.scanAuthNavigation.forEach(function (src) {
          if (res.result.indexOf(src) != -1) {
            uni.navigateTo({
              url: "/".concat(res.result.substring(src.length))
            });
          } else {
            setTimeout(function () {
              uni.navigateTo({
                url: "/pages/tabbar/home/web-view?src=" + path
              });
            }, 100);
          }
        });
      }
    }
  });
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 54:
/*!**************************************************************!*\
  !*** D:/Desktop/code/ending/shop/lib/request/core/settle.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = settle;
/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  var status = response.statusCode;
  if (status && (!validateStatus || validateStatus(status))) {
    resolve(response);
  } else {
    reject(response);
  }
}

/***/ }),

/***/ 55:
/*!**************************************************************************!*\
  !*** D:/Desktop/code/ending/shop/lib/request/core/InterceptorManager.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  this.handlers.forEach(function (h) {
    if (h !== null) {
      fn(h);
    }
  });
};
var _default = InterceptorManager;
exports.default = _default;

/***/ }),

/***/ 56:
/*!*******************************************************************!*\
  !*** D:/Desktop/code/ending/shop/lib/request/core/mergeConfig.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _utils = __webpack_require__(/*! ../utils */ 50);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
/**
 * 合并局部配置优先的配置，如果局部有该配置项则用局部，如果全局有该配置项则用全局
 * @param {Array} keys - 配置项
 * @param {Object} globalsConfig - 当前的全局配置
 * @param {Object} config2 - 局部配置
 * @return {{}}
 */
var mergeKeys = function mergeKeys(keys, globalsConfig, config2) {
  var config = {};
  keys.forEach(function (prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof globalsConfig[prop] !== 'undefined') {
      config[prop] = globalsConfig[prop];
    }
  });
  return config;
};
/**
 *
 * @param globalsConfig - 当前实例的全局配置
 * @param config2 - 当前的局部配置
 * @return - 合并后的配置
 */
var _default = function _default(globalsConfig) {
  var config2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var method = config2.method || globalsConfig.method || 'GET';
  var config = {
    baseURL: globalsConfig.baseURL || '',
    method: method,
    url: config2.url || ''
  };
  var mergeDeepPropertiesKeys = ['header', 'params', 'custom'];
  var defaultToConfig2Keys = ['getTask', 'validateStatus'];
  mergeDeepPropertiesKeys.forEach(function (prop) {
    if ((0, _utils.isObject)(config2[prop])) {
      config[prop] = (0, _utils.deepMerge)(globalsConfig[prop], config2[prop]);
    } else if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if ((0, _utils.isObject)(globalsConfig[prop])) {
      config[prop] = (0, _utils.deepMerge)(globalsConfig[prop]);
    } else if (typeof globalsConfig[prop] !== 'undefined') {
      config[prop] = globalsConfig[prop];
    }
  });
  config = _objectSpread(_objectSpread({}, config), mergeKeys(defaultToConfig2Keys, globalsConfig, config2));

  // eslint-disable-next-line no-empty
  if (method === 'DOWNLOAD') {} else if (method === 'UPLOAD') {
    if ((0, _utils.isObject)(config.header)) {
      delete config.header['content-type'];
      delete config.header['Content-Type'];
    }
    var uploadKeys = ['filePath', 'name', 'formData'];
    uploadKeys.forEach(function (prop) {
      if (typeof config2[prop] !== 'undefined') {
        config[prop] = config2[prop];
      }
    });
  } else {
    var defaultsKeys = ['data', 'timeout', 'dataType', 'responseType'];
    config = _objectSpread(_objectSpread({}, config), mergeKeys(defaultsKeys, globalsConfig, config2));
  }
  return config;
};
exports.default = _default;

/***/ }),

/***/ 57:
/*!****************************************************************!*\
  !*** D:/Desktop/code/ending/shop/lib/request/core/defaults.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * 默认的全局配置
 */
var _default = {
  baseURL: '',
  header: {},
  method: 'GET',
  dataType: 'json',
  responseType: 'text',
  custom: {},
  timeout: 30000,
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};
exports.default = _default;

/***/ }),

/***/ 58:
/*!*******************************************************!*\
  !*** D:/Desktop/code/ending/shop/utils/Foundation.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkBankno = checkBankno;
exports.countTimeDown = countTimeDown;
exports.dateToUnix = dateToUnix;
exports.formatPrice = formatPrice;
exports.randomString = randomString;
exports.secrecyMobile = secrecyMobile;
exports.theNextDayTime = theNextDayTime;
exports.unixToDate = unixToDate;
exports.whetherNavigate = whetherNavigate;
/**
 * 一些常用的基础方法
 * whetherNavigate 登录后跳转判断
 * unixToDate    将unix时间戳转换为指定格式
 * dateToUnix    将时间转unix时间戳
 * deepClone     对一个对象进行深拷贝
 * formatPrice   货币格式化
 * secrecyMobile 手机号隐私保护
 * randomString  随机生成指定长度的字符串
 */

/**
 * 验证银行卡号
 */
function checkBankno(bankno) {
  var lastNum = bankno.substr(bankno.length - 1, 1); //取出最后一位（与luhm进行比较）
  var first15Num = bankno.substr(0, bankno.length - 1); //前15或18位
  var newArr = [];
  for (var i = first15Num.length - 1; i > -1; i--) {
    //前15或18位倒序存进数组
    newArr.push(first15Num.substr(i, 1));
  }
  var arrJiShu = []; //奇数位*2的积 <9
  var arrJiShu2 = []; //奇数位*2的积 >9
  var arrOuShu = []; //偶数位数组
  for (var j = 0; j < newArr.length; j++) {
    if ((j + 1) % 2 == 1) {
      //奇数位
      if (parseInt(newArr[j]) * 2 < 9) arrJiShu.push(parseInt(newArr[j]) * 2);else arrJiShu2.push(parseInt(newArr[j]) * 2);
    } //偶数位
    else arrOuShu.push(newArr[j]);
  }
  var jishu_child1 = []; //奇数位*2 >9 的分割之后的数组个位数
  var jishu_child2 = []; //奇数位*2 >9 的分割之后的数组十位数
  for (var h = 0; h < arrJiShu2.length; h++) {
    jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
    jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
  }
  var sumJiShu = 0; //奇数位*2 < 9 的数组之和
  var sumOuShu = 0; //偶数位数组之和
  var sumJiShuChild1 = 0; //奇数位*2 >9 的分割之后的数组个位数之和
  var sumJiShuChild2 = 0; //奇数位*2 >9 的分割之后的数组十位数之和
  var sumTotal = 0;
  for (var m = 0; m < arrJiShu.length; m++) {
    sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
  }
  for (var n = 0; n < arrOuShu.length; n++) {
    sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
  }
  for (var p = 0; p < jishu_child1.length; p++) {
    sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
    sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
  }
  //计算总和
  sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);
  //计算Luhm值
  var k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;
  var luhm = 10 - k;
  if (lastNum == luhm) {
    return true;
  } else {
    return false;
  }
}

/**
 * 登录后跳转判断
 * 计算出当前router路径
 * 1.如果跳转的链接为登录页面或跳转的链接为空页面。则会重新跳转到首页
 * 2.都不满足返回跳转页面
 * @param type  'default' || 'wx'  //返回地址会做判断默认为default
 */

function whetherNavigate() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "default";
  var navigation = getCurrentPages()[getCurrentPages().length - getCurrentPages().length];
  if (getCurrentPages().length > 1) {
    console.log(navigation, getCurrentPages());
    if (navigation.route == "pages/passport/login") {
      navigationToBack(type);
    } else {
      if (!navigation.route || navigation.route == "undefined") {
        navigationToBack(type);
      } else {
        uni.navigateBack({
          delta: getCurrentPages().length - 1
        });
      }
    }
  } else {
    uni.switchTab({
      url: "/pages/tabbar/home/index"
    });
  }
}

/**
 * 将unix时间戳转换为指定格式
 * @param unix   时间戳【秒】
 * @param format 转换格式
 * @returns {*|string}
 */
function unixToDate(unix, format) {
  if (!unix) return unix;
  var _format = format || "yyyy-MM-dd hh:mm:ss";
  var d = new Date(unix);
  var o = {
    "M+": d.getMonth() + 1,
    "d+": d.getDate(),
    "h+": d.getHours(),
    "m+": d.getMinutes(),
    "s+": d.getSeconds(),
    "q+": Math.floor((d.getMonth() + 3) / 3),
    S: d.getMilliseconds()
  };
  if (/(y+)/.test(_format)) _format = _format.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(_format)) _format = _format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
  }
  return _format;
}

/**
 * 将时间转unix时间戳
 * @param date
 * @returns {number} 【秒】
 */
function dateToUnix(date) {
  var newStr = date.replace(/:/g, "-");
  newStr = newStr.replace(/ /g, "-");
  var arr = newStr.split("-");
  var datum = new Date(Date.UTC(arr[0], arr[1] - 1, arr[2], arr[3] - 8 || -8, arr[4] || 0, arr[5] || 0));
  return parseInt(datum.getTime() / 1000);
}

/**
 * 货币格式化
 * @param price
 * @returns {string}
 */
function formatPrice(price) {
  if (typeof price !== "number") return price;
  return String(Number(price).toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * 手机号隐私保护
 * 隐藏中间四位数字
 * @param mobile
 * @returns {*}
 */
function secrecyMobile(mobile) {
  mobile = String(mobile);
  if (!/\d{11}/.test(mobile)) {
    return mobile;
  }
  return mobile.replace(/(\d{3})(\d{4})(\d{4})/, "$1****$3");
}

/**
 * 随机生成指定长度的字符串
 * @param length
 * @returns {string}
 */
function randomString() {
  var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 32;
  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var maxPos = chars.length;
  var _string = "";
  for (var i = 0; i < length; i++) {
    _string += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return _string;
}

/**
 * 计算传秒数的倒计时【天、时、分、秒】
 * @param seconds
 * @returns {{day : *, hours : *, minutes : *, seconds : *}}
 */

function countTimeDown(seconds) {
  var leftTime = function leftTime(time) {
    if (time < 10) time = "0" + time;
    return time + "";
  };
  return {
    day: leftTime(parseInt(seconds / 60 / 60 / 24, 10)),
    hours: leftTime(parseInt(seconds / 60 / 60 % 24, 10)),
    minutes: leftTime(parseInt(seconds / 60 % 60, 10)),
    seconds: leftTime(parseInt(seconds % 60, 10))
  };
}
function navigationToBack(type) {
  if (type == "wx") {
    // console.log(getCurrentPages().length - 3)
    uni.navigateBack({
      delta: getCurrentPages().length
    });
  } else {
    uni.switchTab({
      url: "/pages/tabbar/home/index"
    });
  }
}

/**
 * 计算当前时间到第二天0点的倒计时[秒]
 * @returns {number}
 */
function theNextDayTime() {
  var nowDate = new Date();
  var time = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate() + 1, 0, 0, 0).getTime() - nowDate.getTime();
  return parseInt(time / 1000);
}
module.exports = {
  unixToDate: unixToDate,
  dateToUnix: dateToUnix,
  formatPrice: formatPrice,
  secrecyMobile: secrecyMobile,
  randomString: randomString,
  countTimeDown: countTimeDown,
  theNextDayTime: theNextDayTime,
  whetherNavigate: whetherNavigate,
  checkBankno: checkBankno
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 59:
/*!************************************************!*\
  !*** D:/Desktop/code/ending/shop/utils/md5.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 1.1 Copyright (C) Paul Johnston 1999 - 2002.
 * Code also contributed by Greg Holt
 * See http://pajhome.org.uk/site/legal.html for details.
 */

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y) {
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 0xFFFF;
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function rol(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}

/*
 * These functions implement the four basic operations the algorithm uses.
 */
function cmn(q, a, b, x, s, t) {
  return safe_add(rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
}
function ff(a, b, c, d, x, s, t) {
  return cmn(b & c | ~b & d, a, b, x, s, t);
}
function gg(a, b, c, d, x, s, t) {
  return cmn(b & d | c & ~d, a, b, x, s, t);
}
function hh(a, b, c, d, x, s, t) {
  return cmn(b ^ c ^ d, a, b, x, s, t);
}
function ii(a, b, c, d, x, s, t) {
  return cmn(c ^ (b | ~d), a, b, x, s, t);
}

/*
 * Calculate the MD5 of an array of little-endian words, producing an array
 * of little-endian words.
 */
function coreMD5(x) {
  var a = 1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d = 271733878;
  for (var i = 0; i < x.length; i += 16) {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;
    a = ff(a, b, c, d, x[i + 0], 7, -680876936);
    d = ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = ff(c, d, a, b, x[i + 10], 17, -42063);
    b = ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = gg(b, c, d, a, x[i + 0], 20, -373897302);
    a = gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = hh(a, b, c, d, x[i + 5], 4, -378558);
    d = hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = hh(d, a, b, c, x[i + 0], 11, -358537222);
    c = hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = ii(a, b, c, d, x[i + 0], 6, -198630844);
    d = ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = ii(b, c, d, a, x[i + 9], 21, -343485551);
    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
  }
  return [a, b, c, d];
}

/*
 * Convert an array of little-endian words to a hex string.
 */
function binl2hex(binarray) {
  var hex_tab = "0123456789abcdef";
  var str = "";
  for (var i = 0; i < binarray.length * 4; i++) {
    str += hex_tab.charAt(binarray[i >> 2] >> i % 4 * 8 + 4 & 0xF) + hex_tab.charAt(binarray[i >> 2] >> i % 4 * 8 & 0xF);
  }
  return str;
}

/*
 * Convert an array of little-endian words to a base64 encoded string.
 */
function binl2b64(binarray) {
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var str = "";
  for (var i = 0; i < binarray.length * 32; i += 6) {
    str += tab.charAt(binarray[i >> 5] << i % 32 & 0x3F | binarray[i >> 5 + 1] >> 32 - i % 32 & 0x3F);
  }
  return str;
}

/*
 * Convert an 8-bit character string to a sequence of 16-word blocks, stored
 * as an array, and append appropriate padding for MD4/5 calculation.
 * If any of the characters are >255, the high byte is silently ignored.
 */
function str2binl(str) {
  var nblk = (str.length + 8 >> 6) + 1; // number of 16-word blocks
  var blks = new Array(nblk * 16);
  for (var i = 0; i < nblk * 16; i++) {
    blks[i] = 0;
  }
  for (var i = 0; i < str.length; i++) {
    blks[i >> 2] |= (str.charCodeAt(i) & 0xFF) << i % 4 * 8;
  }
  blks[i >> 2] |= 0x80 << i % 4 * 8;
  blks[nblk * 16 - 2] = str.length * 8;
  return blks;
}

/*
 * Convert a wide-character string to a sequence of 16-word blocks, stored as
 * an array, and append appropriate padding for MD4/5 calculation.
 */
function strw2binl(str) {
  var nblk = (str.length + 4 >> 5) + 1; // number of 16-word blocks
  var blks = new Array(nblk * 16);
  for (var i = 0; i < nblk * 16; i++) {
    blks[i] = 0;
  }
  for (var i = 0; i < str.length; i++) {
    blks[i >> 1] |= str.charCodeAt(i) << i % 2 * 16;
  }
  blks[i >> 1] |= 0x80 << i % 2 * 16;
  blks[nblk * 16 - 2] = str.length * 16;
  return blks;
}

/*
 * External interface
 */
function hexMD5(str) {
  return binl2hex(coreMD5(str2binl(str)));
}
function hexMD5w(str) {
  return binl2hex(coreMD5(strw2binl(str)));
}
function b64MD5(str) {
  return binl2b64(coreMD5(str2binl(str)));
}
function b64MD5w(str) {
  return binl2b64(coreMD5(strw2binl(str)));
}
/* Backward compatibility */
function calcMD5(str) {
  return binl2hex(coreMD5(str2binl(str)));
}
module.exports = {
  md5: hexMD5
};

/***/ }),

/***/ 6:
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithHoles.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
module.exports = _arrayWithHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 60:
/*!*******************************************************!*\
  !*** D:/Desktop/code/ending/shop/js_sdk/t-jwt/jwt.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
var b64re = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
exports.weBtoa = function (string) {
  string = String(string);
  var bitmap,
    a,
    b,
    c,
    result = "",
    i = 0,
    rest = string.length % 3;
  for (; i < string.length;) {
    if ((a = string.charCodeAt(i++)) > 255 || (b = string.charCodeAt(i++)) > 255 || (c = string.charCodeAt(i++)) > 255) throw new TypeError("Failed to execute 'btoa' on 'Window': The string to be encoded contains characters outside of the Latin1 range.");
    bitmap = a << 16 | b << 8 | c;
    result += b64.charAt(bitmap >> 18 & 63) + b64.charAt(bitmap >> 12 & 63) + b64.charAt(bitmap >> 6 & 63) + b64.charAt(bitmap & 63);
  }
  return rest ? result.slice(0, rest - 3) + "===".substring(rest) : result;
};
exports.weAtob = function (string) {
  string = String(string).replace(/[\t\n\f\r ]+/g, "");
  if (!b64re.test(string)) throw new TypeError("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
  string += "==".slice(2 - (string.length & 3));
  var bitmap,
    result = "",
    r1,
    r2,
    i = 0;
  for (; i < string.length;) {
    bitmap = b64.indexOf(string.charAt(i++)) << 18 | b64.indexOf(string.charAt(i++)) << 12 | (r1 = b64.indexOf(string.charAt(i++))) << 6 | (r2 = b64.indexOf(string.charAt(i++)));
    result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) : r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) : String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
  }
  return result;
};
function b64DecodeUnicode(str) {
  return decodeURIComponent(exports.weAtob(str).replace(/(.)/g, function (p) {
    var code = p.charCodeAt(0).toString(16).toUpperCase();
    if (code.length < 2) {
      code = "0" + code;
    }
    return "%" + code;
  }));
}
function base64_url_decode(str) {
  var output = str.replace(/-/g, "+").replace(/_/g, "/");
  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += "==";
      break;
    case 3:
      output += "=";
      break;
    default:
      throw "Illegal base64url string!";
  }
  try {
    return b64DecodeUnicode(output);
  } catch (err) {
    return exports.weAtob(output);
  }
}
function weappJwtDecode(token, options) {
  if (typeof token !== "string") {
    throw "Invalid token specified";
  }
  options = options || {};
  var pos = options.header === true ? 0 : 1;
  try {
    return JSON.parse(base64_url_decode(token.split(".")[pos]));
  } catch (e) {
    throw "Invalid token specified: " + e.message;
  }
}
exports.default = weappJwtDecode;

/***/ }),

/***/ 61:
/*!**********************************************************!*\
  !*** D:/Desktop/code/ending/shop/utils/uuid.modified.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {var __WEBPACK_AMD_DEFINE_RESULT__;//     uuid.js
//
//     Copyright (c) 2010-2012 Robert Kieffer
//     MIT License - http://opensource.org/licenses/mit-license.php

/*global window, require, define */
(function (_window) {
  'use strict';

  // Unique ID creation requires a high quality random # generator.  We feature
  // detect to determine the best RNG source, normalizing to a function that
  // returns 128-bits of randomness, since that's what's usually required
  var _rng, _mathRNG, _nodeRNG, _whatwgRNG, _previousRoot;
  function setupBrowser() {
    // Allow for MSIE11 msCrypto
    //var _crypto = _window.crypto || _window.msCrypto;
    var crypto = {};
    var _crypto = crypto || _window.crypto || _window.msCrypto;
    if (!_rng && _crypto && _crypto.getRandomValues) {
      // WHATWG crypto-based RNG - http://wiki.whatwg.org/wiki/Crypto
      //
      // Moderately fast, high quality
      try {
        var _rnds8 = new Uint8Array(16);
        _whatwgRNG = _rng = function whatwgRNG() {
          _crypto.getRandomValues(_rnds8);
          return _rnds8;
        };
        _rng();
      } catch (e) {}
    }
    if (!_rng) {
      // Math.random()-based (RNG)
      //
      // If all else fails, use Math.random().  It's fast, but is of unspecified
      // quality.
      var _rnds = new Array(16);
      _mathRNG = _rng = function _rng() {
        for (var i = 0, r; i < 16; i++) {
          if ((i & 0x03) === 0) {
            r = Math.random() * 0x100000000;
          }
          _rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
        }
        return _rnds;
      };
      if ('undefined' !== typeof console && console.warn) {
        // console.warn("[SECURITY] node-uuid: crypto not usable, falling back to insecure Math.random()");
      }
    }
  }
  setupBrowser();

  // Buffer class to use
  var BufferClass = 'function' === typeof Buffer ? Buffer : Array;

  // Maps for number <-> hex string conversion
  var _byteToHex = [];
  var _hexToByte = {};
  for (var i = 0; i < 256; i++) {
    _byteToHex[i] = (i + 0x100).toString(16).substr(1);
    _hexToByte[_byteToHex[i]] = i;
  }

  // **`parse()` - Parse a UUID into it's component bytes**
  function parse(s, buf, offset) {
    var i = buf && offset || 0,
      ii = 0;
    buf = buf || [];
    s.toLowerCase().replace(/[0-9a-f]{2}/g, function (oct) {
      if (ii < 16) {
        // Don't overflow!
        buf[i + ii++] = _hexToByte[oct];
      }
    });

    // Zero out remaining bytes if string was short
    while (ii < 16) {
      buf[i + ii++] = 0;
    }
    return buf;
  }

  // **`unparse()` - Convert UUID byte array (ala parse()) into a string**
  function unparse(buf, offset) {
    var i = offset || 0,
      bth = _byteToHex;
    return bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]];
  }

  // **`v1()` - Generate time-based UUID**
  //
  // Inspired by https://github.com/LiosK/UUID.js
  // and http://docs.python.org/library/uuid.html

  // random #'s we need to init node and clockseq
  var _seedBytes = _rng();

  // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
  var _nodeId = [_seedBytes[0] | 0x01, _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]];

  // Per 4.2.2, randomize (14 bit) clockseq
  var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3fff;

  // Previous uuid creation time
  var _lastMSecs = 0,
    _lastNSecs = 0;

  // See https://github.com/broofa/node-uuid for API details
  function v1(options, buf, offset) {
    var i = buf && offset || 0;
    var b = buf || [];
    options = options || {};
    var clockseq = options.clockseq != null ? options.clockseq : _clockseq;

    // UUID timestamps are 100 nano-second units since the Gregorian epoch,
    // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
    // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
    // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
    var msecs = options.msecs != null ? options.msecs : new Date().getTime();

    // Per 4.2.1.2, use count of uuid's generated during the current clock
    // cycle to simulate higher resolution clock
    var nsecs = options.nsecs != null ? options.nsecs : _lastNSecs + 1;

    // Time since last uuid creation (in msecs)
    var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000;

    // Per 4.2.1.2, Bump clockseq on clock regression
    if (dt < 0 && options.clockseq == null) {
      clockseq = clockseq + 1 & 0x3fff;
    }

    // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
    // time interval
    if ((dt < 0 || msecs > _lastMSecs) && options.nsecs == null) {
      nsecs = 0;
    }

    // Per 4.2.1.2 Throw error if too many uuids are requested
    if (nsecs >= 10000) {
      throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
    }
    _lastMSecs = msecs;
    _lastNSecs = nsecs;
    _clockseq = clockseq;

    // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
    msecs += 12219292800000;

    // `time_low`
    var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
    b[i++] = tl >>> 24 & 0xff;
    b[i++] = tl >>> 16 & 0xff;
    b[i++] = tl >>> 8 & 0xff;
    b[i++] = tl & 0xff;

    // `time_mid`
    var tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
    b[i++] = tmh >>> 8 & 0xff;
    b[i++] = tmh & 0xff;

    // `time_high_and_version`
    b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
    b[i++] = tmh >>> 16 & 0xff;

    // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
    b[i++] = clockseq >>> 8 | 0x80;

    // `clock_seq_low`
    b[i++] = clockseq & 0xff;

    // `node`
    var node = options.node || _nodeId;
    for (var n = 0; n < 6; n++) {
      b[i + n] = node[n];
    }
    return buf ? buf : unparse(b);
  }

  // **`v4()` - Generate random UUID**

  // See https://github.com/broofa/node-uuid for API details
  function v4(options, buf, offset) {
    // Deprecated - 'format' argument, as supported in v1.2
    var i = buf && offset || 0;
    if (typeof options === 'string') {
      buf = options === 'binary' ? new BufferClass(16) : null;
      options = null;
    }
    options = options || {};
    var rnds = options.random || (options.rng || _rng)();

    // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
    rnds[6] = rnds[6] & 0x0f | 0x40;
    rnds[8] = rnds[8] & 0x3f | 0x80;

    // Copy bytes to buffer, if provided
    if (buf) {
      for (var ii = 0; ii < 16; ii++) {
        buf[i + ii] = rnds[ii];
      }
    }
    return buf || unparse(rnds);
  }

  // Export public API
  var uuid = v4;
  uuid.v1 = v1;
  uuid.v4 = v4;
  uuid.parse = parse;
  uuid.unparse = unparse;
  uuid.BufferClass = BufferClass;
  uuid._rng = _rng;
  uuid._mathRNG = _mathRNG;
  uuid._nodeRNG = _nodeRNG;
  uuid._whatwgRNG = _whatwgRNG;
  if ( true && module.exports) {
    // Publish as node.js module
    module.exports = uuid;
  } else if (true) {
    // Publish as AMD module
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return uuid;
    }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})('undefined' !== typeof window ? window : null);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../Software/Development/HBuilderX/plugins/uniapp-cli/node_modules/buffer/index.js */ 62).Buffer))

/***/ }),

/***/ 62:
/*!**************************************!*\
  !*** ./node_modules/buffer/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(/*! base64-js */ 63)
var ieee754 = __webpack_require__(/*! ieee754 */ 64)
var isArray = __webpack_require__(/*! isarray */ 65)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 63:
/*!*****************************************!*\
  !*** ./node_modules/base64-js/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ 64:
/*!***************************************!*\
  !*** ./node_modules/ieee754/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ 65:
/*!***************************************!*\
  !*** ./node_modules/isarray/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ 66:
/*!**************************************************!*\
  !*** D:/Desktop/code/ending/shop/store/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 37));
var _storage = _interopRequireDefault(__webpack_require__(/*! @/utils/storage */ 36));
_vue.default.use(_vuex.default);
var store = new _vuex.default.Store({
  state: {
    isShowToast: false,
    // 是否在展示Toast中
    remark: [],
    //填写订单备注
    shareLink: "",
    //分享链接
    verificationKey: "",
    //获取key表示验证通过
    distributionId: "",
    //分销员Id 如果当前账户从未登录过时记录
    hasLogin: _storage.default.getHasLogin(),
    userInfo: _storage.default.getUserInfo(),
    uuid: _storage.default.getUuid(),
    token: ""
  },
  mutations: {
    login: function login(state, userInfo) {
      state.userInfo = userInfo || {};
      state.userName = userInfo.Name || userInfo.Nickname || userInfo.Username || "匿名用户";
      state.hasLogin = true;
    },
    logout: function logout(state) {
      state.userName = "";
      state.hasLogin = false;
    },
    // 设置填写订单中备注
    setRemark: function setRemark(state, remark) {
      state.remark = remark;
    }
  },
  actions: {}
});
var _default = store;
exports.default = _default;

/***/ }),

/***/ 67:
/*!**************************************************!*\
  !*** D:/Desktop/code/ending/shop/api/members.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppendCommentsOrder = AppendCommentsOrder;
exports.addReceipt = addReceipt;
exports.collectionGoods = collectionGoods;
exports.collectionStore = collectionStore;
exports.commentsMemberOrder = commentsMemberOrder;
exports.consultating = consultating;
exports.deleteGoodsCollection = deleteGoodsCollection;
exports.deleteHistoryListId = deleteHistoryListId;
exports.deleteStoreCollection = deleteStoreCollection;
exports.feedBack = feedBack;
exports.getComments = getComments;
exports.getCoupons = getCoupons;
exports.getCouponsNum = getCouponsNum;
exports.getFootprintNum = getFootprintNum;
exports.getGoodsCollection = getGoodsCollection;
exports.getGoodsComments = getGoodsComments;
exports.getGoodsCommentsCount = getGoodsCommentsCount;
exports.getGoodsIsCollect = getGoodsIsCollect;
exports.getMemberCoupons = getMemberCoupons;
exports.getMemberPointSum = getMemberPointSum;
exports.getNoReadMessageNum = getNoReadMessageNum;
exports.getPointsData = getPointsData;
exports.getStoreCollection = getStoreCollection;
exports.getStoreIsCollect = getStoreIsCollect;
exports.getUserInfo = getUserInfo;
exports.getUserRecharge = getUserRecharge;
exports.getUserWallet = getUserWallet;
exports.getWalletLog = getWalletLog;
exports.myTrackList = myTrackList;
exports.payCallback = payCallback;
exports.receiveCoupons = receiveCoupons;
exports.recharge = recharge;
exports.saveUserInfo = saveUserInfo;
exports.withdrawalApply = withdrawalApply;
exports.withdrawalSettingVO = withdrawalSettingVO;
var _storage = _interopRequireDefault(__webpack_require__(/*! @/utils/storage */ 36));
var _request = __webpack_require__(/*! @/utils/request.js */ 43);
/**
 * 意见反馈
 */
function feedBack(params) {
  return _request.http.request({
    url: "/other/feedback",
    method: _request.Method.POST,
    needToken: true,
    params: params
  });
}

// 提现
function withdrawalApply(params) {
  return _request.http.request({
    url: "/wallet/wallet/withdrawal",
    method: _request.Method.POST,
    needToken: true,
    params: params
  });
}

/**
 * 支付结果查询
 * @param orderType 交易类型,可用值:TRADE,ORDER,RECHARGE
 * @param sn   订单编号
 */
function payCallback(params) {
  return _request.http.request({
    url: "/payment/cashier/result",
    method: _request.Method.GET,
    params: params
  });
}

// 在线充值
function recharge(params) {
  return _request.http.request({
    url: "/trade/recharge",
    method: _request.Method.POST,
    params: params
  });
}

/**
 * 分页获取预存款充值记录
 * @param params
 */
function getUserRecharge(params) {
  return _request.http.request({
    url: "/member/recharge",
    method: _request.Method.GET,
    needToken: true,
    params: params
  });
}

/**
 * 分页获取预存款充值记录
 * @param params
 */
function getWalletLog(params) {
  return _request.http.request({
    url: "/wallet/log",
    method: _request.Method.GET,
    needToken: true,
    params: params
  });
}

/**
 * 获取优惠券列表
 * @param params
 */
function getCoupons(params) {
  return _request.http.request({
    url: "/promotion/coupon/getCoupons",
    method: _request.Method.GET,
    needToken: true,
    params: params
  });
}

/**
 * 领取优惠券
 * @param couponId
 */
function receiveCoupons(couponId) {
  return _request.http.request({
    url: "/promotion/coupon/receive/".concat(couponId),
    method: _request.Method.GET,
    needToken: true
  });
}

/**
 * 获取积分明细数据
 * @param params
 * @returns {AxiosPromise}
 */
function getPointsData(params) {
  return _request.http.request({
    url: "member/memberPointsHistory/getByPage",
    method: _request.Method.GET,
    needToken: true,
    params: params
  });
}

/**
 * 获取我的评论列表
 * @param params
 * @returns {AxiosPromise}
 */
function getComments(params) {
  return _request.http.request({
    url: "/member/evaluation",
    method: _request.Method.GET,
    needToken: true,
    params: params
  });
}

/**
 * 获取当前会员的浏览数量是多少
 * @param params
 * @returns {AxiosPromise}
 */
function getFootprintNum(params) {
  return _request.http.request({
    url: "/member/footprint/getFootprintNum",
    method: _request.Method.GET,
    needToken: true,
    params: params
  });
}

/**
 * 订单评论
 * @param params
 */
function commentsMemberOrder(params) {
  return _request.http.request({
    url: "/member/evaluation",
    method: _request.Method.POST,
    needToken: true,
    header: {
      "content-type": "application/x-www-form-urlencoded"
    },
    data: params
  });
}

/**
 * 追加评论
 * @param params
 */
function AppendCommentsOrder(params) {
  return _request.http.request({
    url: "members/comments/additional",
    method: _request.Method.POST,
    needToken: true,
    header: {
      "content-type": "application/x-www-form-urlencoded"
    },
    data: params
  });
}

// TODO 第一版本暂未实现此功能
/**
 * 商品咨询
 * @param goods_id
 * @param ask_content
 */
function consultating(goods_id, ask_content, anonymous) {
  return _request.http.request({
    url: "members/asks",
    method: _request.Method.POST,
    header: {
      "content-type": "application/x-www-form-urlencoded"
    },
    needToken: true,
    data: {
      goods_id: goods_id,
      ask_content: ask_content,
      anonymous: anonymous
    }
  });
}

/**
 * 获取商品收藏
 * @param params
 * @returns {AxiosPromise}
 */
function getGoodsCollection(params, type) {
  return _request.http.request({
    url: "/member/collection/".concat(type),
    method: _request.Method.GET,
    needToken: true,
    loading: false,
    message: false,
    params: params
  });
}

/**
 * 获取商品收藏
 * @param params
 * @returns {AxiosPromise}
 */
function getStoreCollection(params, type) {
  return _request.http.request({
    url: "/member/storeCollection/".concat(type),
    method: _request.Method.GET,
    needToken: true,
    loading: false,
    message: false,
    params: params
  });
}

/**
 * 收藏商品
 * @returns {AxiosPromise}
 */
function collectionGoods(type, id) {
  return _request.http.request({
    url: "/member/collection/add/".concat(type, "/").concat(id),
    method: _request.Method.POST,
    needToken: true
  });
}

/**
 * 删除商品收藏
 * @param ids 收藏ID【集合或单个商品ID】
 * @returns {AxiosPromise}
 */
function deleteGoodsCollection(ids) {
  if (Array.isArray(ids)) {
    ids = ids.join(",");
  }
  return _request.http.request({
    url: "/member/collection/delete/GOODS/".concat(ids),
    method: _request.Method.DELETE,
    needToken: true
  });
}

/**
 * 删除店铺收藏
 * @param store_id
 */
function deleteStoreCollection(store_id) {
  return _request.http.request({
    url: "/member/storeCollection/delete/STORE/".concat(store_id),
    method: _request.Method.DELETE,
    needToken: true
  });
}

/**
 * 获取商品是否被收藏
 * @param good_id
 */
function getGoodsIsCollect(type, good_id) {
  return _request.http.request({
    url: "/member/collection/isCollection/".concat(type, "/").concat(good_id),
    method: _request.Method.GET,
    needToken: true,
    loading: false
  });
}

/**
 * 获取商品是否被收藏
 * @param good_id
 */
function getStoreIsCollect(type, store_id) {
  return _request.http.request({
    url: "/member/storeCollection/isCollection/".concat(type, "/").concat(store_id),
    method: _request.Method.GET,
    needToken: true,
    loading: false
  });
}

/**
 * 收藏店铺
 * @param store_id 店铺ID
 * @returns {AxiosPromise}
 */
function collectionStore(store_id) {
  return _request.http.request({
    url: "/member/storeCollection/add/STORE/".concat(store_id),
    method: _request.Method.POST,
    needToken: true
  });
}

/**
 * 获取当前登录的用户信息
 * @returns {AxiosPromise}
 */
function getUserInfo() {
  return _request.http.request({
    url: "/passport/member",
    method: _request.Method.GET,
    needToken: true
  });
}

/**
 * 获取当前用户的预存款
 * @returns {AxiosPromise}
 */
function getUserWallet() {
  return _request.http.request({
    url: "/wallet/wallet",
    method: _request.Method.GET,
    needToken: true
  });
}

/**
 * 保存用户信息
 * @param params
 * @returns {AxiosPromise}
 */
function saveUserInfo(params) {
  return _request.http.request({
    url: "/passport/member/editOwn",
    method: _request.Method.PUT,
    header: {
      "content-type": "application/x-www-form-urlencoded"
    },
    needToken: true,
    data: params
  });
}

/**
 * 添加发票
 * @param params
 */
function addReceipt(params) {
  return _request.http.request({
    url: "/trade/receipt",
    method: _request.Method.POST,
    needToken: true,
    params: params
  });
}

/**
 * 获取商品评论列表
 * @param goodsId
 * @param params
 */
function getGoodsComments(goodsId, params) {
  return _request.http.request({
    url: "/member/evaluation/".concat(goodsId, "/goodsEvaluation"),
    method: _request.Method.GET,
    loading: false,
    params: params
  });
}

/**
 * 获取商品评论数量统计
 * @param goodsId
 */
function getGoodsCommentsCount(goodsId) {
  return _request.http.request({
    url: "/member/evaluation/".concat(goodsId, "/evaluationNumber"),
    method: _request.Method.GET,
    loading: false
  });
}

/**
 * 获取未读消息数量信息
 */
function getNoReadMessageNum() {
  return _request.http.request({
    url: "members/member-nocice-logs/number",
    method: _request.Method.GET,
    needToken: true
  });
}

/**
 * 我的足迹列表
 * @param pageNumber  pageSize
 *
 */
function myTrackList(params) {
  return _request.http.request({
    url: "/member/footprint",
    method: _request.Method.GET,
    needToken: true,
    params: params
  });
}

/**
 * 根据id删除会员足迹
 * @param id
 */
function deleteHistoryListId(ids) {
  return _request.http.request({
    url: "/member/footprint/delByIds/".concat(ids),
    method: _request.Method.DELETE,
    needToken: true
  });
}

/**
 * 获取当前会员优惠券列表
 * @param
 */
function getMemberCoupons(data) {
  return _request.http.request({
    url: "/promotion/coupon/getCoupons",
    method: _request.Method.GET,
    needToken: true,
    params: data
  });
}

/**
 * 获取当前会员可使用的优惠券数量
 *
 */
function getCouponsNum() {
  return _request.http.request({
    url: "/promotion/coupon/getCouponsNum",
    method: _request.Method.GET,
    needToken: true
  });
}

/**
 * 获取会员积分VO
 * @param
 */
function getMemberPointSum() {
  return _request.http.request({
    url: "member/memberPointsHistory/getMemberPointsHistoryVO",
    method: _request.Method.GET
  });
}

/**
 * 获取会员积分VO
 * @param
 */
function withdrawalSettingVO() {
  return _request.http.request({
    url: "/wallet/wallet/withdrawalSettingVO",
    method: _request.Method.GET,
    needToken: true
  });
}

/***/ }),

/***/ 68:
/*!*****************************************************!*\
  !*** D:/Desktop/code/ending/shop/uview-ui/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mixin = _interopRequireDefault(__webpack_require__(/*! ./libs/mixin/mixin.js */ 69));
var _request = _interopRequireDefault(__webpack_require__(/*! ./libs/request */ 70));
var _queryParams = _interopRequireDefault(__webpack_require__(/*! ./libs/function/queryParams.js */ 74));
var _route = _interopRequireDefault(__webpack_require__(/*! ./libs/function/route.js */ 75));
var _timeFormat = _interopRequireDefault(__webpack_require__(/*! ./libs/function/timeFormat.js */ 76));
var _timeFrom = _interopRequireDefault(__webpack_require__(/*! ./libs/function/timeFrom.js */ 77));
var _colorGradient = _interopRequireDefault(__webpack_require__(/*! ./libs/function/colorGradient.js */ 78));
var _guid = _interopRequireDefault(__webpack_require__(/*! ./libs/function/guid.js */ 79));
var _color = _interopRequireDefault(__webpack_require__(/*! ./libs/function/color.js */ 80));
var _type2icon = _interopRequireDefault(__webpack_require__(/*! ./libs/function/type2icon.js */ 81));
var _randomArray = _interopRequireDefault(__webpack_require__(/*! ./libs/function/randomArray.js */ 82));
var _deepClone = _interopRequireDefault(__webpack_require__(/*! ./libs/function/deepClone.js */ 72));
var _deepMerge = _interopRequireDefault(__webpack_require__(/*! ./libs/function/deepMerge.js */ 71));
var _addUnit = _interopRequireDefault(__webpack_require__(/*! ./libs/function/addUnit.js */ 83));
var _test = _interopRequireDefault(__webpack_require__(/*! ./libs/function/test.js */ 73));
var _random = _interopRequireDefault(__webpack_require__(/*! ./libs/function/random.js */ 84));
var _trim = _interopRequireDefault(__webpack_require__(/*! ./libs/function/trim.js */ 85));
var _toast = _interopRequireDefault(__webpack_require__(/*! ./libs/function/toast.js */ 86));
var _getParent = _interopRequireDefault(__webpack_require__(/*! ./libs/function/getParent.js */ 87));
var _$parent = _interopRequireDefault(__webpack_require__(/*! ./libs/function/$parent.js */ 88));
var _sys = __webpack_require__(/*! ./libs/function/sys.js */ 89);
var _debounce = _interopRequireDefault(__webpack_require__(/*! ./libs/function/debounce.js */ 90));
var _throttle = _interopRequireDefault(__webpack_require__(/*! ./libs/function/throttle.js */ 91));
var _config = _interopRequireDefault(__webpack_require__(/*! ./libs/config/config.js */ 92));
var _zIndex = _interopRequireDefault(__webpack_require__(/*! ./libs/config/zIndex.js */ 93));
// 引入全局mixin

// 引入关于是否mixin集成小程序分享的配置
// import wxshare from './libs/mixin/mpShare.js'
// 全局挂载引入http相关请求拦截插件

function wranning(str) {
  // 开发环境进行信息输出,主要是一些报错信息
  // 这个环境的来由是在程序编写时候,点击hx编辑器运行调试代码的时候,详见:
  // 	https://uniapp.dcloud.io/frame?id=%e5%bc%80%e5%8f%91%e7%8e%af%e5%a2%83%e5%92%8c%e7%94%9f%e4%ba%a7%e7%8e%af%e5%a2%83
  if (true) {
    console.warn(str);
  }
}

// 尝试判断在根目录的/store中是否有$u.mixin.js，此文件uView默认为需要挂在到全局的vuex的state变量
// HX2.6.11版本,放到try中,控制台依然会警告,暂时不用此方式，
// let vuexStore = {};
// try {
// 	vuexStore = require("@/store/$u.mixin.js");
// } catch (e) {
// 	//TODO handle the exception
// }

// post类型对象参数转为get类型url参数

var $u = {
  queryParams: _queryParams.default,
  route: _route.default,
  timeFormat: _timeFormat.default,
  date: _timeFormat.default,
  // 另名date
  timeFrom: _timeFrom.default,
  colorGradient: _colorGradient.default.colorGradient,
  guid: _guid.default,
  color: _color.default,
  sys: _sys.sys,
  os: _sys.os,
  type2icon: _type2icon.default,
  randomArray: _randomArray.default,
  wranning: wranning,
  get: _request.default.get,
  post: _request.default.post,
  put: _request.default.put,
  'delete': _request.default.delete,
  hexToRgb: _colorGradient.default.hexToRgb,
  rgbToHex: _colorGradient.default.rgbToHex,
  test: _test.default,
  random: _random.default,
  deepClone: _deepClone.default,
  deepMerge: _deepMerge.default,
  getParent: _getParent.default,
  $parent: _$parent.default,
  addUnit: _addUnit.default,
  trim: _trim.default,
  type: ['primary', 'success', 'error', 'warning', 'info'],
  http: _request.default,
  toast: _toast.default,
  config: _config.default,
  // uView配置信息相关，比如版本号
  zIndex: _zIndex.default,
  debounce: _debounce.default,
  throttle: _throttle.default
};
var install = function install(Vue) {
  Vue.mixin(_mixin.default);
  if (Vue.prototype.openShare) {
    Vue.mixin(mpShare);
  }
  // Vue.mixin(vuexStore);
  // 时间格式化，同时两个名称，date和timeFormat
  Vue.filter('timeFormat', function (timestamp, format) {
    return (0, _timeFormat.default)(timestamp, format);
  });
  Vue.filter('date', function (timestamp, format) {
    return (0, _timeFormat.default)(timestamp, format);
  });
  // 将多久以前的方法，注入到全局过滤器
  Vue.filter('timeFrom', function (timestamp, format) {
    return (0, _timeFrom.default)(timestamp, format);
  });
  Vue.prototype.$u = $u;
};
var _default = {
  install: install
};
exports.default = _default;

/***/ }),

/***/ 69:
/*!****************************************************************!*\
  !*** D:/Desktop/code/ending/shop/uview-ui/libs/mixin/mixin.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {module.exports = {
  data: function data() {
    return {};
  },
  onLoad: function onLoad() {
    // getRect挂载到$u上，因为这方法需要使用in(this)，所以无法把它独立成一个单独的文件导出
    this.$u.getRect = this.$uGetRect;
  },
  methods: {
    // 查询节点信息
    // 目前此方法在支付宝小程序中无法获取组件跟接点的尺寸，为支付宝的bug(2020-07-21)
    // 解决办法为在组件根部再套一个没有任何作用的view元素
    $uGetRect: function $uGetRect(selector, all) {
      var _this = this;
      return new Promise(function (resolve) {
        uni.createSelectorQuery().in(_this)[all ? 'selectAll' : 'select'](selector).boundingClientRect(function (rect) {
          if (all && Array.isArray(rect) && rect.length) {
            resolve(rect);
          }
          if (!all && rect) {
            resolve(rect);
          }
        }).exec();
      });
    }
  },
  onReachBottom: function onReachBottom() {
    uni.$emit('uOnReachBottom');
  }
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 7:
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) {
        ;
      }
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
module.exports = _iterableToArrayLimit, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 70:
/*!******************************************************************!*\
  !*** D:/Desktop/code/ending/shop/uview-ui/libs/request/index.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ 23));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ 24));
var _deepMerge = _interopRequireDefault(__webpack_require__(/*! ../function/deepMerge */ 71));
var _test = _interopRequireDefault(__webpack_require__(/*! ../function/test */ 73));
var Request = /*#__PURE__*/function () {
  function Request() {
    var _this = this;
    (0, _classCallCheck2.default)(this, Request);
    this.config = {
      baseUrl: '',
      // 请求的根域名
      // 默认的请求头
      header: {},
      method: 'POST',
      // 设置为json，返回后uni.request会对数据进行一次JSON.parse
      dataType: 'json',
      // 此参数无需处理，因为5+和支付宝小程序不支持，默认为text即可
      responseType: 'text',
      showLoading: true,
      // 是否显示请求中的loading
      loadingText: '请求中...',
      loadingTime: 800,
      // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
      timer: null,
      // 定时器
      originalData: false,
      // 是否在拦截器中返回服务端的原始数据，见文档说明
      loadingMask: true // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
    };

    // 拦截器
    this.interceptor = {
      // 请求前的拦截
      request: null,
      // 请求后的拦截
      response: null
    };

    // get请求
    this.get = function (url) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this.request({
        method: 'GET',
        url: url,
        header: header,
        data: data
      });
    };

    // post请求
    this.post = function (url) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this.request({
        url: url,
        method: 'POST',
        header: header,
        data: data
      });
    };

    // put请求，不支持支付宝小程序(HX2.6.15)
    this.put = function (url) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this.request({
        url: url,
        method: 'PUT',
        header: header,
        data: data
      });
    };

    // delete请求，不支持支付宝和头条小程序(HX2.6.15)
    this.delete = function (url) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this.request({
        url: url,
        method: 'DELETE',
        header: header,
        data: data
      });
    };
  }
  (0, _createClass2.default)(Request, [{
    key: "setConfig",
    value:
    // 设置全局默认配置
    function setConfig(customConfig) {
      // 深度合并对象，否则会造成对象深层属性丢失
      this.config = (0, _deepMerge.default)(this.config, customConfig);
    }

    // 主要请求部分
  }, {
    key: "request",
    value: function request() {
      var _this2 = this;
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      // 检查请求拦截
      if (this.interceptor.request && typeof this.interceptor.request === 'function') {
        var tmpConfig = {};
        var interceptorReuest = this.interceptor.request(options);
        if (interceptorReuest === false) {
          // 返回一个处于pending状态中的Promise，来取消原promise，避免进入then()回调
          return new Promise(function () {});
        }
        this.options = interceptorReuest;
      }
      options.dataType = options.dataType || this.config.dataType;
      options.responseType = options.responseType || this.config.responseType;
      options.url = options.url || '';
      options.params = options.params || {};
      options.header = Object.assign(this.config.header, options.header);
      options.method = options.method || this.config.method;
      return new Promise(function (resolve, reject) {
        options.complete = function (response) {
          // 请求返回后，隐藏loading(如果请求返回快的话，可能会没有loading)
          uni.hideLoading();
          // 清除定时器，如果请求回来了，就无需loading
          clearTimeout(_this2.config.timer);
          _this2.config.timer = null;
          // 判断用户对拦截返回数据的要求，如果originalData为true，返回所有的数据(response)到拦截器，否则只返回response.data
          if (_this2.config.originalData) {
            // 判断是否存在拦截器
            if (_this2.interceptor.response && typeof _this2.interceptor.response === 'function') {
              var resInterceptors = _this2.interceptor.response(response);
              // 如果拦截器不返回false，就将拦截器返回的内容给this.$u.post的then回调
              if (resInterceptors !== false) {
                resolve(resInterceptors);
              } else {
                // 如果拦截器返回false，意味着拦截器定义者认为返回有问题，直接接入catch回调
                reject(response);
              }
            } else {
              // 如果要求返回原始数据，就算没有拦截器，也返回最原始的数据
              resolve(response);
            }
          } else {
            if (response.statusCode == 200) {
              if (_this2.interceptor.response && typeof _this2.interceptor.response === 'function') {
                var _resInterceptors = _this2.interceptor.response(response.data);
                if (_resInterceptors !== false) {
                  resolve(_resInterceptors);
                } else {
                  reject(response.data);
                }
              } else {
                // 如果不是返回原始数据(originalData=false)，且没有拦截器的情况下，返回纯数据给then回调
                resolve(response.data);
              }
            } else {
              // 不返回原始数据的情况下，服务器状态码不为200，modal弹框提示
              if (response.errMsg) {
                uni.showModal({
                  title: response.errMsg
                });
              }
              reject(response);
            }
          }
        };

        // 判断用户传递的URL是否/开头,如果不是,加上/，这里使用了uView的test.js验证库的url()方法
        options.url = _test.default.url(options.url) ? options.url : _this2.config.baseUrl + (options.url.indexOf('/') == 0 ? options.url : '/' + options.url);

        // 是否显示loading
        // 加一个是否已有timer定时器的判断，否则有两个同时请求的时候，后者会清除前者的定时器id
        // 而没有清除前者的定时器，导致前者超时，一直显示loading
        if (_this2.config.showLoading && !_this2.config.timer) {
          _this2.config.timer = setTimeout(function () {
            uni.showLoading({
              title: _this2.config.loadingText,
              mask: _this2.config.loadingMask
            });
            _this2.config.timer = null;
          }, _this2.config.loadingTime);
        }
        uni.request(options);
      });
      // .catch(res => {
      // 	// 如果返回reject()，不让其进入this.$u.post().then().catch()后面的catct()
      // 	// 因为很多人都会忘了写后面的catch()，导致报错捕获不到catch
      // 	return new Promise(()=>{});
      // })
    }
  }]);
  return Request;
}();
var _default = new Request();
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 71:
/*!***********************************************************************!*\
  !*** D:/Desktop/code/ending/shop/uview-ui/libs/function/deepMerge.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
var _deepClone = _interopRequireDefault(__webpack_require__(/*! ./deepClone */ 72));
// JS对象深度合并
function deepMerge() {
  var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  target = (0, _deepClone.default)(target);
  if ((0, _typeof2.default)(target) !== 'object' || (0, _typeof2.default)(source) !== 'object') return false;
  for (var prop in source) {
    if (!source.hasOwnProperty(prop)) continue;
    if (prop in target) {
      if ((0, _typeof2.default)(target[prop]) !== 'object') {
        target[prop] = source[prop];
      } else {
        if ((0, _typeof2.default)(source[prop]) !== 'object') {
          target[prop] = source[prop];
        } else {
          if (target[prop].concat && source[prop].concat) {
            target[prop] = target[prop].concat(source[prop]);
          } else {
            target[prop] = deepMerge(target[prop], source[prop]);
          }
        }
      }
    } else {
      target[prop] = source[prop];
    }
  }
  return target;
}
var _default = deepMerge;
exports.default = _default;

/***/ }),

/***/ 72:
/*!***********************************************************************!*\
  !*** D:/Desktop/code/ending/shop/uview-ui/libs/function/deepClone.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
}

// 深度克隆
function deepClone(obj) {
  // 对常见的“非”值，直接返回原来值
  if ([null, undefined, NaN, false].includes(obj)) return obj;
  if ((0, _typeof2.default)(obj) !== "object" && typeof obj !== 'function') {
    //原始类型直接返回
    return obj;
  }
  var o = isArray(obj) ? [] : {};
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = (0, _typeof2.default)(obj[i]) === "object" ? deepClone(obj[i]) : obj[i];
    }
  }
  return o;
}
var _default = deepClone;
exports.default = _default;

/***/ }),

/***/ 73:
/*!******************************************************************!*\
  !*** D:/Desktop/code/ending/shop/uview-ui/libs/function/test.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
/**
 * 验证电子邮箱格式
 */
function email(value) {
  return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value);
}

/**
 * 验证手机格式
 */
function mobile(value) {
  return /^1[23456789]\d{9}$/.test(value);
}

/**
 * 验证URL格式
 */
function url(value) {
  return /^((https|http|ftp|rtsp|mms):\/\/)(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-zA-Z_!~*'()-]+.)*([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z].[a-zA-Z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+\/?)$/.test(value);
}

/**
 * 验证日期格式
 */
function date(value) {
  return !/Invalid|NaN/.test(new Date(value).toString());
}

/**
 * 验证ISO类型的日期格式
 */
function dateISO(value) {
  return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
}

/**
 * 验证十进制数字
 */
function number(value) {
  return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
}

/**
 * 验证整数
 */
function digits(value) {
  return /^\d+$/.test(value);
}

/**
 * 验证身份证号码
 */
function idCard(value) {
  return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value);
}

/**
 * 是否车牌号
 */
function carNo(value) {
  // 新能源车牌
  var xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
  // 旧车牌
  var creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
  if (value.length === 7) {
    return creg.test(value);
  } else if (value.length === 8) {
    return xreg.test(value);
  } else {
    return false;
  }
}

/**
 * 金额,只允许2位小数
 */
function amount(value) {
  //金额，只允许保留两位小数
  return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value);
}

/**
 * 中文
 */
function chinese(value) {
  var reg = /^[\u4e00-\u9fa5]+$/gi;
  return reg.test(value);
}

/**
 * 只能输入字母
 */
function letter(value) {
  return /^[a-zA-Z]*$/.test(value);
}

/**
 * 只能是字母或者数字
 */
function enOrNum(value) {
  //英文或者数字
  var reg = /^[0-9a-zA-Z]*$/g;
  return reg.test(value);
}

/**
 * 验证是否包含某个值
 */
function contains(value, param) {
  return value.indexOf(param) >= 0;
}

/**
 * 验证一个值范围[min, max]
 */
function range(value, param) {
  return value >= param[0] && value <= param[1];
}

/**
 * 验证一个长度范围[min, max]
 */
function rangeLength(value, param) {
  return value.length >= param[0] && value.length <= param[1];
}

/**
 * 是否固定电话
 */
function landline(value) {
  var reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
  return reg.test(value);
}

/**
 * 判断是否为空
 */
function empty(value) {
  switch ((0, _typeof2.default)(value)) {
    case 'undefined':
      return true;
    case 'string':
      if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true;
      break;
    case 'boolean':
      if (!value) return true;
      break;
    case 'number':
      if (0 === value || isNaN(value)) return true;
      break;
    case 'object':
      if (null === value || value.length === 0) return true;
      for (var i in value) {
        return false;
      }
      return true;
  }
  return false;
}

/**
 * 是否json字符串
 */
function jsonString(value) {
  if (typeof value == 'string') {
    try {
      var obj = JSON.parse(value);
      if ((0, _typeof2.default)(obj) == 'object' && obj) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
  return false;
}

/**
 * 是否数组
 */
function array(value) {
  if (typeof Array.isArray === "function") {
    return Array.isArray(value);
  } else {
    return Object.prototype.toString.call(value) === "[object Array]";
  }
}

/**
 * 是否对象
 */
function object(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
}
var _default = {
  email: email,
  mobile: mobile,
  url: url,
  date: date,
  dateISO: dateISO,
  number: number,
  digits: digits,
  idCard: idCard,
  carNo: carNo,
  amount: amount,
  chinese: chinese,
  letter: letter,
  enOrNum: enOrNum,
  contains: contains,
  range: range,
  rangeLength: rangeLength,
  empty: empty,
  isEmpty: empty,
  jsonString: jsonString,
  landline: landline,
  object: object,
  array: array
};
exports.default = _default;

/***/ }),

/***/ 74:
/*!*************************************************************************!*\
  !*** D:/Desktop/code/ending/shop/uview-ui/libs/function/queryParams.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * 对象转url参数
 * @param {*} data,对象
 * @param {*} isPrefix,是否自动加上"?"
 */
function queryParams() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var isPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var arrayFormat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'brackets';
  var prefix = isPrefix ? '?' : '';
  var _result = [];
  if (['indices', 'brackets', 'repeat', 'comma'].indexOf(arrayFormat) == -1) arrayFormat = 'brackets';
  var _loop = function _loop(key) {
    var value = data[key];
    // 去掉为空的参数
    if (['', undefined, null].indexOf(value) >= 0) {
      return "continue";
    }
    // 如果值为数组，另行处理
    if (value.constructor === Array) {
      // e.g. {ids: [1, 2, 3]}
      switch (arrayFormat) {
        case 'indices':
          // 结果: ids[0]=1&ids[1]=2&ids[2]=3
          for (var i = 0; i < value.length; i++) {
            _result.push(key + '[' + i + ']=' + value[i]);
          }
          break;
        case 'brackets':
          // 结果: ids[]=1&ids[]=2&ids[]=3
          value.forEach(function (_value) {
            _result.push(key + '[]=' + _value);
          });
          break;
        case 'repeat':
          // 结果: ids=1&ids=2&ids=3
          value.forEach(function (_value) {
            _result.push(key + '=' + _value);
          });
          break;
        case 'comma':
          // 结果: ids=1,2,3
          var commaStr = "";
          value.forEach(function (_value) {
            commaStr += (commaStr ? "," : "") + _value;
          });
          _result.push(key + '=' + commaStr);
          break;
        default:
          value.forEach(function (_value) {
            _result.push(key + '[]=' + _value);
          });
      }
    } else {
      _result.push(key + '=' + value);
    }
  };
  for (var key in data) {
    var _ret = _loop(key);
    if (_ret === "continue") continue;
  }
  return _result.length ? prefix + _result.join('&') : '';
}
var _default = queryParams;
exports.default = _default;

/***/ }),

/***/ 75:
/*!*******************************************************************!*\
  !*** D:/Desktop/code/ending/shop/uview-ui/libs/function/route.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
var _queryParams = _interopRequireDefault(__webpack_require__(/*! ../../libs/function/queryParams.js */ 74));
/**
 * 路由跳转
 * 注意:本方法没有对跳转的回调函数进行封装
 */
function route() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var config = {
    type: 'navigateTo',
    url: '',
    delta: 1,
    // navigateBack页面后退时,回退的层数
    params: {},
    // 传递的参数
    animationType: 'pop-in',
    // 窗口动画,只在APP有效
    animationDuration: 300 // 窗口动画持续时间,单位毫秒,只在APP有效
  };

  config = Object.assign(config, options);
  // 如果url没有"/"开头，添加上，因为uni的路由跳转需要"/"开头
  if (config.url[0] != '/') config.url = '/' + config.url;
  // 判断是否有传递显式的参数,Object.keys转为数组并判断长度,switchTab类型时不能携带参数
  if (Object.keys(config.params).length && config.type != 'switchTab') {
    // 判断用户传递的url中，是否带有参数
    // 使用正则匹配，主要依据是判断是否有"/","?","="等，如“/page/index/index?name=mary"
    // 如果有url中有get参数，转换后无需带上"?"
    var query = '';
    if (/.*\/.*\?.*=.*/.test(config.url)) {
      // object对象转为get类型的参数
      query = (0, _queryParams.default)(config.params, false);
      // 因为已有get参数,所以后面拼接的参数需要带上"&"隔开
      config.url += "&" + query;
    } else {
      query = (0, _queryParams.default)(config.params);
      config.url += query;
    }
  }
  // 简写形式，把url和参数拼接起来
  if (typeof options === 'string' && (0, _typeof2.default)(params) == 'object') {
    var _query = '';
    if (/.*\/.*\?.*=.*/.test(options)) {
      // object对象转为get类型的参数
      _query = (0, _queryParams.default)(params, false);
      // 因为已有get参数,所以后面拼接的参数需要带上"&"隔开
      options += "&" + _query;
    } else {
      _query = (0, _queryParams.default)(params);
      options += _query;
    }
  }
  // 判断是否一个字符串，如果是，直接跳转(简写法)
  // 如果是中情形，默认第二个参数为对象形式的参数
  if (typeof options === 'string') {
    if (options[0] != '/') options = '/' + options;
    return uni.navigateTo({
      url: options
    });
  }
  // navigateTo类型的跳转
  if (config.type == 'navigateTo' || config.type == 'to') {
    return uni.navigateTo({
      url: config.url,
      animationType: config.animationType,
      animationDuration: config.animationDuration
    });
  }
  if (config.type == 'redirectTo' || config.type == 'redirect') {
    return uni.redirectTo({
      url: config.url
    });
  }
  if (config.type == 'switchTab' || config.type == 'tab') {
    return uni.switchTab({
      url: config.url
    });
  }
  if (config.type == 'reLaunch') {
    return uni.reLaunch({
      url: config.url
    });
  }
  if (config.type == 'navigateBack' || config.type == 'back') {
    return uni.navigateBack({
      delta: parseInt(config.delta ? config.delta : this.delta)
    });
  }
}
var _default = route;
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 750:
/*!************************************************!*\
  !*** D:/Desktop/code/ending/shop/api/order.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cancelOrder = cancelOrder;
exports.confirmReceipt = confirmReceipt;
exports.getOrderDetail = getOrderDetail;
exports.getOrderList = getOrderList;
exports.getPinTuanShare = getPinTuanShare;
exports.getReceipt = getReceipt;
exports.getReceiptDetail = getReceiptDetail;
exports.selectedShipMethod = selectedShipMethod;
var _request = __webpack_require__(/*! @/utils/request.js */ 43);
/**
 * 订单相关API
 */

/**
 * 选择发票
 * @param params
 */
function getReceipt(params) {
  return _request.http.request({
    url: "/trade/carts/select/receipt",
    method: _request.Method.GET,
    needToken: true,
    params: params
  });
}

/**
 * 选择发票
 * @param id
 */
function getReceiptDetail(id) {
  return _request.http.request({
    url: "/trade/receipt/".concat(id),
    method: _request.Method.GET,
    needToken: true
  });
}

/**
 * 选择配送方式
 * @param params
 */
function selectedShipMethod(params) {
  return _request.http.request({
    url: "/trade/carts/shippingMethod",
    method: _request.Method.GET,
    needToken: true,
    params: params
  });
}

/**
 * 获取订单列表
 * @param params
 */
function getOrderList(params) {
  return _request.http.request({
    url: "/order/order",
    method: _request.Method.GET,
    needToken: true,
    params: params
  });
}

/**
 * 获取订单详情
 * @param orderSn 订单编号
 */
function getOrderDetail(orderSn) {
  return _request.http.request({
    url: "/order/order/".concat(orderSn),
    method: _request.Method.GET,
    needToken: true
  });
}

/**
 * 取消订单
 * @param orderSn 订单编号
 * @param reason   取消原因
 */
function cancelOrder(orderSn, reason) {
  return _request.http.request({
    url: "/order/order/".concat(orderSn, "/cancel"),
    method: _request.Method.POST,
    needToken: true,
    header: {
      "content-type": "application/x-www-form-urlencoded"
    },
    data: reason
  });
}

/**
 * 确认收货
 * @param orderSn 订单编号
 */
function confirmReceipt(orderSn) {
  return _request.http.request({
    url: "/order/order/".concat(orderSn, "/receiving"),
    method: _request.Method.POST,
    needToken: true
  });
}

/**
 * 获取当前拼团订单的拼团分享信息
 * @param {*} parentOrderSn
 * @param {*} skuId
 */
function getPinTuanShare(parentOrderSn, skuId) {
  return _request.http.request({
    url: "promotion/pintuan/share",
    method: _request.Method.GET,
    needToken: true,
    params: {
      parentOrderSn: parentOrderSn,
      skuId: skuId
    }
  });
}

/***/ }),

/***/ 76:
/*!************************************************************************!*\
  !*** D:/Desktop/code/ending/shop/uview-ui/libs/function/timeFormat.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// padStart 的 polyfill，因为某些机型或情况，还无法支持es7的padStart，比如电脑版的微信小程序
// 所以这里做一个兼容polyfill的兼容处理
if (!String.prototype.padStart) {
  // 为了方便表示这里 fillString 用了ES6 的默认参数，不影响理解
  String.prototype.padStart = function (maxLength) {
    var fillString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ' ';
    if (Object.prototype.toString.call(fillString) !== "[object String]") throw new TypeError('fillString must be String');
    var str = this;
    // 返回 String(str) 这里是为了使返回的值是字符串字面量，在控制台中更符合直觉
    if (str.length >= maxLength) return String(str);
    var fillLength = maxLength - str.length,
      times = Math.ceil(fillLength / fillString.length);
    while (times >>= 1) {
      fillString += fillString;
      if (times === 1) {
        fillString += fillString;
      }
    }
    return fillString.slice(0, fillLength) + str;
  };
}
function timeFormat() {
  var timestamp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var fmt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  // 其他更多是格式化有如下:
  // yyyy:mm:dd|yyyy:mm|yyyy年mm月dd日|yyyy年mm月dd日 hh时MM分等,可自定义组合
  timestamp = parseInt(timestamp);
  // 如果为null,则格式化当前时间
  if (!timestamp) timestamp = Number(new Date());
  // 判断用户输入的时间戳是秒还是毫秒,一般前端js获取的时间戳是毫秒(13位),后端传过来的为秒(10位)
  if (timestamp.toString().length == 10) timestamp *= 1000;
  var date = new Date(timestamp);
  var ret;
  var opt = {
    "y+": date.getFullYear().toString(),
    // 年
    "m+": (date.getMonth() + 1).toString(),
    // 月
    "d+": date.getDate().toString(),
    // 日
    "h+": date.getHours().toString(),
    // 时
    "M+": date.getMinutes().toString(),
    // 分
    "s+": date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };

  for (var k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0"));
    }
    ;
  }
  ;
  return fmt;
}
var _default = timeFormat;
exports.default = _default;

/***/ }),

/***/ 77:
/*!**********************************************************************!*\
  !*** D:/Desktop/code/ending/shop/uview-ui/libs/function/timeFrom.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _timeFormat = _interopRequireDefault(__webpack_require__(/*! ../../libs/function/timeFormat.js */ 76));
/**
 * 时间戳转为多久之前
 * @param String timestamp 时间戳
 * @param String | Boolean format 如果为时间格式字符串，超出一定时间范围，返回固定的时间格式；
 * 如果为布尔值false，无论什么时间，都返回多久以前的格式
 */
function timeFrom() {
  var timestamp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  if (timestamp == null) timestamp = Number(new Date());
  timestamp = parseInt(timestamp);
  // 判断用户输入的时间戳是秒还是毫秒,一般前端js获取的时间戳是毫秒(13位),后端传过来的为秒(10位)
  if (timestamp.toString().length == 10) timestamp *= 1000;
  var timer = new Date().getTime() - timestamp;
  timer = parseInt(timer / 1000);
  // 如果小于5分钟,则返回"刚刚",其他以此类推
  var tips = '';
  switch (true) {
    case timer < 300:
      tips = '刚刚';
      break;
    case timer >= 300 && timer < 3600:
      tips = parseInt(timer / 60) + '分钟前';
      break;
    case timer >= 3600 && timer < 86400:
      tips = parseInt(timer / 3600) + '小时前';
      break;
    case timer >= 86400 && timer < 2592000:
      tips = parseInt(timer / 86400) + '天前';
      break;
    default:
      // 如果format为false，则无论什么时间戳，都显示xx之前
      if (format === false) {
        if (timer >= 2592000 && timer < 365 * 86400) {
          tips = parseInt(timer / (86400 * 30)) + '个月前';
        } else {
          tips = parseInt(timer / (86400 * 365)) + '年前';
        }
      } else {
        tips = (0, _timeFormat.default)(timestamp, format);
      }
  }
  return tips;
}
var _default = timeFrom;
exports.default = _default;

/***/ }),

/***/ 78:
/*!***************************************************************************!*\
  !*** D:/Desktop/code/ending/shop/uview-ui/libs/function/colorGradient.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * 求两个颜色之间的渐变值
 * @param {string} startColor 开始的颜色
 * @param {string} endColor 结束的颜色
 * @param {number} step 颜色等分的份额
 * */
function colorGradient() {
  var startColor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'rgb(0, 0, 0)';
  var endColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rgb(255, 255, 255)';
  var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
  var startRGB = hexToRgb(startColor, false); //转换为rgb数组模式
  var startR = startRGB[0];
  var startG = startRGB[1];
  var startB = startRGB[2];
  var endRGB = hexToRgb(endColor, false);
  var endR = endRGB[0];
  var endG = endRGB[1];
  var endB = endRGB[2];
  var sR = (endR - startR) / step; //总差值
  var sG = (endG - startG) / step;
  var sB = (endB - startB) / step;
  var colorArr = [];
  for (var i = 0; i < step; i++) {
    //计算每一步的hex值 
    var hex = rgbToHex('rgb(' + Math.round(sR * i + startR) + ',' + Math.round(sG * i + startG) + ',' + Math.round(sB * i + startB) + ')');
    colorArr.push(hex);
  }
  return colorArr;
}

// 将hex表示方式转换为rgb表示方式(这里返回rgb数组模式)
function hexToRgb(sColor) {
  var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  sColor = sColor.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = "#";
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    //处理六位的颜色值
    var sColorChange = [];
    for (var _i = 1; _i < 7; _i += 2) {
      sColorChange.push(parseInt("0x" + sColor.slice(_i, _i + 2)));
    }
    if (!str) {
      return sColorChange;
    } else {
      return "rgb(".concat(sColorChange[0], ",").concat(sColorChange[1], ",").concat(sColorChange[2], ")");
    }
  } else if (/^(rgb|RGB)/.test(sColor)) {
    var arr = sColor.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    return arr.map(function (val) {
      return Number(val);
    });
  } else {
    return sColor;
  }
}
;

// 将rgb表示方式转换为hex表示方式
function rgbToHex(rgb) {
  var _this = rgb;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  if (/^(rgb|RGB)/.test(_this)) {
    var aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    var strHex = "#";
    for (var i = 0; i < aColor.length; i++) {
      var hex = Number(aColor[i]).toString(16);
      hex = String(hex).length == 1 ? 0 + '' + hex : hex; // 保证每个rgb的值为2位
      if (hex === "0") {
        hex += hex;
      }
      strHex += hex;
    }
    if (strHex.length !== 7) {
      strHex = _this;
    }
    return strHex;
  } else if (reg.test(_this)) {
    var aNum = _this.replace(/#/, "").split("");
    if (aNum.length === 6) {
      return _this;
    } else if (aNum.length === 3) {
      var numHex = "#";
      for (var _i2 = 0; _i2 < aNum.length; _i2 += 1) {
        numHex += aNum[_i2] + aNum[_i2];
      }
      return numHex;
    }
  } else {
    return _this;
  }
}
var _default = {
  colorGradient: colorGradient,
  hexToRgb: hexToRgb,
  rgbToHex: rgbToHex
};
exports.default = _default;

/***/ }),

/***/ 79:
/*!******************************************************************!*\
  !*** D:/Desktop/code/ending/shop/uview-ui/libs/function/guid.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * 本算法来源于简书开源代码，详见：https://www.jianshu.com/p/fdbf293d0a85
 * 全局唯一标识符（uuid，Globally Unique Identifier）,也称作 uuid(Universally Unique IDentifier) 
 * 一般用于多个组件之间,给它一个唯一的标识符,或者v-for循环的时候,如果使用数组的index可能会导致更新列表出现问题
 * 最可能的情况是左滑删除item或者对某条信息流"不喜欢"并去掉它的时候,会导致组件内的数据可能出现错乱
 * v-for的时候,推荐使用后端返回的id而不是循环的index
 * @param {Number} len uuid的长度
 * @param {Boolean} firstU 将返回的首字母置为"u"
 * @param {Nubmer} radix 生成uuid的基数(意味着返回的字符串都是这个基数),2-二进制,8-八进制,10-十进制,16-十六进制
 */
function guid() {
  var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 32;
  var firstU = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var radix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [];
  radix = radix || chars.length;
  if (len) {
    // 如果指定uuid长度,只是取随机的字符,0|x为位运算,能去掉x的小数位,返回整数位
    for (var i = 0; i < len; i++) {
      uuid[i] = chars[0 | Math.random() * radix];
    }
  } else {
    var r;
    // rfc4122标准要求返回的uuid中,某些位为固定的字符
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';
    for (var _i = 0; _i < 36; _i++) {
      if (!uuid[_i]) {
        r = 0 | Math.random() * 16;
        uuid[_i] = chars[_i == 19 ? r & 0x3 | 0x8 : r];
      }
    }
  }
  // 移除第一个字符,并用u替代,因为第一个字符为数值时,该guuid不能用作id或者class
  if (firstU) {
    uuid.shift();
    return 'u' + uuid.join('');
  } else {
    return uuid.join('');
  }
}
var _default = guid;
exports.default = _default;

/***/ }),

/***/ 8:
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray.js */ 9);
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}
module.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 80:
/*!*******************************************************************!*\
  !*** D:/Desktop/code/ending/shop/uview-ui/libs/function/color.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// 为了让用户能够自定义主题，会逐步弃用此文件，各颜色通过css提供
// 为了给某些特殊场景使用和向后兼容，无需删除此文件(2020-06-20)
var color = {
  primary: "#2979ff",
  primaryDark: "#2b85e4",
  primaryDisabled: "#a0cfff",
  primaryLight: "#ecf5ff",
  bgColor: "#f3f4f6",
  info: "#909399",
  infoDark: "#82848a",
  infoDisabled: "#c8c9cc",
  infoLight: "#f4f4f5",
  warning: "#ff9900",
  warningDark: "#f29100",
  warningDisabled: "#fcbd71",
  warningLight: "#fdf6ec",
  error: "#fa3534",
  errorDark: "#dd6161",
  errorDisabled: "#fab6b6",
  errorLight: "#fef0f0",
  success: "#19be6b",
  successDark: "#18b566",
  successDisabled: "#71d5a1",
  successLight: "#dbf1e1",
  mainColor: "#303133",
  contentColor: "#606266",
  tipsColor: "#909399",
  lightColor: "#c0c4cc",
  borderColor: "#e4e7ed"
};
var _default = color;
exports.default = _default;

/***/ }),

/***/ 81:
/*!***********************************************************************!*\
  !*** D:/Desktop/code/ending/shop/uview-ui/libs/function/type2icon.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * 根据主题type值,获取对应的图标
 * @param String type 主题名称,primary|info|error|warning|success
 * @param String fill 是否使用fill填充实体的图标  
 */
function type2icon() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'success';
  var fill = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  // 如果非预置值,默认为success
  if (['primary', 'info', 'error', 'warning', 'success'].indexOf(type) == -1) type = 'success';
  var iconName = '';
  // 目前(2019-12-12),info和primary使用同一个图标
  switch (type) {
    case 'primary':
      iconName = 'info-circle';
      break;
    case 'info':
      iconName = 'info-circle';
      break;
    case 'error':
      iconName = 'close-circle';
      break;
    case 'warning':
      iconName = 'error-circle';
      break;
    case 'success':
      iconName = 'checkmark-circle';
      break;
    default:
      iconName = 'checkmark-circle';
  }
  // 是否是实体类型,加上-fill,在icon组件库中,实体的类名是后面加-fill的
  if (fill) iconName += '-fill';
  return iconName;
}
var _default = type2icon;
exports.default = _default;

/***/ }),

/***/ 82:
/*!*************************************************************************!*\
  !*** D:/Desktop/code/ending/shop/uview-ui/libs/function/randomArray.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// 打乱数组
function randomArray() {
  var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  // 原理是sort排序,Math.random()产生0<= x < 1之间的数,会导致x-0.05大于或者小于0
  return array.sort(function () {
    return Math.random() - 0.5;
  });
}
var _default = randomArray;
exports.default = _default;

/***/ }),

/***/ 83:
/*!*********************************************************************!*\
  !*** D:/Desktop/code/ending/shop/uview-ui/libs/function/addUnit.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addUnit;
var _test = _interopRequireDefault(__webpack_require__(/*! ./test.js */ 73));
// 添加单位，如果有rpx，%，px等单位结尾或者值为auto，直接返回，否则加上rpx单位结尾
function addUnit() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'auto';
  var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rpx';
  value = String(value);
  // 用uView内置验证规则中的number判断是否为数值
  return _test.default.number(value) ? "".concat(value).concat(unit) : value;
}

/***/ }),

/***/ 84:
/*!********************************************************************!*\
  !*** D:/Desktop/code/ending/shop/uview-ui/libs/function/random.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function random(min, max) {
  if (min >= 0 && max > 0 && max >= min) {
    var gab = max - min + 1;
    return Math.floor(Math.random() * gab + min);
  } else {
    return 0;
  }
}
var _default = random;
exports.default = _default;

/***/ }),

/***/ 85:
/*!******************************************************************!*\
  !*** D:/Desktop/code/ending/shop/uview-ui/libs/function/trim.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function trim(str) {
  var pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'both';
  if (pos == 'both') {
    return str.replace(/^\s+|\s+$/g, "");
  } else if (pos == "left") {
    return str.replace(/^\s*/, '');
  } else if (pos == 'right') {
    return str.replace(/(\s*$)/g, "");
  } else if (pos == 'all') {
    return str.replace(/\s+/g, "");
  } else {
    return str;
  }
}
var _default = trim;
exports.default = _default;

/***/ }),

/***/ 86:
/*!*******************************************************************!*\
  !*** D:/Desktop/code/ending/shop/uview-ui/libs/function/toast.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function toast(title) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1500;
  uni.showToast({
    title: title,
    icon: 'none',
    duration: duration
  });
}
var _default = toast;
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 87:
/*!***********************************************************************!*\
  !*** D:/Desktop/code/ending/shop/uview-ui/libs/function/getParent.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getParent;
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
// 获取父组件的参数，因为支付宝小程序不支持provide/inject的写法
// this.$parent在非H5中，可以准确获取到父组件，但是在H5中，需要多次this.$parent.$parent.xxx
function getParent(name, keys) {
  var parent = this.$parent;
  // 通过while历遍，这里主要是为了H5需要多层解析的问题
  while (parent) {
    // 父组件
    if (parent.$options.name !== name) {
      // 如果组件的name不相等，继续上一级寻找
      parent = parent.$parent;
    } else {
      var _ret = function () {
        var data = {};
        // 判断keys是否数组，如果传过来的是一个数组，那么直接使用数组元素值当做键值去父组件寻找
        if (Array.isArray(keys)) {
          keys.map(function (val) {
            data[val] = parent[val] ? parent[val] : '';
          });
        } else {
          // 历遍传过来的对象参数
          for (var i in keys) {
            // 如果子组件有此值则用，无此值则用父组件的值
            // 判断是否空数组，如果是，则用父组件的值，否则用子组件的值
            if (Array.isArray(keys[i])) {
              if (keys[i].length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else if (keys[i].constructor === Object) {
              // 判断是否对象，如果是对象，且有属性，那么使用子组件的值，否则使用父组件的值
              if (Object.keys(keys[i]).length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else {
              // 只要子组件有传值，即使是false值，也是“传值”了，也需要覆盖父组件的同名参数
              data[i] = keys[i] || keys[i] === false ? keys[i] : parent[i];
            }
          }
        }
        return {
          v: data
        };
      }();
      if ((0, _typeof2.default)(_ret) === "object") return _ret.v;
    }
  }
  return {};
}

/***/ }),

/***/ 88:
/*!*********************************************************************!*\
  !*** D:/Desktop/code/ending/shop/uview-ui/libs/function/$parent.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = $parent;
// 获取父组件的参数，因为支付宝小程序不支持provide/inject的写法
// this.$parent在非H5中，可以准确获取到父组件，但是在H5中，需要多次this.$parent.$parent.xxx
// 这里默认值等于undefined有它的含义，因为最顶层元素(组件)的$parent就是undefined，意味着不传name
// 值(默认为undefined)，就是查找最顶层的$parent
function $parent() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
  var parent = this.$parent;
  // 通过while历遍，这里主要是为了H5需要多层解析的问题
  while (parent) {
    // 父组件
    if (parent.$options && parent.$options.name !== name) {
      // 如果组件的name不相等，继续上一级寻找
      parent = parent.$parent;
    } else {
      return parent;
    }
  }
  return false;
}

/***/ }),

/***/ 89:
/*!*****************************************************************!*\
  !*** D:/Desktop/code/ending/shop/uview-ui/libs/function/sys.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.os = os;
exports.sys = sys;
function os() {
  return uni.getSystemInfoSync().platform;
}
;
function sys() {
  return uni.getSystemInfoSync();
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 9:
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayLikeToArray.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
module.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 90:
/*!**********************************************************************!*\
  !*** D:/Desktop/code/ending/shop/uview-ui/libs/function/debounce.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var timeout = null;

/**
 * 防抖原理：一定时间内，只有最后一次操作，再过wait毫秒后才执行函数
 * 
 * @param {Function} func 要执行的回调函数 
 * @param {Number} wait 延时的时间
 * @param {Boolean} immediate 是否立即执行 
 * @return null
 */
function debounce(func) {
  var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  // 清除定时器
  if (timeout !== null) clearTimeout(timeout);
  // 立即执行，此类情况一般用不到
  if (immediate) {
    var callNow = !timeout;
    timeout = setTimeout(function () {
      timeout = null;
    }, wait);
    if (callNow) typeof func === 'function' && func();
  } else {
    // 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
    timeout = setTimeout(function () {
      typeof func === 'function' && func();
    }, wait);
  }
}
var _default = debounce;
exports.default = _default;

/***/ }),

/***/ 91:
/*!**********************************************************************!*\
  !*** D:/Desktop/code/ending/shop/uview-ui/libs/function/throttle.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var timer, flag;
/**
 * 节流原理：在一定时间内，只能触发一次
 * 
 * @param {Function} func 要执行的回调函数 
 * @param {Number} wait 延时的时间
 * @param {Boolean} immediate 是否立即执行
 * @return null
 */
function throttle(func) {
  var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  if (immediate) {
    if (!flag) {
      flag = true;
      // 如果是立即执行，则在wait毫秒内开始时执行
      typeof func === 'function' && func();
      timer = setTimeout(function () {
        flag = false;
      }, wait);
    }
  } else {
    if (!flag) {
      flag = true;
      // 如果是非立即执行，则在wait毫秒内的结束处执行
      timer = setTimeout(function () {
        flag = false;
        typeof func === 'function' && func();
      }, wait);
    }
  }
}
;
var _default = throttle;
exports.default = _default;

/***/ }),

/***/ 92:
/*!******************************************************************!*\
  !*** D:/Desktop/code/ending/shop/uview-ui/libs/config/config.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// 此版本发布于2020-08-06
var version = '1.6.0';
var _default = {
  v: version,
  version: version,
  // 主题名称
  type: ['primary', 'success', 'info', 'error', 'warning']
};
exports.default = _default;

/***/ }),

/***/ 93:
/*!******************************************************************!*\
  !*** D:/Desktop/code/ending/shop/uview-ui/libs/config/zIndex.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// uniapp在H5中各API的z-index值如下：
/**
 * actionsheet: 999
 * modal: 999
 * navigate: 998
 * tabbar: 998
 * toast: 999
 */
var _default = {
  toast: 10090,
  noNetwork: 10080,
  // popup包含popup，actionsheet，keyboard，picker的值
  popup: 10075,
  mask: 10070,
  navbar: 980,
  topTips: 975,
  sticky: 970,
  indexListSticky: 965
};
exports.default = _default;

/***/ }),

/***/ 964:
/*!*****************************************************************!*\
  !*** D:/Desktop/code/ending/shop/uview-ui/libs/util/emitter.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * 递归使用 call 方式this指向
 * @param componentName // 需要找的组件的名称
 * @param eventName // 事件名称
 * @param params // 需要传递的参数
 */
function _broadcast(componentName, eventName, params) {
  // 循环子节点找到名称一样的子节点 否则 递归 当前子节点
  this.$children.map(function (child) {
    if (componentName === child.$options.name) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      _broadcast.apply(child, [componentName, eventName].concat(params));
    }
  });
}
var _default = {
  methods: {
    /**
     * 派发 (向上查找) (一个)
     * @param componentName // 需要找的组件的名称
     * @param eventName // 事件名称
     * @param params // 需要传递的参数
     */
    dispatch: function dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root; //$parent 找到最近的父节点 $root 根节点
      var name = parent.$options.name; // 获取当前组件实例的name
      // 如果当前有节点 && 当前没名称 且 当前名称等于需要传进来的名称的时候就去查找当前的节点
      // 循环出当前名称的一样的组件实例
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;
        if (parent) {
          name = parent.$options.name;
        }
      }
      // 有节点表示当前找到了name一样的实例
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    /**
     * 广播 (向下查找) (广播多个)
     * @param componentName // 需要找的组件的名称
     * @param eventName // 事件名称
     * @param params // 需要传递的参数
     */
    broadcast: function broadcast(componentName, eventName, params) {
      _broadcast.call(this, componentName, eventName, params);
    }
  }
};
exports.default = _default;

/***/ }),

/***/ 99:
/*!********************************************!*\
  !*** D:/Desktop/code/ending/shop/icon.png ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAeGVYSWZNTQAqAAAACAAFARIAAwAAAAEAAQAAARoABQAAAAEAAABKARsABQAAAAEAAABSASgAAwAAAAEAAgAAh2kABAAAAAEAAABaAAAAAAAAASwAAAABAAABLAAAAAEAAqACAAQAAAABAAAAUKADAAQAAAABAAAAUAAAAABMN0TLAAAACXBIWXMAAC4jAAAuIwF4pT92AAACaGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgICAgICAgICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICAgICA8dGlmZjpSZXNvbHV0aW9uVW5pdD4yPC90aWZmOlJlc29sdXRpb25Vbml0PgogICAgICAgICA8ZXhpZjpDb2xvclNwYWNlPjE8L2V4aWY6Q29sb3JTcGFjZT4KICAgICAgICAgPGV4aWY6UGl4ZWxYRGltZW5zaW9uPjEwMDwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOlBpeGVsWURpbWVuc2lvbj4xMDA8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KUuwOzgAAH41JREFUeAHtXAmUHVWZ/m/dqnrv9ZatG5KQhAQSCGkgkIASGKWRGTCKLM7pqINL3Ag6Oi7gMi7QoKIijkeZI5oz4zB6dGYSdUQcCSaSRxARkhgIdhBIQkjS2TrpdHp7S23zfbeqXr/uhKTDoudo36Re3f3+97v//9//LtUio24UgVEERhEYRWAUgVEERhEYReAvGAGrpaXFbhOxhvdRDY8YDRsEFADTnZ2dBrA5c+YEy5cvD46EjT5S5F9hnGprayNYevr06da2bdsETwAAzZPL5eypUyfMmzLlpLEdHXs6ka/CeBXPXxloqrW11QJAKt+Uj2S5HMZdCxbMP8uKZJ62ZJ4odYZt6wuCMLzjwYfW3oqyOuVI+68AOHCXqHy+xWpBZ9ubmiJ2PgUAUdLc3Ow2NWVPifxoQRCoiyyApix9ErhrglJKh2EIllMSSvQM8xN4vun+IgEkh4zbutXaccIhq1CYErS15X2RfJg3XRZ92YVnnxC51mSAMw/zwoV+KBeEQTTTsuyMBWjCKJIIoOEdokgJ+aKy52WiIHo2rmLw97gARL0x8vjF/2iwmj+rz3BYe3uragZnpBwGihKx3CwLW86eYueiU1VonQXOmhcGcp7nh2dqrVUYKYnQMYLmBwHLIBhZAI19pV604dUIbfUL4W6EJZ/PE1jjYkDS0LA3AbvlFtEgzrD9sGQRjHQL9Ug+bxo+LP2ViTCAibRY+bzpDLhrqHvblWeeGIRqPqA4J7Ss+ZalZwXgMCVWjoB5PsEKQz9QAcCEaCoLvGYhTaHPQxzCnuvYDrIv239w4B3DZ+QjcuCyVtGbmlsAPFlf8CxnpVZbW7Pdt0U7pbED/p13bvYEuiTPFLj58+c769evZ/5hJJjkl/QDHQZOIGB5jL74CKONCheod7fObBSVmReEchEk7wIkzrYta1wYSV0YKoIliA+C0C9DxxEkhXgN7nGg7yCuENlEuIYTSj5kh6IgWNPe3l7OZrMOggl3V03HaUGA5La1tZcZ/uz1U05SVu7VJS9sKRTlrJKvJ3q+nfMCCyrB2htE1hOhJysHxHvo/vvbu1DE2E/o6GFckdZ/PG8DXHuzffOydg8dMQNz7cKZDQ3jrMZQ69no24UAZEEQRudYyhpPiaMQenj8AAosBIcBO3CjhdIWcCSXQVzxkPOM+PKNB0AjH5h2kEKIMhgYTqm9pWJ54SPrnthQPQMzZ7UIUzQ0Hv+LH5tyUsZx31/w1Ls8X02PVIN4YUYKhUD6+wak6HNUtQS+JcUy/bIRhN95Ucv676F8SKv9pYLY1tZi39yWD8gAixdPH9sAZa9t+yKJ9KsBzrmQuvEQSQIlZY8iCbwCMBbEEICQw9J3BSCACYAAVAIYp4gY0BhApjNc5cowX9woCP8n//C6tyb9IvdVYE4NaaNX0PngzpumvsV19Y+gYK8GYWO9MOfv63gifK59ZzhQ6IiydRPB8Vbklf3Q9yXwSHikJ0eRvnLblokL5p3W+Nv7HnjsABuDMVpRtlVEHdVL8VKqxebM2X/jibUXnDHxIw0Z9yvQ4zc6tn4tKD8FnJRD84HvRdBjYB5EohgVPh7oM8MYsT4jYDFXJSycAsR4FDDpw94I0jEZzGf5gefdtL1jz9MTJkzQu3fvJoAVZ+Betkz0okUS/OArU2+Efv1qf8Gy+otgNL/O2bOrXTe/+gY55bQF8vzzz8qqe/9Z7Mw0iaxxUiwGUvY1OED5nm8FopyMVtFm1/Xe9suVG9YletGrtHYMDwbQmrRrvl6ydL336Q/OvAy2179Afpp9cDwUv4cBAzMIdZjGIFLxx9wFMGIRJCAJV0EcU4464pvplbwJByI8CLgEYCLYgNEDax5ee+mRuI/dwcQgLsH7yTcmXaec6Gv7+0QO9gdeIajL7tzdri9r/Y5cdtUH5PwLL5X3feDT8qkv/FZKhe1gEy1gbwwRemOJjbcbBH4RNtXMctn56RWXnzsXk4rHho+Bm0km5wmMXYL3mQ/ObHNttQI2WXOpHDM77DQbOVzoQgeNU/VLykxp/UOEL40kI1UlGC9/krjUmwQrpZCO4Yl89OsLjGyCAY4XnyFOY1YL7vl607l9ofohRjQ7a1wYzD1JO3NO2CznzL5SJp55rVzV+i553cUXyaRJk2Xc+CbokJMk//N/k6YpM6VcKqJWjqbROTamurKyrPEwES45r3ncj3+5cm0PFe+mTZsOa7yKEqUebNFtmHw++8EZS+tr7Y8XShG4mjWLDaQonvDiv6klfptUhCtiiHRyIOPTOOZPw7GfrbL8YB2sslIX0yQquY4Lhgi//eDD6+4aPnGwhtQZ7ujVasmc8daYGfVRoT4X5GzblRDzqDVxmtz37NOyaeM6Wf3Ar2Tt2sfknHPPlVmzZsuuTSKzzgUHomsaFECgqDAEutv1fb9kO87pXf2Zb6OhNzc3L4cdmTZ5+Pu71823lyzNe20fnnEH1u3v7+kPihhMrArMoKAAu8iODb4YBPPHXEg/05iNDu9Yw8UJCrzEdMOxaR6TMcmcsHJcR1TW2s6gD3/wwsLNzLF8eTNKHbkD1tLbGk971SS9eN40LeNqJOeHKiyWS14xdKPw4Fo5uRHV/s21csMnPiNLrv+gZGvHyobHN8jsC1h1GdIE4ACeJoB4GAa5GbBPKYrsay5/3bz3Q02E1IcsMdx997vzHYpt20dmvD2T1Tf0FwKUizIYC/4bdNX+ClIxMMhrHF/0mzDfaWnjSZCjP/GaDAzjMdEwKCytqCYOAO33PPJIe1esgtpecDK0LjrJrZ2c0Q+W+oI1sBm2uhkLM23oaHuy7xceDc9wH5Anb7tSvn/3d+SZJx+R2e5G8TffIMXx54sdHhLXiSkynGi4MKYaIDg+FCLsxbY3Lzx7CvUhRSHtE9802JcsWe99bsmUWVnX+jINXk4Q6AArhavqNINJR5mYPoyu5IsDcWLiTypKU+KKTWRct6kHP9CoPhq2tGWVQPd7H/zt2rUc9GOZY1bzu3ZtqLt65+XZK3ZdXOgLF/h94dv9sr4/U9PnKHuGVe5aGpypvibvmLdPZhXuEr3zLbLk75vknQsOyBMdlmSdyDwkAZOJ4ULTURADOMCienJ3v3sDewA9OARArnYYX9fgfNhxZAp0Hhbu0HmJSzs3iGPKOmkGhE0NaTgtORR4cqR5qrKlYVM8ijxtKVtryy97/uKHfrvunuuuMyurY1oQFDiVhwHdMgdktlKFxeR6q064ARx9h6g68f39WDMOaItC6JyK2XcPSgWyYu1EufXHdTK5QUkW3e4rWFLy+EAXwkxAXTBtlHa02ufo8uvuX/1Ee6qQIda0AMIv3Tj1TEzia2FSOGWPJgqAB1Esf0TzA/rqsPhkVWHswTTdmClJXmPuwJ+m8c02AsVNF4itdtBed8mL3p1/aP3PWlub3eXL49VYOiQv9ObuTXQJVh+yiNM2OtDe7EawC52/3ff1MNCLtdUryh5j6ewssZxpsFR3AVCNTtjyxgUd8p3rD0ptJpRNuy1jytZmI6nPiWRdEdcW7dphKeNaJ4yt028jEele2hzsnjBsW/ZbsxmVhY2HZRMNYbiEgYyfPyZnHKI35Z44ZjBclS1JInuwQJoz9SIeixfM7Z7r2g7UxjNQOa+PwWsdMXistarqwUbIHTdfMV+r89Z7Xr7x83ZNdGu5p1xG91xoCcgphJN4o7SbLcqBQ3Vyz8NNsiyfk9U7tJxgW9KUEckARGTkElQ/1iE7ZLdcJLJ2B7ZxUMnyoO26yTW5BvcPmL5nwN7jMsyiGYL1bcwt7Ce5JeEwVBSHET+EQ4eHyXHDDOVoMIy1sZSxQ5Nl3V45/JF46qP3PbSh88VsiMQjPoid8VG05BfrzZJl28b9twf96mG3zoVto2HcsFcx8jSiy6WMjG/ol/e8cYss/cQuWfahHrnu0qLMnRZIY1aksUb0KeN97xtv96f+7JuHLmcD/9HWaWbkmvHOQsdVM6D7oDqMrWfaJ4fRxS80ljgTXz3kqX8wiyljOBRpKaeibpowYDLxsLKRnGtDTqKtAfTdfQ88fi3A20/VwokOTVXVlrb8wu+UhCPmiNaJo87DKur+CVfrWvlfzw+wmIo0BB3reHIgzBbMvPDhHYqTLYE7IymVXekt1mBXxDYoaO0HJzQWdeSVNj71VHR+O5iMq5/bP3HyT13Xuqa/EPrgPnsI1xguBCehOzG3JXqL4WEcajgz5bDD3+Q4VANdbNuqXA4LUBbf6ukZ+NbKh5/edR1m2qUxcEfE4FiRRwfQmOeitt0i7smXTrgPS72W8kDgYRUHDgJsAM0s3Y1IJ03RlLF90TYYOJ1z0QrEMLDqRHuH5N3uuXL3Nz436QwlmVVQDJOx/cRjB2sIgFViaMQYwBAoM1EQJIYBJkV+CMAGQKoDCxta4GroHOwNYtcoLGHH6Aeg7vaf/OLxZ0ltKyjcOn++NTGXqzupUOh7MUAeUYRT1Mn5sknsGW1ovxD9gvJBEYhZjrngBzNiZ8GITrwagXCE0M6eLX5Ji1/GHh1mZczv2KhDCVd9miXLZfcKx1aTsZXuoRXWalxF7NJw8qZkMY/Jl3jSMoYMAyUowzxuA7Gsqx3XsRTMk/Zi0bs1dJ0Tf/yLje8P+ro7r7i8ee6Vr5/79vLCc7904vjg94Hb/59sJjnarFRbafooHsjYMdw+AxesFnsltHsnetqEoQVKcV/ML7iAjtwwCAAy0EgCR1LU4XRYlMCuk9O9jfanbvue9ZqGWsZjEQ2SyWXxm1ljNzxc3RYBZYG4ajOwVKMKW/cYDWuLF/i/L5Tk135ZHsPaPKdK3uK3XDV3AVTFWeJFp8F0gcoQyWUc6e/3Hib3tZ5S5LRnNpNTGo71PjaALZAUmDVq4b6N3qrxW+xa1eQXqASTcUcLRx0yYpRkMCJVjKT7kPuFrBsGvf0EWcU0MI/BmdmrClXFszME1WDHAJwpwuGUqA8blTugCzaX/GgncoY1Gf26KKs+ChNpNnePuFsdcoMC5p/vYSuTu9UwQjEKv2NdW7dibjlOd0wAQXAUrY4hwD7qWkB5AeIwdsmsmfY1AanSd4TTpNSDsOn+cx053VcQZ1w9hpvzXpUzGfCTAsUkAlpZ3ZnwYN3MB0BKmMd7oQ5qsZo433Hsi7HNP4Yl491qwfarF/I8hIRDUigXNtZtLL4bU+PDbOeUU04JMRPTO2J3TACH1KSi9eAinpZCKgal2ABEHUeNipcJJzyalqfU2yhTLGn1h61ZLP+Qi7jQpWVMwTjKRMNLEWVVzGP8TBiWD2kZDOckmAfYyuegwC4KcQwUYM8VbYBmTmc2h9zUQXUBSwD46bIXbli55vFnuWmAw/bjPss56iRiaOVPp6EY/K+fCrFXAjo1YozgVPIkHnKdcfSkAVBrvGhtb2eN7OzUqjYXKew1GE5L8DH+pHTySitIgug985ofeNJyjCFVEF9wGYbKZDNnuTjThcwwqykY12O8yQ8mxe/FsS/ud2QAYo3M6j1P7cApXJ+D8QSN6B2oSPuYEjgsjM4gT5ybdTy9vSbpCxLSvExIXCySMTgmivUiX1o94+g34YSEShiCgfJQq8MqHsxgyiHVx/kKrNNwY2/p4P+xzmPtujDPkdzIAExK7npmfxdI3KtsUMTVnHFUkvAYOUsymnDiZxLE24Ky6O1z5NkdjnC9TNst0aIxF6JK9rPikgBfBJWJJsr8VHIN82CgmA/tM9vgYAwOIJJw7YBTP9PDz+fz24oU32EVjTg4MgATomf+Ey05bDZSKIZAhnAFxFjlG0AT5QXysQ4Q2ba7Tg71Y9oDucxOx9wVl7SThivBiidJYTiJS71DsgwJpLVBRSMesl7KZGzsvkR3/3zFxntp+4H7zLJ1MOfIfSMCEO0megWwaKubxMdch4aq+m+aTcNJJzDhGMJDWFfPbM+KY6cZKhgcXkdKPzuc+NN3mjTkzcSqvCbNFKhqC2HM0gDPyUJ013X1d38M+aL29jbmHMxoCo/8Z0QAmupuiSUJbfUnm06INlQiath8QnISkmggW3Yoew9i8tinsc3FizwomeopVoHHiJRpCIlMN36mDYpfmicpkhJUaSstYgonFZi88TLay2btDOaZP5a7e98M0e3mpinOal4097G9kQN4syGPDDXA7hEY9BOu0p0qfxJPIJKObOvImY1W7lpXu6SDiEpqQ4Qpw3easeJBRAp8kpbmNcGkDLObadnYq4K7E7hVFIvt6oG+npZ71mzZwU3TpTiLSap50a9h3TlKPcvj/liR1VPpWtxnkhsXZNjExWHcEsPaOZSBAUe2dLg4P0kK4GU6mRQ7rFUTn+Rloskch6uLxP5k4kDAhLHKQE6svlUJJoqFWxYuNmF6iiXvqwcL/Qt//uvn9sacN7Id58NoGxYx8tmnKaYPdnRX7Et6ZpQh/Oxf2jv4Gc05BBshsudATvZ1a6nB/iCuYoDDIPJmgknKGCMp9hsGY11VLm2CUaYZgoWMWNcySMMPby4y2J7CFRoePlhchRzwysH9sKvv+O+fb9qAXArbaPrl4Dy2RTdyAOP8IEthe4H0GozwImoIm67Am4IIL9mb5srWjqxJHtxyQUK1Aw5cXafiaA6nWCXq4hYWJ32+GTYrDd/MabCo0BosPwCGspbmWhc3yUpo7HdYYawoloKVP/rZH83ajFynlBHZl6Tzqsmm/7gBjErBbtyqI3CxaiZKac9ZI4EEIOQwWwfS3efKc3tsqcnQ9mOGGGEWYVE+WKJijxPgoGtcnZSxo1LGpml8TY1xSEcarp9FWH75jbUcvcjBbksZa969aHQrTg424jbE2mLg/X6gM9y5fNXWQ2yNwE1+pj5qw8E9wy+3GzGA+aTlkq+25wrm8FaREYBDPJvEuCS5ECCQAGXHvpz0FpQ05AAKLgkRMB78witFAFUCMAQK4iguCtXinPnEGpFabCzVubiGhVk76wTi6iisyYnVW5K1tz+Q+fK9K+xtty0O/JmNA/uaZGfPJW04GKtynCQ6O5vCpUvzjCc1r4gb0u2jtQD9wWVSWLh33DS3Xj8KlTMRB9ABdqS5xQ8YwTrYLDA71Axj8mD8vY+Ok44DtmQwVBRnclc/ukR/PWSzKaMBmJIJOSVjcJpXB8AyeBwnBAejPs2dC/NwDwUrW1iUdeHPMBp3i9ezUl1ibqxa146f6WzoApu3tweLXqJpcjQchqeNmANR0IxicX/U44yVp7WtJnIvOdaBSKVMGkfxxfExOr/noIsHkwe4qYx9uD7MIDXalrkNjkyrtaUxp6UOp3c4+gRQKIdBIEtT0glwiS1ClLnmM6tcnBhbtoIxpxehwKLAGr+mvCr4YX+vWjbums3dcfsgFFBLHg83QbiOZxWvEBeOGEDgQ80N6evujtY0bYD2vJgsxsgKduwBEDBIg+Kd+zMGiGLkY7/JlteMrZfpkM2GjCW4eWeW0zgOAbgoRtRirIiXEX/WawbIcLhph1RI8SBuEsAkcmrUa7WrX9uQC28sP9iwEmvbZTu39D2KckXUwBqNI6BRHic0LQjm8bSIuey0adOgaN/cZsYOicd0pntpLpA4cgdCuD3kl+5vfKtbL//lF4MyeAazGxkR9IKLKLa0/bjXcN/6MbIVN6fPrKmTubV10uDyqgJuextAKJbIb8ST4KC8Caf+OGxWLGm+qjxoj6fIPspbbgbgQMdGWKPhY5nN4oaroV4e4l6fFMr76x6RbtV25K16roVxedzgkB769/b2mvB8QoOfgweLCM8xQPX19am6uu1RX19J7ds3BnJyHM5s7eM4sueextPrmqIVkRdNr+hBdpIiiH8OlH9Xvy0/fiwn57kTZE5NLbZAcIeCNz2QLwYlBTAul8YN6tEEQJQzOjYBOvWbfGwPg4E64zM9K9RODkxbgzIY7YAniFl5CgO7CRe6t1qZcIvUSAe2RLp69srBP+6Rg3d8bcqATBmDaawdXy8ZrgVBI3fHByBolfXgQp4V5xu/r3PRO7y+sIytftxYiDtKCDO46vHUHiVdT02T8xvqpQTgqN+4ix0DwE4PApOCcSQOZP6UUzlAxk8OHgZoWh/agdaEdcAJyI0sXQMDqRYWDFZFxa5aea4jG+4+4Hbt3Od2bd9rd+/abw3A/PGx14nDacDMN74fYRyuFns4BvB97P3iCjO+wwH0OHCEyQClY/kYt4dGrAM5JhDfCIftxpUGZHnOUYvQFQgmhpvgYjh4vSWMiqIHTpTT7Xopw+jmxMCjNw5t/Iv+GD9+mIgAN+hMWupP4g3gzGwKxHlNHKIqlSAv9xy5ZYZ2NItysDS+cujvsv2nNoyJfr85F23ZbUvPgM3LS422Vo2wKaGLUZYFYD4pnDCRToUhsPggjfezeSRLqx2gxm3ygID9CdQ/Iub4HPqhZDVog/ngPTAhj0+oLsZhe2DpCNMC9R9sHadPDj07W9zOMbxqGQNDjquIL2oxHJRyYRIGhxkuNFw3mPZCHGjqMNwYczSGCp/PhL7j+hARZbXvqNVr2mvU89gFIli4igIH+mCQIx0qE0oUwkFDHT0wy0wa6wSN34wQMOQDO5pwhO9jyCp0KW7OcXFgUhKHdLHzo+AmFVmrARrr5TiiO+gMpCYb4ipN3FiSm6OHCNN0nMDOYCDjeBPFPAizljQNEWamN/HkFtRP0OhMi7EXKxXfxmSiG7Tbjdn/V0/k5InndJCxo6ipIVBlDDGAgUzSRDIMRUCNcQts2Ups6KI6ciHpYDNM450/0s38AdscdFAML8JdAu7jhJK7tHsNjLW77LGWHUE/kM3jjkPfgQsq4slGTZ+ZjgZNOCFkSDiNA7ApXUk504PUX10etWH/xc80WLgppw517ba+ePea3F3bD1h/mDw+1I2gDceXGsBzPEEUKGHlyZNgY8KVaAMsooCOSYfkEEj6qxypSQ61q2JH7IUNRWboWR7cVJ+1z3cbrFd5vX5JaQ3TGBbN2F7xd+Hgl53lUJJiw4F8I0g/0+hMehwdH9mTH9JiVfnZA5PAcuRM3LYCY7gAKSiGj4A7lkxY2PWkSJf89GsnnvDM/uxMHIC9AWK6CFc9ZtHw6R8AF0EyUR4rK5zcUa1QW6DuClhog1zHVmIuTcKIYNjsAsEPb4l5XrSDLNvUhcX7Gk93xgcrYP9Nx6xcUnYEYSpJ8ekzJdgPu6KG9IJQEGuoJdGVWRh+Amh05JFm2VQvxmlmxYJTX/CU59ZGGailMqzRb7g1mVvUhTsLvFEmW9F/mFtpx67DPcRptZlLAeR7cS/wYqxnxvbjhgQM+BJmXRff/GGqpc7DwgfoUvdBP5qbDEYXMg1qibs9cZryHdwix2cQP3lJAJJAiLILYsvle8fOtSfKT5QTnuodwl1np+RGXr0qPHkqbkpjbs5SpAlU/MSGcwzOYUZ0BdAUdLwxRQF8cD0ug2ci7Y4B5MVgI65q3Ohcvm8lVQrpSYHjeC1fBJOgtVUWLRr8gxGfvH7Gq/CJ5rsxR7diFCf0D4QhriRjp1/ZCThm96cykRjwMInEEwlnZU46/IoJd2vCN75kAKtBLK5omGmPle/p+ug1wSHq24EoLE7QxU0n4/IFvinJgRMpgwDoMNAMsAkHVnEqORbcih/c+dKRlWlQVrkQlC03um3Pk313Tv14T1c7BnFOK3QwVCzpGe7Y4i1tLXrXrl6VbqZ++D0z5mYd573guCVowO0bwJl8zHnYV0y5kO+Y68wszZnZpx61bSjU9kK59+KXBUASnF7G7Px3qR97et0ndE4+hvPjusjrF78wxi9vOTkM9uNTuix22x0aVlQ7qXgmgFLVEzDO37iGDeBgCUeW40Qa9Um5iG1VHf7IG4i+Xreo43HTbiIBw0F7oTC/AsVVC1xwj7f0P/K+08/GBPhFaO038Z5OqQzLJRAculuwnFPwCGRi5mBC50FBqRzchtv8n33ZADSdYbdjfRuV1tTNwd33T1pZ6/UqUzyRGtnfMUNKzzcEUlD48g3g4RImlmLYSzbrWoo3/DCprcjOYGdKsK2Fyxr4TC7qwH2XX+OblG+5Vz2/wbS1GndZOvMRb7q+EFhHiVdtLaLnNLVGi5K/B3P9O8+4BsTcBmtx9kAxCgAmpm2ItdGNMUea21whRjayBkoFb+FvHn3iNy8rgKZjYCZ8FWWluqj4m8zpWtlX27XeRVJbni29E6bKQdyePkSWop2AUuRE82CGxFUpsaN9MFmfx/Z8O+75/QafTP6y9h3P7zb1D9N1RwFpRElQkUZ38nhz8dXTxzrZms/CaPko9JyN7/VwqxVLgUGRhpqwHc+XFavy696Ie9WcuF8Zx09oW3EQxVk6baG4ommmntg5VTkyKeqeOCnc31AfdmcdMBlEN+oLddgJCHeD7L19peK2KR/qOJCWjcBxAo5LByaNf7ne3PpP9ePi1ubXY0i/iW9vThsohvzM1oi0FygDYKnkf/TXax7/Jm/1v2IAph3DbKhxTVgLjqKqwUzTj/aOljVjK5auPXilgIvrj3/Jjc3SrNvwkc3VV58zts4O/hUifS1EmpNHER+WZyG+e0qhvHrVqvXbebP/FQcwJZBmBUVbkuNRkRaRB5PUi0XWP5NX809riWdRcBpAj6TNmNpxXFrRn+Bd/aXSP1x11qcCsW6CmVMDWxB/OiG86b6Vj9/OC0kv9kbXn6ALf/4myF1m0EHKWxaefcE1bzjr02/6uzMvSyj7kzHenx+Jl0jB8KtvBLa6ylEkq9F4AT9BbGrqxB8rawpHxfYFQBqNHkVgFIFRBEYRGEVgFIFRBP7KEPh/0wIX9tFQtVMAAAAASUVORK5CYII="

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map