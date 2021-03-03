package com.put.topstreamers.external

import com.put.topstreamers.application.Streamer
import com.put.topstreamers.application.StreamersDatabase
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.data.mongodb.core.query.Criteria
import org.springframework.stereotype.Repository
import org.springframework.data.mongodb.core.query.Query.query
import org.bson.types.ObjectId

@Repository
class MongoDatabase(private val mongoTemplate: MongoTemplate): StreamersDatabase {
    override fun get(id: String): Streamer? =
        mongoTemplate.findById(id, StreamerEntity::class.java, COLLECTION_NAME)?.toDomain()

    override fun delete(id: String): Long =
        mongoTemplate.remove(query(Criteria.where("_id").`is`(id)), StreamerEntity::class.java, COLLECTION_NAME)
            .deletedCount
    override fun getAllStreamers(): List<Streamer> =
        mongoTemplate.findAll(StreamerEntity::class.java, COLLECTION_NAME)
        .mapNotNull { it.toDomain() }

    override fun getStreamersByChannelName(channel: String?): List<Streamer> =
        mongoTemplate.find(query(Criteria.where("channel").`is`(channel)), StreamerEntity::class.java, COLLECTION_NAME)
            .mapNotNull { it.toDomain() }

    override fun save(streamer: Streamer): Streamer =
        mongoTemplate.save(streamer.toEntity(), COLLECTION_NAME).toDomain()!!

    companion object {
        private const val COLLECTION_NAME = "streamers"
    }
}

fun Streamer.toEntity() = StreamerEntity(
    id = id ?: ObjectId().toString(),
    channel = channel!!,
    watchTime = watchTime.toString(),
    streamTime = streamTime.toString(),
    peakViewers = peakViewers.toString(),
    avgViewers = avgViewers.toString(),
    followers = followers.toString(),
    followersGained = followersGained.toString(),
    viewsGained = viewsGained.toString(),
    partnered = partnered!!,
    mature = mature!!,
    language = language!!
)

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
    val mature: Boolean,
    val language: String
) {
    fun toDomain() = try {
        Streamer(
            id = id,
            channel = channel,
            watchTime = watchTime.toInt(),
            streamTime = streamTime.toInt(),
            peakViewers = peakViewers.toInt(),
            avgViewers = avgViewers.toInt(),
            followers = followers.toInt(),
            followersGained = followersGained.toInt(),
            viewsGained = viewsGained.toInt(),
            partnered = partnered,
            mature = mature,
            language = language
        )
    } catch (ex: Exception) {
        null
    }
}