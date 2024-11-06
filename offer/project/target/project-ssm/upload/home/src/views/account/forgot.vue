<template>
	<div class="page_account forgot" id="account_forgot">
		<div class="warp forgot_warp">
			<div class="container">
				<div class="row row_forgot">
							<div class="t-box">
								<span></span>
								<span></span>
								<span></span>
							</div>
							<!-- 忘记密码 -->
							<div class="forget_container">
								<div class="form_box">
								<b-form class="forms">
									<b-form-group id="input-group-1" label="用户名:" label-for="input-1"
										:state="validation_username" invalid-feedback="账户名长度为在5-16个字符"
										valid-feedback="校验通过">
										<b-form-input id="input-1" v-model="form.username" type="text" placeholder="用户名"
											trim></b-form-input>
									</b-form-group>

									<b-form-group id="input-group-2" label="密码:" label-for="input-2"
										:state="validation_password" invalid-feedback="密码长度为在5-16个字符"
										valid-feedback="校验通过">
										<b-form-input id="input-2" v-model="form.password" type="password"
											placeholder="密码" trim></b-form-input>
									</b-form-group>

									<b-form-group id="input-group-2" label="确认密码:" label-for="input-2"
										:state="validation_confirm_password" invalid-feedback="两次密码不一致"
										valid-feedback="校验通过">
										<b-form-input id="input-2" v-model="confirm_password" type="password"
											placeholder="密码" trim></b-form-input>
									</b-form-group>
									<b-form-group id="input-group-2" label="邮箱:" label-for="input-2"
										:state="validation_email" invalid-feedback="邮箱格式example@123.com"
										valid-feedback="">
										<b-form-input id="input-2" v-model="form.email" type="email" placeholder="邮箱"
											trim></b-form-input>
									</b-form-group>

									<b-form-group id="input-group-2" label="验证码:" label-for="input-2"
										:state="validation_code" invalid-feedback="验证码错误">
										<b-input-group>
											<b-form-input id="input-2" v-model="form.code" type="text" placeholder="验证码"
												trim>
											</b-form-input>
											<b-input-group-append>
												<b-button @click="get_code()" variant="success" class="btn"  :style="{ paddingTop: '2px !important' }">
													<span>发送验证码</span></b-button>
											</b-input-group-append>
										</b-input-group>
									</b-form-group>
									
									
								</b-form>
								<div class="btns_bottom fg_bt">
										<button class="btn_item btn" @click="forgot()">找回密码</button>
										<button class="btn_login btn" @click="$router.push('/account/login')">
											<span>返回登录</span>
										</button>
																				
																		</div>
							</div>
								
							</div>
							<div class="b-box">
								<span></span>
								<span></span>
								<span></span>
							</div>

					

				</div>
			</div>
		</div>
	</div>
</template>


<script>
	export default {
		data() {
			return {
				form: {
					username: "",
					password: "",
					email: "",
					code: "",
				},
				confirm_password: "",
			};
		},
		onLoad() {},
		onReady() {},
		methods: {
			get_code(){
				var random = Math.floor(Math.random()*9999);
				for(var i = random.length;i < 4;i++){
					random = "0" + random;
				}
				this.form.code = random.toString();
			},

			/**
			 * 忘记密码
			 */
			forgot() {
				var condition =
					this.validation_username &&
					this.validation_password &&
					this.validation_confirm_password &&
					this.validation_email &&
					this.validation_code;
				if (!condition) {
          this.$toast("输入不合法","error");
					return;
				}
				var form = Object.assign({},this.form);
				this.$post("~/api/user/forget_password?", form, (res) => {
					if (res.result) {
						this.$router.push("/account/login");
					} else if (res.error) {
						console.log(res.error);
            this.$toast(res.error.message,"error");
					}
				});
			},

			/**
			 * 手动重置表单
			 */
			resetForm() {
				this.$refs.form.resetFields();
			},
		},
		computed: {
			/**
			 * 验证用户名
			 * @return {Boolean}
			 */
			validation_username() {
				var length = this.form.username.length;
				if (!length) {
					return null;
				}
				return length > 4 && length < 17;
			},

			/**
			 * 验证密码
			 * @return {Boolean}
			 */
			validation_password() {
				var length = this.form.password.length;
				if (!length) {
					return null;
				}
				return length > 4 && length < 17;
			},

			/**
			 * 再次验证密码
			 * @return {Boolean}
			 */
			validation_confirm_password() {
				var length = this.confirm_password.length;
				if (!length) {
					return null;
				}
				return this.confirm_password === this.form.password;
			},

			/**
			 * 验证邮箱
			 * @return {Boolean}
			 */
			validation_email() {
				var length = this.form.email.length;
				if (!length) {
					return true;
				}
				return length > 4 && length < 17;
			},

			/**
			 * 验证验证码
			 * @return {Boolean}
			 */
			validation_code() {
				var length = this.form.code.length;
				if (!length) {
					return null;
				}
				return length === 4;
			},
		},
	};
</script>

<style scoped>


	.page_account {
		min-height: 800px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.flex_cc {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.forget_container {
		padding: 1rem;
	
	}

	.more_nav {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		padding: 1rem;
		margin: auto 0;
	}

	.more_nav .btns_bottom {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.btn_item {
		cursor: pointer;
		width: 50%;
	
		color: #fff;
		text-align: center;
	
		
	}

	.forgot_nav {
		width:50%;
		cursor: pointer;
	}
</style>
