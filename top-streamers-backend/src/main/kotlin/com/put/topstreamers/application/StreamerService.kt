package com.put.topstreamers.application

import org.springframework.stereotype.Service

@Service
class StreamerService(
    private val streamersDatabase: StreamersDatabase) {

    fun getAllStreamers(channel: String?): List<Streamer> = channel?.let {
        streamersDatabase.getStreamersByChannelName(channel)
    } ?: streamersDatabase.getAllStreamers()

}
