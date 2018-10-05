const renderHttp = require('./http')
const renderMain = require('./main')
const renderWelcome = require('./welcome')

module.exports = function(state, emit) {
	// check if it's dat:// or not
	if (!state.p2p) return renderHttp()
	// check if it was set up
	if (state.setup) return renderWelcome()
	// else render main view
	return renderMain()
}
