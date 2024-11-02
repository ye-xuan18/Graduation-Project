<template>
	<el-main class="bg edit_wrap comtable_e">
		<el-form ref="form" :model="form" status-icon label-width="120px" v-if="is_view()">
		<el-row class="row_ce"> 
							<el-col v-if="user_group === '管理员' || $check_field('get','enterprise_users') || $check_field('add','enterprise_users') || $check_field('set','enterprise_users')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="企业用户" prop="enterprise_users">
																		<div v-if="user_group !== '管理员'">
							{{ get_user_session_enterprise_users(form['enterprise_users']) }}
							<!--<el-input id="business_name" v-model="form['enterprise_users']" placeholder="请输入企业用户"-->
							<!--v-if="user_group === '管理员' || (form['recruitment_information_id'] && $check_field('set','enterprise_users')) || (!form['recruitment_information_id'] && $check_field('add','enterprise_users'))" :disabled="disabledObj['enterprise_users_isDisabled']"></el-input>-->
							<!--<div v-else-if="$check_field('get','enterprise_users')">{{form['enterprise_users']}}</div>-->
							<el-select v-if="user_group === '管理员' || (form['recruitment_information_id'] && $check_field('set','enterprise_users')) || (!form['recruitment_information_id'] && $check_field('add','enterprise_users'))" id="enterprise_users" v-model="form['enterprise_users']" :disabled="disabledObj['enterprise_users_isDisabled']">
								<el-option v-for="o in list_user_enterprise_users" :key="o['username']" :label="o['nickname'] + '-' + o['username']"
										   :value="o['user_id']">
								</el-option>
							</el-select>
							<el-select v-else-if="$check_field('get','enterprise_users')" id="enterprise_users" v-model="form['enterprise_users']" :disabled="true">
								<el-option v-for="o in list_user_enterprise_users" :key="o['username']" :label="o['nickname'] + '-' + o['username']"
										   :value="o['user_id']">
								</el-option>
							</el-select>
						</div>
						<el-select v-else id="enterprise_users" v-model="form['enterprise_users']" :disabled="disabledObj['enterprise_users_isDisabled']">
							<el-option v-for="o in list_user_enterprise_users" :key="o['username']" :label="o['nickname'] + '-' + o['username']"
									   :value="o['user_id']">
							</el-option>
						</el-select>
																</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','enterprise_id') || $check_field('add','enterprise_id') || $check_field('set','enterprise_id')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="企业编号" prop="enterprise_id">
												<el-input id="enterprise_id" v-model="form['enterprise_id']" placeholder="请输入企业编号"
							  v-if="user_group === '管理员' || (form['recruitment_information_id'] && $check_field('set','enterprise_id')) || (!form['recruitment_information_id'] && $check_field('add','enterprise_id'))" :disabled="disabledObj['enterprise_id_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','enterprise_id')">{{form['enterprise_id']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','enterprise_name') || $check_field('add','enterprise_name') || $check_field('set','enterprise_name')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="企业名称" prop="enterprise_name">
												<el-input id="enterprise_name" v-model="form['enterprise_name']" placeholder="请输入企业名称"
							  v-if="user_group === '管理员' || (form['recruitment_information_id'] && $check_field('set','enterprise_name')) || (!form['recruitment_information_id'] && $check_field('add','enterprise_name'))" :disabled="disabledObj['enterprise_name_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','enterprise_name')">{{form['enterprise_name']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','personnel_name') || $check_field('add','personnel_name') || $check_field('set','personnel_name')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="人事姓名" prop="personnel_name">
												<el-input id="personnel_name" v-model="form['personnel_name']" placeholder="请输入人事姓名"
							  v-if="user_group === '管理员' || (form['recruitment_information_id'] && $check_field('set','personnel_name')) || (!form['recruitment_information_id'] && $check_field('add','personnel_name'))" :disabled="disabledObj['personnel_name_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','personnel_name')">{{form['personnel_name']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','enterprise_phone_number') || $check_field('add','enterprise_phone_number') || $check_field('set','enterprise_phone_number')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="企业电话" prop="enterprise_phone_number">
												<el-input id="enterprise_phone_number" v-model="form['enterprise_phone_number']" placeholder="请输入企业电话"
							  v-if="user_group === '管理员' || (form['recruitment_information_id'] && $check_field('set','enterprise_phone_number')) || (!form['recruitment_information_id'] && $check_field('add','enterprise_phone_number'))" :disabled="disabledObj['enterprise_phone_number_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','enterprise_phone_number')">{{form['enterprise_phone_number']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','office_environment') || $check_field('add','office_environment') || $check_field('set','office_environment')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="办公环境" prop="office_environment">
								<el-upload :disabled="disabledObj['office_environment_isDisabled']" id="office_environment" class="avatar-uploader" drag
						accept="image/gif, image/jpeg, image/png, image/jpg" action="" :http-request="upload_office_environment"
						:show-file-list="false" v-if="user_group === '管理员' || (form['recruitment_information_id'] && $check_field('set','office_environment')) || (!form['recruitment_information_id'] && $check_field('add','office_environment'))">
						<img v-if="form['office_environment']" :src="$fullUrl(form['office_environment'])" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
					<el-image v-else-if="$check_field('get','office_environment')" style="width: 100px; height: 100px"
						:src="$fullUrl(form['office_environment'])" :preview-src-list="[$fullUrl(form['office_environment'])]">
						<div slot="error" class="image-slot">
							<img src="../../../public/img/error.png" style="width: 90px; height: 90px" />
						</div>
					</el-image>
							</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','recruitment_positions') || $check_field('add','recruitment_positions') || $check_field('set','recruitment_positions')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="招聘职位" prop="recruitment_positions">
												<el-input id="recruitment_positions" v-model="form['recruitment_positions']" placeholder="请输入招聘职位"
							  v-if="user_group === '管理员' || (form['recruitment_information_id'] && $check_field('set','recruitment_positions')) || (!form['recruitment_information_id'] && $check_field('add','recruitment_positions'))" :disabled="disabledObj['recruitment_positions_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','recruitment_positions')">{{form['recruitment_positions']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','job_classification') || $check_field('add','job_classification') || $check_field('set','job_classification')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="职位分类" prop="job_classification">
								<el-select id="job_classification" v-model="form['job_classification']"						v-if="user_group === '管理员' || (form['recruitment_information_id'] && $check_field('set','job_classification')) || (!form['recruitment_information_id'] && $check_field('add','job_classification'))">
						<el-option v-for="o in list_job_classification" :key="o['job_classification']" :label="o['job_classification']"
							:value="o['job_classification']">
						</el-option>
					</el-select>
					<div v-else-if="$check_field('get','job_classification')">{{form['job_classification']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','work_city') || $check_field('add','work_city') || $check_field('set','work_city')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="工作城市" prop="work_city">
												<el-input id="work_city" v-model="form['work_city']" placeholder="请输入工作城市"
							  v-if="user_group === '管理员' || (form['recruitment_information_id'] && $check_field('set','work_city')) || (!form['recruitment_information_id'] && $check_field('add','work_city'))" :disabled="disabledObj['work_city_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','work_city')">{{form['work_city']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','educational_requirements') || $check_field('add','educational_requirements') || $check_field('set','educational_requirements')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="学历要求" prop="educational_requirements">
								<el-select id="educational_requirements" v-model="form['educational_requirements']"
						v-if="user_group === '管理员' || (form['recruitment_information_id'] && $check_field('set','educational_requirements')) || (!form['recruitment_information_id'] && $check_field('add','educational_requirements'))">
						<el-option v-for="o in list_educational_requirements" :key="o" :label="o" :value="o">
						</el-option>
					</el-select>
					<div v-else-if="$check_field('get','educational_requirements')">{{form['educational_requirements']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','job_requirements') || $check_field('add','job_requirements') || $check_field('set','job_requirements')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="岗位要求" prop="job_requirements">
								<el-input type="textarea" id="job_requirements" v-model="form['job_requirements']" placeholder="请输入岗位要求"
						v-if="user_group === '管理员' || (form['recruitment_information_id'] && $check_field('set','job_requirements')) || (!form['recruitment_information_id'] && $check_field('add','job_requirements'))" :disabled="disabledObj['job_requirements_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','job_requirements')">{{form['job_requirements']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','salary_and_benefits') || $check_field('add','salary_and_benefits') || $check_field('set','salary_and_benefits')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="薪资福利" prop="salary_and_benefits">
								<el-input type="textarea" id="salary_and_benefits" v-model="form['salary_and_benefits']" placeholder="请输入薪资福利"
						v-if="user_group === '管理员' || (form['recruitment_information_id'] && $check_field('set','salary_and_benefits')) || (!form['recruitment_information_id'] && $check_field('add','salary_and_benefits'))" :disabled="disabledObj['salary_and_benefits_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','salary_and_benefits')">{{form['salary_and_benefits']}}</div>
							</el-form-item>
			</el-col>
					
	
	
	
	
	
	
		</el-row>
			<el-col :xs="24" :sm="12" :lg="8" class="el_form_btn_warp">
				<el-form-item v-if="$check_action('/recruitment_information/view','set') || $check_action('/recruitment_information/view','add') || $check_option('/recruitment_information/table','examine')">
					<el-button type="primary" @click="submit()">提交</el-button>
					<el-button @click="cancel()">取消</el-button>
				</el-form-item>
				<el-form-item v-else>
					<el-button @click="cancel()">返回</el-button>
				</el-form-item>
			</el-col>

		</el-form>
	</el-main>
</template>

<script>
	import mixin from "@/mixins/page.js";

	export default {
		mixins: [mixin],
		data() {
			return {
				field: "recruitment_information_id",
				url_add: "~/api/recruitment_information/add?",
				url_set: "~/api/recruitment_information/set?",
				url_get_obj: "~/api/recruitment_information/get_obj?",
				url_upload: "~/api/recruitment_information/upload?",

				query: {
					"recruitment_information_id": 0,
				},

				form: {
								"enterprise_users": 0, // 企业用户
										"enterprise_id":  '', // 企业编号
										"enterprise_name":  '', // 企业名称
										"personnel_name":  '', // 人事姓名
										"enterprise_phone_number":  '', // 企业电话
										"office_environment":  '', // 办公环境
										"recruitment_positions":  '', // 招聘职位
										"job_classification":  '', // 职位分类
										"work_city":  '', // 工作城市
										"educational_requirements":  '', // 学历要求
										"job_requirements":  '', // 岗位要求
										"salary_and_benefits":  '', // 薪资福利
											"recruitment_information_id": 0, // ID
						
				},
				disabledObj:{
								"enterprise_users_isDisabled": false,
										"enterprise_id_isDisabled": false,
										"enterprise_name_isDisabled": false,
										"personnel_name_isDisabled": false,
										"enterprise_phone_number_isDisabled": false,
										"office_environment_isDisabled": false,
										"recruitment_positions_isDisabled": false,
										"job_classification_isDisabled": false,
										"work_city_isDisabled": false,
										"educational_requirements_isDisabled": false,
										"job_requirements_isDisabled": false,
										"salary_and_benefits_isDisabled": false,
										},

	
					// 用户列表
				list_user_enterprise_users: [],
						// 用户组
				group_user_enterprise_users: "",
				
		
		
		
		
		
								// 职位分类选项列表
				list_job_classification: [""],
	
		
								// 学历要求选项列表
				list_educational_requirements: ['大专','本科','硕士','博士','其他'],
	
		
		
	
			}
		},
		methods: {


	
	
				/**
			 * 获取企业用户用户列表
			 */
			async get_list_user_enterprise_users() {
                // if(this.user_group !== "管理员" && this.form["enterprise_users"] === 0) {
                //     this.form["enterprise_users"] = this.user.user_id;
                // }
                var json = await this.$get("~/api/user/get_list?user_group=企业用户");
                if(json.result && json.result.list){
                    this.list_user_enterprise_users = json.result.list;
                }
                else if(json.error){
                    console.error(json.error);
                }
			},
					/**
			 * 获取企业用户用户组
			 */
			async get_group_user_enterprise_users() {
							this.form["enterprise_users"] = this.user.user_id;
							var json = await this.$get("~/api/user_group/get_obj?name=企业用户");
				if(json.result && json.result.obj){
					this.group_user_enterprise_users = json.result.obj;
				}
				else if(json.error){
					console.error(json.error);
				}
			},
			get_user_session_enterprise_users(id){
				var _this = this;
				var user_id = {"user_id":id}
				var url = "~/api/"+_this.group_user_enterprise_users.source_table+"/get_obj?"
				this.$get(url, user_id, function(res) {
					if (res.result && res.result.obj) {
						var arr = []
						for (let key in res.result.obj) {
							arr.push(key)
						}
						var arrForm = []
									for (let key in _this.form) {
							arrForm.push(key)
						}
												_this.form["enterprise_users"] = id
									_this.disabledObj['enterprise_users' + '_isDisabled'] = true
						for (var i=0;i<arr.length;i++){
						  if (arr[i]!=='examine_state' && arr[i]!=='examine_reply') {
							for (var j = 0; j < arrForm.length; j++) {
							  if (arr[i] === arrForm[j]) {
								if (arr[i] !== "enterprise_users") {
			                      _this.form[arrForm[j]] = res.result.obj[arr[i]]
			                      _this.disabledObj[arrForm[j] + '_isDisabled'] = true
								  break;
								} else {
								  _this.disabledObj[arrForm[j] + '_isDisabled'] = true
								}
							  }
							}
						  }
						}
					}
				});
			},
					get_user_enterprise_users(id){
				var obj = this.list_user_enterprise_users.getObj({"user_id":id});
				var ret = "";
				if(obj){
					if(obj.nickname){
						ret = obj.nickname;}
					else{
						ret = obj.username;
					}
				}
				return ret;
			},
			
	
			
	
			
	
			
	
						/**
			 * 上传办公环境
			 * @param {Object} param 图片参数
			 */
			upload_office_environment(param){
						this.uploadFile(param.file, "office_environment");
					},
	
	
			
	
			
				/**
			 * 获取职位分类列表
			 */
			async get_list_job_classification() {
				var json = await this.$get("~/api/job_classification/get_list?");
				if(json.result && json.result.list){
					this.list_job_classification = json.result.list;
				}
				else if(json.error){
					console.error(json.error);
				}
			},
					
			
	
			
	
			
	
			
	
		
			/**
			 * 获取对象之前
			 * @param {Object} param
			 */
			get_obj_before(param) {
				var form = "";
																
				if(this.form && form){
					Object.keys(this.form).forEach(key => {
						Object.keys(form).forEach(dbKey => {
							// if(dbKey === "charging_standard"){
							// 	this.form['charging_rules'] = form[dbKey];
							// 	this.disabledObj['charging_rules_isDisabled'] = true;
							// };
							if(key === dbKey){
								this.disabledObj[key+'_isDisabled'] = true;
							}
						})
					})
				}
																												$.db.del("form");

				return param;
			},

			/**
			 * 获取对象之后
			 * @param {Object} json
			 * @param {Object} func
			 */
			get_obj_after(json, func){
																																																

			},

			/**
			 * 提交前验证事件
			 * @param {Object} 请求参数
			 * @return {String} 验证成功返回null, 失败返回错误提示
			 */
			submit_check(param) {
																																																																																																																		return null;
			},

			is_view(){
				var bl = this.user_group == "管理员";

				if(!bl){
					bl = this.$check_action('/recruitment_information/table','add');
					console.log(bl ? "你有表格添加权限视作有添加权限" : "你没有表格添加权限");
				}
				if(!bl){
					bl = this.$check_action('/recruitment_information/table','set');
					console.log(bl ? "你有表格添加权限视作有修改权限" : "你没有表格修改权限");
				}
				if(!bl){
					bl = this.$check_action('/recruitment_information/view','add');
					console.log(bl ? "你有视图添加权限视作有添加权限" : "你没有视图添加权限");
				}
				if(!bl){
					bl = this.$check_action('/recruitment_information/view','set');
					console.log(bl ? "你有视图修改权限视作有修改权限" : "你没有视图修改权限");
				}
				if(!bl){
					bl = this.$check_action('/recruitment_information/view','get');
					console.log(bl ? "你有视图查询权限视作有查询权限" : "你没有视图查询权限");
				}

				console.log(bl ? "具有当前页面的查看权，请注意这不代表你有字段的查看权" : "无权查看当前页，请注意即便有字段查询权限没有页面查询权限也不行");

				return bl;
			},
			/**
			 * 上传文件
			 * @param {Object} param
			 */
			uploadimg(param) {
				this.uploadFile(param.file, "avatar");
			},

		},
		created() {
					this.get_list_user_enterprise_users();
					this.get_group_user_enterprise_users();
																			this.get_list_job_classification();
												},
	}
</script>

<style>
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}

	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}




</style>
