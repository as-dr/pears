// plugin for handling talking between computer

module.exports = plugin

function plugin() {
	// check if the datPeers API is available
	if (!window.experimental || !window.experimental.datPeers) {
		console.error('Please update Beaker to a newer version.')
		return null
	}

	return function (state, emitter) {

		// todo this whole thing

		emitter.on(state.events.DOMCONTENTLOADED, loaded)
		emitter.on('messenger:broadcast', broadcast)

		experimental.datPeers.addEventListener('message', function (peer, message) {
  			console.log(peer.id, 'has sent the following message:', message)
		})

		async function loaded() {
			await experimental.datPeers.setSessionData({
	  			name: 'Bob',
	  			url: 'dat://bob.com'
			})

			var peers = await experimental.datPeers.list()
			emitter.emit('messenger:broadcast', 'heys')
		}

		// message to everyone
		async function broadcast(msg) {
			// todo: setup message
			await experimental.datPeers.broadcast({msg: msg})
		}

		async function message({peer, message}) {
			console.log(peer.id + ' : ' + message)
		}
	}
}
