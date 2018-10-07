// sound player

module.exports = plugin

function plugin() {
	var player = new Audio()
	return function (state, emitter) {
		emitter.on('player:set', setsource)
		emitter.on('player:toggle', toggle)

		player.autoplay = true
		player.addEventListener('ended', ended)
		player.addEventListener('timeupdate', update)

		function setsource(src) {
			player.src = src
			if (state.hangtime.time > 0) {
				player.currentTime = state.hangtime.time
			}
		}

		function toggle() {
			if (player.paused) player.play()
			else player.pause()
		}

		function ended() {
			state.hangtime.time = 0
			emitter.emit('hangtime:next')
		}

		function update() {
			state.hangtime.time = player.currentTime
		}
	}
}
