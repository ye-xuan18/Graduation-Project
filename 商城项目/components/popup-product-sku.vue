<template>
	<view class="popup" :class="showPopupClass" @touchmove.stop.prevent="stopPrevent" @click="cancel">
		<view class="mask"></view>
		<view class="layer attr-content" @click.stop="stopPrevent">
			<view class="a-t">
				<image v-if="selectedSku.skuImageUrl" :src="selectedSku.skuImageUrl"></image>
				<view class="right">
					<text class="name">{{selectedProduct.productName}}</text>
					<!-- <text class="stock">剩余：{{selectedSku.skuTotalUnit}}</text> -->
					<!-- <view class="selected">
						已选：
						<text class="selected-text" v-for="sku in selectedSku.skuAttrValueList">
							{{sku.skuAttrValue}}
						</text>
					</view> -->
				</view>
			</view>
			<scroll-view scroll-y  class="attr-list">
				<view class="item-list">
					<view v-for="(childItem, childIndex) in selectedProduct.skuList" :key="childIndex" class="item" :class="{selected: selectedSku.productSkuUuid === childItem.productSkuUuid}"
					 @click="selectSku(childItem)">
						<text v-for="attrValue in childItem.skuAttrValueList">{{attrValue.skuAttrValue}}</text>
					</view>
				</view>
			</scroll-view>
			<view class="price-box">
				<view class="price">
					<text>{{(selectedSku.skuUnitPrice * skuUnit).toFixed(2)}}</text>
				</view>
				<view class="unit">
					<uni-number-box class="step" :min="1" :max="selectedSku.skuTotalUnit" v-model="skuUnit"
					 :isMax="skuUnit>=selectedSku.skuTotalUnit?true:false" :isMin="skuUnit===1" @eventAdd="numberChange" @eventMinus="numberChange"></uni-number-box>
				</view>
			</view>
			<view class="action">
				<view v-if="isPost" class="button-base" @click="complete">加入购物车</view>
				<view v-if="!isPost" class="button-base" @click="confirm">确认</view>
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
	name: 'popup-product-sku'
	export default {
		components: {
			uniNumberBox
		},
		data() {
			return {
				selectedProduct: this.product,
				selectedSku:this.productSku,
				showPopupClass:this.showClass,
				skuUnit: this.unit
			}
		},
		computed: {
			...mapState(['hasLogin', 'hasMerchant', 'userInfo', 'merchantInfo','cartInfo','footPrint', 'applicationConfig'])
		},
		props: {
			product: {
				type: Object,
				default: function(){
					return {};
				}
			},
			productSku: {
				type: Object,
				default: function(){
					return {};
				}
			},
			unit: {
				type: Number,
				default: 1
			},
			showClass: {
				type: String,
				default: 'none'
			},
			isPost: {
				type: Boolean,
				default: true
			}
		},
		methods: {
			...mapMutations(['updateCartInfo']),
			//选择规格
			selectSku(productSku) {
				this.selectedSku = productSku;
			},
			//选择规格post数据到后台返回
			complete() {
				this.addProductSkuToCart(this.selectedProduct, this.selectedSku,this.skuUnit);
			},
			//选择规格后返回
			confirm() {
				/* 购物车添加成功后关闭弹出框,并返回数据 */
				let data = {
					sku: this.selectedSku,
					skuShow: 'none',
					unit: this.skuUnit
				}
				this.closePopup('eventSelect',data);
			},
			//取消选择
			cancel() {
				let data = {
					skuShow: 'none'
				}
				this.closePopup('eventCancel',data);
			},
			closePopup(event,data){
				this.showPopupClass = 'hide';
				setTimeout(() => {
					this.showPopupClass = 'none';
					uni.showTabBar();
					this.$emit(event,data);
				}, 250);
			},
			numberChange(e) {
				this.skuUnit = e.number;
			},
			//添加商品到购物车
			addProductSkuToCart(product,productSku,unit) {
				let that = this;
				let postData = {
					unit: unit,
					userDTO: {
						userUuid: this.userInfo.userUuid
					},
					productSkuDTO: {
						productSkuUuid: productSku.productSkuUuid
					}
				}
				this.$api.request.addCart(postData, res => {
					if (res.body.status.statusCode === '0') {
						//同步购物车数据到本地
						this.syncUserCart(function(){
							console.log('Sync user shopping cart completed');
						});
						/* 购物车添加成功后关闭弹出框,并返回数据 */
						let data = {
							sku: that.selectedSku,
							skuShow: 'none',
							unit: that.skuUnit
						}
						that.closePopup('eventSelect',data);
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
			},
			//查询商品详情
			/* inquiryProductDetail(id) {
				let postData = {
					productUuid: id
				}
				this.$api.request.goodsDetail(postData, res => {
					if (res.body.status.statusCode === '0') {
						this.product = res.body.data;
						if(!this.productSku)
							this.productSku = this.product.skuList[0];
					} else {
						console.log(res.body.status.errorDesc);
					}
				});
			}, */
			stopPrevent() {}
		},
	}
</script>

<style lang='scss'>
	.popup {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 99;
	
		&.show {
			display: block;
	
			.mask {
				animation: showPopup 0.2s linear both;
			}
	
			.layer {
				animation: showLayer 0.2s linear both;
			}
		}
	
		&.hide {
			display: block;
			.mask {
				animation: hidePopup 0.2s linear both;
			}
	
			.layer {
				animation: hideLayer 0.2s linear both;
			}
		}
	
		&.none {
			display: none;
		}
	
		.mask {
			position: fixed;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 1;
			background-color: rgba(0, 0, 0, 0.4);
		}
	
		.layer {
			position: fixed;
			z-index: 99;
			bottom: var(--window-bottom);
			width: 100%;
			min-height: 40vh;
			border-radius: 10upx 10upx 0 0;
			background-color: #fff;
	
			.btn {
				margin: 30upx auto 20upx;
			}
	
			.disabled {
				background-color: $font-color-disabled;
			}
			
			.price-box{
				display: flex;
				align-items: center;
				justify-content: space-between;
				.price{
					color: $base-color;
					font-weight: bold;
					font-size:$font-lg+8upx;
					&:before{
						content: '￥';
						font-size: $font-base;
					}
				}
				.unit{
					display: flex;
					justify-content: flex-start;
					align-items: center;
				}
			}
			.action{
				margin: 30upx 10upx;
			}
		}
		
		/* 规格选择弹窗 */
		.attr-content {
			padding: 10upx 30upx;
			.a-t {
				display: flex;
				image {
					width: 170upx;
					height: 170upx;
					flex-shrink: 0;
					margin-top: -40upx;
					border-radius: 8upx;
					;
				}
				.right {
					display: flex;
					flex-direction: column;
					padding-left: 24upx;
					font-size: $font-sm + 2upx;
					color: $font-color-base;
					line-height: 42upx;
					.name{
						font-size: $font-lg;
						margin-bottom:10upx;
						color: $font-color-dark;
					}

				}
			}
			.attr-list {
				display: flex;
				flex-direction: column;
				font-size: $font-base + 2upx;
				color: $font-color-base;
				padding-top: 30upx;
				margin-bottom: 30upx;
				padding-left: 10upx;
				max-height: 300px;
			}
			.item-list {
				padding: 20upx 0 0;
				display: flex;
				flex-wrap: wrap;
		
				.item {
					display: flex;
					align-items: center;
					justify-content: center;
					background: #eee;
					margin-right: 20upx;
					margin-bottom: 20upx;
					border-radius: 100upx;
					min-width: 60upx;
					height: 60upx;
					padding: 0 20upx;
					font-size: $font-base;
					color: $font-color-dark;
				}
				.selected {
					background: #fbebee;
					color: $uni-color-primary;
				}
			}
		}
	
		@keyframes showPopup {
			0% {
				opacity: 0;
			}
	
			100% {
				opacity: 1;
			}
		}
	
		@keyframes hidePopup {
			0% {
				opacity: 1;
			}
	
			100% {
				opacity: 0;
			}
		}
	
		@keyframes showLayer {
			0% {
				transform: translateY(120%);
			}
	
			100% {
				transform: translateY(0%);
			}
		}
	
		@keyframes hideLayer {
			0% {
				transform: translateY(0%);
			}
	
			100% {
				transform: translateY(120%);
			}
		}
	}
	
</style>
