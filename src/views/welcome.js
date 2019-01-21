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
				${state.hangtime.space.isOwner ? mainSectionOwners() : mainSectionPeers()}
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

    function mainSectionPeers() {
      return html`
			<div class="flex flex-column items-center justify-around w-100 min-vh-100">
				<div class="flex flex-column items-start justify-between w-100 tl mw7">
					<h2 class="f3 ttu uppercase deep-purple mv0">Listen to music with far away friends.</h2>
					<h2 class="f3 dark-gray mv0"></h2>
					<h2 class="f4 gray mv3"><span class="pv1 ph2 bg-light-green deep-purple br2">Pears 🍐</span> is a temporary, collaborative peer-to-peer playlist.</h2>
				</div>
				<div class="flex flex-column items-start w-100 mw7">
					<div class="br2 ph3 bg-washed-purple">
						<h2 class="f3 deep-purple mv0 pv1 lh-copy">This is a friends space called ${state.hangtime.space.title}</h2>
					</div>
						<h2 class="f3 gray mv3 lh-copy mw6">You're two short steps away from joining.</h2>
						<a href="#" class="link-main hover-button flex f3 deep-purple link mv3 ba ph3 pv1 br1" onclick="${next}">
							 Join this space <span class="flex ico-link ml3 f5 self-center">▶</span>
						</a>
				</div>
				<div class="flex flex-column w-100 mw7">
				<div class="flex flex-row items-center justify-start w-100 mw7 ">


					<a href="#" class="link-main hover-button flex f3 deep-purple link mv3 ba ph3 pv1 br1" onclick="${next}">
						 Create your own space <span class="flex ico-link ml3 f5 self-center">▶</span>
					</a>

					<h2 class="flex items-center f3 gray mv3 lh-copy mw6 mh4 o-70">
					 Or scroll to learn more <span class="f6 ml3">▼</span>
				</div>
				</div>
			</div>
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

    function mainSectionOwners() {
      return html`
        <div class="flex flex-column items-center justify-around w-100 min-vh-100">
          <div class="flex flex-column items-start justify-between w-100 tl mw7">
            <h2 class="f3 ttu uppercase deep-purple mv0">Listen to music with far away friends.</h2>
            <h2 class="f3 dark-gray mv0"></h2>
            <h2 class="f4 gray mv3"><span class="pv1 ph2 bg-light-green deep-purple br2">Pears 🍐</span> is a temporary, collaborative peer-to-peer playlist.</h2>
          </div>
					<div class="flex flex-column items-start w-100 mw7">
						<div class="br2 ph3 bg-washed-purple">
							<h2 class="f3 deep-purple mv0 pv1 lh-copy">Welcome to your space.</h2>
						</div>
            	<h2 class="f3 gray mv3 lh-copy mw6">You're two short steps away from creating your playlist.</h2>
          </div>
          <div class="flex flex-row items-center justify-start w-100 mw7 ">
            <a href="#" class="link-main hover-button flex f3 deep-purple link mv3 ba ph3 pv1 br1" onclick="${next}">
               Continue <span class="flex ico-link ml3 f5 self-center">▶</span>
            </a>
						<h2 class="flex items-center f3 gray mv3 lh-copy mw6 mh4 o-70">
             Or scroll to learn more <span class="f6 ml3">▼</span>
          </div>
        </div>
      `
    }
	}

// TO DO
// 1. Set a conditional styling for the NEXT button per my lame attempt on line 62. We should also add a link disabled property

  function step1() {
		return html`
			<body class="flex self-center w-100 min-vh-100 f3 lh-copy pa5-ns pa3">
				<div class="flex flex-row w-100 h-100 mw8 justify-between">

					<div class="flex flex-column items-center w-100 mw5 justify-center">
					<a href="#" class="link link-mini bb bw1 flex self-start color-inherit" onclick="${back}">BACK</a>
					</div>

					<div class="flex flex-column w-100 justify-center align-center">
						<p class="mv0 deep-purple">1.</p>
						<p class="mv0 deep-purple">SELECT A FOLDER</p>
						<div class="flex flex-row w-100">
						<p>	${as.render(emit)} to select a folder to stream to & from.</p>
						</div>
						<div class="flex flex-row items-center justify-start w-100 mw7 ">
						<a href="#" class="link-main hover-button flex mw4 f3 deep-purple link mv3 ba ph3 pv1 br1 ${as.archive != null ? 'o-100' : 'o-10 link-disabled'}" onclick="${next}">
							Next <span class="flex ico-link ml3 f5 self-center">▶</span>
						</a>
						</div>
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
			<a href="#" class="link link-mini bb bw1 flex self-start color-inherit" onclick="${back}">BACK</a>
			</div>

				<div class="flex flex-column w-100 justify-center align-center">

					<p class="mv0 deep-purple">2.</p>
					<div class="flex flex-row w-100 items-center">
					<p class="mv0 deep-purple">SELECT AN AVATAR <span class="f2">↝</span></p>
					<input id="avatar_selector" class="flex ml3 bn" style="outline:0;" type="color" value="#2659ff">
					</div>
					<p>Your avatar is a color that appears next to your song selections.</p>
					${as.render(emit)}
					<div class="flex flex-row items-center justify-start w-100 mw7 ">
					<a href="#" class="link-main hover-button flex f3 deep-purple link mv3 ba ph3 pv1 br1 ${as.archive != null ? 'o-100' : 'o-10 link-disabled'}" onclick="${finish}">
					Finish
					<span class="flex ico-link ml3 f5 self-center">▶</span>
					</a>
					</div>
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
