<template>
	<view class="coupon-list-item">
		<view class="coupon-border">
		</view>
		<view class="coupon-left">
			<view class="name">
				<text>{{couponItem.couponDTO.name}}</text>
			</view>
		
			<view class="valid">有效期至{{couponItem.endDate}}</view>
			<view class="memo" @click="showMemo(couponItem.couponDTO.memo)">{{couponItem.couponDTO.memo}}</view>
		</view>
		<view class="coupon-right">
			<view v-if="couponItem.couponDTO.type=='DISCOUNT'" class="amount discount">{{couponItem.couponDTO.benefitDiscount}}</view>
			<view v-if="couponItem.couponDTO.type=='CASH'" class="amount cash">{{couponItem.couponDTO.benefitCash}}</view>
			<view v-if="couponItem.couponDTO.conditionAmount>0" class="condition">满{{couponItem.couponDTO.conditionAmount}}元可用</view>
			<view v-else class="condition">满0.01元可用</view>
			<image v-if="couponItem.used" src="/static/image/used.png" mode="aspectFill"></image>
			<image v-else-if="couponItem.expired" src="/static/image/expired.png" mode="aspectFill"></image>
			<span v-else class="recieve-button" @click="eventClick()">
				{{actionText}}
			</span>
		</view>
	</view>
</template>
 
<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	name: 'user-coupon-item'
	export default {
		components: {
			
		},
		data() {
			return {
				
			}
		},
		computed: {
			...mapState(['hasLogin', 'hasMerchant', 'userInfo', 'merchantInfo','cartInfo','footPrint', 'applicationConfig']),
			couponItem: function(){
				var coupon = this.coupon;
				if(Date.parse(coupon.endDate)<new Date()){
					this.$set(coupon,'expired',true);
				}else{
					this.$set(coupon,'expired',false);
				}
				return coupon;
			}
		},
		props: {
			coupon: {
				type: Object,
				default: function(){
					return {};
				}
			},
			actionText:{
				type: String,
				default: ''
			},
			actionType:{
				type: String,
				default: ''
			}
		},
		methods: {
			...mapMutations(['updateCartInfo']),
			eventClick(){
				this.$emit('eventClick');
			},
			showMemo(memo){
				uni.showModal({
					title:'使用规则',
					content: memo,
					confirmText:'关闭',
					confirmColor:'#606266',
					showCancel:false,
					success: (e) => {
						
					},
					fail: (e) => {
						
					}
				})
			}
			
		},
	}
</script>

<style lang='scss'>
	.coupon-list-item {
		display: flex;
		width: 100%;
		height: 240upx;
		margin: 10upx 0;
		border-radius: 5px;
		.coupon-border{
			width: 3%;
			background: #ff0000;
			border-radius: 10px 0 0 10px;
		}
		.coupon-left {
			width: 62%;
			padding: 20upx;
			background: #fff;
			border-width: 0 1px 0 0;
			border-style: dashed;
			border-color: #606266;
			border-radius: 0 10px 10px 0;
			.name{
				margin: 10upx 0;
				font-size: $font-lg;
				font-weight: bold;
				color: $font-color-dark;
			}
			.valid{
				color: $uni-color-primary;
				font-size: $font-base;
			}
			.memo{
				margin:20upx 0;
				color:$font-color-light;
				font-size: $font-base;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
			}
		}

		.coupon-right {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 20upx;
			width: 35%;
			border-radius: 10px 0 0 10px;
			background: #fff;
			border-width: 0 0 0 1px;
			border-style: dashed;
			border-color: #606266;
			text-align: center;
			image{
				width: 40px;
				height: 40px;
			}
			.amount{
				margin: 10upx;
				color: $base-color;
				font-size: $font-lg+8upx;
				font-weight: bold;
			}
			.cash {
				&::after{
					content:'元';
					font-size:$font-sm;
				}
			}
			.discount {
				&::after{
					content:'折';
					font-size:$font-sm;
				}
			}
			.condition{
				color: $font-color-light;
				font-size: $font-base;
			}
			.recieve-button{
				border-radius: 100upx;
				padding: 10upx 14upx;
				color: $base-color;
				border: 1px solid $base-color;
				margin: 20upx;
				text-align: center;
				&.disabled{
					background: $uni-color-primary;
					opacity: 0.5;
					color: #fff;
					border:none;
				}
			}
		}
	}
</style>
