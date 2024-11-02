<template>
	<el-main class="bg table_wrap comtabel_t">
		<el-form label-position="right" :model="query" class="form p_4" label-width="120">
			<el-row class="rows row1">



							<el-col :xs="24" :sm="24" :lg="8" class="el_form_search_wrap">
					<el-form-item label="企业编号">
									<el-input v-model="query.enterprise_id"></el-input>
								</el-form-item>
				</el-col>
									<el-col :xs="24" :sm="24" :lg="8" class="el_form_search_wrap">
					<el-form-item label="企业名称">
									<el-input v-model="query.enterprise_name"></el-input>
								</el-form-item>
				</el-col>
									<el-col :xs="24" :sm="24" :lg="8" class="el_form_search_wrap">
					<el-form-item label="人事姓名">
									<el-input v-model="query.personnel_name"></el-input>
								</el-form-item>
				</el-col>
							</el-row>
	<el-row class="rows row2">

		<el-col :xs="24" :sm="24" :lg="24" class="search_btn_wrap search_btns">

				<el-col :xs="24" :sm="10" :lg="8" class="search_btn_1 search_btn_wrap_1 btns">

										<el-button type="primary" @click="search()" class="search_btn_find">查询</el-button>
						<el-button @click="reset()" style="margin-right: 74px;" class="search_btn_reset">重置</el-button>
																		
						<el-button v-if="user_group == '管理员' || $check_action('/enterprise_users/table','add') || $check_action('/enterprise_users/view','add')" @click="$router.push('./view?')">添加</el-button>

						

						<el-button v-if="user_group == '管理员' || $check_action('/enterprise_users/table','del') || $check_action('/enterprise_users/view','del')" class="search_btn_del" type="danger" @click="delInfo()">删除</el-button>
								
				</el-col>
		</el-col>
	</el-row >

		</el-form>
		<el-table :data="list" @selection-change="selectionChange" @sort-change="$sortChange" style="width: 100%" id="dataTable">
			<el-table-column fixed type="selection" tooltip-effect="dark" width="55">
			</el-table-column>
			<el-table-column prop="username" label="用户名" width="120">
			</el-table-column>
				<el-table-column fixed prop="nickname" label="昵称">
				</el-table-column>

					<el-table-column prop="enterprise_id" @sort-change="$sortChange" label="企业编号"
				v-if="user_group == '管理员' || $check_field('get','enterprise_id')" min-width="200">
					</el-table-column>
					<el-table-column prop="enterprise_name" @sort-change="$sortChange" label="企业名称"
				v-if="user_group == '管理员' || $check_field('get','enterprise_name')" min-width="200">
					</el-table-column>
					<el-table-column prop="personnel_name" @sort-change="$sortChange" label="人事姓名"
				v-if="user_group == '管理员' || $check_field('get','personnel_name')" min-width="200">
					</el-table-column>
					<el-table-column prop="enterprise_phone_number" @sort-change="$sortChange" label="企业电话"
				v-if="user_group == '管理员' || $check_field('get','enterprise_phone_number')" min-width="200">
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







			<el-table-column fixed="right" label="操作" min-width="200" v-if="user_group == '管理员' || $check_action('/enterprise_users/table','set') || $check_action('/enterprise_users/view','set') || $check_action('/enterprise_users/view','get') || $check_action('/${table.tableConfig.table_nav_name}/table','add') || $check_action('/${table.tableConfig.table_nav_name}/view','add')" >


				<template slot-scope="scope">
					<div class="view_a">
					<router-link class="e-button el-button--small is-plain el-button--success" style="margin: 5px !important;"
					v-if="user_group == '管理员' || $check_action('/enterprise_users/table','set') || $check_action('/enterprise_users/view','set') || $check_action('/enterprise_users/view','get')"
						:to="'./view?user_id=' + scope.row['user_id']"

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
				url_get_list: "~/api/enterprise_users/get_list?like=0",
				url_del: "~/api/enterprise_users/del?",

				// 字段ID
				field: "enterprise_users_id",

				// 查询
				query: {
					"size": 7,
					"page": 1,
								"enterprise_id": "",
											"enterprise_name": "",
											"personnel_name": "",
									"login_time": "",
					"create_time": "",
					"orderby": `create_time desc`
				},

				// 数据
				list: [],
															}
		},
		methods: {
			// 关闭弹框
			closeModal(){
				this.showModal = false;
				},
			delInfo() {
			    var list = this.selection;
			    if (list.length === 0) {
			        this.$message({
			            type: 'info',
			            message: '选择对象不能为空!'
			        });
			        return;
			    }
			    this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
			        confirmButtonText: '确定',
			        cancelButtonText: '取消',
			        type: 'warning'
			    }).then(async () => {
			        await this.delAll(list ,async (list)=>{
						var bl = true;
						for(var i=0; i < list.length; i++){
							var user_id = list[i].user_id;
							var res = await this.$get("~/api/user/del?",{user_id});
							if(res.result){
								console.log("删除成功" + i);
							}
							else{
								console.log("删除失败" + i);
								bl = false;
								break;
							}
						}
						if(bl){
							this.$message({
							    type: 'success',
							    message: '删除成功!'
							});
							this.get_list();
						}

					});
			    }).catch(() => {
			        this.$message({
			            type: 'info',
			            message: '已取消删除'
			        });
			    });
			},
			get_list_after(param){
				let _this = this;
				for (let i = 0;i<this.list.length;i++){
					let user_id = _this.list[i].user_id
					_this.$get("~/api/user/get_obj?", {
						user_id
					}, (json) => {
						if (json.result.obj){
							_this.$delete(_this.list[i],'username');
							_this.$set(_this.list[i],'username',json.result.obj.username);
							_this.$delete(_this.list[i],'nickname');
							_this.$set(_this.list[i],'nickname',json.result.obj.nickname);
							}
					});
				}
			},


								



										},
		created() {
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
