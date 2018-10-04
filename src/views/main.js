const html = require('nanohtml')
const css = require('sheetify')

css('../styles/ff.css')

module.exports = view

function view(state, emit) {
	return html`
		<body>
			Hello
		</body>
	`
}
