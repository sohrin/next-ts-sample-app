package com.sanyu_i.sisdiv3.n_study.ntsa.kotlinbackend.api.sample.service

import com.sanyu_i.sisdiv3.n_study.ntsa.kotlinbackend.api.sample.dataset.Sample

interface SampleService {

    fun getAll(): List<Sample>

    fun add(sample : Sample): Int

}