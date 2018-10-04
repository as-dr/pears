const html = require('nanohtml')

module.exports = view

function view(state, emit) {
	return html`
		<body class="fl w-100 pa4">
			hello
		</body>
	`
}
