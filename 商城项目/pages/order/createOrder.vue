<template>
	<view>
		<!-- 地址 -->
		<view class="navbar" v-if="navList.length>0">
			<view v-for="(item, index) in navList" :key="index" class="nav-item"
				:class="{current: tabCurrentIndex === index}" @click="tabClick(index,item)">
				{{item.text}}
			</view>
		</view>
		<navigator v-if="currentDeliveryType==1" url="/pages/address/address?source=1" class="address-section">
			<view class="order-content" v-if="addressData.name">
				<uni-icons type="location-filled" size="30"></uni-icons>
				<view class="cen">
					<view class="top">
						<text class="name">{{addressData.name}}</text>
						<text class="mobile">{{addressData.telephone}}</text>
					</view>
					<text
						class="address">{{addressData.province}}{{addressData.city}}{{addressData.area}}{{addressData.street}}</text>
				</view>
				<uni-icons type="right"></uni-icons>
			</view>
			<view class="order-content" v-if="!addressData.name">
				<uni-icons type="location-filled" size="30"></uni-icons>
				<view class="cen">
					<view class="top">
						<!-- <text class="name">{{addressData.name}}</text>
						<text class="mobile">{{addressData.telephone}}</text> -->
						<text>请选择地址</text>
					</view>
					<!-- <text class="address">{{addressData.street}}</text> -->
				</view>
				<uni-icons type="right"></uni-icons>
			</view>
			<image class="a-bg"
				src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAAFCAYAAAAaAWmiAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Rjk3RjkzMjM2NzMxMTFFOUI4RkU4OEZGMDcxQzgzOEYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Rjk3RjkzMjQ2NzMxMTFFOUI4RkU4OEZGMDcxQzgzOEYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGOTdGOTMyMTY3MzExMUU5QjhGRTg4RkYwNzFDODM4RiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGOTdGOTMyMjY3MzExMUU5QjhGRTg4RkYwNzFDODM4RiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrEOZlQAAAiuSURBVHjazJp7bFvV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">
			</image>
		</navigator>
		<navigator v-if="currentDeliveryType==2" url="/pages/merchant/list" class="address-section">
			<view class="order-content" v-if="merchantData.merchantUuid">
				<uni-icons type="location-filled" size="30"></uni-icons>
				<view class="cen">
					<view class="top">
						<text class="name">{{merchantData.merchantName}}</text>
					</view>
					<text class="address">{{merchantData.merchantAddress}}公里</text>
				</view>
				<uni-icons type="right"></uni-icons>
			</view>
			<view class="order-content" v-if="!merchantData.merchantUuid">
				<uni-icons type="location-filled" size="30"></uni-icons>
				<view class="cen">
					<view class="top">
						<!-- <text class="name">{{addressData.name}}</text>
						<text class="mobile">{{addressData.telephone}}</text> -->
						<text>请选择门店</text>
					</view>
					<!-- <text class="address">{{addressData.street}}</text> -->
				</view>
				<uni-icons type="right"></uni-icons>
			</view>
		</navigator>

		<view class="goods-section">
			<!-- 商品列表 -->
			<view class="g-item" v-for="cart in carts">
				<image :src="cart.productDTO.productMainImage.url"></image>
				<view class="right">
					<text class="title clamp">{{cart.productDTO.productName}}</text>
					<text class="spec" v-if="cart.productDTO.skuEnabled">
						<text v-for="sku in cart.productSkuDTO.skuAttrValueList">{{sku.skuAttrValue}}</text>
					</text>
					<text class="spec" v-if="!cart.productDTO.skuEnabled">-</text>
					<view class="price-box">
						<text class="price">￥{{cart.unitPrice}}</text>
						<text class="number">x {{cart.unit}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 会员折扣 -->
		<view class="yt-list" v-if="discountAmount>0">
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">{{userInfo.userLevelDTO.name+'享部分商品'+userInfo.userLevelDTO.productDiscount+'折'}}</text>
				<text class="cell-tip active">
					<text class="deduct-amount">
						{{discountAmount}}
					</text>
				</text>
			</view>
		</view>
		<!-- 优惠明细 -->
		<view class="yt-list">
			<view class="yt-list-cell b-b">
				<view class="cell-icon">
					券
				</view>
				<text class="cell-tit clamp">优惠券</text>
				<text class="cell-tip" v-if="coupons.length==0">
					<text>无可用优惠券</text>
				</text>
				<text class="cell-tip active" v-if="coupons.length>0" @click="togglePopup('bottom', 'coupon')">
					<text v-if="!selectedCoupon.userCouponUuid">{{coupons.length}}张优惠券可用</text>
					<text class="coupon-name" v-if="selectedCoupon.userCouponUuid">
						{{selectedCoupon.couponDTO.name}}
					</text>
					<text class="deduct-amount" v-if="selectedCoupon.userCouponUuid">
						{{deductAmount}}
					</text>
				</text>
				<uni-icons class="close" type="clear" size="20" @click="clearSelectedCoupon" v-if="selectedCoupon.userCouponUuid"></uni-icons>
			</view>
		</view>
		<!-- 金额明细 -->
		<view class="yt-list">
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">商品金额</text>
				<text class="cell-tip red">￥{{productAmount}}</text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">共优惠</text>
				<text class="cell-tip">￥{{(deductAmount+discountAmount).toFixed(2)}}</text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">运费</text>
				<text class="cell-tip" v-if="tabCurrentIndex==0">￥{{freightAmount.toFixed(2)}}</text>
				<text class="cell-tip" v-if="tabCurrentIndex==1">￥0</text>
			</view>
			<view class="yt-list-cell desc-cell">
				<text class="cell-tit clamp">备注</text>
				<input class="desc" type="text" v-model="memo" :placeholder="memoPlaceHolder"
					placeholder-class="placeholder" />
			</view>
		</view>
		<!-- 提示 -->
		<view class="note">
			<h4>请仔细阅读以下条款</h4>
			<p>1. 虚拟商品(源码、点卡、账号类等无需物流的商品)需在备注栏填写你的电子邮箱，我们会将商品发送到该电子邮箱.</p>
			<p>2. 虚拟商品(源码、点卡、账号类等无需物流的商品)支付后概不退款.</p>
		</view>

		<!-- 底部 -->
		<view class="footer">
			<view class="price-content">
				<text>实付款</text>
				<text class="price-tip">￥</text>
				<text class="price">{{actualAmount}}</text>
			</view>
			<text class="submit" @click="submit">提交订单</text>
		</view>

		<!-- 优惠券面板 -->
		<uni-popup ref="showcoupon" :type="type" @change="change">
			<scroll-view scroll-y="true" class="coupon-list" @touchmove.stop>
				<user-coupon-item :coupon="item" action-text="立即使用" @eventClick="selectCoupon(item)" v-for="item in coupons"></user-coupon-item>
			</scroll-view>
		</uni-popup>
		<u-modal @confirm="navigateBack" v-model="isMultipleProductType" :show-title="false"
			:content="multipleProductTypeContent"></u-modal>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import userCouponItem from "@/components/user-coupon-item.vue"
	export default {
		data() {
			return {
				tabCurrentIndex: 0,
				currentDeliveryType: '',
				navList: [],
				isDeliveryExpressEnabled: true,
				isDeliveryPickEnabled: true,
				cartIds: [],
				carts: [], //结算的商品
				productAmount: 0.00, //商品金额, 未扣减任何优惠
				deductAmount: 0.00, //优惠金额
				actualAmount: 0.00, //实付金额
				freightAmount: 0.00, //运费
				discountAmount: 0.00, //折扣金额
				addressData: {}, //收货地址
				merchantData: {}, //门店地址
				maskState: 0, //优惠券面板显示状态
				memo: '', //备注
				memoPlaceHolder: '请填写备注信息',
				coupons: [], //有效优惠券
				selectedCoupon: {}, //选择使用的优惠券
				type: '',
				isMultipleProductType: false, //订单是否寄包含实物商品又包含虚拟商品
				multipleProductTypeContent: '订单中商品类型不一致(如实物商品, 虚拟商品, 电子卡券),需分开购买.'
			}
		},
		components: {
			uniPopup,
			userCouponItem
		},
		onLoad(option) {
			//商品数据
			var cart_id = JSON.parse(option.data);
			if (cart_id.length < 0) {
				uni.navigateBack({
					delta: 1
				})
			}
			this.cartIds = cart_id;
			this.inquiryProductByCartId(this.cartIds);
			this.searchCoupon();
			//会员折扣, 不依赖其他接口数据可以先加载
			this.calculateDiscountAmount();
		},
		computed: {
			...mapState(['hasLogin', 'userInfo', 'applicationConfig'])
		},
		watch: {
			addressData(val) {
				this.calculateFreightAmount(this.cartIds, val.province, val.city, val.area);
			}
		},
		methods: {
			navigateBack() {
				uni.navigateBack();
			},
			tabClick(index, item) {
				this.tabCurrentIndex = index;
				this.currentDeliveryType = item.state;
				if (this.currentDeliveryType == '1') {
					this.actualAmount = (this.productAmount - this.deductAmount - this.discountAmount + this.freightAmount).toFixed(2);
				} else if (this.currentDeliveryType == '2') {
					this.actualAmount = (this.productAmount - this.deductAmount - this.discountAmount).toFixed(2);
				}
			},
			//支持的发货方式
			populateDeliveryType() {
				if (this.isDeliveryExpressEnabled) {
					this.navList.push({
						state: '1',
						text: '快递配送'
					});
				}
				if (this.isDeliveryPickEnabled) {
					this.navList.push({
						state: '2',
						text: '门店自提'
					});
				}
				if (this.navList.length > 0)
					this.currentDeliveryType = this.navList[0].state; //第一个为默认选择
			},
			//查询默认收货地址
			inquiryDefaultAddress(userUuid) {
				let that = this;
				let postData = {
					userDTO: {
						userUuid: userUuid
					}
				}
				this.$api.request.userShip(postData, res => {
					if (res.body.status.statusCode === '0') {
						res.body.data.addresses.forEach(function(val, index) {
							if (val.default) {
								that.addressData = val;
							}
						})
					} else {
						console.log(res.body.status.errorDesc);
					}
				});
			},
			//查询订单商品
			inquiryProductByCartId(cardIds) {
				let that = this;
				let postData = cardIds.split(',');
				this.$api.request.productByCardIds(postData, res => {
					if (res.body.status.statusCode === '0') {
						this.carts = res.body.data.carts;
						var productAmount = this.calcSelectedProductAmount(this.carts);
						this.productAmount = productAmount.toFixed(2);
						this.actualAmount = (this.productAmount - this.deductAmount - this.discountAmount + this.freightAmount).toFixed(2);
						var orderProductDTOList = [];
						this.carts.forEach(function(cart, index) {
							orderProductDTOList.push({
								productDTO:{
									productUuid: cart.productDTO.productUuid
								},
								productUnit: cart.unit,
								productUnitPrice: cart.productDTO.unitPrice
							});
							if (that.carts[index].productDTO.productType != that.carts[0].productDTO
								.productType) {
								that.isMultipleProductType = true;
								if (!that.carts[index].productDTO.productType == '1') {
									that.isDeliveryExpressEnabled = true;
									this.isDeliveryPickEnabled = true;
								}
							}
						})
						this.getBestCoupon(orderProductDTOList);
						//虚拟商品提示填写联系方式
						if (this.carts[0].productDTO.productType == '2') {
							this.memoPlaceHolder = '商品将通过电子邮件发送，请务必在备注栏填写你的电子邮箱地址';
						}
						//实物商品查询收货地址
						if (this.carts[0].productDTO.productType == '1') {
							//商品支持的发货方式
							this.populateDeliveryType();
							this.inquiryDefaultAddress(this.userInfo.userUuid);
						}
					} else {
						console.log(res.body.status.errorDesc);
					}
				});
			},
			//获取扣减最多的优惠券
			getBestCoupon(orderProductDTOList) {
				let postData = {
					userDTO:{
						userUuid:this.userInfo.userUuid
					},
					orderProductDTOList:orderProductDTOList
				};
				this.$api.request.bestCoupon(postData, res => {
					if (res.body.status.statusCode === '0') {
						var selectedCoupon = res.body.data;
						if(selectedCoupon){
							this.selectCoupon(selectedCoupon)
						}
					}
				}, true);
			},
			//搜索可用优惠券
			searchCoupon() {
				var keyArray = ['USER', 'IS_EXPIRED', 'IS_USED', 'IS_STARTED'];
				let postData = {
					keyArray: keyArray,
					userUuid: this.userInfo.userUuid,
					expired: false,
					used: false,
					started: true,
					startIndex: 0,
					pageSize: 50 //默认查询50张有效优惠券, 用户大于50张则多余部分不会显示
				};
				//加载中
				this.$api.request.userCoupon(postData, res => {
					if (res.body.status.statusCode === '0') {
						var coupons = res.body.data.userCoupons;
						this.coupons = coupons;
					}
				}, true);
			},
			// 不使用优惠券
			clearSelectedCoupon() {
				this.selectedCoupon = {};
				this.deductAmount = 0.00;
				this.actualAmount = (this.productAmount - this.deductAmount - this.discountAmount + this.freightAmount).toFixed(2);
			},
			// 选中优惠券
			selectCoupon(item) {
				//计算当前商品使用优惠券后的优惠金额
				let postData = {
					shoppingCartUuidList: this.cartIds.split(','),
					userCouponDTO: {
						couponDTO: {
							couponUuid: item.couponDTO.couponUuid
						}
					}
				}
				this.$api.request.calculateCouponAmount(postData, res => {
					if (res.body.status.statusCode === '0') {
						this.deductAmount = res.body.data.deductAmount;
						this.actualAmount = (this.productAmount - this.deductAmount - this.discountAmount + this.freightAmount).toFixed(
							2);
						this.selectedCoupon = item;
						this.$refs.showcoupon.close();
					} else {
						this.$api.msg(res.body.status.errorDesc);
					}
				}, false);
			},
			//计算会员折扣金额
			calculateDiscountAmount() {
				let postData = {
					userDTO:{
						userUuid:this.userInfo.userUuid
					},
					shoppingCartUuidList: this.cartIds.split(','),
				};
				this.$api.request.calculateDiscountAmount(postData, res => {
					if (res.body.status.statusCode === '0') {
						this.discountAmount = res.body.data.discountAmount;
						this.actualAmount = (this.productAmount - this.deductAmount - this.discountAmount + this.freightAmount).toFixed(2);
					}
				}, true);
			},
			// 计算运费金额
			calculateFreightAmount(item, province, city, area) {
				let postData = {
					shoppingCartUuidList: this.cartIds.split(','),
					deliveryProvince: province,
					deliveryCity: city,
					deliveryArea: area
				}
				this.$api.request.calculateFreightAmount(postData, res => {
					if (res.body.status.statusCode === '0') {
						this.freightAmount = res.body.data.freightAmount;
						this.actualAmount = (this.productAmount - this.deductAmount - this.discountAmount + this.freightAmount).toFixed(2);
					} else {
						this.$api.msg(res.body.status.errorDesc);
					}
				}, false);
			},
			//计算总金额
			calcSelectedProductAmount(cartData) {
				var amount = 0;
				cartData.forEach(function(val, index) {
					amount = amount + val.unitPrice * val.unit;
				})
				return amount;
			},
			change(e) {
				console.log('是否打开:' + e.show)
			},
			togglePopup(type, open) {
				this.type = type
				this.$nextTick(() => {
					this.$refs['show' + open].open()
				})
			},
			numberChange(data) {
				this.number = data.number;
			},
			submit() {
				//虚拟商品，检查备注栏是否填写电子邮箱地址
				if (this.carts[0].productDTO.productType == '2' && this.memo.trim() === '') {
					this.$api.msg('请在备注栏填写你的电子邮箱地址');
					return;
				}
				//检查收货地址是否选择
				if ((this.currentDeliveryType == '1') && !this.addressData.userDeliveryAddressUuid) {
					this.$api.msg('未选择收货地址');
					return;
				}
				if ((this.currentDeliveryType == '3') && !this.merchantData.merchantUuid) {
					this.$api.msg('未选择提货门店');
					return;
				}
				//post订单数据到后台
				let postData = {
					actionType: 'ADD',
					userDTO: {
						userUuid: this.userInfo.userUuid
					},
					deliveryAddressDTO: {
						userDeliveryAddressUuid: this.addressData.userDeliveryAddressUuid
					},
					merchantDTO: {
						merchantUuid: this.merchantData.merchantUuid
					},
					deliveryType: this.currentDeliveryType,
					memo: this.memo,
					shoppingCartUuidList: this.cartIds.split(',')
				}
				if (this.selectedCoupon.userCouponUuid) {
					postData.userCouponDTO = {
						userCouponUuid: this.selectedCoupon.userCouponUuid,
						couponDTO: {
							couponUuid: this.selectedCoupon.couponDTO.couponUuid
						}
					}
				}
				this.$api.request.createOrder(postData, res => {
					if (res.body.status.statusCode === '0') {
						uni.redirectTo({
							url: '/pages/money/pay?orderNo=' + res.body.data.orderNo
						})
					} else {
						this.$api.msg(res.body.status.errorDesc);
					}
				});

			},
			stopPrevent() {}
		}
	}
</script>

<style lang="scss">
	page {
		background: $page-color-base;
		padding-bottom: 100upx;
	}

	.address-section {
		padding: 30upx 0;
		background: #fff;
		position: relative;

		.order-content {
			display: flex;
			align-items: center;
		}

		.icon-shouhuodizhi {
			flex-shrink: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 90upx;
			color: $font-color-light;
			font-size: 44upx;
		}

		.cen {
			display: flex;
			flex-direction: column;
			flex: 1;
			font-size: 28upx;
			color: $font-color-dark;
		}

		.name {
			font-size: 34upx;
			margin-right: 24upx;
		}

		.address {
			margin-top: 16upx;
			margin-right: 20upx;
			color: $font-color-light;
		}

		.icon-you {
			font-size: 32upx;
			color: $font-color-light;
			margin-right: 30upx;
		}

		.a-bg {
			position: absolute;
			left: 0;
			bottom: 0;
			display: block;
			width: 100%;
			height: 5upx;
		}
	}

	.goods-section {
		margin-top: 16upx;
		background: #fff;
		padding-bottom: 1px;

		.g-header {
			display: flex;
			align-items: center;
			height: 84upx;
			padding: 0 30upx;
			position: relative;
		}

		.logo {
			display: block;
			width: 50upx;
			height: 50upx;
			border-radius: 100px;
		}

		.name {
			font-size: 30upx;
			color: $font-color-base;
			margin-left: 24upx;
		}

		.g-item {
			display: flex;
			margin: 20upx 30upx;

			image {
				flex-shrink: 0;
				display: block;
				width: 140upx;
				height: 140upx;
				border-radius: 4upx;
			}

			.right {
				flex: 1;
				padding-left: 24upx;
				overflow: hidden;
			}

			.title {
				font-size: 30upx;
				color: $font-color-dark;
			}

			.spec {
				font-size: 26upx;
				color: $font-color-light;
			}

			.price-box {
				display: flex;
				align-items: center;
				font-size: 32upx;
				color: $font-color-dark;
				padding-top: 10upx;

				.price {
					margin-bottom: 4upx;
				}

				.number {
					font-size: 26upx;
					color: $font-color-base;
					margin-left: 20upx;
				}
			}

			.step-box {
				position: relative;
			}
		}
	}

	.yt-list {
		margin-top: 16upx;
		background: #fff;
	}

	.yt-list-cell {
		display: flex;
		align-items: center;
		padding: 10upx 30upx 10upx 40upx;
		line-height: 70upx;
		position: relative;

		&.cell-hover {
			background: $page-color-light;
		}

		&.b-b:after {
			left: 30upx;
		}

		.cell-icon {
			height: 32upx;
			width: 32upx;
			font-size: 22upx;
			color: #fff;
			text-align: center;
			line-height: 32upx;
			background: $uni-color-error;
			border-radius: 4upx;
			margin-right: 12upx;
		}

		.cell-more {
			align-self: center;
			font-size: 24upx;
			color: $font-color-light;
			margin-left: 8upx;
			margin-right: -10upx;
		}

		.cell-tit {
			flex: 1;
			font-size: 26upx;
			color: $font-color-light;
			margin-right: 10upx;
		}

		.cell-tip {
			font-size: 26upx;
			color: $font-color-light;
			.coupon-name{
				background: $uni-color-primary;
				color:#ffffff;
				padding: 6upx;
			}
			.deduct-amount{
				margin-left:20upx;
				&::before{
					content: '-￥';
				}
			}

			&.disabled {
				color: $font-color-light;
			}

			&.active {
				color: $base-color;
			}

			&.red {
				color: $base-color;
			}

			& .close {
				color: $font-color-light;
				margin-left: 20upx;
			}
		}

		&.desc-cell {
			.cell-tit {
				max-width: 90upx;
			}
		}

		.desc {
			flex: 1;
			font-size: $font-base;
			color: $font-color-dark;
		}
	}

	
	.footer {
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 995;
		display: flex;
		align-items: center;
		width: 100%;
		height: 90upx;
		justify-content: space-between;
		font-size: 30upx;
		background-color: #fff;
		z-index: 998;
		color: $font-color-base;

		.price-content {
			padding-left: 30upx;
		}

		.price-tip {
			color: $price-color;
			margin-left: 8upx;
		}

		.price {
			font-size: 36upx;
			color: $price-color;
		}

		.submit {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 280upx;
			height: 100%;
			color: #fff;
			font-size: 32upx;
			background-color: $base-color;
		}
	}
	

	.coupon-list {
		display: flex;
		flex-wrap: wrap;
		padding: 0 10upx;
		border-radius: 20upx;
		margin-bottom: 100upx;
		max-height: 700upx;
	}

	.navbar {
		display: flex;
		height: 40px;
		padding: 0 5px;
		background: #fff;
		box-shadow: 0 1px 5px rgba(0, 0, 0, .06);
		/* position: relative; */
		z-index: 10;

		.nav-item {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 15px;
			color: $font-color-dark;
			position: relative;

			&.current {
				color: $base-color;

				&:after {
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 44px;
					height: 0;
					border-bottom: 2px solid $base-color;
				}
			}
		}
	}

	.note {
		margin: 40upx;
		font-size: $font-base;
		color: $font-color-light;
		line-height: 50upx;

		.link {
			color: $base-color;
			text-decoration: none;
		}
	}
</style>