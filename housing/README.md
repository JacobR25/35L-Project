# IMPORTANT

In order for this to run correctly, you have to go into the file \housing\node_modules\webpack\lib\dependencies\HarmonyDetectionParserPlugin.js and change lines 15 and 16 so they look like this.
module.exports = class HarmonyDetectionParserPlugin {
	constructor(options) {
		const { topLevelAwait = true } = options || {};
		this.topLevelAwait = true;
	}

## Running the project

The first step is to run:

### `npm install firebase`

### `npm install`

### `npm start`

Then navigate to http://localhost:3000/ and it should work.

