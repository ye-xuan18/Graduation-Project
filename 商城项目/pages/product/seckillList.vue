<template>
	<view class="content">
		<view class="group">
			<image src="https://ccmao-b2c.oss-cn-shenzhen.aliyuncs.com/seckill.jpg" mode="scaleToFill"></image>
		</view>
		
		<view class="goods-list">
			<view class="header">
				<image src="../../static/image/seckill_icon.png" mode="aspectFill"></image><text>限时秒杀</text>
			</view>
			<empty v-if="secKills.length === 0"></empty>
			<!-- 多规格商品暂不参与秒杀 -->
			<view 
				v-for="(item, index) in secKills" :key="index"
				v-if="!item.productDTO.skuEnabled"
				class="goods-item"
			>
				<view class="image-wrapper"  @click="navToDetailPage(item)">
					<image v-if="item.productDTO.productMainImage" :src="item.productDTO.productMainImage.url" mode="aspectFill"></image>
				</view>
				<text class="title clamp">{{item.productDTO.productName}}</text>
				<view class="desc">
					<!-- <span class="left">限购{{item.limitedUnit}}份</span> -->
					<span class="middle" v-if="item.productDTO.soldUnit  > item.productDTO.totalUnit">即将抢光(仅剩{{item.productDTO.totalUnit}}份)</span>
					<span class="middle" v-else>{{item.productDTO.totalUnit}}份可售</span>
					<span class="right">{{item.productDTO.soldUnit}}人已购</span>
				</view>
				<view class="price-box">
					<text class="price">{{item.unitPrice.toFixed(2)}}</text>
					<text v-if="item.startFlag&&!item.endFlag">距结束</text>
					<uni-countdown class="countdown" :day="item.secKillCountDown.days" :hour="item.secKillCountDown.hours" :minute="item.secKillCountDown.minutes"
					 :second="item.secKillCountDown.seconds" color="#FFFFFF" background-color="#333333" v-if="!item.startFlag||!item.endFlag"/>
					<text v-if="!item.startFlag" class="start">即将开始</text>
					<text v-if="item.startFlag&&!item.endFlag" class="action" @click="clickAddToCart(item)">立即秒杀</text>
					<text v-if="item.startFlag&&item.endFlag" class="end">已结束</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import uniCountdown from "@/components/uni-countdown/uni-countdown.vue";
	import empty from "@/components/empty";
	export default {
		components: {
			uniLoadMore,
			uniCountdown,
			empty
		},
		data() {
			return {
				secKills:[]
			};
		},
		computed:{
			...mapState(['hasLogin', 'hasMerchant', 'userInfo', 'merchantInfo','cartInfo','footPrint', 'applicationConfig']),
		},
		onLoad(options){
			this.inquirySecKill();
		},
		methods: {
			...mapMutations(['updateCartInfo']),
			//秒杀商品
			inquirySecKill() {
				let that = this;
				this.$api.request.secKill({
			
				}, res => {
					if (res.body.status.statusCode === '0') {
						var secKills = [];
						res.body.data.secKills.forEach(function(val,index){
							var endTimeStr = val.endTime;
							var endTime = new Date(Date.parse(endTimeStr.replace(/-/g, "/")));
							var startTimeStr = val.startTime;
							var startTime = new Date(Date.parse(startTimeStr.replace(/-/g, "/")));
							var diff = [];
							//秒杀中, 显示距结束时间
							if(startTime<new Date()&&endTime>new Date())
								diff = that.$api.util.getCountDownTimes(val.endTime);
							else
								diff = that.$api.util.getCountDownTimes(val.startTime);
							var secKillCountDown = {
								days: diff[0],
								hours: diff[1],
								minutes: diff[2],
								seconds: diff[3]
							}
							val.secKillCountDown = secKillCountDown;
							val.startFlag=(startTime<new Date());
							val.endFlag=(endTime<new Date());
							secKills.push(val);
						})
						this.secKills = secKills;
					} else {
						console.log(res.body.status.errorDesc);
					}
				});
			},
			//详情页
			navToDetailPage(item) {
				let id = item.productDTO.productUuid;
				uni.navigateTo({
					url: '/pages/product/product?id=' + id
				})
			},
			clickAddToCart(item){
				item.cartNum = 1;
				this.addProductToCart(item);
			},
			addProductToCart(item) {
				let that = this;
				let postData = {
					unit: item.cartNum,
					unitPrice: item.unitPrice,
					priceTag: '秒杀价',
					userDTO: {
						userUuid: this.userInfo.userUuid
					}
				}
				postData.productDTO = {
					productUuid: item.productDTO.productUuid
				}
				this.$api.request.addCart(postData, res => {
					if (res.body.status.statusCode === '0') {
						this.syncUserCart(function(){
							uni.switchTab({
								url:'/pages/cart/cart'
							})
						});
					} else {
						this.$api.msg(res.body.status.errorDesc);
					}
				},false);
			},
			//同步购物车数据到本地
			syncUserCart(callback) {
				if(this.hasLogin){
					let postData = {
						userUuid: this.userInfo.userUuid
					}
					this.$api.request.cartList(postData, res => {
						if (res.body.status.statusCode === '0') {
							let cartList = res.body.data.carts;
							this.updateCartInfo(cartList);
							if(callback) callback();
						} else {
							console.log(res.body.status.errorDesc);
						}
					},false);
				}
			}
		},
	}
</script>

<style lang="scss">
	page, .content{
		background: $page-color-base;
	}

	.group{
		height: 240px;
		image{
			width: 100%;
		}
		.p-box{
			display: flex;
			flex-direction: column;
		}
		.cate-item{
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			width: 80upx;
			position: relative;
			font-size: 44upx;
			&:after{
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				border-left: 1px solid $border-color-dark;
				width: 0;
				height: 36upx;
			}
		}
	}

	/* 商品列表 */
	.goods-list{
		position: absolute;
		top:200px;
		left:0;
		right:0;
		display:flex;
		flex-wrap:wrap;
		padding: 0 30upx;
		background: linear-gradient(to bottom, #ffffff 0%,$page-color-base 100%);
		border-radius: 20upx;
		.header{
			width: 100%;
			text-align: center;
			padding: 20upx 0;
			font-size: $font-lg;
			font-color: $font-color-dark;
			image{
				vertical-align: middle;
				height: 60upx;
				width:60upx;
			}
			text{
				padding-left:10upx
			}
		}
		.goods-item{
			display:flex;
			flex-direction: column;
			width: 100%;
			padding: 20upx;
			background-color: #fff;
			margin: 10upx 0;
			border-radius: 20upx;
		}
		.image-wrapper{
			width: 100%;
			height: 330upx;
			border-radius: 3px;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
				opacity: 1;
			}
		}
		.title{
			font-size: $font-base;
			color: $font-color-dark;
			line-height: 80upx;
		}
		.desc{
			color: $font-color-light;
			font-size: $font-base;
			display:flex;
			padding: 10upx;
			.left{
				
			}
			.middle{
				background: $base-color;
				border-radius: 20px;
				width: 400upx;
				text-align: center;
				color: #fff;
				padding: 4upx 0;
				opacity: 0.5;
				// margin-left: auto;
				margin-right: auto;
			}
			.right{
				
			}
		}
		.price-box{
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 10upx 10upx 10upx 0;
			font-size: 24upx;
			color: $font-color-light;
			.action{
				background-color: $base-color;
				border-radius: 10upx;
				color: #fff;
				padding: 10upx;
				font-size: $font-base;
			}
			.start{
				background-color: $font-color-dark;
				border-radius: 10upx;
				color: #fff;
				padding: 10upx;
				font-size: $font-base;
			}
			.end{
				background-color: $font-color-disabled;
				border-radius: 10upx;
				color: #fff;
				padding: 10upx;
				font-size: $font-base;
			}
		}
		.price{
			font-size: $font-lg;
			color: $price-color;
			line-height: 1;
			font-weight:bold;
			&:before{
				content: '￥';
				font-size: 26upx;
			}
		}
	}
	

</style>
