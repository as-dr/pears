// sound player

module.exports = plugin

function plugin() {
	const player = new Audio()
	const preloader = new Audio()
	return function (state, emitter) {
    state.events.PLAYER_SET = 'player:set'
    state.events.PLAYER_PLAY = 'player:play'
    state.events.PLAYER_MUTE = 'player:mute'
    state.events.PLAYER_PRELOAD = 'player:preload'

		emitter.on(state.events.PLAYER_SET, setsource)
		emitter.on(state.events.PLAYER_PLAY, togglePaused)
    emitter.on(state.events.PLAYER_MUTE, toggleMute)
		emitter.on(state.events.PLAYER_PRELOAD, preload)

    // end of song magic
    window.magic = function () {
      player.currentTime = player.duration - 10
    }

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
      state.hangtime.playing = false
			state.hangtime.time = 0
			emitter.emit('messenger:ended')
			emitter.emit('hangtime:next')
		}

		function onupdate() {
      if (!state.hangtime.playing) {
        state.hangtime.playing = true
        emitter.emit('render')
      }
			state.hangtime.time = player.currentTime
		}
	}
}
