// main view

const html = require('nanohtml')
const Playlist = require('../components/playlist')
const FileUpload = require('../components/fileupload')
const Invite = require('../components/invite')

const playlist = new Playlist()
const fileupload = new FileUpload()
const inviteButton = new Invite()

module.exports = view

function view (state, emit) {
  // set title to space title
  emit(state.events.DOMTITLECHANGE, state.pears.space.title)

  var waiting = !state.pears.playing && (state.pears.position < state.pears.list.length - 1)
  return html`
    <body class="flex flex-row w-100 pa4 f3 lh-copy items-start justify-start" ondragover="${showUploader}">
    <div class="flex flex-column items-start w-100 h-100 mw5 justify-start">
    <a href="#" class="flex link link-mini f4 bb bw1  gray ml3 mt4" onclick="${back}">Leave</a>
    </div>
      <div class="flex flex-column justify-start items-start w-100 min-vh-100 mw7">
        <div class="flex flex-row items-center  w-100 mw7 mt4 mb4">
          <div class="f4 pv1 ph2 bg-washed-purple deep-purple br2">${state.pears.space.title}</div>
          <div class="flex flex-row ml4 gray f4 items-center">
          ${state.pears.peers.length + 1} Listener${state.pears.peers.length !== 0 ? 's' : ''}
          </div>
        </div>
        <div class="flex flex-column   w-100 h-100 items-start self-center">

          <ul class="list flex flex-row items-center w-100 pl0 f3">
            <li>
              <a href="#"class="link-main hover-button flex f4 deep-purple link mv3 ba ph3 pv1 br1 ${state.pears.list.length === 0 ? 'blink-underline' : ''}" onclick="${openFileDialog}">Add Song</a>
            </li>
            <li>
            ${inviteButton.render()}
            </li>
            <li class="ml0 ml4">
              <a href="#" class="link link-mini f4 deep-purple bb pb1 bw1" onclick="${toggleMute}">${state.pears.muted ? 'Unmute' : 'Mute'}</a>
            </li>
            <li class="dn ml0 ml4">
              <a href="#" class="link link-mini f4 deep-purple bb pb1 bw1 strike o-20" onclick="${e => e.preventDefault()}">Skip</a>
            </li>
          </ul>
          <div class="flex flex-column w-100 h-auto mw7 pb4 self-center justify-center">
            ${playlist.render(state.pears.list, state.pears.position, waiting)}
          </div>
        </div>
      </div>
      ${fileupload.render()}
    </body>
  `

  function back (e) {
    e.preventDefault()
    emit('setup:delete')
  }

  function showUploader (e) {
    e.preventDefault()
    if (!fileupload.visible) {
      fileupload.toggle(true)
    }
  }

  function openFileDialog (e) {
    e.preventDefault()
    fileupload.openDialog()
  }

  function toggleMute (e) {
    e.preventDefault()
    emit('player:mute')
  }
}
