<template>
  <div class="list_menu diy_menu">
    <router-link
            to="/user_center/index"
            class="menu_item"
            :class="{ selected: this.$route.path=== '/user_center/index'}"
     >
      <span class="left_span">个人首页</span>
      <span class="right_span"><b-icon icon="house-fill"></b-icon></span>
    </router-link>
    <router-link
            to="/regular_users/table"
            class="menu_item"
            :class="{ selected: this.$route.path=== '/regular_users/table'}"
            v-if="user_group == '管理员' || $check_action('/regular_users/table','get')">
      <span class="left_span">普通用户</span>
      <span class="right_span"><b-icon icon="house-fill"></b-icon></span>
    </router-link>
    <router-link
            to="/enterprise_users/table"
            class="menu_item"
            :class="{ selected: this.$route.path=== '/enterprise_users/table'}"
            v-if="user_group == '管理员' || $check_action('/enterprise_users/table','get')">
      <span class="left_span">企业用户</span>
      <span class="right_span"><b-icon icon="house-fill"></b-icon></span>
    </router-link>
    <router-link
            to="/job_classification/table"
            class="menu_item"
            :class="{ selected: this.$route.path=== '/job_classification/table'}"
            v-if="user_group == '管理员' || $check_action('/job_classification/table','get')">
      <span class="left_span">职位分类</span>
      <span class="right_span"><b-icon icon="house-fill"></b-icon></span>
    </router-link>
    <router-link
            to="/recruitment_information/table"
            class="menu_item"
            :class="{ selected: this.$route.path=== '/recruitment_information/table'}"
            v-if="user_group == '管理员' || $check_action('/recruitment_information/table','get')">
      <span class="left_span">招聘信息</span>
      <span class="right_span"><b-icon icon="house-fill"></b-icon></span>
    </router-link>
    <router-link
            to="/resume_submission/table"
            class="menu_item"
            :class="{ selected: this.$route.path=== '/resume_submission/table'}"
            v-if="user_group == '管理员' || $check_action('/resume_submission/table','get')">
      <span class="left_span">简历投递</span>
      <span class="right_span"><b-icon icon="house-fill"></b-icon></span>
    </router-link>
    <router-link
            to="/job_consultation/table"
            class="menu_item"
            :class="{ selected: this.$route.path=== '/job_consultation/table'}"
            v-if="user_group == '管理员' || $check_action('/job_consultation/table','get')">
      <span class="left_span">职位咨询</span>
      <span class="right_span"><b-icon icon="house-fill"></b-icon></span>
    </router-link>
    <router-link
            to="/interview_notification/table"
            class="menu_item"
            :class="{ selected: this.$route.path=== '/interview_notification/table'}"
            v-if="user_group == '管理员' || $check_action('/interview_notification/table','get')">
      <span class="left_span">面试通知</span>
      <span class="right_span"><b-icon icon="house-fill"></b-icon></span>
    </router-link>

  <router-link
              to="/user/collect"
              class="menu_item"
              :class="{ selected: this.$route.path=== '/collect/list'}"
              v-if="user_group == '管理员' || $check_action('/collect/list','get')">
        <span class="left_span">收藏</span>
        <span class="right_span"><b-icon icon="house-fill"></b-icon></span>
  </router-link>
  </div>
</template>

<script>
import mixin from "@/mixins/page.js";
export default {
  mixins: [mixin],
  data() {
    return {
    };
  },
  mounted() {
  },
  methods: {
  },

  components: {
  },
};
</script>

<style scoped>
.list_menu {
  flex: 0 0 25%;
  border-bottom: 1px solid #eee;
}
.menu_item {
  display: flex;
  justify-content: space-between;
  padding: 15px 20px;
  border: 1px solid #eee;
  border-bottom: none;
  background-color: #fff;
}
.menu_item.selected {
  background-color: #000;
}
.menu_item.selected span {
  color: #fff ;
}
.content {
  flex: 0 0 74%;
}
</style>
