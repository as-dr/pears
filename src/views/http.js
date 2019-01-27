// http fallback view

const html = require('nanohtml')
const HelpSection = require('../components/help')

module.exports = view

const help = new HelpSection()

function view (state, emit) {
  return html`
  <body class="w-100 min-vh-100 pa4 lh-copy">
  <div class="flex flex-column items-center justify-around w-100 min-vh-100">
    <div class="flex flex-column items-start justify-between w-100 tl mw7">
      <h2 class="f3 ttu uppercase deep-purple mv0">Listen to music with far away friends.</h2>
      <h2 class="f3 dark-gray mv0"></h2>
      <h2 class="f4 gray mv3"><span class="pv1 ph2 bg-light-green deep-purple br2">Pears 🍐</span> is a temporary, collaborative peer-to-peer playlist.</h2>
    </div>
    <div class="flex flex-column items-start w-100 mw7">
        <h2 class="f3 gray mv3 lh-copy mw6">Pears only works with the Beaker Browser. Click below to download it.</h2>
    </div>
    <div class="flex flex-row items-center justify-start w-100 mw8 ">
      <a href="https://beakerbrowser.com/" class="link-main hover-button flex f3 deep-purple link mv3 ba ph3 pv1 br1">
         Download Beaker Browser <span class="flex ico-link ml3 f5 self-center">▶</span>
      </a>
      <h2 class="flex items-center f3 gray mv3 lh-copy mw6 mh4 o-70">
       Or scroll to learn more <span class="f6 ml3">▼</span>
    </div>
  </div>
    <div class="flex flex-column items-center justify-around w-100 min-vh-100">
      ${help.render()}
      <div class="flex flex-column items-center justify-around w-100 min-vh-100">
      <div class="flex flex-column items-start justify-between w-100 mw7 tl ">
      <h2 class="f3 ttu uppercase dark-gray mv0">CREDITS</h2>
        <ul class="list pl0 dark-gray">
          <ul class="list pl0 mv4">
          <li class="f3 deep-purple">Code</li>
          <li class="f4"><a class="link dark-gray" href="https://hex22.org/" target="_blank">Hunor Karamán <span class="deep-purple">↗</span> </a></li>
          </ul>
          <ul class="list pl0 mv4">
          <li class="f3 deep-purple">Design</li>
          <li class="f4"><a class="link dark-gray" href="https://www.alexsingh.com" target="_blank">Alex Singh<span class="deep-purple">↗</span> </a></li>
          </ul>
          <ul class="list pl0 mv4">
          <li class="f3 deep-purple">Type</li>
            <li class="f4">
              <a class="link dark-gray" href="https://rsms.me/inter/" target="_blank">Inter UI <span class="deep-purple">↗</span> </a>
            </li>
          </ul>
        </ul>
        </div>
    </div>
  </body>
  `
}
