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
 * 企业用户：(EnterpriseUsers)表实体类
 *
 */
@TableName("`enterprise_users`")
@Data
@EqualsAndHashCode(callSuper = false)
public class EnterpriseUsers implements Serializable {

    // EnterpriseUsers编号
    @TableId(value = "enterprise_users_id", type = IdType.AUTO)
    private Integer enterprise_users_id;

    // 企业编号
    @TableField(value = "`enterprise_id`")
    private String enterprise_id;
    // 企业名称
    @TableField(value = "`enterprise_name`")
    private String enterprise_name;
    // 人事姓名
    @TableField(value = "`personnel_name`")
    private String personnel_name;
    // 企业电话
    @TableField(value = "`enterprise_phone_number`")
    private String enterprise_phone_number;







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
