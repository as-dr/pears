// plugin for handling talking between computers
const send = require('./send')
const MESSAGE_TYPES = require('./types')

module.exports = plugin

function plugin () {
  return function (state, emitter) {
    state.pears.responsesReceived = 0

    emitter.on('messenger:newpeer', newpeer)
    emitter.on('messenger:clearpeer', clearpeer)
    emitter.on('messenger:add', send.add)
    emitter.on('messenger:ended', send.finished)

    // sets up your messaging peer
    async function newpeer (datUrl, color) {
      await experimental.datPeers.setSessionData({
        archive: datUrl,
        color: color
      })
      state.pears.me = await experimental.datPeers.getSessionData()

      experimental.datPeers.addEventListener('message', onmessage)
      experimental.datPeers.addEventListener('connect', updatepeers)
      experimental.datPeers.addEventListener('disconnect', updatepeers)

      await updatepeers() // triggers render
      sendNotifyPeers(true)
    }

    // clear your datPeers session data
    async function clearpeer () {
      await experimental.datPeers.setSessionData(null)
      sendNotifyPeers()
    }

    // received message
    async function onmessage (data) {
      switch (data.message.type) {
        case MESSAGE_TYPES.UPDATEPEERS:
          await updatepeers()
          break
        case MESSAGE_TYPES.NEWPEER:
          if (state.pears.list.length > 0) {
            await send.updateList(data.peer, state.pears.list, state.pears.position, state.pears.time)
          }
          await updatepeers()
          break
        case MESSAGE_TYPES.UPDATELIST:
          await handleUpdateList(data)
          break
        case MESSAGE_TYPES.ADD:
          await handleAdd(data)
          break
        case MESSAGE_TYPES.FINISHED:
          state.pears.finished_peers++
          emitter.emit('pears:next')
          break
      }
    }

    // update the list of peers
    async function updatepeers () {
      var peers = await experimental.datPeers.list()
      state.pears.peers = []
      for (var i = 0; i < peers.length; i++) {
        const peer = await experimental.datPeers.get(peers[i].id)
        if (peer.sessionData && peer.sessionData.archive !== undefined) {
          state.pears.peers.push(peers[i])
        }
      }
      emitter.emit('render')
    }

    async function handleUpdateList (data) {
      state.pears.responsesReceived++
      if (data.message.list.length > state.pears.list.length) {
        state.pears.list = data.message.list
      }
      if (data.message.position > state.pears.position) {
        state.pears.position = data.message.position
      }
      if (data.message.time > state.pears.time) {
        state.pears.time = data.message.time
      }
      // got response from all the peers
      if (state.pears.responsesReceived === state.pears.peers.length) {
        emitter.emit('pears:updateplayer')
        emitter.emit('render')
      }
    }

    async function handleAdd (data) {
      const peer = await experimental.datPeers.get(data.peer.id)
      state.pears.list.push({
        type: 'song',
        text: data.message.value,
        color: peer.sessionData.color
      })
      if (state.pears.position === state.pears.list.length - 1) {
        emitter.emit('pears:updateplayer')
      }
      emitter.emit('render')
    }

    // wrapper for send.notifyPeers
    async function sendNotifyPeers (newpeer) {
      state.pears.responsesReceived = 0
      send.notifyPeers(newpeer)
    }
  }
}
