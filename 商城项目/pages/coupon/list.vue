<template>
	<view class="content">
		<view class="coupon-list">
			<coupon-item class="coupon-item" :coupon="item" :isAction="item.isAction" :actionText="item.actionText" :noActionText="item.noActionText" @eventClick="getCoupon(item)" v-for="item in coupons"></coupon-item>
		</view>
		<uni-load-more :status="loadingType"></uni-load-more>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import couponItem from '@/components/coupon-item.vue';
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		components: {
			uniLoadMore,
			couponItem
		},
		data() {
			return {
				pageNo: 1,
				pageSize: 10,
				coupons: [],
				total: 0,
				loadingType: ''
			};
		},

		onLoad(options) {
			this.searchCoupon();
		},
		onReachBottom(){
			if(this.loadingType === 'more'){
				this.pageNo = this.pageNo + 1;
				this.searchCoupon();
			}
		},
		computed: {
			...mapState(['hasLogin', 'userInfo', 'footPrint'])
		},
		methods: {
			//搜索优惠券
			searchCoupon() {
				let that = this;
				let postData = {
					keyArray: ['ACTIVE'],
					active: true,
					startIndex: (this.pageNo - 1) * this.pageSize,
					pageSize: this.pageSize
				};
				//加载中
				this.loadingType = 'loading';
				this.$api.request.couponList(postData, res => {
					if (res.body.status.statusCode === '0') {
						var coupons = res.body.data.coupons;
						//如果是登录用户, 查询该优惠券是否已经领取以及总领取数量
						if(this.hasLogin){
							that.$api.request.userCouponNum({
								coupons:coupons,
								userDTO: {
									userUuid: this.userInfo.userUuid
								}
							}, res => {
								if (res.body.status.statusCode === '0') {
									coupons = res.body.data.coupons;
									that.populateCouponAction(coupons);
								}
							}, false);
						}else{
							that.populateCouponAction(coupons);
						}
						// this.coupons = this.coupons.concat(coupons);
						this.total = res.body.data.total;
						this.loadingType = this.coupons.length >= this.total ? 'noMore' : 'more';
					} else {
						this.loadingType = 'more';
					}
				}, false);
			},
			populateCouponAction(coupons){
				let that = this;
				coupons.forEach(function(coupon,index){
					if(!coupon.receivedCount){
						that.$set(coupon,'isAction',true);
						that.$set(coupon,'actionText','立即领取');
					}else if(coupon.receivedCount==0){
						that.$set(coupon,'isAction',true);
						that.$set(coupon,'actionText','立即领取');
					}else if(coupon.limitPerUser>coupon.receivedCount){
						that.$set(coupon,'isAction',true);
						that.$set(coupon,'actionText','继续领取');
					}else{
						that.$set(coupon,'isAction',false);
						that.$set(coupon,'noActionText','已领取');
					}
					that.coupons.push(coupon);
				});
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
						var total = res.body.data.total;
						if(item.limitPerUser>total){
							this.$api.msg('还可以领取'+(item.limitPerUser-total)+'张');
							item.isAction=true;
							item.actionText='继续领取';
						}else if(item.limitPerUser==total){
							item.isAction = false;
							item.noActionText='已领取';
						}
					} else {
						this.$api.msg(res.body.status.errorDesc);
					}
				}, false);
			},
			resetPage() {
				this.coupons = [];
				this.total = 0;
				this.pageNo = 1;
			},
			//详情
			navToDetailPage(item) {
				let id = item.productUuid;
				uni.navigateTo({
					url: `/pages/product/product?id=${id}`
				})
			}
		},
	}
</script>

<style lang="scss">
	page,{
		background: $page-color-base;
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
</style>
