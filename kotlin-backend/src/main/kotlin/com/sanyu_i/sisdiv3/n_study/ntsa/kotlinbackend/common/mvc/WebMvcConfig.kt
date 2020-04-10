package com.sanyu_i.sisdiv3.n_study.ntsa.kotlinbackend.common.mvc;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@Configuration
public class WebMvcConfig : WebMvcConfigurer {

    // MEMO: Kotlinでは"$"のエスケープが必要：http://siosio.hatenablog.com/entry/2016/11/23/082021
    @Value("\${frontend.url.hosts}")
    val frontendUrlHosts = "localhost:3000"

    override fun addCorsMappings(registry : CorsRegistry) {
        registry.addMapping("/**")
                .allowedOrigins("http://" + frontendUrlHosts)
    }

}