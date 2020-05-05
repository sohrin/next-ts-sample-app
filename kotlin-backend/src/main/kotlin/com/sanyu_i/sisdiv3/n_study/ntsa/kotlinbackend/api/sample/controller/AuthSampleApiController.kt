package com.sanyu_i.sisdiv3.n_study.ntsa.kotlinbackend.api.sample.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import com.sanyu_i.sisdiv3.n_study.ntsa.kotlinbackend.common.logging.KtLog
import com.sanyu_i.sisdiv3.n_study.ntsa.kotlinbackend.api.sample.service.SampleService
import com.sanyu_i.sisdiv3.n_study.ntsa.kotlinbackend.api.sample.dataset.Sample
import org.springframework.security.access.prepost.PreAuthorize

@RestController
@RequestMapping("/backend-api-auth/sample")
class AuthSampleApiController {
    
    companion object:KtLog()

    @Autowired
    lateinit var sampleService: SampleService

    @GetMapping("/getAll")
    fun authGetAll(@RequestHeader("Authorization") authorizationHeaderStr: String): List<Sample> {
        log.info("authGetAll() BEGIN.")
        log.info("authorizationHeaderStr:$authorizationHeaderStr")
        return sampleService.getAll()
    }
    
}