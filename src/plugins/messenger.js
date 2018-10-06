// plugin for handling talking between computer

module.exports = plugin

function plugin() {
	return function (state, emitter) {
		if (state.p2p && (!window.experimental || !window.experimental.datPeers)) {
			console.error('Please update Beaker to a newer version.')
			return
		}

		emitter.on('messenger:newpeer', newpeer)
		emitter.on('messenger:broadcast', broadcast)

		// sets up new messaging peer
		async function newpeer(dat_url, color) {
			await experimental.datPeers.setSessionData({
	  			archive: dat_url,
	  			color: color
			})

			experimental.datPeers.addEventListener('message', message)

			state.hangtime.peers = await experimental.datPeers.list()

			emitter.emit('messenger:broadcast', 'hello')
			emitter.emit('render')
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
