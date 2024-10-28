<template>
	<view class="content b-t">
		<empty v-if="loadingType!='loading'&&userUpgradeList.length === 0"></empty>
		<view class="list b-b" v-for="(item, index) in userUpgradeList" :key="index">
			<view class="left">
				<view class="tran-type">
					{{item.userLevelDTO.name}}({{item.periodeNumber}}
					<text v-if="item.periodType=='DAY'">天</text>
					<text v-if="item.periodType=='MONTH'">个月</text>
					<text v-if="item.periodType=='YEAR'">年</text>
					)
				</view>
				<view class="tran-time">
					{{item.transactionTime}}
				</view>
			</view>
			<view class="right">
				<view class="balance-plus">
					￥{{item.transactionAmount}}
				</view>
				<view class="balance">
					到期日:{{item.expireDate}}
				</view>
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
				userUpgradeList: [],
				pageNo: 1,
				pageSize: 20,
				loadingType:''
			}
		},
		onLoad(option) {
			this.searchUserUpgrade();
		},
		onReachBottom() {
			this.loadMore();
		},
		//下拉刷新
		onPullDownRefresh() {
			//重新加载数据
			this.resetPage();
			this.searchUserUpgrade();
		},
		computed: {
			...mapState(['hasLogin', 'userInfo'])
		},
		methods: {
			//加载更多
			loadMore() {
				if (this.loadingType === 'more') {
					this.pageNo = this.pageNo + 1;
					this.searchUserUpgrade();
				}
			},
			resetPage() {
				this.pageNo = 1;
				this.userUpgradeList = [];
			},
			//添加或修改成功之后回调
			refreshList() {
				this.inquiryaward();
			},
			//查询会员购买记录
			searchUserUpgrade() {
				let that = this;
				let keyArray = ['USER_UUID','IS_PAYED'];
				let searchOptions = {
					userUuid: this.userInfo.userUuid,
					payed: true,
					startIndex: (this.pageNo - 1) * this.pageSize,
					pageSize: this.pageSize
				};
				searchOptions.keyArray = keyArray;
				this.loadingType = 'loading';
				this.$api.request.searchUserUpgrade(searchOptions, res => {
					if (res.body.status.statusCode === '0') {
						var total = res.body.data.total;
						var userUpgradeList = res.body.data.upgradeList;
						this.userUpgradeList = this.userUpgradeList.concat(userUpgradeList);
						if (this.userUpgradeList.length >= total) {
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
		background: $page-color-light;
	}

	.content {
		margin: 0 $page-row-spacing;
		/* position: relative; */
	}

	.list {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 40upx 30upx;
		position: relative;
		background: #fff;
		.amount{
			color: $base-color
		}
		.apply{
			color: #fff;
			border-radius: 10px;
			background: linear-gradient(left, #f5cb54, #9e760d);
			width: 80px;
			height: 30px;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 28upx;
		}
	}
	
	.left {
		text-align: left;
		.tran-type {
			font-size: $font-base;
			color: $font-color-dark;
		}
		
		.tran-time{
			font-size: $font-base;
			color: $font-color-light;
			padding-top:20upx;
		}
	}
	.right {
		text-align: right;
		.balance-plus {
			font-size: $font-lg;
			color: $font-color-dark;
			font-weight: bold;
		}
		.balance-minus {
			font-size: $font-lg;
			color: green
		}
		.balance{
			font-size: $font-base;
			color: $font-color-light;
			padding-top:20upx;
		}
	}

</style>
