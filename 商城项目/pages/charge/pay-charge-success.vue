<template>
	<view class="content">

		<view class="content-success">
			<text class="iconfont icon-success"></text>
			<text class="tit">支付成功</text>

			<view class="btn-group">
				<navigator url="/pages/user/user" open-type="switchTab" class="button-base">完成</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang='scss'>
	page {
		background: $page-color-base;
		padding-bottom: 160upx;
	}

	.content {
		margin: 0 $page-row-spacing;
	}

	.content-success {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.icon-success {
		font-size: 160upx;
		color: $uni-color-success;
		margin-top: 100upx;
	}

	.tit {
		font-size: 38upx;
		color: #303133;
	}

	.btn-group {
		width: 80%;
		margin-top: 40upx;
	}

</style>