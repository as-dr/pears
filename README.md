# hangtime

A shared space that's invisible but audible?

### file structure sketch

How should the whole project look like approximately.

```
hangtime/
	src/
		components/
			****.js                 -- all frontend components
		plugins/                -- middlewares
			space.js                -- the core
			messenger.js            -- all communication + encode / decode
		styles/
			****.css                -- all the CSS
		views/
			playlist.js             -- default view
			add.js                  -- add song view
			wrapper.js
		index.js                 -- start the app & route everything to wrapper
	index.html
	package.json
	...
```
