<template>
	<el-main class="bg table_wrap comtabel_t">
		<el-form label-position="right" :model="query" class="form p_4" label-width="120">
			<el-row class="rows row1">



										<el-col :xs="24" :sm="24" :lg="8" class="el_form_search_wrap">
					<el-form-item label="用户姓名">
									<el-input v-model="query.user_name"></el-input>
								</el-form-item>
				</el-col>
																					<el-col :xs="24" :sm="24" :lg="8" class="el_form_search_wrap">
					<el-form-item label="企业名称">
									<el-input v-model="query.enterprise_name"></el-input>
								</el-form-item>
				</el-col>
									<el-col :xs="24" :sm="24" :lg="8" class="el_form_search_wrap">
					<el-form-item label="招聘职位">
									<el-input v-model="query.recruitment_positions"></el-input>
								</el-form-item>
				</el-col>
																						</el-row>
	<el-row class="rows row2">

		<el-col :xs="24" :sm="24" :lg="24" class="search_btn_wrap search_btns">

				<el-col :xs="24" :sm="10" :lg="8" class="search_btn_1 search_btn_wrap_1 btns">

										<el-button type="primary" @click="search()" class="search_btn_find">查询</el-button>
						<el-button @click="reset()" style="margin-right: 74px;" class="search_btn_reset">重置</el-button>
																		

						<el-button v-if="user_group == '管理员' || $check_action('/job_consultation/table','del') || $check_action('/job_consultation/view','del')" class="search_btn_del" type="danger" @click="delInfo()">删除</el-button>
								
				</el-col>
		</el-col>
	</el-row >

		</el-form>
		<el-table :data="list" @selection-change="selectionChange" @sort-change="$sortChange" style="width: 100%" id="dataTable">
			<el-table-column fixed type="selection" tooltip-effect="dark" width="55">
			</el-table-column>
				<el-table-column prop="regular_users" @sort-change="$sortChange" label="普通用户"
				v-if="user_group == '管理员' || $check_field('get','regular_users')" min-width="200">
						<template slot-scope="scope">
					{{ get_user_regular_users(scope.row['regular_users']) }}
				</template>
					</el-table-column>
					<el-table-column prop="user_name" @sort-change="$sortChange" label="用户姓名"
				v-if="user_group == '管理员' || $check_field('get','user_name')" min-width="200">
					</el-table-column>
					<el-table-column prop="user_gender" @sort-change="$sortChange" label="用户性别"
				v-if="user_group == '管理员' || $check_field('get','user_gender')" min-width="200">
					</el-table-column>
					<el-table-column prop="contact_information" @sort-change="$sortChange" label="联系方式"
				v-if="user_group == '管理员' || $check_field('get','contact_information')" min-width="200">
					</el-table-column>
					<el-table-column prop="enterprise_users" @sort-change="$sortChange" label="企业用户"
				v-if="user_group == '管理员' || $check_field('get','enterprise_users')" min-width="200">
						<template slot-scope="scope">
					{{ get_user_enterprise_users(scope.row['enterprise_users']) }}
				</template>
					</el-table-column>
					<el-table-column prop="enterprise_id" @sort-change="$sortChange" label="企业编号"
				v-if="user_group == '管理员' || $check_field('get','enterprise_id')" min-width="200">
					</el-table-column>
					<el-table-column prop="enterprise_name" @sort-change="$sortChange" label="企业名称"
				v-if="user_group == '管理员' || $check_field('get','enterprise_name')" min-width="200">
					</el-table-column>
					<el-table-column prop="recruitment_positions" @sort-change="$sortChange" label="招聘职位"
				v-if="user_group == '管理员' || $check_field('get','recruitment_positions')" min-width="200">
					</el-table-column>
					<el-table-column prop="job_classification" @sort-change="$sortChange" label="职位分类"
				v-if="user_group == '管理员' || $check_field('get','job_classification')" min-width="200">
					</el-table-column>
					<el-table-column prop="work_city" @sort-change="$sortChange" label="工作城市"
				v-if="user_group == '管理员' || $check_field('get','work_city')" min-width="200">
					</el-table-column>
					<el-table-column prop="consultation_time" @sort-change="$sortChange" label="咨询时间"
				v-if="user_group == '管理员' || $check_field('get','consultation_time')" min-width="200">
						<template slot-scope="scope">
					{{ $toTime(scope.row["consultation_time"],"yyyy-MM-dd hh:mm:ss") }}
				</template>
					</el-table-column>
					<el-table-column prop="consultation_content" @sort-change="$sortChange" label="咨询内容"
				v-if="user_group == '管理员' || $check_field('get','consultation_content')" min-width="200">
					</el-table-column>
					<el-table-column prop="reply_time" @sort-change="$sortChange" label="回复时间"
				v-if="user_group == '管理员' || $check_field('get','reply_time')" min-width="200">
						<template slot-scope="scope">
					{{ $toTime(scope.row["reply_time"],"yyyy-MM-dd hh:mm:ss") }}
				</template>
					</el-table-column>
					<el-table-column prop="reply_content" @sort-change="$sortChange" label="回复内容"
				v-if="user_group == '管理员' || $check_field('get','reply_content')" min-width="200">
					</el-table-column>
	



            <el-table-column sortable prop="create_time" label="创建时间" min-width="200">
                <template slot-scope="scope">
                	{{ $toTime(scope.row["create_time"],"yyyy-MM-dd hh:mm:ss") }}
                </template>
            </el-table-column>

			<el-table-column sortable prop="update_time" label="更新时间" min-width="200">
                <template slot-scope="scope">
                	{{ $toTime(scope.row["update_time"],"yyyy-MM-dd hh:mm:ss") }}
                </template>
			</el-table-column>







			<el-table-column fixed="right" label="操作" min-width="200" v-if="user_group == '管理员' || $check_action('/job_consultation/table','set') || $check_action('/job_consultation/view','set') || $check_action('/job_consultation/view','get') || $check_action('//table','add') || $check_action('//view','add')" >


				<template slot-scope="scope">
					<div class="view_a">
					<router-link class="e-button el-button--small is-plain el-button--success" style="margin: 5px !important;"
					v-if="user_group == '管理员' || $check_action('/job_consultation/table','set') || $check_action('/job_consultation/view','set') || $check_action('/job_consultation/view','get')"
						:to="'./view?' + field + '=' + scope.row[field]"
						 size="small">
						<span>详情</span>
					</router-link>
				</div>
				</template>
			</el-table-column>

		</el-table>

		<!-- 分页器 -->
		<div class="mt text_center">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
				:current-page="query.page" :page-sizes="[7, 10, 30, 100]" :page-size="query.size"
				layout="total, sizes, prev, pager, next, jumper" :total="count">
			</el-pagination>
		</div>
		<!-- /分页器 -->

														
		<div class="modal_wrap" v-if="showModal">
			<div class="modal_box">
				<!-- <div class="modal_box_close" @click="closeModal">X</div> -->
				<p class="modal_box_title">重要提醒</p>
				<p class="modal_box_text">当前有数据达到预警值！</p>
				<div class="btn_box">
					<span @click="closeModal">取消</span>
					<span @click="closeModal">确定</span>
				</div>
			</div>
		</div>


	</el-main>
</template>
<script>
	import mixin from "@/mixins/page.js";

	export default {
		mixins: [mixin],
		data() {
			return {
				// 弹框
				showModal: false,
				// 获取数据地址
				url_get_list: "~/api/job_consultation/get_list?like=0",
				url_del: "~/api/job_consultation/del?",

				// 字段ID
				field: "job_consultation_id",

				// 查询
				query: {
					"size": 7,
					"page": 1,
									"user_name": "",
															"enterprise_name": "",
											"recruitment_positions": "",
														"login_time": "",
					"create_time": "",
					"orderby": `create_time desc`
				},

				// 数据
				list: [],
																						// 用户列表
				list_user_regular_users: [],
															// 用户列表
				list_user_enterprise_users: [],
																						}
		},
		methods: {
			// 关闭弹框
			closeModal(){
				this.showModal = false;
				},

			get_list_before(param){
				var user_group = this.user.user_group;
				if(user_group != "管理员"){
						let sqlwhere = "(";
										if(user_group=="普通用户"){
						sqlwhere+= "regular_users = " + this.user.user_id + " or ";
					}
																												if(user_group=="企业用户"){
						sqlwhere+= "enterprise_users = " + this.user.user_id + " or ";
					}
																																																							if (sqlwhere.length>1){
						sqlwhere = sqlwhere.substr(0,sqlwhere.length-4);
						sqlwhere += ")";
						param["sqlwhere"] = sqlwhere;
					}
					}
				return param;
			},

																												



				/**
			 * 获取普通用户用户列表
			 */
			async get_list_user_regular_users() {
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
					ret = obj.nickname+"-"+obj.username;
					// if(obj.nickname){
					// 	ret = obj.nickname;
					// }
					// else{
					// 	ret = obj.username;
					// }
				}
				return ret;
			},
												/**
			 * 获取企业用户用户列表
			 */
			async get_list_user_enterprise_users() {
				var json = await this.$get("~/api/user/get_list?user_group=企业用户");
				if(json.result && json.result.list){
					this.list_user_enterprise_users = json.result.list;
				}
				else if(json.error){
					console.error(json.error);
				}
			},

			get_user_enterprise_users(id){
				var obj = this.list_user_enterprise_users.getObj({"user_id":id});
				var ret = "";
				if(obj){
					ret = obj.nickname+"-"+obj.username;
					// if(obj.nickname){
					// 	ret = obj.nickname;
					// }
					// else{
					// 	ret = obj.username;
					// }
				}
				return ret;
			},
																						},
		created() {
							this.get_list_user_regular_users();
														this.get_list_user_enterprise_users();
																					}
	}
</script>

<style type="text/css">
	.bg {
		background: white;
	}

	.form.p_4 {
		padding: 1rem;
	}

	.form .el-input {
		width: initial;
	}

	.mt {
		margin-top: 1rem;
	}

	.text_center {
		text-align: center;
	}

	.float-right {
		float: right;
	}


	.modal_wrap{
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		background: rgba(0,0,0,0.5);
		z-index: 9999999999;
	}
	.modal_wrap .modal_box{
		width: 400px;
		height: 200px;
		background: url("../../assets/modal_bg.jpg") no-repeat center;
		background-size: cover;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-left: -200px;
		margin-top: -100px;
		border-radius: 10px;
		}
	.modal_wrap .modal_box .modal_box_close{
		font-size: 20px;
		position: absolute;
		top: 10px;
		right: 10px;
		cursor: pointer;
		}
	.modal_wrap .modal_box .modal_box_title{
	  text-align: center;
    font-size: 18px;
    margin: 16px auto;
    color: #fff;
    border-bottom: 1px solid rgba(117, 116, 116,0.5);
    padding-bottom: 16px;
    width: 356px;
		}
	.modal_wrap .modal_box .modal_box_text{
			text-align: center;
		font-size: 15px;
		color: #fff;
		margin-top: 25px;
		}
	.modal_wrap .modal_box .btn_box{
		display: flex;
		flex-direction: row;
		justify-content: center;
		margin-top: 42px;
		}
			.modal_wrap .modal_box .btn_box span{
				display: inline-block;
				width: 80px;
				height: 30px;
				line-height: 30px;
				text-align: center;
				border: 1px solid #ccc;
				font-size: 14px;
				cursor: pointer;
				color: #fff;
			}
	.modal_wrap .modal_box .btn_box span:nth-child(2){
		background: #409EFF;
		color: #fff;
		border-color: #409EFF;
		margin-left: 15px;
	}
</style>
