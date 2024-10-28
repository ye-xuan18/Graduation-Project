<template>
	<view class="content">
		
		<view class="list-cell" :class="border" @click="eventClick" hover-class="cell-hover"  :hover-stay-time="50">
			<uni-icons v-if="icon" class="cell-icon" size="25" :color="iconColor" :type="icon"></uni-icons>
			<text class="cell-tit clamp">{{title}}</text>
			<text v-if="tips" class="cell-tip">{{tips}}</text>
			<uni-icons :type="navigateType"></uni-icons>
		</view>

	</view>
</template>
 
<script>
	export default {
		data() {
			return {
				typeList: {
					left: 'left',
					right: 'right',
					up: 'up',
					down: 'bottom'
				},
			}
		},
		props: {
			icon: {
				type: String,
				default: ''
			},
			title: {
				type: String,
				default: '标题'
			},
			tips: {
				type: String,
				default: ''
			},
			navigateType: {
				type: String,
				default: 'right'
			},
			border: {
				type: String,
				default: 'b-b'
			},
			hoverClass: {
				type: String,
				default: 'cell-hover'
			},
			iconColor: {
				type: String,
				default: '#333'
			}
		},
		methods: {
			eventClick(){
				this.$emit('eventClick');
			}
		},
	}
</script>

<style lang='scss'>

	.icon .list-cell.b-b:after{
		left: 90upx;
	}
	.list-cell{
		display:flex;
		align-items:baseline;
		padding: 20upx $page-row-spacing;
		line-height:60upx;
		position:relative;
		
		&.cell-hover{
			background:#fafafa;
		}
		&.b-b:after{
			left: 30upx;
		}

		.cell-icon{
			align-self:center;
			width:56upx;
			max-height:60upx;
			font-size:38upx;
		}
		.cell-more{
			align-self: center;
			font-size:30upx;
			color:$font-color-base;
			margin-left:$uni-spacing-row-sm;
		}
		.cell-tit{
			flex: 1;
			font-size: $font-base;
			color: $font-color-dark;
			margin-right:10upx;
		}
		.cell-tip{
			font-size: $font-sm+2upx;
			color: $font-color-light;
		}
	}
</style>
