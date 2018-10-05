const choo = require('choo')
const css = require('sheetify')

css('../node_modules/tachyons/css/tachyons.min.css')

const app = choo()

app.use(require('./plugins/messenger')())
app.use(require('./plugins/hangtime')())

app.route('*', require('./views/wrapper'))

app.mount('body')
