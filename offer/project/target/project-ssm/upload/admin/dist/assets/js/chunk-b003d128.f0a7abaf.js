(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b003d128"],{"0d44":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-main",{staticClass:"bg edit_wrap comment"},[a("el-form",{ref:"form",attrs:{model:t.form,"status-icon":"","label-width":"100px"}},[a("el-row",{staticClass:"row_e"},[t.query.reply_to_id?a("el-col",{staticClass:"el_form_item_warp",attrs:{xs:24,sm:24,lg:24}},[a("el-form-item",{attrs:{label:"被回复人",prop:"nickname"}},[t._v(" "+t._s(t.reply_obj.nickname)+" ")])],1):t._e(),t.query.reply_to_id?a("el-col",{staticClass:"el_form_item_warp",attrs:{xs:24,sm:24,lg:24}},[a("el-form-item",{attrs:{label:"被回复内容",prop:"reply_to_id"}},[t._v(" "+t._s(t.reply_obj.content)+" ")])],1):t._e(),t.query.reply_to_id?t._e():a("el-col",{staticClass:"el_form_item_warp",attrs:{xs:24,sm:12,lg:8}},[a("el-form-item",{attrs:{label:"头像",prop:"avatar"}},[a("el-upload",{staticClass:"avatar-uploader",attrs:{drag:"",accept:"image/gif, image/jpeg, image/png, image/jpg",action:"","http-request":t.uploadAvatar,"show-file-list":!1}},[t.form.avatar?a("img",{staticClass:"avatar",attrs:{src:t.$fullUrl(t.form.avatar)}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1)],1),t.query.reply_to_id?t._e():a("el-col",{staticClass:"el_form_item_warp",attrs:{xs:24,sm:12,lg:8}},[a("el-form-item",{attrs:{label:"昵称",prop:"nickname"}},[a("el-input",{attrs:{placeholder:"请输入昵称"},model:{value:t.form.nickname,callback:function(e){t.$set(t.form,"nickname",e)},expression:"form.nickname"}})],1)],1),a("el-col",{staticClass:"el_form_editor_warp",attrs:{xs:24,sm:24,lg:24}},[a("el-form-item",{attrs:{label:"正文",prop:"content"}},[a("quill-editor",{model:{value:t.form.content,callback:function(e){t.$set(t.form,"content",e)},expression:"form.content"}})],1)],1)],1),a("el-col",{staticClass:"el_form_btn_warp",attrs:{xs:24,sm:24,lg:24}},[a("el-form-item",[a("el-col",{staticClass:"el_form_btn el_form_btn_2",attrs:{xs:24,sm:24,lg:12}},[a("el-button",{staticStyle:{width:"100%",float:"right"},on:{click:function(e){return t.cancel()}}},[t._v("取消")])],1)],1)],1)],1)],1)},o=[],l=(a("96cf"),a("1da1")),n=a("c6e7"),s={mixins:[n["a"]],data:function(){return{field:"comment_id",url_add:"~/api/comment/add?",url_set:"~/api/comment/set?",url_get_obj:"~/api/comment/get_obj?",url_upload:"~/api/comment/upload?",query:{comment_id:0,reply_to_id:0},form:{comment_id:0,avatar:"",content:"",reply_to_id:0},reply_obj:{nickname:"",content:""}}},methods:{uploadAvatar:function(t){this.uploadFile(t.file,"avatar")},get_obj_comment:function(){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$get("~/api/comment/get_obj?comment_id="+t.query.reply_to_id);case 2:a=e.sent,a.result?t.reply_obj=a.result.obj:a.error&&console.error(a.error);case 4:case"end":return e.stop()}}),e)})))()},get_obj_before:function(t){if(!t.source_id){var e=this.form,a=this.user;e.reply_to_id=t.reply_to_id||0,e.avatar=a.avatar,e.nickname=a.nickname}return t}},created:function(){this.get_obj_comment()}},i=s,c=(a("b43e"),a("2877")),m=Object(c["a"])(i,r,o,!1,null,null,null);e["default"]=m.exports},"3ac0":function(t,e,a){},b43e:function(t,e,a){"use strict";a("3ac0")}}]);