// playlist component

/*

list = [
{
"type": "song",
"text": "BOWIE - ASHES TO ASHES",
"color": "#ff00ff"
}
]

*/

const Component = require('nanocomponent')
const html = require('nanohtml')

module.exports = class Playlist extends Component {
	constructor() {
		super()

		this.list = [
			{
				"type": "song",
				"text": "BOWIE - ASHES TO ASHES",
				"color": 'salmon'
			},
			{
				"type": "song",
				"text": "TOOL - THE POT",
				"color": 'pink'
			},
			{
				"type": "message",
				"text": "A NEW LISTENER JOINED",
				"color": 'red'
			},
			{
				"type": "song",
				"text": "Pink Floyd - Hey You.mp3",
				"color": 'red'
			}
		]
		this.current_index = 0 // don't forget to skip messages
	}

	createElement() {
		const t = this
		return html`
			<div class="w-100">
				${this.list.slice(0).reverse().slice(0, 12).map(renderItem)}
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
			var state = (t.list.length - id - 1) - t.current_index // 0 = current song, < 0 = played, > = in queue

			item.text = item.text.replace('.mp3', '')

			return html`
				<div class="w-100 mv2">
					${avatar(item.color)}
					<span class="ttu ${state != 0 ? (state < 0) ? 'strike o-30' : 'o-30' : ''}">${item.text}</span>
				</div>
			`
		}

		function renderMessage(item) {
			return html`
				<div class="w-100 mv2">
					${avatar(item.color)}
					<span class="ttu o-30" style="color: ${item.color};">${item.text}</span>
				</div>
			`
		}

		function avatar(color) {
			return html`
				<div class="dib mr3" style="width: 20px; height: 20px; border-radius: 30px; background: ${color};"></div>
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

	update() {
		return true
	}
}
