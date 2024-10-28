(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/product/common/vendor"],{

/***/ 1437:
/*!*************************************************************************************!*\
  !*** D:/Desktop/code/ending/shop/pages/product/product/promotion/promotion_type.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.formatType = formatType;
var promotion = [{
  title: "积分活动",
  value: "POINTS_GOODS"
}, {
  title: "砍价活动",
  value: "KANJIA"
}, {
  title: "单品立减",
  value: "MINUS"
}, {
  title: "团购",
  value: "GROUPBUY"
}, {
  title: "积分换购",
  value: "EXCHANGE"
}, {
  title: "第二件半价",
  value: "HALF_PRICE"
}, {
  title: "满减优惠",
  value: "FULL_DISCOUNT"
}, {
  title: "限时抢购",
  value: "SECKILL"
}, {
  title: "拼团",
  value: "PINTUAN"
}, {
  title: "优惠券",
  value: "COUPON"
}];
var _default = promotion;
/**格式化 */
exports.default = _default;
function formatType(val) {
  if (val != undefined) {
    promotion.forEach(function (item) {
      if (val == item.value) {
        return item.title;
      }
    });
  }
}

/***/ }),

/***/ 539:
/*!************************************************************************!*\
  !*** D:/Desktop/code/ending/shop/pages/product/product/popup/popup.js ***!
  \************************************************************************/
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
  close: true //能否点击遮罩退出
};
exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/product/common/vendor.js.map