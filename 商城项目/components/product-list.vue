<template>
	<view>
		<view class="goods-list">
			<view v-for="(item, index) in goodsList" :key="index" class="goods-item" :class="columnClass">
				<view class="product-image-wrapper" @click="navToDetailPage(item)">
					<image class="product-image" v-if="item.productMainImage" :src="item.productMainImage.url"
						mode="aspectFill"></image>
					<image v-if="item.new" class="image-tag" src="/static/image/new-product.png" mode="aspectFit">
					</image>
					<image v-else-if="item.hot" class="image-tag" src="/static/image/hot.png" mode="aspectFit"></image>
					<image v-else-if="item.recommend" class="image-tag" src="/static/image/recommend.png"
						mode="aspectFit"></image>
				</view>
				<text class="title">{{item.productName}}</text>
				<view class="price-box">
					<text class="price">{{item.unitPrice}}</text>
					<text class="list-price">{{item.unitPriceStandard}}</text>
					<view v-if="uiConfig.activeLayout.productFastBuy">
						<uni-icons type="cart-filled" size="30" :color="uiConfig.baseColor" @click="clickAddToCart(item)"
							v-if="item.cartNum===0 && !item.skuEnabled"></uni-icons>
						<button class="button-base" v-if="item.cartNum===0 && item.skuEnabled"
							@click="navToDetailPage(item,1)">选规格</button>
						<uni-number-box class="step" v-if="item.cartNum>0" :min="0" :max="item.totalUnit"
							v-model="item.cartNum" :isMax="item.cartNum>=item.totalUnit?true:false"
							:isMin="item.cartNum===0" :index="index" :autoRefresh="!item.skuEnabled" @eventAdd="numberAdd"
							@eventMinus="numberMinus"></uni-number-box>
					</view>
					<view v-else>
						<text>已售 {{item.soldUnit}}</text>
					</view>
				</view>
			</view>
		</view>
		<popup-product-sku v-if="skuShowClass=='show'" :showClass="skuShowClass" :product="product"
			:productSku="productSku" @eventSelect="skuSelected" @eventCancel="skuCancelled"></popup-product-sku>
	</view>
</template>

<script>
	import uniNumberBox from '@/components/uni-number-box.vue'
	import popupProductSku from '@/components/popup-product-sku.vue'
	import {
		mapState,
		mapMutations
	} from 'vuex';
	name: 'product-list'
	export default {
		components: {
			uniNumberBox,
			popupProductSku
		},
		data() {
			return {
				product: {},
				productSku: {},
				skuShowClass: 'none',
				columnClass: 'goods-item-col-' + this.cols
			}
		},
		computed: {
			...mapState(['hasLogin', 'userInfo', 'cartInfo', 'footPrint', 'applicationConfig', 'uiConfig']),
			goodsList: function() {
				let tList = this.$api.util.prodCartNum(this.productList, this.cartInfo);
				return tList;
			}
		},
		props: {
			productList: {
				type: Array,
				default: function() {
					return [];
				}
			},
			cols: {
				type: Number,
				default: 2
			}
		},
		methods: {
			...mapMutations(['updateCartInfo']),
			//弹出规格选择框
			popupProductSku(id) {
				/* 先查询商品详情数据 */
				let postData = {
					productUuid: id
				}
				this.$api.request.goodsDetail(postData, res => {
					if (res.body.status.statusCode === '0') {
						this.product = res.body.data;
						this.productSku = this.product.skuList[0];
						this.skuShowClass = 'show';
						uni.hideTabBar();
					} else {
						console.log(res.body.status.errorDesc);
					}
				}, false);
			},
			//增加购买商品数量
			numberAdd(e) {
				this.goodsList[e.index].cartNum = e.number;
				if (this.goodsList[e.index].skuEnabled) {
					//转到商品详情页选择规格
					this.navToDetailPage(this.goodsList[e.index], 1);
				} else
					//单规格直接添加到购物车
					this.addProductToCart(this.goodsList[e.index]);
			},
			//减少购买商品数量
			numberMinus(e) {
				this.goodsList[e.index].cartNum = e.number;
				if (this.goodsList[e.index].skuEnabled) {
					if (e.number == 1) {
						//如果数量为1，直接移除
						this.removeProductFromCart(this.goodsList[e.index]);
					} else {
						//如果数量大于1，转到购物车移除,
						uni.switchTab({
							url: '/pages/cart/cart'
						})
					}
				} else
					//单规格直接添加到购物车或者从购物车移除
					if (e.number == 0)
						this.removeProductFromCart(this.goodsList[e.index]);
					else
						this.addProductToCart(this.goodsList[e.index]);
			},
			skuSelected(data) {
				this.productSku = data.sku;
				this.skuShowClass = data.skuShow;
			},
			skuCancelled(data) {
				this.skuShowClass = data.skuShow;
			},
			clickAddToCart(item) {
				if (item.skuEnabled) {
					//多规格商品需要先选择商品规格
					this.popupProductSku(item.productUuid);
				} else {
					item.cartNum = 1;
					this.addProductToCart(item);
				}
			},
			//添加单规格商品到购物车
			addProductToCart(item) {
				let that = this;
				let postData = {
					unit: item.cartNum,
					userDTO: {
						userUuid: this.userInfo.userUuid
					}
				}
				postData.productDTO = {
					productUuid: item.productUuid
				}
				this.$api.request.addCart(postData, res => {
					if (res.body.status.statusCode === '0') {
						this.syncUserCart(function() {
							console.log('Sync user shopping cart completed');
						});
					} else {
						this.$api.msg(res.body.status.errorDesc);
					}
				}, false);
			},
			//将单规格商品从购物车移除
			removeProductFromCart(item) {
				/* 先找到对应的购物车Item Id */
				let shoppingCartUuid = null;
				this.cartInfo.forEach(function(cart, index) {
					if (item.productUuid = cart.productDTO.productUuid) {
						shoppingCartUuid = cart.shoppingCartUuid;
					}
				})
				//调用后台移除
				if (shoppingCartUuid) {
					let postData = {
						shoppingCartUuid: shoppingCartUuid
					}
					this.$api.request.removeCart(postData, res => {
						if (res.body.status.statusCode === '0') {
							this.syncUserCart(function() {

							});
						} else {
							console.log(res.body.status.errorDesc);
						}
					}, true);
				}
			},
			//同步购物车数据到本地
			syncUserCart(callback) {
				if (this.hasLogin) {
					let postData = {
						userUuid: this.userInfo.userUuid
					}
					this.$api.request.cartList(postData, res => {
						if (res.body.status.statusCode === '0') {
							let cartList = res.body.data.carts;
							this.updateCartInfo(cartList);
							if (callback) callback();
						} else {
							console.log(res.body.status.errorDesc);
						}
					}, false);
				}
			},
			//详情页
			navToDetailPage(item, popupSku) {
				let id = item.productUuid;
				if (popupSku) {
					uni.navigateTo({
						url: '/pages/product/product?id=' + id + '&popupSku=1'
					})
				} else {
					uni.navigateTo({
						url: '/pages/product/product?id=' + id
					})
				}

			},
			stopPrevent() {}
		},
	}
</script>

<style lang='scss'>
	.goods-list {
		overflow-y: scroll;
		display: flex;
		flex-wrap: wrap;
		padding: 10upx;
		border-radius: 20upx;

		.header {
			width: 100%;
			text-align: center;
			padding: 20upx 0;
			font-size: $font-lg;
			font-color: $font-color-dark;

			image {
				vertical-align: middle;
				height: 60upx;
				width: 60upx;
			}

			text {
				padding-left: 10upx
			}
		}

		.goods-item {
			display: flex;
			flex-direction: column;
			background-color: #fff;
			margin: 2% 1%;
			border-radius: 20upx;

			&-col-1 {
				width: 98%;
			}

			&-col-2 {
				width: 48%;
			}
		}

		.product-image-wrapper {
			border-radius: 30upx;
			overflow: hidden;
			position: relative;

			.product-image {
				width: 100%;
				height: 330upx;
				opacity: 1;
			}

			.image-tag {
				position: absolute;
				top: 0;
				left: 0;
				width: 60upx;
				height: 60upx;
			}
		}

		.title {
			font-size: $font-lg;
			color: $font-color-dark;
			line-height: 80upx;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		.l2 {
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;
			letter-spacing: 2upx;
			height: 60upx;

			.desc {
				font-size: $font-sm;
				color: $font-color-light;
			}

			.desc-outline {
				border: 1px solid $font-color-light;
				padding: 5upx;
				margin-right: 6upx;
				border-radius: 5px;
			}

			.unit {
				font-size: $font-sm;
				color: $font-color-light;
			}
		}

		.price-box {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 10upx 10upx 10upx 0;
			font-size: 24upx;
			color: $font-color-light;
			overflow: hidden;

			.action {
				background-color: $base-color;
				border-radius: 10upx;
				color: #fff;
				padding: 10upx;
				font-size: $font-base;
			}
		}

		.price {
			font-size: $font-lg;
			color: $price-color;
			line-height: 1;
			font-weight: bold;

			&:before {
				content: '￥';
				font-size: 26upx;
			}
		}

		.list-price {
			margin-right: auto;
			text-decoration-line: line-through;

			&:before {
				content: '￥';
			}
		}

		.button-base {
			height: 50upx;
			line-height: 50upx;
			width: 135upx;
			margin: 15upx 0;
			font-size: $font-sm;
		}
	}
</style>