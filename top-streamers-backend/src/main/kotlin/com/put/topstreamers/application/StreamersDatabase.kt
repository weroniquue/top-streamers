package com.put.topstreamers.application

interface StreamersDatabase {
    fun getAllStreamers(): List<String>
    fun getStreamersByChannelName(channel: String?): List<String>
}