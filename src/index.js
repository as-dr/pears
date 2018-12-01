const choo = require('choo')
const css = require('sheetify')

css('../node_modules/tachyons/css/tachyons.min.css')
css('./styles/custom.css')
css('./styles/fonts.css')


const app = choo()

app.use((state, emitter) => {
	emitter.on('re', () => {
		emitter.emit('render')
	})
})
app.use(require('./plugins/setup'))
app.use(require('./plugins/hangtime')())
app.use(require('./plugins/messenger')())
app.use(require('./plugins/player')())

app.route('*', require('./views/wrapper'))

app.mount('body')
