<template>
	<view class="content">
		<view class="navbar" :style="{position:headerPosition,top:headerTop}">
			<view class="nav-item" :class="{current: filterIndex === 0}" @click="tabClick(0)">
				综合排序
			</view>
			<view class="nav-item" :class="{current: filterIndex === 1}" @click="tabClick(1)">
				销量优先
			</view>
			<view class="nav-item" :class="{current: filterIndex === 2}" @click="tabClick(2)">
				<text>价格</text>
				<view class="p-box">
					<uni-icons v-if="priceOrder === 1 && filterIndex === 2" color="#ff0000" size="12" type="top"></uni-icons>
					<uni-icons v-else size="12" type="top"></uni-icons>
					<uni-icons v-if="priceOrder === 2 && filterIndex === 2" color="#ff0000" size="12" type="bottom"></uni-icons>
					<uni-icons v-else size="12" type="bottom"></uni-icons>
				</view>
			</view>
			<uni-icons class="cate-item" type="list" size="25" @click="toggleCateMask('show')"></uni-icons>
		</view>
		<product-list :productList="goodsList" :cols="uiConfig.activeLayout.productCols"></product-list>
		<uni-load-more :status="loadingType"></uni-load-more>
		
		<view class="cate-mask" :class="cateMaskState===0 ? 'none' : cateMaskState===1 ? 'show' : ''" @click="toggleCateMask">
			<view class="cate-content" @click.stop.prevent="stopPrevent" @touchmove.stop.prevent="stopPrevent">
				<scroll-view scroll-y class="cate-list">
					<view v-for="item in cateList" :key="item.productCateUuid">
						<view class="cate-item b-b two" :class="{active: item.productCateUuid==cateId}">{{item.cateName}}</view>
						<view 
							v-for="tItem in item.childList" :key="tItem.productCateUuid" 
							class="cate-item b-b" 
							:class="{active: tItem.productCateUuid==cateId}"
							@click="changeCate(tItem)">
							{{tItem.cateName}}
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import productList from '@/components/product-list.vue'
	import {
		mapState
	} from 'vuex';
	export default {
		components: {
			uniLoadMore	,
			productList
		},
		data() {
			return {
				cateMaskState: 0, //分类面板展开状态
				headerPosition:"fixed",
				headerTop:"0px",
				loadingType: 'more', //加载更多状态
				filterIndex: 0, 
				cateId: 0, //已选三级分类id
				priceOrder: 0, //1 价格从低到高 2价格从高到低
				cateList: [],
				goodsList: [],	//默认按照传入页面的商品类目搜索商品, 综合排序
				total: 0,
				pageNo:1,
				pageSize:5,
				sortBy:'updateDate',
				sort:'desc',
				searchKey:''
			};
		},
		computed: {
			...mapState(['hasLogin', 'userInfo', 'footPrint', 'applicationConfig','uiConfig'])
		},
		onLoad(options){
			// #ifdef H5
			this.headerTop = document.querySelector(".uni-page-head").offsetHeight+'px';
			// #endif
			this.cateId = options.cateId;
			if(options.cateList)
				this.cateList = JSON.parse(unescape(options.cateList));
			else{
				this.inquiryProductCate();
			}
			//this.loadData();
			this.searchKey = options.searchKey;	//主页搜索
			this.searchBrand = options.brandId;	//从分类页点击品牌
			this.searchProduct();
		},
		onPageScroll(e){
			//兼容iOS端下拉时顶部漂移
			if(e.scrollTop>=0){
				this.headerPosition = "fixed";
			}else{
				this.headerPosition = "absolute";
			}
		},
		//下拉刷新
		onPullDownRefresh(){
			//重新加载数据
			this.resetPage();
			this.searchProduct();
		},
		//加载更多
		onReachBottom(){
			if(this.loadingType === 'more'){
				this.pageNo = this.pageNo + 1;
				this.searchProduct()
			}
		},
		methods: {
			//查询商品类目
			inquiryProductCate() {
				this.$api.request.productCate({}, res => {
					if (res.body.status.statusCode === '0') {
						this.cateList = res.body.data.cates;
					} else {
						console.log(res.body.status.errorDesc);
					}
				},true);
			},
			//搜索商品
			searchProduct(){
				var keyArray = [];
				keyArray.push('ON_SALE');
				if(this.cateId){
					keyArray.push('PRODUCT_CATE');
				}
				if(this.searchKey){
					keyArray.push('PRODUCT_NAME');
				}
				if(this.searchBrand){
					keyArray.push('BRAND');
				}
				let searchData = {
					'keyArray': keyArray,
					'onSale': true,
					'productCateUuid': this.cateId,
					'productName': this.searchKey,
					'productBrandUuid': this.searchBrand,
					'startIndex': (this.pageNo-1)*this.pageSize,
					'pageSize': this.pageSize,
					'sortBy': this.sortBy,
					'sort': this.sort
				};
				//加载中
				this.loadingType = 'loading';
				this.$api.request.goodsList(searchData, res => {
					uni.stopPullDownRefresh();
					if (res.body.status.statusCode === '0') {
						var goodsList = res.body.data.products;
						this.goodsList = this.goodsList.concat(goodsList);
						this.total = res.body.data.total;
						if(this.goodsList.length>=this.total){
							this.loadingType = 'noMore';
						}else{
							this.loadingType = 'more';
						}
					} else {
						this.loadingType = 'more';
						console.log(res.body.status.errorDesc);
					}
				},true);
			},
			//加载商品 ，带下拉刷新和上滑加载
			async loadData(type='add', loading) {
				//没有更多直接返回
				if(type === 'add'){
					if(this.loadingType === 'nomore'){
						return;
					}
					this.loadingType = 'loading';
				}else{
					this.loadingType = 'more'
				}
				
				let goodsList = await this.$api.json('goodsList');
				if(type === 'refresh'){
					this.goodsList = [];
				}
				//筛选，测试数据直接前端筛选了
				if(this.filterIndex === 1){
					goodsList.sort((a,b)=>b.sales - a.sales)
				}
				if(this.filterIndex === 2){
					goodsList.sort((a,b)=>{
						if(this.priceOrder == 1){
							return a.price - b.price;
						}
						return b.price - a.price;
					})
				}
				
				this.goodsList = this.goodsList.concat(goodsList);
				
				//判断是否还有下一页，有是more  没有是nomore(测试数据判断大于20就没有了)
				this.loadingType  = this.goodsList.length > 20 ? 'nomore' : 'more';
				if(type === 'refresh'){
					if(loading == 1){
						uni.hideLoading()
					}else{
						uni.stopPullDownRefresh();
					}
				}
			},
			//重置商品及分页
			resetPage(){
				this.pageNo = 1;
				this.goodsList = [];
			},
			//筛选点击
			tabClick(index){
				if(this.filterIndex === index && index !== 2){
					return;
				}
				this.filterIndex = index;
				if(index === 2){
					this.priceOrder = this.priceOrder === 1 ? 2: 1;
				}else{
					this.priceOrder = 0;
				}
				uni.pageScrollTo({
					duration: 300,
					scrollTop: 0
				})
				//重置商品及查询参数
				this.resetPage();
				//获取排序值及升降序
				if(this.filterIndex===0){
					this.sortBy = 'updateDate';
					this.sort = 'desc';
				}else if(this.filterIndex===1){
					this.sortBy = 'soldUnit';
					this.sort = 'desc';
				}else if(this.filterIndex===2){
					this.sortBy = 'unitPrice';
					if(this.priceOrder==1)
						this.sort = 'asc';
					else if(this.priceOrder==2)
						this.sort = 'desc';
				}
				this.searchProduct();
				
			},
			//显示分类面板
			toggleCateMask(type){
				let timer = type === 'show' ? 10 : 300;
				let	state = type === 'show' ? 1 : 0;
				this.cateMaskState = 2;
				setTimeout(()=>{
					this.cateMaskState = state;
				}, timer)
			},
			//分类点击
			changeCate(item){
				this.cateId = item.productCateUuid;
				this.toggleCateMask();
				uni.pageScrollTo({
					duration: 300,
					scrollTop: 0
				})
				this.resetPage();
				let searchData = {
					'keyArray':['PRODUCT_CATE'],
					'productCateUuid': this.cateId,
					'sortBy': 'updateDate',
					'sort': 'desc',
					'startIndex': (this.pageNo-1)*this.pageSize,
					'pageSize': this.pageSize
				};
				this.searchProduct(searchData);

			},
			//详情
			navToDetailPage(item){
				let id = item.productUuid;
				uni.navigateTo({
					url: '/pages/product/product?id='+id
				})
			},
			stopPrevent(){}
		},
	}
</script>

<style lang="scss">
	page, .content{
		background: $page-color-base;
	}
	.content{
		padding-top: 96upx;
	}

	.navbar{
		position: fixed;
		left: 0;
		top: var(--window-top);
		display: flex;
		width: 100%;
		height: 80upx;
		background: #fff;
		z-index: 10;
		.nav-item{
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 30upx;
			color: $font-color-dark;
			position: relative;
			&.current{
				color: $base-color;
				&:after{
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 120upx;
					height: 0;
					border-bottom: 4upx solid $base-color;
				}
			}
		}
		.p-box{
			display: flex;
			flex-direction: column;
			margin-left: 5upx;
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

	/* 分类 */
	.cate-mask{
		position: fixed;
		left: 0;
		top: var(--window-top);
		bottom: 0;
		width: 100%;
		background: rgba(0,0,0,0);
		z-index: 95;
		transition: .3s;
		
		.cate-content{
			width: 630upx;
			height: 100%;
			background: #fff;
			float:right;
			transform: translateX(100%);
			transition: .3s;
		}
		&.none{
			display: none;
		}
		&.show{
			background: rgba(0,0,0,.4);
			
			.cate-content{
				transform: translateX(0);
			}
		}
	}
	.cate-list{
		display: flex;
		flex-direction: column;
		height: 100%;
		.cate-item{
			display: flex;
			align-items: center;
			height: 90upx;
			padding-left: 30upx;
 			font-size: 28upx;
			color: $font-color-base;
			position: relative;
		}
		.two{
			height: 64upx;
			color: $font-color-dark;
			font-size: 30upx;
			background: $page-color-base;
		}
		.active{
			color: $base-color;
		}
	}
</style>
