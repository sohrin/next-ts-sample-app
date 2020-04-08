package com.sanyu_i.sisdiv3.n_study.ntsa.kotlinbackend.api.sample.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import com.sanyu_i.sisdiv3.n_study.ntsa.kotlinbackend.api.sample.service.SampleService
import com.sanyu_i.sisdiv3.n_study.ntsa.kotlinbackend.api.sample.dataset.Sample


@RestController
@RequestMapping("/sample")
class SampleApiController {

    @Autowired
    lateinit var sampleService: SampleService

    @GetMapping("/getAll")
    fun getAll(): List<Sample> {
        return sampleService.getAll()
    }

    @PostMapping("/add")
    fun add(sample : Sample): Int {
        return sampleService.add(sample)
    }

}