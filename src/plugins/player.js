// sound player

module.exports = plugin

function plugin () {
  const player = new Audio()
  const preloader = new Audio()
  return function (state, emitter) {
    state.events.PLAYER_SET = 'player:set'
    state.events.PLAYER_PLAY = 'player:play'
    state.events.PLAYER_MUTE = 'player:mute'
    state.events.PLAYER_PRELOAD = 'player:preload'

    emitter.on(state.events.PLAYER_SET, setsource)
    emitter.on(state.events.PLAYER_PLAY, togglePaused)
    emitter.on(state.events.PLAYER_MUTE, toggleMute)
    emitter.on(state.events.PLAYER_PRELOAD, preload)

    player.autoplay = true
    player.preload = 'auto'
    player.addEventListener('ended', onended)
    player.addEventListener('timeupdate', onupdate)
    player.addEventListener('error', onerror)
    preloader.autoplay = false
    preloader.preload = 'auto'
    preloader.volume = 0

    function setsource (src) {
      player.src = src
      if (state.pears.time > 0) {
        player.currentTime = state.pears.time
      }
    }

    function preload (src) {
      preloader.src = src
      preloader.load()
    }

    function togglePaused () {
      if (player.paused) player.play()
      else player.pause()
    }

    function toggleMute () {
      if (player.volume === 0) {
        player.volume = 1
        state.pears.muted = false
      } else {
        player.volume = 0
        state.pears.muted = true
      }
      emitter.emit('render')
    }

    // todo
    function onerror (e) {
      console.log(e)
      // on error we notify other peers to maybe skip the song
      onended()
    }

    function onended () {
      state.pears.playing = false
      state.pears.time = 0
      emitter.emit('messenger:ended')
      emitter.emit('pears:next')
    }

    function onupdate () {
      if (!state.pears.playing) {
        state.pears.playing = true
        emitter.emit('render')
      }
      state.pears.time = player.currentTime
    }
  }
}
