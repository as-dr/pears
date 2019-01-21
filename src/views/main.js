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
			<div class="flex flex-column justify-start items-start w-100 min-vh-100 mw7">
        <div class="flex flex-row w-100 mw7 mt4 mb5">
          ${state.hangtime.space.title}
          <a href="#" class="flex link link-mini bb bw1 pb1 gray ml3" onclick="${back}">Leave</a>
        </div>
				<div class="flex flex-column w-100 h-100 items-start self-center">
				  ${state.hangtime.peers.length + 1} Listener ${state.hangtime.peers.length != 0 ? 'S' : ''}
			    ${inviteButton.render()}

  				<ul class="list flex flex-row w-100 pl0 f3 mv5">
  				  <li class="ml0 mr4">
  				    <a href="#" class="link link-mini deep-purple bb pb1 bw1" onclick="${toggleMute}">${state.hangtime.muted ? 'Unmute' : 'Mute'}</a>
  				  </li>
  				</ul>
          <a href="#"class="link link-mini w-auto bb bw1 f3 deep-purple mw5 mv2" onclick="${openFileDialog}">Add Song</a>
			    <div class="flex flex-column w-100 h-auto mw7 pb4 self-center justify-center">
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
