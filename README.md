# Running our project

First, go to terminal and run the following command:

### `git clone https://github.com/JacobR25/JacobR25.github.io.git`

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
<br/>

In order to run the project, run these commands and it should work:

### `cd housing`

### `npm install`

### `npm start`

Then navigate to http://localhost:3000/ and it should work.

