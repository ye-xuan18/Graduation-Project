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
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='轮播图';

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
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='文件上传';
insert into `upload` values ('1','movie.mp4','/upload/movie.mp4','',null,'0',null,'video');
DROP TABLE IF EXISTS `notice`;
CREATE TABLE `notice` (
  `notice_id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT COMMENT '公告id：',
  `title` varchar(125) NOT NULL DEFAULT '' COMMENT '标题：',
  `content` longtext COMMENT '正文：',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间：',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间：',
  PRIMARY KEY (`notice_id`) USING BTREE
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='公告';
insert into `notice` values ('1','网站公告','<p>公告，是指政府、团体对重大事件当众正式公布或者公开宣告，宣布。国务院2012年4月16日发布、2012年7月1日起施行的《党政机关公文处理工作条例》，对公告的使用表述为：“适用于向国内外宣布重要事项或者法定事项”。其中包含两方面的内容：一是向国内外宣布重要事项，公布依据政策、法令采取的重大行动等；二是向国内外宣布法定事项，公布依据法律规定告知国内外的有关重要规定和重大行动等。</p>','2024-02-29 18:21:49.0','2024-02-29 18:21:49.0');
insert into `notice` values ('2','关于我们','<p>       一个网站要取得成功，要有先进的理念、先进的思想，更为重要的是抢占先机，及时行动。网络世界可谓一日千里、 日新月异，一个网站只有把握先机，抓住机遇，才</p><p>可能有更多的机会获得成功，可能处于网络行业发展的致高点，可能创建出成功的网站，才能能获得成功。要知道一种网站新模式在网络上只有保持几天的优势,因为人们很容易“COPY" 和模仿，因此，唯有不</p><p>断创新，不失时机地推出新的服务、新的模式、新的思想，网站才可能长久立于不败之地。</p>','2024-02-29 18:21:49.0','2024-02-29 18:21:49.0');
insert into `notice` values ('3','联系方式','<h3>网站内容及品牌合作</h3><p>Email：xxxx@qq.com</p><h3>商务合作</h3><p>电话：010-xxxxxxx</p><p>Email：xxxx@qq.com</p><h3><br></h3><h3><br></h3><p><br></p>','2024-02-29 18:21:49.0','2024-02-29 18:21:49.0');
insert into `notice` values ('4','网站介绍','<p>此处可上传文字、图片、视频、超链接、表格等内容区</p>','2024-02-29 18:21:49.0','2024-02-29 18:21:49.0');
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='文章分类';
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
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='点赞';
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
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='登陆访问时长';
insert into `access_token` values ('57','5accf85cb6a7f06f0aa2968deadaec1b',null,'2','2024-02-29 18:21:49.0','2024-02-29 18:21:49.0','1');
insert into `access_token` values ('58','46ff1d4d07714f046ba07b34bffe0af9',null,'2','2024-02-29 18:21:49.0','2024-02-29 18:21:49.0','1');
insert into `access_token` values ('59','ed9d6cba9826fda1beafcd9326be7a86',null,'2','2024-02-29 18:21:49.0','2024-02-29 18:21:49.0','1');
insert into `access_token` values ('60','c99763c1833ea0785d9e2b81da3fd28f',null,'2','2024-02-29 18:21:49.0','2024-02-29 18:21:49.0','1');
insert into `access_token` values ('61','33fbfaccd6d1cb9143e4129bd919d4b0',null,'2','2024-02-29 18:21:49.0','2024-02-29 18:21:49.0','1');
insert into `access_token` values ('62','493e13da5f293ba67a56a0fe3e1fa6cf',null,'2','2024-02-29 18:21:49.0','2024-02-29 18:21:49.0','1');
insert into `access_token` values ('63','c4b48e9e2160db09c703041a8fee0a1f',null,'2','2024-02-29 18:21:49.0','2024-02-29 18:21:49.0','1');
insert into `access_token` values ('64','d13cdaefd3823c360c959a02a262f71d',null,'2','2024-02-29 18:21:49.0','2024-02-29 18:21:49.0','1');
insert into `access_token` values ('65','6c6ff426fd77ea5a2025ce5ed2e42c8a',null,'2','2024-02-29 18:21:49.0','2024-02-29 18:21:49.0','1');
insert into `access_token` values ('66','80930065a61ffcdd5cbb75f60932973c',null,'2','2024-02-29 18:21:49.0','2024-02-29 18:21:49.0','1');
insert into `access_token` values ('67','94114763cf2e3b020495d8a27096d4ef',null,'2','2024-02-29 18:21:49.0','2024-02-29 18:21:49.0','1');
insert into `access_token` values ('68','761052c551c97c9317bc3aa475c85b84',null,'2','2024-02-29 18:21:49.0','2024-02-29 18:21:49.0','1');
insert into `access_token` values ('69','7c44ef14131a0ba7c16aa16cef104065',null,'2','2024-02-29 18:21:49.0','2024-02-29 18:21:49.0','1');
insert into `access_token` values ('70','96380f3d9542c80d04bdade1cf7635a5',null,'2','2024-02-29 18:21:49.0','2024-02-29 18:21:49.0','1');
insert into `access_token` values ('71','bfdc7acfcbf5763fda81945b60961222',null,'2','2024-02-29 18:21:49.0','2024-02-29 18:21:49.0','1');
insert into `access_token` values ('72','170a598e51ae8ae2badde20a42fe171d',null,'2','2024-02-29 18:21:49.0','2024-02-29 18:21:49.0','1');
insert into `access_token` values ('73','c82c357488c75926a92d8a9608d4b367',null,'2','2024-02-29 18:21:49.0','2024-02-29 18:21:49.0','1');
insert into `access_token` values ('74','4d35290c023f407a820f37dbbb1ceb09',null,'2','2024-02-29 18:21:49.0','2024-02-29 18:21:49.0','1');
insert into `access_token` values ('75','8d19162776682b695c0f62f3c7a92fec',null,'2','2024-02-29 18:21:49.0','2024-02-29 18:21:49.0','1');
insert into `access_token` values ('76','a7ea2cdc9a2be179e19200e593ad5a69',null,'2','2024-02-29 18:21:49.0','2024-02-29 18:21:49.0','1');
insert into `access_token` values ('77','c79a554f9832adc01f19682c5d576bc4',null,'2','2024-02-29 18:21:49.0','2024-02-29 18:21:49.0','1');
insert into `access_token` values ('78','1c7d95001fa09951a679841c8100ad1f',null,'2','2024-02-29 18:21:49.0','2024-02-29 18:21:49.0','1');
insert into `access_token` values ('79','776da1bcdd01ddb3cbf0a37fa13fc5b0',null,'2','2024-02-29 18:21:49.0','2024-02-29 18:21:49.0','1');
insert into `access_token` values ('80','d336e88e57c329d0166931292c1fac41',null,'2','2024-02-29 18:21:49.0','2024-02-29 18:21:49.0','1');
insert into `access_token` values ('81','37a40f526a6c82fc6110b512802d35bf',null,'2','2024-02-29 18:21:49.0','2024-02-29 18:21:49.0','1');
insert into `access_token` values ('82','691ad331771f4109206d58aeee572371',null,'2','2024-02-29 18:21:49.0','2024-02-29 18:21:49.0','1');
insert into `access_token` values ('83','9942e458886219960d3344b4a6a6fbec',null,'2','2024-02-29 18:21:49.0','2024-02-29 18:21:49.0','1');
insert into `access_token` values ('84','e9939a8b7ccf9f548f0bbb5664981f96',null,'2','2024-02-29 18:21:49.0','2024-02-29 18:21:49.0','1');
insert into `access_token` values ('85','f5b27912060d1909bef61fab9d96faae',null,'2','2024-02-29 18:21:49.0','2024-02-29 18:21:49.0','1');
insert into `access_token` values ('86','7c5888682f1d449eb1b62f0054a79fbf',null,'2','2024-02-29 18:21:49.0','2024-02-29 18:21:49.0','1');
insert into `access_token` values ('87','00dfdc6ac21c4a9da80fd71c990764d1',null,'2','2024-02-29 18:21:49.0','2024-02-29 18:21:49.0','1');
insert into `access_token` values ('88','3cce592bc72840ab932ce96d85a194da',null,'2','2024-02-29 18:21:49.0','2024-02-29 18:21:49.0','1');
insert into `access_token` values ('89','43fdaa989a644ad683ef4b4d488e8629',null,'2','2024-02-29 18:21:49.0','2024-02-29 18:21:49.0','1');
insert into `access_token` values ('90','d6a3cecadacff0dbd6b43b25372cc2a2',null,'2','2024-02-29 18:21:49.0','2024-02-29 18:21:49.0','1');
insert into `access_token` values ('91','5570bc5b07b3589f4ef8553bd46eb0d1',null,'2','2024-02-29 18:21:49.0','2024-02-29 18:21:49.0','1');
insert into `access_token` values ('92','5570bc5b07b3589f4ef8553bd46eb0d1',null,'2','2024-02-29 18:21:49.0','2024-02-29 18:21:49.0','1');
insert into `access_token` values ('93','26c553bd2ee2ab6605d18dfd310d85f9',null,'2','2024-02-29 18:21:49.0','2024-02-29 18:21:49.0','1');
insert into `access_token` values ('94','3fd52f81236ed2c37ff91a6696d4e47a',null,'2','2024-02-29 18:21:49.0','2024-02-29 18:21:49.0','1');
insert into `access_token` values ('95','893332e9ee67d60d8312b3700c58a359',null,'2','2024-02-29 18:21:49.0','2024-02-29 18:21:49.0','1');
insert into `access_token` values ('96','b7844068ade535b2e517df4a40948703',null,'2','2024-02-29 18:21:49.0','2024-02-29 18:21:49.0','1');
insert into `access_token` values ('97','179b37a5e1893c3af6b946bd5a1c8625',null,'2','2024-02-29 18:21:49.0','2024-02-29 18:21:49.0','1');
insert into `access_token` values ('98','3a47b8a040a83ebbc9194cb255dc668c',null,'2','2024-02-29 18:21:49.0','2024-02-29 18:21:49.0','1');
insert into `access_token` values ('99','afa60196afb77dcc2b520ed13a817560',null,'2','2024-02-29 18:21:49.0','2024-02-29 18:21:49.0','1');
insert into `access_token` values ('100','7fc6d9b324f8c0a3a1784d04ef132692',null,'2','2024-02-29 18:21:49.0','2024-02-29 18:21:49.0','1');
insert into `access_token` values ('101','84e31b291f2bde6b7ceb27af5fe8eee3',null,'2','2024-02-29 18:21:49.0','2024-02-29 18:21:49.0','1');
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC COMMENT='用户点击';
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
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='评论';
DROP TABLE IF EXISTS `collect`;
CREATE TABLE `collect` (
  `collect_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '收藏ID：',
  `user_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '收藏人ID：',
  `source_table` varchar(255) DEFAULT NULL COMMENT '来源表：',
  `source_field` varchar(255) DEFAULT NULL COMMENT '来源字段：',
  `source_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '来源ID：',
  `title` varchar(255) DEFAULT NULL COMMENT '标题：',
  `img` varchar(255) DEFAULT NULL COMMENT '封面：',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间：',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间：',
  PRIMARY KEY (`collect_id`) USING BTREE
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='收藏';
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
  `open_id` varchar(255) DEFAULT NULL COMMENT '针对获取用户信息字段',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间：',
  `vip_level` varchar(255) DEFAULT NULL COMMENT '会员等级',
  `vip_discount` double(10,2) DEFAULT '0.00' COMMENT '会员折扣',
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='用户账户：用于保存用户登录信息';
insert into `user` values ('1','1','管理员','2024-02-05 17:02:00.0',null,'0','admin','admin','bfd59291e825b5f2bbf1eb76569f8fe7','','0','/api/upload/admin_avatar.jpg',null,'2024-02-29 17:35:13.0',null,'0.0');
DROP TABLE IF EXISTS `regular_users`;
CREATE TABLE `regular_users`(regular_users_id int(11) NOT NULL AUTO_INCREMENT COMMENT '普通用户ID',
`user_name` varchar(64) comment '用户姓名',
`user_gender` varchar(64) comment '用户性别',
`contact_information` varchar(16) comment '联系方式',
`examine_state` varchar(16) DEFAULT '已通过' NOT NULL comment '审核状态',
`user_id` int(11) DEFAULT '0' NOT NULL comment '用户ID',
`create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
`update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
PRIMARY KEY (regular_users_id))ENGINE=InnoDB DEFAULT CHARSET=utf8 comment '普通用户';

DROP TABLE IF EXISTS `enterprise_users`;
CREATE TABLE `enterprise_users`(enterprise_users_id int(11) NOT NULL AUTO_INCREMENT COMMENT '企业用户ID',
`enterprise_id` varchar(64) NOT NULL UNIQUE comment '企业编号',
`enterprise_name` varchar(64) comment '企业名称',
`personnel_name` varchar(64) comment '人事姓名',
`enterprise_phone_number` varchar(64) comment '企业电话',
`examine_state` varchar(16) DEFAULT '已通过' NOT NULL comment '审核状态',
`user_id` int(11) DEFAULT '0' NOT NULL comment '用户ID',
`create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
`update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
PRIMARY KEY (enterprise_users_id))ENGINE=InnoDB DEFAULT CHARSET=utf8 comment '企业用户';

DROP TABLE IF EXISTS `job_classification`;
CREATE TABLE `job_classification`(job_classification_id int(11) NOT NULL AUTO_INCREMENT COMMENT '职位分类ID',
`job_classification` varchar(64) comment '职位分类',
`create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
`update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
PRIMARY KEY (job_classification_id))ENGINE=InnoDB DEFAULT CHARSET=utf8 comment '职位分类';
insert into `job_classification` values (1,'职位分类1','2024-02-28 18:17:39','2024-02-28 18:17:39');
insert into `job_classification` values (2,'职位分类2','2024-02-28 18:17:39','2024-02-28 18:17:39');
insert into `job_classification` values (3,'职位分类3','2024-02-28 18:17:39','2024-02-28 18:17:39');
insert into `job_classification` values (4,'职位分类4','2024-02-28 18:17:39','2024-02-28 18:17:39');
insert into `job_classification` values (5,'职位分类5','2024-02-28 18:17:39','2024-02-28 18:17:39');
insert into `job_classification` values (6,'职位分类6','2024-02-28 18:17:39','2024-02-28 18:17:39');
insert into `job_classification` values (7,'职位分类7','2024-02-28 18:17:39','2024-02-28 18:17:39');
insert into `job_classification` values (8,'职位分类8','2024-02-28 18:17:39','2024-02-28 18:17:39');
insert into `job_classification` values (9,'职位分类9','2024-02-28 18:17:39','2024-02-28 18:17:39');
insert into `job_classification` values (10,'职位分类10','2024-02-28 18:17:39','2024-02-28 18:17:39');
insert into `job_classification` values (11,'职位分类11','2024-02-28 18:17:39','2024-02-28 18:17:39');
insert into `job_classification` values (12,'职位分类12','2024-02-28 18:17:39','2024-02-28 18:17:39');

DROP TABLE IF EXISTS `recruitment_information`;
CREATE TABLE `recruitment_information`(recruitment_information_id int(11) NOT NULL AUTO_INCREMENT COMMENT '招聘信息ID',
`enterprise_users` int(11) DEFAULT 0 comment '企业用户',
`enterprise_id` varchar(64) comment '企业编号',
`enterprise_name` varchar(64) comment '企业名称',
`personnel_name` varchar(64) comment '人事姓名',
`enterprise_phone_number` varchar(64) comment '企业电话',
`office_environment` varchar(255) comment '办公环境',
`recruitment_positions` varchar(64) comment '招聘职位',
`job_classification` varchar(64) comment '职位分类',
`work_city` varchar(64) comment '工作城市',
`educational_requirements` varchar(64) comment '学历要求',
`job_requirements` text comment '岗位要求',
`salary_and_benefits` text comment '薪资福利',
`hits` int(11) DEFAULT 0 NOT NULL comment '点击数',
`praise_len` int(11) DEFAULT 0 NOT NULL comment '点赞数',
`create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
`update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
PRIMARY KEY (recruitment_information_id))ENGINE=InnoDB DEFAULT CHARSET=utf8 comment '招聘信息';
insert into `recruitment_information` values (1,0,'企业编号1','企业名称1','人事姓名1','企业电话1','/api/upload/1636548739650813952.jpg','招聘职位1','职位分类1','工作城市1','学历要求1','岗位要求1','薪资福利1',87,856,'2024-02-28 18:17:40','2024-02-28 18:17:40');
insert into `recruitment_information` values (2,0,'企业编号2','企业名称2','人事姓名2','企业电话2','/api/upload/1636548681161244672.jpg','招聘职位2','职位分类2','工作城市2','学历要求2','岗位要求2','薪资福利2',470,228,'2024-02-28 18:17:40','2024-02-28 18:17:40');
insert into `recruitment_information` values (3,0,'企业编号3','企业名称3','人事姓名3','企业电话3','/api/upload/1636548795456028673.jpg','招聘职位3','职位分类3','工作城市3','学历要求3','岗位要求3','薪资福利3',789,967,'2024-02-28 18:17:40','2024-02-28 18:17:40');
insert into `recruitment_information` values (4,0,'企业编号4','企业名称4','人事姓名4','企业电话4','/api/upload/1740206809093767168.jpg','招聘职位4','职位分类4','工作城市4','学历要求4','岗位要求4','薪资福利4',774,296,'2024-02-28 18:17:40','2024-02-28 18:17:40');
insert into `recruitment_information` values (5,0,'企业编号5','企业名称5','人事姓名5','企业电话5','/api/upload/1636548514571878401.jpg','招聘职位5','职位分类5','工作城市5','学历要求5','岗位要求5','薪资福利5',861,619,'2024-02-28 18:17:40','2024-02-28 18:17:40');
insert into `recruitment_information` values (6,0,'企业编号6','企业名称6','人事姓名6','企业电话6','/api/upload/1636548845842202625.jpg','招聘职位6','职位分类6','工作城市6','学历要求6','岗位要求6','薪资福利6',528,446,'2024-02-28 18:17:40','2024-02-28 18:17:40');
insert into `recruitment_information` values (7,0,'企业编号7','企业名称7','人事姓名7','企业电话7','/api/upload/1740206974902992897.jpg','招聘职位7','职位分类7','工作城市7','学历要求7','岗位要求7','薪资福利7',385,736,'2024-02-28 18:17:40','2024-02-28 18:17:40');
insert into `recruitment_information` values (8,0,'企业编号8','企业名称8','人事姓名8','企业电话8','/api/upload/1740206866220187648.jpg','招聘职位8','职位分类8','工作城市8','学历要求8','岗位要求8','薪资福利8',867,264,'2024-02-28 18:17:40','2024-02-28 18:17:40');
insert into `recruitment_information` values (9,0,'企业编号9','企业名称9','人事姓名9','企业电话9','/api/upload/1636548600521555968.jpg','招聘职位9','职位分类9','工作城市9','学历要求9','岗位要求9','薪资福利9',789,733,'2024-02-28 18:17:40','2024-02-28 18:17:40');
insert into `recruitment_information` values (10,0,'企业编号10','企业名称10','人事姓名10','企业电话10','/api/upload/1636548438571089920.jpg','招聘职位10','职位分类10','工作城市10','学历要求10','岗位要求10','薪资福利10',709,334,'2024-02-28 18:17:40','2024-02-28 18:17:40');
insert into `recruitment_information` values (11,0,'企业编号11','企业名称11','人事姓名11','企业电话11','/api/upload/1740206925787693057.jpg','招聘职位11','职位分类11','工作城市11','学历要求11','岗位要求11','薪资福利11',886,614,'2024-02-28 18:17:40','2024-02-28 18:17:40');
insert into `recruitment_information` values (12,0,'企业编号12','企业名称12','人事姓名12','企业电话12','/api/upload/1636548348284502016.jpg','招聘职位12','职位分类12','工作城市12','学历要求12','岗位要求12','薪资福利12',954,175,'2024-02-28 18:17:40','2024-02-28 18:17:40');

DROP TABLE IF EXISTS `resume_submission`;
CREATE TABLE `resume_submission`(resume_submission_id int(11) NOT NULL AUTO_INCREMENT COMMENT '简历投递ID',
`regular_users` int(11) DEFAULT 0 comment '普通用户',
`user_name` varchar(64) comment '用户姓名',
`user_gender` varchar(64) comment '用户性别',
`contact_information` varchar(64) comment '联系方式',
`enterprise_users` int(11) DEFAULT 0 comment '企业用户',
`enterprise_id` varchar(64) comment '企业编号',
`enterprise_name` varchar(64) comment '企业名称',
`recruitment_positions` varchar(64) comment '招聘职位',
`job_classification` varchar(64) comment '职位分类',
`work_city` varchar(64) comment '工作城市',
`resume_file` varchar(255) comment '简历文件',
`submission_time` datetime comment '提交时间',
`create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
`update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
PRIMARY KEY (resume_submission_id))ENGINE=InnoDB DEFAULT CHARSET=utf8 comment '简历投递';
insert into `resume_submission` values (1,0,'用户姓名1','用户性别1','联系方式1',0,'企业编号1','企业名称1','招聘职位1','职位分类1','工作城市1','','2024-02-28 18:17:40','2024-02-28 18:17:40','2024-02-28 18:17:40');
insert into `resume_submission` values (2,0,'用户姓名2','用户性别2','联系方式2',0,'企业编号2','企业名称2','招聘职位2','职位分类2','工作城市2','','2024-02-28 18:17:40','2024-02-28 18:17:40','2024-02-28 18:17:40');
insert into `resume_submission` values (3,0,'用户姓名3','用户性别3','联系方式3',0,'企业编号3','企业名称3','招聘职位3','职位分类3','工作城市3','','2024-02-28 18:17:40','2024-02-28 18:17:40','2024-02-28 18:17:40');
insert into `resume_submission` values (4,0,'用户姓名4','用户性别4','联系方式4',0,'企业编号4','企业名称4','招聘职位4','职位分类4','工作城市4','','2024-02-28 18:17:40','2024-02-28 18:17:40','2024-02-28 18:17:40');
insert into `resume_submission` values (5,0,'用户姓名5','用户性别5','联系方式5',0,'企业编号5','企业名称5','招聘职位5','职位分类5','工作城市5','','2024-02-28 18:17:40','2024-02-28 18:17:40','2024-02-28 18:17:40');
insert into `resume_submission` values (6,0,'用户姓名6','用户性别6','联系方式6',0,'企业编号6','企业名称6','招聘职位6','职位分类6','工作城市6','','2024-02-28 18:17:40','2024-02-28 18:17:40','2024-02-28 18:17:40');
insert into `resume_submission` values (7,0,'用户姓名7','用户性别7','联系方式7',0,'企业编号7','企业名称7','招聘职位7','职位分类7','工作城市7','','2024-02-28 18:17:40','2024-02-28 18:17:40','2024-02-28 18:17:40');
insert into `resume_submission` values (8,0,'用户姓名8','用户性别8','联系方式8',0,'企业编号8','企业名称8','招聘职位8','职位分类8','工作城市8','','2024-02-28 18:17:40','2024-02-28 18:17:40','2024-02-28 18:17:40');
insert into `resume_submission` values (9,0,'用户姓名9','用户性别9','联系方式9',0,'企业编号9','企业名称9','招聘职位9','职位分类9','工作城市9','','2024-02-28 18:17:40','2024-02-28 18:17:40','2024-02-28 18:17:40');
insert into `resume_submission` values (10,0,'用户姓名10','用户性别10','联系方式10',0,'企业编号10','企业名称10','招聘职位10','职位分类10','工作城市10','','2024-02-28 18:17:40','2024-02-28 18:17:40','2024-02-28 18:17:40');
insert into `resume_submission` values (11,0,'用户姓名11','用户性别11','联系方式11',0,'企业编号11','企业名称11','招聘职位11','职位分类11','工作城市11','','2024-02-28 18:17:40','2024-02-28 18:17:40','2024-02-28 18:17:40');
insert into `resume_submission` values (12,0,'用户姓名12','用户性别12','联系方式12',0,'企业编号12','企业名称12','招聘职位12','职位分类12','工作城市12','','2024-02-28 18:17:40','2024-02-28 18:17:40','2024-02-28 18:17:40');

DROP TABLE IF EXISTS `job_consultation`;
CREATE TABLE `job_consultation`(job_consultation_id int(11) NOT NULL AUTO_INCREMENT COMMENT '职位咨询ID',
`regular_users` int(11) DEFAULT 0 comment '普通用户',
`user_name` varchar(64) comment '用户姓名',
`user_gender` varchar(64) comment '用户性别',
`contact_information` varchar(64) comment '联系方式',
`enterprise_users` int(11) DEFAULT 0 comment '企业用户',
`enterprise_id` varchar(64) comment '企业编号',
`enterprise_name` varchar(64) comment '企业名称',
`recruitment_positions` varchar(64) comment '招聘职位',
`job_classification` varchar(64) comment '职位分类',
`work_city` varchar(64) comment '工作城市',
`consultation_time` datetime comment '咨询时间',
`consultation_content` text comment '咨询内容',
`reply_time` datetime comment '回复时间',
`reply_content` text comment '回复内容',
`create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
`update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
PRIMARY KEY (job_consultation_id))ENGINE=InnoDB DEFAULT CHARSET=utf8 comment '职位咨询';
insert into `job_consultation` values (1,0,'用户姓名1','用户性别1','联系方式1',0,'企业编号1','企业名称1','招聘职位1','职位分类1','工作城市1','2024-02-28 18:17:40','咨询内容1','2024-02-28 18:17:40','回复内容1','2024-02-28 18:17:40','2024-02-28 18:17:40');
insert into `job_consultation` values (2,0,'用户姓名2','用户性别2','联系方式2',0,'企业编号2','企业名称2','招聘职位2','职位分类2','工作城市2','2024-02-28 18:17:40','咨询内容2','2024-02-28 18:17:40','回复内容2','2024-02-28 18:17:40','2024-02-28 18:17:40');
insert into `job_consultation` values (3,0,'用户姓名3','用户性别3','联系方式3',0,'企业编号3','企业名称3','招聘职位3','职位分类3','工作城市3','2024-02-28 18:17:40','咨询内容3','2024-02-28 18:17:40','回复内容3','2024-02-28 18:17:40','2024-02-28 18:17:40');
insert into `job_consultation` values (4,0,'用户姓名4','用户性别4','联系方式4',0,'企业编号4','企业名称4','招聘职位4','职位分类4','工作城市4','2024-02-28 18:17:40','咨询内容4','2024-02-28 18:17:40','回复内容4','2024-02-28 18:17:40','2024-02-28 18:17:40');
insert into `job_consultation` values (5,0,'用户姓名5','用户性别5','联系方式5',0,'企业编号5','企业名称5','招聘职位5','职位分类5','工作城市5','2024-02-28 18:17:40','咨询内容5','2024-02-28 18:17:40','回复内容5','2024-02-28 18:17:40','2024-02-28 18:17:40');
insert into `job_consultation` values (6,0,'用户姓名6','用户性别6','联系方式6',0,'企业编号6','企业名称6','招聘职位6','职位分类6','工作城市6','2024-02-28 18:17:40','咨询内容6','2024-02-28 18:17:40','回复内容6','2024-02-28 18:17:40','2024-02-28 18:17:40');
insert into `job_consultation` values (7,0,'用户姓名7','用户性别7','联系方式7',0,'企业编号7','企业名称7','招聘职位7','职位分类7','工作城市7','2024-02-28 18:17:40','咨询内容7','2024-02-28 18:17:40','回复内容7','2024-02-28 18:17:40','2024-02-28 18:17:40');
insert into `job_consultation` values (8,0,'用户姓名8','用户性别8','联系方式8',0,'企业编号8','企业名称8','招聘职位8','职位分类8','工作城市8','2024-02-28 18:17:40','咨询内容8','2024-02-28 18:17:40','回复内容8','2024-02-28 18:17:40','2024-02-28 18:17:40');
insert into `job_consultation` values (9,0,'用户姓名9','用户性别9','联系方式9',0,'企业编号9','企业名称9','招聘职位9','职位分类9','工作城市9','2024-02-28 18:17:40','咨询内容9','2024-02-28 18:17:40','回复内容9','2024-02-28 18:17:40','2024-02-28 18:17:40');
insert into `job_consultation` values (10,0,'用户姓名10','用户性别10','联系方式10',0,'企业编号10','企业名称10','招聘职位10','职位分类10','工作城市10','2024-02-28 18:17:40','咨询内容10','2024-02-28 18:17:40','回复内容10','2024-02-28 18:17:40','2024-02-28 18:17:40');
insert into `job_consultation` values (11,0,'用户姓名11','用户性别11','联系方式11',0,'企业编号11','企业名称11','招聘职位11','职位分类11','工作城市11','2024-02-28 18:17:40','咨询内容11','2024-02-28 18:17:40','回复内容11','2024-02-28 18:17:40','2024-02-28 18:17:40');
insert into `job_consultation` values (12,0,'用户姓名12','用户性别12','联系方式12',0,'企业编号12','企业名称12','招聘职位12','职位分类12','工作城市12','2024-02-28 18:17:40','咨询内容12','2024-02-28 18:17:40','回复内容12','2024-02-28 18:17:40','2024-02-28 18:17:40');

DROP TABLE IF EXISTS `interview_notification`;
CREATE TABLE `interview_notification`(interview_notification_id int(11) NOT NULL AUTO_INCREMENT COMMENT '面试通知ID',
`enterprise_users` int(11) DEFAULT 0 comment '企业用户',
`enterprise_id` varchar(64) comment '企业编号',
`enterprise_name` varchar(64) comment '企业名称',
`personnel_name` varchar(64) comment '人事姓名',
`enterprise_phone_number` varchar(64) comment '企业电话',
`regular_users` int(11) DEFAULT 0 comment '普通用户',
`user_name` varchar(64) comment '用户姓名',
`user_gender` varchar(64) comment '用户性别',
`contact_information` varchar(64) comment '联系方式',
`recruitment_positions` varchar(64) comment '招聘职位',
`job_classification` varchar(64) comment '职位分类',
`work_city` varchar(64) comment '工作城市',
`interview_time` datetime comment '面试时间',
`interview_notes` text comment '面试备注',
`create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
`update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
PRIMARY KEY (interview_notification_id))ENGINE=InnoDB DEFAULT CHARSET=utf8 comment '面试通知';
insert into `interview_notification` values (1,0,'企业编号1','企业名称1','人事姓名1','企业电话1',0,'用户姓名1','用户性别1','联系方式1','招聘职位1','职位分类1','工作城市1','2024-02-28 18:17:40','面试备注1','2024-02-28 18:17:40','2024-02-28 18:17:40');
insert into `interview_notification` values (2,0,'企业编号2','企业名称2','人事姓名2','企业电话2',0,'用户姓名2','用户性别2','联系方式2','招聘职位2','职位分类2','工作城市2','2024-02-28 18:17:40','面试备注2','2024-02-28 18:17:40','2024-02-28 18:17:40');
insert into `interview_notification` values (3,0,'企业编号3','企业名称3','人事姓名3','企业电话3',0,'用户姓名3','用户性别3','联系方式3','招聘职位3','职位分类3','工作城市3','2024-02-28 18:17:40','面试备注3','2024-02-28 18:17:40','2024-02-28 18:17:40');
insert into `interview_notification` values (4,0,'企业编号4','企业名称4','人事姓名4','企业电话4',0,'用户姓名4','用户性别4','联系方式4','招聘职位4','职位分类4','工作城市4','2024-02-28 18:17:40','面试备注4','2024-02-28 18:17:40','2024-02-28 18:17:40');
insert into `interview_notification` values (5,0,'企业编号5','企业名称5','人事姓名5','企业电话5',0,'用户姓名5','用户性别5','联系方式5','招聘职位5','职位分类5','工作城市5','2024-02-28 18:17:40','面试备注5','2024-02-28 18:17:40','2024-02-28 18:17:40');
insert into `interview_notification` values (6,0,'企业编号6','企业名称6','人事姓名6','企业电话6',0,'用户姓名6','用户性别6','联系方式6','招聘职位6','职位分类6','工作城市6','2024-02-28 18:17:40','面试备注6','2024-02-28 18:17:40','2024-02-28 18:17:40');
insert into `interview_notification` values (7,0,'企业编号7','企业名称7','人事姓名7','企业电话7',0,'用户姓名7','用户性别7','联系方式7','招聘职位7','职位分类7','工作城市7','2024-02-28 18:17:40','面试备注7','2024-02-28 18:17:40','2024-02-28 18:17:40');
insert into `interview_notification` values (8,0,'企业编号8','企业名称8','人事姓名8','企业电话8',0,'用户姓名8','用户性别8','联系方式8','招聘职位8','职位分类8','工作城市8','2024-02-28 18:17:40','面试备注8','2024-02-28 18:17:40','2024-02-28 18:17:40');
insert into `interview_notification` values (9,0,'企业编号9','企业名称9','人事姓名9','企业电话9',0,'用户姓名9','用户性别9','联系方式9','招聘职位9','职位分类9','工作城市9','2024-02-28 18:17:40','面试备注9','2024-02-28 18:17:40','2024-02-28 18:17:40');
insert into `interview_notification` values (10,0,'企业编号10','企业名称10','人事姓名10','企业电话10',0,'用户姓名10','用户性别10','联系方式10','招聘职位10','职位分类10','工作城市10','2024-02-28 18:17:40','面试备注10','2024-02-28 18:17:40','2024-02-28 18:17:40');
insert into `interview_notification` values (11,0,'企业编号11','企业名称11','人事姓名11','企业电话11',0,'用户姓名11','用户性别11','联系方式11','招聘职位11','职位分类11','工作城市11','2024-02-28 18:17:40','面试备注11','2024-02-28 18:17:40','2024-02-28 18:17:40');
insert into `interview_notification` values (12,0,'企业编号12','企业名称12','人事姓名12','企业电话12',0,'用户姓名12','用户性别12','联系方式12','招聘职位12','职位分类12','工作城市12','2024-02-28 18:17:40','面试备注12','2024-02-28 18:17:40','2024-02-28 18:17:40');


insert into `user_group` values ('1','100','管理员',null,'','','0','0','2024-02-28 18:17:40.0','2024-02-28 18:17:40.0');
insert into `user_group` values ('2','100','游客',null,'','','0','0','2024-02-28 18:17:40.0','2024-02-28 18:17:40.0');
insert into `user_group` values ('3','100','普通用户',null,'regular_users','regular_users_id','0','3','2024-02-28 18:17:40.0','2024-02-28 18:17:40.0');
insert into `user_group` values ('4','100','企业用户',null,'enterprise_users','enterprise_users_id','0','0','2024-02-28 18:17:40.0','2024-02-28 18:17:40.0');
insert into `slides` values ('1','轮播图1','内容1','/article/details?article=1','/api/upload/1599967239379877888.jpg','961','2024-02-28 18:17:40.0','2024-02-28 18:17:40.0');
insert into `slides` values ('2','轮播图2','内容2','/article/details?article=2','/api/upload/1575396758849060865.jpg','710','2024-02-28 18:17:40.0','2024-02-28 18:17:40.0');
insert into `slides` values ('3','轮播图3','内容3','/article/details?article=3','/api/upload/1599967181381042177.jpg','661','2024-02-28 18:17:40.0','2024-02-28 18:17:40.0');
insert into `article` values ('1','五险一金万元高薪，东营大型现场招聘会来了，赶紧来！','招聘','691','0','2024-02-28 18:17:40.0','2024-02-28 18:17:40.0',null,null,null,'<p>金三银四招聘季 求职招聘在年后</p><p>√年后考虑换工作？</p><p>√正愁找工作越来越难？</p><p>√想要升职加薪走上人生巅峰？</p><p>本周六，东营这里即将人从众叕！</p><p><img src="https://n.sinaimg.cn/sinakd20220217s/33/w500h333/20220217/82f3-7d72a38a0dc696fa3d03699ffaa31736.gif"></p><p>2022东营春季大型招聘会第一场</p><p>将于 2月19日（本周六）</p><p>在东营西城万达广场火热举行！</p><p>总有一“岗”适合您！</p><p>要找工作的小伙伴火速围观！</p><p><img src="https://n.sinaimg.cn/sinakd20220217s/356/w750h1206/20220217/8f43-bc0394744a463efcb03bd8778ef7f180.png"></p><p><strong>东营春季大型人才招聘会</strong></p><p><strong>JOIN&nbsp;US</strong></p><p><strong>招聘会时间</strong></p><p>2022年2月19日（周六）10:00—16:00</p><p><strong>现场招聘地点</strong></p><p>东营西城万达广场一楼东厅</p><p><strong>参会企业及岗位人数</strong></p><p>本次招聘会<strong>将有近100家企业</strong>参与</p><p>面向应往届高校毕业生（含技校、高职毕业生）；农村劳动力；失业人员；退役军人；就业困难人员；其他有就业创业意愿的劳动者；脱贫人口（包括中西部来东营务工脱贫人口）；边缘易致贫人口；依法成立的各类用人单位提供上千个岗位。</p><p><strong>求职者需知</strong></p><p>求职者免费参加，带上简历直接来</p><p><strong>疫情防控及注意事项</strong></p><p>1、所有参会者提前注册健康码，持绿码进入会场，黄码、红码人员不得入内；</p><p>2、此外所有参会者均佩戴口罩进场，接受体温检测，体温高于37.3℃的人员不得入内；</p><p>3、招聘信息必须属实，严禁使用虚假信息；</p><p>4、各参展单位必须严格遵守主办方统一调度、安排；</p><p>5、近14天内有发热、咳嗽等症状未痊愈的不得入内。</p><p><strong>NO.1</strong></p><p><strong>活动组织单位</strong></p><p><strong>【主办单位】</strong></p><p>东营市人力资源服务产业园、黄三角早报</p><p><strong>【协办单位】</strong></p><p>东营西城万达广场</p><p>正在找工作的你千万别犹豫</p><p>招聘会当天云聚</p><p>东营各大极具潜力企业</p><p>高端化工、软件开发工程师、医药技术研发</p><p>新媒体运营、人事、行政、财务、服务行业等高薪岗位</p><p>等待梦想与潜力兼具的你！</p><p><strong>NO.2</strong></p><p><strong>参会企业</strong></p><p><strong>以下企业不分排名，按照报名顺序排列</strong></p><p><br></p><p><strong><img src="https://n.sinaimg.cn/sinakd20220217s/470/w647h3823/20220217/5363-b31e529a6ff9beca5f9544626133b0d3.png"></strong></p><p><br></p>','/api/upload/1575399268217257984.jpg',null);
insert into `article` values ('2','600余名！浙江新一批事业单位公开招聘（选聘）','招聘','644','0','2024-02-28 18:17:40.0','2024-02-28 18:17:40.0',null,null,null,'<p class="ql-align-justify">	近期，浙江一批事业单位公开招聘、选聘，快来看看有没有你中意的岗位↓↓</p><p class="ql-align-justify">	<strong>杭州30所学校招聘</strong></p><p class="ql-align-justify">	参加本次招聘的事业单位，经费形式均为财政全额拨款，参加本次招聘被聘用的人员均列入事业编制。</p><p class="ql-align-justify">	<strong>招聘计划</strong></p><p><br></p>','/api/upload/1733159201842135041.jpg',null);
insert into `article` values ('3','节后逛了5场招聘会 发现这些职场新变化','招聘','636','0','2024-02-28 18:17:40.0','2024-02-28 18:17:40.0',null,null,null,'<p>春节后，也正式迈入求职、招聘的旺季，从2月7日郑州农村人力资源中心市场举行首届线下招聘会开始，郑州市职介中心、郑州市人才市场及郑州市公共就业人才服务中心相继举行了线下招聘会，每一次都深受求职者及企业方欢迎。节后，记者也参与了郑州举行的每一场线下招聘会，发现这些职场新变化。</p><p><img src="https://n.sinaimg.cn/sinakd20220218s/358/w669h489/20220218/3b46-1751a496037acb66eb4a5e8fbc67ad1b.jpg"></p><p>招聘市场“一席难求”</p><p>&nbsp;&nbsp;&nbsp;&nbsp;业内感慨就业压力大</p><p>“差一点没约上位置。”2月15日上午，在郑州市人才市场，巴氏鲜奶负责人说，除了线上招聘，往年他们都会在线下开展三四场招聘，郑州市人才市场对企业免费，这里也成为公司的首选。</p><p>相比往年就业市场，今年的春招热度来的更早，“往年我们都是过完元宵节才开始，今年没想到招聘方这么积极。”</p><p>这一点市场方负责人高巍深有感触，“我们中心举行的首场招聘会，两天前就已经预约满了，甚至年前都不少企业打听。”高巍表示，目前中心在做好疫情防控的基础上，每周二和周六固定举行招聘会，企业预约已经排到了三月中旬。</p><p>这一点在其他招聘市场也是如此，“每一场招聘会，我们都是有担忧的。”2月16日，郑州市公共就业人才服务中心举行的大型综合招聘会在郑州市体育馆开招，负责此次招聘活动的李春一直在忙前忙后，“求职者比我们预料的要多的多，做好疫情防控的压力比较大。”</p><p>2月17日，又一场名企招聘会将在中国郑州人力资源市场举行，不到俩小时，企业名额报满，在总结经验的基础上，同样负责此次招聘活动的李春实施了线上预约制，分时段让求职者进场。“今年的就业压力不小，我们尽可能为企业和求职者搭建好平台。”</p><p>“万元薪资”岗年年招人难</p><p>节后首周，根据智联招聘发布的数据显示，月薪过万行业数量较去年有明显增加，其中，保险行业也在“万元俱乐部”中。</p><p><img src="https://n.sinaimg.cn/sinakd20220218s/341/w664h477/20220218/bab8-aeebeb4c8b2ac89af69aeb1aebe51d2a.jpg"></p><p>不仅春招如此，在年度盘点中，保险这个行业一直都在“万元薪资”岗上榜上有名。但值得关注的是，这一行业每年都缺人，每年也都在招人，但求职者仿佛就是不买账，业内人士都感慨，保险行业是最难招人的行业，没有之一。</p><p>2月7日，在郑州农村人力资源中心市场，一位保险行业人资负责人表示，他们把底薪从有责3000提升到无责3500，还是招不满，即便招过来了留人也很难，“是现在的年轻人太浮躁了还是他们不缺钱？”</p><p>“理财主管啊，优才主管啊，说白了还是卖保险的，业绩考核压力太大，也不利于个人长远发展。”求职者贾丽说。</p><p>一位长期为保险行业输送人员的业内人士表示，保险公司大都采取直销的营销制度，就是通过不断地招保险代理人来推销产品，也造成了大家感觉到保险行业不停在招人的现状，另外，推销保险前期的工作是非常辛苦的，“一个新人在没有资源和能力的前提下是很难开单的，没有开单就没有收入，所以有很多人做这个工作，最多不到两个月就会放弃了。”</p><p>无独有偶，在2月16日郑州市体育馆招聘会场，5家保险公司在同时招聘，综金经理、预备主管、优才主管、网点负责人、经理助理等多个岗位开招，给出的薪资高、福利好，但感兴趣的求职者并不算多。</p><p>针对这个情况，国寿财富中心未女士有话说，“大家对这个行业是有误解的。”未女士表示，大家对保险行业的理解就是“找熟人，卖保险”，现在从国家层面，保险这个行业不论是从培训还是服务来说，口碑都是在提升的，未女士坦言，去年受疫情影响，招聘行情不好，今年春招才刚开始，每天的面试量都在增加，随着现在的年轻人对保险行业理解在逐步增加，她对今年的招聘充满信心。</p><p>“00后”上阵 高薪并不是唯一吸引力</p><p>今年招聘市场，有不少“00后”的身影。对于Z世代求职者来说，记者发现，高薪并不是唯一吸引力。</p><p><img src="https://n.sinaimg.cn/sinakd20220218s/294/w676h418/20220218/c3c5-654de0cb8793315753b8e94ad2c52251.jpg"></p><p>2月16日在郑州市体育馆，逛了20分钟的靳子涛在一家文旅公司前停住了脚步，详细了解了薪资待遇，抱着试一试的心态，靳子涛填写了基本信息，出生于2001年的他，是郑州一所职业院校的毕业生，他坦言，自己家就在郑州，父母还没有退休，目前他求职主要看重职场环境和企业人文关怀，而郑州这家文旅公司，薪资并不算高，但每年两次的集体出游、每季度一次的集体生日及聚餐式会议，让他非常心动。“我本身是做设计的，这个工作环境，会让人非常有创造性。”</p><p>&nbsp;“我们的工作是在超市，工作不累，每天也就说说笑笑、蹦蹦跳跳、打打闹闹。”会场，一国企人资负责拉着一新毕业小伙卖力的介绍自家岗位，当他得知求职者想找一个轻松的岗位，在工作期间流出足够的时间来充电和考证时，该负责人打着包票说，“只要你来，你考啥，我们都支持，并报销部分费用。”</p><p><br></p><p>随后采访中，记者了解到，该小伙名叫武泽宇，00年出生，是一名大四毕业生，工商管理专业，期待找氛围轻松活泼的单位，“不想去氛围沉闷的公司，如果单位里有古风或者游戏爱好者，那就更好了。”</p><p>招聘会场，该国企负责人坦言，从疫情以来，他们就发现，现在的年轻人求职，高薪吸引力已经“过时了”，而且每个招聘会场，高薪岗都不少，企业还要“拼”人文关怀、职场环境、工作氛围、职业成长等，所以，今年招聘中，他们着重在这些方面花了不少心思。</p><p>另外，今年春招中，也涌现了不少新兴职业，如平台主播、抖音经纪人等，这些新兴职业，对学历无甚要求，企业更看重求职者自身的业务能力，尤其是沟通能力和镜头感。销售还是一如既往的难招，相比年轻人，30至45岁的求职者仍然是这一行业的中流砥柱。</p><p>春招还在火热进行中，求职要规避哪些坑？招聘中的那些文字游戏你懂吗？新瓶装老酒的职场套路你能识别吗？大象新闻记者仍将为您持续报道。</p>','/api/upload/1575398442115530752.jpg',null);
insert into `article` values ('4','厦门节后招聘开启 30岁以上求职者占比较大','招聘','490','0','2024-02-28 18:17:40.0','2024-02-28 18:17:40.0',null,null,null,'<p class="ql-align-center"><img src="https://n.sinaimg.cn/sinakd20220218s/683/w300h383/20220218/5355-3a533065365dae41e8cd595539131499.jpg"><strong>&nbsp;</strong></p><p class="ql-align-center"><strong>人才市场年后首场交流会现场，求职者正在投递简历。</strong></p><p>厦门网讯 (文/图厦门日报记者 卢琛) 前日上午，市人才市场年后首场线下交流会“开市”，记者走访发现现场求职者中有不少已经超过30岁，目的是为寻求更有发展性的企业与公司；首日现场的招聘方提供的职位，则多为工程师、销售工程师、技术专员等带有专业技术性的岗位。</p><p>厦门人才市场2022年春节后(截至2月16日)共举办6场交流会，本场为线下，其余5场均为线上。另外，记者从多家企业与公司了解到，目前线上招聘比线下更为热门，越来越多的求职者偏向于参加线上招聘会。</p><p><strong>　求职者:期待更有发展性的企业</strong></p><p>前日上午10时，记者来到位于湖滨东路的厦门市人才市场，此时人才市场内正在举行2022年春节后首场线下招聘会。记者走访发现，相比往年大多是毕业生或年轻人，今年来到现场的求职者，大部分已经30岁以上。市民刘小姐说:“我想着现在正值开春，一年之计在于春嘛，加上今天又是年后的第一次线下招聘，于是今早就来人才市场看看。”她希望能找到销售类型的工作，比起薪资，她更看重企业或公司是否具有发展性。</p><p>市民李先生自去年便遇到了自己工作上的瓶颈，一直得不到突破。于是他当日来到人才市场，除了想多看看是否有更适合自己的岗位，顺便也多了解一下如今的招聘市场情况。</p><p><strong>　招聘方:希望招聘更有创造力的职工</strong></p><p>“我们今年将在翔安开设新的工厂，需要很多相关的技术人才。”一家企业负责人李小姐谈到，他们原工厂在泉州，这次招聘也希望通过较高的薪资待遇，吸引到更多的人才。另一家企业人事告诉记者，在他看来，年轻职工在学习能力及创造力上都更胜一筹，因此他们希望能有更多的年轻求职者前来咨询。</p><p><br></p><p>经过对现场多家企业的了解，记者注意到，虽然现场企业的招聘栏上没有提及，但不少招聘单位都倾向于招聘更加年轻、有创造力的职工。</p><p>记者从市人才中心工作人员处了解到，首场线下交流会共有42家参会单位，提供180个岗位，需求751人。厦门人才市场在做好疫情防控的前提下，计划每周定期于周二、周三、周五举办现场交流会。</p><p><strong>【链接】</strong></p><p><strong>视频面试越来越流行</strong></p><p>视频面试在节约招聘成本和提高招聘效率方面具有优势，逐渐成为更多企业和求职者的选择。记者从智联招聘发布的《2022年春招市场行情周报》第一期中了解到，智联招聘面向企业的调研数据显示，63.8%的企业在今年春招时采用了视频面试、视频介绍或线上双选会等可视化招聘方式。其中，视频面试是企业招聘的最主要方式，55.1%的企业使用过。视频面试不单是企业的选择，也是职场人广泛使用的求职方式。智联招聘面向职场人的调研数据显示，78.4%的求职者在今年春招使用过可视化求职方式，6成人依赖视频面试找工作。</p>','/api/upload/1575398869473165313.jpg',null);
insert into `article` values ('5','“会聘上海 职等你来”长宁专场招聘会圆满收官！','招聘','769','0','2024-02-28 18:17:40.0','2024-02-28 18:17:40.0',null,null,null,'<p class="ql-align-justify">今天（12月8日）下午，由上海市总工会职工服务中心、长宁区总工会、北新泾街道总工会、北新泾街道社区事务受理服务中心联合举办的“会聘上海 职等你来”长宁专场招聘会在北新泾街道爱馨苑开展，线上线下共计40家企事业单位参加此次招聘会。</p><p><br></p><p><img src="https://sghimages.shobserver.com/img/catch/2023/12/08/82fe1d30-5881-48ee-9e1f-90b8a8a8843e.jpg"></p><p>本次招聘会以线下设展+线上直播的方式进行，当天中午，招聘会还未开始，已经有不少求职者来到现场提前了解企业、岗位需求。记者在现场了解到，本次来自长宁的企事业单位涵盖各行各业，消防员、软件工程师、物业管理、酒店服务、电商运营……200多个工作岗位面向广大求职者招贤纳才，薪资待遇大多在七八千元左右，其中也不乏月薪两万元以上的高薪岗位。</p><p><br></p><p>“有意向的求职者可以将简历发送至手机屏幕前的邮箱。”招聘会现场，一间会议室被打造成“申工社”直播间。上海市保安押运有限公司、上海东立国际旅行社等10余家企业通过“申工社”抖音直播间向线上参与的求职者推介企业风采和招聘需求。</p><p>“今年在职业生涯中一直没有什么突破，正好年底了，所以来看看有没有合适的工作。”求职者小吴告诉记者，这次在公众号上看到自己家附近有一场线下招聘会，而且待遇都还不错，便特意来现场了解情况。</p>','/api/upload/1733158980085088257.jpg',null);
insert into `article` values ('6','早安·西安丨6万+岗位 大型网络视频招聘会来了','招聘','415','0','2024-02-28 18:17:40.0','2024-02-28 18:17:40.0',null,null,null,'<p>近日，西安市商务局制定发布《“相约春天·嗨购西安”2022年一季度促消费活动实施方案》，通过16项活动，全面提升消费市场服务质量，营造促消费氛围，释放消费潜力，拉动消费增长，促进消费市场快速恢复发展，保持一季度消费市场运行稳健，为保质保量完成2022年我市社会消费品零售总额指标打下坚实基础。（记者 轩辕杨子）</p><p><img src="https://n.sinaimg.cn/sinakd20220218s/491/w640h651/20220218/7cbd-ae5e162c0c3d0febc052eb1bd8972116.jpg"></p><p><strong>6万+岗位 春季大型网络视频招聘会来了</strong></p><p>2月17日，西安市总工会、西安市人力资源和社会保障局、西安市工商联联合举办“真情送岗暖民心 就业援助见实效”春季大型网络视频招聘会。此次招聘活动提供各类工作岗位6万个以上，其中特别为新就业形态工作者和农民工群体，提供1万个就业岗位。活动将持续至3月底。（记者 袁玥）</p><p><img src="https://n.sinaimg.cn/sinakd20220218s/320/w640h480/20220218/e772-e92427b4a12a1ba93822967e25d1be16.jpg"></p><p><br></p><p><br></p><p><strong>陕西调整汽、柴油最高零售价 95号汽油迎来“8”时代</strong></p><p>2月17日，记者从陕西省发展改革委获悉，我省汽油、柴油最高零售价格进行调整，自17日24时起执行。调整后西安市场95号汽油为8.16元每升。（记者 高乐）</p><p><strong>国家卫健委：正在研究建立全国统一的电子病历</strong></p><p>据国家卫健委网站消息，我国正研究建立全国统一的电子健康档案、电子病历、医保等信息标准体系，将逐步实现互联互通、信息共享和业务协同。（据央视）</p><p><strong>教育部：每所中小学校至少配备1名法治副校长</strong></p><p>记者从教育部17日召开的新闻发布会上了解到，《中小学法治副校长聘任与管理办法》5月1日起实施，每所中小学校将至少配备1名法治副校长，偏远地区、农村地区学校和城市薄弱学校优先配备法治副校长。（据新华社）</p>','/api/upload/1575399620152918017.jpg',null);
insert into `article_type` values ('1','100','招聘','0',null,null,null,'2024-02-28 18:17:40.0','2024-02-28 18:17:40.0');
