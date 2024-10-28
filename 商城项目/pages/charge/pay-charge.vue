<template>
	<view class="content">
		<view class="price-box">
			<text>支付金额</text>
			<text class="price">{{userCharge.chargeAmount}}</text>
		</view>

		<view class="pay-type-list">
			<view class="type-item b-b" @click="changePayType(1)">
				<text class="iconfont icon-pay-wechat"></text>
				<view class="con">
					<text class="tit">微信支付</text>
					<text>推荐使用微信支付</text>
				</view>
				<label class="radio">
					<radio value="" :checked='payType == 1' />
					</radio>
				</label>
			</view>
			<!-- #ifndef MP-WEIXIN -->
			<view class="type-item b-b" @click="changePayType(2)">
				<text class="iconfont icon-pay-alipay"></text>
				<view class="con">
					<text class="tit">支付宝支付</text>
				</view>
				<label class="radio">
					<radio value="" :checked='payType == 2' />
					</radio>
				</label>
			</view>
			<!-- #endif -->
		</view>
		<!-- #ifdef MP-WEIXIN -->
		<view class="button-base" @click="confirmWx">确认支付</view>
		<!-- #endif -->
		<!-- #ifndef MP-WEIXIN -->
		<view class="button-base" @click="confirm">确认支付</view>
		<!-- #endif -->
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	// #ifdef H5
	const wx = require('weixin-js-sdk');
	// #endif
	export default {
		data() {
			return {
				payType: 1,
				chargeNo: '',
				userCharge: {},
				suscribeMsgList: []
			};
		},
		computed: {
			...mapState(['hasLogin', 'userInfo', 'footPrint', 'applicationConfig'])
		},
		onLoad(options) {
			this.chargeNo = options.chargeNo;
			this.inquiryUserCharge(this.chargeNo);
			this.inquirySuscribeMsg();
		},

		methods: {
			//选择支付方式
			changePayType(type) {
				this.payType = type;
			},
			//确认支付
			confirmWx: function() {
				uni.requestSubscribeMessage({
					// 订单模板消息
					tmplIds: this.suscribeMsgList,
					success: function(res) {
						console.log('订单模板消息订阅成功');
					}
				});
				if (this.payType === 1) {
					this.wechatPay();
				} else if (this.payType === 2) {
					this.alipayPay();
				} else if (this.payType === 3) {
					this.balancePay();
				}

			},
			//确认支付
			confirm: function() {
				if (this.payType === 1) {
					this.wechatPay();
				} else if (this.payType === 2) {
					this.alipayPay();
				} else if (this.payType === 3) {
					this.balancePay();
				}

			},
			wechatPay() {
				// #ifdef H5
				this.wechatPayH5();
				// #endif

				// #ifdef APP-PLUS
				this.wechatPayApp();
				// #endif

				// #ifdef MP-WEIXIN
				this.wechatPayMP();
				// #endif
			},
			wechatPayApp() {
				let that = this;
				var options = {
					chargeNo: that.chargeNo
				};
				that.$api.request.App(options, res => {
					if (res.body.status.statusCode == 0) {
						var data = res.body.data;
						this.invokeWechatPayApp(data); //客户端调起微信支付
					} else {
						console.log(res.body.status.errorDesc);
					}
				});
			},
			wechatPayH5() {
				let that = this;
				var options = {
					chargeNo: that.chargeNo,
					openId: this.userInfo.openId
				};
				that.$api.request.chargeWechatPayH5(options, res => {
					if (res.body.status.statusCode == 0) {
						var data = res.body.data;
						this.invokeWechatPayH5(data); //客户端调起微信支付
					} else {
						console.log(res.body.status.errorDesc);
					}
				});
			},
			invokeWechatPayH5(order) {
				let that = this;
				var options = {
					url: document.URL
				};
				that.$api.request.getSignature(options, res => {
					if (res.body.status.statusCode == 0) {
						var jsSignature = res.body.data;
						wx.config({
							debug: false,
							appId: jsSignature.appId,
							timestamp: jsSignature.timestamp,
							nonceStr: jsSignature.nonceStr,
							signature: jsSignature.signature,
							jsApiList: ['chooseWXPay']
						})
						wx.ready(function() {
							wx.chooseWXPay({
								timestamp: order
								.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
								nonceStr: order.nonceStr, // 支付签名随机串，不长于 32 位
								package: order
								.packageStr, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
								signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
								paySign: order.signature, // 支付签名
								success: function(res) {
									uni.redirectTo({
										url: '/pages/user/pay-charge-success'
									})
								}
							});
						})
					}
				});
			},
			invokeWechatPayApp(order) {
				uni.requestPayment({
					provider: 'wxpay', //微信支付
					orderInfo: {
						"appid": order.appId,
						"noncestr": order.nonceStr,
						"package": order.packageStr,
						"partnerid": order.partnerId,
						"prepayid": order.prepayId,
						"timestamp": order.timestamp,
						"sign": order.signature
					},
					success: function(res) {
						setTimeout(() => {
							uni.redirectTo({
								url: '/pages/user/pay-charge-success'
							});
						}, 1000);
					},
					fail: function(err) {
						setTimeout(() => {
							uni.redirectTo({
								url: '/pages/order/order'
							});
						}, 1000);
					},
				})
			},
			wechatPayMP() {
				//微信小程序支付
				let that = this;
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						console.log(loginRes.code);
						that.$api.request.chargeWechatPay({
							chargeNo: that.chargeNo,
							code: loginRes.code
						}, res => {
							if (res.body.status.statusCode === '0') {
								var data = res.body.data;
								console.log(res.body.data);
								uni.requestPayment({
									provider: 'wxpay',
									timeStamp: data.timestamp,
									nonceStr: data.nonceStr,
									package: data.packageStr,
									signType: 'MD5',
									paySign: data.signature,
									success: function(res) {
										uni.redirectTo({
											url: '/pages/charge/pay-charge-success'
										})
									},
									fail: function(err) {
										console.log('fail:' + JSON.stringify(err));
									}
								});
							} else {
								console.log(res.body.status.errorDesc);
							}
						});
					}
				});
			},
			//支付宝支付
			alipayPay() {
				// #ifdef H5
				this.alipayH5();
				// #endif

				// #ifdef APP-PLUS
				this.alipayApp();
				// #endif
			},
			//支付宝在H5中支付
			alipayH5() {
				this.$api.request.chargeAlipay({
					chargeNo: this.chargeNo,
					paymentMethod: this.payType
				}, res => {
					if (res.body.status.statusCode === '0') {
						let alipayForm = res.body.data.alipayForm;
						let div = document.createElement('div'); // 创建div
						div.innerHTML = alipayForm; // 将返回的form 放入div
						document.body.appendChild(div);
						document.forms[0].acceptCharset = 'UTF-8'
						document.forms[0].submit();
					} else {
						this.$api.msg(res.body.status.errorDesc);
					}
				});
			},
			//支付宝在APP中支付
			alipayApp() {
				this.$api.request.chargeAlipayApp({
					chargeNo: this.chargeNo
				}, res => {
					if (res.body.status.statusCode === '0') {
						let alipayForm = res.body.data.alipayForm;
						alert(alipayForm);
						uni.requestPayment({
							provider: 'alipay', //支付宝支付
							orderInfo: alipayForm,
							success: function(res) {
								alert('success');
								setTimeout(() => {
									uni.redirectTo({
										url: '/pages/user/pay-charge-success'
									});
								}, 1000);
							},
							fail: function(err) {
								alert('fail');
								setTimeout(() => {
									uni.redirectTo({
										url: '/pages/order/order'
									});
								}, 1000);
							},
						})
					} else {
						this.$api.msg(res.body.status.errorDesc);
					}
				});
			},
			//余额支付
			balancePay() {
				this.$api.request.chargeBalancePay({
					chargeNo: this.chargeNo,
					paymentMethod: this.payType
				}, res => {
					if (res.body.status.statusCode === '0') {
						uni.redirectTo({
							url: '/pages/user/pay-charge-success'
						})
					} else {
						this.$api.msg(res.body.status.errorDesc);
					}
				});
			},
			//查询会员购买详情
			inquiryUserCharge(chargeNo) {
				this.$api.request.chargeDetail({
					chargeNo: chargeNo
				}, res => {
					if (res.body.status.statusCode === '0') {
						this.userCharge = res.body.data;
					} else {
						console.log(res.body.status.errorDesc);
					}
				});
			},
			//查询订阅消息
			inquirySuscribeMsg() {
				this.$api.request.wxSuscribeMsg({}, res => {
					if (res.body.status.statusCode === '0') {
						this.suscribeMsgList = res.body.data.suscribeMsgList;
					} else {
						console.log(res.body.status.errorDesc);
					}
				});
			}

		}
	}
</script>

<style lang='scss'>
	page {
		background: $page-color-base;
		padding-bottom: 160upx;
	}
	.content{
		margin: 0 $page-row-spacing;
	}


	.price-box {
		height: 265upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 28upx;
		color: #909399;

		.price {
			font-size: 50upx;
			color: #303133;
			margin-top: 12upx;

			&:before {
				content: '￥';
				font-size: 40upx;
			}
		}
	}

	.pay-type-list {
		margin-top: 20upx;
		padding-left: 60upx;

		.type-item {
			height: 120upx;
			padding: 20upx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-right: 60upx;
			font-size: 30upx;
			position: relative;
		}

		.iconfont {
			width: 100upx;
			font-size: 52upx;
		}
		
		.icon-pay-balance {
			color: #fe8e2e;
		}
		
		.icon-pay-wechat{
			color: #36cb59;
		}
		
		.icon-pay-alipay {
			color: #01aaef;
		}


		.tit {
			font-size: $font-lg;
			color: $font-color-dark;
			margin-bottom: 4upx;
		}

		.con {
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size: $font-sm;
			color: $font-color-light;
		}
	}
</style>