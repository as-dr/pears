// core plugin

module.exports = plugin

function plugin() {
	return function (state, emitter) {
    state.loaded = false

		var archive = null
    var space = null

		// check if data exists in localstorage
		var local_archive = localStorage.getItem('local_archive')

		state.setup = !local_archive
    try {
      space = new DatArchive(window.location.href)
      // check if datPeers is available
      if (window.experimental && window.experimental.datPeers) {
        state.p2p = true
      } else {
        state.p2p = false
      }
    } catch (e) {
      state.p2p = false
    }

		state.hangtime = {
			peers: [],
			me: {},
			list: [],
      space: null,
			position: 0,
			time: 0,
			finished_peers: 0,
      responsesReceived: 0,
      muted: false,
      playing: false
		}

		emitter.on(state.events.DOMCONTENTLOADED, loaded)
		emitter.on('hangtime:loaded', loaded)
		emitter.on('hangtime:add', add)
		emitter.on('hangtime:file', writeFile)
		emitter.on('hangtime:next', next)
		emitter.on('hangtime:updateplayer', update_player)

		async function loaded(dat_url) {
      state.hangtime.space = await space.getInfo()
      state.loaded = true

			local_archive = local_archive || dat_url
			if (state.p2p && !state.setup) {
				archive = new DatArchive(local_archive)

				const color = localStorage.getItem('avatar') || 'salmon'
        state.hangtime.me.color = color

				emitter.emit('messenger:newpeer', local_archive, color)
			} else if (state.p2p) {
				emitter.emit('messenger:clearpeer')
			}
      emitter.emit('render')
		}

		async function add(value) {
			state.hangtime.list.push({
				type: "song",
				text: value,
				color: state.hangtime.me.color
			})
			emitter.emit('messenger:add', value)
			emitter.emit('render')
      // update the player if the new one is the next song
			if (state.hangtime.position == (state.hangtime.list.length - 1) || state.hangtime.list[state.hangtime.position].type !== 'song') {
				emitter.emit('hangtime:updateplayer')
			} else {
				try_preload()
			}
		}

    // next song magic
    window.next = next

		function next() {
      // if it's not the end of the list
			if (state.hangtime.finished_peers >= state.hangtime.peers.length - 1) {
				state.hangtime.position++
				state.hangtime.finished_peers = 0
        // update player
				if (state.hangtime.position <= state.hangtime.list.length - 1) {
					emitter.emit('hangtime:updateplayer')
				}
        // delete the previous song from your archive
        var prevFile = state.hangtime.list[state.hangtime.position - 1].text
        if (prevFile.indexOf(archive.url) !== -1 && !inList(prevFile)) {
          prevFile = prevFile.replace(archive.url, '')
          unlink(prevFile)
        }
			}
      emitter.emit('render')
		}

		function update_player() {
      if (state.hangtime.list[state.hangtime.position].type == 'song') {
        emitter.emit('player:set', state.hangtime.list[state.hangtime.position].text)
        // preload if possible
        try_preload()
      } else {
        emitter.emit('hangtime:next')
      }
		}

		function try_preload() {
			if (state.hangtime.list[state.hangtime.position + 1] && state.hangtime.list[state.hangtime.position + 1].type === 'song') {
				emitter.emit('player:preload', state.hangtime.list[state.hangtime.position + 1].text)
			}
		}

    // fs
    async function writeFile(file) {
			await archive.writeFile(file.name, file.data)
			emitter.emit('hangtime:add', archive.url + '/' + file.name)
		}

    function unlink(filename) {
      archive.unlink(filename)
    }

    function inList(file) {
      for (var i = 0; i < state.hangtime.list.length; i++) {
        if (state.hangtime.list[i].text === file) return true
      }
      return false
    }
	}
}
