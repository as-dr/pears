// core plugin

module.exports = plugin

function plugin() {
	return function (state, emitter) {
		var archive = null

		// check if data exists in localstorage
		var local_archive = localStorage.getItem('local_archive')

		state.setup = !local_archive
    if (isDat()) {
      // check if datPeers is available
      if (window.experimental && window.experimental.datPeers) {
        state.p2p = true;
      }
    } else {
      state.p2p = false
    }

    window.testf = function (text) {
      state.hangtime.list.push({
        type: 'message',
        text: text,
        color: 'green'
      })
      emitter.emit('render')
    }

		state.hangtime = {
			peers: [],
			me: null,
			list: [],
			position: 0,
			time: 0,
			finished_peers: 0,
      responsesReceived: 0,
      muted: false
		}

		emitter.on(state.events.DOMCONTENTLOADED, loaded)
		emitter.on('hangtime:loaded', loaded)
		emitter.on('hangtime:add', add)
		emitter.on('hangtime:file', writeFile)
		emitter.on('hangtime:next', next)
		emitter.on('hangtime:updateplayer', update_player)

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
      // update the player if the new one is the next song
			if (state.hangtime.position == (state.hangtime.list.length - 1) || state.hangtime.list[state.hangtime.position].type !== 'song') {
				emitter.emit('hangtime:updateplayer')
			} else {
				try_preload()
			}
		}

		function next() {
      // if it's not the end of the list
			if (state.hangtime.finished_peers >= state.hangtime.peers.length - 1) {
				state.hangtime.position++
				state.hangtime.finished_peers = 0
        // update player
				if (state.hangtime.position <= state.hangtime.list.length - 1) {
					emitter.emit('hangtime:updateplayer')
				}
				emitter.emit('render')
        // delete the previous song from your archive
        var prevFile = state.hangtime.list[state.hangtime.position - 1].text
        if (prevFile.indexOf(archive.url) !== -1) {
          prevFile = prevFile.replace(archive.url, '')
          unlink(prevFile)
        }
			}
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

    function isDat() {
      // check if datarchive exists
      if (typeof DatArchive !== 'undefined') {
        // check if url is dat
        try {
          new DatArchive(window.location.href)
          return true
        } catch (e) {
          return false
        }
      }

      return false
    }
	}
}
