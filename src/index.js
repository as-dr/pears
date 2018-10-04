const choo = require('choo')

const app = choo()

app.route('*', require('./views/main'))

app.mount('body')
