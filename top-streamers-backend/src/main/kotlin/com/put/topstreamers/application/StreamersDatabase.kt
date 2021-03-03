package com.put.topstreamers.application

interface StreamersDatabase {
    fun get(id: String): Streamer?
    fun delete(id: String): Long
    fun getAllStreamers(): List<Streamer>
    fun getStreamersByChannelName(channel: String?): List<Streamer>
    fun save(streamer: Streamer): Streamer
}