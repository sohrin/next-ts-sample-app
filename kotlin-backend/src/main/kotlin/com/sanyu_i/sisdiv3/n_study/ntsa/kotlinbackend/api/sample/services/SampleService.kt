package com.sanyu_i.sisdiv3.n_study.ntsa.kotlinbackend.api.sample.service

import com.sanyu_i.sisdiv3.n_study.ntsa.kotlinbackend.api.sample.dataset.Sample

interface SampleService {

    fun getSampleList(): List<Sample>

}