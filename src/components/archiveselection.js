// local archive selection component

const Component = require('nanocomponent')
const html = require('nanohtml')

module.exports = class ArchiveSelection extends Component {
  constructor () {
    super()
    this.archive = null
  }

  createElement (emit) {
    const t = this
    return html`
      <a href="#" class="link-mini f3 deep-purple link mv3 mr2 bb bw1 pv1" onclick="${select}">
        ${this.archive == null ? 'Click Here' : shorten(this.archive.url)}
      </a>
    `

    async function select (e) {
      e.preventDefault()
      try {
        t.archive = await DatArchive.selectArchive({
          title: 'Select an archive from where your music will be streamed.',
          filters: {
            isOwner: true
          }
        })
        t.rerender()
        emit('re') // next button must appear
      } catch (e) {
        // do nothing
      }
    }
  }

  update (emit) {
    return false
  }
}

function shorten (str) {
  return str.substr(0, 12) + '...' + str.substr(-2)
}
