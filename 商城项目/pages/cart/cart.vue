<template>
	<view class="container">
		<!-- 空白页 -->
		<view v-if="!hasLogin || empty===true" class="empty">
			<image src="/static/emptyCart.png" mode="aspectFit"></image>
			<view v-if="hasLogin" class="empty-tips">
				<text>空空如也</text>
				<view style="margin-top:10px">
					<u-button :ripple="true" type="warning" size="mini" @click="navToIndex">去逛逛</u-button>
				</view>
				<!-- <navigator class="navi	gator" v-if="hasLogin" url="../index/index" open-type="switchTab">随便逛逛></navigator> -->
			</view>
			<view v-else class="empty-tips">
				<text>空空如也</text>
				<view style="margin-top:10px">
					<u-button :ripple="true" type="warning" size="mini" @click="navToLogin">去登录</u-button>
				</view>
				<!-- <view class="navigator" @click="navToLogin">去登录></view> -->
			</view>
		</view>
		<view v-else>
			<!-- 列表 -->
			<view class="cart-list">
				<block v-for="(item, index) in cartList" :key="item.shoppingCartUuid">
					<view class="cart-item" :class="{'b-b': index!==cartList.length-1}">
						<view class="image-wrapper">
							<image  :src="item.productDTO.productMainImage.url" class="loaded" mode="aspectFill" lazy-load @load="onImageLoad('cartList', index)"
							 @error="onImageError('cartList', index)"></image>
							<uni-icons type="checkbox-filled" :color="uiConfig.baseColor" size="30" class="checkbox" v-if="item.checked" @click="check('item', index)"></uni-icons>
							<uni-icons type="checkbox-filled" color="#C5C9D0" size="30" class="checkbox" v-else @click="check('item', index)"></uni-icons>
						</view>
						<view class="item-right">
							<text class="clamp title" @click="navToDetailPage(item)">{{item.productDTO.productName}}</text>
							<text v-if="item.productDTO.skuEnabled"><text class="attr" v-for="sku in item.productSkuDTO.skuAttrValueList">{{sku.skuAttrValue}}</text></text>
							<view style="display:flex">
								<text class="price">¥{{item.unitPrice}}</text><text class="price-tag" v-if="item.priceTag">{{item.priceTag}}</text>
							</view>
							
							<text class="list-price" v-if="item.productDTO.skuEnabled">¥{{item.productSkuDTO.skuUnitPriceStandard}}</text>
							<text class="list-price" v-else>¥{{item.productDTO.unitPriceStandard}}</text>
							
							<view class="unit">
								<uni-number-box :disabled="item.priceTag?true:false" v-if="!item.productDTO.skuEnabled" class="step" :min="1" :max="item.productDTO.totalUnit" :value="item.unit>item.productDTO.totalUnit?item.productDTO.totalUnit:item.unit"
								 :isMax="item.unit>=item.productDTO.totalUnit?true:false" :isMin="item.unit===1" :index="index" @eventAdd="numberChange" @eventMinus="numberChange"></uni-number-box>
								<uni-number-box :disabled="item.priceTag?true:false" v-if="item.productDTO.skuEnabled" class="step" :min="1" :max="item.productSkuDTO.skuTotalUnit"
								 :value="item.unit>item.productSkuDTO.skuTotalUnit?item.productSkuDTO.skuTotalUnit:item.unit" :isMax="item.unit>=item.productSkuDTO.skuTotalUnit?true:false"
								 :isMin="item.unit===1" :index="index" @eventAdd="numberChange" @eventMinus="numberChange"></uni-number-box>
								 <text class="warn" v-if="item.priceTag">限购商品不允许在购物车修改数量</text>
							</view>
						</view>
						<uni-icons type="closeempty" size="20" @click="deleteCartItem(index)"></uni-icons>
					</view>
				</block>
			</view>
			<!-- 底部菜单栏 -->
			<view class="action-section">
				<view class="checkbox">
					<image :src="allChecked?'/static/selected.png':'/static/select.png'" mode="aspectFit" @click="check('all')"></image>
					<view class="clear-btn" :class="{show: allChecked}" @click="clearCart">
						清空
					</view>
				</view>
				<view class="total-box">
					<text class="price">¥{{total}}</text>
					<text class="coupon">
						已优惠
						<text>0.00</text>
						元
					</text>
				</view>
				<button type="primary" :disabled="selectedCartIds===''" :class="{'disabled':!selectedCartIds}" class="no-border confirm-btn" @click="createOrder">去结算</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import uniNumberBox from '@/components/uni-number-box.vue'
	export default {
		components: {
			uniNumberBox
		},
		data() {
			return {
				total: 0.00, //总价格
				allChecked: false, //全选状态  true|false
				empty: false, //空白页现实  true|false
				cartList: [],
				selectedCartIds: ''
			};
		},
		onShow() {
			if (this.hasLogin) {
				this.cartList = [];
				this.inquiryCart();
			}
		},
		watch: {
			//显示空白页
			cartList(e) {
				let empty = e.length === 0 ? true : false;
				if (this.empty !== empty) {
					this.empty = empty;
				}
			}
		},
		computed: {
			...mapState(['hasLogin', 'userInfo','applicationConfig','uiConfig'])
		},
		methods: {
			...mapMutations(['updateCartInfo']),
			//查询购物车商品
			inquiryCart() {
				let postData = {
					userUuid: this.userInfo.userUuid
				}
				this.$api.request.cartList(postData, res => {
					if (res.body.status.statusCode === '0') {
						this.cartList = res.body.data.carts;
						//缓存购物车数据
						this.updateCartInfo(this.cartList);
						this.check('all'); //默认全部选中
					} else {
						console.log(res.body.status.errorDesc);
					}
				});
			},
			//监听image加载完成
			onImageLoad(key, index) {
				this.$set(this[key][index], 'loaded', 'loaded');
			},
			//监听image加载失败
			onImageError(key, index) {
				this[key][index].image = '/static/errorImage.jpg';
			},
			navToLogin() {
				uni.navigateTo({
					url: '/pages/public/login'
				})
			},
			navToIndex() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			//选中状态处理
			check(type, index) {
				if (type === 'item') {
					this.cartList[index].checked = !this.cartList[index].checked;
				} else {
					const checked = !this.allChecked
					const list = this.cartList;
					list.forEach(item => {
						item.checked = checked;
					})
					this.allChecked = checked;
				}
				this.calcTotal(type);
			},
			//修改购物车商品数量
			numberChange(data) {
				this.cartList[data.index].unit = data.number;
				this.calcTotal();
				//调用后台修改数量
				let postData = {
					shoppingCartUuid: this.cartList[data.index].shoppingCartUuid,
					unit: data.number
				}
				this.$api.request.setCartNum(postData, res => {
					if (res.body.status.statusCode === '0') {
						this.syncUserCart(function(){
							console.log('Sync user shopping cart completed');
						});
					} else {
						console.log(res.body.status.errorDesc);
					}
				},true);
			},
			//删除
			deleteCartItem(index) {
				let list = this.cartList;
				let row = list[index];
				let id = row.shoppingCartUuid;
				this.cartList.splice(index, 1);
				this.calcTotal();
				//调用后台移除
				let postData = {
					shoppingCartUuid: id
				}
				this.$api.request.removeCart(postData, res => {
					if (res.body.status.statusCode === '0') {
						this.syncUserCart(function(){
							console.log('Sync user shopping cart completed');
						});
					} else {
						console.log(res.body.status.errorDesc);
					}
				},true);
			},
			//清空
			clearCart() {
				uni.showModal({
					content: '清空购物车？',
					success: (e) => {
						if (e.confirm) {
							this.cartList = [];
							this.$api.request.clearCart({
								userUuid: this.userInfo.userUuid
							}, res => {
								if (res.body.status.statusCode === '0') {
									this.syncUserCart(function(){
										console.log('Sync user shopping cart completed');
									});
									console.log('购物车商品已清除');
								} else {
									console.log(res.body.status.errorDesc);
								}
							},false);
						}
					}
				})
			},
			//计算总价
			calcTotal() {
				let list = this.cartList;
				if (list.length === 0) {
					this.empty = true;
					return;
				}
				let total = 0;
				let checked = true;
				let selectedCartIds = ''; 
				list.forEach(item => {
					if (item.checked === true) {
						total += item.unitPrice * item.unit;
						selectedCartIds = selectedCartIds + "," + item.shoppingCartUuid;
					} else if (checked === true) {
						checked = false;
					}
				})
				this.allChecked = checked;
				//商品总额
				this.total = total.toFixed(2); 
				//购物车中选择的商品
				if (selectedCartIds.substr(0, 1) == ',') {
					selectedCartIds = selectedCartIds.substr(1);
				}
				this.selectedCartIds = selectedCartIds;
			},
			//创建订单
			createOrder() {
				uni.navigateTo({
					url: '/pages/order/createOrder?data=' + JSON.stringify(this.selectedCartIds)
				})
			},
			//详情
			navToDetailPage(item){
				let id = item.productDTO.productUuid;
				uni.navigateTo({
					url: '/pages/product/product?id='+id
				})
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
		}
	}
</script>

<style lang='scss'>
	.container {
		padding-bottom: 134upx;

		/* 空白页 */
		.empty {
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			height: 100vh;
			padding-bottom: 100upx;
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;
			background: #fff;

			image {
				width: 240upx;
				height: 160upx;
				margin-bottom: 30upx;
			}

			.empty-tips {
				font-size: $font-sm+2upx;
				color: $font-color-disabled;
			}
		}
	}

	/* 购物车列表项 */
	.cart-item {
		display: flex;
		position: relative;
		padding: 30upx 40upx;

		.image-wrapper {
			width: 230upx;
			height: 230upx;
			flex-shrink: 0;
			position: relative;

			image {
				border-radius: 8upx;
				width: 100%;
				height: 100%;
			}
		}

		.checkbox {
			position: absolute;
			left: -16upx;
			top: -16upx;
			z-index: 8;
			font-size: 44upx;
			line-height: 1;
			padding: 4upx;
			color: $font-color-disabled;
			background: #fff;
			border-radius: 50px;
		}

		.item-right {
			display: flex;
			flex-direction: column;
			flex: 1;
			overflow: hidden;
			position: relative;
			padding-left: 30upx;

			.title{
				font-size: $font-base + 2upx;
				color: $font-color-dark;
				height: 40upx;
				line-height: 40upx;
			}
			.price {
				font-size: $font-base;
				font-weight:bold;
				color: $price-color;
				height: 40upx;
				line-height: 40upx;
			}

			.list-price{
				color: $font-color-light;
				padding: 5upx;
				text-decoration: line-through;
				font-size:$font-sm;
			}
			
			.attr {
				font-size: $font-sm + 2upx;
				color: $font-color-light;
				height: 50upx;
				line-height: 50upx;
			}
			.unit{
				margin-top: auto;
			}
			.price-tag{
				color: $dark-color;
				padding: 5upx 10upx;
				font-size: $font-sm;
			}
			.warn{
				color: $base-color;
				font-size: $font-sm;
				margin-top: 10upx;
			}
		}

		.del-btn {
			padding: 4upx 10upx;
			font-size: 34upx;
			height: 50upx;
			color: $font-color-light;
		}
	}

	/* 底部栏 */
	.action-section {
		/* #ifdef H5 */
		margin-bottom: 100upx;
		/* #endif */
		position: fixed;
		left: 30upx;
		bottom: 30upx;
		z-index: 95;
		display: flex;
		align-items: center;
		width: 690upx;
		height: 100upx;
		padding: 0 30upx;
		background: rgba(255, 255, 255, .9);
		box-shadow: 0 0 20upx 0 rgba(0, 0, 0, .5);
		border-radius: 16upx;

		.checkbox {
			height: 52upx;
			position: relative;

			image {
				width: 52upx;
				height: 100%;
				position: relative;
				z-index: 5;
			}
		}

		.clear-btn {
			position: absolute;
			left: 26upx;
			top: 0;
			z-index: 4;
			width: 0;
			height: 52upx;
			line-height: 52upx;
			padding-left: 38upx;
			font-size: $font-base;
			color: #ffffff;
			background: $font-color-disabled;
			border-radius: 0 50px 50px 0;
			opacity: 0;
			transition: .2s;

			&.show {
				opacity: 1;
				width: 120upx;
			}
		}

		.total-box {
			flex: 1;
			display: flex;
			flex-direction: column;
			text-align: right;
			padding-right: 40upx;

			.price {
				font-size: $font-lg;
				font-weight: bold;
				color: $price-color;
			}

			.coupon {
				font-size: $font-sm;
				color: $font-color-light;

				text {
					color: $font-color-dark;
				}
			}
		}

		.confirm-btn {
			padding: 0 38upx;
			margin: 0;
			border-radius: 100px;
			height: 76upx;
			line-height: 76upx;
			font-size: $font-base + 2upx;
			background: $uni-color-primary;
		}
		.disabled {
			background-color: $font-color-disabled;
			box-shadow: none
		}
	}

	/* 复选框选中状态 */
	.action-section .checkbox.checked,
	.cart-item .checkbox.checked {
		color: $uni-color-primary;
	}
</style>
