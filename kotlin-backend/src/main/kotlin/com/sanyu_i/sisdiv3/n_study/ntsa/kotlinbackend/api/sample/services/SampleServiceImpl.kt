package com.sanyu_i.sisdiv3.n_study.ntsa.kotlinbackend.api.sample.service

import org.springframework.stereotype.Service
import com.sanyu_i.sisdiv3.n_study.ntsa.kotlinbackend.api.sample.dataset.Sample

@Service
class SampleServiceImpl : SampleService {

    override fun getSampleList(): List<Sample> {
        var sampleList : MutableList<Sample> = mutableListOf<Sample>()
        sampleList.add(Sample(1, "name1"));
        sampleList.add(Sample(2, "name2"));
        return sampleList
    }

}