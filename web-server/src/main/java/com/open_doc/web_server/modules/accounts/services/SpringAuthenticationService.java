package com.open_doc.web_server.modules.accounts.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.open_doc.web_server.modules.accounts.repositories.AccountsRepository;

@Service
public class SpringAuthenticationService implements UserDetailsService {

    @Autowired
    private AccountsRepository userAuthRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userAuthRepository.findByEmail(email);
    }
}
