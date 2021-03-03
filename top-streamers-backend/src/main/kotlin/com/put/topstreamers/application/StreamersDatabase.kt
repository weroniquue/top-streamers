package com.put.topstreamers.application

interface StreamersDatabase {
    fun getAllStreamers(): List<Streamer>
    fun getStreamersByChannelName(channel: String?): List<Streamer>
}