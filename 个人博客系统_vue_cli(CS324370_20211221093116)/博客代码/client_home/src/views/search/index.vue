<template>
  <div class="page_search">
	<div class="warp">
	  <div class="container">
		<div class="row">
		  <div class="col-12">
			<div class="card_result_search">
			  <div class="title">搜索结果</div>
				<!-- 文章搜索结果 -->
			  <list_result_search
				:list="result_article"
				title="博客"
				source_table="article"
			  ></list_result_search>
				<!-- 论坛搜索结果 -->
			  <list_result_search
				:list="result_forum"
				title="联系博主"
				source_table="forum"
			  ></list_result_search>
			  <list_result_search
				v-if="$check_action('/blogger_information/list', 'get')"
				:list="result_blogger_information_full_name"
				title="博主信息姓名"
				source_table="blogger_information"
			  ></list_result_search>
			  <list_result_search
				v-if="$check_action('/blogger_information/list', 'get')"
				:list="result_blogger_information_gender"
				title="博主信息性别"
				source_table="blogger_information"
			  ></list_result_search>
			  <list_result_search
				v-if="$check_action('/user_registration/list', 'get')"
				:list="result_user_registration_full_name"
				title="用户注册姓名"
				source_table="user_registration"
			  ></list_result_search>
			  <list_result_search
				v-if="$check_action('/user_registration/list', 'get')"
				:list="result_user_registration_gender"
				title="用户注册性别"
				source_table="user_registration"
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
	  "result_forum": [],
			"result_blogger_information_full_name":[],
			"result_blogger_information_gender":[],
			"result_user_registration_full_name":[],
			"result_user_registration_gender":[],
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
	 * 获取联系博主
	 */
	get_forum() {
	  this.$get("~/api/forum/get_list?like=0", { page: 1, size: 10, title: this.query.word }, (json) => {
		if (json.result) {
		  this.result_forum = json.result.list;
		}
	  });
	},
	/**
	 * 获取full_name
	 */
	get_blogger_information_full_name(){
		this.$get("~/api/blogger_information/get_list?like=0", { page: 1, size: 10, "full_name": this.query.word }, (json) => {
		  if (json.result) {
			var result_blogger_information_full_name = json.result.list;
			result_blogger_information_full_name.map(o => o.title = o['full_name'])
	  			this.result_blogger_information_full_name = result_blogger_information_full_name
		 	}
		});
	},
	/**
	 * 获取gender
	 */
	get_blogger_information_gender(){
		this.$get("~/api/blogger_information/get_list?like=0", { page: 1, size: 10, "gender": this.query.word }, (json) => {
		  if (json.result) {
			var result_blogger_information_gender = json.result.list;
			result_blogger_information_gender.map(o => o.title = o['gender'])
	  			this.result_blogger_information_gender = result_blogger_information_gender
		 	}
		});
	},
	/**
	 * 获取full_name
	 */
	get_user_registration_full_name(){
		this.$get("~/api/user_registration/get_list?like=0", { page: 1, size: 10, "full_name": this.query.word }, (json) => {
		  if (json.result) {
			var result_user_registration_full_name = json.result.list;
			result_user_registration_full_name.map(o => o.title = o['full_name'])
	  			this.result_user_registration_full_name = result_user_registration_full_name
		 	}
		});
	},
	/**
	 * 获取gender
	 */
	get_user_registration_gender(){
		this.$get("~/api/user_registration/get_list?like=0", { page: 1, size: 10, "gender": this.query.word }, (json) => {
		  if (json.result) {
			var result_user_registration_gender = json.result.list;
			result_user_registration_gender.map(o => o.title = o['gender'])
	  			this.result_user_registration_gender = result_user_registration_gender
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
	this.get_forum();
		this.get_blogger_information_full_name();
		this.get_blogger_information_gender();
		this.get_user_registration_full_name();
		this.get_user_registration_gender();
  },
  watch: {
	$route() {
	  $.push(this.query, this.$route.query);
	  this.get_article();
	  this.get_forum();
	  this.get_blogger_information_full_name();
	  this.get_blogger_information_gender();
	  this.get_user_registration_full_name();
	  this.get_user_registration_gender();
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
