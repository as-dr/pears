// sound player

module.exports = plugin

function plugin() {
	const player = new Audio()
	const preloader = new Audio()
	return function (state, emitter) {
		emitter.on('player:set', setsource)
		emitter.on('player:toggle', toggle)
		emitter.on('player:preload', preload)

		player.autoplay = true
		player.preload = 'auto'
		player.addEventListener('ended', ended)
		player.addEventListener('timeupdate', update)
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

		function toggle() {
			if (player.paused) player.play()
			else player.pause()
		}

		function ended() {
			state.hangtime.time = 0
			emitter.emit('messenger:ended')
			emitter.emit('hangtime:next')
		}

		function update() {
			state.hangtime.time = player.currentTime
		}
	}
}
