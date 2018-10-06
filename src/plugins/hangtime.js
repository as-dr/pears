// core plugin

module.exports = plugin

function plugin() {
	return function (state, emitter) {
		var archive = null

		// check if data exists in localstorage
		var local_archive = localStorage.getItem('local_archive')

		state.setup = !local_archive
		try {
			new DatArchive(window.location.href)
			// check if datPeers is available
			if (window.experimental && window.experimental.datPeers) {
				state.p2p = true;
			}
		} catch (e) {
			state.p2p = false;
		}

		state.hangtime = {
			peers: [],
			me: null
		}

		emitter.on(state.events.DOMCONTENTLOADED, loaded)
		emitter.on('hangtime:loaded', loaded)

		function loaded(dat_url) {
			local_archive = local_archive || dat_url
			if (state.p2p && !state.setup) {
				archive = new DatArchive(local_archive)
				const color = localStorage.getItem('avatar') || 'salmon'
				emitter.emit('messenger:newpeer', local_archive, color)
			} else if (state.p2p) {
				emitter.emit('messenger:clearpeer')
			}
		}
	}
}
