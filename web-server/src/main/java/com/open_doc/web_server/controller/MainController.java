package com.open_doc.web_server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.open_doc.web_server.domain.User;
import com.open_doc.web_server.service.HelloService;

@RestController
@RequestMapping("/api/v1")
public class MainController {

    @Autowired
    private HelloService helloService;

    @GetMapping("/hello")
    public String hello() {
        return helloService.getHelloMessage("John Doe");
    }

    @PostMapping("/hello")
    public String helloPost(@RequestBody User body) {
        return helloService.getHelloMessage(body.getName());
    }
}