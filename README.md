# Pears
v0.5

**Listen to music with far away friends**

Pears is a temporary, collaborative peer-to-peer playlist.

Download [Beaker](https://beakerbrowser.com) and click [here](pears.seed.hex22.org) to test it out.

Currently, only mp3 files can be streamed. Please expect stability issues and bugs.
 

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
