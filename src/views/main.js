// main view

const html = require('nanohtml')
const Playlist = require('../components/playlist')
const FileUpload = require('../components/fileupload')

const playlist = new Playlist()
const fileupload = new FileUpload()

module.exports = view

function view(state, emit) {
	return html`
		<body class="fl w-100 pa5 sans-serif f3 lh-copy">
			<div class="w-100 mw7 center">
				<div class="mb3">${state.hangtime.peers.length + 1} LISTENERS</div>
				<a href="#" class="mb3 color-inherit" onclick="${show_uploader}">+ ADD SONG</a>
				${playlist.render()}
			</div>
			${fileupload.render(emit)}
			${state.hangtime.list.map(test)}
			<a href="#" onclick="${add_random}">add random number</a>
		</body>
	`

	function show_uploader(e) {
		e.preventDefault()
		fileupload.toggle()
	}

	function test(a) {
		return html`
			<span class="mr2">${a}</span>
		`
	}

	function add_random(e) {
		e.preventDefault()
		emit('hangtime:add', Math.random())
	}
}
