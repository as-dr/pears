// plugin for handling talking between computer

module.exports = plugin

function plugin() {
	return function (state, emitter) {
		emitter.on('messenger:newpeer', newpeer)
		emitter.on('messenger:clearpeer', clearpeer)
		emitter.on('messenger:broadcast', broadcast)

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

			notify_peers()
		}

		// clear datPeers session data
		async function clearpeer() {
			await experimental.datPeers.setSessionData(null)
			notify_peers()
		}

		// message to everyone
		async function broadcast(msg) {
			// todo: encode message
			await experimental.datPeers.broadcast({msg: msg})
		}

		// received message
		async function onmessage(data) {
			switch (data.message.type) {
			case 'peerschanged':
				await updatepeers()
				break;
			default:
				const peer = await experimental.datPeers.get(data.peer.id)
				console.log(peer.sessionData.color + ' : ' + data.message.msg)
				break;
			}
		}

		// notify all peers that something's changed with someone's data
		async function notify_peers() {
			await experimental.datPeers.broadcast({type: 'peerschanged'})
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
