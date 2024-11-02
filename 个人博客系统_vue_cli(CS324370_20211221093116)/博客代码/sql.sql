DROP TABLE IF EXISTS `blogger_information`;
CREATE TABLE `blogger_information`(
	   `blogger_information_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '博主信息ID',
`full_name` varchar(64) comment '姓名',
`gender` varchar(64) comment '性别',
`head_portrait` varchar(255) comment '头像',
`personal_profile` text comment '个人简介',
`recommend` int(11) DEFAULT '0' NOT NULL comment '智能推荐',
`create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
 `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',

	   PRIMARY KEY (blogger_information_id)
	)ENGINE=InnoDB DEFAULT CHARSET=utf8 comment '博主信息';
insert into `blogger_information` values (1,'姓名1','性别1','点此播放','个人简介1','0','2022-08-14 09:02:56','2022-08-14 09:02:56');
insert into `blogger_information` values (2,'姓名2','性别2','点此播放','个人简介2','0','2022-08-14 09:02:56','2022-08-14 09:02:56');
insert into `blogger_information` values (3,'姓名3','性别3','点此播放','个人简介3','0','2022-08-14 09:02:56','2022-08-14 09:02:56');
insert into `blogger_information` values (4,'姓名4','性别4','点此播放','个人简介4','0','2022-08-14 09:02:56','2022-08-14 09:02:56');
insert into `blogger_information` values (5,'姓名5','性别5','点此播放','个人简介5','0','2022-08-14 09:02:56','2022-08-14 09:02:56');
insert into `blogger_information` values (6,'姓名6','性别6','点此播放','个人简介6','0','2022-08-14 09:02:56','2022-08-14 09:02:56');
insert into `blogger_information` values (7,'姓名7','性别7','点此播放','个人简介7','0','2022-08-14 09:02:56','2022-08-14 09:02:56');
insert into `blogger_information` values (8,'姓名8','性别8','点此播放','个人简介8','0','2022-08-14 09:02:56','2022-08-14 09:02:56');

DROP TABLE IF EXISTS `user_registration`;
CREATE TABLE `user_registration`(
	   `user_registration_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户注册ID',
`full_name` varchar(64) comment '姓名',
`gender` varchar(64) comment '性别',
`date_of_birth` date comment '出生日期',
`examine_state` varchar(16) DEFAULT '已通过' NOT NULL comment '审核状态',
`recommend` int(11) DEFAULT '0' NOT NULL comment '智能推荐',
`user_id` int(11) DEFAULT '0' NOT NULL comment '用户ID',
`create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
 `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',

	   PRIMARY KEY (user_registration_id)
	)ENGINE=InnoDB DEFAULT CHARSET=utf8 comment '用户注册';

DROP TABLE IF EXISTS `access_token`;
CREATE TABLE `access_token` (
  `token_id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '临时访问牌ID',
  `token` varchar(64) DEFAULT NULL COMMENT '临时访问牌',
  `info` text,
  `maxage` int(2) NOT NULL DEFAULT '2' COMMENT '最大寿命：默认2小时',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间：',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间：',
  `user_id` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '用户编号:',
  PRIMARY KEY (`token_id`) USING BTREE
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='临时访问牌';
insert into `access_token` values ('57','5accf85cb6a7f06f0aa2968deadaec1b',null,'2',"2022-01-14 07:32:09.000 ","2022-01-14 07:32:09.000 ",'1');
insert into `access_token` values ('58','46ff1d4d07714f046ba07b34bffe0af9',null,'2',"2022-01-14 07:32:09.000 ","2022-01-14 07:32:09.000 ",'1');
insert into `access_token` values ('59','ed9d6cba9826fda1beafcd9326be7a86',null,'2',"2022-01-14 07:32:09.000 ","2022-01-14 07:32:09.000 ",'1');
insert into `access_token` values ('60','c99763c1833ea0785d9e2b81da3fd28f',null,'2',"2022-01-14 07:32:09.000 ","2022-01-14 07:32:09.000 ",'1');
insert into `access_token` values ('61','33fbfaccd6d1cb9143e4129bd919d4b0',null,'2',"2022-01-14 07:32:09.000 ","2022-01-14 07:32:09.000 ",'1');
insert into `access_token` values ('62','493e13da5f293ba67a56a0fe3e1fa6cf',null,'2',"2022-01-14 07:32:09.000 ","2022-01-14 07:32:09.000 ",'1');
insert into `access_token` values ('63','c4b48e9e2160db09c703041a8fee0a1f',null,'2',"2022-01-14 07:32:09.000 ","2022-01-14 07:32:09.000 ",'1');
insert into `access_token` values ('64','d13cdaefd3823c360c959a02a262f71d',null,'2',"2022-01-14 07:32:09.000 ","2022-01-14 07:32:09.000 ",'1');
insert into `access_token` values ('65','6c6ff426fd77ea5a2025ce5ed2e42c8a',null,'2',"2022-01-14 07:32:09.000 ","2022-01-14 07:32:09.000 ",'1');
insert into `access_token` values ('66','80930065a61ffcdd5cbb75f60932973c',null,'2',"2022-01-14 07:32:09.000 ","2022-01-14 07:32:09.000 ",'1');
insert into `access_token` values ('67','94114763cf2e3b020495d8a27096d4ef',null,'2',"2022-01-14 07:32:09.000 ","2022-01-14 07:32:09.000 ",'1');
insert into `access_token` values ('68','761052c551c97c9317bc3aa475c85b84',null,'2',"2022-01-14 07:32:09.000 ","2022-01-14 07:32:09.000 ",'1');
insert into `access_token` values ('69','7c44ef14131a0ba7c16aa16cef104065',null,'2',"2022-01-14 07:32:09.000 ","2022-01-14 07:32:09.000 ",'1');
insert into `access_token` values ('70','96380f3d9542c80d04bdade1cf7635a5',null,'2',"2022-01-14 07:32:09.000 ","2022-01-14 07:32:09.000 ",'1');
insert into `access_token` values ('71','bfdc7acfcbf5763fda81945b60961222',null,'2',"2022-01-14 07:32:09.000 ","2022-01-14 07:32:09.000 ",'1');
insert into `access_token` values ('72','170a598e51ae8ae2badde20a42fe171d',null,'2',"2022-01-14 07:32:09.000 ","2022-01-14 07:32:09.000 ",'1');
insert into `access_token` values ('73','c82c357488c75926a92d8a9608d4b367',null,'2',"2022-01-14 07:32:09.000 ","2022-01-14 07:32:09.000 ",'1');
insert into `access_token` values ('74','4d35290c023f407a820f37dbbb1ceb09',null,'2',"2022-01-14 07:32:09.000 ","2022-01-14 07:32:09.000 ",'1');
insert into `access_token` values ('75','8d19162776682b695c0f62f3c7a92fec',null,'2',"2022-01-14 07:32:09.000 ","2022-01-14 07:32:09.000 ",'1');
insert into `access_token` values ('76','a7ea2cdc9a2be179e19200e593ad5a69',null,'2',"2022-01-14 07:32:09.000 ","2022-01-14 07:32:09.000 ",'1');
insert into `access_token` values ('77','c79a554f9832adc01f19682c5d576bc4',null,'2',"2022-01-14 07:32:09.000 ","2022-01-14 07:32:09.000 ",'1');
insert into `access_token` values ('78','1c7d95001fa09951a679841c8100ad1f',null,'2',"2022-01-14 07:32:09.000 ","2022-01-14 07:32:09.000 ",'1');
insert into `access_token` values ('79','776da1bcdd01ddb3cbf0a37fa13fc5b0',null,'2',"2022-01-14 07:32:09.000 ","2022-01-14 07:32:09.000 ",'1');
insert into `access_token` values ('80','d336e88e57c329d0166931292c1fac41',null,'2',"2022-01-14 07:32:09.000 ","2022-01-14 07:32:09.000 ",'1');
insert into `access_token` values ('81','37a40f526a6c82fc6110b512802d35bf',null,'2',"2022-01-14 07:32:09.000 ","2022-01-14 07:32:09.000 ",'1');
insert into `access_token` values ('82','691ad331771f4109206d58aeee572371',null,'2',"2022-01-14 07:32:09.000 ","2022-01-14 07:32:09.000 ",'1');
insert into `access_token` values ('83','9942e458886219960d3344b4a6a6fbec',null,'2',"2022-01-14 07:32:09.000 ","2022-01-14 07:32:09.000 ",'1');
insert into `access_token` values ('84','e9939a8b7ccf9f548f0bbb5664981f96',null,'2',"2022-01-14 07:32:09.000 ","2022-01-14 07:32:09.000 ",'1');
insert into `access_token` values ('85','f5b27912060d1909bef61fab9d96faae',null,'2',"2022-01-14 07:32:09.000 ","2022-01-14 07:32:09.000 ",'1');
insert into `access_token` values ('86','7c5888682f1d449eb1b62f0054a79fbf',null,'2',"2022-01-14 07:32:09.000 ","2022-01-14 07:32:09.000 ",'1');
insert into `access_token` values ('87','00dfdc6ac21c4a9da80fd71c990764d1',null,'2',"2022-01-14 07:32:09.000 ","2022-01-14 07:32:09.000 ",'1');
insert into `access_token` values ('88','3cce592bc72840ab932ce96d85a194da',null,'2',"2022-01-14 07:32:09.000 ","2022-01-14 07:32:09.000 ",'1');
insert into `access_token` values ('89','43fdaa989a644ad683ef4b4d488e8629',null,'2',"2022-01-14 07:32:09.000 ","2022-01-14 07:32:09.000 ",'1');
insert into `access_token` values ('90','d6a3cecadacff0dbd6b43b25372cc2a2',null,'2',"2022-01-14 07:32:09.000 ","2022-01-14 07:32:09.000 ",'1');
insert into `access_token` values ('91','5570bc5b07b3589f4ef8553bd46eb0d1',null,'2',"2022-01-14 07:32:09.000 ","2022-01-14 07:32:09.000 ",'1');
insert into `access_token` values ('92','5570bc5b07b3589f4ef8553bd46eb0d1',null,'2',"2022-01-14 07:32:09.000 ","2022-01-14 07:32:09.000 ",'1');
insert into `access_token` values ('93','26c553bd2ee2ab6605d18dfd310d85f9',null,'2',"2022-01-14 07:32:09.000 ","2022-01-14 07:32:09.000 ",'1');
insert into `access_token` values ('94','3fd52f81236ed2c37ff91a6696d4e47a',null,'2',"2022-01-14 07:32:09.000 ","2022-01-14 07:32:09.000 ",'1');
insert into `access_token` values ('95','893332e9ee67d60d8312b3700c58a359',null,'2',"2022-01-14 07:32:09.000 ","2022-01-14 07:32:09.000 ",'1');
insert into `access_token` values ('96','b7844068ade535b2e517df4a40948703',null,'2',"2022-01-14 07:32:09.000 ","2022-01-14 07:32:09.000 ",'1');
insert into `access_token` values ('97','179b37a5e1893c3af6b946bd5a1c8625',null,'2',"2022-01-14 07:32:09.000 ","2022-01-14 07:32:09.000 ",'1');
insert into `access_token` values ('98','3a47b8a040a83ebbc9194cb255dc668c',null,'2',"2022-01-14 07:32:09.000 ","2022-01-14 07:32:09.000 ",'1');
insert into `access_token` values ('99','afa60196afb77dcc2b520ed13a817560',null,'2',"2022-01-14 07:32:09.000 ","2022-01-14 07:32:09.000 ",'1');
insert into `access_token` values ('100','7fc6d9b324f8c0a3a1784d04ef132692',null,'2',"2022-01-14 07:32:09.000 ","2022-01-14 07:32:09.000 ",'1');
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `article_id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT COMMENT '文章id：[0,8388607]',
  `title` varchar(125) NOT NULL DEFAULT '' COMMENT '标题：[0,125]用于文章和html的title标签中',
  `type` varchar(64) NOT NULL DEFAULT '0' COMMENT '文章分类：[0,1000]用来搜索指定类型的文章',
  `hits` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '点击数：[0,1000000000]访问这篇文章的人次',
  `praise_len` int(11) NOT NULL DEFAULT '0' COMMENT '点赞数',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间：',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间：',
  `source` varchar(255) DEFAULT NULL COMMENT '来源：[0,255]文章的出处',
  `url` varchar(255) DEFAULT NULL COMMENT '来源地址：[0,255]用于跳转到发布该文章的网站',
  `tag` varchar(255) DEFAULT NULL COMMENT '标签：[0,255]用于标注文章所属相关内容，多个标签用空格隔开',
  `content` longtext COMMENT '正文：文章的主体内容',
  `img` varchar(255) DEFAULT NULL COMMENT '封面图',
  `description` text COMMENT '文章描述',
  PRIMARY KEY (`article_id`,`title`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='文章：用于内容管理系统的文章';
DROP TABLE IF EXISTS `article_type`;
CREATE TABLE `article_type` (
  `type_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT COMMENT '分类ID：[0,10000]',
  `display` smallint(4) unsigned NOT NULL DEFAULT '100' COMMENT '显示顺序：[0,1000]决定分类显示的先后顺序',
  `name` varchar(16) NOT NULL DEFAULT '' COMMENT '分类名称：[2,16]',
  `father_id` smallint(5) unsigned NOT NULL DEFAULT '0' COMMENT '上级分类ID：[0,32767]',
  `description` varchar(255) DEFAULT NULL COMMENT '描述：[0,255]描述该分类的作用',
  `icon` text COMMENT '分类图标：',
  `url` varchar(255) DEFAULT NULL COMMENT '外链地址：[0,255]如果该分类是跳转到其他网站的情况下，就在该URL上设置',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间：',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间：',
  PRIMARY KEY (`type_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='文章频道：用于汇总浏览文章，在不同频道下展示不同文章。';


  `user_group` varchar(64) DEFAULT NULL COMMENT '用户组：',
  `mod_name` varchar(64) DEFAULT NULL COMMENT '模块名：',
  `table_name` varchar(64) DEFAULT NULL COMMENT '表名：',
  `page_title` varchar(255) DEFAULT NULL COMMENT '页面标题：',
  `path` varchar(255) DEFAULT NULL COMMENT '路由路径：',
  `position` varchar(32) DEFAULT NULL COMMENT '位置：',
  `mode` varchar(32) NOT NULL DEFAULT '_blank' COMMENT '跳转方式：',
  `add` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '是否可增加：',
  `del` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '是否可删除：',
  `set` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '是否可修改：',
  `get` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '是否可查看：',
  `field_add` varchar(500) DEFAULT NULL COMMENT '添加字段：',
  `field_set` varchar(500) DEFAULT NULL COMMENT '修改字段：',
  `field_get` varchar(500) DEFAULT NULL COMMENT '查询字段：',
  `table_nav_name` varchar(255) DEFAULT NULL COMMENT '跨表导航名称：',
  `table_nav` varchar(255) DEFAULT NULL COMMENT '跨表导航：',
  `option` text COMMENT '配置：',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间：',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间：',
 
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='定制授权';
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `comment_id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '评论ID：',
  `user_id` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '评论人ID：',
  `reply_to_id` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '回复评论ID：空为0',
  `content` longtext COMMENT '内容：',
  `nickname` varchar(255) DEFAULT NULL COMMENT '昵称：',
  `avatar` varchar(255) DEFAULT NULL COMMENT '头像地址：[0,255]',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间：',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间：',
  `source_table` varchar(255) DEFAULT NULL COMMENT '来源表：',
  `source_field` varchar(255) DEFAULT NULL COMMENT '来源字段：',
  `source_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '来源ID：',
  PRIMARY KEY (`comment_id`) USING BTREE
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='评论：';
DROP TABLE IF EXISTS `forum`;
CREATE TABLE `forum` (
  `forum_id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT COMMENT '论坛id',
  `display` smallint(5) unsigned NOT NULL DEFAULT '100' COMMENT '排序',
  `user_id` mediumint(8) unsigned NOT NULL DEFAULT '0' COMMENT '用户ID',
  `nickname` varchar(16) DEFAULT '' COMMENT '昵称：[0,16]',
  `praise_len` int(10) unsigned DEFAULT '0' COMMENT '点赞数',
  `hits` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '访问数',
  `title` varchar(125) NOT NULL DEFAULT '' COMMENT '标题',
  `keywords` varchar(125) DEFAULT NULL COMMENT '关键词',
  `description` varchar(255) DEFAULT NULL COMMENT '描述',
  `url` varchar(255) DEFAULT NULL COMMENT '来源地址',
  `tag` varchar(255) DEFAULT NULL COMMENT '标签',
  `img` text COMMENT '封面图',
  `content` longtext COMMENT '正文',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间：',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间：',
  `avatar` varchar(255) DEFAULT NULL COMMENT '发帖人头像：',
  `type` varchar(64) CHARACTER SET utf8mb4 NOT NULL DEFAULT '0' COMMENT '论坛分类：[0,1000]用来搜索指定类型的论坛帖',
  PRIMARY KEY (`forum_id`) USING BTREE
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='论坛：';
insert into `forum` values ('1','100','1','小明','0','149','测试标题','关键字1','描述','#','标签','/static/img/img_temp.jpg','<h1>fafgwagbagbwgwag</h1>',"2022-05-19 07:32:09.000 ","2022-05-19 07:32:09.000 ",'http://localhost:5000/upload/jingdian (11)_15.jpg','0');
insert into `forum` values ('2','100','2','小明','0','30','测试标题2','关键字2','dec','#','标签','/static/img/img_temp.jpg','测试文章内容2',"2022-05-19 07:32:09.000 ","2022-05-19 07:32:09.000 ",null,'0');
insert into `forum` values ('3','100','2','小红','0','42','测试标题3','关键字3','dec2','#','标签','/static/img/img_temp.jpg','测试文章内容3',"2022-05-19 07:32:09.000 ","2022-05-19 07:32:09.000 ",null,'0');
insert into `forum` values ('4','100','2','小红','0','22','测试标题4','关键字4','dec3','#','标签','/static/img/img_temp.jpg','测试文章内容4',"2022-05-19 07:32:09.000 ","2022-05-19 07:32:09.000 ",null,'0');
DROP TABLE IF EXISTS `forum_type`;
CREATE TABLE `forum_type` (
  `type_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT COMMENT '分类ID：[0,10000]',
  `name` varchar(16) NOT NULL DEFAULT '' COMMENT '分类名称：[2,16]',
  `description` varchar(255) DEFAULT NULL COMMENT '描述：[0,255]描述该分类的作用',
  `url` varchar(255) DEFAULT NULL COMMENT '外链地址：[0,255]如果该分类是跳转到其他网站的情况下，就在该URL上设置',
  `father_id` smallint(5) unsigned NOT NULL DEFAULT '0' COMMENT '上级分类ID：[0,32767]',
  `icon` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '分类图标：',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间：',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间：',
  PRIMARY KEY (`type_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='论坛频道：用于汇总浏览论坛，在不同频道下展示不同论坛。';
insert into `forum_type` values ('1','休闲','描述','/article/list?type_id=1','0',null,"2022-05-19 07:32:09.000 ","2022-05-19 07:32:09.000 ");
insert into `forum_type` values ('2','娱乐','企业信息描述描述描述描述','/article/list?type_id=2','0',null,"2022-05-19 07:32:09.000 ","2022-05-19 07:32:09.000 ");
insert into `forum_type` values ('3','开心','操作帮助描述描述描述','/article/list?type_id=3','0',null,"2022-05-19 07:32:09.000 ","2022-05-19 07:32:09.000 ");
DROP TABLE IF EXISTS `notice`;
CREATE TABLE `notice` (
  `notice_id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT COMMENT '公告id：',
  `title` varchar(125) NOT NULL DEFAULT '' COMMENT '标题：',
  `content` longtext COMMENT '正文：',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间：',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间：',
  PRIMARY KEY (`notice_id`) USING BTREE
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='公告：';
insert into `notice` values ('1','公告标题1','公告，是指政府、团体对重大事件当众正式公布或者公开宣告，宣布。国务院2012年4月16日发布、2012年7月1日起施行的《党政机关公文处理工作条例》，对公告的使用表述为：“适用于向国内外宣布重要事项或者法定事项”。其中包含两方面的内容：一是向国内外宣布重要事项，公布依据政策、法令采取的重大行动等；二是向国内外宣布法定事项，公布依据法律规定告知国内外的有关重要规定和重大行动等。',"2022-05-19 07:32:09.000 ","2022-05-19 07:32:09.000 ");
insert into `notice` values ('2','公告标题2','公告，包含两方面的内容：一是向国内外宣布重要事项，公布依据政策、法令采取的重大行动等；二是向国内外宣布法定事项，公布依据法律规定告知国内外的有关重要规定和重大行动等',"2022-05-19 07:32:09.000 ","2022-05-19 07:32:09.000 ");
insert into `notice` values ('3','公告标题3','公告，是指政府、团体对重大事件当众正式公布或者公开宣告，宣布。国务院2012年4月16日发布、2012年7月1日起施行的《党政机关公文处理工作条例》，对公告的使用表述为：“适用于向国内外宣布重要事项或者法定事项”。其中包含两方面的内容：一是向国内外宣布重要事项，公布依据政策、法令采取的重大行动等；二是向国内外宣布法定事项，公布依据法律规定告知国内外的有关重要规定和重大行动等。',"2022-05-19 07:32:09.000 ","2022-05-19 07:32:09.000 ");
insert into `notice` values ('4','公告标题4','公告，包含两方面的内容：一是向国内外宣布重要事项，公布依据政策、法令采取的重大行动等；二是向国内外宣布法定事项，公布依据法律规定告知国内外的有关重要规定和重大行动等',"2022-05-19 07:32:09.000 ","2022-05-19 07:32:09.000 ");
DROP TABLE IF EXISTS `praise`;
CREATE TABLE `praise` (
  `praise_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '点赞ID：',
  `user_id` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '点赞人：',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间：',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间：',
  `source_table` varchar(255) DEFAULT NULL COMMENT '来源表：',
  `source_field` varchar(255) DEFAULT NULL COMMENT '来源字段：',
  `source_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '来源ID：',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '点赞状态:1为点赞，0已取消',
  PRIMARY KEY (`praise_id`) USING BTREE
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='点赞：';
insert into `praise` values ('2','1',"2022-05-19 07:32:09.000 ","2022-05-19 07:32:09.000 ",'article','article_id','7','1');
insert into `praise` values ('25','5',"2022-05-19 07:32:09.000 ","2022-05-19 07:32:09.000 ",'article','article_id','9','1');
insert into `praise` values ('26','5',"2022-05-19 07:32:09.000 ","2022-05-19 07:32:09.000 ",'article','article_id','7','1');
insert into `praise` values ('27','5',"2022-05-19 07:32:09.000 ","2022-05-19 07:32:09.000 ",'article','article_id','7','1');
insert into `praise` values ('44','2',"2022-05-19 07:32:09.000 ","2022-05-19 07:32:09.000 ",'forum','forum_id','2','1');
insert into `praise` values ('50','2',"2022-05-19 07:32:09.000 ","2022-05-19 07:32:09.000 ",'forum','forum_id','2','1');
insert into `praise` values ('54','2',"2022-05-19 07:32:09.000 ","2022-05-19 07:32:09.000 ",'article','article_id','9','1');
insert into `praise` values ('57','0',"2022-05-19 07:32:09.000 ","2022-05-19 07:32:09.000 ",'article','article_id','10','1');
insert into `praise` values ('86','0',"2022-05-19 07:32:09.000 ","2022-05-19 07:32:09.000 ",'article','article_id','6','1');
insert into `praise` values ('101','7',"2022-05-19 07:32:09.000 ","2022-05-19 07:32:09.000 ",'article','article_id','7','1');
insert into `praise` values ('108','2',"2022-05-19 07:32:09.000 ","2022-05-19 07:32:09.000 ",'article','article_id','8','1');
insert into `praise` values ('221','0',"2022-05-19 07:32:09.000 ","2022-05-19 07:32:09.000 ",'article','article_id','2','1');
DROP TABLE IF EXISTS `slides`;
CREATE TABLE `slides` (
  `slides_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '轮播图ID：',
  `title` varchar(64) DEFAULT NULL COMMENT '标题：',
  `content` varchar(255) DEFAULT NULL COMMENT '内容：',
  `url` varchar(255) DEFAULT NULL COMMENT '链接：',
  `img` varchar(255) DEFAULT NULL COMMENT '轮播图：',
  `hits` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '点击量：',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间：',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间：',
  PRIMARY KEY (`slides_id`) USING BTREE
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='轮播图：';
DROP TABLE IF EXISTS `upload`;
CREATE TABLE `upload` (
  `upload_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '上传ID',
  `name` varchar(64) DEFAULT NULL COMMENT '文件名',
  `path` varchar(255) DEFAULT NULL COMMENT '访问路径',
  `file` varchar(255) DEFAULT NULL COMMENT '文件路径',
  `display` varchar(255) DEFAULT NULL COMMENT '显示顺序',
  `father_id` int(11) DEFAULT '0' COMMENT '父级ID',
  `dir` varchar(255) DEFAULT NULL COMMENT '文件夹',
  `type` varchar(32) DEFAULT NULL COMMENT '文件类型',
  PRIMARY KEY (`upload_id`) USING BTREE
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
insert into `upload` values ('1','movie.mp4','/upload/movie.mp4','',null,'0',null,'video');
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT COMMENT '用户ID：[0,8388607]用户获取其他与用户相关的数据',
  `state` smallint(1) unsigned NOT NULL DEFAULT '1' COMMENT '账户状态：[0,10](1可用|2异常|3已冻结|4已注销)',
  `user_group` varchar(32) DEFAULT NULL COMMENT '所在用户组：[0,32767]决定用户身份和权限',
  `login_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '上次登录时间：',
  `phone` varchar(11) DEFAULT NULL COMMENT '手机号码：[0,11]用户的手机号码，用于找回密码时或登录时',
  `phone_state` smallint(1) unsigned NOT NULL DEFAULT '0' COMMENT '手机认证：[0,1](0未认证|1审核中|2已认证)',
  `username` varchar(16) NOT NULL DEFAULT '' COMMENT '用户名：[0,16]用户登录时所用的账户名称',
  `nickname` varchar(16) DEFAULT '' COMMENT '昵称：[0,16]',
  `password` varchar(64) NOT NULL DEFAULT '' COMMENT '密码：[0,32]用户登录所需的密码，由6-16位数字或英文组成',
  `email` varchar(64) DEFAULT '' COMMENT '邮箱：[0,64]用户的邮箱，用于找回密码时或登录时',
  `email_state` smallint(1) unsigned NOT NULL DEFAULT '0' COMMENT '邮箱认证：[0,1](0未认证|1审核中|2已认证)',
  `avatar` varchar(255) DEFAULT NULL COMMENT '头像地址：[0,255]',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间：',
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='用户账户：用于保存用户登录信息';
insert into `user` values ('1','1','管理员',"2022-04-30 12:03:25.000 ",null,'0','admin','admin','bfd59291e825b5f2bbf1eb76569f8fe7','','0','/api/upload/avatar.jpg',"2022-05-19 07:32:09.000 ");
DROP TABLE IF EXISTS `user_group`;
CREATE TABLE `user_group` (
  `group_id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT COMMENT '用户组ID：[0,8388607]',
  `display` smallint(4) unsigned NOT NULL DEFAULT '100' COMMENT '显示顺序：[0,1000]',
  `name` varchar(16) NOT NULL DEFAULT '' COMMENT '名称：[0,16]',
  `description` varchar(255) DEFAULT NULL COMMENT '描述：[0,255]描述该用户组的特点或权限范围',
  `source_table` varchar(255) DEFAULT NULL COMMENT '来源表：',
  `source_field` varchar(255) DEFAULT NULL COMMENT '来源字段：',
  `source_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '来源ID：',
  `register` smallint(1) unsigned DEFAULT '0' COMMENT '注册位置:',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间：',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间：',
  PRIMARY KEY (`group_id`) USING BTREE
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='用户组：用于用户前端身份和鉴权';
DROP TABLE IF EXISTS `hits`;
CREATE TABLE `hits` (
  `hits_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '点赞ID：',
  `user_id` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '点赞人：',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间：',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间：',
  `source_table` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '来源表：',
  `source_field` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '来源字段：',
  `source_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '来源ID：',
  PRIMARY KEY (`hits_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

insert into `user_group` values ('1','100','管理员',null,'','','0',null,"2022-08-14 01:02:56.000 ","2022-08-14 01:02:56.000 ");
insert into `user_group` values ('2','100','游客',null,'','','0','0',"2022-08-14 01:02:56.000 ","2022-08-14 01:02:56.000 ");
insert into `user_group` values ('3','100','用户注册',null,'user_registration','user_registration_id','0','3',"2022-08-14 01:02:56.000 ","2022-08-14 01:02:56.000 ");
insert into `slides` values ('1','轮播图1','内容1','/article/details?article=1','/api/upload/image_1646920060675.jpeg','577',"2022-08-14 01:02:56.000 ","2022-08-14 01:02:56.000 ");
insert into `slides` values ('2','轮播图2','内容2','/article/details?article=2','/api/upload/image_1646920060689.jpeg','674',"2022-08-14 01:02:56.000 ","2022-08-14 01:02:56.000 ");
insert into `slides` values ('3','轮播图3','内容3','/article/details?article=3','/api/upload/image_1646920060683.jpeg','400',"2022-08-14 01:02:56.000 ","2022-08-14 01:02:56.000 ");
insert into `slides` values ('4','轮播图4','内容4','/article/details?article=4','/api/upload/image_1646920060689.jpeg','541',"2022-08-14 01:02:56.000 ","2022-08-14 01:02:56.000 ");
insert into `article` values ('1','教智融合云端一体—星洋学校小学部“三大工程”课堂教学展示活动','学校','59','0',"2022-08-14 01:02:56.000 ","2022-08-14 01:02:56.000 ",null,null,null,'<p>为切实推进园区教育“教智融合深化年”的活动开展，充分发挥学校党员、骨干、行政的示范、先锋、领航作用。2021年3月16日～18日，苏州工业园区星洋学校小学部开展了主题为“教智融合，云端一体”的“三大工程”课堂教学展示活动。本次活动共有19位老师进行了课堂教学展示，涉及到语文、数学、英语、音乐、体育、美术、信息、劳技等学科。</p><p>活动中，来自语文学科的向日萍、高小梅、丁鲁笑老师分别执教了《肥皂泡》《杨氏之子》《骑鹅旅行记》。教学中，向老师重点指导学生学习抓关键词和想象画面的学习策略读懂课文，感受肥皂泡的美丽与可爱。高老师以读为基本路径，努力让学生在读中理解，读中感悟。丁老师紧扣单元语文要素，聚焦略读课文的阅读提示，巧借结构聚合图梳理主要情节。英语学科的吴骏老师执教的是《My day》，吴老师通过线上线下相结合的各种游戏，帮助学生高效巩固了教学重难点。又利用思维导图，帮助学生复述课文。周福娟老师执教的是五年级劳技《小鹿书签》一课，教学中通过看一看、拆一拆、试一试的方法让学生探究小鹿的穿编规律掌握穿编技巧。整堂课充实有趣，学生们乐在其中。景淑丽老师执教的是五年级美术《多彩的民族传统纹样》，她以传统纹样八角纹为切入口，从八角纹的文化寓意到各民族八角纹样式欣赏，再运用分割法设计现代感八角纹。陈春晖、戎光苏老师分别执教了音乐课《芦笛》《京调》。陈老师在教学中由浅入深，由简至繁，层层递进教唱扎实。戎老师的教学自信大方，学生课堂参与度很高，教学过程生动而高效。</p><p><img src="http://n.sinaimg.cn/sinakd20108/290/w1080h810/20210322/8694-kmrcukz7015960.png"></p><p><img src="http://n.sinaimg.cn/sinakd20108/290/w1080h810/20210322/74d7-kmrcukz7016151.png"></p><p><img src="http://n.sinaimg.cn/sinakd20108/290/w1080h810/20210322/ef7a-kmrcukz7016289.png"></p><p><img src="http://n.sinaimg.cn/sinakd20108/200/w1080h720/20210322/29f2-kmrcukz7016367.png"></p><p>本次展示活动中，数学老师参与的积极性最高，共展示了6节高质量的课堂教学。童晓花老师执教《分数的意义》，教学中关注技术与教学的融合创新。刘珊珊老师在《浸没问题》一课的教学中通过仿真实验、模型以及小组的讨论交流启发学生观察、发现水面以下物体体积与上升部分体积的关系，建立浸没问题的等量关系模型，并引导学生应用模型解决简单的问题。纪亚老师教学《圆柱、圆锥的整理与练习》一课时，注重引导学生正确有条理地通过思维导图进行整理，结合学生的描述同时借助媒体的直观演示，使学生对圆柱和圆锥的计算公式的推导过程与转化思想有了更为明晰的认识。王军老师执教的是《认识三角形》，教学中突出学生主体性，通过动手操作、合作交流，建构三角形的数学模型，促进学生数学核心素养的提升。夏小进老师在《用方向和距离确定位置》一课的教学中让大家感受到了执教者对数学、儿童以及教学的思考在不断深入，彰显了对学习的理解和把握。刘亚芳老师执教的是《认识长方形和正方形》，整个教学过程都以学生自主学习为主，学生通过量一量、折一折、比一比等方法了解长方形和正方形的特征。</p><p><img src="http://n.sinaimg.cn/sinakd20108/200/w1080h720/20210322/dbdc-kmrcukz7016394.png"></p><p><img src="http://n.sinaimg.cn/sinakd20108/290/w1080h810/20210322/c458-kmrcukz7016426.png"></p><p><img src="http://n.sinaimg.cn/sinakd20108/290/w1080h810/20210322/ebfa-kmrcukz7016529.jpg"></p>','','2022年05月23日 12:51 新浪网');
insert into `article` values ('2','枣庄市特教学校组织年轻教师课堂教学集中研讨活动','学校','821','0',"2022-08-14 01:02:56.000 ","2022-08-14 01:02:56.000 ",null,null,null,'<p>阳春三月，新的征程，新的起点。为促进年轻教师的不断成长，历练年轻教师的教学基本功，提高年轻教师的教学能力和水平，营造互相学习，共同进步的教学氛围，我校于2021年3月24日组织年轻教师集中研讨活动。</p><p>4位年轻教师们经过精心准备，为大家呈现了一节节目标明确、构思精巧、结构完整、方法灵活、形式多样的集中研讨教学活动。结对教师听课指导。</p><p>声部一年级教师李书豪《数11～20的数》</p><p><br></p><p><img src="http://n.sinaimg.cn/sinakd20210324ac/486/w640h2246/20210324/93d5-kmvwsvx6772078.jpg"></p><p>声部一年级教师王子豪《早上好》</p><p><br></p><p><img src="http://n.sinaimg.cn/sinakd20210324ac/477/w640h2237/20210324/b4b4-kmvwsvx6772080.jpg"></p><p>培智部四年级教师侯杰《敏捷训练》</p><p><br></p><p><img src="http://n.sinaimg.cn/sinakd20210324ac/619/w640h2379/20210324/eeba-kmvwsvx6772126.jpg"></p><p>培智部四年级教师魏巍《交通安全很重要》</p><p><img src="http://n.sinaimg.cn/sinakd20210324ac/452/w640h2212/20210324/2e50-kmvwsvx6772081.jpg"></p>','','2022年05月23日 12:51 新浪网');
insert into `article` values ('3','【今日晋宁】联姻!区融媒体中心成为区中等专业学校实训基地','学校','24','0',"2022-08-14 01:02:56.000 ","2022-08-14 01:02:56.000 ",null,null,null,'<p>3月30日，晋宁区融媒体中心与晋宁区中等专业学校举行产教融合教学实训基地签约暨挂牌仪式。实训基地旨在充分发挥晋宁区融媒体中心及晋宁区中等专业学校双方资源优势，促进产学结合，提高办学水平和人才培养质量，增强学生的社会实践能力和实操能力。</p><p><img src="http://n.sinaimg.cn/sinakd20210401ac/200/w640h360/20210401/19cd-knaqvqn9804979.jpg"></p><p><img src="http://n.sinaimg.cn/sinakd20210401ac/236/w640h396/20210401/7860-knaqvqn9804990.jpg"></p><p>此次双方合作办学，是充分发挥区融媒体中心及晋宁区中等专业学校双方办学的资源优势，促进产学结合，实践与教学结合，提高办学水平和人才培养质量的有益尝试。</p><p>深化晋宁区融媒体中心与晋宁区中等专业学校的产学结合，一方面能够丰富教学形式，拓宽教学渠道，培养学生的综合素质和实际能力，使学生成为应用型人才，为毕业后服务社会奠定更加扎实的基础。另一方面，深化产学结合能够拓宽融媒体中心人才使用渠道，为融媒工作注入更多新鲜血液。双方充分利用各自优势条件，通过广泛交流合作，必将达到优势互补、资源共享的目的，最终实现双方共同进步。</p><p><img src="http://n.sinaimg.cn/sinakd20210401ac/166/w640h326/20210401/175a-knaqvqn9804988.jpg"></p><p><img src="http://n.sinaimg.cn/sinakd20210401ac/190/w640h350/20210401/c34a-knaqvqn9804991.jpg"></p>','','2022年05月23日 12:51 新浪网');
insert into `article` values ('4','学校召开家长会时，妈妈最好不要这样打扮，避免孩子成全班笑话','学校','858','0',"2022-08-14 01:02:56.000 ","2022-08-14 01:02:56.000 ",null,null,null,'<p>做一个时尚的爸妈现在成为了很多年轻父母的口号，不过很多年轻人似乎对潮爸辣妈的理解有一些偏差，觉得怎么时髦怎么来，重点是在人群中要突出！那么对于一些打扮过于惹眼的父母，孩子真的会接受吗？其实未必！尤其是在一些比较正式的场合，比如开家长会、运动会等等，家长如果穿的过于浮夸，反而会惹来孩子的反感。</p><p><img src="http://n.sinaimg.cn/sinakd20210401ac/196/w1113h683/20210401/905f-knaqvqn9944016.png"></p><p>学校召开家长会时，妈妈最好打扮不要成这样</p><p>小赵的孩子如今已经上一年级了，平时很懂事，从来不让爸妈费心，以至于小赵有了更多的时间收拾自己。她在结婚以前本来就是个爱打扮的人，生了孩子之后也不放弃自己的形象，一直都争取做一个辣妈。孩子上了小学以后，她更是立志要给孩子"长脸"，所以每次去接孩子上下学都打扮的非常时尚。</p><p><img src="http://n.sinaimg.cn/sinakd20210401ac/736/w814h722/20210401/085a-knaqvqn9944040.png"></p><p>孩子对于妈妈的打扮一直都不作评价，直到有一次学校召开家长会，她才明白孩子内心的想法。由于是上小学后的第一次家长会，小赵在去之前就做了充分的准备，穿上了高跟鞋，黑丝袜，超短裙，俨然一个摩登女郎。到了学校以后，她简直就是一道靓丽的风景线，不过到哪大家的目光都追随着，就连老师也频频侧目。</p><p><img src="http://n.sinaimg.cn/sinakd20210401ac/142/w1000h742/20210401/4c56-knaqvqn9944026.png"></p><p>家长会开完以后，小赵自己觉得目的达到了，没想到孩子却闷闷不乐，回家半天也不和她说一句话。在接下来的几天里，孩子也依旧如此。她终于按捺不住询问了孩子的想法，没想到孩子吞吞吐吐了半天，终于说了这句话：妈妈，以后能不能别穿的太漂亮到学校？</p><p><img src="http://n.sinaimg.cn/sinakd20210401ac/156/w977h779/20210401/490f-knaqvqn9944020.png"></p><p>直到这时候，小赵才明白，原来家长会那天自己太出风头了，导致孩子在班上被其他同学议论。自己辛苦打扮一番，没想到孩子不仅不能体会到自己的热心，还觉得是一个负担，这对小赵来说多少有点难堪。她也想不明白，自己到底要怎么穿，才能符合孩子的心意？</p><p>父母这样穿，才能避免孩子被全班同学笑话</p><p>当一个辣妈，这样的想法很不错，可惜大多数孩子的父母都是平凡的，当一个打扮妖艳的人出现在孩子的视线中，不仅别的家长接受不了，就连老师也不待见。其实，这里并不是提倡父母们不要打扮，而是让大家打扮的得体一些。那么，什么才是得体的穿搭呢？</p><p>1）不暴露</p><p>不少年轻爸妈对时尚和潮流的认知比较肤浅，觉得只要吸引人眼球就是时髦。所以一些妈妈会选择低领，短裙，甚至露背这样的款式，出现在孩子的学校里。这样的穿搭无疑是错误的示范，孩子不仅不会以你为荣，甚至会感到羞耻。就连学校里的老师，也会无法接受，进而影响对孩子的印象。所以妈妈们在选择衣服的时候，还是尽量以保守为主，不要太过于暴露。</p><p><img src="http://n.sinaimg.cn/sinakd20210401ac/87/w960h727/20210401/4f86-knaqvqn9944047.png"></p>','','2022年05月23日 12:51 新浪网');
insert into `article` values ('5','阜南县新村镇中心学校观摩学习——感受口琴魅力，汇聚教学智慧','学校','319','0',"2022-08-14 01:02:56.000 ","2022-08-14 01:02:56.000 ",null,null,null,'<p><strong>运营总监：鲍安常LJ007</strong></p><p><strong>2021年4月1日整理</strong></p><p>为了让广大学生深刻感受口琴的魅力，更好地促进新村镇中心学校口琴进课堂工作走深做实。2021年3月31日上午，新村镇中心学校诚邀中国大众音乐协会口琴专业委员会会长白燕生一行深入新村镇中心小学课堂进行口琴教学指导，全镇中小学校长和音乐教师共同参加观摩学习。</p><p><img src="http://n.sinaimg.cn/sinakd20210401ac/150/w1000h750/20210401/7fd6-knaqvqn9800279.jpg"></p><p>白会长在音乐教室里以生动有趣的语言开场，瞬间拉近了与孩子们的距离。形象巧妙地介绍了音名和唱名的相关知识，为学生们打开了音乐学习的大门，并结合自身学习经历向学生们分享了演奏口琴的技巧。同时针对互动交流中出现的问题进行专业纠正和耐心指导，鼓励学生们在日常学习中勤加练习，对长音和短音进行针对性训练，用心用情记住声音的特点，体验音乐变换带来的无穷乐趣。</p><p><img src="http://n.sinaimg.cn/sinakd20210401ac/150/w1000h750/20210401/d1ea-knaqvqn9800276.jpg"></p><p>随后在座谈会上，全镇音乐教师针对教学实践和参赛演出等相关问题进行深入探讨交流，大家一致认为要丰富开展形式加强学科融合，通过自身不断地学习，夯实口琴基本功，以真抓实干的举措让口琴在学生心田立根发芽，达到悠悠琴声响彻校园莘莘学子幸福成长的良好效果。</p><p><img src="http://n.sinaimg.cn/sinakd20210401ac/150/w1000h750/20210401/1f53-knaqvqn9800274.jpg"></p>','','2022年05月23日 12:51 新浪网');
insert into `article` values ('6','枣庄市特教学校组织年轻教师课堂教学集中研讨活动','学校','851','0',"2022-08-14 01:02:56.000 ","2022-08-14 01:02:56.000 ",null,null,null,'<p>阳春三月，新的征程，新的起点。为促进年轻教师的不断成长，历练年轻教师的教学基本功，提高年轻教师的教学能力和水平，营造互相学习，共同进步的教学氛围，我校于2021年3月24日组织年轻教师集中研讨活动。</p><p>4位年轻教师们经过精心准备，为大家呈现了一节节目标明确、构思精巧、结构完整、方法灵活、形式多样的集中研讨教学活动。结对教师听课指导。</p><p>声部一年级教师李书豪《数11～20的数》</p><p><br></p><p><img src="http://n.sinaimg.cn/sinakd20210324ac/486/w640h2246/20210324/93d5-kmvwsvx6772078.jpg"></p><p>声部一年级教师王子豪《早上好》</p><p><br></p><p><img src="http://n.sinaimg.cn/sinakd20210324ac/477/w640h2237/20210324/b4b4-kmvwsvx6772080.jpg"></p><p>培智部四年级教师侯杰《敏捷训练》</p><p><br></p><p><img src="http://n.sinaimg.cn/sinakd20210324ac/619/w640h2379/20210324/eeba-kmvwsvx6772126.jpg"></p><p>培智部四年级教师魏巍《交通安全很重要》</p><p><img src="http://n.sinaimg.cn/sinakd20210324ac/452/w640h2212/20210324/2e50-kmvwsvx6772081.jpg"></p>','','2022年05月23日 12:51 新浪网');
insert into `article` values ('7','教智融合云端一体—星洋学校小学部“三大工程”课堂教学展示活动','学校','864','0',"2022-08-14 01:02:56.000 ","2022-08-14 01:02:56.000 ",null,null,null,'<p>为切实推进园区教育“教智融合深化年”的活动开展，充分发挥学校党员、骨干、行政的示范、先锋、领航作用。2021年3月16日～18日，苏州工业园区星洋学校小学部开展了主题为“教智融合，云端一体”的“三大工程”课堂教学展示活动。本次活动共有19位老师进行了课堂教学展示，涉及到语文、数学、英语、音乐、体育、美术、信息、劳技等学科。</p><p>活动中，来自语文学科的向日萍、高小梅、丁鲁笑老师分别执教了《肥皂泡》《杨氏之子》《骑鹅旅行记》。教学中，向老师重点指导学生学习抓关键词和想象画面的学习策略读懂课文，感受肥皂泡的美丽与可爱。高老师以读为基本路径，努力让学生在读中理解，读中感悟。丁老师紧扣单元语文要素，聚焦略读课文的阅读提示，巧借结构聚合图梳理主要情节。英语学科的吴骏老师执教的是《My day》，吴老师通过线上线下相结合的各种游戏，帮助学生高效巩固了教学重难点。又利用思维导图，帮助学生复述课文。周福娟老师执教的是五年级劳技《小鹿书签》一课，教学中通过看一看、拆一拆、试一试的方法让学生探究小鹿的穿编规律掌握穿编技巧。整堂课充实有趣，学生们乐在其中。景淑丽老师执教的是五年级美术《多彩的民族传统纹样》，她以传统纹样八角纹为切入口，从八角纹的文化寓意到各民族八角纹样式欣赏，再运用分割法设计现代感八角纹。陈春晖、戎光苏老师分别执教了音乐课《芦笛》《京调》。陈老师在教学中由浅入深，由简至繁，层层递进教唱扎实。戎老师的教学自信大方，学生课堂参与度很高，教学过程生动而高效。</p><p><img src="http://n.sinaimg.cn/sinakd20108/290/w1080h810/20210322/8694-kmrcukz7015960.png"></p><p><img src="http://n.sinaimg.cn/sinakd20108/290/w1080h810/20210322/74d7-kmrcukz7016151.png"></p><p><img src="http://n.sinaimg.cn/sinakd20108/290/w1080h810/20210322/ef7a-kmrcukz7016289.png"></p><p><img src="http://n.sinaimg.cn/sinakd20108/200/w1080h720/20210322/29f2-kmrcukz7016367.png"></p><p>本次展示活动中，数学老师参与的积极性最高，共展示了6节高质量的课堂教学。童晓花老师执教《分数的意义》，教学中关注技术与教学的融合创新。刘珊珊老师在《浸没问题》一课的教学中通过仿真实验、模型以及小组的讨论交流启发学生观察、发现水面以下物体体积与上升部分体积的关系，建立浸没问题的等量关系模型，并引导学生应用模型解决简单的问题。纪亚老师教学《圆柱、圆锥的整理与练习》一课时，注重引导学生正确有条理地通过思维导图进行整理，结合学生的描述同时借助媒体的直观演示，使学生对圆柱和圆锥的计算公式的推导过程与转化思想有了更为明晰的认识。王军老师执教的是《认识三角形》，教学中突出学生主体性，通过动手操作、合作交流，建构三角形的数学模型，促进学生数学核心素养的提升。夏小进老师在《用方向和距离确定位置》一课的教学中让大家感受到了执教者对数学、儿童以及教学的思考在不断深入，彰显了对学习的理解和把握。刘亚芳老师执教的是《认识长方形和正方形》，整个教学过程都以学生自主学习为主，学生通过量一量、折一折、比一比等方法了解长方形和正方形的特征。</p><p><img src="http://n.sinaimg.cn/sinakd20108/200/w1080h720/20210322/dbdc-kmrcukz7016394.png"></p><p><img src="http://n.sinaimg.cn/sinakd20108/290/w1080h810/20210322/c458-kmrcukz7016426.png"></p><p><img src="http://n.sinaimg.cn/sinakd20108/290/w1080h810/20210322/ebfa-kmrcukz7016529.jpg"></p>','','2022年05月23日 12:51 新浪网');
insert into `article` values ('8','枣庄市特教学校组织年轻教师课堂教学集中研讨活动','学校','20','0',"2022-08-14 01:02:56.000 ","2022-08-14 01:02:56.000 ",null,null,null,'<p>阳春三月，新的征程，新的起点。为促进年轻教师的不断成长，历练年轻教师的教学基本功，提高年轻教师的教学能力和水平，营造互相学习，共同进步的教学氛围，我校于2021年3月24日组织年轻教师集中研讨活动。</p><p>4位年轻教师们经过精心准备，为大家呈现了一节节目标明确、构思精巧、结构完整、方法灵活、形式多样的集中研讨教学活动。结对教师听课指导。</p><p>声部一年级教师李书豪《数11～20的数》</p><p><br></p><p><img src="http://n.sinaimg.cn/sinakd20210324ac/486/w640h2246/20210324/93d5-kmvwsvx6772078.jpg"></p><p>声部一年级教师王子豪《早上好》</p><p><br></p><p><img src="http://n.sinaimg.cn/sinakd20210324ac/477/w640h2237/20210324/b4b4-kmvwsvx6772080.jpg"></p><p>培智部四年级教师侯杰《敏捷训练》</p><p><br></p><p><img src="http://n.sinaimg.cn/sinakd20210324ac/619/w640h2379/20210324/eeba-kmvwsvx6772126.jpg"></p><p>培智部四年级教师魏巍《交通安全很重要》</p><p><img src="http://n.sinaimg.cn/sinakd20210324ac/452/w640h2212/20210324/2e50-kmvwsvx6772081.jpg"></p>','','2022年05月23日 12:51 新浪网');
insert into `article` values ('9','教智融合云端一体—星洋学校小学部“三大工程”课堂教学展示活动','学校','194','0',"2022-08-14 01:02:56.000 ","2022-08-14 01:02:56.000 ",null,null,null,'<p>为切实推进园区教育“教智融合深化年”的活动开展，充分发挥学校党员、骨干、行政的示范、先锋、领航作用。2021年3月16日～18日，苏州工业园区星洋学校小学部开展了主题为“教智融合，云端一体”的“三大工程”课堂教学展示活动。本次活动共有19位老师进行了课堂教学展示，涉及到语文、数学、英语、音乐、体育、美术、信息、劳技等学科。</p><p>活动中，来自语文学科的向日萍、高小梅、丁鲁笑老师分别执教了《肥皂泡》《杨氏之子》《骑鹅旅行记》。教学中，向老师重点指导学生学习抓关键词和想象画面的学习策略读懂课文，感受肥皂泡的美丽与可爱。高老师以读为基本路径，努力让学生在读中理解，读中感悟。丁老师紧扣单元语文要素，聚焦略读课文的阅读提示，巧借结构聚合图梳理主要情节。英语学科的吴骏老师执教的是《My day》，吴老师通过线上线下相结合的各种游戏，帮助学生高效巩固了教学重难点。又利用思维导图，帮助学生复述课文。周福娟老师执教的是五年级劳技《小鹿书签》一课，教学中通过看一看、拆一拆、试一试的方法让学生探究小鹿的穿编规律掌握穿编技巧。整堂课充实有趣，学生们乐在其中。景淑丽老师执教的是五年级美术《多彩的民族传统纹样》，她以传统纹样八角纹为切入口，从八角纹的文化寓意到各民族八角纹样式欣赏，再运用分割法设计现代感八角纹。陈春晖、戎光苏老师分别执教了音乐课《芦笛》《京调》。陈老师在教学中由浅入深，由简至繁，层层递进教唱扎实。戎老师的教学自信大方，学生课堂参与度很高，教学过程生动而高效。</p><p><img src="http://n.sinaimg.cn/sinakd20108/290/w1080h810/20210322/8694-kmrcukz7015960.png"></p><p><img src="http://n.sinaimg.cn/sinakd20108/290/w1080h810/20210322/74d7-kmrcukz7016151.png"></p><p><img src="http://n.sinaimg.cn/sinakd20108/290/w1080h810/20210322/ef7a-kmrcukz7016289.png"></p><p><img src="http://n.sinaimg.cn/sinakd20108/200/w1080h720/20210322/29f2-kmrcukz7016367.png"></p><p>本次展示活动中，数学老师参与的积极性最高，共展示了6节高质量的课堂教学。童晓花老师执教《分数的意义》，教学中关注技术与教学的融合创新。刘珊珊老师在《浸没问题》一课的教学中通过仿真实验、模型以及小组的讨论交流启发学生观察、发现水面以下物体体积与上升部分体积的关系，建立浸没问题的等量关系模型，并引导学生应用模型解决简单的问题。纪亚老师教学《圆柱、圆锥的整理与练习》一课时，注重引导学生正确有条理地通过思维导图进行整理，结合学生的描述同时借助媒体的直观演示，使学生对圆柱和圆锥的计算公式的推导过程与转化思想有了更为明晰的认识。王军老师执教的是《认识三角形》，教学中突出学生主体性，通过动手操作、合作交流，建构三角形的数学模型，促进学生数学核心素养的提升。夏小进老师在《用方向和距离确定位置》一课的教学中让大家感受到了执教者对数学、儿童以及教学的思考在不断深入，彰显了对学习的理解和把握。刘亚芳老师执教的是《认识长方形和正方形》，整个教学过程都以学生自主学习为主，学生通过量一量、折一折、比一比等方法了解长方形和正方形的特征。</p><p><img src="http://n.sinaimg.cn/sinakd20108/200/w1080h720/20210322/dbdc-kmrcukz7016394.png"></p><p><img src="http://n.sinaimg.cn/sinakd20108/290/w1080h810/20210322/c458-kmrcukz7016426.png"></p><p><img src="http://n.sinaimg.cn/sinakd20108/290/w1080h810/20210322/ebfa-kmrcukz7016529.jpg"></p>','','2022年05月23日 12:51 新浪网');
insert into `article` values ('10','【今日晋宁】联姻!区融媒体中心成为区中等专业学校实训基地','学校','393','0',"2022-08-14 01:02:56.000 ","2022-08-14 01:02:56.000 ",null,null,null,'<p>3月30日，晋宁区融媒体中心与晋宁区中等专业学校举行产教融合教学实训基地签约暨挂牌仪式。实训基地旨在充分发挥晋宁区融媒体中心及晋宁区中等专业学校双方资源优势，促进产学结合，提高办学水平和人才培养质量，增强学生的社会实践能力和实操能力。</p><p><img src="http://n.sinaimg.cn/sinakd20210401ac/200/w640h360/20210401/19cd-knaqvqn9804979.jpg"></p><p><img src="http://n.sinaimg.cn/sinakd20210401ac/236/w640h396/20210401/7860-knaqvqn9804990.jpg"></p><p>此次双方合作办学，是充分发挥区融媒体中心及晋宁区中等专业学校双方办学的资源优势，促进产学结合，实践与教学结合，提高办学水平和人才培养质量的有益尝试。</p><p>深化晋宁区融媒体中心与晋宁区中等专业学校的产学结合，一方面能够丰富教学形式，拓宽教学渠道，培养学生的综合素质和实际能力，使学生成为应用型人才，为毕业后服务社会奠定更加扎实的基础。另一方面，深化产学结合能够拓宽融媒体中心人才使用渠道，为融媒工作注入更多新鲜血液。双方充分利用各自优势条件，通过广泛交流合作，必将达到优势互补、资源共享的目的，最终实现双方共同进步。</p><p><img src="http://n.sinaimg.cn/sinakd20210401ac/166/w640h326/20210401/175a-knaqvqn9804988.jpg"></p><p><img src="http://n.sinaimg.cn/sinakd20210401ac/190/w640h350/20210401/c34a-knaqvqn9804991.jpg"></p>','','2022年05月23日 12:51 新浪网');
insert into `article_type` values ('1','100','学校','0',null,null,null,"2022-08-14 01:02:56.000 ","2022-08-14 01:02:56.000 ");
