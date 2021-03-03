package com.put.topstreamers.api

import com.put.topstreamers.application.StreamerService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController

@RestController
class StreamersController(
    private val streamerService: StreamerService
) {

    @GetMapping("/streamers")
    fun getAllStreamers(@PathVariable channel: String?) = streamerService.getAllStreamers(channel)
}