(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-29853317"],{1060:function(e,t,s){},"3f45":function(e,t,s){"use strict";s("c103")},"40c9":function(e,t,s){},a648:function(e,t,s){"use strict";s.r(t);var r=function(){var e=this,t=e._self._c;return t("div",{staticClass:"page_user",attrs:{id:"user_address"}},[t("div",{staticClass:"warp"},[t("div",{staticClass:"container"},[t("div",{staticClass:"row justify-content-between"},[t("div",{staticClass:"col-12 col-md-3"},[t("div",{staticClass:"card_menu"},[t("list_admin_menu_user")],1)]),t("div",{staticClass:"col-12 col-md-9"},[t("div",{staticClass:"card_addres pl-2"},[e._m(0),e.$check_action("/interview_notification/table","get")?t("table_interview_notification"):e._e()],1)])])])])])},a=[function(){var e=this,t=e._self._c;return t("div",[t("span",[e._v("面试通知")])])}],i=s("bc88"),n=function(){var e=this,t=e._self._c;return t("el-main",{staticClass:"bg table_wrap"},[t("el-form",{staticClass:"form p_4",attrs:{"label-position":"right",model:e.query,"label-width":"120"}},[t("el-row",{staticClass:"rows row1"},[t("el-col",{staticClass:"el_form_search_wrap",attrs:{xs:24,sm:24,lg:8}},[t("el-form-item",{attrs:{label:"人事姓名"}},[t("el-input",{model:{value:e.query.personnel_name,callback:function(t){e.$set(e.query,"personnel_name",t)},expression:"query.personnel_name"}})],1)],1),t("el-col",{staticClass:"el_form_search_wrap",attrs:{xs:24,sm:24,lg:8}},[t("el-form-item",{attrs:{label:"用户姓名"}},[t("el-input",{model:{value:e.query.user_name,callback:function(t){e.$set(e.query,"user_name",t)},expression:"query.user_name"}})],1)],1),t("el-col",{staticClass:"el_form_search_wrap",attrs:{xs:24,sm:24,lg:8}},[t("el-form-item",{attrs:{label:"招聘职位"}},[t("el-input",{model:{value:e.query.recruitment_positions,callback:function(t){e.$set(e.query,"recruitment_positions",t)},expression:"query.recruitment_positions"}})],1)],1)],1),t("el-row",{staticClass:"rows row2"},[t("el-col",{staticClass:"search_btn_wrap search_btns",attrs:{xs:24,sm:24,lg:24}},[t("el-col",{staticClass:"search_btn_1 search_btn_wrap_1 btns",attrs:{xs:24,sm:10,lg:8}},[t("el-button",{staticClass:"search_btn_find",attrs:{type:"primary"},on:{click:function(t){return e.search()}}},[e._v("查询")]),t("el-button",{staticClass:"search_btn_reset",staticStyle:{"margin-right":"74px"},on:{click:function(t){return e.reset()}}},[e._v("重置")]),"管理员"==e.user_group||e.$check_action("/interview_notification/table","add")||e.$check_action("/interview_notification/view","add")?t("el-button",{staticClass:"add",on:{click:function(t){return e.$router.push("./view?")}}},[e._v("添加")]):e._e(),"管理员"==e.user_group||e.$check_action("/interview_notification/table","del")||e.$check_action("/interview_notification/view","del")?t("el-button",{staticClass:"search_btn_del",attrs:{type:"danger"},on:{click:function(t){return e.delInfo()}}},[e._v("删除")]):e._e()],1)],1)],1)],1),t("el-table",{staticStyle:{width:"100%"},attrs:{data:e.list,id:"dataTable"},on:{"selection-change":e.selectionChange,"sort-change":e.$sortChange}},[t("el-table-column",{attrs:{fixed:"",type:"selection","tooltip-effect":"dark",width:"55"}}),"管理员"==e.user_group||e.$check_field("get","enterprise_users")?t("el-table-column",{attrs:{prop:"enterprise_users",label:"企业用户","min-width":"200"},on:{"sort-change":e.$sortChange},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(e.get_user_enterprise_users(t.row["enterprise_users"]))+" ")]}}],null,!1,3108191123)}):e._e(),"管理员"==e.user_group||e.$check_field("get","enterprise_id")?t("el-table-column",{attrs:{prop:"enterprise_id",label:"企业编号","min-width":"200"},on:{"sort-change":e.$sortChange}}):e._e(),"管理员"==e.user_group||e.$check_field("get","enterprise_name")?t("el-table-column",{attrs:{prop:"enterprise_name",label:"企业名称","min-width":"200"},on:{"sort-change":e.$sortChange}}):e._e(),"管理员"==e.user_group||e.$check_field("get","personnel_name")?t("el-table-column",{attrs:{prop:"personnel_name",label:"人事姓名","min-width":"200"},on:{"sort-change":e.$sortChange}}):e._e(),"管理员"==e.user_group||e.$check_field("get","enterprise_phone_number")?t("el-table-column",{attrs:{prop:"enterprise_phone_number",label:"企业电话","min-width":"200"},on:{"sort-change":e.$sortChange}}):e._e(),"管理员"==e.user_group||e.$check_field("get","regular_users")?t("el-table-column",{attrs:{prop:"regular_users",label:"普通用户","min-width":"200"},on:{"sort-change":e.$sortChange},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(e.get_user_regular_users(t.row["regular_users"]))+" ")]}}],null,!1,1966286131)}):e._e(),"管理员"==e.user_group||e.$check_field("get","user_name")?t("el-table-column",{attrs:{prop:"user_name",label:"用户姓名","min-width":"200"},on:{"sort-change":e.$sortChange}}):e._e(),"管理员"==e.user_group||e.$check_field("get","user_gender")?t("el-table-column",{attrs:{prop:"user_gender",label:"用户性别","min-width":"200"},on:{"sort-change":e.$sortChange}}):e._e(),"管理员"==e.user_group||e.$check_field("get","contact_information")?t("el-table-column",{attrs:{prop:"contact_information",label:"联系方式","min-width":"200"},on:{"sort-change":e.$sortChange}}):e._e(),"管理员"==e.user_group||e.$check_field("get","recruitment_positions")?t("el-table-column",{attrs:{prop:"recruitment_positions",label:"招聘职位","min-width":"200"},on:{"sort-change":e.$sortChange}}):e._e(),"管理员"==e.user_group||e.$check_field("get","job_classification")?t("el-table-column",{attrs:{prop:"job_classification",label:"职位分类","min-width":"200"},on:{"sort-change":e.$sortChange}}):e._e(),"管理员"==e.user_group||e.$check_field("get","work_city")?t("el-table-column",{attrs:{prop:"work_city",label:"工作城市","min-width":"200"},on:{"sort-change":e.$sortChange}}):e._e(),"管理员"==e.user_group||e.$check_field("get","interview_time")?t("el-table-column",{attrs:{prop:"interview_time",label:"面试时间","min-width":"200"},on:{"sort-change":e.$sortChange},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(e.$toTime(t.row["interview_time"],"yyyy-MM-dd hh:mm:ss"))+" ")]}}],null,!1,3785398641)}):e._e(),"管理员"==e.user_group||e.$check_field("get","interview_notes")?t("el-table-column",{attrs:{prop:"interview_notes",label:"面试备注","min-width":"200"},on:{"sort-change":e.$sortChange}}):e._e(),t("el-table-column",{attrs:{sortable:"",prop:"create_time",label:"创建时间","min-width":"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(e.$toTime(t.row["create_time"],"yyyy-MM-dd hh:mm:ss"))+" ")]}}])}),t("el-table-column",{attrs:{sortable:"",prop:"update_time",label:"更新时间","min-width":"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(e.$toTime(t.row["update_time"],"yyyy-MM-dd hh:mm:ss"))+" ")]}}])}),"管理员"==e.user_group||e.$check_action("/interview_notification/table","set")||e.$check_action("/interview_notification/view","set")||e.$check_action("/interview_notification/view","get")||e.$check_action("/${table.tableConfig.table_nav_name}/table","add")||e.$check_action("/${table.tableConfig.table_nav_name}/view","add")?t("el-table-column",{attrs:{fixed:"right",label:"操作","min-width":"120"},scopedSlots:e._u([{key:"default",fn:function(s){return["管理员"==e.user_group||e.$check_action("/interview_notification/table","set")||e.$check_action("/interview_notification/view","set")||e.$check_action("/interview_notification/view","get")?t("router-link",{staticClass:"el-button el-button--small is-plain el-button--success",staticStyle:{margin:"5px !important"},attrs:{to:"./view?"+e.field+"="+s.row[e.field],size:"small"}},[t("span",[e._v("详情")])]):e._e()]}}],null,!1,3900667329)}):e._e()],1),t("div",{staticClass:"mt text_center"},[t("el-pagination",{attrs:{"current-page":e.query.page,"page-sizes":[7,10,30,100],"page-size":e.query.size,layout:"total, sizes, prev, pager, next, jumper",total:e.count},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),e.showModal?t("div",{staticClass:"modal_wrap"},[t("div",{staticClass:"modal_box"},[t("p",{staticClass:"modal_box_title"},[e._v("重要提醒")]),t("p",{staticClass:"modal_box_text"},[e._v("当前有数据达到预警值！")]),t("div",{staticClass:"btn_box"},[t("span",{on:{click:e.closeModal}},[e._v("取消")]),t("span",{on:{click:e.closeModal}},[e._v("确定")])])])]):e._e()],1)},l=[],o=s("c6e7"),c={mixins:[o["a"]],data(){return{showModal:!1,url_get_list:"~/api/interview_notification/get_list?like=0",url_del:"~/api/interview_notification/del?",field:"interview_notification_id",query:{size:7,page:1,personnel_name:"",user_name:"",recruitment_positions:"",login_time:"",create_time:"",orderby:"create_time desc"},list:[],list_user_enterprise_users:[],list_user_regular_users:[]}},methods:{closeModal(){this.showModal=!1},get_list_before(e){var t=this.$store.state.user.user_group;if("管理员"!=t){let s="(";"企业用户"==t&&(s+="enterprise_users = "+this.$store.state.user.user_id+" or "),"普通用户"==t&&(s+="regular_users = "+this.$store.state.user.user_id+" or "),s.length>1&&(s=s.substr(0,s.length-4),s+=")",e["sqlwhere"]=s)}return e},async get_list_user_enterprise_users(){var e=await this.$get("~/api/user/get_list?user_group=企业用户");e.result&&e.result.list?this.list_user_enterprise_users=e.result.list:e.error&&console.error(e.error)},get_user_enterprise_users(e){var t=this.list_user_enterprise_users.getObj({user_id:e}),s="";return t&&(s=t.nickname+"-"+t.username),s},async get_list_user_regular_users(){var e=await this.$get("~/api/user/get_list?user_group=普通用户");e.result&&e.result.list?this.list_user_regular_users=e.result.list:e.error&&console.error(e.error)},get_user_regular_users(e){var t=this.list_user_regular_users.getObj({user_id:e}),s="";return t&&(s=t.nickname+"-"+t.username),s},deleteRow(e,t){t.splice(e,1)}},created(){this.get_list_user_enterprise_users(),this.get_list_user_regular_users()}},_=c,u=(s("3f45"),s("0b56")),p=Object(u["a"])(_,n,l,!1,null,null,null),h=p.exports,m={data(){return{}},mounted(){},methods:{},components:{list_admin_menu_user:i["a"],table_interview_notification:h}},d=m,g=(s("dfc5"),Object(u["a"])(d,r,a,!1,null,"2ab85f31",null));t["default"]=g.exports},bc88:function(e,t,s){"use strict";var r=function(){var e=this,t=e._self._c;return t("div",{staticClass:"list_menu diy_menu"},[t("router-link",{staticClass:"menu_item",class:{selected:"/user_center/index"===this.$route.path},attrs:{to:"/user_center/index"}},[t("span",{staticClass:"left_span"},[e._v("个人首页")]),t("span",{staticClass:"right_span"},[t("b-icon",{attrs:{icon:"house-fill"}})],1)]),"管理员"==e.user_group||e.$check_action("/regular_users/table","get")?t("router-link",{staticClass:"menu_item",class:{selected:"/regular_users/table"===this.$route.path},attrs:{to:"/regular_users/table"}},[t("span",{staticClass:"left_span"},[e._v("普通用户")]),t("span",{staticClass:"right_span"},[t("b-icon",{attrs:{icon:"house-fill"}})],1)]):e._e(),"管理员"==e.user_group||e.$check_action("/enterprise_users/table","get")?t("router-link",{staticClass:"menu_item",class:{selected:"/enterprise_users/table"===this.$route.path},attrs:{to:"/enterprise_users/table"}},[t("span",{staticClass:"left_span"},[e._v("企业用户")]),t("span",{staticClass:"right_span"},[t("b-icon",{attrs:{icon:"house-fill"}})],1)]):e._e(),"管理员"==e.user_group||e.$check_action("/job_classification/table","get")?t("router-link",{staticClass:"menu_item",class:{selected:"/job_classification/table"===this.$route.path},attrs:{to:"/job_classification/table"}},[t("span",{staticClass:"left_span"},[e._v("职位分类")]),t("span",{staticClass:"right_span"},[t("b-icon",{attrs:{icon:"house-fill"}})],1)]):e._e(),"管理员"==e.user_group||e.$check_action("/recruitment_information/table","get")?t("router-link",{staticClass:"menu_item",class:{selected:"/recruitment_information/table"===this.$route.path},attrs:{to:"/recruitment_information/table"}},[t("span",{staticClass:"left_span"},[e._v("招聘信息")]),t("span",{staticClass:"right_span"},[t("b-icon",{attrs:{icon:"house-fill"}})],1)]):e._e(),"管理员"==e.user_group||e.$check_action("/resume_submission/table","get")?t("router-link",{staticClass:"menu_item",class:{selected:"/resume_submission/table"===this.$route.path},attrs:{to:"/resume_submission/table"}},[t("span",{staticClass:"left_span"},[e._v("简历投递")]),t("span",{staticClass:"right_span"},[t("b-icon",{attrs:{icon:"house-fill"}})],1)]):e._e(),"管理员"==e.user_group||e.$check_action("/job_consultation/table","get")?t("router-link",{staticClass:"menu_item",class:{selected:"/job_consultation/table"===this.$route.path},attrs:{to:"/job_consultation/table"}},[t("span",{staticClass:"left_span"},[e._v("职位咨询")]),t("span",{staticClass:"right_span"},[t("b-icon",{attrs:{icon:"house-fill"}})],1)]):e._e(),"管理员"==e.user_group||e.$check_action("/interview_notification/table","get")?t("router-link",{staticClass:"menu_item",class:{selected:"/interview_notification/table"===this.$route.path},attrs:{to:"/interview_notification/table"}},[t("span",{staticClass:"left_span"},[e._v("面试通知")]),t("span",{staticClass:"right_span"},[t("b-icon",{attrs:{icon:"house-fill"}})],1)]):e._e(),"管理员"==e.user_group||e.$check_action("/collect/list","get")?t("router-link",{staticClass:"menu_item",class:{selected:"/collect/list"===this.$route.path},attrs:{to:"/user/collect"}},[t("span",{staticClass:"left_span"},[e._v("收藏")]),t("span",{staticClass:"right_span"},[t("b-icon",{attrs:{icon:"house-fill"}})],1)]):e._e()],1)},a=[],i=s("c6e7"),n={mixins:[i["a"]],data(){return{}},mounted(){},methods:{},components:{}},l=n,o=(s("ed24"),s("0b56")),c=Object(o["a"])(l,r,a,!1,null,"046246b4",null);t["a"]=c.exports},c103:function(e,t,s){},dfc5:function(e,t,s){"use strict";s("40c9")},ed24:function(e,t,s){"use strict";s("1060")}}]);