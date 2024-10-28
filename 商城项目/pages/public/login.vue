<template>
	<!-- #ifdef MP-WEIXIN -->
	<view class="container">
		<view class="wrapper">
			<view class="welcome">
				欢迎使用{{applicationConfig.applicationName}}
			</view>
			<view class="wrapper">
				<view class="application-logo">
					<image :src="applicationConfig.applicationLogo" mode="aspectFill"></image>
				</view>
				<view class="application-name">
					{{applicationConfig.applicationDesc}}
				</view>
			</view>
			<button class="button-base" @click="getuserinfo">快捷登录</button>
		</view>
		<view class="privacy">
			<checkbox-group @change="changeCheckbox">
				<label>
					<checkbox value="privacy" />
					<text>我已阅读并同意</text>
					<!-- <uni-link color="#ff0000" showUnderLine="false" font-size="12" :href="customerAgreementUrl" :text="customerAgreementText">
					</uni-link>
					<text>和</text>
					<uni-link color="#ff0000" showUnderLine="false" font-size="12" :href="privacyPolicyUrl" :text="privacyPolicyText">
					</uni-link> -->
					<text class="link" @click="navWebView(customerAgreementUrl)">{{customerAgreementText}}</text>
					<text>和</text>
					<text class="link" @click="navWebView(privacyPolicyUrl)">{{privacyPolicyText}}</text>
				</label>
			</checkbox-group>
		</view>
		<uni-popup ref="phoneNumberPopup" :mask-click="true">
			<view class="popup-wrapper">
				<view class="title">
					<text>为了你有更加顺畅的购物体验，请先设置手机号码!</text>
				</view>
				<view class="btn">
					<button class="button-base" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">获取本机手机号码</button>
				</view>
				<view class="btn">
					<button class="button-base-outline" @click="setPhoneNumber">使用其他电话号码</button>
				</view>
			</view>
		</uni-popup>
	</view>
	<!-- #endif -->
	<!-- #ifndef MP-WEIXIN -->
	<view class="container">
		<view class="wrapper">
			<view class="welcome">
				欢迎使用{{applicationConfig.applicationName}}
			</view>
			<view class="input-content">
				<view class="input-item">
					<text class="tit">手机号码</text>
					<input 
						type="number" 
						:value="mobile" 
						placeholder="请输入手机号码"
						maxlength="11"
						data-key="mobile"
						@input="inputChange"
					/>
				</view>
				<view class="input-item">
					<text class="tit">密码</text>
					<input 
						type="mobile" 
						value="" 
						placeholder="8-20位字母数字下划线组合"
						placeholder-class="input-empty"
						maxlength="20"
						password 
						data-key="password"
						@input="inputChange"
						@confirm="toLogin"
					/>
				</view>
			</view>
			<button class="button-base" @click="toLogin" :disabled="logining">登录</button>
			<view class="privacy">
				<checkbox-group @change="changeCheckbox">
					<label>
						<checkbox value="privacy" />
						<text>我已阅读并同意</text>
						<!-- <uni-link color="#ff0000" showUnderLine="false" font-size="12" :href="customerAgreementUrl" :text="customerAgreementText">
						</uni-link>
						<text>和</text>
						<uni-link color="#ff0000" showUnderLine="false" font-size="12" :href="privacyPolicyUrl" :text="privacyPolicyText">
						</uni-link> -->
						<text class="link" @click="navWebView(customerAgreementUrl)">{{customerAgreementText}}</text>
						<text>和</text>
						<text class="link" @click="navWebView(privacyPolicyUrl)">{{privacyPolicyText}}</text>
					</label>
				</checkbox-group>
			</text>
				
			</view>
			<view class="forget-section" @click="toForgetPassword">
				忘记密码?
			</view>
		</view>
		<view class="register-section" v-if="applicationConfig.applicationPublicRegisterEnabled">
			还没有账号?
			<text @click="toRegister">马上注册</text>
		</view>
	</view>
	<!-- #endif -->
</template>

<script>
	import uniLink from "@/components/uni-link/uni-link.vue"
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import {  
		mapState,
        mapMutations  
    } from 'vuex';
	
	export default{
		data(){
			return {
				mobile: '',
				password: '',
				logining: false,
				to: '',
				wechatUserInfo:{},
				userInfo:{},
				encryptedData:'',
				iv:'',
				privacyCheckboxChecked:false,
				privacyPolicyText:'',
				privacyPolicyUrl:'',
				customerAgreementText:'',
				customerAgreementUrl:''
			}
		},
		components: {uniLink,uniPopup},
		onLoad(options){
			var to = options.to
			if(to){
				this.to = unescape(to);
			}
			this.customerAgreementText = '<<'+this.applicationConfig.applicationName+'用户协议'+'>>';
			this.privacyPolicyText = '<<'+this.applicationConfig.applicationName+'隐私政策'+'>>';
			/* this.privacyPolicyUrl = "https://mp.weixin.qq.com/s?__biz=MzA3NDMwMDQ2OA==&mid=2247483728&idx=1&sn=5bbb374db5a9733c019ffdf885c517f3&chksm=9f00ac0ba877251db3018c0b081a59a2209801db1746149934118cd1692fe75170364b9bb087&token=496361&lang=zh_CN#rd";
			this.customerAgreementUrl = "https://mp.weixin.qq.com/s?__biz=MzA3NDMwMDQ2OA==&mid=2247483730&idx=1&sn=fabc99f818a00e520889d0f3795a97f7&chksm=9f00ac09a877251f3ba913d83fee5c00fc35e670b3bb83db05e5da9646ef9e4e9255a2f3655e&token=496361&lang=zh_CN#rd"; */
			this.inquiryCustomerAgreement();
			this.inquiryPrivacyPolicy();
		},
		computed: {
			...mapState(['applicationConfig','hasMerchant','merchantInfo'])
		},
		methods: {
			...mapMutations(['login']),
			openPopup(refName){
				this.$refs[refName].open('center');
			},
			closePopup(refName){
				this.$refs[refName].close();
			},
			setPhoneNumber(){
				this.closePopup('phoneNumberPopup');
				uni.navigateTo({
					url: '/pages/public/bindMobileNo?to='+escape(this.to) 
				})
			},
			navTo(targetUrl){
				uni.navigateTo({
					url:targetUrl
				})
			},
			changeCheckbox(e){
				let array = e.detail.value;
				if(array.length > 0)
					this.privacyCheckboxChecked = true;
				else
					this.privacyCheckboxChecked = false;
			},
			//微信小程序用户授权
			getuserinfo(e){
				if(!this.checkPrivecy()){
					return;
				}
				let that = this;
				uni.getUserProfile({
					lang:'zh_CN',
					desc:'微信登录',
					success:(res)=>{
						console.log(res);
						that.wechatUserInfo = res.userInfo;
						that.encryptedData = res.encryptedData;
						that.iv = res.iv;
						uni.login({
							provider: 'weixin',
							success: function(res) {
								console.log('code: '+res.code);
								that.wechatUserInfo.code = res.code;
								var requestData = {
									verifyType: 'WECHAT'
								};
								that.populateWechatUserInfo(requestData);
								that.$api.request.login(requestData, loginRes => {
									if (loginRes.body.status.statusCode === '0') {
										var tokenId = loginRes.header.tokenId;
										uni.setStorageSync('userToken', tokenId);
										that.userInfo = loginRes.body.data;
										that.login(loginRes.body.data);	//将用户信息保存在本地
										//设置手机号码
										that.openPopup('phoneNumberPopup');
									} else {
										that.$api.msg(loginRes.body.status.errorDesc);
										that.logining = false;
									}
								});
							}
						});
					},
					fail:(res)=>{
						console.log(res)
					}
				});
			},
			getPhoneNumber(e){
				let code = e.detail.code;
				//用户同意获取手机号码
				if(code)
					this.getWechatPhoneNumber(code);
			},
			//通过code在后台获取到手机号码
			getWechatPhoneNumber(code){
				this.$api.request.wechatPhoneNumber({
					code: code
				}, resetRes => {
					if (resetRes.body.status.statusCode === '0') {
						var data = resetRes.body.data;
						//更新手机号码到后台
						this.updateUserPersonalPhone(data.personalPhone,data.personalPhoneCountryCode);
					} else {
						this.$api.msg(resetRes.body.status.errorDesc);
					}
				},false);
			},
			
			updateUserPersonalPhone(personalPhone,countryCode){
				this.$api.request.editInfo({
					actionType: 'PERSONALPHONE',
					personalPhone: personalPhone,
					personalPhoneCountryCode: countryCode
				}, resetRes => {
					if (resetRes.body.status.statusCode === '0') {
						//同步更新后的用户数据
						this.syncUserInfo(function(){
							
						});
						//关闭弹出框
						this.closePopup('phoneNumberPopup');
						//页面跳转
						this.loginRedirect();
					} else {
						this.$api.msg(resetRes.body.status.errorDesc);
					}
				});
			},
			inquiryCustomerAgreement() {
				this.$api.request.getParameter({
					name: 'CUSTOMER_AGREEMENT'
				}, res => {
					if (res.body.status.statusCode === '0') {
						if(res.body.data){
							this.customerAgreementUrl = res.body.data.value;
						}
					} else {
						console.log(res.body.status.errorDesc);
					}
				});
			},
			inquiryPrivacyPolicy() {
				this.$api.request.getParameter({
					name: 'PRIVACY_POLICY'
				}, res => {
					if (res.body.status.statusCode === '0') {
						if(res.body.data){
							this.privacyPolicyUrl = res.body.data.value;
						}
					} else {
						console.log(res.body.status.errorDesc);
					}
				});
			},
			loginRedirect(){
				var that = this;
				if(that.to){
					uni.navigateTo({
						url: that.to
					})
				}else{
					uni.switchTab({
						url: '/pages/index/index'
					})
				}
			},
			populateWechatUserInfo(requestData){
				requestData.code = this.wechatUserInfo.code;
				requestData.name = this.wechatUserInfo.nickName;
				requestData.photoUrl = this.wechatUserInfo.avatarUrl;
				let sex = '未知';
				if(this.wechatUserInfo.gender===1)
					sex = '男';
				else if(this.wechatUserInfo.gender===2)
					sex = '女';
				requestData.sex = sex;
				requestData.encryptedData = this.encryptedData;
				requestData.iv = this.iv;
			},
			inputChange(e){
				const key = e.currentTarget.dataset.key;
				this[key] = e.detail.value;
			},
			navBack(){
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			toRegister(){
				uni.navigateTo({
					url:'/pages/public/register?to='+escape(this.to)
				})
			},
			toForgetPassword(){
				uni.navigateTo({
					url:'/pages/public/forgetPassword'
				})
			},
			checkPrivecy(){
				if(this.privacyCheckboxChecked)
					return true;
				else{
					uni.showToast({
						icon: 'none',
						title:'请先同意隐私政策和用户协议'
					});
					return false;
				}
			},
			toLogin(){
				if(!this.checkPrivecy()){
					return;
				}
				this.logining = true;
				const {mobile, password} = this;
				var isFormValid = true;
				if (!this.$api.util.validateMobileNo(mobile)) {
					this.$api.msg('手机号码格式错误');
					isFormValid = false;
				} else if (!this.$api.util.validatePassword(password)) {
					this.$api.msg('密码为8-20位字母数字下划线组合');
					isFormValid = false;
				}
				if (!isFormValid) {
					this.logining = false;
					return;
				}
				this.$api.request.login({
					verifyType: 'PASSWORD',
					personalPhone: mobile,
					personalPhoneCountryCode: '86',
					password: password
				}, loginRes => {
					if (loginRes.body.status.statusCode === '0') {
						var tokenId = loginRes.header.tokenId;
						uni.setStorageSync('userToken', tokenId);
						this.login(loginRes.body.data);	//将用户信息保存起来
						this.loginRedirect();
					} else {
						this.$api.msg(loginRes.body.status.errorDesc);
						this.logining = false;
					}
				});
			},
			syncUserInfo(callback) {
				this.$api.request.userInfo({
					userUuid: this.userInfo.userUuid
				}, res => {
					if (res.body.status.statusCode === '0') {
						this.login(res.body.data);
					}
					if(callback) callback();
				});
			},
			navWebView(url){
				uni.navigateTo({
					url:'/pages/content/webView?src='+encodeURIComponent(url)
				})
			}
		},

	}
</script>

<style lang='scss'>
	page{
		background: #fff;
	}
	.container{
		padding-top: 100px;
		position:relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background: #fff;
	}
	.wrapper{
		position:relative;
		z-index: 90;
		background: #fff;
		padding-bottom: 40upx;
		padding: 0 50upx 50upx 50upx;
	}
	.back-btn{
		position:absolute;
		left: 40upx;
		z-index: 9999;
		padding-top: var(--status-bar-height);
		top: 40upx;
		font-size: 40upx;
		color: $font-color-dark;
	}
	.application-logo{
		text-align: center;
		image{
			width: 200upx;
			height: 200upx;
		}
	}
	.application-name{
		margin-top: 20upx;
		text-align: center;
		color: $font-color-base;
	}
	.welcome{
		position:relative;
		text-align: center;
		top: -90upx;
		font-size: 46upx;
		color: $font-color-base;
		text-shadow: 1px 0px 1px rgba(0,0,0,.3);
	}
	.input-item{
		display:flex;
		flex-direction: column;
		align-items:flex-start;
		justify-content: center;
		padding: 0 30upx;
		background:$page-color-light;
		height: 120upx;
		border-radius: 4px;
		margin-bottom: 50upx;
		&:last-child{
			margin-bottom: 0;
		}
		.tit{
			height: 50upx;
			line-height: 56upx;
			font-size: $font-sm+2upx;
			color: $font-color-base;
		}
		input{
			height: 60upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			width: 100%;
		}	
	}

	.forget-section{
		font-size: $font-sm+2upx;
		color: $font-color-dark;
		text-align: center;
		margin-top: 40upx;
		text-decoration:underline;
	}
	.register-section{
		position:absolute;
		left: 0;
		bottom: 50upx;
		width: 100%;
		font-size: $font-sm+2upx;
		color: $font-color-base;
		text-align: center;
		text{
			color: $font-color-dark;
			margin-left: 10upx;
			text-decoration:underline;
		}
	}
	.privacy{
		margin: 40upx;
		font-size: $font-base;
		line-height: 70upx;
		.link{
			color: $base-color;
			text-decoration:none;
		}
	}
	.button-base{
		margin-top: 50upx;
	}
	.button-base-outline{
		margin-top: 50upx;
	}
	.popup-wrapper{
		background: #fff;
		border-radius: 20px;
		margin: 40upx;
		padding: 40upx;
		.title{
			margin:40upx;
			font-size:$font-lg;
			color: $font-color-dark;
		}
		.btn{
			margin:40upx;
			.button-base{
				height: 110upx;
				border-radius: 100px;
				background: $uni-color-primary;
				color: #fff;
				padding: 16upx 20upx;
				text-align: center;
				&:hover{
					opacity: 0.5;
				}
			}
			.button-base-outline{
				height: 110upx;
				border-radius: 100px;
				background: transparent;
				border: 1px solid $uni-color-primary;
				color: $base-color;
				padding: 16upx 20upx;
				text-align: center;
				&:hover{
					background: $uni-color-primary;
					opacity: 0.5;
					color: #fff;
					border:none;
				}
			}
		}
		
	}
</style>
