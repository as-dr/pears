// main view

const html = require('nanohtml')
const Playlist = require('../components/playlist')
const FileUpload = require('../components/fileupload')
const Invite = require('../components/invite')

const playlist = new Playlist()
const fileupload = new FileUpload()
const inviteButton = new Invite()

module.exports = view

function view(state, emit) {
  var waiting = !state.hangtime.playing && (state.hangtime.position < state.hangtime.list.length - 1)
	return html`
		<body class="flex flex-row w-100 ph3 f3 lh-copy items-center justify-center" ondragover="${showUploader}">
			<div class="flex flex-column justify-between items-start w-100 h-100 mw7">
			  <a href="#" class="link flex pv4 gray" onclick="${back}">Leave</a>

				<div class="flex flex-column h-100 items-start self-start">
				  ${state.hangtime.peers.length + 1} LISTENER${state.hangtime.peers.length != 0 ? 'S' : ''}
			    ${inviteButton.render()}

  				<ul class="list flex flex-row w-100 pl0 f4 mv4">
  				  <li class="ml0 mr4">
  				    <a href="#" class="link mini-links deep-purple  bb pb1 bw1" onclick="${toggleMute}">${state.hangtime.muted ? 'Unmute' : 'Mute'}</a>
  				  </li>
  				</ul>
			    <div class="flex flex-column w-100 h-auto mw7">
			      <a href="#" class="link f3 deep-purple" onclick="${openFileDialog}">+ Add Song</a>
				    ${playlist.render(state.hangtime.list, state.hangtime.position, waiting)}
			    </div>
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
