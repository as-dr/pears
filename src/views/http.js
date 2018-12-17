// http fallback view

const html = require('nanohtml')

module.exports = view

function view(state, emit) {
	return html`
	<body class="w-100 min-vh-100 pa4 lh-copy">
		<div class="flex flex-column items-center justify-around w-100 min-vh-100">
			<div class="flex flex-column items-start justify-between w-100 mw7 tl ">
				<h2 class="f3 ttu uppercase dark-gray mv0">Listen to music with far away friends.</h2>
				<h2 class="f3 dark-gray mv0"></h2>
				<h2 class="f4 gray mv3">Soundscape is a temporary, collaborative playlist.</h2>
			</div>
			<div class="flex flex-column items-start justify-center w-100 mw7 ">
			<a href="#" class="strike link-disabled flex f3 deep-purple link mv3 " onclick="${fork}">
			<span class="flex ico-link mr3 f5 self-center">➤</span>Download Beaker Browser To Get Started
			</a>
				<a href="#" class="strike link-disabled flex f3 deep-purple link mv3" onclick="${fork}">
				<span class="flex ico-link mr3 f5 self-center">➤</span> Create your space.
				</a>
				<a href="#" class="strike link-disabled flex f3 deep-purple link mv3" onclick="${next}">
				<span class="flex ico-link mr3 f5 self-center">➤</span> Join a friend's space.
				</a>
			</div>
		</div>
		<div class="flex flex-column items-center justify-around w-100 min-vh-100">
		<div class="flex flex-column items-start justify-between w-100 mw7 tl ">
		<h2 class="f3 ttu uppercase dark-gray mv0">Help</h2>
		<h2 class="f3 gray mv0">Select a question to see the answer</h2>
			<ul class="list pl0 dark-gray">
				<ul class="list pl0 mv4">
				<li class="f3 deep-purple pointer">What is this?</li>
				<li class="dn f4">Answer</li>
				</ul>
				<ul class="list pl0 mv4">
				<li class="f3 deep-purple pointer">What's DAT?</li>
				<li class="dn f4">Answer</li>
				</ul>
				<ul class="list pl0 mv4">
				<li class="f3 deep-purple pointer">Why do I need to use Beaker Browser?</li>
				<li class="dn f4">Answer</li>
				</ul>
				<ul class="list pl0 mv4">
				<li class="f3 deep-purple pointer">Can I add streaming links?</li>
				<li class="dn f4">Answer</li>
				</ul>
				<ul class="list pl0 mv4">
				<li class="f3 deep-purple pointer">Can I set admin permissions?</li>
				<li class="dn f4">Answer</li>
				</ul>
				<ul class="list pl0 mv4">
				<li class="f3 deep-purple pointer">Why isn't my playlist permanent?</li>
				<li class="dn f4">Answer</li>
				</ul>
			</ul>
			</div>
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
}
