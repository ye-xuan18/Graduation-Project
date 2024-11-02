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
 * 职位咨询：(JobConsultation)表实体类
 *
 */
@TableName("`job_consultation`")
@Data
@EqualsAndHashCode(callSuper = false)
public class JobConsultation implements Serializable {

    // JobConsultation编号
    @TableId(value = "job_consultation_id", type = IdType.AUTO)
    private Integer job_consultation_id;

    // 普通用户
    @TableField(value = "`regular_users`")
    private Integer regular_users;
    // 用户姓名
    @TableField(value = "`user_name`")
    private String user_name;
    // 用户性别
    @TableField(value = "`user_gender`")
    private String user_gender;
    // 联系方式
    @TableField(value = "`contact_information`")
    private String contact_information;
    // 企业用户
    @TableField(value = "`enterprise_users`")
    private Integer enterprise_users;
    // 企业编号
    @TableField(value = "`enterprise_id`")
    private String enterprise_id;
    // 企业名称
    @TableField(value = "`enterprise_name`")
    private String enterprise_name;
    // 招聘职位
    @TableField(value = "`recruitment_positions`")
    private String recruitment_positions;
    // 职位分类
    @TableField(value = "`job_classification`")
    private String job_classification;
    // 工作城市
    @TableField(value = "`work_city`")
    private String work_city;
    // 咨询时间
    @TableField(value = "`consultation_time`")
    private Timestamp consultation_time;
    // 咨询内容
    @TableField(value = "`consultation_content`")
    private String consultation_content;
    // 回复时间
    @TableField(value = "`reply_time`")
    private Timestamp reply_time;
    // 回复内容
    @TableField(value = "`reply_content`")
    private String reply_content;










    // 更新时间
    @TableField(value = "update_time")
    private Timestamp update_time;

    // 创建时间
    @TableField(value = "create_time")
    private Timestamp create_time;







}
