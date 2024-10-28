<template>
	<view class="content b-t">
		<view class="list b-b">
			<view class="wrapper">
				<view class="charge-box">
					<text class="balance">￥{{userInfo.availableBalance}}</text>
				</view>
			</view>
			<text class="apply" @click="navTo('/pages/charge/apply')">充值</text>
		</view>
		<view class="charge-history">
			<view @click="navTo('/pages/charge/detail?id='+item.userChargeUuid)"  class="list b-b" v-for="(item, index) in chargeList" :key="index">
				<view class="wrapper">
					<view class="charge-box">
						<text class="charge">{{item.paymentMethodStr}}</text>
					</view>
					<view class="u-box">
						<text class="name">{{item.chargeTime}}</text>
					</view>
				</view>
			
				<text class="amount">￥{{item.chargeAmount}}</text>
			</view>
		</view>
		

		<uni-load-more :status="loadingType"></uni-load-more>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import empty from "@/components/empty";
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		components: {
			uniLoadMore,
			empty
		},
		data() {
			return {
				source: 0,
				chargeList: [],
				pageNo: 1,
				pageSize: 20,
				loadingType:''
			}
		},
		onLoad(option) {
			this.searchUserCharge();
		},
		onReachBottom() {
			this.loadMore();
		},
		//下拉刷新
		onPullDownRefresh() {
			//重新加载数据
			this.resetPage();
			this.searchUserCharge();
		},
		computed: {
			...mapState(['hasLogin', 'userInfo'])
		},
		methods: {
			//加载更多
			loadMore() {
				if (this.loadingType === 'more') {
					this.pageNo = this.pageNo + 1;
					this.searchUserCharge();
				}
			},
			resetPage() {
				this.pageNo = 1;
				this.chargeList = [];
			},
			navTo(url) {
				uni.navigateTo({
					url: url
				})
			},
			//添加或修改成功之后回调
			refreshList() {
				this.resetPage();
				this.searchUserCharge();
			},
			//查询用户奖金明细
			searchUserCharge() {
				let that = this;
				let keyArray = ['USER'];
				let searchOptions = {
					userUuid: this.userInfo.userUuid,
					startIndex: (this.pageNo - 1) * this.pageSize,
					pageSize: this.pageSize
				};
				searchOptions.keyArray = keyArray;
				this.loadingType = 'loading';
				this.$api.request.chargeList(searchOptions, res => {
					if (res.body.status.statusCode === '0') {
						var total = res.body.data.total;
						var chargeList = res.body.data.charges;
						this.chargeList = this.chargeList.concat(chargeList);
						if (this.chargeList.length >= total) {
							this.loadingType = 'noMore';
						} else {
							this.loadingType = 'more';
						}
					} else {
						console.log(res.body.status.errorDesc);
					}
				}, true);
			}
		}
	}
</script>

<style lang='scss'>
	page {
		background: $page-color-base;
	}
	
	.content {
		margin: 0 $page-row-spacing;
		/* position: relative; */
	}

	.list {
		display: flex;
		align-items: center;
		padding: 20upx 30upx;
		;
		background: #fff;
		position: relative;
		.amount{
			color: $font-color-dark;
			font-size: $font-lg;
			font-weight: bold;
		}
		.apply{
			color: #fff;
			background: $base-color;
			border-radius: 10px;
			width: 80px;
			height: 30px;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 28upx;
		}
	}

	.wrapper {
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	.charge-box {
		display: flex;
		align-items: center;

		.tag {
			font-size: 24upx;
			color: $base-color;
			margin-right: 10upx;
			background: #fffafb;
			border: 1px solid #ffb4c7;
			border-radius: 4upx;
			padding: 4upx 10upx;
			line-height: 1;
		}

		.charge {
			font-size: 30upx;
			color: $font-color-dark;
		}
		
		.balance{
			font-size: 40upx;
			color: #303133;
			font-weight: bold;
		}
	}

	.u-box {
		font-size: 28upx;
		color: $font-color-light;
		margin-top: 16upx;

		.name {
			margin-right: 30upx;
			display: block;
		}
	}

	.icon-bianji {
		display: flex;
		align-items: center;
		height: 80upx;
		font-size: 40upx;
		color: $font-color-light;
		padding-left: 30upx;
	}
	.charge-history{
		margin-top: 10upx;
	}
	.add-btn {
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
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}
</style>
