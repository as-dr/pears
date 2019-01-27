var html = require('choo/html')

module.exports = function (state, emit) {
  // check if it was loaded
  if (!state.loaded) return loading()
  // check if it's dat:// or not
  if (!state.p2p) return require('./http')(state, emit)
  // check if it was set up
  if (state.setup) return require('./welcome')(state, emit)
  // else render main view
  return require('./main')(state, emit)

  function loading () {
    return html`
      <body class="pa4">
        <h2 class="f4 gray mv3">LOADING</h2>
      </body>
    `
  }
}
