<template>
	<view class="content">
		<view class="group">
			<image src="https://ccmao-esn.oss-cn-shenzhen.aliyuncs.com/newCustomer.jpeg" mode="aspectFill"></image>
		</view>
		<view class="goods-list">
			<!-- 暂不支持多规格商品 -->
			<view v-if="!item.productDTO.skuEnabled" v-for="(item, index) in giftProductList" :key="index" class="goods-item">
				<view class="product-image-wrapper" @click="navToDetailPage(item)">
					<image class="product-image" v-if="item.productDTO.productMainImage" :src="item.productDTO.productMainImage.url" mode="aspectFill"></image>
					<image class="image-tag" src="/static/image/new-customer-price.png" mode="aspectFit"></image>
				</view>
				<view class="title">
					<span class="clamp">{{item.productDTO.productName}}</span>
				</view>
				<view class="desc">
					<span class="left">限购{{item.productLimitedUnit}}份</span>
					<span class="middle">{{item.productDTO.totalUnit}}份可售</span>
					<span class="right">{{item.productDTO.soldUnit}}人已购</span>
				</view>
				<view class="price-box">
					<text class="price">{{item.productUnitPrice}}</text>
					<text class="list-price">{{item.productDTO.unitPriceStandard}}</text>
					<uni-icons type="cart-filled" size="30" :color="uiConfig.baseColor" @click="clickAddToCart(item)"
						v-if="item.cartNum===0"></uni-icons>
					<uni-number-box class="step" v-if="item.cartNum>0" :min="0" :max="item.productLimitedUnit" v-model="item.cartNum"
					 :isMax="item.cartNum>=item.productLimitedUnit?true:false" :isMin="item.cartNum===0" :index="index" :autoRefresh="!item.productDTO.skuEnabled" @eventAdd="numberChange" @eventMinus="numberChange"></uni-number-box>
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
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	import uniCountdown from "@/components/uni-countdown/uni-countdown.vue"
	import uniNumberBox from '@/components/uni-number-box.vue'
	export default {
		components: {
			uniNumberBox,
			uniLoadMore,
			uniCountdown
		},
		data() {
			return {
				giftProductList:[]
			};
		},
		computed:{
			...mapState(['hasLogin', 'hasMerchant', 'userInfo', 'merchantInfo','cartInfo','footPrint', 'applicationConfig', 'uiConfig']),
		},
		onLoad(options){
			this.inquiryProfitWelfare();
		},
		methods: {
			...mapMutations(['updateCartInfo']),
			clickAddToCart(item){
				item.cartNum = 1;
				this.addProductToCart(item);
			},
			addProductToCart(item) {
				let that = this;
				let postData = {
					unit: item.cartNum,
					unitPrice: item.productUnitPrice,
					priceTag: '新人价',
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
							console.log('Sync user shopping cart completed');
						});
					} else {
						this.$api.msg(res.body.status.errorDesc);
					}
				},false);
			},
			//修改购买商品数量
			numberChange(e) {
				this.giftProductList[e.index].cartNum = e.number;
				//单规格直接添加到购物车或者从购物车移除
				if(e.number==0)
					this.removeProductFromCart(this.giftProductList[e.index]);
				else
					this.addProductToCart(this.giftProductList[e.index]);
			},
			//将单规格商品从购物车移除
			removeProductFromCart(item) {
				/* 先找到对应的购物车Item Id */
				let shoppingCartUuid = null;
				this.cartInfo.forEach(function(cart, index){
					if(item.productUuid = cart.productDTO.productUuid){
						shoppingCartUuid = cart.shoppingCartUuid;
					}
				})
				//调用后台移除
				if(shoppingCartUuid){
					let postData = {
						shoppingCartUuid: shoppingCartUuid
					}
					this.$api.request.removeCart(postData, res => {
						if (res.body.status.statusCode === '0') {
							this.syncUserCart(function(){
								
							});
						} else {
							console.log(res.body.status.errorDesc);
						}
					},true);
				}
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
			},
			//详情页
			navToDetailPage(item) {
				let id = item.productDTO.productUuid;
				uni.navigateTo({
					url: '/pages/product/product?id=' + id
				})
			},
			//查询新人福利
			inquiryProfitWelfare() {
				let that = this;
				this.$api.request.inquiryProfitWelfare({}, res => {
					if (res.body.status.statusCode === '0') {
						var giftList = res.body.data.welfares;
						var giftProductList = [];
						giftList.forEach(function(gift,index){
							if(gift.welfareType == 'PRODUCT'){
								var cartNum = that.$api.util.singleProdCartNum(gift.productDTO,that.cartInfo);
								that.$set(gift,'cartNum',cartNum);
								giftProductList.push(gift);
							}
						})
						this.giftProductList = giftProductList;
					} else {
						console.log(res.body.status.errorDesc);
					}
				});
			},
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
				border-left: 1px solid #ddd;
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
		padding: 0 30upx 140upx 0;
		background: linear-gradient(to bottom, #ffffff 0%,#f8f8f8 100%);
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
			.title{
				font-size: $font-base;
				color: $font-color-dark;
				line-height: 80upx;
				display: flex;
				align-items: flex-end;
				.clamp{
					    margin-right: auto;
				}
			}
			.desc{
				color: $font-color-light;
				font-size: $font-base;
				display:flex;
				padding: 10upx;
				.left{
					
				}
				.middle{
					background: $uni-color-success;
					border-radius: 20px;
					width: 400upx;
					text-align: center;
					color: #fff;
					padding: 4upx 0;
					opacity: 0.5;
					margin-left: auto;
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
				
				.end{
					background-color: #D6D6D6;
					border-radius: 10upx;
					color: #fff;
					padding: 10upx;
					font-size: $font-base;
				}
			}
			.price{
				font-size: $font-lg;
				color: $uni-color-primary;
				line-height: 1;
				&:before{
					content: '￥';
					font-size: 26upx;
				}
			}
			.list-price{
				margin-right:auto;
				&:before {
					content: '￥';
				}
			}
		}
		.product-image-wrapper{
			position:relative;
			border-radius: 3px;
			overflow: hidden;
			.product-image{
				width: 100%;
				height: 330upx;
				opacity: 1;
			}
			.image-tag{
				width:80upx;
				height:80upx;
			}
		}
		
	}
	.button-base{
		height: 50upx;
		line-height: 50upx;
		width: 135upx;
		margin: 15upx 0;
		font-size: $font-sm;
	}
	

</style>
