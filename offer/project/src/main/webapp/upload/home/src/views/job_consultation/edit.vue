<template>
	<div class="diy_edit page_job_consultation" id="job_consultation_edit">
		<div class='warp'>
			<div class='container'>
				<div class='row diy_edit_content_box'>
						<div v-if="$check_field('set','regular_users') || $check_field('add','regular_users') || $check_field('get','regular_users')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>
								普通用户:
							</span>
						</div>
						<div class="diy_field diy_down">
							<select id="form_regular_users" :disabled="disabledObj['regular_users_isDisabled']" v-model="form['regular_users']" v-if="(form['regular_users'] && $check_field('set','regular_users')) || (!form['regular_users'] && $check_field('add','regular_users'))" >
								<option v-for="o in list_user_regular_users" :value="o['user_id']">
									{{o['nickname'] + '-' + o['username']}}
								</option>
							</select>
							<span v-else-if="$check_field('get','regular_users')">{{ form['regular_users'] }}</span>
						</div>
					</div>
							<div v-if="$check_field('set','user_name') || $check_field('add','user_name') || $check_field('get','user_name')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>
								用户姓名:
							</span>
						</div>
								<!-- 文本 -->
									<div class="diy_field diy_text">
							<input type="text" id="form_user_name" v-model="form['user_name']" placeholder="请输入用户姓名" v-if="(form['user_name'] && $check_field('set','user_name')) || (!form['user_name'] && $check_field('add','user_name'))"  :disabled="disabledObj['user_name_isDisabled']"/>
							<span v-else-if="$check_field('get','user_name')">{{ form['${obj.name}'] }}</span>
						</div>
										</div>
							<div v-if="$check_field('set','user_gender') || $check_field('add','user_gender') || $check_field('get','user_gender')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>
								用户性别:
							</span>
						</div>
								<!-- 文本 -->
									<div class="diy_field diy_text">
							<input type="text" id="form_user_gender" v-model="form['user_gender']" placeholder="请输入用户性别" v-if="(form['user_gender'] && $check_field('set','user_gender')) || (!form['user_gender'] && $check_field('add','user_gender'))"  :disabled="disabledObj['user_gender_isDisabled']"/>
							<span v-else-if="$check_field('get','user_gender')">{{ form['${obj.name}'] }}</span>
						</div>
										</div>
							<div v-if="$check_field('set','contact_information') || $check_field('add','contact_information') || $check_field('get','contact_information')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>
								联系方式:
							</span>
						</div>
								<!-- 文本 -->
									<div class="diy_field diy_text">
							<input type="text" id="form_contact_information" v-model="form['contact_information']" placeholder="请输入联系方式" v-if="(form['contact_information'] && $check_field('set','contact_information')) || (!form['contact_information'] && $check_field('add','contact_information'))"  :disabled="disabledObj['contact_information_isDisabled']"/>
							<span v-else-if="$check_field('get','contact_information')">{{ form['${obj.name}'] }}</span>
						</div>
										</div>
							<div v-if="$check_field('set','enterprise_users') || $check_field('add','enterprise_users') || $check_field('get','enterprise_users')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>
								企业用户:
							</span>
						</div>
						<div class="diy_field diy_down">
							<select id="form_enterprise_users" :disabled="disabledObj['enterprise_users_isDisabled']" v-model="form['enterprise_users']" v-if="(form['enterprise_users'] && $check_field('set','enterprise_users')) || (!form['enterprise_users'] && $check_field('add','enterprise_users'))" >
								<option v-for="o in list_user_enterprise_users" :value="o['user_id']">
									{{o['nickname'] + '-' + o['username']}}
								</option>
							</select>
							<span v-else-if="$check_field('get','enterprise_users')">{{ form['enterprise_users'] }}</span>
						</div>
					</div>
							<div v-if="$check_field('set','enterprise_id') || $check_field('add','enterprise_id') || $check_field('get','enterprise_id')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>
								企业编号:
							</span>
						</div>
								<!-- 文本 -->
									<div class="diy_field diy_text">
							<input type="text" id="form_enterprise_id" v-model="form['enterprise_id']" placeholder="请输入企业编号" v-if="(form['enterprise_id'] && $check_field('set','enterprise_id')) || (!form['enterprise_id'] && $check_field('add','enterprise_id'))"  :disabled="disabledObj['enterprise_id_isDisabled']"/>
							<span v-else-if="$check_field('get','enterprise_id')">{{ form['${obj.name}'] }}</span>
						</div>
										</div>
							<div v-if="$check_field('set','enterprise_name') || $check_field('add','enterprise_name') || $check_field('get','enterprise_name')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>
								企业名称:
							</span>
						</div>
								<!-- 文本 -->
									<div class="diy_field diy_text">
							<input type="text" id="form_enterprise_name" v-model="form['enterprise_name']" placeholder="请输入企业名称" v-if="(form['enterprise_name'] && $check_field('set','enterprise_name')) || (!form['enterprise_name'] && $check_field('add','enterprise_name'))"  :disabled="disabledObj['enterprise_name_isDisabled']"/>
							<span v-else-if="$check_field('get','enterprise_name')">{{ form['${obj.name}'] }}</span>
						</div>
										</div>
							<div v-if="$check_field('set','recruitment_positions') || $check_field('add','recruitment_positions') || $check_field('get','recruitment_positions')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>
								招聘职位:
							</span>
						</div>
								<!-- 文本 -->
									<div class="diy_field diy_text">
							<input type="text" id="form_recruitment_positions" v-model="form['recruitment_positions']" placeholder="请输入招聘职位" v-if="(form['recruitment_positions'] && $check_field('set','recruitment_positions')) || (!form['recruitment_positions'] && $check_field('add','recruitment_positions'))"  :disabled="disabledObj['recruitment_positions_isDisabled']"/>
							<span v-else-if="$check_field('get','recruitment_positions')">{{ form['${obj.name}'] }}</span>
						</div>
										</div>
							<div v-if="$check_field('set','job_classification') || $check_field('add','job_classification') || $check_field('get','job_classification')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>
								职位分类:
							</span>
						</div>
								<!-- 文本 -->
									<div class="diy_field diy_text">
							<input type="text" id="form_job_classification" v-model="form['job_classification']" placeholder="请输入职位分类" v-if="(form['job_classification'] && $check_field('set','job_classification')) || (!form['job_classification'] && $check_field('add','job_classification'))"  :disabled="disabledObj['job_classification_isDisabled']"/>
							<span v-else-if="$check_field('get','job_classification')">{{ form['${obj.name}'] }}</span>
						</div>
										</div>
							<div v-if="$check_field('set','work_city') || $check_field('add','work_city') || $check_field('get','work_city')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>
								工作城市:
							</span>
						</div>
								<!-- 文本 -->
									<div class="diy_field diy_text">
							<input type="text" id="form_work_city" v-model="form['work_city']" placeholder="请输入工作城市" v-if="(form['work_city'] && $check_field('set','work_city')) || (!form['work_city'] && $check_field('add','work_city'))"  :disabled="disabledObj['work_city_isDisabled']"/>
							<span v-else-if="$check_field('get','work_city')">{{ form['${obj.name}'] }}</span>
						</div>
										</div>
							<div v-if="$check_field('set','consultation_time') || $check_field('add','consultation_time') || $check_field('get','consultation_time')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>
								咨询时间:
							</span>
						</div>
								<!-- 日长 -->
						<div class="diy_field diy_datetime">
							<input type="datetime-local" :disabled="disabledObj['consultation_time_isDisabled']" id="form_consultation_time" v-model="form['consultation_time']" placeholder="请输入咨询时间" v-if="(form['consultation_time'] && $check_field('set','consultation_time')) || (!form['consultation_time'] && $check_field('add','consultation_time'))" />
							<span v-else-if="$check_field('get','consultation_time')">{{ form['${obj.name}'] }}</span>
						</div>
							</div>
							<div v-if="$check_field('set','consultation_content') || $check_field('add','consultation_content') || $check_field('get','consultation_content')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>
								咨询内容:
							</span>
						</div>
								<!-- 多文本 -->
						<div class="diy_field diy_desc">
							<textarea id="form_consultation_content" v-model="form['consultation_content']" v-if="(form['consultation_content'] && $check_field('set','consultation_content')) || (!form['consultation_content'] && $check_field('add','consultation_content'))" :disabled="disabledObj['consultation_content_isDisabled']" />
							<span v-else-if="$check_field('get','consultation_content')">{{ form['${obj.name}'] }}</span>
						</div>
							</div>
							<div v-if="$check_field('set','reply_time') || $check_field('add','reply_time') || $check_field('get','reply_time')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>
								回复时间:
							</span>
						</div>
								<!-- 日长 -->
						<div class="diy_field diy_datetime">
							<input type="datetime-local" :disabled="disabledObj['reply_time_isDisabled']" id="form_reply_time" v-model="form['reply_time']" placeholder="请输入回复时间" v-if="(form['reply_time'] && $check_field('set','reply_time')) || (!form['reply_time'] && $check_field('add','reply_time'))" />
							<span v-else-if="$check_field('get','reply_time')">{{ form['${obj.name}'] }}</span>
						</div>
							</div>
							<div v-if="$check_field('set','reply_content') || $check_field('add','reply_content') || $check_field('get','reply_content')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>
								回复内容:
							</span>
						</div>
								<!-- 多文本 -->
						<div class="diy_field diy_desc">
							<textarea id="form_reply_content" v-model="form['reply_content']" v-if="(form['reply_content'] && $check_field('set','reply_content')) || (!form['reply_content'] && $check_field('add','reply_content'))" :disabled="disabledObj['reply_content_isDisabled']" />
							<span v-else-if="$check_field('get','reply_content')">{{ form['${obj.name}'] }}</span>
						</div>
							</div>
	




				</div>
				<div class="diy_edit_submit_box row">
					<div class="col-12">
						<div class="btn_box">
							<button class="btn_submit" @click="submit()">提交</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import mixin from "@/mixins/page.js";
	export default {
		mixins: [mixin],
		components: {},
		data() {
			return {
				url_get_obj: "~/api/job_consultation/get_obj?",
				url_add: "~/api/job_consultation/add?",
				url_set: "~/api/job_consultation/set?",

				// 登录权限
				oauth: {
					"signIn": true,
					"user_group": []
				},

				// 查询条件
				query: {
						"regular_users": 0,
							"user_name": "",
							"user_gender": "",
							"contact_information": "",
							"enterprise_users": 0,
							"enterprise_id": "",
							"enterprise_name": "",
							"recruitment_positions": "",
							"job_classification": "",
							"work_city": "",
							"consultation_time": "",
							"consultation_content": "",
							"reply_time": "",
							"reply_content": "",
						"job_consultation_id": 0,
				},

				obj: {
						"regular_users": 0, // 普通用户
							"user_name":  '', // 用户姓名
							"user_gender":  '', // 用户性别
							"contact_information":  '', // 联系方式
							"enterprise_users": 0, // 企业用户
							"enterprise_id":  '', // 企业编号
							"enterprise_name":  '', // 企业名称
							"recruitment_positions":  '', // 招聘职位
							"job_classification":  '', // 职位分类
							"work_city":  '', // 工作城市
							"consultation_time": new Date().getTime(),
							"consultation_content":  '', // 咨询内容
							"reply_time": new Date().getTime(),
							"reply_content":  '', // 回复内容
						"job_consultation_id": 0,
				},

				// 表单字段
				form: {
						"regular_users": 0, // 普通用户
							"user_name":  '', // 用户姓名
							"user_gender":  '', // 用户性别
							"contact_information":  '', // 联系方式
							"enterprise_users": 0, // 企业用户
							"enterprise_id":  '', // 企业编号
							"enterprise_name":  '', // 企业名称
							"recruitment_positions":  '', // 招聘职位
							"job_classification":  '', // 职位分类
							"work_city":  '', // 工作城市
							"consultation_time": new Date().getTime(),
							"consultation_content":  '', // 咨询内容
							"reply_time": new Date().getTime(),
							"reply_content":  '', // 回复内容
						"job_consultation_id": 0,
				},
				disabledObj:{
						"regular_users_isDisabled": false,
							"user_name_isDisabled": false,
							"user_gender_isDisabled": false,
							"contact_information_isDisabled": false,
							"enterprise_users_isDisabled": false,
							"enterprise_id_isDisabled": false,
							"enterprise_name_isDisabled": false,
							"recruitment_positions_isDisabled": false,
							"job_classification_isDisabled": false,
							"work_city_isDisabled": false,
							"consultation_time_isDisabled": false,
							"consultation_content_isDisabled": false,
							"reply_time_isDisabled": false,
							"reply_content_isDisabled": false,
					},

						// 用户列表
				list_user_regular_users: [],
													// 用户列表
				list_user_enterprise_users: [],
																			
				// ID字段
				field: "job_consultation_id",

			}
		},
		methods: {
      /**
       * 提交前验证事件
       * @param {Object} 请求参数
       * @return {String} 验证成功返回null, 失败返回错误提示
       */
      submit_check(param) {
																																											if (!param.consultation_time){
			return "咨询时间不能为空";
		}
											if (!param.reply_time){
			return "回复时间不能为空";
		}
								        return null;
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
					async get_user_session_regular_users(){
				var _this = this;
				var json = await this.$get("~/api/user_group/get_obj?name=普通用户");
				if(json.result && json.result.obj){
					var source_table = json.result.obj.source_table;
					var user_id = _this.$store.state.user.user_id;
					if (user_id){
						var url = "~/api/"+source_table+"/get_obj?"
						this.$get(url, {"user_id":_this.$store.state.user.user_id}, function(res) {
							if (res.result && res.result.obj) {
								var arr = []
								for (let key in res.result.obj) {
									arr.push(key)
								}
								var arrForm = []
								for (let key in _this.form) {
									arrForm.push(key)
								}
								_this.form["regular_users"] = user_id
								_this.disabledObj['regular_users' + '_isDisabled'] = true
								for (var i=0;i<arr.length;i++){
                  if (arr[i]!=='examine_state' && arr[i]!=='examine_reply') {
                    for (var j = 0; j < arrForm.length; j++) {
                      if (arr[i] === arrForm[j]) {
                        if (arr[i] !== "regular_users") {
                          _this.form[arrForm[j]] = res.result.obj[arr[i]]
                          _this.disabledObj[arrForm[j] + '_isDisabled'] = true
                          break;
                        }
                      }
                    }
                  }
								}
							}
						});
					}
				}
				else if(json.error){
					console.error(json.error);
				}
			},
	
				
				
				
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
			 * 修改文件
			 * @param { Object } files 上传文件对象
			 * @param { String } str 表单的属性名
			 */
			change_file(files, str) {
				var form = new FormData();
				form.append("file", files[0]);
				this.$post("~/api/job_consultation/upload?", form, (res) => {
					if (res.result) {
						this.form[str] = res.result.url;
					} else if (res.error) {
						this.$toast(res.error.message);
					}
				});
			},

			/**
			 * 获取对象后获取缓存表单
			 * @param {Object} json
			 * @param {Object} func
			 */
			get_obj_before(param){
				var form = $.db.get("form");
				// if (form) {
        //   delete(form.examine_state)
        //   delete(form.examine_reply)
        //   this.obj = $.push(this.obj ,form);
				// 	this.form = $.push(this.form ,form);
				// }
				// var arr = []
				// for (let key in form) {
				// 	arr.push(key)
				// }
				// for (var i=0;i<arr.length;i++){
				// 	this.disabledObj[arr[i] + '_isDisabled'] = true
				// }
        if (form) {
          var arr = []
          for (let key in form) {
            arr.push(key)
          }
          var arrForm = []
          for (let key in this.form) {
            arrForm.push(key)
          }
          for (var i=0;i<arr.length;i++){
            if (arr[i]!=='examine_state' && arr[i]!=='examine_reply') {
              for (var j = 0; j < arrForm.length; j++) {
                if (arrForm[j] === arr[i]) {
                  this.form[arrForm[j]] = form[arr[i]]
                  this.obj[arrForm[j]] = form[arr[i]]
                  this.disabledObj[arrForm[j] + '_isDisabled'] = true
                  break;
                }
              }
            }
          }
        }
																					        if (this.form["consultation_time"] && JSON.stringify(this.form["consultation_time"]).indexOf("-")===-1) {
          this.form["consultation_time"] = this.$toTime(parseInt(this.form["consultation_time"]), "yyyy-MM-ddThh:mm")
        }
					        if (this.form["reply_time"] && JSON.stringify(this.form["reply_time"]).indexOf("-")===-1) {
          this.form["reply_time"] = this.$toTime(parseInt(this.form["reply_time"]), "yyyy-MM-ddThh:mm")
        }
				
        $.db.del("form");
				return param;
			},

			/**
			 * 获取对象后获取缓存表单
			 * @param {Object} json
			 * @param {Object} func
			 */
			get_obj_after(json ,func){
				// var form = $.db.get("form");
				// var obj = Object.assign({} ,form ,this.obj);
				// if (obj) {
        //   delete(obj.examine_state)
        //   delete(obj.examine_reply)
				// 	this.obj = $.push(this.obj ,obj);
				// }
				// if (form) {
        //   delete(form.examine_state)
        //   delete(form.examine_reply)
				// 	this.form = $.push(this.form ,form);
				// }

				if(func){
					func(json);
				}
			},

		},
		created() {
					this.get_user_session_regular_users();
					this.get_list_user_regular_users();
																this.get_list_user_enterprise_users();
																														},
	}
</script>

<style>




</style>
