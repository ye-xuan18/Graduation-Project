<template>
	<view class="container">
		<view class="price-box">
			<text>余额</text>
			<text class="price">{{userInfo.availableBalance||0}}</text>
		</view>
		<view class="charge-section">
			<view class="charge-price">
				<view class="price-wrapper" :class="{active: chargeSetting.chargeSettingUuid==setting.chargeSettingUuid}" @click="selectChargeAmount(setting)" v-for="setting in chargeSettings">
					<view class="l1">
						{{setting.chargeAmount}}元
					</view>
					<view class="l2" :class="{active: chargeSetting.chargeSettingUuid==setting.chargeSettingUuid}">
						<text v-if="setting.giveAmount>0">赠{{setting.giveAmount}}元</text>
						<text v-else>不赠送</text>
					</view>
				</view>

			</view>
			<view class="privacy">
				<text>会员充值后立即到账, 会员余额中将增加充值的金额；充值后不会过期, 但无法转赠他人。如充值遇到问题，请先阅读</text>
				<text class="link" @click="navHelp">帮助中心</text>
			</view>
			<view class="button-base" @click="pay">确认充值</view>
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
				chargeSettings:[],
				chargeSetting:{},
				loadingType: ''
			}
		},
		onLoad(option) {
			this.inquiryChargeSetting();
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
			...mapState(['applicationConfig', 'hasLogin', 'userInfo'])
		},
		methods: {
			...mapMutations(['login']),
			navHelp() {
				uni.navigateTo({
					url:'/pages/help/help'
				})
			},
			changeTab(e) {
				this.current = e;
			},
			selectChargeAmount(chargeSetting) {
				this.chargeSetting= chargeSetting;
			},
			pay() {
				if(!this.chargeSetting.chargeSettingUuid) {
					this.$api.msg('请选择充值金额');
					return;
				}
				let postData = {
					userDTO: {
						userUuid: this.userInfo.userUuid
					},
					chargeAmount: this.chargeSetting.chargeAmount,
					giveAmount: this.chargeSetting.giveAmount
				}
				this.$api.request.applyCharge(postData, res => {
					if (res.body.status.statusCode === '0') {
						uni.redirectTo({
							url: '/pages/charge/pay-charge?chargeNo=' + res.body.data.chargeNo
						})
					} else {
						this.$api.msg(res.body.status.errorDesc);
					}
				});
			},
			inquiryChargeSetting() {
				this.$api.request.chargeSetting({}, res => {
					if (res.body.status.statusCode === '0') {
						this.chargeSettings = res.body.data.settings;
					} else {
						console.log(res.body.status.errorDesc);
					}
				},true);
			},
			navWebView(url) {
				uni.navigateTo({
					url: '/pages/content/web-view?src=' + encodeURIComponent(url)
				})
			}
		}
	}
</script>

<style lang='scss'>
	page {
		background: $page-color-base;
	}

	.container {
		margin: $page-row-spacing;
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

	.charge-section {

		.charge-price {
			width: 100%;
			.price-wrapper {
				display: inline-block;
				width:48%;
				text-align: center;
				margin: 1%;
				background: #fff;
				padding: 0 20upx;

				&.active {
					background: $base-color;
					border: 1px solid $base-color;
					color: #fff;
				}

				.l1 {
					font-size: 50upx;
					height: 140upx;
					line-height: 140upx;
				}

				.l2 {
					font-size: $font-sm;
					color: $font-color-primary;
					height: 50upx;
					line-height: 50upx;
					&.active {
						color: #fff;
					}
				}
			}

		}
	}

	.privacy {
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