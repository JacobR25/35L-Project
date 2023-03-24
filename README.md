# Running our project

First, go to terminal and run the following commands:

### `git clone https://github.com/JacobR25/JacobR25.github.io.git`
### `cd JacobR25.github.io`
### `cd housing`
### `npm install`
<br />

In order for this to run correctly, you have to go into the file

### `\housing\node_modules\webpack\lib\dependencies\HarmonyDetectionParserPlugin.js`
<br />

and change lines 15 and 16 so they look like this.

        constructor(options) {
            const { topLevelAwait = true } = options || {};
            this.topLevelAwait = true;
        }   

## Last steps

Then,

### `npm start`

And navigate to http://localhost:3000/ in the browser of your choosing and it should work.

