// plugin handling the setup process

module.exports = plugin

function plugin(state, emitter) {
	state.setup_step = 0
	emitter.on('setup:nextstep', function() {
		state.setup_step++
		emitter.emit('render')
	})
	emitter.on('setup:prevstep', function() {
		if (state.setup_step > 0) {
			state.setup_step--
			emitter.emit('render')
		}
	})
	emitter.on('setup:finish', function(archive, color) {
		localStorage.setItem('local_archive', archive.url)
		localStorage.setItem('avatar', color)
		state.setup = false
		emitter.emit('render')
	})
}
