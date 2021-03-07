package com.put.topstreamers.api

import com.put.topstreamers.application.DataNotFound
import com.put.topstreamers.application.Streamer
import com.put.topstreamers.application.StreamerService
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("streamers")
class StreamersController(
    private val streamerService: StreamerService
) {

    @GetMapping
    fun getAllStreamers(@RequestParam channel: String?) = streamerService.getAllStreamers(channel)

    @PostMapping
    fun addNewStreamer(@RequestBody request: NewStreamerRequest) = streamerService.save(request.toDomain())

    @PutMapping("{id}")
    fun modify(@PathVariable id: String, @RequestBody request: Streamer) = streamerService.update(id, request)

    @DeleteMapping("{id}")
    fun delete(@PathVariable id: String) = streamerService.delete(id)

    @GetMapping("/avg-viewers")
    fun avgViewers() = streamerService.meanViewers()

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(DataNotFound::class)
    fun handleException() {}
}

data class NewStreamerRequest(
    val channel: String,
    val watchTime: Int,
    val streamTime: Int,
    val peakViewers: Int,
    val avgViewers: Int,
    val followers: Int,
    val followersGained: Int,
    val viewsGained: Int,
    val partnered: Boolean,
    val mature: Boolean,
    val language: String
) {
    fun toDomain(): Streamer =
        Streamer(
            id = null,
            channel = channel,
            watchTime = watchTime,
            streamTime = streamTime,
            peakViewers = peakViewers,
            avgViewers = avgViewers,
            followers = followers,
            followersGained = followersGained,
            viewsGained = viewsGained,
            partnered = partnered,
            mature = mature,
            language = language
        )
}