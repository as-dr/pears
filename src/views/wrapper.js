module.exports = function(state, emit) {
	// check if it's dat:// or not
	if (!state.p2p) return require('./http')(state, emit)
	// check if it was set up
	if (state.setup) return require('./welcome')(state, emit)
	// else render main view
	return require('./main')(state, emit)
}
