// core plugin

module.exports = plugin

function plugin () {
  return function (state, emitter) {
    state.loaded = false

    var archive = null
    var space = null

    // check if data exists in localstorage
    var localArchive = localStorage.getItem('localarchive')

    state.setup = !localArchive
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

    state.pears = {
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
    emitter.on('pears:loaded', loaded)
    emitter.on('pears:add', add)
    emitter.on('pears:file', writeFile)
    emitter.on('pears:next', next)
    emitter.on('pears:updateplayer', updatePlayer)

    async function loaded (datUrl) {
      state.loaded = true

      localArchive = localArchive || datUrl
      if (state.p2p) {
        state.pears.space = await space.getInfo()
        if (!state.setup) {
          archive = new DatArchive(localArchive)

          const color = localStorage.getItem('avatar') || 'salmon'
          state.pears.me.color = color

          emitter.emit('messenger:newpeer', localArchive, color)
        } else {
          emitter.emit('messenger:clearpeer')
        }
      }
      emitter.emit('render')
    }

    async function add (value) {
      state.pears.list.push({
        type: 'song',
        text: value,
        color: state.pears.me.color
      })
      emitter.emit('messenger:add', value)
      emitter.emit('render')
      // update the player if the new one is the next song
      if (state.pears.position === (state.pears.list.length - 1) || state.pears.list[state.pears.position].type !== 'song') {
        emitter.emit('pears:updateplayer')
      } else {
        tryPreload()
      }
    }

    function next () {
      // check if all peers have finished
      if (!state.pears.playing && state.pears.finished_peers >= state.pears.peers.length) {
        // check playlist bounds
        if (state.pears.position <= state.pears.list.length - 1) {
          state.pears.position++
          state.pears.finished_peers = 0
          // update player
          emitter.emit('pears:updateplayer')
          // delete the previous song from your archive
          var prevFile = state.pears.list[state.pears.position - 1].text
          if (prevFile.indexOf(archive.url) !== -1 && !inList(prevFile)) {
            prevFile = prevFile.replace(archive.url, '')
            unlink(prevFile)
          }
        }
      }
      emitter.emit('render')
    }

    function updatePlayer () {
      if (state.pears.list[state.pears.position] && state.pears.list[state.pears.position].type === 'song') {
        emitter.emit(state.events.PLAYER_SET, state.pears.list[state.pears.position].text)
        // preload if possible
        tryPreload()
      } else {
        emitter.emit('pears:next')
      }
    }

    function tryPreload () {
      if (state.pears.list[state.pears.position + 1] && state.pears.list[state.pears.position + 1].type === 'song') {
        emitter.emit(state.events.PLAYER_PRELOAD, state.pears.list[state.pears.position + 1].text)
      }
    }

    // fs
    async function writeFile (file) {
      await archive.writeFile(file.name, file.data)
      emitter.emit('pears:add', archive.url + '/' + file.name)
    }

    function unlink (filename) {
      archive.unlink(filename)
    }

    function inList (file) {
      // the position is already incremented here
      for (var i = state.pears.position; i < state.pears.list.length; i++) {
        if (state.pears.list[i].text === file) return true
      }
      return false
    }
  }
}
