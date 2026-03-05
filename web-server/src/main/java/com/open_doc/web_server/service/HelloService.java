package com.open_doc.web_server.service;

import org.springframework.stereotype.Service;

@Service
public class HelloService {
    public String getHelloMessage(String name) {
        return "Hello, OpenDoc! " + name;
    }
}
