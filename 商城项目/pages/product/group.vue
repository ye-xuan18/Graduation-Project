<template>
	<view class="content">
		<view class="group">
			<image :src="group.backgroundUrl" mode="aspectFill"></image>
		</view>
		
		<product-list :productList="group.productList" :cols="uiConfig.activeLayout.productCols"></product-list>
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
			uniLoadMore,
			productList
		},
		data() {
			return {
				groupId:''	,//商品组ID
				group:{}
			};
		},
		computed: {
			...mapState(['hasLogin', 'userInfo', 'footPrint', 'applicationConfig','uiConfig'])
		},
		onLoad(options){
			this.groupId = options.groupId;
			this.inquiryGroup();
		},
		methods: {
			//搜索商品
			inquiryGroup(){
				let postData = {
					groupUuid: this.groupId
				};
				//加载中
				this.$api.request.productGroup(postData, res => {
					this.group = res.body.data;
				},false);
			},
		},
	}
</script>

<style lang="scss">
	page, .content{
		background: $page-color-base;
	}

	.group{
		height: 240px;
		image{
			width: 100%;
		}
		.p-box{
			display: flex;
			flex-direction: column;
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
				border-left: 1px solid $border-color-base;
				width: 0;
				height: 36upx;
			}
		}
	}

</style>
