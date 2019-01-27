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
      <body class="relative">
        <section class="dn fixed w-100 h-100 flex overflow-hidden">
          <div class="flex flex-column items-center justify-center  w-100 h-100 vertical-scroll f1 deep-purple">
            <h2 class="font-halibut mv3">LOADING</h2>
            <h2 class="font-halibut mv3">LOADING</h2>
            <h2 class="font-halibut mv3">LOADING</h2>
            <h2 class="font-halibut mv3">LOADING</h2>
            <h2 class="font-halibut mv3">LOADING</h2>
            <h2 class="font-halibut mv3">LOADING</h2>
            <h2 class="font-halibut mv3">LOADING</h2>
            <h2 class="font-halibut mv3">LOADING</h2>
            <h2 class="font-halibut mv3">LOADING</h2>
            <h2 class="font-halibut mv3">LOADING</h2>
            <h2 class="font-halibut mv3">LOADING</h2>
            <h2 class="font-halibut mv3">LOADING</h2>
            <h2 class="font-halibut mv3">LOADING</h2>
            <h2 class="font-halibut mv3">LOADING</h2>
            <h2 class="font-halibut mv3">LOADING</h2>
            <h2 class="font-halibut mv3">LOADING</h2>
            <h2 class="font-halibut mv3">LOADING</h2>
            <h2 class="font-halibut mv3">LOADING</h2>
            <h2 class="font-halibut mv3">LOADING</h2>
            <h2 class="font-halibut mv3">LOADING</h2>
            <h2 class="font-halibut mv3">LOADING</h2>
            <h2 class="font-halibut mv3">LOADING</h2>
            <h2 class="font-halibut mv3">LOADING</h2>
            <h2 class="font-halibut mv3">LOADING</h2>
          </div>
        </section>
      </body>
    `
  }
}
