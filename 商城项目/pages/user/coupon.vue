<template>
	<view class="content">
		<view class="navbar">
			<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{current: tabCurrentIndex === index}"
			 @click="tabClick(index)">
				{{item.text}}
			</view>
		</view>
		<empty v-if="loadingType!='loading'&&coupons.length === 0"></empty>
		<view v-if="coupons.length > 0">
			<view class="coupon-list">
				<user-coupon-item class="coupon-item" :coupon="item" action-text="立即使用" @eventClick="navCate()" v-for="item in coupons"></user-coupon-item>
			</view>
			<uni-load-more :status="loadingType"></uni-load-more>
			<view class="button-base action-btn" @click="navTo('/pages/coupon/list')">
				<text>领取更多优惠券</text>
			</view>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import empty from "@/components/empty";
	import userCouponItem from "@/components/user-coupon-item";
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		components: {
			uniLoadMore,
			empty,
			userCouponItem
		},
		data() {
			return {
				navList: [{
						state: '1',
						text: '可使用'
					},
					{
						state: '2',
						text: '已过期'
					},
					{
						state: '3',
						text: '已使用'
					}],
				tabCurrentIndex:0,
				isExpired: false,
				isUsed: false,
				pageNo: 1,
				pageSize: 10,
				coupons: [],
				total: 0,
				loadingType: ''
			};
		},

		onLoad(options) {
			this.tabClick(0);
		},
		onReachBottom() {
			if (this.loadingType === 'more') {
				this.pageNo = this.pageNo + 1;
				this.searchCoupon(this.isExpired,this.isUsed);
			}
		},
		computed: {
			...mapState(['hasLogin', 'userInfo', 'footPrint'])
		},
		methods: {
			tabClick(index) {
				this.tabCurrentIndex = index;
				this.resetPage();
				if(index==0){
					this.isExpired = false;
					this.isUsed = false;
				}
				else if(index==1){
					this.isExpired = true;
					this.isUsed = false;
				}
				else if(index==2){
					this.isExpired = false;
					this.isUsed = true;
				}
				this.searchCoupon(this.isExpired,this.isUsed);
			},
			//搜索优惠券
			searchCoupon(isExpired, isUsed) {
				var keyArray = ['USER','IS_EXPIRED','IS_USED'];
				//查找已使用无需加入是否过期查询条件
				if(isUsed)	
					keyArray = ['USER','IS_USED'];
				let postData = {
					keyArray: keyArray,
					userUuid: this.userInfo.userUuid,
					expired: isExpired,
					used: isUsed,
					startIndex: (this.pageNo - 1) * this.pageSize,
					pageSize: this.pageSize
				};
				//加载中
				this.loadingType = 'loading';
				this.$api.request.userCoupon(postData, res => {
					if (res.body.status.statusCode === '0') {
						var coupons = res.body.data.userCoupons;
						this.coupons = this.coupons.concat(coupons);
						this.total = res.body.data.total;
						this.loadingType = this.coupons.length >= this.total ? 'noMore' : 'more';
					} else {
						this.loadingType = 'more';
					}
				}, false);
			},
			resetPage() {
				this.coupons = [];
				this.total = 0;
				this.pageNo = 1;
			},
			navCate(){
				uni.switchTab({
					url:'/pages/category/category'
				})
			},
			navTo(url){
				uni.navigateTo({
					url:url
				})
			}
		},
	}
</script>

<style lang="scss">
	page,
		{
		background: $page-color-base;
	}

	.navbar {
		display: flex;
		height: 40px;
		padding: 0 5px;
		background: #fff;
		box-shadow: 0 1px 5px rgba(0, 0, 0, .06);
		position: relative;
		z-index: 10;

		.nav-item {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 15px;
			color: $font-color-dark;
			position: relative;

			&.current {
				color: $base-color;

				&:after {
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 44px;
					height: 0;
					border-bottom: 2px solid $base-color;
				}
			}
		}
	}

	/* 列表 */
	.coupon-list {
		display: flex;
		flex-wrap: wrap;
		padding: 0 30upx;
		border-radius: 20upx;
		.coupon-item{
			width:100%;
		}
	}
	.action-btn {
		position: fixed;
		left: 30upx;
		right: 30upx;
		bottom: 30upx;
		z-index: 95;
	}
</style>
