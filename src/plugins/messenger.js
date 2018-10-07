// plugin for handling talking between computer

module.exports = plugin

const MESSAGE_TYPES = {
	UPDATEPEERS: 'updatepeers',
	NEWPEER: 'newpeer',
	UPDATELIST: 'updatelist',
	ADD: 'add'
}

function plugin() {
	return function (state, emitter) {
		var res_received = 0

		emitter.on('messenger:newpeer', newpeer)
		emitter.on('messenger:clearpeer', clearpeer)
		emitter.on('messenger:add', add)

		// sets up new messaging peer
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

			notify_peers(true)
		}

		// clear datPeers session data
		async function clearpeer() {
			await experimental.datPeers.setSessionData(null)
			notify_peers()
		}

		// add to list
		async function add(value) {
			await experimental.datPeers.broadcast({
				type: MESSAGE_TYPES.ADD,
				value: value
			})
		}

		// notify all peers that something's changed with someone's data
		async function notify_peers(newpeer) {
			res_received = 0
			await experimental.datPeers.broadcast({
				type: newpeer === true ? MESSAGE_TYPES.NEWPEER : MESSAGE_TYPES.UPDATEPEERS
			})
		}

		// received message
		async function onmessage(data) {
			switch (data.message.type) {
			case MESSAGE_TYPES.UPDATEPEERS:
				await updatepeers()
				break;
			case MESSAGE_TYPES.NEWPEER:
				if (state.hangtime.list.length > 0) {
					await data.peer.send({
						type: MESSAGE_TYPES.UPDATELIST,
						list: state.hangtime.list,
						position: state.hangtime.position,
						time: state.hangtime.time
					})
				}
				await updatepeers()
				break;
			case MESSAGE_TYPES.UPDATELIST:
				res_received++
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
				if (res_received == state.hangtime.peers.length) {
					emitter.emit('hangtime:updateplayer')
					emitter.emit('render')
				}
				break;
			case MESSAGE_TYPES.ADD:
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
				break;
			}
		}

		// update the list of peers
		async function updatepeers() {
			var peers = await experimental.datPeers.list()
			state.hangtime.peers = []
			for (var i = 0; i < peers.length; i++) {
				const peer = await experimental.datPeers.get(peers[i].id)
				if (peer.sessionData && peer.sessionData.archive != undefined) state.hangtime.peers.push(peers[i])
			}
			emitter.emit('render')
		}
	}
}
