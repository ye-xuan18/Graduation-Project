<template>
	<el-main class="bg edit_wrap comtable_e">
		<el-form ref="form" :model="form" status-icon label-width="120px" v-if="is_view()">
		<el-row class="row_ce"> 
							<el-col v-if="user_group === '管理员' || $check_field('get','enterprise_users') || $check_field('add','enterprise_users') || $check_field('set','enterprise_users')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="企业用户" prop="enterprise_users">
																		<div v-if="user_group !== '管理员'">
							{{ get_user_session_enterprise_users(form['enterprise_users']) }}
							<!--<el-input id="business_name" v-model="form['enterprise_users']" placeholder="请输入企业用户"-->
							<!--v-if="user_group === '管理员' || (form['interview_notification_id'] && $check_field('set','enterprise_users')) || (!form['interview_notification_id'] && $check_field('add','enterprise_users'))" :disabled="disabledObj['enterprise_users_isDisabled']"></el-input>-->
							<!--<div v-else-if="$check_field('get','enterprise_users')">{{form['enterprise_users']}}</div>-->
							<el-select v-if="user_group === '管理员' || (form['interview_notification_id'] && $check_field('set','enterprise_users')) || (!form['interview_notification_id'] && $check_field('add','enterprise_users'))" id="enterprise_users" v-model="form['enterprise_users']" :disabled="disabledObj['enterprise_users_isDisabled']">
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
							  v-if="user_group === '管理员' || (form['interview_notification_id'] && $check_field('set','enterprise_id')) || (!form['interview_notification_id'] && $check_field('add','enterprise_id'))" :disabled="disabledObj['enterprise_id_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','enterprise_id')">{{form['enterprise_id']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','enterprise_name') || $check_field('add','enterprise_name') || $check_field('set','enterprise_name')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="企业名称" prop="enterprise_name">
												<el-input id="enterprise_name" v-model="form['enterprise_name']" placeholder="请输入企业名称"
							  v-if="user_group === '管理员' || (form['interview_notification_id'] && $check_field('set','enterprise_name')) || (!form['interview_notification_id'] && $check_field('add','enterprise_name'))" :disabled="disabledObj['enterprise_name_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','enterprise_name')">{{form['enterprise_name']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','personnel_name') || $check_field('add','personnel_name') || $check_field('set','personnel_name')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="人事姓名" prop="personnel_name">
												<el-input id="personnel_name" v-model="form['personnel_name']" placeholder="请输入人事姓名"
							  v-if="user_group === '管理员' || (form['interview_notification_id'] && $check_field('set','personnel_name')) || (!form['interview_notification_id'] && $check_field('add','personnel_name'))" :disabled="disabledObj['personnel_name_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','personnel_name')">{{form['personnel_name']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','enterprise_phone_number') || $check_field('add','enterprise_phone_number') || $check_field('set','enterprise_phone_number')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="企业电话" prop="enterprise_phone_number">
												<el-input id="enterprise_phone_number" v-model="form['enterprise_phone_number']" placeholder="请输入企业电话"
							  v-if="user_group === '管理员' || (form['interview_notification_id'] && $check_field('set','enterprise_phone_number')) || (!form['interview_notification_id'] && $check_field('add','enterprise_phone_number'))" :disabled="disabledObj['enterprise_phone_number_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','enterprise_phone_number')">{{form['enterprise_phone_number']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','regular_users') || $check_field('add','regular_users') || $check_field('set','regular_users')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="普通用户" prop="regular_users">
													<el-select v-if="user_group === '管理员' || (form['interview_notification_id'] && $check_field('set','regular_users')) || (!form['interview_notification_id'] && $check_field('add','regular_users'))" id="regular_users" v-model="form['regular_users']" :disabled="disabledObj['regular_users_isDisabled']">
							<el-option v-for="o in list_user_regular_users" :key="o['username']" :label="o['nickname'] + '-' + o['username']"
									   :value="o['user_id']">
							</el-option>
						</el-select>
						<el-select v-else-if="$check_field('get','regular_users')" id="regular_users" v-model="form['regular_users']" :disabled="true">
							<el-option v-for="o in list_user_regular_users" :key="o['username']" :label="o['nickname'] + '-' + o['username']"
									   :value="o['user_id']">
							</el-option>
						</el-select>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','user_name') || $check_field('add','user_name') || $check_field('set','user_name')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="用户姓名" prop="user_name">
												<el-input id="user_name" v-model="form['user_name']" placeholder="请输入用户姓名"
							  v-if="user_group === '管理员' || (form['interview_notification_id'] && $check_field('set','user_name')) || (!form['interview_notification_id'] && $check_field('add','user_name'))" :disabled="disabledObj['user_name_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','user_name')">{{form['user_name']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','user_gender') || $check_field('add','user_gender') || $check_field('set','user_gender')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="用户性别" prop="user_gender">
												<el-input id="user_gender" v-model="form['user_gender']" placeholder="请输入用户性别"
							  v-if="user_group === '管理员' || (form['interview_notification_id'] && $check_field('set','user_gender')) || (!form['interview_notification_id'] && $check_field('add','user_gender'))" :disabled="disabledObj['user_gender_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','user_gender')">{{form['user_gender']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','contact_information') || $check_field('add','contact_information') || $check_field('set','contact_information')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="联系方式" prop="contact_information">
												<el-input id="contact_information" v-model="form['contact_information']" placeholder="请输入联系方式"
							  v-if="user_group === '管理员' || (form['interview_notification_id'] && $check_field('set','contact_information')) || (!form['interview_notification_id'] && $check_field('add','contact_information'))" :disabled="disabledObj['contact_information_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','contact_information')">{{form['contact_information']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','recruitment_positions') || $check_field('add','recruitment_positions') || $check_field('set','recruitment_positions')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="招聘职位" prop="recruitment_positions">
												<el-input id="recruitment_positions" v-model="form['recruitment_positions']" placeholder="请输入招聘职位"
							  v-if="user_group === '管理员' || (form['interview_notification_id'] && $check_field('set','recruitment_positions')) || (!form['interview_notification_id'] && $check_field('add','recruitment_positions'))" :disabled="disabledObj['recruitment_positions_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','recruitment_positions')">{{form['recruitment_positions']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','job_classification') || $check_field('add','job_classification') || $check_field('set','job_classification')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="职位分类" prop="job_classification">
												<el-input id="job_classification" v-model="form['job_classification']" placeholder="请输入职位分类"
							  v-if="user_group === '管理员' || (form['interview_notification_id'] && $check_field('set','job_classification')) || (!form['interview_notification_id'] && $check_field('add','job_classification'))" :disabled="disabledObj['job_classification_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','job_classification')">{{form['job_classification']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','work_city') || $check_field('add','work_city') || $check_field('set','work_city')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="工作城市" prop="work_city">
												<el-input id="work_city" v-model="form['work_city']" placeholder="请输入工作城市"
							  v-if="user_group === '管理员' || (form['interview_notification_id'] && $check_field('set','work_city')) || (!form['interview_notification_id'] && $check_field('add','work_city'))" :disabled="disabledObj['work_city_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','work_city')">{{form['work_city']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','interview_time') || $check_field('add','interview_time') || $check_field('set','interview_time')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="面试时间" prop="interview_time">
								<el-date-picker :disabled="disabledObj['interview_time_isDisabled']" v-if="user_group === '管理员' || (form['interview_notification_id'] && $check_field('set','interview_time')) || (!form['interview_notification_id'] && $check_field('add','interview_time'))" id="interview_time"
						v-model="form['interview_time']" type="datetime" placeholder="选择日期时间">
					</el-date-picker>
					<div v-else-if="$check_field('get','interview_time')">{{form['interview_time']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','interview_notes') || $check_field('add','interview_notes') || $check_field('set','interview_notes')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="面试备注" prop="interview_notes">
								<el-input type="textarea" id="interview_notes" v-model="form['interview_notes']" placeholder="请输入面试备注"
						v-if="user_group === '管理员' || (form['interview_notification_id'] && $check_field('set','interview_notes')) || (!form['interview_notification_id'] && $check_field('add','interview_notes'))" :disabled="disabledObj['interview_notes_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','interview_notes')">{{form['interview_notes']}}</div>
							</el-form-item>
			</el-col>
					
	
	
	
	
	
	
		</el-row>
			<el-col :xs="24" :sm="12" :lg="8" class="el_form_btn_warp">
				<el-form-item v-if="$check_action('/interview_notification/view','set') || $check_action('/interview_notification/view','add') || $check_option('/interview_notification/table','examine')">
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
				field: "interview_notification_id",
				url_add: "~/api/interview_notification/add?",
				url_set: "~/api/interview_notification/set?",
				url_get_obj: "~/api/interview_notification/get_obj?",
				url_upload: "~/api/interview_notification/upload?",

				query: {
					"interview_notification_id": 0,
				},

				form: {
								"enterprise_users": 0, // 企业用户
										"enterprise_id":  '', // 企业编号
										"enterprise_name":  '', // 企业名称
										"personnel_name":  '', // 人事姓名
										"enterprise_phone_number":  '', // 企业电话
										"regular_users": 0, // 普通用户
										"user_name":  '', // 用户姓名
										"user_gender":  '', // 用户性别
										"contact_information":  '', // 联系方式
										"recruitment_positions":  '', // 招聘职位
										"job_classification":  '', // 职位分类
										"work_city":  '', // 工作城市
										"interview_time":  '', // 面试时间
										"interview_notes":  '', // 面试备注
											"interview_notification_id": 0, // ID
						
				},
				disabledObj:{
								"enterprise_users_isDisabled": false,
										"enterprise_id_isDisabled": false,
										"enterprise_name_isDisabled": false,
										"personnel_name_isDisabled": false,
										"enterprise_phone_number_isDisabled": false,
										"regular_users_isDisabled": false,
										"user_name_isDisabled": false,
										"user_gender_isDisabled": false,
										"contact_information_isDisabled": false,
										"recruitment_positions_isDisabled": false,
										"job_classification_isDisabled": false,
										"work_city_isDisabled": false,
										"interview_time_isDisabled": false,
										"interview_notes_isDisabled": false,
										},

	
					// 用户列表
				list_user_enterprise_users: [],
						// 用户组
				group_user_enterprise_users: "",
				
		
		
		
		
					// 用户列表
				list_user_regular_users: [],
				
		
		
		
		
		
		
		
	
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
			 * 获取普通用户用户列表
			 */
			async get_list_user_regular_users() {
                // if(this.user_group !== "管理员" && this.form["regular_users"] === 0) {
                //     this.form["regular_users"] = this.user.user_id;
                // }
                var json = await this.$get("~/api/user/get_list?user_group=普通用户");
                if(json.result && json.result.list){
                    this.list_user_regular_users = json.result.list;
                }
                else if(json.error){
                    console.error(json.error);
                }
			},
					get_user_regular_users(id){
				var obj = this.list_user_regular_users.getObj({"user_id":id});
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
			 * 获取对象之前
			 * @param {Object} param
			 */
			get_obj_before(param) {
				var form = "";
																	// 获取缓存数据附加
				form = $.db.get("form");
							$.push(this.form ,form);
								
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
																									        if (this.form["interview_time"] && this.form["interview_time"].indexOf("-")===-1){
            this.form["interview_time"] = this.$toTime(parseInt(this.form["interview_time"]),"yyyy-MM-dd hh:mm:ss")
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
																																																					if(this.form["interview_time"]=="0000-00-00 00:00:00"){
				  this.form["interview_time"] = null;
				}
				if(parseInt(this.form["interview_time"]) > 9999){
					this.form["interview_time"] = this.$toTime(parseInt(this.form["interview_time"]),"yyyy-MM-dd hh:mm:ss")
				}
								

			},

			/**
			 * 提交前验证事件
			 * @param {Object} 请求参数
			 * @return {String} 验证成功返回null, 失败返回错误提示
			 */
			submit_check(param) {
																																																																																																																				if (!param.interview_time){
					return "面试时间不能为空";
				}
																						return null;
			},

			is_view(){
				var bl = this.user_group == "管理员";

				if(!bl){
					bl = this.$check_action('/interview_notification/table','add');
					console.log(bl ? "你有表格添加权限视作有添加权限" : "你没有表格添加权限");
				}
				if(!bl){
					bl = this.$check_action('/interview_notification/table','set');
					console.log(bl ? "你有表格添加权限视作有修改权限" : "你没有表格修改权限");
				}
				if(!bl){
					bl = this.$check_action('/interview_notification/view','add');
					console.log(bl ? "你有视图添加权限视作有添加权限" : "你没有视图添加权限");
				}
				if(!bl){
					bl = this.$check_action('/interview_notification/view','set');
					console.log(bl ? "你有视图修改权限视作有修改权限" : "你没有视图修改权限");
				}
				if(!bl){
					bl = this.$check_action('/interview_notification/view','get');
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
																this.get_list_user_regular_users();
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
