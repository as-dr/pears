const Component = require('nanocomponent')
const html = require('choo/html')

const message = 'The URL of the space has been copied to your clipboard.'

module.exports = class Invite extends Component {
  constructor() {
    super()
    this.showMessage = false
  }

  createElement() {
    const t = this
    return html`
      <div class="relative flex items-center">
        <a href="#" class="relative flex link link-mini deep-purple bb bw1 ml4 " onclick="${onclick}">
          Invite Friends
          <span class="fixed w-auto gray f4 bg-white">
          ${this.showMessage ? ` ${message}` : ''}
          </span>
        </a>
      </div>
    `

    function onclick(e) {
      e.preventDefault()
      copyToClipboard(`${window.location.protocol}//${window.location.hostname}/`)
      t.showMessage = true
      t.rerender()
      // hide message after 5 seconds
      setTimeout(function () {
        t.showMessage = false
        t.rerender()
      }, 5000)
    }
  }

  update() {
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
};
