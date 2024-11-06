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
 * 招聘信息：(RecruitmentInformation)表实体类
 *
 */
@TableName("`recruitment_information`")
@Data
@EqualsAndHashCode(callSuper = false)
public class RecruitmentInformation implements Serializable {

    // RecruitmentInformation编号
    @TableId(value = "recruitment_information_id", type = IdType.AUTO)
    private Integer recruitment_information_id;

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
    // 办公环境
    @TableField(value = "`office_environment`")
    private String office_environment;
    // 招聘职位
    @TableField(value = "`recruitment_positions`")
    private String recruitment_positions;
    // 职位分类
    @TableField(value = "`job_classification`")
    private String job_classification;
    // 工作城市
    @TableField(value = "`work_city`")
    private String work_city;
    // 学历要求
    @TableField(value = "`educational_requirements`")
    private String educational_requirements;
    // 岗位要求
    @TableField(value = "`job_requirements`")
    private String job_requirements;
    // 薪资福利
    @TableField(value = "`salary_and_benefits`")
    private String salary_and_benefits;

    // 点击数
    @TableField(value = "hits")
    private Integer hits;

    // 点赞数
    @TableField(value = "praise_len")
    private Integer praise_len;








    // 更新时间
    @TableField(value = "update_time")
    private Timestamp update_time;

    // 创建时间
    @TableField(value = "create_time")
    private Timestamp create_time;







}
