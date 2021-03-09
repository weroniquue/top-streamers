package com.put.topstreamers.application

data class Streamer(
    val id: String?,
    val channel: String?,
    val watchTime: Long?,
    val streamTime: Long?,
    val peakViewers: Long?,
    val avgViewers: Long?,
    val followers: Long?,
    val followersGained: Long?,
    val viewsGained: Long?,
    val partnered: Boolean?,
    val mature: Boolean?,
    val language: String?
)

data class MeanWatchers(
    val mean: Number,
    val meanMature: Number,
    val meanNotMature: Number
)