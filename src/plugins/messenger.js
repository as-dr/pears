

module.exports = plugin

function plugin() {
	// check if the datPeers API is available
	if (!window.experimental || !window.experimental.datPeers) {
		console.error('Please update Beaker to a newer version.')
		return null
	}

	return function (state, emitter) {

		emitter.on(state.events.DOMCONTENTLOADED, loaded)
		emitter.on('messenger:broadcast', broadcast)

		experimental.datPeers.addEventListener('message', function (peer, message) {
  			console.log(peer.id, 'has sent the following message:', message)
		})

		async function loaded() {
			var peers = await experimental.datPeers.list()
			console.log(peers)
		}

		// message to everyone
		async function broadcast(msg) {
			// todo: setup message
			await experimental.datPeers.broadcast({msg: msg})
		}
	}
}
