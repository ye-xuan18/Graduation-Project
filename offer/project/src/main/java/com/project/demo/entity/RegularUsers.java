package com.project.demo.entity;

import com.alibaba.fastjson.annotation.JSONField;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.*;

import java.io.Serializable;
import java.sql.Timestamp;


/**
 * 普通用户：(RegularUsers)表实体类
 *
 */
@TableName("`regular_users`")
@Data
@EqualsAndHashCode(callSuper = false)
public class RegularUsers implements Serializable {

    // RegularUsers编号
    @TableId(value = "regular_users_id", type = IdType.AUTO)
    private Integer regular_users_id;

    // 用户姓名
    @TableField(value = "`user_name`")
    private String user_name;
    // 用户性别
    @TableField(value = "`user_gender`")
    private String user_gender;
    // 联系方式
    @TableField(value = "`contact_information`")
    private String contact_information;







    // 用户编号
    @TableField(value = "user_id")
    private Integer userId;



    // 更新时间
    @TableField(value = "update_time")
    private Timestamp update_time;

    // 创建时间
    @TableField(value = "create_time")
    private Timestamp create_time;







}
