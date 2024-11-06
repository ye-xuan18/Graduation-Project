(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/mine/common/vendor"],{

/***/ 188:
/*!************************************************!*\
  !*** D:/Desktop/code/ending/shop/api/point.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sign = sign;
exports.signTime = signTime;
var _request = __webpack_require__(/*! @/utils/request.js */ 43);
/**
 * 签到
 * @param params
 */
function sign() {
  return _request.http.request({
    url: '/members/sign',
    method: _request.Method.POST,
    needToken: true
  });
}

/**
 * 签到时间获取
 * @param params
 */
function signTime(time) {
  return _request.http.request({
    url: '/members/sign?time=' + time,
    method: _request.Method.GET,
    needToken: true
  });
}

/***/ }),

/***/ 351:
/*!***************************************************!*\
  !*** D:/Desktop/code/ending/shop/api/passport.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changePassword = changePassword;
exports.login = login;
exports.sendFindPasswordSms = sendFindPasswordSms;
exports.setBiolofy = setBiolofy;
exports.validAccount = validAccount;
exports.validFindPasswordSms = validFindPasswordSms;
var _storage = _interopRequireDefault(__webpack_require__(/*! @/utils/storage.js */ 36));
var _request = __webpack_require__(/*! @/utils/request.js */ 43);
var _md = __webpack_require__(/*! @/utils/md5.js */ 59);
/**
 * Created by Andste on 2018/5/2.
 * 用户认证相关API
 */

/**
 * 普通登录
 * @param username
 * @param password
 * @param captcha
 */
function login(username, password, captcha) {
  return _request.http.request({
    url: 'passport/login',
    method: _request.Method.POST,
    params: {
      username: username,
      password: (0, _md.md5)(password),
      captcha: captcha,
      uuid: _storage.default.getUuid()
    }
  });
}

/**
 * 验证账户信息
 * @param captcha
 * @param account
 */
function validAccount(captcha, account) {
  return _request.http.request({
    url: 'passport/find-pwd',
    method: _request.Method.GET,
    params: {
      uuid: _storage.default.getUuid(),
      captcha: captcha,
      account: account
    }
  });
}

/**
 * 发送找回密码短信
 * @param uuid
 * @param captcha
 */
function sendFindPasswordSms(uuid, captcha) {
  return _request.http.request({
    url: 'passport/find-pwd/send',
    method: _request.Method.POST,
    header: {
      'content-type': "application/x-www-form-urlencoded"
    },
    data: {
      uuid: uuid,
      captcha: captcha
    }
  });
}

/**
 * 校验找回密码验证码
 * @param uuid
 * @param sms_code
 */
function validFindPasswordSms(uuid, sms_code) {
  return _request.http.request({
    url: 'passport/find-pwd/valid',
    method: _request.Method.GET,
    params: {
      uuid: uuid,
      sms_code: sms_code
    }
  });
}

/**
 * 修改密码【找回密码用】
 * @param password
 * @param uuid
 */
function changePassword(password, uuid) {
  if (!uuid) {
    uuid = _storage.default.getUuid();
  }
  return _request.http.request({
    url: 'passport/find-pwd/update-password',
    method: _request.Method.PUT,
    header: {
      'content-type': "application/x-www-form-urlencoded"
    },
    data: {
      uuid: uuid,
      password: (0, _md.md5)(password)
    }
  });
}

// 保存生物认证登录
function setBiolofy(params) {
  return _request.http.request({
    url: "passport/login/save/biology",
    method: 'POST',
    params: params
  });
}

/***/ }),

/***/ 382:
/*!*********************************************!*\
  !*** D:/Desktop/code/ending/shop/api/im.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cleanUnreadMessage = cleanUnreadMessage;
exports.clearmeaager = clearmeaager;
exports.getTalk = getTalk;
exports.getTalkByUser = getTalkByUser;
exports.getTalkList = getTalkList;
exports.getTalkMessage = getTalkMessage;
exports.jumpObtain = jumpObtain;
var _request = __webpack_require__(/*! @/utils/request.js */ 43);
var _api = _interopRequireDefault(__webpack_require__(/*! @/config/api.js */ 44));
/**
 * 获取聊天详情接口
 * @param {*} talkId 
 * @returns 
 */
function getTalk(talkId) {
  return _request.http.request({
    url: "".concat(_api.default.im, "/talk/").concat(talkId),
    method: _request.Method.GET
  });
}

/**
 * 获取与用户的聊天详情
 * @param {*} talkId 
 * @returns 
 */
function getTalkByUser(userId) {
  return _request.http.request({
    url: "".concat(_api.default.im, "/talk/by/user/").concat(userId),
    method: _request.Method.GET
  });
}

/**
 * 获取聊天列表
 * @param {*} talkId 
 * @returns 
 */
function getTalkList(params) {
  return _request.http.request({
    url: "".concat(_api.default.im, "/talk/list"),
    method: _request.Method.GET,
    params: params
  });
}

/**
 * 获取聊天信息接口
 * @param {*} params 
 * @returns 
 */
function getTalkMessage(params) {
  return _request.http.request({
    url: "".concat(_api.default.im, "/message"),
    method: _request.Method.GET,
    params: params
  });
}

/**
 * 获取聊天信息接口
 * @param {*} params 
 * @returns 
 */
function cleanUnreadMessage(params) {
  return _request.http.request({
    url: "".concat(_api.default.im, "/message/clean/unred"),
    method: _request.Method.PUT,
    params: params
  });
}
// 从商品页点击 客服 跳转 获取商品详情
function jumpObtain(skuId, goodsId) {
  return _request.http.request({
    url: "/goods/goods/sku/".concat(goodsId, "/").concat(skuId),
    method: _request.Method.GET
  });
}
// 清除未读
// /im/message/clean/unred
function clearmeaager() {
  return _request.http.request({
    url: "".concat(_api.default.im, "/message/clean/unred"),
    method: _request.Method.PUT
  });
}

/***/ }),

/***/ 393:
/*!***********************************************************!*\
  !*** D:/Desktop/code/ending/shop/utils/socket_service.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ 23));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ 24));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _index = _interopRequireDefault(__webpack_require__(/*! @/store/index */ 66));
var _config = _interopRequireDefault(__webpack_require__(/*! @/config/config.js */ 33));
var _storage = _interopRequireDefault(__webpack_require__(/*! ./storage */ 36));
var SocketService = /*#__PURE__*/function () {
  function SocketService() {
    (0, _classCallCheck2.default)(this, SocketService);
    (0, _defineProperty2.default)(this, "ws", null);
    (0, _defineProperty2.default)(this, "callBackMapping", {});
    (0, _defineProperty2.default)(this, "connected", false);
    (0, _defineProperty2.default)(this, "sendRetryCount", 0);
    (0, _defineProperty2.default)(this, "connectRetryCount", 0);
  }
  (0, _createClass2.default)(SocketService, [{
    key: "connect",
    value:
    //  定义连接服务器的方法
    function connect() {
      var _this = this;
      // 连接服务器
      if (!window.WebSocket) {
        return console.log("您的浏览器不支持WebSocket");
      }
      this.ws = new WebSocket(_config.default.baseWsUrl + '/' + _storage.default.getAccessToken());
      // 连接成功的事件
      this.ws.onopen = function () {
        console.log("连接服务端成功");
        _this.connected = true;
        // 重置重新连接的次数
        _this.connectRetryCount = 0;
      };
      //  1.连接服务端失败
      //   2.当连接成功之后, 服务器关闭的情况(连接失败重连)
      this.ws.onclose = function () {
        console.log("连接服务端失败");
        _this.connected = false;
        _this.connectRetryCount++;
        setTimeout(function () {
          _this.connect();
        }, 500 * _this.connectRetryCount);
      };
      // 得到服务端发送过来的数据
      this.ws.onmessage = function (msg) {
        // console.log(msg.data)
        _this.registerCallBack(msg.data);
      };
    }
    // 回调函数的注册
  }, {
    key: "registerCallBack",
    value: function registerCallBack(callBack) {
      // console.log("回调函数的注册", callBack);
      this.callBackMapping = callBack;
    }

    // 取消某一个回调函数
  }, {
    key: "unRegisterCallBack",
    value: function unRegisterCallBack(callBack) {
      console.log("取消某一个回调函数", callBack);
      this.callBackMapping = null;
    }

    // 发送数据的方法
  }, {
    key: "send",
    value: function send(data) {
      var _this2 = this;
      // 判断此时此刻有没有连接成功
      if (this.connected) {
        this.sendRetryCount = 0;
        this.ws.send(data);
      } else {
        this.sendRetryCount++;
        setTimeout(function () {
          _this2.send(data);
        }, this.sendRetryCount * 500);
      }
    }
  }], [{
    key: "Instance",
    get: function get() {
      if (!this.instance) {
        this.instance = new SocketService();
      }
      return this.instance;
    }

    // 和服务端连接的socket对象
  }]);
  return SocketService;
}();
exports.default = SocketService;
(0, _defineProperty2.default)(SocketService, "instance", null);

/***/ }),

/***/ 394:
/*!***************************************************!*\
  !*** D:/Desktop/code/ending/shop/utils/emojis.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.emojistwo = exports.emojiList = void 0;
exports.textReplaceEmoji = textReplaceEmoji;
/**
 * 动态表情
 */
var emojis = {
  "[微笑]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/0.gif'>",
  "[撇嘴]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/1.gif'>",
  "[色]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/2.gif'>",
  "[发呆]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/3.gif'>",
  "[得意]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/4.gif'>",
  "[流泪]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/5.gif'>",
  "[害羞]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/6.gif'>",
  "[闭嘴]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/7.gif'>",
  "[睡]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/8.gif'>",
  "[大哭]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/9.gif'>",
  "[尴尬]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/10.gif'>",
  "[发怒]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/11.gif'>",
  "[调皮]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/12.gif'>",
  "[呲牙]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/13.gif'>",
  "[惊讶]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/14.gif'>",
  "[难过]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/15.gif'>",
  "[酷]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/16.gif'>",
  "[冷汗]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/17.gif'>",
  "[抓狂]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/18.gif'>",
  "[吐]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/19.gif'>",
  "[偷笑]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/20.gif'>",
  "[可爱]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/21.gif'>",
  "[白眼]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/22.gif'>",
  "[傲慢]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/23.gif'>",
  "[饥饿]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/24.gif'>",
  "[困]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/25.gif'>",
  "[惊恐]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/26.gif'>",
  "[流汗]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/27.gif'>",
  "[憨笑]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/28.gif'>",
  "[大兵]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/29.gif'>",
  "[奋斗]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/30.gif'>",
  "[咒骂]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/31.gif'>",
  "[疑问]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/32.gif'>",
  "[嘘]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/33.gif'>",
  "[晕]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/34.gif'>",
  "[折磨]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/35.gif'>",
  "[衰]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/36.gif'>",
  "[骷髅]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/37.gif'>",
  "[敲打]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/38.gif'>",
  "[再见]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/39.gif'>",
  "[擦汗]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/40.gif'>",
  "[抠鼻]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/41.gif'>",
  "[鼓掌]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/42.gif'>",
  "[糗大了]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/43.gif'>",
  "[坏笑]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/44.gif'>",
  "[左哼哼]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/45.gif'>",
  "[右哼哼]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/46.gif'>",
  "[哈欠]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/47.gif'>",
  "[鄙视]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/48.gif'>",
  "[委屈]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/49.gif'>",
  "[快哭了]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/50.gif'>",
  "[阴险]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/51.gif'>",
  "[亲亲]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/52.gif'>",
  "[吓]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/53.gif'>",
  "[可怜]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/54.gif'>",
  "[菜刀]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/55.gif'>",
  "[西瓜]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/56.gif'>",
  "[啤酒]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/57.gif'>",
  "[篮球]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/58.gif'>",
  "[乒乓]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/59.gif'>",
  "[咖啡]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/60.gif'>",
  "[饭]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/61.gif'>",
  "[猪头]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/62.gif'>",
  "[玫瑰]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/63.gif'>",
  "[凋谢]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/64.gif'>",
  "[示爱]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/65.gif'>",
  "[爱心]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/66.gif'>",
  "[心碎]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/67.gif'>",
  "[蛋糕]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/68.gif'>",
  "[闪电]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/69.gif'>",
  "[炸弹]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/70.gif'>",
  "[刀]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/71.gif'>",
  "[足球]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/72.gif'>",
  "[瓢虫]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/73.gif'>",
  "[便便]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/74.gif'>",
  "[月亮]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/75.gif'>",
  "[太阳]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/76.gif'>",
  "[礼物]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/77.gif'>",
  "[拥抱]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/78.gif'>",
  "[强]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/79.gif'>",
  "[弱]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/80.gif'>",
  "[握手]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/81.gif'>",
  "[胜利]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/82.gif'>",
  "[抱拳]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/83.gif'>",
  "[勾引]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/84.gif'>",
  "[拳头]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/85.gif'>",
  "[差劲]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/86.gif'>",
  "[爱你]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/87.gif'>",
  "[NO]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/88.gif'>",
  "[OK]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/89.gif'>",
  "[爱情]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/90.gif'>",
  "[飞吻]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/91.gif'>",
  "[跳跳]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/92.gif'>",
  "[发抖]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/93.gif'>",
  "[怄火]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/94.gif'>",
  "[转圈]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/95.gif'>",
  "[磕头]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/96.gif'>",
  "[回头]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/97.gif'>",
  "[跳绳]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/98.gif'>",
  "[挥手]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/99.gif'>",
  "[激动]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/100.gif'>",
  "[街舞]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/101.gif'>",
  "[献吻]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/102.gif'>",
  "[左太极]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/103.gif'>",
  "[右太极]": "<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/104.gif'>"
};

/**
* 符号表情
*/
var symbol = ["😠", "😩", "😲", "😞", "😵", "😰", "😒", "😍", "😤", "😜", "😝", "😋", "😘", "😚", "😷", "😳", "😃", "😅", "😆", "😁", "😂", "😊", "☺", "😄", "😢", "😭", "😨", "😣", "😡", "😌", "😖", "😔", "😱", "😪", "😏", "😓", "😥", "😫", "😉", "✊", "✋", "✌", "👊", "👍", "☝", "👆", "👇", "👈", "👉", "👋", "👏", "👌", "👎"];
var emojisKeys = Object.keys(emojis);
var emojiList = {
  symbol: symbol,
  emojis: emojis
};
exports.emojiList = emojiList;
var regEmoji = emojisKeys.map(function (value) {
  return '|\\' + value;
}).join('').replace('|', '');

/**
* 替换表情文字
* 
* @param {String} content 需要替换的字符串
*/
function textReplaceEmoji(content) {
  if (!content) {
    return "";
  }
  return content.replace(new RegExp("(".concat(regEmoji, ")"), 'gi'), function ($0, $1) {
    return emojis[$1];
  });
}
var emojistwo = Object.keys(emojis);
exports.emojistwo = emojistwo;

/***/ })

}]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/mine/common/vendor.js.map