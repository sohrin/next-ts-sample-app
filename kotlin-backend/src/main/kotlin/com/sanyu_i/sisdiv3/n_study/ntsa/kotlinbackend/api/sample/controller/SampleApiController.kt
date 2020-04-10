package com.sanyu_i.sisdiv3.n_study.ntsa.kotlinbackend.api.sample.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import com.sanyu_i.sisdiv3.n_study.ntsa.kotlinbackend.common.logging.KtLog
import com.sanyu_i.sisdiv3.n_study.ntsa.kotlinbackend.api.sample.service.SampleService
import com.sanyu_i.sisdiv3.n_study.ntsa.kotlinbackend.api.sample.dataset.Sample


@RestController
@RequestMapping("/sample")
class SampleApiController {
    
    companion object:KtLog()

    @Autowired
    lateinit var sampleService: SampleService

    @GetMapping("/getAll")
    fun getAll(): List<Sample> {
        return sampleService.getAll()
    }

    @PostMapping("/add")
    fun add(@RequestBody sample : Sample): Int {
        log.info(sample.toString());
        return sampleService.add(sample)
    }

}