// core plugin

module.exports = plugin

function plugin() {
	return function (state, emitter) {
		// check if data exists in localstorage
		const local_archive = localStorage.getItem('local_archive')

		state.setup = !local_archive
		state.p2p = (DatArchive !== undefined)

		emitter.on(state.events.DOMCONTENTLOADED, loaded)

		function loaded() {
			emitter.emit('render')
		}
	}
}
