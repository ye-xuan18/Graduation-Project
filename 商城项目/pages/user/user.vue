<template>
	<view class="container">

		<view class="user-section">
			<!-- <image class="bg" src="/static/user-bg.png"></image> -->
			<view @click="navTo('/pages/merchant/nearby')" class="nearby" v-if="applicationConfig.applicationMerchantEnabled">
				附近门店
			</view>
			<view class="user-info-box">
				<view class="portrait-box">
					<image class="portrait" :src="userInfo.photoUrl || '/static/missing-face.png'"></image>
				</view>
			</view>
			<view class="vip-card-box">
				<view class="b-btn" v-if="!hasLogin" @click="navTo('/pages/public/login')">
					立即登录
				</view>
				<view class="b-btn" v-if="hasLogin" @click="navTo('/pages/set/setUserInfoName')">
					{{userInfo.name||'设置昵称'}}
				</view>
				<view class="tit">
					<text v-if="hasLogin" @click="navTo('/pages/user/user-upgrade-list')">{{userInfo.userLevelName}}<text v-if="userInfo.userLevelExpireDate">(至{{userInfo.userLevelExpireDate}})</text></text>
					<text v-if="!hasLogin">未登录</text>
				</view>
			</view>
		</view>

		<view class="cover-container" :style="[{
				transform: coverTransform,
				transition: coverTransition
			}]"
		 @touchstart="coverTouchstart" @touchmove="coverTouchmove" @touchend="coverTouchend">
			<image class="arc" src="/static/arc.png"></image>

			<view class="tj-sction">
				<view class="tj-item">
					<text class="num" @click="navTo('/pages/user/balance')">{{userInfo.availableBalance||0}}</text>
					<text>余额</text>
					<text v-if="hasLogin && applicationConfig.applicationChargeEnabled" class="b-btn" @click="navTo('/pages/charge/list')">充值</text>
					<text v-else-if="hasLogin && applicationConfig.applicationWithdrawEnabled" class="b-btn" @click="navTo('/pages/withdraw/list')">提现</text>
				</view>
				<view class="tj-item">
					<text class="num" @click="navTo('/pages/point/point-list')">{{userInfo.availablePoint||0}}</text>
					<text>积分</text>
					<text v-if="hasLogin" class="b-btn" @click="togglePointProduct">兑换商品</text>
					
				</view>
<!-- 				<view class="tj-item" @click="navTo('/pages/user/performance')">
					<text class="num">{{userInfo.performanceAmount||0}}</text>
					<text>本月业绩</text>
				</view> -->
				<view class="tj-item">
					<text class="num" @click="navTo('/pages/user/coupon')">{{userInfo.couponCount||0}}</text>
					<text>优惠券</text>
					<text v-if="hasLogin" class="b-btn" @click="toggleCouponList">领取更多</text>
				</view>
			</view>
			<!-- 订单 -->
			<view class="order-section">
				<view class="order-item" @click="navTo('/pages/order/order?state=')" hover-class="common-hover" :hover-stay-time="50">
					<uni-icons custom-prefix="iconfont" type="icon-order-all" :color="uiConfig.baseColor" size="40"></uni-icons>
					<text>全部订单</text>
				</view>
				<view class="order-item" @click="navTo('/pages/order/order?state=1')" hover-class="common-hover" :hover-stay-time="50">
					<uni-icons custom-prefix="iconfont" type="icon-order-pay" :color="uiConfig.baseColor" size="40"></uni-icons>
					<text>待付款</text><uni-badge type="error" v-if="toPayOrderCount>0" :text="toPayOrderCount+''"></uni-badge>
				</view>
				<view class="order-item" @click="navTo('/pages/order/order?state=2')" hover-class="common-hover" :hover-stay-time="50">
					<uni-icons custom-prefix="iconfont" type="icon-order-search" :color="uiConfig.baseColor" size="40"></uni-icons>
					<text>待发货</text><uni-badge type="error" v-if="toDeliverOrderCount>0" :text="toDeliverOrderCount+''"></uni-badge>
				</view>
				<view class="order-item" @click="navTo('/pages/order/order?state=3')" hover-class="common-hover" :hover-stay-time="50">
					<uni-icons custom-prefix="iconfont" type="icon-order-confirm" :color="uiConfig.baseColor" size="40"></uni-icons>
					<text>待收货</text><uni-badge type="error" v-if="toConfirmOrderCount>0" :text="toConfirmOrderCount+''"></uni-badge>
				</view>
				<view class="order-item" @click="navTo('/pages/aftersale/list')" hover-class="common-hover" :hover-stay-time="50">
					<uni-icons custom-prefix="iconfont" type="icon-aftersale" :color="uiConfig.baseColor" size="40"></uni-icons>
					<text>退款/售后</text><uni-badge type="error" v-if="afterSaleCount>0" :text="afterSaleCount+''"></uni-badge>
				</view>
			</view>
			<view class="upgrade-section" v-if="upgradeUserLevel.userLevelUuid">
				<navigator  url="/pages/user/user-upgrade">升级至{{upgradeUserLevel.name}}享部分商品{{upgradeUserLevel.productDiscount}}折优惠</navigator>
				<navigator  class="btn" url="/pages/user/user-upgrade">查看详情</navigator>
			</view>
			<view class="function-section">
				<view class="function-item" @click="navTo('/pages/groupbuy/groupbuy')" hover-class="common-hover" :hover-stay-time="50">
					<uni-icons custom-prefix="iconfont" type="icon-tuangou" size="40"></uni-icons>
					<text>拼团订单</text>
				</view>
				<view class="function-item" @click="navTo('/pages/point/point-order-list')" hover-class="common-hover" :hover-stay-time="50">
					<uni-icons custom-prefix="iconfont" type="icon-point" size="40"></uni-icons>
					<text>积分订单</text>
				</view>
				<view class="function-item" @click="navTo('/pages/address/address')" hover-class="common-hover" :hover-stay-time="50">
					<uni-icons custom-prefix="iconfont" type="icon-location" size="40"></uni-icons>
					<text>地址管理</text>
				</view>
				<view class="function-item" @click="navTo('/pages/merchant/nearby')" hover-class="common-hover" :hover-stay-time="50" v-if="applicationConfig.applicationMerchantEnabled">
					<uni-icons type="shop" size="40"></uni-icons>
					<text>查看门店</text>
				</view>
				<view class="function-item" @click="navTo('/pages/product/favorite')" hover-class="common-hover" :hover-stay-time="50">
					<uni-icons type="star" size="40"></uni-icons>
					<text>商品收藏</text>
				</view>
			</view>
			<!-- 浏览历史 -->
			<view class="history-section icon">
				<view class="sec-header" v-if="footPrint.length>0">
					<uni-icons type="eye-filled" size="25"></uni-icons>
					<text>浏览历史</text>
				</view>
				<scroll-view scroll-x class="h-list" v-if="footPrint.length>0">
					<image @click="navTo('/pages/product/product?id='+footPrint[footPrint.length-index-1].productUuid)" :src="footPrint[footPrint.length-index-1].productMainImage.url"
					 mode="aspectFill" v-for="(product,index) in footPrint"></image>
				</scroll-view>
				<list-cell v-if="hasLogin" icon="paperplane" title="分享"  tips="邀请好友赢取佣金" @eventClick="togglePopup('bottom', 'share')"></list-cell>
				<list-cell icon="notification" title="消息中心" border="" @eventClick="navTo('/pages/notice/list')"></list-cell>
				<list-cell icon="help" title="帮助中心" border="" @eventClick="navTo('/pages/help/help')"></list-cell>
				<list-cell icon="settings" title="设置" border="" @eventClick="navTo('/pages/set/set')"></list-cell>
			</view>
		</view>
		<!-- 底部分享弹窗 -->
		<uni-popup ref="showshare" :type="type">
			<!-- #ifdef H5 -->
			<shareByH5 :shareType='1' :userId="userInfo.userUuid" :shareHref="shareHref" @close="closeShare()"></shareByH5>
			<!-- #endif -->

			<!-- #ifdef MP-WEIXIN -->
			<shareByWx :shareType='1' :userId="userInfo.userUuid" :shareImg="userInfo.photoUrl"
			 shareTitle="注册会员, 立享佣金!" :shareContent="'我是'+userInfo.name" :shareHref="'/pages/public/register?id='+userInfo.userUuid" @close="closeShare()"></shareByWx>
			<!-- #endif -->

			<!-- #ifdef MP-ALIPAY -->
			<shareByAli :shareType='1' :userId="userInfo.userUuid" :shareHref="shareHref" @close="closeShare()"></shareByAli>
			<!-- #endif -->

			<!-- #ifdef APP-PLUS -->
			<shareByApp :shareType='1' :userId="userInfo.userUuid" :shareHref="shareHref" @close="closeShare()"></shareByApp>
			<!-- #endif -->
		</uni-popup>

	</view>
</template>
<script>
	import listCell from '@/components/custom-list-cell';
	import uniBadge from "@/components/uni-badge/uni-badge.vue";
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	// #ifdef H5
	import shareByH5 from '@/components/share/shareByh5.vue'
	// #endif
	// #ifdef MP-WEIXIN
	import shareByWx from '@/components/share/shareByWx.vue'
	// #endif
	// #ifdef MP-ALIPAY
	import shareByAli from '@/components/share/shareByAli.vue'
	// #endif
	// #ifdef APP-PLUS
	import shareByApp from '@/components/share/shareByApp.vue'
	// #endif
	import {
		mapState,
		mapMutations
	} from 'vuex';
	let startY = 0,
		moveY = 0,
		pageAtTop = true;
	export default {
		components: {
			listCell,
			uniBadge,
			uniPopup,
			// #ifdef H5
			shareByH5,
			// #endif
			
			// #ifdef MP-WEIXIN
			shareByWx,
			// #endif
			
			// #ifdef MP-ALIPAY
			shareByAli,
			// #endif
			
			// #ifdef APP-PLUS
			shareByApp,
			// #endif
		},
		data() {
			return {
				type: '',
				coverTransform: 'translateY(0px)',
				coverTransition: '0s',
				moving: false,
				upgradeUserLevel:{},
				toPayOrderCount:0,
				toDeliverOrderCount:0,
				toConfirmOrderCount:0,
				afterSaleCount:0
			}
		},
		onLoad() {
			this.inquiryUserLevel();
		},
		onShareAppMessage(res) {
		    return {
		      title: '我是'+this.userInfo.name+',注册会员,立享佣金!',
			  imageUrl:this.userInfo.photoUrl,
		      path: '/pages/public/register?id=' + this.userInfo.userUuid
		    }
		 },
		// #ifndef MP
		onNavigationBarButtonTap(e) {
			const index = e.index;
			if (index === 0) {
				this.navTo('/pages/set/set');
			} else if (index === 1) {
				// #ifdef APP-PLUS
				const pages = getCurrentPages();
				const page = pages[pages.length - 1];
				const currentWebview = page.$getAppWebview();
				currentWebview.hideTitleNViewButtonRedDot({
					index
				});
				// #endif
				uni.navigateTo({
					url: '/pages/notice/list'
				})
			}
		},
		// #endif
		computed: {
			...mapState(['hasLogin', 'userInfo', 'footPrint', 'applicationConfig', 'uiConfig']),
			shareHref() {
				let pages = getCurrentPages()
				let page = pages[pages.length - 1]
				// #ifdef H5 || MP-WEIXIN || APP-PLUS || APP-PLUS-NVUE
				return this.$api.request.apiBaseUrl.replace("/b2c/rest/","") + '/#/pages/public/register?id=' + this.userInfo.userUuid;
				// #endif
			
				// #ifdef MP-ALIPAY
				return this.$api.request.apiBaseUrl.replace("/b2c/rest/","") + '/#/pages/public/register?id=' + this.userInfo.userUuid;
				// #endif
			}
		},
		methods: {
			...mapMutations(['login']),
			toggleSignPoint: function () {
			  uni.navigateTo({
				url:'/pages/point/sign'
			  })
			},
			togglePointProduct: function () {
			  uni.navigateTo({
				url:'/pages/point/product-list'
			  })
			},
			toggleCouponList: function () {
			  uni.navigateTo({
				url:'/pages/coupon/list'
			  })
			},
			togglePopup(type, open) {
				this.type = type
				this.$nextTick(() => {
					this.$refs['show' + open].open()
				})
			},
			closeShare() {
				this.$refs.showshare.close();
			},
			//查询会员等级
			inquiryUserLevel() {
				let that = this;
				this.$api.request.inquiryUserLevel({}, res => {
					if (res.body.status.statusCode === '0') {
						var userLevelList = [];
						//不显示低于当前等级的数据
						res.body.data.levels.forEach(function(item, index) {
							if (item.depth <= that.userInfo.userLevelDTO.depth && !item.default) {
								debugger
								that.upgradeUserLevel = item;
							}
						});
					} else {
						console.log(res.body.status.errorDesc);
					}
				}, true);
			},
			inquiryOrderTotal(orderStatus) {
				let searchOptions = {
					keyArray: ['USER', 'IS_AFTER_SALE','ORDERSTATUS','ORDER_TYPE_LIST'],
					userUuid: this.userInfo.userUuid,
					afterSale: false,
					orderStatus: orderStatus,
					orderTypeList:['0','1','2']
				};
				this.$api.request.searchOrderTotal(searchOptions, res => {
					if (res.body.status.statusCode === '0') {
						var total = res.body.data.total;
						if(orderStatus == '0'){
							this.toPayOrderCount = total;
						}else if(orderStatus == '1'){
							this.toDeliverOrderCount = total;
						}else if(orderStatus == '2'){
							this.toConfirmOrderCount = total;
						}
					} else {
						console.log(res.body.status.errorDesc);
					}
				},true);
			},
			inquiryAfterSaleTotal(statusList) {
				var keyArray = ['USER'];
				let searchOptions = {
					userUuid: this.userInfo.userUuid
				};
				if(statusList &&statusList.length>0){
					keyArray.push('STATUS_LIST');
					searchOptions.statusList = statusList;
				}
				searchOptions.keyArray = keyArray;
				this.$api.request.searchAfterSaleTotal(searchOptions, res => {
					if (res.body.status.statusCode === '0') {
						var afterSaleCount = res.body.data.total;
						this.afterSaleCount = afterSaleCount;
					} else {
						console.log(res.body.status.errorDesc);
					}
				},true);
			},
			/**
			 * 统一跳转接口,拦截未登录路由
			 * navigator标签现在默认没有转场动画，所以用view
			 */
			navTo(url) {
				if (!this.hasLogin) {
					url = '/pages/public/login';
				}
				uni.navigateTo({
					url
				})
			},

			customerService() {
				uni.navigateTo({
					url:'/pages/help/help'
				})
			},
			
			/**
			 *  会员卡下拉和回弹
			 *  1.关闭bounce避免ios端下拉冲突
			 *  2.由于touchmove事件的缺陷（以前做小程序就遇到，比如20跳到40，h5反而好很多），下拉的时候会有掉帧的感觉
			 *    transition设置0.1秒延迟，让css来过渡这段空窗期
			 *  3.回弹效果可修改曲线值来调整效果，推荐一个好用的bezier生成工具 http://cubic-bezier.com/
			 */
			coverTouchstart(e) {
				if (pageAtTop === false) {
					return;
				}
				this.coverTransition = 'transform .1s linear';
				startY = e.touches[0].clientY;
			},
			coverTouchmove(e) {
				moveY = e.touches[0].clientY;
				let moveDistance = moveY - startY;
				if (moveDistance < 0) {
					this.moving = false;
					return;
				}
				this.moving = true;
				if (moveDistance >= 80 && moveDistance < 100) {
					moveDistance = 80;
				}

				if (moveDistance > 0 && moveDistance <= 80) {
					this.coverTransform = `translateY(${moveDistance}px)`;
				}
			},
			coverTouchend() {
				if (this.moving === false) {
					return;
				}
				this.moving = false;
				this.coverTransition = 'transform 0.3s cubic-bezier(.21,1.93,.53,.64)';
				this.coverTransform = 'translateY(0px)';
			}
		},
		onShow() {
			//同步用户信息
			if (this.hasLogin) {
				this.$api.request.userInfo({
					userUuid: this.userInfo.userUuid
				}, res => {
					if (res.body.status.statusCode === '0') {
						this.login(res.body.data);
					}
				});
				//获取待付款和待收货订单数量(0-待付款, 1-待发货， 2-待收货)
				this.inquiryOrderTotal('0');	
				this.inquiryOrderTotal('1');	
				this.inquiryOrderTotal('2');
				this.inquiryAfterSaleTotal(['0','1','3']);
			}
		}
	}
</script>
<style lang='scss'>
	%flex-center {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	%section {
		display: flex;
		justify-content: space-around;
		align-content: center;
		background: #fff;
		border-radius: 10upx;
	}

	.user-section {
		height: 520upx;
		padding: 100upx 30upx 0;
		position: relative;
		background: linear-gradient(to bottom, $light-color, #ffffff00);
	}

	.user-info-box {
		height: 180upx;
		display: flex;
		align-items: center;
		position: relative;
		z-index: 1;

		.portrait {
			width: 130upx;
			height: 130upx;
			border: 5upx solid #fff;
			border-radius: 50%;
		}

		.username {
			font-size: $font-sm;
			color: $font-color-base;
			margin-left: 20upx;
		}
	}

	.vip-card-box {
		display: flex;
		flex-direction: column;
		color: $base-color;
		height: 240upx;
		background: linear-gradient(to right, $font-color-dark, $font-color-dark);
		border-radius: 16upx 16upx 0 0;
		overflow: hidden;
		position: relative;
		padding: 20upx 24upx;

		.card-bg {
			position: absolute;
			top: 20upx;
			right: 0;
			width: 380upx;
			height: 260upx;
		}

		.b-btn {
			position: absolute;
			right: 20upx;
			top: 16upx;
			/* width: 132upx; */
			height: 40upx;
			text-align: center;
			line-height: 40upx;
			font-size: $font-sm;
			color: $font-color-dark;
			border-radius: 20px;
			background: #fff;
			z-index: 1;
			padding: 0 20upx;
		}

		.tit {
			font-size: $font-sm;
			color: #ffffff;
			margin-bottom: 28upx;
		}
	}

	.cover-container {
		background: $page-color-base;
		margin-top: -150upx;
		padding: 0 20upx;
		position: relative;
		background: $page-color-base;
		padding-bottom: 20upx;

		.arc {
			position: absolute;
			left: 0;
			top: -34upx;
			width: 100%;
			height: 36upx;
		}
	}

	.tj-sction {
		@extend %section;
		align-items: baseline;
		.tj-item {
			@extend %flex-center;
			flex-direction: column;
			height: 150upx;
			font-size: $font-sm;
			color: $font-color-light;
			.b-btn {
				margin: 10px 0;
				width: 132upx;
				height: 40upx;
				text-align: center;
				line-height: 40upx;
				font-size: 22upx;
				color: #fff;
				border-radius: 10px;
				background: linear-gradient(to right, $font-color-dark, $font-color-dark);
				z-index: 1;
			}
		}

		.num {
			font-size: $font-lg;
			color: $font-color-dark;
			font-weight: bold;
			margin-bottom: 8upx;
		}
	}
	.upgrade-section{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		color: $base-color;
		height: 80upx;
		background: $font-color-dark;
		border-radius: 16upx;
		overflow: hidden;
		position: relative;
		padding: 20upx 24upx;
		color: #FFD700;
		.btn{
			background: #FFD700;
			color: #ffffff;
			border-radius: 20upx;
			padding: 0 20upx;
			height: 40rpx;
			line-height: 40rpx;
		}
	}
	.order-section {
		@extend %section;
		padding: 28upx 0;
		margin-top: 20upx;

		.order-item {
			position: relative;
			@extend %flex-center;
			width: 120upx;
			height: 120upx;
			border-radius: 10upx;
			font-size: $font-sm;
			color: $font-color-dark;
		}
		.uni-badge{
			position: absolute;
			top: -2px;
			left: 40px;
			background: $base-color;
			color: #fff;
		}
	}
	
	.function-section {
		@extend %section;
		padding: 28upx 0;
		margin-top: 20upx;
	
		.function-item {
			position: relative;
			@extend %flex-center;
			width: 120upx;
			height: 120upx;
			border-radius: 10upx;
			font-size: $font-sm;
			color: $font-color-dark;
		}
		.uni-badge{
			position: absolute;
			top: -2px;
			left: 30px;
			background: $font-color-primary;
			color: #fff;
		}
	}

	.history-section {
		padding: 30upx 0 0;
		margin-top: 20upx;
		background: #fff;
		border-radius: 10upx;

		.sec-header {
			display: flex;
			align-items: center;
			font-size: $font-base;
			color: $font-color-dark;
			line-height: 40upx;
			margin-left: 30upx;
		}

		.h-list {
			white-space: nowrap;
			padding: 30upx 30upx 0;

			image {
				display: inline-block;
				width: 160upx;
				height: 160upx;
				margin-right: 20upx;
				border-radius: 10upx;
			}
		}
	}
	.nearby{
		opacity: .5;
		background-color: #000;
		position: absolute;
		right: 0px;
		top: 150upx;
		width: 200upx;
		height: 60upx;
		line-height: 60upx;
		z-index: 999;
		color: #fff;
		font-size: $font-base;
		border-radius: 100upx 0px 0px 100upx;
		text-align: center;
	}
</style>
