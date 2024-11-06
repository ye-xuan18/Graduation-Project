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
 * 面试通知：(InterviewNotification)表实体类
 *
 */
@TableName("`interview_notification`")
@Data
@EqualsAndHashCode(callSuper = false)
public class InterviewNotification implements Serializable {

    // InterviewNotification编号
    @TableId(value = "interview_notification_id", type = IdType.AUTO)
    private Integer interview_notification_id;

    // 企业用户
    @TableField(value = "`enterprise_users`")
    private Integer enterprise_users;
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
    // 招聘职位
    @TableField(value = "`recruitment_positions`")
    private String recruitment_positions;
    // 职位分类
    @TableField(value = "`job_classification`")
    private String job_classification;
    // 工作城市
    @TableField(value = "`work_city`")
    private String work_city;
    // 面试时间
    @TableField(value = "`interview_time`")
    private Timestamp interview_time;
    // 面试备注
    @TableField(value = "`interview_notes`")
    private String interview_notes;










    // 更新时间
    @TableField(value = "update_time")
    private Timestamp update_time;

    // 创建时间
    @TableField(value = "create_time")
    private Timestamp create_time;







}
