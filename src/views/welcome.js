// welcome view

const html = require('nanohtml')

module.exports = view

function view(state, emit) {
	return html`
		<body class="fl w-100 pa5 sans-serif f3 lh-copy">
			<div class="fl w-100 mb6">
				<div>HANGTIME</div>
			</div>
			<div class="fl w-100 mb6">
				<div class="fl dib">Create your own</div>
				<a href="#" class="fr color-inherit" onclick="${fork}">CREATE</a>
			</div>
			<div class="fl w-100 mb6">
				<div class="fl dib">Or join this space</div>
				<a href="#" class="fr color-inherit" onclick="${join}">JOIN</a>
			</div>
		</body>
	`

	async function fork(e) {
		e.preventDefault()
		try {
			var archive = await DatArchive.fork(window.location.href)
			window.location = archive.url
		} catch (e) {
			// do nothing
		}
	}

	function join(e) {
		e.preventDefault()
	}
}
