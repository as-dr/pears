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

// TO DO
// 1. Set a conditional styling for the NEXT button per my lame attempt on line 62. We should also add a link disabled property

	function step1() {
		return html`
			<body class="flex self-center w-100 min-vh-100 f3 lh-copy pa5-ns pa3">
				<div class="flex flex-column w-100 h-100 mw8 justify-between">

					<div class="flex flex-row w-100" style="justify-content: space-between;">
					<a href="#" class="flex self-start color-inherit" onclick="${back}">BACK</a>
					<h3 class="flex self-end dib mv0">STEP 1</h3>
					</div>

					<div class="flex w-100 justify-center align-center">
						<p>First, select a folder on your computer to stream from.</p>
					</div>
					<div class="flex flex-row w-100 justify-between items-center align-center">
						${as.render(emit)}
						<a href="#" class="link flex color-inherit ph3 pv2 ba ttu uppercase ${as.archive != null ? 'o-100' : 'o-10 disabled-link'}" onclick="${next}">Next</a>
					</div>
				</div>
			</body>
		`
	}



	function step2() {
		return html`
		<body class="flex self-center w-100 min-vh-100 f3 lh-copy pa5-ns pa3">
			<div class="flex flex-column w-100 h-100 mw8 justify-between">

				<div class="flex flex-row w-100" style="justify-content: space-between;">
				<a href="#" class="flex self-start color-inherit" onclick="${back}">BACK</a>
				<h3 class="flex self-end dib mv0">STEP 2</h3>
				</div>

				<div class="flex flex-column w-100 items-center align-center">
					<input id="avatar_selector" class="flex mv3 bn" style="outline:0;" type="color" value="#2659ff">
					<p>This is your avatar.</p><p> Click to give it a color, then hit 'Finish'.</p>
				</div>
				<div class="flex flex-row w-100 justify-between items-center align-center">
					${as.render(emit)}
					<a href="#" class="link flex color-inherit ph3 pv2 ba ttu uppercase ${as.archive != null ? 'o-100' : 'o-10 disabled-link'}" onclick="${finish}">Finish</a>
				</div>
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
