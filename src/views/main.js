// main view

const html = require('nanohtml')
const Playlist = require('../components/playlist')
const FileUpload = require('../components/fileupload')

const playlist = new Playlist()
const fileupload = new FileUpload()

module.exports = view

function view(state, emit) {
	return html`
		<body class="w-100 pa5 sans-serif f3 lh-copy">
			<div class="flex flex-row w-100 mw7 justify-between">
				<div class="">${state.hangtime.peers.length + 1} LISTENER${state.hangtime.peers.length != 0 ? 'S' : ''}</div>
				<a href="#" class="link ph3 pv1 color-inherit" onclick="${show_uploader}">ADD SONG</a>
			</div>
			<div class="flex flex-column w-100 mw7">
				${playlist.render(state.hangtime.list, state.hangtime.position)}
			</div>
			${fileupload.render(emit)}
		</body>
	`

	function show_uploader(e) {
		e.preventDefault()
		fileupload.toggle()
	}
}
