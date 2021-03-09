package com.put.topstreamers.application

import org.springframework.stereotype.Service
import java.lang.RuntimeException

@Service
class StreamerService(
    private val streamersDatabase: StreamersDatabase
) {

    fun get(id: String): Streamer = streamersDatabase.get(id) ?: throw DataNotFound(id)

    fun getAllStreamers(channel: String?): List<Streamer> = channel?.let {
        streamersDatabase.getStreamersByChannelName(channel)
    } ?: streamersDatabase.getAllStreamers()

    fun save(streamer: Streamer) = streamersDatabase.save(streamer)

    fun update(id: String, request: Streamer): Streamer {
        val original: Streamer = streamersDatabase.get(id) ?: throw DataNotFound(id)
        val modified = Streamer(
            id = original.id,
            channel = request.channel ?: original.channel,
            watchTime = request.watchTime ?: original.watchTime,
            streamTime = request.streamTime ?: original.streamTime,
            peakViewers = request.peakViewers ?: original.peakViewers,
            avgViewers = request.avgViewers ?: original.avgViewers,
            followers = request.followers ?: original.followers,
            followersGained = request.followersGained ?: original.followersGained,
            viewsGained = request.viewsGained ?: original.viewsGained,
            partnered = request.partnered ?: original.partnered,
            mature = request.mature ?: original.mature,
            language = request.language ?: original.language
        )
        return streamersDatabase.save(modified)
    }

    fun delete(id: String) {
        if (streamersDatabase.delete(id) == 0L) {
            throw DataNotFound(id)
        }
    }

    fun meanViewers(): MeanWatchers {
        val allStreamers = streamersDatabase.getAllStreamers()
        val meanViewers = allStreamers.map { it.avgViewers!!.toDouble() }.average()
        val meanViewersGrouped: Map<Boolean?, Double> = allStreamers.groupBy { it.mature }
            .mapValues { it.value.map { streamer -> streamer.avgViewers!!.toDouble() }.average() }
        return MeanWatchers(
            mean = meanViewers,
            meanMature = meanViewersGrouped[true] ?: 0,
            meanNotMature = meanViewersGrouped[false] ?: 0
        )
    }

    fun avgViewersByLanguage(): Map<String?, Double> {
        val allStreamers = streamersDatabase.getAllStreamers()
        return allStreamers.groupBy { it.language }
            .mapValues { it.value.map { streamer -> streamer.avgViewers!!.toDouble() }.average() }
    }
}

class DataNotFound(id: String) : RuntimeException("Stream with $id not found")
