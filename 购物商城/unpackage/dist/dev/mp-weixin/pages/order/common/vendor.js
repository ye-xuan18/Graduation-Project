(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/order/common/vendor"],{

/***/ 759:
/*!*****************************************************!*\
  !*** D:/Desktop/code/ending/shop/api/after-sale.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addComplain = addComplain;
exports.applyCancelOrder = applyCancelOrder;
exports.applyReturn = applyReturn;
exports.cancelAfterSale = cancelAfterSale;
exports.clearComplain = clearComplain;
exports.communication = communication;
exports.fillShipInfo = fillShipInfo;
exports.getAfterSale = getAfterSale;
exports.getAfterSaleInfo = getAfterSaleInfo;
exports.getAfterSaleList = getAfterSaleList;
exports.getAfterSaleLog = getAfterSaleLog;
exports.getAfterSaleReason = getAfterSaleReason;
exports.getClearReason = getClearReason;
exports.getComplain = getComplain;
exports.getComplainDetail = getComplainDetail;
exports.getComplainReason = getComplainReason;
exports.getServiceDetail = getServiceDetail;
exports.getStoreAfterSaleAddress = getStoreAfterSaleAddress;
var _request = __webpack_require__(/*! @/utils/request.js */ 43);
/**
 * 申请售后相关API
 */

/**
 * 获取售后列表
 * @param params
 * @returns {AxiosPromise}
 */
function getAfterSale(params) {
  return _request.http.request({
    url: "after-sales/refunds",
    method: _request.Method.GET,
    needToken: true,
    loading: false,
    params: params
  });
}

/******************* 以下为新方法 ***********************/
/**
 * 申请取消订单
 * @param params
 */
function applyCancelOrder(params) {
  return _request.http.request({
    url: "after-sales/apply/cancel/order",
    method: _request.Method.POST,
    needToken: true,
    params: params
  });
}

/**
/**
 * 获取商家售后收件地址
 */
function getStoreAfterSaleAddress(sn) {
  return _request.http.request({
    url: "/order/afterSale/getStoreAfterSaleAddress/".concat(sn),
    method: _request.Method.GET,
    needToken: true
  });
}
/**
 * 取消售后
 */
function cancelAfterSale(afterSaleSn) {
  return _request.http.request({
    url: "/order/afterSale/cancel/".concat(afterSaleSn),
    method: _request.Method.POST,
    needToken: true
  });
}

/**
 * 获取售后服务记录相关数据
 * @param params 参数
 */
function getAfterSaleList(params) {
  return _request.http.request({
    url: "/order/afterSale/page",
    method: _request.Method.GET,
    needToken: true,
    params: params
  });
}

/**
 * 查看售后服务详情
 * @param sn 售后服务单编号
 */
function getServiceDetail(sn) {
  return _request.http.request({
    url: "/order/afterSale/get/".concat(sn),
    method: _request.Method.GET,
    needToken: true
  });
}

/**
 * 添加投诉
 */
function addComplain(params) {
  return _request.http.request({
    url: "/order/complain",
    method: _request.Method.POST,
    needToken: true,
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: params
  });
}

/**
 * 取消投诉
 */
function clearComplain(id, params) {
  return _request.http.request({
    url: "/order/complain/status/".concat(id),
    method: _request.Method.PUT,
    needToken: true,
    params: params
  });
}

/**
 * 取消投诉
 */
function getAfterSaleLog(sn) {
  return _request.http.request({
    url: "/order/afterSale/get/getAfterSaleLog/".concat(sn),
    method: _request.Method.GET,
    needToken: true
  });
}

/**
 * 投诉列表
 */
function getComplain(params) {
  return _request.http.request({
    url: "/order/complain",
    method: _request.Method.GET,
    needToken: true,
    params: params
  });
}

/**
 * 获取申请原因
 */
function getAfterSaleReason(serviceType) {
  return _request.http.request({
    url: "/order/afterSale/get/afterSaleReason/".concat(serviceType),
    method: _request.Method.GET,
    needToken: true
  });
}

/**
 * 获取取消原因
 */
function getClearReason() {
  return _request.http.request({
    url: "/order/afterSale/get/afterSaleReason/CANCEL",
    method: _request.Method.GET,
    needToken: true
  });
}

/**
 * 获取投诉原因
 */
function getComplainReason() {
  return _request.http.request({
    url: "/order/afterSale/get/afterSaleReason/COMPLAIN",
    method: _request.Method.GET,
    needToken: true
  });
}
/**
 * 获取投诉详情
 */
function getComplainDetail(id) {
  return _request.http.request({
    url: "/order/complain/".concat(id),
    method: _request.Method.GET,
    needToken: true
  });
}

/**
 * 获取申请售后页面信息
 */
function getAfterSaleInfo(sn) {
  return _request.http.request({
    url: "/order/afterSale/applyAfterSaleInfo/".concat(sn),
    method: _request.Method.GET,
    needToken: true
  });
}

/**
 * 申请退货服务
 * @param params
 */
function applyReturn(orderItemSn, params) {
  return _request.http.request({
    url: "/order/afterSale/save/".concat(orderItemSn),
    method: _request.Method.POST,
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: params
  });
}

/**
 * 填充物流信息
 * @param afterSaleSn 售后服务单号
 * @param params 参数信息
 */
function fillShipInfo(afterSaleSn, params) {
  return _request.http.request({
    url: "/order/afterSale/delivery/".concat(afterSaleSn),
    method: _request.Method.POST,
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: params
  });
}

// 添加交易投诉对话
function communication(params) {
  return _request.http.request({
    url: "/order/complain/communication",
    method: _request.Method.POST,
    needToken: true,
    params: params
  });
}

/***/ }),

/***/ 784:
/*!*************************************************************!*\
  !*** D:/Desktop/code/ending/shop/js_sdk/lili-pay/wx-pay.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ 24));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ 23));
var _message = __webpack_require__(/*! @/api/message.js */ 124);
var _trade = __webpack_require__(/*! @/api/trade */ 133);
/**
 * 微信小程序支付
 * 此处针对于微信小程序开发的支付插件
 * 第一次支付成功后会跳出订阅的消息 如果用户拒绝或同意都会跳转到支付成功页面
 * 如果点击订阅 会将状态写进缓存 之后不再提醒。
 * 
 * @param {sn,price}
 */
var LiLiWXPay = /*#__PURE__*/(0, _createClass2.default)(function LiLiWXPay() {
  var _this = this;
  for (var _len = arguments.length, payList = new Array(_len), _key = 0; _key < _len; _key++) {
    payList[_key] = arguments[_key];
  }
  (0, _classCallCheck2.default)(this, LiLiWXPay);
  this.data = payList[0];
  console.log(payList);
  // 调用支付
  this.pay = function () {
    uni.showLoading({
      title: "加载中"
    });
    var submitData = {
      sn: _this.data.sn,
      orderType: _this.data.orderType || "TRADE",
      clientType: "WECHAT_MP"
    };
    var paymentMethod = "WECHAT";
    var paymentClient = "MP";
    // 调用支付
    (0, _trade.initiatePay)(paymentMethod, paymentClient, submitData).then(function (res) {
      var response = res.data.result;
      uni.hideLoading();
      uni.requestPayment({
        provider: "wxpay",
        appid: response.appid,
        timeStamp: response.timeStamp,
        nonceStr: response.nonceStr,
        package: response.package,
        signType: response.signType,
        paySign: response.paySign,
        success: function success(e) {
          uni.showToast({
            icon: "none",
            title: "支付成功!"
          });
          sendMessage(payList[0].price);
        },
        fail: function fail(e) {
          _this.exception = e;
          // 支付异常或支付失败之后跳转到订单页面
          uni.showModal({
            content: "支付失败,如果您已支付，请勿反复支付",
            showCancel: false,
            success: function success() {
              uni.redirectTo({
                url: "/pages/order/myOrder?status=0"
              });
            }
          });
        }
      });
    });
  };
});
function sendMessage(price) {
  //订阅消息
  (0, _message.getWeChatMpMessage)().then(function (res) {
    var message = res.data.result;
    var templateid = message.map(function (item) {
      return item.code;
    });
    uni.requestSubscribeMessage({
      tmplIds: templateid,
      success: function success(res) {},
      fail: function fail(res) {
        console.log('fail', res);
        uni.showToast({
          icon: "none",
          title: "订阅消息失败"
        });
      },
      complete: function complete(res) {
        console.log('complete', res);

        /**
         * 已经支付成功
         */
        uni.redirectTo({
          url: "/pages/cart/payment/success?paymentMethod=WECHAT" + "&payPrice=" + price
        });
      }
    });
  });
}
var _default = LiLiWXPay;
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ })

}]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/order/common/vendor.js.map