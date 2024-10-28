<template>
	<view class="container">
		<view class="carousel">
			<swiper indicator-dots circular=true duration="400">
				<swiper-item v-for="(item,index) in product.productVideos">
				    <video style="width:100%;height:100%" :show-fullscreen-btn="true" :autoplay="true" play-btn-position="center" :src="item.url" controls></video>
				 </swiper-item>
				<swiper-item class="swiper-item" v-for="(item,index) in product.productImages" :key="index">
					<view class="image-wrapper">
						<image :src="item.url" class="loaded" mode="aspectFill"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 单规格商品 -->
		<view class="introduce-section" v-if="!product.skuEnabled">
			<text class="title">{{product.productName}}</text>
			<view class="desc">{{product.memo}}</view>
			<view class="price-box">
				<text class="price-tip">¥</text>
				<text class="price">{{product.unitPrice}}</text>
				<text class="m-price">¥{{product.unitPriceStandard}}</text>
			</view>
			<view class="bot-row">
				<text>销量: {{product.soldUnit}}</text>
				<text>库存: {{product.totalUnit}}</text>
				<u-icon size="32" name="share" @click="togglePopup('bottom', 'share')"></u-icon>
			</view>
		</view>
		<!-- 多规格商品 -->
		<view class="introduce-section" v-if="product.skuEnabled">
			<text class="title">{{product.productName}}</text>
			<view class="desc">{{product.memo}}</view>
			<view class="price-box">
				<text class="price-tip">¥</text>
				<text class="price">{{productSku.skuUnitPrice}}</text>
				<text class="m-price">¥{{productSku.skuUnitPriceStandard}}</text>
			</view>
			<view class="bot-row">
				<text>销量: {{productSku.skuSoldUnit}}</text>
				<text>库存: {{productSku.skuTotalUnit}}</text>
				<text @click="togglePopup('bottom', 'share')"></text>
			</view>
		</view>
		<!--  领券 -->
		<view class="coupon-section" @click="navCoupon" v-if="coupons.length>0">
			<view>
				<u-button type="error" style="margin-right:10px;height:20px;line-height: 20px;" size="mini">领券</u-button>
			</view>
			<view v-for="(item,index) in coupons" v-if="index<3">
				<u-button type="error" style="margin-right:5px;height:20px;line-height: 20px;" plain size="mini">
					<text v-if="item.conditionAmount>0">满{{item.conditionAmount}}</text>
					<text v-else>立</text>
					<text v-if="item.type=='CASH'">减{{item.benefitCash}}</text>
					<text v-if="item.type=='DISCOUNT'">享{{item.benefitDiscount/10}}折</text>
					</u-button>
			</view>
			
			<view class="coupon-btn">
				<uni-icons type="right"></uni-icons>
			</view>
		</view>
		<view class="c-list">
			<view class="c-row b-b" @click="toggleSpec" v-if="product.skuEnabled">
				<text class="tit">规格</text>
				<view class="con">
					<text class="selected-text" v-for="sku in productSku.skuAttrValueList">
						{{sku.skuAttrValue}}
					</text>
				</view>
				<uni-icons type="right"></uni-icons>
			</view>
			<view class="c-row b-b">
				<text class="tit">数量</text>
				<view class="bz-list con">
					<uni-number-box class="step" :min="1" :max="productSku.skuTotalUnit" :value="unit"
					 :isMax="unit>=productSku.skuTotalUnit?true:false" :isMin="unit===1" @eventAdd="numberChange" @eventMinus="numberChange" v-if="product.skuEnabled"></uni-number-box>
					<uni-number-box class="step" :min="1" :max="product.totalUnit" :value="unit"
					 :isMax="unit>=product.totalUnit?true:false" :isMin="unit===1" @eventAdd="numberChange" @eventMinus="numberChange" v-if="!product.skuEnabled"></uni-number-box>
				</view>
			</view>
			<view class="c-row b-b" v-if="product.productFreightDTO">
				<text class="tit">快递</text>
				<view class="bz-list con">
					<text>{{product.productFreightDTO.name}}</text>
				</view>
			</view>
			<view v-if="product.attrList.length>0" class="c-row b-b" @click="togglePopup('bottom', 'attr')">
				<text class="tit">参数</text>
				<view class="bz-list con">
					<text>{{product.attrList[0].productAttrName}} {{product.attrList[0].productAttrValue}}...</text>
				</view>
				<view class="bz-list action">
					<uni-icons type="right"></uni-icons>
				</view>
			</view>
<!-- 			<view class="c-row b-b">
				<text class="tit">服务</text>
				<view class="bz-list con">
					<text>7天无理由退换货 ·</text>
				</view>
			</view> -->
		</view>

		<!-- 评价 -->
		<view class="eva-section">
			<view class="e-header">
				<text class="tit">评价</text>
				<text>({{totalComment}})</text>
				<text class="tip" @click="navTo('/pages/product/evaluate?id='+id)">查看全部</text>
			</view>
			<view class="" v-for="comment in commentList">
				<view class="eva-box">
					<image class="portrait" :src="comment.userDTO.photoUrl||'/static/missing-face.png'" mode="aspectFill"></image>
					<view class="right">
						<view class="bot">
							<text class="attr">{{comment.userDTO.name}}</text>
							<text class="time">{{comment.evaluateTime}}</text>
						</view>
						<view class="star">
							<image src="../../static/image/redstar.png" mode="" v-if="i<comment.commentRank" v-for="(item,i) in stars"></image>
						</view>
						<text class="con">{{comment.commentContent||''}}</text>
					</view>
				</view>
				<view class="eva-image">
					<image @click="previewImage(url)" :src="url" mode="aspectFill" v-for="url in comment.imageUrlList"></image>
				</view>
				<view class="eva-reply" v-if="comment.replayContent">
					<text>卖家回复: {{comment.replayContent}}</text>
				</view>
			</view>
		</view>

		<view class="detail-desc">
			<view class="d-header">
				<text>图文详情</text>
			</view>
			<view class="image-wrapper">
				<image v-for="item in product.productDescImages" class="loaded" mode="widthFix" :src="item.url" />
			</view>
			
			<!-- <rich-text :nodes="desc"></rich-text> -->
		</view>

		<!-- 底部操作菜单 -->
		<view class="page-bottom">
			<navigator url="/pages/index/index" open-type="switchTab" class="p-b-btn">
				<uni-icons type="home" size="25"></uni-icons>
				<text>首页</text>
			</navigator>
			<navigator url="/pages/cart/cart" open-type="switchTab" class="p-b-btn">
				<uni-icons type="cart-filled" size="25"></uni-icons>
				<text>购物车</text>
				<uni-badge type="error" v-if="cartNum>0" :text="cartNum+''"></uni-badge>
			</navigator>
			<view class="p-b-btn" :class="{active: isProductCollected}" @click="toFavorite">
				<uni-icons v-if="isProductCollected" type="heart-filled" size="25" :color="uiConfig.baseColor"></uni-icons>
				<uni-icons v-else type="heart" size="25"></uni-icons>
				<text>收藏</text>
			</view>

			<view class="action-btn-group">
				<button type="primary" class=" action-btn no-border buy-now-btn" @click="buy">立即购买</button>
				<button type="primary" class=" action-btn no-border add-cart-btn" @click="addCart">加入购物车</button>
			</view>
		</view>


		<!-- 规格-模态层弹窗 -->
		<view class="popup spec" :class="specClass" @touchmove.stop.prevent="stopPrevent" @click="toggleSpec">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer attr-content" @click.stop="stopPrevent">
				<view class="a-t">
					<image v-if="product.productMainImage" :src="product.productMainImage.url"></image>
					<view class="right">
						<text class="price">¥{{productSku.skuUnitPrice}}</text>
						<text class="stock">库存：{{productSku.skuTotalUnit}}件</text>
						<view class="selected">
							已选：
							<text class="selected-text" v-for="sku in productSku.skuAttrValueList">
								{{sku.skuAttrValue}}
							</text>
						</view>
					</view>
				</view>
				<scroll-view scroll-y class="attr-list">
					<view class="item-list">
						<view v-for="(childItem, childIndex) in product.skuList" :key="childIndex" class="item" :class="{selected: productSku.productSkuUuid === childItem.productSkuUuid}"
						 @click="selectSpec(childItem)">
							<text v-for="attrValue in childItem.skuAttrValueList">{{attrValue.skuAttrValue}}</text>
						</view>
					</view>
				</scroll-view>
				<button v-if="productSku.skuTotalUnit>0" class="btn" @click="toggleSpec">完成</button>
				<button v-if="productSku.skuTotalUnit===0" class="btn disabled" disabled="disabled">无库存</button>
			</view>
		</view>
		<!-- 底部分享弹窗 -->
		<uni-popup ref="showshare" :type="type" @change="change">
			<!-- #ifdef H5 -->
			<shareByH5 :shareType='3' :goodsId="product.productUuid" :shareImg="product.productMainImage.url"
			 :shareTitle="product.productName" :shareContent="product.productBrief" :shareHref="shareHref" @close="closeShare()"></shareByH5>
			<!-- #endif -->

			<!-- #ifdef MP-WEIXIN -->
			<shareByWx :shareType='3' :goodsId="product.productUuid" :shareImg="product.productMainImage.url"
			 :shareTitle="product.productName" :shareContent="product.productBrief" :shareHref="'/pages/product/product?id='+product.productUuid" @close="closeShare()"></shareByWx>
			<!-- #endif -->

			<!-- #ifdef MP-ALIPAY -->
			<shareByAli :shareType='3' :goodsId="product.productUuid" :shareImg="product.productMainImage.url"
			 :shareTitle="product.productName" :shareContent="product.productBrief" :shareHref="shareHref" @close="closeShare()"></shareByAli>
			<!-- #endif -->

			<!-- #ifdef APP-PLUS -->
			<shareByApp :shareType='3' :goodsId="product.productUuid" :shareImg="product.productMainImage.url"
			 :shareTitle="product.productName" :shareContent="product.productBrief" :shareHref="shareHref" @close="closeShare()"></shareByApp>
			<!-- #endif -->
		</uni-popup>
		<!-- 底部商品参数弹窗 -->
		<uni-popup ref="showattr" :type="type">
			<view class="c-list pb50">
				<view class="c-row b-b" v-for="item in product.attrList">
					<text class="tit">{{item.productAttrName}}</text>
					<view class="bz-list con">
						<text>{{item.productAttrValue}}</text>
					</view>
				</view>
			</view>
			<button class="close-btn" @click="closeAttr">关闭</button>
		</uni-popup>
	</view>
</template>

<script>
	// import share from '@/components/share';
	import uniNumberBox from '@/components/uni-number-box.vue'
	import uniBadge from "@/components/uni-badge/uni-badge.vue"
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
	export default {
		components: {
			uniNumberBox,
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
				id: '',
				unit: 1,
				showCoupon:false,
				coupons:[],
				product: {
					unitPrice:0,
					unitPriceStandard:0,
					soldUnit: 0,
					totalUnit: 0,
					productMainImage:{},
					productImages:[],
					attrList:[]
				},
				productSku: {},
				cartNum: 0,
				// productSkuAttrValueMap:null,
				isProductCollected: false,
				specClass: 'none',
				specSelected: [],
				favorite: true,
				type: '',
				commentList: [],
				totalComment: 0,
				stars: [0, 0, 0, 0, 0]
			};
		},
		onLoad(options) {
			let id = options.id||decodeURIComponent(options.scene);
			let popupSku = options.popupSku;	//弹出规格框
			if (id) {
				this.id = id;
				this.inquiryProduct(id);
				//是否收藏
				if (this.hasLogin){
					this.checkProductCollected(this.userInfo.userUuid, id);
					//购物车商品数量
					this.inquiryCartNum();
				}
				//商品评论
				this.searchProductComment(id);
				//可用优惠券
				this.searchCoupon();
			}
			if(popupSku)
				this.toggleSpec();
		},
		computed: {
			...mapState(['hasLogin', 'userInfo','applicationConfig','uiConfig']),
			shareHref() {
				let pages = getCurrentPages()
				let page = pages[pages.length - 1]
				// #ifdef H5 || MP-WEIXIN || APP-PLUS || APP-PLUS-NVUE
				return this.$api.request.apiBaseUrl.replace("/b2c/rest/","") + '/#/' + page.route + '?id=' + this.product.productUuid;
				// #endif

				// #ifdef MP-ALIPAY
				return this.$api.request.apiBaseUrl.replace("/b2c/rest/","") + '/#/' + page.__proto__.route + '?id=' + this.product
					.productUuid;
				// #endif
			}
		},
		onShareAppMessage(res) {
		    return {
		      title: this.product.productName,
			  imageUrl:this.product.productMainImage.url,
		      path: '/pages/product/product?id='+this.product.productUuid
		    }
		 },
		methods: {
			...mapMutations(['login', 'addFootPrint','updateCartInfo']),
			togglePopup(type, open) {
				switch (type) {
					case 'top':
						this.content = '顶部弹出 popup'
						break

					case 'bottom':
						this.content = '底部弹出 popup'
						break
					case 'center':
						this.content = '居中弹出 popup'
						break
				}
				this.type = type
				this.$nextTick(() => {
					this.$refs['show' + open].open()
				})
			},
			closeShare() {
				this.$refs.showshare.close();
			},
			closeAttr() {
				this.$refs.showattr.close();
			},
			cancel(type) {
				this.$refs.showshare.close();
			},
			change(e) {
				console.log('是否打开:' + e.show)
			},
			checkProductCollected(userUuid, productUuid) {
				let postData = {
					productDTO: {
						productUuid: productUuid
					},
					userDTO: {
						userUuid: userUuid
					}
				}
				this.$api.request.isProductCollected(postData, res => {
					if (res.body.status.statusCode === '0') {
						this.isProductCollected = res.body.data.productCollected;
					} else {
						this.$api.msg(res.body.status.errorDesc);
					}
				}, true);
			},
			collectProduct(userUuid, productUuid) {
				let postData = {
					productDTO: {
						productUuid: productUuid
					},
					userDTO: {
						userUuid: userUuid
					}
				}
				this.$api.request.collectProduct(postData, res => {
					if (res.body.status.statusCode === '0') {
						console.log('商品已收藏')
					} else {
						this.$api.msg(res.body.status.errorDesc);
					}
				}, true);
			},
			cancelCollectProduct(userUuid, productUuid) {
				let postData = {
					productDTO: {
						productUuid: productUuid
					},
					userDTO: {
						userUuid: userUuid
					}
				}
				this.$api.request.cancelCollectProduct(postData, res => {
					if (res.body.status.statusCode === '0') {
						console.log('已取消商品收藏')
					} else {
						this.$api.msg(res.body.status.errorDesc);
					}
				}, true);
			},
			//查询购物车商品数量
			inquiryCartNum() {
				let postData = {
					userUuid: this.userInfo.userUuid
				}
				this.$api.request.getCartNum(postData, res => {
					if (res.body.status.statusCode === '0') {
						this.cartNum = res.body.data.unit;
					} else {
						console.log(res.body.status.errorDesc);
					}
				});
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
			inquiryProduct(id) {
				let postData = {
					productUuid: id
				}
				this.$api.request.goodsDetail(postData, res => {
					if (res.body.status.statusCode === '0') {
						this.product = res.body.data;
						if (this.product.skuEnabled) {
							this.productSku = this.product.skuList[0];
							// this.productSkuAttrValueMap = this.convertSku2Map(this.productSku);
						}
						this.addFootPrint(this.product);
					} else {
						console.log(res.body.status.errorDesc);
					}
				});
			},
			searchProductComment(id) {
				let postData = {
					keyArray: ['PRODUCTUUID'],
					productUuid: id,
					startIndex: 0,
					pageSize: 1
				}
				this.$api.request.goodsComment(postData, res => {
					if (res.body.status.statusCode === '0') {
						this.commentList = res.body.data.commentList;
						this.totalComment = res.body.data.total;
					} else {
						console.log(res.body.status.errorDesc);
					}
				});
			},
			//规格弹窗开关
			toggleSpec() {
				if (this.specClass === 'show') {
					this.specClass = 'hide';
					setTimeout(() => {
						this.specClass = 'none';
					}, 250);
				} else if (this.specClass === 'none') {
					this.specClass = 'show';
				}
			},
			//选择规格
			selectSpec(productSku) {
				this.productSku = productSku;

			},
			numberChange(e) {
				this.unit = e.number;
			},
			//分享
			share() {
				this.$refs.share.toggleMask();
			},
			//收藏
			toFavorite() {
				if (!this.hasLogin) 
					uni.navigateTo({
						url:'/pages/public/login'
					});
				else{
					this.isProductCollected = !this.isProductCollected;
					if (this.isProductCollected) {
						this.collectProduct(this.userInfo.userUuid, this.id);
					} else {
						this.cancelCollectProduct(this.userInfo.userUuid, this.id);
					}
				}
			},
			//立即购买
			buy() {
				let postData = {
					unit: this.unit,
					userDTO: {
						userUuid: this.userInfo.userUuid
					}
				}
				if (this.product.skuEnabled) {
					postData.productSkuDTO = {
						productSkuUuid: this.productSku.productSkuUuid
					}
				} else {
					postData.productDTO = {
						productUuid: this.product.productUuid
					}
				};
				this.$api.request.addCart(postData, res => {
					if (res.body.status.statusCode === '0') {
						uni.navigateTo({
							url: '/pages/order/createOrder?data=' + JSON.stringify(res.body.data.shoppingCartUuid)
						})
					} else {
						this.$api.msg(res.body.status.errorDesc);
					}
				});
			},
			//添加商品到购物车
			addCart() {
				let postData = {
					unit: this.unit,
					userDTO: {
						userUuid: this.userInfo.userUuid
					}
				}
				if (this.product.skuEnabled) {
					postData.productSkuDTO = {
						productSkuUuid: this.productSku.productSkuUuid
					}
				} else {
					postData.productDTO = {
						productUuid: this.product.productUuid
					}
				}
				this.$api.request.addCart(postData, res => {
					if (res.body.status.statusCode === '0') {
						this.syncUserCart(function() {
							let pages = getCurrentPages();
							if (pages.length === 1) {
								uni.switchTab({
									url: '/pages/index/index',
								})
							} else {
								uni.navigateBack({
									delta: 1
								});
							}
						});
					} else {
						this.$api.msg(res.body.status.errorDesc);
					}
				});
			},
			navTo(url) {
				uni.navigateTo({
					url: url
				})
			},
			previewImage(url) {
				var urls = [];
				urls.push(url);
				uni.previewImage({
					current: url,
					indicator: "number",
					loop: "true",
					urls: urls
				})
			},
			navCoupon(){
				uni.navigateTo({
					url:'/pages/coupon/list'
				})
			},
			//搜索优惠券
			searchCoupon() {
				let postData = {
					keyArray: ['ACTIVE','PRODUCT'],
					productUuid: this.id,
					active: true,
					startIndex: 0,
					pageSize: 100
				};
				this.$api.request.couponList(postData, res => {
					if (res.body.status.statusCode === '0') {
						var coupons = res.body.data.coupons;
						this.coupons = coupons
					}
				}, true);
			},
			//领取优惠券
			getCoupon(item) {
				this.$api.request.getCoupon({
					actionType:'RECEIVE',
					couponDTO:{
						couponUuid: item.couponUuid,
					},
					userDTO: {
						userUuid: this.userInfo.userUuid
					},
					receiveChannel: 'SELF'
				}, res => {
					if (res.body.status.statusCode === '0') {
						this.$api.msg('领取成功');
					} else {
						this.$api.msg(res.body.status.errorDesc);
					}
				}, false);
			},
			stopPrevent() {}
		},

	}
</script>

<style lang='scss'>
	page {
		background: $page-color-base;
		padding-bottom: 160upx;
	}

	.icon-you {
		font-size: $font-base + 2upx;
		color: $font-color-light;
	}

	.carousel {
		height: 722upx;
		width:100%;
		position: relative;

		swiper {
			height: 100%;
			width:100%;
		}

		.image-wrapper {
			width: 100%;
			height: 100%;
		}

		.swiper-item {
			display: flex;
			justify-content: center;
			align-content: center;
			height: 750upx;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
			}
		}

	}

	/* 标题简介 */
	.introduce-section {
		background: #fff;
		padding: 20upx 30upx;

		.title {
			font-size: 32upx;
			color: $font-color-dark;
			height: 50upx;
			line-height: 50upx;
		}
		.desc {
			font-size: $font-sm;
			color: $font-color-light;
			height: 40upx;
			line-height: 40upx;
		}

		.price-box {
			display: flex;
			align-items: baseline;
			height: 64upx;
			padding: 10upx 0;
			font-size: 26upx;
			color: $price-color;
		}

		.price {
			font-size: $font-lg + 2upx;
			font-weight: bold;
		}

		.m-price {
			margin: 0 12upx;
			color: $font-color-light;
			text-decoration: line-through;
		}

		.bot-row {
			display: flex;
			align-items: center;
			height: 50upx;
			font-size: $font-sm;
			color: $font-color-light;

			text {
				flex: 1;
			}
		}
	}

	/* 领券 */
	.coupon-section {
		display: flex;
		align-items: center;
		color: $font-color-base;
		padding: 12upx 30upx;
		.coupon-btn {
			flex: 1;
			text-align: right;
			font-size: $font-sm;
			color: $uni-color-primary;
			.icon-you {
				margin-left: 4upx;
			}
		}
	}

	.c-list {
		font-size: $font-sm + 2upx;
		color: $font-color-base;
		background: #fff;

		.c-row {
			display: flex;
			align-items: center;
			padding: 20upx 30upx;
			position: relative;
		}

		.tit {
			width: 200upx;
		}

		.con {
			flex: 1;
			color: $font-color-dark;

			.selected-text {
				margin-right: 10upx;
			}
		}
		
		.action{
			flex: 1;
			color: $font-color-dark;
			
			.selected-text {
				margin-right: 10upx;
			}
			
			text-align: right;
		}

		.bz-list {
			//height: 40upx;
			font-size: $font-sm+2upx;
			color: $font-color-dark;

			text {
				display: inline-block;
			}
		}

		.con-list {
			flex: 1;
			display: flex;
			flex-direction: column;
			color: $font-color-dark;
			line-height: 40upx;
		}

		.red {
			color: $uni-color-primary;
		}
	}

	/* 评价 */
	.eva-section {
		display: flex;
		flex-direction: column;
		padding: 20upx 30upx;
		background: #fff;
		margin-top: 16upx;

		.e-header {
			display: flex;
			align-items: center;
			height: 70upx;
			font-size: $font-sm + 2upx;
			color: $font-color-light;

			.tit {
				font-size: $font-base + 2upx;
				color: $font-color-dark;
				margin-right: 4upx;
			}

			.tip {
				flex: 1;
				text-align: right;
			}

			.icon-you {
				margin-left: 10upx;
			}
		}
	}

	.eva-box {
		display: flex;
		padding: 20upx 0;

		.portrait {
			flex-shrink: 0;
			width: 80upx;
			height: 80upx;
			border-radius: 100px;
		}

		.right {
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size: $font-base;
			color: $font-color-base;
			padding-left: 26upx;

			.star {
				display: flex;

				image {
					width: 40upx;
					height: 40upx;
				}
			}

			.con {
				font-size: $font-base;
				color: $font-color-dark;
				padding: 20upx 0;
			}

			.bot {
				display: flex;
				justify-content: space-between;
				font-size: $font-sm;
				color: $font-color-light;
			}
		}
	}

	.eva-image {
		display: flex;

		image {
			width: 160upx;
			height: 160upx;
			margin-right: 20upx;
		}
	}

	.eva-reply {
		background-color: $page-color-base;
		color: $font-color-light;
		font-size: 28upx;
		padding: 10upx;
		margin: 20upx 0;
		border-radius: 20upx;
	}

	/*  详情 */
	.detail-desc {
		background: #fff;
		margin-top: 16upx;

		.d-header {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 80upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			position: relative;

			text {
				padding: 0 20upx;
				background: #fff;
				position: relative;
				z-index: 1;
			}

			&:after {
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translateX(-50%);
				width: 300upx;
				height: 0;
				content: '';
				border-bottom: 1px solid $border-color-dark;
			}
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

				.price {
					font-size: $font-lg;
					color: $price-color;
					margin-bottom: 10upx;
				}
				.selected-text {
					margin-right: 10upx;
				}
			}
		}
		.attr-list {
			display: flex;
			flex-direction: column;
			max-height: 300px;
			font-size: $font-base + 2upx;
			color: $font-color-base;
			padding-top: 30upx;
			padding-left: 10upx;
		}
		.item-list {
			padding: 20upx 0 0;
			display: flex;
			flex-wrap: wrap;

			.item {
				display: flex;
				align-items: center;
				justify-content: center;
				background: $page-color-dark;
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
				background: $light-color;
				color: $dark-color;
			}
		}
	}

	/*  弹出层 */
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
			bottom: 0;
			width: 100%;
			/* min-height: 40vh; */
			border-radius: 10upx 10upx 0 0;
			background-color: #fff;

			.btn {
				height: 66upx;
				line-height: 66upx;
				border-radius: 100upx;
				background: $uni-color-primary;
				font-size: $font-base + 2upx;
				color: #fff;
				margin: 30upx auto 20upx;
			}

			.disabled {
				background-color: $font-color-disabled;
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
				transform: translateY(0);
			}

			100% {
				transform: translateY(120%);
			}
		}
	}

	/* 底部操作菜单 */
	.page-bottom {
		position: fixed;
		left: 30upx;
		bottom: 30upx;
		z-index: 95;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 690upx;
		height: 100upx;
		background: rgba(255, 255, 255, .9);
		border-radius: 16upx;

		.uni-badge {
			position: absolute;
			top: -0.1em;
			left: 7em;
			background: $base-color;
			color: #fff;
		}

		.p-b-btn {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-size: $font-sm;
			color: $font-color-base;
			width: 96upx;
			height: 80upx;

			&.active,
			&.active {
				color: $uni-color-primary;
			}

			.icon-fenxiang2 {
				font-size: 42upx;
				transform: translateY(-2upx);
			}

			.icon-shoucang {
				font-size: 46upx;
			}
		}

		.action-btn-group {
			display: flex;
			height: 76upx;
			border-radius: 100px;
			overflow: hidden;
			background: linear-gradient(to right,$light-color, $base-color, $dark-color);
			margin-left: 20upx;
			position: relative;

			&:after {
				content: '';
				position: absolute;
				top: 50%;
				right: 50%;
				transform: translateY(-50%);
				height: 28upx;
				width: 0;
				border-right: 1px solid rgba(255, 255, 255, .5);
			}

			.action-btn {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 180upx;
				height: 100%;
				font-size: $font-base;
				padding: 0;
				border-radius: 0;
				background: transparent;
			}
		}

	}
	.pb50{
		padding-bottom: 100upx;
	}
	.close-btn {
		position: fixed;
		left: 30upx;
		right: 30upx;
		bottom: 16upx;
		z-index: 95;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		font-size: 32upx;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
	}
</style>
