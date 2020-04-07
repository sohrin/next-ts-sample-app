package com.sanyu_i.sisdiv3.n_study.ntsa.kotlinbackend.api.sample.service

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import com.sanyu_i.sisdiv3.n_study.ntsa.kotlinbackend.api.sample.dataset.Sample
import com.sanyu_i.sisdiv3.n_study.ntsa.kotlinbackend.api.sample.dao.SampleMapper

@Service
class SampleServiceImpl : SampleService {

    @Autowired
    lateinit var sampleMapper: SampleMapper

    override fun getSampleList(): List<Sample> {
        // var sampleList : MutableList<Sample> = mutableListOf<Sample>()
        // sampleList.add(Sample(1, "name1"));
        // sampleList.add(Sample(2, "name2"));
        var sampleList : List<Sample> = sampleMapper.getSampleList()
        return sampleList
    }

}