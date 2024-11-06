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
 * 职位分类：(JobClassification)表实体类
 *
 */
@TableName("`job_classification`")
@Data
@EqualsAndHashCode(callSuper = false)
public class JobClassification implements Serializable {

    // JobClassification编号
    @TableId(value = "job_classification_id", type = IdType.AUTO)
    private Integer job_classification_id;

    // 职位分类
    @TableField(value = "`job_classification`")
    private String job_classification;










    // 更新时间
    @TableField(value = "update_time")
    private Timestamp update_time;

    // 创建时间
    @TableField(value = "create_time")
    private Timestamp create_time;







}
