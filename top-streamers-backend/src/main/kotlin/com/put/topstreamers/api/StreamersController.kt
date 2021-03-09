package com.put.topstreamers.api

import com.put.topstreamers.application.DataNotFound
import com.put.topstreamers.application.Streamer
import com.put.topstreamers.application.StreamerService
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("streamers")
@CrossOrigin(origins = ["*"])
class StreamersController(
    private val streamerService: StreamerService
) {

    @GetMapping
    fun getAllStreamers(@RequestParam channel: String?) = streamerService.getAllStreamers(channel)

    @GetMapping("{id}")
    fun get(@PathVariable id: String) = streamerService.get(id)

    @PostMapping
    fun addNewStreamer(@RequestBody request: NewStreamerRequest) = streamerService.save(request.toDomain())

    @PutMapping("{id}")
    fun modify(@PathVariable id: String, @RequestBody request: Streamer) = streamerService.update(id, request)

    @DeleteMapping("{id}")
    fun delete(@PathVariable id: String) = streamerService.delete(id)

    @GetMapping("/avg-viewers")
    fun avgViewers() = streamerService.meanViewers()

    @GetMapping("/avg-viewers-language")
    fun avgViewersByLanguage() = streamerService.avgViewersByLanguage()

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(DataNotFound::class)
    fun handleException() {}
}

data class NewStreamerRequest(
    val channel: String,
    val watchTime: Long,
    val streamTime: Long,
    val peakViewers: Long,
    val avgViewers: Long,
    val followers: Long,
    val followersGained: Long,
    val viewsGained: Long,
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