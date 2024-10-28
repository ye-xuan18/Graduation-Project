<template>
	<view class="banner" v-if="!hasLogin">
		<view class="desc">
			新用户登录领福利啦
		</view>
		<view class="button-base btn" @click="toLogin">
				立即登录
		</view>

	</view>
</template>
 
<script>
	import {
		mapState
	} from 'vuex';
	export default {
		
		computed: {
			...mapState(['hasLogin','applicationConfig'])
		},
		props: {
			redirectUrl: String,
			default: ''
		},
		methods: {
			toLogin(){
				if(this.redirectUrl){
					uni.navigateTo({
						url:'/pages/public/login?to='+this.redirectUrl
					})
				}else{
					uni.navigateTo({
						url:'/pages/public/login'
					})
				}
			}
		},
	}
</script>

<style lang='scss'>
	.banner {
		z-index: 88;
		position: fixed;
		bottom: var(--window-bottom);
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
		width: 100%;
		height: 120upx;
		padding: 0 30upx;
		background: $font-color-dark;
		opacity: 0.9;
		border-radius: 5px 5px 0 0;
		.desc{
			flex: 1;
			width: 60%;
			color: #ffffff;
			font-size: $font-lg;
			margin-right: auto;
		}
		.btn{
			width: 200upx;
		}
	}
	
	
</style>
