// main view

const html = require('nanohtml')
const Playlist = require('../components/playlist')
const FileUpload = require('../components/fileupload')

const playlist = new Playlist()
const fileupload = new FileUpload()

module.exports = view

function view(state, emit) {
	return html`
		<body class="flex flex-row w-100 pv4 ph3 f3 lh-copy items-center" ondragover="${showUploader}">
			<div class="flex flex-column w-100 mw5 items-center justify-center">
				<a href="#" class="link flex ph3 pv1 color-inherit" onclick="${back}">Leave</a>
			</div>
			<div class="flex flex-column justify-start items-start w-100 h-100">
				<div class="flex flex-column items-start mv5">
				${state.hangtime.peers.length + 1} LISTENER${state.hangtime.peers.length != 0 ? 'S' : ''}
				<a href="#" class="link f3 deep-purple mv2  br1">+ Invite Friends</a>
				</div>
				<ul class="list flex flex-row w-100 pl0 f4 mv3">

				<li class="ml0 mr4">
				<a href="#" class="link mini-links deep-purple  bb pb1 bw1" onclick="${toggleMute}">${state.hangtime.muted ? 'Unmute' : 'Mute'}</a>
				</li>

				<li class="mr4">
				<a href="#" class="link mini-links deep-purple bb pb1 bw1" onclick="${toggleMute}">Skip</a>
				</li>
				</ul>
			<div class="flex flex-column w-100 mw7 mt5">
			<a href="#" class="link f3 deep-purple" onclick="${openFileDialog}">+ Add Song</a>
				${playlist.render(state.hangtime.list, state.hangtime.position)}
			</div>
		</div>
			${fileupload.render()}
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

  function openFileDialog (e) {
    fileupload.openDialog()
  }

  function toggleMute(e) {
    e.preventDefault()
    emit('player:mute')
  }
}
