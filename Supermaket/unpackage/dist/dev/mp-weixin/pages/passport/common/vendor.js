(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/passport/common/vendor"],{

/***/ 1558:
/*!***************************************************!*\
  !*** D:/Desktop/code/ending/shop/utils/RegExp.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userName = exports.password = exports.money = exports.mobile = exports.licenseNum = exports.integer = exports.email = exports.URL = exports.TINumber = exports.TEL = exports.Integer = exports.IDCard = void 0;
/**
 * 各种正则表达式
 * mobile   手机号
 * email    电子邮箱
 * password 密码【6-20位】
 * integer  正整数【不包含0】
 * money    金钱
 * TINumber 纳税识别号
 * IDCard   身份证
 * userName 账户名称【汉字、字母、数字、“-”、“_”的组合】
 * URL      URL
 * TEL      固定电话
 */

// 手机号
var mobile = /^0?(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])[0-9]{8}$/;

// 电子邮箱
exports.mobile = mobile;
var email = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

// 密码【6-20位】
exports.email = email;
var password = /^[@A-Za-z0-9!#$%^&*.~,]{6,20}$/;

// 正整数【不包含0】
exports.password = password;
var integer = /^[1-9]\d*$/;

// 正整数【包含0】
exports.integer = integer;
var Integer = /^[0-9]\d*$/;

// 金钱
exports.Integer = Integer;
var money = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;

// 纳税识别号
exports.money = money;
var TINumber = /^((\d{6}[0-9A-Z]{9})|([0-9A-Za-z]{2}\d{6}[0-9A-Za-z]{10,12}))$/;

// 身份证
exports.TINumber = TINumber;
var IDCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;

// 账户名称【汉字、字母、数字、“-”、“_”的组合】
exports.IDCard = IDCard;
var userName = /[A-Za-z0-9_\-\u4e00-\u9fa5]$/;

// URL
exports.userName = userName;
var URL = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;

// 固话
exports.URL = URL;
var TEL = /0\d{2,3}-\d{7,8}/;

// 营业执照号
exports.TEL = TEL;
var licenseNum = /(^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$)|(^\d{15}$)/;
exports.licenseNum = licenseNum;

/***/ }),

/***/ 576:
/*!**************************************************!*\
  !*** D:/Desktop/code/ending/shop/api/connect.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginCallback = loginCallback;
exports.mpAutoLogin = mpAutoLogin;
exports.openIdLogin = openIdLogin;
exports.webConnect = webConnect;
var _request = __webpack_require__(/*! @/utils/request.js */ 43);
/**
 * 信任登录相关API
 */

var request = _request.http.request;

/**
 * web 第三方登录
 * @param {Object} code
 */
function webConnect(code) {
  return _request.http.request({
    url: "passport/connect/connect/login/web/".concat(code),
    method: _request.Method.GET,
    needToken: true,
    header: {
      "clientType": "H5"
    }
  });
}
function openIdLogin(params, clientType) {
  return _request.http.request({
    url: "passport/connect/connect/app/login",
    method: _request.Method.POST,
    needToken: true,
    data: params,
    header: {
      "clientType": clientType
    }
  });
}

/**
 * 第三方登录成功 回调接口
 */
function loginCallback(state) {
  return _request.http.request({
    url: "passport/connect/connect/result?state=".concat(state),
    method: _request.Method.GET,
    needToken: false
  });
}

/**
 * 小程序自动登录
 * @param params
 */
function mpAutoLogin(params) {
  return _request.http.request({
    url: 'passport/connect/miniProgram/auto-login',
    method: _request.Method.GET,
    params: params
  });
}

/***/ }),

/***/ 587:
/*!************************************************!*\
  !*** D:/Desktop/code/ending/shop/api/entry.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyFirst = applyFirst;
exports.applySecond = applySecond;
exports.applyThird = applyThird;
exports.getCompanyDetail = getCompanyDetail;
var _request = __webpack_require__(/*! @/utils/request.js */ 43);
/**
 * 入驻类相关api
 */

// 获取当前用户的代理入驻详情
function getCompanyDetail(params) {
  return _request.http.request({
    url: "/store/store/apply",
    method: _request.Method.GET,
    params: params
  });
}

// 申请店铺第一步-填写企业信息
function applyFirst(params) {
  return _request.http.request({
    url: "/store/store/apply/first",
    method: _request.Method.PUT,
    params: params
  });
}

// 申请店铺第二步-填写银行
function applySecond(params) {
  return _request.http.request({
    url: "/store/store/apply/second",
    method: _request.Method.PUT,
    params: params
  });
}

// 申请店铺第三步-填写银行
function applyThird(params) {
  return _request.http.request({
    url: "/store/store/apply/third",
    method: _request.Method.PUT,
    params: params
  });
}

/***/ })

}]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/passport/common/vendor.js.map