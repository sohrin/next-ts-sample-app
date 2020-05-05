package com.sanyu_i.sisdiv3.n_study.ntsa.kotlinbackend.common.security

import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.builders.WebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity

@Configuration
@EnableWebSecurity
class WebSecurityConfig : WebSecurityConfigurerAdapter() {

    @Throws(Exception::class)
    override fun configure(webSecurity: WebSecurity) {
        webSecurity.ignoring()
                .antMatchers( "/backend-api/**");
    }

    @Throws(Exception::class)
    override fun configure(http: HttpSecurity) {
        http.cors().and().csrf().disable()
                .authorizeRequests()
                .mvcMatchers("/backend-api-auth/**")
                .hasAuthority("SCOPE_next-ts-sample-app-userpool-resourceserver/backend-api-auth:readwrite")
                .anyRequest().authenticated();
        http.oauth2ResourceServer()
                .jwt();
    }

}