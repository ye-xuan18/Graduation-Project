(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-701fc4f4"],{1060:function(e,s,t){},3122:function(e,s,t){"use strict";t("3ca5")},"3ca5":function(e,s,t){},"8e0e":function(e,s,t){},bc88:function(e,s,t){"use strict";var r=function(){var e=this,s=e._self._c;return s("div",{staticClass:"list_menu diy_menu"},[s("router-link",{staticClass:"menu_item",class:{selected:"/user_center/index"===this.$route.path},attrs:{to:"/user_center/index"}},[s("span",{staticClass:"left_span"},[e._v("个人首页")]),s("span",{staticClass:"right_span"},[s("b-icon",{attrs:{icon:"house-fill"}})],1)]),"管理员"==e.user_group||e.$check_action("/regular_users/table","get")?s("router-link",{staticClass:"menu_item",class:{selected:"/regular_users/table"===this.$route.path},attrs:{to:"/regular_users/table"}},[s("span",{staticClass:"left_span"},[e._v("普通用户")]),s("span",{staticClass:"right_span"},[s("b-icon",{attrs:{icon:"house-fill"}})],1)]):e._e(),"管理员"==e.user_group||e.$check_action("/enterprise_users/table","get")?s("router-link",{staticClass:"menu_item",class:{selected:"/enterprise_users/table"===this.$route.path},attrs:{to:"/enterprise_users/table"}},[s("span",{staticClass:"left_span"},[e._v("企业用户")]),s("span",{staticClass:"right_span"},[s("b-icon",{attrs:{icon:"house-fill"}})],1)]):e._e(),"管理员"==e.user_group||e.$check_action("/job_classification/table","get")?s("router-link",{staticClass:"menu_item",class:{selected:"/job_classification/table"===this.$route.path},attrs:{to:"/job_classification/table"}},[s("span",{staticClass:"left_span"},[e._v("职位分类")]),s("span",{staticClass:"right_span"},[s("b-icon",{attrs:{icon:"house-fill"}})],1)]):e._e(),"管理员"==e.user_group||e.$check_action("/recruitment_information/table","get")?s("router-link",{staticClass:"menu_item",class:{selected:"/recruitment_information/table"===this.$route.path},attrs:{to:"/recruitment_information/table"}},[s("span",{staticClass:"left_span"},[e._v("招聘信息")]),s("span",{staticClass:"right_span"},[s("b-icon",{attrs:{icon:"house-fill"}})],1)]):e._e(),"管理员"==e.user_group||e.$check_action("/resume_submission/table","get")?s("router-link",{staticClass:"menu_item",class:{selected:"/resume_submission/table"===this.$route.path},attrs:{to:"/resume_submission/table"}},[s("span",{staticClass:"left_span"},[e._v("简历投递")]),s("span",{staticClass:"right_span"},[s("b-icon",{attrs:{icon:"house-fill"}})],1)]):e._e(),"管理员"==e.user_group||e.$check_action("/job_consultation/table","get")?s("router-link",{staticClass:"menu_item",class:{selected:"/job_consultation/table"===this.$route.path},attrs:{to:"/job_consultation/table"}},[s("span",{staticClass:"left_span"},[e._v("职位咨询")]),s("span",{staticClass:"right_span"},[s("b-icon",{attrs:{icon:"house-fill"}})],1)]):e._e(),"管理员"==e.user_group||e.$check_action("/interview_notification/table","get")?s("router-link",{staticClass:"menu_item",class:{selected:"/interview_notification/table"===this.$route.path},attrs:{to:"/interview_notification/table"}},[s("span",{staticClass:"left_span"},[e._v("面试通知")]),s("span",{staticClass:"right_span"},[s("b-icon",{attrs:{icon:"house-fill"}})],1)]):e._e(),"管理员"==e.user_group||e.$check_action("/collect/list","get")?s("router-link",{staticClass:"menu_item",class:{selected:"/collect/list"===this.$route.path},attrs:{to:"/user/collect"}},[s("span",{staticClass:"left_span"},[e._v("收藏")]),s("span",{staticClass:"right_span"},[s("b-icon",{attrs:{icon:"house-fill"}})],1)]):e._e()],1)},a=[],i=t("c6e7"),n={mixins:[i["a"]],data(){return{}},mounted(){},methods:{},components:{}},l=n,o=(t("ed24"),t("0b56")),_=Object(o["a"])(l,r,a,!1,null,"046246b4",null);s["a"]=_.exports},c669:function(e,s,t){"use strict";t.r(s);var r=function(){var e=this,s=e._self._c;return s("div",{staticClass:"page_user",attrs:{id:"user_address"}},[s("div",{staticClass:"warp"},[s("div",{staticClass:"container"},[s("div",{staticClass:"row justify-content-between"},[s("div",{staticClass:"col-12 col-md-3"},[s("div",{staticClass:"card_menu"},[s("list_admin_menu_user")],1)]),s("div",{staticClass:"col-12 col-md-9"},[s("div",{staticClass:"card_addres pl-2"},[e._m(0),e.$check_action("/enterprise_users/view","get")?s("view_enterprise_users"):e._e()],1)])])])])])},a=[function(){var e=this,s=e._self._c;return s("div",[s("span",[e._v("企业用户")])])}],i=t("bc88"),n=function(){var e=this,s=e._self._c;return s("el-main",{staticClass:"bg edit_wrap"},[e.is_view()?s("el-form",{ref:"form",attrs:{model:e.form,"status-icon":"","label-width":"120px"}},[s("el-row",{staticClass:"row_ce"},[s("el-col",{staticClass:"el_form_item_warp",attrs:{xs:24,sm:12,lg:8}},[s("el-form-item",{attrs:{label:"头像",prop:"avatar"}},[s("el-upload",{staticClass:"avatar-uploader",attrs:{drag:"",accept:"image/gif, image/jpeg, image/png, image/jpg",action:"","http-request":e.uploadimg,"show-file-list":!1}},[e.form.avatar?s("img",{staticClass:"avatar",attrs:{src:e.$fullUrl(e.form.avatar)}}):s("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1)],1),s("el-col",{staticClass:"el_form_item_warp",attrs:{xs:24,sm:12,lg:8}},[s("el-form-item",{attrs:{label:"账号",prop:"username"}},[e.obj.username?s("span",[e._v(e._s(e.obj.username))]):s("el-input",{attrs:{placeholder:"请输入账号"},model:{value:e.form.username,callback:function(s){e.$set(e.form,"username",s)},expression:"form.username"}})],1)],1),s("el-col",{staticClass:"el_form_item_warp",attrs:{xs:24,sm:12,lg:8}},[s("el-form-item",{attrs:{label:"密码",prop:"password"}},[e.obj.password?s("span",[e._v(e._s(e.obj.password))]):s("el-input",{attrs:{type:"password",placeholder:"请输入密码","show-password":""},model:{value:e.form.password,callback:function(s){e.$set(e.form,"password",s)},expression:"form.password"}})],1)],1),s("el-col",{staticClass:"el_form_item_warp",attrs:{xs:24,sm:12,lg:8}},[s("el-form-item",{attrs:{label:"昵称",prop:"nickname"}},[s("el-input",{attrs:{placeholder:"请输入昵称"},model:{value:e.form.nickname,callback:function(s){e.$set(e.form,"nickname",s)},expression:"form.nickname"}})],1)],1),s("el-col",{staticClass:"el_form_item_warp",attrs:{xs:24,sm:12,lg:8}},[s("el-form-item",{attrs:{label:"邮箱",prop:"email"}},[s("el-input",{attrs:{type:"email",placeholder:"请输入邮箱"},model:{value:e.form.email,callback:function(s){e.$set(e.form,"email",s)},expression:"form.email"}})],1)],1),s("el-col",{staticClass:"el_form_item_warp",attrs:{xs:24,sm:12,lg:8}},[s("el-form-item",{attrs:{label:"状态",prop:"state"}},[s("el-select",{attrs:{disabled:"管理员"!==e.user_group,placeholder:"请选择"},model:{value:e.form.state,callback:function(s){e.$set(e.form,"state",s)},expression:"form.state"}},e._l(e.list_user_state,(function(e){return s("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})})),1)],1)],1),"管理员"===e.user_group||e.$check_field("get","enterprise_id")||e.$check_field("add","enterprise_id")||e.$check_field("set","enterprise_id")?s("el-col",{staticClass:"el_form_item_warp",attrs:{xs:24,sm:12,lg:8}},[s("el-form-item",{attrs:{label:"企业编号",prop:"enterprise_id"}},["管理员"===e.user_group||e.form_sub["enterprise_users_id"]&&e.$check_field("set","enterprise_id")||!e.form_sub["enterprise_users_id"]&&e.$check_field("add","enterprise_id")?s("el-input",{attrs:{id:"enterprise_id",placeholder:"请输入企业编号"},model:{value:e.form_sub["enterprise_id"],callback:function(s){e.$set(e.form_sub,"enterprise_id",s)},expression:"form_sub['enterprise_id']"}}):e.$check_field("get","enterprise_id")?s("div",[e._v(e._s(e.form_sub["enterprise_id"]))]):e._e()],1)],1):e._e(),"管理员"===e.user_group||e.$check_field("get","enterprise_name")||e.$check_field("add","enterprise_name")||e.$check_field("set","enterprise_name")?s("el-col",{staticClass:"el_form_item_warp",attrs:{xs:24,sm:12,lg:8}},[s("el-form-item",{attrs:{label:"企业名称",prop:"enterprise_name"}},["管理员"===e.user_group||e.form_sub["enterprise_users_id"]&&e.$check_field("set","enterprise_name")||!e.form_sub["enterprise_users_id"]&&e.$check_field("add","enterprise_name")?s("el-input",{attrs:{id:"enterprise_name",placeholder:"请输入企业名称"},model:{value:e.form_sub["enterprise_name"],callback:function(s){e.$set(e.form_sub,"enterprise_name",s)},expression:"form_sub['enterprise_name']"}}):e.$check_field("get","enterprise_name")?s("div",[e._v(e._s(e.form_sub["enterprise_name"]))]):e._e()],1)],1):e._e(),"管理员"===e.user_group||e.$check_field("get","personnel_name")||e.$check_field("add","personnel_name")||e.$check_field("set","personnel_name")?s("el-col",{staticClass:"el_form_item_warp",attrs:{xs:24,sm:12,lg:8}},[s("el-form-item",{attrs:{label:"人事姓名",prop:"personnel_name"}},["管理员"===e.user_group||e.form_sub["enterprise_users_id"]&&e.$check_field("set","personnel_name")||!e.form_sub["enterprise_users_id"]&&e.$check_field("add","personnel_name")?s("el-input",{attrs:{id:"personnel_name",placeholder:"请输入人事姓名"},model:{value:e.form_sub["personnel_name"],callback:function(s){e.$set(e.form_sub,"personnel_name",s)},expression:"form_sub['personnel_name']"}}):e.$check_field("get","personnel_name")?s("div",[e._v(e._s(e.form_sub["personnel_name"]))]):e._e()],1)],1):e._e(),"管理员"===e.user_group||e.$check_field("get","enterprise_phone_number")||e.$check_field("add","enterprise_phone_number")||e.$check_field("set","enterprise_phone_number")?s("el-col",{staticClass:"el_form_item_warp",attrs:{xs:24,sm:12,lg:8}},[s("el-form-item",{attrs:{label:"企业电话",prop:"enterprise_phone_number"}},["管理员"===e.user_group||e.form_sub["enterprise_users_id"]&&e.$check_field("set","enterprise_phone_number")||!e.form_sub["enterprise_users_id"]&&e.$check_field("add","enterprise_phone_number")?s("el-input",{attrs:{id:"enterprise_phone_number",placeholder:"请输入企业电话"},model:{value:e.form_sub["enterprise_phone_number"],callback:function(s){e.$set(e.form_sub,"enterprise_phone_number",s)},expression:"form_sub['enterprise_phone_number']"}}):e.$check_field("get","enterprise_phone_number")?s("div",[e._v(e._s(e.form_sub["enterprise_phone_number"]))]):e._e()],1)],1):e._e()],1),s("el-col",{staticClass:"el_form_btn_warp",attrs:{xs:24,sm:12,lg:8}},[e.$check_action("/enterprise_users/view","set")||e.$check_action("/enterprise_users/view","add")||e.$check_option("/enterprise_users/table","examine")?s("el-form-item",[s("el-button",{attrs:{type:"primary"},on:{click:function(s){return e.submit()}}},[e._v("提交")]),s("el-button",{on:{click:function(s){return e.cancel()}}},[e._v("取消")])],1):s("el-form-item",[s("el-button",{on:{click:function(s){return e.cancel()}}},[e._v("返回")])],1)],1)],1):e._e()],1)},l=[],o=t("c6e7"),_={mixins:[o["a"]],data(){return{field:"user_id",url_add:"~/api/user/register?",url_set:"~/api/user/set?",url_get_obj:"~/api/user/get_obj?",url_upload:"~/api/user/upload?",group_table:"enterprise_users",is_password:!0,query:{user_id:0},obj:{user_id:0,username:"",nickname:"",password:"",avatar:"",email:"",user_group:"企业用户",state:1,vip_level:"",vip_discount:0},form:{user_id:0,username:"",nickname:"",password:"",avatar:"",email:"",user_group:"企业用户",state:1,vip_level:"",vip_discount:0},disabledObj:{enterprise_id_isDisabled:!1,enterprise_name_isDisabled:!1,personnel_name_isDisabled:!1,enterprise_phone_number_isDisabled:!1},form_sub:{enterprise_id:"",enterprise_name:"",personnel_name:"",enterprise_phone_number:"",user_id:0,enterprise_users_id:0},list_state:[{value:0,name:"未认证"},{value:1,name:"审核中"},{value:2,name:"已认证"}],list_user_state:[{value:1,name:"可用"},{value:2,name:"异常"},{value:3,name:"已冻结"},{value:4,name:"已注销"}]}},methods:{get_obj_before(e){var s="";return this.form&&s&&Object.keys(this.form).forEach(e=>{Object.keys(s).forEach(s=>{e===s&&(this.disabledObj[e+"_isDisabled"]=!0)})}),$.db.del("form"),e},get_obj_after(e,s){var t=e.result.obj;this.is_password=!t.password;var r=t.user_id;this.$get("~/api/"+this.group_table+"/get_obj?",{user_id:r},e=>{if(e.result&&e.result.obj){var s=e.result.obj;delete s["create_time"],delete s["update_time"],this.form_sub=e.result.obj}else e.error&&(console.log(e.error),console.log("获取不到相关信息"))})},async submit(e,s){e||(e=this.form);var t,r=this.events("submit_before",Object.assign({},e))||e,a=await this.events("submit_check",r);return a?this.$toast(a,"danger"):t=this.events("submit_main",r,s),t},async submit_check(e){var s=null,t=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,{username:r,password:a,nickname:i,user_group:n,email:l}=e;this.confirm_password;console.log("表单校验username ,password ,email ,nickname ,user_group",r,a,l,i,n),r?r.length>16||r.length<5?s="账号长度应为5到16个字符之间！":a?this.is_password&&(a.length>16||a.length<5)?s="密码长度应为5到16个字符之间！":i&&i.length>12||i.length<2?s="昵称长度应为2个字符到12个字符之间":l&&!t.test(l)?s="请输入正确的邮箱地址 例：test@test.com!":n||(s="请选择用户组!"):s="密码不能为空!":s="账号不能为空";e.username;var o=Object.assign({},this.form_sub);if(s||o["enterprise_id"]){if(!s&&!o["enterprise_users_id"]){let e=await this.$get("~/api/enterprise_users/count?",{enterprise_id:o["enterprise_id"]});e.result&&(s="企业编号已存在!")}}else s="企业编号不能为空!";return s},submit_after(e,s){var t=Object.assign({},this.form);delete t.password,console.log("查询表单form",t),this.get_register(t)},get_register(e){var s=this.form_sub;this.$get("~/api/user/get_obj?",e,e=>{console.log("注册表信息res",e),e.result&&e.result.obj?(s.user_id=e.result.obj.user_id,this.submit_sub(s)):e.error&&(console.error(e.error),this.$toast(e.error.message,"error"))})},submit_sub(e){e=this.events("submit_before",Object.assign({},e))||e,e["enterprise_users_id"]?this.$post("~/api/"+this.group_table+"/set?enterprise_users_id="+e["enterprise_users_id"],e,e=>{console.log("提交结果：",e),e.result?(this.$toast("修改成功!","success"),this.$router.go(-1)):e.error&&(console.error(e.error),this.$toast(e.error.message,"error"))}):this.$post("~/api/"+this.group_table+"/add?",e,s=>{if(console.log("提交结果：",s),s.result)this.$toast("添加成功!","success"),this.$router.go(-1);else if(s.error){var t=e["user_id"];this.$get("~/api/user/del?",{user_id:t}),console.error(s.error),this.$toast(s.error.message,"error")}})},is_view(){var e="管理员"==this.user_group;return e||(e=this.$check_action("/enterprise_users/table","add"),console.log(e?"你有表格添加权限视作有添加权限":"你没有表格添加权限")),e||(e=this.$check_action("/enterprise_users/table","set"),console.log(e?"你有表格添加权限视作有修改权限":"你没有表格修改权限")),e||(e=this.$check_action("/enterprise_users/view","add"),console.log(e?"你有视图添加权限视作有添加权限":"你没有视图添加权限")),e||(e=this.$check_action("/enterprise_users/view","set"),console.log(e?"你有视图修改权限视作有修改权限":"你没有视图修改权限")),e||(e=this.$check_action("/enterprise_users/view","get"),console.log(e?"你有视图查询权限视作有查询权限":"你没有视图查询权限")),console.log(e?"具有当前页面的查看权，请注意这不代表你有字段的查看权":"无权查看当前页，请注意即便有字段查询权限没有页面查询权限也不行"),e},uploadimg(e){this.uploadFile(e.file,"avatar")}},created(){}},c=_,u=(t("3122"),t("0b56")),p=Object(u["a"])(c,n,l,!1,null,null,null),m=p.exports,d={data(){return{}},mounted(){},methods:{},components:{list_admin_menu_user:i["a"],view_enterprise_users:m}},f=d,b=(t("f841"),Object(u["a"])(f,r,a,!1,null,"5275f3e6",null));s["default"]=b.exports},ed24:function(e,s,t){"use strict";t("1060")},f841:function(e,s,t){"use strict";t("8e0e")}}]);