const Component = require('nanocomponent')
const html = require('choo/html')

const message = 'The URL of the space has been copied to your clipboard.'

module.exports = class Invite extends Component {
  constructor () {
    super()
    this.showMessage = false
  }

  createElement () {
    const t = this
    return html`
      <div class="relative flex items-center">
        <a href="#" class="link-main hover-button flex f4 deep-purple link mv3 ba ph3 pv1 br1 ml4" onclick="${onclick}">
          Add Friends
          <span class="fixed absolute-center-align w-auto br1 gray f4 pa2 bg-light-green dark-green  ${this.showMessage ? 'flex move-down' : 'dn'}" style="top: 8px; width:540px;">
          ${this.showMessage ? ` ${message}` : ''}
          </span>
        </a>
      </div>
    `

    function onclick (e) {
      e.preventDefault()
      copyToClipboard(`${window.location.protocol}//${window.location.hostname}/`)
      t.showMessage = true
      t.rerender()
      // hide message after 5 seconds
      setTimeout(function () {
        t.showMessage = false
        t.rerender()
      }, 3000)
    }
  }

  update () {
    return false
  }
}

const copyToClipboard = str => {
  const el = document.createElement('textarea')
  el.value = str
  el.setAttribute('readonly', '')
  el.style.position = 'absolute'
  el.style.left = '-9999px'
  document.body.appendChild(el)
  const selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
  if (selected) {
    document.getSelection().removeAllRanges()
    document.getSelection().addRange(selected)
  }
}
