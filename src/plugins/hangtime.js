// core plugin

module.exports = plugin

function plugin() {
	return function (state, emitter) {
		// check if data exists in localstorage
		const local_archive = localStorage.getItem('local_archive')

		state.setup = !local_archive
		try {
			new DatArchive(window.location.href)
			state.p2p = true;
		} catch (e) {
			state.p2p = false;
		}

		emitter.on(state.events.DOMCONTENTLOADED, loaded)

		function loaded() {
			emitter.emit('render')
		}
	}
}
