# Pears
v0.5

### Listen to music with far away friends.

Pears is a temporary, collaborative peer-to-peer playlist.

Download [Beaker](https://beakerbrowser.com) and click [here](https://pears.seed.hex22.org) to test it out.

Currently, only mp3 files can be streamed. Please expect stability issues and bugs.

## Usage
To create a new space for you and your friends:

1. Install [Beaker Browser](https://beakerbrowser.com/)
2. Go to [dat://pears.seed.hex22.org/](dat://pears.seed.hex22.org)
3. Click the three dots at the right part of the URL bar
4. Click __Make editable copy__
5. Give it a name and click __Create copy__

To join a space simply navigate to the `dat://` URL you got from your friend, click on __Join this space__ and follow the steps.

## Development
```
git clone https://github.com/as-dr/noname
npm install
npm run build
npm start
```

In [Beaker](https://beakerbrowser.com) create a new archive from the folder where you cloned the project. After the site's ready add the following lines to the `dat.json` in order to enable the experimental [`datPeers`API](https://beakerbrowser.com/docs/apis/experimental-datpeers):
```json
"experimental": {
  "apis": [
    "datPeers"
  ]
}
```
