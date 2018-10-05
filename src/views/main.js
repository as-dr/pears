// main view

const html = require('nanohtml')
const Playlist = require('../components/playlist')

const playlist = new Playlist()

module.exports = view

function view(state, emit) {
	setInterval(() => {
		playlist.next()
	}, 3000)

	return html`
		<body class="fl w-100 pa5 sans-serif f3 lh-copy">
			<div class="w-100 mw7 center">
				<div class="mb3">4 LISTENERS</div>
				${playlist.render()}
			</div>
		</body>
	`
}
