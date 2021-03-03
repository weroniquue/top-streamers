package com.put.topstreamers.external

import com.put.topstreamers.application.Streamer
import com.put.topstreamers.application.StreamersDatabase
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.data.mongodb.core.query.Criteria
import org.springframework.stereotype.Repository
import org.springframework.data.mongodb.core.query.Query.query

@Repository
class MongoDatabase(private val mongoTemplate: MongoTemplate): StreamersDatabase {
    override fun getAllStreamers(): List<Streamer> =
        mongoTemplate.findAll(StreamerEntity::class.java, COLLECTION_NAME)
        .map { it.toDomain() }

    override fun getStreamersByChannelName(channel: String?): List<Streamer> =
        mongoTemplate.find(query(Criteria.where("channel").`is`(channel)), StreamerEntity::class.java, COLLECTION_NAME)
            .map { it.toDomain() }

    companion object {
        private const val COLLECTION_NAME = "streamers"
    }
}

data class StreamerEntity(
    @Id val id: String,
    val channel: String,
    val watchTime: String,
    val streamTime: String,
    val peakViewers: String,
    val avgViewers: String,
    val followers: String,
    val followersGained: String,
    val viewsGained: String,
    val partnered: Boolean,
    val mature: String,
    val language: String
) {
    fun toDomain() = Streamer(
        id,
        channel,
        watchTime.toIntOrNull(),
        streamTime.toIntOrNull()
    )
}