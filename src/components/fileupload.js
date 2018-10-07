// file upload component

const Component = require('nanocomponent')
const html = require('nanohtml')

module.exports = class FileUpload extends Component {
	constructor() {
		super()

		this.visible = false
	}

	createElement(emit) {
		const t = this

		return html`
			<div class="fl pa5 fixed top-0 left-0 w-100 h-100 bg-white-80 b--light-pink bw2 ${!this.visible ? 'dn' : ''}"
				ondragover="${drag_over}" ondragleave="${drag_leave}" ondrop="${drop}">
				<a href="#" class="dib mr10 color-inherit" onclick="${back}">BACK</a>
				<div class="dib f-subheadline color-blue">DROP TO ADD THE SONG</div>
			</div>
		`

		function drag_over(e) {
			e.preventDefault()
			this.classList.add('ba')
		}

		function drag_leave(e) {
			e.preventDefault()
			this.classList.remove('ba')
		}

		function drop(e) {
			e.preventDefault()

			var file = e.dataTransfer.files[0]

			var reader = new FileReader()
			reader.onload = async function (e) {
				var result = e.target.result
				t.visible = false
				emit('hangtime:file', {name: file.name, data: result})
			}

			reader.readAsArrayBuffer(file)
			this.classList.remove('ba')
		}

		function back(e) {
			e.preventDefault()
			t.toggle()
		}
	}

	toggle() {
		this.visible = !this.visible
		this.rerender()
	}

	update(emit) {
		return true
	}
}