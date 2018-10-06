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

			experimental.datPeers.addEventListener('message', message)

			var peers = await experimental.datPeers.list()
			state.hangtime.peers = []
			for (var i = 0; i < peers.length; i++) {
				const peer = await experimental.datPeers.get(peers[i].id)
				if (peer.sessionData && peer.sessionData.archive != undefined) state.hangtime.peers.push(peers[i])
			}

			emitter.emit('messenger:broadcast', 'hello')
			emitter.emit('render')
		}

		// clear datPeers session data
		async function clearpeer() {
			await experimental.datPeers.setSessionData(null)
		}

		// message to everyone
		async function broadcast(msg) {
			// todo: encode message
			await experimental.datPeers.broadcast({msg: msg})
		}

		async function message(data) {
			// todo: decode message
			const peer = await experimental.datPeers.get(data.peer.id)
			console.log(peer.sessionData.color + ' : ' + data.message.msg)
		}
	}
}
