# hangtime

A shared space that's invisible but audible?

## development
```
git clone https://github.com/as-dr/noname
npm install
npm run build
npm start
```

In [Beaker](https://beakerbrowser.com) create a new archive from the folder where you cloned the project. After the site's ready add the following to the its `dat.json` to enable the experimental [`datPeers` API](https://beakerbrowser.com/docs/apis/experimental-datpeers):
```
"experimental": {
  "apis": [
	"datPeers"
  ]
}
```
