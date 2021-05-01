/* eslint-disable no-console */
const express = require('express');
const app = express();
const path = require('path');
const compress = require('compression');
app.use(compress());
app.use(express.static(path.join(__dirname, './build')));

app.get('*', (req, res) => {
	// eslint-disable-next-line no-path-concat
	res.sendFile(path.resolve(__dirname + '/build/index.html'));
});
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 8000;
app.listen(DEFAULT_PORT);
console.log(`Listening on port ${DEFAULT_PORT}`);
