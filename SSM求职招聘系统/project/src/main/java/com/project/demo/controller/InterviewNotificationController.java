package com.project.demo.controller;

import com.project.demo.entity.InterviewNotification;
import com.project.demo.service.InterviewNotificationService;
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
 * 面试通知：(InterviewNotification)表控制层
 *
 */
@RestController
@RequestMapping("/interview_notification")
public class InterviewNotificationController extends BaseController<InterviewNotification, InterviewNotificationService> {

    /**
     * 面试通知对象
     */
    @Autowired
    public InterviewNotificationController(InterviewNotificationService service) {
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
