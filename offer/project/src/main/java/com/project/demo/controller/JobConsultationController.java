package com.project.demo.controller;

import com.project.demo.entity.JobConsultation;
import com.project.demo.service.JobConsultationService;
import com.project.demo.controller.base.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.*;

/**
 * 职位咨询：(JobConsultation)表控制层
 *
 */
@RestController
@RequestMapping("/job_consultation")
public class JobConsultationController extends BaseController<JobConsultation, JobConsultationService> {

    /**
     * 职位咨询对象
     */
    @Autowired
    public JobConsultationController(JobConsultationService service) {
        setService(service);
    }



    @PostMapping("/add")
    @Transactional
    public Map<String, Object> add(HttpServletRequest request) throws IOException {
        Map<String,Object> paramMap = service.readBody(request.getReader());
        this.addMap(paramMap);
        return success(1);
    }



    }
