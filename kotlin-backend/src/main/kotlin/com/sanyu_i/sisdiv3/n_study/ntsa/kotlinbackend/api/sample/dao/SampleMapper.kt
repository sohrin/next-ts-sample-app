package com.sanyu_i.sisdiv3.n_study.ntsa.kotlinbackend.api.sample.dao;

import com.sanyu_i.sisdiv3.n_study.ntsa.kotlinbackend.api.sample.dataset.Sample;
import org.apache.ibatis.annotations.Mapper

@Mapper
interface SampleMapper {

    fun getSampleList(): List<Sample>

}