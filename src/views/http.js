// http fallback view

const html = require('nanohtml')

module.exports = view

function view(state, emit) {
	return html`
		<body class="fl w-100 pa5 sans-serif f3 lh-copy">
			<div class="w-100">
				<div class="mb5">HANGTIME</div>
				<div>PEER-TO-PEER ONLY APPLICATION. OPEN IT BEAKER BROWSER.</div>
			</div>
		</body>
	`
}
