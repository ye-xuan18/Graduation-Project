(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-de572f60"],{8183:function(t,l,e){"use strict";e("db3a")},cf7e:function(t,l,e){"use strict";e.r(l);var s=function(){var t=this,l=t.$createElement,e=t._self._c||l;return e("el-main",{staticClass:"bg edit_wrap slides"},[e("el-form",{ref:"form",attrs:{model:t.form,"status-icon":"","label-width":"80px"}},[e("el-row",{staticClass:"row_e"},[e("el-col",{staticClass:"el_form_item_warp",attrs:{xs:24,sm:12,lg:8}},[e("el-form-item",{attrs:{label:"轮播图",prop:"img"}},[e("el-upload",{staticClass:"avatar-uploader",attrs:{drag:"",accept:"image/gif, image/jpeg, image/png, image/jpg",action:"","http-request":t.uploadimg,"show-file-list":!1}},[t.form.img?e("img",{staticClass:"avatar",attrs:{src:t.$fullUrl(t.form.img)}}):e("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1)],1),e("el-col",{staticClass:"el_form_item_warp",attrs:{xs:24,sm:12,lg:8}},[e("el-form-item",{attrs:{label:"标题",prop:"title"}},[e("el-input",{attrs:{placeholder:"请输入标题"},model:{value:t.form.title,callback:function(l){t.$set(t.form,"title",l)},expression:"form.title"}})],1)],1)],1),e("el-col",{staticClass:"el_form_btn_warp",attrs:{xs:24,sm:24,lg:24}},[e("el-form-item",[e("el-col",{staticClass:"el_form_btn el_form_btn_1",attrs:{xs:24,sm:24,lg:12}},[e("el-button",{staticStyle:{width:"100%",float:"left"},attrs:{type:"primary"},on:{click:function(l){return t.submit()}}},[t._v("提交")])],1),e("el-col",{staticClass:"el_form_btn el_form_btn_2",attrs:{xs:24,sm:24,lg:12}},[e("el-button",{staticStyle:{width:"100%",float:"right"},on:{click:function(l){return t.cancel()}}},[t._v("取消")])],1)],1)],1)],1)],1)},a=[],i=e("c6e7"),r={mixins:[i["a"]],data:function(){return{table:"slides",field:"slides_id",url_add:"~/api/slides/add?",url_set:"~/api/slides/set?",url_get_obj:"~/api/slides/get_obj?",url_upload:"~/api/slides/upload?",query:{slides_id:0},form:{slides_id:0,title:"",content:"",url:"",img:"",hits:0}}},methods:{submit_check:function(t){var l="";if(""===t.title)return l="标题不能为空",l},uploadimg:function(t){this.uploadFile(t.file)}},created:function(){}},o=r,c=(e("8183"),e("2877")),n=Object(c["a"])(o,s,a,!1,null,null,null);l["default"]=n.exports},db3a:function(t,l,e){}}]);