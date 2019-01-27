// file upload component

var Component = require('nanocomponent')
var html = require('nanohtml')
var deburr = require('lodash.deburr')
var { emit } = require('choo-shortemit')

module.exports = class FileUpload extends Component {
  constructor () {
    super()

    this.visible = false
    this.fileinput = null
    this.closeTimeout = null
  }

  createElement () {
    const t = this

    this.fileinput = html`<input type="file" onchange="${onchange}" class="dn">`

    return html`
      <div class="flex-column justify-center items-center pa5 fixed top-0 left-0 w-100 h-100 bg-white-80 bw5 bw2 ${!this.visible ? 'dn' : 'flex'}"
        ondragover="${dragOver}" ondragleave="${dragLeave}" ondrop="${drop}">
        <div class="flex flex-column items-center justify-center  w-100 h-100 vertical-scroll f1 deep-purple vertical-scroll">
          <h2 class="font-halibut mv3">DROP THAT SONG</h2>
          <h2 class="font-halibut mv3">DROP THAT SONG</h2>
          <h2 class="font-halibut mv3">DROP THAT SONG</h2>
          <h2 class="font-halibut mv3">DROP THAT SONG</h2>
          <h2 class="font-halibut mv3">DROP THAT SONG</h2>
          <h2 class="font-halibut mv3">DROP THAT SONG</h2>
          <h2 class="font-halibut mv3">DROP THAT SONG</h2>
          <h2 class="font-halibut mv3">DROP THAT SONG</h2>
          <h2 class="font-halibut mv3">DROP THAT SONG</h2>
          <h2 class="font-halibut mv3">DROP THAT SONG</h2>
          <h2 class="font-halibut mv3">DROP THAT SONG</h2>
          <h2 class="font-halibut mv3">DROP THAT SONG</h2>
          <h2 class="font-halibut mv3">DROP THAT SONG</h2>
          <h2 class="font-halibut mv3">DROP THAT SONG</h2>
          <h2 class="font-halibut mv3">DROP THAT SONG</h2>
          <h2 class="font-halibut mv3">DROP THAT SONG</h2>
          <h2 class="font-halibut mv3">DROP THAT SONG</h2>
          <h2 class="font-halibut mv3">DROP THAT SONG</h2>
        </div>
        ${this.fileinput}
      </div>
    `

    function dragOver (e) {
      e.preventDefault()
      if (t.closeTimeout) clearTimeout(t.closeTimeout)
    }

    function dragLeave (e) {
      e.preventDefault()
      if (t.closeTimeout) clearTimeout(t.closeTimeout)
      t.closeTimeout = setTimeout(function () {
        t.toggle(false)
      }, 500)
    }

    function drop (e) {
      e.preventDefault()

      var file = e.dataTransfer.files[0]

      if (file) {
        t.uploadFile(file)
      } else {
        t.visible = false
        t.rerender()
      }
    }

    function onchange (e) {
      t.uploadFile(this.files[0])
    }
  }

  uploadFile (file) {
    var t = this
    var reader = new FileReader()
    reader.onload = async function (e) {
      var result = e.target.result
      t.visible = false
      emit('pears:file', { name: deburr(file.name), data: result })
    }
    reader.readAsArrayBuffer(file)
  }

  openDialog () {
    this.fileinput.click()
  }

  toggle (visibility) {
    if (visibility) {
      this.visible = visibility
    } else {
      this.visible = !this.visible
    }
    this.rerender()
  }

  update () {
    return true
  }
}
