<template>
	<view class="container">
		<view class="user-info-box">
			<view class="portrait-box">
				<image class="portrait" :src="userInfo.photoUrl || '/static/missing-face.png'"></image>
			</view>
			<view class="name">
				<view>
					{{userInfo.name}}
				</view>
				<view class="level" >
					{{userInfo.userLevelName}}<text v-if="userInfo.userLevelExpireDate">(有效期至{{userInfo.userLevelExpireDate}})</text>
				</view>
			</view>
		</view>
		<view class="level-section">
			<view class="level-name">
				<u-tabs :list="userLevelList" :active-color="uiConfig.baseColor"
					:is-scroll="false" :current="current" @change="changeTab"></u-tabs>
			</view>
			<view class="level-price" v-for="(item,index) in userLevelList" v-if="index==current">
				<scroll-view scroll-x>
					<view class="scroll-wrapper">
						<view class="price-wrapper" :class="{active: upgradeType==='1'}"
							v-if="item.weekPrice>0"
							@click="selectUpgradeType('1')">
							<view class="l1">
								7天
							</view>
							<view class="l2">
								{{item.weekPrice}}
							</view>
							<view class="l3">
								低至{{(item.weekPrice/7).toFixed(2)}}元/天
							</view>
						</view>
						<view class="price-wrapper" :class="{active: upgradeType==='2'}"
							v-if="item.monthPrice>0"
							@click="selectUpgradeType('2')">
							<view class="l1">
								1个月
							</view>
							<view class="l2">
								{{item.monthPrice}}
							</view>
							<view class="l3">
								低至{{(item.monthPrice/30).toFixed(2)}}元/天
							</view>
						</view>
						<view class="price-wrapper" :class="{active: upgradeType==='3'}"
							v-if="item.quarterPrice>0"
							@click="selectUpgradeType('3')">
							<view class="l1">
								3个月
							</view>
							<view class="l2">
								{{item.quarterPrice}}
							</view>
							<view class="l3">
								低至{{(item.quarterPrice/90).toFixed(2)}}元/天
							</view>
						</view>
						<view class="price-wrapper" :class="{active: upgradeType==='4'}"
							v-if="item.yearHalfPrice>0"
							@click="selectUpgradeType('4')">
							<view class="l1">
								6个月
							</view>
							<view class="l2">
								{{item.yearHalfPrice}}
							</view>
							<view class="l3">
								低至{{(item.yearHalfPrice/180).toFixed(2)}}元/天
							</view>
						</view>
						<view class="price-wrapper" :class="{active: upgradeType==='5'}"
							v-if="item.yearPrice>0"
							@click="selectUpgradeType('5')">
							<view class="l1">
								1年
							</view>
							<view class="l2">
								{{item.yearPrice}}
							</view>
							<view class="l3">
								低至{{(item.yearPrice/365).toFixed(2)}}元/天
							</view>
						</view>
						<view class="price-wrapper" :class="{active: upgradeType==='6'}"
							v-if="item.permanentPrice>0"
							@click="selectUpgradeType('6')">
							<view class="l1">
								永久
							</view>
							<view class="l2">
								{{item.permanentPrice}}
							</view>
						</view>
					</view>

				</scroll-view>
			</view>
			<view class="level-right" v-if="userLevelList.length>0">
				{{userLevelList[current].name}}享部分商品{{userLevelList[current].productDiscount}}折优惠
			</view>
			<view class="privacy" v-if="userLevelList.length>0">
				<checkbox-group @change="changeCheckbox">
					<label>
						<checkbox value="privacy" color="#26A69A"  activeBorderColor="#26A69A"/>
						<text>我已阅读并同意</text>						
						<text class="link" @click="navWebView(paymentAgreementUrl)"><<{{applicationConfig.applicationName}}支付协议>></text>
						<text>和</text>
						<text class="link" @click="navWebView(customerAgreementUrl)"><<{{applicationConfig.applicationName}}用户协议>></text>
					</label>
				</checkbox-group>
			</view>
			<view class="button-base" v-if="userLevelList.length>0" @click="pay">确认协议并立即支付</view>
			<view class="button-base button-base-disabled" v-else>暂无可购买会员等级</view>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				current: 0,
				userLevelList: [],
				upgradeType: '1',
				loadingType: ''
			}
		},
		onLoad(option) {
			this.inquiryCustomerAgreement();
			this.inquiryPaymentAgreement();
			this.inquiryUserLevel();
		},
		onShow() {
			if (this.hasLogin) {
				this.$api.request.userInfo({
					userUuid: this.userInfo.userUuid
				}, res => {
					if (res.body.status.statusCode === '0') {
						this.login(res.body.data);
					}
				});
			}
		},
		//下拉刷新
		onPullDownRefresh() {

		},
		computed: {
			...mapState(['applicationConfig', 'hasLogin', 'userInfo','uiConfig']),
			activeLayout: function() {
				return this.uiConfig.activeLayout;
			}
		},
		methods: {
			...mapMutations(['login']),
			inquiryCustomerAgreement() {
				this.$api.request.getParameter({
					name: 'CUSTOMER_AGREEMENT'
				}, res => {
					if (res.body.status.statusCode === '0') {
						if (res.body.data) {
							this.customerAgreementUrl = res.body.data.value;
						}
					} else {
						console.log(res.body.status.errorDesc);
					}
				});
			},
			inquiryPaymentAgreement() {
				this.$api.request.getParameter({
					name: 'PAYMENT_AGREEMENT'
				}, res => {
					if (res.body.status.statusCode === '0') {
						if (res.body.data) {
							this.paymentAgreementUrl = res.body.data.value;
						}
					} else {
						console.log(res.body.status.errorDesc);
					}
				});
			},
			changeCheckbox(e) {
				let array = e.detail.value;
				if (array.length > 0)
					this.privacyCheckboxChecked = true;
				else
					this.privacyCheckboxChecked = false;
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
								userLevelList.push(item);
							}
						});
						this.userLevelList = userLevelList;
					} else {
						console.log(res.body.status.errorDesc);
					}
				}, true);
			},
			changeTab(e) {
				this.current = e;
			},
			selectUpgradeType(upgradeType) {
				this.upgradeType = upgradeType;
			},
			checkPrivecy() {
				if (this.privacyCheckboxChecked)
					return true;
				else {
					uni.showToast({
						icon: 'none',
						title: '请先同意支付协议和用户协议'
					});
					return false;
				}
			},
			pay() {
				if (!this.checkPrivecy()) {
					return;
				}
				let postData = {
					userLevelDTO: {
						userLevelUuid: this.userLevelList[this.current].userLevelUuid
					},
					userDTO: {
						userUuid: this.userInfo.userUuid
					},
					upgradeType: this.upgradeType
				}
				this.$api.request.addUserUpgrade(postData, res => {
					if (res.body.status.statusCode === '0') {
						uni.redirectTo({
							url: '/pages/user/pay-upgrade?tranCode=' + res.body.data.transactionCode
						})
					} else {
						this.$api.msg(res.body.status.errorDesc);
					}
				});
			},
			navWebView(url){
				uni.navigateTo({
					url:'/pages/content/web-view?src='+encodeURIComponent(url)
				})
			}
		}
	}
</script>

<style lang='scss'>
	page {
		background: $page-color-light;
	}

	.container {
		margin: $page-row-spacing;
	}

	.user-info-box {
		height: 180upx;
		display: flex;
		align-items: center;
		position: relative;
		z-index: 1;
	
		.portrait-box {
			margin-right: 20upx;
		
			image {
				width: 120upx;
				height: 120upx;
				border-radius: 50%;
			}
		}
		.name {
			color: $font-color-dark;
			font-weight: bold;
			font-size: $font-lg;
			.level {
				color: $font-color-base;
				font-weight: normal;
				font-size: $font-sm;
				margin: 10upx 0;
			}
		}
		.level {
			margin-left: auto;
			color: $font-color-dark;
		}
	
		.username {
			font-size: $font-sm;
			color: $font-color-base;
			margin-left: 20upx;
		}
	}
	.level-section {

		.level-name {}

		.level-price {
			width: 100%;
			overflow: hidden;
			white-space: nowrap;

			.scroll-wrapper {
				.price-wrapper {
					display: inline-block;
					width: 200upx;
					height: 300upx;
					text-align: center;
					margin: 30upx;
					background: $light-color;
					padding: 0 20upx;
					border-radius: 10upx;;
					vertical-align:top;
					&.active {
						background: $dark-color;
						border: 1px solid $page-color-dark;
						color: #fff;
					}
					.l1{
						font-size: 30upx;
						height:140upx;
						line-height: 140upx;
					}
					.l2{
						font-size: 50upx;
						font-weight: bold;
						height:70upx;
						line-height: 70upx;
					}
					.l2::before{
						content: "￥";
						font-size: $font-sm;
					}
					.l3{
						font-size: $font-sm;
						background: $page-color-light;
						color: $font-color-primary;
						margin-top: 40upx;
						border-radius: 10px 0 10px 0;
					}
				}

			}
		}
		.level-right{
			background: $font-color-dark;
			color: #FFD700;
			padding: 20upx 24upx;
			border-radius: 16upx;
		}
	}

	.privacy {
		margin: 40upx;
		font-size: $font-base;
		line-height: 70upx;

		.link {
			color: $base-color;
			text-decoration: none;
		}
	}
	.button-base-disabled{
		background: $page-color-dark;
	}
</style>