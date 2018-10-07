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
			me: null,
			list: []
		}

		emitter.on(state.events.DOMCONTENTLOADED, loaded)
		emitter.on('hangtime:loaded', loaded)
		emitter.on('hangtime:add', add)
		emitter.on('hangtime:file', write_file)

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

		async function add(value) {
			state.hangtime.list.push({
				type: "song",
				text: value,
				color: state.hangtime.me.color
			})
			emitter.emit('messenger:add', value)
			emitter.emit('render')
		}

		async function write_file(file) {
			await archive.writeFile(file.name, file.data)
			emitter.emit('hangtime:add', archive.url + '/' + file.name)
		}
	}
}
