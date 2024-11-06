<template>
	<div class="page_user" id="user_address">
		<div class="warp">
			<div class="container">
				<div class="row justify-content-between">
					<div class="col-12 col-md-3">
						<div class="card_menu">
							<!-- 左侧边栏 -->
							<list_admin_menu_user></list_admin_menu_user>
						</div>
					</div>
					<div class="col-12 col-md-9">
						<div class="card_addres pl-2">
							<!-- 职位咨询 -->
							<div><span>职位咨询</span></div>
							<view_job_consultation v-if="$check_action('/job_consultation/view','get')"></view_job_consultation>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>


<script>
	import list_admin_menu_user from "@/components/diy/list_admin_menu_user.vue";
	import view_job_consultation from "../../components/diy/view_job_consultation.vue";
	export default {
		data() {
			return {
			};
		},
		mounted() {
		},
		methods: {
		},
		components: {
			list_admin_menu_user,
			view_job_consultation,
		},
	};
</script>

<style scoped>
	.container {
		min-height: 800px;
	}
</style>
