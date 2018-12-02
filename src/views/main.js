// main view

const html = require('nanohtml')
const Playlist = require('../components/playlist')
const FileUpload = require('../components/fileupload')

const playlist = new Playlist()
const fileupload = new FileUpload()

module.exports = view

function view(state, emit) {
	return html`
		<body class="flex flex-column w-100 pa5 f3 lh-copy items-center" ondragover="${showUploader}">
			<div class="flex flex-row w-100 mw7 justify-between">
				<a href="#" class="link flex ph3 pv1 ba color-inherit" onclick="${back}">EXIT</a>
				<div class="flex items-center">${state.hangtime.peers.length + 1} LISTENER${state.hangtime.peers.length != 0 ? 'S' : ''}</div>
        <a href="#" class="link ba ph3 pv1 color-inherit" onclick="${toggleMute}">${state.hangtime.muted ? 'UNMUTE' : 'MUTE'}</a>
        <a href="#" class="link ba ph3 pv1 color-inherit" onclick="${showUploader}">ADD SONG</a>
			</div>
			<div class="flex flex-column w-100 mw7 mt5">
				${playlist.render(state.hangtime.list, state.hangtime.position)}
			</div>
			${fileupload.render(emit)}
		</body>
	`

	function back(e) {
		e.preventDefault()
    emit('setup:delete')
	}

	function showUploader(e) {
		e.preventDefault()
    if (!fileupload.visible) {
      fileupload.toggle(true)
    }
	}

  function toggleMute(e) {
    e.preventDefault()
    emit('player:mute')
  }
}
