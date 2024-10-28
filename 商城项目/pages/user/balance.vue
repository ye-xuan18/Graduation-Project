<template>
	<view class="content b-t">
		<view class="price-box">
			<text>余额</text>
			<text class="price">{{userInfo.availableBalance||0}}</text>
			<view class="action">
				<view class="button-base" @click="navCharge" v-if="applicationConfig.applicationChargeEnabled">充值</view>
				<view class="button-base-outline" @click="navWithdraw" v-if="applicationConfig.applicationWithdrawEnabled">提现</view>
			</view>
		</view>
		<view class="list b-b" v-for="(item, index) in statementList" :key="index">
			<view class="left">
				<view class="tran-type">
					{{item.transactionTypeDesc}}
				</view>
				<view class="tran-time">
					{{item.transactionTime}}
				</view>
			</view>
			<view class="right">
				<view class="balance-minus" v-if="item.balanceBefore>item.balanceAfter">
					-￥{{item.transactionAmount}}
				</view>
				<view class="balance-plus" v-if="item.balanceBefore<item.balanceAfter">
					+￥{{item.transactionAmount}}
				</view>
				<view class="balance">
					交易后余额:￥{{item.balanceAfter}}
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
				statementList: [],
				pageNo: 1,
				pageSize: 20,
				loadingType:''
			}
		},
		onLoad(option) {
			this.searchUserStatement();
		},
		onReachBottom() {
			this.loadMore();
		},
		//下拉刷新
		onPullDownRefresh() {
			//重新加载数据
			this.resetPage();
			this.searchUserStatement();
		},
		computed: {
			...mapState(['hasLogin', 'userInfo','applicationConfig'])
		},
		methods: {
			navCharge(){
				uni.navigateTo({
					url:'/pages/charge/list'
				})
			},
			navWithdraw(){
				uni.navigateTo({
					url:'/pages/withdraw/list'
				})
			},
			//加载更多
			loadMore() {
				if (this.loadingType === 'more') {
					this.pageNo = this.pageNo + 1;
					this.searchUserStatement();
				}
			},
			resetPage() {
				this.pageNo = 1;
				this.statementList = [];
			},
			//添加或修改成功之后回调
			refreshList() {
				this.inquiryaward();
			},
			//查询用户奖金明细
			searchUserStatement() {
				let that = this;
				let keyArray = ['USER'];
				let searchOptions = {
					userUuid: this.userInfo.userUuid,
					startIndex: (this.pageNo - 1) * this.pageSize,
					pageSize: this.pageSize
				};
				searchOptions.keyArray = keyArray;
				this.loadingType = 'loading';
				this.$api.request.getStatementList(searchOptions, res => {
					if (res.body.status.statusCode === '0') {
						var total = res.body.data.total;
						var statementList = res.body.data.statements;
						this.statementList = this.statementList.concat(statementList);
						if (this.statementList.length >= total) {
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
		padding-bottom: 120upx;
	}

	.content {
		position: relative;
	}
	
	.price-box {
		position: sticky;
		top: var(--window-top);
		z-index: 100;
		padding: 40upx 0 0 0;
		background: $page-color-light;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 28upx;
		color: #909399;
		
		.action{
			display: flex;
			justify-content: center;
			width:80%;
			margin: 20upx 0;
			.button-base {
				width: 200upx;
				margin: 0 20upx;
			}
			.button-base-outline {
				width: 200upx;
				margin: 0 20upx;
			}
		}
	
		.price {
			font-size: 50upx;
			color: #303133;
			margin-top: 12upx;
	
			&:before {
				content: '￥';
				font-size: 40upx;
			}
		}
	}


	.list {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20upx 30upx;
		;
		background: #fff;
		position: relative;
		.amount{
			color: $base-color
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
			color: $uni-color-error;
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
