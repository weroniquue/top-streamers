package com.put.topstreamers.external

import com.put.topstreamers.application.StreamersDatabase
import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.stereotype.Repository

@Repository
class MongoDatabase(mongoTemplate: MongoTemplate): StreamersDatabase {
    override fun getAllStreamers(): List<String> = emptyList()

    override fun getStreamersByChannelName(channel: String?): List<String> {
        TODO("Not yet implemented")
    }
}