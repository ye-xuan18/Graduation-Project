package com.project.demo.controller;

import com.project.demo.entity.RegularUsers;
import com.project.demo.service.RegularUsersService;
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
 * 普通用户：(RegularUsers)表控制层
 *
 */
@RestController
@RequestMapping("/regular_users")
public class RegularUsersController extends BaseController<RegularUsers, RegularUsersService> {

    /**
     * 普通用户对象
     */
    @Autowired
    public RegularUsersController(RegularUsersService service) {
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
