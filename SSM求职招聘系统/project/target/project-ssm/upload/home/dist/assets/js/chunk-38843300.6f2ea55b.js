(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-38843300"],{"010f":function(t,e,s){"use strict";s("31fb")},"0ff7":function(t,e,s){"use strict";var i=function(){var t=this,e=t._self._c;return e("div",{staticClass:"list_comment"},t._l(t.list,(function(s,i){return e("div",{key:i,staticClass:"item_comment_box"},[e("div",{staticClass:"comment"},[e("div",{staticClass:"left_block"},[e("img",{directives:[{name:"default-img",rawName:"v-default-img",value:"../../../public/img/default.png",expression:"'../../../public/img/default.png'"}],staticStyle:{width:"4rem",height:"4rem"},attrs:{src:t.$fullUrl(s[t.vm.avatar])}})]),e("div",{staticClass:"right_block"},[e("div",{staticClass:"top_comment"},[e("div",{staticClass:"nickname"},[t._v(t._s(s[t.vm.nickname]))]),e("div",{staticClass:"time_block"},[e("div",{staticClass:"time"},[t._v(" "+t._s(t._f("formatDate")(s[t.vm.create_time]))+" ")])])]),e("div",{staticClass:"content",domProps:{innerHTML:t._s(s[t.vm.content])}}),Object.keys(t.obj).length?e("div",{staticClass:"comment_reply"},[e("b-button",{attrs:{variant:"outline"},on:{click:function(e){return t.reply_to_sb(s)}}},[t._v("回复")])],1):t._e()])]),s.list_reply?e("div",{staticClass:"list_reply ml-5"},t._l(s.list_reply,(function(s,i){return e("div",{key:i,staticClass:"mb"},[e("div",{staticClass:"fl"},[e("span",{staticClass:"nickname"},[t._v(t._s(s[t.vm.nickname]))])]),e("div",{staticClass:"fr"},[e("span",{staticClass:"time"},[t._v(t._s(t._f("formatDate")(s[t.vm.create_time])))])]),e("div",{staticClass:"ml-5",domProps:{innerHTML:t._s(s[t.vm.content])}})])})),0):t._e()])})),0)},r=[],a=s("c6e7"),c={mixins:[a["a"]],props:{list:{type:Array,default:function(){return[]}},obj:{type:Object,default:function(){return{}}},vm:{type:Object,default:function(){return{avatar:"avatar",nickname:"nickname",content:"content",create_time:"create_time"}}}},data(){return{text:""}},methods:{reply_to_sb(t){this.obj.reply_to_id=t.comment_id}},components:{}},o=c,l=(s("8b6b"),s("0b56")),n=Object(l["a"])(o,i,r,!1,null,"a81eecfc",null);e["a"]=n.exports},"212e":function(t,e,s){"use strict";var i=function(){var t=this,e=t._self._c;return e("div",{staticClass:"list_article_hot"},t._l(t.list,(function(s,i){return e("div",{key:i,staticClass:"item",attrs:{"data-text":i+1}},[e("router-link",{attrs:{to:"/article/details?article_id="+s[t.vm.article_id]}},[e("div",{staticClass:"title"},[t._v(" "+t._s(s[t.vm.title])+" ")])])],1)})),0)},r=[],a={props:{list:{type:Array,default:function(){return[]}},vm:{type:Object,default:function(){return{img:"img",article_id:"article_id",title:"title",description:"description",title:"title",create_time:"create_time",content:"content",praise_len:"praise_len",hits:"hits"}}}},methods:{}},c=a,o=(s("010f"),s("0b56")),l=Object(o["a"])(c,i,r,!1,null,"aaad2198",null);e["a"]=l.exports},"31cb":function(t,e,s){"use strict";s("4e81")},"31fb":function(t,e,s){},"4e81":function(t,e,s){},"56c9":function(t,e,s){"use strict";var i=function(){var t=this,e=t._self._c;return t.publish_flag?e("div",{staticClass:"form_editor"},[e("div",{staticClass:"editor"},[e("quill-editor",{staticClass:"form_editor_block",model:{value:t.form.content,callback:function(e){t.$set(t.form,"content","string"===typeof e?e.trim():e)},expression:"form.content"}})],1),e("div",{staticClass:"btn_publish"},[e("b-button",{attrs:{variant:"outline-primary",block:""},on:{click:function(e){return t.publish()}}},[e("span",[t._v("发表")])])],1)]):t._e()},r=[],a=s("c6e7"),c={mixins:[a["a"]],props:{form:{type:Object,default(){return{content:""}}},post_url:{type:String,default(){return""}},publish_flag:{type:Boolean,default(){return!0}}},data(){return{}},methods:{async publish(){if(this.user.user_id){var t=this.form;if(t=Object.assign(t,{user_id:this.user.user_id,avatar:this.user.avatar,nickname:this.user.nickname}),t.content){var e=await this.filterSensitiveWords(t.content);if(e.length>0)this.$toast("当前消息中包含敏感词: "+e.join(","));else{var s=this.post_url;s||(s="~/api/comment/add?"),this.$post(s,t,t=>{t.result?(this.$emit("update_comment"),this.form.content=""):t.error&&this.$toast(t.error.message)})}}else this.$toast("输入内容不能为空")}else this.$router.push("/account/login")}},components:{}},o=c,l=(s("9ce5"),s("0b56")),n=Object(l["a"])(o,i,r,!1,null,"7c3a8630",null);e["a"]=n.exports},"8b6b":function(t,e,s){"use strict";s("ec52")},"9ce5":function(t,e,s){"use strict";s("c1b1")},a202:function(t,e,s){"use strict";s("ff52")},c1b1:function(t,e,s){},c8c0:function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t._self._c;return e("div",{staticClass:"page_article art_details"},[t.$check_action("/article/list","get")?e("div",{staticClass:"warp art_warp"},[e("div",{staticClass:"container"},[e("div",{staticClass:"row row_art"},[e("div",{staticClass:"col-12 col-lg-9 col-md-12"},[e("div",{staticClass:"card"},[e("div",{staticClass:"article_detail"},[e("div_article",{attrs:{obj:t.obj}})],1)])]),e("div",{staticClass:"col-12 col-lg-3"},[e("div",{staticClass:"list_hot"},[e("div",{staticClass:"hot_title"},[t._v(" 热门文章推荐 ")]),e("list_article_hot",{attrs:{list:t.list_hot}})],1)])])])]):t._e(),t.$check_action("/comment/list","get")?e("div",{staticClass:"comments-wrap warp"},[e("div",{staticClass:"container"},[e("div",{staticClass:"row review"},[e("div",{staticClass:"col"},[e("bar_title",{staticClass:"mt",attrs:{title:"评论区"}}),e("div",{staticClass:"comment_box"},[e("list_comment",{staticClass:"w-100",attrs:{list:t.list_comment,obj:t.form_comment}}),e("b-pagination-nav",{attrs:{"base-url":t.$route.path,"number-of-pages":t.count_pages,"link-gen":t.link_gen,"first-number":"","last-number":""},on:{change:t.change_page}})],1),e("div",{staticClass:"form_editor"},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.form_comment.reply_to_id,expression:"form_comment.reply_to_id"}],staticClass:"fl ml-3"},[t._v(" 对 "),e("i",[t._v(t._s(t.respondent))]),t._v(" "),e("span",[t._v("回复")])]),e("div",{directives:[{name:"show",rawName:"v-show",value:t.form_comment.reply_to_id,expression:"form_comment.reply_to_id"}],staticClass:"fr mr-3"},[e("b-button",{attrs:{variant:"outline-primary",size:"sm"},on:{click:function(e){t.form_comment.reply_to_id=0}}},[e("span",[t._v("重置回复人")])])],1),e("form_editor",{staticClass:"fn",attrs:{form:t.form_comment},on:{update_comment:t.update_comment}})],1)],1)])])]):t._e()])},r=[],a=s("c6e7"),c=s("a3ca"),o=function(){var t=this,e=t._self._c;return e("div",{staticClass:"div_article"},[e("div",{staticClass:"title"},[t._v(t._s(t.obj[t.vm.title]))]),e("div",{staticClass:"aside list"},[e("div",{staticClass:"aside_2 col-12 col-sm-6"},[e("div",{staticClass:"aside_row"},[e("span",{staticClass:"tag ellipsis_1 mr-1"},[t._v(t._s(t.obj[t.vm.tag]))]),t.obj[t.vm.source]?e("router-link",{attrs:{to:"obj[vm.url]"}},[e("span",{staticClass:"source"},[t._v(t._s(t.obj[t.vm.source]))])]):t._e(),e("span",{staticClass:"time"},[t._v(t._s(t.$toTime(t.obj[t.vm.create_time],"yyyy-MM-dd hh:mm:ss")))])],1),e("div",{staticClass:"aside_row"},[e("div",{staticClass:"praise"},[e("span",[t._v("点赞数："+t._s(t.obj[t.vm.praise_len]))])]),e("div",{staticClass:"see"},[e("span",[t._v("点击数："+t._s(t.obj[t.vm.hits]))])])])]),e("div",{staticClass:"btns_interact col-12 col-sm-6"},[this.$store.state.user.user_id?e("b-button",{attrs:{variant:"outline-info"},on:{click:function(e){return t.add_collect()}}},[t.check_collected?e("b-icon",{attrs:{icon:"heart-fill"}}):e("b-icon",{attrs:{icon:"heart"}}),e("span",[t._v("收藏")])],1):e("b-button",{attrs:{variant:"outline-info"},on:{click:function(e){return t.$router.push("/account/login")}}},[t.check_collected?e("b-icon",{attrs:{icon:"heart-fill"}}):e("b-icon",{attrs:{icon:"heart"}}),e("span",[t._v("收藏")])],1),e("b-button",{staticClass:"ml",attrs:{variant:"outline-info"},on:{click:function(e){return t.add_praise()}}},[e("b-icon",{attrs:{icon:"hand-thumbs-up"}}),e("span",[t._v("点赞")])],1)],1)]),e("div",{staticClass:"description"},[t._v(t._s(t.obj[t.vm.description]))]),e("div",{staticClass:"content",domProps:{innerHTML:t._s(t.obj[t.vm.content])}})])},l=[],n={props:{obj:{type:Object,default:function(){return{}}},vm:{type:Object,default:function(){return{img:"img",tag:"tag",url:"url",title:"title",source:"source",description:"description",content:"content",create_time:"create_time",hits:"hits",praise_len:"praise_len"}}}},data(){return{check_praised:!1,check_collected:!1}},methods:{get_praise(){var t=this.$store.state.user.user_id;console.log(this.obj.article_id),this.$get("~/api/praise/count?",{source_table:"article",source_field:"article_id",source_id:this.obj.article_id,user_id:t},t=>{t.result||0===t.result?(console.log("sadsfasf"+JSON.stringify(t)),this.check_praised=!!t.result,console.log("点赞状态：",this.check_praised)):t.error&&(this.$toast(t.error.message),console.error(t.error))})},add_praise(){var t={source_table:"article",source_field:"article_id",source_id:this.obj.article_id,user_id:this.$store.state.user.user_id},e=this;e.obj.praise_len=parseInt(e.obj.praise_len),this.check_praised?(this.check_praised=!1,this.$get("~/api/praise/del",t,t=>{if(t.result){e.obj.praise_len-=1;var s=e.obj.praise_len;this.$post("~/api/article/set?article_id="+e.obj["article_id"],{praise_len:s},t=>{t.result?console.log("取消点赞数状态：",t.result):t.error&&console.error(t.error)}),this.$toast("取消点赞")}else t.error&&(this.$toast(t.error.message),console.error(t.error))})):(this.check_praised=!0,this.$post("~/api/praise/add?",t,t=>{if(t.result){e.obj.praise_len+=1;var s=e.obj.praise_len;this.$post("~/api/article/set?article_id="+e.obj["article_id"],{praise_len:s},t=>{t.result?console.log("添加点赞数状态：",t.result):t.error&&console.error(t.error)}),this.$toast("点赞成功")}else t.error&&(this.$toast(t.error.message),console.error(t.error))}))},add_collect(){var{title:t,img:e,article_id:s}=this.obj,i={title:t,img:e,source_table:"article",source_field:"article_id",source_id:s,user_id:this.$store.state.user.user_id};this.check_collected?(this.check_collected=!1,this.$get("~/api/collect/del",{user_id:this.$store.state.user.user_id,source_id:s},t=>{this.$toast("取消收藏")})):(this.check_collected=!0,this.$post("~/api/collect/add?",i,t=>{this.$toast("收藏成功")}))},check_collect(){var t=this.$store.state.user.user_id,e=this.obj.article_id;this.$get("~/api/collect/count?",{user_id:t,source_table:"article",source_field:"article_id",source_id:e},t=>{this.check_collected=t.result})}},mounted(){setTimeout(()=>{this.check_collect(),this.get_praise()},1e3)}},_=n,d=(s("a202"),s("0b56")),u=Object(d["a"])(_,o,l,!1,null,"462697fa",null),m=u.exports,p=s("212e"),h=s("0ff7"),v=s("56c9"),f={mixins:[a["a"]],components:{list_comment:h["a"],div_article:m,list_article_hot:p["a"],bar_title:c["a"],form_editor:v["a"]},data(){return{url_get_obj:"~/api/article/get_obj?",field:"article_id",obj:{},query:{article_id:0},list_hot:[],list_comment:[],form_comment:{source_table:"article",source_field:"article_id",source_id:0,reply_to_id:0},count_pages:1,seted_count_pages:!0}},methods:{get_obj_after(t){this.form_comment.source_id=this.query.article_id},get_hot_article(){this.$get("~/api/article/get_list",{page:1,size:10,orderby:"hits desc"},t=>{t.result&&(this.list_hot=t.result.list)})},get_comment(t,e=1,s=5){this.$get("~/api/comment/get_list?",{source_table:"article",source_field:"article_id",source_id:this.obj.article_id,page:e,size:s,reply_to_id:"0",orderby:"create_time desc"},t=>{if(t.result){var e=t.result.list;e.map(t=>{t.list_reply=[]}),this.add_reply(e).then(t=>{this.list_comment=t}),this.count_pages=Math.ceil(t.result.count/s)||1}})},add_reply(t){return new Promise(e=>{for(let s=0;s<t.length;s++){const e=t[s];this.$get("~/api/comment/get_list?",{source_table:"article",source_field:"article_id",source_id:e.article_id,orderby:"create_time desc",reply_to_id:e.comment_id},t=>{t.result&&(e.list_reply=t.result.list)})}e(t)})},update_comment(){this.get_comment(this.obj)},link_gen(t){return{query:this.query}},change_page(t){this.get_comment(this.obj,t),this.form_comment.reply_to_id=0},get_obj_after(t){let e=t.result.obj;this.add_hits(e),this.get_comment(e),this.form_comment.source_id=e.article_id},add_hits(t){this.$post("~/api/article/set?article_id="+t.article_id,{hits:parseInt(t.hits)+1},e=>{t.hits=parseInt(t.hits)+1,console.log(e)})}},computed:{respondent(){var t=this.form_comment.reply_to_id,e="";return this.list_comment.map(s=>{s.comment_id===t&&(e=s.nickname)}),e}},mounted(){this.get_hot_article(),setTimeout(()=>{this.get_comment()},1e3)}},b=f,g=(s("31cb"),Object(d["a"])(b,i,r,!1,null,"0a4b2ab0",null));e["default"]=g.exports},ec52:function(t,e,s){},ff52:function(t,e,s){}}]);