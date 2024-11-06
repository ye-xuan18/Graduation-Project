<template>
  <div class="page_search search_index">
	<div class="warp">
	  <div class="container">
		<div class="row">
		  <div class="col-12">
			<div class="card_result_search">
			  <div class="title">搜索结果</div>

				<!-- 文章搜索结果 -->
			  <list_result_search
				:list="result_article"
				title="招聘资讯"
				source_table="article"
			  ></list_result_search>


						  <list_result_search
				v-if="$check_action('/regular_users/list', 'get')"
				:list="result_regular_users_user_name"
				title="普通用户用户姓名"
				source_table="regular_users"
			  ></list_result_search>
								  <list_result_search
				v-if="$check_action('/regular_users/list', 'get')"
				:list="result_regular_users_user_gender"
				title="普通用户用户性别"
				source_table="regular_users"
			  ></list_result_search>
												  <list_result_search
				v-if="$check_action('/enterprise_users/list', 'get')"
				:list="result_enterprise_users_enterprise_id"
				title="企业用户企业编号"
				source_table="enterprise_users"
			  ></list_result_search>
								  <list_result_search
				v-if="$check_action('/enterprise_users/list', 'get')"
				:list="result_enterprise_users_enterprise_name"
				title="企业用户企业名称"
				source_table="enterprise_users"
			  ></list_result_search>
								  <list_result_search
				v-if="$check_action('/enterprise_users/list', 'get')"
				:list="result_enterprise_users_personnel_name"
				title="企业用户人事姓名"
				source_table="enterprise_users"
			  ></list_result_search>
												  <list_result_search
				v-if="$check_action('/job_classification/list', 'get')"
				:list="result_job_classification_job_classification"
				title="职位分类职位分类"
				source_table="job_classification"
			  ></list_result_search>
															  <list_result_search
				v-if="$check_action('/recruitment_information/list', 'get')"
				:list="result_recruitment_information_enterprise_name"
				title="招聘信息企业名称"
				source_table="recruitment_information"
			  ></list_result_search>
																	  <list_result_search
				v-if="$check_action('/recruitment_information/list', 'get')"
				:list="result_recruitment_information_recruitment_positions"
				title="招聘信息招聘职位"
				source_table="recruitment_information"
			  ></list_result_search>
														  <list_result_search
				v-if="$check_action('/recruitment_information/list', 'get')"
				:list="result_recruitment_information_educational_requirements"
				title="招聘信息学历要求"
				source_table="recruitment_information"
			  ></list_result_search>
																		  <list_result_search
				v-if="$check_action('/resume_submission/list', 'get')"
				:list="result_resume_submission_user_name"
				title="简历投递用户姓名"
				source_table="resume_submission"
			  ></list_result_search>
																				  <list_result_search
				v-if="$check_action('/resume_submission/list', 'get')"
				:list="result_resume_submission_enterprise_name"
				title="简历投递企业名称"
				source_table="resume_submission"
			  ></list_result_search>
								  <list_result_search
				v-if="$check_action('/resume_submission/list', 'get')"
				:list="result_resume_submission_recruitment_positions"
				title="简历投递招聘职位"
				source_table="resume_submission"
			  ></list_result_search>
																								  <list_result_search
				v-if="$check_action('/job_consultation/list', 'get')"
				:list="result_job_consultation_user_name"
				title="职位咨询用户姓名"
				source_table="job_consultation"
			  ></list_result_search>
																				  <list_result_search
				v-if="$check_action('/job_consultation/list', 'get')"
				:list="result_job_consultation_enterprise_name"
				title="职位咨询企业名称"
				source_table="job_consultation"
			  ></list_result_search>
								  <list_result_search
				v-if="$check_action('/job_consultation/list', 'get')"
				:list="result_job_consultation_recruitment_positions"
				title="职位咨询招聘职位"
				source_table="job_consultation"
			  ></list_result_search>
																																				  <list_result_search
				v-if="$check_action('/interview_notification/list', 'get')"
				:list="result_interview_notification_personnel_name"
				title="面试通知人事姓名"
				source_table="interview_notification"
			  ></list_result_search>
														  <list_result_search
				v-if="$check_action('/interview_notification/list', 'get')"
				:list="result_interview_notification_user_name"
				title="面试通知用户姓名"
				source_table="interview_notification"
			  ></list_result_search>
														  <list_result_search
				v-if="$check_action('/interview_notification/list', 'get')"
				:list="result_interview_notification_recruitment_positions"
				title="面试通知招聘职位"
				source_table="interview_notification"
			  ></list_result_search>
																		</div>
		  </div>
		</div>
	  </div>
	</div>
  </div>
</template>

<script>
import mixin from "../../mixins/page.js";
import list_result_search from "../../components/diy/list_result_search.vue";

export default {
  mixins: [mixin],
  data() {
	return {
	  "query": {
		word: "",
	  },
	  "result_article": [],
						"result_regular_users_user_name":[],
								"result_regular_users_user_gender":[],
												"result_enterprise_users_enterprise_id":[],
								"result_enterprise_users_enterprise_name":[],
								"result_enterprise_users_personnel_name":[],
												"result_job_classification_job_classification":[],
															"result_recruitment_information_enterprise_name":[],
																	"result_recruitment_information_recruitment_positions":[],
														"result_recruitment_information_educational_requirements":[],
																		"result_resume_submission_user_name":[],
																				"result_resume_submission_enterprise_name":[],
								"result_resume_submission_recruitment_positions":[],
																								"result_job_consultation_user_name":[],
																				"result_job_consultation_enterprise_name":[],
								"result_job_consultation_recruitment_positions":[],
																																				"result_interview_notification_personnel_name":[],
														"result_interview_notification_user_name":[],
														"result_interview_notification_recruitment_positions":[],
																};
  },
  methods: {
	/**
	 * 获取文章
	 */
	get_article() {
	  this.$get("~/api/article/get_list?like=0", { page: 1, size: 10, title: this.query.word }, (json) => {
		if (json.result) {
		  this.result_article = json.result.list;
		}
	  });
	},

				/**
	 * 获取user_name
	 */
	get_regular_users_user_name(){
		let url = "~/api/regular_users/get_list?like=0";
				this.$get(url, { page: 1, size: 10, "user_name": this.query.word }, (json) => {
		  if (json.result) {
			var result_regular_users_user_name = json.result.list;
			result_regular_users_user_name.map(o => o.title = o['user_name'])
	  			this.result_regular_users_user_name = result_regular_users_user_name
		 	}
		});
	},
						/**
	 * 获取user_gender
	 */
	get_regular_users_user_gender(){
		let url = "~/api/regular_users/get_list?like=0";
				this.$get(url, { page: 1, size: 10, "user_gender": this.query.word }, (json) => {
		  if (json.result) {
			var result_regular_users_user_gender = json.result.list;
			result_regular_users_user_gender.map(o => o.title = o['user_gender'])
	  			this.result_regular_users_user_gender = result_regular_users_user_gender
		 	}
		});
	},
										/**
	 * 获取enterprise_id
	 */
	get_enterprise_users_enterprise_id(){
		let url = "~/api/enterprise_users/get_list?like=0";
				this.$get(url, { page: 1, size: 10, "enterprise_id": this.query.word }, (json) => {
		  if (json.result) {
			var result_enterprise_users_enterprise_id = json.result.list;
			result_enterprise_users_enterprise_id.map(o => o.title = o['enterprise_id'])
	  			this.result_enterprise_users_enterprise_id = result_enterprise_users_enterprise_id
		 	}
		});
	},
						/**
	 * 获取enterprise_name
	 */
	get_enterprise_users_enterprise_name(){
		let url = "~/api/enterprise_users/get_list?like=0";
				this.$get(url, { page: 1, size: 10, "enterprise_name": this.query.word }, (json) => {
		  if (json.result) {
			var result_enterprise_users_enterprise_name = json.result.list;
			result_enterprise_users_enterprise_name.map(o => o.title = o['enterprise_name'])
	  			this.result_enterprise_users_enterprise_name = result_enterprise_users_enterprise_name
		 	}
		});
	},
						/**
	 * 获取personnel_name
	 */
	get_enterprise_users_personnel_name(){
		let url = "~/api/enterprise_users/get_list?like=0";
				this.$get(url, { page: 1, size: 10, "personnel_name": this.query.word }, (json) => {
		  if (json.result) {
			var result_enterprise_users_personnel_name = json.result.list;
			result_enterprise_users_personnel_name.map(o => o.title = o['personnel_name'])
	  			this.result_enterprise_users_personnel_name = result_enterprise_users_personnel_name
		 	}
		});
	},
										/**
	 * 获取job_classification
	 */
	get_job_classification_job_classification(){
		let url = "~/api/job_classification/get_list?like=0";
				this.$get(url, { page: 1, size: 10, "job_classification": this.query.word }, (json) => {
		  if (json.result) {
			var result_job_classification_job_classification = json.result.list;
			result_job_classification_job_classification.map(o => o.title = o['job_classification'])
	  			this.result_job_classification_job_classification = result_job_classification_job_classification
		 	}
		});
	},
													/**
	 * 获取enterprise_name
	 */
	get_recruitment_information_enterprise_name(){
		let url = "~/api/recruitment_information/get_list?like=0";
				this.$get(url, { page: 1, size: 10, "enterprise_name": this.query.word }, (json) => {
		  if (json.result) {
			var result_recruitment_information_enterprise_name = json.result.list;
			result_recruitment_information_enterprise_name.map(o => o.title = o['enterprise_name'])
	  			this.result_recruitment_information_enterprise_name = result_recruitment_information_enterprise_name
		 	}
		});
	},
															/**
	 * 获取recruitment_positions
	 */
	get_recruitment_information_recruitment_positions(){
		let url = "~/api/recruitment_information/get_list?like=0";
				this.$get(url, { page: 1, size: 10, "recruitment_positions": this.query.word }, (json) => {
		  if (json.result) {
			var result_recruitment_information_recruitment_positions = json.result.list;
			result_recruitment_information_recruitment_positions.map(o => o.title = o['recruitment_positions'])
	  			this.result_recruitment_information_recruitment_positions = result_recruitment_information_recruitment_positions
		 	}
		});
	},
												/**
	 * 获取educational_requirements
	 */
	get_recruitment_information_educational_requirements(){
		let url = "~/api/recruitment_information/get_list?like=0";
				this.$get(url, { page: 1, size: 10, "educational_requirements": this.query.word }, (json) => {
		  if (json.result) {
			var result_recruitment_information_educational_requirements = json.result.list;
			result_recruitment_information_educational_requirements.map(o => o.title = o['educational_requirements'])
	  			this.result_recruitment_information_educational_requirements = result_recruitment_information_educational_requirements
		 	}
		});
	},
																/**
	 * 获取user_name
	 */
	get_resume_submission_user_name(){
		let url = "~/api/resume_submission/get_list?like=0";
				this.$get(url, { page: 1, size: 10, "user_name": this.query.word }, (json) => {
		  if (json.result) {
			var result_resume_submission_user_name = json.result.list;
			result_resume_submission_user_name.map(o => o.title = o['user_name'])
	  			this.result_resume_submission_user_name = result_resume_submission_user_name
		 	}
		});
	},
																		/**
	 * 获取enterprise_name
	 */
	get_resume_submission_enterprise_name(){
		let url = "~/api/resume_submission/get_list?like=0";
				this.$get(url, { page: 1, size: 10, "enterprise_name": this.query.word }, (json) => {
		  if (json.result) {
			var result_resume_submission_enterprise_name = json.result.list;
			result_resume_submission_enterprise_name.map(o => o.title = o['enterprise_name'])
	  			this.result_resume_submission_enterprise_name = result_resume_submission_enterprise_name
		 	}
		});
	},
						/**
	 * 获取recruitment_positions
	 */
	get_resume_submission_recruitment_positions(){
		let url = "~/api/resume_submission/get_list?like=0";
				this.$get(url, { page: 1, size: 10, "recruitment_positions": this.query.word }, (json) => {
		  if (json.result) {
			var result_resume_submission_recruitment_positions = json.result.list;
			result_resume_submission_recruitment_positions.map(o => o.title = o['recruitment_positions'])
	  			this.result_resume_submission_recruitment_positions = result_resume_submission_recruitment_positions
		 	}
		});
	},
																						/**
	 * 获取user_name
	 */
	get_job_consultation_user_name(){
		let url = "~/api/job_consultation/get_list?like=0";
				this.$get(url, { page: 1, size: 10, "user_name": this.query.word }, (json) => {
		  if (json.result) {
			var result_job_consultation_user_name = json.result.list;
			result_job_consultation_user_name.map(o => o.title = o['user_name'])
	  			this.result_job_consultation_user_name = result_job_consultation_user_name
		 	}
		});
	},
																		/**
	 * 获取enterprise_name
	 */
	get_job_consultation_enterprise_name(){
		let url = "~/api/job_consultation/get_list?like=0";
				this.$get(url, { page: 1, size: 10, "enterprise_name": this.query.word }, (json) => {
		  if (json.result) {
			var result_job_consultation_enterprise_name = json.result.list;
			result_job_consultation_enterprise_name.map(o => o.title = o['enterprise_name'])
	  			this.result_job_consultation_enterprise_name = result_job_consultation_enterprise_name
		 	}
		});
	},
						/**
	 * 获取recruitment_positions
	 */
	get_job_consultation_recruitment_positions(){
		let url = "~/api/job_consultation/get_list?like=0";
				this.$get(url, { page: 1, size: 10, "recruitment_positions": this.query.word }, (json) => {
		  if (json.result) {
			var result_job_consultation_recruitment_positions = json.result.list;
			result_job_consultation_recruitment_positions.map(o => o.title = o['recruitment_positions'])
	  			this.result_job_consultation_recruitment_positions = result_job_consultation_recruitment_positions
		 	}
		});
	},
																																		/**
	 * 获取personnel_name
	 */
	get_interview_notification_personnel_name(){
		let url = "~/api/interview_notification/get_list?like=0";
				this.$get(url, { page: 1, size: 10, "personnel_name": this.query.word }, (json) => {
		  if (json.result) {
			var result_interview_notification_personnel_name = json.result.list;
			result_interview_notification_personnel_name.map(o => o.title = o['personnel_name'])
	  			this.result_interview_notification_personnel_name = result_interview_notification_personnel_name
		 	}
		});
	},
												/**
	 * 获取user_name
	 */
	get_interview_notification_user_name(){
		let url = "~/api/interview_notification/get_list?like=0";
				this.$get(url, { page: 1, size: 10, "user_name": this.query.word }, (json) => {
		  if (json.result) {
			var result_interview_notification_user_name = json.result.list;
			result_interview_notification_user_name.map(o => o.title = o['user_name'])
	  			this.result_interview_notification_user_name = result_interview_notification_user_name
		 	}
		});
	},
												/**
	 * 获取recruitment_positions
	 */
	get_interview_notification_recruitment_positions(){
		let url = "~/api/interview_notification/get_list?like=0";
				this.$get(url, { page: 1, size: 10, "recruitment_positions": this.query.word }, (json) => {
		  if (json.result) {
			var result_interview_notification_recruitment_positions = json.result.list;
			result_interview_notification_recruitment_positions.map(o => o.title = o['recruitment_positions'])
	  			this.result_interview_notification_recruitment_positions = result_interview_notification_recruitment_positions
		 	}
		});
	},
															
  },
  components: { list_result_search },
	created(){
    this.query.word = this.$route.query.word || "";
  },
  mounted() {
	this.get_article();
					this.get_regular_users_user_name();
							this.get_regular_users_user_gender();
											this.get_enterprise_users_enterprise_id();
							this.get_enterprise_users_enterprise_name();
							this.get_enterprise_users_personnel_name();
											this.get_job_classification_job_classification();
														this.get_recruitment_information_enterprise_name();
																this.get_recruitment_information_recruitment_positions();
													this.get_recruitment_information_educational_requirements();
																	this.get_resume_submission_user_name();
																			this.get_resume_submission_enterprise_name();
							this.get_resume_submission_recruitment_positions();
																							this.get_job_consultation_user_name();
																			this.get_job_consultation_enterprise_name();
							this.get_job_consultation_recruitment_positions();
																																			this.get_interview_notification_personnel_name();
													this.get_interview_notification_user_name();
													this.get_interview_notification_recruitment_positions();
															  },
  watch: {
	$route() {
	  $.push(this.query, this.$route.query);
	  this.get_article();
				  this.get_regular_users_user_name();
						  this.get_regular_users_user_gender();
										  this.get_enterprise_users_enterprise_id();
						  this.get_enterprise_users_enterprise_name();
						  this.get_enterprise_users_personnel_name();
										  this.get_job_classification_job_classification();
													  this.get_recruitment_information_enterprise_name();
															  this.get_recruitment_information_recruitment_positions();
												  this.get_recruitment_information_educational_requirements();
																  this.get_resume_submission_user_name();
																		  this.get_resume_submission_enterprise_name();
						  this.get_resume_submission_recruitment_positions();
																						  this.get_job_consultation_user_name();
																		  this.get_job_consultation_enterprise_name();
						  this.get_job_consultation_recruitment_positions();
																																		  this.get_interview_notification_personnel_name();
												  this.get_interview_notification_user_name();
												  this.get_interview_notification_recruitment_positions();
																},
  },
};
</script>

<style scoped>
.card_search {
  text-align: center;
}
.card_result_search>.title {
  text-align: center;
  padding: 10px 0;
}
</style>
