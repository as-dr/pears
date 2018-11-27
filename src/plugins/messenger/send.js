const MESSAGE_TYPES = require('./types')

module.exports = {
  // notify all peers that something's changed with someone's data
  notifyPeers: async function (newpeer) {
    await experimental.datPeers.broadcast({
      type: newpeer === true ? MESSAGE_TYPES.NEWPEER : MESSAGE_TYPES.UPDATEPEERS
    })
  },
  // notify all peers that you finished a song
  finished: async function () {
    await experimental.datPeers.broadcast({
      type: MESSAGE_TYPES.FINISHED
    })
  },
  // notify all peers to update list
  updateList: async function (peer, list, position, time) {
    await peer.send({
      type: MESSAGE_TYPES.UPDATELIST,
      list: list,
      position: position,
      time: time
    })
  },
  // notify all peers that an item was added to the list
  add: async function (value) {
    await experimental.datPeers.broadcast({
      type: MESSAGE_TYPES.ADD,
      value: value
    })
  }
}
