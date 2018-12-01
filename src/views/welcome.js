// welcome view

const html = require('nanohtml')
const ArchiveSelection = require('../components/archiveselection')

const as = new ArchiveSelection()

module.exports = view

function view(state, emit) {
	const steps = [step0, step1, step2]

	return steps[state.setup_step]()

	function step0() {
		return html`
			<body class="w-100 min-vh-100 pa4 lh-copy">
				<div class="flex flex-column items-center justify-around w-100 min-vh-100">
				<div class="flex flex-column items-center justify-between w-100 mw7 ">
				  <h2 class="f2 ttu uppercase dark-gray mv0">Soundscape</h2>
					<h2 class="f2 gray mv0 tc">A chill space to share and listen to music with your friends.</h2>
				</div>
				<div class="flex items-center justify-between w-100 mw7 ">
					<a href="#" class="flex f2 color-inherit link bb bw1" onclick="${fork}">CREATE YOUR SPACE</a>
					<a href="#" class="flex f2 color-inherit link bb bw1" onclick="${next}">JOIN A SPACE</a>

				</div>

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
	}

	function step1() {
		return html`
			<body class="fl w-100 pa5 sans-serif f3 lh-copy">
				<div class="fl w-100 mb6">
					<a href="#" class="fl color-inherit" onclick="${back}">BACK</a>
					<div class="fr dib">STEP 1</div>
				</div>
				<div class="fl w-100 mb6">
					<div class="fl dib">First, select a folder on your computer to stream from.</div>
				</div>
				<div class="fl w-100 mb6">
					${as.render(emit)}
					<a href="#" class="fr color-inherit" onclick="${next}">${as.archive != null ? 'NEXT' : ''}</a>
				</div>
			</body>
		`
	}

	function step2() {
		return html`
			<body class="fl w-100 pa5 sans-serif f3 lh-copy">
				<div class="fl w-100 mb6">
					<a href="#" class="fl color-inherit" onclick="${back}">BACK</a>
					<div class="fr dib">STEP 2</div>
				</div>
				<div class="fl w-100 mb6">
					<div class="fl dib">This is your avatar. Give it a color and hit FINISH.</div>
					<input id="avatar_selector" class="fr dib" type="color">
				</div>
				<div class="fl w-100 mb6">
					<a href="#" class="fr color-inherit" onclick="${finish}">FINISH</a>
				</div>
			</body>
		`

		function finish(e) {
			e.preventDefault()
			emit('setup:finish', as.archive, document.getElementById('avatar_selector').value)
		}
	}

	function next(e) {
		e.preventDefault()
		emit('setup:nextstep')
	}

	function back(e) {
		e.preventDefault()
		emit('setup:prevstep')
	}
}
