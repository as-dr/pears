const choo = require('choo')
const css = require('sheetify')

css('../node_modules/tachyons/css/tachyons.min.css')

const app = choo()

app.use(require('./plugins/messenger')())

app.route('*', require('./views/main'))

app.mount('body')
