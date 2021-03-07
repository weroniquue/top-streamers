package com.put.topstreamers.application

data class Streamer(
    val id: String?,
    val channel: String?,
    val watchTime: Int?,
    val streamTime: Int?,
    val peakViewers: Int?,
    val avgViewers: Int?,
    val followers: Int?,
    val followersGained: Int?,
    val viewsGained: Int?,
    val partnered: Boolean?,
    val mature: Boolean?,
    val language: String?
)

data class MeanWatchers(
    val mean: Number,
    val meanMature: Number,
    val meanNotMature: Number
)