const Component = require('nanocomponent')
const html = require('choo/html')

const questions = [
  {q: 'What is this?', r: 'Listen to a music with far away friends. Soundscape is a temporary, collaborative playlist you create with your friends.'},
  {q: "What's DAT?", r: 'DAT is like HTTP. The difference is that DAT is designed for peer-to-peer connections. That means when you use Soundscape, people connect directly to each others computers. With HTTP, people connect to a central company computer, instead, like when you listen to music on Spotify.'},
  {q: 'Why do I need to use Beaker Browser?', r: "Beaker is the best way to access DAT links. DAT isn't currently supported by most major browsers."},
  {q: 'Can I add streaming links?', r: 'Not yet. This version only lets you add MP3s that you have on your computer. Remember those?'},
  {q: 'Can I set admin permissions?', r: "They were left out intentionally as a design choice. When everyone can manipulate the space, it limits how many people can listen before disagreements or greifing emerges. We're presently more interested in encouraging the creation of small, trusted spaces people close friends."},
  {q: "Why isn't my playlist permanent?", r: "Songs added to a playlist are deleted from your hard drive after they're played. This is a small nod of respect to the many artists whose music make our days."}
]

module.exports = class Help extends Component {
  constructor() {
    super()
    this.opened = -1
  }

  createElement() {
    const t = this
    return html`
      <div class="flex flex-column items-start justify-between w-100 mw7 tl ">
        <h2 class="f3 ttu uppercase dark-gray mv0">Help</h2>
        <h2 class="f3 gray mv0">Select a question to see the answer</h2>
        <ul class="list pl0 dark-gray">
          ${questions.map((question, id) => html`
            <ul class="list pl0 mv4">
              <li class="f3 deep-purple pointer" onclick="${() => open(id)}">${question.q}</li>
              <li class="${t.opened !== id ? 'dn' : ''} f4">${question.r}</li>
            </ul>
          `)}
        </ul>
      </div>
    `

    function open(id) {
      if (t.opened !== id) {
        t.opened = id
      } else {
        t.opened = -1
      }
      t.rerender()
    }
  }

  update() {
    return false
  }
}
