// plugin handling the setup process

module.exports = plugin

function plugin (state, emitter) {
  state.events.SETUP_NEXT = 'setup:nextstep'
  state.events.SETUP_PREV = 'setup:prevstep'
  state.events.SETUP_FINISH = 'setup:finish'
  state.events.SETUP_DELETE = 'setup:delete'

  state.setup_step = 0

  emitter.on(state.events.SETUP_NEXT, function () {
    state.setup_step++
    emitter.emit('render')
  })
  emitter.on(state.events.SETUP_PREV, function () {
    if (state.setup_step > 0) {
      state.setup_step--
      emitter.emit('render')
    }
  })
  emitter.on(state.events.SETUP_FINISH, function (archive, color) {
    localStorage.setItem('localarchive', archive.url)
    localStorage.setItem('avatar', color)
    state.setup = false
    emitter.emit('hangtime:loaded', archive.url)
  })
  emitter.on(state.events.SETUP_DELETE, function () {
    emitter.emit(state.events.PLAYER_PLAY)
    localStorage.removeItem('localarchive')
    localStorage.removeItem('avatar')
    state.setup_step = 0
    state.setup = true
    emitter.emit('render')
  })
}
