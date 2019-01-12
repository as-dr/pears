// welcome view

const html = require('nanohtml')
const ArchiveSelection = require('../components/archiveselection')
const HelpSection = require('../components/help')

const as = new ArchiveSelection()
const help = new HelpSection()

module.exports = view

function view(state, emit) {
	const steps = [step0, step1, step2]

	return steps[state.setup_step]()

	function step0() {
		return html`
			<body class="w-100 min-vh-100 pa4 lh-copy">
				<div class="flex flex-column items-center justify-around w-100 min-vh-100">
					<div class="flex flex-column items-start justify-between w-100 mw7 tl ">
					  <h2 class="f3 ttu uppercase dark-gray mv0">Listen to music with far away friends.</h2>
						<h2 class="f3 dark-gray mv0"></h2>
						<h2 class="f4 gray mv3">Soundscape is a temporary, collaborative playlist.</h2>
					</div>
					<div class="flex flex-column items-start justify-center w-100 mw7 ">
						<a href="#" class="link-main flex f3 deep-purple link mv3 " onclick="${fork}">
						<span class="flex ico-link mr3 f5 self-center">➤</span> Create your space.
						</a>
						<a href="#" class="link-main flex f3 deep-purple link mv3" onclick="${next}">
						<span class="flex ico-link mr3 f5 self-center">➤</span> Join a friend's space.
						</a>
					</div>
				</div>
				<div class="flex flex-column items-center justify-around w-100 min-vh-100">
				  ${help.render()}
					<div class="flex flex-column items-center justify-around w-100 min-vh-100">
					<div class="flex flex-column items-start justify-between w-100 mw7 tl ">
					<h2 class="f3 ttu uppercase dark-gray mv0">CREDITS</h2>
						<ul class="list pl0 dark-gray">
							<ul class="list pl0 mv4">
							<li class="f3 deep-purple">Code</li>
							<li class="f4"><a class="link dark-gray" href="https://hex22.org/" target="_blank">Hunor Karamán <span class="deep-purple">↗</span> </a></li>
							</ul>
							<ul class="list pl0 mv4">
							<li class="f3 deep-purple">Design</li>
							<li class="f4"><a class="link dark-gray" href="https://www.alexsingh.com" target="_blank">Alex Singh<span class="deep-purple">↗</span> </a></li>
							</ul>
							<ul class="list pl0 mv4">
							<li class="f3 deep-purple">Type</li>
								<li class="f4">
									<a class="link dark-gray" href="https://rsms.me/inter/" target="_blank">Inter UI <span class="deep-purple">↗</span> </a>
								</li>
							</ul>
						</ul>
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
				<div class="flex flex-row w-100 h-100 mw8 justify-between">

					<div class="flex flex-column items-center w-100 mw5 justify-center">
					<a href="#" class="link flex self-start color-inherit" onclick="${back}">BACK</a>
					</div>

					<div class="flex flex-column w-100 justify-center align-center">
						<p class="mv0 deep-purple">1.</p>
						<p class="mv0 deep-purple">SELECT A FOLDER</p>
						<div class="flex flex-row w-100">
						<p>	${as.render(emit)} on your computer to stream to and from.</p>
						</div>

						<a href="#" class="link flex mw4 justify-center deep-purple f3 ph2 pv1 ba ttu uppercase ${as.archive != null ? 'o-100' : 'o-10 link-disabled'}" onclick="${next}">Next</a>
					</div>
				</div>
			</body>
		`
	}



	function step2() {
		return html`
		<body class="flex self-center w-100 min-vh-100 f3 lh-copy pa5-ns pa3">
			<div class="flex flex-row w-100 h-100 mw8 justify-between">

			<div class="flex flex-column items-center w-100 mw5 justify-center">
			<a href="#" class="link flex self-start color-inherit" onclick="${back}">BACK</a>
			</div>

				<div class="flex flex-column w-100 justify-center align-center">

					<p class="mv0 deep-purple">2.</p>
					<div class="flex flex-row w-100 items-center">
					<p class="mv0 deep-purple">SELECT AN AVATAR <span class="f2">↝</span></p>
					<input id="avatar_selector" class="flex ml3 bn" style="outline:0;" type="color" value="#2659ff">
					</div>
					<p>Your avatar is a color that appears next to your song selections.</p>
					${as.render(emit)}
					<a href="#" class="link flex deep-purple ttu uppercase ${as.archive != null ? 'o-100' : 'o-10 link-disabled'}" onclick="${finish}">Finish</a>
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
