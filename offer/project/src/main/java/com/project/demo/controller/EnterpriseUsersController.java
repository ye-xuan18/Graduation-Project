package com.project.demo.controller;

import com.project.demo.entity.EnterpriseUsers;
import com.project.demo.service.EnterpriseUsersService;
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
 * 企业用户：(EnterpriseUsers)表控制层
 *
 */
@RestController
@RequestMapping("/enterprise_users")
public class EnterpriseUsersController extends BaseController<EnterpriseUsers, EnterpriseUsersService> {

    /**
     * 企业用户对象
     */
    @Autowired
    public EnterpriseUsersController(EnterpriseUsersService service) {
        setService(service);
    }



    @PostMapping("/add")
    @Transactional
    public Map<String, Object> add(HttpServletRequest request) throws IOException {
        Map<String,Object> paramMap = service.readBody(request.getReader());
        Map<String, String> mapenterprise_id = new HashMap<>();
        mapenterprise_id.put("enterprise_id",String.valueOf(paramMap.get("enterprise_id")));
        List listenterprise_id = service.selectBaseList(service.select(mapenterprise_id, new HashMap<>()));
        if (listenterprise_id.size()>0){
            return error(30000, "字段企业编号内容不能重复");
        }
        this.addMap(paramMap);
        return success(1);
    }



    }
