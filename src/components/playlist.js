// playlist component

const Component = require('nanocomponent')
const html = require('nanohtml')

// how many played songs do we want to show?
const LAST_SONGS = 2

module.exports = class Playlist extends Component {
	constructor() {
		super()

		this.list = []
		this.current_index = 0 // don't forget to skip messages
	}

	createElement(list, index, waiting) {
		const t = this
		this.list = list
		this.current_index = index

    var filteredList = this.list.slice(0)
                          .filter((_, id) => (id - t.current_index >= -LAST_SONGS))
		return html`
			<div class="w-100">
				${!!filteredList.length ? filteredList.map(renderItem) : empty()}
			</div>
		`

		function renderItem(item, id) {
			switch (item.type) {
			case 'song':
				return renderSong(item, id)
			case 'message':
				return renderMessage(item)
			}
		}

		function renderSong(item, id) {
			var state = (id + t.list.length - filteredList.length) - t.current_index // 0 = current song, > 0 = played, < in queue
			return html`
				<div class="flex flex-row items-center w-100 mv2">
					${avatar(item.color)}
					<span class="ttu ${state !== 0 ? (state < 0) ? 'strike o-30' : 'o-30' : ''}">
            ${songtitle(item.text)}
            ${(waiting && state === 0) ? html`<span class="o-30 blink ml2">― Waiting for the others</span>` : null}
          </span>
				</div>
			`
		}

		function renderMessage(item) {
			return html`
				<div class="flex flex-row items-center w-100 mv2">
					${avatar(item.color)}
					<span class="ttu o-30" style="color: ${item.color};">${item.text}</span>
				</div>
			`
		}

		function avatar(color) {
			return html`
				<div class="flex mr3" style="width: 12px; height: 12px; border-radius: 100px; background: ${color};"></div>
			`
		}

    function empty () {
      return html`
        <div class="o-30 mv2">
          To add a song, simply drag it in here, or press the "+ Add song" button to search your computer.
        </div>
      `
    }
	}

	addSong(file, color) {
		this.addItem({
			type: 'song',
			text: file,
			color: color
		})
	}

	addMessage(text, color) {
		this.addItem({
			type: 'message',
			text: text,
			color: color
		})
	}

	addItem(item) {
		this.list.push(item)
		this.rerender()
	}

	// update playlist to next song
	next() {
		if (this.current_index < this.list.length) {
			this.current_index++
			while (this.current_index < this.list.length && this.list[this.current_index].type != 'song') {
				this.current_index++
			}
			this.rerender()
		}
	}

	update(list) {
		return true
	}
}

// todo
function songtitle(text) {
	var sp = text.split('/')
	return sp[sp.length - 1]
}
