const Component = require('nanocomponent')
const html = require('choo/html')

const questions = [
  {q: 'What is this?', r: 'Answer 0'},
  {q: "What's DAT?", r: 'Answer 1'},
  {q: 'Why do I need to use Beaker Browser?', r: 'Answer 2'},
  {q: 'Can I add streaming links?', r: 'Answer 3'},
  {q: "Why isn't my playlist permanent?", r: 'Answer 4'},
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
