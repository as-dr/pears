// playlist component

const Component = require('nanocomponent')
const html = require('nanohtml')

// how many played songs do we want to show?
const LAST_SONGS = 2

module.exports = class Playlist extends Component {
  constructor () {
    super()

    this.list = []
    this.current_index = 0 // don't forget to skip messages
  }

  createElement (list, index, waiting) {
    const t = this
    this.list = list
    this.current_index = index

    var filteredList = this.list.slice(0)
      .filter((_, id) => (id - t.current_index >= -LAST_SONGS))
    return html`
      <div class="flex flex-column w-100">
        ${filteredList.length ? filteredList.map(renderItem) : empty()}
      </div>
    `

    function renderItem (item, id) {
      switch (item.type) {
        case 'song':
          return renderSong(item, id)
        case 'message':
          return renderMessage(item)
      }
    }

    function renderSong (item, id) {
      var state = (id + t.list.length - filteredList.length) - t.current_index // 0 = current song, > 0 = played, < in queue
      return html`
        <div class="relative flex flex-row items-center w-100 mv1 truncate ellipsis">
          <div class="player-strikethrough absolute z-999" style="top:20px; left: 20px; height: 4px;"></div>
          ${avatar(item.color)}
          <div class="flex ${state !== 0 ? (state < 0) ? 'strike o-30' : 'o-30' : ''}">
            ${songtitle(item.text)}
            ${(waiting && state === 0) ? html`<span class="o-30 blink ml2">― Waiting for the others</span>` : null}
          </div>
        </div>
      `
    }

    function renderMessage (item) {
      return html`
        <div class="flex flex-row items-center w-100 mv1">
          ${avatar(item.color)}
          <span class="o-30 truncate ellipsis" style="color: ${item.color};">${item.text}</span>
        </div>
      `
    }

    function avatar (color) {
      return html`
        <div class="flex mr3">
        <span class="" style="width: 12px; height: 12px; border-radius: 100px; background: ${color};"></span>
        </div>
      `
    }

    function empty () {
      return html`
        <ul class=" mv2 pl0 list f4">
        <ul class="list pl0 mb4">
        <li class="deep-purple">How do I add a song?</li>
        <li class="gray mt2">Just drag any <span class="deep-purple">MP3</span> file in here, or click the <span class="bg-washed-purple deep-purple link mv3 ph3 pv1 br1">Add Song</span> button above to search your computer.</li>
        </ul>
        <ul class="list pl0 mv5">
        <li class="deep-purple">How do I invite my friends?</li>
        <li class="gray mt2">Click on the <span class="bg-washed-purple deep-purple link mv3 ph3 pv1 br1">Add Friends</span> button and it will copy the URL of the space to your clipboard. Send it to your friends and tell them to access it via Beaker.</li>
        </ul>
        <ul class="list pl0 mv5">
        <li class="deep-purple">How do I name my space?</li>
        <li class="gray mt2">Rename the archive (folder) in the <a class="link link-mini f4 deep-purple bb pb1 bw1" href="beaker://library/" target="_new">Beaker Library</a> and it'll be reflected here.</li>
        </ul>
        </ul>
      `
    }
  }

  addSong (file, color) {
    this.addItem({
      type: 'song',
      text: file,
      color: color
    })
  }

  addMessage (text, color) {
    this.addItem({
      type: 'message',
      text: text,
      color: color
    })
  }

  addItem (item) {
    this.list.push(item)
    this.rerender()
  }

  // update playlist to next song
  next () {
    if (this.current_index < this.list.length) {
      this.current_index++
      while (this.current_index < this.list.length && this.list[this.current_index].type !== 'song') {
        this.current_index++
      }
      this.rerender()
    }
  }

  update (list, index, waiting) {
    return (
      list.length !== this.list.length ||
      index !== this.index ||
      list[index] !== this.list[this.index]
    )
  }
}

// todo
function songtitle (text) {
  var sp = text.split('/')
  return sp[sp.length - 1]
}
