package com.project.demo.controller;

import com.project.demo.entity.ResumeSubmission;
import com.project.demo.service.ResumeSubmissionService;
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
 * 简历投递：(ResumeSubmission)表控制层
 *
 */
@RestController
@RequestMapping("/resume_submission")
public class ResumeSubmissionController extends BaseController<ResumeSubmission, ResumeSubmissionService> {

    /**
     * 简历投递对象
     */
    @Autowired
    public ResumeSubmissionController(ResumeSubmissionService service) {
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
