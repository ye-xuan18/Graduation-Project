(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-73ba5ebe"],{a24d:function(e,t,r){"use strict";r("d59c")},c7b3:function(e,t,r){"use strict";r.r(t);var s=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-main",{staticClass:"bg edit_wrap comtable_e"},[e.is_view()?r("el-form",{ref:"form",attrs:{model:e.form,"status-icon":"","label-width":"120px"}},[r("el-row",{staticClass:"row_ce"},["管理员"===e.user_group||e.$check_field("get","regular_users")||e.$check_field("add","regular_users")||e.$check_field("set","regular_users")?r("el-col",{staticClass:"el_form_item_warp",attrs:{xs:24,sm:12,lg:8}},[r("el-form-item",{attrs:{label:"普通用户",prop:"regular_users"}},["管理员"!==e.user_group?r("div",[e._v(" "+e._s(e.get_user_session_regular_users(e.form["regular_users"]))+" "),"管理员"===e.user_group||e.form["job_consultation_id"]&&e.$check_field("set","regular_users")||!e.form["job_consultation_id"]&&e.$check_field("add","regular_users")?r("el-select",{attrs:{id:"regular_users",disabled:e.disabledObj["regular_users_isDisabled"]},model:{value:e.form["regular_users"],callback:function(t){e.$set(e.form,"regular_users",t)},expression:"form['regular_users']"}},e._l(e.list_user_regular_users,(function(e){return r("el-option",{key:e["username"],attrs:{label:e["nickname"]+"-"+e["username"],value:e["user_id"]}})})),1):e.$check_field("get","regular_users")?r("el-select",{attrs:{id:"regular_users",disabled:!0},model:{value:e.form["regular_users"],callback:function(t){e.$set(e.form,"regular_users",t)},expression:"form['regular_users']"}},e._l(e.list_user_regular_users,(function(e){return r("el-option",{key:e["username"],attrs:{label:e["nickname"]+"-"+e["username"],value:e["user_id"]}})})),1):e._e()],1):r("el-select",{attrs:{id:"regular_users",disabled:e.disabledObj["regular_users_isDisabled"]},model:{value:e.form["regular_users"],callback:function(t){e.$set(e.form,"regular_users",t)},expression:"form['regular_users']"}},e._l(e.list_user_regular_users,(function(e){return r("el-option",{key:e["username"],attrs:{label:e["nickname"]+"-"+e["username"],value:e["user_id"]}})})),1)],1)],1):e._e(),"管理员"===e.user_group||e.$check_field("get","user_name")||e.$check_field("add","user_name")||e.$check_field("set","user_name")?r("el-col",{staticClass:"el_form_item_warp",attrs:{xs:24,sm:12,lg:8}},[r("el-form-item",{attrs:{label:"用户姓名",prop:"user_name"}},["管理员"===e.user_group||e.form["job_consultation_id"]&&e.$check_field("set","user_name")||!e.form["job_consultation_id"]&&e.$check_field("add","user_name")?r("el-input",{attrs:{id:"user_name",placeholder:"请输入用户姓名",disabled:e.disabledObj["user_name_isDisabled"]},model:{value:e.form["user_name"],callback:function(t){e.$set(e.form,"user_name",t)},expression:"form['user_name']"}}):e.$check_field("get","user_name")?r("div",[e._v(e._s(e.form["user_name"]))]):e._e()],1)],1):e._e(),"管理员"===e.user_group||e.$check_field("get","user_gender")||e.$check_field("add","user_gender")||e.$check_field("set","user_gender")?r("el-col",{staticClass:"el_form_item_warp",attrs:{xs:24,sm:12,lg:8}},[r("el-form-item",{attrs:{label:"用户性别",prop:"user_gender"}},["管理员"===e.user_group||e.form["job_consultation_id"]&&e.$check_field("set","user_gender")||!e.form["job_consultation_id"]&&e.$check_field("add","user_gender")?r("el-input",{attrs:{id:"user_gender",placeholder:"请输入用户性别",disabled:e.disabledObj["user_gender_isDisabled"]},model:{value:e.form["user_gender"],callback:function(t){e.$set(e.form,"user_gender",t)},expression:"form['user_gender']"}}):e.$check_field("get","user_gender")?r("div",[e._v(e._s(e.form["user_gender"]))]):e._e()],1)],1):e._e(),"管理员"===e.user_group||e.$check_field("get","contact_information")||e.$check_field("add","contact_information")||e.$check_field("set","contact_information")?r("el-col",{staticClass:"el_form_item_warp",attrs:{xs:24,sm:12,lg:8}},[r("el-form-item",{attrs:{label:"联系方式",prop:"contact_information"}},["管理员"===e.user_group||e.form["job_consultation_id"]&&e.$check_field("set","contact_information")||!e.form["job_consultation_id"]&&e.$check_field("add","contact_information")?r("el-input",{attrs:{id:"contact_information",placeholder:"请输入联系方式",disabled:e.disabledObj["contact_information_isDisabled"]},model:{value:e.form["contact_information"],callback:function(t){e.$set(e.form,"contact_information",t)},expression:"form['contact_information']"}}):e.$check_field("get","contact_information")?r("div",[e._v(e._s(e.form["contact_information"]))]):e._e()],1)],1):e._e(),"管理员"===e.user_group||e.$check_field("get","enterprise_users")||e.$check_field("add","enterprise_users")||e.$check_field("set","enterprise_users")?r("el-col",{staticClass:"el_form_item_warp",attrs:{xs:24,sm:12,lg:8}},[r("el-form-item",{attrs:{label:"企业用户",prop:"enterprise_users"}},["管理员"===e.user_group||e.form["job_consultation_id"]&&e.$check_field("set","enterprise_users")||!e.form["job_consultation_id"]&&e.$check_field("add","enterprise_users")?r("el-select",{attrs:{id:"enterprise_users",disabled:e.disabledObj["enterprise_users_isDisabled"]},model:{value:e.form["enterprise_users"],callback:function(t){e.$set(e.form,"enterprise_users",t)},expression:"form['enterprise_users']"}},e._l(e.list_user_enterprise_users,(function(e){return r("el-option",{key:e["username"],attrs:{label:e["nickname"]+"-"+e["username"],value:e["user_id"]}})})),1):e.$check_field("get","enterprise_users")?r("el-select",{attrs:{id:"enterprise_users",disabled:!0},model:{value:e.form["enterprise_users"],callback:function(t){e.$set(e.form,"enterprise_users",t)},expression:"form['enterprise_users']"}},e._l(e.list_user_enterprise_users,(function(e){return r("el-option",{key:e["username"],attrs:{label:e["nickname"]+"-"+e["username"],value:e["user_id"]}})})),1):e._e()],1)],1):e._e(),"管理员"===e.user_group||e.$check_field("get","enterprise_id")||e.$check_field("add","enterprise_id")||e.$check_field("set","enterprise_id")?r("el-col",{staticClass:"el_form_item_warp",attrs:{xs:24,sm:12,lg:8}},[r("el-form-item",{attrs:{label:"企业编号",prop:"enterprise_id"}},["管理员"===e.user_group||e.form["job_consultation_id"]&&e.$check_field("set","enterprise_id")||!e.form["job_consultation_id"]&&e.$check_field("add","enterprise_id")?r("el-input",{attrs:{id:"enterprise_id",placeholder:"请输入企业编号",disabled:e.disabledObj["enterprise_id_isDisabled"]},model:{value:e.form["enterprise_id"],callback:function(t){e.$set(e.form,"enterprise_id",t)},expression:"form['enterprise_id']"}}):e.$check_field("get","enterprise_id")?r("div",[e._v(e._s(e.form["enterprise_id"]))]):e._e()],1)],1):e._e(),"管理员"===e.user_group||e.$check_field("get","enterprise_name")||e.$check_field("add","enterprise_name")||e.$check_field("set","enterprise_name")?r("el-col",{staticClass:"el_form_item_warp",attrs:{xs:24,sm:12,lg:8}},[r("el-form-item",{attrs:{label:"企业名称",prop:"enterprise_name"}},["管理员"===e.user_group||e.form["job_consultation_id"]&&e.$check_field("set","enterprise_name")||!e.form["job_consultation_id"]&&e.$check_field("add","enterprise_name")?r("el-input",{attrs:{id:"enterprise_name",placeholder:"请输入企业名称",disabled:e.disabledObj["enterprise_name_isDisabled"]},model:{value:e.form["enterprise_name"],callback:function(t){e.$set(e.form,"enterprise_name",t)},expression:"form['enterprise_name']"}}):e.$check_field("get","enterprise_name")?r("div",[e._v(e._s(e.form["enterprise_name"]))]):e._e()],1)],1):e._e(),"管理员"===e.user_group||e.$check_field("get","recruitment_positions")||e.$check_field("add","recruitment_positions")||e.$check_field("set","recruitment_positions")?r("el-col",{staticClass:"el_form_item_warp",attrs:{xs:24,sm:12,lg:8}},[r("el-form-item",{attrs:{label:"招聘职位",prop:"recruitment_positions"}},["管理员"===e.user_group||e.form["job_consultation_id"]&&e.$check_field("set","recruitment_positions")||!e.form["job_consultation_id"]&&e.$check_field("add","recruitment_positions")?r("el-input",{attrs:{id:"recruitment_positions",placeholder:"请输入招聘职位",disabled:e.disabledObj["recruitment_positions_isDisabled"]},model:{value:e.form["recruitment_positions"],callback:function(t){e.$set(e.form,"recruitment_positions",t)},expression:"form['recruitment_positions']"}}):e.$check_field("get","recruitment_positions")?r("div",[e._v(e._s(e.form["recruitment_positions"]))]):e._e()],1)],1):e._e(),"管理员"===e.user_group||e.$check_field("get","job_classification")||e.$check_field("add","job_classification")||e.$check_field("set","job_classification")?r("el-col",{staticClass:"el_form_item_warp",attrs:{xs:24,sm:12,lg:8}},[r("el-form-item",{attrs:{label:"职位分类",prop:"job_classification"}},["管理员"===e.user_group||e.form["job_consultation_id"]&&e.$check_field("set","job_classification")||!e.form["job_consultation_id"]&&e.$check_field("add","job_classification")?r("el-input",{attrs:{id:"job_classification",placeholder:"请输入职位分类",disabled:e.disabledObj["job_classification_isDisabled"]},model:{value:e.form["job_classification"],callback:function(t){e.$set(e.form,"job_classification",t)},expression:"form['job_classification']"}}):e.$check_field("get","job_classification")?r("div",[e._v(e._s(e.form["job_classification"]))]):e._e()],1)],1):e._e(),"管理员"===e.user_group||e.$check_field("get","work_city")||e.$check_field("add","work_city")||e.$check_field("set","work_city")?r("el-col",{staticClass:"el_form_item_warp",attrs:{xs:24,sm:12,lg:8}},[r("el-form-item",{attrs:{label:"工作城市",prop:"work_city"}},["管理员"===e.user_group||e.form["job_consultation_id"]&&e.$check_field("set","work_city")||!e.form["job_consultation_id"]&&e.$check_field("add","work_city")?r("el-input",{attrs:{id:"work_city",placeholder:"请输入工作城市",disabled:e.disabledObj["work_city_isDisabled"]},model:{value:e.form["work_city"],callback:function(t){e.$set(e.form,"work_city",t)},expression:"form['work_city']"}}):e.$check_field("get","work_city")?r("div",[e._v(e._s(e.form["work_city"]))]):e._e()],1)],1):e._e(),"管理员"===e.user_group||e.$check_field("get","consultation_time")||e.$check_field("add","consultation_time")||e.$check_field("set","consultation_time")?r("el-col",{staticClass:"el_form_item_warp",attrs:{xs:24,sm:12,lg:8}},[r("el-form-item",{attrs:{label:"咨询时间",prop:"consultation_time"}},["管理员"===e.user_group||e.form["job_consultation_id"]&&e.$check_field("set","consultation_time")||!e.form["job_consultation_id"]&&e.$check_field("add","consultation_time")?r("el-date-picker",{attrs:{disabled:e.disabledObj["consultation_time_isDisabled"],id:"consultation_time",type:"datetime",placeholder:"选择日期时间"},model:{value:e.form["consultation_time"],callback:function(t){e.$set(e.form,"consultation_time",t)},expression:"form['consultation_time']"}}):e.$check_field("get","consultation_time")?r("div",[e._v(e._s(e.form["consultation_time"]))]):e._e()],1)],1):e._e(),"管理员"===e.user_group||e.$check_field("get","consultation_content")||e.$check_field("add","consultation_content")||e.$check_field("set","consultation_content")?r("el-col",{staticClass:"el_form_item_warp",attrs:{xs:24,sm:12,lg:8}},[r("el-form-item",{attrs:{label:"咨询内容",prop:"consultation_content"}},["管理员"===e.user_group||e.form["job_consultation_id"]&&e.$check_field("set","consultation_content")||!e.form["job_consultation_id"]&&e.$check_field("add","consultation_content")?r("el-input",{attrs:{type:"textarea",id:"consultation_content",placeholder:"请输入咨询内容",disabled:e.disabledObj["consultation_content_isDisabled"]},model:{value:e.form["consultation_content"],callback:function(t){e.$set(e.form,"consultation_content",t)},expression:"form['consultation_content']"}}):e.$check_field("get","consultation_content")?r("div",[e._v(e._s(e.form["consultation_content"]))]):e._e()],1)],1):e._e(),"管理员"===e.user_group||e.$check_field("get","reply_time")||e.$check_field("add","reply_time")||e.$check_field("set","reply_time")?r("el-col",{staticClass:"el_form_item_warp",attrs:{xs:24,sm:12,lg:8}},[r("el-form-item",{attrs:{label:"回复时间",prop:"reply_time"}},["管理员"===e.user_group||e.form["job_consultation_id"]&&e.$check_field("set","reply_time")||!e.form["job_consultation_id"]&&e.$check_field("add","reply_time")?r("el-date-picker",{attrs:{disabled:e.disabledObj["reply_time_isDisabled"],id:"reply_time",type:"datetime",placeholder:"选择日期时间"},model:{value:e.form["reply_time"],callback:function(t){e.$set(e.form,"reply_time",t)},expression:"form['reply_time']"}}):e.$check_field("get","reply_time")?r("div",[e._v(e._s(e.form["reply_time"]))]):e._e()],1)],1):e._e(),"管理员"===e.user_group||e.$check_field("get","reply_content")||e.$check_field("add","reply_content")||e.$check_field("set","reply_content")?r("el-col",{staticClass:"el_form_item_warp",attrs:{xs:24,sm:12,lg:8}},[r("el-form-item",{attrs:{label:"回复内容",prop:"reply_content"}},["管理员"===e.user_group||e.form["job_consultation_id"]&&e.$check_field("set","reply_content")||!e.form["job_consultation_id"]&&e.$check_field("add","reply_content")?r("el-input",{attrs:{type:"textarea",id:"reply_content",placeholder:"请输入回复内容",disabled:e.disabledObj["reply_content_isDisabled"]},model:{value:e.form["reply_content"],callback:function(t){e.$set(e.form,"reply_content",t)},expression:"form['reply_content']"}}):e.$check_field("get","reply_content")?r("div",[e._v(e._s(e.form["reply_content"]))]):e._e()],1)],1):e._e()],1),r("el-col",{staticClass:"el_form_btn_warp",attrs:{xs:24,sm:12,lg:8}},[e.$check_action("/job_consultation/view","set")||e.$check_action("/job_consultation/view","add")||e.$check_option("/job_consultation/table","examine")?r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submit()}}},[e._v("提交")]),r("el-button",{on:{click:function(t){return e.cancel()}}},[e._v("取消")])],1):r("el-form-item",[r("el-button",{on:{click:function(t){return e.cancel()}}},[e._v("返回")])],1)],1)],1):e._e()],1)},i=[],o=(r("b64b"),r("159b"),r("96cf"),r("1da1")),_=r("c6e7"),l={mixins:[_["a"]],data:function(){return{field:"job_consultation_id",url_add:"~/api/job_consultation/add?",url_set:"~/api/job_consultation/set?",url_get_obj:"~/api/job_consultation/get_obj?",url_upload:"~/api/job_consultation/upload?",query:{job_consultation_id:0},form:{regular_users:0,user_name:"",user_gender:"",contact_information:"",enterprise_users:0,enterprise_id:"",enterprise_name:"",recruitment_positions:"",job_classification:"",work_city:"",consultation_time:"",consultation_content:"",reply_time:"",reply_content:"",job_consultation_id:0},disabledObj:{regular_users_isDisabled:!1,user_name_isDisabled:!1,user_gender_isDisabled:!1,contact_information_isDisabled:!1,enterprise_users_isDisabled:!1,enterprise_id_isDisabled:!1,enterprise_name_isDisabled:!1,recruitment_positions_isDisabled:!1,job_classification_isDisabled:!1,work_city_isDisabled:!1,consultation_time_isDisabled:!1,consultation_content_isDisabled:!1,reply_time_isDisabled:!1,reply_content_isDisabled:!1},list_user_regular_users:[],group_user_regular_users:"",list_user_enterprise_users:[]}},methods:{get_list_user_regular_users:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$get("~/api/user/get_list?user_group=普通用户");case 2:r=t.sent,r.result&&r.result.list?e.list_user_regular_users=r.result.list:r.error&&console.error(r.error);case 4:case"end":return t.stop()}}),t)})))()},get_group_user_regular_users:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.form["regular_users"]=e.user.user_id,t.next=3,e.$get("~/api/user_group/get_obj?name=普通用户");case 3:r=t.sent,r.result&&r.result.obj?e.group_user_regular_users=r.result.obj:r.error&&console.error(r.error);case 5:case"end":return t.stop()}}),t)})))()},get_user_session_regular_users:function(e){var t=this,r={user_id:e},s="~/api/"+t.group_user_regular_users.source_table+"/get_obj?";this.$get(s,r,(function(r){if(r.result&&r.result.obj){var s=[];for(var i in r.result.obj)s.push(i);var o=[];for(var _ in t.form)o.push(_);t.form["regular_users"]=e,t.disabledObj["regular_users_isDisabled"]=!0;for(var l=0;l<s.length;l++)if("examine_state"!==s[l]&&"examine_reply"!==s[l])for(var n=0;n<o.length;n++)if(s[l]===o[n]){if("regular_users"!==s[l]){t.form[o[n]]=r.result.obj[s[l]],t.disabledObj[o[n]+"_isDisabled"]=!0;break}t.disabledObj[o[n]+"_isDisabled"]=!0}}}))},get_user_regular_users:function(e){var t=this.list_user_regular_users.getObj({user_id:e}),r="";return t&&(r=t.nickname?t.nickname:t.username),r},get_list_user_enterprise_users:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$get("~/api/user/get_list?user_group=企业用户");case 2:r=t.sent,r.result&&r.result.list?e.list_user_enterprise_users=r.result.list:r.error&&console.error(r.error);case 4:case"end":return t.stop()}}),t)})))()},get_user_enterprise_users:function(e){var t=this.list_user_enterprise_users.getObj({user_id:e}),r="";return t&&(r=t.nickname?t.nickname:t.username),r},get_obj_before:function(e){var t=this,r="";return r=$.db.get("form"),$.push(this.form,r),this.form&&r&&Object.keys(this.form).forEach((function(e){Object.keys(r).forEach((function(r){e===r&&(t.disabledObj[e+"_isDisabled"]=!0)}))})),this.form["consultation_time"]&&-1===this.form["consultation_time"].indexOf("-")&&(this.form["consultation_time"]=this.$toTime(parseInt(this.form["consultation_time"]),"yyyy-MM-dd hh:mm:ss")),this.form["reply_time"]&&-1===this.form["reply_time"].indexOf("-")&&(this.form["reply_time"]=this.$toTime(parseInt(this.form["reply_time"]),"yyyy-MM-dd hh:mm:ss")),$.db.del("form"),e},get_obj_after:function(e,t){"0000-00-00 00:00:00"==this.form["consultation_time"]&&(this.form["consultation_time"]=null),parseInt(this.form["consultation_time"])>9999&&(this.form["consultation_time"]=this.$toTime(parseInt(this.form["consultation_time"]),"yyyy-MM-dd hh:mm:ss")),"0000-00-00 00:00:00"==this.form["reply_time"]&&(this.form["reply_time"]=null),parseInt(this.form["reply_time"])>9999&&(this.form["reply_time"]=this.$toTime(parseInt(this.form["reply_time"]),"yyyy-MM-dd hh:mm:ss"))},submit_check:function(e){return e.consultation_time?e.reply_time?null:"回复时间不能为空":"咨询时间不能为空"},is_view:function(){var e="管理员"==this.user_group;return e||(e=this.$check_action("/job_consultation/table","add"),console.log(e?"你有表格添加权限视作有添加权限":"你没有表格添加权限")),e||(e=this.$check_action("/job_consultation/table","set"),console.log(e?"你有表格添加权限视作有修改权限":"你没有表格修改权限")),e||(e=this.$check_action("/job_consultation/view","add"),console.log(e?"你有视图添加权限视作有添加权限":"你没有视图添加权限")),e||(e=this.$check_action("/job_consultation/view","set"),console.log(e?"你有视图修改权限视作有修改权限":"你没有视图修改权限")),e||(e=this.$check_action("/job_consultation/view","get"),console.log(e?"你有视图查询权限视作有查询权限":"你没有视图查询权限")),console.log(e?"具有当前页面的查看权，请注意这不代表你有字段的查看权":"无权查看当前页，请注意即便有字段查询权限没有页面查询权限也不行"),e},uploadimg:function(e){this.uploadFile(e.file,"avatar")}},created:function(){this.get_list_user_regular_users(),this.get_group_user_regular_users(),this.get_list_user_enterprise_users()}},n=l,a=(r("a24d"),r("2877")),c=Object(a["a"])(n,s,i,!1,null,null,null);t["default"]=c.exports},d59c:function(e,t,r){}}]);