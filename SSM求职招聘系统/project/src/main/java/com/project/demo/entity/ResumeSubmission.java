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
 * 简历投递：(ResumeSubmission)表实体类
 *
 */
@TableName("`resume_submission`")
@Data
@EqualsAndHashCode(callSuper = false)
public class ResumeSubmission implements Serializable {

    // ResumeSubmission编号
    @TableId(value = "resume_submission_id", type = IdType.AUTO)
    private Integer resume_submission_id;

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
    // 简历文件
    @TableField(value = "`resume_file`")
    private String resume_file;
    // 提交时间
    @TableField(value = "`submission_time`")
    private Timestamp submission_time;










    // 更新时间
    @TableField(value = "update_time")
    private Timestamp update_time;

    // 创建时间
    @TableField(value = "create_time")
    private Timestamp create_time;







}
