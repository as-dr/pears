// file upload component

var Component = require('nanocomponent')
var html = require('nanohtml')
var { emit } = require('choo-shortemit')

module.exports = class FileUpload extends Component {
	constructor() {
		super()

		this.visible = false
    this.fileinput = null
	}

	createElement() {
		const t = this

    this.fileinput = html`<input type="file" onchange="${onchange}" class="dn">`

		return html`
			<div class="flex-column justify-center items-center pa5 fixed top-0 left-0 w-100 h-100 bg-white-80 bw5 b--light-pink bw2 ${!this.visible ? 'dn' : 'flex'}"
				ondragover="${drag_over}" ondragleave="${drag_leave}" ondrop="${drop}">
				<a href="#" class="link flex ph3 pv1 ba color-inherit" onclick="${back}">BACK</a>
				<div class="flex f-subheadline color-blue">DROP THAT SONG</div>
        ${this.fileinput}
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

      t.uploadFile(file);
			this.classList.remove('ba')
		}

    function onchange(e) {
      t.uploadFile(this.files[0])
    }

		function back(e) {
			e.preventDefault()
			t.toggle()
		}
	}

  uploadFile(file) {
    var t = this
    var reader = new FileReader()
    reader.onload = async function (e) {
      var result = e.target.result
      t.visible = false
      emit('hangtime:file', {name: file.name, data: result})
    }
    reader.readAsArrayBuffer(file)
  }

  openDialog() {
    this.fileinput.click()
  }

	toggle(visibility) {
    if (visibility) {
      this.visible = visibility
    } else {
      this.visible = !this.visible
    }
		this.rerender()
	}

	update(emit) {
		return true
	}
}
