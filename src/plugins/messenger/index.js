// plugin for handling talking between computers
const send = require('./send')
const MESSAGE_TYPES = require('./types')

module.exports = plugin

function plugin() {
	return function (state, emitter) {
    state.hangtime.responsesReceived = 0

		emitter.on('messenger:newpeer', newpeer)
		emitter.on('messenger:clearpeer', clearpeer)
		emitter.on('messenger:add', send.add)
		emitter.on('messenger:ended', send.finished)

		// sets up your messaging peer
		async function newpeer(dat_url, color) {
			await experimental.datPeers.setSessionData({
	  			archive: dat_url,
	  			color: color
			})
			state.hangtime.me = await experimental.datPeers.getSessionData()

			experimental.datPeers.addEventListener('message', onmessage)
			experimental.datPeers.addEventListener('connect', updatepeers)
			experimental.datPeers.addEventListener('disconnect', updatepeers)

			await updatepeers() // triggers render
			sendNotifyPeers(true)
		}

		// clear your datPeers session data
		async function clearpeer() {
			await experimental.datPeers.setSessionData(null)
			sendNotifyPeers()
		}

		// received message
		async function onmessage(data) {
			switch (data.message.type) {
			case MESSAGE_TYPES.UPDATEPEERS:
				await updatepeers()
				break;
			case MESSAGE_TYPES.NEWPEER:
				if (state.hangtime.list.length > 0) {
          await send.updateList(data.peer, state.hangtime.list, state.hangtime.position, state.hangtime.time)
				}
				await updatepeers()
				break;
			case MESSAGE_TYPES.UPDATELIST:
        await handleUpdateList(data)
				break;
			case MESSAGE_TYPES.ADD:
        await handleAdd(data)
				break;
			case MESSAGE_TYPES.FINISHED:
				state.hangtime.finished_peers++
				emitter.emit('hangtime:next')
				break;
			}
		}

		// update the list of peers
		async function updatepeers() {
			var peers = await experimental.datPeers.list()
			state.hangtime.peers = []
			for (var i = 0; i < peers.length; i++) {
				const peer = await experimental.datPeers.get(peers[i].id)
				if (peer.sessionData && peer.sessionData.archive != undefined) {
          state.hangtime.peers.push(peers[i])
        }
			}
			emitter.emit('render')
		}

    async function handleUpdateList(data) {
      state.hangtime.responsesReceived++
      if (data.message.list.length > state.hangtime.list.length) {
        state.hangtime.list = data.message.list
      }
      if (data.message.position > state.hangtime.position) {
        state.hangtime.position = data.message.position
      }
      if (data.message.time > state.hangtime.time) {
        state.hangtime.time = data.message.time
      }
      // got response from all the peers
      if (state.hangtime.responsesReceived == state.hangtime.peers.length) {
        emitter.emit('hangtime:updateplayer')
        emitter.emit('render')
      }
    }

    async function handleAdd(data) {
      const peer = await experimental.datPeers.get(data.peer.id)
      state.hangtime.list.push({
        type: "song",
        text: data.message.value,
        color: peer.sessionData.color
      })
      if (state.hangtime.position == state.hangtime.list.length - 1) {
        emitter.emit('hangtime:updateplayer')
      }
      emitter.emit('render')
    }
    
    // wrapper for send.notifyPeers
    async function sendNotifyPeers(newpeer) {
      state.hangtime.responsesReceived = 0
      send.notifyPeers(newpeer)
    }
	}
}
