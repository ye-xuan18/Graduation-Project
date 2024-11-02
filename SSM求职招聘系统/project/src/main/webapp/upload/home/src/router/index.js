import Vue from 'vue';
import VueRouter from 'vue-router';
import index from '../views/index.vue'
import login from '../views/account/login.vue';

Vue.use(VueRouter)

const routes = [
	// 主页ss
	{
		path: '/',
		name: 'index',
		component: index
	},
	// 登录
	{
		path: '/account/login',
		name: 'login',
		component: login
	},
	// 忘记密码
	{
		path: '/account/forgot',
		name: 'forgot',
		component: () => import('../views/account/forgot.vue')
	},
	// 注册账号
	{
		path: '/account/register',
		name: 'register',
		component: () => import('../views/account/register.vue')
	},
	// 媒体图片
	{
		path: '/media/image',
		name: 'media_image',
		component: () => import('../views/media/image.vue')
	},
	// 音乐
	{
		path: '/media/music',
		name: 'media_music',
		component: () => import('../views/media/music.vue')
	},
	// 媒体视频
	{
		path: '/media/video',
		name: 'media_video',
		component: () => import('../views/media/video.vue')
	},
	// 媒体视频
	{
		path: '/user_center/index',
		name: 'user_center_index',
		component: () => import('../views/user_center/index.vue')
	},
	// 文章路由
	{
		path: '/article/list',
		name: 'article_list',
		component: () => import('../views/article/list.vue')
	},
	{
		path: '/article/details',
		name: 'article_details',
		component: () => import('../views/article/details.vue')
	},
	// 浏览网站
	// 收藏路由
	{
		path: '/user/collect',
		name: 'collect_list',
		component: () => import('../views/user/collect.vue')
	},


	{
		path: '/comment/table',
		name: 'comment_table',
		component: () => import('../views/comment/table.vue')
	},
	{
		path: '/comment/view',
		name: 'comment_view',
		component: () => import('../views/comment/view.vue')
	},

	



	// 公告路由
	{
		path: '/notice/list',
		name: 'notice_list',
		component: () => import('../views/notice/list.vue')
	},
	{
		path: '/notice/details',
		name: 'notice_details',
		component: () => import('../views/notice/details.vue')
	},
	// 普通用户表格路由
	{
		path: '/regular_users/table',
		name: '/regular_users_table',
		component: () => import('../views/regular_users/table.vue')
	},
	// 普通用户详情路由
	{
		path: '/regular_users/view',
		name: '/regular_users_view',
		component: () => import('../views/regular_users/view.vue')
	},
	
	
		// 企业用户表格路由
	{
		path: '/enterprise_users/table',
		name: '/enterprise_users_table',
		component: () => import('../views/enterprise_users/table.vue')
	},
	// 企业用户详情路由
	{
		path: '/enterprise_users/view',
		name: '/enterprise_users_view',
		component: () => import('../views/enterprise_users/view.vue')
	},
	
	
		// 职位分类表格路由
	{
		path: '/job_classification/table',
		name: '/job_classification_table',
		component: () => import('../views/job_classification/table.vue')
	},
	// 职位分类详情路由
	{
		path: '/job_classification/view',
		name: '/job_classification_view',
		component: () => import('../views/job_classification/view.vue')
	},
	
	
		// 招聘信息表格路由
	{
		path: '/recruitment_information/table',
		name: '/recruitment_information_table',
		component: () => import('../views/recruitment_information/table.vue')
	},
	// 招聘信息详情路由
	{
		path: '/recruitment_information/view',
		name: '/recruitment_information_view',
		component: () => import('../views/recruitment_information/view.vue')
	},
	
		// 招聘信息列表路由
	{
		path: '/recruitment_information/list',
		name: '/recruitment_information_list',
		component: () => import('../views/recruitment_information/list.vue')
	},
	
		// 招聘信息详情路由
	{
		path: '/recruitment_information/details',
		name: '/recruitment_information_details',
		component: () => import('../views/recruitment_information/details.vue')
	},
		// 简历投递表格路由
	{
		path: '/resume_submission/table',
		name: '/resume_submission_table',
		component: () => import('../views/resume_submission/table.vue')
	},
	// 简历投递详情路由
	{
		path: '/resume_submission/view',
		name: '/resume_submission_view',
		component: () => import('../views/resume_submission/view.vue')
	},
		// 简历投递添加路由
	{
		path: '/resume_submission/edit',
		name: '/resume_submission_edit',
		component: () => import('../views/resume_submission/edit.vue')
	},
	
	
		// 职位咨询表格路由
	{
		path: '/job_consultation/table',
		name: '/job_consultation_table',
		component: () => import('../views/job_consultation/table.vue')
	},
	// 职位咨询详情路由
	{
		path: '/job_consultation/view',
		name: '/job_consultation_view',
		component: () => import('../views/job_consultation/view.vue')
	},
		// 职位咨询添加路由
	{
		path: '/job_consultation/edit',
		name: '/job_consultation_edit',
		component: () => import('../views/job_consultation/edit.vue')
	},
	
	
		// 面试通知表格路由
	{
		path: '/interview_notification/table',
		name: '/interview_notification_table',
		component: () => import('../views/interview_notification/table.vue')
	},
	// 面试通知详情路由
	{
		path: '/interview_notification/view',
		name: '/interview_notification_view',
		component: () => import('../views/interview_notification/view.vue')
	},
	
	
	
	// 用户路由
	{
		path: '/user/index',
		name: 'user_index',
		component: () => import('../views/user/index.vue')
	},
	// 基本信息
	{
		path: '/user/info',
		name: 'user_info',
		component: () => import('../views/user/info.vue')
	},
	// 找回密码
	{
		path: '/user/password',
		name: 'user_password',
		component: () => import('../views/user/password.vue')
	},

	// 搜索
	{
		path: '/search',
		name: 'search',
		component: () => import('../views/search/index.vue')
	},
	// 局部搜索
	{
		path: '/search/details',
		name: 'search_details',
		component: () => import('../views/search/details.vue')
	}
]

const router = new VueRouter({
	mode: 'hash',
	base: process.env.BASE_URL,
	routes
})

router.afterEach((to, from, next) => {
	let title = "求职招聘系统-home";
	document.title = title;
	document.logo = "求职招聘系统"
})

export default router
