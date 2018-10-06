// main view

const html = require('nanohtml')
const Playlist = require('../components/playlist')

const playlist = new Playlist()

module.exports = view

function view(state, emit) {
	return html`
		<body class="fl w-100 pa5 sans-serif f3 lh-copy">
			<div class="w-100 mw7 center">
				<div class="mb3">${state.hangtime.peers.length + 1} LISTENERS</div>
				${playlist.render()}
			</div>
			${state.hangtime.list.map(test)}
			<a href="#" onclick="${add_random}">add random number</a>
		</body>
	`

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
