<template>
	<view>
		<!-- 搜索栏区域 -->
		<view class="search-box-wrapper">
			<view class="search-title">{{applicationConfig.applicationName}}</view>
			<view class="search-box">
				<image class='search-icon' src='/static/image/zoom.png'></image>
				<input class="search-input" type="text" placeholder="西红柿" :value="searchKey" @click="navSearch" />
				<span class="search-text">搜索</span>
			</view>
		</view>
		<view class="content">
			<scroll-view scroll-y :style="{height:'100vh'}" class="left-aside">
				<view v-for="item in cateList" :key="item.productCateUuid" class="f-item b-b"
					:class="{active: item.productCateUuid === selectedL1CateId}" @click="L1Tap(item)">
					{{item.cateName}}
				</view>
			</scroll-view>
			<view class="right-aside" v-if="uiConfig.activeLayout.cateProductDisplayed">
				<view class="top">
					<view class="title" v-if="brandList.length>0">
						<text>热门品牌</text>
					</view>
					<view class="t-list" v-if="brandList.length>0">
						<view @click="navToBrand(titem.productBrandUuid)" class="t-item" v-for="titem in brandList"
							:key="titem.productBrandUuid">
							<image :src="titem.logoUrl"></image>
							<!-- <text>{{titem.name}}</text> -->
						</view>
					</view>
					<view class="t-list">
						<view class="t-item" :class="{active: selectedL1CateId === selectedL2CateId}" @click="allTap()"
							v-if="tlist.length>0">
							<span>全部</span>
						</view>
						<view class="t-item" v-for="titem in tlist"
							:class="{active: titem.productCateUuid === selectedL2CateId}" @click="L2Tap(titem)"
							:key="titem.productCateUuid">
							<span>{{titem.cateName}}</span>
						</view>
					</view>
				</view>
				<view class="center">
					<scroll-view :style="{height:'100vh'}" scroll-with-animation scroll-y
						@scrolltolower="loadMoreProduct(selectedL2CateId)">
						<!-- product-list组件存在弹出固定位置多规格选择时，iOS真机上固定位置元素在scroll-view中被遮挡的问题 -->
						<!-- 所以只能将product-list组件复制到这里使用,将popup-product-sku组件放在scroll-view外面才能解决这个问题 -->
						<product-list :productList="productList" :cols="1"></product-list>
						<uni-load-more :status="loadingType"></uni-load-more>
					</scroll-view>
				</view>
			</view>
			<scroll-view scroll-with-animation scroll-y class="right-aside" v-else>
					<view class="ad" v-if="adList.length>0">
						<image @click="navAD(adList[0])" :src="adList[0].url" mode="scaleToFill"></image>
					</view>
					<view class="title" v-if="brandList.length>0">
						<text>热门品牌</text>
					</view>
					<view class="x-list" v-if="brandList.length>0">
						<view @click="navToBrand(titem.productBrandUuid)" class="x-item" v-for="titem in brandList"
						 :key="titem.productBrandUuid">
							<image :src="titem.logoUrl"></image>
							<text>{{titem.name}}</text>
						</view>
					</view>
					<view class="x-list" v-if="tlist.length>0">
						<view @click="navToProduct(titem.productCateUuid)" class="x-item" v-for="titem in tlist"
						 :key="titem.productCateUuid">
							<image :src="titem.catePicUrl"></image>
							<text>{{titem.cateName}}</text>
						</view>
					</view>
			</scroll-view>
		</view>
		<popup-product-sku v-if="skuShowClass=='show'" :showClass="skuShowClass" :product="product" :productSku="productSku" @eventSelect="skuSelected" @eventCancel="skuCancelled"></popup-product-sku>
	</view>
</template>

<script>
	import productList from '@/components/product-list.vue'
	import popupProductSku from '@/components/popup-product-sku.vue'
	import uniNumberBox from '@/components/uni-number-box.vue'
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		components: {
			productList,
			popupProductSku,
			uniNumberBox
		},
		data() {
			return {
				searchKey: "",
				cateList: [], //一级目录
				selectedL1CateId: '',
				selectedL2CateId: '',
				tlist: [], //二级目录
				adList: [], //广告
				brandList: [], //品牌
				productList: [], //商品列表
				product:{},
				productSku:{},
				skuShowClass: 'none',
				loadingType: 'loading', //加载状态
				pageSize: 5,
				pageNo: 1
			}
		},
		computed: {
			...mapState(['hasLogin', 'hasMerchant', 'userInfo', 'cartInfo','merchantInfo', 'footPrint', 'applicationConfig', 'uiConfig']),
			goodsList: function(){
				/**获取各商品在购物车中的数量*/
				let tList = this.$api.util.prodCartNum(this.productList,this.cartInfo);
				return tList;
			}
		},
		onLoad(option) {
			// 获取屏幕高度
			uni.getSystemInfo({
				success(res) {
					var winHeight = res.windowHeight;
				}
			})
			this.selectedL1CateId = option.cateId;
			this.inquiryProductCate();
		},

		methods: {
			...mapMutations(['updateCartInfo']),
			setSearchKey(searchKey) {
				this.searchKey = searchKey;
			},
			inquiryProductCate() {
				let that = this;
				that.$api.request.productCate({}, res => {
					if (res.body.status.statusCode === '0') {
						that.cateList = res.body.data.cates;
						//默认选中
						if (that.cateList.length > 0) {
							if (that.selectedL1CateId) {
								/* 页面参数指定默认分类, 循环找到该分类并触发点击 */
								that.cateList.forEach(function(item, index) {
									if (item.productCateUuid == that.selectedL1CateId) {
										that.L1Tap(item);
									}
								})
							} else that.L1Tap(that.cateList[0]);
						}
					} else {
						console.log(res.body.status.errorDesc);
					}
				});
			},
			//一级分类点击
			L1Tap(item) {
				this.selectedL1CateId = item.productCateUuid;
				// 清空商品数据
				this.productList = [];
				this.pageNo = 1;
				this.tlist = item.childList;
				/* 默认选中二级分类中的'全部'用以加载全部商品 */
				this.allTap();
				this.$api.request.productCateAddInfo({
					productCateUuid: item.productCateUuid
				}, res => {
					if (res.body.status.statusCode === '0') {
						var data = res.body.data;
						this.adList = data.adList;
						this.brandList = data.brandList;
					} else {
						console.log(res.body.status.errorDesc);
					}
				});
			},
			/* 二级分类点击单个分类 */
			L2Tap(item) {
				this.selectedL2CateId = item.productCateUuid;
				// 清空商品数据
				this.productList = [];
				this.searchProductByCategory(this.selectedL2CateId);
			},
			/* 二级分类点击全部 */
			allTap() {
				// 清空商品数据
				this.productList = [];
				/* 点击二级分类的'全部',将选中的二级分类设置为和选中的一级分类相同,用于商品查询 */
				this.selectedL2CateId = this.selectedL1CateId;
				this.searchProductByCategory(this.selectedL1CateId);
			},
			//查询指定类目下的商品
			searchProductByCategory(productCateUuid) {
				var keyArray = [];
				keyArray.push('ON_SALE');
				keyArray.push('PRODUCT_CATE');
				let searchData = {
					'keyArray': keyArray,
					'onSale': true,
					'productCateUuid': productCateUuid,
					'startIndex': (this.pageNo - 1) * this.pageSize,
					'pageSize': this.pageSize,
				};
				this.searchProduct(searchData);
			},
			//查询指定条件下的商品
			searchProduct(searchData) {
				//加载中
				this.loadingType = 'loading';
				this.$api.request.goodsList(searchData, res => {
					uni.stopPullDownRefresh();
					if (res.body.status.statusCode === '0') {
						var productList = res.body.data.products;
						if (this.pageNo === 1)
							this.productList = productList;
						else
							this.productList = this.productList.concat(productList);
						this.total = res.body.data.total;
						if (this.productList.length >= this.total) {
							this.loadingType = 'noMore';
						} else {
							this.loadingType = 'more';
						}
					} else {
						this.loadingType = 'more';
						console.log(res.body.status.errorDesc);
					}
				}, true);
			},
			loadMoreProduct(productCateUuid) {
				if (this.loadingType == 'more') {
					this.pageNo++;
					this.searchProductByCategory(productCateUuid);
				}
			},
			
			navToBrand(tid) {
				uni.navigateTo({
					url: '/pages/product/list?brandId=' + tid
				})
			},
			navToProduct(tid) {
				uni.navigateTo({
					url: '/pages/product/list?cateId='+tid
				})
			},
			navToDetailPage(item) {
				let id = item.productUuid;
				uni.navigateTo({
					url: '/pages/product/product?id=' + id
				})
			},
			navAD(item) {
				this.$api.util.navAD(item);
			},
			navSearch() {
				uni.navigateTo({
					url: '/pages/index/search'
				})
			}
		}
	}
</script>

<style lang='scss'>
	page,


	.content {
		height: 100%;
		background-color: #f8f8f8;
	}

	// 搜索栏区域
	.search-box-wrapper {
		display: flex;
		align-items: center;
		.search-title {
			width: 200upx;
			height: 100upx;
			line-height: 100upx;
			text-align: center;
			color: $font-color-base;
			font-size: $font-lg;
			font-weight: bold;
			overflow: hidden;
		}

		.search-box {
			width: 70%;
			padding: 20upx 20upx;

			.search-input {
				flex: 1;
				height: 70upx;
				line-height: 70upx;
				text-align: left;
				padding-left: 100upx;
				padding-right: 120upx;
				font-size: 28upx;
				color: #ffffff;
				border-radius: 20px;
				background: #ffffff;
				border: 1px solid $border-color-dark;
			}

			.search-icon {
				position: absolute;
				width: 60upx;
				height: 60upx;
				top: 56upx;
				left: 240upx;
				transform: translateY(-50%);
			}

			.search-text {
				position: absolute;
				top: 56upx;
				right: 80upx;
				color: $font-color-base;
				font-size: $font-base;
				transform: translateY(-50%);
			}
		}
	}


	.content {
		display: flex;
	}

	.left-aside {
		flex-shrink: 0;
		width: 200upx;
		height: 100%;
		background-color: #fff;
	}

	.f-item {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100upx;
		font-size: 28upx;
		color: $font-color-base;
		position: relative;

		&.active {
			color: $base-color;
			background: #f8f8f8;

			&:before {
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				height: 36upx;
				width: 8upx;
				background-color: $base-color;
				border-radius: 0 4px 4px 0;
				opacity: .8;
			}
		}
	}

	.right-aside {
		flex: 1;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		padding-left: 20upx;
		padding-bottom: 120upx;

		.top {
			flex: 0;
			.title {
				background: #fff;
				font-size: 26upx;
				color: $font-color-dark;
				font-weight: bold;
				margin-top: 10px;
				padding: 10px 0 0 10px;
			}
		}

		.center {
			flex: 1
		}
	}

	.ad {
		width: 100%;
		height: 210upx;
		padding: 10upx 0;
		background: #fff;

		image {
			width: 100%;
			height: 100%;
		}
	}

	

	.t-list {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		background: #fff;
		padding-top: 12upx;

		&:after {
			content: '';
			flex: 99;
			height: 0;
		}
	}

	.t-item {
		background: $image-bg-color;
		font-size: 26upx;
		color: $font-color-base;
		margin: 10upx;
		padding: 10upx;
		border-radius: 10%;
		text-align: center;
		image {
			width: 100upx;
			height: 100upx;
		}

		&.active {
			background: $light-color;
			font-size: 26upx;
			color: $dark-color;
		}
	}
	
	.goods-list {
		overflow-y: scroll;
		display: flex;
		flex-wrap: wrap;
		padding: 10upx;
		background: linear-gradient(to bottom, #ffffff 0%, #f8f8f8 100%);
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
			margin: 10upx 1%;
			border-radius: 20upx;
			&-col-1{
				width: 98%;
			}
			&-col-2{
				width: 48%;
			}
		}
	
		.product-image-wrapper {
			border-radius: 30upx;
			overflow: hidden;
			position:relative;
			.product-image {
				width: 100%;
				height: 330upx;
				opacity: 1;
			}
			.image-tag{
				position: absolute;
				top: 0;
				left: 0;
				width:80upx;
				height:80upx;
			}
		}
	
		.title {
			font-size: $font-base;
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
			letter-spacing:2upx;
			.desc {
				font-size: $font-sm;
				color: $font-color-light;
			}
			.desc-outline{
				border: 1px solid $font-color-light;
				padding:5upx;
				margin-right:6upx;
				border-radius: 5px;
			}
			
			.unit {
				font-size: $font-sm;
				color: $font-color-light;
			}
		}
	
		.price-box {
			display: flex;
			align-items: baseline;
			justify-content: space-between;
			padding: 10upx 10upx 10upx 0;
			font-size: 24upx;
			color: $font-color-light;
			overflow:hidden;
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
			color: $uni-color-primary;
			line-height: 1;
	
			&:before {
				content: '￥';
				font-size: 26upx;
			}
		}
		.list-price{
			margin-right:auto;
			text-decoration-line: line-through;
			&:before {
				content: '￥';
			}
		}
	}
	
	.x-list {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		background: #fff;
		padding-top: 12upx;
	
		&:after {
			content: '';
			flex: 99;
			height: 0;
		}
	}
	
	.x-item {
		flex-shrink: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: 176upx;
		font-size: 26upx;
		color: $font-color-base;
		padding-bottom: 20upx;
	
		image {
			width: 140upx;
			height: 140upx;
		}
	}
</style>