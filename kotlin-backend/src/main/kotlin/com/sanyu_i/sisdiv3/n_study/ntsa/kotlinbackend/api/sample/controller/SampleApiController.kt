package com.sanyu_i.sisdiv3.n_study.ntsa.kotlinbackend.api.sample.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import com.sanyu_i.sisdiv3.n_study.ntsa.kotlinbackend.api.sample.service.SampleService
import com.sanyu_i.sisdiv3.n_study.ntsa.kotlinbackend.api.sample.dataset.Sample


@RestController
class SampleApiController {

    @Autowired
    lateinit var sampleService: SampleService

    @GetMapping("samples")
    fun getSampleList(): List<Sample> {
        return sampleService.getSampleList()
    }

}