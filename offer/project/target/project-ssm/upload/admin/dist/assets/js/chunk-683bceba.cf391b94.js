(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-683bceba"],{"0536":function(e,s,r){},"5a04":function(e,s,r){"use strict";r("0536")},cc18:function(e,s,r){"use strict";r.r(s);var i=function(){var e=this,s=e.$createElement,r=e._self._c||s;return r("el-main",{staticClass:"bg edit_wrap comtable_e"},[e.is_view()?r("el-form",{ref:"form",attrs:{model:e.form,"status-icon":"","label-width":"120px"}},[r("el-row",{staticClass:"row_ce"},["管理员"===e.user_group||e.$check_field("get","regular_users")||e.$check_field("add","regular_users")||e.$check_field("set","regular_users")?r("el-col",{staticClass:"el_form_item_warp",attrs:{xs:24,sm:12,lg:8}},[r("el-form-item",{attrs:{label:"普通用户",prop:"regular_users"}},["管理员"!==e.user_group?r("div",[e._v(" "+e._s(e.get_user_session_regular_users(e.form["regular_users"]))+" "),"管理员"===e.user_group||e.form["resume_submission_id"]&&e.$check_field("set","regular_users")||!e.form["resume_submission_id"]&&e.$check_field("add","regular_users")?r("el-select",{attrs:{id:"regular_users",disabled:e.disabledObj["regular_users_isDisabled"]},model:{value:e.form["regular_users"],callback:function(s){e.$set(e.form,"regular_users",s)},expression:"form['regular_users']"}},e._l(e.list_user_regular_users,(function(e){return r("el-option",{key:e["username"],attrs:{label:e["nickname"]+"-"+e["username"],value:e["user_id"]}})})),1):e.$check_field("get","regular_users")?r("el-select",{attrs:{id:"regular_users",disabled:!0},model:{value:e.form["regular_users"],callback:function(s){e.$set(e.form,"regular_users",s)},expression:"form['regular_users']"}},e._l(e.list_user_regular_users,(function(e){return r("el-option",{key:e["username"],attrs:{label:e["nickname"]+"-"+e["username"],value:e["user_id"]}})})),1):e._e()],1):r("el-select",{attrs:{id:"regular_users",disabled:e.disabledObj["regular_users_isDisabled"]},model:{value:e.form["regular_users"],callback:function(s){e.$set(e.form,"regular_users",s)},expression:"form['regular_users']"}},e._l(e.list_user_regular_users,(function(e){return r("el-option",{key:e["username"],attrs:{label:e["nickname"]+"-"+e["username"],value:e["user_id"]}})})),1)],1)],1):e._e(),"管理员"===e.user_group||e.$check_field("get","user_name")||e.$check_field("add","user_name")||e.$check_field("set","user_name")?r("el-col",{staticClass:"el_form_item_warp",attrs:{xs:24,sm:12,lg:8}},[r("el-form-item",{attrs:{label:"用户姓名",prop:"user_name"}},["管理员"===e.user_group||e.form["resume_submission_id"]&&e.$check_field("set","user_name")||!e.form["resume_submission_id"]&&e.$check_field("add","user_name")?r("el-input",{attrs:{id:"user_name",placeholder:"请输入用户姓名",disabled:e.disabledObj["user_name_isDisabled"]},model:{value:e.form["user_name"],callback:function(s){e.$set(e.form,"user_name",s)},expression:"form['user_name']"}}):e.$check_field("get","user_name")?r("div",[e._v(e._s(e.form["user_name"]))]):e._e()],1)],1):e._e(),"管理员"===e.user_group||e.$check_field("get","user_gender")||e.$check_field("add","user_gender")||e.$check_field("set","user_gender")?r("el-col",{staticClass:"el_form_item_warp",attrs:{xs:24,sm:12,lg:8}},[r("el-form-item",{attrs:{label:"用户性别",prop:"user_gender"}},["管理员"===e.user_group||e.form["resume_submission_id"]&&e.$check_field("set","user_gender")||!e.form["resume_submission_id"]&&e.$check_field("add","user_gender")?r("el-input",{attrs:{id:"user_gender",placeholder:"请输入用户性别",disabled:e.disabledObj["user_gender_isDisabled"]},model:{value:e.form["user_gender"],callback:function(s){e.$set(e.form,"user_gender",s)},expression:"form['user_gender']"}}):e.$check_field("get","user_gender")?r("div",[e._v(e._s(e.form["user_gender"]))]):e._e()],1)],1):e._e(),"管理员"===e.user_group||e.$check_field("get","contact_information")||e.$check_field("add","contact_information")||e.$check_field("set","contact_information")?r("el-col",{staticClass:"el_form_item_warp",attrs:{xs:24,sm:12,lg:8}},[r("el-form-item",{attrs:{label:"联系方式",prop:"contact_information"}},["管理员"===e.user_group||e.form["resume_submission_id"]&&e.$check_field("set","contact_information")||!e.form["resume_submission_id"]&&e.$check_field("add","contact_information")?r("el-input",{attrs:{id:"contact_information",placeholder:"请输入联系方式",disabled:e.disabledObj["contact_information_isDisabled"]},model:{value:e.form["contact_information"],callback:function(s){e.$set(e.form,"contact_information",s)},expression:"form['contact_information']"}}):e.$check_field("get","contact_information")?r("div",[e._v(e._s(e.form["contact_information"]))]):e._e()],1)],1):e._e(),"管理员"===e.user_group||e.$check_field("get","enterprise_users")||e.$check_field("add","enterprise_users")||e.$check_field("set","enterprise_users")?r("el-col",{staticClass:"el_form_item_warp",attrs:{xs:24,sm:12,lg:8}},[r("el-form-item",{attrs:{label:"企业用户",prop:"enterprise_users"}},["管理员"===e.user_group||e.form["resume_submission_id"]&&e.$check_field("set","enterprise_users")||!e.form["resume_submission_id"]&&e.$check_field("add","enterprise_users")?r("el-select",{attrs:{id:"enterprise_users",disabled:e.disabledObj["enterprise_users_isDisabled"]},model:{value:e.form["enterprise_users"],callback:function(s){e.$set(e.form,"enterprise_users",s)},expression:"form['enterprise_users']"}},e._l(e.list_user_enterprise_users,(function(e){return r("el-option",{key:e["username"],attrs:{label:e["nickname"]+"-"+e["username"],value:e["user_id"]}})})),1):e.$check_field("get","enterprise_users")?r("el-select",{attrs:{id:"enterprise_users",disabled:!0},model:{value:e.form["enterprise_users"],callback:function(s){e.$set(e.form,"enterprise_users",s)},expression:"form['enterprise_users']"}},e._l(e.list_user_enterprise_users,(function(e){return r("el-option",{key:e["username"],attrs:{label:e["nickname"]+"-"+e["username"],value:e["user_id"]}})})),1):e._e()],1)],1):e._e(),"管理员"===e.user_group||e.$check_field("get","enterprise_id")||e.$check_field("add","enterprise_id")||e.$check_field("set","enterprise_id")?r("el-col",{staticClass:"el_form_item_warp",attrs:{xs:24,sm:12,lg:8}},[r("el-form-item",{attrs:{label:"企业编号",prop:"enterprise_id"}},["管理员"===e.user_group||e.form["resume_submission_id"]&&e.$check_field("set","enterprise_id")||!e.form["resume_submission_id"]&&e.$check_field("add","enterprise_id")?r("el-input",{attrs:{id:"enterprise_id",placeholder:"请输入企业编号",disabled:e.disabledObj["enterprise_id_isDisabled"]},model:{value:e.form["enterprise_id"],callback:function(s){e.$set(e.form,"enterprise_id",s)},expression:"form['enterprise_id']"}}):e.$check_field("get","enterprise_id")?r("div",[e._v(e._s(e.form["enterprise_id"]))]):e._e()],1)],1):e._e(),"管理员"===e.user_group||e.$check_field("get","enterprise_name")||e.$check_field("add","enterprise_name")||e.$check_field("set","enterprise_name")?r("el-col",{staticClass:"el_form_item_warp",attrs:{xs:24,sm:12,lg:8}},[r("el-form-item",{attrs:{label:"企业名称",prop:"enterprise_name"}},["管理员"===e.user_group||e.form["resume_submission_id"]&&e.$check_field("set","enterprise_name")||!e.form["resume_submission_id"]&&e.$check_field("add","enterprise_name")?r("el-input",{attrs:{id:"enterprise_name",placeholder:"请输入企业名称",disabled:e.disabledObj["enterprise_name_isDisabled"]},model:{value:e.form["enterprise_name"],callback:function(s){e.$set(e.form,"enterprise_name",s)},expression:"form['enterprise_name']"}}):e.$check_field("get","enterprise_name")?r("div",[e._v(e._s(e.form["enterprise_name"]))]):e._e()],1)],1):e._e(),"管理员"===e.user_group||e.$check_field("get","recruitment_positions")||e.$check_field("add","recruitment_positions")||e.$check_field("set","recruitment_positions")?r("el-col",{staticClass:"el_form_item_warp",attrs:{xs:24,sm:12,lg:8}},[r("el-form-item",{attrs:{label:"招聘职位",prop:"recruitment_positions"}},["管理员"===e.user_group||e.form["resume_submission_id"]&&e.$check_field("set","recruitment_positions")||!e.form["resume_submission_id"]&&e.$check_field("add","recruitment_positions")?r("el-input",{attrs:{id:"recruitment_positions",placeholder:"请输入招聘职位",disabled:e.disabledObj["recruitment_positions_isDisabled"]},model:{value:e.form["recruitment_positions"],callback:function(s){e.$set(e.form,"recruitment_positions",s)},expression:"form['recruitment_positions']"}}):e.$check_field("get","recruitment_positions")?r("div",[e._v(e._s(e.form["recruitment_positions"]))]):e._e()],1)],1):e._e(),"管理员"===e.user_group||e.$check_field("get","job_classification")||e.$check_field("add","job_classification")||e.$check_field("set","job_classification")?r("el-col",{staticClass:"el_form_item_warp",attrs:{xs:24,sm:12,lg:8}},[r("el-form-item",{attrs:{label:"职位分类",prop:"job_classification"}},["管理员"===e.user_group||e.form["resume_submission_id"]&&e.$check_field("set","job_classification")||!e.form["resume_submission_id"]&&e.$check_field("add","job_classification")?r("el-input",{attrs:{id:"job_classification",placeholder:"请输入职位分类",disabled:e.disabledObj["job_classification_isDisabled"]},model:{value:e.form["job_classification"],callback:function(s){e.$set(e.form,"job_classification",s)},expression:"form['job_classification']"}}):e.$check_field("get","job_classification")?r("div",[e._v(e._s(e.form["job_classification"]))]):e._e()],1)],1):e._e(),"管理员"===e.user_group||e.$check_field("get","work_city")||e.$check_field("add","work_city")||e.$check_field("set","work_city")?r("el-col",{staticClass:"el_form_item_warp",attrs:{xs:24,sm:12,lg:8}},[r("el-form-item",{attrs:{label:"工作城市",prop:"work_city"}},["管理员"===e.user_group||e.form["resume_submission_id"]&&e.$check_field("set","work_city")||!e.form["resume_submission_id"]&&e.$check_field("add","work_city")?r("el-input",{attrs:{id:"work_city",placeholder:"请输入工作城市",disabled:e.disabledObj["work_city_isDisabled"]},model:{value:e.form["work_city"],callback:function(s){e.$set(e.form,"work_city",s)},expression:"form['work_city']"}}):e.$check_field("get","work_city")?r("div",[e._v(e._s(e.form["work_city"]))]):e._e()],1)],1):e._e(),"管理员"===e.user_group||e.$check_field("get","resume_file")||e.$check_field("add","resume_file")||e.$check_field("set","resume_file")?r("el-col",{staticClass:"el_form_item_warp",attrs:{xs:24,sm:12,lg:8}},[r("el-form-item",{attrs:{label:"简历文件",prop:"resume_file"}},[e.disabledObj["resume_file_isDisabled"]?r("div",[e.$check_field("get","resume_file")?r("div",[r("el-button",{attrs:{type:"primary"},on:{click:function(s){e.$download(e.$fullUrl(e.form["resume_file"]),e.form["resume_file"])}}},[e._v("下载"),r("i",{staticClass:"el-icon-download el-icon--right"})])],1):e._e()]):r("div",["管理员"===e.user_group||e.form["resume_submission_id"]&&e.$check_field("set","resume_file")||!e.form["resume_submission_id"]&&e.$check_field("add","resume_file")?r("el-upload",{staticClass:"upload-demo",staticStyle:{"max-width":"300px",width:"100%"},attrs:{drag:"",action:"","http-request":e.upload_resume_file,limit:1,accept:""}},[r("i",{staticClass:"el-icon-upload"}),r("div",{staticClass:"el-upload__text"},[e._v("将文件拖到此处，或"),r("em",[e._v("点击上传")])])]):e.$check_field("get","resume_file")?r("div",[r("el-button",{attrs:{type:"primary"},on:{click:function(s){e.$download(e.$fullUrl(e.form["resume_file"]),e.form["resume_file"])}}},[e._v("下载"),r("i",{staticClass:"el-icon-download el-icon--right"})])],1):e._e()],1)])],1):e._e(),"管理员"===e.user_group||e.$check_field("get","submission_time")||e.$check_field("add","submission_time")||e.$check_field("set","submission_time")?r("el-col",{staticClass:"el_form_item_warp",attrs:{xs:24,sm:12,lg:8}},[r("el-form-item",{attrs:{label:"提交时间",prop:"submission_time"}},["管理员"===e.user_group||e.form["resume_submission_id"]&&e.$check_field("set","submission_time")||!e.form["resume_submission_id"]&&e.$check_field("add","submission_time")?r("el-date-picker",{attrs:{disabled:e.disabledObj["submission_time_isDisabled"],id:"submission_time",type:"datetime",placeholder:"选择日期时间"},model:{value:e.form["submission_time"],callback:function(s){e.$set(e.form,"submission_time",s)},expression:"form['submission_time']"}}):e.$check_field("get","submission_time")?r("div",[e._v(e._s(e.form["submission_time"]))]):e._e()],1)],1):e._e()],1),r("el-col",{staticClass:"el_form_btn_warp",attrs:{xs:24,sm:12,lg:8}},[e.$check_action("/resume_submission/view","set")||e.$check_action("/resume_submission/view","add")||e.$check_option("/resume_submission/table","examine")?r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:function(s){return e.submit()}}},[e._v("提交")]),r("el-button",{on:{click:function(s){return e.cancel()}}},[e._v("取消")])],1):r("el-form-item",[r("el-button",{on:{click:function(s){return e.cancel()}}},[e._v("返回")])],1)],1)],1):e._e()],1)},t=[],_=(r("b64b"),r("159b"),r("96cf"),r("1da1")),o=r("c6e7"),l={mixins:[o["a"]],data:function(){return{field:"resume_submission_id",url_add:"~/api/resume_submission/add?",url_set:"~/api/resume_submission/set?",url_get_obj:"~/api/resume_submission/get_obj?",url_upload:"~/api/resume_submission/upload?",query:{resume_submission_id:0},form:{regular_users:0,user_name:"",user_gender:"",contact_information:"",enterprise_users:0,enterprise_id:"",enterprise_name:"",recruitment_positions:"",job_classification:"",work_city:"",resume_file:"",submission_time:"",resume_submission_id:0},disabledObj:{regular_users_isDisabled:!1,user_name_isDisabled:!1,user_gender_isDisabled:!1,contact_information_isDisabled:!1,enterprise_users_isDisabled:!1,enterprise_id_isDisabled:!1,enterprise_name_isDisabled:!1,recruitment_positions_isDisabled:!1,job_classification_isDisabled:!1,work_city_isDisabled:!1,resume_file_isDisabled:!1,submission_time_isDisabled:!1},list_user_regular_users:[],group_user_regular_users:"",list_user_enterprise_users:[]}},methods:{get_list_user_regular_users:function(){var e=this;return Object(_["a"])(regeneratorRuntime.mark((function s(){var r;return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:return s.next=2,e.$get("~/api/user/get_list?user_group=普通用户");case 2:r=s.sent,r.result&&r.result.list?e.list_user_regular_users=r.result.list:r.error&&console.error(r.error);case 4:case"end":return s.stop()}}),s)})))()},get_group_user_regular_users:function(){var e=this;return Object(_["a"])(regeneratorRuntime.mark((function s(){var r;return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:return e.form["regular_users"]=e.user.user_id,s.next=3,e.$get("~/api/user_group/get_obj?name=普通用户");case 3:r=s.sent,r.result&&r.result.obj?e.group_user_regular_users=r.result.obj:r.error&&console.error(r.error);case 5:case"end":return s.stop()}}),s)})))()},get_user_session_regular_users:function(e){var s=this,r={user_id:e},i="~/api/"+s.group_user_regular_users.source_table+"/get_obj?";this.$get(i,r,(function(r){if(r.result&&r.result.obj){var i=[];for(var t in r.result.obj)i.push(t);var _=[];for(var o in s.form)_.push(o);s.form["regular_users"]=e,s.disabledObj["regular_users_isDisabled"]=!0;for(var l=0;l<i.length;l++)if("examine_state"!==i[l]&&"examine_reply"!==i[l])for(var u=0;u<_.length;u++)if(i[l]===_[u]){if("regular_users"!==i[l]){s.form[_[u]]=r.result.obj[i[l]],s.disabledObj[_[u]+"_isDisabled"]=!0;break}s.disabledObj[_[u]+"_isDisabled"]=!0}}}))},get_user_regular_users:function(e){var s=this.list_user_regular_users.getObj({user_id:e}),r="";return s&&(r=s.nickname?s.nickname:s.username),r},get_list_user_enterprise_users:function(){var e=this;return Object(_["a"])(regeneratorRuntime.mark((function s(){var r;return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:return s.next=2,e.$get("~/api/user/get_list?user_group=企业用户");case 2:r=s.sent,r.result&&r.result.list?e.list_user_enterprise_users=r.result.list:r.error&&console.error(r.error);case 4:case"end":return s.stop()}}),s)})))()},get_user_enterprise_users:function(e){var s=this.list_user_enterprise_users.getObj({user_id:e}),r="";return s&&(r=s.nickname?s.nickname:s.username),r},upload_resume_file:function(e){this.uploadFile(e.file,"resume_file")},get_obj_before:function(e){var s=this,r="";return r=$.db.get("form"),$.push(this.form,r),this.form&&r&&Object.keys(this.form).forEach((function(e){Object.keys(r).forEach((function(r){e===r&&(s.disabledObj[e+"_isDisabled"]=!0)}))})),this.form["submission_time"]&&-1===this.form["submission_time"].indexOf("-")&&(this.form["submission_time"]=this.$toTime(parseInt(this.form["submission_time"]),"yyyy-MM-dd hh:mm:ss")),$.db.del("form"),e},get_obj_after:function(e,s){"0000-00-00 00:00:00"==this.form["submission_time"]&&(this.form["submission_time"]=null),parseInt(this.form["submission_time"])>9999&&(this.form["submission_time"]=this.$toTime(parseInt(this.form["submission_time"]),"yyyy-MM-dd hh:mm:ss"))},submit_check:function(e){return e.submission_time?null:"提交时间不能为空"},is_view:function(){var e="管理员"==this.user_group;return e||(e=this.$check_action("/resume_submission/table","add"),console.log(e?"你有表格添加权限视作有添加权限":"你没有表格添加权限")),e||(e=this.$check_action("/resume_submission/table","set"),console.log(e?"你有表格添加权限视作有修改权限":"你没有表格修改权限")),e||(e=this.$check_action("/resume_submission/view","add"),console.log(e?"你有视图添加权限视作有添加权限":"你没有视图添加权限")),e||(e=this.$check_action("/resume_submission/view","set"),console.log(e?"你有视图修改权限视作有修改权限":"你没有视图修改权限")),e||(e=this.$check_action("/resume_submission/view","get"),console.log(e?"你有视图查询权限视作有查询权限":"你没有视图查询权限")),console.log(e?"具有当前页面的查看权，请注意这不代表你有字段的查看权":"无权查看当前页，请注意即便有字段查询权限没有页面查询权限也不行"),e},uploadimg:function(e){this.uploadFile(e.file,"avatar")}},created:function(){this.get_list_user_regular_users(),this.get_group_user_regular_users(),this.get_list_user_enterprise_users()}},u=l,a=(r("5a04"),r("2877")),n=Object(a["a"])(u,i,t,!1,null,null,null);s["default"]=n.exports}}]);