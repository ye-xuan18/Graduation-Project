package com.project.demo.entity;

import java.sql.Date;
import java.sql.Timestamp;
import com.project.demo.entity.base.BaseEntity;
import java.io.Serializable;
import lombok.*;
import javax.persistence.*;


/**
 *博主信息：(BloggerInformation)表实体类
 *
 */
@Setter
@Getter
@Entity(name = "BloggerInformation")
public class BloggerInformation implements Serializable {

    //BloggerInformation编号
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "blogger_information_id")
    private Integer blogger_information_id;
    // 姓名
    @Basic
    private String full_name;
    // 性别
    @Basic
    private String gender;
    // 头像
    @Basic
    private String head_portrait;
    // 个人简介
    @Basic
    private String personal_profile;

    // 更新时间
    @Basic
    private Timestamp update_time;

    // 创建时间
    @Basic
    private Timestamp create_time;

}
