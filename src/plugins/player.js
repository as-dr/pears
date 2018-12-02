// sound player

module.exports = plugin

function plugin() {
	const player = new Audio()
	const preloader = new Audio()
	return function (state, emitter) {
		emitter.on('player:set', setsource)
		emitter.on('player:play', togglePaused)
    emitter.on('player:mute', toggleMute)
		emitter.on('player:preload', preload)

		player.autoplay = true
		player.preload = 'auto'
		player.addEventListener('ended', onended)
		player.addEventListener('timeupdate', onupdate)
    player.addEventListener('error', onerror)
		preloader.autoplay = false
		preloader.preload = 'auto'
		preloader.volume = 0

		function setsource(src) {
			player.src = src
			if (state.hangtime.time > 0) {
				player.currentTime = state.hangtime.time
			}
		}

		function preload(src) {
			preloader.src = src
			preloader.load()
		}

		function togglePaused () {
			if (player.paused) player.play()
			else player.pause()
		}

    function toggleMute () {
      if (player.volume === 0) {
        player.volume = 1
        state.hangtime.muted = false
      } else {
        player.volume = 0
        state.hangtime.muted = true
      }
      emitter.emit('render')
    }

    // todo
    function onerror(e) {
      console.log(e)
      // on error we notify other peers to maybe skip the song
      onended()
    }

		function onended() {
			state.hangtime.time = 0
			emitter.emit('messenger:ended')
			emitter.emit('hangtime:next')
		}

		function onupdate() {
			state.hangtime.time = player.currentTime
		}
	}
}
